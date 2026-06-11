import type { SourceSystem, StatFormula } from '$lib/engine/types'
import { isGroup } from '$lib/engine/types'
import { flattenContributions } from '$lib/engine/compute'
import { ALL_FORMULAS } from '$lib/formulas'
import { STAT_REGISTRY } from '$lib/stats/registry'
import { parseStatsPage, type WikiStat } from './parse'

/**
 * Cross-checks our formulas against the wiki Stats dumps (data/wiki/).
 * Produces a human-readable audit report:
 *   - wiki stats we can't match to a registry entry by name
 *   - per stat: wiki menu groups with no contribution from that system
 *     (beyond what unknown placeholders account for), group-join op
 *     disagreements, and parenthesized sub-formulas where our formula
 *     has no group term.
 * This is a reporting tool, not a hard test — wiki text is hand-written
 * and the comparison is heuristic. Treat findings as leads, not verdicts.
 */

/** Wiki menu name → our SourceSystem ids. Absent = informational, skip. */
const SYSTEM_MAP: Record<string, SourceSystem[]> = {
  'Skill-Tree': ['skillTree'],
  Store: ['store'],
  Cards: ['cards'],
  Relics: ['relics'],
  Items: ['items'],
  Pets: ['pets'],
  Construct: ['construct'],
  Stargazing: ['stargazing'],
  Archaeology: ['archaeology'],
  Fishing: ['fishing', 'tributes'],
  Upgrades: ['upgrades'],
  Contracts: ['contracts'],
  Challenges: ['challenges'],
  Workshop: ['workshop'],
  Drones: ['drones'],
  Prestige: ['artifacts'],
  Skins: ['skins'],
  Floors: ['worldquests'],
}

const WIKI_PAGES = [
  'Stats_Pickaxe',
  'Stats_Bombs',
  'Stats_Drones',
  'Stats_Ore',
  'Stats_Crafting',
  'Stats_Obelisk',
  'Stats_Prestige',
  'Stats_Lootbugs',
  'Stats_Lootfrogs',
  'Stats_Chests',
  'Stats_Contracts',
  'Stats_Veins',
  'Stats_Stars',
  'Stats_Fishing',
  'Stats_Misc',
] as const

export function loadWikiStats(readFile: (path: string) => string): Map<string, WikiStat> {
  const out = new Map<string, WikiStat>()
  for (const page of WIKI_PAGES) {
    const json = JSON.parse(readFile(`data/wiki/${page}.json`)) as {
      wikitext: string
    }
    for (const stat of parseStatsPage(json.wikitext)) {
      out.set(stat.name, stat)
    }
  }
  return out
}

/**
 * Normalize stat names for wiki ↔ registry matching: the registry uses the
 * '×' sign and full words where the wiki page titles use ASCII 'x' and
 * 'Multi' ('5× Craft Chance' vs '5x Craft Chance').
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/×/g, 'x')
    .replace(/\bmultiplier\b/g, 'multi')
    .replace(/\s+/g, ' ')
    .trim()
}

function registryKeyByName(): Map<string, string> {
  const map = new Map<string, string>()
  for (const [key, meta] of Object.entries(STAT_REGISTRY)) {
    map.set(normalizeName(meta.name), key)
  }
  return map
}

function formulaSystems(formula: StatFormula): Set<SourceSystem> {
  return new Set(
    flattenContributions(formula)
      .filter((c) => !c.unknown)
      .map((c) => c.source.system),
  )
}

function formulaOpsBySystem(formula: StatFormula): Map<SourceSystem, Set<string>> {
  const map = new Map<SourceSystem, Set<string>>()
  for (const c of flattenContributions(formula)) {
    if (c.unknown) continue
    const set = map.get(c.source.system) ?? new Set<string>()
    set.add(c.op)
    map.set(c.source.system, set)
  }
  return map
}

export function buildWikiReport(readFile: (path: string) => string): string {
  const wikiStats = loadWikiStats(readFile)
  const nameToKey = registryKeyByName()
  const lines: string[] = []
  const unmatched: string[] = []
  let statsChecked = 0
  let statsWithFindings = 0

  for (const [name, wiki] of wikiStats) {
    const key = nameToKey.get(normalizeName(name))
    if (!key) {
      unmatched.push(name)
      continue
    }
    const formula = ALL_FORMULAS[key]
    if (!formula) {
      unmatched.push(`${name} (registry: ${key}, no formula)`)
      continue
    }
    statsChecked++

    const findings: string[] = []
    const haveSystems = formulaSystems(formula)
    const opsBySystem = formulaOpsBySystem(formula)
    const unknownCount = flattenContributions(formula).filter((c) => c.unknown).length
    const hasGroupTerms = formula.contributions.some(isGroup)

    for (const group of wiki.groups) {
      const mapped = SYSTEM_MAP[group.system]
      if (!mapped) continue // informational menu (Base, Misc, Lootbugs, ...)

      const covered = mapped.some((s) => haveSystems.has(s))
      if (!covered) {
        const note = unknownCount > 0 ? ` (formula has ${unknownCount} unknown placeholder(s))` : ''
        findings.push(
          `missing system ${group.system}: ${group.entries.map((e) => e.text).join('; ')}${note}`,
        )
        continue
      }

      // Group-join op heuristic: wiki group joins '+' but every contribution
      // we have from that system is '×' (or the reverse).
      const ourOps = new Set(mapped.flatMap((s) => [...(opsBySystem.get(s) ?? [])]))
      if (
        group.joinOpExplicit &&
        group.joinOp === '+' &&
        ourOps.size > 0 &&
        !ourOps.has('+') &&
        !ourOps.has('=')
      ) {
        findings.push(
          `op mismatch in ${group.system}: wiki group joins '+', ours: ${[...ourOps].join(',')}`,
        )
      }
      if (group.joinOp === '=' && !ourOps.has('=')) {
        findings.push(
          `op mismatch in ${group.system}: wiki group joins '=', ours: ${[...ourOps].join(',')}`,
        )
      }

      if (group.hasParens && !hasGroupTerms) {
        findings.push(
          `wiki has (sub-formula) in ${group.system} but our formula is flat: ${group.entries
            .filter((e) => e.inParens)
            .map((e) => e.text)
            .join(' + ')}`,
        )
      }
    }

    if (findings.length > 0) {
      statsWithFindings++
      lines.push(`\n### ${name} (\`${key}\`)`)
      for (const f of findings) lines.push(`- ${f}`)
    }
  }

  const header = [
    '# Wiki ↔ formula cross-check',
    '',
    `Generated from data/wiki/*.json. Stats checked: ${statsChecked}; with findings: ${statsWithFindings}; unmatched: ${unmatched.length}.`,
    '',
    '## Wiki stats with no matching registry name / formula',
    ...unmatched.map((n) => `- ${n}`),
    '',
    '## Per-stat findings',
  ]
  return [...header, ...lines, ''].join('\n')
}

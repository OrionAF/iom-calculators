import type { SourceSystem, StatFormula } from '$lib/engine/types'
import { isGroup } from '$lib/engine/types'
import { flattenContributions } from '$lib/engine/compute'
import { ALL_FORMULAS } from '$lib/formulas'
import { STAT_REGISTRY } from '$lib/stats/registry'
import { parseStatsPage, type WikiStat } from './parse'
import { storeSources } from '$lib/sources/store'
import { cardSources } from '$lib/sources/cards'
import { worldquestsSources } from '$lib/sources/worldquests'
import { workshopSources } from '$lib/sources/workshop'
import { constructSources } from '$lib/sources/construct'
import { droneSources } from '$lib/sources/drones'
import { artifactSources } from '$lib/sources/artifacts'
import { relicSources } from '$lib/sources/relics'
import { contractSources } from '$lib/sources/contracts'
import { challengeSources } from '$lib/sources/challenges'
import { skinsSources } from '$lib/sources/skins'
import { tributesSources } from '$lib/sources/tributes'
import { stargazingSources } from '$lib/sources/stargazing'
import { fishingSources } from '$lib/sources/fishing'
import { upgradeSources } from '$lib/sources/upgrades'
import { itemSources } from '$lib/sources/items'
import { petSources } from '$lib/sources/pets'
import { archaeologySources } from '$lib/sources/archaeology'
import { skillTreeSources } from '$lib/sources/skillTree'

// Every source aggregate, labelled by system, for the annotated-source audit.
const ALL_SOURCE_AGGREGATES: Array<[string, Record<string, unknown>]> = [
  ['store', storeSources],
  ['cards', cardSources],
  ['worldquests', worldquestsSources],
  ['workshop', workshopSources],
  ['construct', constructSources],
  ['drones', droneSources],
  ['artifacts', artifactSources],
  ['relics', relicSources],
  ['contracts', contractSources],
  ['challenges', challengeSources],
  ['skins', skinsSources],
  ['tributes', tributesSources],
  ['stargazing', stargazingSources],
  ['fishing', fishingSources],
  ['upgrades', upgradeSources],
  ['items', itemSources],
  ['pets', petSources],
  ['archaeology', archaeologySources],
  ['skillTree', skillTreeSources],
]

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

/**
 * Entry-level gap detection: a source that declares a statKey announces an
 * intent to contribute to that stat. If the stat's formula doesn't reference
 * that exact source object, the wiring was missed. This catches gaps the
 * system-level check can't see — a Store bundle hiding behind another store
 * source already present in the formula (the omission class that left nine
 * stargazing bundles unwired).
 */
export interface AnnotatedSourceGaps {
  /**
   * Actionable: the source declares a statKey whose formula EXISTS, but the
   * formula never references this source object. A real wiring miss — fix it.
   */
  unwired: string[]
  /**
   * Known debt: statKeys declared by sources that have no formula at all,
   * grouped by statKey so the report stays compact instead of one line per
   * source. Each entry is [statKey, ['system/name', ...]].
   */
  noFormula: Array<[string, string[]]>
}

export function annotatedSourceGaps(): AnnotatedSourceGaps {
  const unwired: string[] = []
  const noFormulaBy = new Map<string, string[]>()
  for (const [system, aggregate] of ALL_SOURCE_AGGREGATES) {
    for (const [name, value] of Object.entries(aggregate)) {
      const src = value as { key?: string; statKey?: string }
      if (typeof src?.key !== 'string' || typeof src.statKey !== 'string') continue
      const formula = ALL_FORMULAS[src.statKey]
      if (!formula) {
        const list = noFormulaBy.get(src.statKey) ?? []
        list.push(`${system}/${name}`)
        noFormulaBy.set(src.statKey, list)
        continue
      }
      const wired = flattenContributions(formula).some((c) => c.source === value)
      if (!wired) {
        unwired.push(`${system}/${name} (${src.key}) not wired into '${src.statKey}'`)
      }
    }
  }
  unwired.sort()
  const noFormula = [...noFormulaBy.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  return { unwired, noFormula }
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

  const sourceGaps = annotatedSourceGaps()
  const debtStats = sourceGaps.noFormula.length
  const debtSources = sourceGaps.noFormula.reduce((n, [, names]) => n + names.length, 0)

  const header = [
    '# Wiki ↔ formula cross-check',
    '',
    `Generated from data/wiki/*.json. Stats checked: ${statsChecked}; with findings: ${statsWithFindings}; unmatched: ${unmatched.length}; unwired annotated sources: ${sourceGaps.unwired.length}; stats with no formula yet: ${debtStats} (${debtSources} sources).`,
    '',
    '## Wiki stats with no matching registry name / formula',
    ...unmatched.map((n) => `- ${n}`),
    '',
    '## Annotated sources not wired into their (existing) stat formula',
    sourceGaps.unwired.length ? '' : '_none — every annotated source with a formula is wired._',
    ...sourceGaps.unwired.map((g) => `- ${g}`),
    '',
    '## Annotated stats with no formula yet (known debt)',
    ...sourceGaps.noFormula.map(([statKey, names]) => `- ${statKey} (${names.length}): ${names.join(', ')}`),
    '',
    '## Per-stat findings',
  ]
  return [...header, ...lines, ''].join('\n')
}

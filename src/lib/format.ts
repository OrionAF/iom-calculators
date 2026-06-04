export type Notation = 'standard' | 'scientific' | 'engineering'

// Index 0 → 'k' (10³); index 19 → 'nvdc' (10⁶⁰).
const SUFFIXES = [
  'k', 'm', 'b', 't', 'q', 'qi', 'sx', 'sp', 'oc', 'no',
  'dc', 'udc', 'ddc', 'tdc', 'qadc', 'qidc', 'sxdc', 'spdc', 'ocdc', 'nvdc',
] as const

const SUFFIX_BY_NAME: Record<string, number> = Object.fromEntries(
  SUFFIXES.map((s, i) => [s, (i + 1) * 3])
)

/**
 * Format a coefficient in [1, 1000) to 3 significant figures.
 * - Coefficient ≥ 100: no decimals (e.g. "123")
 * - Coefficient ≥ 10:  1 decimal     (e.g. "12.3")
 * - Coefficient <  10: 2 decimals    (e.g. "1.23")
 */
function format3SigFig(coefficient: number): string {
  const abs = Math.abs(coefficient)
  if (abs >= 100) return coefficient.toFixed(0)
  if (abs >= 10) return coefficient.toFixed(2)
  return coefficient.toFixed(2)
}

/**
 * Format a sub-1000 value bare.
 * - Integers render without a decimal.
 * - Non-integers retain enough precision to round-trip (up to ~3 sig figs).
 */
function formatSubThousand(n: number): string {
  if (Number.isInteger(n)) return n.toString()
  return format3SigFig(n)
}

function formatStandard(n: number): string {
  if (n === 0) return '0'
  if (!isFinite(n)) return String(n)
  const abs = Math.abs(n)
  if (abs < 1000) return formatSubThousand(n)

  const expFloor = Math.floor(Math.log10(abs))
  const idx = Math.floor(expFloor / 3) - 1 // 1000 → idx 0 → 'k'

  if (idx >= SUFFIXES.length) {
    return formatScientific(n)
  }

  const divisor = 10 ** ((idx + 1) * 3)
  const coefficient = n / divisor
  return format3SigFig(coefficient) + SUFFIXES[idx]
}

function formatScientific(n: number): string {
  if (n === 0) return '0'
  if (!isFinite(n)) return String(n)
  const abs = Math.abs(n)
  if (abs < 1000) return formatSubThousand(n)

  const expFloor = Math.floor(Math.log10(abs))
  const coefficient = n / 10 ** expFloor
  return format3SigFig(coefficient) + 'e' + expFloor
}

function formatEngineering(n: number): string {
  if (n === 0) return '0'
  if (!isFinite(n)) return String(n)
  const abs = Math.abs(n)
  if (abs < 1000) return formatSubThousand(n)

  const expFloor = Math.floor(Math.log10(abs))
  const engExp = Math.floor(expFloor / 3) * 3
  const coefficient = n / 10 ** engExp
  return format3SigFig(coefficient) + 'e' + engExp
}

export function formatStat(n: number, notation: Notation = 'standard'): string {
  switch (notation) {
    case 'scientific':  return formatScientific(n)
    case 'engineering': return formatEngineering(n)
    case 'standard':
    default:            return formatStandard(n)
  }
}

export function formatGold(n: number, notation: Notation = 'standard'): string {
  return formatStat(n, notation)
}

export function formatPercent(n: number): string {
  return n.toFixed(2) + '%'
}

export function formatMultiplier(n: number): string {
  return n.toFixed(2) + '×'
}

// ─── formatStatByKey ───────────────────────────────────────
// Adds a prefix or suffix to a formatted stat based on the stat's key.
// Only the affixes are added here; the numeric portion is delegated to formatStat.
// Order of resolution:
//   1. StatEntry.affix in stats/catalog.ts (per-stat override)
//   2. Suffix-pattern match against the key (fallback for uncatalogued keys)
//   3. Fallback: bare formatStat output

import { getStatAffix, type StatAffix } from './stats/catalog'

type Affix = StatAffix

// Kept for keys not catalogued yet. Order matters:
// longer/more-specific suffixes first to avoid partial matches.
const KEY_SUFFIX_RULES: ReadonlyArray<{ suffix: string; affix: Affix }> = [
  // Order matters: longer/more-specific suffixes first to avoid partial matches.
  { suffix: '_crit_damage', affix: { suffix: '×' } },
  { suffix: '_multiplier',  affix: { suffix: '×' } },
  { suffix: '_multipliers',  affix: { suffix: '×' } },
  { suffix: '_reduction',   affix: { suffix: '×' } },
  { suffix: '_increases',   affix: { prefix: '+' } },
  { suffix: '_increase',    affix: { prefix: '+' } },
  { suffix: '_capacity',    affix: { prefix: '+' } },
  { suffix: '_percent',     affix: { suffix: '%' } },
  { suffix: '_chance',      affix: { suffix: '%' } },
  { suffix: '_bonus',       affix: { prefix: '+' } },
  { suffix: '_multi',       affix: { suffix: '×' } },
  { suffix: '_cap',         affix: { prefix: '+' } },
  { suffix: '_rate',        affix: { suffix: '×' } },
  { suffix: 'recharge_speed', affix: { suffix: '×' } },
]

function resolveAffix(key: string): Affix {
  const exact = getStatAffix(key)
  if (exact) return exact
  for (const rule of KEY_SUFFIX_RULES) {
    if (key.endsWith(rule.suffix)) return rule.affix
  }
  return {}
}

export function formatStatByKey(
  key: string,
  value: number | undefined,
  notation: Notation = 'standard'
): string {
  if (value === undefined) return '—'
  const body = formatStat(value, notation)
  const { prefix = '', suffix = '' } = resolveAffix(key)
  return prefix + body + suffix
}

/**
 * Lenient inverse of formatStat. Accepts:
 *   - bare numbers: "431", "1234"
 *   - scientific:   "1.5e30", "1.5e+30", "1.5e-3"
 *   - suffix forms: "2.34no", "123m", "-1.5k"
 *   - case- and whitespace-insensitive, strips commas
 *
 * Returns null for unparseable input, unknown suffixes, non-finite results,
 * or a combination of explicit exponent and suffix.
 */
export function parseStat(s: string): number | null {
  const cleaned = s.toLowerCase().replace(/[\s,]/g, '')
  if (cleaned === '') return null

  const match = cleaned.match(/^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)([a-z]+)?$/)
  if (!match) return null

  const [, numericPart, suffix] = match
  const base = parseFloat(numericPart)
  if (!isFinite(base)) return null

  if (suffix === undefined) return base

  // Reject explicit-exponent + suffix combinations (e.g. "1.5e+3k").
  if (numericPart.includes('e')) return null

  const exp = SUFFIX_BY_NAME[suffix]
  if (exp === undefined) return null

  return base * 10 ** exp
}

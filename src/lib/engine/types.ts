/** A runtime value the engine needs that cannot be derived from upgrade levels alone. */
export interface RuntimeInput {
  key: string
  label: string
  type: 'integer' | 'number' | 'boolean'
  min?: number
  max?: number
}

/** One game upgrade, skill, item buff, or other contribution source. */
export interface Source {
  /** Globally unique dot-namespaced key, e.g. 'skillTree.completionistGatekeeper'. */
  key: string
  /** Human-readable display name for UI labels. */
  name: string
  /** Which game menu/system this source belongs to. */
  system: SourceSystem
  /** Maximum level. undefined = no cap. */
  maxLevel?: number
  /**
   * 'buff' marks binary item buffs: level 0 = inactive, level 1 = active.
   * Rendered as a checkbox in calculator UIs instead of a number input.
   */
  type?: 'buff'
  /**
   * Returns the numeric contribution for the given level and runtime inputs.
   * Must be a pure function — no side effects, no external state.
   */
  fn: (level: number, rt: Record<string, number>) => number
  /** Runtime inputs this source's fn depends on beyond its own level. */
  inputs: RuntimeInput[]
  /**
   * Effect metadata: which stat this source contributes to, and how.
   * Lets data pages (Store, Skills) display per-effect values straight from
   * the source — fn(level) formatted via the stat's registry unit — without
   * duplicating numbers in catalog files. Formulas still declare op
   * explicitly; a consistency test asserts they agree where both exist.
   */
  statKey?: string
  op?: Op
}

export type SourceSystem =
  | 'archaeology'
  | 'artifacts'
  | 'cards'
  | 'challenges'
  | 'construct'
  | 'contracts'
  | 'drones'
  | 'fishing'
  | 'items'
  | 'pets'
  | 'relics'
  | 'skillTree'
  | 'skins'
  | 'stargazing'
  | 'store'
  | 'tributes'
  | 'upgrades'
  | 'workshop'
  | 'worldquests'

/**
 * How a source contribution is combined into the stat total.
 *
 * Evaluation is GROUPED, not declaration-ordered (matches the in-game rule
 * "additive within a group, multiplicative across groups"):
 *
 *   result = (base + Σ '+' terms) × Π '×' factors × Π (1 + '×1+' terms)
 *
 * '+'  : added to the base                       additive
 * '×'  : multiplies the summed result            multiplicative factor
 * '×1+': multiplies by (1 + fn) — for sources    multiplicative bonus
 *        stored as a bonus fraction (e.g. +22% → fn returns 0.22)
 * '='  : replaces the base value (applied before any '+'); last '=' wins
 */
export type Op = '+' | '×' | '×1+' | '='

export interface Contribution {
  source: Source
  op: Op
  /**
   * true when the wiki marks this source with a '?' — formula partially unknown.
   * The engine skips unknown contributions. The UI shows a warning.
   */
  unknown?: boolean
}

export interface StatFormula {
  /** Starting value before any contributions are applied. */
  base: number
  contributions: Contribution[]
}

/**
 * A formula as declared in formulas/*.ts: contributions only.
 * The base value lives in stats/registry.ts (StatMeta.base) and is attached
 * by formulas/define.ts → defineFormulas().
 */
export type StatContributions = Pick<StatFormula, 'contributions'>

/**
 * Map of stat registry key → formula.
 * Keys must match entries in src/lib/stats/registry.ts exactly.
 */
export type FormulaMap = Record<string, StatFormula>

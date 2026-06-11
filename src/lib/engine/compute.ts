import type {
  Contribution,
  FormulaMap,
  FormulaTerm,
  RuntimeInput,
  Source,
  StatFormula,
} from './types'
import { isGroup } from './types'

/**
 * Grouped fold shared by whole formulas and group terms:
 *   result = (base + Σ adds) × Π factors × Π (1 + bonuses)
 * '=' replaces the base (last one wins). Unknown contributions are skipped.
 * Declaration order never changes the result.
 */
function evalTerms(
  base: number,
  terms: readonly FormulaTerm[],
  levels: Record<string, number>,
  rt: Record<string, number>,
): number {
  let b = base
  let sum = 0
  let factor = 1
  for (const term of terms) {
    let value: number
    const op = term.op
    if (isGroup(term)) {
      value = evalTerms(term.base, term.contributions, levels, rt)
    } else {
      if (term.unknown) continue
      value = term.source.fn(levels[term.source.key] ?? 0, rt)
    }
    if (op === '+') sum += value
    else if (op === '×') factor *= value
    else if (op === '×1+') factor *= 1 + value
    else if (op === '=') b = value
  }
  return (b + sum) * factor
}

/**
 * Compute a single stat value from a formula, levels, and runtime inputs.
 * Group terms — the wiki's "(A + B) × C" sub-formulas — are folded with the
 * same grouped semantics, then joined by their op.
 */
export function computeStat(
  formula: StatFormula,
  levels: Record<string, number>,
  rt: Record<string, number>,
): number {
  return evalTerms(formula.base, formula.contributions, levels, rt)
}

/** Flatten a formula's terms to plain contributions (group members included). */
export function flattenContributions(formula: StatFormula): Contribution[] {
  return formula.contributions.flatMap((t) => (isGroup(t) ? t.contributions : [t]))
}

/**
 * Collect all non-unknown sources a formula references, deduplicated by key.
 * Used by calculator UIs to render level input fields.
 */
export function getRequiredSources(formula: StatFormula): Source[] {
  const seen = new Set<string>()
  return flattenContributions(formula)
    .filter((c) => !c.unknown)
    .map((c) => c.source)
    .filter((s) => (seen.has(s.key) ? false : (seen.add(s.key), true)))
}

/**
 * Collect all runtime inputs declared by non-unknown sources, deduplicated by key.
 * Used by calculator UIs to render runtime input fields (e.g. "Legendary Fish Found").
 */
export function getRequiredRuntimeInputs(formula: StatFormula): RuntimeInput[] {
  const seen = new Set<string>()
  return flattenContributions(formula)
    .filter((c) => !c.unknown)
    .flatMap((c) => c.source.inputs)
    .filter((i) => (seen.has(i.key) ? false : (seen.add(i.key), true)))
}

/**
 * Returns true if any contribution in the formula is marked unknown.
 * Used by the UI to display a "some sources may be missing" warning.
 */
export function hasUnknownContributions(formula: StatFormula): boolean {
  return flattenContributions(formula).some((c) => c.unknown)
}

/**
 * Compute every stat in a FormulaMap in one pass.
 * Used by calculator pages that display multiple stats at once.
 */
export function computeAll(
  formulas: FormulaMap,
  levels: Record<string, number>,
  rt: Record<string, number>,
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(formulas).map(([key, f]) => [key, computeStat(f, levels, rt)]),
  )
}

/**
 * Collect all non-unknown sources across every formula in a map, deduplicated.
 * Use this when a calculator covers multiple stats (i.e. calls computeAll).
 */
export function getRequiredSourcesForMap(formulas: FormulaMap): Source[] {
  const seen = new Set<string>()
  return Object.values(formulas)
    .flatMap((f) => getRequiredSources(f))
    .filter((s) => (seen.has(s.key) ? false : (seen.add(s.key), true)))
}

/**
 * Collect all runtime inputs across every formula in a map, deduplicated.
 * Use this when a calculator covers multiple stats (i.e. calls computeAll).
 */
export function getRequiredRuntimeInputsForMap(formulas: FormulaMap): RuntimeInput[] {
  const seen = new Set<string>()
  return Object.values(formulas)
    .flatMap((f) => getRequiredRuntimeInputs(f))
    .filter((i) => (seen.has(i.key) ? false : (seen.add(i.key), true)))
}

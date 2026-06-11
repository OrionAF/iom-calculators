import type { FormulaMap, RuntimeInput, Source, StatFormula } from './types'

/**
 * Compute a single stat value from a formula, levels, and runtime inputs.
 * Contributions marked unknown are skipped.
 *
 * Evaluation is grouped (see Op in types.ts):
 *   result = (base + Σ adds) × Π factors × Π (1 + bonuses)
 * Declaration order never changes the result, so additive sources can be
 * listed in any position relative to multiplicative ones.
 */
export function computeStat(
  formula: StatFormula,
  levels: Record<string, number>,
  rt: Record<string, number>,
): number {
  let base = formula.base
  let sum = 0
  let factor = 1
  for (const { source, op, unknown } of formula.contributions) {
    if (unknown) continue
    const contribution = source.fn(levels[source.key] ?? 0, rt)
    if (op === '+') sum += contribution
    else if (op === '×') factor *= contribution
    else if (op === '×1+') factor *= 1 + contribution
    else if (op === '=') base = contribution
  }
  return (base + sum) * factor
}

/**
 * Collect all non-unknown sources a formula references, deduplicated by key.
 * Used by calculator UIs to render level input fields.
 */
export function getRequiredSources(formula: StatFormula): Source[] {
  const seen = new Set<string>()
  return formula.contributions
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
  return formula.contributions
    .filter((c) => !c.unknown)
    .flatMap((c) => c.source.inputs)
    .filter((i) => (seen.has(i.key) ? false : (seen.add(i.key), true)))
}

/**
 * Returns true if any contribution in the formula is marked unknown.
 * Used by the UI to display a "some sources may be missing" warning.
 */
export function hasUnknownContributions(formula: StatFormula): boolean {
  return formula.contributions.some((c) => c.unknown)
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

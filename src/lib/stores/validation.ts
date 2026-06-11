import { derived } from 'svelte/store'
import { stats } from './stats'
import { progressLevels } from './progress'
import { ALL_FORMULAS } from '$lib/formulas'
import { computeStat, hasUnknownContributions } from '$lib/engine/compute'

/**
 * Export ↔ formula cross-validation.
 *
 * For every stat that is BOTH in the imported game export AND has a formula,
 * compute the value from formulas + unified progress and compare. A large
 * relative error on a complete formula means either the formula is wrong or
 * the user's progress pages are out of date — both worth surfacing. This
 * turns every imported export into a regression test for the formula layer.
 */

export interface ValidationRow {
  key: string
  exported: number
  computed: number
  /** computed − exported */
  delta: number
  /** |delta| relative to the exported magnitude (0 when both are 0). */
  relativeError: number
  /**
   * Formula contains unknown contributions — the computed value is expected
   * to underestimate, so a mismatch here is informational, not alarming.
   */
  incomplete: boolean
}

export function validateAgainstExport(
  exported: Record<string, number>,
  levels: Record<string, number>,
  rt: Record<string, number> = {},
): ValidationRow[] {
  const rows: ValidationRow[] = []
  for (const [key, formula] of Object.entries(ALL_FORMULAS)) {
    const exportedValue = exported[key]
    if (exportedValue === undefined) continue
    const computed = computeStat(formula, levels, rt)
    const delta = computed - exportedValue
    const magnitude = Math.max(Math.abs(exportedValue), Math.abs(computed))
    rows.push({
      key,
      exported: exportedValue,
      computed,
      delta,
      relativeError: magnitude === 0 ? 0 : Math.abs(delta) / magnitude,
      incomplete: hasUnknownContributions(formula),
    })
  }
  // Worst disagreements first; matches sink to the bottom.
  return rows.sort((a, b) => b.relativeError - a.relativeError)
}

/** Rows whose disagreement exceeds the tolerance (default 1%). */
export function validationMismatches(rows: ValidationRow[], tolerance = 0.01): ValidationRow[] {
  return rows.filter((r) => r.relativeError > tolerance)
}

/**
 * Live validation against the currently imported export and current page
 * progress. Empty when no export has been imported.
 */
export const exportValidation = derived([stats, progressLevels], ([$stats, $levels]) =>
  $stats ? validateAgainstExport($stats.stats, $levels) : [],
)

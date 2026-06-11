import { derived } from 'svelte/store'
import { stats } from './stats'
import { progressLevels } from './progress'
import { ALL_FORMULAS } from '$lib/formulas'
import { computeStat, hasUnknownContributions } from '$lib/engine/compute'

/**
 * Stat resolution layer — the layering contract:
 *   1. exported value (game JSON import) when present  → provenance 'export'
 *   2. else computed from formulas + unified progress  → provenance 'computed'
 *   3. else                                            → 'unavailable'
 *
 * Calculators read this (or call resolveStat with extra runtime inputs);
 * they never read source files or page state directly.
 */

export type StatProvenance = 'export' | 'computed' | 'unavailable'

export interface ResolvedStat {
  value: number | undefined
  provenance: StatProvenance
  /**
   * true when the value was computed from a formula that has contributions
   * marked unknown — the result may underestimate the in-game value.
   */
  incomplete: boolean
}

export function resolveStat(
  key: string,
  exported: Record<string, number> | undefined,
  levels: Record<string, number>,
  rt: Record<string, number> = {},
): ResolvedStat {
  const fromExport = exported?.[key]
  if (fromExport !== undefined) {
    return { value: fromExport, provenance: 'export', incomplete: false }
  }
  const formula = ALL_FORMULAS[key]
  if (!formula) {
    return { value: undefined, provenance: 'unavailable', incomplete: false }
  }
  return {
    value: computeStat(formula, levels, rt),
    provenance: 'computed',
    incomplete: hasUnknownContributions(formula),
  }
}

/**
 * Every stat the app knows about, resolved. Covers all formula keys plus any
 * exported keys without formulas (export-only stats still resolve).
 */
export const resolvedStats = derived([stats, progressLevels], ([$stats, $levels]) => {
  const exported = $stats?.stats
  const out: Record<string, ResolvedStat> = {}
  for (const key of Object.keys(ALL_FORMULAS)) {
    out[key] = resolveStat(key, exported, $levels)
  }
  if (exported) {
    for (const [key, value] of Object.entries(exported)) {
      if (!out[key]) out[key] = { value, provenance: 'export', incomplete: false }
    }
  }
  return out
})

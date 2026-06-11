import type { FormulaMap, StatContributions } from '$lib/engine/types'
import { STAT_REGISTRY } from '$lib/stats/registry'

/**
 * Build a FormulaMap from contribution declarations.
 * Each stat's base value comes from stats/registry.ts (StatMeta.base, default 0)
 * so the registry stays the single source of truth for starting values.
 */
export function defineFormulas(map: Record<string, StatContributions>): FormulaMap {
  return Object.fromEntries(
    Object.entries(map).map(([key, { contributions }]) => [
      key,
      { base: STAT_REGISTRY[key]?.base ?? 0, contributions },
    ]),
  )
}

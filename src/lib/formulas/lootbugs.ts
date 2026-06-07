import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const lootbugsFormulas = {
  lootbug_spawn_rate:        { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_triple_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_golden_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_bank_cap:          { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_gem_cost_reduction:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Lootbug Loot Multiplier: base = 1
  lootbug_loot_multi:        { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Lanterns Used: counter only
  lootfrog_lanterns_used:    { base: 0, contributions: [] },
} satisfies FormulaMap

import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const lootfrogsFormulas = {
  // Counters — no sources, just totals
  lootfrogs_caught:          { base: 0, contributions: [] },
  golden_lootfrogs_caught:   { base: 0, contributions: [] },
  // Lootfrog Capacity: base = 5 (wiki: "Base: 5")
  lootfrog_capacity:         { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  // Lootfrog Loot Multi: base = 1
  lootfrog_loot_multi:       { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_golden_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Golden Lootfrog Multi: base = 2 (wiki: "Base: 2x")
  lootfrog_golden_multi:     { base: 2, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_triple_spawn_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_10x_spawn_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_big_chance:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Big Lootfrog Multi: base = 5 (wiki: "Base: 5x")
  lootfrog_big_multi:        { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

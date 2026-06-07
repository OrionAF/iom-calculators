import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const lootfrogsFormulas = {
  lootfrogs_caught:        { base: 0, contributions: [] },
  golden_lootfrogs_caught: { base: 0, contributions: [] },
  lootfrog_capacity: {
    base: 5,
    contributions: [
      { source: sk.frogFrenzyLootfrogCap, op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Cards
    ],
  },
  lootfrog_loot_multi:     { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_golden_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_golden_multi:   { base: 2, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_triple_spawn_chance: {
    base: 0,
    contributions: [
      { source: sk.frogFrenzyTripleLootfrog, op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Pets + Contracts
    ],
  },
  lootfrog_10x_spawn_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_big_chance:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_big_multi:        { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

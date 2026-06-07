import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { workshopSources as ws } from '$lib/sources/workshop'
import { contractSources as ct } from '$lib/sources/contracts'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const lootfrogsFormulas = {
  lootfrogs_caught:        { base: 0, contributions: [] },
  golden_lootfrogs_caught: { base: 0, contributions: [] },
  lootfrog_capacity: {
    base: 5,
    contributions: [
      { source: sk.frogFrenzyLootfrogCap,         op: '+' },
      { source: card.cardLootfrog,                op: '+' },
      { source: st.vpFrogFrenzyCapacity,          op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  lootfrog_loot_multi: {
    base: 1,
    contributions: [
      { source: ws.wsLootfrogLootW4,              op: '+' },
      { source: st.vpFrogFrenzyLootfrogMul,       op: '×' },
      { source: U, op: '+', unknown: true },      // Workshop + Cards + Upgrades
    ],
  },
  lootfrog_golden_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_golden_multi:   { base: 2, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_triple_spawn_chance: {
    base: 0,
    contributions: [
      { source: sk.frogFrenzyTripleLootfrog,      op: '+' },
      { source: pet.petButterflyLootfrogTriple,   op: '+' },
      { source: ct.ctLootfrogTriple,              op: '+' },
      { source: st.vpFrogFrenzyTriple,            op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  lootfrog_10x_spawn_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_big_chance:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootfrog_big_multi:        { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

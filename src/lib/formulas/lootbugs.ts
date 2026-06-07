import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const lootbugsFormulas = {
  lootbug_spawn_rate:        { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_triple_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_golden_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_bank_cap: {
    base: 0,
    contributions: [
      { source: sk.savingForARainyDayLootbugCap, op: '+' },
      { source: sk.anyoneUpLootinBankCap,        op: '+' },
      { source: U, op: '+', unknown: true },  // Items + Store + Pets + Stargazing + Construct + Archaeology + Fishing + Skins
    ],
  },
  lootbug_gem_cost_reduction: {
    base: 0,
    contributions: [
      { source: sk.savingForARainyDayLootbugGem, op: '+' },
      { source: U, op: '+', unknown: true },  // Pets + Skins
    ],
  },
  lootbug_loot_multi: {
    base: 1,
    contributions: [
      { source: sk.anyoneUpLootinLootMulti, op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Cards + Stargazing + Archaeology + Fishing
    ],
  },
  lootfrog_lanterns_used: { base: 0, contributions: [] },
} satisfies FormulaMap

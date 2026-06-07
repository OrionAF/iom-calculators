import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { itemSources as it } from '$lib/sources/items'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const lootbugsFormulas = {
  lootbug_spawn_rate: {
    base: 0,
    contributions: [
      { source: it.lootbugLanternSpawn, op: '×' },
      { source: U, op: '+', unknown: true }, // Drones + Items (Bread+Eros) + Challenges + Cards + Pets + Stargazing + Upgrades
    ],
  },
  lootbug_triple_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  lootbug_golden_chance: {
    base: 0,
    contributions: [
      { source: st.founderGoldenLootbug,          op: '+' },
      { source: st.vpGoldenLootbug,               op: '+' },
      { source: U, op: '+', unknown: true },      // Stargazing: Aquarius + Cards
    ],
  },
  lootbug_bank_cap: {
    base: 0,
    contributions: [
      { source: sk.savingForARainyDayLootbugCap,  op: '+' },
      { source: sk.anyoneUpLootinBankCap,         op: '+' },
      { source: it.lootbugLanternPermCap,         op: '+' },
      { source: st.vpBankersLootbugBank,          op: '+' },
      { source: st.vpBiggerBankersLootbugBank,    op: '+' },
      { source: st.vpLootbugBonanzaBankCap,       op: '+' },
      { source: U, op: '+', unknown: true },      // Pets + Stargazing + Construct + Archaeology + Fishing + Skins
    ],
  },
  lootbug_gem_cost_reduction: {
    base: 0,
    contributions: [
      { source: sk.savingForARainyDayLootbugGem, op: '+' },
      { source: U, op: '+', unknown: true },     // Pets + Skins
    ],
  },
  lootbug_loot_multi: {
    base: 1,
    contributions: [
      { source: sk.anyoneUpLootinLootMulti,       op: '+' },
      { source: st.vpLootbugBonanzaLootMul,       op: '×' },
      { source: U, op: '+', unknown: true },      // Store + Cards + Stargazing + Archaeology + Fishing
    ],
  },
  lootfrog_lanterns_used: { base: 0, contributions: [] },
} satisfies FormulaMap

import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const veinsFormulas = {
  vein_spawn_rate_multi: {
    base: 1,
    contributions: [
      { source: st.vpPetTrainerVeinSpawn, op: '×' },
      { source: U, op: '+', unknown: true },  // Prestige + Drones + Store + Cards + Pets + Construct + Stargazing
    ],
  },
  vein_income_multi: {
    base: 1,
    contributions: [
      { source: sk.leprechaunsLegacyVeinIncome,  op: '×' },
      { source: it.iceCreamSuperStarSpawn,       op: '×' },  // note: also affects super star spawn
      { source: rel.legendaryRelicVeinIncome,    op: '+' },
      { source: st.vpVeinExtractorVeinIncome,    op: '×' },
      { source: st.vpProgressionVeinIncome,      op: '×' },
      { source: U, op: '+', unknown: true },     // Items (Strawberries+Demeter Idol) + Cards + Pets + Upgrades + Contracts + Floors
    ],
  },
  golden_vein_chance: {
    base: 0,
    contributions: [
      { source: st.vpVeinExtractorGoldenVeinChance, op: '+' },
      { source: U, op: '+', unknown: true },    // Store + Pets + Construct + Stargazing + Upgrades + Contracts
    ],
  },
  golden_vein_multi: {
    base: 5,
    contributions: [
      { source: st.vpVeinExtractorGoldenVeinMul, op: '×' },
      { source: U, op: '+', unknown: true },    // Drones + Items + Store + Challenges + Cards + Pets + Fishing + Upgrades
    ],
  },
  rainbow_vein_chance: {
    base: 0,
    contributions: [
      { source: st.vpVeinExtractorRainbowVeinChance, op: '+' },
      { source: U, op: '+', unknown: true },    // Store + Pets + Construct + Stargazing + Upgrades + Contracts + Floors
    ],
  },
  rainbow_vein_multi: {
    base: 20,
    contributions: [
      { source: sk.insaneInTheVeinGainRainbowVein, op: '+' },
      { source: U, op: '+', unknown: true },    // Cards + Fishing + Upgrades
    ],
  },
  gleaming_vein_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  gleaming_vein_multi:   { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

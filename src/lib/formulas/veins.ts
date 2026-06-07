import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const veinsFormulas = {
  vein_spawn_rate_multi: {
    base: 1,
    contributions: [
      { source: con.staRandomnessVeinSpawn,        op: '+' },
      { source: art.artVeinSpawnT4,                op: '+' },
      { source: pet.petTotemVeinSpawn,             op: '+' },
      { source: st.vpPetTrainerVeinSpawn,          op: '×' },
      { source: U, op: '+', unknown: true },  // Prestige + Drones + Store + Cards + Pets + Stargazing
    ],
  },
  vein_income_multi: {
    base: 1,
    contributions: [
      { source: sk.leprechaunsLegacyVeinIncome,    op: '×' },
      { source: it.iceCreamSuperStarSpawn,         op: '×' },  // also affects super star spawn
      { source: rel.legendaryRelicVeinIncome,      op: '+' },
      { source: pet.petDuckQuestVeinIncome,        op: '+' },
      { source: ct.ctVeinIncomeW2,                 op: '+' },
      { source: st.vpVeinExtractorVeinIncome,      op: '×' },
      { source: st.vpProgressionVeinIncome,        op: '×' },
      { source: U, op: '+', unknown: true },  // Items (Strawberries+Demeter Idol) + Cards + Pets + Upgrades + Contracts + Floors
    ],
  },
  golden_vein_chance: {
    base: 0,
    contributions: [
      { source: con.staRandomnessGoldenVeinChance, op: '+' },
      { source: pet.petTotemGoldenVeinChance,      op: '+' },
      { source: ct.ctGoldenVeinChance,             op: '+' },
      { source: st.vpVeinExtractorGoldenVeinChance, op: '+' },
      { source: U, op: '+', unknown: true },   // Pets + Construct + Stargazing + Upgrades + Contracts
    ],
  },
  golden_vein_multi: {
    base: 5,
    contributions: [
      { source: it.goldenStrawberriesGoldenVein,   op: '+' },
      { source: rel.legendaryRelicVeinIncome,      op: '+' },
      { source: con.staPropGoldenVeinMul,          op: '×' },
      { source: pet.petTotemGoldenVeinMul,         op: '+' },
      { source: pet.petDuckQuestGoldenVeinMul,     op: '+' },
      { source: ch.chGoldenVeinMul,                op: '+' },
      { source: card.cardGoldenVein,               op: '×' },
      { source: st.vpVeinExtractorGoldenVeinMul,   op: '×' },
      { source: U, op: '+', unknown: true },   // Drones + Items + Store + Cards + Fishing + Upgrades
    ],
  },
  rainbow_vein_chance: {
    base: 0,
    contributions: [
      { source: ct.ctRainbowVeinMul,               op: '+' },  // note: W4 contract is +multi but wiki labels as chance
      { source: st.vpVeinExtractorRainbowVeinChance, op: '+' },
      { source: U, op: '+', unknown: true },   // Store + Pets + Construct + Stargazing + Upgrades + Contracts + Floors
    ],
  },
  rainbow_vein_multi: {
    base: 20,
    contributions: [
      { source: sk.insaneInTheVeinGainRainbowVein, op: '+' },
      { source: card.cardRainbowVein,              op: '×' },
      { source: U, op: '+', unknown: true },   // Cards + Fishing + Upgrades
    ],
  },
  gleaming_vein_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  gleaming_vein_multi:   { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

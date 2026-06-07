import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const oresFormulas = {
  multi_rock_chance: {
    base: 0,
    contributions: [
      { source: it.eyeOfNewtTripleRock,          op: '+' },
      { source: it.goldenEyeOfNewtTripleRock,    op: '+' },
      { source: rel.rareRelicTripleRock,        op: '+' },
      { source: U, op: '+', unknown: true },    // Upgrades: Mithril Bar
    ],
  },
  ore_sell_price_multi: {
    base: 1,
    contributions: [
      { source: sk.easyProgressorOreSell,       op: '+' },
      { source: sk.iHaveWaresOreSell,           op: '×' },
      { source: sk.polychromePowerOreSell,      op: '×' },
      { source: rel.commonRelicOreSell,         op: '+' },
      { source: st.gemOreSellPrice,             op: '×' },
      { source: st.vpBallerOreSell,             op: '×' },
      { source: U, op: '+', unknown: true },    // Challenges + Cards + Pets + Upgrades + Contracts + Skins
    ],
  },
  ore_income_multi: {
    base: 1,
    contributions: [
      { source: st.perkOreIncome,              op: '×' },
      { source: U, op: '×', unknown: true },   // Drones Elixir (×)
    ],
  },
  golden_ore_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGoldenOre,     op: '+' },
      { source: it.lasagnaGoldenOreChance,     op: '+' },
      { source: st.vpGoldenOreChance,          op: '+' },
      { source: U, op: '+', unknown: true },   // Store: Golden Ore Bundle + Challenges + Pets + Construct + Stargazing + Contracts
    ],
  },
  golden_ore_multi: {
    base: 3,
    contributions: [
      { source: it.lasagnaGoldenOreMul,          op: '×' },
      { source: it.goldFlakeSteakBuff,           op: '×' },
      { source: it.goldFlakeSteakPerm,           op: '+' },
      { source: it.goldenStrawberriesGoldenVein, op: '+' },
      { source: st.vpGoldenOreMul,             op: '×' },
      { source: U, op: '+', unknown: true },   // Store + Cards + Pets + Construct + Stargazing + Upgrades
    ],
  },
  golden_floor_chance: {
    base: 0,
    contributions: [
      { source: rel.mythicRelicGoldenFloorChance, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  golden_floor_multi: {
    base: 5,
    contributions: [
      { source: sk.perfectGoldGoldenFloor,          op: '+' },
      { source: sk.iHaveWaresGoldenFloor,           op: '+' },
      { source: sk.leprechaunsLegacyGoldenFloor,    op: '×' },
      { source: it.yummyPizzaGoldenFloor,             op: '×' },
      { source: it.goldenYummyPizzaGoldenFloor,       op: '×' },
      { source: it.goldenEyeOfNewtGoldenFloor,        op: '×' },
      { source: rel.epicRelicGoldenFloor,           op: '+' },
      { source: st.vpProgressionGoldenFloor,        op: '×' },
      { source: U, op: '+', unknown: true },        // Drones + Items (Eye of Newt+Iris) + Challenges + Cards + Pets + Stargazing + Fishing + Upgrades + Contracts
    ],
  },
  rainbow_floor_chance: {
    base: 0,
    contributions: [
      { source: sk.opticalPhenomenonRainbowFloor,   op: '+' },
      { source: sk.imRunningOutRainbowFloor,        op: '+' },
      { source: it.rainbowLollipopChance,             op: '+' },
      { source: it.goldenRainbowLollipopChance,       op: '+' },
      { source: rel.divineRelicRainbowFloor,        op: '+' },
      { source: st.founderRainbowFloor,             op: '+' },
      { source: st.vpPetTrainerRainbowFloor,        op: '+' },
      { source: U, op: '+', unknown: true },        // Items + Store + Pets + Construct + Fishing + Contracts + Floors
    ],
  },
  rainbow_floor_multi: {
    base: 50,
    contributions: [
      { source: it.rainbowLollipopMul,                op: '×' },
      { source: it.goldenRainbowLollipopMul,          op: '×' },
      { source: rel.divineRelicRainbowFloorMul,     op: '+' },
      { source: st.vpHalfWayRainbowFloorMul,        op: '×' },
      { source: U, op: '+', unknown: true },        // Items + Relics + Store + Challenges + Cards + Pets + Stargazing + Fishing + Upgrades + Contracts
    ],
  },
  galactic_floor_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGalacticFloor,      op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  galactic_floor_multi:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prismatic_floor_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prismatic_floor_multi: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pizzas_eaten:          { base: 0, contributions: [] },
  steak_eaten:           { base: 0, contributions: [] },
  all_floor_multipliers: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

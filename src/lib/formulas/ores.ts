import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const oresFormulas = {
  multi_rock_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  ore_sell_price_multi: {
    base: 1,
    contributions: [
      { source: sk.easyProgressorOreSell,   op: '+' },
      { source: sk.iHaveWaresOreSell,       op: '×' },
      { source: sk.polychromePowerOreSell,  op: '×' },
      { source: U, op: '+', unknown: true },  // Prestige + Relics + Store + Challenges + Cards + Pets + Upgrades + Contracts + Skins
    ],
  },
  ore_income_multi: {
    base: 1,
    contributions: [
      { source: U, op: '×', unknown: true },  // Store Perk + Drones Elixir
    ],
  },
  golden_ore_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGoldenOre, op: '+' },
      { source: U, op: '+', unknown: true },  // Items + Store + Challenges + Pets + Construct + Stargazing + Contracts
    ],
  },
  golden_ore_multi: {
    base: 3,
    contributions: [
      { source: U, op: '+', unknown: true },  // Items + Store + Cards + Pets + Construct + Stargazing + Upgrades
    ],
  },
  golden_floor_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  golden_floor_multi: {
    base: 5,
    contributions: [
      { source: sk.perfectGoldGoldenFloor,        op: '+' },
      { source: sk.iHaveWaresGoldenFloor,         op: '+' },
      { source: sk.leprechaunsLegacyGoldenFloor,  op: '×' },
      { source: U, op: '+', unknown: true },  // Drones + Items + Store + Challenges + Cards + Pets + Stargazing + Fishing + Upgrades + Contracts
    ],
  },
  rainbow_floor_chance: {
    base: 0,
    contributions: [
      { source: sk.opticalPhenomenonRainbowFloor, op: '+' },
      { source: sk.imRunningOutRainbowFloor,      op: '+' },
      { source: U, op: '+', unknown: true },  // Items + Relics + Store + Pets + Construct + Fishing + Contracts + Floors
    ],
  },
  rainbow_floor_multi: {
    base: 50,
    contributions: [
      { source: U, op: '+', unknown: true },  // Items + Relics + Store + Challenges + Cards + Pets + Stargazing + Fishing + Upgrades + Contracts
    ],
  },
  galactic_floor_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGalacticFloor, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  galactic_floor_multi: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prismatic_floor_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prismatic_floor_multi:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pizzas_eaten:         { base: 0, contributions: [] },
  steak_eaten:          { base: 0, contributions: [] },
  all_floor_multipliers:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

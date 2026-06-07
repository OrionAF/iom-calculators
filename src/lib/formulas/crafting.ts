import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const craftingFormulas = {
  free_craft_chance:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  double_craft_chance: {
    base: 0,
    contributions: [
      { source: sk.oreEfficiencyDoubleCraft, op: '+' },
      { source: U, op: '+', unknown: true },  // Challenges + Pets + Upgrades
    ],
  },
  triple_craft_chance: {
    base: 0,
    contributions: [
      { source: sk.heftyHammersTripleCraft, op: '+' },
      { source: U, op: '+', unknown: true },  // Prestige + Upgrades + Contracts
    ],
  },
  craft_5x_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  craft_10x_chance: {
    base: 0,
    contributions: [
      { source: sk.heftyHammers10xCraft,     op: '+' },
      { source: sk.imRunningOut10xCraft,     op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Fishing + Upgrades + Contracts
    ],
  },
  craft_20x_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  craft_100x_chance:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bar_output_multi:    { base: 1, contributions: [{ source: U, op: '×', unknown: true }] },
  bar_upgrade_cost_reduction: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bar_craft_cost_multi: {
    base: 1,
    contributions: [
      { source: sk.imRunningOutBarCraft,        op: '+' },
      { source: sk.moreOreMoreProblemsBarCraft, op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Challenges + Cards + Pets + Stargazing
    ],
  },
} satisfies FormulaMap

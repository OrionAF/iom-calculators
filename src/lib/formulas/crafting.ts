import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const craftingFormulas = {
  free_craft_chance:          { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  double_craft_chance:        { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  triple_craft_chance:        { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  craft_5x_chance:            { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  craft_10x_chance:           { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  craft_20x_chance:           { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  craft_100x_chance:          { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Bar Output Multiplier: base = 1
  bar_output_multi:           { base: 1, contributions: [{ source: U, op: '×', unknown: true }] },
  // Bar Upgrade Cost Reduction: base = 0 (additive reduction)
  bar_upgrade_cost_reduction: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Bar Craft Cost: base = 1 (multiplier on ore required)
  bar_craft_cost_multi:       { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

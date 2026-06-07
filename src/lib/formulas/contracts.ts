import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const contractsFormulas = {
  contract_cost_reduction:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  contract_double_points_chance:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  contract_triple_points_chance:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  contract_5x_points_chance:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  contract_10x_points_chance:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Contract Points Rewarded: base = 10 (wiki: "Starts at 10")
  contract_points_rewarded:        { base: 10, contributions: [{ source: U, op: '+', unknown: true }] },
  contract_cap_increase:           { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Contract Upgrade Cost Reduction: base = 1 (multiplier on cost)
  contract_upgrade_cost_reduction: { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

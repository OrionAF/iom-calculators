import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const contractsFormulas = {
  contract_cost_reduction:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  contract_double_points_chance: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },  // Stargazing: Cancer + Super Star
    ],
  },
  contract_triple_points_chance: {
    base: 0,
    contributions: [
      { source: sk.whosAskingTripleContract, op: '+' },
      { source: U, op: '+', unknown: true },  // Construct + Upgrades + Skins
    ],
  },
  contract_5x_points_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  contract_10x_points_chance: {
    base: 0,
    contributions: [
      { source: sk.pleaseSirContract10x, op: '+' },
      { source: U, op: '+', unknown: true },  // Cards + Construct + Archaeology + Fishing
    ],
  },
  contract_points_rewarded: {
    base: 10,
    contributions: [
      { source: sk.whosAskingContractPoints, op: '+' },
      { source: U, op: '+', unknown: true },  // Cards + Pets
    ],
  },
  contract_cap_increase: {
    base: 0,
    contributions: [
      { source: sk.idleObeliskMincerContractCap, op: '+' },
      { source: U, op: '+', unknown: true },  // Pets + Construct + Archaeology
    ],
  },
  contract_upgrade_cost_reduction: { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

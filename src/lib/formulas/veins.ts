import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const veinsFormulas = {
  vein_spawn_rate_multi: { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  vein_income_multi: {
    base: 1,
    contributions: [
      { source: sk.leprechaunsLegacyVeinIncome, op: '×' },
      { source: U, op: '+', unknown: true },  // Items + Relics + Cards + Pets + Upgrades + Contracts + Floors
    ],
  },
  golden_vein_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  golden_vein_multi:     { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_vein_chance:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_vein_multi: {
    base: 20,
    contributions: [
      { source: sk.insaneInTheVeinGainRainbowVein, op: '+' },
      { source: U, op: '+', unknown: true },  // Cards + Fishing + Upgrades
    ],
  },
  gleaming_vein_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  gleaming_vein_multi:   { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

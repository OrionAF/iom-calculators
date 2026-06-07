import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const veinsFormulas = {
  // Vein Spawn Rate Multiplier: base = 1
  vein_spawn_rate_multi: { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Vein Income Multiplier: base = 1
  vein_income_multi:     { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  golden_vein_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Golden Vein Multiplier: base = 5 (wiki: "Base: 5x")
  golden_vein_multi:     { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_vein_chance:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Rainbow Vein Multiplier: base = 20 (wiki: "Base: 20x")
  rainbow_vein_multi:    { base: 20, contributions: [{ source: U, op: '+', unknown: true }] },
  gleaming_vein_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Gleaming Vein Multiplier: base = 5 (wiki: "Base: 5x")
  gleaming_vein_multi:   { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

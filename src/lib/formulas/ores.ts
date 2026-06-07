import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const oresFormulas = {
  multi_rock_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Ore Sell Price Multiplier: base = 1
  ore_sell_price_multi: { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Ore Income Multiplier: base = 1 (Store Perk, Drones Elixir)
  ore_income_multi:     { base: 1, contributions: [{ source: U, op: '×', unknown: true }] },
  golden_ore_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Golden Ore Multiplier: base = 3 (wiki: "Base: 3x")
  golden_ore_multi:     { base: 3, contributions: [{ source: U, op: '+', unknown: true }] },
  golden_floor_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Golden Floor Multiplier: base = 5 (wiki: "Base: 5x")
  golden_floor_multi:   { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_floor_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Rainbow Floor Multiplier: base = 50 (wiki: "Base: 50x")
  rainbow_floor_multi:  { base: 50, contributions: [{ source: U, op: '+', unknown: true }] },
  galactic_floor_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  galactic_floor_multi: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prismatic_floor_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prismatic_floor_multi:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Counters — no calculation
  pizzas_eaten:         { base: 0, contributions: [] },
  steak_eaten:          { base: 0, contributions: [] },
  // All Floor Multipliers: additive bonus to all floor multi stats
  all_floor_multipliers:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

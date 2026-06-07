import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const chestsFormulas = {
  chest_double_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Chest Meter Gain Multiplier: base = 1
  chest_meter_multi:       { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  chest_items_bonus:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  freebie_gems_bonus:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  freebie_5x_chance:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  freebie_refresh_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Banked Freebie Cap: base = 2 (wiki: "Base: 2")
  freebie_bank_cap:        { base: 2, contributions: [{ source: U, op: '+', unknown: true }] },
  // Freebie Cooldown: base = 600 seconds (10 minutes)
  freebie_cooldown_seconds:{ base: 600, contributions: [{ source: U, op: '+', unknown: true }] },
  stonks_chance:           { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Stonks Freebie Multiplier: base = 1
  stonks_multi:            { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  super_stonks_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Super Stonks Multiplier: base = 2 (wiki: "Base: 2x")
  super_stonks_multi:      { base: 2, contributions: [{ source: U, op: '+', unknown: true }] },
  ultra_stonks_chance:     { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Ultra Stonks Multiplier: base = 25 (wiki: "Base: 25x")
  ultra_stonks_multi:      { base: 25, contributions: [] },
} satisfies FormulaMap

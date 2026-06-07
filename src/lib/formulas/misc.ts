import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const miscFormulas = {
  // Game Speed Multiplier: base = 1 (Items×, Store×, Pets, Stargazing, Upgrades, Contracts, Floors)
  game_speed_multi:           { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Item Duration Multiplier: base = 1
  item_duration_multi:        { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Gem Upgrade Cap Increase: base = 0 additive
  gem_upgrade_cap_increase:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Pet Level Up Chance Multiplier: base = 0 additive
  pet_levelup_chance_multi:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

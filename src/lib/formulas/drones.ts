import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'drones', fn: () => 0, inputs: [] }

export const dronesFormulas = {
  drone_count:                { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_damage_percent:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_radius_percent:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_movespeed_percent:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_attack_speed_percent: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_triple_damage_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_rapid_fire_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Drone Suit Upgrade Cap: base = 5 (wiki: "The base cap is 5")
  drone_suit_cap:             { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  // Coal Generation Time: base = 90s (wiki: "Base is 90 seconds")
  coal_generation_seconds:    { base: 90, contributions: [{ source: U, op: '+', unknown: true }] },
  // Coal Fuel Duration: base = 1 (multiplier)
  coal_fuel_duration_multi:   { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Coal Capacity: base = 1 (multiplier)
  coal_capacity_multi:        { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  coal_fuel_save_chance:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Coal Drone Exp: base = 1 (multiplier)
  coal_drone_exp_multi:       { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  void_portal_chance:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Void Portal Base Multiplier: base = 1
  void_portal_base_multi:     { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  golden_void_portal_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Golden Void Portal Multi: base = 5 (wiki: "Base: 5x")
  golden_void_portal_multi:   { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_void_portal_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Rainbow Void Portal Multi: base = 5 (wiki: "Base: 5x")
  rainbow_void_portal_multi:  { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  elixir_crit_chance:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Elixir Crit Multi: base = 3 (wiki: "Base 3x")
  elixir_crit_multi:          { base: 3, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

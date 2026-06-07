import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'drones', fn: () => 0, inputs: [] }

export const dronesFormulas = {
  drone_count:                { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_damage_percent:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_radius_percent:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_movespeed_percent:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_attack_speed_percent: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_triple_damage_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_rapid_fire_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_suit_cap: {
    base: 5,
    contributions: [
      { source: sk.mechanicalEvolutionSuitCap, op: '+' },
      { source: U, op: '+', unknown: true },  // Coal Upgrade
    ],
  },
  coal_generation_seconds: {
    base: 90,
    contributions: [
      { source: sk.gasolineGuzzlerCoalTime, op: '+' },
      { source: U, op: '+', unknown: true },  // Coal Upgrade + Elixir Drone
    ],
  },
  coal_fuel_duration_multi: {
    base: 1,
    contributions: [
      { source: sk.gasolineGuzzlerFuelDuration, op: '+' },
      { source: U, op: '+', unknown: true },  // Coal Upgrade + Relics + Store + Cards + Pets + Upgrades + Construct
    ],
  },
  coal_capacity_multi: {
    base: 1,
    contributions: [
      { source: sk.gasolineGuzzlerCoalCap, op: '+' },
      { source: U, op: '+', unknown: true },  // Coal Upgrade + Cards
    ],
  },
  coal_fuel_save_chance:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  coal_drone_exp_multi:       { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  void_portal_chance:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  void_portal_base_multi: {
    base: 1,
    contributions: [
      { source: sk.callOfTheVoidPortalMulti, op: '+' },
      { source: U, op: '+', unknown: true },  // Coal Upgrade + Store + Cards
    ],
  },
  golden_void_portal_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGoldenVoidChance, op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Pets + Fishing + Upgrades + Contracts
    ],
  },
  golden_void_portal_multi:   { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_void_portal_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_void_portal_multi:  { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  elixir_crit_chance:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  elixir_crit_multi:          { base: 3, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

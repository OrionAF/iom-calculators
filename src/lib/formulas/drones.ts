import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { storeSources as st } from '$lib/sources/store'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'drones', fn: () => 0, inputs: [] }

export const dronesFormulas = {
  drone_count:                { base: 0, contributions: [{ source: st.vpDroneCount, op: '+' }, { source: U, op: '+', unknown: true }] },
  drone_damage_percent:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_radius_percent:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_movespeed_percent:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_attack_speed_percent: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_triple_damage_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_rapid_fire_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  drone_suit_cap: {
    base: 5,
    contributions: [
      { source: sk.mechanicalEvolutionSuitCap,       op: '+' },
      { source: U, op: '+', unknown: true },         // Coal Upgrade
    ],
  },
  coal_generation_seconds: {
    base: 90,
    contributions: [
      { source: sk.gasolineGuzzlerCoalTime,          op: '+' },
      { source: U, op: '+', unknown: true },         // Coal Upgrade + Elixir Drone
    ],
  },
  coal_fuel_duration_multi: {
    base: 1,
    contributions: [
      { source: sk.gasolineGuzzlerFuelDuration,      op: '+' },
      { source: rel.rareRelicFuelDuration,           op: '+' },
      { source: st.vpDroneCatalystFuel,              op: '×' },
      { source: st.vpVoidOverdriveFuel,              op: '×' },
      { source: U, op: '+', unknown: true },         // Coal Upgrade + Cards + Pets + Upgrades + Construct
    ],
  },
  coal_capacity_multi: {
    base: 1,
    contributions: [
      { source: sk.gasolineGuzzlerCoalCap,           op: '+' },
      { source: U, op: '+', unknown: true },         // Coal Upgrade + Cards
    ],
  },
  coal_fuel_save_chance:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  coal_drone_exp_multi: {
    base: 1,
    contributions: [
      { source: st.vpDroneCatalystExp,               op: '×' },
      { source: U, op: '+', unknown: true },         // Coal Upgrade + Cards + Pets + Archaeology + Skins
    ],
  },
  void_portal_chance:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  void_portal_base_multi: {
    base: 1,
    contributions: [
      { source: sk.callOfTheVoidPortalMulti,         op: '+' },
      { source: st.vpVoidOverdriveVoidMul,           op: '×' },
      { source: U, op: '+', unknown: true },         // Coal Upgrade + Cards
    ],
  },
  golden_void_portal_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGoldenVoidChance,    op: '+' },
      { source: st.vpVoidOverdriveGoldenPortalChance, op: '+' },
      { source: U, op: '+', unknown: true },         // Pets + Fishing + Upgrades + Contracts
    ],
  },
  golden_void_portal_multi: {
    base: 5,
    contributions: [
      { source: st.vpVoidOverdriveGoldenPortalMul,   op: '×' },
      { source: U, op: '+', unknown: true },         // Cards + Pets + Archaeology + Fishing
    ],
  },
  rainbow_void_portal_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  rainbow_void_portal_multi:  { base: 5, contributions: [{ source: U, op: '+', unknown: true }] },
  elixir_crit_chance:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  elixir_crit_multi:          { base: 3, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

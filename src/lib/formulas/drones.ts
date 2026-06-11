import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { cardSources as card } from '$lib/sources/cards'
import { droneSources as drone } from '$lib/sources/drones'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'drones', fn: () => 0, inputs: [] }

export const dronesFormulas = {
  drone_count: {
    base: 0,
    contributions: [
      { source: st.vpDroneCount, op: '+' },
      { source: sk.threesACrowdDrone, op: '+' },
      { source: U, op: '+', unknown: true },   // Fishing Cthulhu T2 + Blackened Basker T2
    ],
  },
  drone_damage_percent:       { base: 0, contributions: [{ source: drone.droneUpgradeDamage, op: '+' }] },
  drone_radius_percent:       { base: 0, contributions: [{ source: drone.droneUpgradeRadius, op: '+' }] },
  drone_movespeed_percent:    { base: 0, contributions: [{ source: drone.droneUpgradeMovespeed, op: '+' }] },
  drone_attack_speed_percent: { base: 0, contributions: [{ source: drone.droneUpgradeAttackSpeed, op: '+' }] },
  drone_triple_damage_chance: { base: 0, contributions: [{ source: drone.droneUpgradeTripleDmg, op: '+' }] },
  drone_rapid_fire_chance:    { base: 0, contributions: [{ source: drone.droneUpgradeRapidFire, op: '+' }] },
  drone_suit_cap: {
    base: 5,
    contributions: [
      { source: sk.mechanicalEvolutionSuitCap,       op: '+' },
      { source: drone.coalSuitCap,             op: '+' },
    ],
  },
  coal_generation_seconds: {
    base: 90,
    contributions: [
      { source: sk.gasolineGuzzlerCoalTime,          op: '+' },
      { source: drone.coalCoalProduction,      op: '+' },
      { source: U, op: '+', unknown: true },         // Elixir Drone (temp)
    ],
  },
  coal_fuel_duration_multi: {
    base: 1,
    contributions: [
      { source: sk.gasolineGuzzlerFuelDuration,      op: '+' },
      { source: rel.rareRelicFuelDuration,           op: '+' },
      { source: card.cardFuel,                       op: '×' },
      { source: st.vpDroneCatalystFuel,              op: '×' },
      { source: st.vpVoidOverdriveFuel,              op: '×' },
      { source: drone.coalFuelDuration,        op: '+' },
      { source: pet.petAxolotlSkinFuelDuration, op: '+' },
      { source: con.staAppetiteFuelDuration,   op: '+' },
      { source: U, op: '+', unknown: true },         // Upgrades
    ],
  },
  coal_capacity_multi: {
    base: 1,
    contributions: [
      { source: sk.gasolineGuzzlerCoalCap,           op: '+' },
      { source: drone.coalCoalCapacity,        op: '+' },
      { source: U, op: '+', unknown: true },         // Cards (Vydn)
    ],
  },
  coal_fuel_save_chance: {
    base: 0,
    contributions: [
      { source: drone.coalFuelSave,            op: '+' },
      { source: U, op: '+', unknown: true },   // Upgrades
    ],
  },
  coal_drone_exp_multi: {
    base: 1,
    contributions: [
      { source: st.vpDroneCatalystExp,               op: '×' },
      { source: drone.coalDroneExp,            op: '+' },
      { source: pet.petTotemQuestDroneExp,     op: '+' },
      { source: arch.idolTalosDroneExp,        op: '+' },
      { source: U, op: '+', unknown: true },         // Cards + Skins
    ],
  },
  void_portal_chance: {
    base: 0,
    contributions: [
      { source: drone.droneSuitVoidPassive,    op: '+' },
      { source: drone.droneSuitVoidUpgrade,    op: '+' },
      { source: arch.idolThemisVoidUnlock,     op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  void_portal_base_multi: {
    base: 1,
    contributions: [
      { source: sk.callOfTheVoidPortalMulti,         op: '+' },
      { source: card.cardVoidPortal,                 op: '×' },
      { source: st.vpVoidOverdriveVoidMul,           op: '×' },
      { source: drone.coalVoidPortalMul,       op: '+' },
      { source: U, op: '+', unknown: true },         // Cards
    ],
  },
  golden_void_portal_chance: {
    base: 0,
    contributions: [
      { source: sk.iBuriedItHereGoldenVoidChance,    op: '+' },
      { source: pet.petNaginiQuestGoldenVoidChance,  op: '+' },
      { source: ct.ctGoldenVoidChance,               op: '+' },
      { source: st.vpVoidOverdriveGoldenPortalChance, op: '+' },
      { source: U, op: '+', unknown: true },         // Pets + Fishing + Upgrades + Contracts
    ],
  },
  golden_void_portal_multi: {
    base: 5,
    contributions: [
      { source: card.cardGoldenVoidPortal,           op: '×' },
      { source: pet.petNaginiQuestGoldenVoidMul,     op: '+' },
      { source: st.vpVoidOverdriveGoldenPortalMul,   op: '×' },
      { source: arch.idolThemis,               op: '+' },
      { source: U, op: '+', unknown: true },         // Fishing Dune's Eelworm T2
    ],
  },
  rainbow_void_portal_chance: {
    base: 0,
    contributions: [
      { source: pet.petButterflyRainbowPortal, op: '+' },
      { source: con.staSemblanceRainbowPortal, op: '+' },
      { source: arch.idolCronusPortalChance,   op: '+' },
      { source: rel.divineRelicRainbowPortal,  op: '+' },
      { source: U, op: '+', unknown: true },   // Stargazing BH11, Fishing Melting G T1, WQ6
    ],
  },
  rainbow_void_portal_multi: {
    base: 5,
    contributions: [
      { source: arch.idolCronusPortalMulUnlock, op: '+' },
      { source: U, op: '+', unknown: true },   // Cards Butterfly Pet, Upgrades
    ],
  },
  elixir_crit_chance:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  elixir_crit_multi:          { base: 3, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

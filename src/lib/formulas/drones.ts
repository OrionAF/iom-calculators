import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { cardSources as card } from '$lib/sources/cards'
import { droneSources as drone } from '$lib/sources/drones'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { tributesSources as tr } from '$lib/sources/tributes'
import { worldquestsSources as wq } from '$lib/sources/worldquests'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'drones',
  fn: () => 0,
  inputs: [],
}

export const dronesFormulas: FormulaMap = defineFormulas({
  drone_count: {
    contributions: [
      { source: drone.droneUpgradeUnlockDrone, op: '+' },
      { source: st.storeVpDroneCount, op: '+' },
      { source: sk.threesACrowdDrone, op: '+' },
      { source: tr.trCthulhuT2U1MD, op: '+' },
      { source: tr.trBlackenedBaskerT2UMD, op: '+' },
    ],
  },
  drone_damage_percent: {
    contributions: [{ source: drone.droneUpgradeDamage, op: '+' }],
  },
  drone_radius_percent: {
    contributions: [{ source: drone.droneUpgradeRadius, op: '+' }],
  },
  drone_movespeed_percent: {
    contributions: [{ source: drone.droneUpgradeMovespeed, op: '+' }],
  },
  drone_attack_speed_percent: {
    contributions: [{ source: drone.droneUpgradeAttackSpeed, op: '+' }],
  },
  drone_triple_damage_chance: {
    contributions: [{ source: drone.droneUpgradeTripleDmg, op: '+' }],
  },
  drone_rapid_fire_chance: {
    contributions: [{ source: drone.droneUpgradeRapidFire, op: '+' }],
  },
  drone_suit_cap: {
    contributions: [
      { source: sk.mechanicalEvolutionSuitCap, op: '+' },
      { source: drone.coalSuitCap, op: '+' },
    ],
  },
  coal_generation_seconds: {
    contributions: [
      { source: sk.gasolineGuzzlerCoalTime, op: '+' },
      { source: drone.coalCoalProduction, op: '+' },
      { source: U, op: '+', unknown: true }, // Elixir Drone (temp)
    ],
  },
  coal_fuel_duration_multi: {
    contributions: [
      { source: sk.gasolineGuzzlerFuelDuration, op: '+' },
      { source: rel.rareRelicFuelDuration, op: '+' },
      { source: card.cardMiscFuel, op: '×' },
      { source: st.storeVpDroneCatalystFuel, op: '×' },
      { source: st.storeVpVoidOverdriveFuel, op: '×' },
      { source: drone.coalFuelDuration, op: '+' },
      { source: pet.petAxolotlSkinFuelDuration, op: '+' },
      { source: con.staAppetiteFuelDuration, op: '+' },
      { source: up.upgrFuelDuration, op: '+' },
    ],
  },
  coal_capacity_multi: {
    contributions: [
      { source: sk.gasolineGuzzlerCoalCap, op: '+' },
      { source: drone.coalCoalCapacity, op: '+' },
      { source: card.cardMiscVydn, op: '×' },
      { source: card.cardDroneMidasInf, op: '×1+' },
    ],
  },
  coal_fuel_save_chance: {
    contributions: [
      { source: drone.coalFuelSave, op: '+' },
      { source: up.upgrFuelSaveChance, op: '+' },
      { source: U, op: '+', unknown: true }, // Upgrades
    ],
  },
  coal_drone_exp_multi: {
    contributions: [
      { source: st.storeVpDroneCatalystExp, op: '×' },
      { source: drone.coalDroneExp, op: '+' },
      { source: pet.petTotemQuestDroneExp, op: '+' },
      { source: arch.idolTalosDroneExp, op: '+' },
      { source: card.cardMiscBlueCow, op: '×1+' },
      { source: U, op: '+', unknown: true }, // Skins: Skin Reward
    ],
  },
  void_portal_chance: {
    contributions: [
      { source: drone.droneSuitVoidPassive, op: '+' },
      { source: drone.droneSuitVoidUpgrade, op: '+' },
      { source: arch.idolThemisVoidUnlock, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  void_portal_base_multi: {
    contributions: [
      { source: sk.callOfTheVoidPortalMulti, op: '+' },
      { source: card.cardMiscVoidPortal, op: '×' },
      { source: st.storeVpVoidOverdriveVoidMul, op: '×' },
      { source: drone.coalVoidPortalMul, op: '+' },
      { source: card.cardDroneVoidInf, op: '×1+' },
    ],
  },
  golden_void_portal_chance: {
    contributions: [
      { source: sk.iBuriedItHereGoldenVoidChance, op: '+' },
      { source: pet.petNaginiQuestGoldenVoidChance, op: '+' },
      { source: ct.ctGoldenVoidChance, op: '+' },
      { source: st.storeVpVoidOverdriveGoldenPortalChance, op: '+' },
      { source: U, op: '+', unknown: true }, // Pets + Fishing + Upgrades + Contracts
      { source: tr.trDuneEelwormT1GVPC, op: '+' },
    ],
  },
  golden_void_portal_multi: {
    contributions: [
      { source: card.cardMiscGoldenVoidPortal, op: '×' },
      { source: pet.petNaginiQuestGoldenVoidMul, op: '+' },
      { source: st.storeVpVoidOverdriveGoldenPortalMul, op: '×' },
      { source: arch.idolThemis, op: '+' },
      { source: up.upgrGoldenVoidChance, op: '+' },
      { source: tr.trDuneEelwormT2EBCC, op: '+' },
      { source: tr.trDuneEelwormT2GVPM, op: '×' },
      { source: card.cardLegDuneEelworm, op: '×1+' },
      { source: card.cardMiscGoldenVoidPortal, op: '×' },
    ],
  },
  rainbow_void_portal_chance: {
    contributions: [
      { source: pet.petButterflyRainbowPortal, op: '+' },
      { source: con.staSemblanceRainbowPortal, op: '+' },
      { source: arch.idolCronusPortalChance, op: '+' },
      { source: rel.divineRelicRainbowPortal, op: '+' },
      { source: U, op: '+', unknown: true }, // Stargazing BH11, Fishing Melting G T1, WQ6
      { source: tr.trMeltingGibbousT1RPC, op: '+' },
      { source: wq.wqRainbowVoidPortalChanceQ6, op: '+' },
    ],
  },
  rainbow_void_portal_multi: {
    contributions: [
      { source: arch.idolCronusPortalMulUnlock, op: '+' },
      { source: up.upgrRainbowVoidMul, op: '+' },
      { source: card.cardPetButterfly, op: '×1+' },
      { source: card.cardMiscRainbowVoidPortal, op: '×' },
      { source: U, op: '+', unknown: true }, // Upgrades: Anchorium Bar
    ],
  },
  elixir_crit_chance: {
    contributions: [{ source: U, op: '+', unknown: true }],
  },
  elixir_crit_multi: {
    contributions: [
      { source: U, op: '+', unknown: true },
      { source: card.cardDroneElixirInf, op: '×1+' },
    ],
  },

  // ─── Drone grade caps (cards + tributes) ───
  drone_bear_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneBearCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_chain_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneChainCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_midas_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneMidasCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_frogger_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneFroggerCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_veinseeker_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneVeinseekerCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_starburst_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneStarburstCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_elixir_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneElixirCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_void_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneVoidCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
      { source: tr.trGlacialShellstealerT2VDGC, op: '+' },
    ],
  },
  drone_angler_grade_cap_increase: {
    contributions: [
      { source: card.cardDroneAnglerCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
  drone_prism_grade_cap_increase: {
    contributions: [
      { source: card.cardDronePrismCap, op: '+' },
      { source: tr.trBlackenedBaskerT1ADGC, op: '+' },
    ],
  },
})

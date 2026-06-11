import type { Source } from '$lib/engine/types'

// ─── Drone Upgrades Menu ──────────────────────────────────────────────────────
// Permanent upgrades from the Drones → Upgrades tab.

/** Drone Damage (Pickaxe %) +20% per level. Max 10. → drone_damage_percent */
export const droneUpgradeDamage: Source = {
  key: 'drones.upgrade.damage',
  name: 'Drone Upgrade – Damage',
  system: 'drones',
  maxLevel: 10,
  fn: (n) => n * 0.2,
  inputs: [],
}
/** Drone Radius +12% per level. Max 10. → drone_radius_percent */
export const droneUpgradeRadius: Source = {
  key: 'drones.upgrade.radius',
  name: 'Drone Upgrade – Radius',
  system: 'drones',
  maxLevel: 10,
  fn: (n) => n * 0.12,
  inputs: [],
}
/** Drone Movespeed +10% per level. Max 10. → drone_movespeed_percent */
export const droneUpgradeMovespeed: Source = {
  key: 'drones.upgrade.movespeed',
  name: 'Drone Upgrade – Movespeed',
  system: 'drones',
  maxLevel: 10,
  fn: (n) => n * 0.1,
  inputs: [],
}
/** Drone Attack Speed +10% per level. Max 10. → drone_attack_speed_percent */
export const droneUpgradeAttackSpeed: Source = {
  key: 'drones.upgrade.attackSpeed',
  name: 'Drone Upgrade – Attack Speed',
  system: 'drones',
  maxLevel: 10,
  fn: (n) => n * 0.1,
  inputs: [],
}
/** Drone Triple Damage Chance +2% per level. Max 15. → drone_triple_damage_chance */
export const droneUpgradeTripleDmg: Source = {
  key: 'drones.upgrade.tripleDmg',
  name: 'Drone Upgrade – Triple Damage Chance',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Drone Rapid Fire Chance +2% per level. Max 15. → drone_rapid_fire_chance */
export const droneUpgradeRapidFire: Source = {
  key: 'drones.upgrade.rapidFire',
  name: 'Drone Upgrade – Rapid Fire Chance',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 0.02,
  inputs: [],
}

// ─── Drone Suit Passives ──────────────────────────────────────────────────────
// Permanent stat bonuses from having a suit slot equipped (binary, maxLevel 1).
// These are active regardless of drone fuel state.

/** Veinseeker: Vein Spawn Rate +10% permanent passive. → vein_spawn_rate_multi */
export const droneSuitVeinseekerPassive: Source = {
  key: 'drones.suit.veinseeker.passive',
  name: 'Veinseeker Suit (Passive)',
  system: 'drones',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}
/** Starburst: Triple Star Chance +6% permanent passive. → star_triple_spawn_chance */
export const droneSuitStarburstPassive: Source = {
  key: 'drones.suit.starburst.passive',
  name: 'Starburst Suit (Passive)',
  system: 'drones',
  maxLevel: 1,
  fn: (o) => o * 0.06,
  inputs: [],
}
/**
 * Void: Ore Portal Chance +10% permanent passive (base chance when Void suit is equipped).
 * → void_portal_chance
 */
export const droneSuitVoidPassive: Source = {
  key: 'drones.suit.void.passive',
  name: 'Void Suit (Passive)',
  system: 'drones',
  maxLevel: 1,
  fn: (o) => o * 0.1,
  inputs: [],
}

// ─── Drone Suit Upgrades ──────────────────────────────────────────────────────
// Permanent per-level bonuses from upgrading individual drone suits.
// Base max level 5, raised to 15 via: Mechanical Evolution skill (+3),
// Coal Upgrades (+2 standard), Dionysus idol (+5 via increased coal cap).
// NOTE: Chain (2x chain size), Frogger (autofire interval), Elixir (buff interval),
//       Midas (ore value) upgrades have no registry keys — see TODOs below.

/**
 * Bomb Bear suit upgrade: Bomb Damage +15% per level when Bear suit is equipped.
 * Conditional on suit selection. Max 15. → bomb_damage
 */
export const droneSuitBearUpgrade: Source = {
  key: 'drones.suit.bear.upgrade',
  name: 'Bomb Bear Suit Upgrade (Bomb Damage)',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 0.15,
  inputs: [],
}
// TODO no registry key: Chain Bomber suit upgrade — Chance For 2x Chain Size +4%/level, max 15

/** Veinseeker suit upgrade: Vein Spawn Rate +2% per level. Max 15. → vein_spawn_rate_multi */
export const droneSuitVeinseekerUpgrade: Source = {
  key: 'drones.suit.veinseeker.upgrade',
  name: 'Veinseeker Suit Upgrade',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 0.02,
  inputs: [],
}
/** Starburst suit upgrade: Triple Star Chance +1% per level. Max 15. → star_triple_spawn_chance */
export const droneSuitStarburstUpgrade: Source = {
  key: 'drones.suit.starburst.upgrade',
  name: 'Starburst Suit Upgrade',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Void suit upgrade: Portal Ore Chance +2% per level. Max 15. → void_portal_chance */
export const droneSuitVoidUpgrade: Source = {
  key: 'drones.suit.void.upgrade',
  name: 'Void Suit Upgrade (Portal Chance)',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 0.02,
  inputs: [],
}
/**
 * Angler suit upgrade: Time Between Fishing Ticks -40s per level. Max 15.
 * Positive fn per reduction convention. → fishing_tick_reduction_seconds
 */
export const droneSuitAnglerUpgrade: Source = {
  key: 'drones.suit.angler.upgrade',
  name: 'Angler Suit Upgrade',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 40,
  inputs: [],
}
/** Prism suit upgrade: Galactic Floor Chance +0.25% per level. Max 15. → galactic_floor_chance */
export const droneSuitPrismUpgrade: Source = {
  key: 'drones.suit.prism.upgrade',
  name: 'Prism Suit Upgrade',
  system: 'drones',
  maxLevel: 15,
  fn: (n) => n * 0.0025,
  inputs: [],
}
// TODO no registry key: Midas suit upgrade — Ore Value Gained +1%/level, max 15
// TODO no registry key: Frogger suit upgrade — Time Between Autofires -1.5s/level, max 15
// TODO no registry key: Elixir suit upgrade — Time Between Buffs -15s/level, max 15

// ─── Drone Grade Passives ─────────────────────────────────────────────────────
// Permanent stats that scale with the drone's grade rather than an upgrade level.

/**
 * Prism drone grade passive: Galactic Floor Chance +0.25% per grade. Max grade 40.
 * Separate from the suit upgrade (which also adds +0.25% per upgrade level).
 * → galactic_floor_chance
 */
export const dronePrismGradePassive: Source = {
  key: 'drones.grade.prism',
  name: 'Prism Drone Grade (Galactic Chance)',
  system: 'drones',
  maxLevel: 40,
  fn: (n) => n * 0.0025,
  inputs: [],
}

/**
 * Midas drone enhancement: All Star Multi +0.5% per grade (permanent passive,
 * unlocked via Tier 2 Fishing Notice Upgrade). Max grade 100. → all_star_multi
 */
export const droneMidasEnhancementAllStar: Source = {
  key: 'drones.grade.midasEnhancement',
  name: 'Midas Drone Enhancement (All Star Multi)',
  system: 'drones',
  maxLevel: 100,
  fn: (n) => n * 0.005,
  inputs: [],
}
// TODO no registry key: Frogger drone enhancement — Lootfrog Spawn Chance +0.003%/grade (max 45)
//   unlocked via Black Hole; grade-scaled permanent passive

// ─── Coal Upgrades ────────────────────────────────────────────────────────────
// Permanent upgrades purchased with coal from the Generator.
// All max level 25 unless noted.

/**
 * Coal Production -1s per level. Max 25.
 * Positive fn per reduction convention (formula subtracts from base 90s).
 * → coal_generation_seconds
 */
export const coalCoalProduction: Source = {
  key: 'drones.coal.coalProduction',
  name: 'Coal Upgrade – Coal Production',
  system: 'drones',
  maxLevel: 25,
  fn: (n) => n * 1,
  inputs: [],
}
/** Fuel Duration +1% per level. Max 25. → coal_fuel_duration_multi */
export const coalFuelDuration: Source = {
  key: 'drones.coal.fuelDuration',
  name: 'Coal Upgrade – Fuel Duration',
  system: 'drones',
  maxLevel: 25,
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Coal Capacity +10% per level. Max 25. → coal_capacity_multi */
export const coalCoalCapacity: Source = {
  key: 'drones.coal.coalCapacity',
  name: 'Coal Upgrade – Coal Capacity',
  system: 'drones',
  maxLevel: 25,
  fn: (n) => n * 0.1,
  inputs: [],
}
/** Fuel Save Chance +1% per level. Max 25. → coal_fuel_save_chance */
export const coalFuelSave: Source = {
  key: 'drones.coal.fuelSave',
  name: 'Coal Upgrade – Fuel Save Chance',
  system: 'drones',
  maxLevel: 25,
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Drone Exp Gain +5% per level. Max 25. → coal_drone_exp_multi */
export const coalDroneExp: Source = {
  key: 'drones.coal.droneExp',
  name: 'Coal Upgrade – Drone Exp Gain',
  system: 'drones',
  maxLevel: 25,
  fn: (n) => n * 0.05,
  inputs: [],
}
/** Drone Suit Upgrade Cap +1 per level. Max 7. → drone_suit_cap */
export const coalSuitCap: Source = {
  key: 'drones.coal.suitCap',
  name: 'Coal Upgrade – Suit Upgrade Cap',
  system: 'drones',
  maxLevel: 7,
  fn: (n) => n,
  inputs: [],
}
// TODO no registry key: Starburst Drone Grade Cap +1/level, max 10
//   no drone_starburst_grade_cap_increase key exists; drone_chain/frogger/void exist

/** Void Portal Base Multi +1% per level. Max 20. → void_portal_base_multi */
export const coalVoidPortalMul: Source = {
  key: 'drones.coal.voidPortalMul',
  name: 'Coal Upgrade – Void Portal Base Multi',
  system: 'drones',
  maxLevel: 20,
  fn: (n) => n * 0.01,
  inputs: [],
}
/** Gleaming Vein Multiplier +6% per level. Max 20. → gleaming_vein_multi */
export const coalGleamingVein: Source = {
  key: 'drones.coal.gleamingVein',
  name: 'Coal Upgrade – Gleaming Vein Multi',
  system: 'drones',
  maxLevel: 20,
  fn: (n) => n * 0.06,
  inputs: [],
}
/** Lootfrog 10× Spawn Chance +0.05% per level. Max 20. → lootfrog_10x_spawn_chance */
export const coalLootfrog10x: Source = {
  key: 'drones.coal.lootfrog10x',
  name: 'Coal Upgrade – Lootfrog 10x Spawn Chance',
  system: 'drones',
  maxLevel: 20,
  fn: (n) => n * 0.0005,
  inputs: [],
}
// NOTE: 'Unlock Drone Infernal Cards' (max 1) — unlock mechanic, no stat key.

export const droneSources = {
  // Drone upgrade menu
  droneUpgradeDamage,
  droneUpgradeRadius,
  droneUpgradeMovespeed,
  droneUpgradeAttackSpeed,
  droneUpgradeTripleDmg,
  droneUpgradeRapidFire,
  // Suit passives
  droneSuitVeinseekerPassive,
  droneSuitStarburstPassive,
  droneSuitVoidPassive,
  // Suit upgrades
  droneSuitBearUpgrade,
  droneSuitVeinseekerUpgrade,
  droneSuitStarburstUpgrade,
  droneSuitVoidUpgrade,
  droneSuitAnglerUpgrade,
  droneSuitPrismUpgrade,
  // Grade passives
  dronePrismGradePassive,
  droneMidasEnhancementAllStar,
  // Coal upgrades
  coalCoalProduction,
  coalFuelDuration,
  coalCoalCapacity,
  coalFuelSave,
  coalDroneExp,
  coalSuitCap,
  coalVoidPortalMul,
  coalGleamingVein,
  coalLootfrog10x,
}

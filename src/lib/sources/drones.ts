import type { Op, Source } from '$lib/engine/types'

// Drone sources own all drone effect numbers (fn, maxLevel, statKey, op).
// All are leveled with no runtime inputs. statKey/op mirror the formula
// wiring (consistency test enforces op where a source is used); a few
// effects have no registry stat yet and carry no statKey.

const dr = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `drones.${key}`,
  name,
  system: 'drones',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Drone Upgrades Menu ──────────────────────────────────────────────────────

export const droneUpgradeUnlockDrone = dr('upgrade.unlock', 'Drone Upgrade – Unlock', 1, 'drone_count', '+', (n) => n * 1)
export const droneUpgradeDamage = dr('upgrade.damage', 'Drone Upgrade – Damage', 10, 'drone_damage_percent', '+', (n) => n * 0.2)
export const droneUpgradeRadius = dr('upgrade.radius', 'Drone Upgrade – Radius', 10, 'drone_radius_percent', '+', (n) => n * 0.12)
export const droneUpgradeMovespeed = dr('upgrade.movespeed', 'Drone Upgrade – Movespeed', 10, 'drone_movespeed_percent', '+', (n) => n * 0.1)
export const droneUpgradeAttackSpeed = dr('upgrade.attackSpeed', 'Drone Upgrade – Attack Speed', 10, 'drone_attack_speed_percent', '+', (n) => n * 0.1)
export const droneUpgradeTripleDmg = dr('upgrade.tripleDmg', 'Drone Upgrade – Triple Damage Chance', 15, 'drone_triple_damage_chance', '+', (n) => n * 0.02)
export const droneUpgradeRapidFire = dr('upgrade.rapidFire', 'Drone Upgrade – Rapid Fire Chance', 15, 'drone_rapid_fire_chance', '+', (n) => n * 0.02)

// ─── Drone Suit Passives ──────────────────────────────────────────────────────
// Permanent passives from an equipped suit slot (binary), active regardless of fuel.

export const droneSuitVeinseekerPassive = dr('suit.veinseeker.passive', 'Veinseeker Suit (Passive)', 1, 'vein_spawn_rate_multi', '+', (o) => o * 0.1)
export const droneSuitStarburstPassive = dr('suit.starburst.passive', 'Starburst Suit (Passive)', 1, 'star_triple_spawn_chance', '+', (o) => o * 0.06)
export const droneSuitVoidPassive = dr('suit.void.passive', 'Void Suit (Passive)', 1, 'void_portal_chance', '+', (o) => o * 0.1)

// ─── Drone Suit Upgrades ──────────────────────────────────────────────────────
// Per-level bonuses from upgrading individual suits. Angler/Prism reductions and
// chance effects aren't yet referenced by a formula but their stats exist.
// NOTE: Chain (2x chain size), Midas (ore value), Frogger (autofire interval),
//       Elixir (buff interval) suit upgrades have no registry keys.

export const droneSuitBearUpgrade = dr('suit.bear.upgrade', 'Bomb Bear Suit Upgrade (Bomb Damage)', 15, 'bomb_damage', '×1+', (n) => n * 0.15)
export const droneSuitVeinseekerUpgrade = dr('suit.veinseeker.upgrade', 'Veinseeker Suit Upgrade', 15, 'vein_spawn_rate_multi', '+', (n) => n * 0.02)
export const droneSuitStarburstUpgrade = dr('suit.starburst.upgrade', 'Starburst Suit Upgrade', 15, 'star_triple_spawn_chance', '+', (n) => n * 0.01)
export const droneSuitVoidUpgrade = dr('suit.void.upgrade', 'Void Suit Upgrade (Portal Chance)', 15, 'void_portal_chance', '+', (n) => n * 0.02)
// Reduction convention: positive fn, formula subtracts.
export const droneSuitAnglerUpgrade = dr('suit.angler.upgrade', 'Angler Suit Upgrade', 15, 'fishing_tick_reduction_seconds', '+', (n) => n * 40)
export const droneSuitPrismUpgrade = dr('suit.prism.upgrade', 'Prism Suit Upgrade', 15, 'galactic_floor_chance', '+', (n) => n * 0.0025)

// ─── Drone Grade Passives ─────────────────────────────────────────────────────
// Permanent stats scaling with the drone's grade rather than an upgrade level.

export const dronePrismGradePassive = dr('grade.prism', 'Prism Drone Grade (Galactic Chance)', 40, 'galactic_floor_chance', '+', (n) => n * 0.0025)
export const droneMidasEnhancementAllStar = dr('grade.midasEnhancement', 'Midas Drone Enhancement (All Star Multi)', 100, 'all_star_multi', '+', (n) => n * 0.005)
// TODO no registry key: Frogger drone enhancement — Lootfrog Spawn Chance +0.003%/grade (max 45)

// ─── Coal Upgrades ────────────────────────────────────────────────────────────
// Permanent upgrades purchased with coal. Coal Production is a reduction
// (positive fn, formula subtracts from base 90s).

export const coalCoalProduction = dr('coal.coalProduction', 'Coal Upgrade – Coal Production', 25, 'coal_generation_seconds', '+', (n) => n * 1)
export const coalFuelDuration = dr('coal.fuelDuration', 'Coal Upgrade – Fuel Duration', 25, 'coal_fuel_duration_multi', '+', (n) => n * 0.01)
export const coalCoalCapacity = dr('coal.coalCapacity', 'Coal Upgrade – Coal Capacity', 25, 'coal_capacity_multi', '+', (n) => n * 0.1)
export const coalFuelSave = dr('coal.fuelSave', 'Coal Upgrade – Fuel Save Chance', 25, 'coal_fuel_save_chance', '+', (n) => n * 0.01)
export const coalDroneExp = dr('coal.droneExp', 'Coal Upgrade – Drone Exp Gain', 25, 'coal_drone_exp_multi', '+', (n) => n * 0.05)
export const coalSuitCap = dr('coal.suitCap', 'Coal Upgrade – Suit Upgrade Cap', 7, 'drone_suit_cap', '+', (n) => n)
// TODO no registry key: Starburst Drone Grade Cap +1/level, max 10
export const coalVoidPortalMul = dr('coal.voidPortalMul', 'Coal Upgrade – Void Portal Base Multi', 20, 'void_portal_base_multi', '+', (n) => n * 0.01)
export const coalGleamingVein = dr('coal.gleamingVein', 'Coal Upgrade – Gleaming Vein Multi', 20, 'gleaming_vein_multi', '+', (n) => n * 0.06)
export const coalLootfrog10x = dr('coal.lootfrog10x', 'Coal Upgrade – Lootfrog 10x Spawn Chance', 20, 'lootfrog_10x_spawn_chance', '+', (n) => n * 0.0005)
// NOTE: 'Unlock Drone Infernal Cards' (max 1) — unlock mechanic, no stat key.

export const droneSources = {
  droneUpgradeUnlockDrone,
  droneUpgradeDamage,
  droneUpgradeRadius,
  droneUpgradeMovespeed,
  droneUpgradeAttackSpeed,
  droneUpgradeTripleDmg,
  droneUpgradeRapidFire,
  droneSuitVeinseekerPassive,
  droneSuitStarburstPassive,
  droneSuitVoidPassive,
  droneSuitBearUpgrade,
  droneSuitVeinseekerUpgrade,
  droneSuitStarburstUpgrade,
  droneSuitVoidUpgrade,
  droneSuitAnglerUpgrade,
  droneSuitPrismUpgrade,
  dronePrismGradePassive,
  droneMidasEnhancementAllStar,
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

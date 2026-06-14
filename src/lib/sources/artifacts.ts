import type { Op, Source } from '$lib/engine/types'

// Artifact sources own all artifact effect numbers (fn, maxLevel, statKey, op).
// art()       – leveled artifact, no runtime input.
// artStatue() – Tier 4 artifacts scaling per statue owned (level × statueCount × rate).
// statKey/op mirror the formula wiring (consistency test enforces op where used).
// Cap increase sources come from Skill Tree / Cards / Construct (max +7; T4 also
// +1 per Happy-Bot level up to +20).

const art = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `artifacts.${key}`,
  name,
  system: 'artifacts',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

const artStatue = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string,
  op: Op,
  rate: number,
): Source => ({
  key: `artifacts.${key}`,
  name,
  system: 'artifacts',
  maxLevel,
  statKey,
  op,
  fn: (n, rt) => n * (rt['statueCount'] ?? 0) * rate,
  inputs: [{ key: 'statueCount', label: 'Statues Owned', type: 'integer', min: 0 }],
})

// ─── Tier 1 Artifacts ─────────────────────────────────────────────────────────

export const artPickaxeDmgT1 = art('pickaxeDmgT1', 'Artifact: Pickaxe Damage (T1)', 32, 'pickaxe_damage', '+', (n) => n * 0.1)
export const artPickaxeCostT1 = art('pickaxeCostT1', 'Artifact: Pickaxe Cost (T1)', 12, 'pickaxe_bar_cost_reduction', '+', (n) => n * -3)
export const artExpGainT1 = art('expGainT1', 'Artifact: EXP Gain (T1)', 27, 'experience_multi', '+', (n) => n * 0.1)
export const artFreeCraftT1 = art('freeCraftT1', 'Artifact: Free Craft Chance (T1)', 17, 'free_craft_chance', '+', (n) => n * 0.02)
export const artTripleCraftT1 = art('tripleCraftT1', 'Artifact: Triple Craft Chance (T1)', 17, 'triple_craft_chance', '+', (n) => n * 0.02)
export const artPickaxeRadiusT1 = art('pickaxeRadiusT1', 'Artifact: Pickaxe Radius (T1)', 12, 'pickaxe_radius_percent', '+', (n) => n * 0.12)
export const artOreSellPriceT1 = art('oreSellPriceT1', 'Artifact: Ore Sell Price (T1)', 17, 'ore_sell_price_multi', '+', (n) => n * 0.12)
export const artItemDurationT1 = art('itemDurationT1', 'Artifact: Item Duration (T1)', 17, 'item_duration_multi', '+', (n) => n * 0.06)
export const artBombDmgT1 = art('bombDmgT1', 'Artifact: Bomb Damage (T1)', 32, 'bomb_damage', '×1+', (n) => n * 0.3)
export const artObeliskCdT1 = art('obeliskCdT1', 'Artifact: Obelisk Cooldown (T1)', 17, 'obelisk_timer_add', '+', (n) => n * -0.03)

// ─── Tier 2 Artifacts ─────────────────────────────────────────────────────────

export const artPickaxeDmgT2 = art('pickaxeDmgT2', 'Artifact: Pickaxe Damage (T2)', 32, 'pickaxe_damage', '+', (n) => n * 0.25)
export const artBombDmgT2 = art('bombDmgT2', 'Artifact: Bomb Damage (T2)', 32, 'bomb_damage', '×1+', (n) => n * 0.5)
export const artPrestigePtsT2 = art('prestigePtsT2', 'Artifact: artifacts Points (T2)', 17, 'prestige_point_multi', '+', (n) => n * 0.05)
export const artPickaxeSuperCritT2 = art('pickaxeSuperCritT2', 'Artifact: Pickaxe Super Crit (T2)', 17, 'pickaxe_super_crit_chance', '+', (n) => n * 0.01)
export const artFloorClearT2 = art('floorClearT2', 'Artifact: Floor Clear Reduction (T2)', 17, 'floor_clear_requirement_multi', '+', (n) => n * -0.05)

// ─── Tier 3 Artifacts ─────────────────────────────────────────────────────────

export const artPickaxeDmgT3 = art('pickaxeDmgT3', 'Artifact: Pickaxe Damage (T3)', 32, 'pickaxe_damage', '+', (n) => n * 0.6)
export const artBombDmgT3 = art('bombDmgT3', 'Artifact: Bomb Damage (T3)', 32, 'bomb_damage', '×1+', (n) => n * 0.8)
export const artBombSuperCritT3 = art('bombSuperCritT3', 'Artifact: Bomb Super Crit Chance (T3)', 17, 'bomb_super_crit_chance', '+', (n) => n * 0.02)
export const artObeliskArmorT3 = art('obeliskArmorT3', 'Artifact: Obelisk Armor Reduction (T3)', 17, 'obelisk_armor_reduction', '+', (n) => n * -0.02)
export const artBombCapT3 = art('bombCapT3', 'Artifact: Bomb Capacity (T3)', 17, 'bomb_capacity', '+', (n) => n * 3)

// ─── Tier 4 Artifacts (scale per statue owned — runtime input) ─────────────────

export const artPickaxeDmgT4 = artStatue('pickaxeDmgT4', 'Artifact: Pickaxe Damage per Statue (T4)', 52, 'pickaxe_damage', '+', 0.1)
export const artBombDmgT4 = artStatue('bombDmgT4', 'Artifact: Bomb Damage per Statue (T4)', 52, 'bomb_damage', '×1+', 0.15)
export const artOmegaCritT4 = art('omegaCritT4', 'Artifact: Pickaxe Omega Crit Chance (T4)', 37, 'pickaxe_omega_crit_chance', '+', (n) => n * 0.01)
export const artBarOutputT4 = art('barOutputT4', 'Artifact: Bar Output Multi (T4)', 37, 'bar_output_multi', '+', (n) => n * 0.004)
export const artVeinSpawnT4 = art('veinSpawnT4', 'Artifact: Vein Spawn Rate (T4)', 37, 'vein_spawn_rate_multi', '+', (n) => n * 0.04)

export const artifactSources = {
  artPickaxeDmgT1,
  artPickaxeCostT1,
  artExpGainT1,
  artFreeCraftT1,
  artTripleCraftT1,
  artPickaxeRadiusT1,
  artOreSellPriceT1,
  artItemDurationT1,
  artBombDmgT1,
  artObeliskCdT1,
  artPickaxeDmgT2,
  artBombDmgT2,
  artPrestigePtsT2,
  artPickaxeSuperCritT2,
  artFloorClearT2,
  artPickaxeDmgT3,
  artBombDmgT3,
  artBombSuperCritT3,
  artObeliskArmorT3,
  artBombCapT3,
  artPickaxeDmgT4,
  artBombDmgT4,
  artOmegaCritT4,
  artBarOutputT4,
  artVeinSpawnT4,
}

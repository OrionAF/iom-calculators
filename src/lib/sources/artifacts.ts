import type { Source } from '$lib/engine/types'

// ─── Tier 1 Artifacts ─────────────────────────────────────────────────────────
// Cap increase sources are from the Skill Tree(Do These Upgrades Ever End +1), Cards(Happy-Bot +1-3) and Construct(W1 Statue of Slaying +1-3) for a max cap increase of +7
// Tier 4 artifacts have an additional +1 increase to their cap for every Happy-Bot level, capping at +20

export const artPickaxeDmgT1: Source = {
  key: 'artifacts.pickaxeDmgT1',
  name: 'Artifact: Pickaxe Damage (T1)',
  system: 'artifacts',
  maxLevel: 32,
  fn: (n) => n * 0.1,
  inputs: [],
}
export const artPickaxeCostT1: Source = {
  key: 'artifacts.pickaxeCostT1',
  name: 'Artifact: Pickaxe Cost (T1)',
  system: 'artifacts',
  maxLevel: 12,
  fn: (n) => n * -3,
  inputs: [],
}
export const artExpGainT1: Source = {
  key: 'artifacts.expGainT1',
  name: 'Artifact: EXP Gain (T1)',
  system: 'artifacts',
  maxLevel: 27,
  fn: (n) => n * 0.1,
  inputs: [],
}
export const artFreeCraftT1: Source = {
  key: 'artifacts.freeCraftT1',
  name: 'Artifact: Free Craft Chance (T1)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 0.02,
  inputs: [],
}
export const artTripleCraftT1: Source = {
  key: 'artifacts.tripleCraftT1',
  name: 'Artifact: Triple Craft Chance (T1)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 0.02,
  inputs: [],
}
export const artPickaxeRadiusT1: Source = {
  key: 'artifacts.pickaxeRadiusT1',
  name: 'Artifact: Pickaxe Radius (T1)',
  system: 'artifacts',
  maxLevel: 12,
  fn: (n) => n * 0.12,
  inputs: [],
}
export const artOreSellPriceT1: Source = {
  key: 'artifacts.oreSellPriceT1',
  name: 'Artifact: Ore Sell Price (T1)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 0.12,
  inputs: [],
}
export const artItemDurationT1: Source = {
  key: 'artifacts.itemDurationT1',
  name: 'Artifact: Item Duration (T1)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 0.06,
  inputs: [],
}
export const artBombDmgT1: Source = {
  key: 'artifacts.bombDmgT1',
  name: 'Artifact: Bomb Damage (T1)',
  system: 'artifacts',
  maxLevel: 32,
  fn: (n) => n * 0.3,
  inputs: [],
}
export const artObeliskCdT1: Source = {
  key: 'artifacts.obeliskCdT1',
  name: 'Artifact: Obelisk Cooldown (T1)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * -0.03,
  inputs: [],
}

// ─── Tier 2 Artifacts ─────────────────────────────────────────────────────────

export const artPickaxeDmgT2: Source = {
  key: 'artifacts.pickaxeDmgT2',
  name: 'Artifact: Pickaxe Damage (T2)',
  system: 'artifacts',
  maxLevel: 32,
  fn: (n) => n * 0.25,
  inputs: [],
}
export const artBombDmgT2: Source = {
  key: 'artifacts.bombDmgT2',
  name: 'Artifact: Bomb Damage (T2)',
  system: 'artifacts',
  maxLevel: 32,
  fn: (n) => n * 0.5,
  inputs: [],
}
export const artPrestigePtsT2: Source = {
  key: 'artifacts.prestigePtsT2',
  name: 'Artifact: artifacts Points (T2)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 0.05,
  inputs: [],
}
export const artPickaxeSuperCritT2: Source = {
  key: 'artifacts.pickaxeSuperCritT2',
  name: 'Artifact: Pickaxe Super Crit (T2)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 0.01,
  inputs: [],
}
export const artFloorClearT2: Source = {
  key: 'artifacts.floorClearT2',
  name: 'Artifact: Floor Clear Reduction (T2)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * -0.05,
  inputs: [],
}

// ─── Tier 3 Artifacts ─────────────────────────────────────────────────────────

export const artPickaxeDmgT3: Source = {
  key: 'artifacts.pickaxeDmgT3',
  name: 'Artifact: Pickaxe Damage (T3)',
  system: 'artifacts',
  maxLevel: 32,
  fn: (n) => n * 0.6,
  inputs: [],
}
export const artBombDmgT3: Source = {
  key: 'artifacts.bombDmgT3',
  name: 'Artifact: Bomb Damage (T3)',
  system: 'artifacts',
  maxLevel: 32,
  fn: (n) => n * 0.8,
  inputs: [],
}
export const artBombSuperCritT3: Source = {
  key: 'artifacts.bombSuperCritT3',
  name: 'Artifact: Bomb Super Crit Chance (T3)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 0.02,
  inputs: [],
}
export const artObeliskArmorT3: Source = {
  key: 'artifacts.obeliskArmorT3',
  name: 'Artifact: Obelisk Armor Reduction (T3)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * -0.02,
  inputs: [],
}
export const artBombCapT3: Source = {
  key: 'artifacts.bombCapT3',
  name: 'Artifact: Bomb Capacity (T3)',
  system: 'artifacts',
  maxLevel: 17,
  fn: (n) => n * 3,
  inputs: [],
}

// ─── Tier 4 Artifacts (scale per statue owned — runtime input) ─────────────────

/**
 * T4: Pickaxe Damage +10% per statue owned, per artifact level.
 * fn(level, {statueCount}) = level × statueCount × 0.10
 */
export const artPickaxeDmgT4: Source = {
  key: 'artifacts.pickaxeDmgT4',
  name: 'Artifact: Pickaxe Damage per Statue (T4)',
  system: 'artifacts',
  maxLevel: 52,
  fn: (n, rt) => n * (rt['statueCount'] ?? 0) * 0.1,
  inputs: [{ key: 'statueCount', label: 'Statues Owned', type: 'integer', min: 0 }],
}

/**
 * T4: Bomb Damage +15% per statue owned, per artifact level.
 */
export const artBombDmgT4: Source = {
  key: 'artifacts.bombDmgT4',
  name: 'Artifact: Bomb Damage per Statue (T4)',
  system: 'artifacts',
  maxLevel: 52,
  fn: (n, rt) => n * (rt['statueCount'] ?? 0) * 0.15,
  inputs: [{ key: 'statueCount', label: 'Statues Owned', type: 'integer', min: 0 }],
}

export const artOmegaCritT4: Source = {
  key: 'artifacts.omegaCritT4',
  name: 'Artifact: Pickaxe Omega Crit Chance (T4)',
  system: 'artifacts',
  maxLevel: 37,
  fn: (n) => n * 0.01,
  inputs: [],
}
export const artBarOutputT4: Source = {
  key: 'artifacts.barOutputT4',
  name: 'Artifact: Bar Output Multi (T4)',
  system: 'artifacts',
  maxLevel: 37,
  fn: (n) => n * 0.004,
  inputs: [],
}
export const artVeinSpawnT4: Source = {
  key: 'artifacts.veinSpawnT4',
  name: 'Artifact: Vein Spawn Rate (T4)',
  system: 'artifacts',
  maxLevel: 37,
  fn: (n) => n * 0.04,
  inputs: [],
}

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

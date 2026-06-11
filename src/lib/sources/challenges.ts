import type { Source } from '$lib/engine/types'

// ─── Regular Challenge Rewards ────────────────────────────────────────────────

/** Regular: Bar Upgrade Costs -5% per level. Max 3. Positive fn per reduction convention. → pickaxe_bar_cost_reduction */
export const chBarUpgradeCosts: Source = {
  key: 'challenges.barUpgradeCosts', name: 'Challenge: Bar Upgrade Costs', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.05, inputs: [],
}
// TODO no registry key: Regular — Chain Bomb Amount +1, max 3
export const chPickaxeSuperCritDmg: Source = {
  key: 'challenges.pickaxeSuperCritDmg', name: 'Challenge: Pickaxe Super Crit Damage', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.10, inputs: [],
}
export const chExpPrestigePts: Source = {
  key: 'challenges.expPrestigePts', name: 'Challenge: EXP & Prestige Points', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.10, inputs: [],
}
export const chBombCap: Source = {
  key: 'challenges.bombCap', name: 'Challenge: Bomb Capacity', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 3, inputs: [],
}
export const chBombCritDmg: Source = {
  key: 'challenges.bombCritDmg', name: 'Challenge: Bomb Crit Damage', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.20, inputs: [],
}
/**
 * Regular: Pickaxe Damage +1% per Challenge completed, per bought level. Max 3.
 * → pickaxe_damage
 */
export const chPickaxeDmgPerChallenge: Source = {
  key: 'challenges.pickaxeDmgPerChallenge', name: 'Challenge: Pickaxe Dmg/Challenge', system: 'challenges',
  maxLevel: 3,
  fn: (n, rt) => n * 0.01 * (rt['challengesCompleted'] ?? 0),
  inputs: [{ key: 'challengesCompleted', label: 'Regular Challenges Completed', type: 'integer', min: 0 }],
}
/** Regular: Skill Shard Chance +1%, max 1. → freebie_chance_for_skill_shard */
export const chSkillShardChance: Source = {
  key: 'challenges.skillShardChance', name: 'Challenge: Skill Shard Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.01, inputs: [],
}
export const chOreSellPrice: Source = {
  key: 'challenges.oreSellPrice', name: 'Challenge: Ore Sell Price', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.15, inputs: [],
}
export const chDoubleCraft: Source = {
  key: 'challenges.doubleCraft', name: 'Challenge: Double Craft Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.03, inputs: [],
}
/**
 * Regular: Pickaxe Damage +1% per Skill-Tree Node Unlocked, per bought level. Max 3.
 * → pickaxe_damage
 */
export const chPickaxeDmgPerSkillNode: Source = {
  key: 'challenges.pickaxeDmgPerSkillNode', name: 'Challenge: Pickaxe Dmg/Skill Node', system: 'challenges',
  maxLevel: 3,
  fn: (n, rt) => n * 0.01 * (rt['skillNodesUnlocked'] ?? 0),
  inputs: [{ key: 'skillNodesUnlocked', label: 'Skill-Tree Nodes Unlocked', type: 'integer', min: 0 }],
}
/** Regular: Obelisk Armor -12%, max 1. Positive fn per reduction convention. → obelisk_armor_reduction */
export const chObeliskArmor: Source = {
  key: 'challenges.obeliskArmor', name: 'Challenge: Obelisk Armor', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.12, inputs: [],
}
/** Regular: Bomb Super Crit Chance +25% (one-time) */
export const chBombSuperCrit: Source = {
  key: 'challenges.bombSuperCrit', name: 'Challenge: Bomb Super Crit Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.25, inputs: [],
}
/** Regular: Bomb Ultra Crit Chance +5% (paired with above) */
export const chBombUltraCritRegular: Source = {
  key: 'challenges.bombUltraCritRegular', name: 'Challenge: Bomb Ultra Crit Chance (Regular)', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.05, inputs: [],
}
export const chPickaxeSuperCritChance: Source = {
  key: 'challenges.pickaxeSuperCritChance', name: 'Challenge: Pickaxe Super Crit Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.02, inputs: [],
}
/** Regular: Pickaxe AND Bomb Super Crit Chance +2%, max 3. Wired to both stats in formula. */
export const chPickaxeBombSuperCrit: Source = {
  key: 'challenges.pickaxeBombSuperCrit', name: 'Challenge: P&B Super Crit Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.02, inputs: [],
}
/** Regular: Bar Craft Costs -5% per level. Max 2. Positive fn per reduction convention. → bar_craft_cost_multi */
export const chBarCraftCosts: Source = {
  key: 'challenges.barCraftCosts', name: 'Challenge: Bar Craft Costs', system: 'challenges',
  maxLevel: 2, fn: (n) => n * 0.05, inputs: [],
}
export const chGoldenVeinMul: Source = {
  key: 'challenges.goldenVeinMul', name: 'Challenge: Golden Vein Multi', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.05, inputs: [],
}
export const chFreebieGemsBonus: Source = {
  key: 'challenges.freebieGemsBonus', name: 'Challenge: Gems from Freebie Pack', system: 'challenges',
  maxLevel: 1, fn: (n) => n, inputs: [],
}

// ─── Extreme Challenge Rewards ────────────────────────────────────────────────

/**
 * Extreme: Pickaxe Damage +2% per Obelisk Level, per bought level. Max 3.
 * → pickaxe_damage
 */
export const chPickaxeDmgPerObelisk: Source = {
  key: 'challenges.pickaxeDmgPerObelisk', name: 'Extreme: Pickaxe Dmg/Obelisk Level', system: 'challenges',
  maxLevel: 3,
  fn: (n, rt) => n * 0.02 * (rt['obeliskLevel'] ?? 0),
  inputs: [{ key: 'obeliskLevel', label: 'Obelisk Level', type: 'integer', min: 0 }],
}
export const chGoldenFloorMul: Source = {
  key: 'challenges.goldenFloorMul', name: 'Extreme Challenge: Golden Floor Multi', system: 'challenges',
  maxLevel: 2, fn: (n) => n * 1.0, inputs: [],
}
/** Extreme: Lootbug Spawn Rate +10%, max 1. → lootbug_spawn_rate */
export const chLootbugSpawn: Source = {
  key: 'challenges.lootbugSpawn', name: 'Extreme: Lootbug Spawn Rate', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.10, inputs: [],
}
export const chSuperStarSpawn: Source = {
  key: 'challenges.superStarSpawn', name: 'Extreme Challenge: Super Star Spawn Rate', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.10, inputs: [],
}
// TODO no registry key: Extreme — Pet Level Cap +1, max 1
export const chRainbowFloorMulExtreme: Source = {
  key: 'challenges.rainbowFloorMulExtreme', name: 'Extreme Challenge: Rainbow Floor Multi', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.05, inputs: [],
}
export const chBombUltraCritExtreme: Source = {
  key: 'challenges.bombUltraCritExtreme', name: 'Extreme Challenge: Bomb Ultra Crit Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.04, inputs: [],
}
export const chFreebieBank: Source = {
  key: 'challenges.freebieBank', name: 'Extreme Challenge: Banked Freebie Cap', system: 'challenges',
  maxLevel: 1, fn: (n) => n, inputs: [],
}
/** Extreme: Galactic Rainbow Chance +2%, max 1. → galactic_floor_chance */
export const chGalacticFloor: Source = {
  key: 'challenges.galacticFloor', name: 'Extreme: Galactic Floor Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.02, inputs: [],
}

// ─── Divine Challenge Rewards ─────────────────────────────────────────────────

/** Divine: Super Star Supergiant Chance +0.50% per level. Max 3. → super_star_supergiant_chance */
export const chSuperStarSupergiants: Source = {
  key: 'challenges.superStarSupergiants', name: 'Divine: Super Star Supergiant Chance', system: 'challenges',
  maxLevel: 3, fn: (n) => n * 0.005, inputs: [],
}
/** Divine: Shiny Fish Multiplier +10%, max 1. → fishing_shiny_multi */
export const chShinyFishMul: Source = {
  key: 'challenges.shinyFishMul', name: 'Divine: Shiny Fish Multi', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.10, inputs: [],
}
export const chGoldenOreChance: Source = {
  key: 'challenges.goldenOreChance', name: 'Divine Challenge: Golden Ore Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.01, inputs: [],
}
/** Divine: Star Supergiant Chance +2%, max 1. → star_supergiant_chance */
export const chStarSupergiants: Source = {
  key: 'challenges.starSupergiants', name: 'Divine: Star Supergiant Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.02, inputs: [],
}
/** Divine: Star Spawn Rate +5%, max 2. → star_spawn_rate */
export const chStarSpawnRate: Source = {
  key: 'challenges.starSpawnRate', name: 'Divine: Star Spawn Rate', system: 'challenges',
  maxLevel: 2, fn: (n) => n * 0.05, inputs: [],
}
/** Divine: Golden (Loot)frog Chance +1%, max 1. → lootfrog_golden_chance */
export const chGoldenFrogChance: Source = {
  key: 'challenges.goldenFrogChance', name: 'Divine: Golden Frog Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.01, inputs: [],
}
export const chSuperStonksChance: Source = {
  key: 'challenges.superStonksChance', name: 'Divine Challenge: Super Stonks Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.01, inputs: [],
}
/** Divine: Novagiant Combo Multi +20%, max 1. → novagiant_combo_multi */
export const chNovagiantComboMul: Source = {
  key: 'challenges.novagiantComboMul', name: 'Divine: Novagiant Combo Multi', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.20, inputs: [],
}
/** Divine: Divine Relic Caps +2, max 1. → artifact_tier4_cap_increase */
export const chDivineRelicCaps: Source = {
  key: 'challenges.divineRelicCaps', name: 'Divine: Divine Relic Caps', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 2, inputs: [],
}
/** Divine: Big Lootfrog Chance +0.50%, max 1. → lootfrog_big_chance */
export const chBigLootfrogChance: Source = {
  key: 'challenges.bigLootfrogChance', name: 'Divine: Big Lootfrog Chance', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.005, inputs: [],
}
/** Divine: All Stonks Multipliers ×1.15 (additive +15%), max 1. → stonks_multi */
export const chAllStonksMulStonks: Source = {
  key: 'challenges.allStonksMulStonks', name: 'Divine: All Stonks Multi (stonks)', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.15, inputs: [],
}
/** Divine: All Stonks Multipliers ×1.15 (additive +15%), max 1. → ultra_stonks_multi */
export const chAllStonksMulUltra: Source = {
  key: 'challenges.allStonksMulUltra', name: 'Divine: All Stonks Multi (ultra)', system: 'challenges',
  maxLevel: 1, fn: (n) => n * 0.15, inputs: [],
}

export const challengeSources = {
  // Regular
  chBarUpgradeCosts,
  chPickaxeSuperCritDmg, chExpPrestigePts, chBombCap, chBombCritDmg,
  chPickaxeDmgPerChallenge, chSkillShardChance,
  chOreSellPrice, chDoubleCraft, chBombSuperCrit, chBombUltraCritRegular,
  chPickaxeDmgPerSkillNode, chObeliskArmor,
  chPickaxeSuperCritChance, chPickaxeBombSuperCrit, chBarCraftCosts,
  chGoldenVeinMul, chFreebieGemsBonus,
  // Extreme
  chPickaxeDmgPerObelisk, chGoldenFloorMul, chLootbugSpawn, chFreebieBank,
  chSuperStarSpawn, chRainbowFloorMulExtreme, chBombUltraCritExtreme, chGalacticFloor,
  // Divine
  chSuperStarSupergiants, chShinyFishMul, chGoldenOreChance, chStarSupergiants,
  chStarSpawnRate, chGoldenFrogChance, chSuperStonksChance, chNovagiantComboMul,
  chDivineRelicCaps, chBigLootfrogChance, chAllStonksMulStonks, chAllStonksMulUltra,
}

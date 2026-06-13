import type { Op, Source } from '$lib/engine/types'

// Challenge reward sources. Most are leveled; the "per X" damage rewards scale
// with a runtime count (pass fn + inputs). statKey/op mirror the formula wiring
// (consistency test enforces op where used). A source feeding two stats keeps its
// primary statKey and adds a sibling object sharing the key for the second stat.
// Reduction-convention sources (bar/craft costs, obelisk armor) use a positive fn.

const ch = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
  inputs: Source['inputs'] = [],
): Source => ({
  key: `challenges.${key}`,
  name,
  system: 'challenges',
  maxLevel,
  statKey,
  op,
  fn,
  inputs,
})

// ─── Regular Challenge Rewards ────────────────────────────────────────────────

export const chBarUpgradeCosts = ch('barUpgradeCosts', 'Challenge: Bar Upgrade Costs', 3, 'bar_upgrade_cost_reduction', '+', (n) => n * 0.05)
// TODO no registry key: Regular — Chain Bomb Amount +1, max 3
export const chPickaxeSuperCritDmg = ch('pickaxeSuperCritDmg', 'Challenge: Pickaxe Super Crit Damage', 3, 'pickaxe_super_crit_damage', '+', (n) => n * 0.1)
// EXP & Prestige Points feeds both stats.
export const chExpPrestigePts = ch('expPrestigePts', 'Challenge: EXP & Prestige Points', 3, 'prestige_point_multi', '+', (n) => n * 0.1)
export const chExpPrestigePtsExp = ch('expPrestigePts', 'Challenge: EXP & Prestige Points', 3, 'experience_multi', '+', (n) => n * 0.1)
export const chBombCap = ch('bombCap', 'Challenge: Bomb Capacity', 1, 'bomb_capacity', '+', (n) => n * 3)
export const chBombCritDmg = ch('bombCritDmg', 'Challenge: Bomb Crit Damage', 3, 'bomb_crit_damage', '+', (n) => n * 0.2)
export const chPickaxeDmgPerChallenge = ch('pickaxeDmgPerChallenge', 'Challenge: Pickaxe Dmg/Challenge', 3, 'pickaxe_damage', '+', (n, rt) => n * 0.01 * (rt['challengesCompleted'] ?? 0), [{ key: 'challengesCompleted', label: 'Regular Challenges Completed', type: 'integer', min: 0 }])
export const chSkillShardChance = ch('skillShardChance', 'Challenge: Skill Shard Chance', 1, 'freebie_chance_for_skill_shard', '+', (n) => n * 0.01)
export const chOreSellPrice = ch('oreSellPrice', 'Challenge: Ore Sell Price', 3, 'ore_sell_price_multi', '+', (n) => n * 0.15)
export const chDoubleCraft = ch('doubleCraft', 'Challenge: Double Craft Chance', 3, 'double_craft_chance', '+', (n) => n * 0.03)
export const chBombSuperCrit = ch('bombSuperCrit', 'Challenge: Bomb Super Crit Chance', 1, 'bomb_super_crit_chance', '+', (n) => n * 0.25)
export const chBombUltraCritRegular = ch('bombUltraCritRegular', 'Challenge: Bomb Ultra Crit Chance (Regular)', 1, 'bomb_ultra_crit_chance', '+', (n) => n * 0.05)
export const chPickaxeDmgPerSkillNode = ch('pickaxeDmgPerSkillNode', 'Challenge: Pickaxe Dmg/Skill Node', 3, 'pickaxe_damage', '+', (n, rt) => n * 0.01 * (rt['skillNodesUnlocked'] ?? 0), [{ key: 'skillNodesUnlocked', label: 'Skill-Tree Nodes Unlocked', type: 'integer', min: 0 }])
export const chObeliskArmor = ch('obeliskArmor', 'Challenge: Obelisk Armor', 1, 'obelisk_armor_reduction', '+', (n) => n * 0.12)
export const chPickaxeSuperCritChance = ch('pickaxeSuperCritChance', 'Challenge: Pickaxe Super Crit Chance', 3, 'pickaxe_super_crit_chance', '+', (n) => n * 0.02)
// Pickaxe AND Bomb Super Crit Chance feeds both stats.
export const chPickaxeBombSuperCrit = ch('pickaxeBombSuperCrit', 'Challenge: P&B Super Crit Chance', 3, 'pickaxe_super_crit_chance', '+', (n) => n * 0.02)
export const chPickaxeBombSuperCritBomb = ch('pickaxeBombSuperCrit', 'Challenge: P&B Super Crit Chance', 3, 'bomb_super_crit_chance', '+', (n) => n * 0.02)
export const chBarCraftCosts = ch('barCraftCosts', 'Challenge: Bar Craft Costs', 2, 'bar_craft_cost_multi', '+', (n) => n * 0.05)
export const chGoldenVeinMul = ch('goldenVeinMul', 'Challenge: Golden Vein Multi', 3, 'golden_vein_multi', '+', (n) => n * 0.05)
export const chFreebieGemsBonus = ch('freebieGemsBonus', 'Challenge: Gems from Freebie Pack', 1, 'freebie_gems_bonus', '+', (n) => n)

// ─── Extreme Challenge Rewards ────────────────────────────────────────────────

export const chPickaxeDmgPerObelisk = ch('pickaxeDmgPerObelisk', 'Extreme: Pickaxe Dmg/Obelisk Level', 3, 'pickaxe_damage', '+', (n, rt) => n * 0.02 * (rt['obeliskLevel'] ?? 0), [{ key: 'obeliskLevel', label: 'Obelisk Level', type: 'integer', min: 0 }])
export const chGoldenFloorMul = ch('goldenFloorMul', 'Extreme Challenge: Golden Floor Multi', 2, 'golden_floor_multi', '+', (n) => n * 1.0)
export const chLootbugSpawn = ch('lootbugSpawn', 'Extreme: Lootbug Spawn Rate', 1, 'lootbug_spawn_rate', '+', (n) => n * 0.1)
export const chSuperStarSpawn = ch('superStarSpawn', 'Extreme Challenge: Super Star Spawn Rate', 1, 'super_star_spawn_multi', '+', (n) => n * 0.1)
// TODO no registry key: Extreme — Pet Level Cap +1, max 1
export const chRainbowFloorMulExtreme = ch('rainbowFloorMulExtreme', 'Extreme Challenge: Rainbow Floor Multi', 3, 'rainbow_floor_multi', '+', (n) => n * 0.05)
export const chBombUltraCritExtreme = ch('bombUltraCritExtreme', 'Extreme Challenge: Bomb Ultra Crit Chance', 3, 'bomb_ultra_crit_chance', '+', (n) => n * 0.04)
export const chFreebieBank = ch('freebieBank', 'Extreme Challenge: Banked Freebie Cap', 1, 'freebie_bank_cap', '+', (n) => n)
export const chGalacticFloor = ch('galacticFloor', 'Extreme: Galactic Floor Chance', 1, 'galactic_floor_chance', '+', (n) => n * 0.02)

// ─── Divine Challenge Rewards ─────────────────────────────────────────────────

export const chSuperStarSupergiants = ch('superStarSupergiants', 'Divine: Super Star Supergiant Chance', 3, 'super_star_supergiant_chance', '+', (n) => n * 0.005)
export const chShinyFishMul = ch('shinyFishMul', 'Divine: Shiny Fish Multi', 1, 'fishing_shiny_multi', '+', (n) => n * 0.1)
export const chGoldenOreChance = ch('goldenOreChance', 'Divine Challenge: Golden Ore Chance', 1, 'golden_ore_chance', '+', (n) => n * 0.01)
export const chStarSupergiants = ch('starSupergiants', 'Divine: Star Supergiant Chance', 1, 'star_supergiant_chance', '+', (n) => n * 0.02)
export const chStarSpawnRate = ch('starSpawnRate', 'Divine: Star Spawn Rate', 2, 'star_spawn_rate', '+', (n) => n * 0.05)
export const chGoldenFrogChance = ch('goldenFrogChance', 'Divine: Golden Frog Chance', 1, 'lootfrog_golden_chance', '+', (n) => n * 0.01)
export const chSuperStonksChance = ch('superStonksChance', 'Divine Challenge: Super Stonks Chance', 1, 'super_stonks_chance', '+', (n) => n * 0.01)
export const chNovagiantComboMul = ch('novagiantComboMul', 'Divine: Novagiant Combo Multi', 1, 'novagiant_combo_multi', '+', (n) => n * 0.2)
export const chDivineRelicCaps = ch('divineRelicCaps', 'Divine: Divine Relic Caps', 1, 'artifact_tier4_cap_increase', '+', (n) => n * 2)
export const chBigLootfrogChance = ch('bigLootfrogChance', 'Divine: Big Lootfrog Chance', 1, 'lootfrog_big_chance', '+', (n) => n * 0.005)
export const chAllStonksMulStonks = ch('allStonksMulStonks', 'Divine: All Stonks Multi (stonks)', 1, 'stonks_multi', '+', (n) => n * 0.15)
export const chAllStonksMulUltra = ch('allStonksMulUltra', 'Divine: All Stonks Multi (ultra)', 1, 'ultra_stonks_multi', '+', (n) => n * 0.15)

export const challengeSources = {
  chBarUpgradeCosts,
  chPickaxeSuperCritDmg,
  chExpPrestigePts,
  chExpPrestigePtsExp,
  chBombCap,
  chBombCritDmg,
  chPickaxeDmgPerChallenge,
  chSkillShardChance,
  chOreSellPrice,
  chDoubleCraft,
  chBombSuperCrit,
  chBombUltraCritRegular,
  chPickaxeDmgPerSkillNode,
  chObeliskArmor,
  chPickaxeSuperCritChance,
  chPickaxeBombSuperCrit,
  chPickaxeBombSuperCritBomb,
  chBarCraftCosts,
  chGoldenVeinMul,
  chFreebieGemsBonus,
  chPickaxeDmgPerObelisk,
  chGoldenFloorMul,
  chLootbugSpawn,
  chFreebieBank,
  chSuperStarSpawn,
  chRainbowFloorMulExtreme,
  chBombUltraCritExtreme,
  chGalacticFloor,
  chSuperStarSupergiants,
  chShinyFishMul,
  chGoldenOreChance,
  chStarSupergiants,
  chStarSpawnRate,
  chGoldenFrogChance,
  chSuperStonksChance,
  chNovagiantComboMul,
  chDivineRelicCaps,
  chBigLootfrogChance,
  chAllStonksMulStonks,
  chAllStonksMulUltra,
}

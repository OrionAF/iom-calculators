import type { Op, Source } from '$lib/engine/types'

// Upgrade sources own all upgrade effect numbers. Most are leveled (fn = level ×
// rate); a few scale with a runtime count (cards/statues/poly cards owned) and pass
// fn + inputs. statKey/op mirror the formula wiring (consistency test enforces op
// where used). A source feeding two stats keeps its primary statKey and adds a
// sibling object sharing the key for the second stat.

const STATUE_COUNT_INPUT = { key: 'statueCount', label: 'Statues Owned', type: 'integer' as const, min: 0 }
const CARDS_OWNED_INPUT = { key: 'cardsOwned', label: 'Cards Owned (total count)', type: 'integer' as const, min: 0 }
const POLY_CARD_INPUT = { key: 'polyCardCount', label: 'Polychrome Cards Owned', type: 'integer' as const, min: 0 }

const up = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
  inputs: Source['inputs'] = [],
): Source => ({
  key: `upgrades.${key}`,
  name,
  system: 'upgrades',
  maxLevel,
  statKey,
  op,
  fn,
  inputs,
})

// ─── World 1 ──────────────────────────────────────────────────────────────────

// Upgrade Pickaxe — base pickaxe damage (Level+1)(Level+2)/2, 0 at level 0.
export const upgrUpgradePickaxe = up('upgradePickaxe', 'Upgrade Pickaxe', 155, 'pickaxe_damage', '+', (l) => (l === 0 ? 0 : ((l + 1) * (l + 2)) / 2))
export const upgrPickaxeRadius = up('pickaxeRadius', 'Pickaxe Radius', 16, 'pickaxe_radius_percent', '+', (l) => l * 0.08)
export const upgrCritChance1 = up('critChance1', 'Pickaxe Crit Chance (W1-1)', 16, 'pickaxe_crit_chance', '+', (l) => l * 0.02)
export const upgrDoubleCraftChance = up('doubleCraftChance', 'Double Craft Chance', 16, 'double_craft_chance', '+', (l) => l * 0.02)
export const upgrTripleRockChance = up('tripleRockChance', 'Triple Rock Chance', 16, 'multi_rock_chance', '+', (l) => l * 0.01)
export const upgrBombDmg1 = up('bombDmg1', 'Bomb Damage (W1-1)', 16, 'bomb_damage', '+', (l) => l * 0.2)
export const upgrOreSellPrice = up('oreSellPrice', 'Ore Sell Price', 16, 'ore_sell_price_multi', '+', (l) => l * 0.1)
export const upgrCritDmg1 = up('critDmg1', 'Pickaxe Crit Damage (W1-1)', 11, 'pickaxe_crit_damage', '+', (l) => l * 0.05)
export const upgrPickaxeDmg1 = up('pickaxeDmg1', 'Pickaxe Damage (W1-1)', 16, 'pickaxe_damage', '+', (l) => l * 0.1)
export const upgrFreeBombChance = up('freeBombChance', 'Free Bomb Chance', 16, 'bomb_free_chance', '+', (l) => l * 0.01)
export const upgrCritChance2 = up('critChance2', 'Pickaxe Crit Chance (W1-2)', 16, 'pickaxe_crit_chance', '+', (l) => l * 0.02)
export const upgrPickaxeDmg2 = up('pickaxeDmg2', 'Pickaxe Damage (W1-2)', 16, 'pickaxe_damage', '+', (l) => l * 0.15)
export const upgrAttackSpeed1 = up('attackSpeed1', 'Pickaxe Attack Speed (W1-1)', 16, 'pickaxe_attack_speed_per_second', '+', (l) => l * 0.02)
export const upgrCritDmg2 = up('critDmg2', 'Pickaxe Crit Damage (W1-2)', 11, 'pickaxe_crit_damage', '+', (l) => l * 0.06)
export const upgrBombRechargeRate = up('bombRechargeRate', 'Bomb Recharge Rate', 16, 'bomb_recharge_speed', '+', (l) => l * 0.01)
export const upgrPickaxeDmg3 = up('pickaxeDmg3', 'Pickaxe Damage (W1-3)', 16, 'pickaxe_damage', '+', (l) => l * 0.2)
export const upgrBombDmg2 = up('bombDmg2', 'Bomb Damage (W1-2)', 16, 'bomb_damage', '+', (l) => l * 0.4)
export const upgrBombCritDmg1 = up('bombCritDmg1', 'Bomb Crit Damage (W1-1)', 16, 'bomb_crit_damage', '+', (l) => l * 0.08)
export const upgrSuperCritChance1 = up('superCritChance1', 'Pickaxe Super Crit Chance (W1)', 16, 'pickaxe_super_crit_chance', '+', (l) => l * 0.01)
export const upgrAttackSpeed2 = up('attackSpeed2', 'Pickaxe Attack Speed (W1-2)', 16, 'pickaxe_attack_speed_per_second', '+', (l) => l * 0.02)
export const upgrPickaxeDmg4 = up('pickaxeDmg4', 'Pickaxe Damage (W1-4)', 16, 'pickaxe_damage', '+', (l) => l * 0.28)
export const upgrBombCritDmg2 = up('bombCritDmg2', 'Bomb Crit Damage (W1-2)', 16, 'bomb_crit_damage', '+', (l) => l * 0.12)
export const upgrSuperCritDmg = up('superCritDmg', 'Pickaxe Super Crit Damage', 11, 'pickaxe_super_crit_damage', '+', (l) => l * 0.1)
export const upgrCritChance3 = up('critChance3', 'Pickaxe Crit Chance (W1-3)', 16, 'pickaxe_crit_chance', '+', (l) => l * 0.02)
export const upgrPickaxeDmg5 = up('pickaxeDmg5', 'Pickaxe Damage (W1-5)', 21, 'pickaxe_damage', '+', (l) => l * 0.35)
export const upgrObeliskArmor = up('obeliskArmor', 'Obelisk Armor Reduction', 16, 'obelisk_armor_reduction', '+', (l) => l * -0.02)
export const upgrUltraCritChance1 = up('ultraCritChance1', 'Pickaxe Ultra Crit Chance (W1)', 16, 'pickaxe_ultra_crit_chance', '+', (l) => l * 0.01)
export const upgrMeterFillRate = up('meterFillRate', 'Meter Fill Rate', 16, 'chest_meter_multi', '+', (l) => l * 2)
export const upgrBombUltraCrit1 = up('bombUltraCrit1', 'Bomb Ultra Crit Chance (W1)', 16, 'bomb_ultra_crit_chance', '+', (l) => l * 0.01)
export const upgrTripleCraftChance = up('tripleCraftChance', 'Triple Craft Chance', 16, 'triple_craft_chance', '+', (l) => l * 0.01)
export const upgrPickaxeDmgPerCard = up('pickaxeDmgPerCard', 'Pickaxe Damage Per Card Owned', 16, 'pickaxe_damage', '+', (l, rt) => l * (rt['cardsOwned'] ?? 0) * 0.01, [CARDS_OWNED_INPUT])

// ─── World 2 ──────────────────────────────────────────────────────────────────

export const upgrBombDmg3 = up('bombDmg3', 'Bomb Damage (W2)', 50, 'bomb_damage', '+', (l) => l * 0.25)
export const upgrSuperCritChance2 = up('superCritChance2', 'Pickaxe Super Crit Chance (W2)', 21, 'pickaxe_super_crit_chance', '+', (l) => l * 0.01)
export const upgrGoldenVeinChance = up('goldenVeinChance', 'Golden Vein Chance', 16, 'golden_vein_chance', '+', (l) => l * 0.005)
export const upgrPickaxeDmgPerStatue1 = up('pickaxeDmgPerStatue1', 'Pickaxe Damage Per Statue (W2-1)', 100, 'pickaxe_damage', '+', (l, rt) => l * (rt['statueCount'] ?? 0) * 0.05, [STATUE_COUNT_INPUT])
export const upgrExpGain = up('expGain', 'Experience Gain', 100, 'experience_multi', '+', (l) => l * 0.15)
export const upgrUltraCritChance2 = up('ultraCritChance2', 'Pickaxe Ultra Crit Chance (W2)', 16, 'pickaxe_ultra_crit_chance', '+', (l) => l * 0.01)
export const upgrBarOutputMul = up('barOutputMul', 'Bar Output Multiplier', 16, 'bar_output_multi', '+', (l) => l * 0.01)
export const upgrOmegaCritChance = up('omegaCritChance', 'Omega Crit Chance', 16, 'pickaxe_omega_crit_chance', '+', (l) => l * 0.01)
export const upgrBombUltraCrit2 = up('bombUltraCrit2', 'Bomb Ultra Crit Chance (W2)', 21, 'bomb_ultra_crit_chance', '+', (l) => l * 0.01)
export const upgrLootbugSpawnRate = up('lootbugSpawnRate', 'Lootbug Spawn Rate', 21, 'lootbug_spawn_rate', '+', (l) => l * 0.01)
export const upgrPickaxeDmgPerStatue2 = up('pickaxeDmgPerStatue2', 'Pickaxe Damage Per Statue (W2-2)', 100, 'pickaxe_damage', '+', (l, rt) => l * (rt['statueCount'] ?? 0) * 0.08, [STATUE_COUNT_INPUT])
export const upgrPickaxeDmgMul1 = up('pickaxeDmgMul1', 'Pickaxe Damage ×0.02 (W2)', 50, 'pickaxe_damage', '×', (l) => 1 + l * 0.02)
export const upgrBombDmgMul1 = up('bombDmgMul1', 'Bomb Damage ×0.02 (W2)', 50, 'bomb_damage', '×', (l) => 1 + l * 0.02)
export const upgrTripleContractChance = up('tripleContractChance', 'Triple Contract Chance', 20, 'contract_triple_points_chance', '+', (l) => l * 0.005)
export const upgrSuperStar10xChance = up('superStar10xChance', '10× Super Star Chance', 20, 'super_star_10x_chance', '+', (l) => l * 0.001)
export const upgrFuelSaveChance = up('fuelSaveChance', 'Fuel Save Chance', 50, 'coal_fuel_save_chance', '+', (l) => l * 0.0015)
export const upgrPickaxeDmgPerPolyCard = up('pickaxeDmgPerPolyCard', 'Pickaxe Damage Per Poly Card', 50, 'pickaxe_damage', '+', (l, rt) => l * (rt['polyCardCount'] ?? 0) * 0.02, [POLY_CARD_INPUT])
export const upgrRainbowVeinChance = up('rainbowVeinChance', 'Rainbow Vein Chance', 30, 'rainbow_vein_chance', '+', (l) => l * 0.0025)
export const upgrRainbowFloorMul = up('rainbowFloorMul', 'Rainbow Floor Multi', 40, 'rainbow_floor_multi', '+', (l) => l * 0.005)

// ─── World 3 ──────────────────────────────────────────────────────────────────

export const upgrPickaxeDmgMul2 = up('pickaxeDmgMul2', 'Pickaxe Damage ×0.04 (W3)', 50, 'pickaxe_damage', '×', (l) => 1 + l * 0.04)
export const upgrBombDmgMul2 = up('bombDmgMul2', 'Bomb Damage ×0.04 (W3)', 50, 'bomb_damage', '×', (l) => 1 + l * 0.04)
export const upgrGoldenFloorMul = up('goldenFloorMul', 'Golden Floor Multi', 30, 'golden_floor_multi', '+', (l) => l * 0.01)
export const upgrPetLevelChance = up('petLevelChance', 'Pet Level Up Chance', 50, 'pet_levelup_chance_multi', '+', (l) => l * 0.0012)
export const upgrCraft10xChance = up('craft10xChance', '10× Craft Chance', 50, 'craft_10x_chance', '+', (l) => l * 0.001)
export const upgrBombOmegaCrit = up('bombOmegaCrit', 'Bomb Omega Crit Chance', 50, 'bomb_omega_crit_chance', '+', (l) => l * 0.01)
export const upgrGoldenVeinMul = up('goldenVeinMul', 'Golden Vein Multi', 50, 'golden_vein_multi', '+', (l) => l * 0.01)
export const upgrGalacticFloorChance1 = up('galacticFloorChance1', 'Galactic Rainbow Chance (W3)', 50, 'galactic_floor_chance', '+', (l) => l * 0.001)
// Pickaxe & Bomb Damage feeds both, multiplicatively.
export const upgrPickaxeAndBombDmgW3 = up('pickaxeAndBombDmgW3', 'Pickaxe & Bomb Damage ×0.06 (W3)', 50, 'pickaxe_damage', '×', (l) => 1 + l * 0.06)
export const upgrPickaxeAndBombDmgW3Bomb = up('pickaxeAndBombDmgW3', 'Pickaxe & Bomb Damage ×0.06 (W3)', 50, 'bomb_damage', '×', (l) => 1 + l * 0.06)
export const upgrGoldenOreMul = up('goldenOreMul', 'Golden Ore Multi', 50, 'golden_ore_multi', '+', (l) => l * 0.02)
export const upgrStarSupergiantChance = up('starSupergiantChance', 'Star Supergiant Chance', 50, 'star_supergiant_chance', '+', (l) => l * 0.001)
export const upgrGameSpeed = up('gameSpeed', 'Base Game Speed', 50, 'game_speed_multi', '+', (l) => l * 0.001)
export const upgrFishingDronePower = up('fishingDronePower', 'Fishing Drone Base Power', 50, 'fishing_drone_power', '+', (l) => l * 0.1)
export const upgrFuelDuration = up('fuelDuration', 'Fuel Duration', 50, 'coal_fuel_duration_multi', '+', (l) => l * 0.0015)
export const upgrSuperStarSupergiantMul = up('superStarSupergiantMul', 'Super Star Supergiant Multi', 50, 'super_star_supergiant_multi', '+', (l) => l * 0.002)
export const upgrRainbowVeinMul = up('rainbowVeinMul', 'Rainbow Vein Multi', 50, 'rainbow_vein_multi', '+', (l) => l * 0.02)
export const upgrPetSkinLevelUpChance = up('petSkinLevelUpChance', 'Pet Skin Level Up Chance', 50, 'pet_levelup_chance_multi', '+', (l) => l * 0.001)
export const upgrPolychromeOreCardMulti = up('polychromeOreCardMulti', 'Polychrome Ore Card Multi', 50, 'polychrome_card_bonus_ore', '+', (l) => l * 0.05)
export const upgrCraft100xChance = up('craft100xChance', '100× Craft Chance', 50, 'craft_100x_chance', '+', (l) => l * 0.0003)
export const upgrFreebieCooldown = up('freebieCooldown', 'Freebie Timer', 50, 'freebie_cooldown_seconds', '+', (l) => l * -1)

// ─── World 4 ──────────────────────────────────────────────────────────────────

export const upgrPickaxeDmgMul3 = up('pickaxeDmgMul3', 'Pickaxe Damage ×0.10 (W4)', 50, 'pickaxe_damage', '×', (l) => 1 + l * 0.1)
export const upgrBombDmgMul3 = up('bombDmgMul3', 'Bomb Damage ×0.10 (W4)', 50, 'bomb_damage', '×', (l) => 1 + l * 0.1)
export const upgrGalacticFloorChance2 = up('galacticFloorChance2', 'Galactic Rainbow Chance (W4)', 50, 'galactic_floor_chance', '+', (l) => l * 0.0015)
export const upgrVeinIncomeMul = up('veinIncomeMul', 'Vein Income Multi', 50, 'vein_income_multi', '+', (l) => l * 0.0045)
export const upgrStarSupergiantMul = up('starSupergiantMul', 'Star Supergiant Multi', 50, 'star_supergiant_multi', '+', (l) => l * 0.003)
export const upgrRainbowVoidMul = up('rainbowVoidMul', 'Rainbow Void Portal Multi', 50, 'rainbow_void_portal_multi', '+', (l) => l * 0.005)
export const upgrLootfrogLootMul = up('lootfrogLootMul', 'Lootfrog Loot Multi', 50, 'lootfrog_loot_multi', '+', (l) => l * 0.004)
export const upgrSuperStonksChance = up('superStonksChance', 'Super Stonks Chance', 50, 'super_stonks_chance', '+', (l) => l * 0.0002)
// Pickaxe & Bomb Damage feeds both, multiplicatively.
export const upgrPickaxeAndBombDmgW4 = up('pickaxeAndBombDmgW4', 'Pickaxe & Bomb Damage ×0.08 (W4)', 50, 'pickaxe_damage', '×', (l) => 1 + l * 0.08)
export const upgrPickaxeAndBombDmgW4Bomb = up('pickaxeAndBombDmgW4', 'Pickaxe & Bomb Damage ×0.08 (W4)', 50, 'bomb_damage', '×', (l) => 1 + l * 0.08)
// Named "Chance" — wired to golden_void_portal_chance (corrected from _multi).
export const upgrGoldenVoidChance = up('goldenVoidChance', 'Golden Void Portal Chance', 50, 'golden_void_portal_chance', '+', (l) => l * 0.001)
export const upgrPrismaticFloorChance = up('prismaticFloorChance', 'Prismatic Floor Chance', 50, 'prismatic_floor_chance', '+', (l) => l * 0.001)
export const upgrPrismaticFloorMul = up('prismaticFloorMul', 'Prismatic Floor Multi', 50, 'prismatic_floor_multi', '+', (l) => l * 0.005)

// ─── Collection ───────────────────────────────────────────────────────────────

export const upgradeSources = {
  upgrUpgradePickaxe,
  upgrPickaxeRadius,
  upgrCritChance1,
  upgrDoubleCraftChance,
  upgrTripleRockChance,
  upgrBombDmg1,
  upgrOreSellPrice,
  upgrCritDmg1,
  upgrPickaxeDmg1,
  upgrFreeBombChance,
  upgrCritChance2,
  upgrPickaxeDmg2,
  upgrAttackSpeed1,
  upgrCritDmg2,
  upgrBombRechargeRate,
  upgrPickaxeDmg3,
  upgrBombDmg2,
  upgrBombCritDmg1,
  upgrSuperCritChance1,
  upgrAttackSpeed2,
  upgrPickaxeDmg4,
  upgrBombCritDmg2,
  upgrSuperCritDmg,
  upgrCritChance3,
  upgrPickaxeDmg5,
  upgrObeliskArmor,
  upgrUltraCritChance1,
  upgrMeterFillRate,
  upgrBombUltraCrit1,
  upgrTripleCraftChance,
  upgrPickaxeDmgPerCard,
  upgrBombDmg3,
  upgrSuperCritChance2,
  upgrGoldenVeinChance,
  upgrPickaxeDmgPerStatue1,
  upgrExpGain,
  upgrUltraCritChance2,
  upgrBarOutputMul,
  upgrOmegaCritChance,
  upgrBombUltraCrit2,
  upgrLootbugSpawnRate,
  upgrPickaxeDmgPerStatue2,
  upgrPickaxeDmgMul1,
  upgrBombDmgMul1,
  upgrTripleContractChance,
  upgrSuperStar10xChance,
  upgrFuelSaveChance,
  upgrPickaxeDmgPerPolyCard,
  upgrRainbowVeinChance,
  upgrRainbowFloorMul,
  upgrPickaxeDmgMul2,
  upgrBombDmgMul2,
  upgrGoldenFloorMul,
  upgrPetLevelChance,
  upgrCraft10xChance,
  upgrBombOmegaCrit,
  upgrGoldenVeinMul,
  upgrGalacticFloorChance1,
  upgrPickaxeAndBombDmgW3,
  upgrPickaxeAndBombDmgW3Bomb,
  upgrGoldenOreMul,
  upgrStarSupergiantChance,
  upgrGameSpeed,
  upgrFishingDronePower,
  upgrFuelDuration,
  upgrSuperStarSupergiantMul,
  upgrRainbowVeinMul,
  upgrPetSkinLevelUpChance,
  upgrPolychromeOreCardMulti,
  upgrCraft100xChance,
  upgrFreebieCooldown,
  upgrPickaxeDmgMul3,
  upgrBombDmgMul3,
  upgrGalacticFloorChance2,
  upgrVeinIncomeMul,
  upgrStarSupergiantMul,
  upgrRainbowVoidMul,
  upgrLootfrogLootMul,
  upgrSuperStonksChance,
  upgrPickaxeAndBombDmgW4,
  upgrPickaxeAndBombDmgW4Bomb,
  upgrGoldenVoidChance,
  upgrPrismaticFloorChance,
  upgrPrismaticFloorMul,
}

import type { Op, Source } from '$lib/engine/types'

// Stargazing sources own all star/upgrade effect numbers. Sources are leveled
// (fn = level × rate) with no runtime inputs. Stars that feed several stats use
// several Source objects sharing one key, so the calculator asks for the star
// level once. statKey/op mirror the formula wiring (consistency test enforces op
// where used); effects with no registry stat carry no statKey.

const sg = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `stargazing.${key}`,
  name,
  system: 'stargazing',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Stargazing Upgrades ──────────────────────────────────────────────────────
// NOTE: 'Upgrade Telescope' (max 19) and 'Capper Upper' (max 5) — no stat key.

const autoCatch = sg('autoCatch', 'Auto-catch Stars (Upgrade)', 15, 'star_auto_catch_chance', '+', (l) => l * 0.04)
const spawnRate = sg('spawnRate', 'Star Spawn Rate (Upgrade)', 20, 'star_spawn_rate', '+', (l) => l * 0.05)
const doubleChance = sg('doubleChance', 'Double Star Chance (Upgrade)', 20, 'star_double_spawn_chance', '+', (l) => l * 0.05)
const superStarSpawn = sg('superStarSpawn', 'Super Star Spawn Rate (Upgrade)', 20, 'super_star_spawn_multi', '+', (l) => l * 0.02)
const novaChance = sg('novaChance', 'Star Supernova Chance (Upgrade)', 20, 'star_supernova_chance', '+', (l) => l * 0.005)
const super10xChance = sg('super10xChance', 'Super Star 10x Chance (Upgrade)', 20, 'super_star_10x_chance', '+', (l) => l * 0.002)
const supergiants = sg('supergiants', 'Star Supergiant Chance (Upgrade)', 20, 'star_supergiant_chance', '+', (l) => l * 0.002)
const superSupergiants = sg('superSupergiants', 'Super Star Supergiant Chance (Upgrade)', 20, 'super_star_supergiant_chance', '+', (l) => l * 0.0015)
const allStarMulti = sg('allStarMulti', 'All Star Multiplier (Upgrade)', 30, 'all_star_multi', '+', (l) => l * 0.01)
const superRadiant = sg('superRadiant', 'Super Star Radiant Chance (Upgrade)', 25, 'super_star_radiant_chance', '+', (l) => l * 0.0015)

// ─── Super Star Upgrades ──────────────────────────────────────────────────────
// NOTE: meta cap increases, grade caps, and 'Unlock the Black Hole' — no stat key.

const ssRainbowVeinChance = sg('ssRainbowVeinChance', 'Rainbow Vein Chance (Super Star)', 10, 'rainbow_vein_chance', '+', (l) => l * 0.01)
const ssDoubleContractPoints = sg('ssDoubleContractPoints', 'Double Contract Points (Super Star)', 10, 'contract_double_points_chance', '+', (l) => l * 0.02)
const ssExpGain = sg('ssExpGain', 'Experience Gain (Super Star)', 10, 'experience_multi', '+', (l) => l * 0.25)
const ssItemDuration = sg('ssItemDuration', 'Item Duration (Super Star)', 10, 'item_duration_multi', '+', (l) => l * 0.03)
const ssGameSpeed = sg('ssGameSpeed', 'Game Speed (Super Star)', 10, 'game_speed_multi', '+', (l) => l * 0.02)
const supergigantsMulti = sg('supergigantsMulti', 'Supergiant Star Multiplier (Super Star)', 20, 'star_supergiant_multi', '+', (l) => l * 0.1)
const ssGoldenOreMul = sg('ssGoldenOreMul', 'Golden Ore Multiplier (Super Star)', 15, 'golden_ore_multi', '+', (l) => l * 0.06)
// Banked Freebies & Lootbugs: two stats share one key (one UI level input).
const ssBankedFreebieLootbugFreebie = sg('ssBankedFreebieLootbug', 'Banked Freebies & Lootbugs (Super Star)', 5, 'freebie_bank_cap', '+', (l) => l * 1)
const ssBankedFreebieLootbugLootbug = sg('ssBankedFreebieLootbug', 'Banked Freebies & Lootbugs (Super Star)', 5, 'lootbug_bank_cap', '+', (l) => l * 1)
const ssLootbugLootMul = sg('ssLootbugLootMul', 'Lootbug Loot Multiplier (Super Star)', 20, 'lootbug_loot_multi', '+', (l) => l * 0.015)
const novagiant = sg('novagiant', 'Novagiant Combo Multiplier (Super Star)', 15, 'novagiant_combo_multi', '+', (l) => l * 0.02)
const ssFishIncomeMul = sg('ssFishIncomeMul', 'Fish Income Multiplier (Super Star)', 15, 'fishing_income_multi', '+', (l) => l * 0.0125)
const ssGalacticFloorChance = sg('ssGalacticFloorChance', 'Galactic Floor Chance (Super Star)', 20, 'galactic_floor_chance', '+', (l) => l * 0.0025)
const ssGoldenOreChance = sg('ssGoldenOreChance', 'Golden Ore Chance (Super Star)', 20, 'golden_ore_chance', '+', (l) => l * 0.003)
const radiantChance = sg('radiantChance', 'Star Radiant Chance (Super Star)', 20, 'star_radiant_chance', '+', (l) => l * 0.001)

// ─── Individual Stars ─────────────────────────────────────────────────────────
// Stars that feed multiple stats use one Source object per stat, sharing the key.

const starAriesVeinSpawn = sg('starAries', 'Aries (Star)', 28, 'vein_spawn_rate_multi', '+', (l) => l * 0.03)
const starAriesGoldenVein = sg('starAries', 'Aries (Star)', 28, 'golden_vein_chance', '+', (l) => l * 0.01)
const starTaurusPickaxeDmg = sg('starTaurus', 'Taurus (Star)', 22, 'pickaxe_damage', '+', (l) => l * 0.12)
const starTaurus = sg('starTaurus', 'Taurus (Star)', 22, 'star_auto_catch_chance', '+', (l) => l * 0.02)
const starGeminiGoldenFloor = sg('starGemini', 'Gemini (Star)', 34, 'golden_floor_multi', '×', (l) => 1 + l * 0.02)
const starGemini = sg('starGemini', 'Gemini (Star)', 34, 'star_spawn_rate', '+', (l) => l * 0.02)
const starCancerDoubleContract = sg('starCancer', 'Cancer (Star)', 48, 'contract_double_points_chance', '+', (l) => l * 0.01)
const starCancerContractCost = sg('starCancer', 'Cancer (Star)', 48, 'contract_upgrade_cost_reduction', '+', (l) => l * 0.01)
// Leo feeds super-star triple chance and bomb workshop cap (one upgrade, two stats).
const starLeo = sg('starLeo', 'Leo (Star)', 5, 'super_star_triple_chance', '+', (l) => l * 0.04)
const starLeoWorkshopCap = sg('starLeo', 'Leo (Star)', 5, 'bomb_workshop_cap_increase', '+', (l) => l * 1)
const starVirgoRecharge = sg('starVirgo', 'Virgo (Star)', 30, 'bomb_recharge_speed', '+', (l) => l * 0.01)
const starVirgo = sg('starVirgo', 'Virgo (Star)', 30, 'super_star_spawn_multi', '+', (l) => l * 0.01)
const starLibraPrestige = sg('starLibra', 'Libra (Star)', 22, 'prestige_point_multi', '+', (l) => l * 0.05)
const starLibraTripleLootbug = sg('starLibra', 'Libra (Star)', 22, 'lootbug_triple_chance', '+', (l) => l * 0.01)
const starScorpioPickaxeDmg = sg('starScorpio', 'Scorpio (Star)', 117, 'pickaxe_damage', '+', (l) => l * 0.15)
const starScorpio = sg('starScorpio', 'Scorpio (Star)', 117, 'all_star_multi', '+', (l) => l * 0.005)
const starSagittariusLootbugSpawn = sg('starSagittarius', 'Sagittarius (Star)', 17, 'lootbug_spawn_rate', '+', (l) => l * 0.02)
const starSagittarius = sg('starSagittarius', 'Sagittarius (Star)', 17, 'star_triple_spawn_chance', '+', (l) => l * 0.01)
const starCapricornExp = sg('starCapricorn', 'Capricorn (Star)', 63, 'experience_multi', '+', (l) => l * 0.15)
const starCapricornItemDuration = sg('starCapricorn', 'Capricorn (Star)', 63, 'item_duration_multi', '+', (l) => l * 0.01)
const starAquariusBarCraft = sg('starAquarius', 'Aquarius (Star)', 25, 'bar_craft_cost_multi', '+', (l) => l * 0.01)
const starAquariusGoldenLootbug = sg('starAquarius', 'Aquarius (Star)', 25, 'lootbug_golden_chance', '+', (l) => l * 0.01)
const starPiscesRainbowFloor = sg('starPisces', 'Pisces (Star)', 4, 'rainbow_floor_multi', '+', (l) => l * 10)
const starOphiuchusFreebie = sg('starOphiuchus', 'Ophiuchus (Star)', 19, 'freebie_bank_cap', '+', (l) => l * 1)
const starOphiuchusLootbug = sg('starOphiuchus', 'Ophiuchus (Star)', 19, 'lootbug_bank_cap', '+', (l) => l * 1)
const starOrionCraft100x = sg('starOrion', 'Orion (Star)', 43, 'craft_100x_chance', '+', (l) => l * 0.001)
const starOrionGoldenOre = sg('starOrion', 'Orion (Star)', 43, 'golden_ore_chance', '+', (l) => l * 0.0025)
const starHercules = sg('starHercules', 'Hercules (Star)', 55, 'star_supernova_chance', '+', (l) => l * 0.0015)
const starHerculesGoldenOreMul = sg('starHercules', 'Hercules (Star)', 55, 'golden_ore_multi', '+', (l) => l * 0.08)
const starDracoGalacticChance = sg('starDraco', 'Draco (Star)', 40, 'galactic_floor_chance', '+', (l) => l * 0.0025)
const starDracoGalacticMul = sg('starDraco', 'Draco (Star)', 40, 'galactic_floor_multi', '+', (l) => l * 0.1)
const starCetusPolyCardMul = sg('starCetus', 'Cetus (Star)', 32, 'polychrome_card_bonus_ore', '+', (l) => l * 0.15)
const starCetusFishIncome = sg('starCetus', 'Cetus (Star)', 32, 'fishing_income_multi', '+', (l) => l * 0.02)
const starEridanusAllFloor = sg('starEridanus', 'Eridanus (Star)', 22, 'all_floor_multipliers', '+', (l) => l * 0.02)
const starEridanusStonksMul = sg('starEridanus', 'Eridanus (Star)', 22, 'stonks_multi', '+', (l) => l * 0.02)
const starEridanusSuperStonks = sg('starEridanus', 'Eridanus (Star)', 22, 'super_stonks_chance', '+', (l) => l * 0.001)

// ─── Export ───────────────────────────────────────────────────────────────────

export const stargazingSources = {
  // Stargazing Upgrades
  autoCatch,
  spawnRate,
  doubleChance,
  superStarSpawn,
  novaChance,
  super10xChance,
  supergiants,
  superSupergiants,
  allStarMulti,
  superRadiant,
  // Super Star Upgrades
  ssRainbowVeinChance,
  ssDoubleContractPoints,
  ssExpGain,
  ssItemDuration,
  ssGameSpeed,
  supergigantsMulti,
  ssGoldenOreMul,
  ssBankedFreebieLootbugFreebie,
  ssBankedFreebieLootbugLootbug,
  ssLootbugLootMul,
  novagiant,
  ssFishIncomeMul,
  ssGalacticFloorChance,
  ssGoldenOreChance,
  radiantChance,
  // Stars
  starAriesVeinSpawn,
  starAriesGoldenVein,
  starTaurusPickaxeDmg,
  starTaurus,
  starGeminiGoldenFloor,
  starGemini,
  starCancerDoubleContract,
  starCancerContractCost,
  starLeo,
  starLeoWorkshopCap,
  starVirgoRecharge,
  starVirgo,
  starLibraPrestige,
  starLibraTripleLootbug,
  starScorpioPickaxeDmg,
  starScorpio,
  starSagittariusLootbugSpawn,
  starSagittarius,
  starCapricornExp,
  starCapricornItemDuration,
  starAquariusBarCraft,
  starAquariusGoldenLootbug,
  starPiscesRainbowFloor,
  starOphiuchusFreebie,
  starOphiuchusLootbug,
  starOrionCraft100x,
  starOrionGoldenOre,
  starHercules,
  starHerculesGoldenOreMul,
  starDracoGalacticChance,
  starDracoGalacticMul,
  starCetusPolyCardMul,
  starCetusFishIncome,
  starEridanusAllFloor,
  starEridanusStonksMul,
  starEridanusSuperStonks,
} satisfies Record<string, Source>

import type { Op, Source } from '$lib/engine/types'

// Construct statues own all statue effect numbers (fn, maxLevel, statKey, op).
// Three shapes:
//   tier()   – W1/W3 statues: maxLevel 3, value picked by tier [unbuilt, normal,
//              gilded, platinized] (index 0 is the not-built value: 1 for ×, 0 for +).
//   w4()     – W4 statues: binary owned (maxLevel 1), bonus scales per W4 statue
//              owned (rt['w4StatueCount']).
//   w4flat() – W4 statues whose bonus is flat (owned × value), no per-count scaling.
// statKey/op mirror the formula wiring (consistency test enforces op where a
// source is used); effects with no registry stat yet carry no statKey.

const W4_INPUT = [{ key: 'w4StatueCount', label: 'W4 Statues Owned', type: 'integer', min: 0 }] as const

const tier = (
  key: string,
  name: string,
  statKey: string | undefined,
  op: Op | undefined,
  tiers: readonly [number, number, number, number],
): Source => ({
  key: `construct.${key}`,
  name,
  system: 'construct',
  maxLevel: 3,
  statKey,
  op,
  fn: (n) => tiers[Math.min(n, 3)],
  inputs: [],
})

const w4 = (
  key: string,
  name: string,
  statKey: string | undefined,
  op: Op | undefined,
  rate: number,
): Source => ({
  key: `construct.${key}`,
  name,
  system: 'construct',
  maxLevel: 1,
  statKey,
  op,
  fn: (owned, rt) => (owned === 0 ? 0 : (rt['w4StatueCount'] ?? 0) * rate),
  inputs: [...W4_INPUT],
})

const w4flat = (
  key: string,
  name: string,
  statKey: string | undefined,
  op: Op | undefined,
  value: number,
): Source => ({
  key: `construct.${key}`,
  name,
  system: 'construct',
  maxLevel: 1,
  statKey,
  op,
  fn: (o) => o * value,
  inputs: [],
})

// ─── World 1 Statues ──────────────────────────────────────────────────────────

export const staRhythmPickaxe = tier('staRhythmPickaxe', 'Statue of Rhythm (Pickaxe Damage)', 'pickaxe_damage', '×', [1, 3, 5, 8])
export const staRhythmFloorClear = tier('staRhythmFloorClear', 'Statue of Rhythm (Floor Clear)', 'floor_clear_requirement_multi', '+', [0, 0, 0, -0.25])
export const staAwarenessBombDmg = tier('staAwarenessBombDmg', 'Statue of Awareness (Bomb Damage)', 'bomb_damage', '×', [1, 3, 5, 8])
export const staAwarenessUltraCrit = tier('staAwarenessUltraCrit', 'Statue of Awareness (Ultra Crit)', 'bomb_ultra_crit_chance', '+', [0, 0, 0, 0.2])
export const staSlayingPrestigePts = tier('staSlayingPrestigePts', 'Statue of Slaying (Prestige Points)', 'prestige_point_multi', '×', [1, 2, 3, 5])
export const staSlayingArtifactCap = tier('staSlayingArtifactCap', 'Statue of Slaying (Artifact Cap)', 'artifact_cap_increase', '+', [0, 1, 2, 3])
export const staAppetiteBombCap = tier('staAppetiteBombCap', 'Statue of Appetite (Bomb Cap)', 'bomb_cap_multiplier', '×', [1, 1.3, 1.5, 1.75])
export const staAppetiteFuelDuration = tier('staAppetiteFuelDuration', 'Statue of Appetite (Fuel Duration)', 'coal_fuel_duration_multi', '+', [0, 0, 0, 0.15])
export const staFriendshipFreebieGems = tier('staFriendshipFreebieGems', 'Statue of Friendship (Freebie Gems)', 'freebie_gems_bonus', '+', [0, 1, 2, 4])
export const staFriendshipSkillShard = tier('staFriendshipSkillShard', 'Statue of Friendship (Skill Shard Chance)', 'freebie_chance_for_skill_shard', '+', [0, 0, 0, 0.01])
export const staHygieneGemUpgradeCap = tier('staHygieneGemUpgradeCap', 'Statue of Hygiene (Gem Upgrade Cap)', 'gem_upgrade_cap_increase', '+', [0, 1, 2, 4])
export const staArtistryFreebie5x = tier('staArtistryFreebie5x', 'Statue of Artistry (Freebie 5×)', 'freebie_5x_chance', '+', [0, 0.03, 0.05, 0.08])
export const staArtistryFreebieRefresh = tier('staArtistryFreebieRefresh', 'Statue of Artistry (Freebie Refresh)', 'freebie_refresh_chance', '+', [0, 0, 0, 0.01])
export const staRandomnessVeinSpawn = tier('staRandomnessVeinSpawn', 'Statue of Randomness (Vein Spawn)', 'vein_spawn_rate_multi', '+', [0, 0.3, 0.5, 0.75])
export const staRandomnessGoldenVeinChance = tier('staRandomnessGoldenVein', 'Statue of Randomness (Golden Vein Chance)', 'golden_vein_chance', '+', [0, 0.03, 0.05, 0.1])
export const staRandomnessRainbowVein = tier('staRandomnessRainbowVein', 'Statue of Randomness (Rainbow Vein)', 'rainbow_vein_chance', '+', [0, 0, 0, 0.05])
export const staChildhoodRainbowFloor = tier('staChildhoodRainbowFloor', 'Statue of Childhood (Rainbow Floor)', 'rainbow_floor_chance', '+', [0, 0, 0, 0.01])
export const staChildhoodContractCap = tier('staChildhoodContractCap', 'Statue of Childhood (Contract Cap)', 'contract_cap_increase', '+', [0, 1, 2, 4])
// TODO no registry key: W1 Statue of Hygiene — Workshop Upgrade Cap +2/+3/+4
// TODO no registry key: W1 Statue of Slaying (platinized) — Pet Level Cap +1

// ─── World 3 Statues ──────────────────────────────────────────────────────────

export const staCraftPickaxeDmg = tier('staCraftPickaxeDmg', 'Statue of Craftmanship (Pickaxe Damage)', 'pickaxe_damage', '×', [1, 4, 25, 125])
export const staCraftGemUpgradeCap = tier('staCraftGemUpgradeCap', 'Statue of Craftmanship (Gem Upgrade Cap)', 'gem_upgrade_cap_increase', '+', [0, 1, 2, 3])
export const staCraftFishIncomeMul = tier('staCraftFishIncomeMul', 'Statue of Craftmanship (Fish Income Multi)', 'fishing_income_multi', '×', [1, 1, 1.25, 1.4])
export const staPropBombDmg = tier('staPropBombDmg', 'Statue of Propulsion (Bomb Damage)', 'bomb_damage', '×', [1, 4, 25, 125])
export const staPropGoldenVeinMul = tier('staPropGoldenVeinMul', 'Statue of Propulsion (Golden Vein Multi)', 'golden_vein_multi', '×', [1, 1, 1.25, 1.5])
export const staSafetyGoldenOreChance = tier('staSafetyGoldenOreChance', 'Statue of Safety (Golden Ore Chance)', 'golden_ore_chance', '+', [0, 0.03, 0.05, 0.08])
export const staSafetyGoldenOreMul = tier('staSafetyGoldenOreMul', 'Statue of Safety (Golden Ore Multi)', 'golden_ore_multi', '+', [0, 0.25, 0.35, 0.55])
export const staSafetyRainbowFloorChance = tier('staSafetyRainbowFloor', 'Statue of Safety (Rainbow Floor Chance)', 'rainbow_floor_chance', '+', [0, 0.01, 0.02, 0.04])
export const staIgnitionCraft100x = tier('staIgnitionCraft100x', 'Statue of Ignition (100× Craft)', 'craft_100x_chance', '+', [0, 0.005, 0.01, 0.025])
export const staIgnitionGalacticFloor = tier('staIgnitionGalacticFloor', 'Statue of Ignition (Galactic Floor)', 'galactic_floor_chance', '+', [0, 0.02, 0.04, 0.06])

// ─── Statue of Warmth (Satio) ────────────────────────────────
export const staWarmthStarSupergiants = tier('staWarmthStarSupergiants', 'Statue of Warmth (Star Supergiant Multi)', 'star_supergiant_multi', '+', [0, 0.35, 0.55, 0.85])
export const staWarmthSuperStarSupergiants = tier('staWarmthSuperStarSupergiants', 'Statue of Warmth (Super Star Supergiant Multi)', 'super_star_supergiant_multi', '+', [0, 0.35, 0.55, 0.85])
export const staWarmthStarSupernova = tier('staWarmthStarSupernova', 'Statue of Warmth (Star Supernova Multi)', 'star_supernova_multi', '+', [0, 2, 3, 5])
export const staWarmthSuperStarSupernova = tier('staWarmthSuperStarSupernova', 'Statue of Warmth (Super Star Supernova Multi)', 'super_star_supernova_multi', '+', [0, 2, 3, 5])
export const staWarmthMidasCap = tier('staWarmthMidasCap', 'Statue of Warmth (Midas Drone Cap)', 'drone_midas_grade_cap_increase', '+', [0, 0, 0, 25])

export const staFelinePetLevelup = tier('staFelinePetLevelup', 'Statue of Feline (Pet Level Up)', 'pet_levelup_chance_multi', '+', [0, 0.1, 0.15, 0.25])
// No generic pet-level-cap registry stat (only per-pet keys), so no statKey.
export const staFelinePetLevelCap = tier('staFelinePetLevelCap', 'Statue of Feline (Pet Level Cap)', undefined, undefined, [0, 1, 2, 3])
// TODO no registry key: Feline (platinized) — Nagini Level Cap +5

// ─── Statue of Affluence (Kohanu) ─────────────────────────────
export const staAffluenceTripleContract = tier('staAffluenceTripleContract', 'Statue of Affluence (Triple Contract)', 'contract_triple_points_chance', '+', [0, 0.1, 0.15, 0.25])
export const staAffluence10xContract = tier('staAffluence10xContract', 'Statue of Affluence (10x Contract)', 'contract_10x_points_chance', '+', [0, 0.01, 0.02, 0.04])
export const staAffluenceContractCap = tier('staAffluenceContractCap', 'Statue of Affluence (Contract Cap)', 'contract_cap_increase', '+', [0, 1, 2, 3])

export const staEastwoodLootbugCap = tier('staEastwoodLootbugCap', 'Statue of Eastwood (Lootbug Cap)', 'lootbug_bank_cap', '+', [0, 2, 4, 8])
export const staEastwoodFreebieBank = tier('staEastwoodFreebieBank', 'Statue of Eastwood (Freebie Bank)', 'freebie_bank_cap', '+', [0, 2, 4, 8])
export const staEastwoodFreebieTimer = tier('staEastwoodFreebieTimer', 'Statue of Eastwood (Freebie Timer)', 'freebie_cooldown_seconds', '+', [0, 30, 45, 60])
export const staEastwoodExpGain = tier('staEastwoodExpGain', 'Statue of Eastwood (EXP Gain)', 'experience_multi', '×', [1, 1, 10, 100])

export const staSopranoAllFloors = tier('staSopranoAllFloors', 'Statue of Soprano (All Floor Multi)', 'all_floor_multipliers', '+', [0, 0.15, 0.25, 0.4])
export const staSopranoFreebieGiftChance = tier('staSopranoFreebieGiftChance', 'Statue of Soprano (Freebie Gift Chance)', 'freebie_gift_chance', '+', [0, 0.005, 0.0075, 0.01])
export const staSoprano100xGiftChance = tier('staSoprano100xGiftChance', 'Statue of Soprano (100x Gift Chance)', 'freebie_100x_gift_chance', '+', [0, 1 / 50000, 1 / 35000, 1 / 25000])

// ─── World 4 Statues (scale per W4 statues owned) ────────────────────────────

// Statue of Comfort: All Damage +50% per W4 Statue → feeds pickaxe and bomb damage.
// One upgrade, two stats → two Source objects sharing the key, one statKey each.
export const staComfortPickaxeDmg = w4('staComfortDmg', 'Statue of Comfort (All Damage)', 'pickaxe_damage', '×1+', 0.5)
export const staComfortBombDmg = w4('staComfortDmg', 'Statue of Comfort (All Damage)', 'bomb_damage', '×1+', 0.5)
export const staComfortScorpioCap = w4flat('staComfortScorpioCap', 'Statue of Comfort (Scorpio Cap)', 'star_scorpio_cap', '+', 20)
export const staComfortCapricornCap = w4flat('staComfortCapricornCap', 'Statue of Comfort (Capricorn Cap)', 'star_capricorn_cap', '+', 20)
// TODO no registry key: Comfort — All Floor Multi +1% Per Skin Owned

// ─── Statue of Timekeeping (Karma) ────────────────────────────
export const staTimekeepingRadiantChance = w4('staTimekeepingRadiantChance', 'Statue of Timekeeping (Star Radiant Chance)', 'star_radiant_chance', '+', 0.0025)
export const staTimekeepingStarRadiantMul = w4flat('staTimekeepingStarRadiantMul', 'Statue of Timekeeping (Star Radiant Multi)', 'star_radiant_multi', '+', 0.2)
export const staTimekeepingSuperStarRadiantMul = w4flat('staTimekeepingSuperStarRadiantMul', 'Statue of Timekeeping (Super Star Radiant Multi)', 'super_star_radiant_multi', '+', 0.2)
// TODO no registry key: Timekeeping — Hercules Star Cap +20

// ─── Statue of Combat (Sans) ────────────────────────────────
export const staCombatStonksChance = w4('staCombatStonksChance', 'Statue of Combat (Stonks Chance)', 'stonks_chance', '+', 0.0001)
export const staCombatStonksMul = w4flat('staCombatStonksMul', 'Statue of Combat (Stonks Multi)', 'stonks_multi', '+', 0.1)
export const staCombatUltraStonksMul = w4flat('staCombatUltraStonksMul', 'Statue of Combat (Ultra Stonks Multi)', 'ultra_stonks_multi', '+', 0.1)
export const staCombatUltraStonksChance = w4flat('staCombatUltraStonksChance', 'Statue of Combat (Ultra Stonks Chance)', 'ultra_stonks_chance', '+', 0.02)

// ─── Statue of Nature (Fanq) ────────────────────────────────
export const staNatureGemBombGem = w4('staNatureGemBombGem', 'Statue of Nature (Gem Bomb Gem Chance)', 'gem_bomb_gem_chance', '+', 0.0004)
export const staNatureRainbowVein = w4flat('staNatureRainbowVein', 'Statue of Nature (Rainbow Vein Chance)', 'rainbow_vein_chance', '+', 0.1)
// TODO no registry key: Nature — Workshop Cap +4

// ─── Statue of Semblance (Vak) ─────────────────────────────
export const staSemblanceRainbowPortal = w4('staSemblanceRainbowPortal', 'Statue of Semblance (Rainbow Portal)', 'rainbow_void_portal_chance', '+', 0.005)
export const staSemblanceVoidCap = w4flat('staSemblanceVoidCap', 'Statue of Semblance (Void Drone Cap)', 'drone_void_grade_cap_increase', '+', 20)
export const staSemblancePrismCap = w4flat('staSemblancePrismCap', 'Statue of Semblance (Prism Drone Cap)', 'drone_prism_grade_cap_increase', '+', 5)

// ─── Statue of Crochet (Kripp) ─────────────────────────────
export const staCrochetGoldenOre = w4('staCrochetGoldenOre', 'Statue of Crochet (Golden Ore Chance)', 'golden_ore_chance', '+', 0.03)
export const staCrochetGalacticFloor = w4flat('staCrochetGalacticFloor', 'Statue of Crochet (Galactic Floor Chance)', 'galactic_floor_chance', '+', 0.05)
export const staCrochetPrismaticFloor = w4flat('staCrochetPrismaticFloor', 'Statue of Crochet (Prismatic Floor Chance)', 'prismatic_floor_chance', '+', 0.03)

// ─── Statue of Antagonism (Loop) ───────────────────────────
export const staAntagonismFroggerCap = w4('staAntagonismFroggerCap', 'Statue of Antagonism (Frogger Cap)', 'drone_frogger_grade_cap_increase', '+', 1)
export const staAntagonismGoldenFrogChance = w4('staAntagonismGoldenFrogChance', 'Statue of Antagonism (Golden Frog Chance)', 'lootfrog_golden_chance', '+', 0.0025)
export const staAntagonismGoldenFrogMul = w4('staAntagonismGoldenFrogMul', 'Statue of Antagonism (Golden Frog Multi)', 'lootfrog_golden_multi', '+', 0.05)

// ─── Statue of Fallacy (Berty) ──────────────────────────────
export const staFallacyPrismaticMul = w4('staFallacyPrismaticMul', 'Statue of Fallacy (Prismatic Floor Multi)', 'prismatic_floor_multi', '+', 0.1)
export const staFallacyFreebieGems = w4('staFallacyFreebieGems', 'Statue of Fallacy (Freebie Gems)', 'freebie_gems_bonus', '+', 3)
export const staFallacyVeinseekerCap = w4('staFallacyVeinseekerCap', 'Statue of Fallacy (Veinseeker Cap)', 'drone_veinseeker_grade_cap_increase', '+', 5)

// ─── Statue of Rodentia ─────────────────────────────────────
export const staRodentiaPickaxe = w4('staRodentiaPickaxe', 'Statue of Rodentia (Pickaxe Damage)', 'pickaxe_damage', '×1+', 0.6)
export const staRodentiaChainCap = w4('staRodentiaChainCap', 'Statue of Rodentia (Chain Drone Cap)', 'drone_chain_grade_cap_increase', '+', 10)
export const staRodentiaRadiantChance = w4('staRodentiaRadiantChance', 'Statue of Rodentia (Super Star Radiant Chance)', 'super_star_radiant_chance', '+', 0.01)

export const constructSources = {
  // W1
  staRhythmPickaxe,
  staRhythmFloorClear,
  staAwarenessBombDmg,
  staAwarenessUltraCrit,
  staSlayingPrestigePts,
  staSlayingArtifactCap,
  staAppetiteBombCap,
  staAppetiteFuelDuration,
  staFriendshipFreebieGems,
  staFriendshipSkillShard,
  staHygieneGemUpgradeCap,
  staArtistryFreebie5x,
  staArtistryFreebieRefresh,
  staRandomnessVeinSpawn,
  staRandomnessGoldenVeinChance,
  staRandomnessRainbowVein,
  staChildhoodRainbowFloor,
  staChildhoodContractCap,
  // W3
  staCraftPickaxeDmg,
  staCraftGemUpgradeCap,
  staCraftFishIncomeMul,
  staPropBombDmg,
  staPropGoldenVeinMul,
  staSafetyGoldenOreChance,
  staSafetyGoldenOreMul,
  staSafetyRainbowFloorChance,
  staIgnitionCraft100x,
  staIgnitionGalacticFloor,
  staWarmthStarSupergiants,
  staWarmthSuperStarSupergiants,
  staWarmthStarSupernova,
  staWarmthSuperStarSupernova,
  staWarmthMidasCap,
  staFelinePetLevelup,
  staFelinePetLevelCap,
  staAffluenceTripleContract,
  staAffluence10xContract,
  staAffluenceContractCap,
  staEastwoodLootbugCap,
  staEastwoodFreebieBank,
  staEastwoodFreebieTimer,
  staEastwoodExpGain,
  staSopranoAllFloors,
  staSopranoFreebieGiftChance,
  staSoprano100xGiftChance,
  // W4
  staComfortPickaxeDmg,
  staComfortBombDmg,
  staComfortScorpioCap,
  staComfortCapricornCap,
  staTimekeepingRadiantChance,
  staTimekeepingStarRadiantMul,
  staTimekeepingSuperStarRadiantMul,
  staCombatStonksChance,
  staCombatStonksMul,
  staCombatUltraStonksMul,
  staCombatUltraStonksChance,
  staNatureGemBombGem,
  staNatureRainbowVein,
  staSemblanceRainbowPortal,
  staSemblanceVoidCap,
  staSemblancePrismCap,
  staCrochetGoldenOre,
  staCrochetGalacticFloor,
  staCrochetPrismaticFloor,
  staAntagonismFroggerCap,
  staAntagonismGoldenFrogChance,
  staAntagonismGoldenFrogMul,
  staFallacyPrismaticMul,
  staFallacyFreebieGems,
  staFallacyVeinseekerCap,
  staRodentiaPickaxe,
  staRodentiaChainCap,
  staRodentiaRadiantChance,
}

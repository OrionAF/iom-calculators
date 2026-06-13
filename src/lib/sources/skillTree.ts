import type { Op, Source } from '$lib/engine/types'

// Skill-Tree sources own all skill node effect numbers. Skills that feed several
// stats use several Source objects sharing one key, so the calculator asks for the
// skill level once. Some nodes scale with a runtime count (legendary fish, fish
// cards, poly cards, relic chests, bomb crit chance, golden frogs) and pass
// fn + inputs. statKey/op mirror the formula wiring (consistency test enforces op
// where used); unwired nodes with a clear registry stat still carry it. A handful
// of effects (respec caps, offline doubling, ores-per-screen, stonks, treasure
// hunter, tier-2 items/dock) have no registry stat and carry none.

const LEGENDARY_FISH_INPUT = { key: 'legendaryFishFound', label: 'Legendary Fish Found', type: 'integer' as const, min: 0 }
const FISH_CARD_INPUT = { key: 'fishCardCount', label: 'Fish Cards Owned (Standard=1, Gilded=2, Poly=3)', type: 'integer' as const, min: 0 }
const POLY_CARD_INPUT = { key: 'polyCardCount', label: 'Polychrome Cards Owned', type: 'integer' as const, min: 0 }
const RELIC_CHESTS_INPUT = { key: 'relicChestsOpened', label: 'Relic Chests Opened', type: 'integer' as const, min: 0 }
const BOMB_CRIT_INPUT = { key: 'bombCritChance', label: 'Bomb Crit Chance (stat value)', type: 'number' as const, min: 0 }
const GOLDEN_FROGS_INPUT = { key: 'goldenFrogsCaught', label: 'Golden Frogs Caught', type: 'integer' as const, min: 0 }

const st = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
  inputs: Source['inputs'] = [],
): Source => ({
  key: `skillTree.${key}`,
  name,
  system: 'skillTree',
  maxLevel,
  statKey,
  op,
  fn,
  inputs,
})

// ─── Fishing nodes ─────────────────────────────────────────────────────────────

const completionistGatekeeperSuperShiny = st('completionistGatekeeper', 'Completionist Gatekeeper', 3, 'fishing_super_shiny_chance', '+', (l, rt) => l * (rt['legendaryFishFound'] ?? 0) * 0.01, [LEGENDARY_FISH_INPUT])
const completionistGatekeeperDronePower = st('completionistGatekeeper', 'Completionist Gatekeeper', 3, 'fishing_drone_multiplier', '+', (l, rt) => l * (rt['legendaryFishFound'] ?? 0) * 0.02, [LEGENDARY_FISH_INPUT])
const completionistGatekeeperTier2Dock = st('completionistGatekeeper', 'Completionist Gatekeeper', 3, 'fishing_tier2_dock_multi', '+', (l, rt) => l * (rt['legendaryFishFound'] ?? 0) * 0.03, [LEGENDARY_FISH_INPUT])
const ingotIntuitionBarCost = st('ingotIntuition', 'Ingot Intuition', 1, 'bar_upgrade_cost_reduction', '+', (l) => l * 10)
const fishingWithFriendsDrones = st('fishingWithFriends', 'Fishing With Friends', 3, 'fishing_drone_capacity', '+', (l) => l * 5)
const fishingWithFriendsDronePower = st('fishingWithFriends', 'Fishing With Friends', 3, 'fishing_drone_multiplier', '+', (l) => l * 0.1)
const fishingWithFriendsFishMulti = st('fishingWithFriends', 'Fishing With Friends', 3, 'fishing_income_multi', '+', (l) => l * 0.03)
const letsPickUpThePaceTick = st('letsPickUpThePace', "Let's Pick Up The Pace", 3, 'fishing_tick_reduction_seconds', '+', (l) => l * 2)
const letsPickUpThePaceDouble = st('letsPickUpThePace', "Let's Pick Up The Pace", 3, 'fishing_double_tick_chance', '+', (l) => l * 0.02)
const letsPickUpThePaceTriple = st('letsPickUpThePace', "Let's Pick Up The Pace", 3, 'fishing_triple_tick_chance', '+', (l) => l * 0.01)
const friendshipEndedNoticeReq = st('friendshipEndedWithTier1Items', 'Friendship Ended With Tier 1 Items', 3, 'fishing_notice_requirement', '+', (l) => l * 0.1)
const motleySchoolRod = st('motleySchool', 'Motley School', 3, 'fishing_rod_power', '×', (l) => 1 + l * 0.1)
const motleySchoolDrones = st('motleySchool', 'Motley School', 3, 'fishing_drone_capacity', '+', (l) => l * 5)
const withThisFishFishMulti = st('withThisFishISummonTwoMoreFish', 'With This Fish I Summon Two More Fish', 3, 'fishing_income_multi', '+', (l, rt) => l * (rt['fishCardCount'] ?? 0) * 0.01, [FISH_CARD_INPUT])
const withThisFishShinyChance = st('withThisFishISummonTwoMoreFish', 'With This Fish I Summon Two More Fish', 3, 'fishing_shiny_chance', '+', (l, rt) => l * (rt['fishCardCount'] ?? 0) * 0.001, [FISH_CARD_INPUT])
const friendshipEndedItemDuration = st('friendshipEndedWithTier1Items', 'Friendship Ended With Tier 1 Items', 3, 'item_duration_multi', '+', (l) => l * 0.15)
// No registry key: Tier 2 Items From Expert Notices.
const friendshipEndedTier2Items = st('friendshipEndedWithTier1Items', 'Friendship Ended With Tier 1 Items', 3, undefined, undefined, (l) => l * 2)
const motleySchoolAbyssDockTick = st('motleySchool', 'Motley School', 3, 'fishing_abyss_dock_tick_req', '+', (l) => l * 2)
// No registry key: Tier 2 Dock Tick Req.
const motleySchoolTier2DockTick = st('motleySchool', 'Motley School', 3, undefined, undefined, (l) => l)

// ─── Pickaxe nodes ─────────────────────────────────────────────────────────────

const luckyStrikesCritChance = st('luckyStrikes', 'Lucky Strikes', 1, 'pickaxe_crit_chance', '+', (l) => l * 0.05)
const luckyStrikesCritDamage = st('luckyStrikes', 'Lucky Strikes', 1, 'pickaxe_crit_damage', '+', (l) => l * 0.15)
const swingHarderDamage = st('swingHarder', 'Swing Harder', 1, 'pickaxe_damage', '+', (l) => l * 0.2)
const superDamageDamage = st('superDamage', 'Super Damage', 1, 'pickaxe_damage', '+', (l) => l * 0.4)
const superDamageCritDamage = st('superDamage', 'Super Damage', 1, 'pickaxe_crit_damage', '+', (l) => l * 0.25)
const superDamageRadius = st('superDamage', 'Super Damage', 1, 'pickaxe_radius_percent', '+', (l) => l * 0.15)
const waitMyCritsCanCrit = st('waitMyCritsCanCrit', 'Wait My Crits Can Crit?', 1, 'pickaxe_super_crit_chance', '+', (l) => l * 0.1)
const waitMySuperCritsCanCrit = st('waitMySuperCritsCanCrit', 'Wait My Super Crits Can Crit?', 1, 'pickaxe_ultra_crit_chance', '+', (l) => l * 0.2)
const waitMyUltraCritsCanCritDamage = st('waitMyUltraCritsCanCrit', 'Wait My Ultra Crits Can Crit?', 1, 'pickaxe_damage', '+', (l) => l * 2.0)
const waitMyUltraCritsCanCritOmega = st('waitMyUltraCritsCanCrit', 'Wait My Ultra Crits Can Crit?', 1, 'pickaxe_omega_crit_chance', '+', (l) => l * 0.1)
const tonsOfDamageDamage = st('tonsOfDamage', 'Tons Of Damage', 1, 'pickaxe_damage', '×', (l) => 1 + l * 1.0)
const tonsOfDamageUltraCrit = st('tonsOfDamage', 'Tons Of Damage', 1, 'pickaxe_ultra_crit_chance', '+', (l) => l * 0.15)
const tonsOfDamageExp = st('tonsOfDamage', 'Tons Of Damage', 1, 'experience_multi', '+', (l) => l * 1.0)
const polychromePowerDamage = st('polychromePower', 'Polychrome Power', 1, 'pickaxe_damage', '×', (l, rt) => 1 + l * (rt['polyCardCount'] ?? 0) * 0.03, [POLY_CARD_INPUT])
const polychromePowerOreSell = st('polychromePower', 'Polychrome Power', 1, 'ore_sell_price_multi', '×', (l, rt) => 1 + l * (rt['polyCardCount'] ?? 0) * 0.03, [POLY_CARD_INPUT])
const polychromePowerExp = st('polychromePower', 'Polychrome Power', 1, 'experience_multi', '×', (l, rt) => 1 + l * (rt['polyCardCount'] ?? 0) * 0.03, [POLY_CARD_INPUT])
const relicRampageDamage = st('relicRampage', 'Relic Rampage', 1, 'pickaxe_damage', '+', (l, rt) => l * (rt['relicChestsOpened'] ?? 0) * 0.001, [RELIC_CHESTS_INPUT])
const idleObeliskMincerDamage = st('idleObeliskMincer', 'Idle Obelisk Mincer', 1, 'pickaxe_damage', '×', (l) => 1 + l * 1.5)
const threesACrowdDrone = st('threesACrowd', "Three's A Crowd", 1, 'drone_count', '+', (l) => l)

// ─── Bomb nodes ────────────────────────────────────────────────────────────────

const biggerBlastsDamage = st('biggerBlasts', 'Bigger Blasts', 1, 'bomb_damage', '+', (l) => l * 0.25)
const arsenalAdvancementCapacity = st('arsenalAdvancement', 'Arsenal Advancement', 1, 'bomb_capacity', '+', (l) => l * 10)
const arsenalAdvancementDamage = st('arsenalAdvancement', 'Arsenal Advancement', 1, 'bomb_damage', '+', (l) => l * 0.1)
const arsenalAdvancementFreeBomb = st('arsenalAdvancement', 'Arsenal Advancement', 1, 'bomb_free_chance', '+', (l) => l * 0.01)
const allRoundBomberDamage = st('allRoundBomber', 'All-Round Bomber', 1, 'bomb_damage', '+', (l) => l * 0.4)
const allRoundBomberRecharge = st('allRoundBomber', 'All-Round Bomber', 1, 'bomb_recharge_speed', '+', (l) => l * 0.1)
const allRoundBomberCritChance = st('allRoundBomber', 'All-Round Bomber', 1, 'bomb_crit_chance', '+', (l) => l * 0.05)
const demolitionExpertBombCritDmg = st('demolitionExpert', 'Demolition Expert', 1, 'bomb_crit_damage', '+', (l, rt) => l * (rt['bombCritChance'] ?? 0) * 0.5, [BOMB_CRIT_INPUT])
const demolitionExpertSuperCrit = st('demolitionExpert', 'Demolition Expert', 1, 'bomb_super_crit_chance', '+', (l) => l * 0.2)
const demolitionExpertFreeBomb = st('demolitionExpert', 'Demolition Expert', 1, 'bomb_free_chance', '+', (l) => l * 0.03)
const flamboyantBombsDamage = st('flamboyantBombs', 'Flamboyant Bombs', 1, 'bomb_damage', '+', (l) => l * 1.5)
const flamboyantBombsUltraCrit = st('flamboyantBombs', 'Flamboyant Bombs', 1, 'bomb_ultra_crit_chance', '+', (l) => l * 0.1)
const flamboyantBombsCapacity = st('flamboyantBombs', 'Flamboyant Bombs', 1, 'bomb_capacity', '+', (l) => l * 5)
// No registry key: Offline Items And Relics Doubled.
const chronokeeperOfflineDouble = st('chronokeeper', 'Chronokeeper', 1, undefined, undefined, (l) => l)
const chronokeeperBombCapacity = st('chronokeeper', 'Chronokeeper', 1, 'bomb_capacity', '+', (l) => l * 10)

// ─── Ore / floor nodes ─────────────────────────────────────────────────────────

const easyProgressorOreSell = st('easyProgressor', 'Easy Progressor', 1, 'ore_sell_price_multi', '+', (l) => l * 0.2)
const easyProgressorFloorClear = st('easyProgressor', 'Easy Progressor', 1, 'floor_clear_requirement_multi', '+', (l) => l * 0.1)
const easyProgressorPrestigePts = st('easyProgressor', 'Easy Progressor', 1, 'prestige_point_multi', '+', (l) => l * 0.2)
const iHaveWaresOreSell = st('iHaveWaresIfYouHaveCoin', 'I Have Wares, If You Have Coin', 1, 'ore_sell_price_multi', '+', (l) => l * 1.0)
const iHaveWaresGoldenFloor = st('iHaveWaresIfYouHaveCoin', 'I Have Wares, If You Have Coin', 1, 'golden_floor_multi', '+', (l) => l * 0.2)
const perfectGoldGoldenFloor = st('perfectGold', 'Perfect Gold', 1, 'golden_floor_multi', '+', (l) => l * 2.0)
const opticalPhenomenonRainbowFloor = st('opticalPhenomenon', 'Optical Phenomenon', 1, 'rainbow_floor_chance', '+', (l) => l * 0.01)
const iBuriedItHereChainDroneCap = st('iBuriedItHere', 'I Buried It Here', 3, 'drone_chain_grade_cap_increase', '+', (l) => l * 5)
const iBuriedItHereGoldenVoidChance = st('iBuriedItHere', 'I Buried It Here', 3, 'golden_void_portal_chance', '+', (l) => l * 0.02)
const iBuriedItHereGalacticFloor = st('iBuriedItHere', 'I Buried It Here', 3, 'galactic_floor_chance', '+', (l) => l * 0.02)
const iBuriedItHereGoldenOre = st('iBuriedItHere', 'I Buried It Here', 3, 'golden_ore_chance', '+', (l) => l * 0.01)

// ─── Crafting nodes ──────────────────────────────────────────────────────────────

const oreEfficiencyDoubleCraft = st('oreEfficiency', 'Ore Efficiency', 1, 'double_craft_chance', '+', (l) => l * 0.05)
const heftyHammersTripleCraft = st('heftyHammers', 'Hefty Hammers', 1, 'triple_craft_chance', '+', (l) => l * 0.05)
const heftyHammers10xCraft = st('heftyHammers', 'Hefty Hammers', 1, 'craft_10x_chance', '+', (l) => l * 0.01)
const imRunningOutRainbowFloor = st('imRunningOutOfCreativeNames', "I'm Running Out Of Creative Names", 1, 'rainbow_floor_chance', '+', (l) => l * 0.01)
const imRunningOut10xCraft = st('imRunningOutOfCreativeNames', "I'm Running Out Of Creative Names", 1, 'craft_10x_chance', '+', (l) => l * 0.02)
const imRunningOutBarCraft = st('imRunningOutOfCreativeNames', "I'm Running Out Of Creative Names", 1, 'bar_craft_cost_multi', '+', (l) => l * 0.1)
// No registry key: +2 Ores Appear Per Screen.
const moreOreMoreProblemsOreScreen = st('moreOreMoreProblems', 'More Ore More Problems', 1, undefined, undefined, (l) => l * 2)
const moreOreMoreProblemsBarCraft = st('moreOreMoreProblems', 'More Ore More Problems', 1, 'bar_craft_cost_multi', '+', (l) => l * 0.1)

// ─── Contract nodes ──────────────────────────────────────────────────────────────

const whosAskingContractPoints = st('whosAskingForAllTheseBars', "Who's Asking For All These Bars?", 1, 'contract_points_rewarded', '+', (l) => l * 2)
const whosAskingTripleContract = st('whosAskingForAllTheseBars', "Who's Asking For All These Bars?", 1, 'contract_triple_points_chance', '+', (l) => l * 0.08)
// No registry key: Contract re-spec per prestige.
const whosAskingContractRespec = st('whosAskingForAllTheseBars', "Who's Asking For All These Bars?", 1, undefined, undefined, (l) => l)
const pleaseSirContract10x = st('pleaseSirDontMakeMePrestigeAgain', "Please Sir Don't Make Me Prestige Again", 3, 'contract_10x_points_chance', '+', (l) => l * 0.0025)
// No registry key: Contract re-spec cap.
const pleaseSirContractRespecCap = st('pleaseSirDontMakeMePrestigeAgain', "Please Sir Don't Make Me Prestige Again", 3, undefined, undefined, (l) => l)
const idleObeliskMincerContractCap = st('idleObeliskMincer', 'Idle Obelisk Mincer', 1, 'contract_cap_increase', '+', (l) => l * 2)
const idleObeliskMincerWorkshopCap = st('idleObeliskMincer', 'Idle Obelisk Mincer', 1, 'bomb_workshop_cap_increase', '+', (l) => l)
const idleObeliskMincerScorpioCap = st('idleObeliskMincer', 'Idle Obelisk Mincer', 1, 'star_scorpio_cap', '+', (l) => l * 5)
const doTheseUpgradesArtifactCap = st('doTheseUpgradesEverEnd', 'Do These Upgrades Ever End', 1, 'artifact_cap_increase', '+', (l) => l)
const doTheseUpgradesWorkshopCap = st('doTheseUpgradesEverEnd', 'Do These Upgrades Ever End', 1, 'bomb_workshop_cap_increase', '+', (l) => l)

// ─── Chest / freebie nodes ───────────────────────────────────────────────────────

const gemsAndChestsFreebie = st('gemsAndChests', 'Gems & Chests', 1, 'freebie_gems_bonus', '+', (l) => l)
// No registry key: +1% Relic Chest chance.
const gemsAndChestsRelicChest = st('gemsAndChests', 'Gems & Chests', 1, undefined, undefined, (l) => l * 0.01)
const justWaitFasterCooldown = st('justWaitFaster', 'Just Wait Faster', 1, 'freebie_cooldown_seconds', '+', (l) => l * 60)
const freeThatsGreatCooldown = st('freeThatsAGreatPrice', "Free? That's A Great Price!", 1, 'freebie_cooldown_seconds', '+', (l) => l * 60)
const freeThatsGreatRefresh = st('freeThatsAGreatPrice', "Free? That's A Great Price!", 1, 'freebie_refresh_chance', '+', (l) => l * 0.05)
const freeThatsGreatRelicChance = st('freeThatsAGreatPrice', "Free? That's A Great Price!", 1, 'freebie_chance_for_bonus_relic', '+', (l) => l * 0.02)
const chronokeeperFrebieCap = st('chronokeeper', 'Chronokeeper', 1, 'freebie_bank_cap', '+', (l) => l)
const savingForARainyDayFrebieCap = st('savingForARainyDay', 'Saving For A Rainy Day', 1, 'freebie_bank_cap', '+', (l) => l * 2)
const savingForARainyDayLootbugCap = st('savingForARainyDay', 'Saving For A Rainy Day', 1, 'lootbug_bank_cap', '+', (l) => l * 2)
const savingForARainyDayLootbugGem = st('savingForARainyDay', 'Saving For A Rainy Day', 1, 'lootbug_gem_cost_reduction', '+', (l) => l)

// ─── Drone / frog nodes ──────────────────────────────────────────────────────────

const mechanicalEvolutionSuitCap = st('mechanicalEvolution', 'Mechanical Evolution', 1, 'drone_suit_cap', '+', (l) => l * 3)
const gasolineGuzzlerFuelDuration = st('gasolineGuzzler', 'Gasoline Guzzler', 1, 'coal_fuel_duration_multi', '+', (l) => l * 0.2)
const gasolineGuzzlerCoalTime = st('gasolineGuzzler', 'Gasoline Guzzler', 1, 'coal_generation_seconds', '+', (l) => l * 10)
const gasolineGuzzlerCoalCap = st('gasolineGuzzler', 'Gasoline Guzzler', 1, 'coal_capacity_multi', '+', (l) => l * 0.25)
const callOfTheVoidPortalMulti = st('callOfTheVoid', 'Call Of The Void', 3, 'void_portal_base_multi', '+', (l) => l * 0.05)
const callOfTheVoidGradeCap = st('callOfTheVoid', 'Call Of The Void', 3, 'drone_void_grade_cap_increase', '+', (l) => l * 4)
const frogFrenzyFroggerGradeCap = st('frogFrenzy', 'Frog Frenzy', 3, 'drone_frogger_grade_cap_increase', '+', (l) => l * 2)
const frogFrenzyTripleLootfrog = st('frogFrenzy', 'Frog Frenzy', 3, 'lootfrog_triple_spawn_chance', '+', (l) => l * 0.01)
const frogFrenzyLootfrogCap = st('frogFrenzy', 'Frog Frenzy', 3, 'lootfrog_capacity', '+', (l) => l)

// ─── Vein / lootbug nodes ────────────────────────────────────────────────────────

const leprechaunsLegacyAllStar = st('leprechaunsLegacy', "Leprechaun's Legacy", 1, 'all_star_multi', '×', (l) => 1 + l * 0.1)
const leprechaunsLegacyVeinIncome = st('leprechaunsLegacy', "Leprechaun's Legacy", 1, 'vein_income_multi', '×', (l) => 1 + l * 0.1)
const leprechaunsLegacyGoldenFloor = st('leprechaunsLegacy', "Leprechaun's Legacy", 1, 'golden_floor_multi', '×', (l) => 1 + l * 0.1)
const leprechaunsLegacyBombRecharge = st('leprechaunsLegacy', "Leprechaun's Legacy", 1, 'bomb_recharge_speed', '×', (l) => 1 + l * 0.1)
const insaneInTheVeinGainVeinPoly = st('insaneInTheVeinGain', 'Insane In The Vein Gain', 3, 'polychrome_card_bonus_vein', '+', (l) => l)
const insaneInTheVeinGainRainbowVein = st('insaneInTheVeinGain', 'Insane In The Vein Gain', 3, 'rainbow_vein_multi', '+', (l) => l * 0.06)
const anyoneUpLootinBankCap = st('anyoneUpLootinTheyBugs', "Anyone Up Lootin' They Bugs", 3, 'lootbug_bank_cap', '+', (l) => l * 3)
const anyoneUpLootinLootMulti = st('anyoneUpLootinTheyBugs', "Anyone Up Lootin' They Bugs", 3, 'lootbug_loot_multi', '+', (l) => l * 0.04)

// ─── Prestige / misc / star nodes ────────────────────────────────────────────────

const ppGoUpPrestigePts = st('ppGoUp', 'PP Go Up', 1, 'prestige_point_multi', '+', (l) => l * 0.25)
const ppGoUpExp = st('ppGoUp', 'PP Go Up', 1, 'experience_multi', '+', (l) => l * 0.25)
// No registry key: Stonks skill bonuses (per-reward-type freebie chances).
const stonksGemChance = st('stonks', 'Stonks', 1, undefined, undefined, (l) => l * 0.01)
const stonksItemChance = st('stonks', 'Stonks', 1, undefined, undefined, (l) => l * 0.01)
const stonksRelicChance = st('stonks', 'Stonks', 1, undefined, undefined, (l) => l * 0.01)
// No registry key: Treasure Hunter relic chest bonuses.
const treasureHunterRelicChestChance = st('treasureHunter', 'Treasure Hunter', 1, undefined, undefined, (l) => l * 0.01)
const treasureHunterRelicPerOpened = st('treasureHunter', 'Treasure Hunter', 1, undefined, undefined, (l) => l * 0.01)
const blockBonkerDamagePerStage = st('blockBonker', 'Block Bonker', 1, 'archaeology_dmg_per_stage', '+', (l) => l * 0.01)
const blockBonkerStaminaPerStage = st('blockBonker', 'Block Bonker', 1, 'archaeology_stm_per_stage', '+', (l) => l * 0.01)
const blockBonkerSpeedMod = st('blockBonker', 'Block Bonker', 1, 'archaeology_spd_mod_gain', '+', (l) => l * 15)
const avadaKedaAbilityDuration = st('avadaKeda', "Avada Keda-'", 1, 'archaeology_ability_dur', '+', (l) => l * 5)
const avadaKedaAbilityCooldown = st('avadaKeda', "Avada Keda-'", 1, 'archaeology_ability_cd', '+', (l) => l * 10)
const avadaKedaInstacharge = st('avadaKeda', "Avada Keda-'", 1, 'archaeology_ability_insta', '+', (l) => l * 0.03)
const pondYieldGoldenFrogMul = st('pondYield', 'Pond Yield', 1, 'lootfrog_golden_multi', '+', (l, rt) => l * (rt['goldenFrogsCaught'] ?? 0) * 0.001, [GOLDEN_FROGS_INPUT])
const haveYouTriedGettingLuckierPetLevelup = st('haveYouTriedGettingLuckier', 'Have You Tried Getting Luckier?', 1, 'pet_levelup_chance_multi', '+', (l) => l * 0.15)
const haveYouTriedGettingLuckierChestMeter = st('haveYouTriedGettingLuckier', 'Have You Tried Getting Luckier?', 1, 'chest_meter_multi', '×', (l) => 1 + l * 14)
const ctrlFStarsSupernovaMul = st('ctrlFStars', "Ctrl+F 'Stars'", 1, 'star_supernova_multi', '+', (l) => l * 0.2)
const ctrlFStarsSuperStarSupernovaMul = st('ctrlFStars', "Ctrl+F 'Stars'", 1, 'super_star_supernova_multi', '+', (l) => l * 0.2)
const ctrlCCtrlVStarsOrionCap = st('ctrlCCtrlVStars', 'Ctrl+C Ctrl+V Stars', 3, 'star_orion_cap', '+', (l) => l * 2)
const ctrlCCtrlVStarsSupernovaMul = st('ctrlCCtrlVStars', 'Ctrl+C Ctrl+V Stars', 3, 'star_supernova_multi', '+', (l) => l * 0.06)
const ctrlCCtrlVStarsSuper10x = st('ctrlCCtrlVStars', 'Ctrl+C Ctrl+V Stars', 3, 'super_star_10x_chance', '+', (l) => l * 0.01)
const whyAreThereStarsNovagiant = st('whyAreThereStarsInMyMiningGame', 'Why Are There Stars In My Mining Game', 3, 'novagiant_combo_multi', '+', (l) => l * 0.05)
const whyAreThereStarsSupergiant = st('whyAreThereStarsInMyMiningGame', 'Why Are There Stars In My Mining Game', 3, 'star_supergiant_chance', '+', (l) => l * 0.01)
const whyAreThereStarsCapricornCap = st('whyAreThereStarsInMyMiningGame', 'Why Are There Stars In My Mining Game', 3, 'star_capricorn_cap', '+', (l) => l * 3)
const whyAreThereStarsGeminiCap = st('whyAreThereStarsInMyMiningGame', 'Why Are There Stars In My Mining Game', 3, 'star_gemini_cap', '+', (l) => l * 2)

// ─── Export ───────────────────────────────────────────────────────────────────

export const skillTreeSources = {
  completionistGatekeeperSuperShiny,
  completionistGatekeeperDronePower,
  completionistGatekeeperTier2Dock,
  fishingWithFriendsDrones,
  fishingWithFriendsDronePower,
  fishingWithFriendsFishMulti,
  letsPickUpThePaceTick,
  letsPickUpThePaceDouble,
  letsPickUpThePaceTriple,
  friendshipEndedNoticeReq,
  motleySchoolRod,
  motleySchoolDrones,
  withThisFishFishMulti,
  withThisFishShinyChance,
  ingotIntuitionBarCost,
  threesACrowdDrone,
  friendshipEndedItemDuration,
  friendshipEndedTier2Items,
  motleySchoolAbyssDockTick,
  motleySchoolTier2DockTick,
  doTheseUpgradesWorkshopCap,
  idleObeliskMincerWorkshopCap,
  idleObeliskMincerScorpioCap,
  iBuriedItHereChainDroneCap,
  demolitionExpertBombCritDmg,
  chronokeeperOfflineDouble,
  moreOreMoreProblemsOreScreen,
  gemsAndChestsRelicChest,
  freeThatsGreatRelicChance,
  whosAskingContractRespec,
  pleaseSirContractRespecCap,
  treasureHunterRelicChestChance,
  treasureHunterRelicPerOpened,
  pondYieldGoldenFrogMul,
  frogFrenzyFroggerGradeCap,
  callOfTheVoidGradeCap,
  insaneInTheVeinGainVeinPoly,
  ctrlCCtrlVStarsOrionCap,
  whyAreThereStarsCapricornCap,
  whyAreThereStarsGeminiCap,
  stonksGemChance,
  stonksItemChance,
  stonksRelicChance,
  blockBonkerDamagePerStage,
  blockBonkerStaminaPerStage,
  blockBonkerSpeedMod,
  avadaKedaAbilityDuration,
  avadaKedaAbilityCooldown,
  avadaKedaInstacharge,
  luckyStrikesCritChance,
  luckyStrikesCritDamage,
  swingHarderDamage,
  superDamageDamage,
  superDamageCritDamage,
  superDamageRadius,
  waitMyCritsCanCrit,
  waitMySuperCritsCanCrit,
  waitMyUltraCritsCanCritDamage,
  waitMyUltraCritsCanCritOmega,
  tonsOfDamageDamage,
  tonsOfDamageUltraCrit,
  tonsOfDamageExp,
  polychromePowerDamage,
  polychromePowerOreSell,
  polychromePowerExp,
  relicRampageDamage,
  idleObeliskMincerDamage,
  biggerBlastsDamage,
  arsenalAdvancementCapacity,
  arsenalAdvancementDamage,
  arsenalAdvancementFreeBomb,
  allRoundBomberDamage,
  allRoundBomberRecharge,
  allRoundBomberCritChance,
  demolitionExpertSuperCrit,
  demolitionExpertFreeBomb,
  flamboyantBombsDamage,
  flamboyantBombsUltraCrit,
  flamboyantBombsCapacity,
  chronokeeperBombCapacity,
  easyProgressorOreSell,
  easyProgressorFloorClear,
  easyProgressorPrestigePts,
  iHaveWaresOreSell,
  iHaveWaresGoldenFloor,
  perfectGoldGoldenFloor,
  opticalPhenomenonRainbowFloor,
  iBuriedItHereGoldenVoidChance,
  iBuriedItHereGalacticFloor,
  iBuriedItHereGoldenOre,
  oreEfficiencyDoubleCraft,
  heftyHammersTripleCraft,
  heftyHammers10xCraft,
  imRunningOutRainbowFloor,
  imRunningOut10xCraft,
  imRunningOutBarCraft,
  moreOreMoreProblemsBarCraft,
  whosAskingContractPoints,
  whosAskingTripleContract,
  pleaseSirContract10x,
  idleObeliskMincerContractCap,
  doTheseUpgradesArtifactCap,
  gemsAndChestsFreebie,
  justWaitFasterCooldown,
  freeThatsGreatCooldown,
  freeThatsGreatRefresh,
  chronokeeperFrebieCap,
  savingForARainyDayFrebieCap,
  savingForARainyDayLootbugCap,
  savingForARainyDayLootbugGem,
  mechanicalEvolutionSuitCap,
  gasolineGuzzlerFuelDuration,
  gasolineGuzzlerCoalTime,
  gasolineGuzzlerCoalCap,
  callOfTheVoidPortalMulti,
  frogFrenzyTripleLootfrog,
  frogFrenzyLootfrogCap,
  leprechaunsLegacyAllStar,
  leprechaunsLegacyVeinIncome,
  leprechaunsLegacyGoldenFloor,
  leprechaunsLegacyBombRecharge,
  insaneInTheVeinGainRainbowVein,
  anyoneUpLootinBankCap,
  anyoneUpLootinLootMulti,
  ppGoUpPrestigePts,
  ppGoUpExp,
  haveYouTriedGettingLuckierPetLevelup,
  haveYouTriedGettingLuckierChestMeter,
  ctrlFStarsSupernovaMul,
  ctrlFStarsSuperStarSupernovaMul,
  ctrlCCtrlVStarsSupernovaMul,
  ctrlCCtrlVStarsSuper10x,
  whyAreThereStarsNovagiant,
  whyAreThereStarsSupergiant,
} satisfies Record<string, Source>

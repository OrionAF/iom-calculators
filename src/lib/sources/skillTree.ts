import type { Source } from '$lib/engine/types'

// ─── Completionist Gatekeeper ─────────────────────────────────────────────────
// Obelisk Level 50, max 3 levels. Contributes differently to three fishing stats.
// All three share key 'skillTree.completionistGatekeeper' so the calculator
// asks for the skill level only once (engine deduplicates by key).

const LEGENDARY_FISH_INPUT = {
  key: 'legendaryFishFound',
  label: 'Legendary Fish Found',
  type: 'integer' as const,
  min: 0,
}

/** Completionist Gatekeeper → Super Shiny Fish Chance: level × legendaryFishFound × 0.01 */
const completionistGatekeeperSuperShiny: Source = {
  key: 'skillTree.completionistGatekeeper',
  name: 'Completionist Gatekeeper',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l, rt) => l * (rt['legendaryFishFound'] ?? 0) * 0.01,
  inputs: [LEGENDARY_FISH_INPUT],
}

/** Completionist Gatekeeper → Drone Power Multiplier: level × legendaryFishFound × 0.02 */
const completionistGatekeeperDronePower: Source = {
  key: 'skillTree.completionistGatekeeper',
  name: 'Completionist Gatekeeper',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l, rt) => l * (rt['legendaryFishFound'] ?? 0) * 0.02,
  inputs: [LEGENDARY_FISH_INPUT],
}

/** Completionist Gatekeeper → Tier 2 Dock Multi: level × legendaryFishFound × 0.03 */
const completionistGatekeeperTier2Dock: Source = {
  key: 'skillTree.completionistGatekeeper',
  name: 'Completionist Gatekeeper',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l, rt) => l * (rt['legendaryFishFound'] ?? 0) * 0.03,
  inputs: [LEGENDARY_FISH_INPUT],
}

// ─── Fishing With Friends ─────────────────────────────────────────────────────
// Obelisk Level 37, max 3 levels.

/** Fishing With Friends → Fishing Drone Capacity: +5 per level */
const fishingWithFriendsDrones: Source = {
  key: 'skillTree.fishingWithFriends',
  name: 'Fishing With Friends',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 5,
  inputs: [],
}

/** Fishing With Friends → Drone Power Multiplier: +0.10 per level */
const fishingWithFriendsDronePower: Source = {
  key: 'skillTree.fishingWithFriends',
  name: 'Fishing With Friends',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.10,
  inputs: [],
}

/** Fishing With Friends → Fish Income Multiplier: +0.03 per level */
const fishingWithFriendsFishMulti: Source = {
  key: 'skillTree.fishingWithFriends',
  name: 'Fishing With Friends',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.03,
  inputs: [],
}

// ─── Let's Pick Up The Pace ───────────────────────────────────────────────────
// Obelisk Level 37, max 3 levels.

/** Let's Pick Up The Pace → Tick Reduction: +2s per level */
const letsPickUpThePaceTick: Source = {
  key: 'skillTree.letsPickUpThePace',
  name: "Let's Pick Up The Pace",
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 2,
  inputs: [],
}

/** Let's Pick Up The Pace → Double Fish Tick Chance: +2% (0.02) per level */
const letsPickUpThePaceDouble: Source = {
  key: 'skillTree.letsPickUpThePace',
  name: "Let's Pick Up The Pace",
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** Let's Pick Up The Pace → Triple Fish Tick Chance: +1% (0.01) per level */
const letsPickUpThePaceTriple: Source = {
  key: 'skillTree.letsPickUpThePace',
  name: "Let's Pick Up The Pace",
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ─── Friendship Ended With Tier 1 Items ──────────────────────────────────────
// Obelisk Level 37, max 3 levels.

/** Friendship Ended With Tier 1 Items → Notice Fish Requirement: -10% (0.10) per level */
const friendshipEndedNoticeReq: Source = {
  key: 'skillTree.friendshipEndedWithTier1Items',
  name: 'Friendship Ended With Tier 1 Items',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.10,
  inputs: [],
}

// ─── Motley School ────────────────────────────────────────────────────────────
// Obelisk Level 50, max 3 levels.

/** Motley School → Fishing Rod Power (×): factor = 1 + level × 0.10 */
const motleySchoolRod: Source = {
  key: 'skillTree.motleySchool',
  name: 'Motley School',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => 1 + l * 0.10,
  inputs: [],
}

/** Motley School → Fishing Drone Capacity: +5 per level */
const motleySchoolDrones: Source = {
  key: 'skillTree.motleySchool',
  name: 'Motley School',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 5,
  inputs: [],
}

// ─── With This Fish I Summon Two More Fish ────────────────────────────────────
// Obelisk Level 37, max 3 levels. Dynamic: scales with fish card count.
// Gilded cards count as 2, Polychrome as 3 (per wiki).

const FISH_CARD_INPUT = {
  key: 'fishCardCount',
  label: 'Fish Cards Owned (Standard=1, Gilded=2, Poly=3)',
  type: 'integer' as const,
  min: 0,
}

/** With This Fish → Fish Income Multiplier: level × fishCardCount × 0.01 */
const withThisFishFishMulti: Source = {
  key: 'skillTree.withThisFishISummonTwoMoreFish',
  name: 'With This Fish I Summon Two More Fish',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l, rt) => l * (rt['fishCardCount'] ?? 0) * 0.01,
  inputs: [FISH_CARD_INPUT],
}

/** With This Fish → Shiny Fish Chance: level × fishCardCount × 0.001 */
const withThisFishShinyChance: Source = {
  key: 'skillTree.withThisFishISummonTwoMoreFish',
  name: 'With This Fish I Summon Two More Fish',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l, rt) => l * (rt['fishCardCount'] ?? 0) * 0.001,
  inputs: [FISH_CARD_INPUT],
}

// ─── Pickaxe nodes ───────────────────────────────────────────────────────────────

const luckyStrikesCritChance: Source = { key: 'skillTree.luckyStrikes', name: 'Lucky Strikes', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.05, inputs: [] }
const luckyStrikesCritDamage: Source = { key: 'skillTree.luckyStrikes', name: 'Lucky Strikes', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.15, inputs: [] }
const swingHarderDamage: Source = { key: 'skillTree.swingHarder', name: 'Swing Harder', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.20, inputs: [] }
const superDamageDamage: Source = { key: 'skillTree.superDamage', name: 'Super Damage', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.40, inputs: [] }
const superDamageCritDamage: Source = { key: 'skillTree.superDamage', name: 'Super Damage', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.25, inputs: [] }
const superDamageRadius: Source = { key: 'skillTree.superDamage', name: 'Super Damage', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.15, inputs: [] }
const waitMyCritsCanCrit: Source = { key: 'skillTree.waitMyCritsCanCrit', name: 'Wait My Crits Can Crit?', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }
const waitMySuperCritsCanCrit: Source = { key: 'skillTree.waitMySuperCritsCanCrit', name: 'Wait My Super Crits Can Crit?', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.20, inputs: [] }
/** ×200% Pickaxe Damage = × 3.00 factor (1 + 2.00) */
const waitMyUltraCritsCanCritDamage: Source = { key: 'skillTree.waitMyUltraCritsCanCrit', name: 'Wait My Ultra Crits Can Crit?', system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 2.0, inputs: [] }
const waitMyUltraCritsCanCritOmega: Source = { key: 'skillTree.waitMyUltraCritsCanCrit', name: 'Wait My Ultra Crits Can Crit?', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }
/** ×2.00 Pickaxe Damage */
const tonsOfDamageDamage: Source = { key: 'skillTree.tonsOfDamage', name: 'Tons Of Damage', system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 1.0, inputs: [] }
const tonsOfDamageUltraCrit: Source = { key: 'skillTree.tonsOfDamage', name: 'Tons Of Damage', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.15, inputs: [] }
const tonsOfDamageExp: Source = { key: 'skillTree.tonsOfDamage', name: 'Tons Of Damage', system: 'skillTree', maxLevel: 1, fn: (l) => l * 1.0, inputs: [] }
/** Per Poly Card dynamic: +0.03x pickaxe damage per poly card */
const polychromePowerDamage: Source = { key: 'skillTree.polychromePower', name: 'Polychrome Power', system: 'skillTree', maxLevel: 1, fn: (l, rt) => 1 + l * (rt['polyCardCount'] ?? 0) * 0.03, inputs: [{ key: 'polyCardCount', label: 'Polychrome Cards Owned', type: 'integer', min: 0 }] }
const polychromePowerOreSell: Source = { key: 'skillTree.polychromePower', name: 'Polychrome Power', system: 'skillTree', maxLevel: 1, fn: (l, rt) => 1 + l * (rt['polyCardCount'] ?? 0) * 0.03, inputs: [{ key: 'polyCardCount', label: 'Polychrome Cards Owned', type: 'integer', min: 0 }] }
const polychromePowerExp: Source = { key: 'skillTree.polychromePower', name: 'Polychrome Power', system: 'skillTree', maxLevel: 1, fn: (l, rt) => 1 + l * (rt['polyCardCount'] ?? 0) * 0.03, inputs: [{ key: 'polyCardCount', label: 'Polychrome Cards Owned', type: 'integer', min: 0 }] }
/** +0.1% Pickaxe Damage Per Relic Chest Opened (dynamic) */
const relicRampageDamage: Source = { key: 'skillTree.relicRampage', name: 'Relic Rampage', system: 'skillTree', maxLevel: 1, fn: (l, rt) => l * (rt['relicChestsOpened'] ?? 0) * 0.001, inputs: [{ key: 'relicChestsOpened', label: 'Relic Chests Opened', type: 'integer', min: 0 }] }
/** ×2.50 Pickaxe Damage */
const idleObeliskMincerDamage: Source = { key: 'skillTree.idleObeliskMincer', name: 'Idle Obelisk Mincer', system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 1.5, inputs: [] }

// ─── Bomb nodes ───────────────────────────────────────────────────────────────────

const biggerBlastsDamage: Source = { key: 'skillTree.biggerBlasts', name: 'Bigger Blasts', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.25, inputs: [] }
/** Arsenal Advancement: max 1 level, cost 3. +10 capacity, +10% damage, +1% free bomb chance */
const arsenalAdvancementCapacity: Source = { key: 'skillTree.arsenalAdvancement', name: 'Arsenal Advancement', system: 'skillTree', maxLevel: 1, fn: (l) => l * 10, inputs: [] }
const arsenalAdvancementDamage: Source = { key: 'skillTree.arsenalAdvancement', name: 'Arsenal Advancement', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }
const arsenalAdvancementFreeBomb: Source = { key: 'skillTree.arsenalAdvancement', name: 'Arsenal Advancement', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.01, inputs: [] }
/** All-Round Bomber: +40% bomb damage, +10% recharge, +5% bomb crit */
const allRoundBomberDamage: Source = { key: 'skillTree.allRoundBomber', name: 'All-Round Bomber', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.40, inputs: [] }
const allRoundBomberRecharge: Source = { key: 'skillTree.allRoundBomber', name: 'All-Round Bomber', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }
const allRoundBomberCritChance: Source = { key: 'skillTree.allRoundBomber', name: 'All-Round Bomber', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.05, inputs: [] }
/** Demolition Expert: +20% bomb super crit, +3% free bomb */
const demolitionExpertSuperCrit: Source = { key: 'skillTree.demolitionExpert', name: 'Demolition Expert', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.20, inputs: [] }
const demolitionExpertFreeBomb: Source = { key: 'skillTree.demolitionExpert', name: 'Demolition Expert', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.03, inputs: [] }
/** Flamboyant Bombs: +150% bomb damage, +10% ultra crit, +5 capacity */
const flamboyantBombsDamage: Source = { key: 'skillTree.flamboyantBombs', name: 'Flamboyant Bombs', system: 'skillTree', maxLevel: 1, fn: (l) => l * 1.50, inputs: [] }
const flamboyantBombsUltraCrit: Source = { key: 'skillTree.flamboyantBombs', name: 'Flamboyant Bombs', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }
const flamboyantBombsCapacity: Source = { key: 'skillTree.flamboyantBombs', name: 'Flamboyant Bombs', system: 'skillTree', maxLevel: 1, fn: (l) => l * 5, inputs: [] }
/** Chronokeeper: Banked Freebie Cap +1, Bomb Capacity +10 */
const chronokeeperBombCapacity: Source = { key: 'skillTree.chronokeeper', name: 'Chronokeeper', system: 'skillTree', maxLevel: 1, fn: (l) => l * 10, inputs: [] }

// ─── Ore / floor nodes ─────────────────────────────────────────────────────────────

/** Easy Progressor: Floor Clear Req -10%, Prestige Point +20%, Ore Sell +20% */
const easyProgressorOreSell: Source = { key: 'skillTree.easyProgressor', name: 'Easy Progressor', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.20, inputs: [] }
const easyProgressorFloorClear: Source = { key: 'skillTree.easyProgressor', name: 'Easy Progressor', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }
const easyProgressorPrestigePts: Source = { key: 'skillTree.easyProgressor', name: 'Easy Progressor', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.20, inputs: [] }
/** I Have Wares If You Have Coin: Ore Sell ×2.00, Golden Floor +20% */
const iHaveWaresOreSell: Source = { key: 'skillTree.iHaveWaresIfYouHaveCoin', name: 'I Have Wares, If You Have Coin', system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 1.0, inputs: [] }
const iHaveWaresGoldenFloor: Source = { key: 'skillTree.iHaveWaresIfYouHaveCoin', name: 'I Have Wares, If You Have Coin', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.20, inputs: [] }
/** Perfect Gold: Golden Floor Ore Multiplier +2x (adds to base 5x) */
const perfectGoldGoldenFloor: Source = { key: 'skillTree.perfectGold', name: 'Perfect Gold', system: 'skillTree', maxLevel: 1, fn: (l) => l * 2.0, inputs: [] }
/** Optical Phenomenon: Rainbow Floor Chance +1% */
const opticalPhenomenonRainbowFloor: Source = { key: 'skillTree.opticalPhenomenon', name: 'Optical Phenomenon', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.01, inputs: [] }
/** I Buried It Here: Golden Void Portal Chance +2%, Galactic Floor +2%, Golden Ore +1% (max 3) */
const iBuriedItHereGoldenVoidChance: Source = { key: 'skillTree.iBuriedItHere', name: 'I Buried It Here', system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.02, inputs: [] }
const iBuriedItHereGalacticFloor: Source = { key: 'skillTree.iBuriedItHere', name: 'I Buried It Here', system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.02, inputs: [] }
const iBuriedItHereGoldenOre: Source = { key: 'skillTree.iBuriedItHere', name: 'I Buried It Here', system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.01, inputs: [] }

// ─── Crafting nodes ────────────────────────────────────────────────────────────────

const oreEfficiencyDoubleCraft: Source = { key: 'skillTree.oreEfficiency', name: 'Ore Efficiency', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.05, inputs: [] }
/** Hefty Hammers: Triple Craft +5%, 10x Craft +1% */
const heftyHammersTripleCraft: Source = { key: 'skillTree.heftyHammers', name: 'Hefty Hammers', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.05, inputs: [] }
const heftyHammers10xCraft: Source = { key: 'skillTree.heftyHammers', name: 'Hefty Hammers', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.01, inputs: [] }
/** I'm Running Out Of Creative Names: Rainbow Floor +1%, 10x Craft +2%, Bar Craft Cost -10% */
const imRunningOutRainbowFloor: Source = { key: 'skillTree.imRunningOutOfCreativeNames', name: "I'm Running Out Of Creative Names", system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.01, inputs: [] }
const imRunningOut10xCraft: Source = { key: 'skillTree.imRunningOutOfCreativeNames', name: "I'm Running Out Of Creative Names", system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.02, inputs: [] }
const imRunningOutBarCraft: Source = { key: 'skillTree.imRunningOutOfCreativeNames', name: "I'm Running Out Of Creative Names", system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }
/** More Ore More Problems: Bar Craft Cost -10% */
const moreOreMoreProblemsBarCraft: Source = { key: 'skillTree.moreOreMoreProblems', name: 'More Ore More Problems', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.10, inputs: [] }

// ─── Contract nodes ────────────────────────────────────────────────────────────────

/** Who's Asking For All These Bars?: +2 Contract Points, +8% Triple Contract Chance */
const whosAskingContractPoints: Source = { key: 'skillTree.whosAskingForAllTheseBars', name: "Who's Asking For All These Bars?", system: 'skillTree', maxLevel: 1, fn: (l) => l * 2, inputs: [] }
const whosAskingTripleContract: Source = { key: 'skillTree.whosAskingForAllTheseBars', name: "Who's Asking For All These Bars?", system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.08, inputs: [] }
/** Please Sir Don't Make Me Prestige Again: +0.25% 10x Contract Chance per level (max 3) */
const pleaseSirContract10x: Source = { key: 'skillTree.pleaseSirDontMakeMePrestigeAgain', name: "Please Sir Don't Make Me Prestige Again", system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.0025, inputs: [] }
/** Idle Obelisk Mincer: Contract Upgrade Cap +2 */
const idleObeliskMincerContractCap: Source = { key: 'skillTree.idleObeliskMincer', name: 'Idle Obelisk Mincer', system: 'skillTree', maxLevel: 1, fn: (l) => l * 2, inputs: [] }
/** Do These Upgrades Ever End: +1 Artifact Cap, +1 Workshop Cap */
const doTheseUpgradesArtifactCap: Source = { key: 'skillTree.doTheseUpgradesEverEnd', name: 'Do These Upgrades Ever End', system: 'skillTree', maxLevel: 1, fn: (l) => l, inputs: [] }

// ─── Chest / freebie nodes ─────────────────────────────────────────────────────────

/** Gems & Chests: Freebie Pack Gives +1 Gem */
const gemsAndChestsFreebie: Source = { key: 'skillTree.gemsAndChests', name: 'Gems & Chests', system: 'skillTree', maxLevel: 1, fn: (l) => l, inputs: [] }
/** Just Wait Faster: Freebie Pack Timer -60s */
const justWaitFasterCooldown: Source = { key: 'skillTree.justWaitFaster', name: 'Just Wait Faster', system: 'skillTree', maxLevel: 1, fn: (l) => l * 60, inputs: [] }
/** Free? That's A Great Price!: Freebie Timer -60s, Instant Refresh +5% */
const freeThatsGreatCooldown: Source = { key: 'skillTree.freeThatsAGreatPrice', name: "Free? That's A Great Price!", system: 'skillTree', maxLevel: 1, fn: (l) => l * 60, inputs: [] }
const freeThatsGreatRefresh: Source = { key: 'skillTree.freeThatsAGreatPrice', name: "Free? That's A Great Price!", system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.05, inputs: [] }
/** Chronokeeper: Banked Freebie Cap +1 */
const chronokeeperFrebieCap: Source = { key: 'skillTree.chronokeeper', name: 'Chronokeeper', system: 'skillTree', maxLevel: 1, fn: (l) => l, inputs: [] }
/** Saving For A Rainy Day: Banked Freebie Cap +2, Banked Lootbug Cap +2, Lootbug Gem Cost -1 */
const savingForARainyDayFrebieCap: Source = { key: 'skillTree.savingForARainyDay', name: 'Saving For A Rainy Day', system: 'skillTree', maxLevel: 1, fn: (l) => l * 2, inputs: [] }
const savingForARainyDayLootbugCap: Source = { key: 'skillTree.savingForARainyDay', name: 'Saving For A Rainy Day', system: 'skillTree', maxLevel: 1, fn: (l) => l * 2, inputs: [] }
const savingForARainyDayLootbugGem: Source = { key: 'skillTree.savingForARainyDay', name: 'Saving For A Rainy Day', system: 'skillTree', maxLevel: 1, fn: (l) => l, inputs: [] }

// ─── Drone nodes ───────────────────────────────────────────────────────────────────

/** Mechanical Evolution: Drone Suit Upgrade Cap +3 */
const mechanicalEvolutionSuitCap: Source = { key: 'skillTree.mechanicalEvolution', name: 'Mechanical Evolution', system: 'skillTree', maxLevel: 1, fn: (l) => l * 3, inputs: [] }
/** Gasoline Guzzler: Fuel Duration +20%, Coal Production -10s, Coal Capacity +25% */
const gasolineGuzzlerFuelDuration: Source = { key: 'skillTree.gasolineGuzzler', name: 'Gasoline Guzzler', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.20, inputs: [] }
const gasolineGuzzlerCoalTime: Source = { key: 'skillTree.gasolineGuzzler', name: 'Gasoline Guzzler', system: 'skillTree', maxLevel: 1, fn: (l) => l * 10, inputs: [] }
const gasolineGuzzlerCoalCap: Source = { key: 'skillTree.gasolineGuzzler', name: 'Gasoline Guzzler', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.25, inputs: [] }
/** Call Of The Void: Void Portal Multi +5%/level, max 3 */
const callOfTheVoidPortalMulti: Source = { key: 'skillTree.callOfTheVoid', name: 'Call Of The Void', system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.05, inputs: [] }
/** Frog Frenzy: Triple Lootfrog +1%, Frog Capacity +1 (max 3) */
const frogFrenzyTripleLootfrog: Source = { key: 'skillTree.frogFrenzy', name: 'Frog Frenzy', system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.01, inputs: [] }
const frogFrenzyLootfrogCap: Source = { key: 'skillTree.frogFrenzy', name: 'Frog Frenzy', system: 'skillTree', maxLevel: 3, fn: (l) => l, inputs: [] }

// ─── Vein nodes ────────────────────────────────────────────────────────────────────

/** Leprechaun's Legacy: ×1.10 All Stars Multi, ×1.10 Vein Income, ×1.10 Golden Floor, ×1.10 Bomb Recharge */
const leprechaunsLegacyAllStar: Source = { key: 'skillTree.leprechaunsLegacy', name: "Leprechaun's Legacy", system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 0.10, inputs: [] }
const leprechaunsLegacyVeinIncome: Source = { key: 'skillTree.leprechaunsLegacy', name: "Leprechaun's Legacy", system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 0.10, inputs: [] }
const leprechaunsLegacyGoldenFloor: Source = { key: 'skillTree.leprechaunsLegacy', name: "Leprechaun's Legacy", system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 0.10, inputs: [] }
const leprechaunsLegacyBombRecharge: Source = { key: 'skillTree.leprechaunsLegacy', name: "Leprechaun's Legacy", system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 0.10, inputs: [] }
/** Insane In The Vein Gain: Rainbow Vein Multi +6% per level (max 3) */
const insaneInTheVeinGainRainbowVein: Source = { key: 'skillTree.insaneInTheVeinGain', name: 'Insane In The Vein Gain', system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.06, inputs: [] }

// ─── Lootbug nodes ─────────────────────────────────────────────────────────────────

/** Anyone Up Lootin' They Bugs: Banked Lootbug Cap +3/level, Lootbug Loot Multi +4%/level (max 3) */
const anyoneUpLootinBankCap: Source = { key: 'skillTree.anyoneUpLootinTheyBugs', name: "Anyone Up Lootin' They Bugs", system: 'skillTree', maxLevel: 3, fn: (l) => l * 3, inputs: [] }
const anyoneUpLootinLootMulti: Source = { key: 'skillTree.anyoneUpLootinTheyBugs', name: "Anyone Up Lootin' They Bugs", system: 'skillTree', maxLevel: 3, fn: (l) => l * 0.04, inputs: [] }

// ─── Prestige / experience nodes ───────────────────────────────────────────────────

/** PP Go Up: Prestige Point Gain +25%, Exp Gain +25% */
const ppGoUpPrestigePts: Source = { key: 'skillTree.ppGoUp', name: 'PP Go Up', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.25, inputs: [] }
const ppGoUpExp: Source = { key: 'skillTree.ppGoUp', name: 'PP Go Up', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.25, inputs: [] }

// ─── Misc nodes ─────────────────────────────────────────────────────────────────────

/** Have You Tried Getting Luckier?: All Pets level up chance +15%, Chest Meter Fill Rate 15x */
const haveYouTriedGettingLuckierPetLevelup: Source = { key: 'skillTree.haveYouTriedGettingLuckier', name: 'Have You Tried Getting Luckier?', system: 'skillTree', maxLevel: 1, fn: (l) => l * 0.15, inputs: [] }
const haveYouTriedGettingLuckierChestMeter: Source = { key: 'skillTree.haveYouTriedGettingLuckier', name: 'Have You Tried Getting Luckier?', system: 'skillTree', maxLevel: 1, fn: (l) => 1 + l * 14, inputs: [] }

// ─── Ctrl+F 'Stars' ───────────────────────────────────────────────────────────────
// Obelisk Level 23, max 1 level (single purchase). Cost: 36 skill points.
// Unlocks star-following AND provides permanent flat bonuses to supernova multipliers.

/** Ctrl+F Stars → Star Supernova Multi: +0.20 (flat single-level bonus) */
const ctrlFStarsSupernovaMul: Source = {
  key: 'skillTree.ctrlFStars',
  name: "Ctrl+F 'Stars'",
  system: 'skillTree',
  maxLevel: 1,
  fn: (l) => l * 0.20,
  inputs: [],
}

/** Ctrl+F Stars → Super Star Supernova Multi: +0.20 (flat single-level bonus) */
const ctrlFStarsSuperStarSupernovaMul: Source = {
  key: 'skillTree.ctrlFStars',
  name: "Ctrl+F 'Stars'",
  system: 'skillTree',
  maxLevel: 1,
  fn: (l) => l * 0.20,
  inputs: [],
}

// ─── Ctrl+C Ctrl+V Stars ──────────────────────────────────────────────────────
// Obelisk Level 45, max 3 levels. Cost: 75, 94, 117 skill points.

/** Ctrl+C Ctrl+V Stars → Star Supernova Multi: +0.06 per level */
const ctrlCCtrlVStarsSupernovaMul: Source = {
  key: 'skillTree.ctrlCCtrlVStars',
  name: 'Ctrl+C Ctrl+V Stars',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.06,
  inputs: [],
}

/** Ctrl+C Ctrl+V Stars → Super Star 10x Chance: +0.01 per level */
const ctrlCCtrlVStarsSuper10x: Source = {
  key: 'skillTree.ctrlCCtrlVStars',
  name: 'Ctrl+C Ctrl+V Stars',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
}

// ─── Why Are There Stars In My Mining Game ────────────────────────────────────
// Obelisk Level 64, max 3 levels. Cost: 950, 1188, 1484 skill points.

/** Why Are There Stars → Novagiant Combo Multi: +0.05 per level */
const whyAreThereStarsNovagiant: Source = {
  key: 'skillTree.whyAreThereStarsInMyMiningGame',
  name: 'Why Are There Stars In My Mining Game',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** Why Are There Stars → Star Supergiant Chance: +0.01 per level */
const whyAreThereStarsSupergiant: Source = {
  key: 'skillTree.whyAreThereStarsInMyMiningGame',
  name: 'Why Are There Stars In My Mining Game',
  system: 'skillTree',
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
}

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
  // Pickaxe-relevant nodes
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
  // Bomb-relevant nodes
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
  // Ore/floor-relevant nodes
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
  // Crafting-relevant nodes
  oreEfficiencyDoubleCraft,
  heftyHammersTripleCraft,
  heftyHammers10xCraft,
  imRunningOutRainbowFloor,
  imRunningOut10xCraft,
  imRunningOutBarCraft,
  moreOreMoreProblemsBarCraft,
  // Contract-relevant nodes
  whosAskingContractPoints,
  whosAskingTripleContract,
  pleaseSirContract10x,
  idleObeliskMincerContractCap,
  doTheseUpgradesArtifactCap,
  // Chest/freebie-relevant nodes
  gemsAndChestsFreebie,
  justWaitFasterCooldown,
  freeThatsGreatCooldown,
  freeThatsGreatRefresh,
  chronokeeperFrebieCap,
  savingForARainyDayFrebieCap,
  savingForARainyDayLootbugCap,
  savingForARainyDayLootbugGem,
  // Drone-relevant nodes
  mechanicalEvolutionSuitCap,
  gasolineGuzzlerFuelDuration,
  gasolineGuzzlerCoalTime,
  gasolineGuzzlerCoalCap,
  callOfTheVoidPortalMulti,
  frogFrenzyTripleLootfrog,
  frogFrenzyLootfrogCap,
  // Vein-relevant nodes
  leprechaunsLegacyAllStar,
  leprechaunsLegacyVeinIncome,
  leprechaunsLegacyGoldenFloor,
  leprechaunsLegacyBombRecharge,
  insaneInTheVeinGainRainbowVein,
  // Lootbug-relevant nodes
  anyoneUpLootinBankCap,
  anyoneUpLootinLootMulti,
  // Prestige-relevant nodes
  ppGoUpPrestigePts,
  ppGoUpExp,
  // Misc-relevant nodes
  haveYouTriedGettingLuckierPetLevelup,
  haveYouTriedGettingLuckierChestMeter,
  // Stars-relevant nodes
  ctrlFStarsSupernovaMul,
  ctrlFStarsSuperStarSupernovaMul,
  ctrlCCtrlVStarsSupernovaMul,
  ctrlCCtrlVStarsSuper10x,
  whyAreThereStarsNovagiant,
  whyAreThereStarsSupergiant,
} satisfies Record<string, Source>

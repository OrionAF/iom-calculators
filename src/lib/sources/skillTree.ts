import type { Source } from "$lib/engine/types";

// ─── Completionist Gatekeeper ─────────────────────────────────────────────────
// Obelisk Level 50, max 3 levels. Contributes differently to three fishing stats.
// All three share key 'skillTree.completionistGatekeeper' so the calculator
// asks for the skill level only once (engine deduplicates by key).

const LEGENDARY_FISH_INPUT = {
  key: "legendaryFishFound",
  label: "Legendary Fish Found",
  type: "integer" as const,
  min: 0,
};

/** Completionist Gatekeeper → Super Shiny Fish Chance: level × legendaryFishFound × 0.01 */
const completionistGatekeeperSuperShiny: Source = {
  key: "skillTree.completionistGatekeeper",
  name: "Completionist Gatekeeper",
  system: "skillTree",
  maxLevel: 3,
  fn: (l, rt) => l * (rt["legendaryFishFound"] ?? 0) * 0.01,
  inputs: [LEGENDARY_FISH_INPUT],
};

/** Completionist Gatekeeper → Drone Power Multiplier: level × legendaryFishFound × 0.02 */
const completionistGatekeeperDronePower: Source = {
  key: "skillTree.completionistGatekeeper",
  name: "Completionist Gatekeeper",
  system: "skillTree",
  maxLevel: 3,
  fn: (l, rt) => l * (rt["legendaryFishFound"] ?? 0) * 0.02,
  inputs: [LEGENDARY_FISH_INPUT],
};

/** Completionist Gatekeeper → Tier 2 Dock Multi: level × legendaryFishFound × 0.03 */
const completionistGatekeeperTier2Dock: Source = {
  key: "skillTree.completionistGatekeeper",
  name: "Completionist Gatekeeper",
  system: "skillTree",
  maxLevel: 3,
  fn: (l, rt) => l * (rt["legendaryFishFound"] ?? 0) * 0.03,
  inputs: [LEGENDARY_FISH_INPUT],
};

// ─── Ingot Intuition ────────────────────────────────────────────────────────────
// NOTE: "Pickaxe Bar Cost -10" is a flat bar reduction for Upgrade Pickaxe, not a
// percentage. bar_upgrade_cost_reduction is the closest registry key (it's a
// multiplier); the formula will need to handle the flat -10 semantics explicitly.

/** Ingot Intuition → Bar Upgrade Cost -10 (flat bars). Max 1. → bar_upgrade_cost_reduction */
const ingotIntuitionBarCost: Source = {
  key: "skillTree.ingotIntuition",
  name: "Ingot Intuition",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 10,
  inputs: [],
};

// ─── Fishing With Friends ─────────────────────────────────────────────────────
// Obelisk Level 37, max 3 levels.

/** Fishing With Friends → Fishing Drone Capacity: +5 per level */
const fishingWithFriendsDrones: Source = {
  key: "skillTree.fishingWithFriends",
  name: "Fishing With Friends",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 5,
  inputs: [],
};

/** Fishing With Friends → Drone Power Multiplier: +0.10 per level */
const fishingWithFriendsDronePower: Source = {
  key: "skillTree.fishingWithFriends",
  name: "Fishing With Friends",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.1,
  inputs: [],
};

/** Fishing With Friends → Fish Income Multiplier: +0.03 per level */
const fishingWithFriendsFishMulti: Source = {
  key: "skillTree.fishingWithFriends",
  name: "Fishing With Friends",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.03,
  inputs: [],
};

// ─── Let's Pick Up The Pace ───────────────────────────────────────────────────
// Obelisk Level 37, max 3 levels.

/** Let's Pick Up The Pace → Tick Reduction: +2s per level */
const letsPickUpThePaceTick: Source = {
  key: "skillTree.letsPickUpThePace",
  name: "Let's Pick Up The Pace",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 2,
  inputs: [],
};

/** Let's Pick Up The Pace → Double Fish Tick Chance: +2% (0.02) per level */
const letsPickUpThePaceDouble: Source = {
  key: "skillTree.letsPickUpThePace",
  name: "Let's Pick Up The Pace",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.02,
  inputs: [],
};

/** Let's Pick Up The Pace → Triple Fish Tick Chance: +1% (0.01) per level */
const letsPickUpThePaceTriple: Source = {
  key: "skillTree.letsPickUpThePace",
  name: "Let's Pick Up The Pace",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
};

// ─── Friendship Ended With Tier 1 Items ──────────────────────────────────────
// Obelisk Level 37, max 3 levels.

/** Friendship Ended With Tier 1 Items → Notice Fish Requirement: -10% (0.10) per level */
const friendshipEndedNoticeReq: Source = {
  key: "skillTree.friendshipEndedWithTier1Items",
  name: "Friendship Ended With Tier 1 Items",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.1,
  inputs: [],
};

// ─── Motley School ────────────────────────────────────────────────────────────
// Obelisk Level 50, max 3 levels.

/** Motley School → Fishing Rod Power (×): factor = 1 + level × 0.10 */
const motleySchoolRod: Source = {
  key: "skillTree.motleySchool",
  name: "Motley School",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => 1 + l * 0.1,
  inputs: [],
};

/** Motley School → Fishing Drone Capacity: +5 per level */
const motleySchoolDrones: Source = {
  key: "skillTree.motleySchool",
  name: "Motley School",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 5,
  inputs: [],
};

// ─── With This Fish I Summon Two More Fish ────────────────────────────────────
// Obelisk Level 37, max 3 levels. Dynamic: scales with fish card count.
// Gilded cards count as 2, Polychrome as 3 (per wiki).

const FISH_CARD_INPUT = {
  key: "fishCardCount",
  label: "Fish Cards Owned (Standard=1, Gilded=2, Poly=3)",
  type: "integer" as const,
  min: 0,
};

/** With This Fish → Fish Income Multiplier: level × fishCardCount × 0.01 */
const withThisFishFishMulti: Source = {
  key: "skillTree.withThisFishISummonTwoMoreFish",
  name: "With This Fish I Summon Two More Fish",
  system: "skillTree",
  maxLevel: 3,
  fn: (l, rt) => l * (rt["fishCardCount"] ?? 0) * 0.01,
  inputs: [FISH_CARD_INPUT],
};

/** With This Fish → Shiny Fish Chance: level × fishCardCount × 0.001 */
const withThisFishShinyChance: Source = {
  key: "skillTree.withThisFishISummonTwoMoreFish",
  name: "With This Fish I Summon Two More Fish",
  system: "skillTree",
  maxLevel: 3,
  fn: (l, rt) => l * (rt["fishCardCount"] ?? 0) * 0.001,
  inputs: [FISH_CARD_INPUT],
};

// ─── Friendship Ended With Tier 1 Items ─────────────────────────────────────────
// (partial — notice req already above; adding missing bonuses)

/** Friendship Ended → Item Duration +15% per level. Max 3. → item_duration_multi */
const friendshipEndedItemDuration: Source = {
  key: "skillTree.friendshipEndedWithTier1Items",
  name: "Friendship Ended With Tier 1 Items",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.15,
  inputs: [],
};

// TODO no registry key: 'Tier 2 Items From Expert Notices +2' (Friendship Ended)
const friendshipEndedTier2Items: Source = {
  key: "skillTree.friendshipEndedWithTier1Items",
  name: "Friendship Ended With Tier 1 Items",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 2,
  inputs: [],
};

// ─── Motley School (partial — rod + drones above; adding missing bonuses) ────────
// TODO no registry key: 'Abyss Dock Tick Req -2'
const motleySchoolAbyssDockTick: Source = {
  key: "skillTree.motleySchool",
  name: "Motley School",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 2,
  inputs: [],
};

// TODO no registry key: 'Tier 2 Dock Tick Req -1'
const motleySchoolTier2DockTick: Source = {
  key: "skillTree.motleySchool",
  name: "Motley School",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l,
  inputs: [],
};

// ─── Pickaxe nodes ───────────────────────────────────────────────────────────────

const luckyStrikesCritChance: Source = {
  key: "skillTree.luckyStrikes",
  name: "Lucky Strikes",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.05,
  inputs: [],
};
const luckyStrikesCritDamage: Source = {
  key: "skillTree.luckyStrikes",
  name: "Lucky Strikes",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.15,
  inputs: [],
};
const swingHarderDamage: Source = {
  key: "skillTree.swingHarder",
  name: "Swing Harder",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};
const superDamageDamage: Source = {
  key: "skillTree.superDamage",
  name: "Super Damage",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.4,
  inputs: [],
};
const superDamageCritDamage: Source = {
  key: "skillTree.superDamage",
  name: "Super Damage",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.25,
  inputs: [],
};
const superDamageRadius: Source = {
  key: "skillTree.superDamage",
  name: "Super Damage",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.15,
  inputs: [],
};
const waitMyCritsCanCrit: Source = {
  key: "skillTree.waitMyCritsCanCrit",
  name: "Wait My Crits Can Crit?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};
const waitMySuperCritsCanCrit: Source = {
  key: "skillTree.waitMySuperCritsCanCrit",
  name: "Wait My Super Crits Can Crit?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};
/** ×200% Pickaxe Damage = × 3.00 factor (1 + 2.00) */
const waitMyUltraCritsCanCritDamage: Source = {
  key: "skillTree.waitMyUltraCritsCanCrit",
  name: "Wait My Ultra Crits Can Crit?",
  system: "skillTree",
  maxLevel: 1,
  // Bonus-shaped: wiki sums this inside the Skill-Tree (…) group.
  fn: (l) => l * 2.0,
  inputs: [],
};
const waitMyUltraCritsCanCritOmega: Source = {
  key: "skillTree.waitMyUltraCritsCanCrit",
  name: "Wait My Ultra Crits Can Crit?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};
/** ×2.00 Pickaxe Damage */
const tonsOfDamageDamage: Source = {
  key: "skillTree.tonsOfDamage",
  name: "Tons Of Damage",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => 1 + l * 1.0,
  inputs: [],
};
const tonsOfDamageUltraCrit: Source = {
  key: "skillTree.tonsOfDamage",
  name: "Tons Of Damage",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.15,
  inputs: [],
};
const tonsOfDamageExp: Source = {
  key: "skillTree.tonsOfDamage",
  name: "Tons Of Damage",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 1.0,
  inputs: [],
};
/** Per Poly Card dynamic: +0.03x pickaxe damage per poly card */
const polychromePowerDamage: Source = {
  key: "skillTree.polychromePower",
  name: "Polychrome Power",
  system: "skillTree",
  maxLevel: 1,
  fn: (l, rt) => 1 + l * (rt["polyCardCount"] ?? 0) * 0.03,
  inputs: [
    {
      key: "polyCardCount",
      label: "Polychrome Cards Owned",
      type: "integer",
      min: 0,
    },
  ],
};
const polychromePowerOreSell: Source = {
  key: "skillTree.polychromePower",
  name: "Polychrome Power",
  system: "skillTree",
  maxLevel: 1,
  fn: (l, rt) => 1 + l * (rt["polyCardCount"] ?? 0) * 0.03,
  inputs: [
    {
      key: "polyCardCount",
      label: "Polychrome Cards Owned",
      type: "integer",
      min: 0,
    },
  ],
};
const polychromePowerExp: Source = {
  key: "skillTree.polychromePower",
  name: "Polychrome Power",
  system: "skillTree",
  maxLevel: 1,
  fn: (l, rt) => 1 + l * (rt["polyCardCount"] ?? 0) * 0.03,
  inputs: [
    {
      key: "polyCardCount",
      label: "Polychrome Cards Owned",
      type: "integer",
      min: 0,
    },
  ],
};
/** +0.1% Pickaxe Damage Per Relic Chest Opened (dynamic) */
const relicRampageDamage: Source = {
  key: "skillTree.relicRampage",
  name: "Relic Rampage",
  system: "skillTree",
  maxLevel: 1,
  fn: (l, rt) => l * (rt["relicChestsOpened"] ?? 0) * 0.001,
  inputs: [
    {
      key: "relicChestsOpened",
      label: "Relic Chests Opened",
      type: "integer",
      min: 0,
    },
  ],
};
/** ×2.50 Pickaxe Damage */
const idleObeliskMincerDamage: Source = {
  key: "skillTree.idleObeliskMincer",
  name: "Idle Obelisk Mincer",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => 1 + l * 1.5,
  inputs: [],
};

// ─── Three's A Crowd ─────────────────────────────────────────────────────────────

/** Three's A Crowd → +1 Drone. Max 1. → drone_count */
const threesACrowdDrone: Source = {
  key: "skillTree.threesACrowd",
  name: "Three's A Crowd",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};

// ─── Bomb nodes ───────────────────────────────────────────────────────────────────

const biggerBlastsDamage: Source = {
  key: "skillTree.biggerBlasts",
  name: "Bigger Blasts",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.25,
  inputs: [],
};
/** Arsenal Advancement: max 1 level, cost 3. +10 capacity, +10% damage, +1% free bomb chance */
const arsenalAdvancementCapacity: Source = {
  key: "skillTree.arsenalAdvancement",
  name: "Arsenal Advancement",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 10,
  inputs: [],
};
const arsenalAdvancementDamage: Source = {
  key: "skillTree.arsenalAdvancement",
  name: "Arsenal Advancement",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};
const arsenalAdvancementFreeBomb: Source = {
  key: "skillTree.arsenalAdvancement",
  name: "Arsenal Advancement",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
/** All-Round Bomber: +40% bomb damage, +10% recharge, +5% bomb crit */
const allRoundBomberDamage: Source = {
  key: "skillTree.allRoundBomber",
  name: "All-Round Bomber",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.4,
  inputs: [],
};
const allRoundBomberRecharge: Source = {
  key: "skillTree.allRoundBomber",
  name: "All-Round Bomber",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};
const allRoundBomberCritChance: Source = {
  key: "skillTree.allRoundBomber",
  name: "All-Round Bomber",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.05,
  inputs: [],
};
/**
 * Demolition Expert → Bomb Crit Damage: +0.5% per % of Bomb Crit Chance (dynamic).
 * Max 1. fn = level × bombCritChance_decimal × 0.5 → bomb_crit_damage
 * Runtime input: bombCritChance as decimal stat value (e.g. 0.50 for 50%).
 */
const demolitionExpertBombCritDmg: Source = {
  key: "skillTree.demolitionExpert",
  name: "Demolition Expert",
  system: "skillTree",
  maxLevel: 1,
  fn: (l, rt) => l * (rt["bombCritChance"] ?? 0) * 0.5,
  inputs: [
    {
      key: "bombCritChance",
      label: "Bomb Crit Chance (stat value)",
      type: "number",
      min: 0,
    },
  ],
};

/** Demolition Expert → +20% Bomb Super Crit Chance, +3% Free Bomb Chance */
const demolitionExpertSuperCrit: Source = {
  key: "skillTree.demolitionExpert",
  name: "Demolition Expert",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};
const demolitionExpertFreeBomb: Source = {
  key: "skillTree.demolitionExpert",
  name: "Demolition Expert",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.03,
  inputs: [],
};
/** Flamboyant Bombs: +150% bomb damage, +10% ultra crit, +5 capacity */
const flamboyantBombsDamage: Source = {
  key: "skillTree.flamboyantBombs",
  name: "Flamboyant Bombs",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 1.5,
  inputs: [],
};
const flamboyantBombsUltraCrit: Source = {
  key: "skillTree.flamboyantBombs",
  name: "Flamboyant Bombs",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};
const flamboyantBombsCapacity: Source = {
  key: "skillTree.flamboyantBombs",
  name: "Flamboyant Bombs",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 5,
  inputs: [],
};
// TODO no registry key: 'Offline Items And Relics Doubled' (Chronokeeper)
const chronokeeperOfflineDouble: Source = {
  key: "skillTree.chronokeeper",
  name: "Chronokeeper",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};

/** Chronokeeper → Bomb Capacity +10. Max 1. */
const chronokeeperBombCapacity: Source = {
  key: "skillTree.chronokeeper",
  name: "Chronokeeper",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 10,
  inputs: [],
};

// ─── Ore / floor nodes ─────────────────────────────────────────────────────────────

/** Easy Progressor: Floor Clear Req -10%, Prestige Point +20%, Ore Sell +20% */
const easyProgressorOreSell: Source = {
  key: "skillTree.easyProgressor",
  name: "Easy Progressor",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};
const easyProgressorFloorClear: Source = {
  key: "skillTree.easyProgressor",
  name: "Easy Progressor",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};
const easyProgressorPrestigePts: Source = {
  key: "skillTree.easyProgressor",
  name: "Easy Progressor",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};
/** I Have Wares If You Have Coin: Ore Sell ×2.00, Golden Floor +20% */
const iHaveWaresOreSell: Source = {
  key: "skillTree.iHaveWaresIfYouHaveCoin",
  name: "I Have Wares, If You Have Coin",
  system: "skillTree",
  maxLevel: 1,
  // Bonus-shaped: wiki sums this with Easy Progressor inside the (…) group.
  fn: (l) => l * 1.0,
  inputs: [],
};
const iHaveWaresGoldenFloor: Source = {
  key: "skillTree.iHaveWaresIfYouHaveCoin",
  name: "I Have Wares, If You Have Coin",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};
/** Perfect Gold: Golden Floor Ore Multiplier +2x (adds to base 5x) */
const perfectGoldGoldenFloor: Source = {
  key: "skillTree.perfectGold",
  name: "Perfect Gold",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 2.0,
  inputs: [],
};
/** Optical Phenomenon: Rainbow Floor Chance +1% */
const opticalPhenomenonRainbowFloor: Source = {
  key: "skillTree.opticalPhenomenon",
  name: "Optical Phenomenon",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
// TODO no registry key: 'Chain Drone Cap +5' (I Buried It Here)
const iBuriedItHereChainDroneCap: Source = {
  key: "skillTree.iBuriedItHere",
  name: "I Buried It Here",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 5,
  inputs: [],
};

/** I Buried It Here → Golden Void Portal Chance +2%, Galactic Floor +2%, Golden Ore +1% (max 3) */
const iBuriedItHereGoldenVoidChance: Source = {
  key: "skillTree.iBuriedItHere",
  name: "I Buried It Here",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.02,
  inputs: [],
};
const iBuriedItHereGalacticFloor: Source = {
  key: "skillTree.iBuriedItHere",
  name: "I Buried It Here",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.02,
  inputs: [],
};
const iBuriedItHereGoldenOre: Source = {
  key: "skillTree.iBuriedItHere",
  name: "I Buried It Here",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
};

// ─── Crafting nodes ────────────────────────────────────────────────────────────────

const oreEfficiencyDoubleCraft: Source = {
  key: "skillTree.oreEfficiency",
  name: "Ore Efficiency",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.05,
  inputs: [],
};
/** Hefty Hammers: Triple Craft +5%, 10x Craft +1% */
const heftyHammersTripleCraft: Source = {
  key: "skillTree.heftyHammers",
  name: "Hefty Hammers",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.05,
  inputs: [],
};
const heftyHammers10xCraft: Source = {
  key: "skillTree.heftyHammers",
  name: "Hefty Hammers",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
/** I'm Running Out Of Creative Names: Rainbow Floor +1%, 10x Craft +2%, Bar Craft Cost -10% */
const imRunningOutRainbowFloor: Source = {
  key: "skillTree.imRunningOutOfCreativeNames",
  name: "I'm Running Out Of Creative Names",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
const imRunningOut10xCraft: Source = {
  key: "skillTree.imRunningOutOfCreativeNames",
  name: "I'm Running Out Of Creative Names",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.02,
  inputs: [],
};
const imRunningOutBarCraft: Source = {
  key: "skillTree.imRunningOutOfCreativeNames",
  name: "I'm Running Out Of Creative Names",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};
// TODO no registry key: '+2 Ores Appear Per Screen' (More Ore More Problems)
const moreOreMoreProblemsOreScreen: Source = {
  key: "skillTree.moreOreMoreProblems",
  name: "More Ore More Problems",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 2,
  inputs: [],
};

/** More Ore More Problems → Bar Craft Cost -10%. Max 1. */
const moreOreMoreProblemsBarCraft: Source = {
  key: "skillTree.moreOreMoreProblems",
  name: "More Ore More Problems",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.1,
  inputs: [],
};

// ─── Contract nodes ────────────────────────────────────────────────────────────────

/** Who's Asking → +2 Contract Points. Max 1. → contract_points_rewarded */
const whosAskingContractPoints: Source = {
  key: "skillTree.whosAskingForAllTheseBars",
  name: "Who's Asking For All These Bars?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 2,
  inputs: [],
};
/** Who's Asking → Triple Contract Point Chance +8%. Max 1. → contract_triple_points_chance */
const whosAskingTripleContract: Source = {
  key: "skillTree.whosAskingForAllTheseBars",
  name: "Who's Asking For All These Bars?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.08,
  inputs: [],
};
// TODO no registry key: '+1 Contract Upgrade re-spec per prestige' (Who's Asking)
const whosAskingContractRespec: Source = {
  key: "skillTree.whosAskingForAllTheseBars",
  name: "Who's Asking For All These Bars?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};
/** Please Sir → 10× Contract Point Chance +0.25% per level. Max 3. → contract_10x_points_chance */
const pleaseSirContract10x: Source = {
  key: "skillTree.pleaseSirDontMakeMePrestigeAgain",
  name: "Please Sir Don't Make Me Prestige Again",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.0025,
  inputs: [],
};
// TODO no registry key: 'Contract Re-Spec Cap +1 per level' (Please Sir — separate from contract_cap_increase)
const pleaseSirContractRespecCap: Source = {
  key: "skillTree.pleaseSirDontMakeMePrestigeAgain",
  name: "Please Sir Don't Make Me Prestige Again",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l,
  inputs: [],
};
/** Idle Obelisk Mincer → Contract Upgrade Cap +2. Max 1. → contract_cap_increase */
const idleObeliskMincerContractCap: Source = {
  key: "skillTree.idleObeliskMincer",
  name: "Idle Obelisk Mincer",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 2,
  inputs: [],
};
/** Idle Obelisk Mincer → Workshop Upgrade Cap +1. Max 1. → bomb_workshop_cap_increase */
const idleObeliskMincerWorkshopCap: Source = {
  key: "skillTree.idleObeliskMincer",
  name: "Idle Obelisk Mincer",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};
// TODO no registry key: 'Scorpio Star Cap +5' (Idle Obelisk Mincer)
const idleObeliskMincerScorpioCap: Source = {
  key: "skillTree.idleObeliskMincer",
  name: "Idle Obelisk Mincer",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 5,
  inputs: [],
};
/** Do These Upgrades Ever End → +1 Artifact Upgrade Cap. Max 1. → artifact_cap_increase */
const doTheseUpgradesArtifactCap: Source = {
  key: "skillTree.doTheseUpgradesEverEnd",
  name: "Do These Upgrades Ever End",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};
/** Do These Upgrades Ever End → +1 Workshop Upgrade Cap. Max 1. → bomb_workshop_cap_increase */
const doTheseUpgradesWorkshopCap: Source = {
  key: "skillTree.doTheseUpgradesEverEnd",
  name: "Do These Upgrades Ever End",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};

// ─── Chest / freebie nodes ─────────────────────────────────────────────────────────

/** Gems & Chests → Freebie Pack Gives +1 Gem. Max 1. → freebie_gems_bonus */
const gemsAndChestsFreebie: Source = {
  key: "skillTree.gemsAndChests",
  name: "Gems & Chests",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};
// TODO no registry key: '+1% Relic Chest chance' (Gems & Chests)
const gemsAndChestsRelicChest: Source = {
  key: "skillTree.gemsAndChests",
  name: "Gems & Chests",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
/** Just Wait Faster: Freebie Pack Timer -60s */
const justWaitFasterCooldown: Source = {
  key: "skillTree.justWaitFaster",
  name: "Just Wait Faster",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 60,
  inputs: [],
};
/** Free? That's A Great Price! → Freebie Pack Timer -60s. Max 1. → freebie_cooldown_seconds */
const freeThatsGreatCooldown: Source = {
  key: "skillTree.freeThatsAGreatPrice",
  name: "Free? That's A Great Price!",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 60,
  inputs: [],
};
/** Free? That's A Great Price! → Instant Refresh Chance +5%. Max 1. → freebie_refresh_chance */
const freeThatsGreatRefresh: Source = {
  key: "skillTree.freeThatsAGreatPrice",
  name: "Free? That's A Great Price!",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.05,
  inputs: [],
};
// TODO no registry key: '+2% Freebie Relic Chance' (Free? That's A Great Price!)
const freeThatsGreatRelicChance: Source = {
  key: "skillTree.freeThatsAGreatPrice",
  name: "Free? That's A Great Price!",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.02,
  inputs: [],
};
/** Chronokeeper: Banked Freebie Cap +1 */
const chronokeeperFrebieCap: Source = {
  key: "skillTree.chronokeeper",
  name: "Chronokeeper",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};
/** Saving For A Rainy Day: Banked Freebie Cap +2, Banked Lootbug Cap +2, Lootbug Gem Cost -1 */
const savingForARainyDayFrebieCap: Source = {
  key: "skillTree.savingForARainyDay",
  name: "Saving For A Rainy Day",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 2,
  inputs: [],
};
const savingForARainyDayLootbugCap: Source = {
  key: "skillTree.savingForARainyDay",
  name: "Saving For A Rainy Day",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 2,
  inputs: [],
};
const savingForARainyDayLootbugGem: Source = {
  key: "skillTree.savingForARainyDay",
  name: "Saving For A Rainy Day",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l,
  inputs: [],
};

// ─── Drone nodes ───────────────────────────────────────────────────────────────────

/** Mechanical Evolution: Drone Suit Upgrade Cap +3 */
const mechanicalEvolutionSuitCap: Source = {
  key: "skillTree.mechanicalEvolution",
  name: "Mechanical Evolution",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 3,
  inputs: [],
};
/** Gasoline Guzzler: Fuel Duration +20%, Coal Production -10s, Coal Capacity +25% */
const gasolineGuzzlerFuelDuration: Source = {
  key: "skillTree.gasolineGuzzler",
  name: "Gasoline Guzzler",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};
const gasolineGuzzlerCoalTime: Source = {
  key: "skillTree.gasolineGuzzler",
  name: "Gasoline Guzzler",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 10,
  inputs: [],
};
const gasolineGuzzlerCoalCap: Source = {
  key: "skillTree.gasolineGuzzler",
  name: "Gasoline Guzzler",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.25,
  inputs: [],
};
/** Call Of The Void → Void Portal Multi +5% per level. Max 3. → void_portal_base_multi */
const callOfTheVoidPortalMulti: Source = {
  key: "skillTree.callOfTheVoid",
  name: "Call Of The Void",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.05,
  inputs: [],
};
// TODO no registry key: 'Void Drone Grade Cap +4 per level' (Call Of The Void)
const callOfTheVoidGradeCap: Source = {
  key: "skillTree.callOfTheVoid",
  name: "Call Of The Void",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 4,
  inputs: [],
};
// TODO no registry key: 'Frogger Drone Grade Cap +2' (Frog Frenzy)
const frogFrenzyFroggerGradeCap: Source = {
  key: "skillTree.frogFrenzy",
  name: "Frog Frenzy",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 2,
  inputs: [],
};
/** Frog Frenzy → Triple Lootfrog Chance +1% per level. Max 3. → lootfrog_triple_spawn_chance */
const frogFrenzyTripleLootfrog: Source = {
  key: "skillTree.frogFrenzy",
  name: "Frog Frenzy",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
};
/** Frog Frenzy → Frog Capacity +1 per level. Max 3. → lootfrog_capacity */
const frogFrenzyLootfrogCap: Source = {
  key: "skillTree.frogFrenzy",
  name: "Frog Frenzy",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l,
  inputs: [],
};

// ─── Vein nodes ────────────────────────────────────────────────────────────────────

/** Leprechaun's Legacy: ×1.10 All Stars Multi, ×1.10 Vein Income, ×1.10 Golden Floor, ×1.10 Bomb Recharge */
const leprechaunsLegacyAllStar: Source = {
  key: "skillTree.leprechaunsLegacy",
  name: "Leprechaun's Legacy",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => 1 + l * 0.1,
  inputs: [],
};
const leprechaunsLegacyVeinIncome: Source = {
  key: "skillTree.leprechaunsLegacy",
  name: "Leprechaun's Legacy",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => 1 + l * 0.1,
  inputs: [],
};
const leprechaunsLegacyGoldenFloor: Source = {
  key: "skillTree.leprechaunsLegacy",
  name: "Leprechaun's Legacy",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => 1 + l * 0.1,
  inputs: [],
};
const leprechaunsLegacyBombRecharge: Source = {
  key: "skillTree.leprechaunsLegacy",
  name: "Leprechaun's Legacy",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => 1 + l * 0.1,
  inputs: [],
};
// TODO no registry key: 'Vein Polychrome Card Bonus +1× per level' (Insane In The Vein Gain)
const insaneInTheVeinGainVeinPoly: Source = {
  key: "skillTree.insaneInTheVeinGain",
  name: "Insane In The Vein Gain",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l,
  inputs: [],
};

/** Insane In The Vein Gain → Rainbow Vein Multi +6% per level. Max 3. → rainbow_vein_multi */
const insaneInTheVeinGainRainbowVein: Source = {
  key: "skillTree.insaneInTheVeinGain",
  name: "Insane In The Vein Gain",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.06,
  inputs: [],
};

// ─── Lootbug nodes ─────────────────────────────────────────────────────────────────

/** Anyone Up Lootin' They Bugs: Banked Lootbug Cap +3/level, Lootbug Loot Multi +4%/level (max 3) */
const anyoneUpLootinBankCap: Source = {
  key: "skillTree.anyoneUpLootinTheyBugs",
  name: "Anyone Up Lootin' They Bugs",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 3,
  inputs: [],
};
const anyoneUpLootinLootMulti: Source = {
  key: "skillTree.anyoneUpLootinTheyBugs",
  name: "Anyone Up Lootin' They Bugs",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.04,
  inputs: [],
};

// ─── Prestige / experience nodes ───────────────────────────────────────────────────

/** PP Go Up: Prestige Point Gain +25%, Exp Gain +25% */
const ppGoUpPrestigePts: Source = {
  key: "skillTree.ppGoUp",
  name: "PP Go Up",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.25,
  inputs: [],
};
const ppGoUpExp: Source = {
  key: "skillTree.ppGoUp",
  name: "PP Go Up",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.25,
  inputs: [],
};

// ─── Stonks ───────────────────────────────────────────────────────────────────────
// TODO no registry key for any Stonks skill bonuses.
// Each line gives a flat 1% chance for a specific freebie reward type.
// Possibly contributes to stonks_chance but semantics differ — needs manual check.
const stonksGemChance: Source = {
  key: "skillTree.stonks",
  name: "Stonks",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
const stonksItemChance: Source = {
  key: "skillTree.stonks",
  name: "Stonks",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
const stonksRelicChance: Source = {
  key: "skillTree.stonks",
  name: "Stonks",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};

// ─── Treasure Hunter ──────────────────────────────────────────────────────────────
// TODO no registry key for either Treasure Hunter bonus.
const treasureHunterRelicChestChance: Source = {
  key: "skillTree.treasureHunter",
  name: "Treasure Hunter",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
const treasureHunterRelicPerOpened: Source = {
  key: "skillTree.treasureHunter",
  name: "Treasure Hunter",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};

// ─── Block Bonker ─────────────────────────────────────────────────────────────────

/** Block Bonker → Damage per Highest Stage +1%. Max 1. → archaeology_dmg_per_stage */
const blockBonkerDamagePerStage: Source = {
  key: "skillTree.blockBonker",
  name: "Block Bonker",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
/** Block Bonker → Max Stamina per Highest Stage +1%. Max 1. → archaeology_stm_per_stage */
const blockBonkerStaminaPerStage: Source = {
  key: "skillTree.blockBonker",
  name: "Block Bonker",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.01,
  inputs: [],
};
/** Block Bonker → Speed Mod Gain +15 (cap Stage 100). Max 1. → archaeology_spd_mod_gain */
const blockBonkerSpeedMod: Source = {
  key: "skillTree.blockBonker",
  name: "Block Bonker",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 15,
  inputs: [],
};

// ─── Avada Keda-' ────────────────────────────────────────────────────────────────

/** Avada Keda-' → Ability Duration +5s. Max 1. → archaeology_ability_dur */
const avadaKedaAbilityDuration: Source = {
  key: "skillTree.avadaKeda",
  name: "Avada Keda-'",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 5,
  inputs: [],
};
/** Avada Keda-' → Ability Cooldown -10s. Max 1. → archaeology_ability_cd */
const avadaKedaAbilityCooldown: Source = {
  key: "skillTree.avadaKeda",
  name: "Avada Keda-'",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 10,
  inputs: [],
};
/** Avada Keda-' → Ability Instacharge Chance +3%. Max 1. → archaeology_ability_insta */
const avadaKedaInstacharge: Source = {
  key: "skillTree.avadaKeda",
  name: "Avada Keda-'",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.03,
  inputs: [],
};

// ─── Pond Yield ───────────────────────────────────────────────────────────────────

const GOLDEN_FROGS_CAUGHT_INPUT = {
  key: "goldenFrogsCaught",
  label: "Golden Frogs Caught",
  type: "integer" as const,
  min: 0,
};

/**
 * Pond Yield → Golden Frog Multiplier +0.001× per Golden Frog Caught. Max 1.
 * Dynamic: scales with total golden frogs caught. → lootfrog_golden_multi
 */
const pondYieldGoldenFrogMul: Source = {
  key: "skillTree.pondYield",
  name: "Pond Yield",
  system: "skillTree",
  maxLevel: 1,
  fn: (l, rt) => l * (rt["goldenFrogsCaught"] ?? 0) * 0.001,
  inputs: [GOLDEN_FROGS_CAUGHT_INPUT],
};

// ─── Misc nodes ─────────────────────────────────────────────────────────────────────

/** Have You Tried Getting Luckier? → All Pets level up chance +15%, Chest Meter Fill Rate 15x */
const haveYouTriedGettingLuckierPetLevelup: Source = {
  key: "skillTree.haveYouTriedGettingLuckier",
  name: "Have You Tried Getting Luckier?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.15,
  inputs: [],
};
const haveYouTriedGettingLuckierChestMeter: Source = {
  key: "skillTree.haveYouTriedGettingLuckier",
  name: "Have You Tried Getting Luckier?",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => 1 + l * 14,
  inputs: [],
};

// ─── Ctrl+F 'Stars' ───────────────────────────────────────────────────────────────
// Obelisk Level 23, max 1 level (single purchase). Cost: 36 skill points.
// Unlocks star-following AND provides permanent flat bonuses to supernova multipliers.

/** Ctrl+F Stars → Star Supernova Multi: +0.20 (flat single-level bonus) */
const ctrlFStarsSupernovaMul: Source = {
  key: "skillTree.ctrlFStars",
  name: "Ctrl+F 'Stars'",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};

/** Ctrl+F Stars → Super Star Supernova Multi: +0.20 (flat single-level bonus) */
const ctrlFStarsSuperStarSupernovaMul: Source = {
  key: "skillTree.ctrlFStars",
  name: "Ctrl+F 'Stars'",
  system: "skillTree",
  maxLevel: 1,
  fn: (l) => l * 0.2,
  inputs: [],
};

// ─── Ctrl+C Ctrl+V Stars ──────────────────────────────────────────────────────
// Obelisk Level 45, max 3 levels. Cost: 75, 94, 117 skill points.

// TODO no registry key: 'Orion Star Cap +2 per level' (Ctrl+C Ctrl+V Stars)
const ctrlCCtrlVStarsOrionCap: Source = {
  key: "skillTree.ctrlCCtrlVStars",
  name: "Ctrl+C Ctrl+V Stars",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 2,
  inputs: [],
};

/** Ctrl+C Ctrl+V Stars → Star Supernova Multi +0.06 per level. Max 3. → star_supernova_multi */
const ctrlCCtrlVStarsSupernovaMul: Source = {
  key: "skillTree.ctrlCCtrlVStars",
  name: "Ctrl+C Ctrl+V Stars",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.06,
  inputs: [],
};

/** Ctrl+C Ctrl+V Stars → Super Star 10x Chance: +0.01 per level */
const ctrlCCtrlVStarsSuper10x: Source = {
  key: "skillTree.ctrlCCtrlVStars",
  name: "Ctrl+C Ctrl+V Stars",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
};

// ─── Why Are There Stars In My Mining Game ────────────────────────────────────
// Obelisk Level 64, max 3 levels. Cost: 950, 1188, 1484 skill points.

/** Why Are There Stars → Novagiant Combo Multi: +0.05 per level */
const whyAreThereStarsNovagiant: Source = {
  key: "skillTree.whyAreThereStarsInMyMiningGame",
  name: "Why Are There Stars In My Mining Game",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.05,
  inputs: [],
};

/** Why Are There Stars → Star Supergiant Chance +0.01 per level. Max 3. → star_supergiant_chance */
const whyAreThereStarsSupergiant: Source = {
  key: "skillTree.whyAreThereStarsInMyMiningGame",
  name: "Why Are There Stars In My Mining Game",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 0.01,
  inputs: [],
};

// TODO no registry key: 'Capricorn Cap +3 per level' (Why Are There Stars)
const whyAreThereStarsCapricornCap: Source = {
  key: "skillTree.whyAreThereStarsInMyMiningGame",
  name: "Why Are There Stars In My Mining Game",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 3,
  inputs: [],
};

// TODO no registry key: 'Gemini Cap +2 per level' (Why Are There Stars)
const whyAreThereStarsGeminiCap: Source = {
  key: "skillTree.whyAreThereStarsInMyMiningGame",
  name: "Why Are There Stars In My Mining Game",
  system: "skillTree",
  maxLevel: 3,
  fn: (l) => l * 2,
  inputs: [],
};

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
  // New pickaxe / misc nodes
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
  // New bomb nodes
  demolitionExpertBombCritDmg,
  chronokeeperOfflineDouble,
  moreOreMoreProblemsOreScreen,
  // New chest/freebie nodes
  gemsAndChestsRelicChest,
  freeThatsGreatRelicChance,
  whosAskingContractRespec,
  pleaseSirContractRespecCap,
  treasureHunterRelicChestChance,
  treasureHunterRelicPerOpened,
  // New drone/frog nodes
  pondYieldGoldenFrogMul,
  frogFrenzyFroggerGradeCap,
  callOfTheVoidGradeCap,
  // New vein node
  insaneInTheVeinGainVeinPoly,
  // New star nodes
  ctrlCCtrlVStarsOrionCap,
  whyAreThereStarsCapricornCap,
  whyAreThereStarsGeminiCap,
  // New misc nodes (no registry key)
  stonksGemChance,
  stonksItemChance,
  stonksRelicChance,
  blockBonkerDamagePerStage,
  blockBonkerStaminaPerStage,
  blockBonkerSpeedMod,
  avadaKedaAbilityDuration,
  avadaKedaAbilityCooldown,
  avadaKedaInstacharge,
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
} satisfies Record<string, Source>;

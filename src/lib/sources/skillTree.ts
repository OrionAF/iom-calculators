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
} satisfies Record<string, Source>

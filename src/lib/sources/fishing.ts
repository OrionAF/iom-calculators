import type { Source } from '$lib/engine/types'

// ─── Tier 1 Upgrades ─────────────────────────────────────────────────────────

/** T1 Upgrade 1: Fishing Rod — multiplies rod power. ×1.16 per level (compounding). Max 60. */
const rodBase: Source = {
  key: 'fishing.rodBase',
  name: 'Fishing Rod Upgrade',
  system: 'fishing',
  maxLevel: 60,
  fn: (l) => Math.pow(1.16, l),
  inputs: [],
}

/** T1 Upgrade 2: Fishing Drone — adds +1 drone per level. Max 50. */
const droneCapT1: Source = {
  key: 'fishing.droneCapT1',
  name: 'Fishing Drone Upgrade (T1)',
  system: 'fishing',
  maxLevel: 50,
  fn: (l) => l,
  inputs: [],
}

/** T1 Upgrade 4: Tick Speed — reduces tick timer by 0.5s per level. Max 40. */
const tickSpeedT1: Source = {
  key: 'fishing.tickSpeedT1',
  name: 'Tick Speed Upgrade (T1)',
  system: 'fishing',
  maxLevel: 40,
  fn: (l) => l * 0.5,
  inputs: [],
}

/** T1 Upgrade 5: Fish Multiplier — adds +0.03 per level. Max 30. */
const fishMultiT1: Source = {
  key: 'fishing.fishMultiT1',
  name: 'Fish Multiplier Upgrade (T1)',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.03,
  inputs: [],
}

/** T1 Upgrade 6: Rod Multiplier — multiplicative factor (1 + level × 0.04). Max 20. */
const rodMultiT1: Source = {
  key: 'fishing.rodMultiT1',
  name: 'Rod Multiplier Upgrade (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => 1 + l * 0.04,
  inputs: [],
}

/** T1 Upgrade 7: Drone Multiplier — adds +0.06 per level to drone power multiplier. Max 20. */
const droneMultiT1: Source = {
  key: 'fishing.droneMultiT1',
  name: 'Drone Multiplier Upgrade (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.06,
  inputs: [],
}

/** T1 Upgrade 8: Double Tick Chance — adds +0.5% (0.005) per level. Max 30. */
const doubleTickT1: Source = {
  key: 'fishing.doubleTickT1',
  name: 'Double Tick Chance Upgrade (T1)',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** T1 Upgrade 9: Fishing Drone B — adds +2 drones per level. Max 30. */
const droneCapT1B: Source = {
  key: 'fishing.droneCapT1B',
  name: 'Fishing Drone Upgrade B (T1)',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 2,
  inputs: [],
}

/** T1 Upgrade 10: Shiny Fish Chance — adds +0.5% (0.005) per level. Max 25. */
const shinyChanceT1: Source = {
  key: 'fishing.shinyChanceT1',
  name: 'Shiny Fish Chance Upgrade (T1)',
  system: 'fishing',
  maxLevel: 25,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** T1 Upgrade 11: Drone Base Power — adds +0.25 per level. Max 30. */
const droneBaseT1: Source = {
  key: 'fishing.droneBaseT1',
  name: 'Drone Base Power Upgrade (T1)',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.25,
  inputs: [],
}

/** T1 Upgrade 12: Triple Tick Chance — adds +0.35% (0.0035) per level. Max 25. */
const tripleTickT1: Source = {
  key: 'fishing.tripleTickT1',
  name: 'Triple Tick Chance Upgrade (T1)',
  system: 'fishing',
  maxLevel: 25,
  fn: (l) => l * 0.0035,
  inputs: [],
}

// ─── Tier 2 Upgrades ─────────────────────────────────────────────────────────

/** T2 Upgrade 2: Shiny Multiplier — adds +0.05 per level. Max 20. */
const shinyMultiT2: Source = {
  key: 'fishing.shinyMultiT2',
  name: 'Shiny Multiplier Upgrade (T2)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** T2 Upgrade 3: Tier 2 Dock Power — adds +0.05 per level. Max 20. */
const tier2DockT2: Source = {
  key: 'fishing.tier2DockT2',
  name: 'Tier 2 Dock Power Upgrade (T2)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** T2 Upgrade 4: Super Shiny Chance — adds +1% (0.01) per level. Max 20. */
const superShinyChanceT2: Source = {
  key: 'fishing.superShinyChanceT2',
  name: 'Super Shiny Chance Upgrade (T2)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** T2 Upgrade 6: Drone Cloner — multiplies total drones ×1.05 per level (compounding). Max 30. */
const droneCloner: Source = {
  key: 'fishing.droneCloner',
  name: 'Drone Cloner Upgrade (T2)',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => Math.pow(1.05, l),
  inputs: [],
}

// ─── Tier 1 Enhancements ─────────────────────────────────────────────────────

/** T1 Enhance 1: Fish Multiplier — adds +0.05 per level. Max 255. */
const fishMultiE1: Source = {
  key: 'fishing.fishMultiE1',
  name: 'Fish Multiplier Enhancement (T1)',
  system: 'fishing',
  maxLevel: 255,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** T1 Enhance 2: Fishing Drone — adds +1 drone per level. Max 25. */
const droneCapE1: Source = {
  key: 'fishing.droneCapE1',
  name: 'Fishing Drone Enhancement (T1)',
  system: 'fishing',
  maxLevel: 25,
  fn: (l) => l,
  inputs: [],
}

/** T1 Enhance 3: Rod Multiplier — multiplicative factor (1 + level × 0.05). Max 20. */
const rodMultiE1: Source = {
  key: 'fishing.rodMultiE1',
  name: 'Rod Multiplier Enhancement (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => 1 + l * 0.05,
  inputs: [],
}

/** T1 Enhance 4: Tick Speed — reduces tick timer by 0.5s per level. Max 20. */
const tickSpeedE1: Source = {
  key: 'fishing.tickSpeedE1',
  name: 'Tick Speed Enhancement (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.5,
  inputs: [],
}

/** T1 Enhance 5: Drone Multiplier — adds +0.08 per level. Max 25. */
const droneMultiE1: Source = {
  key: 'fishing.droneMultiE1',
  name: 'Drone Multiplier Enhancement (T1)',
  system: 'fishing',
  maxLevel: 25,
  fn: (l) => l * 0.08,
  inputs: [],
}

/** T1 Enhance 6: Token Multiplier — adds +0.05 per level. Max 20. */
const tokenMultiE1: Source = {
  key: 'fishing.tokenMultiE1',
  name: 'Token Multiplier Enhancement (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** T1 Enhance 7: Double Tick Chance — adds +0.5% (0.005) per level. Max 20. */
const doubleTickE1: Source = {
  key: 'fishing.doubleTickE1',
  name: 'Double Tick Chance Enhancement (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** T1 Enhance 8: Tiny Notice Chance — adds +0.5% (0.005) per level. Max 20. */
const tinyNoticeE1: Source = {
  key: 'fishing.tinyNoticeE1',
  name: 'Tiny Notice Chance Enhancement (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** T1 Enhance 9: Shiny Multiplier — adds +0.05 per level. Max 20. */
const shinyMultiE1: Source = {
  key: 'fishing.shinyMultiE1',
  name: 'Shiny Multiplier Enhancement (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** T1 Enhance 10: Fishing Drone +3 — adds +3 drones per level. Max 20. */
const droneCapE1C: Source = {
  key: 'fishing.droneCapE1C',
  name: 'Fishing Drone +3 Enhancement (T1)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 3,
  inputs: [],
}

// ─── Tier 2 Enhancements ─────────────────────────────────────────────────────

/** T2 Enhance 2: Triple Tick Chance — adds +0.4% (0.004) per level. Max 20. */
const tripleTickE2: Source = {
  key: 'fishing.tripleTickE2',
  name: 'Triple Tick Chance Enhancement (T2)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.004,
  inputs: [],
}

/** T2 Enhance 3: Super Shiny Multi — adds +0.15 per level (adds to base 2×). Max 20. */
const superShinyMultiE2: Source = {
  key: 'fishing.superShinyMultiE2',
  name: 'Super Shiny Multiplier Enhancement (T2)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.15,
  inputs: [],
}

/** T2 Enhance 4: Tier 2 Dock Power — adds +0.05 per level. Max 20. */
const tier2DockE2: Source = {
  key: 'fishing.tier2DockE2',
  name: 'Tier 2 Dock Power Enhancement (T2)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.05,
  inputs: [],
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const fishingSources = {
  // T1 Upgrades
  rodBase,
  droneCapT1,
  tickSpeedT1,
  fishMultiT1,
  rodMultiT1,
  droneMultiT1,
  doubleTickT1,
  droneCapT1B,
  shinyChanceT1,
  droneBaseT1,
  tripleTickT1,
  // T2 Upgrades
  shinyMultiT2,
  tier2DockT2,
  superShinyChanceT2,
  droneCloner,
  // T1 Enhancements
  fishMultiE1,
  droneCapE1,
  rodMultiE1,
  tickSpeedE1,
  droneMultiE1,
  tokenMultiE1,
  doubleTickE1,
  tinyNoticeE1,
  shinyMultiE1,
  droneCapE1C,
  // T2 Enhancements
  tripleTickE2,
  superShinyMultiE2,
  tier2DockE2,
} satisfies Record<string, Source>

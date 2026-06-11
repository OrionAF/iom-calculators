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

/** T2 Upgrade 5: Poly Card Multi — adds +0.08 per level to fish polychrome card multiplier. Max 25. → polychrome_card_bonus_fish */
const polyCardMultiT2: Source = {
  key: 'fishing.polyCardMultiT2',
  name: 'Poly Card Multi Upgrade (T2)',
  system: 'fishing',
  maxLevel: 25,
  fn: (l) => l * 0.08,
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

/**
 * T2 Enhance 1: Tier 2 Dock Ticks — reduces T2 dock tick requirement by 1 per level. Max 10.
 * Positive fn per reduction convention. → fishing_abyss_dock_tick_req
 */
const tier2DockTicksE2: Source = {
  key: 'fishing.tier2DockTicksE2',
  name: 'Tier 2 Dock Ticks Enhancement (T2)',
  system: 'fishing',
  maxLevel: 10,
  fn: (l) => l * 1,
  inputs: [],
}

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

/** T2 Enhance 5: Poly Card Multi — adds +0.10 per level to fish polychrome card multiplier. Max 20. → polychrome_card_bonus_fish */
const polyCardMultiE2: Source = {
  key: 'fishing.polyCardMultiE2',
  name: 'Poly Card Multi Enhancement (T2)',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.10,
  inputs: [],
}

// ─── Tier 1 Notice Upgrades ───────────────────────────────────────────────────
// Permanent upgrades purchased with fishing notice tokens.
// Max levels: base max + 15 (5 from T2 notice upgrade cap, 10 from Melting Gibbous T1 tribute).
// "×N.NNx" descriptions are interpreted as additive +% per level (not compound).

/** T1 Notice: Golden Floor Multiplier +2% per level. Max 40. → golden_floor_multi */
const noticeT1GoldenFloor: Source = {
  key: 'fishing.notice.t1.goldenFloor',
  name: 'T1 Notice – Golden Floor Multi',
  system: 'fishing',
  maxLevel: 40,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** T1 Notice: Rainbow Vein Multiplier +5% per level. Max 40. → rainbow_vein_multi */
const noticeT1RainbowVeinMul: Source = {
  key: 'fishing.notice.t1.rainbowVeinMul',
  name: 'T1 Notice – Rainbow Vein Multi',
  system: 'fishing',
  maxLevel: 40,
  fn: (l) => l * 0.05,
  inputs: [],
}

/** T1 Notice: Pickaxe & Bomb Damage +15% per level. Max 40. → pickaxe_damage */
const noticeT1PickaxeDmg: Source = {
  key: 'fishing.notice.t1.pickaxeDmg',
  name: 'T1 Notice – Pickaxe Damage',
  system: 'fishing',
  maxLevel: 40,
  fn: (l) => l * 0.15,
  inputs: [],
}

/** T1 Notice: Pickaxe & Bomb Damage +15% per level. Max 40. → bomb_damage */
const noticeT1BombDmg: Source = {
  key: 'fishing.notice.t1.bombDmg',
  name: 'T1 Notice – Bomb Damage',
  system: 'fishing',
  maxLevel: 40,
  fn: (l) => l * 0.15,
  inputs: [],
}

/** T1 Notice: All Star Multiplier +1% per level. Max 35. → all_star_multi */
const noticeT1AllStarMul: Source = {
  key: 'fishing.notice.t1.allStarMul',
  name: 'T1 Notice – All Star Multi',
  system: 'fishing',
  maxLevel: 35,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** T1 Notice: Rainbow Floor Chance +2%. Max 1 (binary). → rainbow_floor_chance */
const noticeT1RainbowFloorChance: Source = {
  key: 'fishing.notice.t1.rainbowFloorChance',
  name: 'T1 Notice – Rainbow Floor Chance',
  system: 'fishing',
  maxLevel: 1,
  fn: (l) => l * 0.02,
  inputs: [],
}

/** T1 Notice: Experience Gain +20% per level. Max 45. → experience_multi */
const noticeT1ExpGain: Source = {
  key: 'fishing.notice.t1.expGain',
  name: 'T1 Notice – Experience Gain',
  system: 'fishing',
  maxLevel: 45,
  fn: (l) => l * 0.20,
  inputs: [],
}

/** T1 Notice: Triple Contract Point Chance +1% per level. Max 30. → contract_triple_points_chance */
const noticeT1TripleContractChance: Source = {
  key: 'fishing.notice.t1.tripleContract',
  name: 'T1 Notice – Triple Contract Chance',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.01,
  inputs: [],
}

/** T1 Notice: Pet Level Up Chance +0.50% per level. Max 35. → pet_levelup_chance_multi */
const noticeT1PetLevelUp: Source = {
  key: 'fishing.notice.t1.petLevelUp',
  name: 'T1 Notice – Pet Level Up Chance',
  system: 'fishing',
  maxLevel: 35,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** T1 Notice: Super Star Supernova Multi +4% per level. Max 30. → super_star_supernova_multi */
const noticeT1SuperStarSupernovaMul: Source = {
  key: 'fishing.notice.t1.superStarSupernovaMul',
  name: 'T1 Notice – Super Star Supernova Multi',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.04,
  inputs: [],
}

/** T1 Notice: All Floor Multiplier +20%. Max 1 (binary). → all_floor_multipliers */
const noticeT1AllFloorMul: Source = {
  key: 'fishing.notice.t1.allFloorMul',
  name: 'T1 Notice – All Floor Multi',
  system: 'fishing',
  maxLevel: 1,
  fn: (l) => l * 0.20,
  inputs: [],
}

/** T1 Notice: Bomb Recharge Rate +0.5% per level. Max 35. → bomb_recharge_speed */
const noticeT1BombRecharge: Source = {
  key: 'fishing.notice.t1.bombRecharge',
  name: 'T1 Notice – Bomb Recharge Rate',
  system: 'fishing',
  maxLevel: 35,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** T1 Notice: Golden Vein Multiplier +4% per level. Max 40. → golden_vein_multi */
const noticeT1GoldenVeinMul: Source = {
  key: 'fishing.notice.t1.goldenVeinMul',
  name: 'T1 Notice – Golden Vein Multi',
  system: 'fishing',
  maxLevel: 40,
  fn: (l) => l * 0.04,
  inputs: [],
}

/**
 * T1 Notice: Star Supernova Multiplier +1× per level. Max 18.
 * Absolute addition to the supernova multiplier value. → star_supernova_multi
 */
const noticeT1StarSupernovaMul: Source = {
  key: 'fishing.notice.t1.starSupernovaMul',
  name: 'T1 Notice – Star Supernova Multi',
  system: 'fishing',
  maxLevel: 18,
  fn: (l) => l,
  inputs: [],
}

/** T1 Notice: 10× Craft Chance +0.5% per level. Max 25. → craft_10x_chance */
const noticeT1CraftChance10x: Source = {
  key: 'fishing.notice.t1.craftChance10x',
  name: 'T1 Notice – 10x Craft Chance',
  system: 'fishing',
  maxLevel: 25,
  fn: (l) => l * 0.005,
  inputs: [],
}

/** T1 Notice: Remove World 3 −30% Game Speed Mod. +30% game speed. Max 1 (binary). → game_speed_multi */
const noticeT1RemoveW3SpeedMod: Source = {
  key: 'fishing.notice.t1.removeW3Speed',
  name: 'T1 Notice – Remove W3 Speed Mod',
  system: 'fishing',
  maxLevel: 1,
  fn: (l) => l * 0.30,
  inputs: [],
}

// ─── Tier 2 Notice Upgrades ───────────────────────────────────────────────────
// Max levels: base max + 5 (from Melting Gibbous Tier 1 Tribute).
// T2 Notice 'Tier 1 Notice Upgrade Cap' (+1/level, max 10) is meta — no stat key.
// T2 Notice 'Midas Drone Enhancement' (max 1) is a feature unlock — no stat key.

/** T2 Notice: 10× Contract Point Chance +0.1% per level. Max 30. → contract_10x_points_chance */
const noticeT2ContractChance10x: Source = {
  key: 'fishing.notice.t2.contractChance10x',
  name: 'T2 Notice – 10x Contract Chance',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.001,
  inputs: [],
}

// TODO no registry key: T2 Notice 'Veinseeker Grade Cap +1 per level, max 30'
//   no drone_veinseeker_grade_cap_increase key; drone_chain/frogger/void exist

/** T2 Notice: 100× Craft Chance +0.1% per level. Max 20. → craft_100x_chance */
const noticeT2CraftChance100x: Source = {
  key: 'fishing.notice.t2.craftChance100x',
  name: 'T2 Notice – 100x Craft Chance',
  system: 'fishing',
  maxLevel: 20,
  fn: (l) => l * 0.001,
  inputs: [],
}

/** T2 Notice: Star Supergiant Chance +0.2% per level. Max 30. → star_supergiant_chance */
const noticeT2StarSupergiants: Source = {
  key: 'fishing.notice.t2.starSupergiants',
  name: 'T2 Notice – Star Supergiant Chance',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.002,
  inputs: [],
}

/** T2 Notice: Freebie Jackpot Chance +0.1% per level. Max 30. → freebie_5x_chance */
const noticeT2FreebieJackpot: Source = {
  key: 'fishing.notice.t2.freebieJackpot',
  name: 'T2 Notice – Freebie Jackpot Chance',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.001,
  inputs: [],
}

/**
 * T2 Notice: Lasagna Golden Ore Multi +0.15× per level. Max 30.
 * Conditional: only applies when Lasagna item is active. → golden_ore_multi
 */
const noticeT2LasagnaGoldenOreMul: Source = {
  key: 'fishing.notice.t2.lasagnaGoldenOre',
  name: 'T2 Notice – Lasagna Golden Ore Multi',
  system: 'fishing',
  maxLevel: 30,
  fn: (l) => l * 0.15,
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
  polyCardMultiT2,
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
  tier2DockTicksE2,
  tripleTickE2,
  superShinyMultiE2,
  tier2DockE2,
  polyCardMultiE2,
  // T1 Notice Upgrades
  noticeT1GoldenFloor,
  noticeT1RainbowVeinMul,
  noticeT1PickaxeDmg,
  noticeT1BombDmg,
  noticeT1AllStarMul,
  noticeT1RainbowFloorChance,
  noticeT1ExpGain,
  noticeT1TripleContractChance,
  noticeT1PetLevelUp,
  noticeT1SuperStarSupernovaMul,
  noticeT1AllFloorMul,
  noticeT1BombRecharge,
  noticeT1GoldenVeinMul,
  noticeT1StarSupernovaMul,
  noticeT1CraftChance10x,
  noticeT1RemoveW3SpeedMod,
  // T2 Notice Upgrades
  noticeT2ContractChance10x,
  noticeT2CraftChance100x,
  noticeT2StarSupergiants,
  noticeT2FreebieJackpot,
  noticeT2LasagnaGoldenOreMul,
} satisfies Record<string, Source>

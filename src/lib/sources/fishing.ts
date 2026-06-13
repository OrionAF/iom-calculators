import type { Op, Source } from '$lib/engine/types'

// Fishing sources own all fishing effect numbers. Leveled, no runtime inputs.
// statKey/op mirror the formula wiring (consistency test enforces op where used);
// effects with no registry stat carry no statKey. Rod/cloner upgrades compound
// (Math.pow); reduction-convention sources (tick speed, dock ticks) use positive fn.

const fi = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `fishing.${key}`,
  name,
  system: 'fishing',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── Tier 1 Upgrades ─────────────────────────────────────────────────────────

const rodBase = fi('rodBase', 'Fishing Rod Upgrade', 60, 'fishing_rod_power', '×', (l) => Math.pow(1.16, l))
const droneCapT1 = fi('droneCapT1', 'Fishing Drone Upgrade (T1)', 50, 'fishing_drone_capacity', '+', (l) => l)
const tickSpeedT1 = fi('tickSpeedT1', 'Tick Speed Upgrade (T1)', 40, 'fishing_tick_reduction_seconds', '+', (l) => l * 0.5)
const fishMultiT1 = fi('fishMultiT1', 'Fish Multiplier Upgrade (T1)', 30, 'fishing_income_multi', '+', (l) => l * 0.03)
const rodMultiT1 = fi('rodMultiT1', 'Rod Multiplier Upgrade (T1)', 20, 'fishing_rod_power', '×', (l) => 1 + l * 0.04)
const droneMultiT1 = fi('droneMultiT1', 'Drone Multiplier Upgrade (T1)', 20, 'fishing_drone_multiplier', '×1+', (l) => l * 0.06)
const doubleTickT1 = fi('doubleTickT1', 'Double Tick Chance Upgrade (T1)', 30, 'fishing_double_tick_chance', '+', (l) => l * 0.005)
const droneCapT1B = fi('droneCapT1B', 'Fishing Drone Upgrade B (T1)', 30, 'fishing_drone_capacity', '+', (l) => l * 2)
const shinyChanceT1 = fi('shinyChanceT1', 'Shiny Fish Chance Upgrade (T1)', 25, 'fishing_shiny_chance', '+', (l) => l * 0.005)
const droneBaseT1 = fi('droneBaseT1', 'Drone Base Power Upgrade (T1)', 30, 'fishing_drone_power', '+', (l) => l * 0.25)
const tripleTickT1 = fi('tripleTickT1', 'Triple Tick Chance Upgrade (T1)', 25, 'fishing_triple_tick_chance', '+', (l) => l * 0.0035)

// ─── Tier 2 Upgrades ─────────────────────────────────────────────────────────

const shinyMultiT2 = fi('shinyMultiT2', 'Shiny Multiplier Upgrade (T2)', 20, 'fishing_shiny_multi', '+', (l) => l * 0.05)
const tier2DockT2 = fi('tier2DockT2', 'Tier 2 Dock Power Upgrade (T2)', 20, 'fishing_tier2_dock_multi', '+', (l) => l * 0.05)
const superShinyChanceT2 = fi('superShinyChanceT2', 'Super Shiny Chance Upgrade (T2)', 20, 'fishing_super_shiny_chance', '+', (l) => l * 0.01)
const polyCardMultiT2 = fi('polyCardMultiT2', 'Poly Card Multi Upgrade (T2)', 25, 'polychrome_card_bonus_fish', '+', (l) => l * 0.08)
const droneCloner = fi('droneCloner', 'Drone Cloner Upgrade (T2)', 30, 'fishing_drone_capacity', '×', (l) => Math.pow(1.05, l))

// ─── Tier 1 Enhancements ─────────────────────────────────────────────────────

const fishMultiE1 = fi('fishMultiE1', 'Fish Multiplier Enhancement (T1)', 255, 'fishing_income_multi', '+', (l) => l * 0.05)
const droneCapE1 = fi('droneCapE1', 'Fishing Drone Enhancement (T1)', 25, 'fishing_drone_capacity', '+', (l) => l)
const rodMultiE1 = fi('rodMultiE1', 'Rod Multiplier Enhancement (T1)', 20, 'fishing_rod_power', '×', (l) => 1 + l * 0.05)
const tickSpeedE1 = fi('tickSpeedE1', 'Tick Speed Enhancement (T1)', 20, 'fishing_tick_reduction_seconds', '+', (l) => l * 0.5)
const droneMultiE1 = fi('droneMultiE1', 'Drone Multiplier Enhancement (T1)', 25, 'fishing_drone_multiplier', '×1+', (l) => l * 0.08)
const tokenMultiE1 = fi('tokenMultiE1', 'Token Multiplier Enhancement (T1)', 20, 'fishing_token_multi', '+', (l) => l * 0.05)
const doubleTickE1 = fi('doubleTickE1', 'Double Tick Chance Enhancement (T1)', 20, 'fishing_double_tick_chance', '+', (l) => l * 0.005)
const tinyNoticeE1 = fi('tinyNoticeE1', 'Tiny Notice Chance Enhancement (T1)', 20, 'fishing_tiny_notice_chance', '+', (l) => l * 0.005)
const shinyMultiE1 = fi('shinyMultiE1', 'Shiny Multiplier Enhancement (T1)', 20, 'fishing_shiny_multi', '+', (l) => l * 0.05)
const droneCapE1C = fi('droneCapE1C', 'Fishing Drone +3 Enhancement (T1)', 20, 'fishing_drone_capacity', '+', (l) => l * 3)

// ─── Tier 2 Enhancements ─────────────────────────────────────────────────────

// Reduction convention: positive fn, formula subtracts.
const tier2DockTicksE2 = fi('tier2DockTicksE2', 'Tier 2 Dock Ticks Enhancement (T2)', 10, 'fishing_abyss_dock_tick_req', '+', (l) => l * 1)
const tripleTickE2 = fi('tripleTickE2', 'Triple Tick Chance Enhancement (T2)', 20, 'fishing_triple_tick_chance', '+', (l) => l * 0.004)
const superShinyMultiE2 = fi('superShinyMultiE2', 'Super Shiny Multiplier Enhancement (T2)', 20, 'fishing_super_shiny_multi', '+', (l) => l * 0.15)
const tier2DockE2 = fi('tier2DockE2', 'Tier 2 Dock Power Enhancement (T2)', 20, 'fishing_tier2_dock_multi', '+', (l) => l * 0.05)
const polyCardMultiE2 = fi('polyCardMultiE2', 'Poly Card Multi Enhancement (T2)', 20, 'polychrome_card_bonus_fish', '+', (l) => l * 0.1)

// ─── Tier 1 Notice Upgrades ───────────────────────────────────────────────────

const noticeT1GoldenFloor = fi('notice.t1.goldenFloor', 'T1 Notice – Golden Floor Multi', 40, 'golden_floor_multi', '+', (l) => l * 0.02)
const noticeT1RainbowVeinMul = fi('notice.t1.rainbowVeinMul', 'T1 Notice – Rainbow Vein Multi', 40, 'rainbow_vein_multi', '+', (l) => l * 0.05)
const noticeT1PickaxeDmg = fi('notice.t1.pickaxeDmg', 'T1 Notice – Pickaxe Damage', 40, 'pickaxe_damage', '×1+', (l) => l * 0.15)
const noticeT1BombDmg = fi('notice.t1.bombDmg', 'T1 Notice – Bomb Damage', 40, 'bomb_damage', '×1+', (l) => l * 0.15)
const noticeT1AllStarMul = fi('notice.t1.allStarMul', 'T1 Notice – All Star Multi', 35, 'all_star_multi', '+', (l) => l * 0.01)
const noticeT1RainbowFloorChance = fi('notice.t1.rainbowFloorChance', 'T1 Notice – Rainbow Floor Chance', 1, 'rainbow_floor_chance', '+', (l) => l * 0.02)
const noticeT1ExpGain = fi('notice.t1.expGain', 'T1 Notice – Experience Gain', 45, 'experience_multi', '+', (l) => l * 0.2)
const noticeT1TripleContractChance = fi('notice.t1.tripleContract', 'T1 Notice – Triple Contract Chance', 30, 'contract_triple_points_chance', '+', (l) => l * 0.01)
const noticeT1PetLevelUp = fi('notice.t1.petLevelUp', 'T1 Notice – Pet Level Up Chance', 35, 'pet_levelup_chance_multi', '+', (l) => l * 0.005)
const noticeT1SuperStarSupernovaMul = fi('notice.t1.superStarSupernovaMul', 'T1 Notice – Super Star Supernova Multi', 30, 'super_star_supernova_multi', '+', (l) => l * 0.04)
// FLAG: comment says "All Floor Multi" but formula wires this to multi_rock_chance.
const noticeT1AllFloorMul = fi('notice.t1.allFloorMul', 'T1 Notice – All Floor Multi', 1, 'multi_rock_chance', '+', (l) => l * 0.2)
const noticeT1BombRecharge = fi('notice.t1.bombRecharge', 'T1 Notice – Bomb Recharge Rate', 35, 'bomb_recharge_speed', '+', (l) => l * 0.005)
const noticeT1GoldenVeinMul = fi('notice.t1.goldenVeinMul', 'T1 Notice – Golden Vein Multi', 40, 'golden_vein_multi', '+', (l) => l * 0.04)
const noticeT1StarSupernovaMul = fi('notice.t1.starSupernovaMul', 'T1 Notice – Star Supernova Multi', 18, 'star_supernova_multi', '+', (l) => l)
const noticeT1CraftChance10x = fi('notice.t1.craftChance10x', 'T1 Notice – 10x Craft Chance', 25, 'craft_10x_chance', '+', (l) => l * 0.005)
const noticeT1RemoveW3SpeedMod = fi('notice.t1.removeW3Speed', 'T1 Notice – Remove W3 Speed Mod', 1, 'game_speed_multi', '+', (l) => l * 0.3)

// ─── Tier 2 Notice Upgrades ───────────────────────────────────────────────────
// T1 Notice Upgrade Cap and Midas Drone Enhancement are meta/unlock — no stat key.

const noticeT2ContractChance10x = fi('notice.t2.contractChance10x', 'T2 Notice – 10x Contract Chance', 30, 'contract_10x_points_chance', '+', (l) => l * 0.001)
const noticeT2VeinseekerGradeCap = fi('notice.t2.veinseekerGradeCap', 'T2 Notice – Veinseeker Grade Cap', 30, 'drone_veinseeker_grade_cap_increase', '+', (l) => l)
const noticeT2CraftChance100x = fi('notice.t2.craftChance100x', 'T2 Notice – 100x Craft Chance', 20, 'craft_100x_chance', '+', (l) => l * 0.001)
const noticeT2StarSupergiants = fi('notice.t2.starSupergiants', 'T2 Notice – Star Supergiant Chance', 30, 'star_supergiant_chance', '+', (l) => l * 0.002)
const noticeT2FreebieJackpot = fi('notice.t2.freebieJackpot', 'T2 Notice – Freebie Jackpot Chance', 30, 'freebie_5x_chance', '+', (l) => l * 0.001)
// Conditional: only applies when Lasagna item is active (formula can't model the condition).
const noticeT2LasagnaGoldenOreMul = fi('notice.t2.lasagnaGoldenOre', 'T2 Notice – Lasagna Golden Ore Multi', 30, 'golden_ore_multi', '+', (l) => l * 0.15)

// ─── Export ───────────────────────────────────────────────────────────────────

export const fishingSources = {
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
  shinyMultiT2,
  tier2DockT2,
  superShinyChanceT2,
  polyCardMultiT2,
  droneCloner,
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
  tier2DockTicksE2,
  tripleTickE2,
  superShinyMultiE2,
  tier2DockE2,
  polyCardMultiE2,
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
  noticeT2ContractChance10x,
  noticeT2VeinseekerGradeCap,
  noticeT2CraftChance100x,
  noticeT2StarSupergiants,
  noticeT2FreebieJackpot,
  noticeT2LasagnaGoldenOreMul,
} satisfies Record<string, Source>

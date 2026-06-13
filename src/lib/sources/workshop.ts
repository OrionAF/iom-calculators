import type { Op, Source } from '$lib/engine/types'

// Workshop sources own all workshop effect numbers (fn, maxLevel, statKey, op).
// Leveled upgrades scale with workshop level. statKey/op annotations mirror
// the formula wiring (consistency test enforces op match where a source is
// used); a few effects have no registry stat yet and carry no statKey.

const ws = (
  key: string,
  name: string,
  maxLevel: number,
  statKey: string | undefined,
  op: Op | undefined,
  fn: Source['fn'],
): Source => ({
  key: `workshop.${key}`,
  name: `Workshop: ${name}`,
  system: 'workshop',
  maxLevel,
  statKey,
  op,
  fn,
  inputs: [],
})

// ─── World 1 ──────────────────────────────────────────────────────────────────

export const wsBombDmgW1 = ws('bombDmgW1', 'Basic & Chain Damage (W1)', 30, 'bomb_damage', '×1+', (n) => n * 0.5)
export const wsBOPoreMultiW1 = ws('BOPoreMultiW1', 'Bomb of Plenty Ore Multi (W1)', 25, 'bomb_of_plenty_multi', '+', (n) => n * 1.0)
export const wsPickaxeDmgW1 = ws('pickaxeDmgW1', 'Pickaxe Damage (W1)', 42, 'pickaxe_damage', '×1+', (n) => n * 0.03)
export const wsD20chargesW1 = ws('D20chargesW1', 'D20 Charges (W1)', 42, undefined, undefined, (n) => n * 1)
export const wsCherryBomb3xChanceW1 = ws('CherryBomb3xChanceW1', '3x Cherry Bomb Charges (W1)', 32, 'bomb_cherry3x_chance', '+', (n) => n * 0.005)
export const wsTransmuterBombBarIncreaseW1 = ws('TransmuterBombBarIncreaseW1', 'Transmuter Bomb Bar increase (W1)', 27, undefined, undefined, (n) => n * 1)

// ─── World 2 ──────────────────────────────────────────────────────────────────

export const wsBombDmgW2 = ws('bombDmgW2', 'Bomb Damage (W2)', 42, 'bomb_damage', '×1+', (n) => n * 0.35)
export const wsTransmuterBombBOPmarkW2 = ws('TransmuterBombBOPmarkW2', 'Transmuter Bomb BoP chance (W2)', 1, 'bomb_trans_apply_bop_chance', '+', (n) => n * 0.25)

// ─── World 3 ──────────────────────────────────────────────────────────────────

export const wsBombDmgW3 = ws('bombDmgW3', 'Bomb Damage (W3)', 42, 'bomb_damage', '×', (n) => 1 + n * 0.15)
export const wsVeinmorphMorphChanceW3 = ws('VeinmorphMorphChanceW3', 'Veinmorpher Bomb Morph Chance (W3)', 47, 'veinmorpher_chance', '+', (n) => n * 0.001)
export const wsPickaxeDmgW3 = ws('pickaxeDmgW3', 'Pickaxe Damage (W3)', 47, 'pickaxe_damage', '×', (n) => 1 + n * 0.08)
export const wsBoPgoldenChanceW3 = ws('BoPgoldenChanceW3', 'BoP Golden Chance (W3)', 47, 'bomb_of_plenty_make_gold_chance', '+', (n) => n * 0.0015)
export const wsHamburgerBonusW3 = ws('hamburgerBonusW3', 'Hamburger Bonus (W3)', 47, undefined, undefined, (n) => n * 0.12)
export const wsBOPoreMultiW3 = ws('BOPoreMultiW3', 'Bomb of Plenty Ore Multi (W3)', 47, 'bomb_of_plenty_multi', '+', (n) => n * 0.5)
export const wsFishingTicksW3 = ws('fishingTicksW3', 'Sushi Fishing Ticks (W3)', 42, 'fishing_tick_speed', '+', (n) => n)
export const wsDronePowerW3 = ws('dronePowerW3', 'Fishing Drone Power (W3)', 52, 'fishing_drone_multiplier', '×', (n) => 1 + n * 0.02)

// ─── World 4 ──────────────────────────────────────────────────────────────────

// Feeds both pickaxe_damage and bomb_damage: no single statKey, op '×' (both agree).
export const wsPickaxeBombDmgW4 = ws('pickaxeBombDmgW4', 'Pickaxe & Bomb Damage (W4)', 52, undefined, '×', (n) => 1 + n * 0.1)
export const wsStarfruitAllStarMultiW4 = ws('StarfruitAllStarMultiW4', 'Starfruit All Star Multi (W4)', 52, 'all_star_multi', '+', (n) => n * 0.005)
export const wsBOPoreMultiW4 = ws('BOPoreMultiW4', 'Bomb of Plenty Ore Multi (W4)', 52, 'bomb_of_plenty_multi', '+', (n) => n * 1)
export const wsBombRechargeW4 = ws('bombRechargeW4', 'Bomb Recharge Speed (W4)', 52, 'bomb_recharge_speed', '+', (n) => n * 0.0025)
export const wsLootfrogLootW4 = ws('lootfrogLootW4', 'Lootfrog Loot Multi (W4)', 52, 'lootfrog_loot_multi', '+', (n) => n * 0.005)

export const workshopSources = {
  wsBombDmgW1,
  wsBOPoreMultiW1,
  wsPickaxeDmgW1,
  wsD20chargesW1,
  wsCherryBomb3xChanceW1,
  wsTransmuterBombBarIncreaseW1,
  wsBombDmgW2,
  wsTransmuterBombBOPmarkW2,
  wsBombDmgW3,
  wsVeinmorphMorphChanceW3,
  wsPickaxeDmgW3,
  wsFishingTicksW3,
  wsDronePowerW3,
  wsHamburgerBonusW3,
  wsBOPoreMultiW3,
  wsBoPgoldenChanceW3,
  wsPickaxeBombDmgW4,
  wsStarfruitAllStarMultiW4,
  wsBOPoreMultiW4,
  wsBombRechargeW4,
  wsLootfrogLootW4,
}

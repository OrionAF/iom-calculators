import type { Source } from '$lib/engine/types'

// ─── World 1 ──────────────────────────────────────────────────────────────────

/** W1: Basic & Chain Bomb Damage, additive +0.5 per level. Max 30. */
export const wsBombDmgW1: Source = {
  key: 'workshop.bombDmgW1', name: 'Workshop: Basic & Chain Damage (W1)', system: 'workshop',
  maxLevel: 30, fn: (n) => n * 0.5, inputs: [],
}

/** W1: Bomb of Plenti Ore Multi, additive +1x per level. Max 25. */
export const wsBOPoreMultiW1: Source = {
  key: 'workshop.BOPoreMultiW1', name: 'Workshop: Bomb of Plenty Ore Multi (W1)', system: 'workshop',
  maxLevel: 25, fn: (n) => n * 1.0, inputs: [],
}

/** W1: Pickaxe Damage +3% per level. Max 42. */
export const wsPickaxeDmgW1: Source = {
  key: 'workshop.pickaxeDmgW1', name: 'Workshop: Pickaxe Damage (W1)', system: 'workshop',
  maxLevel: 42, fn: (n) => n * 0.03, inputs: [],
}

/** W1: D20 Charges +1 per level.  Max 42 */
export const wsD20chargesW1: Source = {
  key: 'workshop.D20chargesW1', name: 'Workshop: D20 Charges (W1)', system: 'workshop',
  maxLevel: 42, fn: (n) => n * 1, inputs: [],
}

/** W1: Chance for 3x Cherry Bomb Charges +0.5% per level.  Max 32 */
export const wsCherryBomb3xChanceW1: Source = {
  key: 'workshop.CherryBomb3xChanceW1', name: 'Workshop: 3x Cherry Bomb Charges (W1)', system: 'workshop',
  maxLevel: 32, fn: (n) => n * 0.005, inputs: [],
}

/** W1: Transmuter Bomb bar increase +1 per level.  Max 27 */
export const wsTransmuterBombBarIncreaseW1: Source = {
  key: 'workshop.TransmuterBombBarIncreaseW1', name: 'Workshop: Transmuter Bomb Bar increase (W1)', system: 'workshop',
  maxLevel: 27, fn: (n) => n * 1, inputs: [],
}

// ─── World 2 ──────────────────────────────────────────────────────────────────

/** W2: Bomb Damage +35% per level. Max 42. */
export const wsBombDmgW2: Source = {
  key: 'workshop.bombDmgW2', name: 'Workshop: Bomb Damage (W2)', system: 'workshop',
  maxLevel: 42, fn: (n) => n * 0.35, inputs: [],
}

/** W2: Transmuter Bomb chance to apply BoP mark +25%. Max 1. */
export const wsTransmuterBombBOPmarkW2: Source = {
  key: 'workshop.TransmuterBombBOPmarkW2', name: 'Workshop: Transmuter Bomb BoP chance (W2)', system: 'workshop',
  maxLevel: 1, fn: (n) => n * 0.25, inputs: [],
}

// ─── World 3 ──────────────────────────────────────────────────────────────────

/** W3: Bomb Damage ×(1 + 0.15n). Max 42. Multiplicative. */
export const wsBombDmgW3: Source = {
  key: 'workshop.bombDmgW3', name: 'Workshop: Bomb Damage (W3)', system: 'workshop',
  maxLevel: 42, fn: (n) => 1 + n * 0.15, inputs: [],
}

/** W3: Veinmorpher bomb morph chance +0.1% per level. Max 47. */
export const wsVeinmorphMorphChanceW3: Source = {
  key: 'workshop.VeinmorphMorphChanceW3', name: 'Workshop: Veinmorpher Bomb Morph Chance (W3)', system: 'workshop',
  maxLevel: 47, fn: (n) => n * 0.001, inputs: [],
}

/** W3: Pickaxe Damage ×(1 + 0.08n). Max 47. Multiplicative. */
export const wsPickaxeDmgW3: Source = {
  key: 'workshop.pickaxeDmgW3', name: 'Workshop: Pickaxe Damage (W3)', system: 'workshop',
  maxLevel: 47, fn: (n) => 1 + n * 0.08, inputs: [],
}

/** W3: BoP has a chance to convert ores into golde +0.15% per level. Max 47. */
export const wsBoPgoldenChanceW3: Source = {
  key: 'workshop.BoPgoldenChanceW3', name: 'Workshop: BoP Golden Chance (W3)', system: 'workshop',
  maxLevel: 47, fn: (n) => n * 0.015, inputs: [],
}

/**
 * W3: Hamburger/Golden Hamburger extra factor +0.12 per level.
 * Stacks additively with the item base factor. Max 47.
 */
export const wsHamburgerBonusW3: Source = {
  key: 'workshop.hamburgerBonusW3', name: 'Workshop: Hamburger Bonus (W3)', system: 'workshop',
  maxLevel: 47, fn: (n) => n * 0.12, inputs: [],
}

/** W3: Bomb of Plenti Ore Multi, additive +0.50x per level. Max 47. */
export const wsBOPoreMultiW3: Source = {
  key: 'workshop.BOPoreMultiW3', name: 'Workshop: Bomb of Plenty Ore Multi (W3)', system: 'workshop',
  maxLevel: 47, fn: (n) => n * 0.50, inputs: [],
}

/** W3: Sushi item grants +1 extra fishing tick per Workshop level. Max 42. */
export const wsFishingTicksW3: Source = {
  key: 'workshop.fishingTicksW3', name: 'Workshop: Sushi Fishing Ticks (W3)', system: 'workshop',
  maxLevel: 42, fn: (n) => n, inputs: [],
}

/** W3: Fishing Drone Power ×(1 + 0.02n). Max 52. */
export const wsDronePowerW3: Source = {
  key: 'workshop.dronePowerW3', name: 'Workshop: Fishing Drone Power (W3)', system: 'workshop',
  maxLevel: 52, fn: (n) => 1 + n * 0.02, inputs: [],
}

// ─── World 4 ──────────────────────────────────────────────────────────────────

/** W4: Pickaxe & Bomb Damage ×(1 + 0.10n). Max 52. Multiplicative. */
export const wsPickaxeBombDmgW4: Source = {
  key: 'workshop.pickaxeBombDmgW4', name: 'Workshop: Pickaxe & Bomb Damage (W4)', system: 'workshop',
  maxLevel: 52, fn: (n) => 1 + n * 0.10, inputs: [],
}

/** W4: Starfruit increase all star multi. Max 52. Multiplicative. */
export const wsStarfruitAllStarMultiW4: Source = {
  key: 'workshop.StarfruitAllStarMultiW4', name: 'Workshop: Starfruit All Star Multi (W4)', system: 'workshop',
  maxLevel: 52, fn: (n) => n * 0.005, inputs: [],
}

/** W4: Bomb of Plenti Ore Multi, additive +1x per level. Max 52. */
export const wsBOPoreMultiW4: Source = {
  key: 'workshop.BOPoreMultiW4', name: 'Workshop: Bomb of Plenty Ore Multi (W4)', system: 'workshop',
  maxLevel: 52, fn: (n) => n * 1, inputs: [],
}

/** W4: Bomb Recharge Speed +0.25% per level. Max 52. Additive. */
export const wsBombRechargeW4: Source = {
  key: 'workshop.bombRechargeW4', name: 'Workshop: Bomb Recharge Speed (W4)', system: 'workshop',
  maxLevel: 52, fn: (n) => n * 0.0025, inputs: [],
}

/** W4: Lootfrog Loot Multi +0.5% per level. Max 52. Additive. */
export const wsLootfrogLootW4: Source = {
  key: 'workshop.lootfrogLootW4', name: 'Workshop: Lootfrog Loot Multi (W4)', system: 'workshop',
  maxLevel: 52, fn: (n) => n * 0.005, inputs: [],
}

export const workshopSources = {
  wsBombDmgW1, wsBOPoreMultiW1, wsPickaxeDmgW1,
  wsD20chargesW1, wsCherryBomb3xChanceW1, wsTransmuterBombBarIncreaseW1,
  wsBombDmgW2, wsTransmuterBombBOPmarkW2,
  wsBombDmgW3, wsVeinmorphMorphChanceW3, wsPickaxeDmgW3,
  wsFishingTicksW3, wsDronePowerW3, wsHamburgerBonusW3,
  wsBOPoreMultiW3, wsBoPgoldenChanceW3,
  wsPickaxeBombDmgW4, wsStarfruitAllStarMultiW4, wsBOPoreMultiW4,
  wsBombRechargeW4, wsLootfrogLootW4, 
}

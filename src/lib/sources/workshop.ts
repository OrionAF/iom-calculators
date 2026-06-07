import type { Source } from '$lib/engine/types'

// ─── World 1 ──────────────────────────────────────────────────────────────────

/** W1: Basic & Chain Bomb Damage, additive +0.5 per level. Max 8. */
export const wsBombDmgW1: Source = {
  key: 'workshop.bombDmgW1', name: 'Workshop: Bomb Damage (W1)', system: 'workshop',
  maxLevel: 8, fn: (n) => n * 0.5, inputs: [],
}

/** W1: Pickaxe Damage +3% per level. Max 20. */
export const wsPickaxeDmgW1: Source = {
  key: 'workshop.pickaxeDmgW1', name: 'Workshop: Pickaxe Damage (W1)', system: 'workshop',
  maxLevel: 20, fn: (n) => n * 0.03, inputs: [],
}

// ─── World 2 ──────────────────────────────────────────────────────────────────

/** W2: Bomb Damage +35% per level. Max 20. */
export const wsBombDmgW2: Source = {
  key: 'workshop.bombDmgW2', name: 'Workshop: Bomb Damage (W2)', system: 'workshop',
  maxLevel: 20, fn: (n) => n * 0.35, inputs: [],
}

// ─── World 3 ──────────────────────────────────────────────────────────────────

/** W3: Bomb Damage ×(1 + 0.15n). Max 20. Multiplicative. */
export const wsBombDmgW3: Source = {
  key: 'workshop.bombDmgW3', name: 'Workshop: Bomb Damage (W3)', system: 'workshop',
  maxLevel: 20, fn: (n) => 1 + n * 0.15, inputs: [],
}

/** W3: Pickaxe Damage ×(1 + 0.08n). Max 25. Multiplicative. */
export const wsPickaxeDmgW3: Source = {
  key: 'workshop.pickaxeDmgW3', name: 'Workshop: Pickaxe Damage (W3)', system: 'workshop',
  maxLevel: 25, fn: (n) => 1 + n * 0.08, inputs: [],
}

/** W3: Sushi item grants +1 extra fishing tick per Workshop level. Max 20. */
export const wsFishingTicksW3: Source = {
  key: 'workshop.fishingTicksW3', name: 'Workshop: Sushi Fishing Ticks (W3)', system: 'workshop',
  maxLevel: 20, fn: (n) => n, inputs: [],
}

/** W3: Fishing Drone Power ×(1 + 0.02n). Max 30. */
export const wsDronePowerW3: Source = {
  key: 'workshop.dronePowerW3', name: 'Workshop: Fishing Drone Power (W3)', system: 'workshop',
  maxLevel: 30, fn: (n) => 1 + n * 0.02, inputs: [],
}

/**
 * W3: Hamburger/Golden Hamburger extra factor +0.12 per level.
 * Stacks additively with the item base factor. Max 25.
 */
export const wsHamburgerBonusW3: Source = {
  key: 'workshop.hamburgerBonusW3', name: 'Workshop: Hamburger Bonus (W3)', system: 'workshop',
  maxLevel: 25, fn: (n) => n * 0.12, inputs: [],
}

// ─── World 4 ──────────────────────────────────────────────────────────────────

/** W4: Pickaxe & Bomb Damage ×(1 + 0.10n). Max 30. Multiplicative. */
export const wsPickaxeBombDmgW4: Source = {
  key: 'workshop.pickaxeBombDmgW4', name: 'Workshop: Pickaxe & Bomb Damage (W4)', system: 'workshop',
  maxLevel: 30, fn: (n) => 1 + n * 0.10, inputs: [],
}

/** W4: Bomb Recharge Speed +0.25% per level. Max 30. Additive. */
export const wsBombRechargeW4: Source = {
  key: 'workshop.bombRechargeW4', name: 'Workshop: Bomb Recharge Speed (W4)', system: 'workshop',
  maxLevel: 30, fn: (n) => n * 0.0025, inputs: [],
}

/** W4: Lootfrog Loot Multi +0.5% per level. Max 30. Additive. */
export const wsLootfrogLootW4: Source = {
  key: 'workshop.lootfrogLootW4', name: 'Workshop: Lootfrog Loot Multi (W4)', system: 'workshop',
  maxLevel: 30, fn: (n) => n * 0.005, inputs: [],
}

export const workshopSources = {
  wsBombDmgW1, wsBombDmgW2, wsBombDmgW3,
  wsPickaxeDmgW1, wsPickaxeDmgW3, wsPickaxeBombDmgW4,
  wsBombRechargeW4, wsFishingTicksW3, wsDronePowerW3,
  wsLootfrogLootW4, wsHamburgerBonusW3,
}

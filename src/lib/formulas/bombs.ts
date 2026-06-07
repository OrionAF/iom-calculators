import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const bombsFormulas = {
  bomb_damage:               { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_crit_chance:          { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_crit_damage:          { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Bomb Recharge Speed: base = 1 (divides recharge time), all sources multiply or add
  bomb_recharge_speed:       { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_free_chance:          { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_capacity:             { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Additional Bomb Multiplier: base = 0 (Mythic Relic + Workshop)
  bomb_additional_multiplier:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_super_crit_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_super_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_ultra_crit_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_ultra_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_omega_crit_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_omega_crit_damage:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Cherry Charge 3x Chance: Workshop only
  bomb_cherry3x_chance:      { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Battery Cap Increases: counter — Battery Bomb fires
  bomb_battery_cap_increases:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Bomb Cap Multiplier: base = 1 (Store, Cards, Pets, Construct, Skins)
  bomb_cap_multiplier:       { base: 1, contributions: [{ source: U, op: '×', unknown: true }] },
  // Workshop Upgrade Cap: base = 0 additive increase
  bomb_workshop_cap_increase:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Bomb of Plenty specific stats
  bomb_of_plenty_make_gold_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_of_plenty_multi:      { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_trans_apply_bop_chance:{ base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_transmuter_multi:     { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

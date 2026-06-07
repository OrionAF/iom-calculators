import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'prestige', fn: () => 0, inputs: [] }

export const obeliskFormulas = {
  obelisk_timer_add:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Obelisk Cooldown: base = 1 (multiplier on cooldown time)
  obelisk_cooldown_multi:    { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  obelisk_armor_reduction:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

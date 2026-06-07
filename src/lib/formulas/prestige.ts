import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'prestige', fn: () => 0, inputs: [] }

export const prestigeFormulas = {
  xp_level_cap:                  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Prestige Point Gain Multiplier: base = 1
  prestige_point_multi:          { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Experience Gain Multiplier: base = 1
  experience_multi:              { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  // Floor Clear Requirement: base = 1 (multiplier, starts at 1×)
  floor_clear_requirement_multi: { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  artifact_cap_increase:         { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  artifact_tier4_cap_increase:   { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

import { describe, expect, it } from 'vitest'
import {
  computeStat,
  getRequiredSources,
  getRequiredRuntimeInputs,
  hasUnknownContributions,
  computeAll,
  getRequiredSourcesForMap,
  getRequiredRuntimeInputsForMap,
} from './compute'
import type { Source, StatFormula, FormulaMap } from './types'

// ─── Inline fixtures ──────────────────────────────────────────────────────────
// Tests use inline source/formula objects so the engine is tested in isolation
// from any domain source or formula files.

const srcA: Source = {
  key: 'test.srcA',
  name: 'Source A',
  system: 'fishing',
  maxLevel: 20,
  fn: (level) => level * 0.01,
  inputs: [],
}

const srcB: Source = {
  key: 'test.srcB',
  name: 'Source B',
  system: 'skillTree',
  maxLevel: 3,
  fn: (level, rt) => level * (rt['fish'] ?? 0) * 0.01,
  inputs: [{ key: 'fish', label: 'Fish Found', type: 'integer', min: 0 }],
}

const srcC: Source = {
  key: 'test.srcC',
  name: 'Source C',
  system: 'items',
  maxLevel: 1,
  type: 'buff',
  fn: (active) => (active ? 1.5 : 1),
  inputs: [],
}

const srcD: Source = {
  key: 'test.srcD',
  name: 'Source D',
  system: 'store',
  fn: (level) => level * 2,
  inputs: [],
}

// Additive formula: base=0, srcA(+) + srcB(+)
const additiveFormula: StatFormula = {
  base: 0,
  contributions: [
    { source: srcA, op: '+' },
    { source: srcB, op: '+' },
  ],
}

// Multiplicative formula: base=1, srcC(×) then srcD(×)
const multiplicativeFormula: StatFormula = {
  base: 1,
  contributions: [
    { source: srcC, op: '×' },
    { source: srcD, op: '×' },
  ],
}

// Setter formula: base=5, srcA sets result
const setterFormula: StatFormula = {
  base: 5,
  contributions: [{ source: srcA, op: '=' }],
}

// Mixed: base=0, srcA(+), srcC(×)
const mixedFormula: StatFormula = {
  base: 0,
  contributions: [
    { source: srcA, op: '+' },
    { source: srcC, op: '×' },
  ],
}

// Formula with an unknown contribution
const unknownFormula: StatFormula = {
  base: 0,
  contributions: [
    { source: srcA, op: '+' },
    { source: srcB, op: '+', unknown: true },
  ],
}

// ─── computeStat ─────────────────────────────────────────────────────────────

describe('computeStat', () => {
  it('returns base when all levels are zero and no runtime inputs', () => {
    expect(computeStat(additiveFormula, {}, {})).toBe(0)
  })

  it('additive: sums contributions from levels', () => {
    const levels = { 'test.srcA': 5 }
    expect(computeStat(additiveFormula, levels, {})).toBeCloseTo(0.05)
  })

  it('additive: dynamic source uses runtime input', () => {
    const levels = { 'test.srcB': 1 }
    const rt = { fish: 10 }
    expect(computeStat(additiveFormula, levels, rt)).toBeCloseTo(0.1)
  })

  it('additive: both sources combined', () => {
    const levels = { 'test.srcA': 5, 'test.srcB': 1 }
    const rt = { fish: 10 }
    expect(computeStat(additiveFormula, levels, rt)).toBeCloseTo(0.15)
  })

  it('multiplicative: applies factors in order', () => {
    // base=1, srcC active (×1.5), srcD level=2 (×4) → 1 × 1.5 × 4 = 6
    const levels = { 'test.srcC': 1, 'test.srcD': 2 }
    expect(computeStat(multiplicativeFormula, levels, {})).toBeCloseTo(6)
  })

  it('multiplicative: inactive buff (level=0) contributes ×1', () => {
    // srcC inactive → fn(0) = 1; srcD level=2 → fn(2) = 4
    const levels = { 'test.srcC': 0, 'test.srcD': 2 }
    expect(computeStat(multiplicativeFormula, levels, {})).toBeCloseTo(4)
  })

  it('setter: overrides result regardless of base', () => {
    // base=5, srcA level=3 sets result to 0.03
    const levels = { 'test.srcA': 3 }
    expect(computeStat(setterFormula, levels, {})).toBeCloseTo(0.03)
  })

  it('mixed: (base + adds) × factors', () => {
    // base=0, srcA level=10 → sum=0.10, srcC active ×1.5 → 0.15
    const levels = { 'test.srcA': 10, 'test.srcC': 1 }
    expect(computeStat(mixedFormula, levels, {})).toBeCloseTo(0.15)
  })

  it('grouped: declaration order does not change the result', () => {
    // Same contributions as mixedFormula but '×' declared before '+'.
    const reordered: StatFormula = {
      base: 0,
      contributions: [
        { source: srcC, op: '×' },
        { source: srcA, op: '+' },
      ],
    }
    const levels = { 'test.srcA': 10, 'test.srcC': 1 }
    expect(computeStat(reordered, levels, {})).toBeCloseTo(computeStat(mixedFormula, levels, {}))
  })

  it("'×1+': multiplies by (1 + bonus fraction)", () => {
    // base=4, srcA(+) level=10 → +0.10, srcD('×1+') level=11 with fn l*2 → ×(1+22)
    // Mirrors the in-game pattern: pets +2%/rank stored as decimal → ×(1+0.22).
    const bonusFormula: StatFormula = {
      base: 4,
      contributions: [
        { source: srcA, op: '+' },
        { source: srcD, op: '×1+' },
      ],
    }
    const levels = { 'test.srcA': 10, 'test.srcD': 11 }
    expect(computeStat(bonusFormula, levels, {})).toBeCloseTo((4 + 0.1) * (1 + 22))
  })

  it("'×1+' at level 0 is neutral (×1)", () => {
    const f: StatFormula = { base: 2, contributions: [{ source: srcD, op: '×1+' }] }
    expect(computeStat(f, {}, {})).toBeCloseTo(2)
  })

  it("'=' replaces the base before adds and factors", () => {
    // base=5 replaced by srcA → 0.03, then +srcB(0.10), then ×srcC(1.5)
    const f: StatFormula = {
      base: 5,
      contributions: [
        { source: srcA, op: '=' },
        { source: srcB, op: '+' },
        { source: srcC, op: '×' },
      ],
    }
    const levels = { 'test.srcA': 3, 'test.srcB': 1, 'test.srcC': 1 }
    expect(computeStat(f, levels, { fish: 10 })).toBeCloseTo((0.03 + 0.1) * 1.5)
  })

  it('unknown contributions are skipped', () => {
    // srcB is unknown — only srcA contributes
    const levels = { 'test.srcA': 5, 'test.srcB': 3 }
    const rt = { fish: 100 }
    expect(computeStat(unknownFormula, levels, rt)).toBeCloseTo(0.05)
  })

  it('missing level defaults to 0', () => {
    expect(computeStat(additiveFormula, {}, {})).toBe(0)
  })
})

// ─── getRequiredSources ───────────────────────────────────────────────────────

describe('getRequiredSources', () => {
  it('returns sources for known contributions only', () => {
    const sources = getRequiredSources(unknownFormula)
    expect(sources.map((s) => s.key)).toEqual(['test.srcA'])
  })

  it('deduplicates when a source appears multiple times', () => {
    const formula: StatFormula = {
      base: 0,
      contributions: [
        { source: srcA, op: '+' },
        { source: srcA, op: '+' },
      ],
    }
    expect(getRequiredSources(formula)).toHaveLength(1)
  })

  it('preserves declaration order', () => {
    const sources = getRequiredSources(additiveFormula)
    expect(sources.map((s) => s.key)).toEqual(['test.srcA', 'test.srcB'])
  })
})

// ─── getRequiredRuntimeInputs ─────────────────────────────────────────────────

describe('getRequiredRuntimeInputs', () => {
  it('returns empty array when no sources have runtime inputs', () => {
    expect(getRequiredRuntimeInputs(setterFormula)).toHaveLength(0)
  })

  it('returns inputs from sources that declare them', () => {
    const inputs = getRequiredRuntimeInputs(additiveFormula)
    expect(inputs.map((i) => i.key)).toContain('fish')
  })

  it('deduplicates when multiple sources share the same input key', () => {
    const srcE: Source = {
      key: 'test.srcE',
      name: 'Source E',
      system: 'fishing',
      fn: (l, rt) => l * rt['fish'],
      inputs: [{ key: 'fish', label: 'Fish Found', type: 'integer' }],
    }
    const formula: StatFormula = {
      base: 0,
      contributions: [
        { source: srcB, op: '+' },
        { source: srcE, op: '+' },
      ],
    }
    const inputs = getRequiredRuntimeInputs(formula)
    expect(inputs.filter((i) => i.key === 'fish')).toHaveLength(1)
  })

  it('excludes inputs from unknown contributions', () => {
    const inputs = getRequiredRuntimeInputs(unknownFormula)
    expect(inputs.map((i) => i.key)).not.toContain('fish')
  })
})

// ─── hasUnknownContributions ──────────────────────────────────────────────────

describe('hasUnknownContributions', () => {
  it('returns false when all contributions are known', () => {
    expect(hasUnknownContributions(additiveFormula)).toBe(false)
  })

  it('returns true when any contribution is unknown', () => {
    expect(hasUnknownContributions(unknownFormula)).toBe(true)
  })
})

// ─── computeAll ───────────────────────────────────────────────────────────────

describe('computeAll', () => {
  const formulas: FormulaMap = {
    stat_a: additiveFormula,
    stat_b: setterFormula,
  }

  it('returns a result for every key in the FormulaMap', () => {
    const results = computeAll(formulas, {}, {})
    expect(Object.keys(results)).toEqual(expect.arrayContaining(['stat_a', 'stat_b']))
  })

  it('computes each stat independently', () => {
    const levels = { 'test.srcA': 5 }
    const results = computeAll(formulas, levels, {})
    expect(results['stat_a']).toBeCloseTo(0.05) // additive: 5 × 0.01
    expect(results['stat_b']).toBeCloseTo(0.05) // setter: base=5 overridden to 0.05
  })
})

// ─── getRequiredSourcesForMap ─────────────────────────────────────────────────

describe('getRequiredSourcesForMap', () => {
  const formulas: FormulaMap = {
    stat_a: additiveFormula, // srcA, srcB
    stat_b: multiplicativeFormula, // srcC, srcD
  }

  it('collects sources from all formulas in the map', () => {
    const keys = getRequiredSourcesForMap(formulas).map((s) => s.key)
    expect(keys).toContain('test.srcA')
    expect(keys).toContain('test.srcB')
    expect(keys).toContain('test.srcC')
    expect(keys).toContain('test.srcD')
  })

  it('deduplicates sources that appear in multiple formulas', () => {
    const formulas2: FormulaMap = {
      stat_x: additiveFormula, // srcA, srcB
      stat_y: unknownFormula, // srcA (known), srcB (unknown → excluded)
    }
    const sources = getRequiredSourcesForMap(formulas2)
    expect(sources.filter((s) => s.key === 'test.srcA')).toHaveLength(1)
  })
})

// ─── getRequiredRuntimeInputsForMap ───────────────────────────────────────────

describe('getRequiredRuntimeInputsForMap', () => {
  it('collects runtime inputs across all formulas, deduplicated', () => {
    const formulas: FormulaMap = {
      stat_a: additiveFormula, // 'fish' via srcB
      stat_b: multiplicativeFormula, // no runtime inputs
    }
    const inputs = getRequiredRuntimeInputsForMap(formulas)
    expect(inputs.map((i) => i.key)).toContain('fish')
    expect(inputs.filter((i) => i.key === 'fish')).toHaveLength(1)
  })

  it('returns empty array when no formulas need runtime inputs', () => {
    const formulas: FormulaMap = {
      stat_a: setterFormula,
      stat_b: multiplicativeFormula,
    }
    expect(getRequiredRuntimeInputsForMap(formulas)).toHaveLength(0)
  })
})

// ─── Group terms ──────────────────────────────────────────────────────────────

describe('computeStat — group terms', () => {
  // Bonus group acting as a multiplier — wiki: (Rock Cake + Primal Meat) × Hamburger
  it('base-1 group: (1 + Σ bonuses) × factor, joined ×', () => {
    const f: StatFormula = {
      base: 100,
      contributions: [
        {
          label: 'Items',
          base: 1,
          op: '×',
          contributions: [
            { source: srcA, op: '+' }, // 0.01/level
            { source: srcC, op: '×' }, // buff factor 1.5
          ],
        },
      ],
    }
    // group = (1 + 0.05) × 1.5 = 1.575 → 100 × 1.575
    const levels = { 'test.srcA': 5, 'test.srcC': 1 }
    expect(computeStat(f, levels, {})).toBeCloseTo(100 * 1.05 * 1.5)
  })

  // Flat sum scaled by a factor, joined + — wiki: (Gem Upgrade + bundles) × Chief Exec
  it('base-0 group: (Σ amounts) × factor, joined +', () => {
    const f: StatFormula = {
      base: 2,
      contributions: [
        {
          label: 'Store',
          base: 0,
          op: '+',
          contributions: [
            { source: srcD, op: '+' }, // level×2
            { source: srcC, op: '×' }, // ×1.5 when active
          ],
        },
      ],
    }
    // group = (0 + 6) × 1.5 = 9 → 2 + 9 = 11
    const levels = { 'test.srcD': 3, 'test.srcC': 1 }
    expect(computeStat(f, levels, {})).toBeCloseTo(11)
  })

  it('group at all-zero levels is neutral for its join op', () => {
    const mulGroup: StatFormula = {
      base: 7,
      contributions: [
        { base: 1, op: '×', contributions: [{ source: srcA, op: '+' }] },
      ],
    }
    const addGroup: StatFormula = {
      base: 7,
      contributions: [
        { base: 0, op: '+', contributions: [{ source: srcA, op: '+' }] },
      ],
    }
    expect(computeStat(mulGroup, {}, {})).toBeCloseTo(7) // ×(1+0)
    expect(computeStat(addGroup, {}, {})).toBeCloseTo(7) // +0
  })

  it('unknown contributions inside groups are skipped', () => {
    const f: StatFormula = {
      base: 0,
      contributions: [
        {
          base: 1,
          op: '×',
          contributions: [
            { source: srcA, op: '+' },
            { source: srcB, op: '+', unknown: true },
          ],
        },
        { source: srcD, op: '+' },
      ],
    }
    const levels = { 'test.srcA': 5, 'test.srcD': 1 }
    expect(computeStat(f, levels, { fish: 100 })).toBeCloseTo((0 + 2) * 1.05)
  })

  it('flatten helpers see group members', () => {
    const f: StatFormula = {
      base: 0,
      contributions: [
        { base: 1, op: '×', contributions: [{ source: srcB, op: '+', unknown: true }] },
        { source: srcA, op: '+' },
      ],
    }
    expect(hasUnknownContributions(f)).toBe(true)
    expect(getRequiredSources(f).map((s) => s.key)).toEqual(['test.srcA'])
  })
})

import { describe, expect, it } from 'vitest'
import {
  formatStat,
  formatGold,
  formatPercent,
  formatMultiplier,
  parseStat,
} from './format'

describe('formatStat — standard mode (default)', () => {
  it('returns "0" for zero', () => {
    expect(formatStat(0)).toBe('0')
  })

  it('returns sub-1000 numbers bare', () => {
    expect(formatStat(431)).toBe('431')
    expect(formatStat(12.5)).toBe('12.5')
  })

  it('rounds kilos to 3 sig figs', () => {
    expect(formatStat(1234)).toBe('1.23k')
    expect(formatStat(431777)).toBe('432k')
  })

  it('formats megas with 3 sig figs', () => {
    expect(formatStat(5_090_000)).toBe('5.09m')
  })

  it('uses deep suffix table (no, udc) for very large numbers', () => {
    expect(formatStat(1.016e30)).toBe('1.02no')
    expect(formatStat(1.016e37)).toBe('10.2udc')
  })

  it('handles 100-magnitude coefficients with no decimal', () => {
    expect(formatStat(1.23e8)).toBe('123m')
  })

  it('falls back to bare scientific above the suffix-table cap', () => {
    expect(formatStat(1.5e65)).toBe('1.50e65')
  })

  it('handles negative numbers', () => {
    expect(formatStat(-1500)).toBe('-1.50k')
    expect(formatStat(-431)).toBe('-431')
  })
})

describe('formatStat — scientific mode', () => {
  it('returns "0" for zero', () => {
    expect(formatStat(0, 'scientific')).toBe('0')
  })

  it('returns sub-1000 numbers bare', () => {
    expect(formatStat(431, 'scientific')).toBe('431')
  })

  it('formats with bare exponent (no plus sign)', () => {
    expect(formatStat(1234, 'scientific')).toBe('1.23e3')
    expect(formatStat(1.23e8, 'scientific')).toBe('1.23e8')
    expect(formatStat(1.016e37, 'scientific')).toBe('1.02e37')
  })

  it('handles negative numbers', () => {
    expect(formatStat(-1500, 'scientific')).toBe('-1.50e3')
  })
})

describe('formatStat — engineering mode', () => {
  it('returns "0" for zero', () => {
    expect(formatStat(0, 'engineering')).toBe('0')
  })

  it('returns sub-1000 numbers bare', () => {
    expect(formatStat(431, 'engineering')).toBe('431')
  })

  it('uses exponents that are multiples of 3', () => {
    expect(formatStat(1234, 'engineering')).toBe('1.23e3')
    expect(formatStat(5_090_000, 'engineering')).toBe('5.09e6')
  })

  it('diverges from scientific by snapping to 10^3n', () => {
    expect(formatStat(431777, 'engineering')).toBe('432e3')
    expect(formatStat(1.23e8, 'engineering')).toBe('123e6')
    expect(formatStat(1.016e37, 'engineering')).toBe('10.2e36')
  })

  it('handles negative numbers', () => {
    expect(formatStat(-1500, 'engineering')).toBe('-1.50e3')
  })
})

describe('formatGold', () => {
  it('uses standard notation by default (alias of formatStat)', () => {
    expect(formatGold(2_450_000)).toBe('2.45m')
  })
})

describe('formatPercent', () => {
  it('formats with two decimal places and % sign', () => {
    expect(formatPercent(200.88)).toBe('200.88%')
  })

  it('formats zero', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })
})

describe('formatMultiplier', () => {
  it('formats with two decimal places and × sign', () => {
    expect(formatMultiplier(200.88)).toBe('200.88×')
  })
})

describe('parseStat — accepted inputs', () => {
  it('parses suffix forms case-insensitively', () => {
    expect(parseStat('2.34no')).toBeCloseTo(2.34e30, 25)
    expect(parseStat('2.34 NO')).toBeCloseTo(2.34e30, 25)
    expect(parseStat('2.34udc')).toBeCloseTo(2.34e36, 31)
    expect(parseStat('123m')).toBeCloseTo(1.23e8, -6)
  })

  it('parses scientific forms with or without plus sign', () => {
    expect(parseStat('1.5e30')).toBeCloseTo(1.5e30, 25)
    expect(parseStat('1.5e+30')).toBeCloseTo(1.5e30, 25)
    expect(parseStat('1.5e-3')).toBeCloseTo(0.0015, 6)
  })

  it('handles signed values and common separator quirks', () => {
    expect(parseStat('-1.5k')).toBe(-1500)
    expect(parseStat('1,234.56')).toBeCloseTo(1234.56, 2)
    expect(parseStat('.5k')).toBe(500)
    expect(parseStat('5.')).toBe(5)
    expect(parseStat('0')).toBe(0)
  })
})

describe('parseStat — rejected inputs', () => {
  it('returns null for empty or whitespace input', () => {
    expect(parseStat('')).toBeNull()
    expect(parseStat('   ')).toBeNull()
  })

  it('returns null for non-numeric input', () => {
    expect(parseStat('abc')).toBeNull()
  })

  it('returns null for unknown suffixes', () => {
    expect(parseStat('2.34xyz')).toBeNull()
  })

  it('returns null for non-finite values', () => {
    expect(parseStat('NaN')).toBeNull()
    expect(parseStat('Infinity')).toBeNull()
    expect(parseStat('-Infinity')).toBeNull()
  })

  it('disallows combination of explicit exponent and suffix', () => {
    expect(parseStat('1.5e+3k')).toBeNull()
  })
})

describe('parseStat ∘ formatStat round-trip', () => {
  it('round-trips within 3-sig-fig precision', () => {
    const samples = [1, 12.5, 1234, 5_090_000, 1.23e8, 1.016e37, -1500]
    for (const n of samples) {
      const formatted = formatStat(n, 'standard')
      const parsed = parseStat(formatted)
      expect(parsed).not.toBeNull()
      // Allow ≤1% relative error (formatter emits 3 sig figs).
      const relErr = Math.abs((parsed! - n) / (n === 0 ? 1 : n))
      expect(relErr).toBeLessThanOrEqual(0.01)
    }
  })
})

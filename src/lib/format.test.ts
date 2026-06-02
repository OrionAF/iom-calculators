import { describe, expect, it } from 'vitest'
import { formatStat, formatGold, formatPercent, formatMultiplier } from './format'

describe('formatStat', () => {
  it('returns "0" for zero', () => {
    expect(formatStat(0)).toBe('0')
  })
  it('formats small numbers without suffix', () => {
    expect(formatStat(431)).toBe('431')
  })
  it('formats thousands with K suffix', () => {
    expect(formatStat(431777)).toBe('431.78K')
  })
  it('formats millions with M suffix', () => {
    expect(formatStat(5_090_000)).toBe('5.09M')
  })
  it('formats trillions with T suffix', () => {
    expect(formatStat(1.016e12)).toBe('1.02T')
  })
  it('falls back to exponential for astronomically large numbers', () => {
    const result = formatStat(1.016e37)
    expect(result).toMatch(/e\+/)
  })
  it('handles negative numbers', () => {
    expect(formatStat(-1000)).toBe('-1.00K')
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

describe('formatGold', () => {
  it('uses same suffix notation as formatStat', () => {
    expect(formatGold(2_450_000)).toBe('2.45M')
  })
})

import { describe, expect, it } from 'vitest'
import {
  formatStat,
  formatStatByKey,
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
    expect(formatStat(12.5)).toBe('12.50')
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
    expect(formatStat(1.016e37)).toBe('10.16udc')
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
    expect(formatStat(1.016e37, 'engineering')).toBe('10.16e36')
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
    // Relative comparison: 2.34 * 10^36 accumulates float error beyond
    // what toBeCloseTo's digit-based check tolerates at this magnitude.
    expect(parseStat('2.34udc')! / 2.34e36).toBeCloseTo(1, 12)
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

describe('formatStatByKey — affix rules in notation mode', () => {
  it('suffixes _chance keys with %', () => {
    expect(formatStatByKey('bomb_crit_chance', 97.2, 'standard')).toBe('97.20%')
    expect(formatStatByKey('star_radiant_chance', 1234, 'standard')).toBe('1.23k%')
  })

  it('suffixes _multi keys with ×', () => {
    expect(formatStatByKey('prestige_point_multi', 1.45, 'standard')).toBe('1.45×')
    expect(formatStatByKey('fishing_income_multi', 200.88, 'standard')).toBe('201×')
  })

  it('suffixes _multiplier keys with ×', () => {
    expect(formatStatByKey('bomb_cap_multiplier', 5, 'standard')).toBe('5×')
    expect(formatStatByKey('fishing_drone_multiplier', 12.5, 'standard')).toBe('12.50×')
  })

  it('suffixes _reduction keys with ×', () => {
    expect(formatStatByKey('bar_craft_cost_multi', 0.5, 'standard')).toBe('0.50×')
  })

  it('uses exact-key override for contract_cost_reduction (suffix %)', () => {
    // contract_cost_reduction has an exact-key override of { suffix: '%' }
    // that takes precedence over the _reduction suffix rule (×).
    expect(formatStatByKey('contract_cost_reduction', 0.85, 'standard')).toBe('0.85%')
  })

  it('suffixes _crit_damage keys with ×', () => {
    expect(formatStatByKey('bomb_crit_damage', 4.2, 'standard')).toBe('4.20×')
    expect(formatStatByKey('pickaxe_super_crit_damage', 12, 'standard')).toBe('12×')
  })

  it('suffixes _percent keys with %', () => {
    expect(formatStatByKey('drone_damage_percent', 3.5, 'standard')).toBe('3.50%')
  })

  it('renders _count keys bare (no affix rule)', () => {
    expect(formatStatByKey('drone_count', 12, 'standard')).toBe('12')
  })

  it('prefixes _cap keys with + by default, but exact-key overrides win', () => {
    // drone_suit_cap and freebie_bank_cap both have exact-key overrides of { prefix: '' }
    // which override the _cap suffix rule.
    expect(formatStatByKey('drone_suit_cap', 5, 'standard')).toBe('5')
    expect(formatStatByKey('freebie_bank_cap', 100, 'standard')).toBe('100')
  })

  it('prefixes _bonus keys with +', () => {
    expect(formatStatByKey('chest_items_bonus', 7, 'standard')).toBe('+7')
  })

  it('prefixes _increase keys with +', () => {
    expect(formatStatByKey('artifact_cap_increase', 7, 'standard')).toBe('+7')
    expect(formatStatByKey('contract_cap_increase', 3, 'standard')).toBe('+3')
  })

  it('prefixes _increases by default, but exact-key overrides win', () => {
    // bomb_battery_cap_increases has an exact-key override of { prefix: '' }.
    expect(formatStatByKey('bomb_battery_cap_increases', 4, 'standard')).toBe('4')
  })

  it('prefixes _capacity by default, but exact-key overrides win', () => {
    // bomb_capacity and fishing_drone_capacity have exact-key overrides of { prefix: '' }.
    expect(formatStatByKey('bomb_capacity', 2000, 'standard')).toBe('2.00k')
    expect(formatStatByKey('fishing_drone_capacity', 50, 'standard')).toBe('50')
  })

  it('applies exact-key override: obelisk_timer_add gets × suffix', () => {
    expect(formatStatByKey('obelisk_timer_add', 1.5, 'standard')).toBe('1.50×')
  })

  it('applies exact-key override: lootbug_gem_cost_reduction gets + prefix (overrides _reduction ×)', () => {
    expect(formatStatByKey('lootbug_gem_cost_reduction', 0.25, 'standard')).toBe('+0.25')
  })

  it('falls back to bare formatStat for unmatched keys', () => {
    expect(formatStatByKey('fishing_rod_power', 431777.56, 'standard')).toBe('432k')
    expect(formatStatByKey('pickaxe_damage', 1000, 'standard')).toBe('1.00k')
  })

  it('returns "—" for undefined values regardless of key', () => {
    expect(formatStatByKey('drone_count', undefined, 'standard')).toBe('—')
    expect(formatStatByKey('bomb_crit_chance', undefined, 'standard')).toBe('—')
  })

  it('respects notation parameter for the numeric portion', () => {
    expect(formatStatByKey('drone_count', 1234, 'scientific')).toBe('1.23e3')
    expect(formatStatByKey('bomb_crit_chance', 1234, 'engineering')).toBe('1.23e3%')
    expect(formatStatByKey('prestige_point_multi', 1.23e8, 'engineering')).toBe('123e6×')
  })
})

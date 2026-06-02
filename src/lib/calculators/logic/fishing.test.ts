import { describe, expect, it } from 'vitest'
import { fishingIncome } from './fishing'

describe('fishingIncome', () => {
  it('returns 0 when rod power is 0', () => {
    const result = fishingIncome(
      { fishing_rod_power: 0, fishing_income_multi: 100 },
      {}
    )
    expect(result.incomePerHour).toBe(0)
  })

  it('multiplies rod power by income multiplier', () => {
    const result = fishingIncome(
      { fishing_rod_power: 431777.56, fishing_income_multi: 200.88 },
      {}
    )
    // 431777.56 * 200.88 ≈ 86,735,476.25
    expect(result.incomePerHour).toBeCloseTo(86_735_476.25, -2)
  })

  it('defaults missing stats to 0', () => {
    const result = fishingIncome({}, {})
    expect(result.incomePerHour).toBe(0)
  })
})

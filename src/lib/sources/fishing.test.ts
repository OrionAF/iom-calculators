import { describe, expect, it } from 'vitest'
import { fishingSources } from './fishing'

describe('fishingSources — Tier 1 Upgrades', () => {
  it('rodBase: ×1.16 compounding — level 0 = 1, level 1 = 1.16, level 2 ≈ 1.346', () => {
    expect(fishingSources.rodBase.fn(0, {})).toBeCloseTo(1)
    expect(fishingSources.rodBase.fn(1, {})).toBeCloseTo(1.16)
    expect(fishingSources.rodBase.fn(2, {})).toBeCloseTo(1.3456)
  })

  it('droneCapT1: +1 per level', () => {
    expect(fishingSources.droneCapT1.fn(0, {})).toBe(0)
    expect(fishingSources.droneCapT1.fn(5, {})).toBe(5)
  })

  it('tickSpeedT1: +0.5s per level', () => {
    expect(fishingSources.tickSpeedT1.fn(10, {})).toBeCloseTo(5)
  })

  it('fishMultiT1: +0.03 per level', () => {
    expect(fishingSources.fishMultiT1.fn(10, {})).toBeCloseTo(0.3)
  })

  it('rodMultiT1: factor = 1 + level × 0.04', () => {
    expect(fishingSources.rodMultiT1.fn(0, {})).toBeCloseTo(1)
    expect(fishingSources.rodMultiT1.fn(10, {})).toBeCloseTo(1.4)
  })

  it('droneMultiT1: +0.06 per level', () => {
    expect(fishingSources.droneMultiT1.fn(20, {})).toBeCloseTo(1.2)
  })

  it('doubleTickT1: +0.005 per level', () => {
    expect(fishingSources.doubleTickT1.fn(30, {})).toBeCloseTo(0.15)
  })

  it('droneCapT1B: +2 per level', () => {
    expect(fishingSources.droneCapT1B.fn(15, {})).toBe(30)
  })

  it('shinyChanceT1: +0.005 per level', () => {
    expect(fishingSources.shinyChanceT1.fn(25, {})).toBeCloseTo(0.125)
  })

  it('droneBaseT1: +0.25 per level', () => {
    expect(fishingSources.droneBaseT1.fn(10, {})).toBeCloseTo(2.5)
  })

  it('tripleTickT1: +0.0035 per level', () => {
    expect(fishingSources.tripleTickT1.fn(25, {})).toBeCloseTo(0.0875)
  })
})

describe('fishingSources — Tier 2 Upgrades', () => {
  it('shinyMultiT2: +0.05 per level', () => {
    expect(fishingSources.shinyMultiT2.fn(20, {})).toBeCloseTo(1.0)
  })

  it('tier2DockT2: +0.05 per level', () => {
    expect(fishingSources.tier2DockT2.fn(10, {})).toBeCloseTo(0.5)
  })

  it('superShinyChanceT2: +0.01 per level', () => {
    expect(fishingSources.superShinyChanceT2.fn(20, {})).toBeCloseTo(0.2)
  })

  it('droneCloner: ×1.05 compounding — level 0 = 1, level 1 = 1.05, level 2 ≈ 1.1025', () => {
    expect(fishingSources.droneCloner.fn(0, {})).toBeCloseTo(1)
    expect(fishingSources.droneCloner.fn(1, {})).toBeCloseTo(1.05)
    expect(fishingSources.droneCloner.fn(2, {})).toBeCloseTo(1.1025)
  })
})

describe('fishingSources — Tier 1 Enhancements', () => {
  it('fishMultiE1: +0.05 per level', () => {
    expect(fishingSources.fishMultiE1.fn(10, {})).toBeCloseTo(0.5)
  })

  it('droneCapE1: +1 per level', () => {
    expect(fishingSources.droneCapE1.fn(25, {})).toBe(25)
  })

  it('rodMultiE1: factor = 1 + level × 0.05', () => {
    expect(fishingSources.rodMultiE1.fn(0, {})).toBeCloseTo(1)
    expect(fishingSources.rodMultiE1.fn(10, {})).toBeCloseTo(1.5)
  })

  it('tickSpeedE1: +0.5s per level', () => {
    expect(fishingSources.tickSpeedE1.fn(20, {})).toBeCloseTo(10)
  })

  it('droneMultiE1: +0.08 per level', () => {
    expect(fishingSources.droneMultiE1.fn(25, {})).toBeCloseTo(2.0)
  })

  it('tokenMultiE1: +0.05 per level', () => {
    expect(fishingSources.tokenMultiE1.fn(20, {})).toBeCloseTo(1.0)
  })

  it('doubleTickE1: +0.005 per level', () => {
    expect(fishingSources.doubleTickE1.fn(20, {})).toBeCloseTo(0.1)
  })

  it('tinyNoticeE1: +0.005 per level', () => {
    expect(fishingSources.tinyNoticeE1.fn(20, {})).toBeCloseTo(0.1)
  })

  it('shinyMultiE1: +0.05 per level', () => {
    expect(fishingSources.shinyMultiE1.fn(20, {})).toBeCloseTo(1.0)
  })

  it('droneCapE1C: +3 per level', () => {
    expect(fishingSources.droneCapE1C.fn(20, {})).toBe(60)
  })
})

describe('fishingSources — Tier 2 Enhancements', () => {
  it('tripleTickE2: +0.004 per level', () => {
    expect(fishingSources.tripleTickE2.fn(20, {})).toBeCloseTo(0.08)
  })

  it('superShinyMultiE2: +0.15 per level', () => {
    expect(fishingSources.superShinyMultiE2.fn(20, {})).toBeCloseTo(3.0)
  })

  it('tier2DockE2: +0.05 per level', () => {
    expect(fishingSources.tier2DockE2.fn(20, {})).toBeCloseTo(1.0)
  })
})

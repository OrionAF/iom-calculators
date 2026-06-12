import { describe, expect, it } from 'vitest'
import { combinedCardMultiplier } from './cardMath'
import { computeStat } from '$lib/engine/compute'
import { ALL_FORMULAS } from './index'
import { cardSources as card } from '$lib/sources/cards'

describe('combinedCardMultiplier', () => {
  it('matches the wiki example: poly 15.54×, infernal 8.92× → 130.70×', () => {
    expect(combinedCardMultiplier(15.54, 8.92)).toBeCloseTo(130.7, 2)
  })
  it('is neutral with no infernals (bonus 1): total = poly', () => {
    expect(combinedCardMultiplier(4, 1)).toBeCloseTo(4)
  })
})

describe('infernal card bonus stats', () => {
  it('infernal_card_bonus_ore = 1 + 0.12×set + 0.02×total', () => {
    const v = computeStat(
      ALL_FORMULAS['infernal_card_bonus_ore'],
      {},
      { infernalOreCards: 33, totalInfernalCards: 198 },
    )
    expect(v).toBeCloseTo(1 + 0.12 * 33 + 0.02 * 198) // 8.92 — the wiki example
  })
  it('poly ore bonus starts at base 4', () => {
    expect(computeStat(ALL_FORMULAS['polychrome_card_bonus_ore'], {}, {})).toBeCloseTo(4)
  })
})

describe('card rarity tracks', () => {
  it('primary track clamps at Polychrome when Infernal (level 4)', () => {
    expect(card.cardPetDino.fn(3, {})).toBeCloseTo(4)
    expect(card.cardPetDino.fn(4, {})).toBeCloseTo(4)
  })
  it('infernal secondary effects activate only at level 4', () => {
    expect(card.cardPetDwarfInf.fn(3, {})).toBe(0)
    expect(card.cardPetDwarfInf.fn(4, {})).toBeCloseTo(0.25)
  })
  it('multiplier tracks are neutral when unowned', () => {
    expect(card.cardNovagiant.fn(0, {})).toBe(1)
    expect(card.cardPetRabbit.fn(0, {})).toBe(1)
  })
})

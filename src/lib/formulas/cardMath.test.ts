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

describe('infernal category multipliers — verified against in-game data', () => {
  // Player snapshot: 263 total Infernal cards.
  const rt = (setKey: string, owned: number) => ({ [setKey]: owned, totalInfernalCards: 263 })
  const cases: Array<[string, string, number, number]> = [
    ['infernal_card_bonus_ore', 'infernalOreCards', 66, 14.18],
    ['infernal_card_bonus_bar', 'infernalBarCards', 75, 15.26],
    ['infernal_card_bonus_misc', 'infernalMiscCards', 20, 1.4],
    ['infernal_card_bonus_drone', 'infernalDroneCards', 9, 4.23],
    ['infernal_card_bonus_pet', 'infernalPetCards', 13, 8.03],
    ['infernal_card_bonus_vein', 'infernalVeinCards', 16, 6.03],
    ['infernal_card_bonus_star', 'infernalStarCards', 18, 7.23],
    ['infernal_card_bonus_fish', 'infernalFishCards', 36, 5.2],
    ['infernal_card_bonus_legendary_fish', 'infernalLegendaryFishCards', 10, 3.26],
  ]
  for (const [stat, input, owned, expected] of cases) {
    it(`${stat}: ${owned} set + 263 total → ${expected}×`, () => {
      expect(computeStat(ALL_FORMULAS[stat], {}, rt(input, owned))).toBeCloseTo(expected, 2)
    })
  }
})

describe('infernal effects scale with their category multiplier', () => {
  it('pet secondary: Crab recharge 0.0325 × pet multiplier', () => {
    const rt = { infernalPetCards: 13, totalInfernalCards: 263 }
    expect(card.cardPetCrabInf.fn(4, rt)).toBeCloseTo(0.0325 * 8.026)
    expect(card.cardPetCrabInf.fn(3, rt)).toBe(0)
  })
  it('legendary fish primary: poly value × category multiplier at Infernal', () => {
    const rt = { infernalLegendaryFishCards: 10, totalInfernalCards: 263 }
    expect(card.cardLegRainbowTrout.fn(3, rt)).toBeCloseTo(1.0)
    expect(card.cardLegRainbowTrout.fn(4, rt)).toBeCloseTo(1.0 * 3.263)
  })
})

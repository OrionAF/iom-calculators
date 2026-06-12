/**
 * Card math helpers (Cards wiki, "Infernal Cards Multiplier").
 *
 * For resource cards (ores, bars, veins, stars, fish — NOT legendary fish),
 * the total per-card multiplier once a card is Infernal is:
 *
 *   total = 1 + (polyBonus − 1) × infernalBonus
 *
 * where polyBonus is the polychrome_card_bonus_* stat (base 4×, upgradeable)
 * and infernalBonus is the infernal_card_bonus_* stat
 * (1 + perSet × setInfernals + perTotal × totalInfernals).
 */
export function combinedCardMultiplier(polyBonus: number, infernalBonus: number): number {
  return 1 + (polyBonus - 1) * infernalBonus
}

import type { Source } from '$lib/engine/types'
import { cardSources } from '$lib/sources/cards'
import { resourceCardSources } from '$lib/sources/resourceCards'

/** Runtime-input keys derived from tracked card levels. */
export interface CardCounts {
  /** Every rarity tier counts as a new card (level 3 card = 3 cards owned). */
  cardsOwned: number
  /** Cards at Polychrome or above. */
  polyCardCount: number
  infernalOreCards: number
  infernalBarCards: number
  infernalMiscCards: number
  infernalDroneCards: number
  infernalPetCards: number
  infernalVeinCards: number
  infernalStarCards: number
  infernalFishCards: number
  infernalLegendaryFishCards: number
  totalInfernalCards: number
}

const SET_PREFIX_TO_COUNT: Record<string, keyof CardCounts> = {
  ore: 'infernalOreCards',
  bar: 'infernalBarCards',
  drone: 'infernalDroneCards',
  pet: 'infernalPetCards',
  vein: 'infernalVeinCards',
  star: 'infernalStarCards',
  fish: 'infernalFishCards',
  leg: 'infernalLegendaryFishCards',
}

/** All level-tracked card sources, deduplicated by key (multi-effect cards share one key). */
function allCardSourcesByKey(): Map<string, Source> {
  const map = new Map<string, Source>()
  for (const s of [...Object.values(cardSources), ...resourceCardSources]) {
    if (s.key.startsWith('cards.infernal.')) continue // computed bonuses, not cards
    if (!map.has(s.key)) map.set(s.key, s)
  }
  return map
}

/**
 * Derive every card-count runtime input from tracked card levels
 * (the unified progress map, keyed by source key). Lets a Cards page feed
 * the infernal category multipliers, per-card upgrades and Polychrome
 * Power automatically instead of asking the user for raw counts.
 */
export function deriveCardCounts(levels: Record<string, number>): CardCounts {
  const counts: CardCounts = {
    cardsOwned: 0,
    polyCardCount: 0,
    infernalOreCards: 0,
    infernalBarCards: 0,
    infernalMiscCards: 0,
    infernalDroneCards: 0,
    infernalPetCards: 0,
    infernalVeinCards: 0,
    infernalStarCards: 0,
    infernalFishCards: 0,
    infernalLegendaryFishCards: 0,
    totalInfernalCards: 0,
  }
  for (const [key, source] of allCardSourcesByKey()) {
    const level = Math.min(levels[key] ?? 0, source.maxLevel ?? 4)
    if (level <= 0) continue
    counts.cardsOwned += level
    if (level >= 3) counts.polyCardCount++
    if (level >= 4) {
      counts.totalInfernalCards++
      const sub = key.split('.')[1] // cards.<set or misc-key>.<...>
      const setCounter = SET_PREFIX_TO_COUNT[sub]
      if (setCounter) counts[setCounter]++
      else if (!key.startsWith('cards.bomb.')) counts.infernalMiscCards++
    }
  }
  return counts
}

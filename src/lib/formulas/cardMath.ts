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

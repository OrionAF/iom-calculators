export interface FishingInputs {
  // Placeholder — additional manual inputs defined in the fishing calculator spec
}

export interface FishingResult {
  incomePerHour: number
}

/**
 * Placeholder formula: rod_power × income_multi
 * Full formula implemented in the fishing calculator spec.
 */
export function fishingIncome(
  stats: Record<string, number>,
  _inputs: FishingInputs
): FishingResult {
  const rodPower = stats['fishing_rod_power'] ?? 0
  const incomeMulti = stats['fishing_income_multi'] ?? 0
  return {
    incomePerHour: rodPower * incomeMulti,
  }
}

import { computeStat } from '$lib/engine/compute'
import { fishingFormulas } from '$lib/formulas/fishing'

export interface FishingInputs {
  /** Levels for each fishing upgrade and skill tree source. */
  levels: Record<string, number>
  /** Runtime values: legendaryFishFound, fishCardCount, etc. */
  rt: Record<string, number>
}

export interface FishingResult {
  superShinyChance: number
  incomeMulti: number
  tickReductionSeconds: number
  droneMultiplier: number
  tier2DockMulti: number
  shinyChance: number
  shinyMulti: number
  superShinyMulti: number
}

export function computeFishingStats(inputs: FishingInputs): FishingResult {
  const { levels, rt } = inputs
  return {
    superShinyChance: computeStat(fishingFormulas['fishing_super_shiny_chance'], levels, rt),
    incomeMulti: computeStat(fishingFormulas['fishing_income_multi'], levels, rt),
    tickReductionSeconds: computeStat(
      fishingFormulas['fishing_tick_reduction_seconds'],
      levels,
      rt,
    ),
    droneMultiplier: computeStat(fishingFormulas['fishing_drone_multiplier'], levels, rt),
    tier2DockMulti: computeStat(fishingFormulas['fishing_tier2_dock_multi'], levels, rt),
    shinyChance: computeStat(fishingFormulas['fishing_shiny_chance'], levels, rt),
    shinyMulti: computeStat(fishingFormulas['fishing_shiny_multi'], levels, rt),
    superShinyMulti: computeStat(fishingFormulas['fishing_super_shiny_multi'], levels, rt),
  }
}

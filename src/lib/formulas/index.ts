import { fishingFormulas } from './fishing'
import type { FormulaMap } from '$lib/engine/types'

/**
 * All stat formulas across every domain.
 * Import domain formula maps here as they are implemented.
 */
export const ALL_FORMULAS: FormulaMap = {
  ...fishingFormulas,
  // stars, pickaxe, ore, bombs, etc. added in subsequent plans
}

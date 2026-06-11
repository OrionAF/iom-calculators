import { fishingFormulas } from './fishing'
import { starsFormulas } from './stars'
import { pickaxeFormulas } from './pickaxe'
import { bombsFormulas } from './bombs'
import { oresFormulas } from './ores'
import { veinsFormulas } from './veins'
import { craftingFormulas } from './crafting'
import { contractsFormulas } from './contracts'
import { dronesFormulas } from './drones'
import { chestsFormulas } from './chests'
import { lootbugsFormulas } from './lootbugs'
import { lootfrogsFormulas } from './lootfrogs'
import { prestigeFormulas } from './prestige'
import { obeliskFormulas } from './obelisk'
import { miscFormulas } from './misc'
import type { FormulaMap } from '$lib/engine/types'

/** All stat formulas across every domain. */
export const ALL_FORMULAS: FormulaMap = {
  ...fishingFormulas,
  ...starsFormulas,
  ...pickaxeFormulas,
  ...bombsFormulas,
  ...oresFormulas,
  ...veinsFormulas,
  ...craftingFormulas,
  ...contractsFormulas,
  ...dronesFormulas,
  ...chestsFormulas,
  ...lootbugsFormulas,
  ...lootfrogsFormulas,
  ...prestigeFormulas,
  ...obeliskFormulas,
  ...miscFormulas,
}

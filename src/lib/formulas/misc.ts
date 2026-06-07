import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const miscFormulas = {
  game_speed_multi: {
    base: 1,
    contributions: [
      { source: U, op: '×', unknown: true },  // Items: Banana Coffee (×) + Blue Cow
      { source: U, op: '×', unknown: true },  // Store: Gotta Go Fast Bundle (×) + Founder Perk T10
      { source: U, op: '+', unknown: true },  // Pets + Stargazing + Upgrades + Contracts + Skins
    ],
  },
  item_duration_multi: {
    base: 1,
    contributions: [
      { source: U, op: '+', unknown: true },  // Prestige + SkillTree (Friendship Ended - already wired) + Cards + Stargazing + Skins
    ],
  },
  gem_upgrade_cap_increase: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },  // Construct + Archaeology
    ],
  },
  pet_levelup_chance_multi: {
    base: 0,
    contributions: [
      { source: sk.haveYouTriedGettingLuckierPetLevelup, op: '+' },
      { source: U, op: '+', unknown: true },  // Relics + Store + Construct + Fishing + Upgrades + Skins
    ],
  },
} satisfies FormulaMap

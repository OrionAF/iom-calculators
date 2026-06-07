import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const miscFormulas = {
  game_speed_multi: {
    base: 1,
    contributions: [
      { source: it.bananaCoffee,                  op: '×' },
      { source: it.blueCow,                       op: '×' },
      { source: st.founderGameSpeed,              op: '+' },
      { source: st.vpGottaGoFastGameSpeed,        op: '+' },
      { source: U, op: '+', unknown: true },      // Pets + Stargazing + Upgrades + Contracts + Skins + Floors
    ],
  },
  item_duration_multi: {
    base: 1,
    contributions: [
      { source: U, op: '+', unknown: true },      // Prestige + SkillTree + Cards + Stargazing + Skins
    ],
  },
  gem_upgrade_cap_increase: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },      // Construct + Archaeology
    ],
  },
  pet_levelup_chance_multi: {
    base: 0,
    contributions: [
      { source: sk.haveYouTriedGettingLuckierPetLevelup, op: '+' },
      { source: rel.mythicRelicPetLevelup,               op: '+' },
      { source: st.vpPetTrainerPetLevel,                 op: '×' },
      { source: U, op: '+', unknown: true },      // Store + Construct + Fishing + Upgrades + Skins
    ],
  },
} satisfies FormulaMap

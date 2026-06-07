import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'prestige', fn: () => 0, inputs: [] }

export const prestigeFormulas = {
  xp_level_cap:           { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prestige_point_multi: {
    base: 1,
    contributions: [
      { source: sk.easyProgressorPrestigePts,     op: '+' },
      { source: sk.ppGoUpPrestigePts,             op: '+' },
      { source: rel.legendaryRelicPrestigePts,    op: '+' },
      { source: st.perkPrestigePts,               op: '×' },
      { source: U, op: '+', unknown: true },      // Prestige + Store + Challenges + Cards + Pets + Construct + Stargazing + Contracts + Skins
    ],
  },
  experience_multi: {
    base: 1,
    contributions: [
      { source: sk.ppGoUpExp,                     op: '+' },
      { source: sk.tonsOfDamageExp,               op: '+' },
      { source: sk.polychromePowerExp,            op: '×' },
      { source: it.strawberriesExp,                 op: '×' },
      { source: it.goldenStrawberriesExp,           op: '×' },
      { source: rel.commonRelicExp,               op: '+' },
      { source: rel.rareRelicExp,                 op: '+' },
      { source: st.vpPetTrainerExp,               op: '×' },
      { source: U, op: '+', unknown: true },      // Prestige + Drones + Items + Store + Challenges + Cards + Pets + Construct + Stargazing + Fishing + Upgrades + Contracts + Skins
    ],
  },
  floor_clear_requirement_multi: {
    base: 1,
    contributions: [
      { source: sk.easyProgressorFloorClear,      op: '+' },
      { source: U, op: '+', unknown: true },      // Prestige + Cards + Pets + Construct + Skins
    ],
  },
  artifact_cap_increase: {
    base: 0,
    contributions: [
      { source: sk.doTheseUpgradesArtifactCap,    op: '+' },
      { source: U, op: '+', unknown: true },      // Cards + Construct
    ],
  },
  artifact_tier4_cap_increase: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },      // Pets: Happy Bot
    ],
  },
} satisfies FormulaMap

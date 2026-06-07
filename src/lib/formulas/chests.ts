import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const chestsFormulas = {
  chest_double_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  chest_meter_multi: {
    base: 1,
    contributions: [
      { source: sk.haveYouTriedGettingLuckierChestMeter, op: '×' },
      { source: U, op: '+', unknown: true },  // Store + Upgrades
    ],
  },
  chest_items_bonus:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  freebie_gems_bonus: {
    base: 0,
    contributions: [
      { source: sk.gemsAndChestsFreebie, op: '+' },
      { source: U, op: '+', unknown: true },  // Store (many packs) + Challenges + Cards + Construct
    ],
  },
  freebie_5x_chance:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  freebie_refresh_chance: {
    base: 0,
    contributions: [
      { source: sk.freeThatsGreatRefresh, op: '+' },
      { source: U, op: '+', unknown: true },  // Construct: Platinized Statue of Artistry
    ],
  },
  freebie_bank_cap: {
    base: 2,
    contributions: [
      { source: sk.chronokeeperFrebieCap,       op: '+' },
      { source: sk.savingForARainyDayFrebieCap, op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Challenges + Cards + Pets + Construct + Stargazing + Skins
    ],
  },
  freebie_cooldown_seconds: {
    base: 600,
    contributions: [
      { source: sk.justWaitFasterCooldown,   op: '+' },
      { source: sk.freeThatsGreatCooldown,   op: '+' },
      { source: U, op: '+', unknown: true },  // Store + Cards + Construct + Upgrades
    ],
  },
  stonks_chance:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  stonks_multi:        { base: 1, contributions: [{ source: U, op: '+', unknown: true }] },
  super_stonks_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  super_stonks_multi:  { base: 2, contributions: [{ source: U, op: '+', unknown: true }] },
  ultra_stonks_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  ultra_stonks_multi:  { base: 25, contributions: [] },
} satisfies FormulaMap

import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { constructSources as con } from '$lib/sources/construct'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const chestsFormulas = {
  chest_double_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  chest_meter_multi: {
    base: 1,
    contributions: [
      { source: sk.haveYouTriedGettingLuckierChestMeter, op: '×' },
      { source: st.gemChestMeter,                        op: '×' },
      { source: U, op: '+', unknown: true },             // Upgrades
    ],
  },
  chest_items_bonus: {
    base: 0,
    contributions: [
      { source: st.gemItemsInChests,  op: '+' },
    ],
  },
  freebie_gems_bonus: {
    base: 0,
    contributions: [
      { source: sk.gemsAndChestsFreebie,         op: '+' },
      { source: con.staFriendshipFreebieGems,    op: '+' },
      { source: card.cardFreebie,                op: '+' },
      { source: ch.chFreebieGemsBonus,           op: '+' },
      { source: st.founderFreebieGems,           op: '+' },
      { source: st.vpBankersFreebieGems,         op: '+' },
      { source: st.vpBiggerBankersFreebieGems,   op: '+' },
      { source: st.vpCapitalistFreebieGems,      op: '+' },
      { source: st.vpArchFreebieGems,            op: '+' },
      { source: st.vpChiefExecFreebieGems,       op: '+' },
      { source: st.vpHalfWayFreebieGems,         op: '+' },
      { source: U, op: '+', unknown: true },     // Cards + Construct
    ],
  },
  freebie_5x_chance: {
    base: 0,
    contributions: [
      { source: con.staArtistryFreebie5x,        op: '+' },
      { source: st.vpFreebie5xChance,            op: '+' },
      { source: st.vpBankersFreebie5x,           op: '+' },
      { source: U, op: '+', unknown: true },     // Fishing
    ],
  },
  freebie_refresh_chance: {
    base: 0,
    contributions: [
      { source: sk.freeThatsGreatRefresh,        op: '+' },
      { source: st.vpBiggerBankersRefresh,       op: '+' },
      { source: U, op: '+', unknown: true },     // Construct (platinized Artistry)
    ],
  },
  freebie_bank_cap: {
    base: 2,
    contributions: [
      { source: sk.chronokeeperFrebieCap,            op: '+' },
      { source: sk.savingForARainyDayFrebieCap,      op: '+' },
      { source: con.staEastwoodFreebieBank,          op: '+' },
      { source: ch.chFreebieBank,                    op: '+' },
      { source: st.gemFreebieBank,                   op: '+' },
      { source: st.founderFreebieBank,               op: '+' },
      { source: st.vpBankersFreebieBank,             op: '+' },
      { source: st.vpBiggerBankersFreebieBank,       op: '+' },
      { source: st.vpInsiderFreebieBank,             op: '+' },
      { source: st.vpChiefExecFreebieBank,           op: '×' },
      { source: U, op: '+', unknown: true },         // Cards + Pets + Stargazing + Skins
    ],
  },
  freebie_cooldown_seconds: {
    base: 600,
    contributions: [
      { source: sk.justWaitFasterCooldown,   op: '+' },
      { source: sk.freeThatsGreatCooldown,   op: '+' },
      { source: U, op: '+', unknown: true }, // Store Founder + Cards + Construct + Upgrades
    ],
  },
  stonks_chance:        { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  stonks_multi: {
    base: 1,
    contributions: [
      { source: card.cardStonks,             op: '×' },
      { source: st.vpInsiderStonksMul,       op: '+' },
      { source: U, op: '+', unknown: true }, // Cards + Skins + Stargazing
    ],
  },
  super_stonks_chance: {
    base: 0,
    contributions: [
      { source: card.cardSuperStonks,            op: '+' },
      { source: ch.chSuperStonksChance,          op: '+' },
      { source: st.vpChiefExecSuperStonksChance, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  super_stonks_multi: {
    base: 2,
    contributions: [
      { source: st.vpChiefExecSuperStonksMul, op: '×' },
      { source: U, op: '+', unknown: true },
    ],
  },
  ultra_stonks_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  ultra_stonks_multi:  { base: 25, contributions: [] },
} satisfies FormulaMap

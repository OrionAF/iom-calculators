import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { constructSources as con } from '$lib/sources/construct'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { fishingSources as f } from '$lib/sources/fishing'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { petSources as pet } from '$lib/sources/pets'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const chestsFormulas = {
  chest_double_chance:  { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  chest_meter_multi: {
    base: 1,
    contributions: [
      { source: sk.haveYouTriedGettingLuckierChestMeter, op: '×' },
      { source: st.gemChestMeter,                        op: '×' },
      { source: sg.starEridanusSuperStonks,      op: '+' },
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
      { source: con.staFallacyFreebieGems,       op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  freebie_5x_chance: {
    base: 0,
    contributions: [
      { source: con.staArtistryFreebie5x,        op: '+' },
      { source: st.vpFreebie5xChance,            op: '+' },
      { source: st.vpBankersFreebie5x,           op: '+' },
      { source: f.noticeT2FreebieJackpot,        op: '+' },
    ],
  },
  freebie_refresh_chance: {
    base: 0,
    contributions: [
      { source: sk.freeThatsGreatRefresh,        op: '+' },
      { source: st.vpBiggerBankersRefresh,       op: '+' },
      { source: con.staArtistryFreebieRefresh,   op: '+' },
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
      { source: pet.petHappyBotQuestFreebieBank, op: '+' },
      { source: sg.starOphiuchusFreebie,         op: '+' },
      { source: sg.ssBankedFreebieLootbugFreebie, op: '+' },
      { source: U, op: '+', unknown: true },         // Cards + Skins
    ],
  },
  freebie_cooldown_seconds: {
    base: 600,
    contributions: [
      { source: sk.justWaitFasterCooldown,   op: '+' },
      { source: sk.freeThatsGreatCooldown,   op: '+' },
      { source: con.staEastwoodFreebieTimer,     op: '+' },
      { source: U, op: '+', unknown: true }, // Store Founder + Cards + Upgrades
    ],
  },
  stonks_chance: {
    base: 0,
    contributions: [
      { source: con.staCombatStonksChance,       op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  stonks_multi: {
    base: 1,
    contributions: [
      { source: card.cardStonks,             op: '×' },
      { source: st.vpInsiderStonksMul,       op: '+' },
      { source: con.staCombatStonksMul,          op: '+' },
      { source: sg.starEridanusStonksMul,        op: '+' },
      { source: ch.chAllStonksMulStonks,         op: '+' },
      { source: U, op: '+', unknown: true }, // Cards + Skins
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
      { source: arch.idolCharon,               op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  ultra_stonks_chance: {
    base: 0,
    contributions: [
      { source: con.staCombatUltraStonksChance,  op: '+' },
      { source: arch.idolCharonUltraStonksUnlock, op: '+' },
      { source: arch.idolSisyphusUltraStonks,    op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  ultra_stonks_multi: {
    base: 25,
    contributions: [
      { source: con.staCombatUltraStonksMul,     op: '+' },
      { source: ch.chAllStonksMulUltra,          op: '+' },
    ],
  },
} satisfies FormulaMap

import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { constructSources as con } from '$lib/sources/construct'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { fishingSources as f } from '$lib/sources/fishing'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { petSources as pet } from '$lib/sources/pets'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { skinsSources as sn } from '$lib/sources/skins'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'store',
  fn: () => 0,
  inputs: [],
}

export const chestsFormulas: FormulaMap = defineFormulas({
  chest_double_chance: {
    contributions: [{ source: U, op: '+', unknown: true }],
  },
  chest_meter_multi: {
    contributions: [
      { source: sk.haveYouTriedGettingLuckierChestMeter, op: '×' },
      { source: st.storeGemChestMeter, op: '×' },
      { source: up.upgrMeterFillRate, op: '+' },
    ],
  },
  chest_items_bonus: {
    contributions: [{ source: st.storeGemItemsInChests, op: '+' }],
  },
  freebie_gems_bonus: {
    contributions: [
      { source: sk.gemsAndChestsFreebie, op: '+' },
      { source: con.staFriendshipFreebieGems, op: '+' },
      { source: card.cardMiscFreebie, op: '+' },
      { source: ch.chFreebieGemsBonus, op: '+' },
      { source: st.storeFounderFreebieGems, op: '+' },
      { source: st.storeVpBankersFreebieGems, op: '+' },
      { source: st.storeVpBiggerBankersFreebieGems, op: '+' },
      { source: st.storeVpCapitalistFreebieGems, op: '+' },
      { source: st.storeVpArchFreebieGems, op: '+' },
      { source: st.storeVpChiefExecFreebieGems, op: '+' },
      { source: st.storeVpHalfWayFreebieGems, op: '+' },
      { source: con.staFallacyFreebieGems, op: '+' },
      { source: U, op: '+', unknown: true },
      { source: card.cardLegMeltingGibbous, op: '×1+' },
    ],
  },
  freebie_5x_chance: {
    contributions: [
      { source: con.staArtistryFreebie5x, op: '+' },
      { source: st.storeVpFreebie5xChance, op: '+' },
      { source: st.storeVpBankersFreebie5x, op: '+' },
      { source: f.noticeT2FreebieJackpot, op: '+' },
    ],
  },
  freebie_refresh_chance: {
    contributions: [
      { source: sk.freeThatsGreatRefresh, op: '+' },
      { source: st.storeVpBiggerBankersRefresh, op: '+' },
      { source: con.staArtistryFreebieRefresh, op: '+' },
    ],
  },
  freebie_bank_cap: {
    contributions: [
      // Wiki Store group: (Gem Upgrade + bundles + Founder T6) × Chief
      // Executive, and that PRODUCT joins additively — Chief Exec's ×1.10
      // scales only the Store sum, not the other menus.
      {
        label: 'Store',
        base: 0,
        op: '+',
        contributions: [
          { source: st.storeGemFreebieBank, op: '+' },
          { source: st.storeFounderFreebieBank, op: '+' },
          { source: st.storeVpBankersFreebieBank, op: '+' },
          { source: st.storeVpBiggerBankersFreebieBank, op: '+' },
          { source: st.storeVpInsiderFreebieBank, op: '+' },
          { source: st.storeVpChiefExecFreebieBank, op: '×' },
        ],
      },
      { source: sk.chronokeeperFrebieCap, op: '+' },
      { source: sk.savingForARainyDayFrebieCap, op: '+' },
      { source: con.staEastwoodFreebieBank, op: '+' },
      { source: ch.chFreebieBank, op: '+' },
      { source: pet.petHappyBotQuestFreebieBank, op: '+' },
      { source: sg.starOphiuchusFreebie, op: '+' },
      { source: sg.ssBankedFreebieLootbugFreebie, op: '+' },
      { source: card.cardLegGeoduck, op: '×1+' },
      { source: sn.snBankedFreebies, op: '+' },
      { source: sn.snBankedFreebiesLootbugs, op: '×1+' }, // 21st Reward (multiplies ALL Freebie Cap)
    ],
  },
  freebie_cooldown_seconds: {
    contributions: [
      { source: sk.justWaitFasterCooldown, op: '+' },
      { source: sk.freeThatsGreatCooldown, op: '+' },
      { source: con.staEastwoodFreebieTimer, op: '+' },
      { source: up.upgrFreebieCooldown, op: '+' },
      { source: U, op: '+', unknown: true }, // Store Founder + Cards
      { source: card.cardMiscStoreFreebieTimer, op: '+' },
    ],
  },
  stonks_chance: {
    contributions: [
      { source: con.staCombatStonksChance, op: '+' },
      { source: U, op: '+', unknown: true },
      { source: card.cardPetHappyBotInf, op: '+' },
      { source: card.cardPetHappyBotInf, op: '+' },
    ],
  },
  stonks_multi: {
    contributions: [
      { source: card.cardMiscStonks, op: '×' },
      { source: st.storeVpInsiderStonksMul, op: '+' },
      { source: con.staCombatStonksMul, op: '+' },
      { source: sg.starEridanusStonksMul, op: '+' },
      { source: ch.chAllStonksMulStonks, op: '+' },
      { source: U, op: '+', unknown: true }, // Cards + Skins
      { source: sn.snStonksMulti, op: '×1+' },
    ],
  },
  super_stonks_chance: {
    contributions: [
      { source: card.cardMiscSuperStonks, op: '+' },
      { source: sg.starEridanusSuperStonks, op: '+' },
      { source: ch.chSuperStonksChance, op: '+' },
      { source: st.storeVpChiefExecSuperStonksChance, op: '+' },
      { source: up.upgrSuperStonksChance, op: '+' },
      { source: card.cardLegBlackenedBasker, op: '+' },
      { source: card.cardLegBlackenedBasker, op: '+' },
    ],
  },
  super_stonks_multi: {
    contributions: [
      { source: st.storeVpChiefExecSuperStonksMul, op: '×' },
      { source: arch.idolCharon, op: '+' },
      { source: U, op: '+', unknown: true },
      { source: card.cardLegStormSerpent, op: '×1+' },
      { source: card.cardPetWhaleInf, op: '×1+' },
      { source: card.cardLegStormSerpent, op: '×1+' },
      { source: card.cardPetWhaleInf, op: '×1+' },
    ],
  },
  ultra_stonks_chance: {
    contributions: [
      { source: con.staCombatUltraStonksChance, op: '+' },
      { source: arch.idolCharonUltraStonksUnlock, op: '+' },
      { source: arch.idolSisyphusUltraStonks, op: '+' },
      { source: U, op: '+', unknown: true },
      { source: card.cardMiscUltraStonks, op: '+' },
      { source: card.cardMiscUltraStonks, op: '+' },
    ],
  },
  ultra_stonks_multi: {
    contributions: [
      { source: con.staCombatUltraStonksMul, op: '+' },
      { source: ch.chAllStonksMulUltra, op: '+' },
    ],
  },
  all_stonks_multi: {
    contributions: [
      { source: U, op: '×', unknown: true }, // Challenges: Divine Challenge Upgrade
      { source: U, op: '×', unknown: true }, // Construct: Statue of Combat
    ],
  },
  chance_for_relic_chest: {
    contributions: [{ source: card.cardMiscRelicChest, op: '+' }],
  },
})

import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { droneSources as drone } from '$lib/sources/drones'
import { fishingSources as f } from '$lib/sources/fishing'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { constructSources as con } from '$lib/sources/construct'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { tributesSources as tr } from '$lib/sources/tributes'
import { worldquestsSources as wq } from '$lib/sources/worldquests'

const UNKNOWN: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'stargazing',
  fn: () => 0,
  inputs: [],
}

export const starsFormulas: FormulaMap = defineFormulas({
  /**
   * Star Spawn Rate Multiplier
   * base = 0 (additive bonus to the base 1/50 spawn rate)
   */
  star_spawn_rate: {
    contributions: [
      { source: sg.spawnRate, op: '+' },
      { source: sg.starGemini, op: '+' },
      { source: UNKNOWN, op: '×', unknown: true }, // Drones: Fueled Starburst Suit (×)
      { source: UNKNOWN, op: '×', unknown: true }, // Drones: Elixir Drone (×)
      { source: pet.petStarfishSkinStarSpawn, op: '+' },
      { source: ch.chStarSpawnRate, op: '+' },
      { source: UNKNOWN, op: '+', unknown: true }, // Relics: Legendary Relic
    ],
  },

  /**
   * Auto-Catch Chance
   * base = 0
   * Note: Drone sources use op '=' (setter) — they override other additive sources.
   */
  star_auto_catch_chance: {
    contributions: [
      { source: sg.autoCatch, op: '+' },
      { source: sg.starTaurus, op: '+' },
      { source: UNKNOWN, op: '=', unknown: true }, // Drones: Fueled Starburst Suit (=)
      { source: UNKNOWN, op: '=', unknown: true }, // Drones: Elixir Drone (=)
    ],
  },

  /**
   * Star Double Spawn Chance
   * base = 0 — only stargazing upgrade known
   */
  star_double_spawn_chance: {
    contributions: [{ source: sg.doubleChance, op: '+' }],
  },

  /**
   * Star Triple Spawn Chance
   * base = 0
   */
  star_triple_spawn_chance: {
    contributions: [
      { source: sg.starSagittarius, op: '+' },
      { source: drone.droneSuitStarburstPassive, op: '+' },
      { source: drone.droneSuitStarburstUpgrade, op: '+' },
      { source: st.vpProgressionTripleStar, op: '+' },
      { source: st.vpSupernovaTripleStar, op: '+' },
      { source: st.vpSupergiants3TripleStar, op: '+' },
      { source: tr.trMegalodonT1TSC, op: '+' },
    ],
  },

  /**
   * Super Star Spawn Rate Multiplier
   * base = 0
   */
  super_star_spawn_multi: {
    contributions: [
      { source: sg.superStarSpawn, op: '+' },
      { source: sg.starVirgo, op: '+' },
      { source: it.goldenPrimalMeatSuperStar, op: '×' },
      // Wiki: Items group is Primal Meat × Ice Cream (multiplied, not added)
      { source: it.iceCreamSuperStarSpawn, op: '×' },
      { source: UNKNOWN, op: '+', unknown: true }, // Drones: Elixir Drone (temp)
      { source: UNKNOWN, op: '×', unknown: true }, // Items: Primal Meat (×)
      { source: ct.ctSuperStarSpawn, op: '+' },
      { source: ch.chSuperStarSpawn, op: '+' },
      { source: UNKNOWN, op: '+', unknown: true }, // Fishing: Tier 1 Notice Upgrade
      { source: card.cardPetStarfish, op: '×1+' },
    ],
  },

  /**
   * Super Star Triple Chance
   * base = 0
   */
  super_star_triple_chance: {
    contributions: [
      { source: sg.starLeo, op: '+' },
      { source: st.vpSupernovaTripleSuperStar, op: '+' },
    ],
  },

  /**
   * Super Star 10x Spawn Chance
   * base = 0
   */
  super_star_10x_chance: {
    contributions: [
      { source: sg.super10xChance, op: '+' },
      { source: sk.ctrlCCtrlVStarsSuper10x, op: '+' },
      { source: pet.petStarfishSuper10xChance, op: '+' },
      { source: up.upgrSuperStar10xChance, op: '+' },
      { source: st.vpSupergiants10xSuperStar, op: '+' },
      { source: st.vpSingularity10xSuperStar, op: '+' },
      { source: tr.trMegalodonT2SS10C, op: '+' },
    ],
  },

  /**
   * Star Supernova Chance
   * base = 0
   */
  star_supernova_chance: {
    contributions: [
      { source: sg.novaChance, op: '+' },
      { source: sg.starHercules, op: '+' },
      { source: it.starfruitSupernovaChance, op: '+' },
      { source: it.goldenStarfruitSupernovaChance, op: '+' },
      { source: rel.mythicRelicNovaChance, op: '+' },
      { source: st.vpSupernovaStarNova, op: '+' },
    ],
  },

  /**
   * Star Supernova Multiplier
   * base = 10 (wiki: "Base: 10×")
   */
  star_supernova_multi: {
    contributions: [
      { source: sk.ctrlFStarsSupernovaMul, op: '+' },
      { source: sk.ctrlCCtrlVStarsSupernovaMul, op: '+' },
      { source: rel.divineRelicSupernovaMul, op: '+' },
      { source: arch.idolAstraeusSupernovaMul, op: '+' },
      { source: arch.idolPandora, op: '+' },
      { source: con.staWarmthStarSupernova, op: '+' },
      { source: f.noticeT1StarSupernovaMul, op: '+' },
      { source: st.vpSupernovaStarNovaMul, op: '+' },
      { source: card.cardLegMegalodon, op: '×1+' },
      { source: pet.petAxolotlQuestSupernovaMul, op: '+' },
      { source: tr.trMegalodonT2ASM, op: '×' },
    ],
  },

  /**
   * Super Star Supernova Chance
   * base = 0
   */
  super_star_supernova_chance: {
    contributions: [
      { source: pet.petStarfishSupernovaChance, op: '+' },
      { source: ct.ctSupernovaChanceW2, op: '+' },
      { source: st.vpSupernovaSuperStarNova, op: '+' },
    ],
  },

  /**
   * Super Star Supernova Multiplier
   * base = 10 (wiki: "Base: 10×")
   */
  super_star_supernova_multi: {
    contributions: [
      { source: sk.ctrlFStarsSuperStarSupernovaMul, op: '+' },
      { source: rel.divineRelicSupernovaMul, op: '+' },
      { source: con.staWarmthSuperStarSupernova, op: '+' },
      { source: st.vpSupernovaSuperStarNovaMul, op: '+' },
      { source: tr.trMegalodonT2ASM, op: '×' },
      { source: UNKNOWN, op: '×', unknown: true }, // Fishing: Tier 1 Notice (×)
    ],
  },

  /**
   * Star Supergiant Chance
   * base = 0
   */
  star_supergiant_chance: {
    contributions: [
      { source: sg.supergiants, op: '+' },
      { source: sk.whyAreThereStarsSupergiant, op: '+' },
      { source: st.vpSupergiants3StarsChance, op: '+' },
      { source: ch.chStarSupergiants, op: '+' },
      { source: ct.ctStarSupergiants, op: '+' },
      { source: f.noticeT2StarSupergiants, op: '+' },
      { source: up.upgrStarSupergiantChance, op: '+' },
      { source: st.vpSingularitySupergiantChance, op: '+' },
    ],
  },

  /**
   * Star Supergiant Multiplier
   * base = 3 (wiki: "Base: 3×")
   */
  star_supergiant_multi: {
    contributions: [
      { source: sg.supergigantsMulti, op: '+' },
      { source: con.staWarmthStarSupergiants, op: '+' },
      { source: arch.idolHyperion, op: '+' },
      { source: up.upgrStarSupergiantMul, op: '+' },
      { source: st.vpSupergiants3StarMul, op: '×' },
      { source: card.cardDroneStarburstInf, op: '×1+' },
    ],
  },

  /**
   * Super Star Supergiant Chance
   * base = 0
   */
  super_star_supergiant_chance: {
    contributions: [
      { source: sg.superSupergiants, op: '+' },
      { source: ch.chSuperStarSupergiants, op: '+' },
      { source: ct.ctSuperStarSupergiants, op: '+' },
      { source: st.vpSupergiants3SuperStarsChance, op: '+' },
    ],
  },

  /**
   * Super Star Supergiant Multiplier
   * base = 3 (same pattern as star_supergiant_multi)
   */
  super_star_supergiant_multi: {
    contributions: [
      { source: con.staWarmthSuperStarSupergiants, op: '+' },
      { source: up.upgrSuperStarSupergiantMul, op: '+' },
      { source: UNKNOWN, op: '+', unknown: true },
    ],
  },

  /**
   * Star Radiant Chance
   * base = 0
   */
  star_radiant_chance: {
    contributions: [
      { source: sg.radiantChance, op: '+' },
      { source: con.staTimekeepingRadiantChance, op: '+' },
      { source: arch.idolPrometheusRadiantChanceUnlock, op: '+' },
      { source: tr.trBlackenedBaskerT2RSC, op: '+' },
      { source: card.cardPetStarfishInf, op: '+' },
    ],
  },

  /**
   * Star Radiant Multiplier
   * base = 10 (radiant gives 10× — same pattern as supernova)
   */
  star_radiant_multi: {
    contributions: [
      { source: con.staTimekeepingStarRadiantMul, op: '+' },
      { source: arch.idolPrometheusStarRadiantMul, op: '+' },
    ],
  },

  /**
   * Super Star Radiant Chance
   * base = 0
   */
  super_star_radiant_chance: {
    contributions: [
      { source: sg.superRadiant, op: '+' },
      { source: con.staRodentiaRadiantChance, op: '+' },
      { source: arch.idolPrometheus_SSRadiantChanceUnlock, op: '+' },
      { source: tr.trBlackenedBaskerT1RSSC, op: '+' },
    ],
  },

  /**
   * Super Star Radiant Multiplier
   * base = 10 (estimated)
   */
  super_star_radiant_multi: {
    contributions: [
      { source: con.staTimekeepingSuperStarRadiantMul, op: '+' },
      { source: arch.idolPrometheusSuperStarRadiantMul, op: '+' },
    ],
  },

  /**
   * All Star Multiplier
   * base = 1 (starts at 1×)
   */
  all_star_multi: {
    contributions: [
      { source: sg.allStarMulti, op: '+' },
      { source: sg.starScorpio, op: '+' },
      { source: sk.leprechaunsLegacyAllStar, op: '×' },
      { source: it.starfruitAllStarMulti, op: '+' },
      { source: it.goldenStarfruitAllStarMulti, op: '+' },
      { source: it.cosmicCandyBuff, op: '×' },
      { source: it.cosmicCandyPerm, op: '+' },
      { source: it.goldenCosmicCandyBuff, op: '×' },
      { source: it.goldenCosmicCandyPerm, op: '+' },
      { source: ct.ctAllStarMul, op: '+' },
      { source: card.cardMiscSuperStar, op: '×' },
      { source: st.vpSingularityAllStar, op: '×' },
      { source: f.noticeT1AllStarMul, op: '+' },
      { source: drone.droneMidasEnhancementAllStar, op: '+' },
      { source: tr.trMeltingGibbousT1ASM, op: '×' },
    ],
  },

  /**
   * Novagiant Combo Multiplier
   * base = 1 (starts at 1×)
   * All known sources defined — no unknowns.
   */
  novagiant_combo_multi: {
    contributions: [
      { source: sg.novagiant, op: '+' },
      { source: sk.whyAreThereStarsNovagiant, op: '+' },
      { source: ch.chNovagiantComboMul, op: '+' },
      { source: pet.petStarfishQuestNovagiant, op: '+' },
      { source: wq.wqNovogiantMultiQ5, op: '×1+' },
      { source: card.cardMiscNovagiant, op: '×' },
    ],
  },
  candy_eaten: { contributions: [] },
})

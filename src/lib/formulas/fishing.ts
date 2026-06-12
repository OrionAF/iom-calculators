import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { fishingSources as f } from '$lib/sources/fishing'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { cardSources as card } from '$lib/sources/cards'
import { petSources as pet } from '$lib/sources/pets'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { constructSources as con } from '$lib/sources/construct'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { challengeSources as ch } from '$lib/sources/challenges'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { workshopSources as ws } from '$lib/sources/workshop'
import { tributesSources as tr } from '$lib/sources/tributes'

// Placeholder for contributions whose per-level values are not yet known.
// Marked unknown: true so the engine skips them and the UI flags them.
const UNKNOWN: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'fishing',
  fn: () => 0,
  inputs: [],
}

export const fishingFormulas: FormulaMap = defineFormulas({
  /**
   * Fishing Rod Power
   * base = 1 (base rod power before any upgrades)
   * Fishing components multiply; Store and Card add a flat bonus.
   */
  fishing_rod_power: {
    contributions: [
      { source: f.rodBase, op: '×' },
      { source: f.rodMultiT1, op: '×' },
      { source: f.rodMultiE1, op: '×' },
      { source: sk.motleySchoolRod, op: '×' },
      { source: st.vpHalfWayFishingRod, op: '×' },
      { source: card.cardMiscFishingRod, op: '×' },
    ],
  },

  /**
   * Fishing Drone Capacity
   * base = 0
   * All additive sources are summed first, then multiplied by Drone Cloner.
   */
  fishing_drone_capacity: {
    contributions: [
      { source: f.droneCapT1, op: '+' },
      { source: f.droneCapT1B, op: '+' },
      { source: f.droneCapE1, op: '+' },
      { source: f.droneCapE1C, op: '+' },
      { source: sk.fishingWithFriendsDrones, op: '+' },
      { source: sk.motleySchoolDrones, op: '+' },
      { source: arch.idolAres, op: '+' },
      { source: f.droneCloner, op: '×' },
    ],
  },

  /**
   * Fishing Drone Base Power
   * base = 3 (wiki: "Base: 3")
   */
  fishing_drone_power: {
    contributions: [
      { source: f.droneBaseT1, op: '+' },
      { source: arch.idolPoseidon, op: '+' },
      { source: arch.idolAres, op: '+' },
      { source: up.upgrFishingDronePower, op: '+' },
    ],
  },

  /**
   * Drone Power Multiplier
   * base = 1
   */
  fishing_drone_multiplier: {
    // Wiki: menu groups multiply. The two Fishing upgrades multiply each
    // other; Fishing With Friends + Completionist Gatekeeper sum within
    // the Skill-Tree group.
    contributions: [
      { source: ws.wsDronePowerW3, op: '×' },
      {
        label: 'Skill-Tree',
        base: 1,
        op: '×',
        contributions: [
          { source: sk.fishingWithFriendsDronePower, op: '+' },
          { source: sk.completionistGatekeeperDronePower, op: '+' },
        ],
      },
      { source: arch.idolTethysDronePower, op: '×1+' },
      { source: f.droneMultiT1, op: '×1+' },
      { source: f.droneMultiE1, op: '×1+' },
    ],
  },

  /**
   * Tier 2 Dock Multi
   * base = 0 (additive bonus on top of base dock power)
   */
  fishing_tier2_dock_multi: {
    contributions: [
      { source: f.tier2DockT2, op: '+' },
      { source: f.tier2DockE2, op: '+' },
      { source: sk.completionistGatekeeperTier2Dock, op: '+' },
      { source: pet.petNibblesQuestTier2Dock, op: '+' },
      { source: arch.idolTethysTier2Dock, op: '+' },
      { source: st.vpLegendaryHaulerTier2Dock, op: '×' },
      { source: UNKNOWN, op: '+', unknown: true }, // Stargazing: 10th Black Hole boost
      { source: card.cardDroneAnglerInf, op: '×1+' },
    ],
  },

  /**
   * Fish Income Multiplier
   * base = 1
   */
  fishing_income_multi: {
    contributions: [
      { source: f.fishMultiT1, op: '+' },
      { source: f.fishMultiE1, op: '+' },
      { source: sk.fishingWithFriendsFishMulti, op: '+' },
      { source: sk.withThisFishFishMulti, op: '+' },
      { source: con.staCraftFishIncomeMul, op: '×' },
      { source: sg.starCetusFishIncome, op: '+' },
      { source: sg.ssFishIncomeMul, op: '+' },
      { source: st.vpLegendaryHaulerFishIncome, op: '×' },
    ],
  },

  /**
   * Fishing Tick Reduction (seconds)
   * base = 0 — total seconds reduced from the 60s base tick timer
   */
  fishing_tick_reduction_seconds: {
    contributions: [
      { source: f.tickSpeedT1, op: '+' },
      { source: f.tickSpeedE1, op: '+' },
      { source: sk.letsPickUpThePaceTick, op: '+' },
    ],
  },

  /**
   * Double Fish Tick Chance
   * base = 0
   */
  fishing_double_tick_chance: {
    contributions: [
      { source: f.doubleTickT1, op: '+' },
      { source: f.doubleTickE1, op: '+' },
      { source: sk.letsPickUpThePaceDouble, op: '+' },
      { source: arch.idolAstraeusDblTick, op: '+' },
    ],
  },

  /**
   * Triple Fish Tick Chance
   * base = 0
   */
  fishing_triple_tick_chance: {
    contributions: [
      { source: f.tripleTickT1, op: '+' },
      { source: f.tripleTickE2, op: '+' },
      { source: sk.letsPickUpThePaceTriple, op: '+' },
      { source: st.vpFishersTripleTick, op: '+' },
      { source: pet.petNibblesTripleTick, op: '+' },
      { source: UNKNOWN, op: '+', unknown: true }, // Megalodon Tier 1 Tribute
    ],
  },

  /**
   * 5x Fish Tick Chance
   * base = 0 — all sources unknown
   */
  fishing_5x_tick_chance: {
    contributions: [
      { source: UNKNOWN, op: '+', unknown: true }, // Divine Relic
      { source: st.vpLegendaryHauler5xTick, op: '+' },
      { source: UNKNOWN, op: '+', unknown: true }, // Infernal Mr Nibbles Card
      { source: card.cardPetMrNibblesInf, op: '+' },
    ],
  },

  /**
   * Fish Token Gain Multiplier
   * base = 1
   */
  fishing_token_multi: {
    contributions: [{ source: f.tokenMultiE1, op: '+' }],
  },

  /**
   * Notice Fish Requirement (reduction fraction)
   * base = 0 — total fraction by which the notice fish requirement is reduced
   */
  fishing_notice_requirement: {
    contributions: [{ source: sk.friendshipEndedNoticeReq, op: '+' }],
  },

  /**
   * Tiny Notice Chance
   * base = 0
   */
  fishing_tiny_notice_chance: {
    contributions: [
      { source: f.tinyNoticeE1, op: '+' },
      { source: st.vpAnglersNotice, op: '+' },
      { source: UNKNOWN, op: '+', unknown: true }, // Mr Nibbles Pet Card
      { source: card.cardPetMrNibbles, op: '+' },
    ],
  },

  /**
   * Shiny Fish Chance
   * base = 0
   */
  fishing_shiny_chance: {
    contributions: [
      { source: f.shinyChanceT1, op: '+' },
      { source: sk.withThisFishShinyChance, op: '+' },
      { source: pet.petNibblesSkinShinyChance, op: '+' },
    ],
  },

  /**
   * Shiny Fish Multiplier
   * base = 3 (wiki: "Base: 3×")
   */
  fishing_shiny_multi: {
    contributions: [
      { source: f.shinyMultiT2, op: '+' },
      { source: f.shinyMultiE1, op: '+' },
      { source: ch.chShinyFishMul, op: '+' },
      { source: pet.petNibblesShinyFishMul, op: '+' },
    ],
  },

  /**
   * Super Shiny Fish Chance
   * base = 0 — all sources fully known, no unknowns
   */
  fishing_super_shiny_chance: {
    contributions: [
      { source: f.superShinyChanceT2, op: '+' },
      { source: sk.completionistGatekeeperSuperShiny, op: '+' },
    ],
  },

  /**
   * Super Shiny Fish Multiplier
   * base = 2 (wiki: "Base: 2×")
   * Enhancement adds to the base 2×.
   */
  fishing_super_shiny_multi: {
    contributions: [
      { source: f.superShinyMultiE2, op: '+' },
      { source: arch.idolTethysSuperShiny, op: '+' },
      { source: tr.trCthulhuT1SSM, op: '+' }, // adds to base 2x
    ],
  },

  /**
   * Fishing Tick Speed
   * Exact formula unclear from wiki — may be a multiplier or derived from tick_reduction.
   * Left as fully unknown pending further research.
   */
  fishing_tick_speed: {
    contributions: [{ source: UNKNOWN, op: '+', unknown: true }],
  },
})

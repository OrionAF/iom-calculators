import type { FormulaMap, Source } from '$lib/engine/types'
import { fishingSources as f } from '$lib/sources/fishing'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { storeSources as st } from '$lib/sources/store'
import { cardSources as card } from '$lib/sources/cards'
import { petSources as pet } from '$lib/sources/pets'

// Placeholder for contributions whose per-level values are not yet known.
// Marked unknown: true so the engine skips them and the UI flags them.
const UNKNOWN: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'fishing',
  fn: () => 0,
  inputs: [],
}

export const fishingFormulas = {

  /**
   * Fishing Rod Power
   * base = 1 (base rod power before any upgrades)
   * Fishing components multiply; Store and Card add a flat bonus.
   */
  fishing_rod_power: {
    base: 1,
    contributions: [
      { source: f.rodBase,          op: '×' },
      { source: f.rodMultiT1,       op: '×' },
      { source: f.rodMultiE1,       op: '×' },
      { source: sk.motleySchoolRod, op: '×' },
      { source: UNKNOWN,            op: '+', unknown: true },  // Half Way Bundle (Store)
      { source: card.cardFishingRod,  op: '×' },
    ],
  },

  /**
   * Fishing Drone Capacity
   * base = 0
   * All additive sources are summed first, then multiplied by Drone Cloner.
   */
  fishing_drone_capacity: {
    base: 0,
    contributions: [
      { source: f.droneCapT1,              op: '+' },
      { source: f.droneCapT1B,             op: '+' },
      { source: f.droneCapE1,              op: '+' },
      { source: f.droneCapE1C,             op: '+' },
      { source: sk.fishingWithFriendsDrones, op: '+' },
      { source: sk.motleySchoolDrones,     op: '+' },
      { source: UNKNOWN,                   op: '+', unknown: true },  // Archaeology Ares Idol
      { source: f.droneCloner,             op: '×' },
    ],
  },

  /**
   * Fishing Drone Base Power
   * base = 3 (wiki: "Base: 3")
   */
  fishing_drone_power: {
    base: 3,
    contributions: [
      { source: f.droneBaseT1, op: '+' },
      { source: UNKNOWN,       op: '+', unknown: true },  // Dynamite Bar Upgrade
      { source: UNKNOWN,       op: '×', unknown: true },  // Archaeology Ares Idol (×)
      { source: UNKNOWN,       op: '+', unknown: true },  // Items: Pike (requires Poseidon Idol)
    ],
  },

  /**
   * Drone Power Multiplier
   * base = 1
   */
  fishing_drone_multiplier: {
    base: 1,
    contributions: [
      { source: f.droneMultiT1,                       op: '+' },
      { source: f.droneMultiE1,                       op: '+' },
      { source: sk.fishingWithFriendsDronePower,       op: '+' },
      { source: sk.completionistGatekeeperDronePower,  op: '+' },
      { source: UNKNOWN,                              op: '+', unknown: true },  // Workshop World 3 Upgrade
      { source: UNKNOWN,                              op: '+', unknown: true },  // Archaeology Tethys Idol
    ],
  },

  /**
   * Tier 2 Dock Multi
   * base = 0 (additive bonus on top of base dock power)
   */
  fishing_tier2_dock_multi: {
    base: 0,
    contributions: [
      { source: f.tier2DockT2,                         op: '+' },
      { source: f.tier2DockE2,                         op: '+' },
      { source: sk.completionistGatekeeperTier2Dock,   op: '+' },
      { source: UNKNOWN,                               op: '+', unknown: true },  // Legendary Hauler Bundle
      { source: UNKNOWN,                               op: '+', unknown: true },  // Infernal Angler Drone Card
      { source: UNKNOWN,                               op: '+', unknown: true },  // Mr Nibbles Pet Quest
      { source: UNKNOWN,                               op: '+', unknown: true },  // Stargazing 10th Black Hole
      { source: UNKNOWN,                               op: '+', unknown: true },  // Archaeology Tethys Idol
    ],
  },

  /**
   * Fish Income Multiplier
   * base = 1
   */
  fishing_income_multi: {
    base: 1,
    contributions: [
      { source: f.fishMultiT1,                     op: '+' },
      { source: f.fishMultiE1,                     op: '+' },
      { source: sk.fishingWithFriendsFishMulti,    op: '+' },
      { source: sk.withThisFishFishMulti,          op: '+' },
      { source: UNKNOWN,                           op: '+', unknown: true },  // Legendary Hauler Bundle
      { source: UNKNOWN,                           op: '+', unknown: true },  // Statue of Craftmanship
      { source: UNKNOWN,                           op: '+', unknown: true },  // Stargazing: Cetus + Super Star
    ],
  },

  /**
   * Fishing Tick Reduction (seconds)
   * base = 0 — total seconds reduced from the 60s base tick timer
   */
  fishing_tick_reduction_seconds: {
    base: 0,
    contributions: [
      { source: f.tickSpeedT1,            op: '+' },
      { source: f.tickSpeedE1,            op: '+' },
      { source: sk.letsPickUpThePaceTick, op: '+' },
    ],
  },

  /**
   * Double Fish Tick Chance
   * base = 0
   */
  fishing_double_tick_chance: {
    base: 0,
    contributions: [
      { source: f.doubleTickT1,                  op: '+' },
      { source: f.doubleTickE1,                  op: '+' },
      { source: sk.letsPickUpThePaceDouble,      op: '+' },
      { source: UNKNOWN,                         op: '+', unknown: true },  // Archaeology Astraeus Idol
    ],
  },

  /**
   * Triple Fish Tick Chance
   * base = 0
   */
  fishing_triple_tick_chance: {
    base: 0,
    contributions: [
      { source: f.tripleTickT1,                  op: '+' },
      { source: f.tripleTickE2,                  op: '+' },
      { source: sk.letsPickUpThePaceTriple,      op: '+' },
      { source: st.vpFishersTripleTick,          op: '+' },
      { source: pet.petNibblesTripleTick,        op: '+' },
      { source: UNKNOWN,                         op: '+', unknown: true },  // Megalodon Tier 1 Tribute
    ],
  },

  /**
   * 5x Fish Tick Chance
   * base = 0 — all sources unknown
   */
  fishing_5x_tick_chance: {
    base: 0,
    contributions: [
      { source: UNKNOWN, op: '+', unknown: true },  // Divine Relic
      { source: UNKNOWN, op: '+', unknown: true },  // Legendary Hauler Bundle
      { source: UNKNOWN, op: '+', unknown: true },  // Infernal Mr Nibbles Card
    ],
  },

  /**
   * Fish Token Gain Multiplier
   * base = 1
   */
  fishing_token_multi: {
    base: 1,
    contributions: [
      { source: f.tokenMultiE1, op: '+' },
    ],
  },

  /**
   * Notice Fish Requirement (reduction fraction)
   * base = 0 — total fraction by which the notice fish requirement is reduced
   */
  fishing_notice_requirement: {
    base: 0,
    contributions: [
      { source: sk.friendshipEndedNoticeReq, op: '+' },
    ],
  },

  /**
   * Tiny Notice Chance
   * base = 0
   */
  fishing_tiny_notice_chance: {
    base: 0,
    contributions: [
      { source: f.tinyNoticeE1, op: '+' },
      { source: UNKNOWN,        op: '+', unknown: true },  // Angler's Bundle (Store)
      { source: UNKNOWN,        op: '+', unknown: true },  // Mr Nibbles Pet Card
    ],
  },

  /**
   * Shiny Fish Chance
   * base = 0
   */
  fishing_shiny_chance: {
    base: 0,
    contributions: [
      { source: f.shinyChanceT1,              op: '+' },
      { source: sk.withThisFishShinyChance,   op: '+' },
      { source: UNKNOWN,                      op: '+', unknown: true },  // Mr Nibbles Pet Skin
    ],
  },

  /**
   * Shiny Fish Multiplier
   * base = 3 (wiki: "Base: 3×")
   */
  fishing_shiny_multi: {
    base: 3,
    contributions: [
      { source: f.shinyMultiT2,  op: '+' },
      { source: f.shinyMultiE1,  op: '+' },
      { source: UNKNOWN,         op: '+', unknown: true },  // Divine Challenge Upgrade
      { source: UNKNOWN,         op: '+', unknown: true },  // Mr Nibbles Pet
    ],
  },

  /**
   * Super Shiny Fish Chance
   * base = 0 — all sources fully known, no unknowns
   */
  fishing_super_shiny_chance: {
    base: 0,
    contributions: [
      { source: f.superShinyChanceT2,                   op: '+' },
      { source: sk.completionistGatekeeperSuperShiny,   op: '+' },
    ],
  },

  /**
   * Super Shiny Fish Multiplier
   * base = 2 (wiki: "Base: 2×")
   * Enhancement adds to the base 2×.
   */
  fishing_super_shiny_multi: {
    base: 2,
    contributions: [
      { source: f.superShinyMultiE2, op: '+' },
      { source: UNKNOWN,             op: '+', unknown: true },  // Archaeology Tethys Idol
      { source: UNKNOWN,             op: '+', unknown: true },  // Tier 1 Cthulhu Tribute
    ],
  },

  /**
   * Fishing Tick Speed
   * Exact formula unclear from wiki — may be a multiplier or derived from tick_reduction.
   * Left as fully unknown pending further research.
   */
  fishing_tick_speed: {
    base: 0,
    contributions: [
      { source: UNKNOWN, op: '+', unknown: true },
    ],
  },

} satisfies FormulaMap

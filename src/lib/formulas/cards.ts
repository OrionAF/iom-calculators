import type { FormulaMap } from '$lib/engine/types'
import { defineFormulas } from './define'
import type { Source } from '$lib/engine/types'
import { cardSources as card } from '$lib/sources/cards'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { petSources as pet } from '$lib/sources/pets'
import { storeSources as st } from '$lib/sources/store'
import { tributesSources as tr } from '$lib/sources/tributes'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'cards',
  fn: () => 0,
  inputs: [],
}

/**
 * Card bonus stats.
 *
 * Polychrome bonus per resource set (wiki + confirmed in-game structure):
 *   (base 4 + Cetus + Upgrades) × (1 + pets) × bundle × tribute
 * Infernal bonus per resource set:
 *   1 + perSet × setInfernals + perTotal × totalInfernals
 * Combined per-card multiplier = 1 + (poly − 1) × infernal
 * (combinedCardMultiplier in cardMath.ts).
 */
export const cardsFormulas: FormulaMap = defineFormulas({
  polychrome_card_bonus_ore: {
    contributions: [
      { source: sg.starCetusPolyCardMul, op: '+' },
      { source: up.upgrPolychromeOreCardMulti, op: '+' },
      { source: pet.petHappyBotQuestPolyOre, op: '×1+' },
      { source: st.storeVpPolyPotencyOre, op: '×' },
      { source: tr.trGlimmeringGeoduckT2POCM, op: '×' },
    ],
  },
  polychrome_card_bonus_bar: {
    contributions: [
      { source: U, op: '×', unknown: true }, // Archaeology: Andromeda Idol
    ],
  },
  polychrome_card_bonus_vein: {
    contributions: [
      { source: pet.petHappyBotQuestPolyVein, op: '×1+' },
      { source: st.storeVpPolyPotencyVein, op: '×' },
      { source: sk.insaneInTheVeinGainVeinPoly, op: '+' },
      { source: U, op: '+', unknown: true }, // Relics: last Mythic
    ],
  },
  polychrome_card_bonus_star: {
    contributions: [
      { source: pet.petHappyBotQuestPolyStar, op: '×1+' },
      { source: st.storeVpPolyPotencyStar, op: '×' },
      { source: tr.trGlimmeringGeoduckT1PSCM, op: '×' },
    ],
  },
  polychrome_card_bonus_fish: {
    contributions: [
      { source: f.polyCardMultiT2, op: '+' },
      { source: f.polyCardMultiE2, op: '+' },
      { source: st.storeVpPolyPotencyFish, op: '×' },
      { source: U, op: '+', unknown: true }, // Archaeology: star card idol
    ],
  },

  infernal_card_bonus_ore: {
    contributions: [
      { source: card.infernalBonusOre, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_bar: {
    contributions: [
      { source: card.infernalBonusBar, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_vein: {
    contributions: [
      { source: card.infernalBonusVein, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_star: {
    contributions: [
      { source: card.infernalBonusStar, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_fish: {
    contributions: [
      { source: card.infernalBonusFish, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_misc: {
    contributions: [
      { source: card.infernalBonusMisc, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_drone: {
    contributions: [
      { source: card.infernalBonusDrone, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_pet: {
    contributions: [
      { source: card.infernalBonusPet, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
  infernal_card_bonus_legendary_fish: {
    contributions: [
      { source: card.infernalBonusLegendaryFish, op: '+' },
      { source: U, op: '×', unknown: true }, // "Bonus from Other Sources" (in-game; sources unknown)
    ],
  },
})

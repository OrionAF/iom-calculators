import type { FormulaMap } from '$lib/engine/types'
import { defineFormulas } from './define'
import type { Source } from '$lib/engine/types'
import { cardSources as card } from '$lib/sources/cards'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { petSources as pet } from '$lib/sources/pets'
import { storeSources as st } from '$lib/sources/store'
import { tributesSources as tr } from '$lib/sources/tributes'
import { fishingSources as f } from '$lib/sources/fishing'

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
      { source: U, op: '+', unknown: true }, // Stargazing: Cetus (+0.15/rank)
      { source: up.upgrPolychromeOreCardMulti, op: '+' },
      { source: pet.petHappyBotQuestPolyOre, op: '×1+' },
      { source: st.vpPolyPotencyOre, op: '×' },
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
      { source: st.vpPolyPotencyVein, op: '×' },
      { source: U, op: '+', unknown: true }, // Skill-Tree: Insane In The Vein Gain; Relics: last Mythic
    ],
  },
  polychrome_card_bonus_star: {
    contributions: [
      { source: pet.petHappyBotQuestPolyStar, op: '×1+' },
      { source: st.vpPolyPotencyStar, op: '×' },
      { source: tr.trGlimmeringGeoduckT1PSCM, op: '×' },
    ],
  },
  polychrome_card_bonus_fish: {
    contributions: [
      { source: f.polyCardMultiT2, op: '+' },
      { source: f.polyCardMultiE2, op: '+' },
      { source: st.vpPolyPotencyFish, op: '×' },
      { source: U, op: '+', unknown: true }, // Archaeology: star card idol
    ],
  },

  infernal_card_bonus_ore: { contributions: [{ source: card.infernalBonusOre, op: '+' }] },
  infernal_card_bonus_bar: { contributions: [{ source: card.infernalBonusBar, op: '+' }] },
  infernal_card_bonus_vein: { contributions: [{ source: card.infernalBonusVein, op: '+' }] },
  infernal_card_bonus_star: { contributions: [{ source: card.infernalBonusStar, op: '+' }] },
  infernal_card_bonus_fish: { contributions: [{ source: card.infernalBonusFish, op: '+' }] },
})

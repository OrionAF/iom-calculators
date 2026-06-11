import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { upgradeSources as up } from '$lib/sources/upgrades'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'store', fn: () => 0, inputs: [] }

export const miscFormulas: FormulaMap = defineFormulas({
  game_speed_multi: {
    contributions: [
      { source: it.bananaCoffee,                  op: '×' },
      { source: it.blueCow,                       op: '×' },
      { source: pet.petLeprechaunGameSpeed,       op: '+' },
      { source: ct.ctGameSpeedW2,                 op: '+' },
      { source: st.founderGameSpeed,              op: '+' },
      { source: st.vpGottaGoFastGameSpeed,        op: '+' },
      { source: sg.ssGameSpeed,                op: '+' },
      { source: f.noticeT1RemoveW3SpeedMod,    op: '+' },
      { source: up.upgrGameSpeed,                 op: '+' },
      { source: U, op: '+', unknown: true },      // Skins + Floors (ores)
    ],
  },
  item_duration_multi: {
    contributions: [
      { source: art.artItemDurationT1,            op: '+' },
      { source: card.cardCode,                    op: '×' },
      { source: sk.friendshipEndedItemDuration, op: '+' },
      { source: sg.starCapricornItemDuration,   op: '+' },
      { source: sg.ssItemDuration,              op: '+' },
      { source: U, op: '+', unknown: true },      // Prestige + Skins
    ],
  },
  gem_upgrade_cap_increase: {
    contributions: [
      { source: con.staHygieneGemUpgradeCap,      op: '+' },
      { source: con.staCraftGemUpgradeCap,        op: '+' },
      { source: arch.idolMinos,                op: '+' },
    ],
  },
  pet_levelup_chance_multi: {
    contributions: [
      { source: sk.haveYouTriedGettingLuckierPetLevelup, op: '+' },
      { source: rel.mythicRelicPetLevelup,               op: '+' },
      { source: con.staFelinePetLevelup,                 op: '+' },
      { source: st.vpPetTrainerPetLevel,                 op: '×' },
      { source: f.noticeT1PetLevelUp,          op: '+' },
      { source: up.upgrPetLevelChance,            op: '+' },
      { source: U, op: '+', unknown: true },      // Store + Skins
    ],
  },
})

import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { upgradeSources as up } from '$lib/sources/upgrades'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'prestige', fn: () => 0, inputs: [] }

export const prestigeFormulas = {
  xp_level_cap:           { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  prestige_point_multi: {
    base: 1,
    contributions: [
      { source: sk.easyProgressorPrestigePts,     op: '+' },
      { source: sk.ppGoUpPrestigePts,             op: '+' },
      { source: art.artPrestigePtsT2,             op: '+' },
      { source: rel.legendaryRelicPrestigePts,    op: '+' },
      { source: con.staSlayingPrestigePts,        op: '×' },
      { source: pet.petDwarfQuestPrestigePts,     op: '+' },
      { source: ch.chExpPrestigePts,              op: '+' },
      { source: card.cardCeliosHat,              op: '×' },
      { source: st.perkPrestigePts,               op: '×' },
      { source: sg.starLibraPrestige,          op: '+' },
      { source: U, op: '+', unknown: true },      // Prestige + Store + Cards + Construct + Skins
    ],
  },
  experience_multi: {
    base: 1,
    contributions: [
      { source: sk.ppGoUpExp,                     op: '+' },
      { source: sk.tonsOfDamageExp,               op: '+' },
      { source: sk.polychromePowerExp,            op: '×' },
      { source: it.strawberriesExp,               op: '×' },
      { source: it.goldenStrawberriesExp,         op: '×' },
      { source: art.artExpGainT1,                 op: '+' },
      { source: rel.commonRelicExp,               op: '+' },
      { source: rel.rareRelicExp,                 op: '+' },
      { source: con.staEastwoodExpGain,           op: '×' },
      { source: pet.petDuckExp,                   op: '+' },
      { source: ct.ctExpGainW1,                   op: '+' },
      { source: ch.chExpPrestigePts,              op: '+' },
      { source: card.cardMinerName,               op: '×' },
      { source: st.vpPetTrainerExp,               op: '×' },
      { source: sg.starCapricornExp,           op: '+' },
      { source: sg.ssExpGain,                  op: '+' },
      { source: f.noticeT1ExpGain,             op: '+' },
      { source: arch.idolAthenaExp,            op: '+' },
      { source: up.upgrExpGain,                  op: '+' },
      { source: U, op: '+', unknown: true },      // Prestige + Drones Elixir + Store + Skins
    ],
  },
  floor_clear_requirement_multi: {
    base: 1,
    contributions: [
      { source: sk.easyProgressorFloorClear,      op: '+' },
      { source: art.artFloorClearT2,              op: '+' },
      { source: pet.petDwarfQuestFloorClear,      op: '+' },
      { source: card.cardPrestige,                op: '×' },
      { source: con.staRhythmFloorClear,       op: '+' },
      { source: U, op: '+', unknown: true },      // Skins
    ],
  },
  artifact_cap_increase: {
    base: 0,
    contributions: [
      { source: sk.doTheseUpgradesArtifactCap,    op: '+' },
      { source: con.staSlayingArtifactCap,        op: '+' },
      { source: U, op: '+', unknown: true },      // Cards + Construct
    ],
  },
  artifact_tier4_cap_increase: {
    base: 0,
    contributions: [
      { source: pet.petHappyBotArtifactT4Cap,  op: '+' },
      { source: ch.chDivineRelicCaps,          op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
} satisfies FormulaMap

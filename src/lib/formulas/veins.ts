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
import { challengeSources as ch } from '$lib/sources/challenges'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { droneSources as drone } from '$lib/sources/drones'
import { archaeologySources as arch } from '$lib/sources/archaeology'
import { upgradeSources as up } from '$lib/sources/upgrades'
import { tributesSources as tr } from '$lib/sources/tributes'
import { worldquestsSources as wq } from '$lib/sources/worldquests'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'upgrades',
  fn: () => 0,
  inputs: [],
}

export const veinsFormulas: FormulaMap = defineFormulas({
  vein_spawn_rate_multi: {
    contributions: [
      { source: con.staRandomnessVeinSpawn, op: '+' },
      { source: art.artVeinSpawnT4, op: '+' },
      { source: pet.petTotemVeinSpawn, op: '+' },
      { source: st.vpPetTrainerVeinSpawn, op: '×' },
      { source: drone.droneSuitVeinseekerPassive, op: '+' },
      { source: drone.droneSuitVeinseekerUpgrade, op: '+' },
      { source: sg.starAriesVeinSpawn, op: '+' },
      { source: U, op: '+', unknown: true }, // Prestige + Elixir drone (temp) + Store + Cards
    ],
  },
  vein_income_multi: {
    contributions: [
      { source: sk.leprechaunsLegacyVeinIncome, op: '×' },
      { source: it.iceCreamSuperStarSpawn, op: '×' }, // also affects super star spawn
      { source: rel.legendaryRelicVeinIncome, op: '+' },
      { source: pet.petDuckQuestVeinIncome, op: '+' },
      { source: ct.ctVeinIncomeW2, op: '+' },
      { source: st.vpVeinExtractorVeinIncome, op: '×' },
      { source: st.vpProgressionVeinIncome, op: '×' },
      { source: arch.idolChione, op: '+' },
      { source: up.upgrVeinIncomeMul, op: '+' },
      { source: U, op: '+', unknown: true }, // Cards: Infernal Duck × Infernal Veinseeker
      { source: wq.wqVeinIncomeMultiQ10, op: '×' },
    ],
  },
  golden_vein_chance: {
    contributions: [
      { source: con.staRandomnessGoldenVeinChance, op: '+' },
      { source: pet.petTotemGoldenVeinChance, op: '+' },
      { source: ct.ctGoldenVeinChance, op: '+' },
      { source: st.vpVeinExtractorGoldenVeinChance, op: '+' },
      { source: up.upgrGoldenVeinChance, op: '+' },
      { source: U, op: '+', unknown: true }, // Pets + Stargazing
    ],
  },
  golden_vein_multi: {
    contributions: [
      { source: it.goldenStrawberriesGoldenVein, op: '+' },
      { source: rel.legendaryRelicVeinIncome, op: '+' },
      { source: con.staPropGoldenVeinMul, op: '×' },
      { source: pet.petTotemGoldenVeinMul, op: '+' },
      { source: pet.petDuckQuestGoldenVeinMul, op: '+' },
      { source: ch.chGoldenVeinMul, op: '+' },
      { source: card.cardGoldenVein, op: '×' },
      { source: st.vpVeinExtractorGoldenVeinMul, op: '×' },
      { source: sg.starAriesGoldenVein, op: '+' },
      { source: f.noticeT1GoldenVeinMul, op: '+' },
      { source: up.upgrGoldenVeinMul, op: '+' },
      { source: U, op: '+', unknown: true }, // Drones fueled Veinseeker (temp)
    ],
  },
  rainbow_vein_chance: {
    contributions: [
      { source: ct.ctRainbowVeinMul, op: '+' }, // note: W4 contract is +multi but wiki labels as chance
      { source: st.vpVeinExtractorRainbowVeinChance, op: '+' },
      { source: pet.petTotemSkinRainbowVein, op: '+' },
      { source: con.staRandomnessRainbowVein, op: '+' },
      { source: con.staNatureRainbowVein, op: '+' },
      { source: sg.ssRainbowVeinChance, op: '+' },
      { source: up.upgrRainbowVeinChance, op: '+' },
      { source: U, op: '+', unknown: true }, // Store: Vein Extractor (already wired?)
      { source: wq.wqRainbowVeinChanceQ16, op: '+' },
    ],
  },
  rainbow_vein_multi: {
    contributions: [
      { source: sk.insaneInTheVeinGainRainbowVein, op: '+' },
      { source: card.cardRainbowVein, op: '×' },
      { source: f.noticeT1RainbowVeinMul, op: '+' },
      { source: up.upgrRainbowVeinMul, op: '+' },
    ],
  },
  gleaming_vein_chance: {
    contributions: [
      { source: arch.archGleamingChance, op: '+' },
      { source: U, op: '+', unknown: true }, // Cards: Infernal Dino; Stargazing: BH14
      { source: tr.trGlacialShellstealerT1GVC, op: '+' },
    ],
  },
  gleaming_vein_multi: {
    contributions: [
      { source: drone.coalGleamingVein, op: '+' },
      { source: arch.archGleamingMul, op: '+' },
      { source: U, op: '+', unknown: true }, // Cards: Gleaming Vein Misc Card
      { source: tr.trGlacialShellstealerT2GVM, op: '+' }, // adds to base 5x
    ],
  },
})

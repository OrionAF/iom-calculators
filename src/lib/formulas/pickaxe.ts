import type { FormulaMap, Source } from '$lib/engine/types'
import { defineFormulas } from './define'
import { skillTreeSources as sk } from '$lib/sources/skillTree'
import { relicSources as rel } from '$lib/sources/relics'
import { itemSources as it } from '$lib/sources/items'
import { storeSources as st } from '$lib/sources/store'
import { workshopSources as ws } from '$lib/sources/workshop'
import { contractSources as ct } from '$lib/sources/contracts'
import { artifactSources as art } from '$lib/sources/artifacts'
import { constructSources as con } from '$lib/sources/construct'
import { petSources as pet } from '$lib/sources/pets'
import { cardSources as card } from '$lib/sources/cards'
import { challengeSources as ch } from '$lib/sources/challenges'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { upgradeSources as up } from '$lib/sources/upgrades'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'upgrades',
  fn: () => 0,
  inputs: [],
}

export const pickaxeFormulas: FormulaMap = defineFormulas({
  pickaxe_damage: {
    contributions: [
      // ── Skill-Tree (additive) ─────────────────────────────────────────
      { source: sk.swingHarderDamage, op: '+' },
      { source: sk.superDamageDamage, op: '+' },
      { source: sk.relicRampageDamage, op: '+' },
      // ── Items ──────────────────────────────────────────────────────────
      { source: it.rockCake, op: '+' },
      { source: it.primalMeatPickaxe, op: '+' },
      { source: it.goldenPrimalMeatPickaxe, op: '+' },
      { source: it.hamburgerPickaxe, op: '×' },
      { source: it.goldenHamburgerPickaxe, op: '×' },
      // ── Workshop ───────────────────────────────────────────────────────
      { source: ws.wsPickaxeDmgW1, op: '+' },
      { source: ws.wsPickaxeDmgW3, op: '×' },
      { source: ws.wsPickaxeBombDmgW4, op: '×' },
      // ── Contracts ──────────────────────────────────────────────────────
      { source: ct.ctPickaxeDmgPerContract, op: '+' },
      { source: ct.ctPickaxeDmgW1, op: '+' },
      { source: ct.ctPickaxeBombDmgW3, op: '×' },
      // ── Prestige Artifacts ─────────────────────────────────────────────
      { source: art.artPickaxeDmgT1, op: '+' },
      { source: art.artPickaxeDmgT2, op: '+' },
      { source: art.artPickaxeDmgT3, op: '+' },
      { source: art.artPickaxeDmgT4, op: '+' }, // fn uses rt.statueCount
      // ── Construct Statues ─────────────────────────────────────────────
      { source: con.staRhythmPickaxe, op: '×' },
      { source: con.staCraftPickaxeDmg, op: '×' },
      { source: con.staComfortDmg, op: '+' }, // fn uses rt.w4StatueCount
      { source: con.staRodentiaPickaxe, op: '+' }, // fn uses rt.w4StatueCount
      // ── Pets ───────────────────────────────────────────────────────────
      { source: pet.petDwarfPickaxeDmg, op: '+' },
      { source: pet.petWhalePickaxeDmg, op: '+' },
      { source: pet.petDinoPickaxeDmg, op: '×' },
      // ── Cards ──────────────────────────────────────────────────────────
      { source: card.cardAlex, op: '×' },
      // ── Relics ─────────────────────────────────────────────────────────
      { source: rel.commonRelicPickaxeDamage, op: '+' },
      { source: rel.epicRelicPickaxeDamage, op: '+' },
      // ── Skill-Tree (multiplicative) ────────────────────────────────────
      { source: sk.waitMyUltraCritsCanCritDamage, op: '×' },
      { source: sk.tonsOfDamageDamage, op: '×' },
      { source: sk.polychromePowerDamage, op: '×' },
      { source: sk.idleObeliskMincerDamage, op: '×' },
      // ── Store ──────────────────────────────────────────────────────────
      { source: st.gemPickaxeDamage, op: '×' },
      // ── Challenges ──────────────────────────────────────────────────────────
      { source: ch.chPickaxeDmgPerChallenge, op: '+' },
      { source: ch.chPickaxeDmgPerSkillNode, op: '+' },
      { source: ch.chPickaxeDmgPerObelisk, op: '+' },
      // ── Stargazing ───────────────────────────────────────────────────────────
      { source: sg.starTaurusPickaxeDmg, op: '+' },
      { source: sg.starScorpioPickaxeDmg, op: '+' },
      // ── Fishing ──────────────────────────────────────────────────────────────
      { source: f.noticeT1PickaxeDmg, op: '+' },
      // ── Upgrades ─────────────────────────────────────────────────────────
      { source: up.upgrUpgradePickaxe, op: '+' },
      { source: up.upgrPickaxeDmg1, op: '+' },
      { source: up.upgrPickaxeDmg2, op: '+' },
      { source: up.upgrPickaxeDmg3, op: '+' },
      { source: up.upgrPickaxeDmg4, op: '+' },
      { source: up.upgrPickaxeDmg5, op: '+' },
      { source: up.upgrPickaxeDmgPerCard, op: '+' },
      { source: up.upgrPickaxeDmgPerStatue1, op: '+' },
      { source: up.upgrPickaxeDmgPerStatue2, op: '+' },
      { source: up.upgrPickaxeDmgPerPolyCard, op: '+' },
      { source: up.upgrPickaxeDmgMul1, op: '×' },
      { source: up.upgrPickaxeDmgMul2, op: '×' },
      { source: up.upgrPickaxeDmgMul3, op: '×' },
      { source: up.upgrPickaxeAndBombDmgW3, op: '×' },
      { source: up.upgrPickaxeAndBombDmgW4, op: '×' },
    ],
  },
  pickaxe_attack_speed_per_second: {
    contributions: [
      { source: it.bananaCoffee, op: '×' },
      { source: up.upgrAttackSpeed1, op: '+' },
      { source: up.upgrAttackSpeed2, op: '+' },
    ],
  },
  pickaxe_radius_percent: {
    contributions: [
      { source: sk.superDamageRadius, op: '+' },
      { source: it.bread, op: '×' },
      { source: art.artPickaxeRadiusT1, op: '+' },
      { source: up.upgrPickaxeRadius, op: '+' },
    ],
  },
  pickaxe_crit_chance: {
    contributions: [
      { source: sk.luckyStrikesCritChance, op: '+' },
      { source: it.apple, op: '+' },
      { source: it.juicyPlumsCritChance, op: '+' },
      { source: up.upgrCritChance1, op: '+' },
      { source: up.upgrCritChance2, op: '+' },
      { source: up.upgrCritChance3, op: '+' },
    ],
  },
  pickaxe_crit_damage: {
    contributions: [
      { source: sk.luckyStrikesCritDamage, op: '+' },
      { source: sk.superDamageCritDamage, op: '+' },
      { source: it.pike, op: '+' },
      { source: it.juicyPlumsCritDamage, op: '+' },
      { source: ct.ctPickaxeCritDmg, op: '+' },
      { source: up.upgrCritDmg1, op: '+' },
      { source: up.upgrCritDmg2, op: '+' },
    ],
  },
  pickaxe_super_crit_chance: {
    contributions: [
      { source: sk.waitMyCritsCanCrit, op: '+' },
      { source: art.artPickaxeSuperCritT2, op: '+' },
      { source: ct.ctPickaxeSuperCrit, op: '+' },
      { source: ch.chPickaxeSuperCritChance, op: '+' },
      { source: ch.chPickaxeBombSuperCrit, op: '+' },
      { source: up.upgrSuperCritChance1, op: '+' },
      { source: up.upgrSuperCritChance2, op: '+' },
    ],
  },
  pickaxe_super_crit_damage: {
    contributions: [
      { source: ct.ctPickaxeDmgPerContract, op: '+' },
      { source: up.upgrSuperCritDmg, op: '+' },
    ],
  },
  pickaxe_ultra_crit_chance: {
    contributions: [
      { source: sk.waitMySuperCritsCanCrit, op: '+' },
      { source: sk.tonsOfDamageUltraCrit, op: '+' },
      { source: pet.petDwarfUltraCrit, op: '+' },
      { source: ct.ctUltraCritChance, op: '+' },
      { source: up.upgrUltraCritChance1, op: '+' },
      { source: up.upgrUltraCritChance2, op: '+' },
    ],
  },
  pickaxe_ultra_crit_damage: { contributions: [{ source: U, op: '+', unknown: true }] },
  pickaxe_omega_crit_chance: {
    contributions: [
      { source: sk.waitMyUltraCritsCanCritOmega, op: '+' },
      { source: art.artOmegaCritT4, op: '+' },
      { source: ct.ctOmegaCritChance, op: '+' },
      { source: up.upgrOmegaCritChance, op: '+' },
    ],
  },
  pickaxe_omega_crit_damage: { contributions: [{ source: U, op: '+', unknown: true }] },
})

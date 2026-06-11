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
import { droneSources as drone } from '$lib/sources/drones'
import { fishingSources as f } from '$lib/sources/fishing'
import { stargazingSources as sg } from '$lib/sources/stargazing'
import { challengeSources as ch } from '$lib/sources/challenges'
import { upgradeSources as up } from '$lib/sources/upgrades'

const U: Source = {
  key: '_unknown',
  name: 'Unknown source',
  system: 'upgrades',
  fn: () => 0,
  inputs: [],
}

export const bombsFormulas: FormulaMap = defineFormulas({
  bomb_damage: {
    contributions: [
      // ── Skill-Tree (additive) ──────────────────────────────────────────
      { source: sk.biggerBlastsDamage, op: '+' },
      { source: sk.arsenalAdvancementDamage, op: '+' },
      { source: sk.allRoundBomberDamage, op: '+' },
      { source: sk.flamboyantBombsDamage, op: '+' },
      // ── Items ────────────────────────────────────────────────────────
      { source: it.chaosTotemBombDamage, op: '×' },
      { source: it.goldenChaosTotemBombDamage, op: '×' },
      { source: it.hamburgerBomb, op: '×' },
      { source: it.goldenHamburgerBomb, op: '×' },
      // ── Relics ───────────────────────────────────────────────────────
      { source: rel.rareRelicBombDamage, op: '+' },
      // ── Workshop ─────────────────────────────────────────────────────
      { source: ws.wsBombDmgW1, op: '+' },
      { source: ws.wsBombDmgW2, op: '+' },
      { source: ws.wsBombDmgW3, op: '×' },
      { source: ws.wsPickaxeBombDmgW4, op: '×' },
      // ── Contracts ────────────────────────────────────────────────────
      { source: ct.ctBombDmgPerContract, op: '+' },
      { source: ct.ctPickaxeBombDmgW3, op: '×' },
      // ── Prestige Artifacts ────────────────────────────────────────────
      { source: art.artBombDmgT1, op: '+' },
      { source: art.artBombDmgT2, op: '+' },
      { source: art.artBombDmgT3, op: '+' },
      { source: art.artBombDmgT4, op: '+' }, // fn uses rt.statueCount
      // ── Construct Statues ─────────────────────────────────────────────
      { source: con.staAwarenessBombDmg, op: '×' },
      { source: con.staPropBombDmg, op: '×' },
      { source: con.staComfortDmg, op: '+' }, // fn uses rt.w4StatueCount
      // ── Cards ────────────────────────────────────────────────────────
      { source: card.cardBone, op: '×' },
      // ── Store ────────────────────────────────────────────────────────
      { source: st.perkBombDamage, op: '×' },
      { source: st.gemBombDamage, op: '+' },
      // ── Drones ────────────────────────────────────────────────────────
      { source: drone.droneSuitBearUpgrade, op: '+' },
      // ── Fishing ──────────────────────────────────────────────────────────
      { source: f.noticeT1BombDmg, op: '+' },
      { source: up.upgrBombDmg1, op: '+' },
      { source: up.upgrBombDmg2, op: '+' },
      { source: up.upgrBombDmg3, op: '+' },
      { source: up.upgrBombDmgMul1, op: '×' },
      { source: up.upgrBombDmgMul2, op: '×' },
      { source: up.upgrBombDmgMul3, op: '×' },
      { source: up.upgrPickaxeAndBombDmgW3, op: '×' },
      { source: up.upgrPickaxeAndBombDmgW4, op: '×' },
    ],
  },
  bomb_crit_chance: {
    contributions: [
      { source: sk.allRoundBomberCritChance, op: '+' },
      { source: rel.commonRelicBombCrit, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  bomb_crit_damage: {
    contributions: [
      { source: rel.commonRelicBombCritDamage, op: '+' },
      { source: art.artBombDmgT1, op: '+' },
      { source: ch.chBombCritDmg, op: '+' },
      { source: up.upgrBombCritDmg1, op: '+' },
      { source: up.upgrBombCritDmg2, op: '+' },
    ],
  },
  bomb_recharge_speed: {
    contributions: [
      { source: sk.allRoundBomberRecharge, op: '+' },
      { source: sk.leprechaunsLegacyBombRecharge, op: '×' },
      { source: it.chaosTotemBombRecharge, op: '×' },
      { source: it.goldenChaosTotemBombRecharge, op: '×' },
      { source: ws.wsBombRechargeW4, op: '+' },
      { source: ct.ctBombRechargeW1, op: '+' },
      { source: pet.petCrabBombRecharge, op: '+' },
      { source: rel.epicRelicBombRecharge, op: '+' },
      { source: st.vpProgressionBombRecharge, op: '×' },
      { source: st.vpBomberBombRecharge, op: '×' },
      { source: sg.starVirgoRecharge, op: '+' },
      { source: f.noticeT1BombRecharge, op: '+' },
      { source: up.upgrBombRechargeRate, op: '+' },
      { source: U, op: '+', unknown: true }, // Drones Elixir + Lootbugs
    ],
  },
  bomb_free_chance: {
    contributions: [
      { source: sk.arsenalAdvancementFreeBomb, op: '+' },
      { source: sk.demolitionExpertFreeBomb, op: '+' },
      { source: up.upgrFreeBombChance, op: '+' },
    ],
  },
  bomb_capacity: {
    contributions: [
      { source: sk.arsenalAdvancementCapacity, op: '+' },
      { source: sk.flamboyantBombsCapacity, op: '+' },
      { source: sk.chronokeeperBombCapacity, op: '+' },
      { source: art.artBombCapT3, op: '+' },
      { source: rel.epicRelicBombCapacity, op: '+' },
      { source: pet.petCrabBombCap, op: '+' },
      { source: st.gemBombCapacity, op: '+' },
      { source: st.vpBomberBombCapacity, op: '×' },
      { source: ch.chBombCap, op: '+' },
      { source: U, op: '+', unknown: true }, // Bombs: Battery + Store Founder
    ],
  },
  bomb_cap_multiplier: {
    contributions: [
      { source: con.staAppetiteBombCap, op: '×' },
      { source: U, op: '+', unknown: true }, // Workshop Bomb Battery Cap
    ],
  },
  bomb_super_crit_chance: {
    contributions: [
      { source: sk.demolitionExpertSuperCrit, op: '+' },
      { source: art.artBombSuperCritT3, op: '+' },
      { source: ch.chBombSuperCrit, op: '+' },
      { source: ch.chPickaxeBombSuperCrit, op: '+' },
      { source: U, op: '+', unknown: true }, // Items (Rock Cake + Cassandra Idol)
    ],
  },
  bomb_super_crit_damage: { contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_ultra_crit_chance: {
    contributions: [
      { source: sk.flamboyantBombsUltraCrit, op: '+' },
      { source: con.staAwarenessUltraCrit, op: '+' },
      { source: ct.ctUltraCritChance, op: '+' },
      { source: ch.chBombUltraCritRegular, op: '+' },
      { source: ch.chBombUltraCritExtreme, op: '+' },
      { source: up.upgrBombUltraCrit1, op: '+' },
      { source: up.upgrBombUltraCrit2, op: '+' },
    ],
  },
  bomb_ultra_crit_damage: { contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_omega_crit_chance: {
    contributions: [
      { source: ct.ctOmegaCritChance, op: '+' },
      { source: up.upgrBombOmegaCrit, op: '+' },
    ],
  },
  bomb_omega_crit_damage: { contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_cherry3x_chance: { contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_battery_cap_increases: { contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_additional_multiplier: {
    contributions: [
      { source: rel.mythicRelicBombMulti, op: '+' },
      { source: U, op: '+', unknown: true }, // Workshop
    ],
  },
  bomb_workshop_cap_increase: {
    contributions: [
      { source: sk.doTheseUpgradesWorkshopCap, op: '+' },
      { source: sk.idleObeliskMincerWorkshopCap, op: '+' },
      { source: pet.petCrabSkinWorkshopCap, op: '+' },
      { source: sg.starLeo, op: '+' },
      { source: U, op: '+', unknown: true }, // Construct (no workshop_upgrade_cap key) + Fishing
    ],
  },
  bomb_of_plenty_make_gold_chance: { contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_of_plenty_multi: {
    contributions: [
      { source: st.founderBomBofPlenty, op: '+' },
      { source: st.vpBomberBopMulti, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
  bomb_trans_apply_bop_chance: { contributions: [{ source: U, op: '+', unknown: true }] },
  bomb_transmuter_multi: {
    contributions: [
      { source: st.vpBomberTransmuterMulti, op: '+' },
      { source: U, op: '+', unknown: true },
    ],
  },
})

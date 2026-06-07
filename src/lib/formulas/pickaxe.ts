import type { FormulaMap, Source } from '$lib/engine/types'
import { skillTreeSources as sk } from '$lib/sources/skillTree'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const pickaxeFormulas = {
  // Prestige(+×) + Items(+×) + Relics(+) + Store(×) + Workshop(×) + SkillTree(+×) + Challenges(+) + Cards(×) + Pets(+×) + Construct(×) + Stargazing(+) + Fishing(Notice×) + Upgrades(+×) + Contracts(+×)
  pickaxe_damage: {
    base: 0,
    contributions: [
      { source: sk.swingHarderDamage,                op: '+' },
      { source: sk.superDamageDamage,                op: '+' },
      { source: sk.relicRampageDamage,               op: '+' },
      { source: sk.waitMyUltraCritsCanCritDamage,    op: '×' },
      { source: sk.tonsOfDamageDamage,               op: '×' },
      { source: sk.polychromePowerDamage,             op: '×' },
      { source: sk.idleObeliskMincerDamage,           op: '×' },
      { source: U, op: '+', unknown: true },  // Prestige: Tier 1-4 Artifacts
      { source: U, op: '+', unknown: true },  // Items: Rock Cake, Primal Meat, Hamburger
      { source: U, op: '+', unknown: true },  // Relics: Common + Epic
      { source: U, op: '×', unknown: true },  // Store: Gem Upgrade + Founder Bundle
      { source: U, op: '×', unknown: true },  // Workshop: World 1/3/4 upgrades
      { source: U, op: '+', unknown: true },  // Challenges
      { source: U, op: '×', unknown: true },  // Cards
      { source: U, op: '+', unknown: true },  // Pets
      { source: U, op: '×', unknown: true },  // Construct: 3 statues
      { source: U, op: '+', unknown: true },  // Stargazing: Taurus + Scorpio
      { source: U, op: '+', unknown: true },  // Fishing: Tier 1 Notice upgrade
      { source: U, op: '+', unknown: true },  // Upgrades: base + many bars
      { source: U, op: '+', unknown: true },  // Contracts
    ],
  },
  pickaxe_attack_speed_per_second: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },  // Upgrades: Gold + VR-ERROR
      { source: U, op: '+', unknown: true },  // Items: Banana Coffee
    ],
  },
  pickaxe_radius_percent: {
    base: 0,
    contributions: [
      { source: sk.superDamageRadius, op: '+' },
      { source: U, op: '+', unknown: true },  // Prestige + Items + Upgrades
    ],
  },
  pickaxe_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.luckyStrikesCritChance,     op: '+' },
      { source: sk.allRoundBomberCritChance,   op: '+' },  // bomb skill also gives pickaxe crit? No — check wiki
      { source: U, op: '+', unknown: true },  // Items: Apple, Juicy Plums
      { source: U, op: '+', unknown: true },  // Upgrades: Tin Pickaxe + Crit Chance + Halium
    ],
  },
  pickaxe_crit_damage: {
    base: 0,
    contributions: [
      { source: sk.luckyStrikesCritDamage,  op: '+' },
      { source: sk.superDamageCritDamage,   op: '+' },
      { source: U, op: '+', unknown: true },  // Relics + Challenges + Upgrades
    ],
  },
  pickaxe_super_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMyCritsCanCrit,   op: '+' },
      { source: U, op: '+', unknown: true },  // Prestige + Items + Challenges
    ],
  },
  pickaxe_super_crit_damage: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },
    ],
  },
  pickaxe_ultra_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMySuperCritsCanCrit,      op: '+' },
      { source: sk.tonsOfDamageUltraCrit,        op: '+' },
      { source: U, op: '+', unknown: true },  // Items + Challenges + Construct + Upgrades + Contracts
    ],
  },
  pickaxe_ultra_crit_damage: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },
    ],
  },
  pickaxe_omega_crit_chance: {
    base: 0,
    contributions: [
      { source: sk.waitMyUltraCritsCanCritOmega, op: '+' },
      { source: U, op: '+', unknown: true },  // Upgrades + Contracts
    ],
  },
  pickaxe_omega_crit_damage: {
    base: 0,
    contributions: [
      { source: U, op: '+', unknown: true },
    ],
  },
} satisfies FormulaMap

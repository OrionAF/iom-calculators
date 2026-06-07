import type { FormulaMap, Source } from '$lib/engine/types'

const U: Source = { key: '_unknown', name: 'Unknown source', system: 'upgrades', fn: () => 0, inputs: [] }

export const pickaxeFormulas = {
  // Pickaxe Damage: Prestige(+×) + Items(+×) + Relics(+) + Store(×) + Workshop(×) + SkillTree(+×) + Challenges(+) + Cards(×) + Pets(+×) + Construct(×) + Stargazing(+) + Fishing(Notice×) + Upgrades(+×) + Contracts(+×)
  pickaxe_damage:            { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Pickaxe Attack Speed: Upgrades(+) + Items
  pickaxe_attack_speed_per_second: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Pickaxe Radius: Prestige(×) + Items(×) + SkillTree(×) + Upgrades(×)
  pickaxe_radius_percent:    { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Pickaxe Crit Chance: Items(+) + SkillTree(+) + Upgrades(+)
  pickaxe_crit_chance:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Pickaxe Crit Damage: Items + Relics + SkillTree + Challenges + Upgrades
  pickaxe_crit_damage:       { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Super Crit: Prestige + Items + SkillTree + Challenges
  pickaxe_super_crit_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pickaxe_super_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Ultra Crit: SkillTree + Challenges + ...
  pickaxe_ultra_crit_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pickaxe_ultra_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  // Omega Crit: Upgrades + Contracts
  pickaxe_omega_crit_chance: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
  pickaxe_omega_crit_damage: { base: 0, contributions: [{ source: U, op: '+', unknown: true }] },
} satisfies FormulaMap

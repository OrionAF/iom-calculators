import { derived } from 'svelte/store'
import { storeProgress } from './storeProgress'
import { skillProgress } from './skillProgress'
import { VALUE_PACKS, PERKS, GEM_UNLOCKS, GEM_UPGRADES } from '$lib/store/catalog'

/**
 * Unified progress: source key → level.
 *
 * This is the single bridge between the data pages (Store, Skills — which
 * write their own persisted stores) and the formula engine (which looks up
 * levels by Source.key). Formulas and calculators never read page state
 * directly; they read this map.
 *
 * Levels mean: value packs/perks/unlocks owned = 1, gem upgrades = rank,
 * founder = current tier, skills = skill level.
 */

// Skill ids map to 'skillTree.<lowerCamel(id)>' source keys, with a few
// historical exceptions where the source key diverges from the skill id.
const SKILL_KEY_OVERRIDES: Record<string, string> = {
  PPGoUp: 'ppGoUp',
  CtrlF: 'ctrlFStars',
  CtrlCCtrlV: 'ctrlCCtrlVStars',
}

export function skillSourceKey(skillId: string): string {
  const stem = SKILL_KEY_OVERRIDES[skillId] ?? skillId.charAt(0).toLowerCase() + skillId.slice(1)
  return `skillTree.${stem}`
}

export const progressLevels = derived([storeProgress, skillProgress], ([$store, $skills]) => {
  const levels: Record<string, number> = {}

  for (const [id, level] of Object.entries($skills)) {
    if (level > 0) levels[skillSourceKey(id)] = level
  }

  for (const pack of VALUE_PACKS) {
    const owned = pack.mirrorUnlockKey
      ? $store.unlocks[pack.mirrorUnlockKey] === true
      : $store.valuePacks[pack.slug] === true
    if (!owned) continue
    for (const e of pack.effects) if (e.source) levels[e.source.key] = 1
  }

  for (const unlock of GEM_UNLOCKS) {
    if ($store.unlocks[unlock.mirrorUnlockKey] !== true) continue
    for (const e of unlock.effects) if (e.source) levels[e.source.key] = 1
  }

  for (const perk of PERKS) {
    if ($store.perks[perk.slug] !== true) continue
    for (const e of perk.effects) if (e.source) levels[e.source.key] = 1
  }

  for (const upgrade of GEM_UPGRADES) {
    const rank = $store.gemUpgrades[upgrade.slug] ?? 0
    if (rank <= 0) continue
    for (const e of upgrade.effects) if (e.source) levels[e.source.key] = rank
  }

  // All founder effects share one source key; its level is the tier.
  if ($store.founder.tier > 0) levels['store.founder'] = $store.founder.tier

  return levels
})

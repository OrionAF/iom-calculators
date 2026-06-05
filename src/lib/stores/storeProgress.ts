import { get } from 'svelte/store'
import { persistedStore } from '$lib/storage/persistedStore'
import {
  VALUE_PACKS,
  PERKS,
  PERK_BUNDLES,
  GEM_UPGRADES,
} from '$lib/store/catalog'

// ─── Slug & key types (derived from catalog) ─────────────────────────────

export type ValuePackSlug   = typeof VALUE_PACKS[number]['slug']
export type PerkSlug        = typeof PERKS[number]['slug']
export type PerkBundleSlug  = typeof PERK_BUNDLES[number]['slug']
export type GemUpgradeSlug  = typeof GEM_UPGRADES[number]['slug']

export type SharedUnlockKey =
  | 'unlocked_permanent_drone'
  | 'unlocked_megabomb'
  | 'unlocked_transmuter_bomb'
  | 'unlocked_battery_bomb'

// ─── State shape ─────────────────────────────────────────────────────────

export interface StoreProgress {
  valuePacks:  Partial<Record<ValuePackSlug,  boolean>>
  perks:       Partial<Record<PerkSlug,       boolean>>
  gemUpgrades: Partial<Record<GemUpgradeSlug, number>>
  unlocks:     Record<SharedUnlockKey, boolean>
  founder: {
    tier: number
    bundlePurchased: boolean
  }
}

const DEFAULTS: StoreProgress = {
  valuePacks:  {},
  perks:       {},
  gemUpgrades: {},
  unlocks: {
    unlocked_permanent_drone: false,
    unlocked_megabomb:        false,
    unlocked_transmuter_bomb: false,
    unlocked_battery_bomb:    false,
  },
  founder: { tier: 0, bundlePurchased: false },
}

const STORAGE_KEY = 'iom-store-progress'

// ─── Migration & validation ──────────────────────────────────────────────

function defaultUnlocks(): Record<SharedUnlockKey, boolean> {
  return {
    unlocked_permanent_drone: false,
    unlocked_megabomb:        false,
    unlocked_transmuter_bomb: false,
    unlocked_battery_bomb:    false,
  }
}

const VALID_UNLOCK_KEYS: ReadonlySet<SharedUnlockKey> = new Set([
  'unlocked_permanent_drone',
  'unlocked_megabomb',
  'unlocked_transmuter_bomb',
  'unlocked_battery_bomb',
])

/**
 * Accept either the new nested shape OR the legacy flat blob:
 *   { value_pack_*: bool, perk_*: bool, gem_upgrade_*: number,
 *     unlocked_*: bool, founder_tier: number, founders_bundle_purchased: bool }
 * Coerces unknown shapes into a fresh defaults clone. Exported for testing.
 */
export function migrateStoreProgress(parsed: unknown): StoreProgress {
  if (parsed === null || typeof parsed !== 'object') {
    return structuredClone(DEFAULTS)
  }
  const p = parsed as Record<string, unknown>

  // New shape: has at least one of the nested slice keys.
  if ('valuePacks' in p || 'perks' in p || 'gemUpgrades' in p || 'founder' in p) {
    return {
      valuePacks:  isPlainObject(p.valuePacks)  ? (p.valuePacks  as Partial<Record<ValuePackSlug,  boolean>>) : {},
      perks:       isPlainObject(p.perks)       ? (p.perks       as Partial<Record<PerkSlug,       boolean>>) : {},
      gemUpgrades: isPlainObject(p.gemUpgrades) ? (p.gemUpgrades as Partial<Record<GemUpgradeSlug, number>>)  : {},
      unlocks:     mergeUnlocks(p.unlocks),
      founder:     mergeFounder(p.founder),
    }
  }

  // Legacy flat blob.
  const valuePacks:  Partial<Record<ValuePackSlug,  boolean>> = {}
  const perks:       Partial<Record<PerkSlug,       boolean>> = {}
  const gemUpgrades: Partial<Record<GemUpgradeSlug, number>>  = {}
  const unlocks = defaultUnlocks()
  let tier = 0
  let bundlePurchased = false

  for (const [k, v] of Object.entries(p)) {
    if (k.startsWith('value_pack_') && typeof v === 'boolean') {
      valuePacks[k.slice('value_pack_'.length) as ValuePackSlug] = v
    } else if (k.startsWith('perk_') && typeof v === 'boolean') {
      perks[k.slice('perk_'.length) as PerkSlug] = v
    } else if (k.startsWith('gem_upgrade_') && typeof v === 'number') {
      gemUpgrades[k.slice('gem_upgrade_'.length) as GemUpgradeSlug] = v
    } else if (VALID_UNLOCK_KEYS.has(k as SharedUnlockKey) && typeof v === 'boolean') {
      unlocks[k as SharedUnlockKey] = v
    } else if (k === 'founder_tier' && typeof v === 'number') {
      tier = v
    } else if (k === 'founders_bundle_purchased' && typeof v === 'boolean') {
      bundlePurchased = v
    }
  }

  return { valuePacks, perks, gemUpgrades, unlocks, founder: { tier, bundlePurchased } }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function mergeUnlocks(raw: unknown): Record<SharedUnlockKey, boolean> {
  const out = defaultUnlocks()
  if (!isPlainObject(raw)) return out
  for (const k of VALID_UNLOCK_KEYS) {
    if (typeof raw[k] === 'boolean') out[k] = raw[k] as boolean
  }
  return out
}

function mergeFounder(raw: unknown): { tier: number; bundlePurchased: boolean } {
  if (!isPlainObject(raw)) return { tier: 0, bundlePurchased: false }
  const tier = typeof raw.tier === 'number' ? raw.tier : 0
  const bundlePurchased = typeof raw.bundlePurchased === 'boolean' ? raw.bundlePurchased : false
  return { tier, bundlePurchased }
}

// ─── Store ───────────────────────────────────────────────────────────────

const _store = persistedStore<StoreProgress>(STORAGE_KEY, DEFAULTS, migrateStoreProgress)

export const storeProgress = { subscribe: _store.subscribe }

// ─── Value packs ─────────────────────────────────────────────────────────

export function setValuePack(slug: ValuePackSlug, owned: boolean): void {
  _store.update(s => ({ ...s, valuePacks: { ...s.valuePacks, [slug]: owned } }))
}

export function toggleValuePack(slug: ValuePackSlug): void {
  _store.update(s => ({
    ...s,
    valuePacks: { ...s.valuePacks, [slug]: !s.valuePacks[slug] },
  }))
}

// ─── Shared unlocks (Value Pack ↔ Gem Unlock mirror) ─────────────────────

export function setUnlock(key: SharedUnlockKey, owned: boolean): void {
  _store.update(s => ({ ...s, unlocks: { ...s.unlocks, [key]: owned } }))
}

export function toggleUnlock(key: SharedUnlockKey): void {
  _store.update(s => ({ ...s, unlocks: { ...s.unlocks, [key]: !s.unlocks[key] } }))
}

// ─── Perks ───────────────────────────────────────────────────────────────

export function setPerk(slug: PerkSlug, owned: boolean): void {
  _store.update(s => ({ ...s, perks: { ...s.perks, [slug]: owned } }))
}

// ─── Perk bundles (derived from perks; toggling rewrites both perks) ────

export type PerkBundleState = 'unowned' | 'partial' | 'owned'

function computePerkBundleState(bundleSlug: PerkBundleSlug): PerkBundleState {
  const bundle = PERK_BUNDLES.find(b => b.slug === bundleSlug)
  if (!bundle) return 'unowned'
  const s = get(_store)
  const owned = bundle.perkSlugs.filter(slug => s.perks[slug as PerkSlug] === true).length
  if (owned === bundle.perkSlugs.length) return 'owned'
  if (owned > 0) return 'partial'
  return 'unowned'
}

export function togglePerkBundle(bundleSlug: PerkBundleSlug): void {
  const bundle = PERK_BUNDLES.find(b => b.slug === bundleSlug)
  if (!bundle) return
  const newOwned = computePerkBundleState(bundleSlug) !== 'owned'
  _store.update(s => {
    const perks = { ...s.perks }
    for (const slug of bundle.perkSlugs) perks[slug as PerkSlug] = newOwned
    return { ...s, perks }
  })
}

// ─── Founder ─────────────────────────────────────────────────────────────

export function setFoundersBundlePurchased(purchased: boolean): void {
  _store.update(s => ({ ...s, founder: { ...s.founder, bundlePurchased: purchased } }))
}

export function setFounderTier(tier: number): void {
  if (tier < 0) tier = 0
  if (tier > 12) tier = 12

  _store.update(s => {
    const next: StoreProgress = { ...s, founder: { ...s.founder, tier } }
    // Cascade: going UP and away from 0 auto-fills the prereqs.
    // Going down does NOT clear anything (sticky ownership).
    if (tier > 0 && tier > s.founder.tier) {
      next.perks = {
        ...s.perks,
        '2x_ore_income':            true,
        '2x_prestige_point_income': true,
        '2x_bar_income':            true,
        '3x_bomb_damage':           true,
      }
      next.founder.bundlePurchased = true
    }
    return next
  })
}

// ─── Gem upgrades (numeric ranks, clamped to [0, maxLevel]) ─────────────

export function setGemUpgradeRank(slug: GemUpgradeSlug, rank: number): void {
  const upgrade = GEM_UPGRADES.find(u => u.slug === slug)
  const maxLevel = upgrade?.maxLevel ?? 0
  if (rank < 0) rank = 0
  if (rank > maxLevel) rank = maxLevel
  _store.update(s => ({ ...s, gemUpgrades: { ...s.gemUpgrades, [slug]: rank } }))
}

// ─── Reset ───────────────────────────────────────────────────────────────

export function resetStoreProgress(): void {
  _store.reset()
}

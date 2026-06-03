import { writable } from 'svelte/store'
import { PERK_BUNDLES, GEM_UPGRADES } from '$lib/store/catalog'

// Storage is a single flat blob. Boolean and numeric values keyed by stable strings.
// Key prefixes: value_pack_*, gem_upgrade_*, plus the fixed defaults below.
export type StoreProgress = Record<string, boolean | number>

const FIXED_DEFAULTS: StoreProgress = {
  unlocked_permanent_drone: false,
  unlocked_megabomb: false,
  unlocked_transmuter_bomb: false,
  unlocked_battery_bomb: false,
  perk_2x_ore_income: false,
  perk_2x_prestige_point_income: false,
  perk_2x_bar_income: false,
  perk_3x_bomb_damage: false,
  founders_bundle_purchased: false,
  founder_tier: 0,
}

const STORAGE_KEY = 'iom-store-progress'

function readStorage(): StoreProgress {
  if (typeof window === 'undefined') return { ...FIXED_DEFAULTS }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...FIXED_DEFAULTS }
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      return { ...FIXED_DEFAULTS, ...parsed }
    }
    return { ...FIXED_DEFAULTS }
  } catch {
    return { ...FIXED_DEFAULTS }
  }
}

function writeStorage(value: StoreProgress): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Storage unavailable — keep in-memory only
  }
}

const _store = writable<StoreProgress>(readStorage())

_store.subscribe(value => writeStorage(value))

export const storeProgress = { subscribe: _store.subscribe }

// ─── Value packs ───────────────────────────────────────────────────────────

export function setValuePack(slug: string, owned: boolean): void {
  _store.update(s => ({ ...s, [`value_pack_${slug}`]: owned }))
}

export function toggleValuePack(slug: string): void {
  _store.update(s => ({ ...s, [`value_pack_${slug}`]: !s[`value_pack_${slug}`] }))
}

// ─── Shared unlocks (Value Pack ↔ Gem Unlock mirror) ──────────────────────

export type SharedUnlockKey =
  | 'unlocked_permanent_drone'
  | 'unlocked_megabomb'
  | 'unlocked_transmuter_bomb'
  | 'unlocked_battery_bomb'

export function setUnlock(key: SharedUnlockKey, owned: boolean): void {
  _store.update(s => ({ ...s, [key]: owned }))
}

export function toggleUnlock(key: SharedUnlockKey): void {
  _store.update(s => ({ ...s, [key]: !s[key] }))
}

// ─── Perks ─────────────────────────────────────────────────────────────────

export function setPerk(slug: string, owned: boolean): void {
  _store.update(s => ({ ...s, [`perk_${slug}`]: owned }))
}

// ─── Perk bundles (derived from perks; toggling rewrites both perks) ──────

export type PerkBundleState = 'unowned' | 'partial' | 'owned'

export function getPerkBundleState(bundleSlug: string): PerkBundleState {
  const bundle = PERK_BUNDLES.find(b => b.slug === bundleSlug)
  if (!bundle) return 'unowned'
  let s: StoreProgress
  // Synchronously read current value — Svelte's subscribe contract is to call back
  // synchronously with the current value, then return an unsubscribe function.
  _store.subscribe(v => { s = v })()
  const owned = bundle.perkSlugs.filter(slug => s![`perk_${slug}`] === true).length
  if (owned === 2) return 'owned'
  if (owned === 1) return 'partial'
  return 'unowned'
}

export function togglePerkBundle(bundleSlug: string): void {
  const bundle = PERK_BUNDLES.find(b => b.slug === bundleSlug)
  if (!bundle) return
  const currentState = getPerkBundleState(bundleSlug)
  const newOwned = currentState !== 'owned'
  _store.update(s => {
    const next = { ...s }
    for (const slug of bundle.perkSlugs) {
      next[`perk_${slug}`] = newOwned
    }
    return next
  })
}

// ─── Founder ───────────────────────────────────────────────────────────────

export function setFoundersBundlePurchased(purchased: boolean): void {
  _store.update(s => ({ ...s, founders_bundle_purchased: purchased }))
}

export function setFounderTier(tier: number): void {
  if (tier < 0) tier = 0
  if (tier > 12) tier = 12

  _store.update(s => {
    const currentTier = (s.founder_tier as number) ?? 0
    const next: StoreProgress = { ...s, founder_tier: tier }
    // Cascade: if going UP and away from 0, auto-fill the prereqs.
    // Going down does NOT clear anything (sticky ownership).
    if (tier > 0 && tier > currentTier) {
      next.perk_2x_ore_income = true
      next.perk_2x_prestige_point_income = true
      next.perk_2x_bar_income = true
      next.perk_3x_bomb_damage = true
      next.founders_bundle_purchased = true
    }
    return next
  })
}

// ─── Gem upgrades (numeric ranks, clamped to [0, maxLevel]) ───────────────

export function setGemUpgradeRank(slug: string, rank: number): void {
  const upgrade = GEM_UPGRADES.find(u => u.slug === slug)
  const maxLevel = upgrade?.maxLevel ?? 0
  if (rank < 0) rank = 0
  if (rank > maxLevel) rank = maxLevel
  _store.update(s => ({ ...s, [`gem_upgrade_${slug}`]: rank }))
}

// ─── Reset ─────────────────────────────────────────────────────────────────

export function resetStoreProgress(): void {
  _store.set({ ...FIXED_DEFAULTS })
}

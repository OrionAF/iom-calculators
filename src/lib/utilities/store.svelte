<script lang="ts">
  import {
    VALUE_PACKS, PERKS, PERK_BUNDLES, GEM_UNLOCKS, GEM_UPGRADES, FOUNDER_TIERS,
    vipEffectAt, formatVipEffectValue,
  } from '$lib/store/catalog'
  import {
    storeProgress,
    setValuePack, setUnlock, setPerk, togglePerkBundle,
    setFounderTier, setGemUpgradeRank,
    getPerkBundleState,
  } from '$lib/stores/storeProgress'
  import TabStrip from '$lib/components/TabStrip.svelte'
  import WikiIcon from '$lib/components/WikiIcon.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import { Minus, Plus, Check } from 'lucide-svelte'

  let activeTab = $state('value-packs')

  // ─── Derived counts for tab badges ──────────────────────────────────────

  const valuePackOwnedCount = $derived(
    VALUE_PACKS.filter(p =>
      p.mirrorUnlockKey
        ? $storeProgress.unlocks[p.mirrorUnlockKey] === true
        : $storeProgress.valuePacks[p.slug] === true
    ).length
  )

  const perksOwnedCount = $derived(
    PERKS.filter(p => $storeProgress.perks[p.slug] === true).length
  )

  const perkBundlesOwnedCount = $derived(
    PERK_BUNDLES.filter(b => getPerkBundleState(b.slug) === 'owned').length
  )

  const gemUnlocksOwnedCount = $derived(
    GEM_UNLOCKS.filter(u => $storeProgress.unlocks[u.mirrorUnlockKey] === true).length
  )

  const gemUpgradesActiveCount = $derived(
    GEM_UPGRADES.filter(u => ($storeProgress.gemUpgrades[u.slug] ?? 0) > 0).length
  )

  const tabs = $derived([
    { id: 'value-packs',  label: 'Value Packs',  badgeCount: valuePackOwnedCount },
    { id: 'founder',      label: 'Founder',      badgeCount: $storeProgress.founder.bundlePurchased ? 1 : 0 },
    { id: 'perk-bundles', label: 'Perk Bundles', badgeCount: perkBundlesOwnedCount },
    { id: 'perks',        label: 'Perks',        badgeCount: perksOwnedCount },
    { id: 'gem-unlocks',  label: 'Gem Unlocks',  badgeCount: gemUnlocksOwnedCount },
    { id: 'gem-upgrades', label: 'Gem Upgrades', badgeCount: gemUpgradesActiveCount },
  ])

  // ─── Founder section derived state ──────────────────────────────────────

  const allPerksOwned = $derived(
    $storeProgress.perks['2x_ore_income'] === true &&
    $storeProgress.perks['2x_prestige_point_income'] === true &&
    $storeProgress.perks['2x_bar_income'] === true &&
    $storeProgress.perks['3x_bomb_damage'] === true
  )

  const currentTier = $derived($storeProgress.founder.tier)

  // ─── Helpers ────────────────────────────────────────────────────────────

  function valuePackOwned(pack: typeof VALUE_PACKS[number]): boolean {
    return pack.mirrorUnlockKey
      ? $storeProgress.unlocks[pack.mirrorUnlockKey] === true
      : $storeProgress.valuePacks[pack.slug] === true
  }

  function toggleValuePackTile(pack: typeof VALUE_PACKS[number]) {
    if (pack.mirrorUnlockKey) {
      setUnlock(pack.mirrorUnlockKey, !$storeProgress.unlocks[pack.mirrorUnlockKey])
    } else {
      setValuePack(pack.slug, !$storeProgress.valuePacks[pack.slug])
    }
  }

  function gemUpgradeRank(slug: typeof GEM_UPGRADES[number]['slug']): number {
    return $storeProgress.gemUpgrades[slug] ?? 0
  }
</script>

<div class="page">
  <PageHeader
    title="Store"
    description="Track what you've purchased from the in-game Store."
  />

  <TabStrip {tabs} value={activeTab} onchange={(id) => activeTab = id} ariaLabel="Store sections" />

  <!-- ─── Value Packs ───────────────────────────────────────────────────── -->
  {#if activeTab === 'value-packs'}
    <div role="tabpanel" id="value-packs-panel" aria-labelledby="value-packs-tab" tabindex="0">
      <div class="grid-value-packs">
        {#each VALUE_PACKS as pack (pack.slug)}
          {@const owned = valuePackOwned(pack)}
          <button
            type="button"
            class="pack-tile"
            class:owned
            onclick={() => toggleValuePackTile(pack)}
            aria-pressed={owned}
          >
            <WikiIcon filename={pack.icon} size={32} class="pack-icon" />
            <div class="pack-body">
              <div class="pack-name">{pack.name}</div>
              {#if pack.unlockRequirement}
                <div class="pack-unlock">{pack.unlockRequirement}</div>
              {/if}
              {#if pack.mirrorUnlockKey}
                <div class="pack-mirror-badge">Also in Gem Unlocks</div>
              {/if}
              {#if pack.effects.length}
                <ul class="pack-effects">
                  {#each pack.effects as e}<li>{e.label}</li>{/each}
                </ul>
              {/if}
            </div>
            {#if owned}<Check class="pack-check" size={18} aria-hidden="true" />{/if}
          </button>
        {/each}
      </div>
    </div>

  <!-- ─── Founder ──────────────────────────────────────────────────────── -->
  {:else if activeTab === 'founder'}
    <div role="tabpanel" id="founder-panel" aria-labelledby="founder-tab" tabindex="0">
      <article class="founder-card">
        <header class="founder-bundle-header">
          <WikiIcon filename="FounderIcon.png" size={48} />
          <div class="founder-bundle-text">
            <h2 class="founder-bundle-name">Founder's Bundle</h2>
            <p class="founder-bundle-desc">Permanent effects + VIP Lounge access.</p>
            {#if $storeProgress.founder.bundlePurchased}
              <span class="badge badge-owned"><Check size={14} aria-hidden="true" /> Owned</span>
            {:else if !allPerksOwned}
              <span class="badge badge-locked">Requires all 4 perks</span>
            {:else}
              <span class="badge badge-eligible">Eligible — set tier ≥ 1 below</span>
            {/if}
          </div>
        </header>

        <div class="founder-tier-section">
          <h3 class="founder-tier-label">FOUNDER TIER</h3>
          <div class="tier-stepper">
            <button
              type="button"
              class="stepper-btn"
              aria-label="Decrease tier"
              onclick={() => setFounderTier(currentTier - 1)}
              disabled={currentTier <= 0}
            ><Minus size={18} aria-hidden="true" /></button>
            <span class="tier-value">{currentTier}</span>
            <button
              type="button"
              class="stepper-btn"
              aria-label="Increase tier"
              onclick={() => setFounderTier(currentTier + 1)}
              disabled={currentTier >= 12}
            ><Plus size={18} aria-hidden="true" /></button>
            <span class="tier-range">Tier {currentTier} / 12</span>
          </div>

          {#if currentTier > 0}
            <h4 class="effects-heading">Active effects at tier {currentTier}:</h4>
            <ul class="founder-effects">
              {#each FOUNDER_TIERS.filter(t => t.tier <= currentTier) as t}
                {#each t.effects as e}
                  {@const value = vipEffectAt(currentTier, t.tier, e.baseValue, e.increment)}
                  <li>
                    <span class="effect-name">{e.label}</span>
                    <span class="effect-value">{formatVipEffectValue(value, e.unit)}</span>
                  </li>
                {/each}
              {/each}
            </ul>
          {:else}
            <p class="empty-hint">Set tier ≥ 1 to see active VIP Lounge effects.</p>
          {/if}
        </div>
      </article>
    </div>

  <!-- ─── Perk Bundles ─────────────────────────────────────────────────── -->
  {:else if activeTab === 'perk-bundles'}
    <div role="tabpanel" id="perk-bundles-panel" aria-labelledby="perk-bundles-tab" tabindex="0">
      <div class="grid-perk-bundles">
        {#each PERK_BUNDLES as bundle (bundle.slug)}
          {@const state = getPerkBundleState(bundle.slug)}
          <button
            type="button"
            class="bundle-tile bundle-{state}"
            onclick={() => togglePerkBundle(bundle.slug)}
            aria-pressed={state === 'owned'}
          >
            <div class="bundle-icons">
              {#each bundle.perkSlugs as ps}
                {@const perk = PERKS.find(p => p.slug === ps)}
                {#if perk}<WikiIcon filename={perk.icon} size={24} />{/if}
              {/each}
            </div>
            <div class="bundle-body">
              <div class="bundle-name">{bundle.name}</div>
              <div class="bundle-gems">+{bundle.bonusGems} bonus gems</div>
              {#if state === 'partial'}
                <span class="badge badge-partial">Partially owned (1/2)</span>
              {/if}
            </div>
            {#if state === 'owned'}<Check size={18} aria-hidden="true" />{/if}
          </button>
        {/each}
      </div>
    </div>

  <!-- ─── Perks ────────────────────────────────────────────────────────── -->
  {:else if activeTab === 'perks'}
    <div role="tabpanel" id="perks-panel" aria-labelledby="perks-tab" tabindex="0">
      <div class="grid-perks">
        {#each PERKS as perk (perk.slug)}
          {@const owned = $storeProgress.perks[perk.slug] === true}
          <button
            type="button"
            class="perk-tile"
            class:owned
            onclick={() => setPerk(perk.slug, !owned)}
            aria-pressed={owned}
          >
            <WikiIcon filename={perk.icon} size={32} />
            <div class="perk-name">{perk.name}</div>
            {#if owned}<Check class="perk-check" size={18} aria-hidden="true" />{/if}
          </button>
        {/each}
      </div>
    </div>

  <!-- ─── Gem Unlocks ──────────────────────────────────────────────────── -->
  {:else if activeTab === 'gem-unlocks'}
    <div role="tabpanel" id="gem-unlocks-panel" aria-labelledby="gem-unlocks-tab" tabindex="0">
      <div class="grid-gem-unlocks">
        {#each GEM_UNLOCKS as unlock (unlock.slug)}
          {@const owned = $storeProgress.unlocks[unlock.mirrorUnlockKey] === true}
          <button
            type="button"
            class="unlock-tile"
            class:owned
            onclick={() => setUnlock(unlock.mirrorUnlockKey, !owned)}
            aria-pressed={owned}
          >
            <WikiIcon filename={unlock.icon} size={32} />
            <div class="unlock-name">{unlock.name}</div>
            <div class="unlock-cost">
              <WikiIcon filename="Gem.png" size={14} /> {unlock.gemCost}
            </div>
            <div class="unlock-mirror-badge">Also in Value Packs</div>
            {#if owned}<Check class="unlock-check" size={18} aria-hidden="true" />{/if}
          </button>
        {/each}
      </div>
    </div>

  <!-- ─── Gem Upgrades ─────────────────────────────────────────────────── -->
  {:else if activeTab === 'gem-upgrades'}
    <div role="tabpanel" id="gem-upgrades-panel" aria-labelledby="gem-upgrades-tab" tabindex="0">
      <div class="grid-gem-upgrades">
        {#each GEM_UPGRADES as upgrade (upgrade.slug)}
          {@const rank = gemUpgradeRank(upgrade.slug)}
          {@const maxed = rank >= upgrade.maxLevel}
          <article class="upgrade-tile" class:active={rank > 0}>
            <WikiIcon filename={upgrade.icon} size={32} />
            <div class="upgrade-body">
              <div class="upgrade-name">
                {upgrade.name}
                {#if maxed}<span class="badge badge-maxed">MAXED</span>{/if}
              </div>
              {#each upgrade.effects as e}
                <div class="upgrade-effect">{e.label}</div>
              {/each}
              <div class="upgrade-cost">
                <WikiIcon filename="Gem.png" size={12} /> {upgrade.gemCost} per level
              </div>
              <div class="upgrade-stepper">
                <button
                  type="button"
                  class="stepper-btn-small"
                  aria-label="Decrease rank"
                  onclick={() => setGemUpgradeRank(upgrade.slug, rank - 1)}
                  disabled={rank <= 0}
                ><Minus size={16} aria-hidden="true" /></button>
                <span class="upgrade-rank">{rank} / {upgrade.maxLevel}</span>
                <button
                  type="button"
                  class="stepper-btn-small"
                  aria-label="Increase rank"
                  onclick={() => setGemUpgradeRank(upgrade.slug, rank + 1)}
                  disabled={maxed}
                ><Plus size={16} aria-hidden="true" /></button>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>

  /* ─── Tile common ─────────────────────────────────────────────────── */
  .pack-tile,
  .perk-tile,
  .unlock-tile,
  .bundle-tile {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    text-align: left;
    font-family: var(--font-body);
    transition: border-color var(--transition-fast), background var(--transition-fast),
                box-shadow var(--transition-fast);
  }

  .pack-tile.owned,
  .perk-tile.owned,
  .unlock-tile.owned,
  .bundle-tile.bundle-owned {
    border-color: var(--border-accent);
    background: color-mix(in srgb, var(--accent) 6%, var(--bg-surface));
    box-shadow: var(--shadow-glow);
  }
  .bundle-tile.bundle-partial {
    border-color: var(--warning);
    background: color-mix(in srgb, var(--warning) 6%, var(--bg-surface));
  }

  @media (hover: hover) {
    .pack-tile:not(.owned):hover,
    .perk-tile:not(.owned):hover,
    .unlock-tile:not(.owned):hover,
    .bundle-tile.bundle-unowned:hover {
      border-color: var(--text-muted);
    }
  }

  .pack-tile:focus-visible,
  .perk-tile:focus-visible,
  .unlock-tile:focus-visible,
  .bundle-tile:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  /* ─── Value packs grid + tile ─────────────────────────────────────── */
  .grid-value-packs {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: 1fr;
  }
  @media (min-width: 768px) {
    .grid-value-packs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  .pack-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: var(--space-1); }
  .pack-name {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
  }
  .pack-unlock {
    font-size: var(--text-xs);
    color: var(--text-muted);
  }
  .pack-mirror-badge {
    font-size: 10px;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    padding: 1px 6px;
    border-radius: var(--radius-sm);
    align-self: flex-start;
    margin-top: var(--space-1);
  }
  .pack-effects {
    list-style: disc;
    padding-left: var(--space-4);
    margin-top: var(--space-2);
    color: var(--text-muted);
    font-size: var(--text-sm);
  }
  .pack-effects li { margin-bottom: 2px; }

  :global(.pack-check), :global(.perk-check), :global(.unlock-check) {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    color: var(--accent);
  }

  /* ─── Founder ─────────────────────────────────────────────────────── */
  .founder-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .founder-bundle-header {
    display: flex;
    gap: var(--space-4);
    align-items: flex-start;
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--border);
    margin-bottom: var(--space-6);
  }
  .founder-bundle-text { flex: 1; display: flex; flex-direction: column; gap: var(--space-2); }
  .founder-bundle-name {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--text-primary);
    letter-spacing: 0.04em;
  }
  .founder-bundle-desc {
    font-size: var(--text-sm);
    color: var(--text-muted);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    align-self: flex-start;
  }
  .badge-owned {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }
  .badge-locked {
    color: var(--text-dim);
    background: color-mix(in srgb, var(--text-muted) 12%, transparent);
  }
  .badge-eligible {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }
  .badge-partial {
    color: var(--warning);
    background: color-mix(in srgb, var(--warning) 12%, transparent);
    margin-top: var(--space-1);
  }
  .badge-maxed {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    margin-left: var(--space-2);
  }

  .founder-tier-section { display: flex; flex-direction: column; gap: var(--space-3); }
  .founder-tier-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .tier-stepper {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .stepper-btn {
    width: 44px; height: 44px;
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    cursor: pointer;
    transition: background var(--transition-fast), border-color var(--transition-fast);
  }
  .stepper-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  @media (hover: hover) {
    .stepper-btn:not(:disabled):hover {
      background: var(--bg-raised);
      border-color: var(--text-muted);
    }
  }
  .stepper-btn:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  .tier-value {
    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--accent);
    font-variant-numeric: tabular-nums;
    min-width: 2.5ch;
    text-align: center;
  }
  .tier-range {
    font-size: var(--text-sm);
    color: var(--text-muted);
    margin-left: var(--space-2);
  }

  .effects-heading {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--text-muted);
    margin-top: var(--space-3);
  }
  .founder-effects {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .founder-effects li {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: var(--space-2) 0;
    border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  }
  .founder-effects li:last-child { border-bottom: none; }
  .effect-name { font-size: var(--text-sm); color: var(--text-primary); }
  .effect-value {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    color: var(--accent);
    font-size: var(--text-sm);
  }
  .empty-hint {
    font-size: var(--text-sm);
    color: var(--text-muted);
    padding: var(--space-3) 0;
  }

  /* ─── Perk Bundles ────────────────────────────────────────────────── */
  .grid-perk-bundles {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .grid-perk-bundles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  .bundle-icons {
    display: flex;
    gap: var(--space-1);
    flex-shrink: 0;
  }
  .bundle-body { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); }
  .bundle-name {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
  }
  .bundle-gems {
    font-size: var(--text-xs);
    color: var(--text-muted);
  }

  /* ─── Perks ───────────────────────────────────────────────────────── */
  .grid-perks {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  .perk-tile {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-2);
  }
  .perk-name {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
  }

  /* ─── Gem Unlocks ─────────────────────────────────────────────────── */
  .grid-gem-unlocks {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  .unlock-tile {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-2);
  }
  .unlock-name {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
  }
  .unlock-cost {
    font-size: var(--text-sm);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
  }
  .unlock-mirror-badge {
    font-size: 10px;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    padding: 1px 6px;
    border-radius: var(--radius-sm);
  }

  /* ─── Gem Upgrades ────────────────────────────────────────────────── */
  .grid-gem-upgrades {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .grid-gem-upgrades { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  .upgrade-tile {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: border-color var(--transition-fast);
  }
  .upgrade-tile.active { border-color: var(--border-accent); }

  .upgrade-body { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); }
  .upgrade-name {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .upgrade-effect {
    font-size: var(--text-sm);
    color: var(--text-muted);
  }
  .upgrade-cost {
    font-size: var(--text-xs);
    color: var(--text-dim);
    font-family: var(--font-mono);
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    margin-top: var(--space-1);
  }
  .upgrade-stepper {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }
  .stepper-btn-small {
    width: 36px; height: 36px;
    display: inline-flex; align-items: center; justify-content: center;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    cursor: pointer;
    transition: background var(--transition-fast), border-color var(--transition-fast);
  }
  .stepper-btn-small:disabled { opacity: 0.3; cursor: not-allowed; }
  @media (hover: hover) {
    .stepper-btn-small:not(:disabled):hover {
      background: var(--bg-raised);
      border-color: var(--text-muted);
    }
  }
  .stepper-btn-small:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
  .upgrade-rank {
    font-family: var(--font-mono);
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--accent);
    font-variant-numeric: tabular-nums;
    min-width: 5ch;
    text-align: center;
  }
</style>

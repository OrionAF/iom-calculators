<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Search } from 'lucide-svelte'
  import Button from '$lib/components/Button.svelte'
  import { stats } from '$lib/stores/stats'
  import { settings, setValueDisplayMode } from '$lib/stores/settings'
  import { formatStatByKey } from '$lib/format'
  import StatTooltip from '$lib/components/StatTooltip.svelte'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import WikiIcon from '$lib/components/WikiIcon.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import { Info, X, ChevronDown } from 'lucide-svelte'

  // Collapsed categories — persisted in sessionStorage so a page reload
  // within the same session remembers which you closed.
  const COLLAPSE_KEY = 'iom-collapsed-cats'

  let copyBannerDismissed = $state(
    typeof window !== 'undefined' && sessionStorage.getItem('iom-copy-banner-dismissed') === '1'
  )
  function dismissCopyBanner() {
    copyBannerDismissed = true
    try { sessionStorage.setItem('iom-copy-banner-dismissed', '1') } catch { /* noop */ }
  }

  function loadCollapsed(): Set<string> {
    try {
      const raw = sessionStorage.getItem(COLLAPSE_KEY)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch { return new Set() }
  }

  function saveCollapsed(s: Set<string>): void {
    try { sessionStorage.setItem(COLLAPSE_KEY, JSON.stringify([...s])) } catch { /* noop */ }
  }

  let collapsedCats = $state(loadCollapsed())

  function toggleCategory(id: string): void {
    if (collapsedCats.has(id)) collapsedCats.delete(id)
    else collapsedCats.add(id)
    collapsedCats = new Set(collapsedCats)   // trigger reactivity
    saveCollapsed(collapsedCats)
  }

  function setAllCollapsed(ids: string[], collapsed: boolean): void {
    collapsedCats = collapsed ? new Set(ids) : new Set()
    saveCollapsed(collapsedCats)
  }
  import {
    STAT_CATALOG,
    STATUE_STATE_LABELS,
  } from '$lib/stats/catalog'
  import { getStatMeta } from '$lib/stats/registry'

  function isStatuesCategory(categoryId: string): boolean {
    return categoryId.endsWith('statues')
  }

  function statueIconForTier(baseIcon: string | undefined, tier: number | undefined): string | undefined {
    if (!baseIcon) return baseIcon
    // tiers: 0 Unbuilt (show Normal, dimmed), 1 Normal, 2 Gilded, 3 Platinized
    if (tier === 2) return baseIcon.replace('_Normal', '_Gilded')
    if (tier === 3) return baseIcon.replace('_Normal', '_Platinized')
    return baseIcon
  }

  let filterText = $state('')

  const normalizedFilter = $derived(filterText.trim().toLowerCase())

  // ── Click-to-copy raw values ─────────────────────────
  let copiedKey = $state<string | null>(null)
  let copyTimer: ReturnType<typeof setTimeout> | null = null

  async function copyValue(key: string, raw: number | undefined): Promise<void> {
    if (raw === undefined) return
    try {
      await navigator.clipboard.writeText(String(raw))
    } catch {
      return  // clipboard unavailable — silently skip
    }
    copiedKey = key
    if (copyTimer !== null) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copiedKey = null; copyTimer = null }, 1200)
  }

  onDestroy(() => { if (copyTimer !== null) clearTimeout(copyTimer) })

  function prettyKey(key: string): string {
    const s = key.replace(/_/g, ' ')
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function matchesFilter(
    stat: { key: string },
    filter: string,
  ): boolean {
    if (filter === '') return true
    if (prettyKey(stat.key).toLowerCase().includes(filter)) return true
    const meta = getStatMeta(stat.key)
    if (meta?.name && meta.name.toLowerCase().includes(filter)) return true
    return false
  }

  function formatStatRow(key: string, value: number | undefined, categoryId: string): string {
    if (value === undefined) return '—'
    if (categoryId === 'meta') return String(value)
    if (isStatuesCategory(categoryId)) {
      if (Number.isInteger(value) && value >= 0 && value < STATUE_STATE_LABELS.length) {
        return STATUE_STATE_LABELS[value]
      }
      return String(value)
    }
    if ($settings.valueDisplayMode === 'raw') return String(value)
    return formatStatByKey(key, value, $settings.notation)
  }

  function formatTime(serialDate: number): string {
    // 1. Convert Excel serial number to Unix milliseconds
    const excelEpochDiff = 25569; 
    const millisecondsInDay = 86400000;
    const date = new Date((serialDate - excelEpochDiff) * millisecondsInDay);

    // 2. Pad time segments with leading zeros
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    
    // 3. Extract day and year
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const yyyy = date.getUTCFullYear();

    // 4. Extract short month name (e.g., "Jun")
    const mmm = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });

    // 5. Output exact format: hh:mm:ss - dd.MMM yyyy
    return `${hh}:${mm}:${ss} - ${dd}.${mmm} ${yyyy}`;
  }

  // Layer 1: filter only. Depends on STAT_CATALOG + normalizedFilter.
  // Stable across $stats and $settings changes — a notation toggle won't re-filter.
  const filteredCategories = $derived(
    STAT_CATALOG
      .map(cat => ({
        ...cat,
        matchedStats: cat.stats.filter(stat => matchesFilter(stat, normalizedFilter)),
      }))
      .filter(cat => cat.matchedStats.length > 0)
  )

  // Layer 2: format + decorate. Depends on filteredCategories + $stats + $settings.
  // A keystroke in the filter doesn't reach this layer's existing rows; only the
  // shape of filteredCategories changes.
  const visibleCategories = $derived(
    filteredCategories.map(cat => ({
      ...cat,
      visibleStats: cat.matchedStats.map(stat => {
        const rawValue = $stats?.stats[stat.key]
        const tier = typeof rawValue === 'number' ? rawValue : 0
        const meta = getStatMeta(stat.key)
        const icon = meta?.icon
        return {
          key: stat.key,
          icon,
          statueIcon: isStatuesCategory(cat.id) ? statueIconForTier(icon, tier) : icon,
          prettyLabel: meta?.name ?? prettyKey(stat.key),
          rawValue,
          displayValue: formatStatRow(stat.key, rawValue, cat.id),
          tier,
        }
      }),
    }))
  )
</script>

<div class="page">
  <PageHeader
    title="Loaded Stats"
    description="Categorized breakdown of your imported stat export."
  />

  {#if !$stats}
    <EmptyState />
  {:else}
    <div class="meta-strip">
      <span class="meta-version">{$stats.version}</span>
      <span class="meta-divider" aria-hidden="true">·</span>
      {#if typeof $stats.time === 'number' && Number.isFinite($stats.time)}
        <span class="meta-time">{formatTime($stats.time)}</span>
      {:else}
        <span class="meta-warning">
          Export was partially missing. Please try again making sure to export everything from the code in-game.
        </span>
      {/if}
    </div>

    <div class="toolbar">
      <div class="search-wrap">
        <Search size={16} class="search-icon" aria-hidden="true" />
        <input
          type="search"
          class="filter-input"
          bind:value={filterText}
          placeholder="Filter stats…"
          autocomplete="off"
          spellcheck="false"
          inputmode="search"
          aria-label="Filter loaded stats by name"
        />
      </div>

      <div class="mode-toggle" role="group" aria-label="Value display mode">
        <button
          class="mode-btn"
          class:active={$settings.valueDisplayMode === 'notation'}
          aria-pressed={$settings.valueDisplayMode === 'notation'}
          onclick={() => setValueDisplayMode('notation')}
        >Notation</button>
        <button
          class="mode-btn"
          class:active={$settings.valueDisplayMode === 'raw'}
          aria-pressed={$settings.valueDisplayMode === 'raw'}
          onclick={() => setValueDisplayMode('raw')}
        >Raw</button>
      </div>

      {#if visibleCategories.length > 0}
        {@const allCollapsed = visibleCategories.every(c => collapsedCats.has(c.id))}
        <Button
          variant="ghost"
          onclick={() => setAllCollapsed(visibleCategories.map(c => c.id), !allCollapsed)}
        >
          {#if allCollapsed}Expand all{:else}Collapse all{/if}
        </Button>
      {/if}
    </div>

    {#if visibleCategories.length === 0}
      <p class="no-results">No stats match your filter.</p>
    {:else}
      {#if !copyBannerDismissed}
        <div class="info-banner" role="note">
          <Info size={16} aria-hidden="true" />
          <span>
            Click/tap the <strong>values</strong> of any stat to <strong>copy</strong> the raw value.
          </span>
          <button
            type="button"
            class="banner-close"
            onclick={dismissCopyBanner}
            aria-label="Dismiss notice"
          ><X size={14} aria-hidden="true" /></button>
        </div>
      {/if}
      {#each visibleCategories as category (category.id)}
        {@const collapsed = collapsedCats.has(category.id)}
        <article class="stat-card" class:collapsed>
          <button
            type="button"
            class="card-header"
            aria-expanded={!collapsed}
            aria-controls="cat-{category.id}"
            onclick={() => toggleCategory(category.id)}
          >
            <h2 class="card-title">{category.label}</h2>
            <div class="card-header-meta">
              <span class="card-count">{category.visibleStats.length}</span>
              <ChevronDown class="collapse-chevron" size={16} aria-hidden="true" />
            </div>
          </button>

          {#if !collapsed}
            <div id="cat-{category.id}" class="card-body">
            {#if isStatuesCategory(category.id)}
            <ul class="statue-grid">
              {#each category.visibleStats as stat (stat.key)}
                <li class="statue-cell" class:unbuilt={stat.tier === 0}>
                  <WikiIcon filename={stat.statueIcon} width={64} height={96} alt={stat.prettyLabel} />
                  <span class="statue-label">
                    {#if $settings.statTooltips}
                      <StatTooltip derivedStatKey={stat.key} value={undefined} label={stat.prettyLabel} />
                    {:else}
                      {stat.prettyLabel}
                    {/if}
                  </span>
                  <span class="statue-state">{stat.displayValue}</span>
                </li>
              {/each}
            </ul>
          {:else}
            <dl class="stat-grid">
              {#each category.visibleStats as stat (stat.key)}
                <div class="stat-pair">
                  <dt class="stat-field">
                    <WikiIcon filename={stat.icon} size={14} />
                    {#if $settings.statTooltips}
                      <StatTooltip derivedStatKey={stat.key} value={undefined} label={stat.prettyLabel} />
                    {:else}
                      {stat.prettyLabel}
                    {/if}
                  </dt>
                  <dd class="stat-value" class:missing={stat.displayValue === '—'}>
                    <button
                      type="button"
                      class="copy-value"
                      class:copied={copiedKey === stat.key}
                      disabled={stat.rawValue === undefined}
                      onclick={() => copyValue(stat.key, stat.rawValue)}
                      title="Copy raw value"
                      aria-label="Copy raw value of {stat.prettyLabel}"
                    >
                      {stat.displayValue}
                      <span class="copied-chip" aria-hidden="true">Copied!</span>
                    </button>
                  </dd>
                </div>
              {/each}
            </dl>
            {/if}
            </div>
          {/if}
        </article>
      {/each}
    {/if}
  {/if}
</div>

<style>

  /* ── Metadata strip ────────────────────────────────── */
  .meta-strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: var(--space-1);
    gap: var(--space-2);
    margin-bottom: var(--space-6);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-muted);
  }

  .meta-divider {
    color: var(--text-dim);
  }

  .meta-warning {
    color: var(--warning);
    font-family: var(--font-body);
  }

  /* ── Toolbar (search + mode toggle) ────────────────── */
  .toolbar {
    position: sticky;
    top: 0;
    z-index: var(--z-raised);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    padding-block: var(--space-3);
    margin-bottom: var(--space-4);
    background: color-mix(in srgb, var(--bg-base) 88%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }

  /* Below 1024px the fixed mobile topbar (61px + safe area) owns the
     viewport top — stick beneath it. */
  @media (max-width: 1023px) {
    .toolbar {
      top: calc(61px + env(safe-area-inset-top));
    }
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 220px;
  }

  :global(.search-icon) {
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
  }

  .filter-input {
    width: 100%;
    font-family: var(--font-mono);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3) var(--space-2) calc(var(--space-3) * 2 + 16px);
    min-height: 44px;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }
  .filter-input:focus {
    outline: none;
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
  }

  .mode-toggle {
    display: inline-flex;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 2px;
  }

  .mode-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    padding: var(--space-2) var(--space-4);
    min-height: 40px;
    border-radius: calc(var(--radius-md) - 2px);
    cursor: pointer;
    transition: background var(--transition-fast), color var(--transition-fast);
  }
  .mode-btn.active {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
  }
  @media (hover: hover) {
    .mode-btn:not(.active):hover { color: var(--text-primary); }
  }

  /* ── No-results message ────────────────────────────── */
  .no-results {
    font-size: var(--text-sm);
    color: var(--text-muted);
    padding: var(--space-6) 0;
    text-align: center;
  }

  /* ── Info banner ────────────────────────────── */
  .info-banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    margin-bottom: var(--space-4);
    background: color-mix(in srgb, var(--accent) 6%, var(--bg-surface));
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: var(--text-primary);
    line-height: var(--leading-base);
  }
  .info-banner :global(svg) {
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 2px;
  }
  .info-banner strong { color: var(--accent); font-weight: var(--weight-medium); }
  .info-banner span { flex: 1; }
  .banner-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    cursor: pointer;
    flex-shrink: 0;
    transition: color var(--transition-fast), background var(--transition-fast);
  }
  @media (hover: hover) {
    .banner-close:hover { color: var(--text-primary); background: color-mix(in srgb, var(--text-primary) 8%, transparent); }
  }
  .banner-close:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  /* ── Category card ─────────────────────────────────── */
  .stat-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
    overflow: hidden;
  }

  /* card-header is now a <button> for collapse toggle */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--space-4) var(--space-6);
    background: none;
    border: none;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    text-align: left;
    gap: var(--space-3);
    transition: background var(--transition-fast);
  }
  .stat-card.collapsed .card-header {
    border-bottom: none;
  }
  .card-header:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: -2px;
  }
  @media (hover: hover) {
    .card-header:hover { background: color-mix(in srgb, var(--text-primary) 4%, transparent); }
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--accent);
    letter-spacing: 0.04em;
    flex: 1;
    min-width: 0;
  }

  .card-header-meta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    flex-shrink: 0;
  }

  .card-count {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-dim);
    letter-spacing: 0.08em;
  }

  :global(.collapse-chevron) {
    color: var(--text-muted);
    transition: transform var(--transition-fast);
  }
  .stat-card.collapsed :global(.collapse-chevron) {
    transform: rotate(-90deg);
  }

  .card-body {
    padding: var(--space-4) var(--space-6);
  }

  /* Stat grid: N equal columns, each column is one stat pair */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(var(--stat-cols, 2), 1fr);
    gap: var(--space-1);
  }

  /* Each pair is its own hover target */
  .stat-pair {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 0 var(--space-3);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    cursor: default;
    transition: background var(--transition-fast);
  }
  @media (hover: hover) {
    .stat-pair:hover {
      background: color-mix(in srgb, var(--accent) 8%, transparent);
    }
    .stat-pair:hover .stat-field {
      color: var(--text-primary);
    }
  }

  .stat-field {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--text-muted);
    font-family: var(--font-body);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
    text-align: right;
    white-space: nowrap;
  }

  .stat-value.missing {
    color: var(--text-dim);
  }

  .copy-value {
    position: relative;
    background: none;
    border: none;
    padding: 2px var(--space-1);
    margin: -2px calc(-1 * var(--space-1));
    border-radius: var(--radius-sm);
    font: inherit;
    color: inherit;
    cursor: copy;
    transition: background var(--transition-fast), color var(--transition-fast);
  }
  @media (hover: hover) {
    .copy-value:hover:not(:disabled) {
      background: color-mix(in srgb, var(--accent) 14%, transparent);
      color: var(--accent);
    }
  }
  .copy-value:disabled {
    cursor: default;
  }
  .copy-value:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 1px;
  }

  .copied-chip {
    position: absolute;
    right: 0;
    top: -24px;
    background: var(--grad-molten);
    color: var(--accent-text);
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: var(--weight-bold);
    padding: 2px 8px;
    border-radius: var(--radius-pill);
    opacity: 0;
    translate: 0 4px;
    pointer-events: none;
    transition: opacity var(--transition-fast), translate var(--transition-bounce);
  }
  .copy-value.copied .copied-chip {
    opacity: 1;
    translate: 0 0;
  }

  /* ── Statues: 3×3 grid variant ──────────────────────── */
  .statue-grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
  }

  @media (max-width: 479px) {
    .statue-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .statue-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-2);
    background: color-mix(in srgb, var(--bg-surface) 60%, transparent);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    transition: opacity var(--transition-fast), filter var(--transition-fast);
  }

  .statue-cell.unbuilt {
    opacity: 0.45;
    filter: grayscale(1);
  }

  .statue-label {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-primary);
    font-weight: var(--weight-medium);
    line-height: var(--leading-tight);
  }

  .statue-state {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }
</style>

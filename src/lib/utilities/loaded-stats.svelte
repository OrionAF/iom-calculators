<script lang="ts">
  import { Search } from 'lucide-svelte'
  import { stats } from '$lib/stores/stats'
  import { settings, setValueDisplayMode } from '$lib/stores/settings'
  import { formatStatByKey } from '$lib/format'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import WikiIcon from '$lib/components/WikiIcon.svelte'
  import {
    STAT_CATALOG,
    STATUE_STATE_LABELS,
  } from '$lib/stats/catalog'

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

  function prettyKey(key: string): string {
    const s = key.replace(/_/g, ' ')
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function matchesFilter(
    stat: { key: string; label?: string },
    filter: string,
  ): boolean {
    if (filter === '') return true
    if (prettyKey(stat.key).toLowerCase().includes(filter)) return true
    if (stat.label && stat.label.toLowerCase().includes(filter)) return true
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

  const visibleCategories = $derived(
    STAT_CATALOG.map(cat => {
      const visibleStats = cat.stats
        .filter(stat => matchesFilter(stat, normalizedFilter))
        .map(stat => {
          const rawValue = $stats?.stats[stat.key]
          const tier = typeof rawValue === 'number' ? rawValue : 0
          return {
            key: stat.key,
            icon: stat.icon,
            statueIcon: isStatuesCategory(cat.id) ? statueIconForTier(stat.icon, tier) : stat.icon,
            prettyLabel: stat.label ?? prettyKey(stat.key),
            rawValue,
            displayValue: formatStatRow(stat.key, rawValue, cat.id),
            tier,
          }
        })
      return { ...cat, visibleStats }
    }).filter(cat => cat.visibleStats.length > 0)
  )
</script>

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Loaded Stats</h1>
    <p class="page-description">Categorized breakdown of your imported stat export.</p>
  </header>

  {#if !$stats}
    <EmptyState />
  {:else}
    <div class="meta-strip">
      <span class="meta-version">{$stats.version}</span>
      <span class="meta-divider" aria-hidden="true">·</span>
      <span class="meta-time">{formatTime($stats.time)}</span>
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
    </div>

    {#if visibleCategories.length === 0}
      <p class="no-results">No stats match your filter.</p>
    {:else}
      {#each visibleCategories as category (category.id)}
        <article class="stat-card">
          <header class="card-header">
            <h2 class="card-title">{category.label}</h2>
            <span class="card-count">{category.visibleStats.length}</span>
          </header>

          {#if isStatuesCategory(category.id)}
            <ul class="statue-grid">
              {#each category.visibleStats as stat (stat.key)}
                <li class="statue-cell" class:unbuilt={stat.tier === 0}>
                  <WikiIcon filename={stat.statueIcon} width={64} height={96} alt={stat.prettyLabel} />
                  <span class="statue-label">{stat.prettyLabel}</span>
                  <span class="statue-state">{stat.displayValue}</span>
                </li>
              {/each}
            </ul>
          {:else}
            <dl class="stat-grid">
              {#each category.visibleStats as stat (stat.key)}
                <dt class="stat-field">
                  <WikiIcon filename={stat.icon} size={14} />
                  {stat.prettyLabel}
                </dt>
                <dd class="stat-value" class:missing={stat.displayValue === '—'}>
                  {stat.displayValue}
                </dd>
              {/each}
            </dl>
          {/if}
        </article>
      {/each}
    {/if}
  {/if}
</div>

<style>
  .page {
    max-width: var(--content-max-width);
  }

  .page-header {
    margin-bottom: var(--space-6);
  }

  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--accent);
    letter-spacing: 0.04em;
    margin-bottom: var(--space-2);
  }

  .page-description {
    font-size: var(--text-base);
    color: var(--text-muted);
    line-height: var(--leading-loose);
  }

  /* ── Metadata strip ────────────────────────────────── */
  .meta-strip {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-muted);
  }

  .meta-divider {
    color: var(--text-dim);
  }

  /* ── Toolbar (search + mode toggle) ────────────────── */
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
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

  /* ── Category card ─────────────────────────────────── */
  .stat-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-6);
    margin-bottom: var(--space-4);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--border);
  }

  .card-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    color: var(--accent);
    letter-spacing: 0.04em;
  }

  .card-count {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-dim);
    letter-spacing: 0.08em;
  }

  /* Default 2-column layout for most categories */
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: var(--space-4);
    row-gap: var(--space-2);
  }

  .stat-field {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--text-muted);
    font-family: var(--font-body);
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

  /* ── Statues: 3×3 grid variant ──────────────────────── */
  .statue-grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
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

<script lang="ts">
  import { Search } from 'lucide-svelte'
  import { stats } from '$lib/stores/stats'
  import { settings, setValueDisplayMode } from '$lib/stores/settings'
  import { formatStatByKey } from '$lib/format'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import WikiIcon from '$lib/components/WikiIcon.svelte'
  import {
    STAT_CATALOG,
    STATUE_ENRICHMENT,
    STATUE_STATE_LABELS,
  } from '$lib/stats/catalog'

  let filterText = $state('')

  const normalizedFilter = $derived(filterText.trim().toLowerCase())

  function prettyKey(key: string): string {
    const s = key.replace(/_/g, ' ')
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function matchesFilter(
    stat: { key: string; label?: string },
    categoryId: string,
    filter: string,
  ): boolean {
    if (filter === '') return true
    if (prettyKey(stat.key).toLowerCase().includes(filter)) return true
    if (stat.label && stat.label.toLowerCase().includes(filter)) return true
    if (categoryId === 'statues') {
      const e = STATUE_ENRICHMENT[stat.key]
      if (e && e.name.toLowerCase().includes(filter)) return true
    }
    return false
  }

  function formatStatRow(key: string, value: number | undefined, categoryId: string): string {
    if (value === undefined) return '—'
    if (categoryId === 'meta') return String(value)
    if (categoryId === 'statues') {
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
        .filter(stat => matchesFilter(stat, cat.id, normalizedFilter))
        .map(stat => ({
          key: stat.key,
          icon: stat.icon,
          prettyLabel: stat.label ?? prettyKey(stat.key),
          rawValue: $stats?.stats[stat.key],
          displayValue: formatStatRow(stat.key, $stats?.stats[stat.key], cat.id),
          enrichment: cat.id === 'statues' ? STATUE_ENRICHMENT[stat.key] : undefined,
        }))
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

          {#if category.id === 'statues'}
            <table class="statue-table">
              <thead>
                <tr>
                  <th scope="col">Key</th>
                  <th scope="col">Name</th>
                  <th scope="col" class="col-world">World</th>
                  <th scope="col" class="col-state">State</th>
                </tr>
              </thead>
              <tbody>
                {#each category.visibleStats as stat (stat.key)}
                  <tr>
                    <td class="stat-field">{stat.prettyLabel}</td>
                    <td class="stat-name">
                      <WikiIcon filename={stat.icon} size={14} />
                      {stat.enrichment?.name ?? '—'}
                    </td>
                    <td class="stat-world">{stat.enrichment?.world ?? '—'}</td>
                    <td class="stat-state" class:dim={stat.displayValue === 'Unbuilt'}>
                      {stat.displayValue}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
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

  /* ── Statues: 4-column table variant ────────────────── */
  .statue-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-body);
    font-size: var(--text-sm);
  }

  .statue-table th {
    text-align: left;
    font-weight: var(--weight-medium);
    color: var(--text-muted);
    text-transform: uppercase;
    font-size: var(--text-xs);
    letter-spacing: 0.08em;
    padding: 0 var(--space-2) var(--space-2);
    border-bottom: 1px solid var(--border);
  }
  .statue-table th.col-world,
  .statue-table th.col-state {
    text-align: right;
  }

  .statue-table td {
    padding: var(--space-2);
    border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  }
  .statue-table tr:last-child td {
    border-bottom: none;
  }

  .statue-table .stat-field {
    font-family: var(--font-mono);
    color: var(--text-muted);
    font-size: var(--text-xs);
  }

  .statue-table .stat-name {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-primary);
    font-weight: var(--weight-medium);
  }

  .statue-table .stat-world {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    color: var(--text-muted);
    text-align: right;
    width: 1%;
    white-space: nowrap;
  }

  .statue-table .stat-state {
    text-align: right;
    color: var(--text-primary);
    white-space: nowrap;
    width: 1%;
  }
  .statue-table .stat-state.dim {
    color: var(--text-dim);
  }
</style>

<script lang="ts">
  import { Info } from 'lucide-svelte'
  import { stats } from '$lib/stores/stats'
  import { settings } from '$lib/stores/settings'
  import { fishingIncome } from './logic/fishing'
  import ResultCard from '$lib/components/ResultCard.svelte'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import { formatGold } from '$lib/format'

  const result = $derived(
    $stats ? fishingIncome($stats.stats, {}) : null
  )
</script>

<div class="calculator">
  <header class="calc-header">
    <h1 class="calc-title">Fishing Income</h1>
    <p class="calc-description">
      Estimates gold income per hour from fishing.
      Paste your stat export in the sidebar to get started.
    </p>
  </header>

  {#if !$stats}
    <EmptyState />
  {:else}
    <section class="results">
      <ResultCard
        label="Estimated Income"
        value={result ? formatGold(result.incomePerHour, $settings.notation) : '—'}
        unit="/ hour"
        active={!!result}
      />
    </section>

    <section class="inputs">
      <p class="inputs-note">
        <Info size={14} aria-hidden="true" />
        This is a placeholder formula (rod power × income multiplier).
        The full fishing calculator spec will replace this.
      </p>
    </section>
  {/if}
</div>

<style>
  .calculator {
    max-width: var(--content-max-width);
  }

  .calc-header {
    margin-bottom: var(--space-6);
  }

  .calc-title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--accent);
    letter-spacing: 0.04em;
    margin-bottom: var(--space-2);
  }

  .calc-description {
    font-size: var(--text-base);
    color: var(--text-muted);
    line-height: var(--leading-loose);
  }

  .results {
    display: grid;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .inputs-note {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--text-dim);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
  }

  .inputs-note :global(svg) {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--accent);
  }
</style>

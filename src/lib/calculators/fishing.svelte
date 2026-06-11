<script lang="ts">
  import { Info } from 'lucide-svelte'
  import { stats } from '$lib/stores/stats'
  import { settings } from '$lib/stores/settings'
  import { computeFishingStats } from './logic/fishing'
  import ResultCard from '$lib/components/ResultCard.svelte'
  import EmptyState from '$lib/components/EmptyState.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'
  import { formatGold } from '$lib/format'

  const result = $derived(
    $stats ? computeFishingStats({ levels: {}, rt: {} }) : null
  )
</script>

<div class="calculator">
  <PageHeader
    title="Fishing Income"
    description="Estimates gold income per hour from fishing. Paste your stat export in the sidebar to get started."
  />

  {#if !$stats}
    <EmptyState />
  {:else}
    <section class="results">
      <ResultCard
        label="Estimated Income"
        icon="Fishing_Income_Multiplier.png"
        value={result ? formatGold(result.incomeMulti, $settings.notation) : '—'}
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

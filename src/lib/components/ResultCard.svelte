<script lang="ts">
  interface Props {
    label: string
    value: string
    unit?: string
    active?: boolean
  }

  let { label, value, unit = '', active = false }: Props = $props()
</script>

<div class="result-card" class:active>
  <span class="label">{label}</span>
  <span class="value">{value}</span>
  {#if unit}
    <span class="unit">{unit}</span>
  {/if}
</div>

<style>
  .result-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    transition: box-shadow var(--transition-base), border-color var(--transition-base);
  }

  .result-card.active {
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
  }

  .label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .value {
    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--accent);
    line-height: var(--leading-tight);
    font-variant-numeric: tabular-nums;
  }

  .unit {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-dim);
  }
</style>

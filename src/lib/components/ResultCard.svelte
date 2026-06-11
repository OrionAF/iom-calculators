<script lang="ts">
  import WikiIcon from './WikiIcon.svelte'

  interface Props {
    label: string
    value: string
    unit?: string
    active?: boolean
    icon?: string
  }

  let { label, value, unit = '', active = false, icon }: Props = $props()
</script>

<div class="result-card" class:active>
  <span class="label">
    <WikiIcon filename={icon} size={14} />
    {label}
  </span>
  <span class="value">{value}</span>
  {#if unit}
    <span class="unit">{unit}</span>
  {/if}
</div>

<style>
  .result-card {
    position: relative;
    overflow: hidden;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    transition: box-shadow var(--transition-base), border-color var(--transition-base);
  }

  /* molten hairline along the top edge */
  .result-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 14px;
    right: 14px;
    border-radius: 0 0 4px 4px;
    height: 3px;
    background: var(--grad-molten);
    opacity: 0.35;
    transition: opacity var(--transition-base);
  }

  .result-card.active {
    border-color: var(--border-accent);
    animation: glow-breathe 3.2s ease-in-out infinite;
  }
  .result-card.active::before { opacity: 1; }

  .label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
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
    line-height: var(--leading-tight);
    font-variant-numeric: tabular-nums;
    color: var(--accent);
    background: var(--grad-molten);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .unit {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-dim);
  }
</style>

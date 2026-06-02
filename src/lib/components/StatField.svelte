<script lang="ts">
  interface Props {
    label: string
    value: string | number
    source?: 'export' | 'manual'
    type?: 'text' | 'number' | 'select'
    options?: string[]
    onchange?: (value: string) => void
  }

  let {
    label,
    value = $bindable(),
    source = 'manual',
    type = 'text',
    options = [],
    onchange,
  }: Props = $props()

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLSelectElement
    onchange?.(target.value)
  }
</script>

<div class="stat-field">
  <div class="field-header">
    <label class="field-label">{label}</label>
    <span class="badge" class:export={source === 'export'} class:manual={source === 'manual'}>
      {source === 'export' ? 'from export' : 'manual'}
    </span>
  </div>

  {#if source === 'export'}
    <div class="field-value-display">{value}</div>
  {:else if type === 'select'}
    <select class="field-input" onchange={handleInput} aria-label={label}>
      {#each options as opt}
        <option value={opt} selected={opt === String(value)}>{opt}</option>
      {/each}
    </select>
  {:else}
    <input
      class="field-input"
      {type}
      value={String(value)}
      oninput={handleInput}
      aria-label={label}
    />
  {/if}
</div>

<style>
  .stat-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .field-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .field-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .badge {
    font-size: 10px;
    padding: 1px 6px;
    border-radius: var(--radius-sm);
    font-weight: var(--weight-medium);
  }

  .badge.export {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  }

  .badge.manual {
    background: color-mix(in srgb, var(--text-muted) 10%, transparent);
    color: var(--text-muted);
    border: 1px solid color-mix(in srgb, var(--text-muted) 20%, transparent);
  }

  .field-value-display {
    font-family: var(--font-mono);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    min-height: 44px;
    display: flex;
    align-items: center;
    font-variant-numeric: tabular-nums;
  }

  .field-input {
    font-family: var(--font-mono);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    min-height: 44px;
    width: 100%;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  .field-input:focus {
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
    outline: none;
  }

  select.field-input {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a0a0c0' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
  }
</style>

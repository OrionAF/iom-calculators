<script lang="ts">
  interface Props {
    label: string
    description?: string
    checked: boolean
    onchange: (v: boolean) => void
  }

  let { label, description, checked, onchange }: Props = $props()
</script>

<label class="toggle-row">
  <div class="toggle-text">
    <span class="toggle-label">{label}</span>
    {#if description}
      <span class="toggle-desc">{description}</span>
    {/if}
  </div>
  <span class="toggle-switch" aria-hidden="true">
    <input
      type="checkbox"
      class="toggle-input"
      role="switch"
      aria-checked={checked}
      checked={checked}
      onchange={(e) => onchange((e.target as HTMLInputElement).checked)}
    />
    <span class="toggle-track"></span>
  </span>
</label>

<style>
  .toggle-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    min-height: 44px;
    cursor: pointer;
  }

  .toggle-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .toggle-label {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    color: var(--text-primary);
  }

  .toggle-desc {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-loose);
  }

  /* Switch container */
  .toggle-switch {
    flex-shrink: 0;
    position: relative;
    width: 42px;
    height: 24px;
    margin-top: 2px;
  }

  /* Invisible checkbox covers the full switch area */
  .toggle-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    margin: 0;
  }

  /* Track */
  .toggle-track {
    display: block;
    width: 42px;
    height: 24px;
    border-radius: 12px;
    background: var(--bg-inset);
    border: 1.5px solid var(--border-strong);
    position: relative;
    pointer-events: none;
    transition: background var(--transition-fast), border-color var(--transition-fast);
  }

  /* Thumb */
  .toggle-track::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--text-dim);
    transition: transform 260ms var(--ease-bounce), background var(--transition-fast);
  }

  /* Checked state */
  .toggle-input:checked ~ .toggle-track {
    background: color-mix(in srgb, var(--accent) 22%, var(--bg-inset));
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
  }

  .toggle-input:checked ~ .toggle-track::after {
    transform: translateX(18px);
    background: var(--grad-molten);
  }

  /* Focus ring */
  .toggle-input:focus-visible ~ .toggle-track {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .toggle-track,
    .toggle-track::after {
      transition: none;
    }
  }
</style>

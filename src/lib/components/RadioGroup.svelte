<script lang="ts" generics="T extends string">
  interface RadioOption {
    value: T
    label: string
    preview?: Record<string, string>
  }

  interface Props {
    label: string
    description?: string
    options: RadioOption[]
    value: T
    onchange: (value: T) => void
    name?: string
  }

  let {
    label,
    description,
    options,
    value,
    onchange,
    name,
  }: Props = $props()

  // Derive a stable name from the label if none provided.
  const groupName = $derived(name ?? label.toLowerCase().replace(/\s+/g, '-'))
</script>

<fieldset class="radio-group">
  <legend class="group-label">{label}</legend>
  {#if description}
    <p class="group-description">{description}</p>
  {/if}

  <div class="options">
    {#each options as opt}
      <label class="option" class:selected={opt.value === value}>
        <input
          type="radio"
          name={groupName}
          value={opt.value}
          checked={opt.value === value}
          onchange={() => onchange(opt.value)}
          class="native-radio"
        />
        <span class="indicator" aria-hidden="true"></span>
        <span class="option-content">
          <span class="option-label">{opt.label}</span>
          {#if opt.preview}
            <span class="preview">
              {#each Object.entries(opt.preview) as [input, output]}
                <span class="preview-input">{input}</span>
                <span class="preview-arrow" aria-hidden="true">→</span>
                <span class="preview-output">{output}</span>
              {/each}
            </span>
          {/if}
        </span>
      </label>
    {/each}
  </div>
</fieldset>

<style>
  .radio-group {
    border: 0;
    padding: 0;
    margin: 0;
    min-width: 0;
  }

  .group-label {
    padding: 0;
    margin-bottom: var(--space-2);
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    color: var(--text-primary);
  }

  .group-description {
    margin-bottom: var(--space-3);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-base);
  }

  /* Cards size to their content and flow in a wrapping row —
     wide enough to never clip, never stretched to fill the page. */
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .option {
    position: relative;
    display: flex;
    flex: 0 1 auto;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    min-height: 44px;
    transition: border-color var(--transition-fast), background var(--transition-fast);
  }

  .option.selected {
    border-color: var(--border-accent);
    background: color-mix(in srgb, var(--accent) 7%, var(--bg-surface));
    box-shadow: var(--shadow-glow);
  }

  @media (hover: hover) {
    .option:not(.selected):hover {
      border-color: var(--text-muted);
    }
  }

  /* Native radio covers the whole card so clicks/taps route to it. */
  .native-radio {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  /* Painted indicator dot (the native input is invisible). */
  .indicator {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border: 2px solid var(--text-muted);
    border-radius: 50%;
    background: transparent;
    transition: border-color var(--transition-fast), background var(--transition-fast);
    position: relative;
  }

  .indicator::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: var(--grad-molten);
    transform: scale(0);
    transition: transform var(--transition-fast);
  }

  .option.selected .indicator {
    border-color: var(--accent);
  }

  .option.selected .indicator::after {
    transform: scale(1);
  }

  /* Focus ring on the wrapping label when the (visually-hidden) radio is focused. */
  .option:has(.native-radio:focus-visible) {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  .option-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    flex: 1;
    min-width: 0;
  }

  .option-label {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
  }

  .preview {
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: var(--space-2);
    row-gap: 2px;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-variant-numeric: tabular-nums;
    color: var(--text-muted);
  }

  .preview-input { color: var(--text-muted); }
  .preview-arrow { color: var(--text-dim); }
  .preview-output { color: var(--text-primary); }
</style>

<script lang="ts">
  import type { Snippet } from 'svelte'

  type Variant = 'primary' | 'ghost' | 'danger' | 'danger-outline'

  interface Props {
    variant?: Variant
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    form?: string
    fullWidth?: boolean
    onclick?: (e: MouseEvent) => void
    children: Snippet
    'aria-label'?: string
    'aria-haspopup'?: 'dialog' | 'menu' | 'true'
    'aria-pressed'?: boolean
  }

  let {
    variant = 'ghost',
    type = 'button',
    disabled = false,
    form,
    fullWidth = false,
    onclick,
    children,
    'aria-label': ariaLabel,
    'aria-haspopup': ariaHaspopup,
    'aria-pressed': ariaPressed,
  }: Props = $props()
</script>

<button
  class="btn btn-{variant}"
  class:btn-full={fullWidth}
  {type}
  {disabled}
  {form}
  {onclick}
  aria-label={ariaLabel}
  aria-haspopup={ariaHaspopup}
  aria-pressed={ariaPressed}
>
  {@render children()}
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: 44px;
    padding: var(--space-2) var(--space-5);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-bold);
    letter-spacing: 0.02em;
    cursor: pointer;
    text-align: center;
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      opacity var(--transition-fast),
      transform var(--transition-bounce);
  }
  @media (hover: hover) {
    .btn:hover:not(:disabled) { transform: translateY(-1px) scale(1.02); }
  }
  .btn:active:not(:disabled) { transform: scale(0.97); }
  .btn:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
  .btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .btn-full { width: 100%; }

  /* primary — molten fill */
  .btn-primary {
    background: var(--grad-molten);
    color: var(--accent-text);
    border: 1px solid var(--accent);
  }
  @media (hover: hover) {
    .btn-primary:hover:not(:disabled) {
      border-color: var(--accent-hover);
      box-shadow: var(--shadow-glow);
    }
  }
  .btn-primary:active:not(:disabled) {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  /* ghost — neutral outlined */
  .btn-ghost {
    background: none;
    color: var(--text-muted);
    border: 1px solid var(--border-strong);
    font-weight: var(--weight-semibold);
  }
  @media (hover: hover) {
    .btn-ghost:hover:not(:disabled) {
      color: var(--text-primary);
      border-color: var(--text-dim);
      background: var(--bg-surface);
    }
  }

  /* danger — solid red */
  .btn-danger {
    background: var(--error);
    color: var(--accent-text);
    border: 1px solid var(--error);
  }
  @media (hover: hover) {
    .btn-danger:hover:not(:disabled) {
      background: color-mix(in srgb, var(--error) 85%, black);
      border-color: color-mix(in srgb, var(--error) 85%, black);
    }
  }

  /* danger-outline — outlined red, fills on hover */
  .btn-danger-outline {
    background: transparent;
    color: var(--error);
    border: 1px solid color-mix(in srgb, var(--error) 55%, transparent);
  }
  @media (hover: hover) {
    .btn-danger-outline:hover:not(:disabled) {
      background: var(--error);
      border-color: var(--error);
      color: var(--accent-text);
    }
  }
</style>

<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    /** Base description from the stat registry. */
    text: string
    /** Optional context-specific addition rendered below the base description. */
    addition?: string
    children: Snippet
  }

  let { text, addition, children }: Props = $props()
</script>

<span class="tooltip-host">
  {@render children()}
  <span class="tooltip" role="tooltip">
    <span class="tooltip-text">{text}</span>
    {#if addition}
      <span class="tooltip-addition">{addition}</span>
    {/if}
  </span>
</span>

<style>
  .tooltip-host {
    position: relative;
    display: inline;
  }

  .tooltip {
    /* Hidden by default */
    visibility: hidden;
    opacity: 0;
    pointer-events: none;

    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-toast);

    width: max-content;
    max-width: min(280px, 90vw);
    padding: var(--space-2) var(--space-3);
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-surface);

    display: flex;
    flex-direction: column;
    gap: var(--space-1);

    transition: opacity var(--transition-fast), visibility var(--transition-fast);
  }

  /* Show on host hover or when child has focus */
  .tooltip-host:hover .tooltip,
  .tooltip-host:focus-within .tooltip {
    visibility: visible;
    opacity: 1;
  }

  /* Flip upward if near the bottom of the viewport */
  @media (hover: hover) {
    .tooltip-host:hover .tooltip { visibility: visible; opacity: 1; }
  }

  .tooltip-text {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-primary);
    line-height: var(--leading-base);
    white-space: normal;
  }

  .tooltip-addition {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--accent);
    line-height: var(--leading-base);
    border-top: 1px solid var(--border);
    padding-top: var(--space-1);
    white-space: normal;
  }

  /* Small caret pointing down toward the trigger */
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--border);
  }
  .tooltip::before {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--bg-raised);
    z-index: 1;
  }
</style>

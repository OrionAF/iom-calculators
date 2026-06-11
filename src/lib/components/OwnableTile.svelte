<script lang="ts">
  import { Check } from 'lucide-svelte'
  import WikiIcon from './WikiIcon.svelte'
  import type { Snippet } from 'svelte'

  export type OwnState = 'unowned' | 'partial' | 'owned'

  interface Props {
    /** Wiki filename for the primary icon. */
    icon?: string
    /** Optional secondary icons (for compound tiles like perk bundles). */
    icons?: string[]
    /** Render-size of icon(s) in px. */
    iconSize?: number
    /** Tile heading. */
    label: string
    /** Owned state. 'partial' renders a warning-tinted border + badge. */
    state: OwnState
    /** Click handler (toggle). */
    onclick: () => void
    /** Tile layout. 'compact' centers content (Perks tab); 'wide' uses
        a left icon + right body (Value Packs / Gem Unlocks). */
    layout?: 'compact' | 'wide'
    /** Optional content rendered below the label (description, cost, effects). */
    body?: Snippet
  }

  let {
    icon,
    icons,
    iconSize = 32,
    label,
    state,
    onclick,
    layout = 'wide',
    body,
  }: Props = $props()
</script>

<button
  type="button"
  class="tile tile-{state} tile-{layout}"
  {onclick}
  aria-pressed={state === 'owned'}
>
  <div class="icon-slot">
    {#if icons && icons.length > 0}
      {#each icons as f}<WikiIcon filename={f} size={iconSize} />{/each}
    {:else if icon}
      <WikiIcon filename={icon} size={iconSize} />
    {/if}
  </div>

  <div class="tile-body">
    <div class="tile-label">{label}</div>
    {#if body}{@render body()}{/if}
    {#if state === 'partial'}
      <span class="badge-partial">Partially owned</span>
    {/if}
  </div>

  {#if state === 'owned'}
    <Check class="tile-check" size={18} aria-hidden="true" />
  {/if}
</button>

<style>
  .tile {
    position: relative;
    display: flex;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    text-align: left;
    font-family: var(--font-body);
    color: var(--text-primary);
    transition:
      border-color var(--transition-fast),
      background var(--transition-fast),
      box-shadow var(--transition-fast);
  }
  .tile:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  /* Layouts */
  .tile-wide {
    align-items: flex-start;
  }
  .tile-compact {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* States */
  .tile-owned {
    border-color: var(--border-accent);
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--accent) 9%, transparent), transparent 60%),
      var(--bg-surface);
    box-shadow: var(--shadow-glow);
  }
  .tile-partial {
    border-color: var(--warning);
    background: color-mix(in srgb, var(--warning) 6%, var(--bg-surface));
  }

  @media (hover: hover) {
    .tile-unowned:hover,
    .tile-partial:hover {
      border-color: var(--text-muted);
    }
  }

  .icon-slot {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    flex-shrink: 0;
  }

  .tile-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .tile-label {
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--text-primary);
    line-height: var(--leading-tight);
  }

  .badge-partial {
    align-self: flex-start;
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--warning);
    background: color-mix(in srgb, var(--warning) 12%, transparent);
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    margin-top: var(--space-1);
  }

  :global(.tile-check) {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    color: var(--accent);
    filter: drop-shadow(0 0 4px color-mix(in srgb, var(--accent) 45%, transparent));
  }
</style>

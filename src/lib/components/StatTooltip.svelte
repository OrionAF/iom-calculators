<script module lang="ts">
  let _counter = 0
</script>

<script lang="ts">
  import WikiIcon from './WikiIcon.svelte'
  import { getStatMeta } from '$lib/stats/registry'
  import { formatStatByKey } from '$lib/format'

  interface Props {
    derivedStatKey: string
    value: number | undefined
    label: string
  }

  let { derivedStatKey, value, label }: Props = $props()

  const meta = $derived(getStatMeta(derivedStatKey))
  const formattedValue = $derived(
    meta && value !== undefined ? formatStatByKey(derivedStatKey, value) : null
  )

  let active = $state(false)
  let uid = $state(0)
  let triggerEl = $state<HTMLSpanElement | null>(null)

  // Fixed position for the bubble — computed from trigger's bounding rect.
  // position: fixed escapes overflow:hidden ancestors (e.g. loaded-stats .stat-field).
  let bubbleTop = $state(0)
  let bubbleLeft = $state(0)

  $effect(() => { uid = ++_counter })

  const BUBBLE_WIDTH = 272
  const GAP = 8  // px between trigger top and bubble bottom

  function computePosition(): void {
    if (!triggerEl) return
    const rect = triggerEl.getBoundingClientRect()
    // Top: bubble will translateY(-100%) so `top` is where the bubble bottom lands.
    // We want it GAP px above the trigger's top edge.
    bubbleTop = rect.top - GAP
    // Left: left-align with trigger, clamped so bubble never bleeds off-screen.
    bubbleLeft = Math.min(
      Math.max(8, rect.left),
      window.innerWidth - BUBBLE_WIDTH - 8,
    )
  }
</script>

{#if meta}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span
    bind:this={triggerEl}
    class="stat-tip"
    tabindex="0"
    role="button"
    aria-label="{label} — tap for stat info"
    aria-describedby="stat-tip-{uid}"
    class:active
    onmouseenter={computePosition}
    onfocus={computePosition}
    onclick={() => { computePosition(); active = !active }}
    onblur={() => (active = false)}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') { computePosition(); active = !active; e.preventDefault() }
      if (e.key === 'Escape') active = false
    }}
  >
    {label}
    <span
      class="tip-bubble"
      id="stat-tip-{uid}"
      role="tooltip"
      style="top: {bubbleTop}px; left: {bubbleLeft}px"
    >
      <div class="tip-head">
        <div class="tip-icon">
          <WikiIcon filename={meta.icon} size={20} />
        </div>
        <span class="tip-name">{meta.name}</span>
      </div>
      <div class="tip-body">
        <p class="tip-desc">{meta.description}</p>
        {#if formattedValue}
          <div class="tip-value-badge">
            <span class="tip-value-label">adds</span>
            <span class="tip-value">{formattedValue}</span>
          </div>
        {/if}
      </div>
    </span>
  </span>
{:else}
  {label}
{/if}

<style>
  /* ── Trigger ── */
  .stat-tip {
    display: inline;
    cursor: help;
    text-decoration: underline;
    text-decoration-style: dotted;
    text-decoration-color: color-mix(in srgb, var(--accent) 45%, transparent);
    text-underline-offset: 3px;
  }

  .stat-tip:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* ── Bubble (position: fixed — escapes all overflow:hidden ancestors) ── */
  .tip-bubble {
    visibility: hidden;
    opacity: 0;
    pointer-events: none;

    position: fixed;
    /* top + left set via inline style from computePosition() */
    /* translateY(-100%) lifts the bubble above the `top` coordinate */
    transform: translateY(-100%) scale(0.98);
    transform-origin: bottom left;

    z-index: var(--z-toast);
    width: 272px;

    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.3);
    overflow: hidden;

    transition:
      opacity 150ms var(--ease-out),
      transform 150ms var(--ease-out),
      visibility 150ms var(--ease-out);
  }

  /* Show on hover, keyboard focus, or touch-activated (.active) */
  .stat-tip:hover .tip-bubble,
  .stat-tip:focus-within .tip-bubble,
  .stat-tip.active .tip-bubble {
    visibility: visible;
    opacity: 1;
    transform: translateY(-100%) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .tip-bubble {
      transition: opacity 150ms ease-out, visibility 150ms ease-out;
      transform: translateY(-100%);
    }
    .stat-tip:hover .tip-bubble,
    .stat-tip:focus-within .tip-bubble,
    .stat-tip.active .tip-bubble {
      transform: translateY(-100%);
    }
  }

  /* Caret pointing down toward trigger */
  .tip-bubble::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 14px;
    border: 6px solid transparent;
    border-top-color: var(--border);
  }
  .tip-bubble::before {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: 14px;
    border: 6px solid transparent;
    border-top-color: var(--bg-raised);
    z-index: 1;
  }

  /* ── Header band ── */
  .tip-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: color-mix(in srgb, var(--accent) 7%, var(--bg-raised));
    border-bottom: 1px solid color-mix(in srgb, var(--accent) 20%, var(--border));
  }

  .tip-icon {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--accent) 12%, var(--bg-raised));
    border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--border));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .tip-name {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.2;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Body ── */
  .tip-body {
    padding: var(--space-2) var(--space-3) var(--space-3);
  }

  .tip-desc {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.55;
    margin: 0 0 var(--space-2) 0;
  }

  /* ── Value badge ── */
  .tip-value-badge {
    display: inline-flex;
    align-items: baseline;
    gap: 5px;
    background: color-mix(in srgb, var(--accent) 12%, var(--bg-raised));
    border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--border));
    border-radius: var(--radius-md);
    padding: 3px var(--space-2);
  }

  .tip-value-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tip-value {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    font-variant-numeric: tabular-nums;
  }
</style>

<script module lang="ts">
  let _counter = 0
</script>

<script lang="ts">
  import WikiIcon from './WikiIcon.svelte'
  import { getStatMeta } from '$lib/stats/registry'

  interface Props {
    derivedStatKey: string
    value: number | undefined
    label: string
  }

  let { derivedStatKey, label }: Props = $props()

  const meta = $derived(getStatMeta(derivedStatKey))

  let active = $state(false)
  let uid = $state(0)
  let triggerEl = $state<HTMLSpanElement | null>(null)

  // Fixed position for the bubble — computed from trigger's bounding rect.
  // position: fixed escapes overflow:hidden ancestors (e.g. loaded-stats .stat-field).
  let bubbleTop = $state(0)
  let bubbleLeft = $state(0)
  let bubbleEl = $state<HTMLSpanElement | null>(null)
  // When the trigger sits near the viewport top (e.g. after scrolling),
  // there's no room above — flip the bubble below the trigger instead.
  let placeBelow = $state(false)
  let hovering = $state(false)

  $effect(() => { uid = ++_counter })

  const BUBBLE_WIDTH = 272
  const GAP = 8  // px between trigger edge and bubble

  function computePosition(): void {
    if (!triggerEl) return
    const rect = triggerEl.getBoundingClientRect()
    // visibility:hidden keeps layout, so offsetHeight is measurable pre-show.
    const bubbleHeight = bubbleEl?.offsetHeight ?? 140
    placeBelow = rect.top - GAP - bubbleHeight < 8
    // Above: bubble is translateY(-100%), so `top` is where its bottom lands.
    // Below: no translate, `top` is where its top edge lands.
    bubbleTop = placeBelow ? rect.bottom + GAP : rect.top - GAP
    // Left: left-align with trigger, clamped so bubble never bleeds off-screen.
    bubbleLeft = Math.min(
      Math.max(8, rect.left),
      window.innerWidth - BUBBLE_WIDTH - 8,
    )
  }

  // Re-anchor while scrolling (capture catches nested scroll containers too) —
  // a fixed-position bubble otherwise detaches from its trigger mid-scroll.
  function handleScroll(): void {
    if (hovering || active) computePosition()
  }
</script>

<svelte:window onscrollcapture={handleScroll} />

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
    onmouseenter={() => { hovering = true; computePosition() }}
    onmouseleave={() => (hovering = false)}
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
      bind:this={bubbleEl}
      class="tip-bubble"
      class:below={placeBelow}
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
    transform: translateY(-100%) scale(0.94);
    transform-origin: bottom left;

    z-index: var(--z-toast);
    width: 272px;

    background: var(--bg-raised);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-raised), var(--shadow-glow);
    /* Reset inherited white-space (e.g. from overflow:hidden+nowrap ancestors) */
    white-space: normal;

    transition:
      opacity 150ms var(--ease-out),
      transform 220ms var(--ease-bounce),
      visibility 150ms var(--ease-out);
  }

  .tip-bubble.below {
    transform: translateY(0) scale(0.94);
    transform-origin: top left;
  }

  /* Show on hover, keyboard focus, or touch-activated (.active) */
  .stat-tip:hover .tip-bubble,
  .stat-tip:focus-within .tip-bubble,
  .stat-tip.active .tip-bubble {
    visibility: visible;
    opacity: 1;
    transform: translateY(-100%) scale(1);
  }
  .stat-tip:hover .tip-bubble.below,
  .stat-tip:focus-within .tip-bubble.below,
  .stat-tip.active .tip-bubble.below {
    transform: translateY(0) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .tip-bubble {
      transition: opacity 150ms ease-out, visibility 150ms ease-out;
      transform: translateY(-100%);
    }
    .tip-bubble.below {
      transform: translateY(0);
    }
    .stat-tip:hover .tip-bubble,
    .stat-tip:focus-within .tip-bubble,
    .stat-tip.active .tip-bubble {
      transform: translateY(-100%);
    }
    .stat-tip:hover .tip-bubble.below,
    .stat-tip:focus-within .tip-bubble.below,
    .stat-tip.active .tip-bubble.below {
      transform: translateY(0);
    }
  }

  /* Caret pointing down toward trigger */
  .tip-bubble::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 18px;
    border: 6px solid transparent;
    border-top-color: var(--border-strong);
  }
  .tip-bubble::before {
    content: '';
    position: absolute;
    top: calc(100% - 1px);
    left: 18px;
    border: 6px solid transparent;
    border-top-color: var(--bg-raised);
    z-index: 1;
  }
  .tip-bubble.below::after {
    top: auto;
    bottom: 100%;
    border-top-color: transparent;
    border-bottom-color: var(--border-strong);
  }
  .tip-bubble.below::before {
    top: auto;
    bottom: calc(100% - 1px);
    border-top-color: transparent;
    border-bottom-color: color-mix(in srgb, var(--accent) 7%, var(--bg-raised));
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
    /* Clip amber background to top corners of bubble */
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .tip-icon {
    width: 30px;
    height: 30px;
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
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: var(--weight-bold);
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
    margin: 0;
  }
</style>

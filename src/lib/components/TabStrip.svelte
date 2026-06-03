<script lang="ts">
  import type { Component } from 'svelte'

  interface Tab {
    id: string
    label: string
    icon?: Component
    badgeCount?: number
  }

  interface Props {
    tabs: Tab[]
    value: string
    onchange: (id: string) => void
    ariaLabel?: string
  }

  let { tabs, value, onchange, ariaLabel = 'Tabs' }: Props = $props()

  let stripEl: HTMLDivElement | undefined = $state()

  function handleKeydown(e: KeyboardEvent, currentIndex: number) {
    let target: number | null = null
    if (e.key === 'ArrowRight') target = (currentIndex + 1) % tabs.length
    else if (e.key === 'ArrowLeft') target = (currentIndex - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = tabs.length - 1
    if (target !== null) {
      e.preventDefault()
      onchange(tabs[target].id)
      requestAnimationFrame(() => {
        const btn = stripEl?.querySelector<HTMLButtonElement>(`#${tabs[target!].id}-tab`)
        btn?.focus()
      })
    }
  }
</script>

<div class="tabstrip-wrap">
  <div role="tablist" aria-label={ariaLabel} class="tabstrip" bind:this={stripEl}>
    {#each tabs as tab, i}
      <button
        type="button"
        role="tab"
        id="{tab.id}-tab"
        aria-selected={tab.id === value}
        aria-controls="{tab.id}-panel"
        tabindex={tab.id === value ? 0 : -1}
        class="tab"
        class:active={tab.id === value}
        onclick={() => onchange(tab.id)}
        onkeydown={(e) => handleKeydown(e, i)}
      >
        {#if tab.icon}
          {@const Icon = tab.icon}
          <Icon size={14} aria-hidden="true" />
        {/if}
        <span class="tab-label">{tab.label}</span>
        {#if tab.badgeCount !== undefined}
          <span class="tab-badge" aria-hidden="true">{tab.badgeCount}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style>
  .tabstrip-wrap {
    position: relative;
    margin-bottom: var(--space-6);
  }

  .tabstrip {
    display: flex;
    gap: 2px;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    border-bottom: 1px solid var(--border);
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    mask-image: linear-gradient(to right, black calc(100% - 24px), transparent);
  }
  .tabstrip::-webkit-scrollbar { display: none; }

  .tab {
    scroll-snap-align: start;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    min-height: 44px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--text-muted);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: color var(--transition-fast), border-color var(--transition-fast);
  }
  .tab:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: -2px;
    border-radius: var(--radius-sm);
  }
  .tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
    font-weight: var(--weight-bold);
  }
  @media (hover: hover) {
    .tab:not(.active):hover { color: var(--text-primary); }
  }

  .tab-badge {
    background: color-mix(in srgb, var(--text-muted) 15%, transparent);
    color: var(--text-muted);
    font-size: 10px;
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
    padding: 1px 6px;
    border-radius: var(--radius-sm);
    line-height: var(--leading-tight);
  }
  .tab.active .tab-badge {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
  }
</style>

<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    title: string
    description?: string
    actions?: Snippet
  }

  let { title, description, actions }: Props = $props()
</script>

<header class="page-header">
  <div class="title-row">
    <h1 class="page-title">{title}</h1>
    {#if actions}
      <div class="actions">{@render actions()}</div>
    {/if}
  </div>
  {#if description}
    <p class="page-description">{description}</p>
  {/if}
</header>

<style>
  .page-header {
    margin-bottom: var(--space-6);
  }
  .title-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
  .page-title {
    position: relative;
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--text-primary);
    letter-spacing: 0.01em;
    line-height: var(--leading-tight);
    flex: 1;
    min-width: 0;
    padding-bottom: var(--space-2);
  }
  /* molten underline bar */
  .page-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 4px;
    border-radius: var(--radius-pill);
    background: var(--grad-molten);
    animation: dash-grow 0.5s var(--ease-out) 0.05s both;
  }
  .page-description {
    font-size: var(--text-base);
    color: var(--text-muted);
    line-height: var(--leading-loose);
    margin-top: var(--space-2);
  }
  .actions {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    flex-shrink: 0;
  }
</style>

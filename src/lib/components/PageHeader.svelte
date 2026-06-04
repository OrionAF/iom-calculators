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
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--accent);
    letter-spacing: 0.04em;
    flex: 1;
    min-width: 0;
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

<script lang="ts">
  import { HelpCircle } from 'lucide-svelte'

  interface Props {
    filename: string | undefined
    size?: number
    width?: number
    height?: number
    alt?: string
    class?: string
  }

  let { filename, size = 16, width, height, alt = '', class: extraClass = '' }: Props = $props()

  const w = $derived(width ?? size)
  const h = $derived(height ?? size)

  let errored = $state(false)

  // Reset error state if the filename changes (e.g. parent re-uses the component with a different stat).
  $effect(() => {
    filename
    errored = false
  })
</script>

{#if filename}
  {#if errored}
    <HelpCircle
      class={'wiki-icon wiki-icon-fallback ' + extraClass}
      size={Math.max(w, h)}
      aria-hidden={alt === ''}
      aria-label={alt || undefined}
    />
  {:else}
    <img
      class={'wiki-icon ' + extraClass}
      src={'https://shminer.miraheze.org/wiki/Special:Redirect/file/' + filename}
      width={w}
      height={h}
      alt={alt}
      loading="lazy"
      onerror={() => { errored = true }}
    />
  {/if}
{/if}

<style>
  :global(.wiki-icon) {
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
    image-rendering: pixelated;
  }

  :global(.wiki-icon-fallback) {
    color: var(--text-dim);
  }
</style>

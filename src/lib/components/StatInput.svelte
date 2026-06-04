<script lang="ts">
  import { onDestroy } from 'svelte'
  import { ChevronDown } from 'lucide-svelte'
  import { loadStats, clearStats, stats } from '$lib/stores/stats'
  import type { ParseError } from '$lib/stores/stats'
  import Button from './Button.svelte'

  let textValue = $state('')
  let error = $state<ParseError | null>(null)
  let collapsed = $state(true)
  let flash = $state(false)
  let flashTimer: ReturnType<typeof setTimeout> | null = null

  function errorMessage(e: ParseError): string {
    switch (e.kind) {
      case 'invalid-json':
        return `Invalid JSON: ${e.message}`
      case 'missing-stats-key':
        return 'Export is missing the "stats" field. Did you paste the right code?'
      case 'unsupported-version':
        return `Unsupported export version: ${e.version}`
    }
  }

  function triggerFlash() {
    if (flashTimer !== null) clearTimeout(flashTimer)
    flash = true
    flashTimer = setTimeout(() => {
      flash = false
      flashTimer = null
    }, 600)
  }

  onDestroy(() => {
    if (flashTimer !== null) clearTimeout(flashTimer)
  })

  function submit() {
    if (!textValue.trim()) return
    const result = loadStats(textValue.trim())
    if (result.ok) {
      error = null
      textValue = ''
      collapsed = true
      triggerFlash()
    } else {
      error = result.error
    }
  }

  function handlePaste(e: ClipboardEvent) {
    const pasted = e.clipboardData?.getData('text') ?? ''
    if (!pasted) return
    setTimeout(() => {
      const result = loadStats(pasted)
      if (result.ok) {
        error = null
        textValue = ''
        collapsed = true
        triggerFlash()
      } else {
        error = result.error
        textValue = pasted
      }
    }, 0)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) submit()
  }
</script>

<div class="stat-input">
  <!-- Status indicator. aria-live announces parse errors persistently (L2). -->
  <button
    class="status-row"
    onclick={() => (collapsed = !collapsed)}
    aria-expanded={!collapsed}
    aria-controls="stat-paste-panel"
  >
    <span class="dot" class:loaded={!!$stats} class:flash class:error={!!error} aria-hidden="true"></span>
    <span class="status-text" aria-live="polite">
      {#if error}
        Error loading stats
      {:else if $stats}
        Stats loaded ({$stats.version})
      {:else}
        No stats — paste export
      {/if}
    </span>
    <ChevronDown class="chevron {!collapsed ? 'open' : ''}" size={16} aria-hidden="true" />
  </button>

  <!-- Collapsible paste panel -->
  {#if !collapsed}
    <div class="paste-panel" id="stat-paste-panel">
      {#if !$stats && !textValue.trim()}
        <!-- X7: surface the in-game export instruction inline -->
        <p class="export-hint">
          In-game: <strong>Options → Enter Code → type 'EXPORTSTATS'</strong>, then paste it here.
        </p>
      {/if}
      <textarea
        class="paste-area"
        bind:value={textValue}
        onpaste={handlePaste}
        onkeydown={handleKeydown}
        placeholder='Paste your EXPORT JSON here…'
        aria-label="Stat export JSON"
        spellcheck="false"
        rows="5"
      ></textarea>

      {#if error}
        <p class="error-msg" role="alert">{errorMessage(error)}</p>
      {/if}

      <div class="actions">
        <Button variant="primary" onclick={submit} disabled={!textValue.trim()} fullWidth>
          {#snippet children()}Load Stats{/snippet}
        </Button>
        {#if $stats}
          <Button variant="ghost" onclick={() => { clearStats(); collapsed = true }}>
            {#snippet children()}Clear{/snippet}
          </Button>
        {/if}
      </div>
      <p class="hint">Tip: stats auto-load on paste. Ctrl+Enter to submit.</p>
    </div>
  {/if}
</div>

<style>
  .stat-input {
    border-bottom: 1px solid var(--border);
    padding-bottom: var(--space-3);
    margin-bottom: var(--space-3);
  }

  .status-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    width: 100%;
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: var(--text-sm);
    font-family: var(--font-body);
    cursor: pointer;
    padding: var(--space-2) 0;
    min-height: 44px;
    text-align: left;
  }

  .status-row:hover { color: var(--text-primary); }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-dim);
    flex-shrink: 0;
    transition: background var(--transition-fast);
  }
  .dot.loaded { background: var(--success); }
  .dot.error  { background: var(--error); }

  .dot.flash {
    animation: dot-pulse 600ms ease-out;
  }

  @keyframes dot-pulse {
    0%   { transform: scale(1);   box-shadow: 0 0 0 0 color-mix(in srgb, var(--success) 60%, transparent); }
    50%  { transform: scale(1.4); box-shadow: 0 0 0 6px color-mix(in srgb, var(--success) 0%, transparent); }
    100% { transform: scale(1);   box-shadow: 0 0 0 0 color-mix(in srgb, var(--success) 0%, transparent); }
  }

  .status-text { flex: 1; }

  :global(.chevron) {
    color: var(--text-muted);
    transition: transform var(--transition-fast);
  }
  :global(.chevron.open) { transform: rotate(180deg); }

  .paste-panel {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-top: var(--space-2);
  }

  .paste-area {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-primary);
    background: var(--bg-base);
    border: 1px dashed var(--border-accent);
    border-radius: var(--radius-md);
    padding: var(--space-3);
    width: 100%;
    resize: vertical;
    min-height: 120px;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }
  .paste-area:focus {
    box-shadow: var(--shadow-glow);
    outline: none;
    border-style: solid;
  }

  .error-msg {
    font-size: var(--text-sm);
    color: var(--error);
    background: color-mix(in srgb, var(--error) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--error) 30%, transparent);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    line-height: var(--leading-base);
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }

  .export-hint {
    font-size: var(--text-xs);
    color: var(--text-muted);
    line-height: var(--leading-base);
    padding: var(--space-2) var(--space-3);
    background: color-mix(in srgb, var(--accent) 6%, transparent);
    border-left: 2px solid var(--accent);
    border-radius: var(--radius-sm);
  }
  .export-hint strong {
    color: var(--accent);
    font-weight: var(--weight-medium);
  }

  .hint {
    font-size: var(--text-xs);
    color: var(--text-dim);
  }
</style>

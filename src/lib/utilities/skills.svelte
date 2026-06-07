<script lang="ts">
  import { Search, ChevronDown, Lock } from 'lucide-svelte'
  import { SKILL_SECTIONS, ALL_SKILLS, TOTAL_SP, type SkillNode } from '$lib/skills/catalog'
  import { skillProgress, setSkillLevel } from '$lib/stores/skillProgress'
  import WikiIcon from '$lib/components/WikiIcon.svelte'
  import PageHeader from '$lib/components/PageHeader.svelte'

  // ── Collapse state ────────────────────────────────────────────────────────

  const COLLAPSE_KEY = 'iom-skills-collapsed'

  function loadCollapsed(): Set<string> {
    try {
      const raw = sessionStorage.getItem(COLLAPSE_KEY)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch { return new Set() }
  }

  function saveCollapsed(s: Set<string>): void {
    try { sessionStorage.setItem(COLLAPSE_KEY, JSON.stringify([...s])) } catch { /* noop */ }
  }

  let collapsedSections = $state(loadCollapsed())

  function toggleSection(id: string): void {
    if (collapsedSections.has(id)) collapsedSections.delete(id)
    else collapsedSections.add(id)
    collapsedSections = new Set(collapsedSections)
    saveCollapsed(collapsedSections)
  }

  // ── Search ────────────────────────────────────────────────────────────────

  let filterText = $state('')
  const normalizedFilter = $derived(filterText.trim().toLowerCase())

  function matchesFilter(skill: SkillNode, q: string): boolean {
    if (!q) return true
    if (skill.name.toLowerCase().includes(q)) return true
    if (skill.bonuses.some(b => b.toLowerCase().includes(q))) return true
    return false
  }

  // ── SP stats ─────────────────────────────────────────────────────────────

  /** SP spent so far (sum of costs[0..level-1] for each owned skill). */
  const spSpent = $derived(
    ALL_SKILLS.reduce((acc, skill) => {
      const level = $skillProgress[skill.id] ?? 0
      for (let i = 0; i < level; i++) acc += skill.costs[i] ?? 0
      return acc
    }, 0)
  )

  const ownedCount = $derived(
    ALL_SKILLS.filter(s => ($skillProgress[s.id] ?? 0) > 0).length
  )

  // ── Skill interaction ─────────────────────────────────────────────────────

  function cycleUp(skill: SkillNode): void {
    const current = $skillProgress[skill.id] ?? 0
    const next = current >= skill.costs.length ? 0 : current + 1
    setSkillLevel(skill.id, next)
  }

  function cycleDown(skill: SkillNode, e: MouseEvent): void {
    e.preventDefault()
    const current = $skillProgress[skill.id] ?? 0
    if (current === 0) return
    setSkillLevel(skill.id, current - 1)
  }

  // ── Derived sections (with filter applied) ────────────────────────────────

  const visibleSections = $derived(
    SKILL_SECTIONS
      .map(sec => ({
        ...sec,
        skills: sec.skills.filter(s => matchesFilter(s, normalizedFilter)),
      }))
      .filter(sec => sec.skills.length > 0)
  )

  // ── Level badge label ────────────────────────────────────────────────────


</script>

<div class="page">
  <PageHeader
    title="Skill Tree"
    description="Track which skills you've purchased. Click to own, right-click to undo. Multi-level skills cycle on each click."
  />

  <!-- SP summary bar -->
  <div class="summary-bar">
    <div class="summary-stat">
      <span class="summary-num">{spSpent.toLocaleString()}</span>
      <span class="summary-label">SP spent</span>
    </div>
    <div class="summary-divider" aria-hidden="true"></div>
    <div class="summary-stat">
      <span class="summary-num">{ownedCount}</span>
      <span class="summary-label">of {ALL_SKILLS.length} owned</span>
    </div>
    <div class="summary-divider" aria-hidden="true"></div>
    <div class="summary-stat">
      <span class="summary-num">{TOTAL_SP.toLocaleString()}</span>
      <span class="summary-label">SP to max all</span>
    </div>
  </div>

  <!-- Search -->
  <div class="toolbar">
    <div class="search-wrap">
      <Search size={16} class="search-icon" aria-hidden="true" />
      <input
        type="search"
        class="filter-input"
        bind:value={filterText}
        placeholder="Search skills…"
        autocomplete="off"
        spellcheck="false"
        inputmode="search"
        aria-label="Filter skills by name or effect"
      />
    </div>
  </div>

  <!-- Sections -->
  {#if visibleSections.length === 0}
    <p class="no-results">No skills match your search.</p>
  {:else}
    {#each visibleSections as section (section.id)}
      {@const collapsed = collapsedSections.has(section.id)}
      <article class="skill-section" class:collapsed>
        <button
          type="button"
          class="section-header"
          aria-expanded={!collapsed}
          aria-controls="sec-{section.id}"
          onclick={() => toggleSection(section.id)}
        >
          <h2 class="section-title">
            {#if section.id !== 'early'}
              <Lock size={13} class="lock-icon" aria-label="Requires {section.label}" />
            {/if}
            {section.label}
          </h2>
          <div class="section-meta">
            <span class="section-count">{section.skills.length}</span>
            <ChevronDown class="collapse-chevron" size={16} aria-hidden="true" />
          </div>
        </button>

        {#if !collapsed}
          <div id="sec-{section.id}" class="section-body">
            <div class="skill-grid">
              {#each section.skills as skill (skill.id)}
                {@const level = $skillProgress[skill.id] ?? 0}
                {@const owned = level > 0}
                {@const maxLevel = skill.costs.length}
                {@const isMulti = maxLevel > 1}
                {@const costForNextLevel = level < maxLevel ? skill.costs[level] : null}

                <button
                  type="button"
                  class="skill-btn"
                  class:owned
                  class:multi={isMulti}
                  onclick={() => cycleUp(skill)}
                  oncontextmenu={(e) => cycleDown(skill, e)}
                  title="{skill.name}&#10;{owned ? 'Right-click to undo' : 'Click to purchase'}"
                  aria-pressed={owned}
                >
                  <!-- Header: icon + name + level badge -->
                  <div class="skill-head">
                    <div class="skill-icon">
                      <WikiIcon filename={skill.image} size={28} alt="" />
                    </div>
                    <span class="skill-name">{skill.name}</span>
                    {#if isMulti && owned}
                      <span class="level-badge">{level}/{maxLevel}</span>
                    {:else if owned}
                      <span class="owned-dot" aria-hidden="true"></span>
                    {/if}
                  </div>

                  <!-- Bonuses -->
                  <ul class="bonus-list">
                    {#each skill.bonuses as bonus}
                      <li>{bonus}</li>
                    {/each}
                  </ul>

                  <!-- Footer: cost -->
                  <div class="skill-footer">
                    {#if owned && level === maxLevel}
                      <span class="cost-badge maxed">Maxed</span>
                    {:else if costForNextLevel !== null}
                      <span class="cost-badge">
                        {#if owned && isMulti}Next: {/if}{costForNextLevel} SP
                      </span>
                    {/if}
                    {#if skill.obeliskLevel}
                      <span class="obelisk-badge">
                        <Lock size={10} aria-hidden="true" /> OL {skill.obeliskLevel}
                      </span>
                    {/if}
                  </div>
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </article>
    {/each}
  {/if}
</div>

<style>
  /* ── Summary bar ────────────────────────────────────── */
  .summary-bar {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    flex-wrap: wrap;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-6);
    margin-bottom: var(--space-6);
  }

  .summary-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .summary-num {
    font-family: var(--font-mono);
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--accent);
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  .summary-label {
    font-size: var(--text-xs);
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }

  .summary-divider {
    width: 1px;
    height: 32px;
    background: var(--border);
    flex-shrink: 0;
  }

  /* ── Toolbar ────────────────────────────────────────── */
  .toolbar {
    margin-bottom: var(--space-6);
  }

  .search-wrap {
    position: relative;
  }

  :global(.search-icon) {
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
  }

  .filter-input {
    width: 100%;
    font-family: var(--font-mono);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3) var(--space-2) calc(var(--space-3) * 2 + 16px);
    min-height: 44px;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }
  .filter-input:focus {
    outline: none;
    border-color: var(--border-accent);
    box-shadow: var(--shadow-glow);
  }

  .no-results {
    text-align: center;
    color: var(--text-muted);
    font-size: var(--text-sm);
    padding: var(--space-8) 0;
  }

  /* ── Section card ───────────────────────────────────── */
  .skill-section {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
    overflow: hidden;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-4) var(--space-5);
    background: none;
    border: none;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    text-align: left;
    gap: var(--space-3);
    transition: background var(--transition-fast);
  }
  .skill-section.collapsed .section-header {
    border-bottom: none;
  }
  .section-header:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: -2px;
  }
  @media (hover: hover) {
    .section-header:hover {
      background: color-mix(in srgb, var(--text-primary) 4%, transparent);
    }
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    color: var(--accent);
    letter-spacing: 0.04em;
  }

  :global(.lock-icon) {
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .section-meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-shrink: 0;
  }

  .section-count {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-dim);
    letter-spacing: 0.08em;
  }

  :global(.collapse-chevron) {
    color: var(--text-muted);
    transition: transform var(--transition-fast);
  }
  .skill-section.collapsed :global(.collapse-chevron) {
    transform: rotate(-90deg);
  }

  .section-body {
    padding: var(--space-4);
  }

  /* ── Skill grid ─────────────────────────────────────── */
  .skill-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--space-3);
  }

  /* ── Skill button ───────────────────────────────────── */
  .skill-btn {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3);
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    font-family: var(--font-body);
    color: var(--text-primary);
    transition:
      border-color var(--transition-fast),
      background var(--transition-fast),
      box-shadow var(--transition-fast);
    position: relative;
  }
  .skill-btn:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }
  @media (hover: hover) {
    .skill-btn:not(.owned):hover {
      border-color: var(--border-accent);
      background: color-mix(in srgb, var(--accent) 4%, var(--bg-base));
    }
  }
  .skill-btn.owned {
    border-color: var(--border-accent);
    background: color-mix(in srgb, var(--accent) 8%, var(--bg-base));
    box-shadow: var(--shadow-glow);
  }

  /* ── Skill head (icon + name + badge) ──────────────── */
  .skill-head {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .skill-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: color-mix(in srgb, var(--text-primary) 6%, transparent);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .skill-name {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--text-primary);
    line-height: var(--leading-tight);
    flex: 1;
    min-width: 0;
  }

  .owned-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  .level-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: var(--weight-semibold);
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* ── Bonus list ─────────────────────────────────────── */
  .bonus-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
  }

  .bonus-list li {
    font-size: var(--text-xs);
    color: var(--text-muted);
    line-height: var(--leading-snug);
    padding: 1px 0;
  }

  .bonus-list li::before {
    content: '• ';
    color: var(--text-dim);
  }

  .skill-btn.owned .bonus-list li {
    color: var(--text-secondary);
  }

  /* ── Skill footer (cost + obelisk) ──────────────────── */
  .skill-footer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: auto;
    padding-top: var(--space-2);
    border-top: 1px solid var(--border);
  }

  .cost-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: var(--weight-medium);
    color: var(--text-muted);
    background: color-mix(in srgb, var(--text-primary) 6%, transparent);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    white-space: nowrap;
  }

  .cost-badge.maxed {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }

  .obelisk-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-dim);
    margin-left: auto;
    white-space: nowrap;
  }
</style>

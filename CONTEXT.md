# CONTEXT.md — iom-calculators

---

## STACK

- **Lang**: TypeScript 5 strict (`noUnusedLocals`, `noUnusedParameters`), ESNext modules
- **Framework**: Svelte 5 (runes API — `$state`, `$derived`, `$effect`; NO legacy stores in components)
- **Build**: Vite 5, `base: '/iom-calculators/'` (GitHub Pages), `$lib` alias → `src/lib/`
- **Test**: Vitest 3, jsdom environment, globals enabled — NO coverage thresholds
- **Icons**: lucide-svelte ^0.513
- **Fonts**: Sora (display/body) + IBM Plex Mono (mono) — Google Fonts, loaded in `index.html`
- **Storage**: localStorage only, JSON-serialized via `persistedStore`
- **Deploy**: GitHub Actions → Pages, `dist/` artifact

---

## RUN

```bash
npm install          # install deps
npm run dev          # Vite dev server (localhost:5173/iom-calculators/)
npm run build        # production build → dist/
npm run check        # svelte-check + tsc (0 errors = gate)
npm test             # vitest run (single pass)
npm run test:watch   # vitest interactive
```

No DB, no migrations, no env vars. Pure client-side SPA.

---

## MAP

```
src/
├── main.ts                          # mount(App, #app) — 5 lines
├── app.css                          # ALL design tokens, density system, breakpoints
├── App.svelte                       # root: routing shell, density/font attrs on <html>, drawer inert logic
│
├── lib/
│   ├── calculators/
│   │   ├── registry.ts              # Destination[] — 5 routes (loaded-stats|store|skills|fishing|settings)
│   │   ├── fishing.svelte           # Calculator page: fishing stat engine UI
│   │   └── logic/
│   │       └── fishing.ts           # Pure TS fishing calculator logic (tested)
│   │
│   ├── components/                  # Shared UI primitives
│   │   ├── StatTooltip.svelte       # position:fixed tooltip, getBoundingClientRect, module-level ID counter
│   │   ├── WikiIcon.svelte          # <img> from shminer.miraheze.org — external CDN, no cache
│   │   ├── OwnableTile.svelte       # Binary owned/unowned tile (store page)
│   │   ├── Sidebar.svelte           # Nav sidebar + mobile drawer (reads drawerOpen store)
│   │   ├── StatInput.svelte         # Numeric input w/ clamp, suffix
│   │   ├── RadioGroup.svelte        # Generic radio group
│   │   ├── TabStrip.svelte          # Tab bar
│   │   ├── Toggle.svelte            # Boolean switch
│   │   ├── ResultCard.svelte        # Calculator output card
│   │   ├── PageHeader.svelte        # Title + description
│   │   ├── Button.svelte            # Styled button
│   │   ├── EmptyState.svelte        # Empty state placeholder
│   │   ├── Modal.svelte             # Modal + focusTrap action
│   │   ├── StatField.svelte         # Inline stat key+value
│   │   └── Tooltip.svelte           # Generic hover tooltip
│   │
│   ├── engine/
│   │   ├── types.ts                 # Source, Contribution, StatFormula, FormulaMap, Op, RuntimeInput
│   │   └── compute.ts              # 7 pure fns: computeStat, computeAll, getRequiredSources, etc.
│   │
│   ├── formulas/                    # 15 domain files + index
│   │   ├── index.ts                 # ALL_FORMULAS = spread of all 15 FormulaMap objects
│   │   ├── fishing.ts               # Fully wired
│   │   ├── stars.ts                 # Fully wired
│   │   ├── pickaxe.ts | bombs.ts | ores.ts | veins.ts | crafting.ts
│   │   ├── contracts.ts | drones.ts | chests.ts | lootbugs.ts | lootfrogs.ts
│   │   ├── prestige.ts | obelisk.ts | misc.ts
│   │   └── *.test.ts               # fishing, stars, remaining tested
│   │
│   ├── sources/                     # 12 source definition files
│   │   ├── skillTree.ts             # 510 LOC — largest source file; deduped keys for shared inputs
│   │   ├── fishing.ts | stargazing.ts | relics.ts | items.ts | store.ts
│   │   ├── workshop.ts | contracts.ts | artifacts.ts | construct.ts | pets.ts
│   │   ├── cards.ts | challenges.ts
│   │   └── *.test.ts
│   │
│   ├── skills/
│   │   └── catalog.ts               # 64 SkillNode[], 8 SkillSection[], TOTAL_SP=18716 — parsed from wiki
│   │
│   ├── stats/
│   │   ├── registry.ts              # 1300 LOC — STAT_REGISTRY: key→{name,description,icon,affix}
│   │   └── catalog.ts               # STAT_CATALOG: display grouping for loaded-stats page (key[] per category)
│   │
│   ├── store/                       # ⚠ game's Store (shop), NOT Svelte stores
│   │   └── catalog.ts               # 1121 LOC — VALUE_PACKS, PERKS, PERK_BUNDLES, GEM_UPGRADES, FOUNDER_TIERS
│   │
│   ├── stores/                      # ⚠ Svelte state stores, NOT game's Store
│   │   ├── stats.ts                 # iom-stats → StatsExport|null (loadStats/clearStats only)
│   │   ├── settings.ts              # iom-settings → Settings (notation|valueDisplayMode|fontScale|density|statTooltips)
│   │   ├── storeProgress.ts         # iom-store-progress → StoreProgress (has migration from legacy flat format)
│   │   ├── skillProgress.ts         # iom-skill-progress → Record<string,number> (level per skill)
│   │   ├── router.ts                # currentRoute readable — hash→Destination|null; navigate(hash)
│   │   └── drawer.ts                # drawerOpen writable — mobile nav state
│   │
│   ├── storage/
│   │   └── persistedStore.ts        # writable + localStorage sync; validate fn coerces unknown→T on read
│   │
│   ├── utilities/                   # Full page components
│   │   ├── loaded-stats.svelte      # 522 LOC — stat export viewer, search, collapse, 2-layer derived filter
│   │   ├── store.svelte             # 842 LOC — in-game store tracker, tabs, scroll restore, mirror logic
│   │   ├── skills.svelte            # 1060 LOC — skill tree tracker, SP counter, collapse, search
│   │   └── settings.svelte          # 308 LOC — all setting controls + reset
│   │
│   ├── actions/
│   │   ├── focusTrap.ts             # Modal focus trap
│   │   └── focusOnMount.ts          # Auto-focus on mount
│   │
│   └── format.ts                    # 180 LOC — formatStat(n,notation), formatStatByKey(key,val), parseStat(s)
```

---

## FLOW

### Routing
```
hashchange → currentRoute (readable) → App.svelte $effect
  → dynamic import(destination.loader)
  → mount component in <main>
```
Unknown hash → `null` → HomeGrid renders. No error state.

### Stat Export (loaded-stats page)
```
user pastes JSON → loadStats(json)
  → JSON.parse → isValidExport guard
  → _stats.set(parsed) → localStorage['iom-stats']
  → $stats reactive → loaded-stats.svelte re-derives
  → STAT_CATALOG categories → filter → format → render
```

### Engine Compute Path
```
FormulaMap[statKey]
  → contributions[].source.fn(levels[source.key] ?? 0, rt)
  → op '+' → result += fn()
  → op '×' → result *= fn()
  → op '='  → result  = fn()
  → skip if unknown: true
```
`levels` = `Record<sourceKey, number>` from user inputs.
`rt` = `Record<runtimeInputKey, number>` (e.g. legendaryFishFound).

### Store Progress Mutation
```
user click → setValuePack(slug, true)
  → _store.update(s => ({...s, valuePacks: {...s.valuePacks, [slug]: true}}))
  → persistedStore subscriber → localStorage.setItem('iom-store-progress', JSON.stringify(...))
  → $storeProgress reactive → store.svelte re-renders tile state
```

### Settings → DOM
```
$settings.density → App.svelte $effect
  → document.documentElement.setAttribute('data-density', density)
  → CSS :root[data-density="compact"] { --page-cols: 4 }
```

### Skill Interaction
```
click skill button → cycleUp(skill)
  → level = ($skillProgress[skill.id] ?? 0)
  → next = level >= skill.costs.length ? 0 : level + 1
  → setSkillLevel(id, next) → skillProgress.update(...)
  → spSpent $derived re-runs (sums costs[0..level-1] for all owned skills)
```

---

## RULES

### Svelte 5 Runes (strictly enforced)
- State: `let x = $state(...)` — NOT `writable()`
- Derived: `const x = $derived(...)` — NOT `$: x = ...`
- Effects: `$effect(() => {...})` — NOT `$: {...}` for side effects
- Props: `let { x }: Props = $props()` interface destructure
- Snippets: `{#snippet name()}...{/snippet}` + `{@render name()}`
- No `export let` in components

### Component patterns to copy
- Collapse toggle → `$state(Set<string>)` + sessionStorage key, see `loaded-stats.svelte`
- Persisted state → `persistedStore<T>(key, defaults, validateFn?)` — always supply validate for non-trivial T
- Tab scroll restore → `Map<string, number>` + `requestAnimationFrame`, see `store.svelte`
- Stat formatting → `formatStatByKey(key, value, $settings.notation)` — never raw `formatStat`
- Wiki images → `<WikiIcon filename="X.png" size={16} />` — filename as on wiki, WikiIcon handles URL

### Design token usage
- Spacing: ONLY `var(--space-N)` — never literal `px` gaps/padding unless 1-2px micro-adjustments
- Colors: ONLY CSS vars — never hex/rgb literals in component styles
- Breakpoints: mobile-first, `max-width: 479px` (xs), `480px` (sm), `640px` (md), `768px` (lg)
- Font tokens: `var(--font-display)` for headings, `var(--font-mono)` for numbers/code, `var(--font-body)` for prose
- Weight tokens: `--weight-normal` (400), `--weight-medium` (500), `--weight-bold` (700) — NO `--weight-semibold` (undefined)

### Engine patterns
- New source → `{key: 'system.name', name, system, maxLevel?, fn, inputs}` in `sources/<system>.ts`
- New stat → add to `stats/registry.ts` AND `stats/catalog.ts` (both required, no enforcement)
- New formula contribution → add to `formulas/<domain>.ts`, op order matters (`+` before `×` by convention)
- `unknown: true` = placeholder; engine skips; mark real wiring with actual source refs
- Shared source key = one UI input for N formula contributions (intentional dedup)

### Store mutation rules
- `stats` store: external reads via `$stats` only; mutations only through `loadStats`/`clearStats`
- `settings` store: mutations only through named setters (`setNotation`, `setDensity`, etc.)
- `storeProgress`: mutations through named functions only — never `_store.update` from outside module
- `skillProgress`: `setSkillLevel(id, level)` — level 0 = not owned

### CSS scoping
- All component styles scoped (Svelte default)
- Global overrides use `:global(...)` — minimize usage
- Page-level `.page` wrapper = standard top-level class in utility pages

---

## HOT SPOTS

### `src/lib/stats/registry.ts` — 1300 LOC
- Every new game stat requires a new entry here AND in `stats/catalog.ts`
- No compile-time enforcement of the pairing
- Grows unboundedly — consider splitting by domain (pickaxe, bombs, etc.) in future

### `src/lib/store/catalog.ts` — 1121 LOC  
- ⚠ Name collision: `store/` = game shop; `stores/` = Svelte state — distinct directories
- `vipEffectAt(unlockedTier, effectUnlockTier, baseValue, increment)` — step-function formula; wrong args → silent wrong values
- `FOUNDER_TIERS` effects reference `founderFn` runtime pattern in `sources/store.ts`

### `src/lib/utilities/skills.svelte` — 1060 LOC
- Right-click (`oncontextmenu`) for skill decrement — **non-functional on touch/mobile**
- 64 `<WikiIcon>` = 64 external HTTP requests on page load — no batching/caching
- `--weight-semibold` used at line 1002 — **undefined CSS token** → silent fallback

### `src/lib/sources/skillTree.ts` — 510 LOC
- Multiple Source objects share same `.key` (intentional dedup pattern) — adding new source with same key changes compute silently if fn differs
- Runtime input keys (`legendaryFishFound`, `statueCount`, etc.) are plain strings — no type safety

### `src/lib/engine/compute.ts` — operator ordering footgun
- `+`, `×`, `=` applied in **declaration order per formula**
- Moving a `×` contribution before additive ones = different result, no warning
- Convention: all `+` contributions first, then `×`, then `=` overrides

### `src/lib/formulas/` — 212 `unknown: true` entries across 15 files
- Engine skips silently → computed stat = lower than reality
- Spread across: stars.ts (50), bombs.ts (21), drones.ts (21), fishing.ts (29), pickaxe.ts (13), ores.ts (14)
- `_unknown` dummy source reused as placeholder — key collision with no runtime effect

### `src/lib/stores/storeProgress.ts` — migration logic
- `migrateStoreProgress(parsed)` handles legacy flat format → new nested shape
- `computePerkBundleState` uses `get(_store)` sync read — outside reactive context
- `setFounderTier` cascades: tier > 0 → auto-sets 4 perks + bundlePurchased = true; going DOWN does NOT clear

### `src/lib/format.ts` — 30 pre-existing test failures
- `format.test.ts` fails on `#` prefix convention (changed in commit `03120ea`)
- Failures are pre-existing, NOT caused by engine work — do not fix without dedicated task
- `parseStat` is lenient inverse of `formatStat`; rejects explicit-exponent + suffix combos

### `src/lib/components/WikiIcon.svelte` — external dependency
- URL: `https://shminer.miraheze.org/wiki/Special:Redirect/file/{filename}`
- No local caching, no offline fallback beyond `HelpCircle` icon
- `errored` state resets on filename change via `$effect`

### `src/lib/components/StatTooltip.svelte`
- Module-level `_counter` for unique aria IDs — grows unboundedly, never resets
- `position: fixed` computed via `getBoundingClientRect()` on mouseenter — correct but recalculates every hover
- Reads `$settings.statTooltips` — opt-out in settings disables globally

---

## KNOWN TECH DEBT

| Item | Location | Severity |
|------|----------|----------|
| `--weight-semibold` undefined | `skills.svelte:1002` | Low (silent CSS fallback) |
| 30 format.test.ts failures | `format.test.ts` | Medium (masks new failures) |
| 212 `unknown: true` contributions | `formulas/*.ts` | High (under-computes all stats) |
| Right-click decrement on mobile | `skills.svelte` | Medium (UX broken on touch) |
| No `skillProgress` validation | `stores/skillProgress.ts` | Low (benign default `{}`) |
| `stats/catalog` ↔ `stats/registry` pairing | both files | Medium (silent missing metadata) |
| 64 uncached icon requests on skills page | `skills.svelte` | Medium (perf on slow connections) |

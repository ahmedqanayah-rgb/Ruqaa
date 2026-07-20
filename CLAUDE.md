# CLAUDE.md

Bilingual (Arabic RTL / English LTR) reading-club site built with Vite + React 18. No
backend, no build step beyond Vite. The git repo root and all commands live in this
`app/` directory (the repo sits under `Sleep/app`, not `Sleep/`).

## Commands

```bash
npm run dev       # Vite dev server (auto-opens browser)
npm run build     # production build → dist/
npm run preview   # serve the built dist/ locally
```

There is **no test runner and no linter configured** — don't reference `npm test`/`npm lint`.
Verify changes by running the app (`npm run dev`) and checking the affected section in the
browser. `.claude/launch.json` defines a preview server named `ruqaa`.

**Windows/PowerShell gotcha:** Node was installed via winget and may not be on PATH in a
fresh PowerShell. If `npm` isn't found, refresh PATH first:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

Image-processing scripts (`scripts/*.mjs`, one-off, require `sharp`) run with `node
scripts/<name>.mjs`; they remove image backgrounds via edge flood-fill and write to
`public/images/clean/`.

## Architecture

**Everything is data-driven.** Section/quiz/assessment *content* lives in plain JS data
files under `src/data/`; components are generic renderers. To change wording or add
content you almost always edit data, not JSX.

- **i18n + theme — one provider.** `src/context/AppContext.jsx` holds `lang`, `theme`, and
  derived `dir`, and reflects them onto `<html>`. All bilingual text is a `{ ar, en }`
  object (built with a local `L(ar, en)` helper in most files); `t(obj)` picks the active
  field. **`t()` also rewrites Arabic-Indic digits (٠–٩, ٪, ٫) to Western (0–9, %, .)** in
  the Arabic view — so you may author numbers in either form in source and the Arabic UI
  always shows Western digits. Colors are CSS variables in `src/styles/tokens.css`.

- **Books registry.** `src/data/books.js` exports `books = [whyWeSleep, stolenFocus]`.
  Each book is a self-contained folder `src/data/books/<slug>/` whose `index.js` assembles
  an ordered `sections` array from `sections-1..4.js` (+ `author.js`, `studies.js`,
  `assessment.js`). Add a book by creating a sibling folder and appending it to the
  registry — it appears on Home and in the sidebar automatically.

- **Routing.** `HashRouter` (see `main.jsx`) → routes in `App.jsx`. Sections are
  `/#/book/:bookId/:slug`; `BookSection.jsx` looks up the section and dispatches by its
  `kind` (`'quiz'` → `StudiesQuiz`, `'assessment'` → `AssessmentForm`, otherwise the normal
  block renderer). `vite.config.js` sets `base: './'` so the build can be hosted from any
  sub-path.

- **Section blocks.** A normal section is `{ slug, title, lead, blocks:[…] }`. Each block
  is `{ type, … }`; `ContentBlocks.jsx` switches on `type` (`h`/`h4`/`p`/`ul`/`ol`/
  `callout`/`quote`/`figure`/`image`/`imggrid`/`people`/`myth`). A `{ type:'figure', id }`
  block renders an interactive figure via `src/components/figures/registry.jsx`, which maps
  a string id (`fig1`, `fig4_6`, `brainNetworks`, …) to a component.

- **RichText.** `src/components/RichText.jsx` parses `**bold**` and wraps Latin/technical
  runs in `<bdi class="term-en">` for correct bidi isolation inside RTL text. Convention:
  Arabic technical terms are followed by the English term in parentheses, e.g.
  «النواة فوق التصالبية (Suprachiasmatic Nucleus)».

- **Studies quiz.** The book's 122 studies are split across
  `src/data/books/why-we-sleep/studies/part1..4.js` and aggregated (with an `interestOrder`
  ranking) in `studies.js`. Each study is `{ id, chapter, title, researcher, method,
  options:[3], correct, result, discussion }`. `StudiesQuiz.jsx` can sort by book order or
  by interest.

## Project constraints & decisions (non-obvious)

- **No `localStorage`/`sessionStorage` — ever.** All state (quiz score, assessment answers,
  language, theme, figure controls) is in-memory React state. This is a hard requirement.
- **Study `method` fields are deliberately verbose** (2–3 sentences with setup and the
  researchers' reasoning) so each quiz question is self-explanatory before the answer is
  revealed. Keep that style if you add or edit studies; don't shorten them back to
  one-liners.
- **Interactive figures were tuned against the book's real reference values** (e.g. the
  two-process model keeps process-S above process-C without crossing; the hypnogram caps at
  8h and attributes early loss to NREM, late loss to REM). Preserve those invariants rather
  than "simplifying" the math in `figures/twoProcessSim.js` and the figure components.
- **Mobile RTL specifics** in `styles/components.css`: drawer uses `100dvh`, there's an
  `overflow-x: hidden` safety net, and the open-drawer transform needs an
  `html[dir='rtl'] .sidebar.open` rule to win on specificity. Watch for horizontal overflow
  from long unbreakable Latin terms (handled via `overflow-wrap`/`min-width:0`).
- `README.md` is a good complement but its "Project structure" list predates the per-book
  `data/books/<slug>/` reorganization — trust the actual tree over it.

## Current project state (last big update: 2026-07-16)

- **Two books are live**: `why-we-sleep` (16 sections, 122-study quiz) and `stolen-focus`
  (20 sections, 61-study quiz, built per `PLAN-stolen-focus.md` — kept for reference).
- `BookSection.jsx` dispatches a third kind, **`'focus-lab'`** → `components/FocusLab.jsx`
  (7 games: Stroop, task-switching with pure/mixed blocks, SART, visual search, 2-back,
  adaptive digit span, distracted reading — all in-memory, RT via `performance.now()`,
  plus a normalised overall score).
- Stolen Focus figures live in `components/figures/stolen-focus/` (ids prefixed `sf`);
  the distracted-reading game is shared between the figure registry and the Focus Lab.
- Sidebar derives the active book from the URL; Home shows a scroll-snap book carousel
  (a "see all" card appears only past 3 books). The active book's sections render as
  collapsible groups (from the book's `groups` data) — only the group holding the
  current section auto-expands; headers show visited/total counts, items show ✓ ticks.
  The collapsed icon-rail hides the section tree entirely.
- **Book landing v2** (`BookSection.jsx`): books may define `groups` (titled slug lists)
  for a grouped card layout; section cards show lead + computed read-time; a `fam` tag on
  sections colours cards (stolen-focus injects `fam` + a one-question `quick` check per
  article via `enrich()` in its index.js). Landing hero shows stats + a shocking-fact
  rotator. `AppContext` tracks `visited` sections in memory (session ticks + progress
  ring). Section pages: scroll-progress bar (NB: the app scrolls on `<body>`, not the
  window), next-up card, arrow-key + swipe navigation, `route-fade` transition.
- `ContentBlocks` supports `peoplegroups` (people in titled groups with filter chips) —
  used by the stolen-focus characters section; the plain `people` block still works.
- **Paused side-project (do NOT mention on the member-facing site — it's a surprise):**
  a homepage intro video. All work, assets, and a full resume guide are stashed OUTSIDE
  the repo in `C:\Users\aq\Desktop\Sleep\hero-video-wip\RESUME.md`. Read that file when
  the user asks to continue "the video".

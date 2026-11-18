# CLAUDE.md

Bilingual (Arabic RTL / English LTR) reading-club site built with Vite + React 18. No
backend apart from ONE small serverless function — the game's room mailbox, `api/room.js` —
and no build step beyond Vite. The git repo root and all commands live in this
`app/` directory (the repo sits under `Ruqaa/app`, not `Ruqaa/`).

## Commands

```bash
npm run dev       # Vite dev server (auto-opens browser)
npm run build     # production build → dist/
npm run preview   # serve the built dist/ locally
```

There is **no test runner and no linter configured** — don't reference `npm test`/`npm lint`.
Verify changes by running the app (`npm run dev`) and checking the affected section in the
browser. `.claude/launch.json` defines a preview server named `ruqaa`.

**Windows/PowerShell gotcha:** tools installed by winget — Node, and `ffmpeg` (9.0, for the
hero video) — are often **absent from PATH in a fresh PowerShell**, so `Get-Command` reports
them missing when they are perfectly well installed. Refresh PATH before concluding anything
is not there; `winget list --id <pkg>` is the check that doesn't lie.
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

Image-processing scripts (`scripts/*.mjs`, one-off, require `sharp`) run with `node
scripts/<name>.mjs`. `process-images.mjs` and `fix-images.mjs` remove backgrounds via edge
flood-fill and write to `public/images/clean/`; `to-webp.mjs <dir>` converts a directory in
place; `gen-image-dims.mjs` regenerates `src/data/imageDims.js`.

**Three families of script spend real money** — the hero's (`generate-hero-frames.mjs`,
`generate-hero-video.mjs`), the game's `generate-game-board.mjs`, and the Varoufakis book's
painted characters, `generate-character-art.mjs` (`--publish` re-exports them free). All of them call
fal.ai through `fal-client.mjs`, print the estimate and the live balance, and **do nothing
without `--yes`**. The board script's `--overlay`, `--publish` and `--publish-cover` modes are
free: they only read a master.

Data checks, none wired into a test runner (there isn't one) — run them by hand:
```bash
node scripts/check-image-refs.mjs
node scripts/check-links.mjs
node scripts/check-component-links.mjs
node scripts/gen-book-skeletons.mjs --check
node scripts/sim-game.mjs
```
`gen-book-skeletons --check` exits 1 if the generated skeletons/search data are stale (see
"Books registry"). `sim-game` plays 200 whole games of «رُقعة النرد» over a pretend network that
is lossy, laggy and forgetful (1–8 bots with wrong clocks, tabs reloading, players leaving, a
mailbox that forgets) and fails unless every game ends with every phone holding the same state;
it lints every deck first. Half its games are untimed, where its bots behave like a table: a
quiet one is slow rather than gone, and the others roll for them, close a round or move on
(the engine's `override`). `--synthetic` checks the engine alone, `--calm` gives timings.
`check-image-refs` imports the full books (`data/allBooks.js`) and walks every block (paths are helper-built, so
grepping filenames misses them), then reports refs pointing at missing files, files in
`public/images` nothing references, and content images missing from `imageDims.js`.
`check-links` validates every internal slug — cross-book `connections`, challenge `to`
targets, sidebar `groups`, and content links. **Both classes of error fail silently at
runtime** (a bad slug quietly falls back to the book landing), which is why they exist.

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

- **Books registry — skeletons up front, content on demand (since 2026-10-16).** Each book
  is a self-contained folder `src/data/books/<slug>/` whose `index.js` assembles an ordered
  `sections` array (+ `author.js`, `studies.js`, …). The FULL books are listed in
  **`src/data/allBooks.js`, which only Node scripts import — never the app**: one import of
  it from anything under `src/` puts every book back in the entry chunk.
  The app imports `src/data/books.js`, whose `books` are **skeletons** — titles, covers,
  sections, panel/part headings and precomputed stats, ~9 kB gz for all three — from the
  GENERATED `src/data/bookSkeletons.js`. A book's content arrives when it is opened:
  `useBook(id)` → `{ book, failed }` (one lazy chunk per book, found by
  `import.meta.glob('./books/*/index.js')`), `peekBook(id)` synchronously once it is here, and
  `Layout` prefetches on intent (pointer over, finger on, or focus of any `#/book/<id>` link).
  While the chunk is in flight `BookSection` shows the skeleton's title and lead over a
  placeholder; if it fails, a notice with a reload button (see "Bundle splitting" for why
  not a retry).
  - **`scripts/gen-book-skeletons.mjs` writes `bookSkeletons.js` and `searchData.js`** and runs
    as `predev`/`prebuild`, so `npm run dev` and every Vercel build regenerate both; they are
    committed anyway. In dev, `loadBook` logs a console error when a loaded book disagrees
    with its skeleton — rerun the script after changing any heading.
  - **The skeleton's one invariant** (`data/skeleton.js`): every question a page asks before
    the book loads must get the same answer the full book gives — above all `readingUnits`,
    which the sidebar (skeleton) and the progress ring (full book) both count. So it keeps
    every panel and part id.
  - The helpers that work on either shape (`entrySlugs`, `openable`, `sectionUnits`,
    `sectionProgress`, `readingUnits`, `findByKind`) live in **`data/bookHelpers.js`** and are
    re-exported by `books.js`; scripts import them from `bookHelpers.js`.
  - **Add a book**: create its folder and append it to `allBooks.js`. Nothing else registers
    it — the loader finds the folder by glob, and the skeleton and search index regenerate on
    the next dev/build.

- **Routing.** `HashRouter` (see `main.jsx`) → routes in `App.jsx`. Sections are
  `/#/book/:bookId/:slug`; `BookSection.jsx` looks up the section and dispatches by its
  `kind` (`'quiz'` → `StudiesQuiz`, `'assessment'` → `AssessmentForm`, otherwise the normal
  block renderer). `vite.config.js` sets `base: './'` so the build can be hosted from any
  sub-path.

- **Section blocks.** A normal section is `{ slug, title, lead, blocks:[…] }`. Each block
  is `{ type, … }`; `ContentBlocks.jsx` switches on `type` (`h`/`h4`/`p`/`ul`/`ol`/
  `callout`/`quote`/`figure`/`image`/`imggrid`/`people`/`tabs`/`quick`/`table`).
  `table` is `{ caption, head:[…], rows:[[…]] }`, first cell of a row its header; below
  640px each row becomes a card with every cell labelled by its column (`data-label`),
  because a sideways scroller is invisible on a page with no scrollbar. A `people` entry's
  `img` is optional — without one the card shows the monogram, with no 404 first.
  `quick` is the end-of-article check; it lives in `ContentBlocks` (not `BookSection`)
  because a chapter folded into a heading has to carry its own. A `{ type:'tabs',
  panels:[{id,title,blocks}] }` renders whole sub-documents as **collapsible headings** via
  `Collapsible.jsx` and recurses into `ContentBlocks` — it is what holds the book's chapters
  and the author/translator pair. **The name `tabs` is historical**: it was a segmented bar
  for a day, and every book's data uses the name, so the name stayed and the presentation
  changed. Only an OPEN panel is mounted, so a shut one's figures and portraits are never
  fetched.
  A `{ type:'figure', id }`
  block renders an interactive figure via `src/components/figures/registry.jsx`, which maps
  a string id (`fig1`, `fig4_6`, `brainNetworks`, …) to a component.

- **RichText.** `src/components/RichText.jsx` parses `**bold**` — **and nothing else**. Single
  asterisks are not italics; they print literally. Any text carrying markup must be rendered
  *through* RichText: `FigureFrame` pipes its `caption` through it, but a bare `{t(...)}`
  elsewhere in a figure will show the asterisks on screen. It also wraps Latin/technical
  runs in `<bdi class="term-en">` for correct bidi isolation inside RTL text. Convention:
  Arabic technical terms are followed by the English term in parentheses, e.g.
  «النواة فوق التصالبية (Suprachiasmatic Nucleus)».

- **Studies quiz.** The book's 122 studies are split across
  `src/data/books/why-we-sleep/studies/part1..4.js` and aggregated (with an `interestOrder`
  ranking) in `studies.js`. Each study is `{ id, chapter, title, researcher, method,
  options:[3], correct, result, discussion }`. `StudiesQuiz.jsx` can sort by book order or
  by interest.

## Bundle splitting (don't undo by accident)

Members join from places with very uneven connections, so initial payload is treated as a
feature. `vite.config.js` splits `react`/`react-dom`/`react-router-dom` and `recharts` into
their own chunks, and these are loaded lazily:

- **Every book's content, and search.** The entry chunk carries skeletons only (see "Books
  registry"): it went **453.9 → 69.6 kB gzipped** on 2026-10-16, when it had been growing by
  ~140 kB with every book. Each book is its own ~120–140 kB gz chunk, and the search index
  (`searchIndex.js` + `searchData.js`, ~88 kB gz) loads the first time the palette opens —
  `SearchPalette` must keep importing it dynamically.
- **`figures/registry.jsx`** (via `React.lazy` in `ContentBlocks`) — **never import the
  registry statically**, or every figure component lands in the entry chunk.
- **A SECOND boundary INSIDE the registry.** Only three modules use recharts
  (`SimpleFigures`, `StolenFocusCharts`, `HoverLineChart`), but the registry used to import
  everything statically, so **one figure of any kind pulled the ~105 kB gzipped charts chunk**.
  That pointed exactly the wrong way: «داخل حالة التدفّق» renders five figures that are
  hand-rolled SVG *precisely because* the rule below forbids recharts in a text section — and
  paid for recharts anyway (130.8 → 25.4 kB gz once split). The nine recharts-backed figures
  now load through their own `lazy()` and suspend inside the `Suspense` ContentBlocks already
  wraps every figure in. **Keep those three modules behind `lazy()`** — a plain import of any
  of them silently undoes it, and the entry-chunk check below still passes, because recharts
  was never in the entry to begin with. Verify with the built graph instead: `registry-*.js`
  must not statically import `charts-*.js`.
- **`FocusLab.jsx`** (via `React.lazy` in `BookSection`) — seven games for one section.
- **The game** (`pages/Game.jsx`, via `React.lazy` in `App.jsx`) — its rules, its screens, its
  rounds from every book and its own stylesheet (`styles/game.css`, imported BY the page so
  it rides in the chunk): ~108 kB gz of script and ~8 kB of CSS that a reader who came for a
  chapter never downloads. It imports each book's `game.js` and `mythOrFact.js` and nothing
  else of theirs; check after touching it that `Game-*.js` still does not import a book's
  `index-*.js`.
- **The Varoufakis book's 20 figures** (`figures/economy/EconomyFigures.jsx`, `DebtFigures.jsx`,
  and their `economy.css`) also load through their own `lazy()` in the registry, though none
  uses recharts — a reader of the other books should not download them by opening a sleep
  chart. The CSS rides in that chunk, not the entry stylesheet.

Both render a `.figure-loading` placeholder through `Suspense` so the page doesn't jump.

**A lazy piece that fails to arrive must not take the page down.** The usual cause is a
deploy, not the connection: Vercel serves only the newest build's files, so a tab opened
before a push asks for chunk names that no longer exist. Until 2026-10-16 there was no error
boundary anywhere, so one missing figure chunk unmounted the whole app. Now
`components/LoadBoundary.jsx` wraps every `lazy()` (figures in `ContentBlocks`, the focus
lab), and a book that fails (`useBook` → `failed`) or the search index shows the same
`LoadFailed` notice. **Its button reloads; there is deliberately no "try again"**: the
browser caches a failed `import()` for the life of the page — measured in Chrome 152, a
second import of the same URL failed without touching the network after the file appeared.
**Wrap any new `lazy()` in a `LoadBoundary`.** To test: `npm run build`, `npm run preview`,
open a page, move a chunk out of `dist/assets/`, then navigate to what needs it (the preview
server answers a missing chunk with `index.html`, which the browser refuses as a module —
as good a failure as a 404).
Verify with `npm run build`: the entry `index.html` should reference only `index-*.js`,
`react-*.js` and the CSS — if `charts-*` appears there, something started importing
recharts eagerly. And the entry `index-*.js` should statically import **only** `react-*.js`
(~70 kB gz): a book chunk or `searchIndex-*` there means something imported `allBooks.js`, a
book folder or the search index eagerly. Check that, not just the size line.

## Images

- **`public/` is a shipping manifest, not a shed.** Vite copies it verbatim into `dist`, so
  anything in there is downloaded by real members. Files that are only *inputs* to a script
  live in **`assets-src/`** — the originals that `process-images.mjs` and `fix-images.mjs`
  turn into `public/images/clean/` cut-outs. Moving them out cut 2.9 MB of dead weight; don't
  move them back, and don't add new build inputs under `public/`.
- **Display images are WebP** (`clean/`, `characters/`, the three rendered `anatomical/`
  files). Call sites still pass the old `.png`/`.jpg` name — the `clean()`, `port()`,
  `panel()` and `rowImg()` helpers swap the extension, which is what kept the conversion from
  churning hundreds of data lines. **The covers used for `og:image` stay JPG**: several social
  scrapers won't fetch a WebP preview.
- **The `clean/` cut-outs are no longer transparent.** They are scans of printed diagrams —
  black labels, thin leader lines, engraved hatching — so on a dark background their text
  disappeared. Each now carries a **paper backing and margin baked into the pixels**
  (`scripts/paper-backing.mjs`). It had to be pixels, not CSS: phone browsers that force-dark
  a page darken background colours and deliberately leave image pixels alone, so a CSS plate
  gets darkened right back out from under the artwork. The colour equals the light theme's
  `--bg`, so in the light theme they still blend into the page exactly as before. `.img-block.transparent`
  therefore sets no padding of its own, and `--figure-paper` (theme-independent, in
  `tokens.css`) exists only for chrome that sits flush against them, like `.spider-box`.
- **The image pipeline has an order**, documented at the top of `paper-backing.mjs`:
  generators → `brain-rows`/`spider-panels` → `to-webp` → `paper-backing`. `clean/brain-areas`
  and `clean/spider-web` are *intermediates* for the row/panel splitters, not display assets;
  `check-image-refs.mjs` correctly reports them as unreferenced once the outputs exist.
- **`src/data/imageDims.js` is generated** by `gen-image-dims.mjs` — intrinsic sizes for
  inline content images so `ImageBlock` can emit `width`/`height` and reserve the box before
  the bytes land. Content images have genuinely different aspect ratios, so the flat
  `aspect-ratio: 2/3` that works for covers would distort them. Regenerate after adding one.
- **The game's paintings** live in `public/images/game/`: the three BOOK BOARDS the game is
  played on — `board-sleep.webp`, `board-focus.webp`, `board-market.webp` (3:4, ~250 kB each,
  2026-11-17) — plus `board.webp`, the first map that held all three books on one board and is
  now only the game's poster on a phone (`GameCover poster`), and `cover.webp` (the wide door on
  Home and the game's first screen). All were painted with Nano Banana Pro on fal by
  `scripts/generate-game-board.mjs` (`--book <id>` for a book's board, with `masters/board.jpg`
  sent as the STYLE reference so the three look like one set); full-size masters stay OUTSIDE
  the repo in `../game-art-wip/masters/`, the same split as the hero frames. **Every board was
  painted OVER a sketch of the game's own road** (`lib/game/board.js`; every other book's road
  is mirrored, `mirrored(art)`), and the squares are drawn by the page, not painted — so if the
  road's control points ever move, the boards must be painted again; check a take with
  `--overlay` before shipping it. **No picture contains a word, a letter or a number**, which is
  what lets the cover be mirrored for the right-to-left page (`.game-cover`) and a board be cut
  into bands (each round card's band is a CSS crop of the board where the turn is played).
  **Their paths are written out literally** in `data/gameArt.js` — `check-image-refs` finds a
  shipped file by its NAME in the source. The first version's ten flat-lay photographs (and
  `generate-game-art.mjs`, which made them) were removed on 2026-11-17 when the board was
  painted; they are in git history, their masters in `../game-art-wip/masters/`.

## Fonts

**Self-hosted — the site makes no request to Google.** IBM Plex Sans Arabic + Inter, weights
**400/500/600/700 only**. `scripts/fetch-fonts.mjs` downloads the woff2 files into
`src/styles/fonts/` and generates `src/styles/fonts.css`; both are generated, don't hand-edit.
They live in `src/` rather than `public/` so Vite rewrites and content-hashes the URLs, which
keeps `base: './'` sub-path hosting working.

- **Never use `font-weight: 800`.** IBM Plex Sans Arabic has no 800 — the Google API rejects
  `wght@800` for it outright — so 800 renders identically to 700 with the webfont loaded and
  only diverges in the `system-ui` fallback, i.e. it makes the fallback heavier than the
  design. 700 is the honest ceiling for both families.
- **Adding a weight means re-running the script**, not editing CSS. Drop it when the last use
  goes: a visitor pulls ~300 kB of fonts, and `300` sat unused costing 64 kB. `500` looks
  barely used but is load-bearing — it's `.term-en`, the English technical terms embedded in
  Arabic text.
- **Adding a character outside Latin/Arabic needs a look.** Only the `arabic` and `latin`
  subsets ship. The one exception is **ʿ (U+02BF) in "Ruqʿa"**, which needs `latin-ext` — far
  too expensive for one glyph (83 kB per Inter weight), so the script cuts a 0.9 kB
  single-character font via Google's `&text=` API instead. Anything else outside those subsets
  will silently render from a system font and look subtly wrong.
- **Fonts must never be inlined.** `vite.config.js` excludes them from `assetsInlineLimit`;
  base64ing them bloats the render-blocking CSS and defeats the `unicode-range` gating that
  stops an Arabic reader downloading the Latin faces.

## Project constraints & decisions (non-obvious)

- **No `localStorage`/`sessionStorage` — ever.** All state (quiz score, assessment answers,
  language, theme, figure controls) is in-memory React state. This is a hard requirement.
  **The game keeps its state in its room** — in our own mailbox and on every player's phone —
  and the address bar holds only the room code and which player this tab is
  (`#/game?room=…&me=…`), so a refresh lands back in the same seat. The rule stands.
- **Analytics: Vercel Web Analytics only** (`src/components/Analytics.jsx`, mounted in
  `main.jsx`). It renders `null` — counts are for the club in the Vercel dashboard, never shown
  to visitors. Chosen because its script is served from our own origin
  (`/_vercel/insights/script.js`), so the site keeps making **zero third-party requests** — the
  reason the fonts were self-hosted — and because it sets no cookies and writes no storage, so
  the rule above still holds. **Don't add Google Analytics**; it breaks both.
  **Its automatic tracking is broken by HashRouter and must stay disabled.** The script patches
  `pushState` (which react-router does call) but gates on `location.pathname`, which is `/`
  forever here — measured: in-app navigation fired *nothing*, and full loads all logged as `/`.
  So the component passes `route`/`path` from `useLocation()`, which sets `disableAutoTrack`
  and fires each pageview itself. `route` is deliberately the concrete path, not a
  `/book/:bookId/:slug` pattern — Vercel groups by the pattern, which would collapse all 36
  sections into one row. `beforeSend` **strips** the fragment and must never fold it into the
  path: the script already appends `location.hash` to the `path` we gave it, so folding
  double-applies and yields `/book/why-we-sleep/book/why-we-sleep`. Verify changes in `npm run
  dev`, where the debug script logs every event to the console instead of sending it.
  **One page is logged WITHOUT its query: `/game`.** A game's address carries its room code and
  a player's id, and neither a row per room nor anything that identifies a player belongs in a
  dashboard.
- **The page has NO native scrollbar, on purpose.** `body::-webkit-scrollbar` is
  zero-width and `scrollbar-width: none`; `components/ScrollOverlay.jsx` draws a fixed,
  translucent thumb over the content instead, fading in while scrolling and out ~900ms
  after. The reason is layout, not looks: a native bar reserves its ~10px track for the
  whole life of the page, so it narrowed the hero video and every page beside it even
  while invisible. Removing the track is only safe because nothing replaces it in layout —
  the width is zero *always*, so there is no appear/disappear reflow. It is still a real
  scrollbar: the strip takes no pointer events, the thumb does, so it drags. **Under
  `hover: none` the thumb is indicator-only** — an `opacity: 0` element still takes pointer
  events, and a grabbable thumb leaves an invisible strip along the screen edge exactly
  where the phone back-swipe lives. **The INNER scrollers keep their native bars** (sidebar,
  search results). The one exception is Home's shelf row on a phone, which shows no bar at
  all — the next poster peeking in from the edge is its scroll cue.
  **`html.is-scrolling` is the one visibility signal for all of them**, set by `Layout` and
  keyed by both `global.css` (native thumbs) and the overlay thumb, so one gesture fades
  everything on one timer — they were briefly two implementations at 700ms and 900ms.
  `Layout` subscribes with a **single capture-phase** listener: `scroll` does not bubble
  from an element, so capture is the only way to hear an inner scroller — and it is on the
  path of the page's own scroll too, so no body/window pair is needed for it.
  ScrollOverlay owns only the thumb's **geometry**, written straight to the DOM as a
  `transform` and coalesced to one measurement per frame with `requestAnimationFrame`
  (measured: two listeners and a ten-event burst each collapse to one). It
  **cancels-and-reschedules** rather than skipping while one is pending — a pending id is
  only cleared by the callback, so a frame that never runs would latch the guard on and
  freeze the thumb, which is exactly what happens in the preview pane.
- **`src/lib/scroll.js` is the only place that knows the app scrolls on `<body>`.**
  `scroller()`, `onPageScroll()` (body **and** window — neither alone is dependable) and
  `onAnyScroll()` (capture). It exists because that fact was written out three times —
  `Layout`, `ScrollOverlay`, and inlined inside `BookSection`'s `ReadingProgress` where a
  grep for `scroller` missed it. The subscribe helpers return their own cleanup so an
  `addEventListener` can't be paired with a mismatched `remove`.
- **`collapsed` is set regardless of viewport, so the mobile drawer carries it too.**
  Below 861px the drawer is a full 288px wide, so every icon-rail rule must stay inside
  `@media (min-width: 861px)` — outside it they land on the drawer, which is how it once
  ended up a full-width list of unlabelled icons. The rail itself shows a caption under
  each icon (it was bare icons, two of them the same book glyph), and a book is marked by
  its own cover rather than an emoji.
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

## Current project state (last big update: 2026-11-16)

- **The project is Ruqʿa / رُقعة** (`ruqaa-reading-club`) — a multi-book club site, not a
  single-book site. Keep site chrome book-agnostic. The footer carries a required
  disclaimer (fan-made summaries, not affiliated with authors/publishers) — don't remove
  it. Its second line says the content is educational, not medical **or financial** advice
  (the "financial" since the Varoufakis book and its usury tab). The workspace folder is `C:\Users\aq\Desktop\Ruqaa\` (renamed from `Sleep\` on
  2026-07-20).
- **Git: the only repo is this `app/` folder** → github.com/ahmedqanayah-rgb/Ruqaa
  (**public**). The parent `Ruqaa/` is intentionally not a repo. **Never commit the book
  reference material** (`Ruqaa/Why we Sleep/`, `Ruqaa/Stolen focus/`, `Ruqaa/Talking to My
  Daughter About the Economy…/` — epub, raw book text, figure PDFs, both editions of the
  Varoufakis book and the club's own companion PDF); history was rewritten on 2026-07-20 to
  purge exactly those.
- **THE LOOK (2026-11-16): an app, not a document.** Three ideas, and all three start in
  `styles/tokens.css`:
  1. **Ink for action, camel for identity.** `.btn.primary` is `--ink` — near-black on the light
     theme, near-white on the dark one. Camel (`--accent`, `--brand`) stays the club's colour for
     links, the lit destination and progress, and no longer has to be the button too.
  2. **White cards on paper.** `--bg-elev` is true white over the paper `--bg`. The light `--bg`
     is still `#f7f4ee` and must stay so: it is the figures' paper (`--figure-paper`).
  3. **Every book is its own colour world.** A book carries `tone: { from, to, spark }` in its
     `index.js` (read off its cover; it rides in the skeleton), and `lib/tone.js` turns it into
     `--tone` / `--tone-2` / `--tone-spark` on a component's root. A tone colours what a book
     OWNS — its poster, the header of its landing, its squares and cards in the game — and
     **never `--accent`**: the figures use the accent against `--danger` and `--success` as a
     tuned set, and a red accent inside the economics book would make "accent" and "danger" the
     same colour in a chart where they mean opposite things.
  `.page` keeps the 900px reading measure; a page whose root is `.wide-page` (Books, a book's
  landing, the game's setup) gets `--maxw-wide`. On a book's landing, consecutive solo `groups`
  entries share ONE row of cards (`landingRows` in `BookSection`) — each used to be a grid of
  one, stacked down the edge of an otherwise empty page.
  **No webfont was added.** A display face is the obvious lever and Aref Ruqaa the obvious
  choice, but it was tried for the hero and removed at the club's request (see
  `fetch-fonts.mjs`), so the new look is Plex and Inter at larger sizes. Heading
  `letter-spacing` is English-only: on Arabic it pulls joined letters into each other.
  Collapsible HEADINGS are cards now; their BODIES are deliberately not boxed — a chapter's
  figures were measured to fit a phone's text column, and a card's padding would take ~28px
  off it.
- **Navigation: four destinations, one list (`data/nav.js`)** — Home · Books · Game · Club. They
  sit in the top bar (`Navbar.jsx`, a segmented pill) from 861px, and in **the dock**
  (`Dock.jsx`) at the bottom of a phone, where a thumb is. The bar used to carry a chip per
  book, which read well with two books and stopped fitting at three.
  - **The dock and the in-book bar are ONE floating pill with two contents**, and never show
    together: on a section page the pill is previous · sections · next (`.section-bar`, still
    portalled to `<body>`), everywhere else it is the dock (`body:has(.section-bar) .dock`).
    Every page reserves the pill's height (`.app-main` padding at ≤860px).
  - **The sidebar is rendered only inside a book** (`Layout` → `inBook`). Outside one it only
    repeated the bar. It holds the books and their section trees — no Home/Books/About links any
    more — and still starts collapsed to a 64px rail (of covers); its state lives in `Layout`.
    On a phone it is a drawer, opened by a hamburger that likewise exists only inside a book.
  - **The breadcrumb shows only on a section** (`Books › book › section`) and renders INSIDE
    `.page`, so it shares the article's measure. Everywhere else the lit destination and the
    `<h1>` already say where you are. Still deliberately not sticky.
  - **`.arrow`** is a glyph arrow that mirrors with the reading direction. Use it rather than
    typing `→` after a label, which in Arabic points back the way the reader came.
- **«رُقعة النرد» — the club's board game** (`/game`; added 2026-11-16, rebuilt for phones
  2026-11-17). «رُقعة» is also the Arabic for a game board, so the name is the club's own.
  **Played on the weekly call with EVERY MEMBER ON THEIR OWN PHONE**: one opens a room and
  reads its six-digit code out on the call; the others join with it (or the invite link). Every
  phone shows the same board, and every round is played by everyone at once. The first version
  — one shared screen, a host tapping what people said — was turned down by the club in so many
  words ("everyone to be able to see the game and play on their phone, not one person share
  the screen"), so don't drift back towards a host-only screen.
  - **How the phones talk: a mailbox on our own origin.** `api/room.js` is a Vercel Function
    (its logic is `api/_mailbox.js` — the underscore keeps Vercel from routing it — and
    `vite.config.js` mounts the same handler on the dev and preview servers). It does not know
    the game: per room it keeps the newest "core" (the game's state), one small "entry" per
    player (that player's own inputs) and when each was last heard from, and every poll
    (about once a second — twice while a roll is awaited, so the throw reaches every phone in
    time) is a two-way sync. **Nothing there is durable, and the game does not
    need it to be**: rooms live in the instance's memory, an instance may be recycled or be one
    of several, so every reply names its instance and says what it lacks, and the phones keep
    sending it until each instance they have heard from holds it (`peers` in `lib/game/net.js`).
    One live tab can rebuild a room. **Don't "fix" this with a database** — it would be the one
    moving part that could be down while the club waits on a call. Same origin, so the site
    still makes no third-party request. No accounts: whoever has the code can join (up to 8);
    rooms are forgotten three hours after the last move.
    **The function runs in Frankfurt** (`vercel.json`: `"regions": ["fra1"]`, the file's only
    setting; JSON allows no comment, so the reason is here). Vercel's default is Washington
    (iad1), and the members join from Syria, Turkey, Germany, the UK, the UAE and Malaysia
    (`club.reach`): every poll was an ocean crossing. Hobby allows one region, any one.
  - **The rules run on every phone** — `lib/game/engine.js`, `advance(core, entries, env)`, pure.
    Phones agree because (1) the clock only ever GATES a step and never goes into a result —
    every time written into a core comes from an entry or a deadline already in it; (2) chance
    comes from the room's seeds (`lib/game/rand.js`), never `Math.random`; (3) a core is sealed
    with a hash of its content, and when two phones do produce different next states the
    greater (game, version, hash) wins everywhere. The mailbox and the client must order cores
    identically (`newer` in both; the simulator checks). To stop six phones announcing the same
    step at once, whoever's tap made it possible acts at once and the rest wait a beat that
    grows with their place in the list (`delay()` in net.js).
  - **A player writes only their own entry**, and its counter is a clock reading, so a tab that
    reloads still outranks the copy everyone else holds. **The mailbox refuses a counter more than
    `FUTURE` (5 minutes) ahead of its own clock**, and a phone's first entry is written before it
    knows that clock — so a phone minutes fast was refused every input until the mailbox's clock
    caught up (found live on 2026-11-17: a laptop 7 minutes fast, two minutes of a game nobody else
    could see). Now the first reply re-stamps a refused entry on the mailbox's clock (`net.js`), and
    the simulator gives a fifth of its phones clocks 5½–15½ minutes out and fails if the mailbox
    refuses anything from a phone that already knows its clock. An answer is `{ s, v, at }`: `s` names
    the GAME, the turn and the stage, so a late answer can never count in the next round — and a
    leftover from the first game never in a rematch, whose turns start again at 1. Every other
    stamp (`roll`, `next`, …) carries the game too (`turnKey`); until 2026-11-17 they carried only
    the turn, and a rematch could roll or answer for you from the first game's entry.
  - **Time on screen is the room's clock** (`useNow(room)` — the mailbox's clock as net.js
    estimates it), never `Date.now()`: six phones with six wrong clocks still see the die land
    and the timer run out together. Every duration is `T` in engine.js.
  - **The road runs through ONE PAINTED BOARD PER BOOK in play** (2026-11-17: the club found
    one board "so short that it ends in less than 5 minutes"). `lib/game/board.js` is a board's
    road (control points → a Catmull-Rom curve → 36 squares evenly spaced along it) and what each
    square is (`TYPES`, `typeAt`); a game's boards are the books in play in registry order
    (`core.boards`), joined into one road of 36 × boards squares (`core.last` is the finish — never
    a constant any more). With all three books it is 108 squares: the valley of sleep, the city of
    distraction, the island market. **A board does NOT ask only its own book** (2026-11-18, the
    club: "the questions from all books to be there in all steps of the game, not divided"): every
    square deals from all of tonight's books as if from one shuffled deck — `challenge` picks the
    book by how many of its cards of that kind are still to come, then deals that book's next card,
    so each book keeps its own cursor and a rematch with other books still replays nothing. Before
    this, everyone started on the sleep board, and the first fifteen rounds of a three-book game
    were 46% Why We Sleep (whose decks are small: 4 charts, 6 numbers, 7 people), 12% Stolen Focus
    and 3% Varoufakis — "the questions are always the same". A question square wears a plain book
    (📖), not its board's book. **The screen shows one
    board at a time**: they are stacked in a strip (`Board.jsx`) that slides down to the next
    when the turn's token walks off the top — the long road without tiny squares. The book marks
    in the board's corner show another board until the next turn. Fewer books, shorter game: the
    lobby says how long tonight's road is. See **Images** for why the paintings depend on the road.
  - **No clock unless the host asks for one** (`core.timed`, a switch in the lobby, OFF by default
    — the club asked for it: "the default game is to be without timing"). Untimed, a round has no
    deadline (`ch.t1` null) and closes when everyone still here has answered; a result stays until
    everyone has read it and tapped «قرأتُ — التالي» (`readyNow`); nobody's die rolls itself. The
    rounds that ARE a clock keep it either way (`CLOCKED`: the Lab's speed tests — «من هو؟» was
    one until 2026-11-18, while its clues came by the clock). A table waiting on someone whose phone is on but who is not there
    is moved on by an **override** in a player's entry — roll for them, close the round, leave the
    result — which the host may send at once and anyone else after a minute (`T.anyone`), for
    when the one holding things up is the host.
  - **A turn**: the player whose turn it is rolls (or, in a timed game, the die rolls itself after
    a while — and in any game, soon, for someone who has left); the square sets a round EVERYONE
    plays: a question from one of the books (`mcq`), myth or fact (`tf` — the book's `mythOrFact.js`), the closest number
    (`num`), who is it? (`who` — the person's picture, BIG, from the start, and one clue; a second
    and third for a step each: 3 steps with one clue, 2 with two, 1 with three; the book's MAIN
    people only, at the club's request. The picture used to wait for the result, as a 64-px
    thumbnail — 2026-11-18, the club: "i want the foto in the questions to appear from the start,
    not only after ansewring, and make it big, not just a thumbnail". It gives the face away to
    anyone who knows it; that was their call. `FaceImage`, the same square as «من هذا؟», which
    is now just as big on its result; Richard Radford, the one without a picture, simply shows
    none), read the chart (`graph` — hand-rolled SVG
    in `MiniChart.jsx`; never recharts here), picture this (`pic` — a picture already on the
    site: a person, a painting, an event; "who/what is this?" is answered by TYPING, or "which
    book is it from?" by three buttons; a hint or the four options can be bought for a step
    each, so a bare typed answer is worth the most), who is this? (`face` — a portrait from the
    book's people cards and four names of the same sex; the card's `tag` and `about` are read after
    the answer; no pairs, no group photos, never the book's private people — 62 faces in all),
    a white lie (`bluff`, Fibbage-style: write
    a lie, then find the truth), the Lab (`mini`: count the sheep, the vigilance test, the digits,
    Stroop, the one arrow — and from the Varoufakis book the stag hunt and an auction of
    Achilles' armour, which test each other rather than anyone's attention; any of tonight's books'
    games on any board, and only **two Lab squares a board** since 2026-11-18 — the club: "i want
    the focus lab questions to be a lot less"; the six there were made it about a sixth of all
    rounds), a dare (performed
    on the call, judged on the phones), or chance. **The only currency is squares**; the first
    to the end of the last board ends the game. The end screen hands out titles from per-player
    tallies. **The `why` after a round is the point of it** — a reading club plays to read — which
    is why an untimed result waits for everyone.
  - **Skip — a new round for everyone** (2026-11-18, the club: "add a skip question option"; asked
    whether a skip should be one player passing or the question swapped for all, they chose the
    swap). The player whose turn it is — it is their square — or the host can swap a round for a
    fresh one on the SAME square: the same kind of square, the next card of its deck (`maySkip`,
    `skipAsked`, and `challenge(…, again)` in engine.js). Any round but the Lab's, and only in its
    first stage — once the white lies are in or the dare is done, the round is the table's. It is
    `swap: slot, swt` in their entry; the new round carries `r` (the turn's how-manieth skip) and
    `by`, and `r` is part of `slotOf`, so nothing given to the skipped question — an answer, a hint
    bought — can count for its replacement, and `Challenge`, keyed by the slot, starts clean. `r`
    also salts the turn's luck; a round nobody skipped is dealt exactly as before. The new round
    opens with the usual card, saying who skipped. The simulator's turn players and hosts skip now
    and then, and it prints how many.
  - **Every question has a hint to buy** (2026-11-17, the club: "i want the hint option for all
    questions"). A right answer is worth **2 steps and each hint costs one** (never below 1), so a
    bare right answer is always worth the most — the scoring had to rise from 1 to 2 for that, or
    a hint would have cost the whole prize. What a hint is depends on the kind (`maxHints` in
    engine.js): 50:50 for `mcq`/`graph` (`fiftyFifty`), the person's role line for `face`, a
    written nudge for `tf` (64 of them, `tfHints` in each book's `game.js`, keyed by the
    statement's English so a reworded statement fails `decks.js` instead of losing its hint), a
    range for `num` (`numRange`), the next clue for `who`, one lie struck out in the white lie's
    vote (`bluffHint`), and the picture round's own ladder. **A hint appears only when its player
    taps for it, never by the clock** (2026-11-18, the club: "i want the hints to be optional as in
    a button to request them, not that they appear after a certain amount of time" — «من هو؟»'s
    clues used to arrive every 7 seconds). A hint is written into the player's entry the moment it is bought (`rv: { s, h }`) and rides
    on the answer (`h`); the engine takes the larger, so neither a refresh nor a forged answer
    undoes it. The result marks a hinted answer with 💡.
  - **The deck rules** are at the top of `books/why-we-sleep/game.js`, and they answer the club's
    verdict on the first deck ("so obvious"): every wrong answer must be one a half-informed
    player could believe, and the fun lives in the setup and the `why`, not in silly options.
    Option 0 is the right one; the game deals options in a seeded order, the same on every phone
    so "the second one!" means the same to everyone. `lib/game/decks.js` checks every shape.
  - **Typed answers are judged by `lib/game/match.js`, not by AI** (asked about 2026-11-17).
    It forgives what people actually get wrong — Arabic letter forms, diacritics, «ال»/"the",
    either language, a few letters off, vowels in transliterations — and checks only against
    the deck's `aliases`, so it never guesses; `decks.js` refuses a deck in which a WRONG option
    would pass. Whatever it still misses, **the host accepts by hand** on the result screen
    (`acc` in the host's entry → `acceptStep` in the engine), the way a quizmaster would. An AI
    judge was considered and not built: members' answers would go to an outside company, it
    needs a paid key on Vercel, it adds waiting and a way to fail on the night, and its verdict
    would have to be made once and shared because the phones must agree.
  - **A chance card's text never says what happens.** Its effect line is generated from
    `effect` (`lib/game/effects.js`), so the words on the card and what the engine does cannot
    disagree. No card can carry anyone over the finish line.
  - **The room** (lobby and game) takes the whole window: `html[data-stage]` hides the chrome
    the way `data-presenting` does. It is **always the board's night with paper cards, whatever
    the site's theme** (`--gm-*` in `game.css`), and everything laid over it is **portalled to
    `<body>`** (the `position: fixed`-inside-a-transform trap). Rounds rise as bottom sheets,
    where a thumb is. The layout switches on the window's SHAPE (`min-aspect-ratio: 1/1`), not
    its width. `Board` draws tokens where they ARE by the rules but walks them there a square at
    a time; `targetsAt` in `Stage.jsx` decides what to draw at each moment of a turn.
  - **The die is THROWN, by a real little physics simulation** (`lib/game/throw.js`, drawn by
    `DieThrow.jsx`; added 2026-11-17 when the club asked for a better roll): a cube under
    gravity, struck at its corners by the board and its frame (restitution, friction), shaken in
    the hand first and then thrown, bouncing, tipping over its edges and settling. The rules
    decide the number; the cube is thrown unlabelled and then its faces are LABELLED so the one
    on top is the rolled number (any of the cube's 24 turns leaves the motion unchanged). Every
    phone shows the same throw: it is seeded by the room, the loop uses only + − × ÷ and √ (no
    trig — identical in every engine), and the frame is read off the room's clock. The timeline
    is `T.dice` (2300 ms): a 560 ms shake — which is also the time the roll takes to reach the
    other phones — the flight, and at least 480 ms to read the die. Its knocks are scheduled at
    the simulated impacts. **Never give `.gm-throw-die` an opacity, `will-change: opacity`, a
    filter or an overflow**: each flattens its `preserve-3d`, and the die vanishes mid-throw as
    a single face seen edge-on. The layer fades instead. Reduced motion: no throw, the die
    simply appears settled. To judge a change by eye, freeze `performance.now` in the page and
    step it — the throw reads only that and the room's clock.
  - **Sounds are synthesised** (`lib/game/sfx.js`, Web Audio), not shipped.
  - **A nudge when the game waits for you**: the tab's title says «دورك!» / «جولة!» and an
    Android phone buzzes once — for a laptop with the call in another tab.
  - **Testing**: `node scripts/sim-game.mjs` for the rules and the network; for the screens,
    `npm run dev` and open the game in several tabs (with `--host`, phones on the same Wi-Fi can
    join). To look at one kind of round without waiting for the die, POST a hand-made core to
    `/api/room` under a fresh code and open `#/game?room=<code>&me=<a player id in it>` — the dev
    server takes it like any other room.
  - The paintings are described under **Images**.
- **Three books are live**: `why-we-sleep`, `stolen-focus`, and since **2026-10-16**
  `talking-to-my-daughter` (Varoufakis — see its own bullet below). The first two went down
  from 19 and 24 sections on **2026-08-24**. Each book's `index.js` header lists exactly what went where.
  The shape is now **three or four top-level tabs**: «المؤلّف والمترجم», «مراجعة الكتاب»,
  («داخل حالة التدفّق» for Stolen Focus), and a group «أنشطة إضافية».
- **THE CHAPTERS ARE PANELS, NOT ROUTES.** «مراجعة الكتاب» (slug `review`) is one section
  whose `tabs` block holds every chapter: four panels for Why We Sleep (mechanism folds in
  lifespan + animal sleep, REM folds in dreams, NREM folds in memory, plus health) and ten
  for Stolen Focus, in the book's own order. A folded-in chapter keeps an `h` heading of its
  own title, so the seam stays visible.
  **`components/Collapsible.jsx` is the site's ONE disclosure idiom** — Wikipedia-style
  collapsible headings, used by the chapters, the author/translator tab and the activities
  tab alike — and by the members' reviews on a book landing, which pass `level={3}` because
  they sit under an `h2` of their own (the look comes from the class, not the tag). There is
  no tab bar anywhere any more; `TabbedBlocks` and the stacked
  `Activities` were two implementations a week apart and a third was the alternative.
  **All closed on arrival, several may be open at once, and a body mounts only while
  open.** That last part is load-bearing: the review's default panel used to mount on
  arrival and it carries figures, so ~138 kB gzip of charts came down on every book visit —
  measured, the charts chunk is now not fetched until a chapter with a figure is opened.
  **`?open=<id>` unfolds one on arrival** — `…/review?open=rem`. Not decoration: chapters
  were routes until 2026-08-24, so without it every link to one (cross-book `connections`,
  in-content cards, `FocusLab`'s links, search hits, the landing's stat chips) would drop
  the reader on a page of shut headings. **The seeding is an EFFECT, not a `useState`
  initialiser** — only the query changes when a link points at a sibling from the same
  page, so the component never remounts and an initialiser runs once and never again
  (measured). It only ADDS, and scrolls the target into view. **Opening also writes `?open=`
  back to the URL** — without that a reader who opened a chapter and copied the address
  shared a page of shut headings, and `Analytics` (which passes `pathname + search`) only ever
  saw chapters arrived at by link, collapsing the book back into three rows. `check-links` validates
  `?open=` against panel ids AND activity part ids — a wrong one fails exactly like a wrong
  slug, silently. **The search index (`data/searchBuild.js`) emits one entry per panel and
  per activity**, each deep-linked; indexing only sections would have cost search most of
  its entries.
  **A HEADING is the unit of reading**, not the section — and there is now exactly **one
  definition of "read"**: `sectionUnits()` / `sectionProgress()` in `data/bookHelpers.js`, which the
  card's ✓, the sidebar's ✓, the progress ring and the «تابع القراءة» CTA all count. They
  disagreed for a while: arriving marked the bare slug (which the ticks read) while the ring
  counted heading keys (which arrival never wrote), so a card showed ✓ «مراجعة الكتاب» beside
  a hero saying «قرأت 0 من 7». **Arrival only marks a section that has no headings**; one with
  headings is read by opening them, and a partly-read card shows `3/10` rather than a ✓.
  `blockWords` recurses into headings for the same reason — without it the review card
  advertised «~1 min read» for an entire book — and `readMinutes` is memoised, since that walk
  is ~120 blocks per card and `visited` changes now happen mid-page.
  **`openable(section)`** is the one place that knows a section keeps its headings in either a
  `tabs` block or a `parts` field; `readingUnits`, `searchBuild` and both link checkers go
  through it. That walk was written three times and had already diverged — `readingUnits` knew
  only `tabs`, so every activity's visited key was a dead write.
  **Two checkers, because one cannot see everything.** `check-links` walks the whole book
  object (a bare slug on `verdict` once pointed at a deleted section while it reported clean).
  `check-component-links` matches `/book/…` links written straight into JSX, which no data
  walk can reach — `FocusLab.jsx` carries nine and `App.jsx`'s legacy `/assessment` redirect
  had been pointing at a deleted section since the collapse, found by that script on its first
  run. Template holes (`/book/${id}/…`) are skipped rather than guessed at.
  Stolen Focus in Arabic is **«تركيزنا المسلوب»** by **«يوهان هاري»** (the published
  Dar Al-Tanweer edition) — not «التركيز المسروق»/«جوهان هاري». Same rule for
  Csikszentmihalyi: **«ميهالي تشيكزينتميهالي»**, the spelling his Arabic translations use —
  not «ميهاي تشيكسنتميهايي», which the site used until 2026-07-30. Follow the published
  Arabic edition for author names rather than transliterating from English.
- `BookSection.jsx` dispatches a third kind, **`'focus-lab'`** → `components/FocusLab.jsx`
  (7 games: Stroop, task-switching with pure/mixed blocks, SART, visual search, 2-back,
  adaptive digit span, distracted reading — all in-memory, RT via `performance.now()`,
  plus a normalised overall score).
- Stolen Focus figures live in `components/figures/stolen-focus/` (ids prefixed `sf`);
  the distracted-reading game is shared between the figure registry and the Focus Lab.
- Sidebar derives the active book from the URL (and exists only inside a book — see
  Navigation above). The active book's sections render as
  collapsible groups (from the book's `groups` data) — only the group holding the
  current section auto-expands; headers show visited/total counts, items show ✓ ticks.
  **A `groups` entry may instead be `{ slug }` — a SOLO top-level tab with no header**
  (`entrySlugs` in `data/bookHelpers.js`). Everything that walks `groups` must go through that
  helper, `check-links` included, or solo tabs are silently skipped.
  The collapsed icon-rail hides the section tree entirely.
- **Book landing v2** (`BookSection.jsx`): books may define `groups` (titled slug lists)
  for a grouped card layout; section cards show lead + computed read-time; a `fam` tag on
  sections colours cards (stolen-focus injects `fam` + a one-question `quick` check per
  article via `enrich()` in its index.js). Landing hero shows stats + a shocking-fact
  rotator — **fed from the myth-or-fact deck's FACT half**, since «الحقائق الصادمة» stopped
  being a section; teasing the landing with a myth would state something untrue in the
  book's own voice. `AppContext` tracks `visited` sections in memory (session ticks +
  progress ring). Section pages: scroll-progress bar (NB: the app scrolls on `<body>`, not the
  window), next-up card, arrow-key + swipe navigation, `route-fade` transition.
- `ContentBlocks` supports `peoplegroups` (people in titled groups with filter chips) —
  used by the stolen-focus characters section; the plain `people` block still works.
- **Verdict + critical reception.** Each book module exports a `verdict` (rating,
  opinion, read-it-if / watch-out-for) — rendered as the «رأي النادي» card on the book
  landing. **«الكتاب في الميزان» is no longer a section** (removed 2026-08-24), but
  `reception.js` still holds its material as block arrays appended to the sections that
  make the claims they qualify: `scrutiny` → «النوم والصحّة» for Why We Sleep, and
  `adhdCaveat` → «فرط الحركة» plus `authorScrutiny` → the author tab for Stolen Focus.
  **That relocation was not optional and must not be undone by deleting them**: two of
  Guzey's four corrections are about claims the site still states plainly, and the ADHD
  critique has practical stakes — someone could stop treatment over those chapters. A
  correction filed away from the claim it corrects is a correction nobody reads. **The verdict text is the
  club's opinion, not fact — edit it freely.** The reception content is the opposite:
  every criticism must stay sourced, paired with the author's reply where one exists, and
  limited to what is publicly documented. It exists to make the club read critically, not
  to attack authors — keep that bar if you extend it. Two block types serve it:
  `debate` (claim → critique → optional response, with a `critic` attribution) and
  `sources` (the site's only off-site links; they open in a new tab with `noopener`).
  A `debate` entry may also be the **club's own fact-check** (`critic: «تحقّقٌ من النادي»`) —
  the 23-minute entry is one: the book misattributes that figure to Michael Posner when it is
  Gloria Mark's, and it appears in no peer-reviewed paper. Same bar applies: check it yourself
  and link the primary source. **Don't "restore" the 23-minute claim as fact anywhere**, and
  don't reinstate the interruption figure that was built on it (POLISH-PLAN §7).
- **Members' reviews** — `book.reviews`, from `data/books/<slug>/reviews.js` (the first,
  2026-10-16, is Maria's on «تركيزنا المسلوب»). Rendered as «بأقلام الأعضاء» on the book
  landing straight after the club's verdict — the club's opinion, then the members' — one
  collapsible heading each, so a long review costs the landing one line until opened. Each
  `id` is its `?open=` address and search links to it, so keep ids stable.
  **The Arabic is the member's own text, verbatim**: don't copy-edit it or align it with the
  site's spellings (Maria writes «سون ليمان» where the site writes «سونه ليمان»). **The
  English is a translation made for the site and says so** through `translationNote`, which
  is empty in Arabic. Book header lines (title/author/translator) are left out — the page
  already says which book it is.
- **Flow-state deep dive** (`data/books/stolen-focus/sections-flow.js`) — a section inside the
  Stolen Focus tab sourced from **another book**, Csikszentmihalyi's *Flow*. It is a **solo top-level tab**
  and opens with a callout saying whose book it is — which is what keeps it from reading as
  Hari's. It used to sit in a titled group of one, which only buried it. Its four figures live in `figures/stolen-focus/FlowFigures.jsx` and are
  hand-rolled SVG — **don't reach for recharts there**, it would drag the charting library into
  a text section. Fig 15 looks for `public/images/flow/brain-lateral.webp` and falls back to a
  schematic if absent (ClubBanner's degrade-don't-break pattern), so dropping that file in
  upgrades the figure with no code change.
- **The 7-day challenge was deleted (2026-08-24)** at the user's call — "completely
  unimportant". `WeekChallenge.jsx`, both `challenge.js` files and `AppContext.challengeDone`
  are gone with it. In git history if it is ever wanted back; don't rebuild it from memory.
- **«خرافة أم حقيقة؟» — the myths and the shocking facts are one game now**
  (`components/MythOrFact.jsx`, kind `'myth-game'`, data in `data/books/<slug>/mythOrFact.js`).
  Both were read-only lists that printed the answer beside the claim. **Two rules keep the
  deck honest, and it stops working if either breaks**: every statement is a flat
  third-person assertion — the old myths were first-person and in «guillemets» while the
  facts were third-person statistics, so the punctuation alone gave the answer away — and
  neither half may be guessable by length or tone. The data files say this at the top too.
- **«أنشطة إضافية» is ONE tab**, its activities rendered through the same `Collapsible` as
  the chapters — see the bullet above. It passes **`keepMounted`** and the chapters do not:
  a body mounts on first open either way (so nothing is fetched early), but closing an
  activity only *hides* it. Shutting «الدراسات والتجارب» used to unmount `StudiesQuiz` and
  take forty answers of a 122-study quiz with it; the same for the lab's seven results and
  the game's deck. For the chapters, unmounting is right — twelve of them, up to seven
  figures each, and nothing to lose but a chart slider. The focus lab is a lazy chunk and
  the quiz is 122 studies, so a reader who came for one activity loads nothing else. The quiz, the game, the assessment, the focus lab and «الشخصيات» are
  `parts` of a single section (`kind: 'activities'`), rendered one under another by
  `Activities` in `BookSection`; each part keeps the `kind` it had as a section so `Activity`
  renders it unchanged. The focus-habits assessment sits directly **under** the lab rather
  than beside it — they answer the same question, one by self-report and one by measurement.
  **Nothing may look an activity up as a section any more.** `findByKind(book, kind)` in
  `data/bookHelpers.js` searches sections *and* parts and returns both the part (its data) and the
  section (its URL); the landing's stat chips, `FactRotator` and `countExperts` all go
  through it. Missing that is how the «X+ شخصية» chip silently vanished. The search index emits
  an entry per part, and the studies' `?study=` deep link resolves against the parts too.
- **«الاقتصاد كما أشرحه لابنتي» — Yanis Varoufakis, the third book** (season from
  2026-09-27; Stolen Focus ended 2026-09-20). `data/books/talking-to-my-daughter/`. Arabic
  title, author spelling «يانيس فاروفاكيس» and translator «عماد شيحة» are the **Dar Al Saqi
  2020** edition's own, read off its title page; chapter titles likewise — **except chapter
  8**, «فيروساتٌ غبيّة؟», which is a rendering: the club's scan lacks that page. Check it
  against a paper copy. The Arabic edition prints **no subtitle**, so `subtitle` is
  English-only and the landing renders it through `t()` (an `{ar:''}` object is truthy).
  Chapter vocabulary follows the translation (مجتمع السوق، الانقلاب الكبير، التسييجات،
  المصرف…); names too (السيد نابوك، القبطان كوستاس، فاسيلي).
  **Pages missing from that scan in chapters 5–7 were photographed by the club on
  2026-11-17** (kept with the book files in `missing-pages/`, outside the repo), and those
  chapters now use the translator's words where the first draft had rendered the English:
  الظبي والأرانب البرّية (not «الأيل»)، البرّادات، البندورة، سوق قوّة العمل، كزافييه، انكماش
  الأسعار — and the films and tales as he titles them: «المصفوفة» (The Matrix)، «رحلة عبر
  النجوم» (Star Trek)، «عدّاء النصل»، «المبيد»، «العصيدة الحلوة»، «الساحر المتمرّن». The full
  list is in the header of `chapters-2.js`; keep the figures, the quiz, the people and the
  game's questions in step with it.
  **The book's own nine characters are PAINTED** (2026-11-17, at the club's request, by
  `scripts/generate-character-art.mjs` in the game board's style; masters in the book folder's
  `painted-characters/`). The three the author made up (Nabuk, Miriam, Maria) are portraits;
  the six real, private people (Xenia, Kostas, Paris, Wasily, Andreas, the author's father) are
  **never given a face** — painted from behind, or through the scene the book remembers them by
  — because a painted face would claim a likeness nobody gave us. The fifteen people still
  showing a monogram are real public figures; the club is collecting their photos.
  - Four tabs: author+translator, «مراجعة الكتاب» (8 chapters + epilogue as panels), the
    companion **«الدَّين والربا والأنظمة الثلاثة»** (slug `debt-usury`), and activities.
  - **The companion tab is the club's own PDF**, converted (it stays outside the repo with the
    book files). Deliberately dropped from it: page references into one person's scan, a
    **named bank** in its mortgage-rate example (sourced only to a broker's social post — the
    point stands unnamed), a link to what looks like an unauthorised copy of Usmani's book,
    and a recoloured screenshot of the IMF's map. It presents fiqh positions **including
    minority ones and says it is not a fatwa** — keep it that way. The Qur'anic text is
    transcribed from the PDF; the English renders meaning, not a translation.
  - **No assessment or lab, on purpose**: the other books measure something the reader does;
    this one is about a system. Each chapter has one interactive figure instead. The quiz is
    «تجارب وحوادث» (22 items) because the book cites almost no studies; its part's
    `countLabel` makes the landing chip say «22 تجربةً وحادثة» rather than «دراسة».
  - **Three club fact-checks** (`reception.js`), each appended to its chapter: blood-donation
    payment (Titmuss is only partly borne out), Bitcoin's supply (~99% by 2035, last coin
    ~2140 — not "2032"), Easter Island (no abandonment, collapse narrative contested).
  - **Photos the club supplied but that are NOT used**, with reasons, are listed at the top of
    `scripts/prep-economy-images.mjs`: two AI-generated "historical" images, a mislabelled
    Swiss engraving, works not in the book, and the author's daughter (a private person,
    photographed as a minor). Bretton Woods/Nixon and *Utopia* are not in the book either but
    each has a clearly marked «من خارج الكتاب» aside beside the chapter it extends.
  - **Payload**: this book took the entry chunk from 309.6 → 453.9 kB gzipped, which is what
    finally forced the per-book split (same day, 2026-10-16): the entry is now 69.6 kB gz and
    each book loads on its own — see "Books registry".
- **Home is three blocks: the hero, the shelf, and the game's card.** It is still a front
  door, and the rule that cut it down on 2026-08-03 — **simpler, not more explained** — still
  holds: nothing on it explains the site. ("Ask me one" and a "how this works" strip were
  removed that day; both are in git history.)
  The shelf is `BookPoster` cards — a cover standing on a stage painted in the book's own tone,
  with its season from `club.seasons` — three across, or on a phone a scroll-snapping row that
  BLEEDS to both screen edges so the next poster shows a sliver of itself (a row that stopped
  neatly at the padding would look complete, and nobody would swipe it). `BookPoster` is also
  the Books page's grid.
  The game's card is the one addition since the cut, because a thing the club plays together
  on a call needs a door on the page everyone opens first. If something else ever wants to live
  here, something has to leave. NB: Home.jsx is also where the hero video is mounted.
- **Cross-book connections.** `src/data/connections.js` + `components/BookConnections.jsx`
  render "where our books meet" at the foot of the Books page: per theme, what each book
  says side by side, then the club's synthesis. This is **original club analysis, not a
  summary of either book**, so nothing needs sourcing — but each `slug` must be a real
  section (they render as links, and an invalid slug silently falls back to the book
  landing rather than erroring, so check them). Themes whose books aren't registered drop
  out automatically, so adding a third book only means adding themes here.
- **Club data** lives in `src/data/club.js` (seasons, `banner`, `members`, `gallery`) and
  drives the About page, which is book-agnostic and reads titles/covers from the books
  registry. **Its stats strip reads `clubTotals`**, precomputed per book by `bookStats()` in
  `data/skeleton.js`, which walks the whole object (figures count distinct ids — two are shown
  twice). The path-based count it replaced had said «0 دراسة» and «5 أشكال» since the
  sections were folded into panels and parts. `members`/`gallery` are empty by design — the page hides those sections until
  they're filled, and members without a `photo` render an initial monogram. Photos go in
  `public/images/club/`. The optional atmospheric `banner` (About-page hero) expects
  `public/images/club/reading-corner.jpg`; its `ClubBanner` starts `display:none` and
  reveals only on successful image load (eager `<img>`, so it still fetches while hidden) —
  a missing file leaves no broken box or overflow.
- **Shareable result cards** (`components/ResultCard.jsx`) end the assessment, the studies
  quiz and the Focus Lab. Built to be screenshotted, so the club branding is baked into
  the card itself. Copy falls back clipboard API → `execCommand` → a selectable textarea;
  don't "simplify" that chain, the first two fail on insecure origins and unfocused docs.
- **Search** — `⌘K`/`Ctrl-K` or `/` opens `components/SearchPalette.jsx`, over a flat index
  **prebuilt at build time** (`data/searchBuild.js`, run by `gen-book-skeletons.mjs` into
  `data/searchData.js`) and imported with its scoring (`data/searchIndex.js`) only when the
  palette first opens — so searching needs neither the books nor anything in the entry chunk.
  Every section, panel, activity, study and member review, both languages in one haystack. Study hits deep-link as `…/studies?study=<id>`; `StudiesQuiz`
  reads that param and jumps, guarded by a ref so answering can't yank the reader back.
- **Member world map** (`components/WorldReach.jsx`, data in `club.reach`) — the club is
  online, so the About page maps where members join the weekly session from. Non-obvious
  constraints, all deliberate:
  - **Continents are real, baked at build time.** `scripts/gen-world.mjs` projects the
    public-domain world-atlas `land-110m` polygons through the same equirectangular window
    as the component and writes `src/data/worldLand.js`. Nothing is hand-drawn and nothing
    is fetched at runtime. Its packages (`world-atlas`, `topojson-client`) are **not**
    dependencies — install them on demand only to regenerate, which is needed **only if
    `VIEW` in WorldReach.jsx changes** (the two must stay in sync).
  - **No flag emoji anywhere.** Windows ships no flag glyphs, so 🇬🇧 renders as "GB". Each
    location gets a palette colour + its real name instead. Don't "improve" this with flags.
  - **Only `country` is rendered**; `city` is kept in the data purely to document what the
    coordinates point at.
  - **Istanbul is nudged ~2px NW** onto its Thracian side — its true point sits in the
    Bosphorus, which the 110m coastline reads as sea. Verify pins with the SVG fill
    hit-test (`path.isPointInFill`) rather than by eye.
  - **The hover tooltip is centre-anchored on purpose.** `text-anchor: start/end` flips
    meaning between LTR and RTL, which threw the longest Arabic label off-frame.
- **Presentation mode** — `presenting` in `AppContext` reflects onto `<html data-presenting>`;
  CSS hides the chrome and scales the *root font-size* (21px), which lifts every rem-based
  token at once. Toggle: navbar 📽️ button or bare `p`; Esc exits. The palette's Esc handler
  uses `stopImmediatePropagation` because both it and Layout listen on `window`.
- **The homepage hero is a video** (shipped 2026-08-18; it was a surprise for members
  until then, and no longer is). `src/data/heroScene.js` is the control panel: `enabled`
  is a kill switch back to the old text hero, `active` picks the scene, and
  `featuredBookId: null` means "follow the club's current season".
  - **`overhead` is the only scene** — a flat-lay: a book falls open beside a cup of
    coffee, and the book's title/author/translator are set on the open right-hand page
    (`data/pageArt.js`). A second treatment, **`toppling`** (a stack slides apart, the
    rebuilt cover from `data/coverArt.js` warped onto the standing book), was kept beside
    it for comparison and **deleted on 2026-08-21** — it was never switched on and its
    assets were ~5.4 MB nobody downloaded. Recoverable: the scene definition is in git
    history, and its masters/frames were always outside the repo in
    `hero-video-wip/{renders,frames}/toppling/`. `coverArt.js` and the `kind: 'cover'`
    path in `HeroCinema` are deliberately kept — that artwork is real work, and a future
    stand-a-book-up treatment would want it — so **that branch is currently unreachable**.
  - **The video plays once per session** (in-memory flag in `AppContext`, never storage)
    then freezes. **frame1/frame2 are the video's own first and last frames**, extracted
    from the encoded mp4 — an earlier version froze on the FLUX stills the video was
    generated *from* and the freeze visibly jumped, because generation drifts.
  - **The still is always mounted UNDER the video** — don't collapse that back into a
    ternary that renders one or the other. It used to, and the still then mounted with a
    ~0.5 MB frame2 the browser had never fetched, requested at the exact moment of the cut,
    so the hero blinked between the video ending and the artwork appearing. It holds frame1
    until the video is genuinely `playing`: with the ending underneath, a transparent first
    paint of the `<video>` would flash the finish before the motion ran.
  - **Nothing uses the cover IMAGE.** Warping a photo of a cover onto a photographed book
    reads as a sticker: it brings its own lighting and paper. The artwork is rebuilt from
    parts — vector shapes, type in the site's own fonts, and illustrations cut out of the
    real cover by `scripts/extract-cover-art.mjs`. Type is **black**, because it prints
    onto the book's own pale cloth; nothing recolours the board.
  - **`quad`/`clip` are pixel coordinates in the frame** and must be recalibrated whenever
    frames change. Use `scripts/hero-calibrate.mjs` — its `--zoom` mode is what makes
    corners accurate; the full-frame grid is only good to ±30px, which once left a visible
    rim of bare book around the artwork. `scripts/hero-preview.mjs` renders the composite
    offline, which is the only way to judge it: the embedded browser pane cannot
    screenshot, and it also freezes CSS animations and serves stale HMR stylesheets.
  - **The shipped mp4s are denoised and 720p, and that is not a detail to "fix".** The
    first cut was raw 1080p generative output at 7.6 Mbps — 3.8 MB for four seconds, which
    made a first visit to Home ~5.8 MB, about 90% of it that one file. Raising CRF barely
    helps (1080p CRF 28 was still 2.9 MB), because the frames are full of model grain and
    grain is the most expensive thing an encoder can be asked to keep. `hqdn3d` in front of
    the encoder plus a 720p short side does the work: **3.82 → 1.34 MB landscape, 3.92 →
    1.48 MB portrait**; the budget in `scripts/encode-hero-video.mjs` is now ≤2 MB a file.
    The video carries only the motion — the title artwork is a vector overlay on the
    *still*, so its legibility is untouched by the video's resolution. `imageW`/`imageH` in
    `heroScene.js` describe the **coordinate space**, not the shipped file, so the
    1920×1080 quads stayed correct with no recalibration, and the stills were left alone
    because re-encoding a chosen take moves nothing in the frame. **Don't judge this with
    SSIM** — it scores removed grain as error and rated a visually identical file at 0.87.
  - **Generation costs real money** and every script gates on `--yes`, printing the
    estimate and live balance first. Key in `../.keys/fal.txt`, outside the repo. Total
    spend was ~$3. Full pipeline notes, including the failures worth not repeating, are in
    `C:\Users\aq\Desktop\Ruqaa\hero-video-wip\RESUME.md`.
  - **Full-resolution masters stay OUTSIDE the repo** in `hero-video-wip/frames/<scene>/`;
    `public/` ships only WebP. The four landscape JPEGs alone are 3.1 MB against 0.76 MB
    as WebP, and `public/` is copied verbatim into `dist`.

- **Author and translator share ONE tab** («المؤلّف والمترجم»), two panels inside it via the
  `tabs` block; the translator biography is still `src/data/translator.js`.
  The first two Arabic editions are Dar Al-Tanweer and share one translator, so the biography
  is written once and each book passes only its title and edition year. Everything factual
  there is carried by the four linked sources, the first of which is his own televised
  account. **The third book has a different translator** (عماد شيحة, Dar Al Saqi 2020), whose
  page lives with that book (`books/talking-to-my-daughter/translator.js`) — don't turn
  `translator.js` into a template for him; it is one man's biography.

# CLAUDE.md

Bilingual (Arabic RTL / English LTR) reading-club site built with Vite + React 18. No
backend, no build step beyond Vite. The git repo root and all commands live in this
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

Two data checks, neither wired into a test runner (there isn't one) — run them by hand:
```bash
node scripts/check-image-refs.mjs
node scripts/check-links.mjs
```
`check-image-refs` imports the book data and walks every block (paths are helper-built, so
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
  `callout`/`quote`/`figure`/`image`/`imggrid`/`people`/`tabs`/`quick`/`myth`).
  `quick` is the end-of-article check; it lives in `ContentBlocks` (not `BookSection`)
  because a chapter folded into a panel has to carry its own. A `{ type:'tabs',
  panels:[{title,blocks}] }` renders whole sub-documents behind a segmented bar and recurses
  into `ContentBlocks` — it is what puts the author and the translator in one tab. Only the
  active panel is mounted, so a hidden panel's portraits are never fetched.
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
their own chunks, and two things are loaded lazily:

- **`figures/registry.jsx`** (via `React.lazy` in `ContentBlocks`) — it imports every chart
  component and, through them, all of recharts (~105 kB gzipped). Keeping it lazy is what
  keeps recharts off Home, Books, About and every text-only section. **Never import the
  registry statically**, or recharts lands back in the entry chunk.
- **`FocusLab.jsx`** (via `React.lazy` in `BookSection`) — seven games for one section.

Both render a `.figure-loading` placeholder through `Suspense` so the page doesn't jump.
Verify with `npm run build`: the entry `index.html` should reference only `index-*.js`,
`react-*.js` and the CSS — if `charts-*` appears there, something started importing
recharts eagerly.

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
  search results, book carousel).
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

## Current project state (last big update: 2026-07-20)

- **The project is Ruqʿa / رُقعة** (`ruqaa-reading-club`) — a multi-book club site, not a
  single-book site. Keep site chrome book-agnostic. The footer carries a required
  disclaimer (fan-made summaries, not affiliated with authors/publishers) — don't remove
  it. The workspace folder is `C:\Users\aq\Desktop\Ruqaa\` (renamed from `Sleep\` on
  2026-07-20).
- **Git: the only repo is this `app/` folder** → github.com/ahmedqanayah-rgb/Ruqaa
  (**public**). The parent `Ruqaa/` is intentionally not a repo. **Never commit the book
  reference material** (`Ruqaa/Why we Sleep/`, `Ruqaa/Stolen focus/` — epub, raw book
  text, figure PDFs); history was rewritten on 2026-07-20 to purge exactly those.
- **Two books are live**: `why-we-sleep` (6 sections) and `stolen-focus` (7), down from 19
  and 24 on **2026-08-24**. Each book's `index.js` header lists exactly what went where.
  The shape is now **three or four top-level tabs**: «المؤلّف والمترجم», «مراجعة الكتاب»,
  («داخل حالة التدفّق» for Stolen Focus), and a group «أنشطة إضافية».
- **THE CHAPTERS ARE PANELS, NOT ROUTES.** «مراجعة الكتاب» (slug `review`) is one section
  whose `tabs` block holds every chapter: four panels for Why We Sleep (mechanism folds in
  lifespan + animal sleep, REM folds in dreams, NREM folds in memory, plus health) and ten
  for Stolen Focus, in the book's own order. A folded-in chapter keeps an `h` heading of its
  own title, so the seam stays visible.
  **Every panel has an `id` and the open one lives in `?tab=`** — `…/review?tab=rem`. That
  is not decoration: these were routes until that date, so without it every link to a
  chapter (cross-book `connections`, in-content link cards, `FocusLab`'s links, a search
  hit) would land on the parent and leave the reader hunting. `check-links` validates the
  tab id as well as the slug, because a wrong one fails exactly like a wrong slug — the
  reader silently gets panel 1. **`searchIndex` emits one entry per panel** for the same
  reason; indexing only sections would have cost search most of its entries.
  **A panel is the unit of reading**, not the section: `readingUnits()` in `data/books.js`
  drives the progress ring and the «تابع القراءة» CTA, and `TabbedBlocks` marks the active
  panel visited itself. Counting sections made one chapter of ten tick the whole book off
  and sent the CTA past 90% of it. `blockWords` recurses into panels for the same reason —
  without that the review card advertised «~1 min read» for an entire book.
  NB `check-links` walks the whole book object now (a bare slug on `verdict` once pointed at
  a deleted section while the script reported clean), but it still sees **data only** —
  links hardcoded in components (`FocusLab.jsx`) are invisible to it, so grep for
  `/book/<id>/` after any slug change.
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
- Sidebar derives the active book from the URL; Home shows a scroll-snap book carousel
  (a "see all" card appears only past 3 books). The active book's sections render as
  collapsible groups (from the book's `groups` data) — only the group holding the
  current section auto-expands; headers show visited/total counts, items show ✓ ticks.
  **A `groups` entry may instead be `{ slug }` — a SOLO top-level tab with no header**
  (`entrySlugs` in `data/books.js`). Everything that walks `groups` must go through that
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
- **«أنشطة إضافية» is ONE tab of COLLAPSIBLE headings**, Wikipedia-style — no inner tab bar,
  which was an explicit call. **All closed on arrival, several may be open at once**, and a
  body is mounted only while open: the focus lab is a lazy chunk and the quiz is 122
  studies, so a reader who came for one thing loads nothing else. `?open=<id>` unfolds one
  on arrival — the landing's stat chips, search hits and the lab's own button all land here
  and would otherwise drop the reader on a page of shut titles. **That seeding is an EFFECT,
  not a `useState` initialiser**: only the query changes when a link points at another
  activity from this same page, so the component never remounts and an initialiser runs once
  and never again (measured — an `?open=focus-lab` arrival left the previously-opened one
  showing). It only ever ADDS, and scrolls the target into view. `check-links` validates
  `?open=` against the part ids exactly as it validates `?tab=`. The quiz, the game, the assessment, the focus lab and «الشخصيات» are
  `parts` of a single section (`kind: 'activities'`), rendered one under another by
  `Activities` in `BookSection`; each part keeps the `kind` it had as a section so `Activity`
  renders it unchanged. The focus-habits assessment sits directly **under** the lab rather
  than beside it — they answer the same question, one by self-report and one by measurement.
  **Nothing may look an activity up as a section any more.** `findByKind(book, kind)` in
  `data/books.js` searches sections *and* parts and returns both the part (its data) and the
  section (its URL); the landing's stat chips, `FactRotator` and `countExperts` all go
  through it. Missing that is how the «X+ شخصية» chip silently vanished. `searchIndex` emits
  an entry per part, and the studies' `?study=` deep link resolves against the parts too.
- **Home is deliberately two blocks: the hero and the book carousel.** Nothing else. Two
  further sections were removed on 2026-08-03 at the user's request — "Ask me one" (a
  random-study session opener, with `data/studiesPool.js` behind it) and a "how this works"
  strip added earlier the same day. The brief was **simpler, not more explained**, so treat
  Home as a front door rather than a place to put things: it is 1.4 screens on a phone, down
  from 3.4. Both are in git history if they're ever wanted back. NB: Home.jsx is also where
  the paused hero video gets restored — that work touches the top of the page.
- **Cross-book connections.** `src/data/connections.js` + `components/BookConnections.jsx`
  render "where our books meet" at the foot of the Books page: per theme, what each book
  says side by side, then the club's synthesis. This is **original club analysis, not a
  summary of either book**, so nothing needs sourcing — but each `slug` must be a real
  section (they render as links, and an invalid slug silently falls back to the book
  landing rather than erroring, so check them). Themes whose books aren't registered drop
  out automatically, so adding a third book only means adding themes here.
- **Club data** lives in `src/data/club.js` (seasons, `banner`, `members`, `gallery`) and
  drives the About page, which is book-agnostic and reads titles/covers from the books
  registry. `members`/`gallery` are empty by design — the page hides those sections until
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
  built once at load in `src/data/searchIndex.js` (every section + every study, both
  languages in one haystack). Study hits deep-link as `…/studies?study=<id>`; `StudiesQuiz`
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

- **The header is ONE bar.** The site map used to sit on a second row beneath the navbar;
  the chips now ride inside it. Below 1024px they hide — the navbar alone needs ~448px and
  the chips ~562px — and the drawer carries those destinations there. A **breadcrumb**
  (`components/Breadcrumb.jsx`) sits under the bar and is **deliberately not sticky**:
  pinning a second row costs a phone 67px of *every* screen of reading, and section pages
  already carry a fixed bar at the bottom. **The sidebar starts collapsed** to a 64px rail;
  its state lives in `Layout` and survives navigation for the sitting.

- **Author and translator share ONE tab** («المؤلّف والمترجم»), two panels inside it via the
  `tabs` block; the translator biography is still `src/data/translator.js`.
  Both Arabic editions are Dar Al-Tanweer and share one translator, so the biography is
  written once and each book passes only its title and edition year. Everything factual
  there is carried by the four linked sources, the first of which is his own televised
  account.

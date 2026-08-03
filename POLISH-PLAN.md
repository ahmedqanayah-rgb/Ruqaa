# Polishing plan

A review of the whole site, ordered by real impact. Written to be picked up in a later
session — each item says what's wrong, how it was measured, and how to know it worked.
Same spirit as `PLAN-stolen-focus.md`. **Last updated 2026-07-27.**

Everything already **done** is listed at the bottom, so nobody redoes it. §6 records design
decisions the user made about the figures — treat those as settled.

**Start here:** the site is live at https://ruqaa.vercel.app and every push to `main`
auto-deploys. Working tree was clean at last handoff. **§1 is now finished** — the only
remaining item of substance is §3, which is content only the club can write.

---

## 1. Images — 43 MB → 3.9 MB  ✅ **done (2026-07-27)**

The JS bundle was just cut to 346 kB gzipped. The images are **43.3 MB across 116 files** —
roughly **125× the entire JS payload**. For members joining from Syria, Malaysia, Turkey and
the UAE on uneven connections, this is *the* performance story; nothing else comes close.

Measured with sharp (`await sharp(f).metadata()` over `public/images`):

| Finding | Size |
|---|---|
| Total | 43.3 MB / 116 files |
| 15 files wider than 1600px | 24.1 MB |
| 35 files with transparency (the `clean/` cut-outs) | 32.0 MB |
| Single worst: `anatomical/narcolepsy.png` (3274×4096) | 8.1 MB |

The content column is `--maxw: 900px`. A 4060px-wide diagram is ~5× wider than it can ever
render.

**1a. Delete genuinely unused files (~9.3 MB, zero risk).** Verified unreferenced by
filename across `src/`, `scripts/` and `index.html`:
`anatomical/narcolepsy.png` (8.1 MB), `anatomical/beta-amyloid-1.jpg`,
`characters/nathaniel-kleitman-1.jpg`, `characters/keith-richards.jpg`.

> **Do not** trust a plain filename grep here. `SpiderWebs.jsx` and `BrainNetworks.jsx`
> build paths dynamically (`` `./images/clean/spider/${f}.png` ``), so 8 files looked unused
> and are not. Check for template-built paths before deleting anything.

**1b. Resize + recompress in place** (done — see below). Keeps filenames and formats, so no
reference churn.

**1c. Convert to WebP.** ✅ **done.** `clean/` first (2026-07-24): 5.1 MB → 2.3 MB (−55%).
Then `characters/` (2026-07-27): 57 portraits, 1.7 MB → 1.4 MB — only −19%, because these
were already width-capped jpgs and jpg→webp pays far less than png→webp. Both went through
`scripts/to-webp.mjs <dir>` (the old `clean-to-webp.mjs`, now taking a directory argument),
with the extension swapped inside the `clean()`/`panel()`/`rowImg()`/`port()` helpers so no
call site changed; the two literal `authorPhoto` paths in the book `index.js` files were
fixed by hand. **`og:image` must stay JPG** — several social scrapers won't fetch a WebP
preview image — so the covers used in link previews were left alone.

**1c-bis. The real win: stop shipping build inputs** (2026-07-27, 7.4 MB → 3.9 MB).
`anatomical/` was never really a WebP problem. Auditing it showed **17 of its 20 files are
never requested by the site at all** — 12 are inputs to `process-images.mjs` and 5 to
`fix-images.mjs`, both of which write cut-outs into `clean/`. Only three are rendered
(`rem-vs-nrem`, `half-sleeping-bird`, `natural-killer-cells`). The same was true of
`spider-web.png` (496 kB). They sat in `public/`, which Vite copies verbatim into `dist`, so
every visitor was served ~2.9 MB of source material nobody downloads.

Those 18 originals now live in **`assets-src/`**, outside `public/` — still in the repo, still
regenerating `clean/`, just not shipped. The two scripts point there instead. A further
650 kB went with four generated cut-outs in `clean/` (`brain-areas`, `pineal-gland`, `prion`,
`spider-web`) that no section ever ended up using; all four regenerate from `assets-src/`.

> **The lesson generalises: `public/` is a shipping manifest, not a shed.** Anything that is
> only an input to a script belongs in `assets-src/`.

**`scripts/check-image-refs.mjs`** now guards both directions. It imports the real book data
and walks every block rather than grepping — §1a records why a filename grep is untrustworthy
here — then reports refs pointing at missing files *and* files in `public/images` that
nothing references. Run it after any image rename, move or format change:

```bash
node scripts/check-image-refs.mjs
```

**1d. Reserve image space to stop layout shift.** ✅ **covers done** (2026-07-24): all four
book covers are a consistent 2:3, so `.book-cover` / `.book-hero-cover` / `.season-cover` got
`aspect-ratio: 2/3` + `object-fit: cover`, and the list covers (Home carousel, Books grid,
About seasons) got `loading="lazy"` — the book-landing hero cover stays eager as that page's
LCP. Person photos and logos were already fixed-size.
✅ **content images done** (2026-07-27). Their aspect ratios genuinely vary (provincetown
1.78 vs graceland 1.36), so a single `aspect-ratio` would have distorted them; the fix is
intrinsic `width`/`height` per image. `scripts/gen-image-dims.mjs` walks the book data for
`image`/`imggrid` blocks, reads each file with sharp and writes **`src/data/imageDims.js`**
(21 entries); `ImageBlock` looks up `block.src` and emits the attributes.

No CSS changed, and that's the point: `.img-block img` keeps `width/height: auto` under
`max-width: 100%` + `max-height: 460px`, so the attributes only supply the aspect ratio and
the existing clamps still decide the rendered size. Before, an unloaded image had an
intrinsic size of 0×0 and the article reflowed around it on arrival.

Re-run the generator after adding or replacing a content image —
`check-image-refs.mjs` fails if any content image is missing from the manifest.

---

**1e. Cut-out legibility on dark backgrounds.** ✅ **done (2026-07-27), user-reported.** The
`clean/` images are scans of printed diagrams — black labels, thin black leader lines,
engraved hatching, pale fills. Flood-filling the white background out left them transparent,
which reads beautifully on a light page and is *unreadable* on a dark one: black ink on
`#17140f`. The same happens in the light theme on a phone browser that force-darkens the page.

Fixed by baking a **paper backing plus margin into the pixels** (`scripts/paper-backing.mjs`).
The choice of pixels over CSS is the whole point: force-dark engines darken background
colours and deliberately leave image pixels alone, so a CSS plate would be darkened right back
out from under the artwork — and `tokens.css` already records that `color-scheme: only light`
doesn't reliably stop them. The paper colour is exactly the light theme's `--bg`, so in the
light theme the figures still blend into the page as originally designed; nothing about the
light view changed.

Two details worth keeping: the flood-fill only reaches the background from outside, so white
regions it couldn't enter (the cells inside a spider web's frame, the interior of an engraved
brain) stayed pure white and showed as a bright patch against the paper — the script remaps
what is still near-white to the same tone. And dropping the alpha channel made the files
*smaller*: 1696 kB → 1331 kB. **Images now total 3.6 MB.**

A sweep of the images that *weren't* cut out found one more: `anatomical/rem-vs-nrem.webp`, a
labelled diagram still on pure `#ffffff`. Its text was readable on dark (it was never
transparent), but beside the backed cut-outs it read as a brighter, cooler slab — so the
script's `HARMONIZE` list tones its white to the same paper, with no margin added since it
keeps its own. The other non-cut-out content images are photographs
(`natural-killer-cells` is a micrograph, plus provincetown/graceland and the portraits) and
need nothing.

The script is idempotent — cut-outs that already lost their alpha are skipped, and the
white→paper remap maps paper to itself — but it is the **last step of a pipeline**, and the
order is documented in its header.

---

## 2. Deployment — ✅ resolved (it was already live)

**The site is live at https://ruqaa.vercel.app and Vercel auto-deploys every push to `main`.**
So **push = deploy**, and a fix should be verified by loading that URL, not just localhost.

This section previously claimed nothing was deployed — that was wrong, and it cost a detour:
a GitHub Pages workflow was added on 2026-07-24 and then removed as a redundant second
deployment. Don't re-add Pages. `og:image`/`og:url` in `index.html` are absolute and point at
the Vercel domain; update them only if a custom domain is added.

Still worth settling before members' faces go up: the repo *and* the site are public, so get
each person's consent (see §3).

---

## 3. Waiting on the club (content, not code)

- **The verdict text is a placeholder.** `verdict` in both books' `reception.js` is written
  in the club's voice but it is *not* the club's opinion. Rewrite it, and the star ratings
  (currently 4 and 3.5).
- **Member photos + session gallery.** `club.members` and `club.gallery` are empty arrays;
  both sections stay hidden until filled. Repo is public — get each person's OK. Photos go
  in `public/images/club/`. (Watch the filename: the banner first arrived as
  `clubreading-corner.jpg.jpg`.)
- ✅ **Subtitle wording decided** (2026-07-27) — the user chose «نلتقي أسبوعياً في جلسةٍ واحدة
  على Google Meet». The English follows it («…in a single session on Google Meet»), so both
  match the «جلسة» wording the hub label and `WorldReach` already use.

---

## 3b. Fonts — self-hosted, and two faults fixed  ✅ done (2026-07-28)

Nobody had costed the webfonts. A visitor pulled **362 kB across 11 files** — comparable to
the entire JS bundle (346 kB gzipped).

> **Correction.** The first pass reported this as "551 kB / 15 files" and the `300` saving as
> 111 kB. That over-counted: Google's CSS declares 15 `@font-face` blocks, but **Inter is a
> variable font and all four of its weights point at the same URL**, so the browser fetches 11
> unique files, not 15. Counting unique URLs, the real figures are 362 kB before and 298 kB
> after. The commit message `860f7fd` carries the wrong numbers; these are right.

Two faults, both measured rather than guessed:

- **`300` was requested and never used once.** Not a single `font-weight: 300` anywhere in
  `src/`. Dropping it: **−64 kB, 2 fewer files, zero visual change.**
- **`800` was used 18 times and never requested.** Worse, **IBM Plex Sans Arabic has no 800
  at all** — the Google API returns HTTP 400 for `wght@800` on that family. Measured in the
  browser, `700` and `800` render *byte-identically* at every size in both families, because
  the browser clamps to the heaviest weight it has:

  | font | 700 | 800 |
  |---|---|---|
  | IBM Plex Sans Arabic, 3rem | 206.63 px | 206.63 px |
  | Inter, 3rem | 247.83 px | 247.83 px |
  | **system-ui** (fallback), 3rem | 220.53 px | **225.52 px** |

  So those 18 rules only ever did anything when the webfonts *failed* to load — the fallback
  has a real 800 and rendered heavier than the design. All 18 are now `700`, which both
  families genuinely have; the fallback now matches the webfont instead of diverging from it.

The request is now `wght@400;500;600;700` for both families. `500` stays despite only four CSS
uses because one of them is `.term-en`, which wraps **every** English technical term inside
Arabic text — it's on nearly every page.

### Self-hosted (user's call, same day)

The site no longer contacts `fonts.googleapis.com` at all — verified, 0 requests. That removes
two preconnects and a render-blocking cross-origin stylesheet from the critical path, keeps
the site working where Google Fonts is slow or blocked, and stops handing every visitor's IP
to a third party. **As predicted it is byte-neutral** — 300 kB self-hosted vs 298 kB from
Google for both languages — because `unicode-range` was already doing the real work. The win
is the removed dependency, not the payload.

`scripts/fetch-fonts.mjs` downloads the woff2 files and generates `src/styles/fonts.css`.
Four things in it are non-obvious and were each driven by a measurement:

- **Only the `arabic` and `latin` subsets.** Scanning every `.js/.jsx/.css/.html` file found
  exactly one codepoint outside them: **ʿ (U+02BF), 12 times, always in "Ruqʿa"** — the club's
  own name, so it is on every page. It lives in `latin-ext`, which costs 7 kB per Plex weight
  and **83 kB per Inter weight**: ~360 kB of font data for one glyph. Instead the script asks
  Google's `&text=` API to cut a font containing just that character — **0.9 kB** — pinned to
  `unicode-range: U+02BF`.
- **That cut is fetched for Inter only.** IBM Plex Sans Arabic **has no ʿ glyph**; Google still
  answers a `&text=` request for it, with an empty font. Measured at 100px, Plex renders ʿ at
  33.31 px on every weight — exactly the fallback width — while Inter gives a real, weight-
  varying glyph (17.58 → 16.86). The Plex face would have cost a request that finds nothing.
- **Files are written by content hash and shared.** Inter's four weights are one identical
  48 kB variable file; without this the repo would carry four copies.
- **Fonts are never inlined.** Vite base64s assets under 4 kB by default, which swept up the
  ʿ cuts and put **+6 kB gzipped into the render-blocking CSS**, paid by every visitor in both
  languages — and inlining defeats the `unicode-range` gating entirely. `vite.config.js` now
  excludes font files from inlining.

Result, measured in the browser: an Arabic reader fetches **8 files / 251 kB** and no Inter at
all; switching to English adds 3 more for **11 files / 300 kB**.

---

## 4. The 649 kB entry chunk is now mostly book content

After the vendor/lazy split, what's left in the entry is the books themselves — 183 studies
with full methodology text in two languages. Splitting it means lazy-loading each book's
sections, which touches everything reading `book.sections`, plus `searchIndex.js` and
`studiesPool.js`, which deliberately walk *all* books at module load.

Real work, real risk, and worth far less than item 1. Don't start it before the images.

---

## 5. Smaller items

- ✅ **Heading order** — audited across nine page types and fixed (2026-07-24): content
  headings are h2/h3, no page skips a level, sizes unchanged.
- ✅ **Book covers** now lazy-load (list contexts only; the book-landing hero stays eager).
- ✅ **Redundant CSS pruned** (2026-07-27) — and it was not harmless. The two per-component
  `prefers-reduced-motion` blocks in `components.css` used `animation: none`, which drops
  `animation-name` entirely; the global net in `global.css` only overrides *durations*, so
  those elements fired no `animationend` at all. The global rule deliberately uses near-zero
  durations instead of `none` precisely so those events keep firing. Both blocks are gone and
  the comment in `global.css` now says not to reintroduce them.
- ✅ **Housekeeping done** (2026-07-27) — `Ruqaa/.git-backup-outer` and
  `Ruqaa/Ruqaa-mirror-backup-20260720.git` deleted on the user's go-ahead, freeing 138 MB.
  Checked first that the repo was clean, level with `origin/main` and `git fsck`-clean, so the
  pre-rewrite history they held was genuinely redundant.

---

## 6. Figure design decisions (user feedback, 2026-07-24) — don't undo

The user reviewed the Stolen Focus figures directly. Their calls, now implemented:

- **No recharts entrance animation** — they called it a "float effect" and don't want it.
  `isAnimationActive={false}` on bars *and* tooltips in `StolenFocusCharts.jsx`.
- **"How your attention is sold" must be a circle** — it's a loop, so it now renders as a
  circular SVG ring (`.sf-loop`) with the detail in the centre, not a left-to-right row.
- ~~**"The cost of interruption"** was "really bad" as a stacked bar → now a 60-minute timeline
  where each interruption casts a 23-min refocus shadow.~~ **Superseded 2026-07-28 — the figure
  is gone.** The user questioned the 23-minute number; checking it found the book misattributes
  it to Michael Posner (it is Gloria Mark's), it appears in **no peer-reviewed paper**, and
  Mark's own 2008 study found interrupted work finished *faster* but far more stressfully. A
  whole interactive resting on one unsourced number asserted more than the evidence carries, so
  the user chose to remove it rather than caveat it. See §7.
- **"The flow channel"** structure was liked — enhanced rather than replaced: a mood emoji at
  the marker plus real-life scenario presets that move the dot.
- **Distraction-game notifications** must be genuinely tempting; realistic-but-dull ones
  ("3 new messages") don't distract once you know they're fake. They now use curiosity-gap and
  social-pull copy.
- Related invariant: `flowZone()` splits at **exactly 50** to match the four coloured
  quadrants. The old 45/55 thresholds reported "Flow" while the dot sat in Anxiety/Boredom.

---

## 7. The 23-minute claim — fact-checked and corrected (2026-07-28)

The user doubted «استعادة التركيز — ٢٣ د لكلّ مقاطعة» and asked for it to be verified online.
It did not survive. Three findings, in order of severity:

1. **The attribution is wrong.** The figure is **Gloria Mark's** (UC Irvine), not Michael
   Posner's (Oregon). Posner studies attention *networks*; no study of his yields it. This is
   the book's error, not the club's — Hari credits Posner. Sharpest detail: `sections-1.js`
   already cited Mark correctly for the "three minutes" figure **one paragraph earlier**.
2. **It has no published source.** "23 minutes 15 seconds" appears in no peer-reviewed paper —
   only in Mark's press interviews. Her best-known paper contains no "23" at all.
3. **That paper found something else.** Mark, Gudith & Klocke, *The Cost of Interrupted Work*
   (CHI 2008), reports the interrupted group finishing **faster** (20.3 / 20.6 min vs 22.8) but
   with markedly higher stress, frustration and effort. It never measured recovery time. Other
   studies put recovery nearer 11–16 min.

**What changed.** The user chose: correct the attribution everywhere, flag it in
«الكتاب في الميزان», and **remove the figure**. So:

- `SfSwitchCost` deleted — component, registry entry, its block in `sections-1.js`, and the
  `.sf-switch`/`.sf-tl-*` CSS. Remaining Stolen Focus figures renumbered **3–13 → 2–12** to
  close the gap (safe: no prose in that book cites a figure by number).
- Attribution corrected in `sections-1.js`, `sections-4.js`, the landing quick-check, and the
  `sf3` quiz entry. The advice copy in `assessment.js` and `challenge.js` no longer asserts the
  number at all — the guidance stands without it.
- **`sf3` was the club's own fault, not Hari's**: it invented a methodology, narrating Posner
  "tracking how long a person needs to return to the same level of immersion" for a study that
  was never run. It now teaches Mark's real, better finding — faster but more stressed — which
  makes a sharper quiz question than the myth did.
- `reception.js` gains a sourced `debate` entry attributed to «تحقّقٌ من النادي» — the first
  one that is the club's own checking rather than a critic's — plus links to Mark's paper and
  the trace of the number's origin.

The number still appears in the two narrative sections, deliberately: the site summarises the
book, and the book says it. It now carries a caveat and points at §الميزان.

---

## 8. Flow-state deep dive — added 2026-07-28→30

A new section in the Stolen Focus tab, `data/books/stolen-focus/sections-flow.js` (slug
`flow-state`), sourced from **Csikszentmihalyi's own book *Flow*** rather than from Hari. Nine
acts, four figures in `figures/stolen-focus/FlowFigures.jsx`, seven photos in
`public/images/flow/`. It sits in its own sidebar group and opens by saying it is another book.

Things not to undo:

- **Act 1 duplicates `speed-flow` on purpose** (the user's call) so the tab holds everything on
  flow in one page. Edit Hari's flow material in both places or they drift.
- **Hand-rolled SVG, never recharts** in those figures — the registry is lazy-loaded precisely to
  keep the charting library out of text sections.
- **Fig 15's region overlays are tuned to the specific engraving** in `brain-lateral.webp`,
  checked by compositing them onto the image. Replace the image and they need re-checking.
- **`scripts/prep-flow-images.mjs` reproduces all seven photos byte-identically** from the club's
  originals, which live outside the repo with the book reference material. Widths are per-file,
  not a uniform cap — a blanket cap inflated the set ~30%.
- The author's Arabic name is **«ميهالي تشيكزينتميهالي»**, taken from the published Saudi
  Ministry of Media edition whose cover is on the page. Not a transliteration to "improve".

### Phone-view fixes (2026-07-30) and the check that kept missing them

`.img-grid` used `minmax(320px, 1fr)`, which cannot shrink below its own floor — on a 320px
phone the covers and their captions ran **37px past the text column**. It looked fine because
`overflow-x: hidden` in `global.css` swallowed it, and because
**`documentElement.scrollWidth` is pinned to the viewport by that safety net**, so three
"no overflow" verification passes reported clean. *Measure each element against the
`.section-content` width instead.* Fixed with `minmax(min(320px,100%), 1fr)`; same for
`.ratchet-panels`. Also raised figure controls to a 44px tap target and enlarged the SVG labels
on phones (SVG text scales with the viewBox, not rem, so 11px landed at 9.2px on a 320px screen).

**Still open:** analytics. Nothing is installed. Vercel Web Analytics would give free aggregate
counts, cookie-less and compatible with the no-storage rule, but cannot identify individuals.
Avoid Google Analytics — it would undo the reason the fonts were self-hosted.

---

## Verifying in the in-app preview (this cost real time — read before debugging)

The preview pane lies in specific ways. All three are environment artifacts, **not** bugs:

1. **`document.hasFocus()` is false**, so Chromium never matches `:focus` or
   `:focus-visible`, and React `onFocus` never fires — even though `element.focus()` *does*
   set `document.activeElement`. Anything revealed by `:focus` (the skip link) reads as
   broken. Verify via `activeElement`, or force the declarations with an injected
   `!important` rule. `:focus-within` still matches. Clipboard writes fail for the same reason.
2. **CSS transitions never advance**, so any transitioned property reads back stale — after a
   theme toggle `getComputedStyle(body).backgroundColor` still reports the old theme. Inject
   `transition: none !important`, force a reflow, re-measure.
3. **The viewport sometimes reports `innerWidth === 0`**, which makes every overflow check a
   false positive. Always `resize_window` to explicit dimensions first and confirm
   `window.innerWidth` before trusting a layout measurement.

Also: `computer` screenshots time out here (rAF never fires), so verify through the DOM.

---

## Already done — don't redo

Club verdict + sourced critical reception for both books · cross-book connections ·
"ask me one" session opener · 7-day challenge per book · world map of members ·
⌘K search · presentation mode · shareable result cards · rebuilt About page ·
bundle split (491 → 346 kB gzipped) · skip link + focus management ·
reduced-motion safety net · link-preview metadata · honest section-card metadata ·
fixed Home pointing at the finished book · bad section slugs no longer fail silently ·
**images 43.3 MB → 3.9 MB** (delete unused + resize/recompress + `clean/` and `characters/`
to WebP + build inputs moved out of `public/`) · layout shift fixed for covers *and* content
images · heading hierarchy fixed · flow-zone quadrant bug fixed ·
map made legible on mobile · theme now follows the device colour scheme ·
four Stolen Focus figures redesigned per user feedback (§6).

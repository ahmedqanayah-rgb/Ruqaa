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
- **"The cost of interruption"** was "really bad" as a stacked bar → now a 60-minute timeline
  where each interruption casts a 23-min refocus shadow; shadows overlap and visibly eat the
  hour (`hourModel()`).
- **"The flow channel"** structure was liked — enhanced rather than replaced: a mood emoji at
  the marker plus real-life scenario presets that move the dot.
- **Distraction-game notifications** must be genuinely tempting; realistic-but-dull ones
  ("3 new messages") don't distract once you know they're fake. They now use curiosity-gap and
  social-pull copy.
- Related invariant: `flowZone()` splits at **exactly 50** to match the four coloured
  quadrants. The old 45/55 thresholds reported "Flow" while the dot sat in Anxiety/Boredom.

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

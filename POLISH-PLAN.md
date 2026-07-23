# Polishing plan

A review of the whole site as of **2026-07-23**, ordered by real impact. Written to be
picked up in a later session — each item says what's wrong, how it was measured, and how
to know it worked. Same spirit as `PLAN-stolen-focus.md`.

Everything already **done** this round is at the bottom, so nobody redoes it.

---

## 1. Images — 43 MB, and the single biggest problem on the site  ⚠️ **do this first**

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

**1c. Convert to WebP — the remaining big win, not yet done.** WebP supports alpha, so even
the `clean/` cut-outs convert. Expect a further ~50-70% on top of 1b. The catch is reference
churn: paths flow through helpers (`anat()`, `img()`, `panel()`, `rowImg()`) that take a
filename *with* extension. Cleanest approach is to swap the extension inside the helpers
rather than editing every call site:
```js
const anat = (f) => `./images/anatomical/${f.replace(/\.\w+$/, '')}.webp`
```
Book covers are full literal paths in each book's `index.js` and need editing directly.

**1d. Reserve image space to stop layout shift.** `.club-banner` and `.reach-map` are fine
(fixed height / viewBox). Book covers and person photos have no dimensions, so text jumps as
they load. Add `aspect-ratio` in CSS rather than width/height attributes, since the sources
vary.

---

## 2. Nobody can see the site  ⚠️ **highest value overall**

GitHub Pages is not enabled and the repo has no homepage URL. Every feature built this
round — the world map, the reviews, the challenges, the session opener — is invisible to the
club unless a member clones the repo and runs a dev server.

`vite.config.js` already sets `base: './'`, which is exactly what a Pages project site needs,
and the build is a static `dist/`. Roughly a 20-line Actions workflow.

Two things to settle first:
- It makes the **site** public, not just the source. Resolve member-photo consent before
  members go up.
- Then make the two `og:image` tags in `index.html` absolute (they're relative and marked
  with a comment) — WhatsApp and Facebook scrapers won't fetch relative image URLs.

---

## 3. Waiting on the club (content, not code)

- **The verdict text is a placeholder.** `verdict` in both books' `reception.js` is written
  in the club's voice but it is *not* the club's opinion. Rewrite it, and the star ratings
  (currently 4 and 3.5).
- **Member photos + session gallery.** `club.members` and `club.gallery` are empty arrays;
  both sections stay hidden until filled. Repo is public — get each person's OK. Photos go
  in `public/images/club/`. (Watch the filename: the banner first arrived as
  `clubreading-corner.jpg.jpg`.)
- **Subtitle wording.** The reach subtitle still reads «نلتقي أسبوعياً على مكالمة Google Meet
  واحدة». The hub label moved to «جلسة» wording; the user was offered
  «نلتقي أسبوعياً في جلسةٍ واحدة على Google Meet» and hasn't decided.

---

## 4. The 649 kB entry chunk is now mostly book content

After the vendor/lazy split, what's left in the entry is the books themselves — 183 studies
with full methodology text in two languages. Splitting it means lazy-loading each book's
sections, which touches everything reading `book.sections`, plus `searchIndex.js` and
`studiesPool.js`, which deliberately walk *all* books at module load.

Real work, real risk, and worth far less than item 1. Don't start it before the images.

---

## 5. Smaller items

- **Heading order** hasn't been audited page by page; check no page jumps h1 → h3.
- **Redundant CSS**: the per-component `prefers-reduced-motion` block in `components.css`
  is now superseded by the global safety net in `global.css`. Harmless, could be pruned.
- **Book covers** lack `loading="lazy"` (person photos and content images have it).
- **Housekeeping**: two backups are deletable once confidence settles —
  `Ruqaa/.git-backup-outer` and `Ruqaa/Ruqaa-mirror-backup-20260720.git`.

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

## Already done this round — don't redo

Club verdict + sourced critical reception for both books · cross-book connections ·
"ask me one" session opener · 7-day challenge per book · world map of members ·
⌘K search · presentation mode · shareable result cards · rebuilt About page ·
bundle split (491 → 346 kB gzipped) · skip link + focus management ·
reduced-motion safety net · link-preview metadata · honest section-card metadata ·
fixed Home pointing at the finished book · bad section slugs no longer fail silently.

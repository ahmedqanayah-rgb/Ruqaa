# Plan — make the site self-explanatory for a first-timer (mobile first)

The site is dense and good, and it assumes you already know what it is. This plan is about
the first ninety seconds of a stranger's visit **on a phone**, which is how most members will
arrive (a link in a WhatsApp/Telegram message opens in an in-app browser at ~375px).

Same house style as `POLISH-PLAN.md`: every item says what's wrong, **how it was measured**,
what to do, and **how to know it worked**. Nothing here is a guess — every number below was
read out of the running app at **375×812** unless stated. **Written 2026-08-03.**

Read `POLISH-PLAN.md` §Verifying and the harness at the bottom of this file before debugging
anything in the preview pane; it lies in three specific ways.

---

## 0. The constraint that decides the whole approach

**There is no `localStorage`/`sessionStorage`, ever** (`CLAUDE.md` § Project constraints —
a hard requirement, not a preference). Everything else follows from it:

> **A dismissible one-time onboarding is impossible here.** A welcome modal, a coach-mark
> tour, a "got it" tooltip — none of them can remember they were dismissed. They would come
> back on **every refresh**, for members, forever. The standard answer to "make it
> self-explanatory" is exactly the answer this codebase cannot use.

So the strategy is the opposite one, and it's the better one anyway:

**Make the site explain itself by standing still, not by talking.** Permanent, ordinary
content that is always there — a "how this works" strip, a labelled button, a visible first
step — costs nothing on a second visit and needs no state. Every item below is of that kind.

A second constraint worth stating: **the club is Arabic-first and the site loads `lang=ar`**
regardless of the device language (verified: `documentElement.lang === 'ar'` on a cold load).
That's almost certainly right for the club. See §8 for the one open question about it.

---

## 1. The measured journey, as a stranger actually experiences it

Cold load at 375×812, Arabic, light theme. Positions are `y` from the top of the document.

| Screen | Height | In screens | What the newcomer must get past |
|---|---|---|---|
| Home `#/` | — | — | hero → 2 book cards → "ask me one" |
| Book landing `#/book/stolen-focus` | 5520px | **6.8** | **the first section card is at y≈1687** |
| A section `…/speed-flow` | 6086px | **7.5** | one forward link, at the very bottom |
| Books `#/books` | 4291px | 5.3 | title printed twice |
| About `#/about` | 3265px | 4.0 | the stats that explain the site live here |

The three findings that matter are §2, §3 and §4. The rest are real but smaller.

---

## 2. The book landing buries its own entry point  ⭐ highest impact

**Measured.** On the Stolen Focus landing at 375px, the group heading «ابدأ هنا» sits at
**y = 1624** and its first section card at **y = 1687** — just over **two full screens down**.
What a newcomer scrolls past first:

| y | What |
|---|---|
| 91–350 | pill «كتاب», title, subtitle, author, blurb |
| 503–648 | four stat chips — 📚 23 قسماً · 🔬 61 دراسة · 🧪 7 ألعاب · 👥 36+ شخصية |
| 737–1291 | **the club verdict card** — ★★★½ 3.5/5, the opinion paragraph, «اقرأه إن…», «انتبه إلى…», and a button to «الكتاب في الميزان» |
| 1405–1550 | the shocking-fact rotator + «كلّ الحقائق ←» |
| **1624** | **«ابدأ هنا»** |

Every one of those is good content. The problem is only the order: **a person who has not read
a word of the book is shown the club's verdict on it, and a critical-reception link, before
they are shown where to start.** On desktop there is room for that; on a phone it is a wall.

**Fix.** Reorder the landing so the sequence is: identity (title/author/blurb) → **one primary
action** → the section list → verdict → fact rotator.

- Add a single unmissable **«ابدأ من البداية →» / "Start from the beginning →"** button in the
  landing hero, linking to the first section of the first group. One button, not three.
- Move the verdict card and the fact rotator **below** the section groups.
- Keep the stat chips where they are but shrink them to one line; they're a useful "what am I
  getting" signal and they're cheap.

Do the reorder **in the JSX for every viewport**, not with CSS `order` on mobile only. CSS
`order` changes the visual sequence without changing the DOM sequence, so screen-reader and
keyboard order would silently disagree with what everyone else sees. And the new order is
arguably better on desktop too — you want to know what's *in* the book before you're told what
the club thought of it.

**Done when.** At 375×812 on both books, the first `.section-card` has `getBoundingClientRect().top + scrollY < 900`
— i.e. it's reachable in one thumb-flick rather than three.

---

## 3. Nothing on Home says what this site actually is  ⭐

**Measured.** Home is: hero (logo, pill, h1 «نقرأ الكتاب… ثم نعيشه», a two-line lead, three
buttons) → «كتب النادي» carousel → "ask me one". The lead promises «ملخّصاتٍ تفاعلية ثنائية
اللغة» and stops there.

The words that would actually explain the site — **quiz, games, 7-day challenge, self-
assessment, world map, presentation mode** — appear **nowhere on Home**. The numbers that
would say it (`2 كتب · 41 قسماً · 183 دراسة · 29 شكلاً تفاعلياً`) are on the **About** page at
y = 622, four screens of content that a newcomer has no particular reason to open.

So the site's single biggest differentiator — that it is not a summary but a thing you *do* —
is invisible at the moment of first contact.

**Fix.** A permanent **«كيف يعمل هذا الموقع؟» / "How this works"** strip on Home, directly
under the hero, above the carousel. Four cards, each one line and each linking to a *live
example* rather than to an explanation:

| Card | One line | Links to |
|---|---|---|
| 📖 **اقرأ** | فصولٌ قصيرة، كلٌّ منها ٢–٥ دقائق | the current book's first section |
| 🧪 **جرّب** | أشكالٌ تفاعلية وسبع ألعابٍ تُريك انتباهك وهو يعمل | `stolen-focus/focus-lab` |
| ❓ **اختبر** | ١٨٣ دراسةً كلعبة تخمين، وتقييمٌ شخصي | a `studies` section |
| 🌱 **عِشْ** | تحدّي سبعة أيام: تجربةٌ صغيرة كلّ يوم | a `challenge` section |

This is ordinary content — no state, no dismissal, works in both languages, and it is the
honest answer to "what is this site". It also gives Home a job on a *return* visit: it's a
launcher.

**Done when.** From a cold mobile load of `#/`, all four verbs are on screen within two
screens, and each card navigates somewhere real.

---

## 4. Desktop affordances are printed verbatim on phones  ⭐

Two places tell a phone user to press keys that phone has none of.

**4a. The section footer.** `BookSection.jsx:426` renders, at every viewport:

```
تنقّل بالأسهم ← → أو بالسحب        "Navigate with ← → or by swiping"
```

`.nav-hint` (`components.css:272`) is `--fs-xs` / `--text-muted` and sits at the very bottom
of a **7.5-screen** page. So the one genuinely mobile affordance the site has — **swipe** — is
taught in muted 12px text, at the end of a hint whose first half is meaningless on the device,
in the place hints go to die.

**4b. The search palette.** `.sp-foot` renders `↑↓ تنقّل`, `↵ افتح` and an `esc` key cap on
every viewport. The 720px block at `components.css:1114` hides only `.sp-hit-meta` — the
keyboard footer was never included.

**Fix.** Branch on **capability, not width** — `@media (hover: none) and (pointer: coarse)` —
because a 1200px touch tablet has no arrow keys either and a 700px desktop window does:

- On touch: the section footer says only «اسحب للانتقال بين الأقسام» / "Swipe to move between
  sections", and says it at `--fs-sm` in normal text colour, not muted.
- On touch: `.sp-foot` drops the key caps and keeps only the result count.
- Keep the existing keyboard copy everywhere else, unchanged.

**Also check while you're in there:** the swipe handler versus the horizontally scrolling
regions (the Home `.book-carousel`, `.img-grid`, any wide table in an `overflow-x: auto` box).
A horizontal drag that starts inside one of those must scroll it and **not** navigate to the
next section. Verify by dragging inside the carousel and confirming `location.hash` is unchanged.

**Done when.** At 375px, no visible string in the section footer or the palette names a key,
and a drag inside the carousel doesn't change the route.

---

## 5. Every control in the chrome is below the 44px touch minimum

**Measured** at 375×812 on a section page — 30 controls under 44px in either dimension. The
chrome ones:

| Control | Size | Note |
|---|---|---|
| `.icon-btn.only-mobile` ☰ | **30×40** | the most important control on mobile |
| `.search-btn` 🔍 | 41×39 | |
| `.pill-btn` 🌐 | 104×39 | |
| `.icon-btn` 🌜 | 38×40 | |
| `.drawer-close` ✕ | 36×36 | |
| `.side-group-head` | 250×35 | 5 of them in the drawer |
| `.side-link.sub` | 227×43 | 20+ of them |

Note this is **not** a repeat of a fixed bug: POLISH-PLAN §8 raised the *figure* controls to
44px on 2026-07-30 and deliberately scoped itself to the flow section. The chrome was never in
that pass.

**Fix.** `min-block-size: 44px` (and `min-inline-size` for the icon-only ones) on `.icon-btn`,
`.search-btn`, `.pill-btn`, `.drawer-close`, `.side-group-head`, `.side-link`. Prefer padding
over fixed heights so nothing clips at 200% text zoom. The navbar is `flex`, so growing the
buttons will grow the bar — check the hero doesn't get pushed further down (§2 is about
exactly that budget).

**Done when.** The audit snippet in §9 reports **0** controls under 44px at 375px, excluding
inline links inside prose.

---

## 6. Moving between sections costs a 30px tap or a 7.5-screen scroll

**Measured.** On `speed-flow` (6086px) the only in-page forward path is the next-up card at
y≈5400. Random access is the drawer, whose only trigger is the 30×40 ☰. There is no persistent
way to answer "where am I / what's next / take me back to the list" while reading.

Credit where due: `.section-index` already shows **«4 / 23»** at the top of every section, so
*where am I* is answered — as long as you scroll back up to see it.

**Fix — pick one, (a) preferred.**

- **(a) A sticky bottom bar on section pages only**: `‹ السابق` · `الأقسام` · `التالي ›`. Three
  44px targets, always reachable, and it makes the swipe gesture discoverable by showing its
  two endpoints. Watch two things: the app **scrolls on `<body>`, not the window**
  (`CLAUDE.md`), so verify the bar doesn't create a second scroll context; and it must not
  cover the last line of the article — add matching bottom padding to `.section-content`.
- **(b) A floating «الأقسام» button.** Cheaper, solves only random access.
- **(c) Label the hamburger.** Do this regardless of (a) or (b): replace the bare ☰ with
  ☰ + «الأقسام» / "Sections". A labelled control is self-explanatory; a glyph is a guess. It
  also fixes the 30px width for free.

**Done when.** From any scroll position inside a section at 375px, previous / next / contents
are all tappable without scrolling.

---

## 7. Smaller, cheap, real

- **`/books` prints its title twice** — «الكتب» at y=91 (breadcrumb) and y=127 (h1). Drop one.
- **The landing stat chips look tappable and aren't.** `.book-stats` is a `DIV`; «🔬 61 دراسة»
  and «🧪 7 ألعاب» are exactly the things a curious newcomer will poke. Either link them to the
  `studies` / `focus-lab` / characters sections — which would make them a second, free entry
  point — or restyle them so they don't read as buttons. Linking is the better answer.
- **Breakpoints disagree with each other.** `.only-mobile` (the hamburger) flips at **860px**;
  `.not-mobile` (the projector button) at **720px**; other rules sit at 460/620/640/700/720/860.
  So between **720 and 860px** the mobile drawer is active *and* the projector button is
  showing. Settle on three named breakpoints and use them. No visual change intended — this is
  the maintenance item that stops §4's capability queries from being layered onto a mess.

---

## 8. Two decisions that are yours, not mine

1. **Should the site follow the device language on first load?** It currently always opens in
   Arabic. Following `navigator.language` would make it self-explanatory for an English
   speaker, and would make it *less* predictable for the club — and the club is the audience.
   My recommendation: **leave it Arabic-first.** The 🌐 button already reads «English» in the
   Arabic view, which is the clearest possible signal and needs no detection. Raised only
   because it's the one first-timer question I can't answer for you.
2. **§6 (a) sticky bar or (b) floating button?** (a) is more useful and more work.

---

## 9. Verification harness

The preview pane lies (POLISH-PLAN §Verifying): screenshots time out, `:focus` never matches,
transitions never advance, and `innerWidth` sometimes reads 0. Always `resize_window` first and
confirm `window.innerWidth` before trusting a measurement.

**Tap-target audit** — run at 375px on Home, a book landing, and a section:

```js
[...document.querySelectorAll('a,button,input,select,[role="button"]')]
  .map(el => ({ el, r: el.getBoundingClientRect() }))
  .filter(({ r }) => r.width > 0 && (r.height < 44 || r.width < 44))
  .map(({ el, r }) => `${Math.round(r.width)}x${Math.round(r.height)} ${el.className}`)
```

**Entry-point depth** — the §2 acceptance test:

```js
document.querySelector('.section-card').getBoundingClientRect().top + window.scrollY
```

**Horizontal overflow** — never use `documentElement.scrollWidth` here. `overflow-x: hidden` in
`global.css` pins it to the viewport, so clipped content reports clean; it cost three passes
once already. Measure each element against the `.section-content` width instead:

```js
const cw = document.querySelector('.section-content').getBoundingClientRect().width
;[...document.querySelectorAll('.section-content *')]
  .filter(el => el.getBoundingClientRect().width > cw + 1)
```

(Run today on `#/book/stolen-focus/studies` at 375px: **0 overflowing elements** — the §8
`minmax(min(320px,100%), 1fr)` fixes are holding.)

---

## 10. Do not do these

- **No welcome modal, no coach-mark tour, no "got it" tooltip.** See §0 — with no storage they
  reappear on every single refresh. This is the item most likely to be suggested and it is the
  one that cannot work here.
- **Don't delete the verdict card or the fact rotator** to make room in §2. They're good; they
  are in the wrong position, not in the wrong site.
- **Don't add a bottom tab bar** duplicating the drawer's top-level links. §6 is about moving
  *within* a book, which the drawer already does badly; a second global nav would be a third.
- **Don't undo the device-matching theme default** (POLISH-PLAN / memory) or the paper-backed
  cut-outs. Both look like "simplifications" from a mobile-polish seat and both are load-bearing.
- **Don't gate §4 on viewport width.** Capability queries, or the tablet case stays broken.

---

## Status — implemented 2026-08-03

§2, §3, §4, §5 and §7 are **done and measured**. §6 is **partly done** and its main
decision is still open.

| Item | State | Evidence at 375×812 |
|---|---|---|
| §2 landing reorder + CTA | ✅ | first card **1687 → 897** (stolen-focus), 736 (why-we-sleep); CTA at 702; verdict moved to 4712 |
| §3 "how this works" strip | ↩️ **reverted** | shipped, then removed the same day — see below |
| §4 capability-gated hints | ✅ | touch copy shown, keyboard copy hidden, and the reverse on a mouse |
| §5 tap targets | ✅ | 30 controls under 44px → **0** across 12 routes, two documented exceptions |
| §6 labelled menu button (c) | ⚠️ partial | label fits from 521px up; **at 375px it does not** — see below |
| §6(a) sticky in-book bar | ✅ | `‹ السابق · ☰ أقسام الكتاب · التالي ›`, 375×49 pinned at the viewport foot, ≤860px only |
| §7 duplicate title, stat links, breakpoints | ✅ / ⛔ | first two done; the breakpoint tidy-up not attempted |

**Three things worth knowing, all found by measuring rather than reasoning:**

1. **The navbar cannot hold a labelled menu button at 375px.** With the label in, the bar
   needs **406px of a 338px content box**. It fits exactly four 44px controls and no text,
   and every candidate for eviction (home, search, language, theme) is one a first-timer
   benefits from. The label therefore shows only ≥521px — which is exactly why §6(a) was
   built: the sticky bar owns a whole 375px row and is the only place a phone can be given
   a *labelled* route to the section list. Its «الأقسام» goes to the book landing rather
   than opening the drawer — the landing is the real contents page, it now leads with the
   section list (§2), and routing to it keeps the bar free of Layout's drawer state.
2. **A fixed bottom bar cannot live inside the article.** `position: fixed` is not
   viewport-relative inside a transformed ancestor, and a section page has two — the
   `route-fade` article and Layout's `page fade-in` wrapper both animate a `translateY`.
   Rendered in place the bar came out 338px wide at **y=6023**, parked at the foot of the
   *document* rather than the screen. It is portalled to `<body>`, which also puts it last
   in tab order, where a fixed bottom bar belongs. Its z-index is **35** — deliberately
   under the drawer overlay's 45, so opening the menu dims it like everything else.
3. **The 44px block must be the last thing in `components.css`.** Every selector in it
   duplicates one declared earlier at equal specificity, so source order alone decides.
   Placed near the navbar rules it was silently beaten by `.drawer-close { width: 36px }`
   forty lines later. The same trap then bit `.menu-btn`: declaring `display: inline-flex`
   *after* `.only-mobile { display: none }` leaked the hamburger onto the 1280px desktop,
   beside the sidebar it duplicates. Both caught by measuring, neither by reading.
4. **`(pointer: coarse)` never matches in the preview pane** — it reports `pointer: fine`
   even at 375px, so the entire touch block is inert there and appears to do nothing. Force
   it on before measuring; the snippet is in §9 and in a comment at the top of the block.

Two exceptions are deliberate and documented in the CSS: the **122 quiz dots** (one per
study — 44px each would be a 5,400px wall, so they get ~30px via an invisible `::after` and
the ordinary next/prev buttons remain), and the **world-map pins**, whose positions are tuned
to the projection and verified with `path.isPointInFill`, so resizing them is a geometry
change; the country legend beside the map is the touch interface.

Also fixed in passing: `.books-grid` had the same non-shrinkable `minmax(300px, 1fr)` floor
that shipped in `.img-grid` — it would have run past the column on a 320px phone.

### §3 was reverted the same day — read this before proposing it again

The "how this works" strip was built, shipped, and removed hours later. **The user's verdict:
«no need for the (How this works) on the home page, i said i want it simpler not more
complex».** "Ask me one" went at the same time, for the same reason.

That is worth taking as a general correction, not a one-off veto. §3 diagnosed the problem
correctly — Home really does not say what the site is — but answered it by *adding a block*,
and the brief was to remove friction, not to explain more. **Home is now two blocks, the hero
and the book carousel, and is 1.4 screens on a phone instead of 3.4.** If the "what is this
site" question is worth solving again, solve it inside what already exists — the hero's own
lead sentence, or the book cards — not with a new section. Don't re-add a strip.

### Scroll position is now restored (2026-08-03)

Reported by the user: coming back from a section dumped you at the top of the list, so
choosing the next one meant scrolling back down to where you already were.

The root cause was better than it looked. `Layout` called `window.scrollTo({ top: 0 })` —
which drives `document.scrollingElement`, i.e. `<html>` — but **this app scrolls on `<body>`**
(measured: body 5792/812, html 812/812 and its `scrollTop` will not move). So that call had
never done anything. The only thing resetting the scroll was `mainRef.focus()` incidentally
scrolling a `tabIndex={-1}` element into view. Both are fixed: the scroll is now placed
explicitly on the real scroller, and the focus call takes `preventScroll: true`.

Positions are kept per path in a `useRef` Map — in memory, no storage, like `visited`.
Restored on Back/Forward **and** on going *up* from a section to its own book landing, since
tapping «الأقسام» or the breadcrumb means the same thing to a reader as pressing Back. A
fresh arrival (Home → a book) still starts at the top.

**The verification trap here is a new one, and it is severe: the in-app preview dispatches no
`scroll` events at all, on any target** — not on `window`, `document`, `document.body`, nor in
the capture phase, even while `document.body.scrollTop` is visibly changing. Same stalled-frame
cause as rAF never firing. A scroll-listener implementation therefore looks completely broken
there and is fine in a real browser (`ReadingProgress` has depended on exactly this for
months). The position is consequently *also* captured by a capture-phase `click` listener on
`document`, which fires normally and snapshots the outgoing page just as a navigation starts —
that half is verifiable, and is what actually carries the feature.

Verified: Home → landing 0 · landing(1200) → section 0 · Back → 1200 · section → next 0 ·
breadcrumb → 1200.

---

## Suggested order

§2 and §3 are the two that change whether a stranger understands the site at all; §4 and §5 are
small, safe and improve every page. §2 → §3 → §5 → §4 → §6 → §7. §6(a) last, because it's the
only one that can introduce a scrolling bug.

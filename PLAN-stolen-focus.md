# Plan: Add "Stolen Focus" (Johann Hari) as the second book

> **Read `CLAUDE.md` first.** Everything there applies: data-driven sections, bilingual
> `{ar,en}` via `L()`, no localStorage EVER, verbose study `method` fields, RTL-safe mobile.
> This plan was reviewed against the actual EPUB table of contents. Execute in the phases
> listed at the bottom; the planning model (Fable) acts as reviewer between phases.

## 0. Book facts (verified against the EPUB)

Johann Hari, *Stolen Focus: Why You Can't Pay Attention* (2022).
Structure: Introduction "Walking in Memphis" (Graceland iPad story), 14 chapters covering
**12 named causes** of the attention crisis, Conclusion "Attention Rebellion", plus an
appendix "Groups Already Fighting to Improve Attention".

The 12 causes:
1. Increase in speed, switching and filtering (ch 1)
2. Crippling of our flow states (ch 2)
3. Rise of physical and mental exhaustion (ch 3)
4. Collapse of sustained reading (ch 4)
5. Disruption of mind-wandering (ch 5)
6. Technology that can track and manipulate you (ch 6–7)
7. Rise of cruel optimism (ch 8; ch 9 = "first glimpses of the deeper solution")
8. Surge in stress and vigilance (ch 10; ch 11 = places that reversed it)
9. Deteriorating diets (ch 12)
10. Rising pollution (ch 12)
11. Rise of ADHD and how we respond to it (ch 13)
12. Confinement of our children (ch 14)

Arabic title for the site: **«التركيز المسروق»** (a published Arabic translation exists
under this title). Author: جوهان هاري.

## 1. Module layout (mirror of why-we-sleep)

```
src/data/books/stolen-focus/
  index.js          — assembles the ordered sections array
  author.js         — author section (same shape as WWS author.js)
  sections-1.js     — summary, causes-map, speed-flow, exhaustion
  sections-2.js     — reading-mindwandering, big-tech, cruel-optimism
  sections-3.js     — stress-vigilance, diet-pollution, adhd, childhood, rebellion
  sections-4.js     — characters, shocking, myths, discussion
  studies.js        — aggregator + interestOrder
  studies/part1..3.js
  assessment.js     — focus-habits questionnaire (QUESTIONS/TIPS/GOOD_TIP shape)
  focuslab.js       — config/strings for the Focus Lab tests
```

Register in `src/data/books.js`: `books = [whyWeSleep, stolenFocus]`.

## 2. Sections (ordered, with slugs and kinds)

Same tab set as Why We Sleep (author / content sections / characters / shocking / myths /
assessment / studies quiz / discussion) plus one NEW kind: `focus-lab`.

| # | slug | kind | Title (ar / en) | Content & figures |
|---|------|------|-----------------|-------------------|
| 1 | `author` | normal | عن الكاتب / About the Author | Johann Hari bio — everything relevant, per the club's decision: his journalism career, the 2011 plagiarism/quote-attribution controversy and Wikipedia sockpuppet affair with his public apology and return, his bestsellers (Chasing the Scream, Lost Connections), the recurring criticism of his simplification of research, AND his 3-month Provincetown digital detox as this book's framing story. Balanced tone: facts, not gossip. |
| 2 | `summary` | normal | خلاصة الكتاب / The Book in Brief | Thesis: attention collapse is **systemic, not a personal failing**; Graceland iPad anecdote; the 12 causes at a glance; individual vs collective response ("attention rebellion"). |
| 3 | `causes-map` | normal | خريطة الأسباب / Map of the 12 Causes | Interactive figure `sfCausesMap`: 12 clickable nodes grouped (mind / tech / body / society), each linking to its section. Keep short — one figure + lead. |
| 4 | `speed-flow` | normal | السرعة والتشتّت والتدفّق / Speed, Switching & Flow | Causes 1–2. Figures: `sfSwitchCost` (slider: interruptions/hour → fragmented vs deep time, built on Gloria Mark's ~23-min refocus finding), `sfCollectiveAttention` (line chart: trending-topic lifespan shrinking, Lehmann study), `sfFlowChannel` (interactive challenge-vs-skill plane → anxiety/flow/boredom zones). |
| 5 | `exhaustion` | normal | الإنهاك والنوم / Exhaustion & Sleep | Cause 3. **Cross-link to the Why We Sleep book on this site** (first inter-book links — plain `<Link>`s to `/book/why-we-sleep/...`). Czeisler appears in both books. No new figure needed; reuse callouts. |
| 6 | `reading-mindwandering` | normal | القراءة العميقة وشرود الذهن / Deep Reading & Mind-Wandering | Causes 4–5. Figure `sfDistractedReading` (GAME: read a short passage while fake notifications pop, then 3 comprehension questions; repeat distraction-free; compare scores). Chart `sfReadingDecline` (share of people reading books for pleasure over time). Mind-wandering as creative mode (Smallwood; Killingsworth & Gilbert nuance). |
| 7 | `big-tech` | normal | تقنيةٌ تتعقّبك وتتلاعب بك / Tech That Tracks & Manipulates You | Cause 6 (ch 6–7). Figures: `sfInfiniteScroll` (demo feed that never ends + elapsed-time counter vs a paginated variant; Aza Raskin's invention), `sfOutrageAlgorithm` (simulation: calm post vs outrage post spreading over rounds with engagement-ranking on/off), `sfSurveillanceFlow` (static SVG diagram: your behavior → data → prediction → ad auction). Skinner box heritage (B.F. Skinner → variable rewards). |
| 8 | `cruel-optimism` | normal | التفاؤل القاسي / Cruel Optimism | Cause 7 + ch 9. Why "just meditate / just detox" fails as a systemic answer; Provincetown lessons (what worked, what didn't); pre-commitment (kSafe), James Williams's argument. Callout-heavy, no figure. |
| 9 | `stress-vigilance` | normal | التوتّر واليقظة الدائمة / Stress & Vigilance | Cause 8 (ch 10–11). Nadine Burke Harris (childhood adversity → hypervigilance); financial insecurity; figure `sfFourDayWeek` (bar chart: Perpetual Guardian NZ, Microsoft Japan four-day-week productivity results; France's right to disconnect). |
| 10 | `diet-pollution` | normal | الغذاء والتلوّث / Diet & Pollution | Causes 9–10 (ch 12). Figure `sfBloodSugar` (line chart: refined-carb spike-and-crash vs steady release, tied to focus crashes); Michael Moss (engineered food); Barbara Demeneix (endocrine disruptors), lead & attention. |
| 11 | `adhd` | normal | فرط الحركة وتشتّت الانتباه / The ADHD Question | Cause 11 (ch 13). Figure `sfAdhdRise` (chart: US ADHD diagnosis growth). Balanced treatment: Joel Nigg (environment × biology) vs Sami Timimi (critique of pure-biology framing); stimulant prescription debate. ⚠️ Keep the site's "not medical advice" footer tone; no judgment of medication users. |
| 12 | `childhood` | normal | طفولة محاصرة / Confined Childhood | Cause 12 (ch 14). Figure `sfRoamingRadius` (interactive concentric map: four generations of one Sheffield family, ~6 miles → ~300 yards); Lenore Skenazy (free-range kids experiment), Isabel Behncke (play deprivation). |
| 13 | `rebellion` | normal | تمرّد الانتباه / Attention Rebellion | Conclusion. The "solutions ladder": personal (pre-commitment, flow scheduling, sleep, play) → collective (ban surveillance business model, right to disconnect, four-day week, childhood freedom). Include the book's appendix orgs as a resource list. |
| 14 | `characters` | normal | شخصيات الكتاب / Characters | `people` blocks — see photo list (§5). Same port() helper pattern. |
| 15 | `shocking` | normal | حقائق صادمة / Shocking Facts | Callout grid: e.g. office workers avg ~3 min on one task; refocus ≈ 23 min; teens switch media every 65 s; Facebook internal research on divisiveness; college students' declining ability to read whole books; "you touch your phone 2,617×/day" (Dscout). Verify each number against the book text before writing. |
| 16 | `myths` | normal | مغالطات شائعة / Myths | `myth` blocks: "Humans now have goldfish attention spans" (debunked — the stat is an urban legend); "Multitasking works" (it's rapid switching + cost); "It's your fault / willpower fixes it" (cruel optimism); "Tech is neutral, just use it wisely"; "ADHD is 100% genetic"; "Kids are safer indoors with screens". |
| 17 | `focus-assessment` | **assessment** | تقييم عادات التركيز / Focus Habits Assessment | REUSES `AssessmentForm` unchanged. ~12 questions, one per cause (sleep hours, notification settings, phone-in-bedroom, deep-reading habit, work interruptions, meals/snacking, outdoor time for kids or self, stress level, task switching…). TIPS keyed per cause; score bands like WWS. |
| 18 | `focus-lab` | **focus-lab (NEW)** | مختبر التركيز / The Focus Lab | New component — see §3. The "focus test" the club asked for. |
| 19 | `studies` | **quiz** | الدراسات والتجارب / Studies & Experiments | REUSES `StudiesQuiz`. Target **60–80 curated studies** from the book's notes (it cites 250+; curate the strongest). Keep the verbose 2–3-sentence `method` style. Provide `interestOrder` (~40 ids). |
| 20 | `discussion` | normal | نقاش النادي / Club Discussion | Discussion questions; compare with Why We Sleep (both books argue for structural, not just personal, change). |

If 20 sections feels heavy in the sidebar, merging `causes-map` into `summary` is the
approved fallback.

## 3. NEW component: FocusLab (`src/components/FocusLab.jsx`)

Dispatched from `BookSection.jsx` via `section.kind === 'focus-lab'` (add one case next to
`'quiz'`/`'assessment'`). All state in memory. Four mini-tests, each a card with
instructions → run → results; plus a combined summary at the end. Use `performance.now()`
for reaction times. Must work with touch AND keyboard; respect `prefers-reduced-motion`;
RTL-safe (test stimuli area is `dir`-neutral, centered).

1. **Stroop test** (selective attention / interference) — ties to Cause 1.
   ~24 trials: color word rendered in an ink color; user taps one of 4 color buttons for
   the INK. Half congruent, half incongruent. Report accuracy + median RT each, and the
   interference cost in ms. Bilingual color words (أحمر/أزرق/أخضر/أصفر ↔ red/blue/green/yellow).
2. **Task-switching** (switch cost) — ties to Cause 1 / Earl Miller.
   Stimulus: colored shape. Rule cue alternates unpredictably: judge SHAPE (circle/square)
   or judge COLOR (blue/orange). Two keys / two buttons. ~40 mixed trials after 12 blocked
   warm-ups. Report switch-cost ms (mixed-switch minus repeat trials).
3. **SART** (sustained attention) — ties to Cause 5.
   Digits 1–9 shown ~1/sec for 90 trials; respond to every digit EXCEPT 3. Report
   commission errors (pressed on 3), omissions, RT variability. Classic mind-wandering probe.
4. **Distracted reading** (the book's thesis as a game) — shared with the
   `sfDistractedReading` figure in section 6 (build once, register in figures registry AND
   embed in Focus Lab).

Results framing: playful bands («صقر مركّز», «سنجاب التبويبات»…), explicit "this is a
demo, not a diagnostic tool" disclaimer, links to relevant sections per weak result.

## 4. New figures (register in `figures/registry.jsx`, ids prefixed `sf`)

`sfCausesMap`, `sfSwitchCost`, `sfCollectiveAttention`, `sfFlowChannel`,
`sfDistractedReading`, `sfReadingDecline`, `sfInfiniteScroll`, `sfOutrageAlgorithm`,
`sfSurveillanceFlow` (static), `sfFourDayWeek`, `sfBloodSugar`, `sfAdhdRise`,
`sfRoamingRadius`.

Reuse `FigureFrame` for chrome and `HoverLineChart`/recharts for plain charts. Number them
Figure 1..n within this book. Keep data points sourced from the book's own numbers; where
the book gives a range, chart the range, don't invent precision.

## 5. Photos needed (put in `app/public/images/characters/` unless noted)

**Staging folder (ALL PHOTOS ALREADY DELIVERED, verified 2026-07-14):**
`C:\Users\aq\Desktop\Ruqaa\Stolen focus\Photos\` holds every photo below plus both covers;
the EPUB is at `C:\Users\aq\Desktop\Ruqaa\Stolen focus\Stolen Focus - Johann Hari.epub`.
Never move/delete the originals.

**Import step (do in Phase 1):** don't copy raw. Write a one-off `scripts/import-stolen-focus-photos.mjs`
(sharp is already a dep) that reads each staged photo, converts webp/avif/png → jpg,
resizes to max 800px on the long edge (quality ~80), and writes to the kebab-case target
filename. Several sources need this: `johann-hari.webp`, `B.F. Skinner.avif`,
`Gloria-Mark.webp`, `Jaron Lanier.webp`, `Michael Moss.webp`, `Roy Baumeister.webp`,
`Jason Hickel.webp`, `Peter Gray.avif`, `Sandra Kooij.png`,
`Dan Gilbert & Matthew Killingsworth.webp`, and the 1.9 MB `Graceland's Jungle Room.jpg`.
Skip `Charles Czeisler.webp` — the app already has `charles-czeisler.jpg`; reuse it.

Covers → `app/public/images/`:
- `stolen-focus-cover-en.jpg` — English cover
- `stolen-focus-cover-ar.jpg` — Arabic edition «التركيز المسروق»

Characters (exact target filenames):
- `johann-hari.jpg` (author — required)
- `mihaly-csikszentmihalyi.jpg` (flow)
- `earl-miller.jpg` (MIT, task-switching)
- `gloria-mark.jpg` (interruption research)
- `sune-lehmann.jpg` (collective attention)
- `tristan-harris.jpg` (ex-Google design ethicist)
- `aza-raskin.jpg` (invented infinite scroll)
- `jaron-lanier.jpg` (tech critic)
- `shoshana-zuboff.jpg` (surveillance capitalism)
- `james-williams.jpg` (ex-Google, attention philosopher)
- `nir-eyal.jpg` (the counterpoint voice)
- `roy-baumeister.jpg` (willpower/ego depletion)
- `nadine-burke-harris.jpg` (childhood stress)
- `michael-moss.jpg` (food industry)
- `barbara-demeneix.jpg` (pollution & brain development)
- `joel-nigg.jpg` (ADHD researcher)
- `sami-timimi.jpg` (ADHD critic)
- `lenore-skenazy.jpg` (free-range childhood)
- `isabel-behncke.jpg` (play scientist)
- `bf-skinner.jpg` (historical: operant conditioning)
- `elvis-presley.jpg` (Graceland intro anecdote — club approved the fun entry)
- `andrew-przybylski.jpg`, `amy-orben.jpg` (screens-evidence skeptics), `alan-schwarz.jpg` (ADHD Nation)
- ALREADY HAVE: `charles-czeisler.jpg` (shared with Why We Sleep — reuse, do not duplicate)

Bonus people the club delivered photos for — all appear in the book; include them in the
`characters` section and/or as `people` blocks inside their thematic sections:
- `adam-gazzaley.jpg` (neuroscientist, The Distracted Mind — switching, ch 1)
- `anne-mangen.jpg` (screen vs paper reading — ch 4)
- `gilbert-killingsworth.jpg` (ONE combined photo → ONE shared entry for Dan Gilbert &
  Matthew Killingsworth's joint mind-wandering/happiness study — ch 5)
- `raymond-mar.jpg` (fiction reading & empathy — ch 4)
- `nicholas-carr.jpg` (The Shallows — ch 4)
- `molly-crockett.jpg` (moral outrage online — ch 6–7)
- `ed-deci.jpg` (intrinsic motivation — ch 8/9)
- `tore-nielsen.jpg` (dream researcher — ch 3)
- `sendhil-mullainathan.jpg` (scarcity & cognitive bandwidth — ch 10)
- `jason-hickel.jpg` (growth critique — conclusion)
- `sandra-kooij.jpg` (adult ADHD — ch 13)
- `inga-marte-thorkildsen.jpg` (Oslo politician, childhood — ch 14)
- `peter-gray.jpg` (free play research — ch 14)

Scenic (→ `app/public/images/`, used as `image` blocks, not characters):
- `provincetown.jpg` (digital-detox setting — cruel-optimism/summary section)
- `graceland-jungle-room.jpg` (intro anecdote — summary section)

## 6. Engineering changes outside the data module (small but required)

1. **`Sidebar.jsx` currently hardcodes `books[0]`.** Derive the active book from the URL
   (`/book/:bookId/...` via `useLocation`), show ALL books under a "الكتب" heading, and
   expand only the active one's sections. This is the only structural blocker to a second book.
2. `BookSection.jsx`: add `'focus-lab'` dispatch case.
3. `Home.jsx`: replace the single featured card with a **horizontally sliding book list**
   (scroll-snap carousel of `book-card`s, RTL-aware) showing up to three books, with a
   "see all →" card/link to `/books` appearing after the third. With only two books it
   simply shows both; the carousel must degrade gracefully (no arrows needed at n≤3,
   just swipe/scroll-snap + the existing grid on the Books page).
4. Figures registry grows; ensure no id collisions (prefix `sf`).
5. No changes needed to `AssessmentForm`, `StudiesQuiz`, `ContentBlocks`, `RichText`,
   theme, or i18n — they are already book-agnostic.

## 7. Execution phases (Opus) with review checkpoints (Fable)

- **Phase 1 — Skeleton:** Sidebar multi-book support + empty stolen-focus module with
  author + summary sections registered and routable. ✋ Review checkpoint.
- **Phase 2 — Content sections:** sections 3–16 & 20 (text, callouts, myths, characters,
  shocking) with placeholder figures. ✋ Review checkpoint (content accuracy vs book).
- **Phase 3 — Figures:** the 13 `sf*` figures. ✋ Review checkpoint (RTL, mobile, dark mode).
- **Phase 4 — Focus Lab** component + assessment data. ✋ Review checkpoint (timing
  accuracy, touch/keyboard, bilingual).
- **Phase 5 — Studies quiz** data (60–80 studies + interestOrder). ✋ Final review:
  `npm run build`, mobile RTL sweep, both themes, cross-book links.

Each phase: verify in the dev preview before moving on (per CLAUDE.md there are no tests).

## 8. Club decisions (RESOLVED 2026-07-13 — already folded into the sections above)

1. Author page: mention everything relevant, including the 2011 controversy — balanced, factual.
2. Home: sliding book list, "see all" after the third book (see §6.3).
3. Elvis/Graceland photo: approved.
4. Studies: 60–80 curated — prioritize the most important, strange, and shocking findings
   when choosing which of the book's 250+ cited studies make the cut and when building
   `interestOrder`.

**Photos are NOT a blocker.** `PeopleGrid` falls back to an initial-letter avatar for any
missing photo and book covers fade out on error, so build everything regardless; photos can
be dropped into `public/images/` at any time with the exact filenames from §5, no code
changes. Nice-to-have before the final review: the two covers + `johann-hari.jpg`, since
they're the most visible.

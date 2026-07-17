# PROMPT FOR CLAUDE CODE — "Reading Club" Website (Why We Sleep)

## 0. Goal & context

Build a **bilingual (Arabic RTL / English LTR), responsive React website** for a book‑reading club. The first (and currently only) book is Matthew Walker's **"Why We Sleep" / «لماذا ننام»**. The site must be **extensible**: future book reviews will be added later as additional entries (tabs/list items), so architect the book content as data‑driven "book" modules, not hardcoded pages.

The site serves three purposes: a personal reference, a screen to present during in‑person review sessions, and a public reference for the reading club.

All source content is in the Arabic `.md` files described in section 6. **You (Claude Code) must translate every section into English at build time from these Arabic files** — produce a complete English version alongside the Arabic. Keep translations consistent with each section as you build it.

---

## 1. Tech stack & general requirements

- **React** (Vite recommended). Component‑based, clean, maintainable.
- **Responsive**: must work well on phones, tablets, and desktops (mobile‑first; test narrow viewports).
- **Charting/interactivity**: use a library suited to custom interactive charts — **D3.js** (preferred for the custom two‑process & hypnogram interactions) and/or **Recharts/Chart.js** for the simpler hover charts. Choose per‑chart as appropriate.
- Clean folder structure; content separated from presentation (content as data/JSON/MD, not inline in components).
- No backend required; everything client‑side. The sleep‑assessment form and interactive graphs run entirely in the browser (React state only — **do NOT use localStorage/sessionStorage**, they are not supported in this context; keep all state in memory).

---

## 2. Global features (apply site‑wide)

1. **Collapsible side navigation** (sidebar). On mobile it collapses to a hamburger/drawer. Because the default language is Arabic (RTL), the sidebar sits on the **right** in Arabic and flips to the **left** in English.
2. **Language switch button (AR ⇄ EN)**. Switching must translate **everything**, including all text inside graphs (axis labels, legends, annotations, tooltips) and all image captions/alt text. Layout direction flips (RTL ⇄ LTR) accordingly.
3. **Dark / Light mode toggle button.**
4. **Bidirectional text safety**: when Arabic and English appear on the same line, they must render correctly without direction confusion (use proper `dir`/Unicode isolation, e.g. wrap inline English in `<bdi>` or `&#8235;`/isolation spans). In the **Arabic version**, important technical terms must appear as: **Arabic term followed by the English term in parentheses** — e.g. «النواة فوق التصالبية (Suprachiasmatic Nucleus)». Preserve all German/English technical terms, DIN numbers, and §‑references verbatim.
5. **Theme note**: start with a **modern minimal** aesthetic (clean typography, generous whitespace, restrained palette). Keep theming centralized (design tokens / CSS variables) so the whole look can be swapped later easily. (A sleep/night palette — warm = wakefulness/day, cool = sleep/night, blue = NREM, violet = REM — is available in the figures for reference if we later switch themes.)

---

## 3. Site structure

### Top level (extensible)
- **Home**: intro to the reading club + list of books. Currently one book card: "Why We Sleep / لماذا ننام" (with Matthew Walker's photo). Clicking it opens the book module. Architect so new books can be added as new cards/entries later.
- **Sleep Assessment** (standalone section — the interactive form; see §4).
- **About the Reading Club** (standalone section): include the club description and **explicitly mention the session dates — first session 26.12.2025 and last session 05.07.2026.**

### Inside the "Why We Sleep" book module — sidebar sections, IN THIS ORDER:
1. General Summary — from `review_session_materials.md` (the summary part)
2. Complete Sleep Mechanism — `sleep_mechanism_complete.md`
3. REM Sleep — `REM_sleep_complete.md`
4. NREM Sleep — `NREM_sleep_complete.md`
5. Sleep & Memory — `sleep_and_memory.md`
6. Sleep, Health, Immunity & Cancer — `sleep_and_health.md`
7. Sleep Across the Lifespan — `sleep_across_lifespan.md`
8. Dreams — `dreams_complete.md`
9. Animal Sleep — `animal_sleep.md`
10. Characters & Their Stories — `characters_why_we_sleep.md`
11. Shocking Facts — `shocking_facts_why_we_sleep.md`
12. Common Myths — `sleep_myths.md`
13. **Studies & Experiments (INTERACTIVE quiz format)** — `studies_why_we_sleep.md` (see §5). **Place this near the end, right before the Discussion section.**
14. **Session Materials & Discussion** — the discussion questions + review points from `review_session_materials.md`. **This is the LAST section** (after all data has been reviewed, then the discussion begins).

**Important:** The book figures do **NOT** get their own section. Each interactive figure must be **embedded inline in the section where its topic belongs** (see §7 for placement).

---

## 4. Sleep Assessment form (standalone section)

An interactive questionnaire that rates the user's sleep and gives **personalized tips based on their answers**, derived from the book's guidance. Runs fully in‑browser; show a computed **sleep score** + tailored tips after submission. A reset button to retake.

Questions (NO alcohol question):
- How many hours do you sleep at night?
- What time do you go to bed and wake up? (consistency of schedule)
- How many cups of coffee/caffeine per day, and the time of the last cup?
- Do you use screens before bed?
- What is your bedroom temperature like?
- Do you wake up refreshed or tired?
- Do you take naps? (timing)

Scoring & tips must reflect the book's principles (fixed schedule is the single most effective habit; caffeine half‑life ~5–6h; cool room ~18.3°C/65°F; avoid evening screens/blue light; naps helpful but not late; etc.). Derive the tip logic from the guidance in the Arabic content files (especially the "12 tips" appendix in `studies_why_we_sleep.md` and `sleep_myths.md`).

---

## 5. Studies & Experiments — interactive quiz format

Instead of static text, present each study interactively:
1. Explain **how the experiment was set up / how it works** (methodology), in an engaging way.
2. Ask the reader: **"What do you think the result was?"**
3. Show **3 options** to choose from.
4. After they choose, reveal whether they were correct, then show the **actual result + discussion**.

Source all 122 studies (methodology, result, discussion) from `studies_why_we_sleep.md`. Design the option‑generation so the two "wrong" options are plausible but clearly distinguishable once revealed. Make it feel like a fun guessing game, not a test. This section sits right before the Discussion section.

---

## 6. Content source file (Arabic — translate to English at build time)

**All written content is in ONE file: `why_we_sleep_ALL_raw.txt`** (Fusha/MSA Arabic). It is split into **14 sections**, each preceded by a separator header of the form:

```
=================================================================
  [ القسم رقم N | المصدر: <original_filename>.md ]
=================================================================
```

Read that file and split it on these separators. Each section maps to a site section as follows (by its `المصدر` filename):

- `review_session_materials.md` → **split**: the general‑summary part → section 1 (General Summary); the discussion questions + review points → the **final** "Session Materials & Discussion" section.
- `sleep_mechanism_complete.md` → Complete Sleep Mechanism
- `REM_sleep_complete.md` → REM Sleep
- `NREM_sleep_complete.md` → NREM Sleep
- `sleep_and_memory.md` → Sleep & Memory
- `sleep_and_health.md` → Sleep, Health, Immunity & Cancer
- `sleep_across_lifespan.md` → Sleep Across the Lifespan
- `dreams_complete.md` → Dreams
- `animal_sleep.md` → Animal Sleep
- `characters_why_we_sleep.md` → Characters & Their Stories
- `shocking_facts_why_we_sleep.md` → Shocking Facts
- `sleep_myths.md` → Common Myths
- `studies_why_we_sleep.md` → the 122 studies, for the interactive quiz (§5)
- `figures_why_we_sleep.md` → textual descriptions/explanations of each figure (use for figure captions/explanations)

You (Claude Code) must generate BOTH a faithful English version and the Arabic version of each section. Translation rules: in the Arabic version, keep the important technical term in Arabic **followed by the English term in parentheses** (e.g. «النواة فوق التصالبية (Suprachiasmatic Nucleus)»). Keep all English/German/Latin technical terms, numbers, DIN codes, and §‑references verbatim in both versions.

---

## 7. Figures — interactive specs (embed each inline in its relevant section)

There are 15 figures. **Reproduce them as interactive React components**, each placed in the section where its topic belongs (e.g. Figures 1–2 in the Sleep Mechanism section, Figures 4–8 with the mechanism/two‑process discussion, Figure 9 with REM/NREM, Figure 14 concept with Memory, etc.). All labels/tooltips must be translatable (AR/EN) and respect dark/light mode. Per‑figure requirements:

- **Figure 1 — Circadian body‑temperature rhythm (24h):** line chart; on hover show the (x = time, y = temperature) values. Not otherwise adjustable.
- **Figure 2 — Melatonin cycle:** same as Fig 1 — hover shows (time, melatonin) values.
- **Figure 3 — Spider webs under drugs:** THIS MUST MATCH THE ORIGINAL PHOTO EXACTLY. It uses the **original photograph** (I will provide it — see §8), **enhance its resolution**. Show **only two panels at a time**: the LEFT panel is fixed = the "Normal" web; the RIGHT panel changes according to **4 buttons** below labeled with the drug names (LSD, Speed/Amphetamine, Marijuana, Caffeine). Crop the provided original image into the needed panels.
- **Figures 4, 5, 6 — Two‑process model (MERGE into ONE interactive component):** Process‑C (circadian) and Process‑S (sleep pressure/adenosine). Adjustable inputs: **bedtime, wake‑up time, caffeine amount (ml) and time of consumption**, plus (if feasible) additional inputs — **nap time & duration, evening light exposure level, accumulated sleep‑deprivation days**. The graph updates accordingly. Add a **"Reset to normal values" button**. On hover, **show the vertical gap between C and S** at that point (this gap = sleepiness/drive). Correct behavior: S rises during wake, drops during sleep; peak at ~11pm, trough at ~7am; C is the circadian wave (peak ~midday, trough ~11pm/1am); small morning gap = drive to wakefulness, large evening gap = drive to sleep.
- **Figure 7 — Sleep‑deprivation two‑process (ebb & flow):** same rendering as 4–6 but **NO adjustable inputs**. Show S rising continuously (no sleep) while C keeps oscillating; illustrate the three arrows: strong → weak (the "second wind" when C rises again) → severe.
- **Figure 8 — Hypnogram / sleep architecture:** ⚠️ **My earlier drawing was wrong — the segment lengths on the x‑axis are important and the stage values must be accurate.** Use **real, trusted sleep‑cycle data you find online** to draw an accurate hypnogram (levels: Awake, REM, NREM‑1, NREM‑2, NREM‑3/slow‑wave; ~4–5 cycles of ~90 min; deep sleep dominant early, REM lengthening toward morning). Make it **adjustable**: user inputs sleep + wake time to see the resulting cycles/losses, and on hover **show the sleep phase**. Add a **"Reset to normal" button**.
- **Figure 9 — Brain waves (Wake / deep NREM / REM):** make the **waves interactive and animated (moving)**.
- **Figure 10 — Sleep loss vs sports injuries:** static (no interactivity needed).
- **Figure 11 — Basketball performance:** static, no interactivity — **just fix the arrows** (up arrows for the metrics that increase, down arrows for turnovers/errors) and the six values: +12% minutes played, +29% points/min, +2% three‑point %, +9% free‑throw %, +37% turnovers to opponent (down), +45% committed errors (down).
- **Figure 12 — Sleep loss vs car accidents:** static (no interactivity). Values: <4h ×11.5, 4–5h ×4.3, 5–6h ×1.9, 6–7h ×1.3.
- **Figure 13 — Obesity vs sleep over decades:** on hover show (x = year, y = value) for both lines (avg sleep hours declining; obesity % rising, ~1940→2000+).
- **Figure 14 — Memory association network:** **NOT NEEDED** (skip). (The concept can still be described in text in the Memory section.)
- **Figure 15/Fig 13‑duplicate & Figure 17 (intervention levels):** Figure "15" original scan is **not needed**. (If you build the intervention‑levels concept, do it as simple text/graphic in the society/solutions context — optional, low priority.)

For accuracy of figure data/labels, use `figures_why_we_sleep.md` (explanations) and the values listed above. The original scanned figures PDF (`figures_ORIGINAL_from_book.pdf`) and my recreated PDF (`figures_RECREATED_by_claude.pdf`) are available as visual reference for shapes only — but rebuild everything as clean interactive React components (except Figure 3, which uses the enhanced original photo).

---

## 8. Images the user provides (already gathered — file/folder names)

The user has placed the assets in the project with these names:
- **`Charachters Photos/`** (folder) — character portraits (Characters section, one per character).
- **`Anatomical photos/`** (folder) — the anatomical/biological images (embed in the relevant sections).
- **`Spider web`** — the original 5‑panel spider‑web photograph for Figure 3 (enhance its resolution; crop into Normal + 4 drug panels).
- **`figures_ORIGINAL_from_book...pdf`** — the original scanned figures; **use ONLY as a visual reference** to see how the figures should look while you rebuild them as interactive React components.

Match files to characters/sections by their filenames and the context. Use graceful fallbacks (a neutral silhouette/placeholder) wherever an image is missing. All image alt text/captions must be bilingual (AR/EN).

**Expected character portraits:** Matthew Walker, Kenneth Parks, Michael Corke, William Halsted, Menachem Begin, Eugene Aserinsky, Nathaniel Kleitman, Dmitri Mendeleev, Otto Loewi, Paul McCartney, Keith Richards, Mary Shelley, Thomas Edison, Sigmund Freud, Rosalind Cartwright, Robert Stickgold, Charles Czeisler, Daniel Kripke, Andre Iguodala, Allan Rechtschaffen. (Some may be missing → placeholder.)

**Expected anatomical images (embed in the noted sections):**
1. Human brain — regions overview (Mechanism)
2. Suprachiasmatic Nucleus (SCN) & Hypothalamus (Mechanism)
3. Pineal gland (Mechanism)
4. Light pathway: retina → SCN (Mechanism)
5. Adenosine & caffeine receptor blocking (Mechanism)
6. Thalamus — sensory gate (Mechanism)
7. Orexin/Hypocretin neurons (Mechanism / Disorders–narcolepsy)
8. The four regions active in REM (REM section)
9. Prefrontal cortex (REM/Dreams)
10. Hippocampus → Cortex memory transfer (Memory)
11. Glymphatic system — overnight cleaning (Memory/Health)
12. Natural killer cells (Health)
13. Beta‑amyloid / Alzheimer's (Health/Memory)
14. Amygdala — emotional centers (Dreams)
15. Dolphin unihemispheric sleep (Animal Sleep)
16. Prion protein — Fatal Familial Insomnia (Characters/Disorders)

---

## 9. Deliverables

- A complete, runnable React site (with instructions to run: `npm install` / `npm run dev`).
- Full AR + EN content for every section (translated from the Arabic files).
- All interactive figures per §7, embedded contextually.
- The interactive Studies quiz (§5), the Sleep Assessment form (§4), language & theme toggles, collapsible RTL/LTR sidebar, responsive layout.
- Extensible book architecture (easy to add future books).

Start by proposing the folder structure and the content/data model, then build section by section. Ask me for the image files when you reach the point of wiring them in.

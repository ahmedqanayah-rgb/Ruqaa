# Reading Club — Why We Sleep / نادي القراءة — لماذا ننام

A bilingual (Arabic RTL / English LTR), responsive React site for a book‑reading
club. The first book is Matthew Walker's **Why We Sleep / لماذا ننام**. Content is
data‑driven so more books can be added later as new entries.

## Run it

```bash
npm install
npm run dev      # starts Vite dev server (opens in your browser)
```

Build for production:

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

Requires Node.js 18+ (developed on Node 24). No backend — everything runs
client‑side, and all state is kept in memory (no localStorage/sessionStorage).

## What's inside

- **Global features:** collapsible sidebar (right in Arabic, left in English,
  drawer on mobile), AR⇄EN language switch (translates *everything*, including
  chart labels, tooltips and image captions), dark/light theme toggle. Direction
  and theme are driven from `<html>`; all colors come from CSS variables in
  `src/styles/tokens.css` so the whole look can be re‑skinned centrally.
- **Home** — reading‑club intro + book list (extensible cards).
- **Sleep Assessment** — interactive questionnaire → sleep score + personalized
  tips derived from the book's principles. Runs fully in‑browser.
- **The book module** — 14 sidebar sections in order (Summary, Mechanism, REM,
  NREM, Memory, Health, Lifespan, Dreams, Animal Sleep, Characters, Shocking
  Facts, Myths, Studies quiz, Discussion).
- **Interactive figures**, embedded inline in the relevant section:
  - Fig 1/2 — circadian temperature & melatonin (hover for values)
  - Fig 3 — spider webs under drugs (cropped from the original photo; 4 drug buttons)
  - Fig 4–6 — two‑process model (adjustable bedtime, wake, caffeine, nap, light,
    sleep‑debt; hover shows the C–S gap = sleepiness; reset button)
  - Fig 7 — sleep‑deprivation ebb & flow (the "second wind")
  - Fig 8 — accurate hypnogram (adjustable sleep/wake, hover shows the stage,
    reports REM lost to short sleep)
  - Fig 9 — animated brain waves (Wake / deep NREM / REM)
  - Fig 10–13 — injuries, basketball, car accidents, obesity vs. sleep
- **Studies & Experiments** — the book's studies as a guessing game: methodology →
  "what do you think the result was?" → 3 options → reveal + discussion, with a score.

## Project structure

```
src/
  context/AppContext.jsx     language + theme + direction (single provider)
  data/
    books.js                 books registry (assembles sections, extensible)
    sections-part1..4.js     bilingual section content (data, not markup)
    studies.js               quiz data (methodology / options / result / discussion)
    assessment.js            questionnaire + scoring + tips
    ui.js                    site-chrome strings
  components/
    Layout / Navbar / Sidebar
    ContentBlocks.jsx        renders a section's data blocks (incl. people, myths)
    RichText.jsx             bold + <bdi> isolation for mixed AR/EN text
    StudiesQuiz.jsx
    figures/                 all interactive figure components + registry
  pages/                     Home, About, Assessment, BookSection
  styles/                    tokens.css (theme) + global.css + components.css
public/images/               character portraits, anatomical images, spider photo
```

## Adding a new book

Add a new object to the `books` array in `src/data/books.js` with its own
`sections` (each section is `{ slug, title:{ar,en}, lead, blocks:[…] }`). It will
automatically appear on Home and in the sidebar. A section with `kind:'quiz'`
renders the interactive studies component.

## Translation rules used

English content is a faithful translation of the Arabic source. In the Arabic
version, important technical terms are followed by the English term in
parentheses — e.g. «النواة فوق التصالبية (Suprachiasmatic Nucleus)» — and all
English/Latin technical terms and numbers are preserved verbatim in both versions.

_Educational reference content, not medical advice._

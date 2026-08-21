/* ============================================================================
   HOMEPAGE HERO SCENE — the intro video + the artwork composited on its still.
   ----------------------------------------------------------------------------
   THIS IS THE FILE TO EDIT when the club says:
     • "turn the hero off"         → set `enabled` below
     • "change the featured book"  → set `featuredBookId` below
   The artwork itself lives in data/pageArt.js (the title page). data/coverArt.js
   holds the other recipe shape — a rebuilt book cover, for a scene whose `kind`
   is 'cover'. See the note under `scenes` before reaching for it.

   ONE TREATMENT SHIPS: `overhead`. A second, `toppling`, was built and kept
   beside it for comparison through August 2026 and was deleted on 2026-08-21 —
   it was never switched on, and its assets were ~5.4 MB of the repo that no
   visitor ever downloaded. It is recoverable: the scene definition is in git
   history (before that date), and its masters and frames were always outside
   the repo in hero-video-wip/{renders,frames}/toppling/.

     overhead  ("Übersicht") A flat-lay looking straight down. A closed book
               falls open beside a cup of coffee, and the book's title, author
               and translator are set on the open right-hand page, like a title
               page. `kind: 'page'` is what selects that artwork.

   HOW IT WORKS (for future sessions):
   - Home.jsx renders <HeroCinema/> when `enabled` is true; otherwise the old
     text hero shows. `enabled: false` is the instant kill switch.
   - The video plays ONCE per browser session (in-memory flag in AppContext —
     never localStorage), then the hero freezes on its final still.
   - frame1 and frame2 ARE THE VIDEO'S OWN FIRST AND LAST FRAMES, pulled out of
     the encoded mp4. That is deliberate: an earlier version used the FLUX
     stills the video was generated *from*, and the video drifted away from them
     during generation, so the freeze jumped. Taking both ends from the encoded
     file makes drift impossible. Re-extract them whenever the TAKE changes —
     merely re-encoding a chosen take does not move anything in the frame (see
     the measurements in scripts/encode-hero-video.mjs).
   - `quad` is the four corners (TL, TR, BR, BL) of the surface the artwork is
     warped onto, in that frame's own pixels. `clip` is the outline of the part
     of that surface actually VISIBLE — used where something in the photo laps
     over it; the overhead scene needs none, since nothing laps over a page seen
     from straight above. Both are recalibrated with scripts/hero-calibrate.mjs,
     whose --zoom mode is what makes the corners accurate enough.
   - `imageW`/`imageH` describe the COORDINATE SPACE the quad is written in, not
     the size of the file that ships. The videos are encoded down to 720p on the
     short side; because that keeps the aspect ratio, the 1920×1080 coordinates
     below stay correct and need no rescaling.
   - `portrait` is optional. A scene without one uses its landscape assets on
     portrait screens (letterboxed by HeroCinema), which is enough to judge a
     new treatment before committing to a second render.
   ========================================================================== */

export const heroScene = {
  enabled: true,

  // Which hero treatment to show. One scene ships today; `active` is the switch
  // that a second one would be added against.
  active: 'overhead',

  // Which book the hero features. Leave null and it follows the club's current
  // season (club.js → the season with status 'current'), which is the same
  // source of truth the rest of Home uses — so the hero can't drift from the
  // carousel underneath it. Set an id from src/data/books.js
  // ('why-we-sleep' | 'stolen-focus' | future ids) only to override that.
  featuredBookId: null,

  /* A scene's `kind` picks which recipe file its artwork comes from:
   *   'page'   → data/pageArt.js   (a title page set on an open page)
   *   'cover'  → data/coverArt.js  (a rebuilt book cover warped onto a board)
   * Only 'page' is in use since the toppling scene was deleted. The 'cover'
   * path is kept because the artwork behind it is real work — the Stolen Focus
   * cover rebuilt from vector parts, type in the site's own fonts, and
   * illustrations cut out by scripts/extract-cover-art.mjs — and a future
   * treatment that stands a book up would want it again. */
  scenes: {
    /* ---------------------------------------------------------------------
       The overhead flat-lay, title page set on the open page.
       --------------------------------------------------------------------- */
    overhead: {
      kind: 'page',
      video: {
        landscape: './videos/overhead/hero-landscape.mp4',
        portrait: './videos/overhead/hero-portrait.mp4',
      },
      // WebP, like every other display image on the site. The full-resolution
      // JPEG masters live outside the repo in hero-video-wip/frames/overhead/,
      // because they are pipeline inputs (the video model uploads them, and the
      // pixel coordinates below are read off them).
      stills: {
        landscape: {
          frame1: './images/hero/overhead/frame1-landscape.webp',
          frame2: './images/hero/overhead/frame2-landscape.webp',
        },
        portrait: {
          frame1: './images/hero/overhead/frame1-portrait.webp',
          frame2: './images/hero/overhead/frame2-portrait.webp',
        },
      },
      landscape: {
        imageW: 1920, imageH: 1080,
        // The open book's RIGHT-hand page, from the gutter out to the deckle
        // edge. The right page on purpose: it is the recto, which is where a
        // title page falls in a real book, in either language.
        quad: [[990, 186], [1482, 180], [1481, 926], [988, 934]],
      },
      portrait: {
        // 1080x1920 — the video's own frames, not FLUX's 1088-wide stills.
        imageW: 1080, imageH: 1920,
        // Same recto. The phone framing puts the cup above the book and leaves
        // the bottom third of the picture as bare table, which is where the
        // hero's own logo, tagline and buttons sit — so the type on the page
        // never collides with them.
        quad: [[547, 550], [1015, 545], [1013, 1322], [546, 1329]],
      },
    },
  },
}

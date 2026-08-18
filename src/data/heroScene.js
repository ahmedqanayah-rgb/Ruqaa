/* ============================================================================
   HOMEPAGE HERO SCENE — the intro video + the artwork composited on its still.
   ----------------------------------------------------------------------------
   THIS IS THE FILE TO EDIT when the club says:
     • "use the other hero"        → set `active` below
     • "change the featured book"  → set `featuredBookId` below
   The artwork itself lives in data/coverArt.js (the book's cover) and
   data/pageArt.js (the title page).

   TWO TREATMENTS ARE KEPT SIDE BY SIDE so they can be compared. `active` picks
   the one the site uses; the other stays whole, assets and all.

     toppling  A three-quarter view of a table. A stack of books slides apart,
               one book settles upright with its blank cover to camera, and the
               real cover artwork is perspective-warped onto that face.
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
     file makes drift impossible.
   - `quad` is the four corners (TL, TR, BR, BL) of the surface the artwork is
     warped onto, in that frame's own pixels. `clip` is the outline of the part
     of that surface actually VISIBLE — used where something in the photo laps
     over it. Both are recalibrated with scripts/hero-calibrate.mjs, whose
     --zoom mode is what makes the corners accurate enough.
   - `portrait` is optional. A scene without one uses its landscape assets on
     portrait screens (cropped by object-fit), which is fine for comparing a
     treatment before committing to a second render.
   ========================================================================== */

export const heroScene = {
  enabled: true,

  // Which hero treatment to show: 'toppling' | 'overhead'.
  active: 'overhead',

  // Which book the hero features. Leave null and it follows the club's current
  // season (club.js → the season with status 'current'), which is the same
  // source of truth the rest of Home uses — so the hero can't drift from the
  // carousel underneath it. Set an id from src/data/books.js
  // ('why-we-sleep' | 'stolen-focus' | future ids) only to override that.
  featuredBookId: null,

  scenes: {
    /* ---------------------------------------------------------------------
       OPTION 1 — the toppling stack, cover warped onto the standing book.
       --------------------------------------------------------------------- */
    toppling: {
      kind: 'cover',
      video: {
        landscape: './videos/toppling/hero-landscape.mp4',
        portrait: './videos/toppling/hero-portrait.mp4',
      },
      // WebP, like every other display image on the site. The full-resolution
      // JPEG masters live outside the repo in hero-video-wip/frames/toppling/,
      // because they are pipeline inputs (the video model uploads them, and the
      // pixel coordinates below are read off them).
      stills: {
        landscape: {
          frame1: './images/hero/toppling/frame1-landscape.webp',
          frame2: './images/hero/toppling/frame2-landscape.webp',
        },
        portrait: {
          frame1: './images/hero/toppling/frame1-portrait.webp',
          frame2: './images/hero/toppling/frame2-portrait.webp',
        },
      },
      landscape: {
        // 1080, not FLUX's 1088: frame2 here is the video's last frame.
        imageW: 1920, imageH: 1080,
        /* The pale book standing upright at the right. These trace the OUTER
         * edge of the board, including the rolled cloth hem, because real cloth
         * wraps the board — stopping at the flat face leaves a beige frame
         * around the artwork, which reads as stuck on.
         *
         * The bottom two are estimates: the book's base is hidden behind the
         * open book, so they sit deliberately BELOW the occlusion line and
         * `clip` does the actual cutting. Only the blank bottom margin of the
         * cover falls in the guessed region. */
        quad: [[1090, 8], [1630, 12], [1618, 742], [1092, 715]],
        /* The open book's page laps across the base of the standing book.
         * Measured by scanning each column for the brightness step from cloth
         * into page, not read by eye. */
        clip: [
          [1090, 8], [1630, 12], [1620, 717], [1540, 702], [1460, 685], [1380, 667],
          [1300, 648], [1220, 638], [1100, 634], [1090, 632],
        ],
      },
      portrait: {
        imageW: 1088, imageH: 1920,
        // the olive book standing upright behind the open one
        quad: [[626, 246], [1050, 271], [1026, 962], [620, 952]],
        /* The open book's page laps over this book's bottom-left corner, so
         * part of the quad is not board at all. Measured, not eyeballed — the
         * page's edge is a curve, and reading it by eye gave three different
         * answers. Scan each row of the frame and record where the dark board
         * first appears; those readings are the middle points here. */
        clip: [
          [626, 246], [1050, 271], [1026, 942],
          [800, 902], [778, 880], [748, 860], [698, 840], [626, 828],
        ],
      },
    },

    /* ---------------------------------------------------------------------
       OPTION 2 — the overhead flat-lay, title page set on the open page.
       No `clip`: seen from straight above, nothing laps over the page.
       --------------------------------------------------------------------- */
    overhead: {
      kind: 'page',
      video: {
        landscape: './videos/overhead/hero-landscape.mp4',
        portrait: './videos/overhead/hero-portrait.mp4',
      },
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

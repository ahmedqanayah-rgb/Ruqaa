/* ============================================================================
   HOMEPAGE HERO SCENE — the "toppling books" video + composited overlays.
   ----------------------------------------------------------------------------
   THIS IS THE FILE TO EDIT when the club says:
     • "change the featured book to X"  → set `featuredBookId` below
     • "change the title on the open page" → set `pageTitle` (or leave null to
        use the featured book's own title automatically)

   HOW IT WORKS (for future sessions):
   - Home.jsx renders <HeroCinema/> (src/components/HeroCinema.jsx) when
     `enabled` is true; otherwise the old text hero is shown.
   - A background video (public/videos/) plays ONCE per browser session
     (in-memory flag in AppContext — never localStorage), then the hero swaps
     to the crisp final still (public/images/hero/frame2-*.jpg).
   - On the final still we composite, in image-space pixel coordinates:
       • the featured book's real cover, perspective-warped onto the blank
         leaning book (quad = its 4 corners: TL, TR, BR, BL), and
       • the book title as real HTML "ink" text on the open blank page —
         it follows the site's Arabic/English toggle automatically.
   - The quads/positions below are calibrated against the CURRENT frame2
     images. If the frames are regenerated (scripts/generate-hero-frames.mjs),
     re-calibrate: open the still, read the pixel corners of the blank front
     cover and the open right-hand page, and update the numbers.
   - `landscape` is used on desktop, `portrait` on portrait-oriented screens.
   ========================================================================== */

export const heroScene = {
  enabled: true,

  // Which book the hero features. Leave null and it follows the club's current
  // season (club.js → the season with status 'current'), which is the same
  // source of truth the rest of Home uses — so the hero can't drift from the
  // carousel underneath it. Set an id from src/data/books.js
  // ('why-we-sleep' | 'stolen-focus' | future ids) only to override that.
  featuredBookId: null,

  // Title shown in "ink" on the open page. null = use the featured book's
  // own bilingual title. To override: { ar: '...', en: '...' }.
  pageTitle: null,

  // Assets (relative to public/). Poster = frame1 so there is no flash.
  video: {
    landscape: './videos/hero-landscape.mp4',
    portrait: './videos/hero-portrait.mp4',
  },
  stills: {
    landscape: { frame1: './images/hero/frame1-landscape.jpg', frame2: './images/hero/frame2-landscape.jpg' },
    portrait: { frame1: './images/hero/frame1-portrait.jpg', frame2: './images/hero/frame2-portrait.jpg' },
  },

  /* ---- calibration (image-space pixels on frame2) ---- */
  landscape: {
    imageW: 1920, imageH: 1080,
    // 4 corners of the blank front cover: TL, TR, BR, BL
    coverQuad: [[700, 640], [985, 668], [962, 952], [668, 918]],
    // ink title on the open right-hand page: centre point, rotation, max width
    title: { x: 1497, y: 800, rotate: -4.5, maxWidth: 195, fontSize: 44 },
  },
  portrait: {
    imageW: 1080, imageH: 1920,
    coverQuad: [[155, 1245], [445, 1275], [425, 1565], [130, 1528]],
    title: { x: 697, y: 1420, rotate: -4, maxWidth: 210, fontSize: 42 },
  },
}

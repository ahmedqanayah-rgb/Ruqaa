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
  // WebP, like every other display image on the site — the full-resolution
  // JPEG masters these come from live outside the repo in
  // hero-video-wip/frames/, because they are pipeline inputs (the video model
  // uploads them, the pixel coordinates below are read off them) and shipping
  // them would cost 3.1 MB instead of 0.76 MB.
  stills: {
    landscape: { frame1: './images/hero/frame1-landscape.webp', frame2: './images/hero/frame2-landscape.webp' },
    portrait: { frame1: './images/hero/frame1-portrait.webp', frame2: './images/hero/frame2-portrait.webp' },
  },

  /* ---- calibration (image-space pixels on frame2) ---- */
  landscape: {
    // 1088, not 1080: FLUX wants multiples of 32, so that is the real frame
    // height. Every number below is read in this pixel space.
    imageW: 1920, imageH: 1088,
    // 4 corners of the blank front cover: TL, TR, BR, BL — the big beige book
    // leaning against the fallen pile on the right.
    coverQuad: [[1112, 52], [1700, 122], [1668, 752], [978, 648]],
    // ink title on the open right-hand page: centre point, rotation, max width.
    // rotate matches the page's own slope, so the text sits ON the paper
    // rather than floating across it.
    title: { x: 1205, y: 855, rotate: 7, maxWidth: 520, fontSize: 88 },
  },
  portrait: {
    imageW: 1088, imageH: 1920,
    // the olive book standing upright behind the open one
    coverQuad: [[630, 240], [1050, 262], [1035, 920], [622, 900]],
    // the open book's LEFT page — the right one runs off the frame edge.
    // Negative rotate: this page rises to the right, the mirror of landscape's.
    title: { x: 400, y: 950, rotate: -5, maxWidth: 480, fontSize: 78 },
  },
}

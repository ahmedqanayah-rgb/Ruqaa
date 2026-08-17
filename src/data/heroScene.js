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
    // leaning against the fallen pile on the right. Read off the frame with
    // `node scripts/hero-calibrate.mjs --zoom landscape <x0,y0,x1,y1>`; reading
    // them off the full-frame grid is only good to ±30px, which left a tan rim
    // of bare book showing down the right side and along the bottom.
    // These trace the OUTER edge of the board, including the rolled cloth hem,
    // because real cloth wraps the board — stopping at the flat face leaves a
    // beige frame around the artwork, which is what made it look stuck on.
    coverQuad: [[1125, 58], [1710, 102], [1599, 740], [972, 628]],
    // ink title on the open right-hand page: centre point, rotation, max width.
    // rotate matches the page's own slope, so the text sits ON the paper
    // rather than floating across it.
    title: { x: 1205, y: 855, rotate: 7, maxWidth: 520, fontSize: 88 },
  },
  portrait: {
    imageW: 1088, imageH: 1920,
    // the olive book standing upright behind the open one
    coverQuad: [[626, 246], [1050, 271], [1026, 962], [620, 952]],
    /* The open book's page laps over this book's bottom-left corner, so part of
     * the quad is not board at all. Without this the overlay painted the cover
     * straight over the page — a grey wedge sitting in front of something that
     * is physically in front of IT.
     *
     * This is the outline of the VISIBLE board, in the same image pixels as
     * coverQuad: the four corners, but with the bottom-left cut back along the
     * page's edge. gen-cover-cloth.mjs bakes it into the cloth patch's alpha,
     * and the hero uses that same patch as a mask, so the artwork is clipped
     * by it too. Omit it (landscape does) when nothing occludes the board.
     *
     * Measured, not eyeballed — the page's edge is a curve, and reading it by
     * eye gave three different answers. Scan each row of the frame and record
     * where the dark board first appears; those readings are the middle points
     * below. */
    coverClip: [
      [626, 246], [1050, 271], [1026, 942],
      [800, 902], [778, 880], [748, 860], [698, 840], [626, 828],
    ],
    // the open book's LEFT page — the right one runs off the frame edge.
    // Negative rotate: this page rises to the right, the mirror of landscape's.
    title: { x: 400, y: 950, rotate: -5, maxWidth: 480, fontSize: 78 },
  },
}

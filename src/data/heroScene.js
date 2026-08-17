/* ============================================================================
   HOMEPAGE HERO SCENE — the "toppling books" video + composited overlays.
   ----------------------------------------------------------------------------
   THIS IS THE FILE TO EDIT when the club says "change the featured book to X"
   → set `featuredBookId` below. The cover ARTWORK lives in data/coverArt.js.

   HOW IT WORKS (for future sessions):
   - Home.jsx renders <HeroCinema/> (src/components/HeroCinema.jsx) when
     `enabled` is true; otherwise the old text hero is shown.
   - A background video (public/videos/) plays ONCE per browser session
     (in-memory flag in AppContext — never localStorage), then the hero swaps
     to the crisp final still (public/images/hero/frame2-*.webp).
   - On that still, the featured book's cover is rebuilt from parts and
     perspective-warped onto the blank leaning book. `coverQuad` is its four
     corners (TL, TR, BR, BL) in the frame's own pixels.
   - The open page is left BLANK. It used to carry the book's title as "ink"
     text; the club asked for it gone, and with it went the two handwriting
     webfonts that existed only to set it.
   - The quads below are calibrated against the CURRENT frame2 images. If the
     frames are regenerated (scripts/generate-hero-frames.mjs), re-calibrate
     with scripts/hero-calibrate.mjs — its --zoom mode is what makes the corners
     accurate enough.
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
    // 1080, not FLUX's 1088: frame2-landscape is no longer a FLUX still. It is
    // the LAST FRAME OF THE VIDEO, pulled out of the encoded mp4, so the freeze
    // matches the final rendered frame exactly instead of merely resembling it.
    // Every number below is read in that pixel space.
    imageW: 1920, imageH: 1080,
    /* 4 corners of the blank front cover: TL, TR, BR, BL — the pale book
     * standing upright at the right. Read off the frame with
     * `node scripts/hero-calibrate.mjs --zoom landscape <x0,y0,x1,y1>`; the
     * full-frame grid is only good to ±30px, which once left a tan rim of bare
     * book showing down two sides.
     *
     * They trace the OUTER edge of the board, including the rolled cloth hem,
     * because real cloth wraps the board — stopping at the flat face leaves a
     * beige frame around the artwork, which reads as stuck on.
     *
     * The bottom two are estimates: the book's base is hidden behind the open
     * book, so they sit deliberately BELOW the occlusion line and coverClip
     * does the actual cutting. Only the blank bottom margin of the cover falls
     * in the guessed region, so being a little out costs nothing. */
    coverQuad: [[1090, 8], [1630, 12], [1618, 742], [1092, 715]],
    /* The open book's page laps across the base of the standing book. Measured
     * by scanning each column for the brightness step from cloth into page,
     * not read by eye. */
    coverClip: [
      [1090, 8], [1630, 12], [1620, 717], [1540, 702], [1460, 685], [1380, 667],
      [1300, 648], [1220, 638], [1100, 634], [1090, 632],
    ],
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
     * page's edge. HeroCinema maps it through the inverse of the cover's
     * homography and emits it as a CSS clip-path, and hero-preview.mjs tests
     * the same polygon per pixel. Omit it (landscape does) when nothing
     * occludes the board.
     *
     * Measured, not eyeballed — the page's edge is a curve, and reading it by
     * eye gave three different answers. Scan each row of the frame and record
     * where the dark board first appears; those readings are the middle points
     * below. */
    coverClip: [
      [626, 246], [1050, 271], [1026, 942],
      [800, 902], [778, 880], [748, 860], [698, 840], [626, 828],
    ],
  },
}

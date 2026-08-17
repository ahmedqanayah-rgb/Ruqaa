/* ============================================================================
   HERO COVER ART — each book cover rebuilt out of parts.
   ----------------------------------------------------------------------------
   The hero composites the featured book onto a photographed cloth book. Warping
   a flat photo of the cover onto it never looked real: the cover photo carries
   its own lighting, its own paper and its own perspective, so it read as a
   sticker stuck on a book rather than a book.

   So nothing here uses the cover image. The artwork is printed onto the book
   instead — and onto the book's OWN colour. An earlier version recoloured the
   cloth to match the real cover (near-black for Stolen Focus); that is gone.
   The photographed board keeps its own beige linen, its own weave and its own
   light, which is the most real thing available, and the artwork is set in
   black on top of it.

     • `art`   the shapes and drawings, as objects: the gradient orb, the moon,
               the star field, and cut-out illustrations extracted from the real
               cover by scripts/extract-cover-art.mjs.
     • `text`  the writing, re-set in real fonts so it stays sharp at any size.
               **Black**, because the board is light — this is the one thing
               that has to stay readable at 110px wide on a phone.

   The orb is drawn at reduced opacity so it reads as ink soaking into pale
   cloth rather than a sticker, and so the black title stays legible over it:
   at full strength its darker blue would drop the title to about 3:1 contrast,
   and washed back over the beige it sits near 7:1.

   EACH LANGUAGE IS ITS OWN LAYOUT, because the Arabic and English editions are
   genuinely different covers — different proportions, different orb size, and
   the Arabic edition has illustrated people the English one doesn't.

   COORDINATES ARE REAL COVER PIXELS, in that language's `view`. Numbers can be
   read straight off the cover image in public/images/.

   ⚠ This file is full of Arabic. Edit it with a UTF-8-aware tool. Piping it
   through PowerShell's Get-Content/Set-Content mangles every Arabic string —
   5.1 reads as ANSI by default, so the text comes back as Ù/Ø mojibake.

   Preview any change without a browser:  node scripts/hero-preview.mjs
   A book with no entry here falls back to its cover image, so nothing breaks.
   ========================================================================== */

const AR = "'IBM Plex Sans Arabic', sans-serif"
const EN = "Inter, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"

/* Everything written on the board, in one colour. The board is pale, so it is
 * black — and it is black for the small print too. A softer grey was tried for
 * the secondary lines (translator credit, cover blurb) and it disappeared: at
 * this size, on woven cloth, through the perspective squeeze, anything short of
 * black stops being text and becomes a smudge. */
const INK = '#000000'

// Blue → purple → pink, the orb both Stolen Focus editions are built around.
const ORB = [[0, '#2f6fd0'], [0.5, '#7b4bb0'], [1, '#e0629a']]
const ORB_OPACITY = 0.55

export const coverArt = {
  'stolen-focus': {
    ar: {
      view: [452, 678],
      art: [
        { type: 'orb', cx: 228, cy: 308, r: 132, angle: 145, stops: ORB, opacity: ORB_OPACITY },
        // The people, cut out of the real Arabic cover. Full-bleed: the
        // extraction keeps the source cover's dimensions, so it lines up with
        // `view` exactly.
        { type: 'cutout', src: './images/hero/cover-art/stolen-focus-people.webp', x: 0, y: 0, w: 452, h: 678 },
      ],
      text: [
        { s: 'يوهان هاري', x: 228, y: 118, size: 30, font: AR, weight: 700, fill: INK },
        { s: 'تركيزنا', x: 228, y: 250, size: 58, font: AR, weight: 700, fill: INK },
        { s: 'المسلوب', x: 228, y: 312, size: 58, font: AR, weight: 700, fill: INK },
        // Generous leading: the book leans back, and the perspective squeezes
        // vertical gaps far more than horizontal ones, so lines set at normal
        // spacing here end up almost touching on the book.
        { s: 'لماذا صرنا نعاني', x: 228, y: 364, size: 21, font: AR, weight: 600, fill: INK },
        { s: 'مشكلة قلة الانتباه', x: 228, y: 404, size: 21, font: AR, weight: 600, fill: INK },
        { s: 'ترجمة: الحارث النبهان', x: 228, y: 548, size: 17, font: AR, weight: 600, fill: INK },
      ],
    },

    en: {
      view: [526, 800],
      art: [{ type: 'orb', cx: 263, cy: 395, r: 192, angle: 145, stops: ORB, opacity: ORB_OPACITY }],
      text: [
        { s: 'INTERNATIONAL BESTSELLER', x: 263, y: 42, size: 14, font: EN, weight: 700, track: 2.5, fill: INK },
        // The display type runs UNDER the orb on the real cover. `behind` draws
        // it before the art, so the orb's wash passes over it the way
        // overprinting reads there.
        { s: 'STOLEN', x: 263, y: 120, size: 76, font: EN, weight: 700, track: 8, fill: INK, behind: true },
        { s: 'FOCUS', x: 263, y: 210, size: 76, font: EN, weight: 700, track: 8, fill: INK, behind: true },
        { s: "Why You Can't", x: 278, y: 305, size: 40, font: SERIF, weight: 600, fill: INK },
        { s: 'Pay Attention—', x: 278, y: 360, size: 40, font: SERIF, weight: 600, fill: INK },
        { s: 'and How to Think', x: 278, y: 415, size: 40, font: SERIF, weight: 600, fill: INK },
        { s: 'Deeply Again', x: 278, y: 470, size: 40, font: SERIF, weight: 600, fill: INK },
        { s: 'JOHANN', x: 263, y: 600, size: 76, font: EN, weight: 700, track: 8, fill: INK, behind: true },
        { s: 'HARI', x: 263, y: 690, size: 76, font: EN, weight: 700, track: 8, fill: INK, behind: true },
        { s: 'Author of Chasing the Scream and Lost Connections', x: 263, y: 768, size: 15, font: SERIF, weight: 600, fill: INK },
      ],
    },
  },

  'why-we-sleep': {
    // Not the featured book at the moment. Its night sky is inverted for the
    // pale board: the stars and moon are drawn as dark ink rather than light,
    // because pale stars on beige linen would simply disappear.
    ar: {
      view: [268, 400],
      art: [
        { type: 'stars', count: 120, seed: 7, fill: '#1d1d24' },
        { type: 'moon', cx: 134, cy: 64, r: 17, fill: '#6b5410' },
      ],
      text: [
        { s: 'من أكثر الكتب مبيعاً في العالم كله', x: 134, y: 30, size: 11, font: AR, weight: 600, fill: INK },
        { s: 'لماذا ننام', x: 134, y: 142, size: 36, font: AR, weight: 700, fill: INK },
        { s: 'اكتشف طاقة النوم', x: 134, y: 192, size: 17, font: AR, weight: 600, fill: INK },
        { s: 'والأحلام', x: 134, y: 218, size: 17, font: AR, weight: 600, fill: INK },
        { s: 'ماثيو ووكر', x: 134, y: 274, size: 21, font: AR, weight: 700, fill: INK },
        { s: 'ترجمة: الحارث النبهان', x: 134, y: 376, size: 12, font: AR, weight: 600, fill: INK },
      ],
    },

    en: {
      view: [394, 600],
      art: [
        { type: 'stars', count: 150, seed: 7, fill: '#1d1d24' },
        { type: 'moon', cx: 197, cy: 96, r: 26, fill: '#6b5410' },
      ],
      text: [
        { s: 'THE ESSENTIAL NEW YORK TIMES BESTSELLER', x: 197, y: 36, size: 12, font: EN, weight: 700, track: 1, fill: INK },
        { s: 'Why We', x: 197, y: 205, size: 58, font: SERIF, weight: 600, fill: INK },
        { s: 'Sleep', x: 197, y: 272, size: 58, font: SERIF, weight: 600, fill: INK },
        { s: 'UNLOCKING THE', x: 197, y: 356, size: 20, font: EN, weight: 700, track: 3, fill: INK },
        { s: 'POWER OF SLEEP', x: 197, y: 392, size: 20, font: EN, weight: 700, track: 3, fill: INK },
        { s: 'AND DREAMS', x: 197, y: 428, size: 20, font: EN, weight: 700, track: 3, fill: INK },
        { s: 'Matthew Walker, PhD', x: 197, y: 500, size: 26, font: SERIF, weight: 600, fill: INK },
        { s: 'The New York Times Book Review', x: 197, y: 566, size: 13, font: SERIF, weight: 600, fill: INK },
      ],
    },
  },
}

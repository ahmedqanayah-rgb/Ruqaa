/* ============================================================================
   HERO COVER ART — each book cover rebuilt out of parts.
   ----------------------------------------------------------------------------
   The hero composites the featured book onto a photographed cloth book. Warping
   a flat photo of the cover onto it never looked real: the cover photo carries
   its own lighting, its own paper and its own perspective, so it read as a
   sticker stuck on a book rather than a book.

   So nothing here uses the cover image. Instead:
     • `base`   recolours the photographed cloth to roughly the real cover's
                colour, at `tint` opacity — deliberately not 1, so the linen
                weave and the photo's own lighting still show through. It only
                has to be close; the title is what has to be readable.
     • `art`    the shapes and drawings, as objects: the gradient orb, the moon,
                the star field, and cut-out illustrations extracted from the
                real cover by scripts/extract-cover-art.mjs.
     • `text`   the writing, re-set in real fonts so it stays sharp at any size.

   EACH LANGUAGE IS ITS OWN LAYOUT, because the Arabic and English editions are
   genuinely different covers — different proportions, different orb size, and
   the Arabic edition has illustrated people the English one doesn't. They are
   not translations of one layout, so they don't share one.

   COORDINATES ARE REAL COVER PIXELS, in that language's `view`. Numbers can be
   read straight off the cover image in public/images/. The renderer maps the
   box onto the book in the photo with preserveAspectRatio="none": the
   photographed book is squarer than a real cover, so the artwork stretches to
   fill the board the way a mockup does.

   Preview any change without a browser:  node scripts/hero-preview.mjs
   A book with no entry here falls back to its cover image, so nothing breaks.
   ========================================================================== */

const AR = "'IBM Plex Sans Arabic', sans-serif"
const EN = "Inter, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"

// Blue → purple → pink, the orb both Stolen Focus editions are built around.
const ORB = [[0, '#2f6fd0'], [0.5, '#7b4bb0'], [1, '#e0629a']]

export const coverArt = {
  'stolen-focus': {
    base: '#0a0a12',
    tint: 0.93,

    ar: {
      view: [452, 678],
      art: [
        { type: 'orb', cx: 228, cy: 308, r: 132, angle: 145, stops: ORB },
        // The people, cut out of the real Arabic cover. Full-bleed: the
        // extraction keeps the source cover's dimensions, so it lines up with
        // `view` exactly.
        { type: 'cutout', src: './images/hero/cover-art/stolen-focus-people.webp', x: 0, y: 0, w: 452, h: 678 },
      ],
      text: [
        { s: 'يوهان هاري', x: 228, y: 118, size: 30, font: AR, weight: 700 },
        { s: 'تركيزنا', x: 228, y: 250, size: 58, font: AR, weight: 700 },
        { s: 'المسلوب', x: 228, y: 312, size: 58, font: AR, weight: 700 },
        // Generous leading: the book leans back, and the perspective squeezes
        // vertical gaps far more than horizontal ones, so lines set at normal
        // spacing here end up almost touching on the book.
        { s: 'لماذا صرنا نعاني', x: 228, y: 364, size: 21, font: AR, weight: 500 },
        { s: 'مشكلة قلة الانتباه', x: 228, y: 404, size: 21, font: AR, weight: 500 },
        { s: 'ترجمة: الحارث النبهان', x: 228, y: 548, size: 15, font: AR, weight: 400, fill: '#d8d8e0' },
      ],
    },

    en: {
      view: [526, 800],
      art: [{ type: 'orb', cx: 263, cy: 395, r: 192, angle: 145, stops: ORB }],
      text: [
        { s: 'INTERNATIONAL BESTSELLER', x: 263, y: 42, size: 14, font: EN, weight: 700, track: 2.5 },
        // The display type runs UNDER the orb on the real cover, in a
        // desaturated blue-grey. `behind` draws it before the art and dims it,
        // the way overprinting reads there.
        { s: 'STOLEN', x: 263, y: 120, size: 76, font: EN, weight: 700, track: 8, fill: '#8f9bb3', behind: true },
        { s: 'FOCUS', x: 263, y: 210, size: 76, font: EN, weight: 700, track: 8, fill: '#8f9bb3', behind: true },
        { s: "Why You Can't", x: 278, y: 305, size: 40, font: SERIF, weight: 400 },
        { s: 'Pay Attention—', x: 278, y: 360, size: 40, font: SERIF, weight: 400 },
        { s: 'and How to Think', x: 278, y: 415, size: 40, font: SERIF, weight: 400 },
        { s: 'Deeply Again', x: 278, y: 470, size: 40, font: SERIF, weight: 400 },
        { s: 'JOHANN', x: 263, y: 600, size: 76, font: EN, weight: 700, track: 8, fill: '#8f9bb3', behind: true },
        { s: 'HARI', x: 263, y: 690, size: 76, font: EN, weight: 700, track: 8, fill: '#8f9bb3', behind: true },
        { s: 'Author of Chasing the Scream and Lost Connections', x: 263, y: 768, size: 13, font: SERIF, weight: 400, fill: '#d8d8e0' },
      ],
    },
  },

  'why-we-sleep': {
    base: '#12294f',
    tint: 0.9,

    ar: {
      view: [268, 400],
      art: [
        { type: 'stars', count: 120, seed: 7, fill: '#dfe8ff' },
        { type: 'moon', cx: 134, cy: 64, r: 17, fill: '#f2c94c' },
      ],
      text: [
        { s: 'من أكثر الكتب مبيعاً في العالم كله', x: 134, y: 30, size: 9, font: AR, weight: 500, fill: '#f2c94c' },
        { s: 'لماذا ننام', x: 134, y: 142, size: 36, font: AR, weight: 700 },
        { s: 'اكتشف طاقة النوم', x: 134, y: 192, size: 17, font: AR, weight: 500, fill: '#f2c94c' },
        { s: 'والأحلام', x: 134, y: 218, size: 17, font: AR, weight: 500, fill: '#f2c94c' },
        { s: 'ماثيو ووكر', x: 134, y: 274, size: 21, font: AR, weight: 700 },
        { s: 'ترجمة: الحارث النبهان', x: 134, y: 376, size: 10, font: AR, weight: 400, fill: '#cfd8ec' },
      ],
    },

    en: {
      view: [394, 600],
      art: [
        { type: 'stars', count: 150, seed: 7, fill: '#dfe8ff' },
        { type: 'moon', cx: 197, cy: 96, r: 26, fill: '#f2c94c' },
      ],
      text: [
        { s: 'THE ESSENTIAL NEW YORK TIMES BESTSELLER', x: 197, y: 36, size: 11, font: EN, weight: 600, track: 1, fill: '#f2c94c' },
        { s: 'Why We', x: 197, y: 205, size: 58, font: SERIF, weight: 400 },
        { s: 'Sleep', x: 197, y: 272, size: 58, font: SERIF, weight: 400 },
        { s: 'UNLOCKING THE', x: 197, y: 356, size: 20, font: EN, weight: 600, track: 3, fill: '#f2c94c' },
        { s: 'POWER OF SLEEP', x: 197, y: 392, size: 20, font: EN, weight: 600, track: 3, fill: '#f2c94c' },
        { s: 'AND DREAMS', x: 197, y: 428, size: 20, font: EN, weight: 600, track: 3, fill: '#f2c94c' },
        { s: 'Matthew Walker, PhD', x: 197, y: 500, size: 26, font: SERIF, weight: 400, fill: '#f2c94c' },
        { s: 'The New York Times Book Review', x: 197, y: 566, size: 11, font: SERIF, weight: 400, fill: '#cfd8ec' },
      ],
    },
  },
}

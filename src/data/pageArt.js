/* ============================================================================
   HERO TITLE PAGE — what gets set on the open page of the `overhead` hero.
   ----------------------------------------------------------------------------
   The overhead ("Übersicht") treatment looks straight down at a table: a book
   falls open beside a cup of coffee, and this is printed on the open right-hand
   page — the book's title, its author, and its translator, laid out the way a
   real title page is.

   Deliberately NOT handwriting. An earlier hero set the title in a script face
   as if inked onto the paper; this is a title page, which in a real book is
   printed, so it uses the site's own typefaces and costs no extra webfont.

   Same recipe shape as coverArt.js — `view` + `art` + `text`, rendered by
   HeroArt.jsx — so both heroes share one renderer. Coordinates are pixels in
   `view`, which is roughly the page's own size in the frame.

   The English editions have no translator line, because they are not
   translations. Don't invent one to make the two layouts match.

   ⚠ Contains Arabic. Edit with a UTF-8-aware tool — piping this through
   PowerShell's Get-Content/Set-Content turns every Arabic string into mojibake.

   Preview without a browser:  node scripts/hero-preview.mjs --scene overhead
   ========================================================================== */

const AR = "'IBM Plex Sans Arabic', sans-serif"
const EN = "Inter, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"

// Printed on cream paper, so: black.
const INK = '#000000'

/* The page is ~492x748px in the landscape frame and ~468x780 in the portrait
 * one; this is that, rounded. Both map onto the same recipe.
 *
 * TYPE IS SET LARGER THAN A REAL TITLE PAGE WOULD BE, on purpose. On a phone
 * the whole page renders about 162px wide, so a book's genuine proportions put
 * the title at roughly 15px and the translator line below legibility. These
 * sizes trade a little bibliographic realism for a title you can actually read
 * at arm's length, which is the entire job of a hero. */
const VIEW = [500, 760]

// A short centred rule under the title, the way a title page separates the
// work from its author. Drawn, not typed, so it scales with the page.
const RULE = (y) => ({ type: 'rule', x1: 175, x2: 325, y, w: 2.5, fill: INK })

export const pageArt = {
  'stolen-focus': {
    ar: {
      view: VIEW,
      art: [RULE(352)],
      text: [
        { s: 'تركيزنا المسلوب', x: 250, y: 300, size: 60, font: AR, weight: 700, fill: INK },
        { s: 'يوهان هاري', x: 250, y: 424, size: 36, font: AR, weight: 500, fill: INK },
        { s: 'ترجمة: الحارث النبهان', x: 250, y: 648, size: 26, font: AR, weight: 500, fill: INK },
      ],
    },
    en: {
      view: VIEW,
      art: [RULE(352)],
      text: [
        { s: 'Stolen Focus', x: 250, y: 300, size: 58, font: SERIF, weight: 600, fill: INK },
        { s: 'Johann Hari', x: 250, y: 424, size: 34, font: EN, weight: 500, track: 1, fill: INK },
      ],
    },
  },

  'why-we-sleep': {
    ar: {
      view: VIEW,
      art: [RULE(352)],
      text: [
        { s: 'لماذا ننام', x: 250, y: 300, size: 64, font: AR, weight: 700, fill: INK },
        { s: 'ماثيو ووكر', x: 250, y: 424, size: 36, font: AR, weight: 500, fill: INK },
        { s: 'ترجمة: الحارث النبهان', x: 250, y: 648, size: 26, font: AR, weight: 500, fill: INK },
      ],
    },
    en: {
      view: VIEW,
      art: [RULE(352)],
      text: [
        { s: 'Why We Sleep', x: 250, y: 300, size: 58, font: SERIF, weight: 600, fill: INK },
        { s: 'Matthew Walker', x: 250, y: 424, size: 34, font: EN, weight: 500, track: 1, fill: INK },
      ],
    },
  },
}

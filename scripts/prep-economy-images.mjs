/*
 * Prepare the images for «الاقتصاد كما أشرحه لابنتي» from the originals the
 * club supplied. Run:
 *
 *   node scripts/prep-economy-images.mjs "C:/Users/aq/Desktop/Ruqaa/Talking to My Daughter About the Economy A Brief History of Capitalism"
 *
 * Same arrangement as prep-flow-images.mjs, for the same reasons: the originals
 * sit beside the club's copies of the book, outside `app/`, which CLAUDE.md says
 * must never be committed. This file is the record of what was done to them. If
 * that folder is ever gone, the shipped files are the originals now.
 *
 * WHAT WAS SUPPLIED BUT IS NOT HERE, and why — so nobody "restores" them:
 *
 *   - «Cigarettes as currency in a POW camp» and «Greek occupation
 *     hyperinflation» are AI-generated: fused fingers and melting cigarettes in
 *     one, banknotes with no Greek on them in the other. Captioning either as a
 *     record of the camp or of the drachma would pass a fabrication off as
 *     evidence — in a chapter whose subject is TRUST.
 *   - «The English enclosures» is not the enclosures. It is a Swiss alpine cattle
 *     scene: a chalet, the Alps, men in Tyrolean dress. Wrong country, wrong
 *     century, wrong thing.
 *   - The Merchant of Venice, Robinson Crusoe (and its frontispiece), Hickel
 *     and Zuboff: none of them is in the book. They came from a list of guesses
 *     made before the book was read, and reading it settled them. The Merchant
 *     in particular has no clean home: its usurer is the play's antisemitic
 *     stereotype, and a usury chapter is no place to hang it unremarked.
 *   - Utopia, Bretton Woods and Nixon are not in the book either, but each earns
 *     a short, clearly marked aside beside the chapter it extends: More is the
 *     classic eyewitness to the enclosures (chapter 2), and Bretton Woods and
 *     Nixon are what happened to the Gold Standard after the book stops
 *     (chapter 7).
 *   - The photograph of the author with his daughter. She is a private person,
 *     photographed as a minor; the book is addressed to her, which is not her
 *     consent to appear on a public site.
 *   - «book cover.jpg» is the Indonesian edition.
 *
 * PORTRAITS are cropped to head-and-shoulders, the house framing — several were
 * supplied half-length, and in the 72px circle of the characters grid a
 * half-length portrait is a waistcoat with a small face on top. Crop boxes are
 * in each original's own pixels; re-derive them if a source is replaced.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pub = path.resolve(__dirname, '../public/images')
const srcDir = process.argv[2]

if (!srcDir || !fs.existsSync(srcDir)) {
  console.error('usage: node scripts/prep-economy-images.mjs <source-folder>')
  console.error('the folder holding the club\'s originals for the Varoufakis book (outside the repo)')
  process.exit(1)
}
fs.mkdirSync(path.join(pub, 'economy'), { recursive: true })

/* [source file, output path under public/images, width, crop?, extra]
   crop = { left, top, width, height } in source pixels.
   extra.q lowers the WebP quality for the engravings and the gold-tooled cover:
   fine hatching is the most expensive thing WebP can be asked to keep, and at
   the default 82 those four were 140–170 KB each for no difference at the size
   they render. extra.grey is for the two monochrome prints: their colour
   channels carry nothing but the source JPEG's noise, which WebP then pays to
   keep. */
const JOBS = [
  /* ---- the book's own covers: JPG, like the other two books' (see CLAUDE.md:
     several social scrapers will not fetch a WebP preview) ---- */
  ['الإقتصاد_كما_أشرحهbook cover.png', 'talking-to-my-daughter-cover-ar.jpg', 480],
  ['Talking to My Daughter About the Economy A Brief History of Capitalism english cover.jpg', 'talking-to-my-daughter-cover-en.jpg', 480],

  /* ---- portraits ---- */
  ['Yanis-Varoufakis.jpg', 'characters/yanis-varoufakis.webp', 500],
  // A still from a television interview, landscape; the face sits left of centre.
  // The smallest original here, so it is upscaled with a light sharpen and nothing
  // else — the same treatment as the other translator's portrait.
  ['عماد شيحة.jpg', 'characters/imad-shiha.webp', 500, { left: 110, top: 0, width: 386, height: 386 }, { sharpen: true }],
  ['Adam Smith.jpg', 'characters/adam-smith.webp', 500],
  ['Karl Marx.jpg', 'characters/karl-marx.webp', 500, { left: 110, top: 0, width: 380, height: 400 }],
  ['John Maynard Keynes.jpg', 'characters/john-maynard-keynes.webp', 500, { left: 230, top: 0, width: 330, height: 330 }, { sharpen: true }],
  ['Jared Diamond.jpg', 'characters/jared-diamond.webp', 500],
  ['Goethe.jpg', 'characters/goethe.webp', 500, { left: 197, top: 40, width: 870, height: 910 }],
  ['Sophocles — a bust, for the Oedipusoracle device.jpg', 'characters/sophocles.webp', 500, { left: 0, top: 0, width: 458, height: 440 }],

  /* ---- scenes and artworks, in the chapters ---- */
  ['the First Fleet.jpg', 'economy/first-fleet.webp', 900],
  ['Faust → Delacroix’s Mephistopheles lithographs.jpg', 'economy/mephistopheles-delacroix.webp', 760, null, { q: 68, grey: true }],
  ['Oedipus → Ingres or Moreau, Oedipus and the Sphinx.jpg', 'economy/oedipus-sphinx-moreau.webp', 560],
  ['Frankenstein → the 1831 frontispiece of the creature.jpg', 'economy/frankenstein-1831.webp', 560, null, { q: 68, grey: true }],
  ['The Odyssey → the Siren Vase, or Waterhouse’s Ulysses and the Sirens.webp', 'economy/ulysses-sirens-waterhouse.webp', 1100, null, { q: 68 }],
  ['Automation.jpg', 'economy/automation.webp', 1100],
  ['Bretton Woods, 1944 1.jpg', 'economy/bretton-woods-1944.webp', 1100],
  ['Richard Nixon.jpg', 'economy/nixon.webp', 560],

  /* ---- the works the book draws on: Arabic and English editions as pairs,
     the way the flow chapter shows its source book ---- */
  ['guns germs and-steel jared diamond arabic book cover.webp', 'economy/guns-germs-steel-ar.webp', 560],
  ['guns germs and-steel jared diamond englisch book cover.webp', 'economy/guns-germs-steel-en.webp', 560],
  ['Faust arabic book cover.webp', 'economy/faust-ar.webp', 560],
  ['Faust book cover.jpg', 'economy/faust-en.webp', 560],
  ['Oedipus Rex arabic book cover.jpg', 'economy/oedipus-rex-ar.webp', 560],
  ['Oedipus Rex book cover.jpg', 'economy/oedipus-rex-en.webp', 560],
  ['Frankenstein — Mary Shelley arabic book cover.jpg', 'economy/frankenstein-ar.webp', 560],
  ['frankenstein book cover.jpg', 'economy/frankenstein-en.webp', 560],
  ['Das Kapital — Marx arabic book cover.jpg', 'economy/das-kapital-ar.webp', 560, null, { q: 68 }],
  ['Das Kapital — Marx book cover.jpg', 'economy/das-kapital-en.webp', 560],
  // Supplied as the cover on a white square; trimmed back to the cover itself.
  ['the-general-theory-of-employment-interest-and-money-taschenbuch-john-maynard-keynes-arabic book cover.jpeg', 'economy/general-theory-ar.webp', 560, null, { trim: true }],
  ['the-general-theory-of-employment-interest-and-money-taschenbuch-john-maynard-keynes-englisch book cover.webp', 'economy/general-theory-en.webp', 560],
  ['the-wealth-of-nations- arabic book cover.jpg', 'economy/wealth-of-nations-ar.webp', 560],
  ['the-wealth-of-nations- book cover.jpg', 'economy/wealth-of-nations-en.webp', 560],
  ['Utopia arabic book cover.jpg', 'economy/utopia-ar.webp', 560],
  ['Utopia book cover.jpg', 'economy/utopia-en.webp', 560],

  /* ---- the four films of chapter 6 ---- */
  ['The Matrix cover.jpg', 'economy/the-matrix.webp', 480],
  ['Blade Runner cover.jpg', 'economy/blade-runner.webp', 480],
  ['The Terminator cover.jpg', 'economy/the-terminator.webp', 480],
  ['Star Trek cover.jpg', 'economy/star-trek.webp', 480],
]

let total = 0
for (const [from, to, width, crop, opts = {}] of JOBS) {
  const src = path.join(srcDir, from)
  if (!fs.existsSync(src)) { console.log(`  skip (missing)  ${from}`); continue }
  let img = sharp(fs.readFileSync(src))
  if (opts.trim) img = sharp(await img.trim({ threshold: 24 }).toBuffer())
  if (crop) img = img.extract(crop)
  // Portrait upscales are allowed (the translator's still is 386px); everything
  // else only ever comes down.
  img = img.resize({ width, withoutEnlargement: !opts.sharpen })
  if (opts.sharpen) img = img.sharpen({ sigma: 0.6 })
  if (opts.grey) img = img.grayscale()
  const buf = to.endsWith('.jpg')
    ? await img.flatten({ background: '#ffffff' }).jpeg({ quality: 84, mozjpeg: true }).toBuffer()
    : await img.webp({ quality: opts.q || 82, effort: 6 }).toBuffer()
  fs.writeFileSync(path.join(pub, to), buf)
  const m = await sharp(buf).metadata()
  total += buf.length
  console.log(`  ${String(Math.round(buf.length / 1024)).padStart(4)} KB  ${m.width}x${m.height}  ${to}`)
}
console.log(`\n  ${Math.round(total / 1024)} KB in all`)
console.log('\nnow run:  node scripts/gen-image-dims.mjs')

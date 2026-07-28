/*
 * Download the webfonts from Google and generate src/styles/fonts.css, so the
 * site serves its own fonts instead of calling fonts.googleapis.com at runtime.
 *
 * WHY. Members join from Syria, Turkey, Malaysia and the UAE. Loading fonts from
 * Google meant two extra preconnects and a render-blocking cross-origin
 * stylesheet before any text could paint in the right face, on connections where
 * that hurts most — and it broke entirely anywhere Google Fonts is slow or
 * blocked. It also handed every visitor's IP to a third party. Self-hosting
 * removes all of that. It does NOT save bytes: the unicode-range split below
 * keeps the browser fetching only the subsets it needs, exactly as Google did.
 *
 * SUBSETS. Only two, chosen by scanning the actual content:
 *   arabic      the body text
 *   latin       ASCII, the accented names (é/í live in U+0000-00FF), punctuation
 * Everything else Google offers (cyrillic, greek, vietnamese) is dead weight
 * here. Arrows and emoji (→ ⚡ ☕) are outside both families and always came from
 * a system font.
 *
 * THE ONE EXCEPTION. Scanning every .js/.jsx/.css/.html file turns up exactly
 * one codepoint outside those two subsets: ʿ (U+02BF), used 12 times, always in
 * "Ruqʿa" — the club's own name, so it is on every page. It lives in Google's
 * latin-ext, which would cost 7 KB per weight for Plex and **83 KB per weight**
 * for Inter: ~360 KB of font data for a single glyph. So instead GLYPHS below
 * asks the `&text=` API to cut a font containing just that character — 1.7 KB
 * and 0.9 KB — and pins it to `unicode-range: U+02BF`.
 *
 * If a new character outside latin/arabic ever appears in the UI it will render
 * from a system font and look subtly wrong. Re-run the scan and add it here.
 *
 * The files land in src/, not public/, on purpose: Vite then rewrites the URLs
 * and content-hashes them, which keeps `base: './'` sub-path hosting working and
 * gives the fonts immutable cache names. public/ would need an absolute path.
 *
 * Re-run only to change weights or subsets:  node scripts/fetch-fonts.mjs
 * Weights must match what the CSS uses — see the Fonts section in CLAUDE.md.
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../src/styles/fonts')
const cssFile = path.resolve(__dirname, '../src/styles/fonts.css')

// A modern UA is required, or Google serves ttf instead of woff2.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const WEIGHTS = [400, 500, 600, 700]
const SUBSETS = ['arabic', 'latin']
const FAMILIES = [
  { name: 'IBM Plex Sans Arabic', slug: 'plex-arabic' },
  { name: 'Inter', slug: 'inter' },
]
/* Characters needed from outside SUBSETS, cut individually via `&text=`.
 *
 * `only` matters: IBM Plex Sans Arabic has no ʿ glyph at all. Google still
 * answers a `&text=ʿ` request for it, but with an empty font — measured in the
 * browser, Plex renders ʿ at exactly the fallback width (33.31px at 100px) on
 * every weight, while Inter gives a real glyph (17.58 → 16.86 as it bolds).
 * Declaring the Plex face would cost a request that finds nothing and falls
 * through anyway. Inter covers every case: Latin runs inside Arabic text are
 * wrapped in `.term-en`, which is Inter, and the English view is Inter throughout.
 */
const GLYPHS = [{ chars: 'ʿ', range: 'U+02BF', tag: 'ayn', note: 'the ʿ in "Ruqʿa"', only: ['Inter'] }]

fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })

const faces = []
let total = 0

/* Inter is a variable font: Google returns the *same* file for all four
   weights (verified by hash — one 48 KB file, four URLs), and the browser pins
   the weight axis per @font-face. IBM Plex Sans Arabic is static, a real file
   per weight. So write by content hash and let identical downloads share one
   file — otherwise the repo carries four byte-identical copies of Inter. */
const byHash = new Map()
const write = (preferredName, buf) => {
  const hash = crypto.createHash('sha1').update(buf).digest('hex')
  if (byHash.has(hash)) return { file: byHash.get(hash), reused: true }
  fs.writeFileSync(path.join(outDir, preferredName), buf)
  byHash.set(hash, preferredName)
  total += buf.length
  return { file: preferredName, reused: false }
}

for (const family of FAMILIES) {
  const url = `https://fonts.googleapis.com/css2?family=${family.name.replace(/ /g, '+')}:wght@${WEIGHTS.join(';')}&display=swap`
  const css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text()

  // Google emits a `/* subset */` comment immediately before each @font-face.
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g
  let m
  while ((m = re.exec(css))) {
    const [, subset, body] = m
    if (!SUBSETS.includes(subset)) continue
    const weight = body.match(/font-weight:\s*(\d+)/)[1]
    const range = body.match(/unicode-range:\s*([^;]+);/)[1].trim()
    const src = body.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+\.woff2)\)/)?.[1]
    if (!src) { console.warn(`  ! no woff2 for ${family.name} ${weight} ${subset}`); continue }

    const buf = Buffer.from(await (await fetch(src, { headers: { 'User-Agent': UA } })).arrayBuffer())
    const { file, reused } = write(`${family.slug}-${weight}-${subset}.woff2`, buf)
    faces.push({ family: family.name, weight, subset, file, range, bytes: buf.length })
    console.log(reused
      ? `        shares ${file}  (${family.slug} ${weight} ${subset})`
      : `  ${String(Math.round(buf.length / 1024)).padStart(3)} KB  ${file}`)
  }

  // The single-glyph cuts.
  for (const g of GLYPHS) {
    if (g.only && !g.only.includes(family.name)) continue
    for (const weight of WEIGHTS) {
      const gUrl = `https://fonts.googleapis.com/css2?family=${family.name.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(g.chars)}`
      const gCss = await (await fetch(gUrl, { headers: { 'User-Agent': UA } })).text()
      // `&text=` cuts are served from an extensionless /l/font?kit=… endpoint,
      // not a .woff2 path — so this match must be looser than the one above.
      // The payload is still woff2 given the modern UA.
      const src = gCss.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1]
      if (!src) { console.warn(`  ! no cut for ${family.name} ${weight} "${g.chars}"`); continue }
      const buf = Buffer.from(await (await fetch(src, { headers: { 'User-Agent': UA } })).arrayBuffer())
      const { file, reused } = write(`${family.slug}-${weight}-${g.tag}.woff2`, buf)
      faces.push({ family: family.name, weight, subset: g.note, file, range: g.range, bytes: buf.length })
      console.log(reused
        ? `        shares ${file}  (${family.slug} ${weight} ${g.tag})`
        : `  ${String(Math.round(buf.length / 1024)).padStart(3)} KB  ${file}`)
    }
  }
}

const kb = (n) => Math.round(n / 1024)
const header = `/* GENERATED by scripts/fetch-fonts.mjs — do not edit by hand.
 *
 * Self-hosted so the site makes no request to fonts.googleapis.com. See that
 * script for why, and for why only the arabic and latin subsets are here — plus
 * a one-glyph cut for ʿ (U+02BF) in "Ruqʿa", which would otherwise drag in a
 * whole latin-ext subset costing 83 KB per Inter weight.
 *
 * The unicode-range on each face is Google's own, kept verbatim: it is what
 * stops an Arabic reader downloading the Latin files and vice versa. Do not
 * merge or simplify these ranges — a reader would start pulling every face.
 *
 * font-display: swap matches the previous behaviour: text paints immediately in
 * the fallback and re-renders when the webfont lands, rather than staying
 * invisible. ${faces.length} files, ${kb(total)} KB on disk; a given visitor fetches only a few.
 */
`
const rules = faces.map((f) => `/* ${f.subset} */
@font-face {
  font-family: '${f.family}';
  font-style: normal;
  font-weight: ${f.weight};
  font-display: swap;
  src: url('./fonts/${f.file}') format('woff2');
  unicode-range: ${f.range};
}`).join('\n\n')

fs.writeFileSync(cssFile, header + '\n' + rules + '\n')
console.log(`\n${faces.length} faces, ${kb(total)} KB → src/styles/fonts/`)
console.log(`wrote src/styles/fonts.css`)

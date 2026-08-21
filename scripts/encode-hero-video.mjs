// Encodes chosen hero takes into the two files the site actually ships.
//
//   node scripts/encode-hero-video.mjs <landscape.mp4> [portrait.mp4]
//
// Paths are the raw renders in ../../hero-video-wip/renders/<scene>/ (bare
// filenames from that folder work too). Outputs overwrite:
//   public/videos/<scene>/hero-landscape.mp4
//   public/videos/<scene>/hero-portrait.mp4
//
// Budget: ≤6s, **≤2 MB**, H.264, no audio track at all (the hero is muted; an
// empty stream still costs bytes and trips some mobile autoplay heuristics).
// H.264 rather than a smaller modern codec because Safari and older Android
// must both play it.
//
// WHY THE FILTER CHAIN LOOKS LIKE THIS (measured 2026-08-21, overhead scene).
// The first shipped hero was 1080p at CRF 23 and came out at 3.8 MB for four
// seconds — 7.6 Mbps — which made a first visit to Home ~5.8 MB, about 90% of
// it this one file. The obvious fix, raising CRF, barely worked: CRF 28 at
// 1080p still weighed 2.9 MB, only 20% off. The reason is that the frames come
// out of a generative video model full of fine grain, and grain is the most
// expensive thing an encoder can be asked to keep. Two changes do the work
// that CRF alone could not:
//
//   hqdn3d  removes that grain BEFORE the encoder has to spend bits on it.
//   720p    the hero box is never wider than ~1400 CSS px, and the video only
//           carries the four-second motion — the title-page artwork that has
//           to stay legible is a vector overlay drawn on top of the still, so
//           it is unaffected by the video's resolution.
//
// Together: 3.82 MB → 1.45 MB landscape, 3.92 MB → 1.60 MB portrait. Checked
// at 1:1 crops against the master; only the wood grain softens, and only under
// magnification well past how the hero is ever seen.
//
// NB: don't judge this with SSIM against the master. SSIM scores the removed
// grain as error and rates the denoised encode far below what the eye reads —
// it reported 0.87 for a file that is visually indistinguishable in place.
//
// The stills are NOT regenerated here. frame1/frame2 must stay the video's own
// first and last frames (see data/heroScene.js — an earlier version froze on
// the stills the video was generated *from*, and the freeze visibly jumped),
// but re-encoding an already-chosen take does not move anything in the frame:
// measured, the new last frame sits 3.79/255 from the shipped frame2 where the
// old one sat 3.59/255. Re-extract the stills only when the TAKE changes.
//
// ffmpeg note (Windows): winget-installed ffmpeg is frequently absent from a
// fresh PowerShell's PATH — see the gotcha in CLAUDE.md. This script says so
// explicitly instead of claiming ffmpeg is missing.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Scene-scoped, matching the frames and the public/ layout.
const sceneArg = process.argv.indexOf('--scene')
const SCENE = sceneArg > -1 ? process.argv[sceneArg + 1] : 'overhead'
const RENDERS = path.resolve(__dirname, `../../hero-video-wip/renders/${SCENE}`)
const OUT = path.resolve(__dirname, `../public/videos/${SCENE}`)

const MAX_MB = 2
const MAX_SECONDS = 6

/* Grain removal — see the header. Strong enough to give the encoder a clean
 * signal, gentle enough to leave the table's wood reading as wood. */
const DENOISE = 'hqdn3d=4:3:6:4'
/* Short side, in pixels; the long side follows the source's aspect. Written as
 * an expression rather than two fixed sizes so one call handles both
 * orientations and neither is ever upscaled. */
const shortArg = process.argv.indexOf('--short-side')
const SHORT = shortArg > -1 ? process.argv[shortArg + 1] : '720'
const FIT = `scale=w='if(gt(iw,ih),-2,min(${SHORT},iw))':h='if(gt(iw,ih),min(${SHORT},ih),-2)'`

/* 26 with the denoise in front of it. Raising this alone is not the lever it
 * looks like — that is what the header's measurements are about. */
const crfArg = process.argv.indexOf('--crf')
const CRF = crfArg > -1 ? process.argv[crfArg + 1] : '26'

function ffmpeg(args) {
  try {
    return execFileSync('ffmpeg', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.error('ffmpeg not found on PATH. It IS installed (winget, 9.0) — a fresh')
      console.error('PowerShell just does not inherit it. Refresh PATH and retry:')
      console.error('  $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [Environment]::GetEnvironmentVariable("Path","User")')
      process.exit(1)
    }
    throw new Error(e.stderr?.toString().split('\n').slice(-6).join('\n') || e.message)
  }
}

const resolve = (p) => (fs.existsSync(p) ? p : path.join(RENDERS, p))

function encode(input, outName) {
  const src = resolve(input)
  if (!fs.existsSync(src)) { console.error(`No such take: ${input}`); process.exit(1) }
  const out = path.join(OUT, outName)
  fs.mkdirSync(OUT, { recursive: true })

  console.log(`\n→ ${outName}  ← ${path.basename(src)}`)
  ffmpeg([
    '-y', '-i', src,
    '-t', String(MAX_SECONDS),
    '-an',                                   // drop audio entirely
    '-vf', `${DENOISE},${FIT}`,
    // veryslow, not slow: this runs on four-second clips a handful of times
    // ever, and it is worth ~8% at the same CRF.
    '-c:v', 'libx264', '-preset', 'veryslow', '-crf', CRF,
    '-pix_fmt', 'yuv420p',                   // required by Safari/older Android
    '-movflags', '+faststart',               // moov atom first, so it starts on first bytes
    out,
  ])

  const mb = fs.statSync(out).size / 1024 / 1024
  console.log(`  ${mb.toFixed(2)} MB` + (mb > MAX_MB
    ? `  ⚠ over the ${MAX_MB} MB budget — raise --crf (to 28) or lower --short-side (to 640)`
    : `  ✓ within the ${MAX_MB} MB budget`))
}

const flagged = new Set(['--scene', SCENE, '--crf', CRF, '--short-side', SHORT])
const [landscape, portrait] = process.argv.slice(2).filter((a) => !flagged.has(a))
if (!landscape) {
  console.error('Usage: node scripts/encode-hero-video.mjs <landscape.mp4> [portrait.mp4]')
  const takes = fs.existsSync(RENDERS) ? fs.readdirSync(RENDERS).filter((f) => f.endsWith('.mp4')) : []
  if (takes.length) console.error(`\nTakes available in hero-video-wip/renders/${SCENE}/:\n  ${takes.join('\n  ')}`)
  process.exit(1)
}
encode(landscape, 'hero-landscape.mp4')
if (portrait) encode(portrait, 'hero-portrait.mp4')
console.log('\nDone. Check the hero in `npm run dev` — play-once, freeze, overlays.')

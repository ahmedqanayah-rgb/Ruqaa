// Encodes chosen hero takes into the two files the site actually ships.
//
//   node scripts/encode-hero-video.mjs <landscape.mp4> [portrait.mp4]
//
// Paths are the raw renders in ../../hero-video-wip/renders/ (bare filenames
// from that folder work too). Outputs overwrite:
//   public/videos/hero-landscape.mp4
//   public/videos/hero-portrait.mp4
//
// Budget, from the decisions in hero-video-wip/RESUME.md: ≤6s, ≤6 MB, 1080p,
// H.264, **no audio track at all** (the hero is muted; an empty stream still
// costs bytes and trips some mobile autoplay heuristics). H.264 rather than
// a smaller modern codec because Safari and older Android must both play it.
//
// ffmpeg note (Windows): winget-installed ffmpeg is frequently absent from a
// fresh PowerShell's PATH — see the gotcha in CLAUDE.md. This script says so
// explicitly instead of claiming ffmpeg is missing.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Scene-scoped, like the frames: two hero treatments are kept side by side.
const sceneArg = process.argv.indexOf('--scene')
const SCENE = sceneArg > -1 ? process.argv[sceneArg + 1] : 'toppling'
const RENDERS = path.resolve(__dirname, `../../hero-video-wip/renders/${SCENE}`)
const OUT = path.resolve(__dirname, `../public/videos/${SCENE}`)

const MAX_MB = 6
const MAX_SECONDS = 6
/* Quality. 23 is visually transparent, but how many bytes that costs depends
 * entirely on the scene: the toppling shot has a soft out-of-focus wall behind
 * it and lands at 4.3 MB, while the overhead flat-lay is wall-to-wall sharp
 * wood grain — the worst case for an encoder — and blew past the budget at the
 * same setting. Override per scene rather than lowering it for everything. */
const crfArg = process.argv.indexOf('--crf')
const CRF = crfArg > -1 ? process.argv[crfArg + 1] : '23'

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
    '-c:v', 'libx264', '-preset', 'slow', '-crf', CRF,
    '-pix_fmt', 'yuv420p',                   // required by Safari/older Android
    '-vf', "scale='min(1920,iw)':-2",        // never upscale; keep even dimensions
    '-movflags', '+faststart',               // moov atom first, so it starts on first bytes
    out,
  ])

  const mb = fs.statSync(out).size / 1024 / 1024
  console.log(`  ${mb.toFixed(2)} MB` + (mb > MAX_MB
    ? `  ⚠ over the ${MAX_MB} MB budget — re-run with a higher -crf (25–28) or a shorter -t`
    : `  ✓ within the ${MAX_MB} MB budget`))
}

const flagged = new Set(['--scene', SCENE, '--crf', CRF])
const [landscape, portrait] = process.argv.slice(2).filter((a) => !flagged.has(a))
if (!landscape) {
  console.error('Usage: node scripts/encode-hero-video.mjs <landscape.mp4> [portrait.mp4]')
  const takes = fs.existsSync(RENDERS) ? fs.readdirSync(RENDERS).filter((f) => f.endsWith('.mp4')) : []
  if (takes.length) console.error(`\nTakes available in hero-video-wip/renders/:\n  ${takes.join('\n  ')}`)
  process.exit(1)
}
encode(landscape, 'hero-landscape.mp4')
if (portrait) encode(portrait, 'hero-portrait.mp4')
console.log('\nDone. Check the hero in `npm run dev` — play-once, freeze, overlays.')

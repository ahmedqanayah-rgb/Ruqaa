import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import { club } from '../data/club.js'
import { heroScene } from '../data/heroScene.js'
import { coverArt } from '../data/coverArt.js'
import { pageArt } from '../data/pageArt.js'
import HeroArt from './HeroArt.jsx'

/*
 * Cinematic homepage hero: a short video plays once per session, then freezes
 * on its own final frame, onto which the featured book's artwork is
 * perspective-warped.
 *
 * Which treatment runs — and every coordinate — lives in src/data/heroScene.js.
 * Its `kind` decides what gets warped: 'cover' takes the rebuilt book cover from
 * coverArt.js, 'page' the title page from pageArt.js.
 */

/* ---- perspective math: unit square → arbitrary quad, as CSS matrix3d ---- */
function adj(m) { // adjugate of 3x3
  return [
    m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
  ]
}
function mul(a, b) {
  const r = []
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
    r[3 * i + j] = a[3 * i] * b[j] + a[3 * i + 1] * b[3 + j] + a[3 * i + 2] * b[6 + j]
  return r
}
function basisToPoints(p1, p2, p3, p4) {
  const m = [p1[0], p2[0], p3[0], p1[1], p2[1], p3[1], 1, 1, 1]
  const a = adj(m)
  const v = [
    a[0] * p4[0] + a[1] * p4[1] + a[2],
    a[3] * p4[0] + a[4] * p4[1] + a[5],
    a[6] * p4[0] + a[7] * p4[1] + a[8],
  ]
  return mul(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])
}
// CSS matrix3d that maps a w×h element onto quad [TL,TR,BR,BL] (screen px).
function quadTransform(w, h, [tl, tr, br, bl]) {
  const s = basisToPoints([0, 0], [w, 0], [0, h], [w, h])
  const d = basisToPoints(tl, tr, bl, br)
  const t = mul(d, adj(s))
  for (let i = 0; i < 9; i++) t[i] /= t[8]
  return `matrix3d(${t[0]},${t[3]},0,${t[6]},${t[1]},${t[4]},0,${t[7]},0,0,1,0,${t[2]},${t[5]},0,1)`
}

/* An outline given in the frame's own pixels → a CSS clip-path on the cover
 * element, by inverting the unit-square→quad homography. */
function clipPolygon([tl, tr, br, bl], outline) {
  const Hi = adj(mul(basisToPoints(tl, tr, bl, br), adj(basisToPoints([0, 0], [1, 0], [0, 1], [1, 1]))))
  const pts = outline.map(([x, y]) => {
    const w = Hi[6] * x + Hi[7] * y + Hi[8]
    const u = (Hi[0] * x + Hi[1] * y + Hi[2]) / w
    const v = (Hi[3] * x + Hi[4] * y + Hi[5]) / w
    return `${(u * 100).toFixed(2)}% ${(v * 100).toFixed(2)}%`
  })
  return `polygon(${pts.join(', ')})`
}

/* Map image-space px → on-screen px for an object-fit:cover image/video. */
function coverMap(imgW, imgH, boxW, boxH, contain = false) {
  // `contain` mirrors object-fit: contain — the overlays have to follow whichever
  // fit the media element is using, or they detach from the picture.
  const s = contain ? Math.min(boxW / imgW, boxH / imgH) : Math.max(boxW / imgW, boxH / imgH)
  const ox = (boxW - imgW * s) / 2
  const oy = (boxH - imgH * s) / 2
  return ([x, y]) => [x * s + ox, y * s + oy]
}

export default function HeroCinema() {
  const { t, lang, theme, heroPlayed, setHeroPlayed } = useApp()
  const boxRef = useRef(null)
  const [boxSize, setBoxSize] = useState(null)
  const [portrait, setPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches)
  // This orientation has no playable video. Not the same thing as "played":
  // a missing file must not burn the once-per-session play, or rotating the
  // phone into an orientation that *does* have one would show nothing.
  const [videoFailed, setVideoFailed] = useState(false)
  // Whether the video has actually started painting frames. Used to decide when
  // it is safe to put the ENDING still underneath it — see `stillSrc` below.
  const [playing, setPlaying] = useState(false)

  // Track orientation live (a mount-time snapshot goes stale on rotate/resize).
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)')
    const onChange = () => setPortrait(mq.matches)
    // Re-read on subscribe, don't just wait for a 'change' event: orientation
    // can settle between the initial render's snapshot and this listener
    // attaching, and that gap would strand the wrong orientation for the whole
    // session — measured, a landscape window serving the portrait frame with
    // the portrait quads, which puts the overlays outside the box entirely.
    onChange()
    mq.addEventListener('change', onChange)
    // …and re-check on resize/orientationchange rather than trusting the media
    // query's own event, which does not fire reliably everywhere: measured, a
    // 375×812 → 1280×800 resize moved the query to landscape while 'change'
    // stayed silent, leaving the portrait frame and its quads in a landscape
    // box. These listeners are idempotent — setPortrait bails on equal state.
    window.addEventListener('resize', onChange)
    window.addEventListener('orientationchange', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      window.removeEventListener('resize', onChange)
      window.removeEventListener('orientationchange', onChange)
    }
  }, [])

  const scene = heroScene.scenes[heroScene.active]
  // A scene may only have been rendered in one orientation so far; fall back to
  // landscape rather than pointing at assets that do not exist.
  const orient = portrait && scene.portrait ? 'portrait' : 'landscape'
  // …but a 16:9 frame cropped into a tall phone box shows a narrow vertical
  // slice — on the overhead flat-lay that loses the cup entirely and cuts
  // through the title. Letterbox that case instead: the whole frame stays
  // visible, which is what a treatment being compared needs. Not a substitute
  // for rendering the orientation properly, just an honest stand-in.
  const letterbox = portrait && !scene.portrait
  const cal = scene[orient]
  const stills = scene.stills[orient]
  const videoSrc = scene.video[orient]

  // Default to the season the club is actually reading — the same source of
  // truth Home uses for the carousel — so the two can't disagree. heroScene
  // may override it with an explicit id.
  const wantedId = heroScene.featuredBookId
    || club.seasons?.find((s) => s.status === 'current')?.bookId
  const book = books.find((b) => b.id === wantedId) || books[0]

  // What gets warped onto the quad depends on the scene: the book's cover, or
  // its title page. Each language is its own layout with its own dimensions —
  // the editions are different artefacts, not translations of one design.
  const source = scene.kind === 'page' ? pageArt : coverArt
  const entry = source[book.id]
  const art = entry && (entry[lang] || entry.en)
  const artView = art?.view || [200, 280]

  /* The video is only mounted once the box has been measured, because that is
   * also when the orientation is known to be right. Mounting it on the first
   * render requested the wrong orientation's file — and Vite's dev server
   * answers a missing path with index.html and a 200, so the element decoded
   * HTML, fired `error`, and the hero fell to the still before the correct
   * source was ever tried. */
  const showVideo = !!boxSize && !heroPlayed && !videoFailed

  /* THE STILL IS ALWAYS MOUNTED, UNDERNEATH THE VIDEO. Don't "simplify" this
   * back into a ternary that swaps one element for the other.
   *
   * It used to render the <video> OR the <img>, never both. When the video
   * ended, the img mounted with a frame2 the browser had never fetched — half a
   * megabyte, requested at the exact moment of the cut — so the hero went blank
   * for a fraction of a second between the video finishing and the artwork
   * appearing. Measured in the network log: frame2 was requested *after* the
   * mp4 finished, not alongside it.
   *
   * Keeping the still mounted under the video means the end of the video is a
   * pure removal: the frame underneath is already fetched, decoded and painted.
   *
   * Which frame it holds still matters. frame1 (the "before" state) until the
   * video is genuinely playing — if the ending sat there while the poster was
   * still loading, a transparent first paint of the <video> would flash the
   * finish before the motion ran. Once frames are painting, the video is opaque
   * and covers the box, so swapping to frame2 is invisible and gives it the
   * whole four seconds to load. */
  const ended = heroPlayed || videoFailed
  const stillSrc = ended || playing ? stills.frame2 : stills.frame1

  const onEnded = useCallback(() => setHeroPlayed(true), [setHeroPlayed])
  // A source that will not play is a missing asset, not a performance — leave
  // heroPlayed alone so the other orientation still gets its turn.
  const onVideoError = useCallback(() => setVideoFailed(true), [])
  const onPlaying = useCallback(() => setPlaying(true), [])
  // A new orientation is a new source; give it a chance, and make it earn the
  // ending still again rather than inheriting the previous source's.
  useEffect(() => { setVideoFailed(false); setPlaying(false) }, [orient])

  // Track the hero box size so overlays stay glued to the image through the
  // object-fit:cover crop at any viewport size. Measure synchronously on mount
  // (ResizeObserver callbacks ride the render loop and can be throttled in
  // background/embedded contexts), then keep observing for changes.
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setBoxSize((prev) => (prev && prev[0] === r.width && prev[1] === r.height ? prev : [r.width, r.height]))
      // Re-read orientation on the SAME schedule as the box. The media query's
      // own 'change' event is not dependable — observed twice: a tab that
      // changed size before this component mounted kept serving the portrait
      // frame into a landscape box, with no event to correct it. Both facts
      // come from the viewport, so they should be sampled together.
      setPortrait(window.matchMedia('(orientation: portrait)').matches)
    }
    measure()
    // …but that synchronous read can land before the box has its final layout,
    // and if ResizeObserver is throttled nothing corrects it: measured in the
    // embedded pane, a 40×71 first reading stuck, scaling the cover warp and
    // the ink title down to ~12px until a resize event happened to fire. Two
    // cheap re-measures cover it — the next painted frame, and a beat later for
    // mobile browsers whose viewport settles as the URL bar collapses.
    const raf = requestAnimationFrame(measure)
    const settle = setTimeout(measure, 300)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf); clearTimeout(settle)
      ro?.disconnect(); window.removeEventListener('resize', measure)
    }
  }, [])

  let coverStyle = null
  if (boxSize) {
    const map = coverMap(cal.imageW, cal.imageH, boxSize[0], boxSize[1], letterbox)
    const q = cal.quad.map(map)
    // The cover overlay is laid out at the source cover's own aspect ratio and
    // warped onto the quad. It has to be the cover's ratio, not a fixed one: the
    // artwork fills this box with preserveAspectRatio="none", so a mismatch here
    // stretches the cover a second time on top of the perspective, and the
    // browser stops agreeing with scripts/hero-preview.mjs.
    const cw = 200
    const ch = Math.round(cw * (artView[1] / artView[0]))
    coverStyle = { width: cw, height: ch, transform: quadTransform(cw, ch, q) }
    // Where something in the photo laps over the board, clip it away. clip-path
    // is applied in the element's own box and only then transformed, so the
    // percentages are the cover's own space — hence mapping the outline's image
    // pixels back through the inverse of the same homography.
    if (cal.clip) coverStyle.clipPath = clipPolygon(cal.quad, cal.clip)
  }

  return (
    <section className={`hero-cinema ${theme === 'dark' ? 'is-dark' : ''}`} dir="ltr">
      <div className="hero-cinema-box" ref={boxRef}>
        <img className={`hero-cinema-media ${letterbox ? 'is-letterboxed' : ''}`} src={stillSrc} alt=""
          onError={(e) => { e.currentTarget.style.display = 'none' }} />
        {showVideo && (
          <video
            key={orient}
            className={`hero-cinema-media ${letterbox ? 'is-letterboxed' : ''}`}
            src={videoSrc}
            poster={stills.frame1}
            autoPlay muted playsInline preload="auto"
            onPlaying={onPlaying}
            onEnded={onEnded}
            onError={onVideoError}
          />
        )}

        {!showVideo && boxSize && (
          <div className="hero-cinema-overlays fade-in">
            {/* The cover, rebuilt as parts and perspective-warped onto the blank
                book. Nothing recolours the board: the photographed cloth keeps
                its own beige, its own weave and its own light, and the artwork
                is printed on top in black. A flat photo of the cover here read
                as a sticker — it brought its own lighting and paper. Books with
                no recipe in coverArt.js fall back to the image. */}
            <div className="hero-cover-warp" style={coverStyle} aria-hidden>
              {art ? (
                <HeroArt recipe={art} />
              ) : (
                <img className="hero-cover-fallback" src={t(book.cover)} alt=""
                  onError={(e) => { e.currentTarget.style.display = 'none' }} />
              )}
            </div>
            {/* A raking light gradient across the artwork. It belongs to the
                `cover` scene, where the board stands up and catches the light
                from one side. On the overhead flat-lay the light falls evenly
                from above, so the same gradient just dirties one corner of a
                clean page — and scripts/hero-preview.mjs never drew it, so
                leaving it on that scene also made the offline preview disagree
                with the browser. */}
            {scene.kind !== 'page' && <span className="hero-cover-shade" style={coverStyle} aria-hidden />}
          </div>
        )}

        <div className="hero-cinema-scrim" aria-hidden />

        {/* brand + CTAs — always readable over the scrim */}
        <div className="hero-cinema-content" dir="auto">
          <img className="hero-logo hero-cinema-logo" src="./images/logo.png" alt={t(ui.siteTitle)} />
          <span className="pill">{t(ui.siteTagline)}</span>
          <h1>{t({ ar: 'نقرأ الكتاب… ثم نعيشه', en: 'We read the book… then we live it' })}</h1>
          {!showVideo && (
            <div className="hero-actions fade-in">
              <Link className="btn primary" to={`/book/${book.id}`}>{t(ui.actions.openBook)} →</Link>
              <Link className="btn" to="/books">{t(ui.nav.books)}</Link>
              <Link className="btn ghost" to="/about">{t(ui.nav.about)}</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

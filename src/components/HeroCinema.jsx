import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books } from '../data/books.js'
import { club } from '../data/club.js'
import { heroScene } from '../data/heroScene.js'
import { coverArt } from '../data/coverArt.js'
import HeroCoverArt from './HeroCoverArt.jsx'

/*
 * Cinematic homepage hero: the "toppling books" video plays once per session,
 * then freezes on the final still, where we composite the featured book's real
 * cover (perspective-warped onto the blank book) and its title as ink text on
 * the open page. All per-book settings live in src/data/heroScene.js.
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

/* Map image-space px → on-screen px for an object-fit:cover image/video. */
function coverMap(imgW, imgH, boxW, boxH) {
  const s = Math.max(boxW / imgW, boxH / imgH)
  const ox = (boxW - imgW * s) / 2
  const oy = (boxH - imgH * s) / 2
  return ([x, y]) => [x * s + ox, y * s + oy]
}

export default function HeroCinema() {
  const { t, lang, theme, heroPlayed, setHeroPlayed } = useApp()
  const boxRef = useRef(null)
  const [boxSize, setBoxSize] = useState(null)
  const [portrait, setPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches)
  const [stage, setStage] = useState(heroPlayed ? 'still' : 'video') // 'video' | 'still'

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

  const orient = portrait ? 'portrait' : 'landscape'
  const cal = heroScene[orient]
  const stills = heroScene.stills[orient]
  const videoSrc = heroScene.video[orient]

  // Default to the season the club is actually reading — the same source of
  // truth Home uses for the carousel — so the two can't disagree. heroScene
  // may override it with an explicit id.
  const wantedId = heroScene.featuredBookId
    || club.seasons?.find((s) => s.status === 'current')?.bookId
  const book = books.find((b) => b.id === wantedId) || books[0]
  const art = coverArt[book.id]
  // Each language is its own cover layout, with its own source dimensions.
  const artView = (art && (art[lang] || art.en)?.view) || [200, 280]
  const title = heroScene.pageTitle || book.title

  const toStill = useCallback(() => { setStage('still'); setHeroPlayed(true) }, [setHeroPlayed])

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

  let coverStyle = null, titleStyle = null, scale = 1
  if (boxSize) {
    const map = coverMap(cal.imageW, cal.imageH, boxSize[0], boxSize[1])
    scale = Math.max(boxSize[0] / cal.imageW, boxSize[1] / cal.imageH)
    const q = cal.coverQuad.map(map)
    // The cover overlay is laid out at the source cover's own aspect ratio and
    // warped onto the quad. It has to be the cover's ratio, not a fixed one: the
    // artwork fills this box with preserveAspectRatio="none", so a mismatch here
    // stretches the cover a second time on top of the perspective, and the
    // browser stops agreeing with scripts/hero-preview.mjs.
    const cw = 200
    const ch = Math.round(cw * (artView[1] / artView[0]))
    coverStyle = { width: cw, height: ch, transform: quadTransform(cw, ch, q) }
    const [tx, ty] = map([cal.title.x, cal.title.y])
    titleStyle = {
      left: tx, top: ty,
      maxWidth: cal.title.maxWidth * scale,
      fontSize: cal.title.fontSize * scale,
      transform: `translate(-50%, -50%) rotate(${cal.title.rotate}deg)`,
    }
  }

  return (
    <section className={`hero-cinema ${theme === 'dark' ? 'is-dark' : ''}`} dir="ltr">
      <div className="hero-cinema-box" ref={boxRef}>
        {stage === 'video' ? (
          <video
            className="hero-cinema-media"
            src={videoSrc}
            poster={stills.frame1}
            autoPlay muted playsInline preload="auto"
            onEnded={toStill}
            onError={toStill}
          />
        ) : (
          <img className="hero-cinema-media" src={stills.frame2} alt=""
            onError={(e) => { e.currentTarget.style.display = 'none' }} />
        )}

        {stage === 'still' && boxSize && (
          <div className="hero-cinema-overlays fade-in">
            {/* The cover, rebuilt as parts and perspective-warped onto the blank
                book: the cloth is tinted to roughly the real cover's colour and
                the shapes, drawings and type are printed on top. A flat photo of
                the cover here read as a sticker — it brought its own lighting and
                paper. Books with no recipe in coverArt.js fall back to the image. */}
            <div className="hero-cover-warp" style={coverStyle} aria-hidden>
              {art ? (
                <div className="hero-cover-plate" style={{ '--cover-mask': `url(${art.cloth[orient]})` }}>
                  {/* The photographed cloth, recoloured offline by
                      scripts/gen-cover-cloth.mjs. Baked rather than tinted in
                      CSS because turning light beige cloth black while keeping
                      its weave needs the photo's contrast expanded, which is a
                      curve, not a blend — see that script's header. */}
                  <img className="hero-cover-cloth" src={art.cloth[orient]} alt=""
                    onError={(e) => { e.currentTarget.style.background = art.base }} />
                  <HeroCoverArt bookId={book.id} lang={lang} />
                </div>
              ) : (
                <img className="hero-cover-fallback" src={t(book.cover)} alt=""
                  onError={(e) => { e.currentTarget.style.display = 'none' }} />
              )}
            </div>
            <span className="hero-cover-shade" style={coverStyle} aria-hidden />
            {/* ink title on the open page */}
            <div className="hero-page-title" style={titleStyle} dir="auto">{t(title)}</div>
          </div>
        )}

        <div className="hero-cinema-scrim" aria-hidden />

        {/* brand + CTAs — always readable over the scrim */}
        <div className="hero-cinema-content" dir="auto">
          <img className="hero-logo hero-cinema-logo" src="./images/logo.png" alt={t(ui.siteTitle)} />
          <span className="pill">{t(ui.siteTagline)}</span>
          <h1>{t({ ar: 'نقرأ الكتاب… ثم نعيشه', en: 'We read the book… then we live it' })}</h1>
          {stage === 'still' && (
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

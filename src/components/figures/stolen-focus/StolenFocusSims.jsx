import { useState, useMemo, useEffect, useRef } from 'react'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })

/* ---------------- Fig 7 — The infinite scroll ----------------
   Aza Raskin's invention. The left feed never ends and never gives a stopping
   cue; the right feed is paginated and tells you when you're done. A live
   counter under the endless feed tallies what the scrolling "cost". */
const SECONDS_PER_POST = 12 // rough scroll-feed dwell time, for the tally only
export function SfInfiniteScroll() {
  const { t } = useApp()
  const [count, setCount] = useState(10)
  const [page, setPage] = useState(1)
  const PAGES = 3
  const consumed = count - 10 // posts loaded beyond the initial screenful
  const minutes = Math.round((count * SECONDS_PER_POST) / 60)
  const onScroll = (e) => {
    const el = e.currentTarget
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setCount((c) => c + 6)
  }
  return (
    <FigureFrame number={7}
      title={L('التمرير اللانهائي', 'The infinite scroll')}
      caption={L('اليسار: خلاصةٌ لا تنتهي ولا تمنحك لحظة توقّف — مرّر لترى كيف تتكاثر بلا حدّ، وراقب العدّاد. اليمين: خلاصةٌ مُصفَّحة تخبرك متى انتهيت. الفرق كلّه في وجود «إشارة توقّف».',
                 'Left: a feed that never ends and never offers a pause — scroll to watch it multiply, and watch the tally. Right: a paginated feed that tells you when you’re done. The whole difference is a “stopping cue.”')}>
      <div className="sf-scroll-wrap">
        <div className="sf-scroll-col">
          <div className="sf-scroll-head sf-scroll-head--bad">
            {t(L('تمرير لا نهائي', 'Infinite scroll'))} · <b>{t({ ar: `${count}+`, en: `${count}+` })}</b> {t(L('منشور', 'posts'))}
          </div>
          <div className="sf-scroll-feed" onScroll={onScroll}>
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="sf-post">
                <span className="sf-post-dot" aria-hidden>●</span>
                <span className="sf-post-line" style={{ width: `${55 + ((i * 37) % 40)}%` }} />
              </div>
            ))}
            <div className="sf-scroll-more">{t(L('… لا نهاية ↓', '… no end ↓'))}</div>
          </div>
          <div className="sf-scroll-tally" aria-live="polite">
            {consumed === 0
              ? t(L('مرّر داخل الخلاصة وراقب ما يحدث…', 'Scroll inside the feed and watch what happens…'))
              : t({ ar: `🕳️ التهمتَ ${count} منشوراً ≈ ${minutes} دقيقة من عمرك`,
                    en: `🕳️ You consumed ${count} posts ≈ ${minutes} minutes of your life` })}
          </div>
        </div>
        <div className="sf-scroll-col">
          <div className="sf-scroll-head sf-scroll-head--good">
            {t(L('خلاصة مُصفَّحة', 'Paginated feed'))} · {t({ ar: `صفحة ${page}/${PAGES}`, en: `page ${page}/${PAGES}` })}
          </div>
          <div className="sf-scroll-feed">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="sf-post">
                <span className="sf-post-dot" aria-hidden>●</span>
                <span className="sf-post-line" style={{ width: `${55 + ((i * 29) % 40)}%` }} />
              </div>
            ))}
            {page < PAGES ? (
              <button className="btn sf-scroll-next" onClick={() => setPage((p) => p + 1)}>
                {t(L('الصفحة التالية', 'Next page'))}
              </button>
            ) : (
              <div className="sf-scroll-done">{t(L('✓ انتهيت — لا مزيد', '✓ You’re all caught up'))}</div>
            )}
          </div>
          <div className="sf-scroll-tally sf-scroll-tally--good">
            {page < PAGES
              ? t(L('صفحاتٌ معدودة — والنهاية معلَنة.', 'A few pages — with the end announced.'))
              : t(L('✓ إشارة التوقّف وصلت. تستطيع الانصراف.', '✓ The stopping cue arrived. You are free to leave.'))}
          </div>
        </div>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 8 — The outrage algorithm ----------------
   Two posts spread across a grid of people: a calm post and an outrage post.
   With engagement ranking OFF they spread at similar rates; turn it ON and the
   algorithm amplifies outrage (Crockett). Step by hand or press ▶ to auto-run. */
const GRID = 9
function emptyGrid() {
  const cells = Array(GRID * GRID).fill(0) // 0 none, 1 calm, 2 outrage
  cells[GRID * 2 + 2] = 1
  cells[GRID * 6 + 6] = 2
  return cells
}
export function SfOutrageAlgorithm() {
  const { t } = useApp()
  const [cells, setCells] = useState(emptyGrid)
  const [round, setRound] = useState(0)
  const [ranking, setRanking] = useState(true)
  const [running, setRunning] = useState(false)

  const counts = useMemo(() => ({
    calm: cells.filter((c) => c === 1).length,
    outrage: cells.filter((c) => c === 2).length,
    empty: cells.filter((c) => c === 0).length,
  }), [cells])
  const saturated = counts.empty === 0

  const step = () => {
    setCells((prev) => {
      const next = [...prev]
      const pCalm = 0.28
      const pOut = ranking ? 0.62 : 0.3
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] === 0) continue
        const r = (i / GRID) | 0, c = i % GRID
        const nb = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
        for (const [rr, cc] of nb) {
          if (rr < 0 || cc < 0 || rr >= GRID || cc >= GRID) continue
          const j = rr * GRID + cc
          if (next[j] !== 0) continue
          const p = prev[i] === 2 ? pOut : pCalm
          if (Math.random() < p) next[j] = prev[i]
        }
      }
      return next
    })
    setRound((r) => r + 1)
  }
  const reset = () => { setRunning(false); setCells(emptyGrid()); setRound(0) }

  // Auto-run: step every 550ms until the grid saturates.
  useEffect(() => {
    if (!running) return
    if (saturated) { setRunning(false); return }
    const id = setInterval(step, 550)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, saturated, ranking])

  const reached = counts.calm + counts.outrage
  const outragePct = reached ? Math.round((counts.outrage / reached) * 100) : 50

  return (
    <FigureFrame number={8}
      title={L('خوارزمية الغضب', 'The outrage algorithm')}
      caption={L('منشورٌ هادئ (أزرق) ومنشورٌ غاضب (أحمر) ينتشران بين الناس. أطفئ «ترتيب التفاعل» فينتشران متقاربَين؛ أشعله فتضخّم الخوارزمية الغضب. شغّل المحاكاة ▶ أو تقدّم خطوةً خطوة، وقارن الحصّتين.',
                 'A calm post (blue) and an outrage post (red) spread among people. Turn “engagement ranking” off and they spread similarly; turn it on and the algorithm amplifies outrage. Auto-run ▶ or step through, and compare the shares.')}>
      <div className="sf-outrage">
        <div className="sf-grid" role="img"
          aria-label={t({ ar: `هادئ ${counts.calm}، غاضب ${counts.outrage}`, en: `calm ${counts.calm}, outrage ${counts.outrage}` })}>
          {cells.map((c, i) => (
            <span key={i} className={`sf-cell ${c === 1 ? 'calm' : c === 2 ? 'outrage' : ''}`} />
          ))}
        </div>
        <div className="sf-outrage-stats">
          <span className="sf-stat calm">{t(L('هادئ', 'Calm'))}: <b>{counts.calm}</b></span>
          <span className="sf-stat outrage">{t(L('غاضب', 'Outrage'))}: <b>{counts.outrage}</b></span>
          <span className="sf-stat">{t(L('الجولة', 'Round'))}: <b>{round}</b></span>
        </div>
        {round > 0 && (
          <div className="sf-share-bar" role="img"
            aria-label={t({ ar: `حصّة الغضب ${outragePct}٪`, en: `outrage share ${outragePct}%` })}>
            <div className="sf-share-outrage" style={{ width: `${outragePct}%` }} />
            <span className="sf-share-lbl">{t({ ar: `الغضب ${outragePct}٪ ممّن وصلهم منشور`, en: `outrage reached ${outragePct}% of those who saw a post` })}</span>
          </div>
        )}
        <label className="sf-toggle">
          <input type="checkbox" checked={ranking} disabled={running}
            onChange={(e) => setRanking(e.target.checked)} />
          <span>{t(L('ترتيب حسب التفاعل (يضخّم الغضب)', 'Engagement ranking (amplifies outrage)'))}</span>
        </label>
        <div className="sf-outrage-btns">
          <button className="btn primary" onClick={() => setRunning((r) => !r)} disabled={saturated}>
            {running ? t(L('⏸ إيقاف', '⏸ Pause')) : t(L('▶ تشغيل', '▶ Run'))}
          </button>
          <button className="btn" onClick={step} disabled={running || saturated}>{t(L('خطوة', 'Step'))}</button>
          <button className="btn" onClick={reset}>{t(L('إعادة', 'Reset'))}</button>
        </div>
        {saturated && (
          <p className="sf-readout">
            {t({ ar: `وصل المنشوران إلى الجميع: الغضب استحوذ على ${outragePct}٪. أعِد التجربة مع إطفاء الترتيب وقارن.`,
                 en: `Both posts reached everyone: outrage captured ${outragePct}%. Reset with ranking off and compare.` })}
          </p>
        )}
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 13 — The shrinking roaming radius ----------------
   A widely-cited illustration of how far children are allowed to roam across
   four generations of one family — from miles to a few hundred yards. Rings are
   not drawn to scale (6 miles vs 300 yards would not fit); distances are
   labelled. Pick a generation — the highlighted ring animates between picks. */
const GENERATIONS = [
  { key: 'g1', label: L('الجدّ الأكبر', 'Great-grandfather'), year: '1926', dist: L('~٩٫٥ كم (٦ أميال)', '~9.5 km (6 miles)'), r: 128, col: 'var(--cool)' },
  { key: 'g2', label: L('الجدّ', 'Grandfather'), year: '1950', dist: L('~١٫٦ كم (ميل)', '~1.6 km (1 mile)'), r: 92, col: 'var(--blue)' },
  { key: 'g3', label: L('الأمّ', 'Mother'), year: '1979', dist: L('~٨٠٠ م (نصف ميل)', '~800 m (½ mile)'), r: 58, col: 'var(--warm)' },
  { key: 'g4', label: L('الطفل اليوم', 'Child today'), year: '2007', dist: L('~٣٠٠ م', '~300 yards'), r: 26, col: 'var(--danger)' },
]
export function SfRoamingRadius() {
  const { t } = useApp()
  const [sel, setSel] = useState('g4')
  const active = GENERATIONS.find((g) => g.key === sel)
  return (
    <FigureFrame number={13}
      title={L('انكماش مساحة اللعب', 'The shrinking roaming radius')}
      caption={L('كم يُسمح للطفل أن يبتعد عن البيت وحده، عبر أربعة أجيالٍ من عائلةٍ واحدة — من أميالٍ إلى بضع مئات من الأمتار. (الحلقات ليست بمقياسٍ حقيقي؛ المسافات مكتوبة. توثيقٌ صحفيّ شهير لعائلةٍ من شيفيلد، يُستشهد به كثيراً خارج نصّ الكتاب).',
                 'How far a child is allowed to roam from home alone, across four generations of one family — from miles to a few hundred metres. (Rings are not to scale; distances are labelled. A famous press-documented Sheffield family, widely cited beyond the book’s own text.)')}>
      <div className="sf-roam">
        <svg viewBox="0 0 300 300" className="sf-roam-svg" role="img"
          aria-label={t({ ar: `${active.label.ar}: ${active.dist.ar}`, en: `${active.label.en}: ${active.dist.en}` })}>
          {/* single animated highlight ring, drawn under the outline rings */}
          <circle cx="150" cy="150" r={active.r} className="sf-roam-active"
            fill={active.col} fillOpacity="0.18" stroke={active.col} strokeWidth="3" />
          {[...GENERATIONS].reverse().map((g) => (
            <circle key={g.key} cx="150" cy="150" r={g.r} fill="transparent"
              stroke={g.col} strokeWidth="1.5"
              strokeDasharray="4 4" opacity={g.key === sel ? 0 : 1} />
          ))}
          <text x="150" y="154" textAnchor="middle" fontSize="20" aria-hidden>🏠</text>
        </svg>
        <div className="sf-roam-pick">
          {GENERATIONS.map((g) => (
            <button key={g.key} className={`sf-roam-btn ${g.key === sel ? 'active' : ''}`}
              style={{ '--roam-col': g.col }} onClick={() => setSel(g.key)}>
              <span className="sf-roam-lbl">{t(g.label)}</span>
              <span className="sf-roam-yr">{g.year}</span>
            </button>
          ))}
        </div>
        <p className="sf-readout">
          <b>{t(active.label)}</b> ({active.year}): {t(active.dist)}
        </p>
      </div>
    </FigureFrame>
  )
}

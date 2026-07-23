import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import { books, getBook } from '../data/books.js'
import { club } from '../data/club.js'
import WorldReach from '../components/WorldReach.jsx'

const L = (ar, en) => ({ ar, en })

/* Totals across every book, so the stats row never goes stale as books land. */
function clubStats() {
  let sections = 0, studies = 0, interactives = 0
  books.forEach((b) => {
    b.sections.forEach((s) => {
      sections += 1
      if (s.studies) studies += s.studies.length
      if (s.blocks) interactives += s.blocks.filter((x) => x.type === 'figure').length
    })
  })
  return { books: books.length, sections, studies, interactives }
}

function Stat({ n, label }) {
  const { t } = useApp()
  return (
    <div className="club-stat">
      <span className="club-stat-n">{n}</span>
      <span className="club-stat-l">{t(label)}</span>
    </div>
  )
}

/* Atmospheric banner at the top of the page. Stays hidden until the image
   actually loads, so a not-yet-added photo leaves no broken box (and no
   overflow from the alt text) — the image is eager, so it still fetches while
   the figure is display:none and reveals itself on success. */
function ClubBanner({ banner }) {
  const { t } = useApp()
  const [ready, setReady] = useState(false)
  if (!banner) return null
  return (
    <figure className={`club-banner ${ready ? 'ready' : ''}`}>
      <img src={banner.src} alt={t(banner.alt)}
        onLoad={() => setReady(true)} onError={() => setReady(false)} />
    </figure>
  )
}

/* Member portrait, falling back to an initial monogram when there is no photo
   (or it fails to load) — the same tile anyone who'd rather not appear gets. */
function Avatar({ member }) {
  const { t } = useApp()
  const [failed, setFailed] = useState(false)
  const name = t(member.name)
  if (!member.photo || failed) {
    return <span className="club-avatar mono" aria-hidden>{name.trim().charAt(0)}</span>
  }
  return (
    <img className="club-avatar" src={member.photo} alt={name} loading="lazy"
      onError={() => setFailed(true)} />
  )
}

/* One season on the timeline — pulls title/cover from the books registry. */
function Season({ season }) {
  const { t } = useApp()
  const book = getBook(season.bookId)
  if (!book) return null
  const statusLabel = {
    done: L('اكتمل', 'Completed'),
    current: L('جارٍ الآن', 'Reading now'),
    planned: L('قادم', 'Upcoming'),
  }[season.status]

  return (
    <li className={`season season-${season.status}`}>
      <div className="season-dot" aria-hidden />
      <div className="season-body card">
        <div className="season-cover">
          <img src={t(book.cover)} alt={t(book.title)} loading="lazy"
            onError={(e) => { e.currentTarget.style.opacity = 0 }} />
        </div>
        <div className="season-info">
          <span className={`pill season-pill ${season.status}`}>{t(statusLabel)}</span>
          <h3>{t(book.title)}</h3>
          <span className="season-author">{t(L('تأليف', 'by'))} {t(book.author)}</span>
          {(season.start || season.end) && (
            <p className="season-dates">
              📅 {t(season.start)}{season.end ? ` — ${t(season.end)}` : ''}
            </p>
          )}
          {!season.start && (
            <p className="season-dates muted">
              📅 {t(L('المواعيد تُعلَن قريباً', 'Dates to be announced'))}
            </p>
          )}
          {season.note && <p className="season-note">{t(season.note)}</p>}
          <Link className="season-open" to={`/book/${book.id}`}>
            {t(ui.actions.openBook)} →
          </Link>
        </div>
      </div>
    </li>
  )
}

export default function About() {
  const { t } = useApp()
  const stats = clubStats()

  return (
    <div className="prose-page club-page">
      <span className="pill">{t(ui.nav.about)}</span>
      <h1>{t(L('عن نادي «رُقعة»', 'About the Ruqʿa Club'))}</h1>
      <p className="club-lead">{t(club.intro)}</p>

      <ClubBanner banner={club.banner} />

      <div className="club-stats">
        <Stat n={stats.books} label={L('كتب', 'books')} />
        <Stat n={stats.sections} label={L('قسماً', 'sections')} />
        <Stat n={stats.studies} label={L('دراسة', 'studies')} />
        <Stat n={stats.interactives} label={L('شكلاً تفاعلياً', 'interactives')} />
      </div>

      <h2>{t(L('لماذا «رُقعة»؟', 'Why “Ruqʿa”?'))}</h2>
      <p>{t(club.nameStory)}</p>

      <h2>{t(L('مواسمنا', 'Our seasons'))}</h2>
      <ol className="season-list">
        {club.seasons.map((s) => <Season key={s.bookId} season={s} />)}
      </ol>

      <h2>{t(L('كيف نعمل', 'How we work'))}</h2>
      <ul>
        {club.howWeWork.map((item, i) => <li key={i}>{t(item)}</li>)}
      </ul>

      {club.reach && <WorldReach />}

      {club.gallery.length > 0 && (
        <>
          <h2>{t(L('من الجلسات', 'From our sessions'))}</h2>
          <div className="club-gallery">
            {club.gallery.map((g, i) => (
              <figure key={i} className="club-shot">
                <img src={g.src} alt={t(g.caption) || ''} loading="lazy"
                  onError={(e) => { e.currentTarget.closest('figure').style.display = 'none' }} />
                <figcaption>
                  {g.date && <b>{t(g.date)}</b>}
                  {g.caption && <span>{t(g.caption)}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}

      {club.members.length > 0 && (
        <>
          <h2>{t(L('أعضاء النادي', 'Club members'))}</h2>
          <div className="club-members">
            {club.members.map((m, i) => (
              <div key={i} className="club-member">
                <Avatar member={m} />
                <strong>{t(m.name)}</strong>
                {m.line && <span className="club-member-line">{t(m.line)}</span>}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="callout key club-cta">
        <span className="callout-icon" aria-hidden>📖</span>
        <div>
          <strong>{t(L('تريد أن تبدأ؟', 'Want to jump in?'))}</strong>
          <p>{t(L(
            'كلّ كتابٍ هنا قائمٌ بذاته — افتح أيّ كتابٍ وابدأ من «ابدأ هنا»، أو جرّب الدراسات كلعبة تخمين.',
            'Every book here stands on its own — open any book and start from “Start here”, or try the studies as a guessing game.'
          ))}</p>
          <div className="club-cta-actions">
            <Link className="btn primary" to="/books">{t(ui.labels.allBooks)} →</Link>
          </div>
        </div>
      </div>

      <p className="muted">{t(ui.footer.note)}</p>
    </div>
  )
}

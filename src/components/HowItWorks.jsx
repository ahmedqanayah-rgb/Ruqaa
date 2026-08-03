import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { books } from '../data/books.js'
import { club } from '../data/club.js'

const L = (ar, en) => ({ ar, en })

/*
 * "How this works" — the answer to a first-timer's actual first question.
 *
 * Home used to be hero → book carousel → "ask me one", and the words that
 * describe what this site *is* — quiz, games, seven-day challenge, personal
 * assessment — appeared nowhere on it. The numbers that say the same thing
 * (183 studies, 29 interactive figures) live on the About page, four screens
 * into something a stranger has no reason to open. So the site's whole
 * differentiator, that it is a thing you do rather than a summary you read,
 * was invisible at the moment of first contact. See PLAN-onboarding.md §3.
 *
 * It is permanent, ordinary content on purpose. There is no localStorage in
 * this project (a hard rule), so nothing dismissible can ever remember it was
 * dismissed — a welcome tour would return on every refresh, forever. A strip
 * that is simply always there costs a returning member one scroll and doubles
 * as a launcher.
 *
 * Every card links to a real example rather than to an explanation, and each
 * one is derived from the books registry rather than hard-coded, so a card
 * disappears rather than dead-links if a book stops offering that thing.
 */
export default function HowItWorks() {
  const { t } = useApp()

  // Same "current season" rule as the Home hero, so the two can't drift.
  const currentId = club.seasons?.find((s) => s.status === 'current')?.bookId
  const featured = books.find((b) => b.id === currentId) || books[0]
  if (!featured) return null

  // Reading order is what `groups` shows, not registry order.
  const ordered = featured.groups ? featured.groups.flatMap((g) => g.slugs) : featured.sections.map((s) => s.slug)
  const firstSlug = ordered.find((sl) => featured.sections.some((s) => s.slug === sl))

  // Find a book that actually offers each kind — the featured one first.
  const withKind = (kind) => {
    const search = [featured, ...books.filter((b) => b.id !== featured.id)]
    for (const b of search) {
      const s = b.sections.find((x) => x.kind === kind)
      if (s) return `/book/${b.id}/${s.slug}`
    }
    return null
  }

  const cards = [
    firstSlug && {
      icon: '📖',
      verb: L('اقرأ', 'Read'),
      line: L('فصولٌ قصيرة، كلٌّ منها دقيقتان إلى خمس.', 'Short chapters, two to five minutes each.'),
      to: `/book/${featured.id}/${firstSlug}`,
    },
    withKind('focus-lab') && {
      icon: '🧪',
      verb: L('جرّب', 'Try'),
      line: L('أشكالٌ تفاعلية وسبع ألعابٍ تُريك انتباهك وهو يعمل.', 'Interactive figures and seven games that show your attention at work.'),
      to: withKind('focus-lab'),
    },
    withKind('quiz') && {
      icon: '❓',
      verb: L('اختبر', 'Test'),
      line: L('دراسات الكتاب كلعبة تخمين — احزر النتيجة قبل أن تراها.', 'The books’ studies as a guessing game — call the result before you see it.'),
      to: withKind('quiz'),
    },
    withKind('challenge') && {
      icon: '🌱',
      verb: L('عِشْ', 'Live it'),
      line: L('تحدّي سبعة أيام: تجربةٌ صغيرة واحدة كلّ يوم.', 'A seven-day challenge: one small experiment a day.'),
      to: withKind('challenge'),
    },
  ].filter(Boolean)

  if (!cards.length) return null

  return (
    <section className="how-section">
      <h2>{t(L('كيف يعمل هذا الموقع؟', 'How this works'))}</h2>
      <p className="how-lead">
        {t(L('لسنا ملخّصاً يُقرأ ويُنسى — نقرأ الكتاب، ثمّ نجرّبه على أنفسنا.',
             'Not a summary you read and forget — we read the book, then try it on ourselves.'))}
      </p>
      <div className="how-grid">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="how-card card">
            <span className="how-icon" aria-hidden>{c.icon}</span>
            <span className="how-verb">{t(c.verb)}</span>
            <span className="how-line">{t(c.line)}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

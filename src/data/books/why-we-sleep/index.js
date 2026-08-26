/*
 * The "Why We Sleep" book module — fully self-contained. To add a new book,
 * create a sibling folder under data/books/<slug>/ with the same shape and
 * register it in ../../books.js.
 *
 * THREE TOP-LEVEL TABS (2026-08-24). The book was nineteen sidebar entries; it
 * is now «المؤلّف والمترجم», «مراجعة الكتاب», and «أنشطة إضافية».
 *
 * The nine chapters live INSIDE «مراجعة الكتاب» as four collapsible headings
 * (a `tabs` block — the name is historical, see below), folded by topic rather
 * than left one chapter per heading:
 *
 *   آلية النوم            ← mechanism + النوم عبر مراحل العمر + نوم الحيوانات
 *   REM والأحلام          ← rem + الأحلام
 *   النوم العميق والذاكرة  ← nrem + النوم والذاكرة
 *   النوم والصحّة          ← health, and the Guzey fact-check appended to it
 *
 * Each folded-in chapter keeps its own `h` heading inside the panel, so nothing
 * is silently welded together — you can still see where one ends.
 *
 * THE BLOCK TYPE IS STILL CALLED `tabs`, and it renders no tabs. It was a
 * segmented bar for a day; every book's data uses the name, so the name stayed
 * and only the presentation changed. components/Collapsible.jsx is what draws
 * it, and the same component draws the activities tab — one disclosure idiom.
 *
 * WHY A HEADING STILL HAS AN ADDRESS. Every panel carries an `id` and the open
 * one lives in `?open=`. These chapters were routes until today; without it,
 * every link to one — the cross-book connections, the in-content cards in the
 * other book, a search hit — would drop the reader on a page of shut headings.
 * Deep links are `…/review?open=rem`.
 *
 * Removed earlier the same day: the summary, the 7-day challenge, the
 * session-materials section, and «الكتاب في الميزان» as a section (its
 * corrections live in the health panel, against the claims they correct).
 * Myths + shocking facts became the «خرافة أم حقيقة؟» game. Everything is
 * recoverable from git history.
 */
import { author } from './author.js'
import { translatorSection } from '../../translator.js'
import { mechanism } from './sections-1.js'
import { rem, nrem, memory } from './sections-2.js'
import { health, lifespan, dreams, animal, characters } from './sections-3.js'
import { verdict, scrutiny } from './reception.js'
import { mythOrFact } from './mythOrFact.js'
import { studies, interestOrder } from './studies.js'
import { QUESTIONS, TIPS, GOOD_TIP } from './assessment.js'

const L = (ar, en) => ({ ar, en })

/* Fold chapters into one panel, each keeping a heading of its own title so the
   seam stays visible. `base` leads; the rest follow in the order given. */
const fold = (base, ...rest) => [
  ...base.blocks,
  ...rest.flatMap((s) => [{ type: 'h', text: s.title }, ...s.blocks]),
]

const review = {
  slug: 'review',
  icon: '📖',
  title: L('مراجعة الكتاب', 'The Book'),
  lead: L(
    'الكتاب كلّه تحت أربعة عناوين: كيف يعمل النوم، ونوم الأحلام، والنوم العميق والذاكرة، وما يفعله النوم بصحّتك.',
    'The whole book under four headings: how sleep works, dreaming sleep, deep sleep and memory, and what sleep does to your health.'
  ),
  blocks: [
    { type: 'tabs', panels: [
      { id: 'mechanism', title: L('آلية النوم', 'How sleep works'),
        blocks: fold(mechanism, lifespan, animal) },
      { id: 'rem', title: L('نوم الأحلام (REM)', 'Dreaming sleep (REM)'),
        blocks: fold(rem, dreams) },
      { id: 'nrem', title: L('النوم العميق والذاكرة', 'Deep sleep & memory'),
        blocks: fold(nrem, memory) },
      /* The fact-check that «الكتاب في الميزان» used to hold goes on the END of
         this panel and nowhere else: this is the panel that makes the two
         claims Guzey corrects — the cancer line and the linear
         sleep-and-lifespan claim. A correction filed away from the claim it
         corrects is a correction nobody reads. */
      { id: 'health', title: L('النوم والصحّة', 'Sleep & health'),
        blocks: [...health.blocks, ...scrutiny] },
    ] },
  ],
}

/* The author and the translator in ONE tab, one collapsible heading each. Two
   sidebar entries for "who made this book" was one more than the idea deserves,
   and the translator is the reason this club can read it at all — pairing them
   says so. Both keep their own blocks verbatim; nothing was rewritten. */
const translator = translatorSection({ titleAr: 'لماذا ننام', titleEn: 'Why We Sleep', yearAr: '٢٠١٩' })
const people = {
  slug: 'author',
  icon: '✍️',
  title: L('المؤلّف والمترجم', 'Author & Translator'),
  lead: L(
    'ماثيو ووكر الذي كتب الكتاب، والحارث النبهان الذي نقله إلى العربية — كلاهما هنا.',
    'Matthew Walker, who wrote the book, and Al-Harith Al-Nabhan, who brought it into Arabic — both here.'
  ),
  blocks: [
    { type: 'tabs', panels: [
      { id: 'author', title: L('المؤلّف', 'The author'), blocks: author.blocks },
      { id: 'translator', title: L('المترجم', 'The translator'), blocks: translator.blocks },
    ] },
  ],
}

/* «أنشطة إضافية» — ONE tab, one collapsible heading per activity.
   These were four sidebar entries. They are `parts` of a single section now,
   drawn by the same components/Collapsible.jsx the chapters use. Each part keeps
   the `kind` it had as a section, so `Activity` in BookSection renders it exactly
   as before and `findByKind` in data/books.js can still locate it for the
   landing's chips — nothing may look an activity up as a section any more. */
const activities = {
  slug: 'activities',
  kind: 'activities',
  icon: '🎯',
  title: L('أنشطة إضافية', 'Extra activities'),
  lead: L(
    'كلّ ما تفعله بعد القراءة في صفحةٍ واحدة: قيّم نومك، خمّن نتائج الدراسات، العب «خرافة أم حقيقة؟»، وتعرّف على شخصيات الكتاب.',
    'Everything you do after reading, on one page: assess your sleep, guess the studies, play “Myth or Fact?”, and meet the book’s people.'
  ),
  parts: [
    {
      id: 'assessment',
      kind: 'assessment',
      icon: '📝',
      title: L('تقييم النوم', 'Sleep Assessment'),
      lead: L(
        'قيّم نومك واحصل على نصائح شخصية — كلّ شيء يجري في متصفّحك.',
        'Assess your own sleep and get personalized tips — all in your browser.'
      ),
      assessment: { questions: QUESTIONS, tips: TIPS, goodTip: GOOD_TIP },
    },
    {
      id: 'studies',
      kind: 'quiz',
      icon: '🔬',
      title: L('الدراسات والتجارب', 'Studies & Experiments'),
      lead: L(
        'كلّ دراسات الكتاب الـ١٢٢ كلعبة تخمين: اقرأ المنهجية، خمّن النتيجة، ثم اكشفها واقرأ النقاش!',
        'All 122 of the book’s studies as a guessing game: read the methodology, predict the result, then reveal it and read the discussion!'
      ),
      studies,
      interestOrder,
    },
    {
      id: 'myth-or-fact',
      kind: 'myth-game',
      icon: '🎲',
      title: L('خرافة أم حقيقة؟', 'Myth or Fact?'),
      lead: L(
        'عبارةٌ واحدة في كلّ مرّة — قرّر: خرافةٌ شائعة أم حقيقةٌ من الكتاب؟ ثم اقرأ لماذا.',
        'One statement at a time — decide: a common myth, or a fact from the book? Then read why.'
      ),
      items: mythOrFact,
    },
    { id: 'characters', icon: characters.icon, title: characters.title,
      lead: characters.lead, blocks: characters.blocks },
  ],
}

export const whyWeSleep = {
  id: 'why-we-sleep',
  title: L('لماذا ننام', 'Why We Sleep'),
  subtitle: L('اكتشف طاقة النوم والأحلام', 'Unlocking the Power of Sleep and Dreams'),
  author: L('ماثيو ووكر', 'Matthew Walker'),
  authorPhoto: './images/characters/matthew-walker.webp',
  cover: L('./images/cover-ar.jpg', './images/cover-en.webp'),
  blurb: L(
    'كتابٌ يثبت أن النوم أقوى وأرخص دواءٍ وقائيّ نملكه — يعيد كلّ ليلةٍ ضبط الدماغ والجسد والعاطفة.',
    'A book proving sleep is the most powerful, cheapest preventive medicine we have — resetting brain, body and emotion every night.'
  ),
  accent: 'var(--accent)',
  verdict,
  /* `{ slug }` is a solo entry — a top-level tab with no group header. See
     entrySlugs in data/books.js. */
  groups: [
    { slug: 'author' },
    { slug: 'review' },
    { slug: 'activities' },
  ],
  sections: [
    people,
    review,
    activities,
  ],
}

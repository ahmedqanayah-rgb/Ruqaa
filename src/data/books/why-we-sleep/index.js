/*
 * The "Why We Sleep" book module — fully self-contained. To add a new book,
 * create a sibling folder under data/books/<slug>/ with the same shape and
 * register it in ../../books.js.
 *
 * SIMPLIFIED 2026-08-24. Five sections were removed outright and two pairs were
 * merged; the whole book is now nine tabs instead of nineteen. What went, and
 * where anything worth keeping went with it:
 *
 *   «عن المؤلّف» + «عن المترجم»  → one tab, two panels inside it (`tabs` block).
 *   «الملخّص العام»               → removed. It restated the sections after it.
 *   «المغالطات» + «الحقائق»       → «خرافة أم حقيقة؟», a game (mythOrFact.js).
 *   «أسبوعٌ مع الكتاب»            → removed.
 *   «مواد الجلسة والنقاش»         → removed; the site itself is that material.
 *   «الكتاب في الميزان»           → removed as a section, but its substance is
 *     NOT gone: Guzey's four corrections and Walker's reply now sit in «النوم
 *     والصحّة» as a `debate` block with its sources, because that is the section
 *     making the claims they correct. Deleting them outright would have left the
 *     site asserting contested claims as settled. See sections-3.js.
 *
 * Everything removed is recoverable from git history (before 2026-08-24).
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

/* «النوم والصحّة» carries the fact-check that «الكتاب في الميزان» used to hold.
   It goes HERE and not somewhere neutral because this is the section that makes
   the two claims Guzey corrects — the cancer line and the linear
   sleep-and-lifespan claim. A correction filed away from the claim it corrects
   is a correction nobody reads. */
const healthChecked = { ...health, blocks: [...health.blocks, ...scrutiny] }

/* The author and the translator in one tab, switched inside it. Two sidebar
   entries for "who made this book" was one more than the idea deserves, and the
   translator is the reason this club can read it at all — pairing them says so.
   Both panels keep their own blocks verbatim; nothing was rewritten. */
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
      { title: L('المؤلّف', 'The author'), blocks: author.blocks },
      { title: L('المترجم', 'The translator'), blocks: translator.blocks },
    ] },
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
    { title: L('علم النوم', 'The science of sleep'), slugs: ['mechanism', 'rem', 'nrem', 'memory'] },
    { title: L('النوم وحياتك', 'Sleep and your life'), slugs: ['health', 'lifespan', 'dreams', 'animal'] },
    { title: L('جرّب بنفسك', 'Try it yourself'), slugs: ['assessment', 'studies', 'myth-or-fact'] },
    { title: L('مراجع النادي', 'Club reference'), slugs: ['characters'] },
  ],
  sections: [
    people,
    mechanism,
    rem,
    nrem,
    memory,
    healthChecked,
    lifespan,
    dreams,
    animal,
    characters,
    {
      slug: 'assessment',
      kind: 'assessment',
      icon: '📝',
      title: L('تقييم النوم', 'Sleep Assessment'),
      lead: L(
        'بعد أن عرفت مبادئ الكتاب، قيّم نومك واحصل على نصائح شخصية — كلّ شيء يجري في متصفّحك.',
        'Now that you know the book’s principles, assess your own sleep and get personalized tips — all in your browser.'
      ),
      assessment: { questions: QUESTIONS, tips: TIPS, goodTip: GOOD_TIP },
    },
    {
      slug: 'studies',
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
      slug: 'myth-or-fact',
      kind: 'myth-game',
      icon: '🎲',
      title: L('خرافة أم حقيقة؟', 'Myth or Fact?'),
      lead: L(
        'عبارةٌ واحدة في كلّ مرّة — قرّر: خرافةٌ شائعة أم حقيقةٌ من الكتاب؟ ثم اقرأ لماذا.',
        'One statement at a time — decide: a common myth, or a fact from the book? Then read why.'
      ),
      items: mythOrFact,
    },
  ],
}

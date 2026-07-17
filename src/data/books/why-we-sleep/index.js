/*
 * The "Why We Sleep" book module — fully self-contained. To add a new book,
 * create a sibling folder under data/books/<slug>/ with the same shape and
 * register it in ../../books.js.
 */
import { author } from './author.js'
import { summary, mechanism } from './sections-1.js'
import { rem, nrem, memory } from './sections-2.js'
import { health, lifespan, dreams, animal, characters } from './sections-3.js'
import { shocking, myths, discussion } from './sections-4.js'
import { studies, interestOrder } from './studies.js'
import { QUESTIONS, TIPS, GOOD_TIP } from './assessment.js'

const L = (ar, en) => ({ ar, en })

export const whyWeSleep = {
  id: 'why-we-sleep',
  title: L('لماذا ننام', 'Why We Sleep'),
  subtitle: L('اكتشف طاقة النوم والأحلام', 'Unlocking the Power of Sleep and Dreams'),
  author: L('ماثيو ووكر', 'Matthew Walker'),
  authorPhoto: './images/characters/matthew-walker.jpg',
  cover: L('./images/cover-ar.jpg', './images/cover-en.webp'),
  blurb: L(
    'كتابٌ يثبت أن النوم أقوى وأرخص دواءٍ وقائيّ نملكه — يعيد كلّ ليلةٍ ضبط الدماغ والجسد والعاطفة.',
    'A book proving sleep is the most powerful, cheapest preventive medicine we have — resetting brain, body and emotion every night.'
  ),
  accent: 'var(--accent)',
  groups: [
    { title: L('ابدأ هنا', 'Start here'), slugs: ['author', 'summary'] },
    { title: L('علم النوم', 'The science of sleep'), slugs: ['mechanism', 'rem', 'nrem', 'memory'] },
    { title: L('النوم وحياتك', 'Sleep and your life'), slugs: ['health', 'lifespan', 'dreams', 'animal'] },
    { title: L('جرّب بنفسك', 'Try it yourself'), slugs: ['assessment', 'studies'] },
    { title: L('مراجع النادي', 'Club reference'), slugs: ['characters', 'shocking', 'myths', 'discussion'] },
  ],
  sections: [
    author,
    summary,
    mechanism,
    rem,
    nrem,
    memory,
    health,
    lifespan,
    dreams,
    animal,
    characters,
    shocking,
    myths,
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
    discussion,
  ],
}

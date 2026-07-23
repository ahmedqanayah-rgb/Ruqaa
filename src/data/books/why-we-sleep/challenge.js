/*
 * "A week with the book" — seven days of small, concrete experiments drawn from
 * the book's own advice. This is the site's answer to its own tagline: we read
 * the book, then we live it.
 *
 * Every `to` must be a real section slug in this book — the day links to the
 * chapter that explains why the habit works.
 */
const L = (ar, en) => ({ ar, en })

export const challenge = {
  slug: 'challenge',
  kind: 'challenge',
  icon: '🗓️',
  title: L('أسبوعٌ مع الكتاب', 'A week with the book'),
  lead: L(
    'سبعة أيام، تجربةٌ صغيرةٌ كلّ يوم. لا تحتاج إلى تغيير حياتك — فقط أن تجرّب فكرةً واحدةً من الكتاب وترى أثرها بنفسك.',
    'Seven days, one small experiment each. You don’t need to change your life — just test one idea from the book and see its effect for yourself.'
  ),
  intro: L(
    'رتّبنا الأيّام من الأسهل إلى الأصعب، والأوّل أهمّها. جرّب واحداً في اليوم، واحتفظ بما ينفعك.',
    'The days run from easiest to hardest, and the first matters most. Try one a day, and keep whatever works for you.'
  ),
  days: [
    { n: 1, to: 'mechanism',
      title: L('ثبّت موعد استيقاظك', 'Fix your wake-up time'),
      task: L('استيقظ في الموعد نفسه كلّ يوم هذا الأسبوع — بما في ذلك العطلة، وبفارق نصف ساعةٍ على الأكثر.',
              'Wake at the same time every day this week — weekend included, within half an hour.'),
      why: L('ساعتك البيولوجية تضبط نفسها على موعد الاستيقاظ لا موعد النوم. هذه أقوى عادةٍ منفردة في الكتاب كلّه.',
             'Your body clock anchors to when you wake, not when you go to bed. This is the single most powerful habit in the whole book.') },

    { n: 2, to: 'mechanism',
      title: L('اخرج إلى ضوء الصباح', 'Get into morning light'),
      task: L('اخرج إلى ضوء النهار عشر دقائق خلال الساعة الأولى بعد الاستيقاظ.',
              'Get ten minutes of daylight within an hour of waking.'),
      why: L('الضوء هو الإشارة التي تضبط النواة فوق التصالبية (Suprachiasmatic Nucleus) — ساعتك المركزية. ضوء الصباح يقدّم نومك مساءً.',
             'Light is the signal that sets the Suprachiasmatic Nucleus — your master clock. Morning light pulls your sleep earlier at night.') },

    { n: 3, to: 'mechanism',
      title: L('احظر الكافيين بعد الظهر', 'Put a curfew on caffeine'),
      task: L('لا قهوة ولا شاي ولا مشروبات طاقة بعد الثانية ظهراً.',
              'No coffee, tea or energy drinks after 2pm.'),
      why: L('عمر النصف للكافيين خمس إلى ست ساعات — فنصف فنجان الرابعة عصراً ما زال يعمل في دمك عند العاشرة ليلاً، يحجب الأدينوسين ويؤخّر النوم.',
             'Caffeine’s half-life is five to six hours — so half of your 4pm cup is still working at 10pm, blocking adenosine and holding sleep off.') },

    { n: 4, to: 'mechanism',
      title: L('برّد الغرفة وأعتِمها', 'Make the room cool and dark'),
      task: L('اخفض حرارة غرفتك نحو ١٨ درجة، وأطفئ كلّ مصدر ضوءٍ صغير.',
              'Bring the room to around 18°C and kill every small light source.'),
      why: L('جسمك يحتاج أن تنخفض حرارته الداخلية قليلاً كي يبدأ النوم — الغرفة الباردة تسهّل ذلك بدل أن تعانده.',
             'Your body needs its core temperature to drop a little before sleep can start — a cool room helps that instead of fighting it.') },

    { n: 5, to: 'health',
      title: L('ساعةٌ بلا شاشات', 'A screen-free hour'),
      task: L('أبعد الهاتف والحاسوب والتلفاز آخر ساعةٍ قبل النوم.',
              'Put phone, laptop and TV away for the last hour before bed.'),
      why: L('الضوء المنبعث من الشاشات يؤخّر إفراز الميلاتونين، فيتأخّر شعورك بالنعاس — ثم تلوم نفسك على «الأرق».',
             'Screen light delays melatonin, so sleepiness arrives later — and then you blame yourself for “insomnia.”') },

    { n: 6, to: 'nrem',
      title: L('روتين تهدئةٍ ثابت', 'A steady wind-down'),
      task: L('اصنع طقساً هادئاً نصف ساعةٍ قبل النوم وكرّره كما هو: إضاءةٌ خافتة، وقراءةٌ ورقية، وترتيبٌ لصباح الغد.',
              'Build a calm half-hour ritual and repeat it identically: low light, a paper book, tomorrow’s morning sorted.'),
      why: L('النوم ليس مفتاحاً يُطفأ بل منحدرٌ تنزله؛ والتكرار يعلّم دماغك أن هذه الإشارة تعني: حان الوقت.',
             'Sleep isn’t a switch you flip but a slope you walk down; repetition teaches your brain that this signal means: it’s time.') },

    { n: 7, to: 'assessment',
      title: L('احمِ نافذة الثماني ساعات', 'Protect the eight-hour window'),
      task: L('خصّص ثماني ساعاتٍ *في السرير* لا سبعاً — ثم أعد تقييم النوم في الموقع وقارن نتيجتك بأوّل الأسبوع.',
              'Set aside eight hours *in bed*, not seven — then retake the sleep assessment here and compare with the start of the week.'),
      why: L('من ينوي سبع ساعاتٍ ينام ستّاً. النيّة تحتاج هامشاً — والتقييم يريك ما تغيّر في أسبوع.',
             'Someone who plans seven hours sleeps six. Intent needs margin — and the assessment shows you what a week changed.') },
  ],
  closing: L(
    'لا تحاول الاحتفاظ بالسبعة كلّها. اختر ما لاحظتَ أثره فعلاً وثبّته، فالعادة الواحدة الباقية أنفع من سبعٍ تسقط في أسبوعين.',
    'Don’t try to keep all seven. Pick the ones whose effect you actually noticed and make those stick — one habit that lasts beats seven that collapse in a fortnight.'
  ),
}

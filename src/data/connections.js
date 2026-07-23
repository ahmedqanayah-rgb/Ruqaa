/*
 * Where the club's books meet.
 *
 * This is the one thing a multi-book club can write that no single-book summary
 * can: original synthesis across seasons. It is the club's own analysis — not a
 * summary of either book — so there is nothing to source, but keep it honest:
 * each side must genuinely say what we claim it says, and every `slug` must
 * exist in that book's sections (they are real links).
 *
 * Adding a third book? Add themes here; nothing else needs to change.
 */
const L = (ar, en) => ({ ar, en })

export const connections = {
  title: L('كتابانا يتحدّثان', 'Where our books meet'),
  lead: L(
    'قرأنا «لماذا ننام» ثم «تركيزنا المسلوب»، فاكتشفنا أنهما يرويان القصّة نفسها من طرفين. هذه المواضع التي يلتقيان فيها — وهي أفضل ما في قراءة كتابين معاً.',
    'We read “Why We Sleep,” then “Stolen Focus,” and found they tell the same story from two ends. These are the places they meet — and they are the best thing about reading two books together.'
  ),
  items: [
    {
      icon: '😴',
      theme: L('كتابنا الأوّل هو السبب الثالث في كتابنا الثاني', 'Our first book is the third cause in our second'),
      a: { bookId: 'why-we-sleep', slug: 'health', says: L(
        'ليلةٌ واحدةٌ ناقصة تكفي لتقويض الانتباه والذاكرة والمزاج في اليوم التالي. النوم ليس راحةً بل صيانةٌ ليلية للدماغ.',
        'A single short night is enough to undercut attention, memory and mood the next day. Sleep isn’t rest — it’s nightly maintenance for the brain.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'exhaustion', says: L(
        'يضع هاري الإنهاك وقلّة النوم **ثالثَ** الأسباب الاثني عشر: البقاء مستيقظاً ١٩ ساعة يترك أداءك المعرفيّ عند حدّ السُّكر القانونيّ للقيادة.',
        'Hari makes exhaustion and lost sleep the **third** of the twelve causes: 19 hours awake leaves your cognition at the legal drink-driving limit.'
      ) },
      synthesis: L(
        'موسمنا الأوّل لم يكن موسماً منفصلاً — كان فصلاً كاملاً داخل موسمنا الثاني. مَن قرأ «لماذا ننام» يملك تفصيل السبب الثالث كاملاً، بينما يمرّ عليه قارئ «تركيزنا المسلوب» في صفحات.',
        'Our first season wasn’t a separate season — it was one whole chapter inside our second. Anyone who read “Why We Sleep” holds the third cause in full detail, where a reader of “Stolen Focus” passes it in a few pages.'
      ),
    },
    {
      icon: '📖',
      theme: L('كلاهما عن العمق: ليلاً ونهاراً', 'Both are about depth — by night and by day'),
      a: { bookId: 'why-we-sleep', slug: 'memory', says: L(
        'النوم يثبّت ما تعلّمته ويربطه بما تعرفه — الدماغ ينسج المعنى وأنت نائم.',
        'Sleep consolidates what you learned and links it to what you already knew — the brain weaves meaning while you sleep.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'reading-mindwandering', says: L(
        'انهيار القراءة المتواصلة وتعطيل شرود الذهن يحرمان العقل من المادّة المتّصلة ومن الوقت الفارغ الذي يحتاجه ليفكّر.',
        'The collapse of sustained reading and the disruption of mind-wandering deprive the mind of connected material — and of the empty time it needs to think.'
      ) },
      synthesis: L(
        'الأوّل يقول إن الدماغ يبني المعنى ليلاً؛ والثاني يقول إن النهار لم يعد يعطيه مادّةً متّصلةً يبني منها. عمقُ نومك وعمقُ قراءتك مشكلةٌ واحدة بوجهين.',
        'The first says the brain builds meaning at night; the second says the day no longer hands it connected material to build from. The depth of your sleep and the depth of your reading are one problem with two faces.'
      ),
    },
    {
      icon: '📱',
      theme: L('الشاشة تسرق نهارك وليلك', 'The screen takes your day and your night'),
      a: { bookId: 'why-we-sleep', slug: 'mechanism', says: L(
        'الضوء — وخاصّةً الأزرق — يؤخّر إفراز الميلاتونين ويزيح ساعتك البيولوجية، فتنام متأخّراً وأقلّ.',
        'Light — blue light especially — delays melatonin and shifts your body clock, so you sleep later and less.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'big-tech', says: L(
        'التطبيقات مصمَّمة بمكافآتٍ متغيّرة مستعارةٍ من علم الاشتراط، لتُبقيك على الشاشة أطول ممّا نويت.',
        'Apps are built on variable rewards borrowed from conditioning research, to keep you on the screen longer than you meant to be.'
      ) },
      synthesis: L(
        'وهنا تُغلق الحلقة: الشاشة تأخذ انتباهك نهاراً، ثم تأخذ نومك ليلاً، فتستيقظ بانتباهٍ أضعف — ومقاومةٍ أقلّ للشاشة نفسها. لا يكفي أن تعالج طرفاً واحداً.',
        'And here the loop closes: the screen takes your attention by day, then your sleep by night, so you wake with weaker attention — and less resistance to the same screen. Treating one end alone won’t do.'
      ),
    },
    {
      icon: '🧒',
      theme: L('نلوم الطفل على بيئةٍ صمّمها الكبار', 'We blame the child for an environment adults designed'),
      a: { bookId: 'why-we-sleep', slug: 'shocking', says: L(
        'مواعيد بدء المدارس المبكّرة تصادم بيولوجيا المراهق التي تدفع نومه إلى وقتٍ متأخّر — ثم نصف المراهق بالكسل.',
        'Early school start times collide with a teenager’s biology, which pushes sleep later — and then we call the teenager lazy.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'childhood', says: L(
        'حبسُ الأطفال في البيوت وحرمانهم اللعب الحرّ يسلبهم المساحة التي يتعلّمون فيها الانتباه أصلاً.',
        'Confining children indoors and denying them free play takes away the very space in which attention is learned.'
      ) },
      synthesis: L(
        'الكتابان يلتقيان عند المفارقة نفسها: نصمّم للطفل بيئةً تعاكس طبيعته، ثم نشخّص النتيجة كعيبٍ فيه.',
        'The two books meet at the same irony: we design an environment that works against a child’s nature, then diagnose the result as a flaw in the child.'
      ),
    },
    {
      icon: '⚠️',
      theme: L('قبل اللافتة، اسأل عن البيئة', 'Before the label, ask about the environment'),
      a: { bookId: 'why-we-sleep', slug: 'studies', says: L(
        'من دراسات الكتاب ما يربط قلّة النوم عند الأطفال بأعراضٍ تشبه فرط الحركة وتشتّت الانتباه.',
        'Among the book’s studies are those linking children’s lost sleep to symptoms resembling ADHD.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'adhd', says: L(
        'يتساءل هاري عن تصاعد التشخيص، ويقترح النظر في البيئة قبل الاكتفاء بالتفسير الدوائي.',
        'Hari questions the rising rate of diagnosis and urges looking at the environment before settling on a pharmacological account.'
      ) },
      synthesis: L(
        'سؤالٌ مشترك يستحقّ النقاش — **لكن انتبه**: هذا ليس نصيحةً طبية، ولا دعوةً لأحدٍ أن يوقف علاجه. النقّاد أخذوا على «تركيزنا المسلوب» تحديداً خفّته في هذا الموضع، وشرحنا ذلك في «الكتاب في الميزان».',
        'A shared question worth discussing — **but note**: this is not medical advice, and not a reason for anyone to stop treatment. Critics faulted “Stolen Focus” precisely here, which we set out in “The book under scrutiny.”'
      ),
      caution: true,
    },
  ],
}

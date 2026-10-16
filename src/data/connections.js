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
  title: L('كتبنا تتحدّث', 'Where our books meet'),
  lead: L(
    'قرأنا «لماذا ننام» ثم «تركيزنا المسلوب»، فاكتشفنا أنهما يرويان القصّة نفسها من طرفين؛ ثم جاء «الاقتصاد كما أشرحه لابنتي» فشرح لماذا صُمّمت البيئة التي يشكو منها الكتابان على هذا النحو. هذه المواضع التي تلتقي فيها — وهي أفضل ما في قراءة الكتب معاً.',
    'We read “Why We Sleep,” then “Stolen Focus,” and found they tell the same story from two ends; then “Talking to My Daughter About the Economy” explained why the environment both books complain about was built the way it was. These are the places they meet — and they are the best thing about reading books together.'
  ),
  items: [
    {
      icon: '😴',
      theme: L('كتابنا الأوّل هو السبب الثالث في كتابنا الثاني', 'Our first book is the third cause in our second'),
      a: { bookId: 'why-we-sleep', slug: 'review?open=health', says: L(
        'ليلةٌ واحدةٌ ناقصة تكفي لتقويض الانتباه والذاكرة والمزاج في اليوم التالي. النوم ليس راحةً بل صيانةٌ ليلية للدماغ.',
        'A single short night is enough to undercut attention, memory and mood the next day. Sleep isn’t rest — it’s nightly maintenance for the brain.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'review?open=exhaustion', says: L(
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
      a: { bookId: 'why-we-sleep', slug: 'review?open=nrem', says: L(
        'النوم يثبّت ما تعلّمته ويربطه بما تعرفه — الدماغ ينسج المعنى وأنت نائم.',
        'Sleep consolidates what you learned and links it to what you already knew — the brain weaves meaning while you sleep.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'review?open=reading-mindwandering', says: L(
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
      a: { bookId: 'why-we-sleep', slug: 'review?open=mechanism', says: L(
        'الضوء — وخاصّةً الأزرق — يؤخّر إفراز الميلاتونين ويزيح ساعتك البيولوجية، فتنام متأخّراً وأقلّ.',
        'Light — blue light especially — delays melatonin and shifts your body clock, so you sleep later and less.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'review?open=big-tech', says: L(
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
      a: { bookId: 'why-we-sleep', slug: 'activities', says: L(
        'مواعيد بدء المدارس المبكّرة تصادم بيولوجيا المراهق التي تدفع نومه إلى وقتٍ متأخّر — ثم نصف المراهق بالكسل.',
        'Early school start times collide with a teenager’s biology, which pushes sleep later — and then we call the teenager lazy.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'review?open=childhood', says: L(
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
      a: { bookId: 'why-we-sleep', slug: 'activities', says: L(
        'من دراسات الكتاب ما يربط قلّة النوم عند الأطفال بأعراضٍ تشبه فرط الحركة وتشتّت الانتباه.',
        'Among the book’s studies are those linking children’s lost sleep to symptoms resembling ADHD.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'review?open=adhd', says: L(
        'يتساءل هاري عن تصاعد التشخيص، ويقترح النظر في البيئة قبل الاكتفاء بالتفسير الدوائي.',
        'Hari questions the rising rate of diagnosis and urges looking at the environment before settling on a pharmacological account.'
      ) },
      synthesis: L(
        'سؤالٌ مشترك يستحقّ النقاش — **لكن انتبه**: هذا ليس نصيحةً طبية، ولا دعوةً لأحدٍ أن يوقف علاجه. النقّاد أخذوا على «تركيزنا المسلوب» تحديداً خفّته في هذا الموضع، وشرحنا ذلك تحت فصل فرط الحركة نفسه.',
        'A shared question worth discussing — **but note**: this is not medical advice, and not a reason for anyone to stop treatment. Critics faulted “Stolen Focus” precisely here, which we set out under the ADHD chapter itself.'
      ),
      caution: true,
    },
    /* ---- the third book, against the second ---- */
    {
      icon: '🎈',
      theme: L('نلوم الفرد على ما صنعه النظام', 'We blame the person for what the system made'),
      a: { bookId: 'stolen-focus', slug: 'review?open=cruel-optimism', says: L(
        '«التفاؤل القاسي»: أن نقول لمن يغرق «تعلّم السباحة» بينما تُلقى عليه أمواجٌ صُنعت لإغراقه. لا تكفي الإرادة أمام صناعةٍ صُمّمت لهزيمتها.',
        '“Cruel optimism”: telling a drowning person to “learn to swim” while waves built to sink them keep coming. Willpower is no match for an industry designed to beat it.'
      ) },
      b: { bookId: 'talking-to-my-daughter', slug: 'review?open=oedipal-markets', says: L(
        '«منكرو البطالة» يقولون إن العاطل لم يخفّض أجره بما يكفي — وفاروفاكيس يردّ بصيد الأيل: لا يستطيع صيّادٌ واحد أن يصيد الأيل وحده، ولا عاملٌ واحد أن يخلق الطلب على عمله.',
        'The “unemployment deniers” say the jobless just haven’t cut their price enough — and Varoufakis answers with the stag hunt: no single hunter can catch the stag alone, and no single worker can create the demand for his labour.'
      ) },
      synthesis: L(
        'الكتابان ينقلان السؤال من «ما خطبي؟» إلى «ما الذي صُمّم حولي؟». واحدٌ عن انتباهك وآخر عن عملك، والنتيجة نفسها: لوم الفرد على ما لا يستطيع فردٌ أن يغيّره يعفي من صمّم البيئة.',
        'Both books move the question from “what’s wrong with me?” to “what was built around me?”. One is about your attention and one about your job, and the conclusion is the same: blaming individuals for what no individual can change lets off whoever designed the environment.'
      ),
    },
    {
      icon: '📱',
      theme: L('حين صار انتباهنا بضاعة', 'When our attention became a commodity'),
      a: { bookId: 'talking-to-my-daughter', slug: 'review?open=market-society', says: L(
        'يروي فاروفاكيس كيف انتصرت القيمة التبادلية على القيمة الاستعمالية: الأرض أوّلاً، ثم العمل، ثم البذور والجينات والأرحام المؤجَّرة.',
        'Varoufakis tells how exchange value defeated experiential value: land first, then labour, then seeds, genes and rented wombs.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'review?open=big-tech', says: L(
        'يروي هاري الفصل التالي من القصّة نفسها: التطبيقات «المجانية» تبيع انتباهك للمعلنين، ولهذا صُمّمت لتأخذ منه أكثر ما تستطيع.',
        'Hari tells the next chapter of the same story: “free” apps sell your attention to advertisers, which is why they are built to take as much of it as they can.'
      ) },
      synthesis: L(
        'التسييجات طردت الأقنان من الأرض لأن الصوف صار له سعرٌ عالميّ؛ ومنصّات اليوم «تسيّج» انتباهنا لأن له سعراً عند المعلنين. ما كان «مسرّةً» بلغة فاروفاكيس — ساعةٌ من الشرود أو القراءة — صار بضاعة.',
        'The enclosures drove serfs off the land because wool had acquired a world price; today’s platforms “enclose” our attention because advertisers will pay for it. What Varoufakis would call a good — an hour of mind-wandering, or reading — has become a commodity.'
      ),
    },
    {
      icon: '⚙️',
      theme: L('آلاتٌ وعدت بالراحة فأتعبتنا', 'Machines that promised rest and wore us out'),
      a: { bookId: 'talking-to-my-daughter', slug: 'review?open=haunted-machines', says: L(
        'كان يُفترض أن تحرّرنا الآلات من الكدح كما في «ستار تريك»، فصرنا كالهامستر على عجلته: نركض أسرع ولا نصل إلى مكان، لأن المنافسة تفرض على كلّ واحدٍ أن يجاري آخر آلة.',
        'Machines were meant to free us from toil, as in Star Trek; instead we are hamsters on a wheel, running faster and getting nowhere, because competition forces everyone to keep up with the latest machine.'
      ) },
      b: { bookId: 'stolen-focus', slug: 'review?open=stress-vigilance', says: L(
        'يرى هاري الإنهاك والتوتّر سبباً لانهيار الانتباه، ويستشهد بتجارب أسبوع العمل ذي الأيام الأربعة التي رفعت الإنتاجية بدل أن تخفضها.',
        'Hari treats exhaustion and stress as causes of the collapse of attention, and cites four-day-week trials that raised productivity rather than cutting it.'
      ) },
      synthesis: L(
        'هاري يقول إن الراحة وقود الإنتاجية لا خصمٌ منها؛ وفاروفاكيس يقول لماذا لا نحصل عليها رغم الآلات: لأن ثمار الآلات تذهب إلى من يملكها، لا إلى من تحرّر وقتهم. أسبوع الأيام الأربعة هو، بطريقةٍ ما، اقتراح فاروفاكيس مطبّقاً على الوقت بدل المال.',
        'Hari says rest is productivity’s fuel, not a deduction from it; Varoufakis says why we don’t get it despite the machines: their fruits go to whoever owns them, not to those whose time they free. A four-day week is, in a way, Varoufakis’s proposal applied to time instead of money.'
      ),
    },
    {
      icon: '✊',
      theme: L('الحلّ جماعيّ، لا فرديّ', 'The fix is collective, not personal'),
      a: { bookId: 'stolen-focus', slug: 'review?open=rebellion', says: L(
        'يختم هاري بـ«تمرّد الانتباه»: كما نظّم الناس أنفسهم ضدّ الرصاص في الوقود وضدّ ما ثقب طبقة الأوزون وانتصروا، يمكن أن ينتظموا لاستعادة انتباههم.',
        'Hari ends with an “attention rebellion”: just as people organised against lead in petrol and the chemicals tearing the ozone layer, and won, they can organise to take back their attention.'
      ) },
      b: { bookId: 'talking-to-my-daughter', slug: 'review?open=stupid-viruses', says: L(
        'يختم فاروفاكيس بنهر السلمون: لا يستطيع صيّادٌ واحد أن يصطاد أقلّ والآخرون مستمرّون، والحلّ اتّفاقٌ يُفرض — وفي النهاية ديمقراطيةٌ أصيلة لا «تسليعٌ لكلّ شيء».',
        'Varoufakis ends with the trout river: no single fisherman can fish less while the rest carry on; the answer is an enforced agreement — and in the end an authentic democracy, not “commodify everything”.'
      ) },
      synthesis: L(
        'كلا الكتابين ينتهي في المكان نفسه بعد طريقين مختلفين. لا أحد يستطيع أن يقلّ استعماله للهاتف أو صيده للسمك وحده دون أن يخسر؛ ما ينجح هو القاعدة التي تُلزم الجميع معاً. هذا، أكثر من أيّ نصيحة، ما يجمع كتب النادي الثلاثة.',
        'Both books end in the same place by different roads. Nobody can use their phone less or fish less alone without losing out; what works is the rule that binds everyone at once. That, more than any piece of advice, is what joins the club’s three books.'
      ),
    },
  ],
}

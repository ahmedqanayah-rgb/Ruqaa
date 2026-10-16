/*
 * Members' reviews of «تركيزنا المسلوب», shown on the book's landing page after
 * the club's verdict (BookSection → MemberReviews), one collapsible heading each.
 *
 * THE ARABIC IS THE MEMBER'S OWN TEXT, VERBATIM — not edited, not corrected, not
 * "aligned" with the site's spellings (Maria writes «سون ليمان» where the site
 * writes «سونه ليمان»; it stays). A review is someone's voice, and the site's
 * house style has no business in it. Only the presentation is ours: one block
 * per paragraph, and the closing questions set as a discussion callout.
 *
 * The ENGLISH is a translation made for this site, and says so on the page.
 *
 * Shape: { id, author, title, byline, translationNote, blocks }. `id` is the
 * heading's `?open=` address (search hits link to it), so keep it stable.
 */
const L = (ar, en) => ({ ar, en })

export const reviews = [
  {
    id: 'review-maria',
    author: L('ماريا', 'Maria'),
    title: L('عن انتباهنا المسلوب وأقفاصنا الخفية', 'On our stolen attention and our invisible cages'),
    byline: L('بقلم ماريا، من أعضاء نادي «رُقعة»', 'By Maria, a member of the Ruqʿa reading club'),
    translationNote: L('', 'Translated for this site from Maria’s Arabic original.'),
    blocks: [
      { type: 'p', text: L(
        'قد يظن من يقرأ عنوان هذا الكتاب أن السارق الوحيد لتركيزنا هو الهاتف، وأن الحل لا يتطلب أكثر من قليل من الانضباط. لكن الكتاب في العمق أوسع من ذلك بكثير، فهو أشبه برحلة طويلة بين العلماء والأطباء والباحثين، يكتشف فيها يوهان هاري أن ما يحدث لانتباهنا ليس فشلًا شخصيًا، ولا ضعفًا في الإرادة، ولا كسلًا، بل نتيجة بيئة كاملة تسرقه منا يومًا بعد يوم.',
        'Anyone reading this book’s title might assume that the only thief of our focus is the phone, and that the fix takes nothing more than a little discipline. But at heart the book is far broader than that. It is more like a long journey among scientists, doctors and researchers, in which Johann Hari discovers that what is happening to our attention is not a personal failure, nor weak willpower, nor laziness, but the result of an entire environment that steals it from us day after day.'
      ) },
      { type: 'p', text: L(
        'من أكثر ما لفتني في البداية السؤال الصادق الذي طرحه الباحث الدنماركي سون ليمان على نفسه حين لاحظ تراجع تركيزه: هل هو يشيخ فحسب، أم أن العالم يتغير فعلًا؟ قادته محاولة الإجابة إلى دراسة واسعة. وجدت الدراسة أن الموضوع الواحد كان يبقى ضمن المواضيع الأكثر تداولًا على تويتر نحو سبع عشرة ساعة ونصف عام 2013، ثم انخفضت المدة إلى أقل من اثنتي عشرة ساعة عام 2016. وتكرر النمط نفسه تقريبًا في غوغل وريديت، وحتى في مبيعات تذاكر السينما. والسبب بسيط ومخيف في آنٍ معًا: كلما ازداد سيل المعلومات من حولنا، قلّ الوقت الذي نمنحه لكل منها.',
        'One of the things that struck me most at the start was the honest question the Danish researcher Sune Lehmann asked himself when he noticed his focus slipping: was he simply getting older, or was the world really changing? Trying to answer it led him to a large study. It found that a single topic stayed among the most-discussed on Twitter for about seventeen and a half hours in 2013, and that this had fallen to under twelve hours by 2016. Much the same pattern repeated on Google and Reddit, and even in cinema ticket sales. The reason is simple and frightening at once: the more information pours in around us, the less time we give each piece of it.'
      ) },
      { type: 'p', text: L(
        'ثم يأتي البروفيسور إيرل ميلر ليهدم وهمًا نعيشه جميعًا، ألا وهو تعدد المهام. فالدماغ لا يحمل في الوعي أكثر من فكرة أو فكرتين في الوقت نفسه، وما نسميه تعددًا للمهام ليس إلا تنقلًا سريعًا بينها، ندفع ثمنه في كل مرة نعيد فيها تهيئة أذهاننا. أما أغلب العاملين في المكاتب، فلا يحظون بساعة واحدة متصلة دون مقاطعة طوال يوم العمل... فمتى كانت آخر مرة حظينا فيها بساعة كهذه؟',
        'Then Professor Earl Miller comes along to demolish an illusion we all live with: multitasking. The brain holds no more than one or two thoughts in consciousness at a time, and what we call multitasking is nothing but rapid switching between them — a price we pay every time we have to reset our minds. And most office workers never get a single uninterrupted hour in the whole working day… So when did we last have an hour like that?'
      ) },
      { type: 'p', text: L(
        'شخصيًا، أحببت كثيرًا المقطع الذي يقف فيه الكاتب أمام المحيط، خلال الأشهر الثلاثة التي انقطع فيها عن الإنترنت، ويقارن بينه وبين تويتر. المحيط قديم، وباقٍ، ولا يكترث لصراخك مهما علا، أما تويتر فيوهمك بأن العالم كله لا ينشغل إلا بك. ومع ذلك، لا يقدّم هاري الانقطاع على أنه حل سحري، بل يعترف بأن الإبطاء رفاهية لا يملكها أغلب الناس، فمن يخشى خسارة عمله لا يستطيع ببساطة أن يطفئ هاتفه ويرحل إلى الشاطئ.',
        'Personally, I loved the passage where the author stands before the ocean, during the three months he spent offline, and compares it with Twitter. The ocean is ancient, it endures, and it does not care about your shouting however loud it gets; Twitter fools you into believing the whole world is busy with nothing but you. Even so, Hari doesn’t present disconnecting as a magic cure. He admits that slowing down is a luxury most people don’t have: someone afraid of losing their job cannot simply switch off their phone and leave for the beach.'
      ) },
      { type: 'p', text: L(
        'وهنا يصبح الكتاب أعمق من كتب تطوير الذات المعتادة، إذ يربط بين التركيز وبين التوتر المزمن وحالة فرط التأهب، والضائقة المالية خاصة. فحين اختبر الباحثون ذكاء مجموعة من المزارعين قبل موسم الحصاد وبعده، تبيّن أنهم أحرزوا ثلاث عشرة نقطة إضافية في المتوسط بعد أن صار في أيديهم بعض المال! وفي تجربة فنلندا للدخل الأساسي، تحسّن تركيز من حصلوا على حد أدنى مضمون من الدخل، مع أن المبلغ كان بسيطًا جدًا. فالعقل المشغول بالتفكير في كيفية الوصول إلى نهاية الشهر لا يبقى فيه متسع لشيء آخر.',
        'This is where the book goes deeper than the usual self-help, because it ties focus to chronic stress and a state of hypervigilance — and to financial hardship in particular. When researchers tested the intelligence of a group of farmers before and after harvest season, they scored thirteen points higher on average once they had some money in hand! And in Finland’s basic-income experiment, the focus of those who received a guaranteed minimum income improved, even though the amount was very modest. A mind busy working out how to make it to the end of the month has no room left for anything else.'
      ) },
      { type: 'p', text: L(
        'ومن أكثر الفصول التي أثارت فضولي الفصل الذي تحدث فيه عن اضطراب فرط النشاط ونقص الانتباه، ويروي فيه قصصًا غريبة عن حيوانات تتناول أدوية نفسية: كلبة تُعطى الريتالين، ودب قطبي يُعطى البروزاك كي يكف عن الحركة الدائمة في قفصه. حتى الطبيب البيطري الذي وصف هذه الأدوية يعترف بأنها حل مؤقت، فالمشكلة الحقيقية أن هذه الحيوانات تعيش في ظروف تخالف طبيعتها، وهو ما لخصه الكاتب بقوله: «علينا أن نستمع إلى معاناة الحيوان، لا أن نحاول كتمها!»',
        'One of the chapters that most piqued my curiosity was the one on ADHD, where he tells strange stories of animals on psychiatric drugs: a dog given Ritalin, and a polar bear given Prozac so that it would stop pacing endlessly around its cage. Even the vet who prescribed these drugs admits they are a temporary fix: the real problem is that these animals live in conditions that go against their nature — which the author sums up as: “We should listen to the animal’s suffering, not try to silence it!”'
      ) },
      { type: 'p', text: L(
        'فهل نحن أيضًا مثل ذلك الدب؟ نذرع أقفاصنا الخفية جيئة وذهابًا، ثم نبحث عما يهدئنا بدلًا من أن نسأل عن القفص نفسه؟ هذا ما يطرحه الكاتب حين ينتقل إلى الأطفال، فيتحدث عن أثر البيئة المحيطة بالطفل والتوتر الذي يعيشه أهله، وعن حرمان أطفال اليوم من اللعب الحر. وينقل عن أحد الباحثين أن المساندة الاجتماعية التي يتلقاها الأهل كانت أقوى مؤشر على تحسّن حال أطفالهم.',
        'So are we, too, like that bear — pacing our invisible cages back and forth, then looking for something to calm us instead of asking about the cage itself? That is the question the author raises when he turns to children: the effect of the environment around a child and the stress the parents live under, and how today’s children are deprived of free play. He quotes one researcher for whom the social support parents received was the strongest predictor of their children doing better.'
      ) },
      { type: 'p', text: L(
        'وبالطبع، لا يدعو الكاتب إلى التخلي عن العلاج، ولا يلقي اللوم على الأهل، فهو يقرّ بأن المشكلة حقيقية وبأن الأدوية تحسّن الانتباه على المدى القصير. ويعترف أيضًا بأن هذا الفصل كان الأصعب عليه لأن العلماء أنفسهم مختلفون حوله، لذلك يحتاج إلى قراءة متأنية.',
        'Of course, the author doesn’t call for abandoning treatment, nor does he blame parents: he accepts that the problem is real and that medication improves attention in the short term. He also admits this chapter was the hardest for him, because the scientists themselves disagree about it — which is why it needs a careful reading.'
      ) },
      { type: 'p', text: L(
        'وفي النهاية، أحببت أن أختتم بالقصة التي سمعها الكاتب من أحد الباحثين، عن أناس ظلوا زمنًا طويلًا ينتشلون الجثث الطافية في النهر، إلى أن تساءلوا أخيرًا عن مصدرها، فقرروا السير عكس التيار. وأظن أن هذا ما يفعله الكتاب تمامًا، لذا أرشحه لكل من يشعر بأن انتباهه يتسرب من بين يديه.',
        'Finally, I wanted to close with the story the author heard from one researcher, about people who spent a long time pulling bodies out of a river as they floated past, until at last they asked where they were coming from, and decided to walk upstream. I think that is exactly what this book does, so I recommend it to anyone who feels their attention slipping through their fingers.'
      ) },
      { type: 'callout', variant: 'note', title: L('للنقاش', 'For discussion'), text: L(
        'برأيكم، هل استعادة تركيزنا مسؤولية فردية، أم معركة جماعية لا يمكن أن نربحها وحدنا؟ وهل جربتم يومًا الابتعاد عن هواتفكم لفترة طويلة؟',
        'What do you think: is getting our focus back an individual responsibility, or a collective battle we cannot win alone? And have you ever tried staying away from your phone for a long time?'
      ) },
    ],
  },
]

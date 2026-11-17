/* ============================================================================
   «رُقعة النرد» — this book's rounds for the club's board game.
   The house rules for writing a round, and the shape of every kind, are at the
   top of books/why-we-sleep/game.js. In short: the right answer is a fact the
   site states; every wrong answer is one a half-informed player could believe;
   the fun is in the setup and the `why`; the first option is the right one.

   ONE ROUND CARRIES A JOB: the 23-minute figure is wrong twice over (the book
   credits the wrong scientist, and it was never published in a paper), so the
   question asks what the club's fact-check found — never treat it as a fact.
   ========================================================================== */
import { poly } from '../../../lib/game/chart.js'

const L = (ar, en) => ({ ar, en })
const mcq = (id, q, opts, why) => ({ id, q, opts, why })
const num = (id, q, a, extra, why) => ({ id, q, a, ...extra, why })
const who = (id, name, clues, why, img) => ({ id, name, clues, why, ...(img ? { img } : {}) })
const bluff = (id, q, truth, alt, decoys, why) => ({ id, q, truth, alt, decoys, why })

export const gameIcon = '🎯'

/* ------------------------------- questions ------------------------------- */
const mcqs = [
  mcq('sf-office',
    L('كم يبقى موظّف المكتب المتوسّط على مهمّةٍ واحدة قبل أن ينتقل إلى غيرها؟', 'How long does the average office worker stay on one task before switching?'),
    [L('نحو ثلاث دقائق', 'About three minutes'), L('نحو عشرين دقيقة', 'About twenty minutes'), L('نحو أربعين ثانية', 'About forty seconds'), L('نحو إحدى عشرة دقيقة', 'About eleven minutes')],
    L('ثلاث دقائق في المتوسّط — ونادراً ما يحظى الموظّف بساعةٍ واحدة بلا مقاطعة.', 'Three minutes on average — and a worker rarely gets a single uninterrupted hour.')),

  mcq('sf-iq',
    L('قاست دراسةٌ لشركة HP ما تفعله الرسائل والمكالمات المتواصلة بمعدّل الذكاء. النتيجة؟', 'A study for HP measured what a constant stream of emails and calls does to your IQ. The result?'),
    [L('ينخفض عشر نقاط — ضعف أثر تدخين الحشيش', 'It drops ten points — twice the effect of smoking cannabis'),
      L('ينخفض نقطتين، كأثر ليلةٍ سيّئة', 'It drops two points, like a bad night’s sleep'),
      L('ينخفض خمس نقاط، كأثر الحشيش تماماً', 'It drops five points, exactly like cannabis'),
      L('لا أثر يُقاس', 'No measurable effect')],
    L('عشر نقاط في المتوسّط: ضعف الأثر المؤقّت لتدخين الحشيش. والمقاطعة لا تحتاج حتى أن تجيبها.', 'Ten points on average: double the short-term hit from smoking cannabis.')),

  mcq('sf-goldfish',
    L('«صار انتباه الإنسان أقصر من انتباه سمكة الزينة». ما الخطأ في هذه الإحصائية الشهيرة؟', '“Humans now have a shorter attention span than a goldfish.” What is wrong with this famous statistic?'),
    [L('لا يوجد أصلاً قياسٌ موثوق لانتباه سمكة الزينة', 'There is no reliable measure of a goldfish’s attention at all'),
      L('لا شيء — أثبتتها دراسة سنة ٢٠١٥', 'Nothing — a 2015 study proved it'),
      L('العكس هو الصحيح: انتباه السمكة ثلاث ثوانٍ فقط', 'It’s the other way round: a goldfish manages three seconds'),
      L('تصحّ فقط على من هم دون الخامسة والعشرين', 'It only holds for people under twenty-five')],
    L('أسطورةٌ حضرية بلا علمٍ وراءها. والمبالغة تُخفي الفكرة الحقيقية: انتباهنا يُهاجَم من الخارج، لم يتقلّص في بيولوجيتنا.',
      'An urban legend with no science behind it. The exaggeration hides the real point: our attention is under attack from outside, not shrunken by biology.')),

  mcq('sf-raskin',
    L('اخترع آزا راسكن «التمرير اللانهائي». ما شعوره تجاهه اليوم؟', 'Aza Raskin invented infinite scroll. How does he feel about it today?'),
    [L('نادم', 'He regrets it'),
      L('فخور: سهّل الإنترنت على الجميع', 'Proud: it made the web easier for everyone'),
      L('محايد: الأداة بحسب من يستخدمها', 'Neutral: a tool is only as good as its user'),
      L('يتمنّى لو أنه سجّل براءة اختراعه', 'He wishes he had patented it')],
    L('نادم: بلا «إشارة توقّف» تواصل التمرير دون أن تنتبه، وقد حسب الوقت البشري الهائل الذي يبتلعه كلّ يوم.',
      'He regrets it: with no “stopping cue” you scroll on unawares, and he has calculated the vast human time it eats every day.')),

  mcq('sf-pigeon',
    L('وجد سكنر أضمن طريقةٍ تجعل الحمامة تنقر الرافعة بهوس — والتطبيقات استعارتها. ما هي؟', 'Skinner found the surest way to make a pigeon peck a lever obsessively — and apps borrowed it. What is it?'),
    [L('أن تكون المكافأة غير متوقّعة', 'Make the reward unpredictable'),
      L('أن تُكافأ كلّ نقرة', 'Reward every single peck'),
      L('أن تأتي المكافأة بعد عشر نقراتٍ بالضبط', 'Reward exactly every tenth peck'),
      L('أن ترى الحمامة غيرها يُكافأ', 'Let it watch other pigeons being rewarded')],
    L('المكافأة المتغيّرة: لا تعرف متى يأتي «الإعجاب» التالي، فتظلّ تسحب. المبدأ نفسه من قفص الحمام إلى جيبك.',
      'The variable reward: you never know when the next “like” will come, so you keep pulling. The same principle, from the pigeon’s cage to your pocket.')),

  mcq('sf-provincetown',
    L('هرب يوهان هاري إلى بلدةٍ ساحلية ثلاثة أشهر بلا هاتفٍ ذكيّ ولا إنترنت. ماذا حدث؟', 'Johann Hari fled to a seaside town for three months with no smartphone and no internet. What happened?'),
    [L('عاد إليه تركيزه — ثم عادت عاداته حين رجع إلى بيته', 'His focus came back — and so did his old habits once he went home'),
      L('لم يحتمل، فعاد بعد أسبوع', 'He couldn’t bear it, and came back after a week'),
      L('عاد تركيزه إلى الأبد، ولم يحمل هاتفاً ذكيّاً بعدها', 'His focus came back for good; he never carried a smartphone again'),
      L('لم يتغيّر شيء، فاستنتج أن الإنترنت ليس المشكلة', 'Nothing changed, so he concluded the internet isn’t the problem')],
    L('في بروفينستاون عاد يقرأ ساعات. لكنّ التغيير الفردي لا يصمد وحده في بيئةٍ لم تتغيّر — وهذه حجّة الكتاب كلّها.',
      'In Provincetown he could read for hours again. But individual change cannot hold alone in an unchanged environment — the book’s whole argument.')),

  mcq('sf-kellogg',
    L('قبل نحو قرن خفّض مصنع «كيلوغ» يوم العمل من ثماني ساعاتٍ إلى ستّ. ما الذي انخفض نحو ٤١٪؟', 'About a century ago, the Kellogg factory cut the working day from eight hours to six. What fell by about 41%?'),
    [L('إصابات العمل', 'Workplace accidents'), L('الإنتاج', 'Output'), L('أيّام الإجازات المرضية', 'Sick days'), L('الأجور', 'Wages')],
    L('حوادث العمل نقصت نحو ٤١٪: العامل الأقلّ إنهاكاً أكثر انتباهاً وأماناً — دليلٌ عمره قرن.',
      'Accidents fell by about 41%: a less exhausted worker is more attentive and safer — evidence a century old.')),

  mcq('sf-skenazy',
    L('تركت لينور سكينازي ابنها ذا التسع سنوات يعود وحده بمترو نيويورك، وكتبت عن ذلك. بماذا لقّبها الإعلام؟', 'Lenore Skenazy let her nine-year-old ride the New York subway home alone, and wrote about it. What did the media call her?'),
    [L('«أسوأ أمّ في أمريكا»', '“America’s Worst Mom”'), L('«أشجع أمّ في نيويورك»', '“New York’s Bravest Mom”'), L('«أمّ المترو»', '“The Subway Mom”'), L('«أكثر أمٍّ تهوّراً في مانهاتن»', '“Manhattan’s Most Reckless Mom”')],
    L('وصل الصبيّ سالماً. حجّتها: خوفنا المبالغ فيه يسلب الأطفال الاستقلال الذي يبني انتباههم وثقتهم.', 'The boy got home safe. Her point: exaggerated fear robs children of the independence that builds attention and confidence.')),

  mcq('sf-dyes',
    L('أعطى علماء بريطانيون ٢٩٧ طفلاً شراباً وراقبوهم. ما الذي جعل بعضهم أكثر فرطاً في الحركة؟', 'British scientists gave 297 children a drink and watched them. What made some of them more hyperactive?'),
    [L('أصباغ الطعام الصناعية الشائعة', 'Common artificial food dyes'), L('السكّر', 'Sugar'), L('الكافيين', 'Caffeine'), L('الماء الغازيّ', 'Fizzy water')],
    L('الأصباغ. وبحسب الكتاب، حظرتها دولٌ أوروبية ورفضت الجهات الأمريكية ذلك. والسكّر؟ ليس هو المتّهم هنا.',
      'The dyes. According to the book, European countries banned them while US regulators refused. Sugar wasn’t the culprit here.')),

  mcq('sf-pollan',
    L('أيّ قاعدة طعامٍ بسيطة يستعيرها الكتاب من مايكل بولان لحماية تركيزك؟', 'Which simple food rule does the book borrow from Michael Pollan to protect your focus?'),
    [L('كُل طعاماً يعرفه أجدادك', 'Eat food your grandparents would recognise'),
      L('لا تأكل بعد الثامنة مساءً', 'Never eat after 8 pm'),
      L('افطر كالملوك وتعشَّ كالفقراء', 'Breakfast like a king, dine like a pauper'),
      L('صُم يوماً في الأسبوع', 'Fast one day a week')],
    L('لا مكوّن سحريّ؛ الخيط المشترك طعامٌ كامل قليل التصنيع — وأطراف المتجر لا وسطه.', 'There is no magic ingredient; the common thread is whole, minimally processed food — and shopping the edges of the store, not the middle.')),

  mcq('sf-flow',
    L('ما وصفة «التدفّق» عند تشيكزينتميهالي؟', 'What is Csikszentmihalyi’s recipe for flow?'),
    [L('هدفٌ واضح، ومهمّةٌ على حافّة قدرتك، وشيءٌ يعنيك', 'A clear goal, a task at the edge of your ability, and something that matters to you'),
      L('صمتٌ تامّ، وهاتفٌ مغلق، وساعتان على الأقلّ', 'Total silence, phone off, and at least two hours'),
      L('مهامّ سهلة تُنجَز بلا تفكير', 'Easy tasks you can do on autopilot'),
      L('قهوة، وموسيقى، وموعدٌ نهائي', 'Coffee, music and a deadline')],
    L('على حافّة قدرتك تماماً: لا سهلة فتملّ، ولا صعبة فتقلق — وذات معنى لك.', 'Right at the edge of your ability: not so easy you’re bored, not so hard you’re anxious — and meaningful to you.')),

  mcq('sf-disconnect',
    L('سنّت فرنسا قانوناً يحمي انتباه العاملين بعد الدوام. ماذا يمنحهم؟', 'France passed a law to protect workers’ attention after hours. What does it give them?'),
    [L('«الحقّ في قطع الاتصال»', 'The “right to disconnect”'),
      L('«الحقّ في النسيان»', 'The “right to be forgotten”'),
      L('أسبوع عملٍ من أربعة أيام', 'A four-day week'),
      L('قيلولةً مدفوعة الأجر', 'A paid nap')],
    L('حقّ تجاهل رسائل العمل خارج الدوام. (أمّا «الحقّ في النسيان» فقانونٌ آخر، عن بياناتك على الإنترنت.)',
      'The right to ignore work messages after hours. (The “right to be forgotten” is another law, about your data online.)')),

  mcq('sf-23-minutes',
    L('يقول الكتاب إن استعادة التركيز بعد المقاطعة تستغرق ٢٣ دقيقة. ماذا وجد تحقّق النادي؟', 'The book says it takes 23 minutes to refocus after an interruption. What did the club’s own fact-check find?'),
    [L('الرقم من مقابلاتٍ صحفية لا من بحثٍ منشور — والكتاب ينسبه إلى العالِم الخطأ', 'The figure comes from press interviews, not a published study — and the book credits the wrong scientist'),
      L('صحيحٌ تماماً، من بحثٍ لغلوريا مارك سنة ٢٠٠٨', 'Exactly right, from a 2008 paper by Gloria Mark'),
      L('الرقم الحقيقي ٢٣ ثانية لا دقيقة', 'The real figure is 23 seconds, not minutes'),
      L('متوسّطٌ من دراسةٍ على الطيّارين', 'It’s an average from a study of pilots')],
    L('الرقم لغلوريا مارك لا لمايكل بوسنر، ولم يُنشر في بحثٍ محكَّم. بل وجد بحثها الفعلي أن العمل المقطوع يُنجَز أسرع — بثمنٍ من التوتّر.',
      'The figure is Gloria Mark’s, not Michael Posner’s, and it was never in a peer-reviewed paper. Her actual study found interrupted work gets finished faster — at a cost in stress.')),

  mcq('sf-multitask',
    L('من يثقون بأنهم بارعون في تعدّد المهامّ يتبيّن في الغالب أنهم…', 'People who are sure they are great at multitasking usually turn out to be…'),
    [L('الأسوأ فيه', 'The worst at it'), L('بارعين فعلاً: الثقة تصنع الفرق', 'Genuinely good: confidence makes the difference'), L('متوسّطين كغيرهم', 'Average, like everyone else'), L('أفضل فيه بشرط الموسيقى', 'Better at it, as long as there’s music')],
    L('لا دماغ يؤدّي مهمّتين فكريّتين معاً؛ أنت تبدّل بسرعة، وكلّ تبديلٍ يترك «بقايا انتباه» تبطئك وتضاعف أخطاءك.',
      'No brain does two thinking tasks at once; you switch quickly, and every switch leaves an “attention residue” that slows you and multiplies your errors.')),
]

/* -------------------------------- numbers -------------------------------- */
const nums = [
  num('sf-n-seconds',
    L('راقب باحثون طلّاباً جامعيين على حواسيبهم. كم ثانيةً بقي الطالب عادةً على شيءٍ واحد قبل أن يقفز إلى غيره؟', 'Researchers tracked students on their own computers. How many seconds did a student typically stay on one thing before jumping?'),
    19, { unit: L('ثانية', 'seconds') },
    L('الوسيط ١٩ ثانية، مع تبديلٍ بين المهامّ كلّ ٦٥ ثانية في المتوسّط.', 'The median was 19 seconds, with a switch between tasks every 65 seconds on average.')),
  num('sf-n-touches',
    L('كم مرّةً يلمس الأمريكي المتوسّط هاتفه في اليوم؟', 'How many times a day does the average American touch their phone?'),
    2617, { unit: L('مرّة', 'times') },
    L('٢٬٦١٧ لمسة، ونحو ثلاث ساعاتٍ وربع من الاستخدام. اللمسة ليست قراراً، بل عادةٌ زرعها التصميم.', '2,617 touches, and about 3 hours 15 minutes of use. A touch is not a decision — it is a habit that design installed.')),
  num('sf-n-microsoft',
    L('أعطت «مايكروسوفت اليابان» موظّفيها يوم الجمعة إجازة. بكم بالمئة ارتفعت إنتاجيّتهم؟', 'Microsoft Japan gave its staff Fridays off. By what percentage did productivity rise?'),
    40, { unit: L('٪', '%') },
    L('نحو ٤٠٪ (٢٠١٩). الإنهاك قابلٌ للعكس حين يتغيّر النظام، لا الأفراد وحدهم.', 'About 40% (2019). Exhaustion is reversible when the system changes, not only the individuals in it.')),
  num('sf-n-farmers',
    L('خضع مزارعو قصب السكّر أنفسهم لاختبار ذكاءٍ مرّتين: مفلسين قبل الحصاد، ومقبوضي الأجر بعده. بكم نقطةً كانوا أعلى بعده؟', 'The same sugarcane farmers took an IQ test twice: broke before the harvest, and paid after it. How many points higher did they score after?'),
    13, { unit: L('نقطة', 'points') },
    L('نحو ١٣ نقطة. المزارع نفسه: الفقر ضريبةٌ على الانتباه، لا عيبٌ فيه.', 'About 13 points. The same farmer: poverty is a tax on attention, not a flaw in it.')),
  num('sf-n-newspapers',
    L('سنة ١٩٨٦ كانت المعلومات التي تصل الفرد يومياً تعادل ٤٠ صحيفة. وسنة ٢٠٠٧؟', 'In 1986 the information reaching one person each day equalled about 40 newspapers. And by 2007?'),
    174, { unit: L('صحيفة', 'newspapers') },
    L('١٧٤ صحيفة. الانتباه لم يتغيّر؛ ما يُطلب منه تضاعف أكثر من أربع مرّات.', '174. Attention didn’t change; what is demanded of it more than quadrupled.')),
  num('sf-n-outdoors',
    L('بحلول ٢٠٠٣، كم بالمئة من أطفال أمريكا ما زالوا يلعبون بحرّية في الخارج بانتظام؟', 'By 2003, what percentage of American children still played freely outdoors on a regular basis?'),
    10, { unit: L('٪', '%') },
    L('١٠٪ فقط. في جيلٍ واحد انتقلت الطفولة إلى الداخل وإلى الشاشات.', 'Only 10%. In one generation childhood moved indoors and onto screens.')),
]

/* ------------------------------ who is it? ------------------------------ */
const people = [
  who('sf-w-hari', L('يوهان هاري', 'Johann Hari'),
    [L('هوسُ فتىً اسمه آدم بإلفيس بريسلي يفتتح كتابه.', 'A young man called Adam and his obsession with Elvis Presley open his book.'),
      L('قضى ثلاثة أشهرٍ بلا هاتفٍ ذكيّ في بلدةٍ ساحلية في ماساتشوستس.', 'He spent three months without a smartphone in a seaside town in Massachusetts.'),
      L('حاور أكثر من ٢٥٠ خبيراً ليكتب كتاب النادي الثاني.', 'He interviewed more than 250 experts to write the club’s second book.')],
    L('يوهان هاري، صاحب «تركيزنا المسلوب».', 'Johann Hari, who wrote Stolen Focus.'), './images/characters/johann-hari.webp'),
  who('sf-w-mark', L('غلوريا مارك', 'Gloria Mark'),
    [L('أستاذة معلوماتية في جامعة كاليفورنيا (إرفاين).', 'A professor of informatics at UC Irvine.'),
      L('قاست كم يبقى موظّف المكتب مركّزاً فعلاً، فوجدت المقاطعات تمزّق يومه.', 'She measured how long office workers really stay focused, and found interruptions shredding their day.'),
      L('رقم «الدقائق الثلاث والعشرين» الشهير لها — ولم تنشره في بحث.', 'The famous “23 minutes” is hers — and she never published it in a paper.')],
    L('غلوريا مارك.', 'Gloria Mark.'), './images/characters/gloria-mark.webp'),
  who('sf-w-miller', L('إيرل ميلر', 'Earl Miller'),
    [L('عالم أعصاب في معهد ماساتشوستس للتقنية.', 'A neuroscientist at MIT.'),
      L('يقول إن الدماغ لا يركّز على أمرين فكريّين معاً.', 'He says the brain cannot focus on two thinking tasks at once.'),
      L('ما نسمّيه «تعدّد المهامّ» يسمّيه هو تبديلاً سريعاً بكلفةٍ خفيّة.', 'What we call multitasking, he calls rapid switching with a hidden cost.')],
    L('إيرل ميلر.', 'Earl Miller.'), './images/characters/earl-miller.webp'),
  who('sf-w-csikszentmihalyi', L('ميهالي تشيكزينتميهالي', 'Mihaly Csikszentmihalyi'),
    [L('درس لحظاتٍ يختفي فيها الزمن.', 'He studied moments in which time disappears.'),
      L('وصفته: هدفٌ واضح، ومهمّةٌ على حافّة قدرتك، وشيءٌ يعنيك.', 'His recipe: a clear goal, a task at the edge of your ability, and something that matters to you.'),
      L('أبو «التدفّق» — واسمه وحده تحدٍّ في النطق.', 'The father of “flow” — and his name alone is a pronunciation challenge.')],
    L('ميهالي تشيكزينتميهالي، كما تكتبه ترجماته العربية.', 'Mihaly Csikszentmihalyi.'), './images/characters/mihaly-csikszentmihalyi.webp'),
  who('sf-w-raskin', L('آزا راسكن', 'Aza Raskin'),
    [L('مصمّمٌ نادمٌ على أحد اختراعاته.', 'A designer who regrets one of his own inventions.'),
      L('حسب كم يبتلع اختراعه من وقت البشر كلّ يوم.', 'He calculated how much human time his invention swallows every day.'),
      L('مخترع «التمرير اللانهائي».', 'He invented infinite scroll.')],
    L('آزا راسكن.', 'Aza Raskin.'), './images/characters/aza-raskin.webp'),
  who('sf-w-harris', L('تريستان هاريس', 'Tristan Harris'),
    [L('عمل مصمّماً في غوغل.', 'He used to be a designer at Google.'),
      L('كشف كيف تُهندَس التطبيقات لأسر انتباهك.', 'He exposed how apps are engineered to capture your attention.'),
      L('قاد حملة «الوقت المُحسَن الاستخدام».', 'He led the “Time Well Spent” campaign.')],
    L('تريستان هاريس.', 'Tristan Harris.'), './images/characters/tristan-harris.webp'),
  who('sf-w-skenazy', L('لينور سكينازي', 'Lenore Skenazy'),
    [L('صحفيةٌ وأمّ من نيويورك.', 'A New York journalist and mother.'),
      L('تركت ابنها ذا التسع سنوات يعود وحده بالمترو.', 'She let her nine-year-old ride the subway home alone.'),
      L('لقّبها الإعلام «أسوأ أمّ في أمريكا».', 'The media called her “America’s Worst Mom”.')],
    L('لينور سكينازي، وحركة «أطفالٌ أحرار».', 'Lenore Skenazy, of Free-Range Kids.'), './images/characters/lenore-skenazy.webp'),
]

/* -------------------------------- charts -------------------------------- */
const trending = (hide) => ({
  x: { ticks: ['2013', '2016'] },
  y: hide ? { hide: true } : { label: L('ساعات بقاء الموضوع الرائج', 'hours a topic stays trending') },
  lines: [{ pts: poly([0, 0.875], [1, 0.595]), tone: 'b' }],
  notes: [{ x: 0.08, y: 0.97, text: '17.5' }, { x: 0.92, y: 0.7, text: '11.9' }],
})
const flowMap = {
  x: { label: L('مهارتك', 'your skill') },
  y: { label: L('صعوبة المهمّة', 'the challenge') },
  band: [[0, 0.12], [0.12, 0], [1, 0.88], [0.88, 1]],
  notes: [{ x: 0.7, y: 0.66, text: L('التدفّق', 'flow') }],
  lines: [{ pts: poly([0.42, 0.44], [0.42, 0.86]), tone: 'b', dash: true }],
  ask: [0.42, 0.86],
}
const papers = (hide) => ({
  y: hide ? { hide: true } : { label: L('معلومات اليوم بالصحف', 'a day’s information, in newspapers') },
  bars: [{ v: 0.22, label: '1986', show: '40', tone: 'a' }, { v: 0.97, label: '2007', show: '174', tone: 'b' }],
})
const kellogg = (second) => ({
  bars: [{ v: 0.8, label: L('٨ ساعات', '8 hours'), tone: 'b' }, { v: second, label: L('٦ ساعات', '6 hours'), tone: 'a' }],
})

const graphs = [
  { id: 'sf-g-trending', chart: trending(true), answerChart: trending(false),
    q: L('هبط هذا الخطّ بين ٢٠١٣ و٢٠١٦. ماذا يقيس المحور المخفيّ؟', 'This line fell between 2013 and 2016. What does the hidden axis measure?'),
    opts: [L('الساعات التي يبقى فيها موضوعٌ رائج في القمّة', 'Hours a trending topic stays at the top'),
      L('ساعات النوم في الليلة', 'Hours of sleep a night'),
      L('دقائق قراءة الكتب في اليوم', 'Minutes a day spent reading books'),
      L('الثواني قبل الانتقال إلى مهمّةٍ أخرى', 'Seconds before switching tasks')],
    why: L('من ١٧٫٥ إلى ١١٫٩ ساعة في ثلاث سنوات: نملّ معاً، وأسرع. التشتّت جماعيّ لا فرديّ.', 'From 17.5 to 11.9 hours in three years: we get bored together, and faster. The distraction is collective, not individual.') },

  { id: 'sf-g-flow', chart: flowMap,
    q: L('أنت في الشريط: في حالة التدفّق. فجأةً تصعب المهمّة كثيراً ومهارتك على حالها. أين صرت؟', 'You are in the band: in flow. Suddenly the task gets much harder while your skill stays the same. Where are you now?'),
    opts: [L('في القلق', 'In anxiety'), L('في الملل', 'In boredom'), L('في تدفّقٍ أعمق', 'Deeper in flow'), L('في التدفّق نفسه: المهارة تلحق فوراً', 'Still in flow: skill catches up at once')],
    why: L('فوق الشريط قلق، وتحته ملل. التدفّق حافّةٌ ضيّقة بين الاثنين — ولهذا لا يأتي بأمر.', 'Above the band is anxiety, below it boredom. Flow is a narrow edge between them — which is why it won’t come on command.') },

  { id: 'sf-g-newspapers', chart: papers(true), answerChart: papers(false),
    q: L('ماذا يقيس المحور المخفيّ؟', 'What does the hidden axis measure?'),
    opts: [L('المعلومات التي تصل الفرد يومياً، بعدد الصحف', 'The information reaching one person each day, in newspapers’ worth'),
      L('الصحف المبيعة لكلّ مئة شخص', 'Newspapers sold per hundred people'),
      L('ساعات مشاهدة التلفاز في الأسبوع', 'Hours of TV per week'),
      L('عدد الرسائل الإلكترونية في اليوم', 'Emails received per day')],
    why: L('من ٤٠ صحيفة إلى ١٧٤ في عشرين سنة. لم يتغيّر الانتباه؛ ما يُطلب منه تضاعف أكثر من أربع مرّات.', 'From 40 newspapers to 174 in twenty years. Attention didn’t change; what is demanded of it more than quadrupled.') },

  { id: 'sf-g-kellogg', chart: { ...kellogg(0), y: { label: L('إصابات العمل', 'workplace accidents') }, ask: [0.75, 0.3] },
    answerChart: { ...kellogg(0.47), y: { label: L('إصابات العمل', 'workplace accidents') } },
    q: L('خفّض مصنع «كيلوغ» يوم العمل من ثماني ساعاتٍ إلى ستّ. العمود الأوّل إصابات العمل في يوم الثماني ساعات. أيّ رسمٍ يُظهر ما حدث؟', 'Kellogg cut the working day from eight hours to six. The first bar is workplace accidents on eight-hour days. Which chart shows what happened?'),
    opts: [{ chart: kellogg(0.47) }, { chart: kellogg(0.8) }, { chart: kellogg(0.98) }, { chart: kellogg(0.04) }],
    why: L('انخفضت نحو ٤١٪ — لا إلى الصفر. العامل الأقلّ إنهاكاً أكثر انتباهاً.', 'They fell by about 41% — not to zero. A less exhausted worker is a more attentive one.') },
]

/* ------------------------------ white lies ------------------------------ */
const bluffs = [
  bluff('sf-b-raskin',
    L('آزا راسكن نادمٌ على اختراع ____.', 'Aza Raskin regrets inventing ____.'),
    L('التمرير اللانهائي', 'infinite scroll'),
    ['التمرير', 'التمرير اللانهائي', 'التمرير الذي لا ينتهي', 'التمرير اللامتناهي', 'السكرول', 'scroll', 'scrolling', 'infinite scrolling', 'endless scroll', 'endless scrolling'],
    [L('زرّ الإعجاب', 'the like button'), L('الإشعارات الحمراء', 'red notification badges'), L('التشغيل التلقائي للفيديو', 'autoplay video')],
    L('التمرير اللانهائي: صفحةٌ بلا قاع، ولا إشارة توقّف.', 'Infinite scroll: a page with no bottom, and no cue to stop.')),
  bluff('sf-b-france',
    L('يمنح القانون الفرنسيّ العاملين حقّ ____ بعد الدوام.', 'French law gives workers the right to ____ after hours.'),
    L('قطع الاتصال', 'disconnect'),
    ['الانفصال', 'قطع الاتصال', 'عدم الرد', 'تجاهل الرسائل', 'تجاهل رسائل العمل', 'disconnect', 'the right to disconnect', 'ignore work messages', 'ignore emails', 'not answer'],
    [L('قيلولةٍ مدفوعة الأجر', 'a paid nap'), L('العمل من البيت', 'work from home'), L('رفض الاجتماعات', 'refuse meetings')],
    L('قطع الاتصال: حمايةٌ قانونية للوقت الشخصي، بتغيير القواعد لا بإنهاك الأفراد.', 'To disconnect: legal protection for personal time, by changing the rules rather than wearing individuals out.')),
  bluff('sf-b-skenazy',
    L('سُمّيت لينور سكينازي «أسوأ أمّ في أمريكا» لأنها تركت ابنها ذا التسع سنوات ____.', 'Lenore Skenazy was called “America’s Worst Mom” for letting her nine-year-old ____.'),
    L('يعود وحده بالمترو', 'ride the subway home alone'),
    ['المترو', 'يركب المترو', 'يركب المترو وحده', 'يعود بالمترو', 'subway', 'the subway', 'ride the subway', 'take the subway', 'take the subway alone', 'ride the subway alone'],
    [L('يطبخ عشاءه بنفسه', 'cook his own dinner'), L('يلعب في الحديقة حتى المغيب', 'play in the park until dark'), L('يحمل هاتفاً ذكيّاً', 'carry a smartphone')],
    L('يعود وحده بمترو نيويورك — ووصل سالماً.', 'Ride the New York subway home alone — and he got home safe.')),
  bluff('sf-b-pollan',
    L('قاعدة مايكل بولان: كُل طعاماً يعرفه ____.', 'Michael Pollan’s rule: eat food your ____ would recognise.'),
    L('أجدادك', 'grandparents'),
    ['اجدادك', 'جدتك', 'جدك', 'جداتك', 'الأجداد', 'grandparents', 'grandma', 'grandmother', 'great grandmother', 'grandparent'],
    [L('طبيبك', 'doctor'), L('أطفالك', 'children'), L('قطّتك', 'cat')],
    L('أجدادك: طعامٌ كامل قليل التصنيع.', 'Your grandparents: whole, minimally processed food.')),
  bluff('sf-b-skinner',
    L('جعل سكنر الحمام ينقر بهوس حين جعل المكافأة ____.', 'Skinner made pigeons peck obsessively by making the reward ____.'),
    L('غير متوقّعة', 'unpredictable'),
    ['غير متوقعة', 'عشوائية', 'متغيرة', 'مفاجئة', 'متقلبة', 'unpredictable', 'random', 'variable', 'a surprise', 'irregular'],
    [L('أكبر في كلّ مرّة', 'bigger every time'), L('مرئيّةً للحمام الآخر', 'visible to the other pigeons'), L('حلوة المذاق', 'sweet')],
    L('غير متوقّعة: المكافأة المتغيّرة — والتطبيقات تعرفها جيّداً.', 'Unpredictable: the variable reward — and apps know it well.')),
]

export const gameDeck = { mcq: mcqs, num: nums, who: people, graph: graphs, bluff: bluffs }

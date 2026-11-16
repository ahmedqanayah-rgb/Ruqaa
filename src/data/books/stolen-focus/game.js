/* ============================================================================
   «رُقعة النرد» — this book's question deck for the club's dice game.
   The rules for writing one are at the top of books/why-we-sleep/game.js:
   the FIRST option is the right one (the game shuffles them), the right answer
   is a fact the site already states, and the wrong answers are jokes.

   ONE THING SPECIFIC TO THIS BOOK: the 23-minute refocus figure is NOT a fact
   here. The club checked it (see reception.js) — it is Gloria Mark's, not
   Michael Posner's, and it appears in no peer-reviewed paper — so the only
   question that mentions it asks what the club's check found.
   ========================================================================== */

const L = (ar, en) => ({ ar, en })
const q = (id, text, opts, why) => ({ id, q: text, opts, why })

export const gameIcon = '🎯'

export const gameDeck = [
  q('sf-19-seconds',
    L('راقب باحثون طلّاباً جامعيين على حواسيبهم. كم يمكث الطالب عادةً على شيءٍ واحد قبل أن يقفز إلى غيره؟',
      'Researchers tracked college students on their own computers. How long did a student typically stay on one thing before jumping to another?'),
    [
      L('١٩ ثانية', '19 seconds'),
      L('محاضرةً كاملة من ٤٥ دقيقة — هكذا يُشاع', 'A full 45-minute lecture — or so the rumour goes'),
      L('إلى أن تنتهي القهوة', 'Until the coffee ran out'),
    ],
    L('الوسيط ١٩ ثانية فقط، مع قفزةٍ بين المهامّ كلّ ٦٥ ثانية في المتوسّط.',
      'The median was just 19 seconds, with a switch between tasks every 65 seconds on average.')),

  q('sf-office',
    L('كم يمكث الموظّف العادي في المكتب على مهمّةٍ واحدة؟',
      'How long does the average office worker stay on a single task?'),
    [
      L('نحو ثلاث دقائق', 'About three minutes'),
      L('ساعتين كاملتين، بحسب جدول دوامه', 'Two solid hours, according to their own timesheet'),
      L('ثماني ساعات — وهي مهمّة انتظار نهاية الدوام', 'Eight hours — the task being “wait for the day to end”'),
    ],
    L('نحو ٣ دقائق في المتوسّط، ونادراً ما يحصل الموظّف على ساعةٍ واحدة متّصلة بلا مقاطعة.',
      'About 3 minutes on average — and a worker rarely gets a single uninterrupted hour.')),

  q('sf-iq',
    L('قاست دراسةٌ لشركة HP أثر سيل الرسائل والمكالمات على معدّل الذكاء. ما النتيجة؟',
      'A study for HP measured what a stream of emails and calls does to your IQ. The result?'),
    [
      L('ينخفض عشر نقاط — ضعف أثر تدخين الحشيش', 'It drops ten points — twice the effect of smoking cannabis'),
      L('يرتفع: كلّ هذا التدريب على قراءة العناوين', 'It rises: all that practice reading subject lines'),
      L('لا يتغيّر، لكنّ طباعتك تصير أكثر غضباً', 'No change, though your typing gets angrier'),
    ],
    L('عشر نقاط في المتوسّط، أي ضعف الأثر القصير المدى لتدخين الحشيش على معدّل الذكاء.',
      'Ten points on average — double the short-term hit to IQ from smoking cannabis.')),

  q('sf-touches',
    L('كم مرّةً يلمس الأمريكي العادي هاتفه في ٢٤ ساعة؟',
      'How many times does the average American touch their phone in 24 hours?'),
    [
      L('٢٦١٧ مرّة', '2,617 times'),
      L('٩٦ مرّة: مرّةً كلّ ربع ساعة، كأيّ إنسانٍ متحضّر', '96 times: once every quarter of an hour, like a civilised person'),
      L('مرّةً واحدة — ولم يتركه بعدها', 'Once. They simply never let go'),
    ],
    L('٢٦١٧ لمسة، ونحو ٣ ساعات و١٥ دقيقة من الاستخدام يومياً. اللمسة ليست قراراً، بل عادةٌ ركّبها التصميم.',
      '2,617 touches, and about 3 hours 15 minutes of use a day. A touch is not a decision — it is a habit that design installed.')),

  q('sf-goldfish',
    L('«انتباه الإنسان اليوم أقصر من انتباه السمكة الذهبية». ما مشكلة هذه المعلومة الشهيرة؟',
      '“Humans now have a shorter attention span than a goldfish.” What is wrong with this famous statistic?'),
    [
      L('خرافة: لا يوجد أصلاً مقياسٌ موثوق لانتباه السمكة', 'It is a myth: there is no reliable measure of a goldfish’s attention at all'),
      L('ظلمٌ للسمكة، فهي تقرأ أكثر منّا', 'It is unfair to the goldfish, which reads more than we do'),
      L('لا مشكلة. السمكة انتقلت إلى السؤال التالي أصلاً', 'Nothing. The goldfish has already moved on to the next question'),
    ],
    L('أسطورةٌ بلا أساسٍ علمي. والمبالغة تصرف النظر عن الأهمّ: انتباهنا يتعرّض لهجومٍ من الخارج، لا أنه تقلّص بيولوجياً.',
      'An urban legend with no science behind it. The exaggeration hides the real point: our attention is under attack from outside, not shrunken by biology.')),

  q('sf-scroll',
    L('أزا راسكِن هو مخترع «التمرير اللانهائي». ما شعوره نحو اختراعه اليوم؟',
      'Aza Raskin invented infinite scroll. How does he feel about it today?'),
    [
      L('نادم', 'He regrets it'),
      L('ما زال يمرّر، وتعذّر الوصول إليه للتعليق', 'He is still scrolling and could not be reached for comment'),
      L('فخور — يمرّر خزانة جوائزه كلّ مساء', 'Proud — he scrolls through his trophy cabinet every evening'),
    ],
    L('يقول إنه نادم: غياب «إشارة التوقّف» يُبقيك تمرّر بلا وعي، وقد حسب بنفسه الوقت الهائل الذي يسرقه من البشر كلّ يوم.',
      'He says he regrets it: with no “stopping cue” you scroll on unawares, and he has calculated the vast human time it takes every day.')),

  q('sf-pigeon',
    L('اكتشف سكِنر أضمن طريقةٍ لجعل حمامةٍ تنقر الرافعة بهوس، ثم استعارتها التطبيقات. ما هي؟',
      'Skinner found the surest way to make a pigeon peck a lever obsessively, and apps borrowed it. What is it?'),
    [
      L('أن تكون المكافأة غير متوقَّعة', 'Make the reward unpredictable'),
      L('أن ترسل لها إشعاراً: «رافعتك مشتاقةٌ إليك»', 'Send it a notification: “your lever misses you”'),
      L('أن تدفع لها بالساعة', 'Pay it by the hour'),
    ],
    L('المكافأة المتغيّرة: لا تدري متى يأتي «الإعجاب» التالي، فتواصل السحب. المبدأ نفسه من قفص الحمام إلى جيبك.',
      'The variable reward: you never know when the next “like” will come, so you keep pulling. The same principle, from the pigeon’s cage to your pocket.')),

  q('sf-provincetown',
    L('هرب يوهان هاري إلى بلدةٍ ساحلية ثلاثة أشهر بلا هاتفٍ ذكي ولا إنترنت. ماذا حدث؟',
      'Johann Hari fled to a seaside town for three months with no smartphone and no internet. What happened?'),
    [
      L('عاد إليه تركيزه — ثم عادت عاداته القديمة حين عاد', 'His focus came back — and so did his old habits, once he went home'),
      L('عُثر عليه في اليوم الثاني يسأل السيّاح عن كلمة سرّ الواي فاي', 'He was found on day two asking tourists for the Wi-Fi password'),
      L('أعجبه الأمر فصار حارس منارة', 'He liked it so much he became a lighthouse keeper'),
    ],
    L('في بروفينستاون عاد يقرأ ساعاتٍ متّصلة. لكنّ التغيير الفردي لا يصمد وحده في بيئةٍ لم تتغيّر — وهذه خلاصة الكتاب.',
      'In Provincetown he could read for hours again. But individual change cannot hold alone in an unchanged environment — which is the book’s whole argument.')),

  q('sf-four-days',
    L('منحت «مايكروسوفت اليابان» موظّفيها يوم الجمعة عطلة. ماذا حدث للإنتاجية؟',
      'Microsoft Japan gave its staff Fridays off. What happened to productivity?'),
    [
      L('ارتفعت نحو ٤٠٪', 'It rose by about 40%'),
      L('انهارت، لكنّ الجميع كان مرتاحاً فلم يكترث', 'It collapsed, but everyone was too relaxed to mind'),
      L('لا أحد يعلم: التقرير كان موعده الجمعة', 'Nobody knows: the report was due on a Friday'),
    ],
    L('ارتفعت نحو ٤٠٪ (٢٠١٩). الإنهاك قابلٌ للعكس حين يتغيّر النظام، لا الأفراد وحدهم.',
      'It rose by about 40% (2019). Exhaustion is reversible when the system changes, not only the individuals in it.')),

  q('sf-kellogg',
    L('قبل نحو قرن خفّض مصنع «كيلوغ» يوم العمل من ثماني ساعات إلى ستّ. ما الذي تغيّر؟',
      'About a century ago the Kellogg factory cut its working day from eight hours to six. What changed?'),
    [
      L('انخفضت حوادث العمل ٤١٪', 'Workplace accidents fell by 41%'),
      L('خرجت رقائق الذرة أسعد بشكلٍ ملحوظ', 'The cornflakes came out noticeably happier'),
      L('قضى العمّال الساعتين في انتظار الحافلة', 'The workers spent the two hours waiting for the bus'),
    ],
    L('انخفضت الحوادث نحو ٤١٪: العامل الأقلّ إنهاكاً أكثر انتباهاً وأماناً — دليلٌ عمره قرن.',
      'Accidents fell by about 41%: a less exhausted worker is more attentive and safer — evidence a century old.')),

  q('sf-worst-mom',
    L('تركت لينور سكينازي ابنها ذا التسع سنوات يعود وحده في مترو نيويورك، ثم كتبت عن ذلك. بماذا لقّبها الإعلام؟',
      'Lenore Skenazy let her nine-year-old ride the New York subway home alone, and wrote about it. What did the media call her?'),
    [
      L('«أسوأ أمّ في أمريكا»', '“America’s Worst Mom”'),
      L('«مفوّضة النقل العامّ للعام»', '“Transit Commissioner of the Year”'),
      L('لا شيء: وصل الولد قبلها وروى القصّة بنفسه', 'Nothing: the boy got home first and told the story himself'),
    ],
    L('وصل الطفل سالماً. وحجّتها: خوفنا المبالغ فيه يحرم الأطفال الاستقلالَ الذي يبني انتباههم وثقتهم.',
      'The child got home safe. Her point: our exaggerated fear takes from children the independence that builds their attention and confidence.')),

  q('sf-farmers',
    L('أجرى مزارعو قصب السكّر أنفسهم اختبار الذكاء مرّتين: مفلسين قبل الحصاد، ومقبوضين بعده. ما الفرق؟',
      'The same sugarcane farmers took an IQ test twice: broke before the harvest, and paid after it. The difference?'),
    [
      L('نحو ١٣ نقطة أعلى بعد أن زال همّ المال', 'About 13 points higher once the money worry lifted'),
      L('لا فرق — لكنهم بعد الحصاد رفضوا الاختبار مجّاناً', 'None — but after the harvest they refused to be tested for free'),
      L('أدنى بعد الحصاد: انشغلوا بالعدّ', 'Lower afterwards: too busy counting'),
    ],
    L('المزارع نفسه قبل المال وبعده: الفقر ضريبةٌ على الانتباه، لا عيبٌ فيه.',
      'The same farmer, before the money and after it: poverty is a tax on attention, not a flaw in it.')),

  q('sf-dyes',
    L('أعطى علماء بريطانيون ٢٩٧ طفلاً مشروباً ثم راقبوهم. ما الذي جعل بعضهم أكثر فرطاً في الحركة؟',
      'British scientists gave 297 children a drink and watched. What made some of them more hyperactive?'),
    [
      L('ألوان الطعام الصناعية الشائعة', 'Common artificial food dyes'),
      L('خبر أنه لا يوجد كوبٌ ثانٍ', 'The news that there would be no second glass'),
      L('ملصقٌ على الكوب يقول: «ممنوع الركض»', 'A sticker on the cup saying “no running”'),
    ],
    L('من شربوا الأصباغ كانوا أكثر عرضةً لفرط الحركة بوضوح. وبحسب الكتاب حظرتها دولٌ أوروبية بينما رفضت الجهات الأمريكية.',
      'The children who drank the dyes were clearly more likely to become hyperactive. According to the book, European countries banned them while US regulators refused.')),

  q('sf-newspapers',
    L('عام ١٩٨٦ كانت المعلومات التي تصل الإنسان يومياً تعادل نحو ٤٠ صحيفة. وكم صارت عام ٢٠٠٧؟',
      'In 1986 the information reaching one person each day equalled about 40 newspapers. And by 2007?'),
    [
      L('١٧٤ صحيفة', '174 newspapers'),
      L('٤١ — لكن بكلماتٍ متقاطعة أفضل', '41 — but with better crosswords'),
      L('صحيفةٌ واحدة تُقرأ ١٧٤ مرّة', 'One newspaper, read 174 times'),
    ],
    L('من ٤٠ إلى ١٧٤ في نحو عشرين عاماً. الانتباه لم يتغيّر؛ الذي تضاعف أكثر من أربع مرّات هو ما يُطلب منه.',
      'From 40 to 174 in about twenty years. Attention did not change; what is demanded of it more than quadrupled.')),

  q('sf-reading',
    L('بحلول ٢٠١٧ صار الأمريكي العادي يقرأ الكتب ١٧ دقيقة في اليوم. وكم يقضي على الهاتف؟',
      'By 2017 the average American read books for 17 minutes a day. And how long on the phone?'),
    [
      L('٥٫٤ ساعة', '5.4 hours'),
      L('١٧ دقيقة أيضاً — يقرأ فيها عن قلّة قراءته', 'Also 17 minutes — spent reading about how little they read'),
      L('صفر. كان «يتفقّد الساعة فقط»', 'Zero. They were “just checking the time”'),
    ],
    L('١٧ دقيقة قراءة مقابل ٥٫٤ ساعة على الهاتف. ونحو ٥٧٪ لا يقرؤون كتاباً واحداً في السنة.',
      '17 minutes of reading against 5.4 hours on the phone. And about 57% read no book at all in a year.')),

  q('sf-pollan',
    L('ما قاعدة الطعام البسيطة التي ينقلها الكتاب عن مايكل بولان لحماية تركيزك؟',
      'Which simple food rule does the book borrow from Michael Pollan to protect your focus?'),
    [
      L('كُل طعاماً كان أجدادك سيتعرّفون عليه', 'Eat food your grandparents would recognise'),
      L('لا تأكل شيئاً أكبر من رأسك', 'Never eat anything bigger than your head'),
      L('إن كانت الشخصية على العلبة تبتسم، فكُل علبتين', 'If the mascot on the box is smiling, eat two'),
    ],
    L('لا يوجد مكوّنٌ سحري؛ الخيط المشترك هو الطعام الكامل قليل المعالجة — وتسوّق من أطراف المتجر لا من وسطه.',
      'There is no magic ingredient; the common thread is whole, minimally processed food — and shopping the edges of the store, not the middle.')),

  q('sf-flow',
    L('درس تشيكزينتميهالي «حالة التدفّق». أيّ وصفةٍ تصنعها؟',
      'Csikszentmihalyi studied the state of “flow”. Which recipe produces it?'),
    [
      L('هدفٌ واضح، ومهمّةٌ على حافّة قدرتك، وشيءٌ يعني لك', 'A clear goal, a task at the edge of your ability, and something that matters to you'),
      L('ثلاثة فناجين قهوة، واثنا عشر تبويباً، وموعد تسليمٍ بعد ساعة', 'Three coffees, twelve open tabs and a deadline in an hour'),
      L('أن تنطق «تشيكزينتميهالي» صحيحةً من أوّل مرّة', 'Pronouncing “Csikszentmihalyi” correctly on the first try'),
    ],
    L('على حافّة قدرتك تماماً: لا سهلةٌ فتملّ، ولا صعبةٌ فتقلق — وأن يكون لها معنىً عندك.',
      'Right at the edge of your ability: not so easy that you are bored, not so hard that you are anxious — and meaningful to you.')),

  q('sf-disconnect',
    L('أصدرت فرنسا قانوناً يحمي انتباه العاملين بعد الدوام. ماذا يمنحهم؟',
      'France passed a law to protect workers’ attention after hours. What does it give them?'),
    [
      L('«الحقّ في قطع الاتّصال»: تجاهل رسائل العمل خارج الدوام', 'The “right to disconnect”: ignoring work messages outside working hours'),
      L('حقّاً قانونياً في غداءٍ من ساعتين وقيلولة', 'A legal right to a two-hour lunch and a nap'),
      L('لافتة «الرجاء عدم الإزعاج» حكومية بثلاث لغات', 'A government-issued “do not disturb” sign in three languages'),
    ],
    L('حمايةٌ قانونية للوقت الشخصي — نموذجٌ لاستعادة الانتباه بتغيير القواعد، لا بإنهاك الأفراد.',
      'Legal protection for personal time — a model of reclaiming attention by changing the rules rather than wearing individuals out.')),

  q('sf-outdoors',
    L('بحلول ٢٠٠٣، كم بقي من أطفال أمريكا يلعبون بحرّيةٍ في الخارج بانتظام؟',
      'By 2003, what share of American children still played freely outdoors on a regular basis?'),
    [
      L('عشرة بالمئة فقط', 'Only ten per cent'),
      L('٩٠٪ — والعشرة الباقون يبحثون عن أحذيتهم', '90% — the other ten were still looking for their shoes'),
      L('كلّهم، لكن داخل ألعاب الفيديو', 'All of them, but inside video games'),
    ],
    L('١٠٪ فقط. جيلٌ واحد، وانتقلت الطفولة إلى الداخل والشاشات — بينما تضخّم وقت الواجبات المدرسية ١٤٥٪.',
      'Only 10%. In one generation childhood moved indoors and onto screens — while homework time swelled by 145%.')),

  q('sf-trending',
    L('عام ٢٠١٣ كان الموضوع الرائج يبقى بين الخمسين الأوائل ١٧٫٥ ساعة. وكم صار عام ٢٠١٦؟',
      'In 2013 a trending topic stayed in the top fifty for 17.5 hours. And by 2016?'),
    [
      L('١١٫٩ ساعة — صرنا نملّ معاً، وأسرع', '11.9 hours — we get bored together, and faster'),
      L('١٧٫٥ ساعة، لكن لا أحد يذكر أيّ موضوع', '17.5 hours, though nobody remembers which topic'),
      L('أسبوعاً كاملاً، في العطل', 'A whole week, during the holidays'),
    ],
    L('من ١٧٫٥ إلى ١١٫٩ ساعة في ثلاث سنوات، والنمط نفسه على منصّاتٍ أخرى: التشتّت جماعيّ، لا فرديّ.',
      'From 17.5 to 11.9 hours in three years, with the same pattern on other platforms: the distraction is collective, not individual.')),

  q('sf-23-minutes',
    L('يقول الكتاب إن استعادة التركيز بعد المقاطعة تحتاج ٢٣ دقيقة. ماذا وجد تحقّق النادي؟',
      'The book says it takes 23 minutes to refocus after an interruption. What did the club’s own fact-check find?'),
    [
      L('الرقم من مقابلاتٍ صحفية لا من دراسةٍ منشورة، والكتاب نسبه إلى العالِم الخطأ', 'The figure comes from press interviews, not a published study — and the book credits the wrong scientist'),
      L('الصحيح ٢٣ ثانية، وفي الكتاب خطأٌ مطبعي', 'It is really 23 seconds; the book has a typo'),
      L('صحيح، لكن أيّام الاثنين فقط', 'It is true, but only on Mondays'),
    ],
    L('الرقم لغلوريا مارك لا لمايكل بوزنر، ولم يُنشر في بحثٍ محكَّم. ودراستها الفعلية وجدت أن العمل المقاطَع يُنجَز أسرع — لكن بتوتّرٍ أعلى.',
      'The figure is Gloria Mark’s, not Michael Posner’s, and it was never published in a peer-reviewed paper. Her actual study found interrupted work gets finished faster — at a cost in stress.')),

  q('sf-multitask',
    L('من يثقون تماماً بأنهم بارعون في تعدّد المهامّ يتبيّن غالباً أنهم…',
      'People who are sure they are great at multitasking usually turn out to be…'),
    [
      L('الأسوأ فيه', 'The worst at it'),
      L('على حقّ — وقد أثبتوا ذلك وهم يجيبون عن هذا السؤال وثلاث رسائل', 'Right — and they proved it while answering this question and three emails'),
      L('أخطبوطات', 'Octopuses'),
    ],
    L('لا دماغ يؤدّي مهمّتين معرفيتين معاً؛ أنت تبدّل بسرعة، وكلّ تبديلٍ يترك «بقايا انتباه» تبطّئك وتضاعف أخطاءك.',
      'No brain does two thinking tasks at once; you switch quickly, and every switch leaves an “attention residue” that slows you and multiplies your errors.')),
]

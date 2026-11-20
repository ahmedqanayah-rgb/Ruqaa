/*
 * QUESTIONS WRITTEN BY THE CLUB'S MEMBERS — dealt with the site's own, from
 * every square of every board (2026-11-19: "use them in addition to ur
 * questions"). When one repeats a question the site already had, only the
 * better of the two is kept, whichever it is.
 *
 * Each writer has the names they may join a room under — either script; the
 * match forgives case, diacritics and a second word (engine.js → `writersHere`)
 * — and their questions, in the decks' own shapes (the rules for writing them
 * are at the top of books/why-we-sleep/game.js) plus their `book` and `kind`:
 *   mcq    { id, book, kind: 'mcq', q, opts: [the right one, three wrong], why }
 *   tf     { id, book, kind: 'tf', statement, isMyth, explain, hint }
 *   num    { id, book, kind: 'num', q, a, unit?, show?, dot?, why }
 *   who    { id, book, kind: 'who', name, clues: [three], why, img? }
 *   bluff  { id, book, kind: 'bluff', q (with a ____), truth, alt?, decoys: [2+], why }
 *   graph / face — as in a book's game.js
 *   pic    { id, book, kind: 'pic', pk: 'name'|'book', img, q?, name, aliases, opts, hints, why }
 *          — the picture IS the question: no name, caption or brand in it; it
 *          lives in public/images/game/q (scripts/import-question-photos.mjs)
 *   dare   { id, book, kind: 'dare', text }            (data/game/cards.js has the rules)
 *   luck   { id, book, kind: 'luck', text, effect }    (the story only: the card prints what happens)
 * `book` may name two books, for a question that links them: it is dealt only
 * when both are in play. `src` is where in the book it comes from (for us).
 *
 * A writer's own questions are rarely dealt in a room they are playing in, and
 * NOTHING IN THE GAME SAYS SO — no name, no credit on a card, no rule on the
 * rules page. That is on purpose.
 */
export const members = {
  maria: {
    names: ['Maria', 'ماريا'],
    // Her first set (2026-11-19), as she wrote it, but for: the number question
    // on Keith Richards's snoring, dropped — it and his white lie give each other
    // away; a few words changed where one of her questions answered another, or
    // one of the site's (the three islands, Odysseus, Faust); the blood-donation
    // statement said whose claim it is, as the club's own check asks; and the
    // chance cards told as stories only.
    questions: [
      {
        "id": "maria-ws-m-psychosis",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "يشخّصك ماثيو ووكر بأنك أُصبت ليلة أمس بنوبة صريحة من الذُّهان، وبأنها ستتكرّر الليلة. ويقدّم أدلّته: رأيتَ ما ليس موجوداً، وصدّقتَ ما لا يمكن أن يكون صحيحاً، واختلط عليك الزمان والمكان والأشخاص، وتقلّبت مشاعرك بعنف. فما الدليل الخامس؟",
          "en": "Matthew Walker diagnoses you: last night you had a full-blown bout of psychosis, and it will happen again tonight. His evidence: you saw things that weren’t there, believed things that couldn’t be true, were confused about time, place and people, and swung wildly between emotions. What is the fifth piece of evidence?"
        },
        "opts": [
          {
            "ar": "نسيتَ معظم ما جرى حين استيقظت",
            "en": "You forgot most of it when you woke up"
          },
          {
            "ar": "عجزتَ عن تحريك جسدك",
            "en": "You couldn’t move your body"
          },
          {
            "ar": "سمعتَ أصواتاً تخاطبك",
            "en": "You heard voices speaking to you"
          },
          {
            "ar": "صرتَ مقتنعاً بأن أحداً يلاحقك",
            "en": "You became convinced someone was following you"
          }
        ],
        "src": "الفصل التاسع",
        "why": {
          "ar": "الدليل الخامس هو فقدان الذاكرة، إذ تستيقظ وقد نسيت معظم أحلامك أو كلها. ولو ظهرت هذه الأعراض الخمسة في اليقظة لاحتجتَ إلى علاج نفسي فوراً، أما في نوم حركة العين السريعة فهي طبيعية بل ضرورية.",
          "en": "The fifth is amnesia: you wake having forgotten most or all of your dreams. Awake, these five symptoms would need urgent psychiatric care; in REM sleep they are normal, even essential."
        }
      },
      {
        "id": "maria-ws-m-guinness",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "توقّف كتاب «غينيس» للأرقام القياسية عن تسجيل محاولات كسر الرقم القياسي للحرمان من النوم. وليبيّن ووكر حجم الخطر، ذكّر بمغامرة سجّلها الكتاب نفسه، وقال إن الحرمان من النوم أخطر منها بكثير. ما هذه المغامرة؟",
          "en": "Guinness World Records stopped accepting attempts to break the sleep-deprivation record. To show how dangerous it is, Walker recalls a feat Guinness did record, and says sleep deprivation is far riskier. What was it?"
        },
        "opts": [
          {
            "ar": "قفزة حرّة من حافة الفضاء اخترق فيها رجلٌ جدار الصوت بجسده",
            "en": "A free fall from the edge of space that broke the sound barrier"
          },
          {
            "ar": "تسلّق قمّة إيفرست دون أسطوانة أكسجين",
            "en": "Climbing Everest without bottled oxygen"
          },
          {
            "ar": "عبور شلّالات نياغارا مشياً على حبل",
            "en": "Crossing Niagara Falls on a tightrope"
          },
          {
            "ar": "الغوص بنفَس واحد إلى عمق يتجاوز مئتي متر",
            "en": "A single-breath dive to more than 200 metres"
          }
        ],
        "src": "الفصل السابع",
        "why": {
          "ar": "صعد فيليكس باومغارتنر بمنطاد إلى ارتفاع ١٢٨ ألف قدم ثم قفز، وبلغت سرعته نحو ١٣٥٨ كم في الساعة. ومع ذلك يرى ووكر أن مخاطر الحرمان من النوم أسوأ بكثير، ولهذا كفّ «غينيس» عن تسجيلها.",
          "en": "Felix Baumgartner rose 128,000 feet in a balloon and jumped, reaching about 843 mph. Even so, Walker says the risks of sleep deprivation are far worse, which is why Guinness stopped recording them."
        }
      },
      {
        "id": "maria-ws-n-microsleep",
        "book": "why-we-sleep",
        "kind": "num",
        "q": {
          "ar": "في «النوم الأصغري» يغفو السائق لحظةً وجفناه شبه مغمضين، وغالباً دون أن يدري. كم ثانية تكفي هذه الإغفاءة ليموت وهو يقود؟",
          "en": "In a “microsleep”, a driver’s eyelids half-close for a moment, often without them noticing. How many seconds of it are enough to kill you at the wheel?"
        },
        "a": 2,
        "unit": {
          "ar": "ثانية",
          "en": "seconds"
        },
        "src": "الفصل السابع",
        "why": {
          "ar": "ثانيتان فقط. على سرعة ٣٠ ميلاً في الساعة، يكفي انحراف بسيط في المقود ليأخذك إلى الجهة المقابلة من الطريق.",
          "en": "Just two. At 30 mph, a slight drift of the wheel is enough to carry you into oncoming traffic."
        }
      },
      {
        "id": "maria-ws-t-primates",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "ينام الإنسان أطول من سائر القردة، لأن دماغه الأكبر يحتاج إلى راحة أطول.",
          "en": "Humans sleep longer than all other apes and monkeys, because our bigger brains need more rest."
        },
        "isMyth": true,
        "hint": {
          "ar": "قارن الكمّية بالنوعية.",
          "en": "Compare quantity with quality."
        },
        "src": "الفصل الرابع",
        "explain": {
          "ar": "العكس تماماً: ننام نحو ثماني ساعات، والقرود من عشر ساعات إلى خمس عشرة. أما ما يميّزنا فهو نوم الأحلام: من ٢٠ إلى ٢٥٪ من نومنا، مقابل نحو ٩٪ عندها.",
          "en": "The opposite: we sleep about eight hours, other primates ten to fifteen. What sets us apart is dream sleep: 20–25% of our sleep, against about 9% for them."
        }
      },
      {
        "id": "maria-ws-m-trees",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "بحسب نظرية ووكر، ما الذي جعل نوم الأحلام عند الإنسان أكثف منه عند سائر الرئيسيات؟",
          "en": "According to Walker’s theory, what made dream sleep so much richer in humans than in other primates?"
        },
        "opts": [
          {
            "ar": "انتقال أسلافنا من النوم على الأشجار إلى النوم على الأرض",
            "en": "Our ancestors moving from sleeping in trees to sleeping on the ground"
          },
          {
            "ar": "اكتشاف النار وطهو الطعام",
            "en": "The discovery of fire and cooking"
          },
          {
            "ar": "طول أعمارنا مقارنةً ببقية الرئيسيات",
            "en": "Our longer lives compared with other primates"
          },
          {
            "ar": "حاجة اللغة إلى وقت أطول لتنظيم الكلمات",
            "en": "Language needing more time to sort out words"
          }
        ],
        "src": "الفصل الرابع",
        "why": {
          "ar": "يرى ووكر أن انتقال النوم من الشجرة إلى الأرض هو ما أتاح نوم أحلام كثيفاً، وأن هذا النوم صقل سمتين تميّزاننا: تعقيدنا الاجتماعي والثقافي، وذكاءنا.",
          "en": "Walker argues that moving sleep from tree to ground allowed intense REM sleep, which then shaped the two traits that set us apart: our social and cultural complexity, and our intelligence."
        }
      },
      {
        "id": "maria-ws-n-siesta",
        "book": "why-we-sleep",
        "kind": "num",
        "q": {
          "ar": "تابع باحثون أكثر من ٢٣ ألف يوناني بالغ ست سنوات، ترك كثير منهم خلالها قيلولة ما بعد الظهر. بكم في المئة ارتفع خطر موت هؤلاء بأمراض القلب؟",
          "en": "Researchers followed more than 23,000 Greek adults for six years, during which many gave up the afternoon siesta. By what percentage did their risk of dying from heart disease rise?"
        },
        "a": 37,
        "unit": {
          "ar": "٪",
          "en": "%"
        },
        "src": "الفصل الرابع",
        "why": {
          "ar": "٣٧٪، وتجاوزت الزيادة ٦٠٪ عند الرجال العاملين.",
          "en": "37%, and more than 60% among working men."
        }
      },
      {
        "id": "maria-ws-b-ikaria",
        "book": "why-we-sleep",
        "kind": "bluff",
        "q": {
          "ar": "في جزيرة إيكاريا اليونانية، حيث ما زالت القيلولة عادة يومية، يبلغ الرجال التسعين بأربعة أضعاف ما يبلغها الأمريكيون. ولهذا توصف «مجتمعات القيلولة» بأنها الأماكن التي ينسى فيها الناس أن ____.",
          "en": "On the Greek island of Ikaria, where the siesta survives, men are four times as likely as American men to reach ninety. That is why these “siesta communities” are called the places where people forget to ____."
        },
        "truth": {
          "ar": "يموتوا",
          "en": "die"
        },
        "alt": [
          "يموتوا",
          "يموتون",
          "يموت",
          "الموت",
          "die",
          "to die",
          "dying"
        ],
        "decoys": [
          {
            "ar": "يكبروا",
            "en": "grow old"
          },
          {
            "ar": "يستيقظوا",
            "en": "wake up"
          },
          {
            "ar": "يعملوا",
            "en": "work"
          }
        ],
        "src": "الفصل الرابع",
        "why": {
          "ar": "يرى ووكر في ذلك دليلاً على أن النوم على مرحلتين أصيل فينا، وأن التخلّي عنه يقصّر أعمارنا.",
          "en": "For Walker this shows that two-phase sleep is built into us, and that giving it up shortens our lives."
        }
      },
      {
        "id": "maria-ws-m-shakespeare",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "يقول ووكر إن كثيراً من «اكتشافات» القرن العشرين عن فوائد النوم ورد قبل ذلك بقرون، باختصار، في عمل أدبي واحد. أيّ عمل؟",
          "en": "Walker says many of the twentieth century’s “discoveries” about the benefits of sleep had appeared centuries earlier, in brief, in a single literary work. Which one?"
        },
        "opts": [
          {
            "ar": "مسرحية «ماكبث» لشكسبير",
            "en": "Shakespeare’s Macbeth"
          },
          {
            "ar": "«الأوديسة» لهوميروس",
            "en": "Homer’s Odyssey"
          },
          {
            "ar": "«ألف ليلة وليلة»",
            "en": "One Thousand and One Nights"
          },
          {
            "ar": "«دون كيخوته» لثربانتس",
            "en": "Cervantes’s Don Quixote"
          }
        ],
        "src": "الفصل السادس",
        "why": {
          "ar": "في المشهد الثاني من الفصل الثاني يصف شكسبير النوم بأنه «العنصر المغذّي الأكبر» في الحياة. ولهذا جعل ووكر عنوان فصله السادس: أمّك تعرف، وشكسبير يعرف أيضاً.",
          "en": "In Act 2, Scene 2, Shakespeare calls sleep the “chief nourisher in life’s feast”. Hence Walker’s sixth chapter: your mother knew, and so did Shakespeare."
        }
      },
      {
        "id": "maria-ws-w-loewi",
        "book": "why-we-sleep",
        "kind": "who",
        "name": {
          "ar": "أوتو لوفي",
          "en": "Otto Loewi"
        },
        "clues": [
          {
            "ar": "حلم بتجربة على قلبَي ضفدعين.",
            "en": "He dreamed up an experiment on two frogs’ hearts."
          },
          {
            "ar": "أثبت أن الخلايا العصبية تتخاطب بموادّ كيميائية، لا بإشارة كهربائية مباشرة.",
            "en": "He proved that nerve cells talk through chemicals, not a direct electrical signal."
          },
          {
            "ar": "نال جائزة نوبل بفكرة جاءته في الحلم.",
            "en": "He won a Nobel Prize for an idea that came to him in a dream."
          }
        ],
        "src": "الفصل الحادي عشر",
        "img": "./images/characters/otto-loewi.webp",
        "why": {
          "ar": "أوتو لوفي، عالم الأعصاب الذي قاده حلمه إلى اكتشاف النواقل العصبية.",
          "en": "Otto Loewi, the neuroscientist whose dream led him to discover neurotransmitters."
        }
      },
      {
        "id": "maria-ws-b-richards",
        "book": "why-we-sleep",
        "kind": "bluff",
        "q": {
          "ar": "كان كيث ريتشاردز، عازف فرقة «رولينغ ستونز»، ينام وإلى جانبه غيتار و____، ليحفظ ما يأتيه من أفكار في الليل. ومن هذه العادة وُلدت افتتاحية أغنية «Satisfaction» عام ١٩٦٥.",
          "en": "Keith Richards of the Rolling Stones slept with a guitar and a ____ beside his bed, to keep whatever ideas came in the night. That habit gave us the opening riff of “Satisfaction” in 1965."
        },
        "truth": {
          "ar": "آلة تسجيل",
          "en": "tape recorder"
        },
        "alt": [
          "آلة تسجيل",
          "الة تسجيل",
          "آلة التسجيل",
          "مسجلة",
          "مسجّلة",
          "جهاز تسجيل",
          "مسجل",
          "tape recorder",
          "recorder",
          "cassette recorder",
          "tape"
        ],
        "decoys": [
          {
            "ar": "دفتر نوتات موسيقية",
            "en": "notebook of sheet music"
          },
          {
            "ar": "قلم وأوراق نوتة",
            "en": "pencil and manuscript paper"
          },
          {
            "ar": "بيانو كهربائي صغير",
            "en": "small electric piano"
          }
        ],
        "src": "الفصل الحادي عشر",
        "why": {
          "ar": "في السابع من أيار ١٩٦٥، في فندق بفلوريدا، استيقظ ليجد الشريط ممتلئاً حتى آخره. أعاده إلى أوّله فسمع نسخة ضبابية من بداية الأغنية، تلتها أربعون دقيقة من الشخير.",
          "en": "On 7 May 1965, in a Florida hotel, he woke to find the tape run to the end. Rewound, it held a hazy take of the song’s opening, followed by forty minutes of snoring."
        }
      },
      {
        "id": "maria-ws-t-decaf",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "القهوة منزوعة الكافيين خالية من الكافيين، فلا ضرر منها على النوم مهما شربت منها مساءً.",
          "en": "Decaf coffee is caffeine-free, so it can’t hurt your sleep however much you drink in the evening."
        },
        "isMyth": true,
        "hint": {
          "ar": "«منزوعة» لا تعني «خالية».",
          "en": "“Decaffeinated” doesn’t mean “caffeine-free”."
        },
        "src": "الفصل الثاني",
        "explain": {
          "ar": "يحتوي فنجانها على ١٥ إلى ٣٠٪ من كافيين الفنجان العادي، وثلاثة أو أربعة فناجين منها مساءً تضرّ نومك بقدر فنجان عادي.",
          "en": "A cup holds 15–30% of a regular cup’s caffeine; three or four in the evening do as much harm to your sleep as one regular coffee."
        }
      },
      {
        "id": "maria-ws-t-vaccine",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "من نام أربع ساعات فقط في الليالي التي سبقت لقاح الإنفلونزا يستعيد استجابته المناعية كاملة إذا عوّض نومه في الأسابيع التالية.",
          "en": "If you slept only four hours a night before your flu shot, catching up on sleep in the following weeks fully restores your immune response."
        },
        "isMyth": true,
        "hint": {
          "ar": "تذكّر رأي ووكر في «تعويض» النوم.",
          "en": "Remember what Walker thinks of “catching up” on sleep."
        },
        "src": "الفصل الثامن",
        "explain": {
          "ar": "أنتج المحرومون من النوم أقلّ من نصف الأجسام المضادة التي أنتجها من ناموا جيداً، ولم تُصلح ذلك حتى أسابيع من النوم التعويضي. وبقي نقص في نوع من الخلايا المناعية ملحوظاً بعد سنة كاملة.",
          "en": "The sleep-deprived made less than half the antibodies of those who slept well, and even weeks of recovery sleep did not fix it. A shortfall in one type of immune cell was still measurable a year later."
        }
      },
      {
        "id": "maria-ws-m-maze",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "سجّل علماء نشاط أدمغة فئران تعلّمت طريقها في متاهة، ثم واصلوا التسجيل وهي نائمة. بأيّ سرعة أعادت أدمغتها «تشغيل» المتاهة في نوم الأحلام؟",
          "en": "Scientists recorded the brains of rats learning a maze, then kept recording while they slept. At what speed did their brains replay the maze during dream sleep?"
        },
        "opts": [
          {
            "ar": "أبطأ: بنصف سرعة اليقظة أو ربعها",
            "en": "Slower: at half or even a quarter of waking speed"
          },
          {
            "ar": "أسرع بعشرين مرة",
            "en": "Twenty times faster"
          },
          {
            "ar": "بالسرعة نفسها تماماً",
            "en": "At exactly the same speed"
          },
          {
            "ar": "بالعكس، من نهاية المتاهة إلى بدايتها",
            "en": "Backwards, from the end of the maze to the start"
          }
        ],
        "src": "الفصل الثالث",
        "why": {
          "ar": "هذا التباطؤ قد يفسّر لماذا نشعر بأن الحلم استغرق وقتاً أطول ممّا استغرقه فعلاً.",
          "en": "This slowdown may explain why dreams feel longer than they really are."
        }
      },
      {
        "id": "maria-ws-m-prazosin",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "وصف الطبيب راسكيند في سياتل دواءً لضغط الدم لمحاربين قدامى يعانون اضطراب ما بعد الصدمة، فلاحظ أثراً جانبياً لم يتوقّعه. ما هو؟",
          "en": "In Seattle, Dr Raskind prescribed a blood-pressure drug to veterans with PTSD, and noticed a side effect he never expected. What was it?"
        },
        "opts": [
          {
            "ar": "توقّفت كوابيسهم المتكرّرة",
            "en": "Their recurring nightmares stopped"
          },
          {
            "ar": "صاروا يتذكّرون أحلامهم كلها",
            "en": "They began remembering all their dreams"
          },
          {
            "ar": "صاروا ينامون ضعف ما كانوا ينامون",
            "en": "They slept twice as long"
          },
          {
            "ar": "اختفى عندهم شلل النوم",
            "en": "Their sleep paralysis disappeared"
          }
        ],
        "src": "الفصل العاشر",
        "why": {
          "ar": "خفّض دواء «برازوسين» النورأدرينالين في الدماغ أثناء نوم الأحلام، فعاد إليهم نوم أحلام صحّي وتراجعت كوابيسهم.",
          "en": "Prazosin lowered noradrenaline in the brain during REM sleep, giving them healthy dream sleep again, and the nightmares receded."
        }
      },
      {
        "id": "maria-ws-p-mimosa",
        "book": "why-we-sleep",
        "kind": "pic",
        "q": {
          "ar": "ما اسم هذه النبتة؟",
          "en": "What is this plant?"
        },
        "name": {
          "ar": "الميموزا المستحيّة",
          "en": "Mimosa pudica, the sensitive plant"
        },
        "aliases": [
          "ميموزا",
          "الميموزا",
          "المستحية",
          "المستحيّة",
          "الميموزا المستحية",
          "mimosa",
          "mimosa pudica",
          "sensitive plant",
          "shy plant"
        ],
        "opts": [
          {
            "ar": "الميموزا المستحيّة",
            "en": "Mimosa pudica, the sensitive plant"
          },
          {
            "ar": "زهرة عبّاد الشمس",
            "en": "Sunflower"
          },
          {
            "ar": "نبتة خانق الذباب",
            "en": "Venus flytrap"
          },
          {
            "ar": "زهرة اللوتس",
            "en": "Lotus"
          }
        ],
        "hints": [
          {
            "ar": "وضعها عالم فرنسي في صندوق مظلم سنة ١٧٢٩.",
            "en": "A French scientist shut it in a dark box in 1729."
          },
          {
            "ar": "ظلّت أوراقها تنفتح نهاراً وتنكمش ليلاً رغم الظلام.",
            "en": "Its leaves kept opening by day and folding at night, even in the dark."
          }
        ],
        "src": "الفصل الثاني",
        "pk": "name",
        "img": "./images/game/q/ws-mimosa.webp",
        "why": {
          "ar": "بها اكتشف جان جاك دو ميران أن للكائنات الحيّة ساعة داخلية لا تنتظر إشارة الشمس.",
          "en": "With it, Jean-Jacques d’Ortous de Mairan discovered that living things keep their own internal clock, without waiting for the sun."
        }
      },
      {
        "id": "maria-ws-d-forecast",
        "book": "why-we-sleep",
        "kind": "dare",
        "text": {
          "ar": "أنت مذيع النشرة الجوية: قدّم في عشرين ثانية «توقّعات ضغط النوم» لهذا اليوم، من الاستيقاظ حتى منتصف الليل. تنجح إن ضحك أحد.",
          "en": "You’re the weather presenter: in twenty seconds, give today’s “sleep-pressure forecast”, from waking up to midnight. You pass if anyone laughs."
        }
      },
      {
        "id": "maria-ws-l-siesta",
        "book": "why-we-sleep",
        "kind": "luck",
        "text": {
          "ar": "تخلّيت عن قيلولة الظهيرة، كما فعل اليونانيون في الدراسة.",
          "en": "You gave up your afternoon siesta, like the Greeks in the study."
        },
        "effect": {
          "kind": "move",
          "n": -2
        }
      },
      {
        "id": "maria-sf-t-wikipedia",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "وجد سونه ليمان أن انتباهنا الجماعي تقلّص في كل مصدر بيانات درسه، من تويتر إلى ويكيبيديا.",
          "en": "Sune Lehmann found our collective attention shrinking in every data source he studied, from Twitter to Wikipedia."
        },
        "isMyth": true,
        "hint": {
          "ar": "هل ظهر النمط نفسه في كل المصادر بلا استثناء؟",
          "en": "Did the same pattern show up in every source, without exception?"
        },
        "src": "السبب الأول",
        "explain": {
          "ar": "تقلّص الانتباه في تويتر وبحث غوغل وتذاكر السينما وريديت، أما في ويكيبيديا فبقي الانتباه للموضوعات ثابتاً. وهي الاستثناء الوحيد الذي حيّر الباحثين في الدراسة.",
          "en": "Attention shrank on Twitter, Google searches, cinema tickets and Reddit, but on Wikipedia attention to topics stayed steady: the one puzzling exception in the study."
        }
      },
      {
        "id": "maria-sf-b-macintosh",
        "book": "stolen-focus",
        "kind": "bluff",
        "q": {
          "ar": "نشأ آزا راسكن في قلب وادي السيليكون، فأبوه جف راسكن هو الرجل الذي ابتكر ____ لشركة ستيف جوبز، على مبدأ أن انتباه المستخدم «مقدّس».",
          "en": "Aza Raskin grew up at the heart of Silicon Valley: his father, Jef Raskin, created the ____ for Steve Jobs’s company, on the principle that the user’s attention is sacred."
        },
        "truth": {
          "ar": "آبل ماكنتوش",
          "en": "Apple Macintosh"
        },
        "alt": [
          "ماكنتوش",
          "الماكنتوش",
          "آبل ماكنتوش",
          "ابل ماكنتوش",
          "ماك",
          "macintosh",
          "apple macintosh",
          "the macintosh",
          "mac",
          "the mac"
        ],
        "decoys": [
          {
            "ar": "فأرة الحاسوب",
            "en": "computer mouse"
          },
          {
            "ar": "جهاز «آيبود»",
            "en": "iPod"
          },
          {
            "ar": "متجر التطبيقات",
            "en": "App Store"
          }
        ],
        "src": "السبب السادس (القسم الأول)",
        "why": {
          "ar": "صمّم الأب «ماكنتوش» ليحرس انتباه المستخدم، ثم اخترع الابن «التمرير اللانهائي» الذي يستنزفه، وندم عليه لاحقاً.",
          "en": "The father designed the Macintosh to protect the user’s attention; the son invented infinite scroll, which drains it, and came to regret it."
        }
      },
      {
        "id": "maria-sf-b-williams",
        "book": "stolen-focus",
        "kind": "bluff",
        "q": {
          "ar": "وقف جيمس ويليامز، الذي عمل مسؤولاً عن الاستراتيجية في غوغل، أمام مئات من كبار مصمّمي التكنولوجيا وسألهم: من منكم يريد أن يعيش في ____؟ فساد الصمت، ولم يرفع أحد يده.",
          "en": "James Williams, once a strategist at Google, asked hundreds of top tech designers: who here wants to live in ____? The room fell silent. Nobody raised a hand."
        },
        "truth": {
          "ar": "العالم الذي نصمّمه",
          "en": "the world we’re designing"
        },
        "alt": [
          "العالم الذي نصممه",
          "العالم الذي نصمّمه",
          "العالم الذي نصنعه",
          "عالمنا الذي نصممه",
          "the world we're designing",
          "the world we are designing",
          "the world we design",
          "the world we're building"
        ],
        "decoys": [
          {
            "ar": "مدينة بلا إنترنت",
            "en": "a city without internet"
          },
          {
            "ar": "بيت ذكيّ بالكامل",
            "en": "a fully smart home"
          },
          {
            "ar": "وادي السيليكون",
            "en": "Silicon Valley"
          }
        ],
        "src": "السبب السادس (القسم الأول)",
        "why": {
          "ar": "كشف سؤاله البسيط أن من يصمّمون التكنولوجيا لا يريدون العيش في العالم الذي يصنعونه.",
          "en": "His simple question showed that the people designing the technology don’t want to live in the world they are making."
        }
      },
      {
        "id": "maria-sf-w-eyal",
        "book": "stolen-focus",
        "kind": "who",
        "name": {
          "ar": "نير إيال",
          "en": "Nir Eyal"
        },
        "clues": [
          {
            "ar": "أرسله أهله في مراهقته إلى «مخيّم البدناء»، ثم أدرك أنه كان «يأكل مشاعره».",
            "en": "As a teenager he was sent to a “fat camp”, and later realised he had been “eating his emotions”."
          },
          {
            "ar": "درس في «مختبر تكنولوجيا الإقناع» بجامعة ستانفورد، وساعد شركات كبرى على جعل المستخدمين «مرتبطين» بتطبيقاتها.",
            "en": "He studied at Stanford’s Persuasive Technology Lab and helped big companies get users “hooked” on their apps."
          },
          {
            "ar": "بينما كانت ابنته تقرأ له سؤالاً عن القوّة الخارقة التي تتمنّاها، نظر إلى رسالة في هاتفه، فلمّا رفع رأسه كانت قد ذهبت.",
            "en": "While his daughter read out a question about which superpower she’d choose, he glanced at a text; when he looked up, she had gone."
          }
        ],
        "src": "السبب السابع",
        "img": "./images/characters/nir-eyal.webp",
        "why": {
          "ar": "نير إيال، مصمّم التكنولوجيا الذي يرى الحلّ في ضبط النفس الفردي، وهي مقاربة يناقشها هاري ويردّ عليها.",
          "en": "Nir Eyal, the tech designer who places the answer in individual self-control, an approach Hari examines and pushes back on."
        }
      },
      {
        "id": "maria-sf-w-czeisler",
        "book": "stolen-focus",
        "kind": "who",
        "name": {
          "ar": "تشارلز تشايزلر",
          "en": "Charles Czeisler"
        },
        "clues": [
          {
            "ar": "علّموه في كلية الطب أن الدماغ يتوقّف عن العمل في النوم، فأمضى بعدها أربعين عاماً يدرسه.",
            "en": "At medical school he was taught that the brain switches off in sleep; he then spent forty years studying it."
          },
          {
            "ar": "يستشيره فريق البيسبول «بوسطن رِد سوكس» والاستخبارات الأمريكية.",
            "en": "The Boston Red Sox and US intelligence consult him."
          },
          {
            "ar": "اكتشف أن أجزاء من دماغك قد تنام وعيناك مفتوحتان، وهي حالة اسمها «النوم الموضعي».",
            "en": "He found that parts of your brain can fall asleep while your eyes are open, a state called “local sleep”."
          }
        ],
        "src": "السبب الثالث، ويظهر أيضاً في «لماذا ننام»",
        "img": "./images/characters/charles-czeisler.webp",
        "why": {
          "ar": "تشارلز تشايزلر، أستاذ في كلية الطب بجامعة هارفارد. ويظهر أيضاً في «لماذا ننام» زميلاً لماثيو ووكر، فمن قرأ الكتابين يعرفه مرّتين.",
          "en": "Charles Czeisler, professor at Harvard Medical School. He also appears in Why We Sleep as Walker’s colleague, so readers of both books meet him twice."
        }
      },
      {
        "id": "maria-sf-t-kids",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "يستجيب الأطفال لقلّة النوم كما يستجيب الكبار: بالنعاس والخمول.",
          "en": "Children react to too little sleep the way adults do: by getting drowsy and sluggish."
        },
        "isMyth": true,
        "hint": {
          "ar": "تذكّر طفلاً متعباً قبل موعد نومه: هل يهدأ؟",
          "en": "Picture an overtired child at bedtime. Do they calm down?"
        },
        "src": "السبب الثالث",
        "explain": {
          "ar": "الكبار ينعسون، أما الأطفال فيصيرون مفرطي النشاط، وأوّل الأعراض وأوضحها عجزهم عن الانتباه، كما قال تشارلز تشايزلر لهاري.",
          "en": "Adults get sleepy; children get hyperactive, and the first and clearest symptom is that they can’t pay attention, as Charles Czeisler told Hari."
        }
      },
      {
        "id": "maria-sf-n-85",
        "book": "stolen-focus",
        "kind": "num",
        "q": {
          "ar": "على امتداد القرن الماضي، كم دقيقة من نوم كلّ ليلة خسرها الطفل؟",
          "en": "Over the past century, how many minutes of sleep a night has the average child lost?"
        },
        "a": 85,
        "unit": {
          "ar": "دقيقة",
          "en": "minutes"
        },
        "src": "السبب الثالث",
        "why": {
          "ar": "٨٥ دقيقة كلّ ليلة. ومنذ عام ١٩٤٢ نقص متوسّط نوم الفرد في الليلة ساعة كاملة.",
          "en": "85 minutes a night. And since 1942 the average person’s night of sleep has shrunk by a full hour."
        }
      },
      {
        "id": "maria-sf-m-prichard",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "قاست أستاذة علم النفس روكسان بريتشارد نوم طلّابها الجامعيين، فوجدت أن نصيب الطالب العادي من النوم الجيد يشبه نصيب…",
          "en": "Psychology professor Roxanne Prichard measured her college students’ sleep, and found the average student gets about as much good sleep as…"
        },
        "opts": [
          {
            "ar": "جنديّ في الخدمة الفعلية، أو أمّ وضعت طفلها للتو",
            "en": "a soldier on active duty, or a mother with a newborn"
          },
          {
            "ar": "متقاعد في السبعين من عمره",
            "en": "a retiree in their seventies"
          },
          {
            "ar": "طيّار في رحلات المسافات الطويلة",
            "en": "a long-haul airline pilot"
          },
          {
            "ar": "عامل مناوبات ليلية في مصنع",
            "en": "a night-shift factory worker"
          }
        ],
        "src": "السبب الثالث",
        "why": {
          "ar": "كانوا يغفون لحظة إطفاء الأنوار في القاعة، واعتادوا الإرهاق منذ أواخر المراهقة حتى ظنّوه حالة طبيعية.",
          "en": "They nodded off as soon as the lecture-hall lights dimmed, and had been exhausted since their late teens for so long that it felt normal."
        }
      },
      {
        "id": "maria-sf-b-resignation",
        "book": "stolen-focus",
        "kind": "bluff",
        "q": {
          "ar": "في أوّل يوم لهم في إحدى شركات «السيتي» بلندن، كان الموظفون الجدد يجدون أمامهم على الطاولة ____ مطبوعاً، ويُطلب منهم أن يوقّعوه.",
          "en": "On their first day at a City of London firm, new employees found a printed ____ waiting on the table, and were told to sign it."
        },
        "truth": {
          "ar": "خطاب استقالتهم",
          "en": "resignation letter"
        },
        "alt": [
          "خطاب استقالتهم",
          "خطاب الاستقالة",
          "خطاب استقالة",
          "استقالتهم",
          "استقالة",
          "الاستقالة",
          "كتاب استقالة",
          "resignation letter",
          "their resignation letter",
          "resignation",
          "a resignation letter"
        ],
        "decoys": [
          {
            "ar": "تعهّد بعدم استخدام الهاتف في المكتب",
            "en": "pledge not to use their phone at work"
          },
          {
            "ar": "عقد يمنعهم من العمل لدى المنافسين",
            "en": "non-compete contract"
          },
          {
            "ar": "جدول ساعاتهم الإضافية للسنة كلها",
            "en": "year’s schedule of overtime"
          }
        ],
        "src": "السبب الثامن",
        "why": {
          "ar": "كانت الرسالة: من يُغضب المدير فخطابه جاهز. عاش أندرو بارنز ذلك في شبابه، قبل أن يجرّب في شركته بنيوزيلندا أسبوع عمل من أربعة أيام.",
          "en": "The message: annoy the boss and the letter is ready. Andrew Barnes lived through this when he was young, before trying a four-day week at his own company in New Zealand."
        }
      },
      {
        "id": "maria-sf-n-guardian",
        "book": "stolen-focus",
        "kind": "num",
        "q": {
          "ar": "حين جرّبت شركة «بربتشوال غارديان» النيوزيلندية أسبوع عمل من أربعة أيام بالأجر نفسه، بكم في المئة انخفض الوقت الذي يقضيه موظفوها على وسائل التواصل أثناء العمل؟",
          "en": "When New Zealand’s Perpetual Guardian tried a four-day week on the same pay, by what percentage did staff time on social media at work fall?"
        },
        "a": 35,
        "unit": {
          "ar": "٪",
          "en": "%"
        },
        "src": "السبب الثامن",
        "why": {
          "ar": "٣٥٪. وارتفع الاندماج في العمل من ٣٠ إلى ٤٠٪، وتراجع التوتر ١٥٪، وأقرّت الإدارة بأن الشركة أنجزت في أربعة أيام ما كانت تنجزه في خمسة.",
          "en": "35%. Engagement rose from 30% to 40%, stress fell 15%, and management agreed the firm got five days’ work done in four."
        }
      },
      {
        "id": "maria-sf-m-flags",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "في أحد مكاتب «بربتشوال غارديان»، اتّفق الموظفون على إشارة يضعها من لا يريد أن يقاطعه أحد. ما هي؟",
          "en": "In one Perpetual Guardian office, staff agreed on a signal that meant “please don’t interrupt me”. What was it?"
        },
        "opts": [
          {
            "ar": "علم صغير على المكتب",
            "en": "A little flag on the desk"
          },
          {
            "ar": "سمّاعات حمراء على الأذنين",
            "en": "Red headphones"
          },
          {
            "ar": "كأس مقلوبة على المكتب",
            "en": "An upturned cup on the desk"
          },
          {
            "ar": "لافتة «مشغول» على ظهر الكرسي",
            "en": "A “busy” sign on the back of the chair"
          }
        ],
        "src": "السبب الثامن",
        "why": {
          "ar": "اشتروا مجموعة أعلام صغيرة؛ من يرى العلم على مكتب زميله يعرف أن عليه ألّا يفسد تركيزه.",
          "en": "They bought a set of little flags; anyone who saw one on a colleague’s desk knew not to break their focus."
        }
      },
      {
        "id": "maria-sf-n-outrage",
        "book": "stolen-focus",
        "kind": "num",
        "q": {
          "ar": "وجدت دراسة في جامعة نيويورك أن كلّ كلمة تثير النفور الأخلاقي، إذا أضفتها إلى تغريدتك، ترفع معدّل إعادة تغريدها. بكم في المئة في المتوسط؟",
          "en": "A New York University study found that each morally outraged word you add to a tweet raises its retweet rate. By how much, on average?"
        },
        "a": 20,
        "unit": {
          "ar": "٪",
          "en": "%"
        },
        "src": "السبب السادس (القسم الثاني)",
        "why": {
          "ar": "٢٠٪ لكلّ كلمة، وأقواها أثراً «هجوم» و«شرير» و«لوم». ولهذا ستُغضبك حتماً خوارزمية همّها إبقاؤك أمام الشاشة.",
          "en": "20% per word, with “attack”, “evil” and “blame” the strongest. So an algorithm built to keep you on the screen will end up making you angry."
        }
      },
      {
        "id": "maria-sf-b-precommit",
        "book": "stolen-focus",
        "kind": "bluff",
        "q": {
          "ar": "يرى هاري في أوديسيوس، الذي ربطه بحّارته إلى الصاري كي لا يستسلم لغناء الحوريات، أقدمَ مثال على أسلوب اسمه ____.",
          "en": "Hari sees Odysseus, tied to the mast by his crew so he couldn’t give in to the sirens’ song, as the oldest example of a technique called ____."
        },
        "truth": {
          "ar": "الالتزام المسبق",
          "en": "pre-commitment"
        },
        "alt": [
          "الالتزام المسبق",
          "التزام مسبق",
          "الالتزام المسبّق",
          "pre-commitment",
          "precommitment",
          "pre commitment"
        ],
        "decoys": [
          {
            "ar": "الامتناع الواعي",
            "en": "conscious abstinence"
          },
          {
            "ar": "التحصين الذاتي",
            "en": "self-inoculation"
          },
          {
            "ar": "التأجيل المتعمّد",
            "en": "deliberate delay"
          }
        ],
        "src": "السبب الأول",
        "why": {
          "ar": "أن تقيّد نفسك اليوم لأنك تعرف أنك ستضعف غداً. ورحلة هاري إلى بروفنستاون كانت صيغة متطرّفة منه، بدأت هي أيضاً على متن سفينة.",
          "en": "Bind yourself today because you know you’ll weaken tomorrow. Hari’s trip to Provincetown was an extreme version, and it too began on a boat."
        }
      },
      {
        "id": "maria-sf-m-letgrow",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "في مشروع «دعوهم ينمون»، بنى تلميذ مشتّت الانتباه نموذج قارب صغير. ماذا قرّر أن يبني بعده؟",
          "en": "In the Let Grow project, a distracted pupil built a small model boat. What did he decide to build next?"
        },
        "opts": [
          {
            "ar": "عربة بالحجم الحقيقي لينام فيها في فناء البيت",
            "en": "A full-size wagon to sleep in, in the back yard"
          },
          {
            "ar": "بيتاً للطيور على شجرة الحديقة",
            "en": "A birdhouse in the garden tree"
          },
          {
            "ar": "طائرة ورقية بطول مترين",
            "en": "A two-metre kite"
          },
          {
            "ar": "كوخاً من الكرتون في غرفته",
            "en": "A cardboard den in his bedroom"
          }
        ],
        "src": "السبب الثاني عشر",
        "why": {
          "ar": "جمع باباً قديماً وعيدان خيزران من الجيران وأدوات أبيه، وصار يقرأ ليعرف كيف يبني، وهو الذي كانت أمّه تكافح ليقرأ. ثم قرّر بناء عربة برمائية.",
          "en": "He gathered an old door, bamboo canes from the neighbours and his dad’s tools, and started reading to learn how to build it, a boy whose mother used to struggle to get him to read. Then he decided to build an amphibious one."
        }
      },
      {
        "id": "maria-sf-p-ksafe",
        "book": "stolen-focus",
        "kind": "pic",
        "q": {
          "ar": "ما هذه؟",
          "en": "What is this?"
        },
        "name": {
          "ar": "خزنة الهاتف ذات المؤقّت",
          "en": "a timed phone safe (kSafe)"
        },
        "aliases": [
          "خزنة",
          "الخزنة",
          "خزنة الهاتف",
          "خزنة بمؤقت",
          "خزنة بمؤقّت",
          "كي سيف",
          "ksafe",
          "phone safe",
          "timed safe",
          "timer safe",
          "kitchen safe"
        ],
        "opts": [
          {
            "ar": "خزنة الهاتف ذات المؤقّت",
            "en": "a timed phone safe (kSafe)"
          },
          {
            "ar": "حصّالة",
            "en": "Piggy bank"
          },
          {
            "ar": "صندوق بريد",
            "en": "Mailbox"
          },
          {
            "ar": "علبة طعام",
            "en": "Lunchbox"
          }
        ],
        "hints": [
          {
            "ar": "تضع فيها هاتفك وتضبطها من ربع ساعة إلى أسبوعين.",
            "en": "You lock your phone inside for anything from 15 minutes to two weeks."
          },
          {
            "ar": "أوّل التغييرات الستة التي أدخلها هاري على حياته في خاتمة الكتاب.",
            "en": "The first of six changes Hari made to his life in the book’s conclusion."
          }
        ],
        "src": "الخاتمة",
        "pk": "name",
        "img": "./images/game/q/sf-ksafe.webp",
        "why": {
          "ar": "خزنة الهاتف ذات المؤقّت: أداة هاري في «الالتزام المسبق»، ومعها برنامج يقطع الإنترنت عن حاسوبه مدّة يحدّدها بنفسه.",
          "en": "The timed phone safe: Hari’s pre-commitment tool, alongside a program that cuts his laptop off from the internet for as long as he chooses."
        }
      },
      {
        "id": "maria-sf-d-notifications",
        "book": "stolen-focus",
        "kind": "dare",
        "text": {
          "ar": "اقرأ بصوت عالٍ أوّل فقرة من أقرب كتاب إليك (أو من أيّ نصّ على شاشتك)، بينما يقلّد الآخرون أصوات الإشعارات ليقاطعوك. تنجح إن أكملتها دون أن تتوقّف أو تضحك.",
          "en": "Read aloud the first paragraph of the nearest book (or any text on your screen) while everyone else makes notification sounds to interrupt you. You pass if you finish without stopping or laughing."
        }
      },
      {
        "id": "maria-sf-l-flag",
        "book": "stolen-focus",
        "kind": "luck",
        "text": {
          "ar": "وضعت علماً صغيراً على مكتبك، فلم يقاطعك أحد.",
          "en": "You put a little flag on your desk, and nobody interrupted you."
        },
        "effect": {
          "kind": "again"
        }
      },
      {
        "id": "maria-td-b-redemption",
        "book": "talking-to-my-daughter",
        "kind": "bluff",
        "q": {
          "ar": "يطلق المصرفيون على تسديد القرض مع فائدته اسم ____، ولهذا نجا فاوست في مسرحية غوته.",
          "en": "Bankers call repaying a loan with interest ____, which is why Goethe’s Faust escapes hell."
        },
        "truth": {
          "ar": "الخلاص",
          "en": "redemption"
        },
        "alt": [
          "الخلاص",
          "خلاص",
          "خلاصا",
          "خلاصاً",
          "redemption",
          "salvation"
        ],
        "decoys": [
          {
            "ar": "براءة الذمّة",
            "en": "a clean slate"
          },
          {
            "ar": "التسوية",
            "en": "settlement"
          },
          {
            "ar": "الوفاء",
            "en": "fulfilment"
          }
        ],
        "src": "الفصل الثالث",
        "why": {
          "ar": "في عصر مارلو كان أخذ الفائدة خطيئة، فعوقب فاوست. وحين كتب غوته مسرحيته كانت أوروبا قد صارت مجتمع سوق يقبل الدَّين بفائدة ما دام يُسدَّد، فنال فاوست «الخلاص». وهي الكلمة نفسها التي يطلقها الممولون على تسديد القرض.",
          "en": "In Marlowe’s day, charging interest was a sin, so Faust was punished. By Goethe’s time Europe had become a market society that accepted interest-bearing debt as long as it was repaid, so Faust earns “redemption”, the very word financiers use for paying off a loan."
        }
      },
      {
        "id": "maria-td-m-faust",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "يقارن فاروفاكيس بين فاوست مارلو وفاوست غوته. ما الذي دفع كلّاً منهما إلى استحضار الشيطان؟",
          "en": "Varoufakis compares Marlowe’s Faust with Goethe’s. What drove each of them to summon the devil?"
        },
        "opts": [
          {
            "ar": "فاوست مارلو: تمرّد ديني وفلسفي. فاوست غوته: رغبة مبتذلة في القوّة الشخصية",
            "en": "Marlowe’s: a religious and philosophical revolt. Goethe’s: a base craving for personal power"
          },
          {
            "ar": "فاوست مارلو: رغبة مبتذلة في القوّة الشخصية. فاوست غوته: تمرّد ديني وفلسفي",
            "en": "Marlowe’s: a base craving for personal power. Goethe’s: a religious and philosophical revolt"
          },
          {
            "ar": "فاوست مارلو: حبّ امرأة. فاوست غوته: شغف بالمعرفة",
            "en": "Marlowe’s: love for a woman. Goethe’s: a passion for knowledge"
          },
          {
            "ar": "الدافع واحد عند الاثنين: الخوف من الموت",
            "en": "The same for both: fear of death"
          }
        ],
        "src": "الفصل الثالث",
        "why": {
          "ar": "واختلفت النهايتان أيضاً: مارلو أرسل فاوست إلى الجحيم، وغوته أنقذه، لأن أوروبا كانت قد صارت مجتمع سوق يتقبّل الدَّين بفائدة.",
          "en": "The endings differ too: Marlowe sends Faust to hell, while Goethe saves him, because Europe had become a market society that accepted interest-bearing debt."
        }
      },
      {
        "id": "maria-td-t-blood",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "بحسب الكتاب، تجمع البلدان التي تدفع للمتبرّعين بالدم دماً أكثر من البلدان التي يتبرّع فيها الناس مجاناً.",
          "en": "According to the book, countries that pay blood donors collect more blood than countries where people give it for free."
        },
        "isMyth": true,
        "hint": {
          "ar": "تذكّر غطسة كسينيا لأجل القبطان كوستاس.",
          "en": "Remember Xenia’s dive for Captain Kostas."
        },
        "src": "الفصل الثاني",
        "explain": {
          "ar": "العكس، بحسب فاروفاكيس وتيتموس: يُجمع دم أقلّ، لأن المال يُفسد متعة العطاء ولا يكفي لتعويضها. هذا مثاله على الخلط بين القيمة التبادلية والقيمة التي لا تُباع. (وتحقّق النادي في الفصل الثاني يبيّن أن الدراسات اللاحقة لم تؤكّد ذلك إلا جزئياً.)",
          "en": "The opposite, say Varoufakis and Titmuss: less blood is collected, because payment spoils the pleasure of giving and doesn’t make up for it. It’s his example of confusing exchange value with the kind of value that isn’t for sale. (The club’s check in chapter two: later studies bear this out only in part.)"
        }
      },
      {
        "id": "maria-td-b-wilde",
        "book": "talking-to-my-daughter",
        "kind": "bluff",
        "q": {
          "ar": "يستشهد فاروفاكيس بأوسكار وايلد: المتهكّم شخص يعرف ____ كلّ شيء، لكنه لا يدرك قيمة أيّ شيء.",
          "en": "Varoufakis quotes Oscar Wilde: a cynic is a person who knows the ____ of everything and the value of nothing."
        },
        "truth": {
          "ar": "ثمن",
          "en": "price"
        },
        "alt": [
          "ثمن",
          "الثمن",
          "سعر",
          "السعر",
          "أسعار",
          "price",
          "the price",
          "cost"
        ],
        "decoys": [
          {
            "ar": "تاريخ",
            "en": "history"
          },
          {
            "ar": "عيوب",
            "en": "flaws"
          },
          {
            "ar": "اسم",
            "en": "name"
          }
        ],
        "src": "الفصل الثاني",
        "why": {
          "ar": "ويقول فاروفاكيس إن مجتمعاتنا تميل إلى جعلنا جميعاً متهكّمين، ولا أحد أكثر تهكّماً من اقتصاديّ يرى القيمة التبادلية القيمةَ الوحيدة.",
          "en": "Our societies, he says, tend to turn us all into cynics, and nobody is more cynical than an economist who sees exchange value as the only value."
        }
      },
      {
        "id": "maria-td-m-easter",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "يوم أحد الفصح، بعد يومين من الطبخ والترتيب، طلب فاروفاكيس من ابنته أن تساعده في ترتيب البيت. ماذا عرضت عليه لتُعفى من المهمّة؟",
          "en": "On Easter Sunday, after two days of cooking and tidying, Varoufakis asked his daughter to help clear up. What did she offer so she could get out of it?"
        },
        "opts": [
          {
            "ar": "أن تدفع له من حصّالتها",
            "en": "To pay him from her piggy bank"
          },
          {
            "ar": "أن تغسل الأطباق غداً بدلاً من اليوم",
            "en": "To do the dishes tomorrow instead"
          },
          {
            "ar": "أن تطبخ العشاء في الفصح القادم",
            "en": "To cook dinner next Easter"
          },
          {
            "ar": "أن تغطس لتحرّر مرساة القبطان كوستاس",
            "en": "To dive and free Captain Kostas’s anchor"
          }
        ],
        "src": "الفصل الثاني",
        "why": {
          "ar": "أجابها بأن لا ثمن يكفي للتخفيف من خيبة أمله. فبين أفراد العائلة تبادل من نوع آخر، يقوم على الروابط لا على المال.",
          "en": "He replied that no price would ease his disappointment. Within a family there is another kind of exchange, built on bonds rather than money."
        }
      },
      {
        "id": "maria-td-n-patmos",
        "book": "talking-to-my-daughter",
        "kind": "num",
        "q": {
          "ar": "اشتكى أندرياس، صديق فاروفاكيس، من أنه عاجز عن بيع بيته الصيفي في جزيرة باتموس. كم يورو عرض عليه فاروفاكيس ثمناً للبيت؟",
          "en": "Varoufakis’s friend Andreas complained that he couldn’t sell his summer house on the island of Patmos. How many euros did Varoufakis offer him for it?"
        },
        "a": 10,
        "unit": {
          "ar": "يورو",
          "en": "euros"
        },
        "src": "الفصل الخامس",
        "why": {
          "ar": "عشرة يوروهات. مزحة تكشف الفرق بين العجز عن البيع والعجز عن نيل الثمن المطلوب، وهو المنطق نفسه الذي يجعل «منكري البطالة» يلومون العاطلين عن العمل.",
          "en": "Ten euros. A joke that shows the gap between being unable to sell and not getting your price, the same logic “unemployment deniers” use to blame the jobless."
        }
      },
      {
        "id": "maria-td-n-virtual",
        "book": "talking-to-my-daughter",
        "kind": "num",
        "q": {
          "ar": "يقول فاروفاكيس لابنته إن النقود الافتراضية ليست اختراعاً رقمياً حديثاً. منذ كم سنة وُجدت؟",
          "en": "Varoufakis tells his daughter that virtual money is no recent digital invention. How many years has it existed?"
        },
        "a": 12000,
        "unit": {
          "ar": "سنة",
          "en": "years"
        },
        "src": "الفصل الأول",
        "why": {
          "ar": "منذ نحو اثني عشر ألف عام، مع الثورة الزراعية وأوّل فائض. كانت سجلّات الحساب في بلاد ما بين النهرين تقيّد قمحاً بقيمة قطع معدنية لم تُسكّ بعد.",
          "en": "About twelve thousand years, since the agricultural revolution produced the first surplus. Mesopotamian ledgers recorded wheat worth metal coins that had not yet been minted."
        }
      },
      {
        "id": "maria-td-b-timetravel",
        "book": "talking-to-my-daughter",
        "kind": "bluff",
        "q": {
          "ar": "يصوّر فاروفاكيس أصحاب المشاريع مسافرين عبر الزمن، يمدّون أيديهم عبر غشاء إلى المستقبل ليجلبوا منه قيمة لم تُنتج بعد. أما المصرفيون في هذه الصورة فهم ____.",
          "en": "Varoufakis pictures entrepreneurs as time travellers, reaching through a membrane into the future to bring back value not yet produced. In this picture, bankers are their ____."
        },
        "truth": {
          "ar": "وكلاء سفرهم",
          "en": "travel agents"
        },
        "alt": [
          "وكلاء سفرهم",
          "وكلاء السفر",
          "وكلاء سفر",
          "وكيل سفر",
          "وكلاء سفر عبر الزمن",
          "وكلاء سفرهم عبر الزمن",
          "travel agents",
          "their travel agents",
          "time-travel agents",
          "travel agent"
        ],
        "decoys": [
          {
            "ar": "حرّاس بوّابة الزمن",
            "en": "gatekeepers"
          },
          {
            "ar": "صانعو آلة الزمن",
            "en": "time-machine builders"
          },
          {
            "ar": "ركّاب الرحلة معهم",
            "en": "fellow passengers"
          }
        ],
        "src": "الفصل الرابع",
        "why": {
          "ar": "صاحب المشروع يقترض قيمة تبادلية من المستقبل ليموّل حاضره، والمصرفي يرتّب له الرحلة بالقرض. وإن أخطأ قراءة المستقبل أفلس.",
          "en": "The entrepreneur borrows exchange value from the future to fund the present, and the banker books the trip with a loan. Misread the future, and the business fails."
        }
      },
      {
        "id": "maria-td-b-kerosene",
        "book": "talking-to-my-daughter",
        "kind": "bluff",
        "q": {
          "ar": "في رواية «عناقيد الغضب» التي يستشهد بها فاروفاكيس، جاع ملايين البشر بينما أُلقيت أطنان البطاطا في النهر، ورُشّت صناديق البرتقال بـ____ لتصير غير صالحة للأكل.",
          "en": "In The Grapes of Wrath, which Varoufakis cites, millions went hungry while tons of potatoes were dumped in a river and crates of oranges were sprayed with ____ to make them inedible."
        },
        "truth": {
          "ar": "الكيروسين",
          "en": "kerosene"
        },
        "alt": [
          "الكيروسين",
          "كيروسين",
          "الكاز",
          "كاز",
          "kerosene",
          "kerosine",
          "paraffin"
        ],
        "decoys": [
          {
            "ar": "الجير",
            "en": "lime"
          },
          {
            "ar": "الملح",
            "en": "salt"
          },
          {
            "ar": "الطلاء الأسود",
            "en": "black paint"
          }
        ],
        "src": "الفصل الرابع",
        "why": {
          "ar": "هذا ما يحدث حين يعجز الاقتصاد عن «إعادة التدوير»: فائض يُتلف وبشر يجوعون. وفي قلب هذا العجز، كما يقول فاروفاكيس، شخصية مألوفة: المصرفي.",
          "en": "This is what happens when an economy can no longer “recycle”: surplus destroyed while people starve. And at the heart of that failure, he says, stands a familiar figure: the banker."
        }
      },
      {
        "id": "maria-td-m-engine",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "يشبّه فاروفاكيس الاقتصاد بمحرّك: الدَّين وقوده، وقوّة العمل شرارة الإشعال فيه. فماذا يكون المال في هذا المحرّك؟",
          "en": "Varoufakis likens the economy to an engine: debt is its fuel, and labour power the spark that ignites it. What, then, is money?"
        },
        "opts": [
          {
            "ar": "الشحم الذي يتوقّف المحرّك من دونه",
            "en": "The grease without which the engine seizes"
          },
          {
            "ar": "العادم الذي يخرج منه",
            "en": "The exhaust it gives off"
          },
          {
            "ar": "المقود الذي يوجّهه",
            "en": "The steering wheel that directs it"
          },
          {
            "ar": "عدّاد السرعة الذي يقيس أداءه",
            "en": "The speedometer that measures it"
          }
        ],
        "src": "الفصل الخامس",
        "why": {
          "ar": "ولأن قوّة العمل والمال قادران على تشغيل المحرّك وإيقافه معاً، لا تختفي البطالة بمجرّد خفض الأجور أو أسعار الفائدة، كما يظنّ «منكرو البطالة».",
          "en": "Because labour and money can both start the engine and stall it, unemployment doesn’t vanish just by cutting wages or interest rates, as the “unemployment deniers” believe."
        }
      },
      {
        "id": "maria-td-m-oedipus",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "لماذا يسمّي فاروفاكيس سوق العمل وسوق المال «سوقين أوديبيّين»؟",
          "en": "Why does Varoufakis call the labour market and the money market “Oedipal markets”?"
        },
        "opts": [
          {
            "ar": "لأن التوقّعات فيهما تحقّق نفسها كنبوءة أوديب: يتشاءم أصحاب المشاريع فيُحجمون، فيتحقّق تشاؤمهم",
            "en": "Because expectations there fulfil themselves, like Oedipus’s prophecy: entrepreneurs turn gloomy, hold back, and make their gloom come true"
          },
          {
            "ar": "لأنهما ينقلبان على الدولة التي أوجدتهما، كما قتل أوديب أباه",
            "en": "Because they turn on the state that created them, as Oedipus killed his father"
          },
          {
            "ar": "لأن من يدخلهما لا يعرف حقيقته إلا بعد فوات الأوان",
            "en": "Because whoever enters them learns the truth only when it is too late"
          },
          {
            "ar": "لأن سوفوكليس كان أوّل من كتب عن البطالة",
            "en": "Because Sophocles was the first to write about unemployment"
          }
        ],
        "src": "الفصل الخامس",
        "why": {
          "ar": "حين يرى أصحاب المشاريع الأجور والفائدة تهبط، يتوقّعون الركود فيُحجمون عن الاقتراض والتوظيف، فتهبط أكثر. ولهذا يقول فاروفاكيس إن سوفوكليس لو كتب أعمدة الشؤون المالية لفهمنا الأزمات بسهولة أكبر.",
          "en": "When entrepreneurs see wages and interest rates falling, they expect a slump, stop borrowing and hiring, and push them lower still. Had Sophocles written the financial columns, Varoufakis says, crises would be far easier to understand."
        }
      },
      {
        "id": "maria-td-m-matrix",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "لماذا اخترعت الآلات «المصفوفة» في الفيلم، كما يرويه فاروفاكيس لابنته؟",
          "en": "Why did the machines invent the Matrix, as Varoufakis tells the film’s story to his daughter?"
        },
        "opts": [
          {
            "ar": "لأن البشر المحبوسين في الحاضنات كانوا يموتون سريعاً من دون تفاعل أو أمل أو حرّية",
            "en": "Because humans kept in pods died quickly without contact, hope or freedom"
          },
          {
            "ar": "لتمنع البشر من الهرب من الحاضنات",
            "en": "To stop humans escaping from the pods"
          },
          {
            "ar": "لتسلّي البشر ريثما تنتهي الحرب",
            "en": "To entertain humans until the war was over"
          },
          {
            "ar": "لتعلّم البشر لغة الآلات",
            "en": "To teach humans the language of machines"
          }
        ],
        "src": "الفصل السادس",
        "why": {
          "ar": "احتاجت الآلات حرارة أجسادنا مصدراً للطاقة بعد أن حجبنا الشمس، فاخترعت واقعاً افتراضياً يُبقينا أحياء وغافلين عن عبوديتنا.",
          "en": "The machines needed our body heat for energy after we had blotted out the sun, so they invented a virtual reality that keeps us alive and unaware of our enslavement."
        }
      },
      {
        "id": "maria-td-t-marx",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "بحسب فاروفاكيس، تأثّر كارل ماركس برواية «فرانكنشتاين» لماري شيلي.",
          "en": "According to Varoufakis, Karl Marx was influenced by Mary Shelley’s Frankenstein."
        },
        "isMyth": false,
        "hint": {
          "ar": "كلاهما رأى في ما نصنعه بأيدينا قوّة قد تنقلب علينا.",
          "en": "Both saw in what we make with our own hands a power that might turn against us."
        },
        "src": "الفصل السادس",
        "explain": {
          "ar": "حقيقة. يقول فاروفاكيس إن ماركس تأثّر بها على وجه الخصوص، وإن من يجيدون الكتابة عن الاقتصاد يستعيرون أفضل أفكارهم من الفنانين والروائيين والعلماء.",
          "en": "True. Varoufakis says Marx was especially influenced by it, and that the best writers on economics borrow their best ideas from artists, novelists and scientists."
        }
      },
      {
        "id": "maria-td-m-robots",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "كيف نفلت من أن نصير عبيداً لآلاتنا، بحسب فاروفاكيس؟",
          "en": "How do we avoid becoming slaves to our machines, according to Varoufakis?"
        },
        "opts": [
          {
            "ar": "بأن نجعل البشر جميعاً شركاء في ملكية الروبوتات",
            "en": "By making everyone a co-owner of the robots"
          },
          {
            "ar": "بأن نحطّم الآلات كما فعل محطّمو الآلات",
            "en": "By smashing the machines, as the Luddites did"
          },
          {
            "ar": "بأن نمنع الذكاء الاصطناعي بقانون",
            "en": "By banning artificial intelligence by law"
          },
          {
            "ar": "بأن نعود إلى اقتصاد المقايضة",
            "en": "By going back to a barter economy"
          }
        ],
        "src": "الفصل السادس",
        "why": {
          "ar": "مشكلته ليست مع الآلات بل مع من يملكها. وحلّه للمال والتكنولوجيا وموارد الكوكب واحد: إضفاء طابع ديمقراطي عليها.",
          "en": "His problem isn’t with machines but with who owns them. And his answer for money, technology and the planet’s resources is the same: democratise them."
        }
      },
      {
        "id": "maria-td-t-slogans",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "يرى فاروفاكيس أن الأقوياء والمؤسسات يفضّلون شعار «إضفاء طابع ديمقراطي على كلّ شيء!».",
          "en": "Varoufakis says the powerful and the corporations favour the slogan “Democratise everything!”"
        },
        "isMyth": true,
        "hint": {
          "ar": "الشعار الآخر في التصادم هو «تسليع كلّ شيء!».",
          "en": "The other slogan in the clash is “Commodify everything!”"
        },
        "src": "الفصل الثامن",
        "explain": {
          "ar": "الأقوياء يفضّلون «تسليع كلّ شيء!»، أما «إضفاء طابع ديمقراطي على كلّ شيء!» فهو توصية الكتاب نفسه. ويتوقّع فاروفاكيس أن يحدّد التصادم بين الشعارين مستقبل ابنته.",
          "en": "The powerful favour “Commodify everything!”; “Democratise everything!” is the book’s own recommendation. He expects the clash between the two to shape his daughter’s future."
        }
      },
      {
        "id": "maria-td-w-paris",
        "book": "talking-to-my-daughter",
        "kind": "who",
        "name": {
          "ar": "باريس",
          "en": "Paris"
        },
        "clues": [
          {
            "ar": "يرافق أهله في القارب إلى مطعم على شاطئ ماراثوناس في إيجينا.",
            "en": "He comes along in the boat to a seaside restaurant at Marathonas, on Aegina."
          },
          {
            "ar": "يُضحك الجميع بدعاباته، حتى كسينيا.",
            "en": "His jokes make everyone laugh, Xenia included."
          },
          {
            "ar": "لو دفعنا له مقابل كلّ دعابة، لربما خجل وفقد روح الدعابة.",
            "en": "Pay him for each joke, and he might turn shy and lose his sense of humour."
          }
        ],
        "src": "الفصل الثاني",
        "img": "./images/characters/paris.webp",
        "why": {
          "ar": "باريس، ابن الأصدقاء الصغير. دعاباته مثال فاروفاكيس على قيمة لا يقيسها سعر.",
          "en": "Paris, the friends’ little boy. His jokes are Varoufakis’s example of value that no price can measure."
        }
      },
      {
        "id": "maria-td-p-scrooge",
        "book": "talking-to-my-daughter",
        "kind": "pic",
        "q": {
          "ar": "من هذا البخيل؟",
          "en": "Who is this miser?"
        },
        "name": {
          "ar": "إبنزر سكروج",
          "en": "Ebenezer Scrooge"
        },
        "aliases": [
          "سكروج",
          "إبنزر سكروج",
          "ابنزر سكروج",
          "إبنيزر سكروج",
          "scrooge",
          "ebenezer scrooge",
          "ebenezer"
        ],
        "opts": [
          {
            "ar": "إبنزر سكروج",
            "en": "Ebenezer Scrooge"
          },
          {
            "ar": "شايلوك",
            "en": "Shylock"
          },
          {
            "ar": "فاوست",
            "en": "Faust"
          },
          {
            "ar": "أوليفر تويست",
            "en": "Oliver Twist"
          }
        ],
        "hints": [
          {
            "ar": "بخيل يجعله فاروفاكيس نقيضاً لفاوست.",
            "en": "A miser Varoufakis sets against Faust."
          },
          {
            "ar": "زاره شبح عيد الميلاد المنتظر فأراه موته.",
            "en": "The Ghost of Christmas Yet to Come showed him his own death."
          }
        ],
        "src": "الفصل الثالث",
        "pk": "name",
        "img": "./images/game/q/td-scrooge.webp",
        "why": {
          "ar": "سكروج من «ترنيمة عيد الميلاد» لديكنز. لو كنّا جميعاً مثله نكنز ولا ننفق، لتوقّف اقتصاد مجتمعات السوق.",
          "en": "Scrooge, from Dickens’s A Christmas Carol. If we all hoarded like him and never spent, market economies would grind to a halt."
        }
      },
      {
        "id": "maria-td-d-mephisto",
        "book": "talking-to-my-daughter",
        "kind": "dare",
        "text": {
          "ar": "أنت مفيستوفيليس: اعرض على أحد الحاضرين أربعاً وعشرين سنة من النعيم مقابل شيء يملكه، وأقنعه بالتوقيع. تنجح إن قَبِل.",
          "en": "You’re Mephistopheles: offer someone on the call twenty-four years of bliss in exchange for something they own, and talk them into signing. You pass if they accept."
        }
      },
      {
        "id": "maria-td-l-redemption",
        "book": "talking-to-my-daughter",
        "kind": "luck",
        "text": {
          "ar": "مثل فاوست غوته، سدّدتَ دَينك قبل حلول الأجل.",
          "en": "Like Goethe’s Faust, you paid off your debt before it fell due."
        },
        "effect": {
          "kind": "move",
          "n": 2
        }
      },
      {
        "id": "maria-x-m-islands",
        "book": [
          "why-we-sleep",
          "talking-to-my-daughter"
        ],
        "kind": "mcq",
        "q": {
          "ar": "في كتبنا ثلاث جزر يونانية: إيكاريا، وإيجينا، وباتموس. أيّ ربط صحيح؟",
          "en": "Three Greek islands appear in our books: Ikaria, Aegina and Patmos. Which pairing is right?"
        },
        "opts": [
          {
            "ar": "إيكاريا: قيلولة وعمر مديد · إيجينا: كُتب فيها كتاب الاقتصاد · باتموس: بيت صيفي لم يجد صاحبه من يشتريه",
            "en": "Ikaria: siestas and long lives · Aegina: where the economics book was written · Patmos: a summer house its owner couldn’t sell"
          },
          {
            "ar": "إيكاريا: بيت صيفي لم يجد صاحبه من يشتريه · إيجينا: قيلولة وعمر مديد · باتموس: كُتب فيها كتاب الاقتصاد",
            "en": "Ikaria: a summer house its owner couldn’t sell · Aegina: siestas and long lives · Patmos: where the economics book was written"
          },
          {
            "ar": "إيكاريا: كُتب فيها كتاب الاقتصاد · إيجينا: بيت صيفي لم يجد صاحبه من يشتريه · باتموس: قيلولة وعمر مديد",
            "en": "Ikaria: where the economics book was written · Aegina: a summer house its owner couldn’t sell · Patmos: siestas and long lives"
          },
          {
            "ar": "إيكاريا: قيلولة وعمر مديد · إيجينا: بيت صيفي لم يجد صاحبه من يشتريه · باتموس: كُتب فيها كتاب الاقتصاد",
            "en": "Ikaria: siestas and long lives · Aegina: a summer house its owner couldn’t sell · Patmos: where the economics book was written"
          }
        ],
        "src": "«لماذا ننام» الفصل الرابع · «الاقتصاد» المقدّمة والفصل الخامس",
        "why": {
          "ar": "إيكاريا من «لماذا ننام»، ويبلغ رجالها التسعين بأربعة أضعاف الأمريكيين. وفي إيجينا كتب فاروفاكيس كتابه. وفي باتموس بيت صديقه أندرياس الذي عجز عن بيعه.",
          "en": "Ikaria is from Why We Sleep: its men reach ninety four times as often as Americans. On Aegina, Varoufakis wrote his book. On Patmos stands the summer house his friend Andreas couldn’t sell."
        }
      },
      {
        "id": "maria-x-m-odysseus",
        "book": [
          "stolen-focus",
          "talking-to-my-daughter"
        ],
        "kind": "mcq",
        "q": {
          "ar": "يظهر أوديسيوس في كتابين من كتبنا. ما دوره في كلّ منهما؟",
          "en": "Odysseus turns up in two of our books. What part does he play in each?"
        },
        "opts": [
          {
            "ar": "«تركيزنا المسلوب»: يُربط إلى الصاري كي لا يستسلم لغناء الحوريات · «الاقتصاد…»: يفوز بدروع أخيل بقوّة حججه",
            "en": "Stolen Focus: tied to the mast so he can’t give in to the sirens · Talking to My Daughter: wins Achilles’s armour by the strength of his arguments"
          },
          {
            "ar": "«تركيزنا المسلوب»: يفوز بدروع أخيل بقوّة حججه · «الاقتصاد…»: يُربط إلى الصاري كي لا يستسلم لغناء الحوريات",
            "en": "Stolen Focus: wins Achilles’s armour by argument · Talking to My Daughter: tied to the mast so he can’t give in to the sirens"
          },
          {
            "ar": "«لماذا ننام»: يحلم بحصان طروادة قبل أن يبنيه · «الاقتصاد…»: يشتري دروع أخيل في مزاد",
            "en": "Why We Sleep: dreams up the Trojan horse before building it · Talking to My Daughter: buys Achilles’s armour at auction"
          },
          {
            "ar": "«تركيزنا المسلوب»: يسدّ أذنيه بالشمع ويقود السفينة بنفسه · «الاقتصاد…»: يبيع الحصان الخشبي لأهل طروادة",
            "en": "Stolen Focus: plugs his ears with wax and steers the ship himself · Talking to My Daughter: sells the wooden horse to the Trojans"
          }
        ],
        "src": "«تركيزنا المسلوب» السبب الأول · «الاقتصاد» الفصل الثاني",
        "why": {
          "ar": "في «تركيزنا المسلوب» يربطه بحّارته إلى الصاري كي لا يستسلم لغناء الحوريات. وفي «الاقتصاد كما أشرحه لابنتي» يفوز بدروع أخيل على آياس بحججه لا بماله، لأن بيع الدروع في مزاد كان سيُعدّ إهانة.",
          "en": "In Stolen Focus his crew bind him to the mast so he can’t give in to the sirens. In Talking to My Daughter he wins Achilles’s armour from Ajax by argument, not money, because auctioning it would have been an insult."
        }
      },
      {
        "id": "maria-x-m-dickens",
        "book": [
          "talking-to-my-daughter",
          "stolen-focus"
        ],
        "kind": "mcq",
        "q": {
          "ar": "يظهر تشارلز ديكنز في كتابين من كتبنا. ما الصلة به في كلّ منهما؟",
          "en": "Charles Dickens appears in two of our books. What is the connection in each?"
        },
        "opts": [
          {
            "ar": "«تركيزنا المسلوب»: حاول هاري قراءة رواياته في بروفنستاون فوجد عينيه تمسحان الصفحات كأنها مدوّنة · «الاقتصاد…»: بطله سكروج نقيض فاوست",
            "en": "Stolen Focus: Hari tried to read him in Provincetown and found himself skimming like a blog · Talking to My Daughter: his Scrooge is Faust’s opposite"
          },
          {
            "ar": "«لماذا ننام»: كتب إحدى رواياته بعد حلم · «الاقتصاد…»: بطله سكروج نقيض فاوست",
            "en": "Why We Sleep: wrote one of his novels after a dream · Talking to My Daughter: his Scrooge is Faust’s opposite"
          },
          {
            "ar": "«تركيزنا المسلوب»: كان يكتب ست ساعات يومياً بلا مقاطعة · «الاقتصاد…»: يقرأ فاروفاكيس رواياته لابنته قبل النوم",
            "en": "Stolen Focus: wrote six hours a day without interruption · Talking to My Daughter: Varoufakis reads his novels to his daughter at bedtime"
          },
          {
            "ar": "«تركيزنا المسلوب»: يستشهد به هاري في مدح الملل · «لماذا ننام»: كان يعاني الأرق ويمشي في الليل",
            "en": "Stolen Focus: quoted by Hari in praise of boredom · Why We Sleep: an insomniac who walked at night"
          }
        ],
        "src": "«تركيزنا المسلوب» السببان الثاني والرابع · «الاقتصاد» الفصل الثالث",
        "why": {
          "ar": "في بروفنستاون اكتشف هاري أن عادة القراءة السريعة على الشاشة لحقت به إلى الورق. وفي «الاقتصاد كما أشرحه لابنتي» يجعل فاروفاكيس سكروج، البخيل الذي يكنز ولا ينفق، نقيضاً لفاوست الذي يستمتع بحياته بالدَّين.",
          "en": "In Provincetown Hari found his screen-skimming habit had followed him onto paper. In Talking to My Daughter, Scrooge, the miser who hoards and never spends, is Faust’s opposite, a man who enjoys life on credit."
        }
      }
    ],
  },
  majd: {
    names: ['Majd', 'مجد'],
    // The second version of Majd's question bank (2026-11-20): 100 multiple-choice
    // and true/false questions, each with its answer, explanation and page, put
    // into the decks' shapes in both languages. 67 are here; the other 33 are
    // questions the game already asks, so only the better version is kept, as
    // the club asked (the commit lists which). Changed from what was written:
    // the options evened out (the right one first, wrong ones a half-informed
    // player could believe, no throwaway jokes); four facts put right against
    // the books (73% of US elementary schools still have recess, not 37%; Hari's
    // dad, not his grandfather, drove a bus; Poincaré was stepping onto a bus;
    // reading is "one of" the most common forms of flow); and lines taken out
    // where they would answer another question or repeat a refuted figure (the
    // 23 minutes, 18°C, the drink-drive hours, Mendeleev's dream, the 2003
    // outdoor-play figure, credere, debtors' prisons, Faust).
    questions: [
      {
        "id": "majd-1",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "ما المادّة التي تتراكم في دماغك كلّما طالت يقظتك فتصنع «ضغط النوم»، ويزاحمها الكافيين على مستقبِلاتها؟",
          "en": "Which chemical builds up in your brain the longer you stay awake, creating “sleep pressure” — the one caffeine elbows off its receptors?"
        },
        "opts": [
          {
            "ar": "الأدينوزين",
            "en": "Adenosine"
          },
          {
            "ar": "الميلاتونين",
            "en": "Melatonin"
          },
          {
            "ar": "الكورتيزول",
            "en": "Cortisol"
          },
          {
            "ar": "الدوبامين",
            "en": "Dopamine"
          }
        ],
        "src": "ص 22، 43",
        "why": {
          "ar": "الأدينوزين. والكافيين لا يزيله، بل يحتلّ مستقبِلاته فيحجب عنك إشارة النعاس.",
          "en": "Adenosine. Caffeine doesn’t clear it away; it squats on its receptors and muffles the signal that you’re sleepy."
        }
      },
      {
        "id": "majd-2",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "ما سبب «انهيار الكافيين»، ذلك النعاس المفاجئ الثقيل حين يزول مفعول القهوة؟",
          "en": "What causes the “caffeine crash”, the sudden heavy sleepiness when the coffee wears off?"
        },
        "opts": [
          {
            "ar": "مادّة النعاس ظلّت تتراكم خلف الكافيين ساعاتٍ، فتصل كلّها دفعةً واحدة",
            "en": "The sleepy chemical kept piling up behind the caffeine, and hits all at once"
          },
          {
            "ar": "الكافيين يستنزف سكّر الدم، فيهبط فجأةً حين ينتهي مفعوله",
            "en": "Caffeine burns through your blood sugar, which crashes when it wears off"
          },
          {
            "ar": "القهوة تُجفّف الجسم، والجفاف يجلب الخمول بعد ساعات",
            "en": "Coffee dehydrates you, and dehydration brings on fatigue hours later"
          },
          {
            "ar": "الكافيين يُفرغ مخزون الأدرينالين، فيحتاج الجسم ساعاتٍ ليعوّضه",
            "en": "Caffeine empties your adrenaline stores, which take hours to refill"
          }
        ],
        "src": "ص 45",
        "why": {
          "ar": "الأدينوزين لم يتوقّف عن التراكم وأنت تشرب. فحين يفكّك الكبد الكافيين تشعر بالنعاس الذي دفعك إلى القهوة، مضافاً إليه كلّ ما تراكم بعدها.",
          "en": "Adenosine never stopped building while you drank. When your liver breaks the caffeine down, you feel the sleepiness that sent you for coffee, plus everything that piled up since."
        }
      },
      {
        "id": "majd-3",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "كلّما تقدّم بنا العمر صار الجسم أبطأ في التخلّص من الكافيين، فيصير فنجان العصر أشدّ إضراراً بالنوم.",
          "en": "As we age, the body clears caffeine more slowly, so an afternoon coffee does more harm to sleep."
        },
        "isMyth": false,
        "hint": {
          "ar": "مَن يفكّك الكافيين في الجسم، وهل يبقى على حاله مع السنين؟",
          "en": "Who breaks caffeine down in the body — and does it stay the same over the years?"
        },
        "src": "ص 43–45",
        "explain": {
          "ar": "وللجينات دورٌ أيضاً: إنزيم الكبد الذي يفكّك الكافيين أبطأ عند بعض الناس، فيبقى فنجان الصباح في دمهم معظم النهار. ونصف عمر الكافيين في المتوسّط بين خمس ساعات وسبع.",
          "en": "Genes play a part too: in some people the liver enzyme that breaks caffeine down is slower, so the morning cup lingers most of the day. Caffeine’s half-life averages five to seven hours."
        }
      },
      {
        "id": "majd-4",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "ما الدور الحقيقي للميلاتونين في النوم، بحسب ووكر؟",
          "en": "What is melatonin’s real role in sleep, according to Walker?"
        },
        "opts": [
          {
            "ar": "يعلن أن الليل حلّ، كمسدّس انطلاق السباق، ولا يصنع النوم نفسه",
            "en": "It announces that night has come, like a starting pistol, but doesn’t make the sleep"
          },
          {
            "ar": "هو الذي يصنع النوم العميق، وكلّما زاد كان النوم أعمق",
            "en": "It produces deep sleep — the more of it, the deeper you sleep"
          },
          {
            "ar": "يتراكم طوال النهار، فيشتدّ النعاس كلّما طالت اليقظة",
            "en": "It builds up all day, so the longer you’re awake, the sleepier you get"
          },
          {
            "ar": "يُطفئ نشاط الدماغ ليلاً كي ترتاح خلاياه",
            "en": "It switches the brain off at night so its cells can rest"
          }
        ],
        "src": "ص 35",
        "why": {
          "ar": "الميلاتونين يضبط توقيت النوم ولا يشارك في صنعه، كالحَكَم الذي يُطلق مسدّس البداية ولا يركض. لذلك فائدته دواءً محدودة عند الأصحّاء، وأوضح ما تكون مع فرق التوقيت.",
          "en": "Melatonin times sleep but takes no part in generating it — the official who fires the starting pistol, then doesn’t run. That’s why, as a pill, it does little for healthy sleepers; jet lag is where it helps most."
        }
      },
      {
        "id": "majd-6",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "أيّ غدّةٍ تفرز الميلاتونين، وما الذي يوقفها عند الفجر؟",
          "en": "Which gland releases melatonin, and what stops it at dawn?"
        },
        "opts": [
          {
            "ar": "الغدّة الصنوبرية، ويوقفها ضوء النهار الداخل من العينين",
            "en": "The pineal gland — stopped by daylight entering through the eyes"
          },
          {
            "ar": "الغدّة النخامية، ويوقفها صوت المنبّه",
            "en": "The pituitary gland — stopped by the sound of the alarm"
          },
          {
            "ar": "الغدّة الدرقية، ويوقفها أوّل طعامٍ تأكله",
            "en": "The thyroid gland — stopped by the first food you eat"
          },
          {
            "ar": "الغدّة الكظرية، ويوقفها ارتفاع الكورتيزول صباحاً",
            "en": "The adrenal glands — stopped by the morning rise in cortisol"
          }
        ],
        "src": "ص 35–36",
        "why": {
          "ar": "حين يدخل ضوء الشمس من العينين، ولو من خلال الجفنين المغمضين، يتوقّف إفراز الميلاتونين: إشارةٌ بأن النوم انتهى. لذلك يساعد ضوء الصباح على ضبط الساعة البيولوجية.",
          "en": "When sunlight reaches the brain through the eyes — even through closed lids — the melatonin tap shuts off: the signal that sleep is over. Which is why morning light helps set your body clock."
        }
      },
      {
        "id": "majd-7",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "أين تقع «الساعة البيولوجية الرئيسية» في جسمك؟",
          "en": "Where is your body’s “master clock”?"
        },
        "opts": [
          {
            "ar": "في «النواة فوق التصالبية»، في الوطاء في عمق الدماغ",
            "en": "In the suprachiasmatic nucleus, in the hypothalamus deep in the brain"
          },
          {
            "ar": "في القلب، الذي يضبط إيقاع الجسم كلّه",
            "en": "In the heart, which sets the rhythm of the whole body"
          },
          {
            "ar": "في المخيخ، مركز التوقيت والتوازن",
            "en": "In the cerebellum, the brain’s centre of timing and balance"
          },
          {
            "ar": "في الكبد، الذي يضبط مواعيد الطاقة والهضم",
            "en": "In the liver, which schedules energy and digestion"
          }
        ],
        "src": "ص 39، 362",
        "why": {
          "ar": "ولا تستطيع هذه النواة أن تعدّل توقيتها إلا ساعةً واحدة تقريباً في اليوم، ولهذا يحتاج التأقلم مع فرق ثماني ساعات إلى نحو ثمانية أيام.",
          "en": "And it can only shift by about an hour a day — which is why adjusting to an eight-hour time difference takes about eight days."
        }
      },
      {
        "id": "majd-8",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "الساعة البيولوجية و«ضغط النوم» نظامٌ واحد، يتحرّك جزآه معاً دائماً.",
          "en": "Your body clock and “sleep pressure” are one system whose two parts always move together."
        },
        "isMyth": true,
        "hint": {
          "ar": "لماذا قد تشعر بصحوةٍ غريبة صباحاً بعد ليلةٍ لم تنم فيها؟",
          "en": "Why might you feel oddly awake the morning after a night without sleep?"
        },
        "src": "ص 47",
        "explain": {
          "ar": "هما نظامان منفصلان، وإن سارا عادةً في اتّجاهٍ واحد. لذلك قد تشعر بنشاطٍ مفاجئ في الصباح بعد ليلةٍ بلا نوم: ساعتك ترفعك مؤقّتاً، مع أن ضغط النوم في ذروته.",
          "en": "They’re two separate systems that usually happen to pull the same way. That’s why you can feel a sudden lift the morning after a sleepless night: your body clock picks you up for a while, though sleep pressure is at its peak."
        }
      },
      {
        "id": "majd-9",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "لماذا لا تسمع ما يدور حولك وأنت نائم، مع أن أذنيك تعملان؟",
          "en": "Why don’t you hear what’s going on around you while you sleep, though your ears still work?"
        },
        "opts": [
          {
            "ar": "لأن «المهاد» في وسط الدماغ يُغلق بوّابته، فلا تبلغ الأصوات وعيك",
            "en": "The thalamus, in the middle of the brain, shuts its gate, so sounds never reach awareness"
          },
          {
            "ar": "لأن الأذن الوسطى ترتخي في النوم فلا تنقل الصوت",
            "en": "The middle ear goes slack during sleep and stops passing sound on"
          },
          {
            "ar": "لأن الدماغ يكتم كلّ صوتٍ أخفض من صوت المنبّه",
            "en": "The brain mutes every sound quieter than an alarm"
          },
          {
            "ar": "لأن الميلاتونين يُخدّر أعصاب السمع ليلاً",
            "en": "Melatonin numbs the hearing nerves at night"
          }
        ],
        "src": "ص 59–60",
        "why": {
          "ar": "المهاد بوّابة الحسّ: يقرّر أيّ الإشارات تبلغ القشرة فتصير وعياً. وإغلاقه هو لحظة النوم فعلاً؛ الأذن تسمع، لكن الرسالة لا تصل.",
          "en": "The thalamus is the sensory gate: it decides which signals reach the cortex and become awareness. Its closing is the moment you actually fall asleep — your ears still hear, but the message doesn’t get through."
        }
      },
      {
        "id": "majd-10",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "يواصل دماغك تتبّع الوقت بدقّة وأنت نائم، ولهذا تستيقظ أحياناً قبل المنبّه بدقيقةٍ أو دقيقتين.",
          "en": "Your brain keeps track of time precisely while you sleep — which is why you sometimes wake a minute or two before the alarm."
        },
        "isMyth": false,
        "hint": {
          "ar": "هل استيقظت مرّةً قبل المنبّه بلحظات؟ أكانت صدفة؟",
          "en": "Ever woken moments before your alarm? Was it a coincidence?"
        },
        "src": "ص 60",
        "explain": {
          "ar": "تفقد الإحساس الواعي بالزمن، لكن الدماغ يواصل عدّه تحت مستوى الوعي.",
          "en": "You lose the conscious sense of time, but your brain goes on counting it below awareness."
        }
      },
      {
        "id": "majd-11",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "في النوم غير الحالم تظهر اندفاعاتٌ سريعة من نشاط الدماغ تُسمّى «مغازل النوم». ما وظيفتها؟",
          "en": "In non-dreaming sleep, quick bursts of brain activity called “sleep spindles” appear. What do they do?"
        },
        "opts": [
          {
            "ar": "تحمي نومك من الضجيج، وتجدّد قدرة دماغك على التعلّم",
            "en": "They guard your sleep against noise, and restore your brain’s capacity to learn"
          },
          {
            "ar": "تُطلق الأحلام وتختار ما تدور حوله",
            "en": "They set off dreams and choose what they’re about"
          },
          {
            "ar": "تحرّك العينين بسرعةٍ تحت الجفنين المغمضين",
            "en": "They move the eyes rapidly under closed lids"
          },
          {
            "ar": "تخفض حرارة الجسم كي يبدأ النوم العميق",
            "en": "They lower body temperature so deep sleep can begin"
          }
        ],
        "src": "ص 73، 163",
        "why": {
          "ar": "كلّما كثرت المغازل صعُب أن يوقظك الضجيج، وتحسّن تعلّمك في اليوم التالي. والمسنّون ينتجون منها أقلّ بنحو ٤٠٪.",
          "en": "The more spindles you have, the harder it is for noise to wake you, and the better you learn the next day. Older adults make about 40% fewer of them."
        }
      },
      {
        "id": "majd-13",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "نوم الليل دوراتٌ تدوم كلٌّ منها نحو ٩٠ دقيقة. إن استيقظت قبل موعدك المعتاد بساعتين، فأيّ نومٍ تخسر أكثر من غيره؟",
          "en": "A night’s sleep runs in cycles of about 90 minutes. If you wake two hours earlier than usual, which kind of sleep do you lose most?"
        },
        "opts": [
          {
            "ar": "نوم حركة العين السريعة، نوم الأحلام",
            "en": "REM sleep — dream sleep"
          },
          {
            "ar": "النوم العميق",
            "en": "Deep sleep"
          },
          {
            "ar": "الاثنين بالتساوي، بنسبة الوقت الضائع",
            "en": "Both equally, in proportion to the time lost"
          },
          {
            "ar": "لا شيء يُذكر: الدورات الأخيرة تكرارٌ لما سبقها",
            "en": "Nothing much: the last cycles just repeat the earlier ones"
          }
        ],
        "src": "ص 64–66، 93",
        "why": {
          "ar": "النوم العميق يغلب على النصف الأوّل من الليل، ونوم الأحلام على النصف الثاني. فمن نام منتصف الليل واستيقظ في السادسة بدل الثامنة لم يخسر ربع نومه فقط، بل ما بين ٦٠٪ و٩٠٪ من نوم أحلامه.",
          "en": "Deep sleep dominates the first half of the night and REM the second. Sleep at midnight and wake at six instead of eight, and you haven’t lost a quarter of your sleep — you’ve lost 60–90% of your REM."
        }
      },
      {
        "id": "majd-15",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "نوم الأحلام هو الوقت الوحيد الذي يخلو فيه دماغك تماماً من مادّةٍ بعينها، وهذا ما يجعل الحلم «علاجاً ليلياً» للذكريات المؤلمة. ما هي؟",
          "en": "Dream sleep is the only time your brain is completely free of one chemical — which is what makes dreaming “overnight therapy” for painful memories. Which chemical?"
        },
        "opts": [
          {
            "ar": "النورأدرينالين، مادّة القلق في الدماغ",
            "en": "Noradrenaline, the brain’s anxiety chemical"
          },
          {
            "ar": "السيروتونين، مادّة المزاج",
            "en": "Serotonin, the mood chemical"
          },
          {
            "ar": "الدوبامين، مادّة المكافأة",
            "en": "Dopamine, the reward chemical"
          },
          {
            "ar": "الكورتيزول، هرمون الإجهاد",
            "en": "Cortisol, the stress hormone"
          }
        ],
        "src": "ص 302",
        "why": {
          "ar": "في نوم الأحلام تعود اللوزة والهيبوكامبوس إلى النشاط، لكن بلا النورأدرينالين. فيعيد الدماغ معالجة التجارب المزعجة في أمانٍ وينزع عنها حدّتها، ولهذا نستيقظ أحياناً ونحن أحسن حالاً.",
          "en": "In REM sleep the amygdala and hippocampus come back to life, but without noradrenaline. So the brain reprocesses upsetting experiences in safety and takes the sting out of them — which is why we sometimes wake feeling better."
        }
      },
      {
        "id": "majd-16",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "ماذا يحدث في الدماغ بعد ليلةٍ بلا نوم فيجعلنا سريعي الانفعال؟",
          "en": "What happens in the brain after a sleepless night that makes us so quick-tempered?"
        },
        "opts": [
          {
            "ar": "يزيد نشاط اللوزة نحو ٦٠٪، وتضعف صلتها بالفصّ الجبهي الذي يكبحها",
            "en": "The amygdala gets about 60% more reactive, and loses touch with the frontal lobe that reins it in"
          },
          {
            "ar": "ينخفض نشاط اللوزة، فتفقد المشاعر توازنها",
            "en": "The amygdala quietens down, and emotions lose their balance"
          },
          {
            "ar": "يتوقّف الفصّ الجبهي عن العمل نهائياً حتى تنام",
            "en": "The frontal lobe shuts down completely until you sleep"
          },
          {
            "ar": "يرتفع الميلاتونين في النهار، فيعكّر المزاج",
            "en": "Melatonin rises in the daytime and sours your mood"
          }
        ],
        "src": "ص 215–216",
        "why": {
          "ar": "يشبّهها ووكر بدوّاسة وقودٍ قويّة (اللوزة) ومكابح ضعيفة (الفصّ الجبهي)، والنتيجة تقلّبٌ سريع بين الغضب والمرح المفرط.",
          "en": "Walker likens it to a powerful accelerator (the amygdala) with weak brakes (the frontal lobe) — hence the quick swings between anger and giddiness."
        }
      },
      {
        "id": "majd-17",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "ما الناقل العصبي الذي يفرزه الوطاء فيعمل «مفتاحاً» يشغّل اليقظة، ويتوقّف إفرازه ليلاً فننام؟",
          "en": "Which neurotransmitter, released by the hypothalamus, works as the switch that turns wakefulness on — and stops flowing at night so we fall asleep?"
        },
        "opts": [
          {
            "ar": "الأوركسين",
            "en": "Orexin"
          },
          {
            "ar": "الميلاتونين",
            "en": "Melatonin"
          },
          {
            "ar": "الغريلين",
            "en": "Ghrelin"
          },
          {
            "ar": "الأستيل كولين",
            "en": "Acetylcholine"
          }
        ],
        "src": "ص 362",
        "why": {
          "ar": "الأوركسين يُنشّط مراكز اليقظة في جذع الدماغ. ومن فقد الخلايا التي تفرزه أصيب بالتغفيق (النُّعاس القهري): نومٌ يهاجمه في وضح النهار.",
          "en": "Orexin fires up the wake centres in the brainstem. Lose the cells that make it, and you have narcolepsy: sleep that ambushes you in broad daylight."
        }
      },
      {
        "id": "majd-19",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "قلّة النوم العميق تزيد تراكم الأميلويد في الدماغ، وتراكمه بدوره يقلّل النوم العميق: حلقةٌ مفرغة.",
          "en": "Too little deep sleep lets amyloid build up in the brain — and the build-up in turn cuts deep sleep: a vicious circle."
        },
        "isMyth": false,
        "hint": {
          "ar": "أين يتراكم الأميلويد؟ وماذا تفعل تلك المناطق في الليل؟",
          "en": "Where does amyloid build up — and what do those regions do at night?"
        },
        "src": "ص 235–236",
        "explain": {
          "ar": "الأميلويد يهاجم مناطق الدماغ التي تولّد النوم العميق نفسه. ولهذا تربط دراساتٌ كثيرة قلّة النوم على مدى العمر بزيادة خطر الألزهايمر.",
          "en": "Amyloid attacks the very brain regions that generate deep sleep. That’s why many studies link a lifetime of short sleep to a higher risk of Alzheimer’s."
        }
      },
      {
        "id": "majd-20",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "بماذا يشبّه ووكر «الهيبوكامبوس»، وماذا يفعل النوم به؟",
          "en": "What does Walker compare the hippocampus to — and what does sleep do to it?"
        },
        "opts": [
          {
            "ar": "بذاكرة USB صغيرة، والنوم ينقل ما فيها إلى مخزنٍ دائم فيُفرغها لتعلّمٍ جديد",
            "en": "A small USB stick: sleep moves its contents into permanent storage, clearing it for new learning"
          },
          {
            "ar": "بمكتبةٍ لا تمتلئ، والنوم يرتّب رفوفها فقط",
            "en": "A library that never fills up: sleep just tidies the shelves"
          },
          {
            "ar": "بسلّة محذوفات، والنوم يُفرغها من كلّ ما تعلّمته في النهار",
            "en": "A recycle bin: sleep empties out everything you learned that day"
          },
          {
            "ar": "بقرصٍ صلب كبير، والنوم يضغط ما فيه ليتّسع لغيره",
            "en": "A big hard drive: sleep compresses what’s on it to make room"
          }
        ],
        "src": "ص 160",
        "why": {
          "ar": "في تجربة، تعلّم من أخذوا قيلولةً من ٩٠ دقيقة أفضل بنحو ٢٠٪ في المساء، وتراجعت قدرة من بقوا مستيقظين. معلومةٌ عملية: القيلولة بين جلستَي دراسة مفيدة.",
          "en": "In one study, people who took a 90-minute nap learned about 20% better that evening, while those who stayed awake got worse at it. Practical tip: a nap between two study sessions pays off."
        }
      },
      {
        "id": "majd-21",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "الليلة الأولى بعد التعلّم هي الأهمّ، أمّا الكحول في الليلة الثالثة بعده فلا يضرّ الذاكرة.",
          "en": "The first night after learning is the one that counts; drinking on the third night does no harm to memory."
        },
        "isMyth": true,
        "hint": {
          "ar": "هل ينتهي الدماغ من ترتيب ما تعلّمته في ليلةٍ واحدة؟",
          "en": "Does the brain finish filing what you learned in a single night?"
        },
        "src": "ص 393–394",
        "explain": {
          "ar": "في تجربةٍ على طلاب، نسي من شربوا في الليلة الأولى أكثر من نصف ما تعلّموه، ونسي من شربوا في الليلة الثالثة نحو ٤٠٪. الدماغ يواصل معالجة ما تعلّمته عدّة ليال.",
          "en": "In a study of students, those who drank on the first night forgot more than half of what they’d learned — and those who drank on the third night still forgot about 40%. The brain keeps working on new learning for several nights."
        }
      },
      {
        "id": "majd-23",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "التمرين وحده يصنع الإتقان: إن تدرّبت على مهارةٍ حركية صباحاً، وجدت التحسّن نفسه مساءً كما بعد ليلة نوم.",
          "en": "Practice alone makes perfect: train a motor skill in the morning, and you’ll see the same improvement that evening as after a night’s sleep."
        },
        "isMyth": true,
        "hint": {
          "ar": "ما الذي يحدث للمهارة بين نهاية التمرين وصباح الغد؟",
          "en": "What happens to a skill between the end of practice and the next morning?"
        },
        "src": "ص 184",
        "explain": {
          "ar": "بعد ١٢ ساعة يقظة لم يظهر أيّ تحسّن. أمّا بعد ليلة نوم، وبلا أيّ تدريبٍ إضافي، فزادت السرعة ٢٠٪ والدقّة نحو ٣٥٪. التمرين ثم النوم هو ما يصنع الإتقان.",
          "en": "After twelve waking hours there was no improvement at all. After a night of sleep — with no extra practice — speed rose 20% and accuracy nearly 35%. Practice, then sleep, makes perfect."
        }
      },
      {
        "id": "majd-24",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "في تجربةٍ على الحيوانات، نامت بعد تعلّمٍ مكثّف: بعضها نوماً طبيعياً، وبعضها بحبّة «أمبين» المنوّمة. ماذا فعل نوم الحبّة بالوصلات التي تكوّنت أثناء التعلّم؟",
          "en": "In an animal study, subjects slept after intensive learning — some naturally, some on the sleeping pill Ambien. What did the pill-induced sleep do to the connections formed while learning?"
        },
        "opts": [
          {
            "ar": "محا نحو نصفها بدل أن يقوّيها",
            "en": "Wiped out about half of them, instead of strengthening them"
          },
          {
            "ar": "قوّاها تماماً كما يفعل النوم الطبيعي",
            "en": "Strengthened them, exactly as natural sleep does"
          },
          {
            "ar": "قوّاها أكثر، لأن نوم الحبّة أعمق وأطول",
            "en": "Strengthened them more, since pill sleep is deeper and longer"
          },
          {
            "ar": "لم يمسّها، فالحبّة تغيّر الأحلام وحدها",
            "en": "Left them alone — the pill only changes dreams"
          }
        ],
        "src": "ص 408، 412",
        "why": {
          "ar": "النوم الطبيعي قوّى الوصلات، ونوم «أمبين» محا نحو ٥٠٪ منها: صار ممحاةً للذاكرة. فالحبوب المنوّمة الشائعة مهدّئات تستهدف المستقبِلات نفسها التي يستهدفها الكحول، ونومها يفتقر إلى الموجات العميقة البطيئة.",
          "en": "Natural sleep strengthened the connections; Ambien sleep wiped out about 50% of them — an eraser for memory. Common sleeping pills are sedatives that hit the same receptors as alcohol, and their sleep lacks the deep, slow waves."
        }
      },
      {
        "id": "majd-25",
        "book": "why-we-sleep",
        "kind": "tf",
        "statement": {
          "ar": "حين يتوقّف أحدٌ عن الحبوب المنوّمة، قد يصبح نومه أسوأ ممّا كان قبل أن يبدأها.",
          "en": "When someone stops taking sleeping pills, their sleep can get worse than it was before they started."
        },
        "isMyth": false,
        "hint": {
          "ar": "ماذا يفعل الدماغ حين يعتاد مادّةً ما ثم تُسحب منه فجأة؟",
          "en": "What does a brain do when it gets used to a substance, then loses it suddenly?"
        },
        "src": "ص 409",
        "explain": {
          "ar": "هذا «الأرق الارتدادي». يقاوم الدماغ الدواء بتقليل حساسية مستقبِلاته (تحمّل)، فإذا توقّف الدواء ظهرت أعراض انسحاب.",
          "en": "This is “rebound insomnia”. The brain fights the drug by dulling its own receptors (tolerance), so when the drug stops, withdrawal sets in."
        }
      },
      {
        "id": "majd-26",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "في «العلاج السلوكي المعرفي للأرق»، أوّل ما يُنصح به لعلاجه، أسلوبٌ يبدو مناقضاً للمنطق. ما هو؟",
          "en": "Cognitive behavioural therapy for insomnia, the first treatment recommended, uses one method that sounds backwards. Which?"
        },
        "opts": [
          {
            "ar": "تقليص الوقت المسموح في السرير، إلى ستّ ساعاتٍ مثلاً، ليتراكم ضغط النوم",
            "en": "Cutting the time allowed in bed, to six hours say, so sleep pressure builds"
          },
          {
            "ar": "البقاء في السرير حتى يأتي النوم مهما تأخّر",
            "en": "Staying in bed until sleep comes, however long it takes"
          },
          {
            "ar": "النوم ساعاتٍ إضافية في النهار تعويضاً عن الليل",
            "en": "Sleeping extra hours in the daytime to make up for the night"
          },
          {
            "ar": "الذهاب إلى السرير أبكر بساعتين لتطول فرصة النوم",
            "en": "Going to bed two hours earlier, to give sleep more of a chance"
          }
        ],
        "src": "ص 420–421",
        "why": {
          "ar": "يتراكم مزيدٌ من ضغط النوم، فينام المريض أسرع وأعمق ويستعيد ثقته بقدرته على النوم. والبقاء في السرير حتى يأتي النوم عكس ما ينصح به العلاج تماماً.",
          "en": "More sleep pressure builds, so the patient falls asleep faster and deeper and regains faith in their own sleep. Staying in bed until sleep comes is the exact opposite of the advice."
        }
      },
      {
        "id": "majd-27",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "أيّ هذه ليست من نصائح «العلاج السلوكي المعرفي للأرق»؟",
          "en": "Which of these is NOT advice from cognitive behavioural therapy for insomnia?"
        },
        "opts": [
          {
            "ar": "أخذ قيلولةٍ طويلة بعد الظهر لتعويض الليل",
            "en": "Take a long afternoon nap to make up for the night"
          },
          {
            "ar": "إبعاد الساعات المرئية عن غرفة النوم",
            "en": "Keep clocks out of sight in the bedroom"
          },
          {
            "ar": "النهوض من السرير إن طال السهاد فيه",
            "en": "Get out of bed if you lie awake too long"
          },
          {
            "ar": "موعدٌ ثابت للاستيقاظ حتى في العطلة",
            "en": "Wake at the same time every day, weekends included"
          }
        ],
        "src": "ص 421",
        "why": {
          "ar": "من يعاني أرقاً ليلياً يُنصح بتجنّب القيلولة، لأنها تُنفّس ضغط النوم الذي يحتاجه في الليل. وإبعاد الساعات يمنع «قلق مراقبة الساعة» في منتصف الليل.",
          "en": "People with insomnia are told to avoid naps, which let off the sleep pressure they need at night. Hiding the clocks stops anxious clock-watching in the small hours."
        }
      },
      {
        "id": "majd-28",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "لماذا يُخرج النائم يديه أو قدميه من تحت الغطاء دون أن يشعر؟",
          "en": "Why do sleepers push their hands or feet out from under the covers without noticing?"
        },
        "opts": [
          {
            "ar": "لأنها مَشعّات الجسم، وحرارته الداخلية يجب أن تنخفض ليبدأ النوم ويستمرّ",
            "en": "They’re the body’s radiators, and core temperature has to drop for sleep to start and last"
          },
          {
            "ar": "لأن الدم يتجمّع فيها ليلاً فتحتاج إلى التهوية",
            "en": "Blood pools in them at night and they need airing"
          },
          {
            "ar": "لأن الدماغ يحرّك الأطراف وهو يحلم",
            "en": "The dreaming brain moves the limbs about"
          },
          {
            "ar": "لأن الجلد يتنفّس في النوم أكثر من اليقظة",
            "en": "Skin breathes more during sleep than awake"
          }
        ],
        "src": "ص 396–400",
        "why": {
          "ar": "على حرارة الجسم الداخلية أن تنخفض نحو درجةٍ مئوية ليبدأ النوم، واليدان والقدمان منافذ الحرارة. وللسبب نفسه يساعد غسل الوجه قبل النوم أغلب الناس.",
          "en": "Your core temperature needs to fall by about a degree Celsius for sleep to begin, and hands and feet are where the heat escapes. Same reason washing your face before bed helps most people."
        }
      },
      {
        "id": "majd-32",
        "book": "why-we-sleep",
        "kind": "mcq",
        "q": {
          "ar": "لماذا ننام عادةً نوماً سيّئاً في أوّل ليلةٍ في فندق؟",
          "en": "Why do we usually sleep badly on our first night in a hotel?"
        },
        "opts": [
          {
            "ar": "لأن نصف الدماغ ينام أخفّ من الآخر، كحارسٍ في مكانٍ غريب",
            "en": "Half the brain sleeps lighter than the other, standing guard in a strange place"
          },
          {
            "ar": "لأن الوسادة والفراش الغريبين يُتعبان الرقبة والظهر",
            "en": "The unfamiliar pillow and mattress strain your neck and back"
          },
          {
            "ar": "لأن عشاء السفر الثقيل يؤخّر النوم العميق",
            "en": "A heavy travel dinner delays deep sleep"
          },
          {
            "ar": "لأن تكييف الفندق يُجفّف الهواء والحلق",
            "en": "Hotel air-conditioning dries out the air and your throat"
          }
        ],
        "src": "ص 96–98",
        "why": {
          "ar": "يُسمّى «أثر الليلة الأولى»، ويخفّ مع تكرار الليالي. لذلك إن كان أمامك يومٌ مهمّ في مدينةٍ أخرى، فقد يستحقّ أن تصل قبله بليلة.",
          "en": "It’s called the “first-night effect”, and it fades over the following nights. So if a big day awaits you in another city, it may be worth arriving a night early."
        }
      },
      {
        "id": "majd-35",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "يفرّق فاروفاكيس بين «السوق» و«الاقتصاد». ما الذي يحوّل الأوّل إلى الثاني؟",
          "en": "Varoufakis tells a “market” from an “economy”. What turns the first into the second?"
        },
        "opts": [
          {
            "ar": "فائضٌ يمكن خزنه",
            "en": "A surplus that can be stored"
          },
          {
            "ar": "النقود المعدنية",
            "en": "Coins"
          },
          {
            "ar": "التجارة بين الشعوب",
            "en": "Trade between peoples"
          },
          {
            "ar": "المصارف والقروض",
            "en": "Banks and loans"
          }
        ],
        "src": "ص 7–9",
        "why": {
          "ar": "المبادلة قديمة، منذ بادل البشر موزةً بتفاحة. أمّا الاقتصاد فبدأ حين أنتجت الزراعة فائضاً من الحبوب يُخزن، ومنه وُلدت الكتابة والدَّين والنقود والدولة والجيوش. والصيد لا ينتج فائضاً، لأن اللحم والفاكهة يفسدان.",
          "en": "Exchange is ancient — a banana for an apple. An economy began when farming produced a grain surplus that could be stored; from it came writing, debt, money, the state and armies. Hunting yields no surplus: meat and fruit rot."
        }
      },
      {
        "id": "majd-36",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "اتّجه البشر إلى الزراعة بقرارٍ واعٍ، لأنها تجعل حياتهم أفضل.",
          "en": "Humans took up farming by conscious choice, because it made life better."
        },
        "isMyth": true,
        "hint": {
          "ar": "لماذا يترك صيّادٌ يجد طعامه حوله حياته ليحرث الأرض؟",
          "en": "Why would a hunter with food all around give that life up to plough the land?"
        },
        "src": "ص 8",
        "explain": {
          "ar": "أجبرهم عليها الجوع حين ضاق ما تقدّمه الطبيعة، ولم يقرّرها أحد، كما لا يقرّر أحدٌ أيّ ثورةٍ تقنية. وحيث كفتهم الطبيعة طعاماً تجنّبوها.",
          "en": "Hunger pushed them into it once nature’s supply ran short; nobody decided it, as nobody decides any technological revolution. Where nature fed people well enough, they steered clear of it."
        }
      },
      {
        "id": "majd-39",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "ما الشرط الذي يراه فاروفاكيس ضرورياً لكي تكون للعملة أيّ قيمة؟",
          "en": "What does Varoufakis see as the one condition for a currency to have any value at all?"
        },
        "opts": [
          {
            "ar": "سلطةٌ يثق الناس بأنها ستفي بوعدها، حتى لو مات الحاكم",
            "en": "An authority people trust to honour it — even if the ruler dies"
          },
          {
            "ar": "أن تُصنع من الذهب أو الفضّة",
            "en": "That it’s made of gold or silver"
          },
          {
            "ar": "أن تكون صعبة التزوير",
            "en": "That it’s hard to forge"
          },
          {
            "ar": "أن تحمل ختم تاجرٍ معروف",
            "en": "That it bears a well-known merchant’s seal"
          }
        ],
        "src": "ص 10",
        "why": {
          "ar": "لكي يقبل الناس وعداً مكتوباً على أنه نقود، لا بدّ من سلطةٍ يثقون بأنها ستفي به، سلطةٍ تبقى بعد موت الحاكم. ولهذا يربط فاروفاكيس الدَّين والنقود والثقة والدولة معاً.",
          "en": "For people to accept a written promise as money, there must be an authority they trust to honour it — one that outlives the ruler. That’s why Varoufakis ties debt, money, trust and the state together."
        }
      },
      {
        "id": "majd-41",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "كيف حافظ حكّام الدول الزراعية الأولى على سلطتهم، مع أن الفلّاحين الفقراء أكثر منهم بكثير؟",
          "en": "How did the rulers of the first farming states hold on to power, when poor peasants far outnumbered them?"
        },
        "opts": [
          {
            "ar": "بعقيدةٍ تُقنع الأغلبية بأن حكمهم مشيئةٌ إلهية، يرعاها رجال الدين",
            "en": "With a creed convincing the majority their rule was divine will, kept by priests"
          },
          {
            "ar": "بالقوّة العسكرية وحدها، فالجيش كان يكفي",
            "en": "By military force alone — the army was enough"
          },
          {
            "ar": "بتوزيع الفائض بالتساوي، فلم يجد أحدٌ سبباً للثورة",
            "en": "By sharing the surplus equally, so nobody had cause to revolt"
          },
          {
            "ar": "بانتخاباتٍ دوريّة تمنح الفلّاحين صوتاً",
            "en": "Through regular elections that gave peasants a voice"
          }
        ],
        "src": "ص 11",
        "why": {
          "ar": "لو اتّحد الفلّاحون لأطاحوا النظام في ساعات، لذلك كانت العقيدة التي تُضفي الشرعية على الحكم ضرورية. ورجال الدين أنفسهم لم يكن ليوجدوا بلا فائضٍ يُطعم من لا ينتجون.",
          "en": "Had the peasants united, they’d have toppled the order in hours, so a legitimising ideology was essential. And a clergy couldn’t exist without a surplus to feed people who produce nothing."
        }
      },
      {
        "id": "majd-42",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "ما «الآلية النفسية» التي تجعل اللامساواة تعيد إنتاج نفسها، بحسب فاروفاكيس؟",
          "en": "What is the “psychological mechanism” that lets inequality reproduce itself, according to Varoufakis?"
        },
        "opts": [
          {
            "ar": "أن عقولنا تساوي تلقائياً بين «أملك» و«أستحقّ»",
            "en": "Our minds automatically equate “I have” with “I deserve”"
          },
          {
            "ar": "أن الفقير يحسد الغنيّ فيقلّده",
            "en": "The poor envy the rich, and so imitate them"
          },
          {
            "ar": "أن الخوف من الفقر يُبقي الجميع طائعين",
            "en": "Fear of poverty keeps everyone obedient"
          },
          {
            "ar": "أن الأغنياء أذكى في استثمار ما يملكون",
            "en": "The rich are smarter at investing what they have"
          }
        ],
        "src": "ص 16",
        "why": {
          "ar": "نتعاطف مع المحرومين ونغضب لحرمانهم، لكننا لا نفكّر أن حرمانهم قد يكون نتاج العملية نفسها التي أنتجت اكتفاءنا، كالطفل المقتنع بأن ألعابه حقّه وهو يتألّم لطفلٍ ينام جائعاً.",
          "en": "We feel for the deprived and are outraged at their lack, but never consider that it may come from the same process that produced our comfort — like a child sure his toys are rightfully his, while grieving for a child who goes to bed hungry."
        }
      },
      {
        "id": "majd-44",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "يستعمل فاروفاكيس كلمتَي «المسرّات» و«البضائع» بمعنى واحد.",
          "en": "Varoufakis uses the words “goods” and “commodities” to mean the same thing."
        },
        "isMyth": true,
        "hint": {
          "ar": "هل غروب الشمس شيءٌ صُنع ليُباع؟",
          "en": "Was a sunset ever made to be sold?"
        },
        "src": "ص 18–20",
        "explain": {
          "ar": "المسرّات أشياء لها قيمةٌ استعمالية، كالغروب والضحك مع الأصدقاء، ولم يُصنع أيٌّ منها ليُباع. أمّا البضائع فتُنتج للبيع ولها قيمةٌ تبادلية. والكتاب كلّه حكاية انتصار الثانية على الأولى.",
          "en": "Goods have experiential value — a sunset, a laugh with friends — and none was made to be sold. Commodities are produced for sale and carry exchange value. The whole book is the story of the second conquering the first."
        }
      },
      {
        "id": "majd-45",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "وُلد «مجتمع السوق» حين صارت عوامل الإنتاج الثلاثة بضائع تُباع وتُشترى. ما هي؟",
          "en": "Market society was born when the three factors of production became commodities, bought and sold. What are they?"
        },
        "opts": [
          {
            "ar": "وسائل الإنتاج، والأرض، وقوّة العمل",
            "en": "Means of production, land and labour"
          },
          {
            "ar": "الماء، والطاقة، والغذاء",
            "en": "Water, energy and food"
          },
          {
            "ar": "الذهب، والفضّة، والعملة",
            "en": "Gold, silver and currency"
          },
          {
            "ar": "المصانع، والمصارف، والمتاجر",
            "en": "Factories, banks and shops"
          }
        ],
        "src": "ص 24",
        "why": {
          "ar": "في الإقطاع كان الأقنان يكدحون دون أن يبيعوا عملهم، وكان بيع أرض الأجداد عاراً. وحين صار للثلاثة ثمن، وُلد مجتمع السوق.",
          "en": "Under feudalism serfs toiled without selling their labour, and selling your ancestors’ land was a disgrace. Once all three had a price, market society was born."
        }
      },
      {
        "id": "majd-47",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "ما الذي يسمّيه فاروفاكيس «الانقلاب الكبير»؟",
          "en": "What does Varoufakis call “the Great Reversal”?"
        },
        "opts": [
          {
            "ar": "أن التوزيع صار يسبق الإنتاج: الأجور والإيجار والفائدة تُحدَّد قبل أن يُنتَج شيء",
            "en": "Distribution came before production: wages, rent and interest were fixed before anything was made"
          },
          {
            "ar": "أن الآلات حلّت محلّ العمّال، فصار الإنتاج أرخص وأسرع",
            "en": "Machines replaced workers, making production cheaper and faster"
          },
          {
            "ar": "أن العبودية أُلغيت، فصار العامل يبيع عمله بحرّية",
            "en": "Slavery was abolished, so workers sold their labour freely"
          },
          {
            "ar": "أن الدولة أمّمت الأراضي، فانتهى عصر الإقطاع",
            "en": "The state nationalised the land, ending the feudal age"
          }
        ],
        "src": "ص 33",
        "why": {
          "ar": "صاحب المشروع يقترض ليدفع الإيجار والأجور قبل أن يبيع شيئاً، وهو وحده لا يعرف ما سيبقى له. فإن هبطت الأسعار صار عبداً لدَينه، ولهذا صار الربح شرطاً للبقاء لا مجرّد جشع.",
          "en": "The entrepreneur borrows to pay rent and wages before selling a thing, and he alone doesn’t know what will be left for him. If prices drop he becomes a slave to his debt — so profit becomes a condition of survival, not mere greed."
        }
      },
      {
        "id": "majd-48",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "يرى فاروفاكيس أن الفحم هو الوقود الحقيقي الذي صنع ثروات القرون الثلاثة الأخيرة.",
          "en": "Varoufakis sees coal as the real fuel behind the wealth of the last three centuries."
        },
        "isMyth": true,
        "hint": {
          "ar": "بأيّ شيءٍ بدأ كلّ مصنعٍ قبل أن يُشعل أوّل فحمة؟",
          "en": "What did every factory start with, before its first lump of coal was lit?"
        },
        "src": "ص 35",
        "explain": {
          "ar": "الوقود الحقيقي عنده هو الدَّين: كلّ الثروات الهائلة في القرون الثلاثة الأخيرة مدينةٌ بوجودها له. والدَّين لمجتمع السوق كالجحيم للمسيحية: مزعجٌ، لكن لا غنى عنه.",
          "en": "For him the real fuel is debt: all the vast wealth of the last three centuries owes its existence to it. Debt is to market society what hell is to Christianity: unpleasant, yet indispensable."
        }
      },
      {
        "id": "majd-51",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "لماذا ينهار المصرف حين يندفع المودعون كلّهم لسحب أموالهم معاً؟",
          "en": "Why does a bank collapse when all its depositors rush to withdraw at once?"
        },
        "opts": [
          {
            "ar": "لأن ما في خزائنه من نقدٍ أقلّ بكثير ممّا يدين به لهم",
            "en": "The cash in its vaults is far less than what it owes them"
          },
          {
            "ar": "لأن الحكومة تجمّد الحسابات في الأزمات",
            "en": "The government freezes accounts in a crisis"
          },
          {
            "ar": "لأن أسعار الأسهم تنهار فتضيع الودائع معها",
            "en": "Share prices crash and the deposits vanish with them"
          },
          {
            "ar": "لأن الفائدة ترتفع فجأةً فيخسر المصرف",
            "en": "Interest rates jump and the bank makes a loss"
          }
        ],
        "src": "ص 42",
        "why": {
          "ar": "المصرف لا يحتفظ نقداً إلا بجزءٍ صغير ممّا يدين به، والباقي قروضٌ عند الناس. والعملية نفسها التي تولّد الربح والثروة هي التي تولّد الانهيارات: قروضٌ أكبر ممّا يقدر الاقتصاد على سداده.",
          "en": "A bank keeps only a sliver of what it owes as cash; the rest is out in loans. The very process that creates profit and wealth also creates crashes: more loans than the economy can repay."
        }
      },
      {
        "id": "majd-52",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "حين ينقذ المصرف المركزي المصارف المتعثّرة، من أين يأتي بالمال؟",
          "en": "When the central bank bails out struggling banks, where does it get the money?"
        },
        "opts": [
          {
            "ar": "يخلقه من العدم، بكتابة الأرقام في حساباتها",
            "en": "It creates it out of nothing, typing the numbers into their accounts"
          },
          {
            "ar": "من الضرائب التي تجمعها الدولة",
            "en": "From the taxes the state collects"
          },
          {
            "ar": "من قرضٍ يأخذه من صندوق النقد الدولي",
            "en": "From a loan taken out with the IMF"
          },
          {
            "ar": "من بيع ما يحتفظ به من ذهب",
            "en": "By selling off its gold reserves"
          }
        ],
        "src": "ص 44",
        "why": {
          "ar": "يفعل ذلك بوصفه «ملجأً أخيراً للإقراض»، وغايته حماية النظام لا الربح، وهذا يمنحه سلطةً على المصارف في لعبة قطٍّ وفأر. وعلى المنوال نفسه تضمن الدولة ودائع الناس.",
          "en": "It acts as the “lender of last resort”, aiming to protect the system, not to profit — which gives it power over the banks in a game of cat and mouse. In the same spirit, the state guarantees people’s deposits."
        }
      },
      {
        "id": "majd-53",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "بحسب فاروفاكيس، كلّما نجحت الدولة في فرض الاستقرار المالي، زاد تهوّر المصرفيين والاضطراب الذي يصنعونه.",
          "en": "According to Varoufakis, the better the state is at imposing financial stability, the more reckless bankers become — and the more instability they cause."
        },
        "isMyth": false,
        "hint": {
          "ar": "ماذا يفعل سائقٌ مستعجل حين يطمئنّ إلى أن الطريق خالٍ من الرادارات؟",
          "en": "What does a driver in a hurry do once sure there are no speed cameras?"
        },
        "src": "ص 46",
        "explain": {
          "ar": "مفارقةٌ أساسية في الكتاب: الاستقرار يجعل الظروف آمنةً لخلق مزيدٍ من الدَّين. والمصرفيون كسائقٍ دفع مخالفة سرعة فهدأ قليلاً، ثم عاد يتجاوز السرعة.",
          "en": "A core paradox of the book: stability makes it safe to create more debt. Bankers are like a driver fined for speeding: slow for a while, then speeding again."
        }
      },
      {
        "id": "majd-54",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "لماذا كانت «المسؤولية المحدودة» ضروريةً لبناء السكك الحديدية ومحطّات الكهرباء؟",
          "en": "Why was “limited liability” essential for building railways and power stations?"
        },
        "opts": [
          {
            "ar": "لأن إفلاس الشركة لم يعد يُفقد صاحبها بيته، فجرؤ الناس على المشاريع الكبيرة",
            "en": "Bankruptcy no longer cost the owner his home, so people dared to take on big projects"
          },
          {
            "ar": "لأنها خفّضت الضرائب على الشركات، فكثرت أرباح المستثمرين",
            "en": "It cut taxes on companies, so investors earned more"
          },
          {
            "ar": "لأنها حمت العمّال من الطرد، فقبلوا العمل في المشاريع الخطرة",
            "en": "It protected workers from dismissal, so they took on dangerous jobs"
          },
          {
            "ar": "لأنها ألزمت المصارف بإقراض المشاريع التي تخدم الجميع",
            "en": "It obliged banks to lend to projects that served everyone"
          }
        ],
        "src": "ص 46–48",
        "why": {
          "ar": "من غير هذه الحماية لا يغامر بمشروعٍ ضخم إلا الأثرياء جداً أو المتهوّرون. ويلاحظ فاروفاكيس بسخرية أنها تُمنح لأصحاب الشركات ولا تُمنح للناس العاديين.",
          "en": "Without that shield, only the very rich or the reckless would risk a huge venture. Varoufakis notes the irony: company owners get this protection from the bailiffs, while ordinary people don’t."
        }
      },
      {
        "id": "majd-55",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "ما الحجّة الأقوى عند فاروفاكيس لشطب الديون التي لا يمكن سدادها؟",
          "en": "What is Varoufakis’s strongest argument for writing off debts that can never be repaid?"
        },
        "opts": [
          {
            "ar": "أن من يغرق في دَينٍ أبدي لا يتعافى ولا يوظّف ولا يشتري، فيخسر الجميع",
            "en": "Someone sunk in endless debt can’t recover, hire or spend — so everyone loses"
          },
          {
            "ar": "أن الدائنين أغنياء، وخسارتهم لن تضرّ أحداً",
            "en": "The creditors are rich, and their loss hurts no one"
          },
          {
            "ar": "أن الفائدة ظلمٌ في أصلها، فلا حقّ للدائن فيها",
            "en": "Interest is unjust in itself, so creditors have no right to it"
          },
          {
            "ar": "أن التضخّم سيمحو هذه الديون على أيّ حال",
            "en": "Inflation will wipe these debts out anyway"
          }
        ],
        "src": "ص 48",
        "why": {
          "ar": "لا شركة ولا عائلة ولا بلد يتعافى وهو في قبضة دَينٍ لا يُسدَّد. لذلك نصّت الكتب المقدّسة على شطب الديون دورياً، كما تحتاج الغابات إلى حرق بعض أغصانها المتساقطة كي لا تشتعل فيها حرائق مدمّرة.",
          "en": "No company, family or country can recover in the grip of an unpayable debt. That’s why scripture called for debts to be cancelled periodically — just as forests need some fallen branches burned to prevent devastating fires."
        }
      },
      {
        "id": "majd-56",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "لماذا يحبّ المصرفيون السندات الحكومية كثيراً؟",
          "en": "Why are bankers so fond of government bonds?"
        },
        "opts": [
          {
            "ar": "لأنها «أكثر الأصول سيولة»: قرضٌ آمن، وضمانٌ لقروضٍ أخرى، وتُباع فوراً",
            "en": "They’re “the most liquid of assets”: a safe loan, collateral for more loans, and sellable at once"
          },
          {
            "ar": "لأنها معفاةٌ من الضرائب، فربحها كلّه لهم",
            "en": "They’re tax-free, so all the return is theirs"
          },
          {
            "ar": "لأنها تدرّ أعلى فائدةٍ يمكن أن يجدوها في السوق",
            "en": "They pay the highest interest on the market"
          },
          {
            "ar": "لأن القانون يُلزمهم بشراء نصيبٍ منها كلّ عام",
            "en": "The law makes them buy a share every year"
          }
        ],
        "src": "ص 52",
        "why": {
          "ar": "لا دَين آخر يُعاد تدويره بهذه السهولة، فالسندات تُشحّم عجلات النظام المصرفي كلّه.",
          "en": "No other debt can be recycled so easily: bonds grease the wheels of the whole banking system."
        }
      },
      {
        "id": "majd-57",
        "book": "talking-to-my-daughter",
        "kind": "tf",
        "statement": {
          "ar": "يرى فاروفاكيس أن الدَّين العام لعنةٌ يجب التخلّص منها بأسرع وقت.",
          "en": "Varoufakis sees public debt as a curse to be got rid of as fast as possible."
        },
        "isMyth": true,
        "hint": {
          "ar": "فكّر في الأزمات: من يظلّ ينفق ويقترض حين يتوقّف الجميع؟",
          "en": "Think of a crisis: who keeps spending and borrowing when everyone else stops?"
        },
        "src": "ص 50–52",
        "explain": {
          "ar": "يصفه بـ«الشبح في الآلة» الذي يُشغّل مجتمع السوق، وبحزامٍ مطّاطي يتمدّد في الأزمات كي لا ينقطع النظام. وهو عنده أيضاً نتيجةُ رفض الأغنياء دفع حصّتهم من الضرائب.",
          "en": "He calls it “the ghost in the machine” that keeps market society running — an elastic band that stretches in a crisis so the system doesn’t snap. He also sees it as the result of the rich refusing to pay their share of tax."
        }
      },
      {
        "id": "majd-61",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "في «متلازمة إيكاروس»، ما القوى الثلاث التي تدفع الأسعار إلى ما دون التكلفة في اقتصادٍ يتحوّل إلى الآلات؟",
          "en": "In the “Icarus syndrome”, which three forces push prices below costs in an economy turning to machines?"
        },
        "opts": [
          {
            "ar": "الأتمتة تخفض التكاليف، والمنافسة تمنع رفع الأسعار، والآلات لا تشتري ما تنتجه",
            "en": "Automation cuts costs, competition stops prices rising, and machines don’t buy what they make"
          },
          {
            "ar": "الضرائب ترفع الكلفة، والنقابات ترفع الأجور، والحروب تُغلق الأسواق",
            "en": "Taxes raise costs, unions raise wages, and wars close markets"
          },
          {
            "ar": "التضخّم يأكل الأرباح، والفائدة ترتفع، والعملة تفقد قيمتها",
            "en": "Inflation eats profits, interest rates climb, and the currency loses value"
          },
          {
            "ar": "الديون تخنق المصانع، والعمّال يهاجرون، والموادّ الخام تنفد",
            "en": "Debt chokes the factories, workers emigrate, and raw materials run out"
          }
        ],
        "src": "ص 63",
        "why": {
          "ar": "هذه فكرة ماركس كما يرويها فاروفاكيس: يقترب الاقتصاد من الشمس فيذوب شمع جناحيه في أزمة، قبل أن تحلّ الآلات محلّ البشر كلّياً.",
          "en": "Marx’s idea, as Varoufakis tells it: the economy flies close to the sun and the wax on its wings melts in a crisis — before machines can replace humans entirely."
        }
      },
      {
        "id": "majd-65",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "ما أخطر عيبٍ في عملةٍ لا تتبع دولة، مثل بيتكوين، في رأي فاروفاكيس؟",
          "en": "What is the most dangerous flaw of a currency no state stands behind, like Bitcoin, in Varoufakis’s view?"
        },
        "opts": [
          {
            "ar": "كمّيتها الثابتة تزيد احتمال الأزمات الانكماشية، وتمنع زيادة المال لمواجهتها",
            "en": "Its fixed supply makes deflationary crises likelier, and rules out adding money to fight them"
          },
          {
            "ar": "أنها سهلة السرقة، ولا تأمين من دولةٍ عليها",
            "en": "It’s easy to steal, with no state insuring it"
          },
          {
            "ar": "أن تحويلها بطيءٌ ومكلف مقارنةً بالمصارف",
            "en": "Transfers are slow and costly compared with banks"
          },
          {
            "ar": "أن الحكومات الكبرى تتحكّم بها سرّاً",
            "en": "The big governments secretly control it"
          }
        ],
        "src": "ص 85",
        "why": {
          "ar": "غياب تأمين الدولة ضدّ السرقة عيبٌ خطير، لكنه ليس الأخطر. فحين ينهار الاقتصاد لا يمكن زيادة كمّية المال لإنعاشه، لأن الكمّية ثابتةٌ في الخوارزمية نفسها.",
          "en": "Having no state to insure you against theft is a serious flaw, but not the worst. When the economy crashes, nobody can add money to revive it: the quantity is fixed in the algorithm itself."
        }
      },
      {
        "id": "majd-67",
        "book": "talking-to-my-daughter",
        "kind": "mcq",
        "q": {
          "ar": "لماذا يشبّه فاروفاكيس خبراء الاقتصاد بعرّافي قبيلة الأزاندي الأفريقية؟",
          "en": "Why does Varoufakis liken economic experts to the oracles of Africa’s Azande people?"
        },
        "opts": [
          {
            "ar": "لأنهم حين تفشل توقّعاتهم يفسّرون الفشل بمفاهيم جديدة من النظام نفسه",
            "en": "When their forecasts fail, they explain the failure with new notions from the same system"
          },
          {
            "ar": "لأنهم يستعملون الطقوس والتعاويذ في حساباتهم",
            "en": "They use rituals and charms in their calculations"
          },
          {
            "ar": "لأن توقّعاتهم تصيب دائماً، كما كانت نبوءات العرّافين",
            "en": "Their forecasts always come true, like the oracles’ prophecies"
          },
          {
            "ar": "لأنهم يرفضون الرياضيات ويثقون بالحدس",
            "en": "They reject mathematics and trust their intuition"
          }
        ],
        "src": "ص 96–98",
        "why": {
          "ar": "مثل «البطالة الطبيعية»: مفهومٌ وُلد ليفسّر عجز الأسواق عن تحقيق التشغيل الكامل، وعجز الخبراء عن تفسيره. ويرى فاروفاكيس علم الاقتصاد السائد لاهوتاً بالمعادلات. هذا رأيه، ويصلح للنقاش في الجلسة.",
          "en": "Take “natural unemployment”, a notion created to explain why markets fail to deliver full employment — and why the experts couldn’t explain it. Varoufakis sees mainstream economics as theology with equations. That’s his view, and a good one to argue about at the meeting."
        }
      },
      {
        "id": "majd-69",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "من أين جاءت كلمة «تعدّد المهامّ» (Multitasking)؟",
          "en": "Where does the word “multitasking” come from?"
        },
        "opts": [
          {
            "ar": "من علماء الحاسوب في الستّينيات، لوصف آلاتٍ بأكثر من معالج",
            "en": "From 1960s computer scientists, describing machines with more than one processor"
          },
          {
            "ar": "من علم النفس، لوصف أدمغة الموهوبين",
            "en": "From psychology, describing gifted brains"
          },
          {
            "ar": "من الجيش، لوصف تدريب الطيّارين المقاتلين",
            "en": "From the military, describing fighter-pilot training"
          },
          {
            "ar": "من إعلانات الهواتف الذكية الأولى",
            "en": "From the first smartphone adverts"
          }
        ],
        "src": "ص 50",
        "why": {
          "ar": "الآلة تستطيع حقّاً أن تؤدّي أمرين معاً. أمّا نحن فأخذنا الكلمة وطبّقناها على أنفسنا.",
          "en": "The machine really can do two things at once. We just took the word and applied it to ourselves."
        }
      },
      {
        "id": "majd-70",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "إن نظرت إلى رسالةٍ خمس ثوانٍ ثم عدت إلى عملك، فلا تخسر إلا تلك الثواني الخمس.",
          "en": "If you glance at a message for five seconds and go back to work, all you lose is those five seconds."
        },
        "isMyth": true,
        "hint": {
          "ar": "حين تعود إلى الصفحة، هل تبدأ من حيث توقّفت تماماً؟",
          "en": "When you come back to the page, do you pick up exactly where you left off?"
        },
        "src": "ص 21، 51",
        "explain": {
          "ar": "هذا «أثر كلفة الانتقال»: يحتاج الدماغ أن يعيد تهيئة نفسه ويتذكّر أين كان، وقد يطول ذلك أكثر بكثير من النظرة نفسها.",
          "en": "This is the “switch-cost effect”: your brain has to reconfigure and remember where it was, which can take far longer than the glance itself."
        }
      },
      {
        "id": "majd-72",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "أيّ هذه ليس من أضرار التنقّل المستمرّ بين المهامّ، كما يعدّدها الكتاب؟",
          "en": "Which of these is NOT one of the costs of constant task-switching the book lists?"
        },
        "opts": [
          {
            "ar": "الإرهاق العضلي",
            "en": "Muscle fatigue"
          },
          {
            "ar": "البطء وكثرة الأخطاء",
            "en": "Slowness and more mistakes"
          },
          {
            "ar": "«نضوب الإبداع»",
            "en": "“Creativity drain”"
          },
          {
            "ar": "ضعف تذكّر ما فعلته",
            "en": "Remembering less of what you did"
          }
        ],
        "src": "ص 51–53",
        "why": {
          "ar": "الأفكار الجديدة تأتي حين يربط الدماغ بين أشياء عرفها، وهذا يحتاج وقتاً حرّاً بلا تشويش. وتحويل ما نعيشه إلى ذكريات يحتاج طاقةً ذهنية يستهلكها التنقّل.",
          "en": "New ideas come when the brain links things it already knows, which takes free, undistracted time. And turning experience into memories takes mental energy that switching burns up."
        }
      },
      {
        "id": "majd-73",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "مجرّد ترك الهاتف مفتوحاً وتلقّي الرسائل أثناء امتحان جعل أداء الطلاب أسوأ بنحو ٢٠٪.",
          "en": "Simply having their phones on and receiving texts during a test made students perform about 20% worse."
        },
        "isMyth": false,
        "hint": {
          "ar": "كم مرّةً يقطع الإشعار تفكيرك وإن لم تفتحه؟",
          "en": "How often does a notification break your train of thought, even unopened?"
        },
        "src": "ص 55",
        "explain": {
          "ar": "في دراسةٍ لجامعة كارنيغي ميلون على ١٣٦ طالباً. ووجدت دراساتٌ أخرى ما هو أسوأ، حتى ٣٠٪. ويستنتج هاري أن أصحاب الهواتف الذكية يخسرون هذا القدر من أدائهم معظم الوقت.",
          "en": "A Carnegie Mellon study of 136 students. Other studies found worse — up to 30%. Hari concludes that most smartphone owners are losing that much, most of the time."
        }
      },
      {
        "id": "majd-74",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "جرّب الباحث ديفيد ستراير سائقين في أجهزة محاكاة القيادة وهواتفهم تتلقّى الرسائل. بماذا كان أداؤهم أشبه؟",
          "en": "David Strayer tested drivers in simulators while their phones received texts. What did their driving most resemble?"
        },
        "opts": [
          {
            "ar": "بالقيادة في حالة سُكر",
            "en": "Driving drunk"
          },
          {
            "ar": "بالقيادة في مطرٍ غزير",
            "en": "Driving in heavy rain"
          },
          {
            "ar": "بالقيادة مع راكبٍ ثرثار",
            "en": "Driving with a chatty passenger"
          },
          {
            "ar": "بالقيادة ليلاً بلا أضواء",
            "en": "Driving at night without lights"
          }
        ],
        "src": "ص 55",
        "why": {
          "ar": "كان الأثر «مشابهاً جدّاً» للسُّكر. ونحو حادثٍ من كلّ خمسة حوادث سيارات اليوم سببه سائقٌ مشتّت الانتباه.",
          "en": "It was “very similar” to being drunk. About one car crash in five today is caused by a distracted driver."
        }
      },
      {
        "id": "majd-76",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "بالتدريب الكافي يمكنك أن تقرأ أسرع بكثير وتفهم بالقدر نفسه.",
          "en": "With enough training, you can read much faster and understand just as much."
        },
        "isMyth": true,
        "hint": {
          "ar": "هل يمكن أن تفهم كتاباً بالسرعة التي تقلّب بها صفحاته؟",
          "en": "Could you understand a book as fast as you can flick through it?"
        },
        "src": "ص 46",
        "explain": {
          "ar": "السرعة تزيد فعلاً بالتدريب، لكن الفهم يقلّ معها، حتى عند محترفي القراءة السريعة. للدماغ حدٌّ أقصى في استيعاب المعلومات.",
          "en": "Speed really does rise with training, but comprehension falls with it — even among professional speed-readers. The brain has a maximum rate for taking information in."
        }
      },
      {
        "id": "majd-79",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "قراءة كتابٍ من أبسط أشكال «حالة التدفّق» وأكثرها شيوعاً في حياة الناس.",
          "en": "Reading a book is one of the simplest and most common forms of flow people experience."
        },
        "isMyth": false,
        "hint": {
          "ar": "متى نسيت الوقت آخر مرّةٍ وأنت تقرأ؟",
          "en": "When did you last lose track of time reading?"
        },
        "src": "ص 101–104",
        "explain": {
          "ar": "هذا ما وجده تشيكسنتميهايي. ويخشى هاري أن تصير القراءة العميقة هوايةً لقلّةٍ صغيرة مثل الأوبرا، فنحو ٥٧٪ من الأمريكيين لا يقرؤون كتاباً واحداً في السنة.",
          "en": "That’s what Csikszentmihalyi found. Hari fears deep reading could become a minority pastime, like opera: some 57% of Americans don’t read a single book in a typical year."
        }
      },
      {
        "id": "majd-81",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "ماذا قصد مارشال ماكلوهان بعبارته «الوسيط هو الرسالة»؟",
          "en": "What did Marshall McLuhan mean by “the medium is the message”?"
        },
        "opts": [
          {
            "ar": "أن التقنية ليست أنبوباً محايداً للمعلومات، بل تغيّر طريقة تفكيرنا نفسها",
            "en": "Technology isn’t a neutral pipe for information — it changes how we think"
          },
          {
            "ar": "أن المحتوى أهمّ من أيّ شيءٍ آخر في الإعلام",
            "en": "Content matters more than anything else in media"
          },
          {
            "ar": "أن وسائل الإعلام تكذب دائماً، فلا تصدّق رسائلها",
            "en": "The media always lie, so don’t trust their messages"
          },
          {
            "ar": "أن الكتب أفضل دائماً من التلفزيون",
            "en": "Books are always better than television"
          }
        ],
        "src": "ص 104",
        "why": {
          "ar": "كلّ وسيطٍ جديد كنظّارةٍ بعدساتٍ خاصّة: تويتر مثلاً يدرّبنا على التفكير القصير السريع، أيّاً كان ما يُكتب فيه. وقال أستاذٌ في هارفارد لهاري إنه صار يعطي طلّابه بودكاست ومقاطع فيديو، لأنهم يعجزون عن قراءة حتى الكتب القصيرة.",
          "en": "Every new medium is like a pair of goggles with their own lenses: Twitter trains us to think short and fast, whatever is written on it. A Harvard professor told Hari he now gives students podcasts and video clips, because they struggle to read even short books."
        }
      },
      {
        "id": "majd-82",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "ماذا اكتشف ماركوس ريشل حين صوّر أدمغة أناسٍ ينتظرون دون أن يفعلوا شيئاً؟",
          "en": "What did Marcus Raichle discover when he scanned the brains of people waiting around, doing nothing?"
        },
        "opts": [
          {
            "ar": "منطقةً تنشط كثيراً حين يسرح الذهن، سمّاها «شبكة الوضع التلقائي»",
            "en": "A region that gets very busy when the mind wanders — the “default mode network”"
          },
          {
            "ar": "أن الدماغ يهدأ تماماً كالعضلة المستريحة",
            "en": "That the brain goes completely quiet, like a resting muscle"
          },
          {
            "ar": "أن النشاط كلّه ينتقل إلى المخيخ",
            "en": "That all the activity moves to the cerebellum"
          },
          {
            "ar": "أن الانتظار يُنشّط مراكز القلق وحدها",
            "en": "That waiting lights up only the anxiety centres"
          }
        ],
        "src": "ص 118",
        "why": {
          "ar": "كان الرأي السائد أن الدماغ المستريح «خامد» كالعضلة. وفتح هذا الاكتشاف باب دراسة شرود الذهن.",
          "en": "The received view was that a resting brain lies dormant, like a muscle. This discovery opened up the study of mind-wandering."
        }
      },
      {
        "id": "majd-83",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "شرود الذهن ضارٌّ دائماً، لأنه عكس التركيز.",
          "en": "Mind-wandering is always harmful, because it’s the opposite of focus."
        },
        "isMyth": true,
        "hint": {
          "ar": "من أين تأتيك أفضل أفكارك: وأنت تحدّق في المسألة، أم تحت الدُّش؟",
          "en": "Where do your best ideas come from: staring at the problem, or in the shower?"
        },
        "src": "ص 116–120",
        "explain": {
          "ar": "الشرود يساعدنا على فهم حياتنا والتخطيط البعيد والربط بين الأفكار، وحتى القراءة الجيّدة تحتاج قدراً منه ليفهم القارئ الفكرة الكبرى. الضارّ هو الشرود الممزوج بالتوتّر والقلق.",
          "en": "Wandering helps us make sense of our lives, plan ahead and connect ideas — even good reading needs some of it to grasp the big picture. What harms is wandering soaked in stress and worry."
        }
      },
      {
        "id": "majd-84",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "كيف جاء الحلّ لعالم الرياضيات هنري بوانكاريه في مسألةٍ عجز عنها طويلاً؟",
          "en": "How did the mathematician Henri Poincaré finally solve a problem that had beaten him for ages?"
        },
        "opts": [
          {
            "ar": "فجأةً وهو يصعد إلى حافلةٍ في رحلة، بعد أن ترك عقله يسرح",
            "en": "Suddenly, stepping onto a bus on a trip, after letting his mind wander"
          },
          {
            "ar": "بعد أسابيع من التركيز المتواصل عليها وحدها",
            "en": "After weeks of unbroken focus on that problem alone"
          },
          {
            "ar": "في حلمٍ رآه في الليلة نفسها",
            "en": "In a dream that very night"
          },
          {
            "ar": "في نقاشٍ حادّ مع زملائه في الجامعة",
            "en": "In a heated argument with university colleagues"
          }
        ],
        "src": "ص 120",
        "why": {
          "ar": "حين «أطفأ المصباح الكاشف» استطاع عقله أن يربط أجزاء المسألة. وكثيرٌ من الاختراقات العلمية جاء بهذه الطريقة.",
          "en": "Once he “switched off the spotlight”, his mind could join up the pieces. Many scientific breakthroughs have come this way."
        }
      },
      {
        "id": "majd-85",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "ما أهمّ ما تعلّمه تريستان هاريس من السحر الذي أتقنه في طفولته؟",
          "en": "What was the key lesson Tristan Harris took from the magic he learned as a boy?"
        },
        "opts": [
          {
            "ar": "أن السحر لعبٌ على حدود الانتباه، وأن الذكاء لا يحمي أحداً منه",
            "en": "Magic plays on the limits of attention, and intelligence protects no one from it"
          },
          {
            "ar": "أن الأذكياء لا تنطلي عليهم الخدع",
            "en": "Clever people can’t be fooled"
          },
          {
            "ar": "أن السحر كلّه سرعة يد",
            "en": "Magic is all about sleight of hand"
          },
          {
            "ar": "أن الأطفال أسهل خداعاً من الكبار",
            "en": "Children are easier to fool than adults"
          }
        ],
        "src": "ص 133",
        "why": {
          "ar": "العملة لا تختفي فعلاً، بل يكون انتباهك في مكانٍ آخر. ونقاط الضعف هذه موجودةٌ عند الجميع ويمكن توقّعها، وهذا ما تستغلّه التطبيقات.",
          "en": "The coin doesn’t really vanish: your attention is just somewhere else. These blind spots are in all of us and can be predicted — and that’s what apps exploit."
        }
      },
      {
        "id": "majd-86",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "من أيّ فكرةٍ طلّابية بسيطة وُلد تطبيق «إنستغرام»؟",
          "en": "Which simple student idea did Instagram grow out of?"
        },
        "opts": [
          {
            "ar": "تطبيقٍ يرسل صورةً للشمس إلى صديقٍ يعيش في طقسٍ غائم، ليخفّف عنه كآبة الشتاء",
            "en": "An app that sends a photo of the sun to a friend stuck in gloomy weather, to lift their winter blues"
          },
          {
            "ar": "ألبومٍ رقمي يجمع صور طلّاب الجامعة في مكانٍ واحد",
            "en": "A digital album gathering a university’s student photos in one place"
          },
          {
            "ar": "تطبيق تعارفٍ يعرض صور الطلّاب على بعضهم",
            "en": "A dating app showing students each other’s photos"
          },
          {
            "ar": "مسابقة تصويرٍ أسبوعية يصوّت فيها الأصدقاء",
            "en": "A weekly photo contest where friends vote"
          }
        ],
        "src": "ص 137",
        "why": {
          "ar": "اسمه «أرسِل ضوء الشمس»، صمّمه تريستان هاريس مع مايك كريغر في ستانفورد. ثم أضاف كريغر وكيفن سيستروم المكافأة الفورية، القلوب والإعجابات، فوُلد إنستغرام.",
          "en": "It was called Send the Sunshine, built by Tristan Harris and Mike Krieger at Stanford. Later Krieger and Kevin Systrom added the instant reward of hearts and likes, and Instagram was born."
        }
      },
      {
        "id": "majd-88",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "لماذا تبدو بعض الإعلانات دقيقةً حتى نظنّ أن هواتفنا تتنصّت علينا؟",
          "en": "Why do some adverts seem so spot-on that we suspect our phones are listening in?"
        },
        "opts": [
          {
            "ar": "لأن الشركات بنت لكلّ مستخدم «دمية فودو» رقمية تتنبّأ بسلوكه",
            "en": "Companies have built a digital “voodoo doll” of each user that predicts their behaviour"
          },
          {
            "ar": "لأن الميكروفون يعمل دائماً ويسجّل أحاديثنا",
            "en": "The microphone is always on, recording our conversations"
          },
          {
            "ar": "لأنها مصادفاتٌ نتذكّرها وننسى ما عداها",
            "en": "They’re coincidences we remember while forgetting the misses"
          },
          {
            "ar": "لأن أصدقاءنا يبيعون بياناتنا دون أن ندري",
            "en": "Our friends sell our data without our knowing"
          }
        ],
        "src": "ص 158",
        "why": {
          "ar": "بحسب آزا راسكن، الحقيقة أشدّ إخافةً من التنصّت: نموذجٌ منك يزداد شبهاً بك مع كلّ نقرة. ولهذا تأتي خرائط غوغل مجّاناً وتُباع السمّاعات الذكية بأرخص الأثمان: كلّ ذلك يغذّي الدمية.",
          "en": "According to Aza Raskin, the truth is scarier than eavesdropping: a model of you that looks more like you with every click. That’s why Google Maps is free and smart speakers are sold so cheaply — it all feeds the doll."
        }
      },
      {
        "id": "majd-89",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "يطلب نير إيال في كتابه عن تصميم التطبيقات أن يتخيّل المصمّمون مستخدمةً اسمها «جولي». أيّ شعورٍ لديها ينصح باستغلاله؟",
          "en": "In his book on app design, Nir Eyal tells designers to picture a user called Julie. Which of her feelings does he advise them to play on?"
        },
        "opts": [
          {
            "ar": "خوفها من أن يفوتها ما يجري",
            "en": "Her fear of being out of the loop"
          },
          {
            "ar": "فضولها لمعرفة الجديد",
            "en": "Her curiosity about what’s new"
          },
          {
            "ar": "حبّها للصور الجميلة",
            "en": "Her love of beautiful pictures"
          },
          {
            "ar": "رغبتها في التعلّم وتطوير نفسها",
            "en": "Her wish to learn and improve herself"
          }
        ],
        "src": "ص 186",
        "why": {
          "ar": "الخوف عنده «محفّزٌ داخلي» قويّ تُبنى عليه العادة، حتى يفتح المستخدم التطبيق تلقائياً كلّما وقف في طابور انتظار.",
          "en": "Fear, he writes, is a powerful “internal trigger” to build a habit on — until the user opens the app automatically whenever they’re waiting in line."
        }
      },
      {
        "id": "majd-90",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "ما اعتراض هاري الأساسي على نصائح نير إيال لاستعادة التركيز؟",
          "en": "What is Hari’s main objection to Nir Eyal’s advice for getting your focus back?"
        },
        "opts": [
          {
            "ar": "أنها تجعل المشكلة مسألة ضبطٍ ذاتي فردي، كما تحبّ شركات التقنية أن نراها",
            "en": "It makes the problem one of personal self-control — just as the tech companies like us to see it"
          },
          {
            "ar": "أنها لا تنفع أحداً على الإطلاق",
            "en": "It doesn’t help anyone at all"
          },
          {
            "ar": "أنها تحتاج تطبيقاتٍ مدفوعة باهظة الثمن",
            "en": "It needs expensive paid apps"
          },
          {
            "ar": "أنها موجّهةٌ للأطفال ولا تناسب الكبار",
            "en": "It’s aimed at children and doesn’t suit adults"
          }
        ],
        "src": "ص 179–184",
        "why": {
          "ar": "جرّب هاري نصائح نير كلّها ووجد بعضها مفيداً فعلاً. لكنه يرى أنها تنسجم تماماً مع ما تريد الشركات أن نصدّقه: الحلّ الفردي بدايةٌ مهمّة، لكنه لا يكفي.",
          "en": "Hari tried every one of Nir’s tips and found some genuinely helpful. But they fit exactly with what the companies want us to believe: personal fixes are a good start, and not enough."
        }
      },
      {
        "id": "majd-91",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "حين يتعب الإنسان، قد «ينام» انتباهه أجزاءً من الثانية وعيناه مفتوحتان، دون أن يشعر.",
          "en": "When you’re tired, your attention can “fall asleep” for fractions of a second with your eyes open — without you noticing."
        },
        "isMyth": false,
        "hint": {
          "ar": "هل قرأت مرّةً صفحةً كاملة وأنت متعب ثم لم تتذكّر منها شيئاً؟",
          "en": "Ever read a whole page while tired and remembered none of it?"
        },
        "src": "ص 85",
        "explain": {
          "ar": "سمّاها الباحث «ومضات الانتباه»، ورصدتها أجهزةٌ تتتبّع حركة العين ونشاط الدماغ عند المتعبين. ونحو ٤٠٪ من الأمريكيين ينامون أقلّ من سبع ساعات في الليلة.",
          "en": "The researcher called them “attentional blinks”, caught by equipment tracking tired people’s eyes and brain activity at once. Some 40% of Americans sleep less than seven hours a night."
        }
      },
      {
        "id": "majd-92",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "ماذا اكتشفت الطبيبة نادين بورك هاريس عند الأطفال الذين عاشوا صدماتٍ متعدّدة؟",
          "en": "What did the doctor Nadine Burke Harris find in children who had lived through multiple traumas?"
        },
        "opts": [
          {
            "ar": "أن مشكلات الانتباه عندهم أكثر بكثير، لأن الدماغ الخائف يظلّ يراقب ما حوله",
            "en": "Far more attention problems, because a frightened brain keeps scanning its surroundings"
          },
          {
            "ar": "أنهم أذكى من غيرهم، لأنهم تعلّموا الحذر مبكراً",
            "en": "They were cleverer than others, having learned caution early"
          },
          {
            "ar": "أن الصدمات لا تمسّ الانتباه، بل المزاج وحده",
            "en": "Trauma left their attention alone and affected only their mood"
          },
          {
            "ar": "أن الدواء يحلّ مشكلات انتباههم دائماً",
            "en": "Medication always solved their attention problems"
          }
        ],
        "src": "ص 218–222",
        "why": {
          "ar": "التركيز يحتاج إحساساً بالأمان. والأطفال الذين عاشوا أربع صدماتٍ أو أكثر كانوا أكثر عرضةً بـ٣٢٫٦ مرّة لتشخيصهم بمشكلاتٍ في السلوك أو الانتباه.",
          "en": "Focus needs a sense of safety. Children who had lived through four or more kinds of trauma were 32.6 times likelier to be diagnosed with behaviour or attention problems."
        }
      },
      {
        "id": "majd-93",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "ما القاسم المشترك بين الأنظمة الغذائية في المجتمعات التي تقلّ فيها مشكلات الانتباه والخَرَف؟",
          "en": "What do the diets of communities with fewer attention problems and less dementia have in common?"
        },
        "opts": [
          {
            "ar": "أنها تقوم على الأطعمة الكاملة، وتكاد تخلو من المصنّعة والمكرّرة",
            "en": "They’re built on whole foods, with almost nothing processed or refined"
          },
          {
            "ar": "أنها غنيّةٌ بالأسماك وزيت السمك",
            "en": "They’re rich in fish and fish oil"
          },
          {
            "ar": "أنها تخلو من النشويات كالخبز والأرز",
            "en": "They cut out starches like bread and rice"
          },
          {
            "ar": "أنها نباتيةٌ لا لحم فيها",
            "en": "They’re vegetarian, with no meat"
          }
        ],
        "src": "ص 249–254",
        "why": {
          "ar": "بعضها غنيٌّ بالأسماك وبعضها لا، وبعضها نباتيّ وبعضها لا، وفي بعضها نشوياتٌ كثيرة وفي بعضها لا شيء منها. المشترك غياب الطعام المصنّع.",
          "en": "Some are heavy on fish and some aren’t; some are mostly plants and some aren’t; some are full of carbohydrates and some have none. What they share is the absence of processed food."
        }
      },
      {
        "id": "majd-95",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "لماذا تدعو لينور سكينازي الآباء إلى ترك أطفالهم يلعبون أحراراً دون رقابة؟",
          "en": "Why does Lenore Skenazy urge parents to let their children play freely, unsupervised?"
        },
        "opts": [
          {
            "ar": "لأن الطفل الذي يديره الكبار دائماً لا يكتشف ما يأسر انتباهه",
            "en": "A child always steered by adults never discovers what captivates them"
          },
          {
            "ar": "لأن الآباء يحتاجون وقتاً لأنفسهم، والأطفال يتعلّمون الصبر",
            "en": "Parents need time to themselves, and children learn patience"
          },
          {
            "ar": "لأن المدارس فشلت، والشارع يعلّم أكثر منها",
            "en": "Schools have failed, and the street teaches more"
          },
          {
            "ar": "لأن اللعب في الخارج يحرق السعرات ويقي من البدانة",
            "en": "Outdoor play burns calories and prevents obesity"
          }
        ],
        "src": "ص 303، 314",
        "why": {
          "ar": "أسّست حركة «دعهم يكبروا» (Let Grow). وفي الولايات المتحدة لم تبقَ أيّ استراحةٍ للّعب إلا في ٧٣٪ من المدارس الابتدائية.",
          "en": "She founded the Let Grow movement. In the US, only 73% of elementary schools still have any recess at all."
        }
      },
      {
        "id": "majd-97",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "يقسم الفيلسوف جيمس ويليامز الانتباه إلى ثلاث طبقات. أيّها الأعمق، الذي يتيح لك أن تعرف من أنت وماذا تريد؟",
          "en": "The philosopher James Williams splits attention into three layers. Which is the deepest, the one that lets you know who you are and what you want?"
        },
        "opts": [
          {
            "ar": "ضوء النهار",
            "en": "Daylight"
          },
          {
            "ar": "المصباح الكاشف",
            "en": "The spotlight"
          },
          {
            "ar": "ضوء النجوم",
            "en": "Starlight"
          },
          {
            "ar": "ضوء القمر",
            "en": "Moonlight"
          }
        ],
        "src": "ص 336–337",
        "why": {
          "ar": "«المصباح الكاشف» للمهامّ القريبة، و«ضوء النجوم» للأهداف البعيدة، و«ضوء النهار» للتأمّل الذي تعرف به أهدافك أصلاً. ومن فقده بدأ «يتفكّك»: لم يعد يفهم قصّته هو. و«ضوء القمر» ليس من طبقاته.",
          "en": "The spotlight is for near tasks, starlight for long-term goals, daylight for the reflection that tells you what your goals are in the first place. Lose it and you start “decohering”: you stop making sense to yourself. Moonlight isn’t one of his layers."
        }
      },
      {
        "id": "majd-98",
        "book": "stolen-focus",
        "kind": "tf",
        "statement": {
          "ar": "يرى يوهان هاري أن الانقطاع التامّ عن الإنترنت، كما فعل هو ثلاثة أشهر، هو الحلّ الذي ينبغي أن يتبعه الجميع.",
          "en": "Johann Hari believes that cutting off the internet completely, as he did for three months, is the solution everyone should follow."
        },
        "isMyth": true,
        "hint": {
          "ar": "من يقدر أن يترك عمله ثلاثة أشهر ليعيش في كوخٍ على البحر؟",
          "en": "Who can leave work for three months to live in a shack by the sea?"
        },
        "src": "ص 18، 25",
        "explain": {
          "ar": "قال صراحةً إنه ليس حلّاً لمعظم الناس: جدّته التي ربّته كانت تنظّف المراحيض، وأبوه كان سائق حافلة، ولا يقدر أيٌّ منهما على ذلك. المشكلة عنده أعمق من الانضباط الشخصي.",
          "en": "He says outright that it’s no solution for most people: the grandmother who raised him cleaned toilets, his dad drove a bus, and neither could do it. For him the problem runs deeper than personal discipline."
        }
      },
      {
        "id": "majd-99",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "بماذا يشبّه البروفيسور جويل نيغ انتشار مشكلات الانتباه، ليشرح أن المشكلة ليست فردية؟",
          "en": "What does Professor Joel Nigg compare the spread of attention problems to, to show the problem isn’t individual?"
        },
        "opts": [
          {
            "ar": "بالبدانة، التي كانت نادرةً قبل خمسين عاماً ثم صارت وباءً لأن البيئة تغيّرت",
            "en": "Obesity: rare fifty years ago, an epidemic now, because the environment changed"
          },
          {
            "ar": "بالإنفلونزا، التي تنتقل من شخصٍ إلى آخر",
            "en": "Flu, which passes from person to person"
          },
          {
            "ar": "بالتدخين، الذي بدأ موضةً ثم صار إدماناً",
            "en": "Smoking, which started as a fashion and became an addiction"
          },
          {
            "ar": "بقصر النظر، الذي تزيده القراءة في الضوء الخافت",
            "en": "Short-sightedness, made worse by reading in dim light"
          }
        ],
        "src": "ص 18",
        "why": {
          "ar": "لم يصبح الناس فجأةً أقلّ انضباطاً، بل تغيّر ما حولهم. وهذا محور الكتاب كلّه: اثنا عشر سبباً لا يعود معظمها إلى ضعف الإرادة.",
          "en": "People didn’t suddenly lose their self-discipline; the world around them changed. That’s the whole book in a nutshell: twelve causes, most of which have nothing to do with weak willpower."
        }
      },
      {
        "id": "majd-100",
        "book": "stolen-focus",
        "kind": "mcq",
        "q": {
          "ar": "شبّه جيمس ويليامز حالنا بسائقٍ أُفرغ دلو طينٍ على زجاج سيّارته الأمامي. ما أوّل ما عليه أن يفعله؟",
          "en": "James Williams likens our situation to a driver who’s had a bucket of mud thrown over the windscreen. What should the driver do first?"
        },
        "opts": [
          {
            "ar": "أن ينظّف الزجاج قبل أيّ شيءٍ آخر",
            "en": "Clean the windscreen before anything else"
          },
          {
            "ar": "أن يُسرع ليصل في موعده",
            "en": "Speed up to arrive on time"
          },
          {
            "ar": "أن يصلح المرآة الجانبية",
            "en": "Fix the side mirror"
          },
          {
            "ar": "أن يسأل عن الطريق",
            "en": "Ask for directions"
          }
        ],
        "src": "ص 21",
        "why": {
          "ar": "الانتباه شرطٌ لحلّ أيّ مشكلةٍ أخرى؛ من دونه لا تعرف حتى أين أنت. ولهذا يهمّ التركيز في الحياة الشخصية والعامّة معاً.",
          "en": "Attention comes before solving any other problem — without it you don’t even know where you are. That’s why focus matters in private and public life alike."
        }
      }
    ],
  },
}

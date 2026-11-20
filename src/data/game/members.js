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
  majd: { names: ['Majd', 'مجد'], questions: [] },
}

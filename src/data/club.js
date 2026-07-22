/*
 * Club-level data — the human side of the site (seasons, sessions, members,
 * photos). Book *content* lives under data/books/<slug>/; this file is about
 * the club itself and is what the About page renders.
 *
 * Everything here is optional and degrades gracefully: with no photos and no
 * members the About page still renders a complete story. Fill the arrays in as
 * material arrives — no component changes needed.
 */

const L = (ar, en) => ({ ar, en })

export const club = {
  founded: L('ديسمبر ٢٠٢٥', 'December 2025'),

  // A warm atmospheric banner for the top of the About page. Optional and
  // degrades gracefully — the page hides it until the image file exists at
  // public/images/club/reading-corner.jpg.
  banner: {
    src: './images/club/reading-corner.jpg',
    alt: L('كوبُ شايٍ يتصاعد بخاره وكتابٌ مفتوح ونظّارةٌ على غطاءٍ صوفيّ دافئ',
           'A steaming cup of tea, an open book and reading glasses on a warm knit throw'),
  },

  intro: L(
    'نادي «رُقعة» مساحةٌ نلتقي فيها لقراءة كتابٍ مهمّ ومناقشته معاً — لا لنجمع المعلومات فحسب، بل لنغيّر بها عاداتنا وحياتنا. نختار في كلّ موسمٍ كتاباً، ونعدّ له ملخّصاتٍ وموادَّ تفاعلية تُعرَض في الجلسات وتبقى مرجعاً للأعضاء بعدها.',
    'Ruqʿa is a space where we meet to read and discuss an important book together — not merely to gather information, but to change our habits and lives with it. Each season we choose a book and prepare summaries and interactive materials that are presented in the sessions and remain a reference for members afterward.'
  ),

  // Why the club is called what it is — worth saying once, on this page.
  nameStory: L(
    'الرُّقعة خطٌّ عربيّ يُكتب به بسرعةٍ ووضوح — خطّ الكتابة اليومية لا الزخرفة. وهي أيضاً رقعةُ الأرض التي نجتمع عليها. اخترنا الاسم لأن ما نصنعه هنا يشبهه: مكتوبٌ ليُقرأ ويُفهم، لا ليُعلَّق على جدار.',
    'Ruqʿa is an Arabic script made for writing quickly and clearly — the hand of everyday writing, not ornament. It is also a patch of shared ground. We chose the name because what we make here is the same: written to be read and understood, not hung on a wall.'
  ),

  howWeWork: [
    L('نقرأ الكتاب على مراحل، ونلتقي دورياً لمناقشة كلّ جزء.',
      'We read the book in stages and meet regularly to discuss each part.'),
    L('هذا الموقع مرجعٌ شخصي، وشاشة عرضٍ في الجلسات، ومرجعٌ عامّ للنادي.',
      'This site is a personal reference, a screen to present during sessions, and a public reference for the club.'),
    L('كلّ المحتوى ثنائي اللغة (عربي/إنجليزي)، مع أشكالٍ تفاعلية ودراساتٍ على هيئة لعبة.',
      'All content is bilingual (Arabic/English), with interactive figures and studies presented as a game.'),
    L('لا نكتفي بالخلاصة — نجرّب ما في الكتاب بأنفسنا: تقييماتٌ وألعابٌ معرفية تجعل الفكرة محسوسة.',
      'We don’t stop at the summary — we test the book on ourselves: assessments and cognitive games that make the idea tangible.'),
  ],

  /*
   * Where members join from. The club is online — everyone meets in one weekly
   * session — so this is the club's geography. `lat`/`lon` place each point on
   * the About-page world map; adding or moving a member is a single line here.
   *
   * Only `country` is ever shown (map tooltip + legend). `city` is deliberately
   * kept but NOT rendered: it records which point the coordinates refer to, so
   * the numbers stay meaningful to whoever edits this next.
   *
   * No flag emoji by design: Windows renders them as bare letter pairs, so the
   * map uses per-location colours + real names instead — consistent everywhere.
   */
  reach: {
    meeting: L('نلتقي أسبوعياً على مكالمة Google Meet واحدة',
               'We meet weekly on a single Google Meet call'),
    locations: [
      { code: 'sy', country: L('سوريا', 'Syria'),                   city: L('دمشق', 'Damascus'),           lat: 33.51, lon: 36.29 },
      // Istanbul nudged a hair NW onto its own Thracian (European) side — its
      // true point falls in the Bosphorus, which the low-res coastline reads as sea.
      { code: 'tr', country: L('تركيا', 'Turkey'),                  city: L('إسطنبول', 'Istanbul'),        lat: 41.30, lon: 28.60 },
      { code: 'de', country: L('ألمانيا', 'Germany'),               city: L('برلين', 'Berlin'),            lat: 52.52, lon: 13.40 },
      { code: 'gb', country: L('المملكة المتحدة', 'United Kingdom'), city: L('لندن', 'London'),             lat: 51.51, lon: -0.13 },
      { code: 'ae', country: L('الإمارات', 'UAE'),                  city: L('دبي', 'Dubai'),               lat: 25.20, lon: 55.27 },
      { code: 'my', country: L('ماليزيا', 'Malaysia'),              city: L('كوالالمبور', 'Kuala Lumpur'), lat: 3.14,  lon: 101.69 },
    ],
  },

  /*
   * Seasons, newest last. `bookId` links to the books registry, so the timeline
   * picks up each book's real title and cover automatically.
   *   status: 'done' | 'current' | 'planned'
   *   start/end: display strings, or null when not announced yet.
   */
  seasons: [
    {
      bookId: 'why-we-sleep',
      status: 'done',
      start: L('٢٦ ديسمبر ٢٠٢٥', '26 December 2025'),
      end: L('٥ يوليو ٢٠٢٦', '5 July 2026'),
      note: L('موسمنا الأوّل — ستّة أشهرٍ مع النوم، انتهت بجلسةٍ ختامية.',
              'Our first season — six months with sleep, closing with a final session.'),
    },
    {
      bookId: 'stolen-focus',
      status: 'current',
      start: L('الجلسة الأولى: ١١ يوليو ٢٠٢٦', 'First session: 11 July 2026'),
      end: null,   // ongoing — the "Reading now" pill carries the rest
      note: L('موسمنا الحالي — عن الانتباه: من سرقه، وكيف نستعيده.',
              'Our current season — on attention: who stole it, and how we take it back.'),
    },
  ],

  /*
   * Members wall. Shape:
   *   { name: L('الاسم', 'Name'), photo: './images/club/members/<file>.jpg',
   *     line: L('فكرةٌ أحببتها…', 'An idea I loved…') }
   * `photo` is optional — without it the wall shows an initial-monogram tile,
   * which is also the right choice for anyone who prefers not to appear.
   */
  members: [],

  /*
   * Session photos. Shape:
   *   { src: './images/club/sessions/<file>.jpg', bookId: 'why-we-sleep',
   *     date: L('٢٦ ديسمبر ٢٠٢٥', '26 December 2025'),
   *     caption: L('…', '…') }
   */
  gallery: [],
}

/* True once there is anything to show — used to hide empty sections. */
export const hasMembers = () => club.members.length > 0
export const hasGallery = () => club.gallery.length > 0

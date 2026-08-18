/* ============================================================================
   ABOUT THE TRANSLATOR — «عن المترجم»
   ----------------------------------------------------------------------------
   A companion to each book's «عن المؤلّف» tab, for the ARABIC edition the club
   actually reads.

   ONE MODULE, BOTH BOOKS, because it is one man: الحارث النبهان translated both
   «لماذا ننام» (2019) and «تركيزنا المسلوب» (2023), and both are Dar Al-Tanweer
   editions. The biography is therefore written once and each book passes only
   what differs — its own title and the year of its Arabic edition. Duplicating
   it per book would guarantee the two drift apart.

   SOURCING. Everything factual here comes from the Arabic Wikipedia entry, his
   publisher's own author page, and his interview with Asharq Al-Awsat; the
   `sources` block at the foot links all three. Two deliberate omissions:

   - **No portrait.** The author tabs open with one; there is no photograph of
     him the club has any right to use, and inventing or scraping one is worse
     than going without. The layout reads fine without it.
   - **The prison years are in, and here is the evidence behind them.** Arabic
     Wikipedia does not mention them and his Asharq Al-Awsat interview does not
     either, so this was first drafted without them. The club confirmed the
     story, and the press reporting is consistent and specific — fourteen years
     as a political detainee, an English study circle formed with two fellow
     prisoners, release in 1998 — which also explains a detail Wikipedia leaves
     dangling: it dates the start of his translating to 1991, seven years
     before he was free. He began inside.

     It is written plainly and without embellishment: what happened, and what
     it produced. No speculation about why he was held, and no politics — this
     is a reading club's page about a translator, not a verdict on a state.

   It renders in both languages like every other section — the site has no
   Arabic-only sections and adding that machinery for one tab would be a poor
   trade. The English copy says plainly that it is about the Arabic edition.
   ========================================================================== */

const L = (ar, en) => ({ ar, en })

/**
 * @param {object} edition  what differs per book
 * @param {object} edition.titleAr  the book's Arabic title, for the edition line
 * @param {string} edition.yearAr   year of the Arabic edition
 */
export function translatorSection({ titleAr, titleEn, yearAr }) {
  return {
    slug: 'translator',
    icon: '🖋️',
    title: L('عن المترجم', 'About the Translator'),
    lead: L(
      'الحارث النبهان — مترجمٌ سوريّ مقيمٌ في بلغاريا، نقل إلى العربية عشرات الكتب، ومنها الطبعة العربية من هذا الكتاب.',
      'Al-Harith Al-Nabhan — a Syrian translator living in Bulgaria who has brought dozens of books into Arabic, including the Arabic edition of this one.'
    ),
    blocks: [
      { type: 'callout', variant: 'note', title: L('لماذا هذا القسم؟', 'Why this section?'), text: L(
        'الكتاب الذي نقرأه في النادي ليس النصّ الإنجليزيّ، بل **الترجمة العربية**. وكلّ جملةٍ نناقشها مرّت بيد مترجم، واختار لها كلماتها. فمن العدل أن نعرف من هو.',
        'The book the club actually reads is not the English text but the **Arabic translation**. Every sentence we discuss passed through a translator’s hands, and he chose its words. It is only fair to know who he is.'
      ) },

      { type: 'p', text: L(
        '**الحارث النبهان** مترجمٌ سوريّ وُلد في **دمشق** عام **١٩٦١**، ويحمل إلى جانب الجنسية السورية **الجنسية البلغارية**، ويقيم في **بلغاريا**. مهنته الترجمة عن الإنجليزية، ويصفه ناشره بأنّ إليه «يعود الفضل في إيصال كتبٍ ثمينة شهيرة على صعيد العالم إلى القرّاء العرب».',
        '**Al-Harith Al-Nabhan** is a Syrian translator born in **Damascus** in **1961**. He holds **Bulgarian** citizenship alongside Syrian and lives in **Bulgaria**. He translates from English for a living; his publisher credits him with “bringing precious, world-renowned books to Arab readers.”'
      ) },

      { type: 'h', text: L('من الهندسة إلى الترجمة', 'From engineering to translation') },
      { type: 'p', text: L(
        'درس **الهندسة الميكانيكية** في **جامعة دمشق** — تخصّص هندسة الإنتاج وتصميم الآلات — لا الأدب ولا اللغات.',
        'He studied **mechanical engineering** at **Damascus University** — production engineering and machine design — not literature or languages.'
      ) },

      { type: 'h', text: L('حيث بدأ كلّ شيء', 'Where it all began') },
      { type: 'p', text: L(
        'اعتُقل النبهان سياسياً، وأمضى في السجن **أربعة عشر عاماً**، أُفرج عنه بعدها عام **١٩٩٨**. وفي تلك السنوات تحديداً تعلّم الإنجليزية وتعمّق فيها: شكّل مع معتقلَين آخرين حلقةً لدراسة اللغة داخل السجن. ومن هناك بدأت الترجمة — تؤرّخ سيرته لبدايته عام **١٩٩١**، أي وهو ما يزال في الداخل.',
        'Al-Nabhan was detained for political reasons and spent **fourteen years** in prison, released in **1998**. It was in those years that he learned English and went deep into it: inside, he formed a language study circle with two fellow detainees. And it was there that the translating began — his biography dates his first work to **1991**, while he was still inside.'
      ) },
      { type: 'p', text: L(
        'بعد الإفراج واصل الطريق نفسه: اتّخذ الترجمة مهنةً كاملة عام **٢٠٠٥**، ثم تفرّغ منذ **٢٠١٣** لترجمة الكتب، والروايات خاصّةً. ما يقرؤه النادي اليوم بالعربية هو، في جانبٍ منه، ثمرة لغةٍ تعلّمها رجلٌ خلف قضبان.',
        'After his release he carried on down the same road: translation became his full profession in **2005**, and since **2013** he has devoted himself to books, novels in particular. What the club reads in Arabic today is, in part, the fruit of a language a man taught himself behind bars.'
      ) },

      { type: 'h', text: L('الطبعة التي نقرؤها', 'The edition we read') },
      { type: 'p', text: L(
        `صدرت الترجمة العربية لـ**«${titleAr}»** عن **دار التنوير** عام **${yearAr}**، بترجمة الحارث النبهان. وقد ترجم للدار نفسها ما يزيد على **خمسين** عنواناً — ومن بينها كتابا النادي كلاهما.`,
        `The Arabic edition of **“${titleEn}”** was published by **Dar Al-Tanweer** in **${yearAr}**, translated by Al-Harith Al-Nabhan. He has translated more than **fifty** titles for the same publisher — including both of the club’s books.`
      ) },

      { type: 'h', text: L('من ترجماته', 'Some of his translations') },
      { type: 'ul', items: [
        L('**«١٩٨٤»** لجورج أورويل (George Orwell).', '**“1984”** by George Orwell.'),
        L('**«مغامرات أوجي مارتش»** لسول بيلو (Saul Bellow) الحائز جائزة نوبل.',
          '**“The Adventures of Augie March”** by Nobel laureate Saul Bellow.'),
        L('**«كفاحي»** للنرويجيّ كارل أوفه كناوسغارد (Karl Ove Knausgård).',
          '**“My Struggle”** by the Norwegian Karl Ove Knausgård.'),
        // The English title is deliberately NOT bolded. RichText pairs `**`, and
        // the asterisk inside "F*ck" makes five in the line — the pairing breaks
        // and the markers print on screen. Arabic keeps its bold; it has none.
        L('**«فن اللامبالاة»** لمارك مانسون (Mark Manson).', '“The Subtle Art of Not Giving a F*ck” by Mark Manson.'),
        L('**«لماذا ننام»** لماثيو ووكر (٢٠١٩) و**«تركيزنا المسلوب»** ليوهان هاري (٢٠٢٣) — كتابا النادي.',
          '**“Why We Sleep”** by Matthew Walker (2019) and **“Stolen Focus”** by Johann Hari (2023) — the club’s two books.'),
      ] },

      { type: 'h', text: L('كيف يرى الترجمة', 'How he sees translation') },
      { type: 'p', text: L(
        'في حوارٍ مع «الشرق الأوسط» يتحدّث النبهان عن مهنته بتواضعٍ لافت. يقول إنه لا يملك «مشروعاً» بعينه في الترجمة: يقبل ما يُعرض عليه أو يرفضه، ويقترح أحياناً، لكنّ **الناشر** — لا المترجم — هو من يقرّر في النهاية ما يصل إلى القارئ العربي.',
        'In an interview with Asharq Al-Awsat, Al-Nabhan speaks about his craft with striking modesty. He says he has no particular “project” in translation: he accepts or declines what is offered, sometimes proposes a title, but it is the **publisher** — not the translator — who ultimately decides what reaches Arab readers.'
      ) },
      // The `quote` block renders only `text` — no attribution field — so the
      // speaker is named in the prose either side of it, as elsewhere on the site.
      { type: 'quote', text: L(
        'الترجمة كلّها تنطوي دائماً على بعضٍ من هذه الخيانة.',
        'All translation always involves some of this betrayal.'
      ) },
      { type: 'p', text: L(
        'قالها وهو يشرح كيف يتعامل مع الجمل الطويلة جداً — جملٌ تمتدّ أحياناً صفحةً ونصفاً عند لاسلو كراسناهوركاي — إذ يضطر إلى تقطيعها لتُفهم، وهو يعلم أن في ذلك خسارةً ما. ويضيف أنّه لا يرى للمترجم أن يفرض «خطّاً» خاصاً به على النصّ.',
        'He said it while explaining how he handles very long sentences — some running a page and a half in László Krasznahorkai — which he must break up to be understood, knowing something is lost in doing so. He adds that he does not think a translator should impose a “line” of his own on the text.'
      ) },

      { type: 'callout', variant: 'note', title: L('ما الذي يعنيه هذا لنا؟', 'What does this mean for us?'), text: L(
        'حين نقف عند عبارةٍ في الكتاب ونتساءل «هل قصد المؤلّف هذا فعلاً؟» — فالسؤال مشروعٌ مرّتين: مرّةً عن المؤلّف، ومرّةً عن الطريق الذي سلكته الجملة من لغةٍ إلى أخرى. وحين تتاح لنا العبارة الإنجليزية، تصبح المقارنة بينهما جزءاً من المتعة، لا طعناً في أحد.',
        'When we stop at a sentence and ask “did the author really mean this?”, the question is fair twice over: once about the author, and once about the road the sentence travelled from one language to another. Where the English is available to us, comparing the two becomes part of the pleasure — not an accusation against anyone.'
      ) },

      { type: 'sources', title: L('المصادر', 'Sources'), items: [
        { label: L('الحارث النبهان — ويكيبيديا العربية', 'Al-Harith Al-Nabhan — Arabic Wikipedia'),
          publisher: L('ويكيبيديا', 'Wikipedia'),
          url: 'https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB_%D8%A7%D9%84%D9%86%D8%A8%D9%87%D8%A7%D9%86' },
        { label: L('صفحة المترجم لدى ناشره', 'The translator’s page at his publisher'),
          publisher: L('دار التنوير', 'Dar Al-Tanweer'),
          url: 'https://daraltanweer.net/?writer=%D8%A7%D9%84%D8%AD%D8%A7%D8%B1%D8%AB-%D8%A7%D9%84%D9%86%D8%A8%D9%87%D8%A7%D9%86' },
        { label: L('«مترجم فن اللامبالاة… بدأ مشواره المهني من السجن»',
                   '“The translator of The Subtle Art… began his career in prison”'),
          publisher: L('ألوان الوطن', 'Alwan El-Watan'),
          url: 'https://alwan.elwatannews.com/news/details/3500308' },
        { label: L('«يثير حماستي أن أترجم لمؤلّفين يجهلهم القارئ العربي» — حوار',
                   '“It excites me to translate authors the Arab reader doesn’t know” — interview'),
          publisher: L('الشرق الأوسط', 'Asharq Al-Awsat'),
          url: 'https://aawsat.com/%D8%AB%D9%82%D8%A7%D9%81%D8%A9-%D9%88%D9%81%D9%86%D9%88%D9%86/5201415' },
      ] },
    ],
  }
}

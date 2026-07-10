import { useApp } from '../context/AppContext.jsx'

export default function About() {
  const { t } = useApp()
  return (
    <div className="prose-page">
      <span className="pill">{t({ ar: 'عن نادي القراءة', en: 'About the Reading Club' })}</span>
      <h1>{t({ ar: 'عن نادي القراءة', en: 'About the Reading Club' })}</h1>
      <p>
        {t({
          ar: 'نادي القراءة مساحةٌ نلتقي فيها لقراءة كتابٍ مهمّ ومناقشته معاً — لا لنجمع المعلومات فحسب، بل لنغيّر بها عاداتنا وحياتنا. نختار كلّ موسمٍ كتاباً، ونعدّ له ملخّصاتٍ وموادَّ تفاعلية تُعرَض في الجلسات وتبقى مرجعاً للأعضاء بعدها.',
          en: 'The Reading Club is a space where we meet to read and discuss an important book together — not merely to gather information, but to change our habits and lives with it. Each season we choose a book and prepare summaries and interactive materials that are presented in the sessions and remain a reference for members afterward.',
        })}
      </p>

      <div className="callout key">
        <span className="callout-icon" aria-hidden>📅</span>
        <div>
          <strong>{t({ ar: 'مواعيد الجلسات', en: 'Session dates' })}</strong>
          <p>
            {t({
              ar: 'الكتاب الأوّل: «لماذا ننام» لماثيو ووكر. الجلسة الأولى بتاريخ 26.12.2025، والجلسة الأخيرة بتاريخ 05.07.2026.',
              en: 'The first book: “Why We Sleep” by Matthew Walker. The first session is on 26.12.2025, and the final session is on 05.07.2026.',
            })}
          </p>
        </div>
      </div>

      <h2>{t({ ar: 'كيف نعمل', en: 'How we work' })}</h2>
      <ul>
        <li>{t({ ar: 'نقرأ الكتاب على مراحل، ونلتقي دورياً لمناقشة كلّ جزء.', en: 'We read the book in stages and meet regularly to discuss each part.' })}</li>
        <li>{t({ ar: 'هذا الموقع مرجعٌ شخصي، وشاشة عرضٍ في الجلسات، ومرجعٌ عامّ للنادي.', en: 'This site is a personal reference, a screen to present during sessions, and a public reference for the club.' })}</li>
        <li>{t({ ar: 'كلّ المحتوى ثنائي اللغة (عربي/إنجليزي)، مع أشكالٍ تفاعلية ودراساتٍ على هيئة لعبة.', en: 'All content is bilingual (Arabic/English), with interactive figures and studies presented as a game.' })}</li>
      </ul>

      <h2>{t({ ar: 'الكتاب الحالي', en: 'The current book' })}</h2>
      <p>
        {t({
          ar: '«لماذا ننام» يجادل بأن النوم أقوى وأرخص دواءٍ وقائيّ نملكه. تصفّح أقسام الكتاب من القائمة الجانبية، وجرّب الأشكال التفاعلية وتقييم النوم.',
          en: '“Why We Sleep” argues that sleep is the most powerful and cheapest preventive medicine we have. Browse the book’s sections from the sidebar, and try the interactive figures and the sleep assessment.',
        })}
      </p>
      <p className="muted">
        {t({ ar: 'المحتوى تعليمي مرجعي وليس نصيحة طبية.', en: 'Educational reference content, not medical advice.' })}
      </p>
    </div>
  )
}

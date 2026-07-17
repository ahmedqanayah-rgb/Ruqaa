import { useApp } from '../context/AppContext.jsx'

/*
 * Renders a {ar,en} string with two conveniences:
 *  - **bold** markup -> <strong>
 *  - runs of Latin/German technical terms (incl. parenthetical groups, §refs,
 *    DIN numbers) are wrapped in <bdi> so they never flip inside RTL Arabic.
 */

// Wrap Latin/technical runs in bidi-isolating spans.
function isolate(text, keyBase) {
  // Matches parenthetical groups OR latin word-runs (with §, digits, punctuation).
  const re = /(\([^()]*[A-Za-z§][^()]*\)|[A-Za-z§][A-Za-z0-9§.,'’&\-\/°%\s]*[A-Za-z0-9)]?)/g
  const out = []
  let last = 0
  let m
  let i = 0
  while ((m = re.exec(text)) !== null) {
    // Keep boundary whitespace OUTSIDE the isolate so RTL/LTR spacing stays intact.
    const lead = m[0].match(/^\s*/)[0]
    const trail = m[0].match(/\s*$/)[0]
    const core = m[0].slice(lead.length, m[0].length - trail.length)
    const start = m.index
    if (start > last) out.push(text.slice(last, start))
    if (lead) out.push(lead)
    if (core) {
      out.push(
        <bdi className="term-en" key={`${keyBase}-b${i++}`}>
          {core}
        </bdi>
      )
    }
    if (trail) out.push(trail)
    last = start + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function renderRuns(str, lang) {
  // Split on **bold**
  const parts = str.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2)
      return (
        <strong key={idx}>{lang === 'ar' ? isolate(inner, `s${idx}`) : inner}</strong>
      )
    }
    return (
      <span key={idx}>{lang === 'ar' ? isolate(part, `s${idx}`) : part}</span>
    )
  })
}

export default function RichText({ value, as: Tag = 'span', className }) {
  const { t, lang } = useApp()
  const str = t(value)
  return <Tag className={className}>{renderRuns(str, lang)}</Tag>
}

import { useApp } from '../../context/AppContext.jsx'
import { ui } from '../../data/ui.js'
import RichText from '../RichText.jsx'

/* Shared chrome for every interactive figure: number pill, title, caption. */
export default function FigureFrame({ number, title, interactive = true, caption, children }) {
  const { t } = useApp()
  return (
    <figure className="figure card" style={{ margin: 'var(--space-5) 0', padding: 'var(--space-4)' }}>
      <figcaption style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
        <span className="pill">
          {t(ui.labels.figure)} {number}
        </span>
        {interactive && <span className="pill violet">{t(ui.labels.interactive)}</span>}
        <strong style={{ fontSize: 'var(--fs-md)' }}>{t(title)}</strong>
      </figcaption>
      <div className="figure-body">{children}</div>
      {caption && <RichText as="p" value={caption} />}
    </figure>
  )
}

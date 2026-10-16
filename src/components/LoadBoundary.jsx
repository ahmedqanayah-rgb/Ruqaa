import { Component } from 'react'
import { useApp } from '../context/AppContext.jsx'

const L = (ar, en) => ({ ar, en })

/*
 * WHEN A LAZY PIECE DOES NOT ARRIVE — a book's content, a figure, the focus
 * lab, the search index.
 *
 * The likeliest cause is not the reader's connection but a DEPLOY: Vercel serves
 * only the newest build's files, so a tab opened before a push asks for chunk
 * names that no longer exist. And a "try again" button cannot help: the browser
 * remembers a failed import() for the life of the page — measured in Chrome 152,
 * a second import of the same URL failed without touching the network, after
 * the file had appeared. The one real recovery is a reload, so that is what the
 * button does. The hash route survives it, so the reader lands back where they
 * were (in-memory state — language, ticks — does not, which is the price).
 */
export function LoadFailed({ message, className = '' }) {
  const { t } = useApp()
  return (
    <div className={`load-failed card ${className}`} role="alert">
      <p>{t(message)}</p>
      <button type="button" className="btn" onClick={() => window.location.reload()}>
        {t(L('أعد تحميل الصفحة', 'Reload the page'))}
      </button>
    </div>
  )
}

/* Wraps a `lazy()` component. Without it a chunk that fails to load throws out
   of render with nothing to catch it, and React unmounts the whole app: one
   missing figure blanked the entire site. With it, that one piece says so. */
export default class LoadBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.error('[LoadBoundary]', error)
  }

  render() {
    return this.state.failed ? <LoadFailed message={this.props.message} /> : this.props.children
  }
}

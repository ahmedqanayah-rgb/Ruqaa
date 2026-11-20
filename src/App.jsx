import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import LoadBoundary from './components/LoadBoundary.jsx'
import Home from './pages/Home.jsx'
import Books from './pages/Books.jsx'
import About from './pages/About.jsx'
import BookSection from './pages/BookSection.jsx'

/* The club's dice game — its board, its questions from every book and its own
   stylesheet — is one lazy chunk, fetched when someone opens it. A reader who
   came for a chapter downloads none of it. Wrapped in a LoadBoundary like every
   other lazy piece: a chunk that fails to arrive (usually a deploy, see
   LoadBoundary.jsx) must say so rather than take the app down. */
const Game = lazy(() => import('./pages/Game.jsx'))
const gameRoute = (
  <LoadBoundary message={{ ar: 'تعذّر تحميل اللعبة.', en: 'The game could not be loaded.' }}>
    <Suspense fallback={<div className="figure-loading book-loading" aria-hidden />}>
      <Game />
    </Suspense>
  </LoadBoundary>
)

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={gameRoute} />
        {/* The game's questions without the game (components/game/Practice.jsx):
            the same lazy chunk, which already holds the decks. */}
        <Route path="/game/questions" element={gameRoute} />
        {/* A legacy address from when the sleep assessment was its own page. It
            is an activity of «أنشطة إضافية» now, so the redirect opens that
            heading. Found by scripts/check-component-links.mjs — a redirect
            target is a link no data walk can see, and it had been pointing at a
            deleted section since the collapse. */}
        <Route path="/assessment"
          element={<Navigate to="/book/why-we-sleep/activities?open=assessment" replace />} />
        <Route path="/book/:bookId" element={<BookSection />} />
        <Route path="/book/:bookId/:slug" element={<BookSection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

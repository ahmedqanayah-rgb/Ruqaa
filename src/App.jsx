import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Books from './pages/Books.jsx'
import About from './pages/About.jsx'
import BookSection from './pages/BookSection.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
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

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
        {/* Sleep Assessment now lives inside the book */}
        <Route path="/assessment" element={<Navigate to="/book/why-we-sleep/assessment" replace />} />
        <Route path="/book/:bookId" element={<BookSection />} />
        <Route path="/book/:bookId/:slug" element={<BookSection />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

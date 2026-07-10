import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { ui } from '../data/ui.js'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

export default function Layout({ children }) {
  const { t } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const loc = useLocation()

  // Close mobile drawer + scroll to top on navigation.
  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo({ top: 0 })
  }, [loc.pathname])

  return (
    <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
      <Navbar onMenu={() => setDrawerOpen(true)} />
      <div className="app-body">
        <Sidebar
          open={drawerOpen}
          collapsed={collapsed}
          onClose={() => setDrawerOpen(false)}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
        <main className="app-main">
          <div className="page fade-in" key={loc.pathname}>{children}</div>
          <footer className="site-footer">
            <p>{t(ui.footer.built)}</p>
            <p className="muted">{t(ui.footer.note)}</p>
          </footer>
        </main>
      </div>
    </div>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import SiteAnalytics from './components/Analytics.jsx'
import App from './App.jsx'
import './styles/global.css'
import './styles/components.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AppProvider>
        <App />
        <SiteAnalytics />
      </AppProvider>
    </HashRouter>
  </React.StrictMode>
)

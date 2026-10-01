import {
  StrictMode,
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react'
import { createRoot } from 'react-dom/client'
import './site-loader.css'

const ComputerApp = lazy(() => import('./ComputerEntry.jsx'))
const PortfolioHome = lazy(() => import('./portfolio/PortfolioHome.jsx'))

function SiteLoader({ visible }) {
  return (
    <div
      id="site-loader"
      className={visible ? 'is-visible' : ''}
    >
      <div className="site-loader-spinner" />
    </div>
  )
}

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, '') || '/'
}

function Root() {
  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem('site-transition') === 'true'
  })

  const pathname = normalizePath(window.location.pathname)

  const isComputerRoute =
    pathname === '/computer' ||
    pathname.startsWith('/computer/')

  useEffect(() => {
    const wasTransitioning =
      sessionStorage.getItem('site-transition') === 'true'

    if (!wasTransitioning) return

    sessionStorage.removeItem('site-transition')

    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 400)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <SiteLoader visible={loading} />

      {isComputerRoute ? (
        <ComputerApp />
      ) : (
        <PortfolioHome />
      )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Root />
    </Suspense>
  </StrictMode>,
)
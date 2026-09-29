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

function Root() {
  const [loading, setLoading] = useState(() => {
    return sessionStorage.getItem('site-transition') === 'true'
  })

  const pathname =
    window.location.pathname.replace(/\/+$/, '') || '/'

  useEffect(() => {
    const wasTransitioning =
      sessionStorage.getItem('site-transition') === 'true'

    if (!wasTransitioning) return

    sessionStorage.removeItem('site-transition')

    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SiteLoader visible={loading} />

      {pathname === '/' || pathname === '/new' ? (
        <PortfolioHome />
      ) : pathname === '/computer' ||
        pathname.startsWith('/computer/') ? (
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

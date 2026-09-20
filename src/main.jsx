import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

const ComputerApp = lazy(() => import('./ComputerEntry.jsx'))
const PortfolioHome = lazy(() => import('./portfolio/PortfolioHome.jsx'))

function Root() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  // Temporary route untuk homepage baru
  if (pathname === '/new') {
    return <PortfolioHome />
  }

  // Alias untuk Perdana's Computer
  if (
    pathname === '/computer' ||
    pathname.startsWith('/computer/')
  ) {
    return <ComputerApp />
  }

  // Untuk sekarang homepage utama tetap Perdana's Computer
  return <ComputerApp />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Root />
    </Suspense>
  </StrictMode>,
)
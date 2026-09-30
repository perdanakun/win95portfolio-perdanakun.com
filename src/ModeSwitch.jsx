import { requestSiteMode } from './siteMode.js'
import './ModeSwitch.css'

export default function ModeSwitch() {
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname
      : '/'

  const active =
    pathname === '/computer'
      ? 'computer'
      : 'chat'

  const handleNavigate = (mode) => {
    if (mode === active) return

    requestSiteMode(mode)
  }

  return (
    <nav
      className={`mode-switch mode-switch-${active}`}
      aria-label="Portfolio mode"
    >
      <span
        className="mode-switch-thumb"
        aria-hidden="true"
      />

      <a
        href="/"
        className={`mode-switch-item ${
          active === 'chat' ? 'active' : ''
        }`}
        aria-current={
          active === 'chat' ? 'page' : undefined
        }
        onClick={(event) => {
          event.preventDefault()
          handleNavigate('chat')
        }}
      >
        Chat
      </a>

      <a
        href="/computer"
        className={`mode-switch-item ${
          active === 'computer' ? 'active' : ''
        }`}
        aria-current={
          active === 'computer' ? 'page' : undefined
        }
        onClick={(event) => {
          event.preventDefault()
          handleNavigate('computer')
        }}
      >
        Computer
      </a>
    </nav>
  )
}

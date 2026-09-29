import { requestSiteMode, preloadSiteMode } from './siteMode.js'
import './ModeSwitch.css'

export default function ModeSwitch({ active = 'chat' }) {
  const handleClick = (mode) => {
    if (mode === active) return
    requestSiteMode(mode)
  }

  return (
    <nav
      className={`mode-switch mode-switch-${active}`}
      aria-label="Portfolio mode"
    >
      <span className="mode-switch-thumb" aria-hidden="true" />

      <button
        type="button"
        className={`mode-switch-item ${
          active === 'chat' ? 'active' : ''
        }`}
        aria-current={active === 'chat' ? 'page' : undefined}
        onPointerEnter={() => preloadSiteMode('chat')}
        onFocus={() => preloadSiteMode('chat')}
        onPointerDown={() => preloadSiteMode('chat')}
        onClick={() => handleClick('chat')}
      >
        Chat
      </button>

      <button
        type="button"
        className={`mode-switch-item ${
          active === 'computer' ? 'active' : ''
        }`}
        aria-current={
          active === 'computer' ? 'page' : undefined
        }
        onPointerEnter={() => preloadSiteMode('computer')}
        onFocus={() => preloadSiteMode('computer')}
        onPointerDown={() => preloadSiteMode('computer')}
        onClick={() => handleClick('computer')}
      >
        Computer
      </button>
    </nav>
  )
}

import { showSiteLoader } from './site-loader.js'

let isLoading = false

export function requestSiteMode(mode) {
  if (isLoading) return

  isLoading = true

  const target =
    mode === 'chat'
      ? '/'
      : '/computer'

  if (mode === 'chat') {
    showSiteLoader()

    setTimeout(() => {
      window.location.href = target
    }, 900)

    return
  }

  window.location.href = target
}


export function preloadSiteMode(mode) {
  window.dispatchEvent(
    new CustomEvent('site-mode-intent', {
      detail: { mode },
    }),
  )
}

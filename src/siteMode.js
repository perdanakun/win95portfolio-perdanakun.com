export function requestSiteMode(mode) {
  window.location.href =
    mode === 'chat' ? '/' : '/computer'
}

export function preloadSiteMode(mode) {
  window.dispatchEvent(
    new CustomEvent('site-mode-intent', {
      detail: { mode },
    }),
  )
}

let isLoading = false

export function requestSiteMode(mode) {
  if (isLoading) return

  isLoading = true

  const target =
    mode === 'chat'
      ? '/'
      : '/computer'

  showSiteLoader()

  setTimeout(() => {
    window.location.href = target
  }, 500)
}

export function preloadSiteMode(mode) {
  window.dispatchEvent(
    new CustomEvent('site-mode-intent', {
      detail: { mode },
    }),
  )
}

function showSiteLoader() {
  const loader = document.createElement('div')

  loader.id = 'site-loader'

  loader.innerHTML = `
    <div class="site-loader-content">
      <div class="site-loader-spinner"></div>
    </div>
  `

  document.body.appendChild(loader)

  requestAnimationFrame(() => {
    loader.classList.add('is-visible')
  })
}

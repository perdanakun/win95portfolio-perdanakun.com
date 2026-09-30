let loader = null

export function showSiteLoader() {
  if (loader) return

  loader = document.createElement('div')

  loader.id = 'site-loader'

  loader.innerHTML = `
    <div class="site-loader-content">
      <div class="site-loader-spinner"></div>
    </div>
  `

  document.body.appendChild(loader)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!loader) return

      loader.classList.add('is-visible')
    })
  })
}


export function hideSiteLoader() {
  if (!loader) return

  loader.classList.remove('is-visible')
  loader.classList.add('is-closing')

  const currentLoader = loader


  setTimeout(() => {
    currentLoader.remove()

    if (loader === currentLoader) {
      loader = null
    }
  }, 550)
}

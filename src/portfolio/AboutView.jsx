import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import './AboutView.css'

// The two images have been registered to the same painting / face anchor.
// Keep the pair together: changing one image requires recalibrating these points.
const KEYHOLE = '/about/keyhole-aligned.webp'
const PORTRAIT = '/about/renaissance-portrait.png'
const IMAGE_SIZE = { width: 1672, height: 941 }
const FACE_IN_KEYHOLE = { x: 815, y: 360 }
const FACE_IN_PORTRAIT = { x: 823, y: 357 }
const CAMERA_ZOOM = 2.63

// Text/checkpoints only. Camera constants and easing stay untouched.
const STORY = [
  'Once, there was a kid who loved making things look beautiful.',
  'One small project became thousands of designs, and a decade of learning.',
  'And somewhere along the way, he began wondering what else he could build.',
]
const CHECKPOINTS = [0.24, 0.45, 0.61, 0.86]
const subtitleAlpha = (progress, start, peak, hold, end) =>
  smoothstep(start, peak, progress) * (1 - smoothstep(hold, end, progress))

const EXPERIENCE = [
  { period: '2026 — Present', title: 'TravelXXX', role: 'Product Design Project', description: 'Exploring clearer hotel discovery, comparison, and booking decisions.' },
  { period: '2026 — Present', title: 'Perdana’s Computer', role: 'Product Design & Design Engineering', description: 'Designing and building a live portfolio experiment in React.' },
  { period: '2026 — Present', title: 'Professional Development', role: 'Product Design & Design Engineering', description: 'Learning product thinking, prototyping, and design in code.' },
  { period: '2016 — 2026', title: 'Conania', role: 'Visual Designer & Design Lead', description: 'Visual systems and creative work across 3,000+ projects.' },
  { period: '2019 — 2022', title: 'Sinidikara', role: 'Social Media Designer', description: 'Visual systems and digital content for established brands.' },
  { period: '2015 — 2019', title: 'Early Foundations', role: 'Design & Technical Foundations', description: 'Illustration, design production, and technical work.' },
]

const clamp01 = (value) => Math.min(1, Math.max(0, value))
const smoothstep = (start, end, value) => {
  const t = clamp01((value - start) / (end - start))
  return t * t * (3 - 2 * t)
}

/**
 * Align the same physical face point between both cover-fitted pictures.
 * Using the image coordinates (rather than a generic 50% / 50% origin)
 * also keeps the anchor in place in portrait/mobile viewport crops.
 */
function cameraOrigin(width, height) {
  const cover = Math.max(width / IMAGE_SIZE.width, height / IMAGE_SIZE.height)
  const cropX = (IMAGE_SIZE.width * cover - width) / 2
  const cropY = (IMAGE_SIZE.height * cover - height) / 2
  const key = {
    x: FACE_IN_KEYHOLE.x * cover - cropX,
    y: FACE_IN_KEYHOLE.y * cover - cropY,
  }
  const portrait = {
    x: FACE_IN_PORTRAIT.x * cover - cropX,
    y: FACE_IN_PORTRAIT.y * cover - cropY,
  }
  return {
    x: (portrait.x - CAMERA_ZOOM * key.x) / (1 - CAMERA_ZOOM),
    y: (portrait.y - CAMERA_ZOOM * key.y) / (1 - CAMERA_ZOOM),
  }
}

export default function AboutView() {
  const rootRef = useRef(null)
  const sceneRef = useRef(null)
  const stickyRef = useRef(null)
  const historyRef = useRef(null)
  const scrollRef = useRef(null)
  const progressRef = useRef(0)
  const [chapter, setChapter] = useState(0)

  useLayoutEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    const sticky = stickyRef.current
    // The portfolio has its own scroll container, not window scrolling.
    const scroller = root?.closest('.workspace-scroll')
    if (!root || !scene || !sticky || !scroller) return undefined

    scrollRef.current = scroller
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let lastAnchorWidth = -1
    let lastAnchorHeight = -1

    const render = () => {
      raf = 0
      const viewport = scroller.getBoundingClientRect()
      const bounds = scene.getBoundingClientRect()
      const travel = Math.max(1, scene.offsetHeight - viewport.height)
      const progress = clamp01((viewport.top - bounds.top) / travel)
      const reduced = media.matches
      progressRef.current = progress
      // Only controls the button label/next checkpoint; never drives the camera.
      const nextChapter = progress < 0.14 ? 0 : progress < 0.35 ? 1 : progress < 0.54 ? 2 : progress < 0.73 ? 3 : 4
      setChapter((current) => current === nextChapter ? current : nextChapter)
      const ranges = [
        [0.13, 0.19, 0.30, 0.36],
        [0.36, 0.40, 0.51, 0.55],
        [0.55, 0.58, 0.63, 0.68],
      ]
      ranges.forEach(([start, peak, hold, end], index) => {
        root.style.setProperty(`--about-line-${index + 1}`, (reduced ? 0 : subtitleAlpha(progress, start, peak, hold, end)).toFixed(4))
      })

      if (sticky.clientWidth !== lastAnchorWidth || sticky.clientHeight !== lastAnchorHeight) {
        lastAnchorWidth = sticky.clientWidth
        lastAnchorHeight = sticky.clientHeight
        const origin = cameraOrigin(lastAnchorWidth, lastAnchorHeight)
        root.style.setProperty('--camera-origin-x', `${origin.x.toFixed(2)}px`)
        root.style.setProperty('--camera-origin-y', `${origin.y.toFixed(2)}px`)
      }

      if (reduced) {
        root.classList.add('about-motion-reduced', 'is-portrait-ready')
        root.classList.remove('is-opening-ready')
        return
      }
      root.classList.remove('about-motion-reduced')

      // First, travel through the keyhole.  Hold the portrait long enough
      // to read, then let the normal scroll continue to the timeline.
      const zoom = smoothstep(0.035, 0.53, progress)
      const blend = smoothstep(0.52, 0.64, progress)
      const titleIn = smoothstep(0.64, 0.73, progress)
      const titleOut = smoothstep(0.94, 1, progress)
      const titleOpacity = titleIn * (1 - titleOut)

      root.style.setProperty('--camera-zoom', (1 + (CAMERA_ZOOM - 1) * zoom).toFixed(5))
      root.style.setProperty('--keyhole-opacity', (1 - blend).toFixed(4))
      root.style.setProperty('--portrait-opacity', blend.toFixed(4))
      root.style.setProperty('--opening-cue-opacity', (1 - smoothstep(0.025, 0.19, progress)).toFixed(4))
      root.style.setProperty('--hero-title-opacity', titleOpacity.toFixed(4))
      root.style.setProperty('--portrait-cue-opacity', (
        smoothstep(0.74, 0.82, progress) * (1 - smoothstep(0.91, 0.98, progress))
      ).toFixed(4))

      root.classList.toggle('is-opening-ready', progress < 0.18)
      root.classList.toggle('is-portrait-ready', progress >= 0.76 && progress < 0.97)
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(render)
    }
    // Recalculate camera origin after layout changes / rotation.
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onScroll) : null
    observer?.observe(sticky)
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    media.addEventListener?.('change', onScroll)
    render() // Correctly paint the current frame on direct /about visits.

    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      media.removeEventListener?.('change', onScroll)
      observer?.disconnect()
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const goToProgress = (fraction) => {
    const scroller = scrollRef.current
    const scene = sceneRef.current
    if (!scroller || !scene) return
    const sceneTop = scene.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
    const travel = Math.max(0, scene.offsetHeight - scroller.clientHeight)
    scroller.scrollTo({
      top: sceneTop + travel * fraction,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const goToHistory = () => {
    const scroller = scrollRef.current
    const history = historyRef.current
    if (!scroller || !history) return
    const top = history.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
    scroller.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="cinematic-about is-opening-ready" ref={rootRef}>
      <section className="cinematic-about__scene" ref={sceneRef} aria-label="The portrait entrance">
        <div className="cinematic-about__sticky" ref={stickyRef}>
          {/* Two registered stills. Zoom ONE continuous image to the matching
              camera distance before the small opacity handoff. */}
          <div className="cinematic-about__keyhole" aria-hidden="true">
            <img src={KEYHOLE} alt="" fetchPriority="high" decoding="async" />
          </div>
          <div className="cinematic-about__portrait" aria-hidden="true">
            <img src={PORTRAIT} alt="" fetchPriority="high" decoding="async" />
          </div>
          <div className="cinematic-about__shade" aria-hidden="true" />

          <div className="cinematic-about__film-copy" aria-label="Perdana's story">
            {STORY.map((line, index) => (
              <p key={line} className="cinematic-about__film-subtitle"
                style={{ opacity: `var(--about-line-${index + 1}, 0)` }}>
                {line}
              </p>
            ))}
            <div className="cinematic-about__hero-title">
              <h1>This is <em>Perdana.</em></h1>
            </div>
          </div>
<button
  type="button"
  className="cinematic-about__next-button"
  onClick={() =>
    chapter < CHECKPOINTS.length
      ? goToProgress(CHECKPOINTS[chapter])
      : goToHistory()
  }
  aria-label={
    chapter === 4
      ? 'Explore the history'
      : chapter === 0
      ? 'Begin the story'
      : 'Continue the story'
  }
>
  {chapter === 0 && <span>The Story</span>}
  <ArrowDown size={15} strokeWidth={1.35} aria-hidden="true" />
</button>
        </div>
      </section>

      {/* Intentionally compact, pending a later history redesign. */}
      <section className="cinematic-about__history" id="about-history" ref={historyRef}>
        <header className="cinematic-about__history-heading">
          <p>CHAPTER II — THE HISTORY</p>
          <h2>A Decade in the Making.</h2>
        </header>
        <div className="cinematic-about__timeline">
          {EXPERIENCE.map((item, index) => (
            <article className="cinematic-about__timeline-item" key={`${item.title}-${index}`}>
              <span className="cinematic-about__timeline-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <span className="cinematic-about__period">{item.period}</span>
                <h3>{item.title}</h3>
                <p className="cinematic-about__role">{item.role}</p>
                <p className="cinematic-about__description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="cinematic-about__work-link" href="/">
          Now to The Future <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </section>
    </div>
  )
}
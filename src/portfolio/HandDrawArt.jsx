import { useEffect, useId, useRef, useState } from 'react'
import { HAND_DRAW_PATHS } from './handDrawPaths.js'
import './HandDrawArt.css'

const LIGHT_ART = '/handdraw/portfolio-sketch.webp'
const DARK_ART = '/handdraw/portfolio-sketch-dark.webp'
const INTRO_DURATION_MS = 5100

/** The PNG remains the visible artwork; generated centerline paths reveal it. */
export function HandDrawArt({ dark = false, playing = false, className = '' }) {
  const id = useId().replace(/:/g, '')
  const maskId = `handdraw-mask-${id}`
  const artSrc = dark ? DARK_ART : LIGHT_ART

  return (
    <svg
      className={`handdraw-art ${playing ? 'handdraw-art--playing' : ''} ${className}`}
      viewBox="0 0 1774 887"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Hand-drawn lettering: I'm Perdana, a designer who understands business, design in code and ships it."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask
          id={maskId}
          x="0"
          y="0"
          width="1774"
          height="887"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          {HAND_DRAW_PATHS.map((path, index) => (
            <path
              key={index}
              d={path.d}
              fill="none"
              stroke="#fff"
              strokeWidth={path.w}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              className="handdraw-art__stroke"
              style={{
                '--stroke-delay': `${path.delay}s`,
                '--stroke-duration': `${path.duration}s`,
              }}
            />
          ))}
        </mask>
      </defs>
      <image
        href={artSrc}
        x="0"
        y="0"
        width="1774"
        height="887"
        preserveAspectRatio="xMidYMid meet"
        mask={`url(#${maskId})`}
      />
      {/* Fill the last tiny gaps left by the automatically traced centerlines. */}
      <image
        href={artSrc}
        x="0"
        y="0"
        width="1774"
        height="887"
        className="handdraw-art__finish"
      />
    </svg>
  )
}

/** Runs on direct Home entry only; never starts for /projects or /about. */
export function HandDrawIntro({ onFinish, dark = false }) {
  const [ready, setReady] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const finishRef = useRef(onFinish)
  const illustrationRef = useRef(null)
  const transitionStarted = useRef(false)

  useEffect(() => {
    finishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    let cancelled = false
    const image = new Image()
    const markReady = () => {
      if (!cancelled) setReady(true)
    }
    image.addEventListener('load', markReady)
    image.addEventListener('error', markReady) // avoid a blank, stuck intro
    image.src = dark ? DARK_ART : LIGHT_ART
    if (image.complete) markReady()
    return () => {
      cancelled = true
      image.removeEventListener('load', markReady)
      image.removeEventListener('error', markReady)
    }
  }, [dark])

  useEffect(() => {
    if (!ready) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const moveToHome = async () => {
      if (transitionStarted.current) return
      transitionStarted.current = true
      const source = illustrationRef.current
      const target = document.querySelector('.home-handdraw')
      if (!source || !target || reduceMotion || !source.animate) {
        finishRef.current()
        return
      }
      const from = source.getBoundingClientRect()
      const to = target.getBoundingClientRect()
      if (!to.width || !to.height) {
        finishRef.current()
        return
      }
      const dx = (to.left + to.width / 2) - (from.left + from.width / 2)
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2)
      const sx = to.width / from.width
      const sy = to.height / from.height
      source.style.transformOrigin = 'center center'
      const animation = source.animate([
        { transform: 'translate(0px, 0px) scale(1, 1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, opacity: 1 },
      ], { duration: 850, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' })
      try { await animation.finished } catch { /* cancelled */ }
      finishRef.current()
    }
    const timer = window.setTimeout(moveToHome, INTRO_DURATION_MS - 520)
    return () => window.clearTimeout(timer)
  }, [ready])

  return (
    <div
      className={`handdraw-intro ${dark ? 'handdraw-intro--dark' : ''} ${ready ? 'handdraw-intro--ready' : ''} ${leaving ? 'handdraw-intro--leaving' : ''}`}
      aria-label="Animated portfolio introduction"
    >
      <div ref={illustrationRef} className="handdraw-intro__illustration" aria-hidden="true">
        {ready && <HandDrawArt dark={dark} playing />}
      </div>
      <button type="button" className="handdraw-intro__skip" onClick={onFinish}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  )
}

export const handDrawImages = { light: LIGHT_ART, dark: DARK_ART }

/**
 * Interactive segments preserve the ORIGINAL raster art exactly.
 * No HTML hot-rects: each phrase is a clipped fragment of the real picture.
 * Widen/narrow points if the source sketch changes.
 * Polygon coordinates are in the original 1774 x 887 art space.
 */
const SEGMENTS = [
  {
    id: 'about',
    label: "I'm Perdana",
    href: '/about',
    polygon: '300,25 1245,18 1252,277 310,281',
    focus: [800, 150],
  },
  {
    id: 'business',
    label: 'Understands business',
    prompt: 'How does Perdana understand business, and how has working with clients shaped his product thinking?',
    polygon: '860,242 1454,145 1543,181 1552,255 940,365 860,341',
    focus: [1190, 251],
  },
  {
    id: 'code',
    label: 'Design in Code',
    prompt: 'What does design in code mean to Perdana? Show examples of what he has designed and built with React.',
    polygon: '86,449 810,421 1040,358 1660,259 1681,536 1085,612 796,742 90,749',
    focus: [790, 540],
  },
  {
    id: 'ship',
    label: 'Ships it',
    href: '/projects',
    prompt: 'What has Perdana actually shipped, and how does he turn visual design into working products?',
    polygon: '954,607 1505,526 1654,546 1655,783 976,781',
    focus: [1290, 674],
  },
]

export function InteractiveHandDrawArt({ dark = false, onAsk, onNavigate }) {
  const uid = useId().replace(/:/g, '')
  const [active, setActive] = useState(null)
  const [replay, setReplay] = useState(0)
  const src = dark ? DARK_ART : LIGHT_ART

  const handleSelection = (segment) => {
    if (segment.href) {
      onNavigate?.(segment.href)
    } else if (segment.prompt) {
      onAsk?.(segment.prompt)
    }
  }

  const activate = (id) => {
    setActive(id)
    setReplay((previous) => previous + 1)
  }

  return (
    <div className="home-handdraw" aria-label="Explore Perdana's approach">
      <svg
        className="home-handdraw__canvas"
        viewBox="0 0 1774 887"
        preserveAspectRatio="xMidYMid meet"
        role="group"
        aria-label="Interactive hand-drawn portfolio introduction"
      >
        <defs>
          {SEGMENTS.map(({ id, polygon }) => (
            <clipPath key={id} id={`${uid}-${id}`}>
              <polygon points={polygon} />
            </clipPath>
          ))}
          <filter id={`${uid}-ink`} x="-10%" y="-10%" width="120%" height="120%">
            <feColorMatrix type="saturate" values="1.75" />
          </filter>
        </defs>

        {/* The full unmodified illustration is the permanent visual baseline. */}
        <image href={src} width="1774" height="887" className="home-handdraw__base" />

        {SEGMENTS.map((segment) => {
          const { id, label, polygon } = segment
          return (
          <g
            key={`${id}-${active === id ? replay : 'idle'}`}
            className={`home-handdraw__segment ${active === id ? 'is-active' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${label}`}
            onPointerEnter={() => activate(id)}
            onPointerLeave={() => setActive((value) => value === id ? null : value)}
            onFocus={() => activate(id)}
            onBlur={() => setActive((value) => value === id ? null : value)}
            onClick={() => handleSelection(segment)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleSelection(segment)
              }
            }}
          >
            {/* Same source image, precisely clipped; on hover only this lettering animates. */}
            <g clipPath={`url(#${uid}-${id})`}>
              <image
                href={src}
                width="1774"
                height="887"
                className="home-handdraw__ink"
                filter={`url(#${uid}-ink)`}
              />
              {/* Re-trace original centerlines as a briefly animated crayon shimmer. */}
              <g className="home-handdraw__tracing">
                {HAND_DRAW_PATHS.map((path, index) => (
                  <path
                    key={index}
                    d={path.d}
                    fill="none"
                    stroke={dark ? '#fff' : '#ffad00'}
                    strokeOpacity=".25"
                    strokeWidth={Math.max(2, path.w * 0.55)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                    className="home-handdraw__trace-path"
                    style={{ '--trace-delay': `${Math.min(path.delay * 0.075, 0.24)}s` }}
                  />
                ))}
              </g>
            </g>
            {/* Transparent click target: it does not replace the visible text with a box. */}
            <polygon points={polygon} className="home-handdraw__target" />
            <title>{`Click to explore ${label}`}</title>
          </g>
          )
        })}
      </svg>

    </div>
  )
}
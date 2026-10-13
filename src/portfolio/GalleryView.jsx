import { useEffect, useMemo, useRef, useState } from 'react'
import './GalleryView.css'

const galleryFiles = import.meta.glob(
  '../assets/explore/**/*.{png,jpg,jpeg,webp,gif,mp4,webm}',
  { eager: true, query: '?url', import: 'default' },
)

const works = Object.entries(galleryFiles).map(([path, src]) => {
  const file = path.split('/').pop() || ''
  const folder = path.split('/').at(-2) || 'explore'
  return {
    id: path,
    src,
    label: file.replace(/\.[^.]+$/, '').replace(/^\d+[_-]/, '').replace(/[_-]+/g, ' ').trim() || 'Untitled',
    room: folder === 'explore' ? 'Archive' : folder.replace(/[_-]+/g, ' '),
    isVideo: /\.(mp4|webm)$/i.test(file),
  }
}).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))

// Seamless editorial columns: each column wraps at its OWN height.
// No shared tile-height boundary, so no oversized horizontal gap.
const COLS = 4
const COLUMN_W = 330
const GAP_X = 100
const GAP_Y = 120
const STRIDE = COLUMN_W + GAP_X
const TILE_W = COLS * STRIDE
const FRICTION = 0.92
const CLICK_SLOP = 7
const FEATURED_FILE = '005_koguwa.webm'
const WARP_DURATION = 5200
const LOCK_DURATION = 700
const REVEAL_DURATION = 2200
const pad = (n) => String(n).padStart(2, '0')
const mod = (value, base) => ((value % base) + base) % base

function makeLayout(aspects) {
  const columns = Array.from({ length: COLS }, () => [])
  const heights = Array(COLS).fill(0)
  works.forEach((work, index) => {
    const aspect = Math.max(0.45, Math.min(2.6, aspects[work.id] || 1))
    const width = aspect > 1.35 ? COLUMN_W : aspect < 0.75 ? COLUMN_W * 0.78 : COLUMN_W * 0.91
    const height = width / aspect
    const col = heights.indexOf(Math.min(...heights))
    columns[col].push({ index, y: heights[col], width, height })
    heights[col] += height + GAP_Y
  })
  const periods = heights.map(h => Math.max(1, h))
  const featuredIndex = works.findIndex(work => work.id.toLowerCase().endsWith('/' + FEATURED_FILE.toLowerCase()))
  let focus = null
  columns.forEach((column, col) => column.forEach(slot => {
    if (slot.index === featuredIndex) {
      focus = { x: col * STRIDE + COLUMN_W / 2, y: slot.y + slot.height / 2, col }
    }
  }))
  return { columns, periods, focus }
}

function ArchiveColumn({ column, period, x, onSelect, draggedRef, keyPrefix }) {
  // Three vertical repetitions on each side of the viewport center.
  return Array.from({ length: 7 }, (_, repeat) => (
    <div
      key={`${keyPrefix}-${repeat}`}
      className="archive-tile"
      data-period={period}
      data-base={repeat - 3}
      style={{ left: x, top: 0, width: COLUMN_W, height: period }}
    >
      {column.map(slot => {
        const work = works[slot.index]
        return (
          <button
            key={work.id}
            type="button"
            className="archive-artwork"
            style={{ left: (COLUMN_W - slot.width) / 2, top: slot.y, width: slot.width, height: slot.height }}
            onClick={() => { if (!draggedRef.current) onSelect(slot.index) }}
            aria-label={`View ${work.label}`}
          >
            <span className="archive-artwork-media">
              {work.isVideo ? (
                <video src={work.src} muted loop playsInline preload="none" />
              ) : (
                <img src={work.src} alt="" loading="lazy" decoding="async" draggable="false" />
              )}
            </span>
            <span className="archive-artwork-meta"><span>{pad(slot.index + 1)} / {work.room}</span><strong>{work.label}</strong></span>
          </button>
        )
      })}
    </div>
  ))
}

export default function GalleryView() {
  const [phase, setPhase] = useState('warp')
  const [activeIndex, setActiveIndex] = useState(null)
  const [aspects, setAspects] = useState({})
  const layout = useMemo(() => makeLayout(aspects), [aspects])
  const focusRef = useRef(layout.focus)
  focusRef.current = layout.focus
  const [ready, setReady] = useState(false)
  const [lockStarted, setLockStarted] = useState(false)
  const [featuredMediaReady, setFeaturedMediaReady] = useState(false)
  const featured = works.find(work => work.id.toLowerCase().endsWith('/' + FEATURED_FILE.toLowerCase()))
  const featuredSlot = layout.columns.flatMap((column) => column).find(slot => works[slot.index]?.id === featured?.id)
  const focalWidth = featuredSlot?.width || COLUMN_W
  const focalHeight = featuredSlot?.height || COLUMN_W * 0.7

  useEffect(() => {
    let cancelled = false
    const discovered = {}
    Promise.all(works.map((work) => new Promise((resolve) => {
      if (work.isVideo) {
        const video = document.createElement('video')
        video.preload = 'metadata'
        video.onloadedmetadata = () => { discovered[work.id] = video.videoWidth / video.videoHeight || 1; resolve() }
        video.onerror = () => resolve()
        video.src = work.src
      } else {
        const img = new Image()
        img.onload = () => { discovered[work.id] = img.naturalWidth / img.naturalHeight || 1; resolve() }
        img.onerror = () => resolve()
        img.src = work.src
      }
    }))).then(() => { if (!cancelled) { setAspects(discovered); setReady(true) } })
    return () => { cancelled = true }
  }, [])

  const stageRef = useRef(null)
  const layerRef = useRef(null)
  const timerRef = useRef(null)
  const draggedRef = useRef(false)
  const view = useRef({ x: 0, y: 0, vx: 0, vy: 0, raf: 0, dragging: false, px: 0, py: 0, lastT: 0, distance: 0 })

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (phase !== 'room' && phase !== 'reveal' && phase !== 'lock') return undefined
    const stage = stageRef.current
    const v = view.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const apply = () => {
      if (!layerRef.current) return
      // Always keep the central tile centered around the camera, without clamping.
      const x = mod(v.x + TILE_W / 2, TILE_W) - TILE_W / 2
      layerRef.current.style.transform = `translate3d(calc(-50% + ${x}px), -50%, 0)`
      layerRef.current.querySelectorAll('[data-period]').forEach(node => {
        const period = Number(node.dataset.period)
        const base = Number(node.dataset.base)
        const y = mod(v.y + period / 2, period)
        node.style.transform = `translate3d(0, ${y - period / 2 + base * period}px, 0)`
      })
    }
    const stop = () => { cancelAnimationFrame(v.raf); v.raf = 0 }
    const glide = () => {
      v.x += v.vx
      v.y += v.vy
      v.vx *= FRICTION
      v.vy *= FRICTION
      apply()
      if (Math.abs(v.vx) + Math.abs(v.vy) > 0.2) v.raf = requestAnimationFrame(glide)
      else v.raf = 0
    }
    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      if (e.target.closest('.archive-inspector')) return
      stop()
      v.dragging = true
      v.px = e.clientX
      v.py = e.clientY
      v.lastT = performance.now()
      v.distance = 0
      v.vx = v.vy = 0
      draggedRef.current = false
      stage.classList.add('is-dragging')
      // Do not capture on pointerdown: doing so retargets a normal click to the stage.
    }
    const move = (e) => {
      if (!v.dragging) return
      const dx = e.clientX - v.px
      const dy = e.clientY - v.py
      const now = performance.now()
      const frame = Math.max(1, (now - v.lastT) / 16.7)
      v.distance += Math.abs(dx) + Math.abs(dy)
      if (v.distance > CLICK_SLOP && !draggedRef.current) {
        draggedRef.current = true
        stage.setPointerCapture?.(e.pointerId)
      }
      v.vx = dx / frame
      v.vy = dy / frame
      v.x += dx
      v.y += dy
      v.px = e.clientX
      v.py = e.clientY
      v.lastT = now
      apply()
    }
    const up = (e) => {
      if (!v.dragging) return
      v.dragging = false
      stage.classList.remove('is-dragging')
      if (stage.hasPointerCapture?.(e.pointerId)) stage.releasePointerCapture(e.pointerId)
      if (performance.now() - v.lastT > 80) v.vx = v.vy = 0
      if (!reduced && Math.abs(v.vx) + Math.abs(v.vy) > 0.3) v.raf = requestAnimationFrame(glide)
      // Only a genuine drag suppresses artwork clicks. Reset after click dispatch.
      window.setTimeout(() => { draggedRef.current = false }, 0)
    }
    const key = (e) => {
      if (e.key === 'Escape') { setActiveIndex(null); return }
      if (e.target.closest('button, input, textarea')) return
      const moves = { ArrowLeft: [110, 0], ArrowRight: [-110, 0], ArrowUp: [0, 110], ArrowDown: [0, -110] }
      if (!moves[e.key]) return
      e.preventDefault()
      stop()
      v.x += moves[e.key][0]
      v.y += moves[e.key][1]
      apply()
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (document.hidden || !isIntersecting) target.pause()
        else target.play().catch(() => {})
      })
    }, { root: stage, rootMargin: '100px' })
    const videos = stage.querySelectorAll('.archive-tile video')
    videos.forEach((video) => observer.observe(video))
    const visibility = () => { if (document.hidden) videos.forEach((video) => video.pause()) }
    document.addEventListener('visibilitychange', visibility)
    // The chosen artwork starts at the visual center of the viewport.
    if (layout.focus && phase !== 'room') {
      v.x = -layout.focus.x
      v.y = -layout.focus.y
    }
    apply()
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', up)
    window.addEventListener('keydown', key)
    return () => {
      stop()
      observer.disconnect()
      videos.forEach((video) => video.pause())
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', up)
      stage.removeEventListener('pointercancel', up)
      window.removeEventListener('keydown', key)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [phase, ready, layout.focus?.x, layout.focus?.y])

  // Keep the world mounted throughout the transition. The focus position is
  // initialized before the overlay is allowed to reveal the underlying gallery.
  useEffect(() => {
    if (phase !== 'warp') return undefined
    setLockStarted(false)
    setFeaturedMediaReady(false)
    const timer = window.setTimeout(() => setPhase('lock'), WARP_DURATION)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'lock' || !ready || !featuredMediaReady) return undefined
    // Give React and the gallery transform two animation frames to settle.
    let raf1 = 0
    let raf2 = 0
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setLockStarted(true))
    })
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
  }, [phase, ready, featuredMediaReady])

  useEffect(() => {
    if (phase !== 'lock' || !lockStarted) return undefined
    const timer = window.setTimeout(() => setPhase('reveal'), LOCK_DURATION)
    return () => window.clearTimeout(timer)
  }, [phase, lockStarted])

  useEffect(() => {
    if (phase !== 'reveal') return undefined
    const timer = window.setTimeout(() => setPhase('room'), REVEAL_DURATION)
    return () => window.clearTimeout(timer)
  }, [phase])

  const warpWorks = useMemo(() => {
    const stills = works.filter(work => !work.isVideo)
    const source = stills.length ? stills : works
    return Array.from({ length: Math.min(26, Math.max(12, source.length * 2)) }, (_, index) => {
      const work = source.length ? source[(index * 7 + Math.floor(index / 4)) % source.length] : null
      if (!work) return null
      const angle = index * 2.39996
      const radius = 16 + Math.sqrt((index + 1) / 26) * 48
      return {
        ...work,
        key: `${work.id}-${index}`,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * .65,
        depth: index % 6,
        delay: -(index % 7) * .52,
        size: 42 + (index * 19) % 54,
      }
    }).filter(Boolean)
  }, [])

  // The reveal pieces are positioned from the EXACT same repeated-column
  // coordinates as the live infinite gallery, so their final frame lines up.
  const revealPieces = useMemo(() => {
    if (!layout.focus) return []
    const output = []
    const focus = layout.focus
    for (let col = 0; col < COLS; col += 1) {
      const period = layout.periods[col]
      const yWrapped = mod(-focus.y + period / 2, period) - period / 2
      for (const slot of layout.columns[col]) {
        if (works[slot.index]?.id === featured?.id) continue
        const xBase = col * STRIDE + COLUMN_W / 2 - focus.x
        for (let horizontal = -1; horizontal <= 1; horizontal += 1) {
          for (let repeat = -2; repeat <= 2; repeat += 1) {
            const x = xBase + horizontal * TILE_W
            const y = yWrapped + repeat * period + slot.y + slot.height / 2
            if (Math.abs(x) > 1250 || Math.abs(y) > 950) continue
            const seed = slot.index * 19 + col * 7 + horizontal * 31 + repeat * 13
            output.push({
              id: `${col}-${slot.index}-${horizontal}-${repeat}`,
              work: works[slot.index], width: slot.width, height: slot.height,
              x, y,
              // Random-looking but deterministic: stable across rerenders.
              scatterX: Math.sin(seed * 2.37) * 260,
              scatterY: Math.cos(seed * 1.73) * 220,
              rotate: Math.sin(seed * 0.79) * 13,
              delay: Math.abs(seed % 7) * 55,
            })
          }
        }
      }
    }
    return output
  }, [layout, featured?.id])

  const active = activeIndex === null ? null : works[activeIndex]

  return (
    <section className={`gallery-museum is-${phase}`} aria-label="Infinite draggable visual archive">
      <div className="museum-stage" ref={stageRef}>
        <div className="archive-world" ref={layerRef}>
          {Array.from({ length: 5 }, (_, horizontal) =>
            layout.columns.map((column, col) => {
              const period = layout.periods[col]
              return (
                <ArchiveColumn
                  key={`${horizontal}-${col}`}
                  keyPrefix={`${horizontal}-${col}`}
                  column={column}
                  period={period}
                  x={(horizontal - 2) * TILE_W + col * STRIDE}
                  onSelect={setActiveIndex}
                  draggedRef={draggedRef}
                />
              )
            })
          )}
        </div>
      </div>
      <header className="museum-hud">
      </header>
      {(phase === 'warp' || phase === 'lock' || phase === 'reveal') && (
        <div className={`gallery-timewarp is-${phase}${lockStarted ? ' is-locked' : ''}`} role="status" aria-label="Travelling into the visual archive">
          <div className="timewarp-perspective" aria-hidden="true">
            {warpWorks.map((work, i) => (
              <div
                key={work.key}
                className="timewarp-art"
                style={{
                  '--wx': `${work.x}vw`, '--wy': `${work.y}vh`,
                  '--wsize': `${work.size}px`, '--wdelay': `${work.delay}s`,
                  '--wrotate': `${(i % 5 - 2) * 2}deg`,
                }}
              >
                {work.isVideo ? <video src={work.src} muted playsInline preload="metadata" /> : <img src={work.src} alt="" draggable="false" />}
              </div>
            ))}
          </div>
          {featured && (
            <div
              className="timewarp-focus"
              style={{ '--focus-w': `${focalWidth}px`, '--focus-h': `${focalHeight}px` }}
              aria-hidden="true"
            >
              {featured.isVideo ? (
                <video src={featured.src} muted loop playsInline autoPlay preload="auto" onLoadedData={() => setFeaturedMediaReady(true)} onError={() => setFeaturedMediaReady(true)} />
              ) : (
                <img src={featured.src} alt="" draggable="false" onLoad={() => setFeaturedMediaReady(true)} onError={() => setFeaturedMediaReady(true)} />
              )}
            </div>
          )}
          {(phase === 'lock' || phase === 'reveal') && (
            <div className="timewarp-assemble" aria-hidden="true">
              {revealPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="timewarp-assemble-piece"
                  style={{
                    '--target-x': `${piece.x}px`,
                    '--target-y': `${piece.y}px`,
                    '--scatter-x': `${piece.scatterX}px`,
                    '--scatter-y': `${piece.scatterY}px`,
                    '--scatter-rotate': `${piece.rotate}deg`,
                    '--piece-delay': `${piece.delay}ms`,
                    width: piece.width, height: piece.height,
                  }}
                >
                  {piece.work.isVideo ? (
                    <video src={piece.work.src} muted playsInline preload="metadata" />
                  ) : (
                    <img src={piece.work.src} alt="" loading="eager" decoding="async" draggable="false" />
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="timewarp-title">
            <h1>Explore the collection</h1>
          </div>
        </div>
      )}
      {!works.length && <div className="archive-empty">No gallery assets found in <code>src/assets/explore</code>.</div>}
      {active && (
        <div className="archive-inspector-backdrop" onPointerDown={(e) => e.stopPropagation()} onClick={() => setActiveIndex(null)}>
          <div className="archive-inspector" role="dialog" aria-modal="true" aria-label={active.label} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="archive-inspector-close" onClick={() => setActiveIndex(null)}>Close ×</button>
            {active.isVideo ? <video src={active.src} controls autoPlay playsInline /> : <img src={active.src} alt={active.label} />}
            <div className="archive-inspector-caption"><span>{active.room} · {pad(activeIndex + 1)} / {pad(works.length)}</span><h2>{active.label}</h2></div>
          </div>
        </div>
      )}
    </section>
  )
}
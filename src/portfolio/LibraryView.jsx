import { cloneElement, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from 'lucide-react'
import './LibraryView.css'

const BOOK_STYLES = [
  // Optional: add cover: '/covers/my-cover.webp' to any book below.
  { color: '#CB8798', ink: '#341E27', spine: 'THE END OF THE AVERAGE FREELANCER', short: 'GETTING KILLED BY AI', category: 'DESIGN / AI', number: '01', height: 280, width: 63 },
  { color: '#D9AC65', ink: '#2E231A', spine: 'WHAT DOES ENTRY LEVEL MEAN?', short: 'ENTRY LEVEL', category: 'CAREER / DESIGN', number: '02', height: 254, width: 53 },
  { color: '#506C75', ink: '#F9EEE0', spine: 'LEARNING HOW TO BUILD THINGS', short: 'LEARNING TO BUILD', category: 'DESIGN / CODE', number: '03', height: 293, width: 72 },
]

// Extra books give the shelf a curated-library feel; they are deliberately
// non-interactive, so visitors cannot mistake them for published articles.
const FILLER_BOOKS = [
  { height: 243, width: 42, label: 'ARCHIVE', rotate: 0 },
  { height: 266, width: 40, label: 'DESIGN NOTES', rotate: 3 },
  { height: 231, width: 37, label: 'VOL. 01', rotate: 0 },
  { height: 272, width: 46, label: 'OBSERVATIONS', rotate: 0 },
  { height: 248, width: 48, label: 'FIELD WORK', rotate: -3 },
  { height: 272, width: 33, label: 'INDEX', rotate: 0 },
  { height: 236, width: 43, label: 'COLLECTED', rotate: 0 },
]

function parsePublisher(meta = '') {
  return meta.split('·').at(-1)?.trim() || 'External article'
}

function Book({ article, index, onOpen, active, onActivate }) {
  const style = BOOK_STYLES[index % BOOK_STYLES.length]
  return (
    <button
      type="button"
      className={`library-book library-book--available${active ? ' is-mobile-active' : ''}`}
      style={{ '--book-color': style.color, '--book-ink': style.ink, '--book-height': `${style.height}px`, '--book-width': `${style.width}px`, '--book-index': index }}
      onClick={(event) => {
        if (window.matchMedia('(max-width: 760px)').matches) {
          onActivate(index, event.currentTarget)
          return
        }
        const cover = event.currentTarget.querySelector('.library-book__front-preview')
        const rect = cover?.getBoundingClientRect()
        onOpen(index, rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null)
      }}
      aria-label={`Open book: ${article.title}`}
      aria-pressed={active}
    >
      <span className="library-book__rotator">
        <span className="library-book__top" aria-hidden="true" />
        <span className="library-book__spine">
          <span className="library-book__mark">P / {style.number}</span>
          <span className="library-book__name">{style.spine}</span>
          <span className="library-book__year">2026</span>
        </span>
        <span className="library-book__front-preview" aria-hidden="true">
          {style.cover ? (
            <img className="library-book__cover-image" src={style.cover} alt="" draggable="false" />
          ) : (
            <>
              <span className="library-book__front-kicker">PERDANA / WRITINGS — {style.number}</span>
              <span className="library-book__front-title">{style.short}</span>
              <span className="library-book__front-bottom">{style.category} · 2026</span>
            </>
          )}
        </span>
        <span className="library-book__page-edge" aria-hidden="true" />
        <span className="library-book__page-top" aria-hidden="true" />
        <span className="library-book__page-bottom" aria-hidden="true" />
      </span>
    </button>
  )
}

function DecorativeBook({ book, index }) {
  return (
    <span
      className="library-book library-book--decorative"
      style={{ '--book-color': 'var(--lib-inactive-book)', '--book-ink': 'var(--lib-inactive-ink)', '--book-height': `${book.height}px`, '--book-width': `${book.width}px`, '--book-rotate': `${book.rotate}deg`, '--tilt-clearance': book.rotate ? `${Math.ceil(book.height * Math.sin(Math.abs(book.rotate) * Math.PI / 180)) + 2}px` : '0px' }}
      aria-hidden="true"
    >
      <span className="library-book__spine" />
    </span>
  )
}

const EXCERPTS = [
  'A reflection on how AI is changing freelance design work, and what it means to find new value as a creative professional.',
  'On entering a new discipline after years of experience, and what the idea of “entry level” really means during a career transition.',
  'After a decade spent learning to design things, a new curiosity begins: understanding how to build and ship them.',
]

function CoverArtwork({ style, index }) {
  return style.cover ? (
    <img className="library-reader__cover-image" src={style.cover} alt="" draggable="false" />
  ) : (
    <div className="library-reader__cover-typography">
      <span>PERDANA / WRITINGS — {style.number}</span>
      <strong>{style.short}</strong>
      <span>{style.category} · 2026</span>
    </div>
  )
}

function BookPreview({ article, index, origin, count, onClose, onSelect }) {
  const [stage, setStage] = useState('start')
  const closeRef = useRef(null)
  const readingRef = useRef(null)
  const style = BOOK_STYLES[index % BOOK_STYLES.length]
  const publisher = parsePublisher(article.meta)
  const isMobile = window.innerWidth <= 760
  const paperWidth = isMobile ? Math.min(window.innerWidth - 28, 480) : Math.min(620, Math.max(150, (window.innerWidth - 32) / 2))
  const paperHeight = isMobile ? Math.max(240, window.innerHeight - 116) : Math.min(paperWidth / .68, window.innerHeight - 112)
  const actualWidth = isMobile ? paperWidth : paperHeight * .68
  const targetCenterX = window.innerWidth / 2 + (isMobile ? 0 : actualWidth / 2)
  const targetCenterY = window.innerHeight / 2
  const sourceCenterX = origin ? origin.x + origin.width / 2 : targetCenterX
  const sourceCenterY = origin ? origin.y + origin.height / 2 : targetCenterY
  const dx = sourceCenterX - targetCenterX
  const dy = sourceCenterY - targetCenterY
  const scaleX = origin?.width ? Math.max(.01, origin.width / actualWidth) : 1
  const scaleY = origin?.height ? Math.max(.01, origin.height / paperHeight) : 1

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    readingRef.current?.scrollTo(0, 0)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame1 = 0
    let frame2 = 0
    const timers = []
    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        setStage('zoom')
        timers.push(window.setTimeout(() => setStage('open'), reduced ? 30 : 620))
      })
    })
    const handleKeydown = (event) => {
      if (event.target instanceof HTMLElement && event.target.closest('a, button, input, textarea')) {
        if (event.key !== 'Escape') return
      }
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onSelect((index + 1) % count, null)
      if (event.key === 'ArrowLeft') onSelect((index - 1 + count) % count, null)
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
      timers.forEach(clearTimeout)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [index, count, onClose, onSelect])

  return createPortal(
    <div className={`library-reader library-reader--${stage}`} role="presentation">
      <div className="library-reader__scrim" onClick={onClose} />
      <div className="library-reader__ui" role="dialog" aria-modal="true" aria-labelledby="library-reader-title">
        <div className="library-reader__toolbar">
          <span />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close book"><X size={20} /></button>
        </div>
        <div className="library-reader__stage" style={{
          '--paper-w': `${actualWidth}px`, '--paper-h': `${paperHeight}px`,
          '--start-x': `${dx}px`, '--start-y': `${dy}px`,
          '--start-sx': scaleX, '--start-sy': scaleY,
          '--book-color': style.color, '--book-ink': style.ink,
        }}>
          <div className="library-reader__spread">
            <article className="library-reader__page">
              <h2 id="library-reader-title">{article.title}</h2>
              <div className="library-reader__article-content" ref={readingRef} tabIndex={0} aria-label="Article content">
                <p className="library-reader__content-note">Full article text hasn't been added to this library yet. You can read the original publication below.</p>
              </div>
              <div className="library-reader__page-footer">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read on {publisher} <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
            <div className="library-reader__turning-cover" aria-hidden="true">
              <div className="library-reader__front"><CoverArtwork style={style} index={index} /></div>
              <div className="library-reader__inside-cover" />
            </div>
          </div>
        </div>
        <div className="library-reader__navigation">
          <button type="button" onClick={() => onSelect((index - 1 + count) % count, null)}><ArrowLeft size={15} /> Previous</button>
          <button type="button" onClick={() => onSelect((index + 1) % count, null)}>Next <ArrowRight size={15} /></button>
        </div>
      </div>
    </div>, document.body
  )
}

export default function LibraryView({ writings = [], insight }) {
  const [selected, setSelected] = useState(null)
  const [activeMobile, setActiveMobile] = useState(null)
  const openTimerRef = useRef(null)
  const openingRef = useRef(false)

  useEffect(() => () => window.clearTimeout(openTimerRef.current), [])

  const cancelPendingOpen = useCallback(() => {
    window.clearTimeout(openTimerRef.current)
    openTimerRef.current = null
    openingRef.current = false
    setActiveMobile(null)
  }, [])

  const close = useCallback(() => setSelected(null), [])
  const choose = useCallback((index, rect = null) => {
    window.clearTimeout(openTimerRef.current)
    openTimerRef.current = null
    openingRef.current = false
    setActiveMobile(null)
    setSelected({ index, rect })
  }, [])

  // One mobile tap: rotate the spine into the cover, then open the reader.
  const activate = useCallback((index, bookElement) => {
    if (openingRef.current) return
    openingRef.current = true
    setActiveMobile(index)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    openTimerRef.current = window.setTimeout(() => {
      const cover = bookElement?.querySelector('.library-book__front-preview')
      const rect = cover?.getBoundingClientRect()
      choose(index, rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : null)
    }, reducedMotion ? 0 : 900)
  }, [choose])
  const articles = writings.slice(0, 3)
  const upperBooks = [
    <DecorativeBook key="d0" book={FILLER_BOOKS[0]} index={0} />,
    articles[0] && <Book key="a0" article={articles[0]} index={0} onOpen={choose} />,
    <DecorativeBook key="d1" book={FILLER_BOOKS[1]} index={1} />,
    <DecorativeBook key="d2" book={FILLER_BOOKS[2]} index={2} />,
    articles[1] && <Book key="a1" article={articles[1]} index={1} onOpen={choose} />,
    <DecorativeBook key="d3" book={FILLER_BOOKS[3]} index={3} />,
    articles[2] && <Book key="a2" article={articles[2]} index={2} onOpen={choose} />,
    <DecorativeBook key="d4" book={FILLER_BOOKS[4]} index={4} />,
  ].filter(Boolean)

  return (
    <section className={`library-view${selected !== null ? ' is-reading' : ''}`} aria-label="The Personal Library">
      <div className="library-view__inner">
        <div className="library-shelf" aria-label="Bookshelf containing three available essays">
          <header className="library-shelf__heading"><h1>Collected writings.</h1></header>
          <div className="library-shelf__scene" onClick={(event) => { if (!event.target.closest('.library-book--available')) cancelPendingOpen() }}>
            <div className="library-shelf__books-viewport"><div className="library-shelf__books">{upperBooks.map((book) => book && book.key?.startsWith('a') ? cloneElement(book, { active: activeMobile === book.props.index, onActivate: activate }) : book)}</div></div>
            <div className="library-shelf__plank" aria-hidden="true" />
            <div className="library-shelf__shadow" aria-hidden="true" />
          </div>
        </div>
      </div>
      {selected !== null && articles[selected.index] && (
        <BookPreview key={selected.index} article={articles[selected.index]} index={selected.index} origin={selected.rect} count={articles.length} onClose={close} onSelect={choose} />
      )}
    </section>
  )
}
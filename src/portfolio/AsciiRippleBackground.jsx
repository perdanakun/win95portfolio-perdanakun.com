import { useCallback, useEffect, useRef } from 'react'

const ASCII_CHARS = ' .,:;|!ilIwWMB#@'
const CELL_WIDTH = 7
const CELL_HEIGHT = 12
const DEFAULT_IMAGE = '/effects/ascii-gradient.png'

const WATER_PARAMS = {
  waveSpeed: 0.4,
  damping: 0.94,
  rippleStrength: 0.15,
  clickStrength: 20,
  refraction: 1.5,
  surfaceTension: 0.92,
  hoverRadius: 3,
  clickRadius: 5,
}

function isInsideRect(clientX, clientY, rect) {
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  )
}

export default function AsciiRippleBackground({
  dark = false,
  imageSrc = DEFAULT_IMAGE,
}) {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const gridRef = useRef([])
  const colsRef = useRef(0)
  const rowsRef = useRef(0)
  const waveCurrentRef = useRef(new Float32Array(0))
  const velocityRef = useRef(new Float32Array(0))
  const pointerRef = useRef({
    x: -1,
    y: -1,
    prevX: -1,
    prevY: -1,
  })
  const pointerDownRef = useRef(false)
  const frameRef = useRef(0)
  const resizeTimerRef = useRef(null)
  const rippleTimersRef = useRef([])
  const darkRef = useRef(dark)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    darkRef.current = dark
  }, [dark])

  const initializeGrid = useCallback(() => {
    const canvas = canvasRef.current
    const image = imageRef.current

    if (!canvas || !image) return

    const container = canvas.parentElement
    if (!container) return

    const width = Math.max(1, container.clientWidth)
    const height = Math.max(1, container.clientHeight)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const cols = Math.max(1, Math.floor(width / CELL_WIDTH))
    const rows = Math.max(1, Math.floor(height / CELL_HEIGHT))

    colsRef.current = cols
    rowsRef.current = rows

    const totalCells = cols * rows
    waveCurrentRef.current = new Float32Array(totalCells)
    velocityRef.current = new Float32Array(totalCells)

    const offscreen = document.createElement('canvas')
    offscreen.width = cols
    offscreen.height = rows

    const offCtx = offscreen.getContext('2d', {
      willReadFrequently: true,
    })

    if (!offCtx) return

    const imageAspect = image.width / image.height
    const gridAspect = cols / rows

    let sx = 0
    let sy = 0
    let sw = image.width
    let sh = image.height

    if (imageAspect > gridAspect) {
      sw = image.height * gridAspect
      sx = (image.width - sw) / 2
    } else {
      sh = image.width / gridAspect
      sy = (image.height - sh) / 2
    }

    offCtx.drawImage(
      image,
      sx,
      sy,
      sw,
      sh,
      0,
      0,
      cols,
      rows,
    )

    const pixels = offCtx.getImageData(0, 0, cols, rows).data
    const grid = []

    for (let row = 0; row < rows; row += 1) {
      const rowCells = []

      for (let col = 0; col < cols; col += 1) {
        const pixelIndex = (row * cols + col) * 4
        const r = pixels[pixelIndex]
        const g = pixels[pixelIndex + 1]
        const b = pixels[pixelIndex + 2]
        const a = pixels[pixelIndex + 3]

        const brightness =
          ((r * 0.299 + g * 0.587 + b * 0.114) / 255) *
          (a / 255)

        const charIndex = Math.floor(
          brightness * (ASCII_CHARS.length - 1),
        )

        rowCells.push({
          char: ASCII_CHARS[charIndex],
          brightness,
          r,
          g,
          b,
        })
      }

      grid.push(rowCells)
    }

    gridRef.current = grid
  }, [])

  const addRipple = useCallback(
    (col, row, strength, radius, ringMode = false) => {
      const cols = colsRef.current
      const rows = rowsRef.current
      const current = waveCurrentRef.current

      if (!cols || !rows || !current.length) return

      for (let dy = -radius; dy <= radius; dy += 1) {
        for (let dx = -radius; dx <= radius; dx += 1) {
          const targetCol = col + dx
          const targetRow = row + dy

          if (
            targetCol < 0 ||
            targetCol >= cols ||
            targetRow < 0 ||
            targetRow >= rows
          ) {
            continue
          }

          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance > radius) continue

          const index = targetRow * cols + targetCol

          if (ringMode) {
            const normalizedDistance = distance / radius
            const ring =
              Math.sin(normalizedDistance * Math.PI) *
              Math.exp(-normalizedDistance * 0.5)

            current[index] += strength * ring
          } else {
            const sigma = radius * 0.4
            const gaussian = Math.exp(
              -(distance * distance) / (2 * sigma * sigma),
            )

            current[index] += strength * gaussian
          }
        }
      }
    },
    [],
  )

  const propagateWaves = useCallback(() => {
    const cols = colsRef.current
    const rows = rowsRef.current
    const current = waveCurrentRef.current
    const velocity = velocityRef.current

    if (!cols || !rows || !current.length) return

    const next = new Float32Array(current.length)
    const threshold = 0.001

    for (let row = 1; row < rows - 1; row += 1) {
      for (let col = 1; col < cols - 1; col += 1) {
        const index = row * cols + col

        const laplacian =
          current[index - 1] +
          current[index + 1] +
          current[index - cols] +
          current[index + cols] -
          4 * current[index]

        const acceleration = laplacian * WATER_PARAMS.waveSpeed
        let velocityValue =
          (velocity[index] + acceleration) * WATER_PARAMS.damping
        let displacement = current[index] + velocityValue

        if (Math.abs(displacement) > 25) {
          displacement *= WATER_PARAMS.surfaceTension
          velocityValue *= WATER_PARAMS.surfaceTension * 0.9
        }

        if (
          Math.abs(velocityValue) < threshold &&
          Math.abs(displacement) < threshold
        ) {
          velocityValue = 0
          displacement = 0
        }

        velocity[index] = velocityValue
        next[index] = displacement
      }
    }

    const edgeDamping = 0.3

    for (let col = 0; col < cols; col += 1) {
      next[col] *= edgeDamping
      velocity[col] *= edgeDamping

      const bottomIndex = (rows - 1) * cols + col
      next[bottomIndex] *= edgeDamping
      velocity[bottomIndex] *= edgeDamping
    }

    for (let row = 0; row < rows; row += 1) {
      const leftIndex = row * cols
      const rightIndex = row * cols + cols - 1

      next[leftIndex] *= edgeDamping
      velocity[leftIndex] *= edgeDamping
      next[rightIndex] *= edgeDamping
      velocity[rightIndex] *= edgeDamping
    }

    waveCurrentRef.current = next
  }, [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || gridRef.current.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cols = colsRef.current
    const rows = rowsRef.current
    const grid = gridRef.current
    const current = waveCurrentRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${10 * dpr}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`
    ctx.textBaseline = 'middle'

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const cell = grid[row]?.[col]
        if (!cell) continue

        const index = row * cols + col
        const wave = current[index]

        if (
          Math.abs(wave) < 0.01 &&
          cell.brightness < 0.02 &&
          cell.char === ' '
        ) {
          continue
        }

        let gradientX = 0
        let gradientY = 0

        if (col > 0 && col < cols - 1) {
          gradientX = current[index + 1] - current[index - 1]
        }

        if (row > 0 && row < rows - 1) {
          gradientY = current[index + cols] - current[index - cols]
        }

        const sourceCol = Math.round(
          col - gradientX * WATER_PARAMS.refraction,
        )
        const sourceRow = Math.round(
          row - gradientY * WATER_PARAMS.refraction,
        )

        let displayCell = cell

        if (
          sourceCol >= 0 &&
          sourceCol < cols &&
          sourceRow >= 0 &&
          sourceRow < rows &&
          grid[sourceRow]?.[sourceCol]
        ) {
          displayCell = grid[sourceRow][sourceCol]
        }

        let caustic = 0

        if (
          col > 0 &&
          col < cols - 1 &&
          row > 0 &&
          row < rows - 1
        ) {
          const laplacian =
            current[index - 1] +
            current[index + 1] +
            current[index - cols] +
            current[index + cols] -
            4 * wave

          caustic = Math.max(0, -laplacian * 0.06)
        }

        const waveIntensity = Math.abs(wave)
        const specular =
          Math.pow(
            Math.max(
              0,
              1 - Math.abs(gradientY + gradientX) * 0.03,
            ),
            8,
          ) *
          waveIntensity *
          0.1

        const alpha = Math.min(
          1,
          displayCell.brightness * 1.3 +
            waveIntensity * 0.015 +
            caustic * 1.5 +
            specular,
        )

        if (alpha < 0.02) continue

        const combinedBrightness = Math.min(
          1,
          displayCell.brightness +
            waveIntensity * 0.015 +
            caustic * 1.2,
        )

        const charIndex = Math.floor(
          combinedBrightness * (ASCII_CHARS.length - 1),
        )

        const displayChar =
          ASCII_CHARS[charIndex] || displayCell.char

        if (displayChar === ' ' && alpha < 0.05) continue

        const brightBoost =
          1 +
          waveIntensity * 0.03 +
          caustic * 2.5 +
          specular

        let r = Math.min(
          255,
          displayCell.r * brightBoost +
            caustic * 60 +
            specular * 180,
        )
        let g = Math.min(
          255,
          displayCell.g * brightBoost +
            caustic * 120 +
            specular * 220,
        )
        let b = Math.min(
          255,
          displayCell.b * brightBoost +
            caustic * 80 +
            specular * 150,
        )

        // Keep the source-image colors in both themes. In dark mode,
        // lift very dark cells slightly so the gradient does not disappear
        // against #030303, without replacing the original RGB palette.
        if (darkRef.current) {
          const lift = 1.08
          r = Math.min(255, r * lift)
          g = Math.min(255, g * lift)
          b = Math.min(255, b * lift)
        }

        ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${alpha})`

        const drawX = col * CELL_WIDTH * dpr
        const drawY =
          (row * CELL_HEIGHT + CELL_HEIGHT * 0.5) * dpr

        const displacementX = gradientX * 0.5 * dpr
        const displacementY = gradientY * 0.35 * dpr

        ctx.fillText(
          displayChar,
          drawX + displacementX,
          drawY + displacementY,
        )
      }
    }
  }, [])

  const animate = useCallback(() => {
    const pointer = pointerRef.current

    if (
      pointer.x >= 0 &&
      pointer.y >= 0 &&
      pointer.prevX >= 0 &&
      pointer.prevY >= 0
    ) {
      const col = Math.floor(pointer.x / CELL_WIDTH)
      const row = Math.floor(pointer.y / CELL_HEIGHT)

      if (
        col >= 0 &&
        col < colsRef.current &&
        row >= 0 &&
        row < rowsRef.current
      ) {
        const dx = pointer.x - pointer.prevX
        const dy = pointer.y - pointer.prevY
        const speed = Math.sqrt(dx * dx + dy * dy)

        if (pointerDownRef.current) {
          const dragStrength = Math.min(
            speed * WATER_PARAMS.rippleStrength * 3,
            15,
          )

          if (dragStrength > 0.2) {
            addRipple(
              col,
              row,
              dragStrength,
              WATER_PARAMS.clickRadius,
            )
          } else {
            addRipple(
              col,
              row,
              WATER_PARAMS.clickStrength * 0.08,
              Math.max(2, WATER_PARAMS.clickRadius - 1),
            )
          }
        } else {
          const strength = Math.min(
            speed * WATER_PARAMS.rippleStrength,
            6,
          )

          if (strength > 0.3) {
            addRipple(
              col,
              row,
              strength,
              WATER_PARAMS.hoverRadius,
            )
          }
        }
      }

      pointer.prevX = pointer.x
      pointer.prevY = pointer.y
    }

    propagateWaves()
    render()
    frameRef.current = window.requestAnimationFrame(animate)
  }, [addRipple, propagateWaves, render])

  useEffect(() => {
    const image = new Image()
    image.decoding = 'async'

    image.onload = () => {
      imageRef.current = image
      initializeGrid()
      render()
    }

    image.src = imageSrc

    return () => {
      image.onload = null
    }
  }, [imageSrc, initializeGrid, render])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const container = canvas.parentElement
    if (!container) return undefined

    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    reducedMotionRef.current = mediaQuery.matches

    const updateReducedMotion = (event) => {
      reducedMotionRef.current = event.matches

      if (event.matches) {
        window.cancelAnimationFrame(frameRef.current)
        render()
      } else {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = window.requestAnimationFrame(animate)
      }
    }

    const setPointerPosition = (event) => {
      const rect = canvas.getBoundingClientRect()

      if (!isInsideRect(event.clientX, event.clientY, rect)) {
        pointerRef.current.x = -1
        pointerRef.current.y = -1
        pointerRef.current.prevX = -1
        pointerRef.current.prevY = -1
        return false
      }

      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const pointer = pointerRef.current

      if (pointer.x < 0 || pointer.y < 0) {
        pointer.prevX = x
        pointer.prevY = y
      }

      pointer.x = x
      pointer.y = y

      return true
    }

    const handlePointerMove = (event) => {
      if (reducedMotionRef.current) return

      if (
        event.pointerType !== 'mouse' &&
        !pointerDownRef.current
      ) {
        return
      }

      setPointerPosition(event)
    }

    const handlePointerDown = (event) => {
      if (reducedMotionRef.current) return
      if (!setPointerPosition(event)) return

      pointerDownRef.current = true

      const col = Math.floor(pointerRef.current.x / CELL_WIDTH)
      const row = Math.floor(pointerRef.current.y / CELL_HEIGHT)

      addRipple(
        col,
        row,
        WATER_PARAMS.clickStrength,
        WATER_PARAMS.clickRadius,
      )

      const timers = [
        window.setTimeout(() => {
          addRipple(
            col,
            row,
            -WATER_PARAMS.clickStrength * 0.4,
            WATER_PARAMS.clickRadius + 3,
            true,
          )
        }, 70),
        window.setTimeout(() => {
          addRipple(
            col,
            row,
            WATER_PARAMS.clickStrength * 0.2,
            WATER_PARAMS.clickRadius + 7,
            true,
          )
        }, 160),
        window.setTimeout(() => {
          addRipple(
            col,
            row,
            -WATER_PARAMS.clickStrength * 0.1,
            WATER_PARAMS.clickRadius + 12,
            true,
          )
        }, 280),
      ]

      rippleTimersRef.current.push(...timers)
    }

    const releasePointer = () => {
      pointerDownRef.current = false
    }

    const resetPointer = () => {
      pointerDownRef.current = false
      pointerRef.current = {
        x: -1,
        y: -1,
        prevX: -1,
        prevY: -1,
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimerRef.current)

      resizeTimerRef.current = window.setTimeout(() => {
        initializeGrid()
        render()
      }, 120)
    })

    resizeObserver.observe(container)

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })
    window.addEventListener('pointerdown', handlePointerDown, {
      passive: true,
    })
    window.addEventListener('pointerup', releasePointer, {
      passive: true,
    })
    window.addEventListener('pointercancel', resetPointer, {
      passive: true,
    })
    window.addEventListener('blur', resetPointer)
    mediaQuery.addEventListener('change', updateReducedMotion)

    if (!reducedMotionRef.current) {
      frameRef.current = window.requestAnimationFrame(animate)
    }

    return () => {
      resizeObserver.disconnect()
      window.clearTimeout(resizeTimerRef.current)
      window.cancelAnimationFrame(frameRef.current)

      rippleTimersRef.current.forEach((timer) => {
        window.clearTimeout(timer)
      })
      rippleTimersRef.current = []

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', releasePointer)
      window.removeEventListener('pointercancel', resetPointer)
      window.removeEventListener('blur', resetPointer)
      mediaQuery.removeEventListener('change', updateReducedMotion)
    }
  }, [addRipple, animate, initializeGrid, render])

  return (
    <div
      className="ascii-ripple-background"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

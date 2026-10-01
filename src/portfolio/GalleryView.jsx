import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

/* =====================================================
   GALLERY ASSETS

   Keep the existing Explore asset folder.

   IMPORTANT:
   eager: true here only gives us the generated asset URLs.
   We no longer create Image/video elements for every asset
   just to measure them.

   Actual image/video loading is controlled by the media
   elements further below.
===================================================== */

const galleryFiles = import.meta.glob(
  '../assets/explore/**/*.{png,jpg,jpeg,webp,gif,mp4,webm}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

/* =====================================================
   HELPERS
===================================================== */

function hashString(value) {
  let hash = 0

  for (let i = 0; i < value.length; i += 1) {
    hash =
      ((hash << 5) - hash) +
      value.charCodeAt(i)

    hash |= 0
  }

  return Math.abs(hash)
}

function getFileExtension(fileName) {
  return (
    fileName
      .split('.')
      .pop()
      ?.toLowerCase() || ''
  )
}

function cleanFileName(fileName) {
  return fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/^\d+[_-]/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleCase(value = '') {
  return value.replace(
    /\b\w/g,
    (character) => character.toUpperCase(),
  )
}

function getFolderLabel(path) {
  const parts = path.split('/')

  /*
   * Example:
   *
   * ../assets/explore/iconography/file.webp
   *
   * parts before filename:
   * ...
   * explore
   * iconography
   *
   * We use the immediate parent folder as the
   * museum-category fallback.
   */

  const parentFolder =
    parts.length > 1
      ? parts[parts.length - 2]
      : ''

  if (
    !parentFolder ||
    parentFolder === 'explore'
  ) {
    return 'Visual Archive'
  }

  return titleCase(
    parentFolder
      .replace(/[_-]+/g, ' ')
      .trim(),
  )
}

/* =====================================================
   MANUAL PRIORITY

   001_travel.webm
   002_holo.jpg
   003_perdana.png

   Files without a number prefix use the stable shuffle.
===================================================== */

function getManualPriority(fileName) {
  const match =
    fileName.match(/^(\d+)[_-]/)

  if (!match) {
    return null
  }

  return Number(match[1])
}

/* =====================================================
   STABLE SHUFFLE

   Manually numbered files always win.

   Everything else looks shuffled but remains stable
   across reloads.
===================================================== */

function stableShuffle(items) {
  return [...items].sort((a, b) => {
    const aPriority =
      a.manualPriority

    const bPriority =
      b.manualPriority

    if (
      aPriority !== null &&
      bPriority !== null
    ) {
      return aPriority - bPriority
    }

    if (aPriority !== null) {
      return -1
    }

    if (bPriority !== null) {
      return 1
    }

    return (
      a.shuffleValue -
      b.shuffleValue
    )
  })
}

/* =====================================================
   FINAL CONTENT ORDER

   Same logic as the old Explore page:

   1. icon / icons stay at the end
   2. webm + gif are motion-priority
   3. motion and static are interleaved
   4. numbered files get manual priority
===================================================== */

function buildGalleryOrder(items) {
  const normalItems =
    items.filter(
      (item) => !item.isIcon,
    )

  const iconItems =
    stableShuffle(
      items.filter(
        (item) => item.isIcon,
      ),
    )

  const motionItems =
    stableShuffle(
      normalItems.filter(
        (item) =>
          item.isPriorityMotion,
      ),
    )

  const staticItems =
    stableShuffle(
      normalItems.filter(
        (item) =>
          !item.isPriorityMotion,
      ),
    )

  const ordered = []

  let motionIndex = 0
  let staticIndex = 0

  while (
    motionIndex <
      motionItems.length ||
    staticIndex <
      staticItems.length
  ) {
    if (
      motionIndex <
      motionItems.length
    ) {
      ordered.push(
        motionItems[motionIndex],
      )

      motionIndex += 1
    }

    if (
      staticIndex <
      staticItems.length
    ) {
      ordered.push(
        staticItems[staticIndex],
      )

      staticIndex += 1
    }
  }

  return [
    ...ordered,
    ...iconItems,
  ]
}

/* =====================================================
   BUILD RAW ITEMS
===================================================== */

const rawGalleryItems =
  Object.entries(galleryFiles)
    .map(([path, src]) => {
      const fileName =
        path.split('/').pop() || ''

      const extension =
        getFileExtension(fileName)

      const isVideo =
        ['mp4', 'webm'].includes(
          extension,
        )

      const isPriorityMotion =
        ['webm', 'gif'].includes(
          extension,
        )

      const isIcon =
        /icons?/i.test(fileName)

      const manualPriority =
        getManualPriority(fileName)

      const rawLabel =
        cleanFileName(fileName)

      return {
        path,
        src,

        fileName,
        extension,

        type:
          isVideo
            ? 'video'
            : 'image',

        isPriorityMotion,
        isIcon,

        manualPriority,

        label:
          rawLabel
            ? titleCase(rawLabel)
            : 'Selected Work',

        category:
          getFolderLabel(path),

        alt:
          rawLabel ||
          'Selected visual work by Perdana',

        shuffleValue:
          hashString(path),

        /*
         * We deliberately start with a neutral ratio.
         *
         * The real ratio will only be discovered when
         * that specific media item actually loads.
         *
         * This prevents the gallery from requesting
         * every single asset on mount.
         */
        ratio: 1,
      }
    })

const initialGalleryItems =
  buildGalleryOrder(
    rawGalleryItems,
  )

/* =====================================================
   RESPONSIVE COLUMN COUNT

   Preserves the old Explore behavior.
===================================================== */

function getColumnCount(width) {
  if (width >= 1450) {
    return 6
  }

  if (width >= 1100) {
    return 5
  }

  if (width >= 820) {
    return 4
  }

  if (width >= 600) {
    return 3
  }

  if (width >= 360) {
    return 2
  }

  return 1
}

/* =====================================================
   BALANCED MASONRY

   The next item goes into the currently shortest column.

   ratio = width / height
   relative height = 1 / ratio
===================================================== */

function buildMasonryColumns(
  items,
  columnCount,
) {
  const columns =
    Array.from(
      {
        length: columnCount,
      },
      () => [],
    )

  const columnHeights =
    new Array(
      columnCount,
    ).fill(0)

  items.forEach((item) => {
    let shortestColumn = 0

    for (
      let i = 1;
      i < columnCount;
      i += 1
    ) {
      if (
        columnHeights[i] <
        columnHeights[
          shortestColumn
        ]
      ) {
        shortestColumn = i
      }
    }

    columns[
      shortestColumn
    ].push(item)

    const ratio =
      item.ratio || 1

    const relativeHeight =
      1 / ratio

    columnHeights[
      shortestColumn
    ] +=
      relativeHeight + 0.045
  })

  return columns
}

/* =====================================================
   LAZY VIDEO

   Video receives its src only when it gets reasonably
   close to the viewport.

   This is the biggest difference from the old Explore
   implementation.
===================================================== */

function GalleryVideo({
  item,
  onRatio,
}) {
  const wrapperRef =
    useRef(null)

  const videoRef =
    useRef(null)

  const [shouldLoad, setShouldLoad] =
    useState(false)

  const [isVisible, setIsVisible] =
    useState(false)

  useEffect(() => {
    const element =
      wrapperRef.current

    if (!element) {
      return undefined
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry =
            entries[0]

          if (!entry) {
            return
          }

          if (
            entry.isIntersecting
          ) {
            setShouldLoad(true)
          }

          setIsVisible(
            entry.isIntersecting,
          )
        },
        {
          /*
           * Start loading before it physically enters
           * the viewport, so scrolling still feels
           * immediate.
           */
          rootMargin:
            '500px 0px 500px 0px',

          threshold: 0.01,
        },
      )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const video =
      videoRef.current

    if (
      !video ||
      !shouldLoad
    ) {
      return
    }

    if (isVisible) {
      const playPromise =
        video.play()

      if (
        playPromise &&
        typeof playPromise.catch ===
          'function'
      ) {
        playPromise.catch(() => {
          /*
           * Autoplay can occasionally be rejected.
           * The gallery does not need to fail because
           * of that.
           */
        })
      }

      return
    }

    video.pause()
  }, [
    isVisible,
    shouldLoad,
  ])

  const handleMetadata = (
    event,
  ) => {
    const video =
      event.currentTarget

    if (
      video.videoWidth > 0 &&
      video.videoHeight > 0
    ) {
      onRatio(
        item.path,
        video.videoWidth /
          video.videoHeight,
      )
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="gallery-media-shell"
    >
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="gallery-video"
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.alt}
          onLoadedMetadata={
            handleMetadata
          }
        />
      ) : (
        <div
          className="gallery-video-placeholder"
          aria-hidden="true"
        />
      )}
    </div>
  )
}

/* =====================================================
   IMAGE
===================================================== */

function GalleryImage({
  item,
  onRatio,
}) {
  const handleLoad = (
    event,
  ) => {
    const image =
      event.currentTarget

    if (
      image.naturalWidth > 0 &&
      image.naturalHeight > 0
    ) {
      onRatio(
        item.path,
        image.naturalWidth /
          image.naturalHeight,
      )
    }
  }

  return (
    <img
      className="gallery-image"
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onLoad={handleLoad}
    />
  )
}

/* =====================================================
   ITEM
===================================================== */

function GalleryItem({
  item,
  onRatio,
}) {
  const handlePointerMove = (
    event,
  ) => {
    const rect =
      event.currentTarget
        .getBoundingClientRect()

    event.currentTarget
      .style
      .setProperty(
        '--gallery-cursor-x',
        `${
          event.clientX -
          rect.left
        }px`,
      )

    event.currentTarget
      .style
      .setProperty(
        '--gallery-cursor-y',
        `${
          event.clientY -
          rect.top
        }px`,
      )
  }

  return (
    <figure
      className="gallery-item"
      onPointerMove={
        handlePointerMove
      }
    >
      {item.type ===
      'video' ? (
        <GalleryVideo
          item={item}
          onRatio={onRatio}
        />
      ) : (
        <GalleryImage
          item={item}
          onRatio={onRatio}
        />
      )}

      <figcaption
        className="gallery-hover-label"
      >
        <strong>
          {item.label ||
            'Selected Work'}
        </strong>

        <span>
          {item.category ||
            'Visual Archive'}
        </span>
      </figcaption>
    </figure>
  )
}

/* =====================================================
   GALLERY VIEW
===================================================== */

export default function GalleryView() {
  const containerRef =
    useRef(null)

  const [columnCount, setColumnCount] =
    useState(6)

  const [items, setItems] =
    useState(
      () =>
        initialGalleryItems.map(
          (item) => ({
            ...item,
          }),
        ),
    )

  /* ===================================================
     UPDATE ONE MEDIA RATIO AT A TIME

     Only media that genuinely loads can update the
     masonry.

     No Promise.all.
     No new Image().
     No invisible video element for every asset.
  =================================================== */

  const handleRatio = (
    path,
    ratio,
  ) => {
    if (
      !Number.isFinite(ratio) ||
      ratio <= 0
    ) {
      return
    }

    setItems((current) => {
      let changed = false

      const next =
        current.map(
          (item) => {
            if (
              item.path !== path
            ) {
              return item
            }

            if (
              Math.abs(
                item.ratio -
                  ratio,
              ) < 0.01
            ) {
              return item
            }

            changed = true

            return {
              ...item,
              ratio,
            }
          },
        )

      return changed
        ? next
        : current
    })
  }

  /* ===================================================
     RESPONSIVE COLUMNS

     Uses the Gallery's actual available width rather
     than the full viewport.

     This means opening/closing the portfolio sidebar
     is handled naturally.
  =================================================== */

  useEffect(() => {
    const element =
      containerRef.current

    if (!element) {
      return undefined
    }

    const updateColumns = () => {
      const width =
        element
          .getBoundingClientRect()
          .width

      setColumnCount(
        getColumnCount(width),
      )
    }

    updateColumns()

    const observer =
      new ResizeObserver(
        updateColumns,
      )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  const masonryColumns =
    useMemo(
      () =>
        buildMasonryColumns(
          items,
          columnCount,
        ),
      [
        items,
        columnCount,
      ],
    )

  return (
    <section
      ref={containerRef}
      className="gallery-view"
    >
 <header className="gallery-header">
  <div className="gallery-heading">
    <p className="gallery-eyebrow">
      GALLERY · 2016—2026
    </p>

    <h1>
      Visual Archive
    </h1>

    <span className="gallery-description">
      Some client work, iconography, illustration,
      motion, graphic design, and experiments collected
      years of making things.
    </span>

    <span className="gallery-count">
      {items.length} selected visual design so it's not heavy
    </span>
  </div>
</header>

      <div className="gallery-masonry">
        {masonryColumns.map(
          (
            column,
            columnIndex,
          ) => (
            <div
              className="gallery-column"
              key={`gallery-column-${columnIndex}`}
            >
              {column.map(
                (item) => (
                  <GalleryItem
                    key={
                      item.path
                    }
                    item={item}
                    onRatio={
                      handleRatio
                    }
                  />
                ),
              )}
            </div>
          ),
        )}
      </div>
    </section>
  )
}
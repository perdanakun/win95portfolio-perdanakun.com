import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';


/* =========================================
   AUTO LOAD ASSETS
========================================= */

const exploreFiles = import.meta.glob(
  '../assets/explore/**/*.{png,jpg,jpeg,webp,gif,mp4,webm}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);


/* =========================================
   HELPERS
========================================= */

function hashString(value) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash =
      ((hash << 5) - hash) +
      value.charCodeAt(i);

    hash |= 0;
  }

  return Math.abs(hash);
}


function getFileExtension(fileName) {
  return (
    fileName
      .split('.')
      .pop()
      ?.toLowerCase() || ''
  );
}


/* =========================================
   MANUAL PRIORITY

   Contoh:

   001_travel.webm
   002_holo.jpg
   003_perdana.png

   File tanpa prefix angka:
   priority = null
========================================= */

function getManualPriority(fileName) {
  const match =
    fileName.match(/^(\d+)[_-]/);

  if (!match) {
    return null;
  }

  return Number(match[1]);
}


/* =========================================
   STABLE SORT

   Priority manual menang.

   Sisanya terasa random tetapi
   konsisten setiap reload.
========================================= */

function stableShuffle(items) {
  return [...items].sort((a, b) => {

    const aPriority =
      a.manualPriority;

    const bPriority =
      b.manualPriority;


    /* =====================================
       DUA-DUANYA MANUAL
    ===================================== */

    if (
      aPriority !== null &&
      bPriority !== null
    ) {
      return (
        aPriority -
        bPriority
      );
    }


    /* =====================================
       A MANUAL
    ===================================== */

    if (
      aPriority !== null
    ) {
      return -1;
    }


    /* =====================================
       B MANUAL
    ===================================== */

    if (
      bPriority !== null
    ) {
      return 1;
    }


    /* =====================================
       TIDAK ADA MANUAL PRIORITY
    ===================================== */

    return (
      a.shuffleValue -
      b.shuffleValue
    );
  });
}


/* =========================================
   FINAL CONTENT ORDER

   Rules:

   1. icon / icons selalu paling akhir
   2. motion priority = webm + gif
   3. static = jpg/png/webp/mp4 dll
   4. motion dan static diselang-seling
   5. prefix 001_, 002_, dst mendapat
      prioritas di dalam kategorinya
========================================= */

function buildExploreOrder(items) {

  /* =====================================
     ICONS LAST
  ===================================== */

  const normalItems =
    items.filter(
      (item) =>
        !item.isIcon
    );


  const iconItems =
    stableShuffle(
      items.filter(
        (item) =>
          item.isIcon
      )
    );


  /* =====================================
     MOTION
  ===================================== */

  const motionItems =
    stableShuffle(
      normalItems.filter(
        (item) =>
          item.isPriorityMotion
      )
    );


  /* =====================================
     STATIC
  ===================================== */

  const staticItems =
    stableShuffle(
      normalItems.filter(
        (item) =>
          !item.isPriorityMotion
      )
    );


  /* =====================================
     INTERLEAVE

     motion
     static
     motion
     static
     ...
  ===================================== */

  const ordered = [];

  let motionIndex = 0;
  let staticIndex = 0;


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
        motionItems[
          motionIndex
        ]
      );

      motionIndex += 1;
    }


    if (
      staticIndex <
      staticItems.length
    ) {
      ordered.push(
        staticItems[
          staticIndex
        ]
      );

      staticIndex += 1;
    }
  }


  /* =====================================
     ICONS ALWAYS LAST
  ===================================== */

  return [
    ...ordered,
    ...iconItems,
  ];
}


/* =========================================
   IMAGE RATIO
========================================= */

function getImageRatio(src) {
  return new Promise(
    (resolve) => {

      const image =
        new Image();


      image.onload = () => {

        if (
          image.naturalWidth > 0 &&
          image.naturalHeight > 0
        ) {

          resolve(
            image.naturalWidth /
            image.naturalHeight
          );

          return;
        }


        resolve(1);
      };


      image.onerror = () => {
        resolve(1);
      };


      image.src = src;
    }
  );
}


/* =========================================
   VIDEO RATIO
========================================= */

function getVideoRatio(src) {
  return new Promise(
    (resolve) => {

      const video =
        document.createElement(
          'video'
        );


      const finish = (ratio) => {

        video.removeAttribute(
          'src'
        );

        video.load();

        resolve(ratio);
      };


      video.preload =
        'metadata';


      video.onloadedmetadata =
        () => {

          if (
            video.videoWidth > 0 &&
            video.videoHeight > 0
          ) {

            finish(
              video.videoWidth /
              video.videoHeight
            );

            return;
          }


          finish(
            16 / 9
          );
        };


      video.onerror =
        () => {

          finish(
            16 / 9
          );
        };


      video.src = src;
    }
  );
}


/* =========================================
   BUILD RAW ITEMS
========================================= */

const rawItems =
  Object.entries(
    exploreFiles
  )
    .map(
      ([path, src]) => {

        const fileName =
          path
            .split('/')
            .pop() || '';


        const extension =
          getFileExtension(
            fileName
          );


        /* =================================
           VIDEO
        ================================= */

        const isVideo =
          [
            'mp4',
            'webm',
          ].includes(
            extension
          );


        /* =================================
           PRIORITY MOTION

           webm
           gif
        ================================= */

        const isPriorityMotion =
          [
            'webm',
            'gif',
          ].includes(
            extension
          );


        /* =================================
           ICON / ICONS
        ================================= */

        const isIcon =
          /icons?/i.test(
            fileName
          );


        /* =================================
           MANUAL PRIORITY
        ================================= */

        const manualPriority =
          getManualPriority(
            fileName
          );


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

          alt:
            fileName
              .replace(
                /\.[^/.]+$/,
                ''
              )
              .replace(
                /[-_]/g,
                ' '
              ),

          shuffleValue:
            hashString(
              path
            ),
        };
      }
    );


/* =========================================
   FINAL ORDER
========================================= */

const rawExploreItems =
  buildExploreOrder(
    rawItems
  );


/* =========================================
   RESPONSIVE COLUMN COUNT
========================================= */

function getColumnCount(width) {

  if (
    width >= 1450
  ) {
    return 6;
  }


  if (
    width >= 1100
  ) {
    return 5;
  }


  if (
    width >= 820
  ) {
    return 4;
  }


  if (
    width >= 600
  ) {
    return 3;
  }


  if (
    width >= 360
  ) {
    return 2;
  }


  return 1;
}


/* =========================================
   BALANCED MASONRY

   Item berikutnya masuk ke kolom
   yang tinggi totalnya paling pendek.
========================================= */

function buildMasonryColumns(
  items,
  columnCount
) {

  const columns =
    Array.from(
      {
        length:
          columnCount,
      },

      () => []
    );


  const columnHeights =
    new Array(
      columnCount
    ).fill(0);


  items.forEach(
    (item) => {

      let shortestColumn =
        0;


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

          shortestColumn =
            i;
        }
      }


      columns[
        shortestColumn
      ].push(
        item
      );


      /*
       * ratio:
       *
       * width / height
       *
       * relative height:
       *
       * 1 / ratio
       */

      const ratio =
        item.ratio || 1;


      const relativeHeight =
        1 / ratio;


      columnHeights[
        shortestColumn
      ] +=
        relativeHeight +
        0.045;
    }
  );


  return columns;
}


/* =========================================
   COMPONENT
========================================= */

export default function ExploreContent() {

  const containerRef =
    useRef(null);


  const [
    columnCount,
    setColumnCount,
  ] =
    useState(6);


  const [
    items,
    setItems,
  ] =
    useState(
      () =>
        rawExploreItems.map(
          (item) => ({
            ...item,

            /*
             * Temporary ratio
             * sebelum metadata asset
             * selesai dibaca.
             */

            ratio: 1,
          })
        )
    );


  /* =======================================
     READ REAL MEDIA SIZE
  ======================================= */

  useEffect(() => {

    let cancelled =
      false;


    const measureItems =
      async () => {

        const measured =
          await Promise.all(

            rawExploreItems.map(
              async (item) => {

                const ratio =
                  item.type ===
                  'video'

                    ? await getVideoRatio(
                        item.src
                      )

                    : await getImageRatio(
                        item.src
                      );


                return {
                  ...item,
                  ratio,
                };
              }
            )
          );


        if (
          !cancelled
        ) {

          setItems(
            measured
          );
        }
      };


    measureItems();


    return () => {

      cancelled =
        true;
    };

  }, []);


  /* =======================================
     RESPONSIVE COLUMN COUNT
  ======================================= */

  useEffect(() => {

    const element =
      containerRef.current;


    if (!element) {
      return undefined;
    }


    const updateColumns =
      () => {

        const width =
          element
            .getBoundingClientRect()
            .width;


        setColumnCount(
          getColumnCount(
            width
          )
        );
      };


    updateColumns();


    const observer =
      new ResizeObserver(
        updateColumns
      );


    observer.observe(
      element
    );


    return () => {

      observer.disconnect();
    };

  }, []);


  /* =======================================
     DISTRIBUTE TO MASONRY
  ======================================= */

  const masonryColumns =
    useMemo(
      () =>
        buildMasonryColumns(
          items,
          columnCount
        ),

      [
        items,
        columnCount,
      ]
    );


  return (
    <>
      <style>
        {`
          /* =========================================
             PAGE
          ========================================= */

          .explore-page {
            width: 100%;
            min-height: 100%;

            margin: 0;

            padding: 18px;

            box-sizing: border-box;

            background: #ffffff;

            color: #111111;

            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }


          /* =========================================
             HEADER
          ========================================= */

          .explore-header {
            width: 100%;

            margin-bottom: 18px;

            display: flex;

            align-items: flex-end;
            justify-content: space-between;

            gap: 20px;
          }


          .explore-title {
            margin: 0;

            color: #777777;

            font-size: 14px;
            line-height: 1;

            font-weight: 600;
          }


          .explore-meta {
            margin: 0;

            color: #777777;

            font-size: 11px;
            line-height: 1;

            font-weight: 400;
          }


          /* =========================================
             MASONRY
          ========================================= */

          .explore-masonry {
            width: 100%;

            display: flex;

            align-items: flex-start;

            gap: 8px;

            box-sizing: border-box;
          }


          /* =========================================
             COLUMN
          ========================================= */

          .explore-column {
            flex: 1 1 0;

            min-width: 0;

            display: flex;

            flex-direction: column;

            gap: 8px;
          }


          /* =========================================
             ITEM
          ========================================= */

          .explore-item {
            width: 100%;

            min-width: 0;

            margin: 0;
            padding: 0;

            display: block;

            overflow: hidden;

            box-sizing: border-box;

            background: transparent;

            cursor: pointer;

            transition:
              opacity
              100ms
              linear;
          }


          .explore-item:hover {
            opacity: 0.78;
          }


          /* =========================================
             IMAGE / VIDEO

             Original aspect ratio.
             No crop.
             No forced frame.
          ========================================= */

          .explore-image,
          .explore-video {
            width: 100%;
            height: auto;

            margin: 0;
            padding: 0;

            display: block;

            object-fit: contain;

            border: 0;

            background:
              transparent;
          }


          /* =========================================
             TABLET
          ========================================= */

          @media (
            max-width: 900px
          ) {

            .explore-page {
              padding: 12px;
            }


            .explore-header {
              margin-bottom: 14px;
            }


            .explore-masonry {
              gap: 6px;
            }


            .explore-column {
              gap: 6px;
            }
          }


          /* =========================================
             MOBILE
          ========================================= */

          @media (
            max-width: 560px
          ) {

            .explore-page {
              padding: 8px;
            }


            .explore-header {
              margin-bottom: 10px;
            }


            .explore-meta {
              display: none;
            }


            .explore-masonry {
              gap: 5px;
            }


            .explore-column {
              gap: 5px;
            }
          }
        `}
      </style>


      <div
        ref={containerRef}
        className="explore-page"
      >

        {/* =========================================
            HEADER
        ========================================= */}

        <header
          className="explore-header"
        >

          <h1
            className="explore-title"
          >
            Explore
          </h1>


          <p
            className="explore-meta"
          >
            {items.length}
            {' '}
            selected works
          </p>

        </header>


        {/* =========================================
            MASONRY
        ========================================= */}

        <div
          className="explore-masonry"
        >

          {masonryColumns.map(
            (
              column,
              columnIndex
            ) => (

              <div
                key={
                  `column-${columnIndex}`
                }

                className="explore-column"
              >

                {column.map(
                  (item) => (

                    <div
                      key={
                        item.path
                      }

                      className="explore-item"
                    >

                      {/* =============================
                          VIDEO
                      ============================= */}

                      {item.type ===
                        'video' && (

                        <video
                          className="explore-video"

                          src={
                            item.src
                          }

                          autoPlay
                          muted
                          loop
                          playsInline

                          preload="metadata"

                          aria-label={
                            item.alt
                          }
                        />

                      )}


                      {/* =============================
                          IMAGE / GIF
                      ============================= */}

                      {item.type ===
                        'image' && (

                        <img
                          className="explore-image"

                          src={
                            item.src
                          }

                          alt={
                            item.alt
                          }

                          loading="lazy"

                          draggable={
                            false
                          }
                        />

                      )}

                    </div>

                  )
                )}

              </div>

            )
          )}

        </div>

      </div>
    </>
  );
}
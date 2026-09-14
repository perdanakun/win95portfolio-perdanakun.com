import React from 'react';

const exploreItems = [
  {
    id: 1,
    type: 'video',
    src: '/projects/travelxxx/case-study/slides/18.webm',
  },

  {
    id: 2,
    type: 'placeholder',
    ratio: '1 / 1',
  },

  {
    id: 3,
    type: 'placeholder',
    ratio: '3 / 4',
  },

  {
    id: 4,
    type: 'placeholder',
    ratio: '16 / 10',
  },

  {
    id: 5,
    type: 'placeholder',
    ratio: '4 / 5',
  },

  {
    id: 6,
    type: 'placeholder',
    ratio: '4 / 3',
  },

  {
    id: 7,
    type: 'placeholder',
    ratio: '1 / 1',
  },

  {
    id: 8,
    type: 'placeholder',
    ratio: '16 / 9',
  },
];

export default function ExploreContent() {
  return (
    <>
      <style>
        {`
          /* =========================================
             PAGE
          ========================================= */

          .visual-index-page {
            width: 100%;
            min-height: 100%;

            padding: 24px;
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

          .visual-index-header {
            width: 100%;

            margin-bottom: 24px;

            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            gap: 20px;
          }

          .visual-index-title {
            margin: 0;
            color: #777777;

            font-size: 14px;
            line-height: 1;

            font-weight: 600;
          }

          .visual-index-meta {
            margin: 0;

            font-size: 11px;
            line-height: 1;

            color: #777777;
          }


          /* =========================================
             MASONRY GRID
          ========================================= */

          .visual-index-grid {
            width: 100%;

            columns: 2;
            column-gap: 12px;
          }

          .visual-index-item {
            width: 100%;

            margin: 0 0 12px 0;

            display: block;

            break-inside: avoid;

            overflow: hidden;

            cursor: pointer;

            transition:
              opacity 120ms ease;
          }

          .visual-index-item:hover {
            opacity: 0.82;
          }


          /* =========================================
             VIDEO
          ========================================= */

          .visual-index-video {
            width: 100%;
            height: auto;

            display: block;

            object-fit: cover;

            background: #eeeeee;
          }


          /* =========================================
             COMING SOON PLACEHOLDER
          ========================================= */

          .visual-index-placeholder {
            position: relative;

            width: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #eeeeee;

            overflow: hidden;

            box-sizing: border-box;
          }

          .visual-index-placeholder::after {
            content: '';

            position: absolute;
            inset: 0;

            border:
              1px solid
              rgba(0, 0, 0, 0.06);

            box-sizing: border-box;

            pointer-events: none;
          }

          .visual-index-coming-soon {
            position: relative;
            z-index: 1;

            font-size: 11px;
            line-height: 1;

            color: #8a8a8a;

            user-select: none;
          }


          /* =========================================
             TABLET
          ========================================= */

          @media (max-width: 800px) {
            .visual-index-page {
              padding: 16px;
            }

            .visual-index-header {
              margin-bottom: 18px;
            }

            .visual-index-grid {
              columns: 2;
              column-gap: 8px;
            }

            .visual-index-item {
              margin-bottom: 8px;
            }
          }


          /* =========================================
             MOBILE
          ========================================= */

          @media (max-width: 500px) {
            .visual-index-page {
              padding: 10px;
            }

            .visual-index-header {
              margin-bottom: 14px;
            }

            .visual-index-grid {
              columns: 1;
            }

            .visual-index-item {
              margin-bottom: 8px;
            }

            .visual-index-meta {
              display: none;
            }
          }
        `}
      </style>

      <div className="visual-index-page">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="visual-index-header">

          <h1 className="visual-index-title">
            Explore
          </h1>

          <p className="visual-index-meta">
            Selected work
          </p>

        </header>


        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="visual-index-grid">

          {exploreItems.map((item) => (

            <div
              key={item.id}
              className="visual-index-item"
            >

              {item.type === 'video' ? (

                <video
                  className="visual-index-video"
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />

              ) : (

                <div
                  className="visual-index-placeholder"
                  style={{
                    aspectRatio: item.ratio,
                  }}
                >

                  <span className="visual-index-coming-soon">
                    Coming Soon
                  </span>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </>
  );
}
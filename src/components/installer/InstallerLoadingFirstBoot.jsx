import React from 'react';

import installFoundation from './1.png';
import installExploration from './2.png';
import installBuild from './3.png';
import installNextChapter from './4.png';

/* ======================================
   INSTALLATION SLIDES
====================================== */
const slides = [
  {
    start: 0,
    image: installFoundation,
    title: 'The Foundation',
    description:
      'A decade of making things visual — building an eye for systems, detail, composition, and visual language.',
    points: [
      'Visual systems and design direction.',
      'Iconography, illustration, and graphic design.',
      'A foundation built through years of visual craft.',
    ],
  },

  {
    start: 25,
    image: installExploration,
    title: 'The Exploration',
    description:
      'Exploring what happens when that visual foundation meets products, people, interaction, and the way digital experiences are used.',
    points: [
      'Product Design and UX.',
      'Interaction design and digital experiences.',
      'Connecting visual craft with product thinking.',
    ],
  },

  {
    start: 50,
    image: installBuild,
    title: 'The Build',
    description:
      'Going beyond the canvas to turn ideas into interfaces — learning through code, experimentation, and design in code.',
    points: [
      'Building interfaces instead of stopping at mockups.',
      'Learning through front-end development.',
      'Exploring design directly in code.',
    ],
  },

  {
    start: 75,
    image: installNextChapter,
    title: 'The Next Chapter',
    description:
      'Moving toward Product Design and Design Engineering, where visual craft, product thinking, and implementation can become part of the same process.',
    points: [
      'Product Design.',
      'Design Engineering.',
      'Designing, building, testing, and learning through real projects.',
    ],
  },
];

/* ======================================
   GET CURRENT SLIDE
====================================== */

function getCurrentSlide(
  progress
) {

  if (progress >= 75) {
    return slides[3];
  }

  if (progress >= 50) {
    return slides[2];
  }

  if (progress >= 25) {
    return slides[1];
  }

  return slides[0];

}


/* ======================================
   INSTALLER LOADING
====================================== */

export default function InstallerLoading({
  progress = 0,
  image,
  isMobile,
}) {

  const slide =
    getCurrentSlide(
      progress
    );


  const safeProgress =
    Math.min(
      Math.max(
        progress,
        0
      ),
      100
    );


  return (

    <div
      className="ui-font"

      style={{
        flex:
          '1 1 0',

        width:
          '100%',

        minWidth:
          0,

        minHeight:
          0,

        display:
          'flex',

        flexDirection:
          'column',

        boxSizing:
          'border-box',

        overflow:
          'hidden',

        background:
          '#c0c0c0',
      }}
    >

      {/* ======================================
          MAIN CONTENT AREA
      ====================================== */}

      <div
        style={{
          flex:
            '1 1 0',

          minWidth:
            0,

          minHeight:
            0,

          padding:
            12,

          boxSizing:
            'border-box',

          overflow:
            'hidden',
        }}
      >

        <div
          className="installer-loading-layout"

          style={{
            width:
              '100%',

            height:
              '100%',

            minWidth:
              0,

            minHeight:
              0,

            display:
              'flex',

            background:
              '#ffffff',

            border:
              '2px solid',

            borderTopColor:
              '#808080',

            borderLeftColor:
              '#808080',

            borderRightColor:
              '#eeebeb',

            borderBottomColor:
              '#eeebeb',


            overflow:
              'hidden',

            boxSizing:
              'border-box',
          }}
        >

          {/* ==============================
              LEFT IMAGE
          ============================== */}

          <div
            className="installer-loading-image"

            style={{
              width:
                190,

              minWidth:
                190,

              height:
                '100%',

              flexShrink:
                0,

              background:
                '#2CA0A5',

              display:
                'flex',

              alignItems:
                'center',

              justifyContent:
                'center',

              boxSizing:
                'border-box',

              overflow:
                'hidden',
            }}
          >

<img
  src={slide.image}
  alt={slide.title}

              style={{
                width:
                  '100%',

                height:
                  '100%',

                display:
                  'block',

                objectFit:
                  'cover',

                objectPosition:
                  'center',
              }}
            />

          </div>


          {/* ==============================
              RIGHT CONTENT
          ============================== */}

          <main
            className="reading-font installer-loading-content"

            style={{
              flex:
                1,

              minWidth:
                0,

              minHeight:
                0,

              padding:
                '18px 28px 20px',

              boxSizing:
                'border-box',

              overflowY:
                'auto',

              overflowX:
                'hidden',

              color:
                '#000000',

              textAlign:
                'left',
            }}
          >

            {/* ============================
                SLIDE TITLE
            ============================ */}

            <h2
              className="ui-font"

              style={{
                margin:
                  0,

                padding:
                  '0 0 10px',

                fontSize:
                  18,

                lineHeight:
                  '22px',

                fontWeight:
                  'bold',

                color:
                  '#000000',

                borderBottom:
                  '1px solid #808080',
              }}
            >
              {slide.title}
            </h2>


            {/* ============================
                DESCRIPTION
            ============================ */}

            <p
              className="reading-font"

              style={{
                margin:
                  '18px 0 16px',

                padding:
                  0,

                color:
                  '#000000',

                textAlign:
                  'left',
              }}
            >
              {slide.description}
            </p>


            {/* ============================
                BULLET POINTS
            ============================ */}

            <div
              className="reading-font"

              style={{
                display:
                  'flex',

                flexDirection:
                  'column',

                gap:
                  10,

                color:
                  '#000000',
              }}
            >

              {slide.points.map(
                (
                  point,
                  index
                ) => (

                  <div
                    key={
                      `${slide.title}-${index}`
                    }

                    style={{
                      display:
                        'flex',

                      alignItems:
                        'flex-start',

                      gap:
                        10,

                      minWidth:
                        0,
                    }}
                  >

                    <span
                      aria-hidden="true"

                      style={{
                        flexShrink:
                          0,
                      }}
                    >
                      -
                    </span>


                    <span>
                      {point}
                    </span>

                  </div>

                )
              )}

            </div>

          </main>

        </div>

      </div>


      {/* ======================================
          INSTALLATION PROGRESS AREA
      ====================================== */}

      <footer
        className="ui-font"

        style={{
          flexShrink:
            0,

          minWidth:
            0,

          padding:
            '8px 12px 10px',

          boxSizing:
            'border-box',

          background:
            '#c0c0c0',

          borderTop:
            '1px solid #808080',

          boxShadow:
            'inset 0 1px 0 #ffffff',

          display:
            'flex',

          alignItems:
            'center',

          gap:
            12,

          color:
            '#000000',
        }}
      >

        {/* ==============================
            COPY TEXT
        ============================== */}

        <div
          className="ui-font"

          style={{
            flexShrink:
              0,

            whiteSpace:
              'nowrap',
          }}
        >
          Preparing files...
        </div>


        {/* ==============================
            PROGRESS BAR
        ============================== */}

        <div
          style={{
            position:
              'relative',

            flex:
              1,

            height:
              22,

            minWidth:
              0,

            background:
              '#ffffff',

            borderTop:
              '2px solid #808080',

            borderLeft:
              '2px solid #808080',

            borderRight:
              '2px solid #ffffff',

            borderBottom:
              '2px solid #ffffff',

            boxShadow: `
              inset 1px 1px 0 #000000,
              inset -1px -1px 0 #dfdfdf
            `,

            boxSizing:
              'border-box',

            overflow:
              'hidden',
          }}
        >

          {/* ============================
              BLUE PROGRESS
          ============================ */}

          <div
            style={{
              position:
                'absolute',

              left:
                0,

              top:
                0,

              bottom:
                0,

              width:
                `${safeProgress}%`,

              background:
                '#000080',

              transition:
                'width 45ms linear',
            }}
          />


          {/* ============================
              PERCENTAGE
          ============================ */}

          <div
            className="ui-font"

            style={{
              position:
                'absolute',

              inset:
                0,

              display:
                'flex',

              alignItems:
                'center',

              justifyContent:
                'center',

              fontSize:
                12,

              color:
                '#000000',

              pointerEvents:
                'none',

              mixBlendMode:
                'difference',
            }}
          >
            {Math.round(
              safeProgress
            )}%
          </div>

        </div>

      </footer>


      {/* ======================================
          RESPONSIVE
      ====================================== */}

      <style>
        {`

          @media (max-width: 600px) {

            .installer-loading-layout {

              flex-direction:
                column !important;

            }


            .installer-loading-image {

              width:
                100% !important;

              min-width:
                0 !important;

              height:
                145px !important;

              min-height:
                145px !important;

              border-right:
                0 !important;

              border-bottom:
                1px solid #808080;

            }


            .installer-loading-content {

              padding:
                16px 18px 20px !important;

            }

          }

        `}
      </style>

    </div>

  );

}
import React, {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Frame,
} from '@react95/core';

import { Install } from '@react95/icons';

import InstallerLoadingFirstBoot from './InstallerLoadingFirstBoot';

import win95installimg
  from './win95_install_illustration.png';


/* ======================================
   PERDANA INSTALLER
   FIRST BOOT
====================================== */

export default function PerdanaInstaller({
  isMobile,
  isTablet,
  onClose,
  onFinish,
}) {

  /* ======================================
     PAGE
  ====================================== */

  const [page, setPage] =
    useState('about');


  /* ======================================
     INSTALLATION PROGRESS
  ====================================== */

  const [progress, setProgress] =
    useState(0);


  /* ======================================
     START INSTALLATION
  ====================================== */

  const handleInstall = () => {

    setProgress(0);

    setPage('loading');

  };


  /* ======================================
     CANCEL
  ====================================== */

  const handleCancel = () => {

    onClose?.();

  };


  /* ======================================
     INSTALLATION PROGRESS
  ====================================== */

  useEffect(() => {

    if (page !== 'loading') {
      return;
    }


    setProgress(0);


    const interval = setInterval(() => {

      setProgress((current) => {

        if (current >= 100) {

          clearInterval(interval);

          return 100;

        }


        return current + 1;

      });

    }, 45);


    return () => {

      clearInterval(interval);

    };

  }, [page]);


  /* ======================================
     AUTO FINISH
  ====================================== */

  useEffect(() => {

    if (
      page !== 'loading' ||
      progress < 100
    ) {
      return;
    }


    const timeout =
      setTimeout(() => {

        onFinish?.();

      }, 800);


    return () => {

      clearTimeout(timeout);

    };

  }, [
    page,
    progress,
    onFinish,
  ]);


  /* ======================================
     RENDER
  ====================================== */

  return (

    <div
      className="ui-font"

      style={{
        position: 'fixed',

        left: '50%',

        top: isMobile
          ? '4%'
          : '50%',

        transform: isMobile
          ? 'translateX(-50%)'
          : 'translate(-50%, -50%)',

        width: isMobile
          ? '95vw'
          : isTablet
          ? '78vw'
          : '800px',

        maxWidth:
          'calc(100vw - 20px)',

        zIndex: 100000,

        boxSizing:
          'border-box',
      }}
    >

      {/* ======================================
          OUTER WINDOW
      ====================================== */}

      <Frame
        style={{
          width:
            '100%',

          height: isMobile
            ? '80vh'
            : isTablet
            ? '70vh'
            : '550px',

          maxHeight:
            'calc(100vh - 28px)',

          padding:
            3,

          background:
            '#c0c0c0',

          boxSizing:
            'border-box',

          display:
            'flex',

          flexDirection:
            'column',

          boxShadow: `
            inset -1px -1px #000000,
            inset 1px 1px #ffffff
          `,
        }}
      >

        {/* ======================================
            TITLE BAR
        ====================================== */}

        <div
          className="ui-font"

          style={{
            flexShrink:
              0,

            height:
              22,

            display:
              'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            padding:
              '2px 8px 6px 8px',

            background:
              '#000080',

            color:
              '#ffffff',

            fontSize:
              14,

            fontWeight:
              'bold',

            lineHeight:
              1,

            boxSizing:
              'border-box',

            userSelect:
              'none',

            whiteSpace:
              'nowrap',

            overflow:
              'hidden',

            textOverflow:
              'ellipsis',
          }}
        >
          Perdana&apos;s Computer Setup
        </div>


        {/* ======================================
            WINDOW BODY
        ====================================== */}

        <div
          style={{
            flex:
              '1 1 0',

            minWidth:
              0,

            minHeight:
              0,

            marginTop:
              3,

            background:
              '#c0c0c0',

            boxSizing:
              'border-box',

            display:
              'flex',

            flexDirection:
              'column',

            overflow:
              'hidden',
          }}
        >

          {/* ==================================
              ABOUT THIS COMPUTER
          ================================== */}

          {page === 'about' && (

            <>

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
                  className="installer-about-layout"

                  style={{
                    width:
                      '100%',

                    height:
                      '100%',

                    display:
                      'flex',

                    minWidth:
                      0,

                    minHeight:
                      0,

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

                    boxSizing:
                      'border-box',

                    overflow:
                      'hidden',
                  }}
                >

                  {/* ==============================
                      LEFT IMAGE
                  ============================== */}

                  <div
                    className="installer-about-image"

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
                        '#54A8A8',

                      display:
                        'flex',

                      alignItems:
                        'center',

                      justifyContent:
                        'center',

                      overflow:
                        'hidden',

            
                      boxSizing:
                        'border-box',
                    }}
                  >

                    <img
                      src={
                        win95installimg
                      }

                      alt="Perdana's Computer"

                      style={{
                        width:
                          '100%',

                        height:
                          '100%',

                        display:
                          'block',

                        objectFit:
                          'contain',

                        objectPosition:
                          'center',
                      }}
                    />

                  </div>


                  {/* ==============================
                      RIGHT CONTENT
                  ============================== */}

                  <main
                    className="reading-font installer-about-content"

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

                    <h2
                      className="ui-font"

                      style={{
                        margin:
                          0,

                        padding:
                          '0 0 10px',

                        fontSize:
                          18,

                        fontWeight:
                          'bold',

                        lineHeight:
                          '22px',

                        color:
                          '#000000',

                        borderBottom:
                          '1px solid #808080',
                      }}
                    >
                      About this Computer
                    </h2>


                    <p
                      className="reading-font"

                      style={{
                        margin:
                          '18px 0 0',

                        color:
                          '#000000',

                        textAlign:
                          'left',
                      }}
                    >
                      This is Perdana&apos;s personal computer — a place
                      to explore his work, experience, ideas, and
                      experiments.
                    </p>


                    <p
                      className="reading-font"

                      style={{
                        margin:
                          '12px 0 0',

                        color:
                          '#000000',

                        textAlign:
                          'left',
                      }}
                    >
                      Inside, you&apos;ll find work across visual design,
                      product design, UX, and design engineering.
                    </p>


                    <p
                      className="reading-font"

                      style={{
                        margin:
                          '18px 0 10px',

                        color:
                          '#000000',

                        textAlign:
                          'left',
                      }}
                    >
                      Inside Perdana&apos;s Computer, you&apos;ll find:
                    </p>


                    <div
                      className="reading-font"

                      style={{
                        display:
                          'flex',

                        flexDirection:
                          'column',

                        gap:
                          8,
                      }}
                    >

                      <FeatureLine>
                        Visual Design &amp; Systems
                      </FeatureLine>

                      <FeatureLine>
                        Product Design &amp; UX
                      </FeatureLine>

                      <FeatureLine>
                        Design Engineering &amp; Experiments
                      </FeatureLine>

                    </div>


                    <p
                      className="reading-font"

                      style={{
                        margin:
                          '20px 0 0',

                        color:
                          '#000000',
                      }}
                    >
                      Click <strong> Install </strong> to continue.
                    </p>

                  </main>

                </div>

              </div>


              {/* ==============================
                  ABOUT FOOTER

                  NO PROGRESS BAR
              ============================== */}

              <footer
                className="ui-font"

                style={{
                  flexShrink:
                    0,

                  minWidth:
                    0,

                  padding:
                    '10px 12px 10px',

                  boxSizing:
                    'border-box',

                  background:
                    '#c0c0c0',

                  color:
                    '#000000',

                  display:
                    'flex',

                  justifyContent:
                    'flex-end',

                  alignItems:
                    'center',

                  gap:
                    6,
                }}
              >

                <Button
                  onClick={
                    handleCancel
                  }

                  className="ui-font"

                  style={{
                    minWidth:
                      90,

                    boxSizing:
                      'border-box',
                  }}
                >
               <strong><u>C</u>ancel</strong> 
                </Button>


                <Button
                  onClick={
                    handleInstall
                  }

                  className="ui-font"

                  style={{
                    minWidth:
                      90,

                    boxSizing:
                      'border-box',
                  }}
                >

                  <strong>
                  <u>In</u>stall
                  </strong>

                </Button>

              </footer>

            </>

          )}


          {/* ==================================
              INSTALLING
          ================================== */}

          {page === 'loading' && (

<InstallerLoadingFirstBoot
  progress={progress}
  isMobile={isMobile}
  isTablet={isTablet}
/>

          )}

        </div>

      </Frame>


      {/* ======================================
          RESPONSIVE
      ====================================== */}

      <style>
        {`

          @media (max-width: 600px) {

            .installer-about-layout {

              flex-direction:
                column !important;

            }


            .installer-about-image {

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


            .installer-about-content {

              padding:
                16px 18px 20px !important;

            }

          }

        `}
      </style>

    </div>

  );

}


/* ======================================
   FEATURE LINE
====================================== */

function FeatureLine({
  children,
}) {

  return (

    <div
      className="reading-font"

      style={{
        display:
          'flex',

        alignItems:
          'center',

        gap:
          9,

        minHeight:
          20,

        color:
          '#000000',
      }}
    >

      {/* WINDOWS CHECKBOX */}

      <span
        aria-hidden="true"

        style={{
          position:
            'relative',

          width:
            13,

          height:
            13,

          flexShrink:
            0,

          background:
            '#ffffff',

          borderTop:
            '0.5px solid #808080',

          borderLeft:
            '0.5px solid #808080',

          borderRight:
            '0.5px solid #ffffff',

          borderBottom:
            '0.5px solid #ffffff',

          boxShadow: `
            inset 1px 1px 0 #000000,
            inset -1px -1px 0 #dfdfdf
          `,

          boxSizing:
            'border-box',
        }}
      >

        <span
          style={{
            position:
              'absolute',

            width:
              4,

            height:
              8,

            left:
              3,

            top:
              1,

            borderRight:
              '2px solid #000000',

            borderBottom:
              '2px solid #000000',

            transform:
              'rotate(45deg)',

            boxSizing:
              'border-box',
          }}
        />

      </span>


      <strong>
        {children}
      </strong>

    </div>

  );

}
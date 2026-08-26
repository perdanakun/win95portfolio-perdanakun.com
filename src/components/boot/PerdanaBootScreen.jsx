import React, { useEffect, useState } from 'react';

/* ============================================================
   BIOS POST
   ============================================================ */

const BIOS_LINES = [
  {
    t: 'PERDANA PC SYSTEMS',
    bright: true,
    bold: true,
  },

  {
    t: 'Award Modular BIOS v4.51PG',
  },

  {
    t: 'Copyright (C) 1984-1997, Award Software, Inc.',
  },

  {
    t: 'PRDN-686BX BIOS V1.00',
  },

  {
    t: '',
  },

  {
    t: 'Pentium(R) II CPU at 233MHz',
    bright: true,
  },

  {
    t: 'Memory Test :',
    bright: true,
    memory: true,
  },

  {
    t: '',
  },

  {
    t: 'Primary Master : PERDANA 4.1GB',
  },

  {
    t: 'Primary Slave  : None',
  },

  {
    t: 'Secondary Master : ATAPI CD-ROM',
  },

  {
    t: '',
  },

  {
    t: 'Award Plug and Play BIOS Extension v1.0A',
  },

  {
    t: 'Detecting IDE Primary Master ...',
  },

  {
    t: 'Detecting IDE Secondary Master ...',
  },

  {
    t: '',
  },

  {
    t: 'Initializing Plug and Play Cards ...',
    bright: true,
  },

  {
    t: 'Verifying DMI Pool Data ...',
  },

  {
    t: 'Update Success',
    bright: true,
  },
];


/* ============================================================
   MAIN
   ============================================================ */

export default function PerdanaBootScreen({
  onBootComplete,
}) {
  const [phase, setPhase] = useState('bios');

  const [biosCount, setBiosCount] = useState(0);

  const [memory, setMemory] = useState(0);

  const [cursor, setCursor] = useState(true);

  const responsiveMode = useResponsiveMode();

  const compactScale = useCompactScale();


  /* ==========================================================
     BIOS POST
     
     0 → 4 detik
     ========================================================== */

  useEffect(() => {
    if (phase !== 'bios') {
      return;
    }

    const total = BIOS_LINES.length;

    const interval = 4000 / total;

    const timer = setInterval(() => {
      setBiosCount((current) => {
        if (current >= total) {
          clearInterval(timer);

          return total;
        }

        return current + 1;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [phase]);


  /* ==========================================================
     MEMORY TEST
     
     0K → 65536K
     
     Berjalan selama BIOS POST.
     ========================================================== */

  useEffect(() => {
    if (phase !== 'bios') {
      return;
    }

    const timer = setInterval(() => {
      setMemory((current) => {
        if (current >= 65536) {
          clearInterval(timer);

          return 65536;
        }

        return Math.min(
          current + 2048,
          65536
        );
      });
    }, 115);

    return () => {
      clearInterval(timer);
    };
  }, [phase]);


  /* ==========================================================
     BIOS → WINDOWS STARTING
     
     Tepat 4 detik.
     ========================================================== */

  useEffect(() => {
    if (phase !== 'bios') {
      return;
    }

    const timer = setTimeout(() => {
      setPhase('windows');
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [phase]);


  /* ==========================================================
     WINDOWS STARTING → COMPLETE
     
     4 → 6 detik
     ========================================================== */

  useEffect(() => {
    if (phase !== 'windows') {
      return;
    }

    const timer = setTimeout(() => {
      onBootComplete?.();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [phase, onBootComplete]);


  /* ==========================================================
     CURSOR / DOT BLINK
     ========================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setCursor((current) => !current);
    }, 420);

    return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <div
      className={[
        'perdana-boot-root',

        responsiveMode === 'desktop'
          ? 'desktop-mode'
          : 'compact-mode',
      ].join(' ')}
    >

      <div className="vga-viewport">

        <div
          className={[
            'vga-screen',

            responsiveMode === 'desktop'
              ? 'desktop-screen'
              : 'compact-screen',
          ].join(' ')}

          style={
            responsiveMode === 'desktop'
              ? undefined
              : {
                  transform:
                    `translate3d(-50%, -50%, 0) scale(${compactScale})`,
                }
          }
        >

          {/* ==================================================
              BIOS
              ================================================== */}

          {phase === 'bios' && (
            <BIOSScreen
              lines={BIOS_LINES.slice(
                0,
                biosCount
              )}
              memory={memory}
            />
          )}


          {/* ==================================================
              WINDOWS 95 STARTING
              ================================================== */}

          {phase === 'windows' && (
            <Windows95Starting
              cursor={cursor}
            />
          )}

        </div>

      </div>


      <style>{`

        /* =====================================================
           GLOBAL
           ===================================================== */

        html,
        body,
        #root {
          margin: 0;
          padding: 0;

          width: 100%;
          height: 100%;

          background: #000;

          overflow: hidden;
        }


        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }


        /* =====================================================
           ROOT
           ===================================================== */

        .perdana-boot-root {
          position: fixed;

          inset: 0;

          width: 100vw;
          height: 100vh;

          background: #000;

          overflow: hidden;

          user-select: none;

          touch-action: none;
        }


        /* =====================================================
           VIEWPORT
           ===================================================== */

        .vga-viewport {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          overflow: hidden;

          background: #000;
        }


        /* =====================================================
           COMPACT SCREEN
           
           Virtual VGA:
           640 × 480
           ===================================================== */

        .compact-screen {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 640px;
          height: 480px;

          transform-origin:
            center center;

          background: #000;

          overflow: hidden;

          image-rendering: pixelated;

          font-synthesis: none;

          -webkit-font-smoothing: none;

          -moz-osx-font-smoothing: grayscale;

          backface-visibility: hidden;

          will-change: transform;
        }


        /* =====================================================
           DESKTOP
           ===================================================== */

        .desktop-screen {
          position: absolute;

          inset: 0;

          width: 100vw;
          height: 100vh;

          background: #000;

          overflow: hidden;

          image-rendering: pixelated;

          font-synthesis: none;

          -webkit-font-smoothing: none;

          -moz-osx-font-smoothing: grayscale;

          backface-visibility: hidden;
        }

      `}</style>

    </div>
  );
}


/* ============================================================
   BIOS SCREEN
   ============================================================ */

function BIOSScreen({
  lines,
  memory,
}) {
  return (
    <div className="bios-screen">

      {/* ======================================================
          BIOS CONTENT
          ====================================================== */}

      <div className="bios-content">

        {lines.map((line, index) => {

          /* ==================================================
             MEMORY TEST
             ================================================== */

          if (line.memory) {
            return (
              <div
                key={index}
                className="bios-line bios-bright"
              >

                <span>
                  {line.t}
                </span>

                {' '}

                <span className="memory-value">
                  {memory}K
                </span>

                {' '}

                <span className="memory-ok">
                  OK
                </span>

              </div>
            );
          }


          /* ==================================================
             NORMAL BIOS LINE
             ================================================== */

          return (
            <div
              key={index}
              className={[
                'bios-line',

                line.bright
                  ? 'bios-bright'
                  : '',

                line.bold
                  ? 'bios-bold'
                  : '',
              ].join(' ')}
            >
              {line.t}
            </div>
          );
        })}

      </div>


      {/* ======================================================
          EPA POLLUTION PREVENTER
          ====================================================== */}

      <EPAEnergyStar />


      {/* ======================================================
          SETUP PROMPT
          ====================================================== */}

      <div className="bios-setup">
        Press DEL to enter SETUP
      </div>


      {/* ======================================================
          BIOS IDENTIFICATION
          ====================================================== */}

      <div className="bios-bottom">
        13/01/1998-i440BX-2A69KP3AC-00
      </div>


      <style>{`

        /* =====================================================
           BIOS BASE
           ===================================================== */

        .bios-screen {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          background: #000;

          color: #c0c0c0;

          font-family:
            "PxPlus IBM VGA8",
            "Perfect DOS VGA 437",
            "IBM VGA",
            monospace;

          font-weight: normal;

          font-synthesis: none;

          white-space: pre;

          text-align: left;

          overflow: hidden;

          /*
           * Penting:
           * tidak ada tracking tambahan.
           */
          letter-spacing: 0;

          word-spacing: 0;

          /*
           * Bitmap / CRT style.
           */
          -webkit-font-smoothing: none;

          -moz-osx-font-smoothing: grayscale;

          text-rendering: geometricPrecision;
        }


        /* =====================================================
           COMPACT BIOS
           ===================================================== */

.compact-mode .bios-screen {
  font-size: 16px;
  line-height: 17px;
}


        .compact-mode .bios-content {
          position: absolute;

          left: 16px;
          top: 14px;

          width: 608px;
        }


.compact-mode .bios-line {
  width: 608px;

  height: 17px;
  line-height: 17px;

  color: #c0c0c0;

  font-weight: normal;

  letter-spacing: 0;
  word-spacing: 0;
}


        /* =====================================================
           BRIGHT
           ===================================================== */

        .bios-bright {
          color: #fff;
        }


        .bios-bold {
          font-weight: bold;
        }


        .memory-value {
          color: #fff;
        }


        .memory-ok {
          color: #fff;
        }


        /* =====================================================
           DESKTOP BIOS
           ===================================================== */

        .desktop-mode .bios-screen {
          font-size:
            clamp(
              18px,
              1.05vw,
              26px
            );

          line-height:
            1.05;

          padding:
            3vh 2.5vw;

          letter-spacing: 0;

          word-spacing: 0;
        }


        .desktop-mode .bios-content {
          position: relative;

          left: auto;
          top: auto;

          width: 100%;
        }


        .desktop-mode .bios-line {
          width: 100%;

          height: 1.05em;

          line-height: 1.05em;

          color: #c0c0c0;

          font-weight: normal;

          letter-spacing: 0;
        }


        /* =====================================================
           SETUP PROMPT
           ===================================================== */

        .bios-setup {
          position: absolute;

          left: 16px;
          bottom: 34px;

          color: #fff;

          font-size: 16px;

          line-height: 16px;

          white-space: nowrap;

          letter-spacing: 0;
        }


        .desktop-mode .bios-setup {
          left: 2.5vw;

          bottom: 6vh;

          font-size:
            clamp(
              18px,
              1.05vw,
              26px
            );

          line-height: 1;

          letter-spacing: 0;
        }


        /* =====================================================
           BIOS ID
           ===================================================== */

        .bios-bottom {
          position: absolute;

          left: 16px;
          bottom: 16px;

          height: 16px;

          line-height: 16px;

          color: #c0c0c0;

          font-size: 16px;

          white-space: nowrap;

          letter-spacing: 0;
        }


        .desktop-mode .bios-bottom {
          left: 2.5vw;

          bottom: 3vh;

          height: 1em;

          line-height: 1em;

          font-size:
            clamp(
              18px,
              1.05vw,
              26px
            );

          letter-spacing: 0;
        }

      `}</style>

    </div>
  );
}


/* ============================================================
   EPA POLLUTION PREVENTER
   ============================================================ */

function EPAEnergyStar() {
  return (
    <div
      className="epa-area"
      aria-hidden="true"
    >

      <div className="epa-star">
        ★
      </div>

      <div className="epa-line">
        EPA POLLUTION
      </div>

      <div className="epa-line">
        PREVENTER
      </div>


      <style>{`

        /* =====================================================
           EPA BASE
           ===================================================== */

        .epa-area {
          position: absolute;

          color: #c0c0c0;

          text-align: center;

          white-space: nowrap;

          letter-spacing: 0;

          word-spacing: 0;
        }


        /* =====================================================
           COMPACT
           ===================================================== */

        .compact-mode .epa-area {
          top: 17px;
          right: 18px;

          width: 132px;

          font-family:
            "PxPlus IBM VGA8",
            "Perfect DOS VGA 437",
            monospace;

          font-size: 11px;

          line-height: 12px;

          letter-spacing: 0;

          word-spacing: 0;
        }


        .compact-mode .epa-star {
          width: 48px;
          height: 40px;

          margin:
            0 auto 2px;

          display: flex;

          align-items: center;
          justify-content: center;

          font-family:
            Arial,
            sans-serif;

          font-size: 34px;

          line-height: 34px;

          transform:
            rotate(-8deg);
        }


        .epa-line {
          height: 1.1em;

          line-height: 1.1em;

          color: #c0c0c0;

          letter-spacing: 0;
        }


        /* =====================================================
           DESKTOP
           ===================================================== */

        .desktop-mode .epa-area {
          top: 4vh;
          right: 3vw;

          width: 190px;

          font-family:
            "PxPlus IBM VGA8",
            "Perfect DOS VGA 437",
            monospace;

          font-size:
            clamp(
              14px,
              0.9vw,
              22px
            );

          line-height: 1.1em;

          letter-spacing: 0;
        }


        .desktop-mode .epa-star {
          width: 70px;
          height: 58px;

          margin:
            0 auto 4px;

          display: flex;

          align-items: center;
          justify-content: center;

          font-family:
            Arial,
            sans-serif;

          font-size:
            clamp(
              42px,
              3vw,
              70px
            );

          line-height: 1;

          transform:
            rotate(-8deg);
        }

      `}</style>

    </div>
  );
}

/* ============================================================
   WINDOWS 95 STARTING
   ============================================================ */

function Windows95Starting({
  cursor,
}) {
  return (
    <div className="windows-starting">

      <div className="windows-starting-text">
        Starting Perdana's Computer Windows 95
      </div>

      <div className="windows-underscore">
        {cursor ? '_' : ' '}
      </div>


      <style>{`

        /* =====================================================
           WINDOWS STARTING BASE
           ===================================================== */

        .windows-starting {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          background: #000;

          color: #fff;

          font-family:
            "PxPlus IBM VGA8",
            "Perfect DOS VGA 437",
            monospace;

          font-size: 16px;

          line-height: 16px;

          letter-spacing: 0;

          word-spacing: 0;

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          justify-content: flex-start;

          padding: 16px;

          white-space: pre;

          -webkit-font-smoothing: none;

          -moz-osx-font-smoothing: grayscale;
        }


        /* =====================================================
           STARTING TEXT
           ===================================================== */

        .windows-starting-text {
          color: #fff;

          white-space: pre;

          height: 16px;

          line-height: 16px;
        }


        /* =====================================================
           BLINKING UNDERSCORE
           ===================================================== */

        .windows-underscore {
          color: #fff;

          width: 16px;

          height: 16px;

          line-height: 16px;

          white-space: pre;
        }


        /* =====================================================
           DESKTOP
           ===================================================== */

        .desktop-mode .windows-starting {
          font-size:
            clamp(
              18px,
              1.05vw,
              26px
            );

          line-height: 1.05;

          padding:
            3vh 2.5vw;
        }


        .desktop-mode .windows-starting-text {
          height: 1.05em;

          line-height: 1.05;
        }


        .desktop-mode .windows-underscore {
          width: 1em;

          height: 1.05em;

          line-height: 1.05;
        }

      `}</style>

    </div>
  );
}
/* ============================================================
   RESPONSIVE MODE
   ============================================================ */

function useResponsiveMode() {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') {
      return 'mobile';
    }

    return window.innerWidth > 1200
      ? 'desktop'
      : 'compact';
  });


  useEffect(() => {
    const updateMode = () => {
      setMode(
        window.innerWidth > 1200
          ? 'desktop'
          : 'compact'
      );
    };


    updateMode();


    window.addEventListener(
      'resize',
      updateMode
    );

    window.addEventListener(
      'orientationchange',
      updateMode
    );


    return () => {
      window.removeEventListener(
        'resize',
        updateMode
      );

      window.removeEventListener(
        'orientationchange',
        updateMode
      );
    };
  }, []);


  return mode;
}


/* ============================================================
   COMPACT SCALE
   ============================================================ */

function useCompactScale() {
  const [scale, setScale] = useState(() => {
    if (typeof window === 'undefined') {
      return 1;
    }

    return Math.min(
      window.innerWidth / 640,
      window.innerHeight / 480,
      2
    );
  });


  useEffect(() => {
    const updateScale = () => {
      const widthScale =
        window.innerWidth / 640;

      const heightScale =
        window.innerHeight / 480;

      setScale(
        Math.min(
          widthScale,
          heightScale,
          2
        )
      );
    };


    updateScale();


    window.addEventListener(
      'resize',
      updateScale
    );

    window.addEventListener(
      'orientationchange',
      updateScale
    );


    return () => {
      window.removeEventListener(
        'resize',
        updateScale
      );

      window.removeEventListener(
        'orientationchange',
        updateScale
      );
    };
  }, []);


  return scale;
}
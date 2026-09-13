import React from 'react';
import { useClippy } from '@react95/clippy';


/* ======================================
   RANDOM IDLE MESSAGES
====================================== */

const RANDOM_MESSAGES = [
  {
    text:
      'Need a hand? Try opening My Projects to see the actual work.',
  },
  {
    text:
      "perdana.ai is useful if you'd rather ask than browse everything.",
  },
  {
    text:
      "About is the quickest way to understand who Perdana is and what he's exploring.",
  },
  {
    text:
      'Inbox lets you send Perdana a message without leaving the desktop.',
  },
  {
    text:
      "The Installer isn't just decoration. It's part of the portfolio experience.",
  },
  {
    text:
      'You can open several windows at once. This is a computer, after all.',
  },
  {
    text:
      "Curious what changed recently? Check What's New.",
  },
  {
    text:
      'Some parts of this desktop are useful. Some are here because clicking things is fun.',
  },
  {
    text:
      "Yes, I'm still here.",
  },
  {
    text:
      "I wouldn't ignore the Recycle Bin forever.",
  },
  {
    text:
      'This portfolio works more like a computer than a traditional scrolling website. Feel free to look around.',
  },
  {
    text:
      "If you're looking for case studies, My Projects is probably where you want to go.",
  },
  {
    text:
      'Not sure where to start? About for the person. My Projects for the work. perdana.ai for questions.',
  },
  {
    text:
      'Perdana built this portfolio as an interactive design-in-code experiment.',
  },
];


/* ======================================
   TIMING
====================================== */

/*
 * FIRST APPEAR
 * → 1.2 sec
 *
 * INITIAL ENTRANCE
 * → right → left
 * → 800 ms
 *
 * NORMAL AI POSITION CHANGE
 * → 650 ms
 *
 * MESSAGE
 * → ±5.5–7.5 sec
 *
 * NEXT CHATTER
 * → random 4–6 sec
 */

const FIRST_APPEAR_DELAY = 1200;

const RANDOM_MIN_DELAY = 4000;
const RANDOM_MAX_EXTRA_DELAY = 2000;

const MIN_MESSAGE_VISIBLE = 5500;
const MAX_MESSAGE_VISIBLE = 7500;

const INITIAL_MOVE_DURATION = 800;
const MOVE_DURATION = 650;

const INITIAL_MOVE_START_DELAY = 60;
const SPEECH_AFTER_MOVE_DELAY = 120;
const NORMAL_SPEECH_DELAY = 120;

const TASKBAR_HEIGHT = 28;


/* ======================================
   MESSAGE DURATION
====================================== */

function getMessageVisibleDuration(text) {
  const wordCount =
    text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  const calculated =
    3600 +
    wordCount * 180;

  return Math.min(
    MAX_MESSAGE_VISIBLE,
    Math.max(
      MIN_MESSAGE_VISIBLE,
      calculated
    )
  );
}


/* ======================================
   CLIPPY POSITION
====================================== */

function getClippyPosition({
  aiChatOpen = false,
  isTablet = false,
} = {}) {
  const width =
    window.innerWidth;

  const height =
    window.innerHeight;


  // =====================================
  // SMARTPHONE
  // =====================================

  if (width <= 600) {
    return {
      x: Math.max(
        8,
        width - 108
      ),

      y: Math.max(
        80,
        height -
          TASKBAR_HEIGHT -
          110
      ),
    };
  }


  // =====================================
  // AI CHAT OPEN
  // → LEFT BOTTOM
  // =====================================

  if (aiChatOpen) {
    if (isTablet) {
      return {
        x: 12,

        y: Math.max(
          90,
          height -
            TASKBAR_HEIGHT -
            112
        ),
      };
    }


    return {
      x: 12,

      y: Math.max(
        90,
        height -
          TASKBAR_HEIGHT -
          110
      ),
    };
  }


  // =====================================
  // AI CHAT CLOSED
  // TABLET → RIGHT BOTTOM
  // =====================================

  if (width <= 1024) {
    return {
      x: Math.max(
        8,
        width - 110
      ),

      y: Math.max(
        90,
        height -
          TASKBAR_HEIGHT -
          112
      ),
    };
  }


  // =====================================
  // DESKTOP → RIGHT BOTTOM
  //
  // ±10px dari kanan
  // ±10px dari atas taskbar.
  // =====================================

  return {
    x: Math.max(
      8,
      width - 110
    ),

    y: Math.max(
      90,
      height -
        TASKBAR_HEIGHT -
        110
    ),
  };
}


/* ======================================
   CLIPPY ASSISTANT
====================================== */

export default function ClippyAssistant({
  pcScreen,
  isMobile,
  isTablet,
  windows,
  desktopInstallerVisible,
  hasBlockingDesktopWindow = false,
}) {
  const { clippy } =
    useClippy();


  /* ======================================
     BALLOON SPEED
  ====================================== */

  React.useEffect(() => {
    if (!clippy?._balloon) {
      return;
    }

    clippy._balloon.WORD_SPEAK_TIME =
      80;
  }, [clippy]);


  /* ======================================
     REFS
  ====================================== */

  const lastRandomIndex =
    React.useRef(-1);

  const appearTimerRef =
    React.useRef(null);

  const moveStartTimerRef =
    React.useRef(null);

  const speechTimerRef =
    React.useRef(null);

  const restoreSpeechTimerRef =
    React.useRef(null);

  const hideTimerRef =
    React.useRef(null);


  const isClippyVisibleRef =
    React.useRef(false);


  const currentMessageRef =
    React.useRef(null);


  /*
   * First entrance hanya sekali
   * selama component hidup.
   *
   * Jadi repeat chatter tidak terus:
   * kanan → kiri → kanan → kiri.
   */
  const hasPlayedInitialEntranceRef =
    React.useRef(false);


  /*
   * Mencegah timeout lifecycle lama
   * bekerja setelah state berubah.
   */
  const lifecycleIdRef =
    React.useRef(0);


  /*
   * Position state disimpan via ref.
   *
   * AI Chat berubah tidak menyebabkan
   * main chatter lifecycle restart.
   */
  const aiChatOpenRef =
    React.useRef(
      Boolean(
        windows?.aiAssistant
      )
    );

  const isTabletRef =
    React.useRef(isTablet);


  /* ======================================
     AI CHAT STATE
  ====================================== */

  const aiChatOpen =
    Boolean(
      windows?.aiAssistant
    );


  React.useEffect(() => {
    aiChatOpenRef.current =
      aiChatOpen;
  }, [aiChatOpen]);


  React.useEffect(() => {
    isTabletRef.current =
      isTablet;
  }, [isTablet]);


  /* ======================================
     BLOCKING WINDOWS
  ====================================== */

  /*
   * AI Assistant sengaja EXCLUDED.
   *
   * AI Chat boleh coexist dengan Clippy.
   */

  const hasOtherWindowOpen =
    Boolean(
      windows &&
        Object.entries(
          windows
        ).some(
          ([key, value]) =>
            key !== 'aiAssistant' &&
            Boolean(value)
        )
    );


  const blockingWindowOpen =
    Boolean(
      hasOtherWindowOpen ||
        hasBlockingDesktopWindow
    );


  /* ======================================
     DESKTOP READY
  ====================================== */

  const desktopReady =
    Boolean(
      clippy &&
        pcScreen === 'desktop' &&
        !desktopInstallerVisible &&
        !windows?.welcome
    );


  /* ======================================
     FINAL PERMISSION
  ====================================== */

  const clippyAllowed =
    Boolean(
      desktopReady &&
        !blockingWindowOpen &&
        !isMobile
    );


  /* ======================================
     CLEAR TIMERS
  ====================================== */

  const clearTimers =
    React.useCallback(() => {
      if (
        appearTimerRef.current
      ) {
        window.clearTimeout(
          appearTimerRef.current
        );

        appearTimerRef.current =
          null;
      }


      if (
        moveStartTimerRef.current
      ) {
        window.clearTimeout(
          moveStartTimerRef.current
        );

        moveStartTimerRef.current =
          null;
      }


      if (
        speechTimerRef.current
      ) {
        window.clearTimeout(
          speechTimerRef.current
        );

        speechTimerRef.current =
          null;
      }


      if (
        restoreSpeechTimerRef.current
      ) {
        window.clearTimeout(
          restoreSpeechTimerRef.current
        );

        restoreSpeechTimerRef.current =
          null;
      }


      if (
        hideTimerRef.current
      ) {
        window.clearTimeout(
          hideTimerRef.current
        );

        hideTimerRef.current =
          null;
      }
    }, []);


  /* ======================================
     POSITION HELPERS
  ====================================== */

  const moveClippy =
    React.useCallback(
      (
        duration = MOVE_DURATION,
        aiChatOverride = null
      ) => {
        if (!clippy) {
          return;
        }


        const currentAiState =
          aiChatOverride !== null
            ? aiChatOverride
            : aiChatOpenRef.current;


        const position =
          getClippyPosition({
            aiChatOpen:
              currentAiState,

            isTablet:
              isTabletRef.current,
          });


        clippy.moveTo(
          position.x,
          position.y,
          duration
        );
      },

      [clippy]
    );


  /*
   * Position langsung tanpa animation.
   *
   * false = right bottom
   * true  = left bottom
   */

  const setClippyPosition =
    React.useCallback(
      (aiChatState) => {
        if (!clippy) {
          return;
        }


        const position =
          getClippyPosition({
            aiChatOpen:
              aiChatState,

            isTablet:
              isTabletRef.current,
          });


        clippy.moveTo(
          position.x,
          position.y,
          0
        );
      },

      [clippy]
    );


  /* ======================================
     RANDOM MESSAGE
  ====================================== */

  const getRandomMessage =
    React.useCallback(() => {
      let nextIndex = 0;


      do {
        nextIndex =
          Math.floor(
            Math.random() *
              RANDOM_MESSAGES.length
          );
      } while (
        RANDOM_MESSAGES.length > 1 &&
        nextIndex ===
          lastRandomIndex.current
      );


      lastRandomIndex.current =
        nextIndex;


      return RANDOM_MESSAGES[
        nextIndex
      ];
    }, []);


  /* ======================================
     FORCE HIDE
  ====================================== */

  const hideClippy =
    React.useCallback(() => {
      if (!clippy) {
        return;
      }


      clippy.stop?.();

      clippy.hide?.();


      isClippyVisibleRef.current =
        false;


      currentMessageRef.current =
        null;
    }, [clippy]);


  /* ======================================
     CSS
  ====================================== */

  React.useEffect(() => {
    const styleId =
      'perdana-clippy-style';


    if (
      document.getElementById(
        styleId
      )
    ) {
      return undefined;
    }


    const style =
      document.createElement(
        'style'
      );


    style.id =
      styleId;


    style.textContent = `
      .clippy {
        pointer-events: none !important;
        z-index: 10 !important;
      }

      .clippy-balloon {
        pointer-events: none !important;
        z-index: 11 !important;
      }

      .clippy-content {
        font-family:
          "MS Sans Serif",
          "Microsoft Sans Serif",
          Arial,
          sans-serif !important;

        font-size: 11px !important;
        line-height: 13px !important;
      }

      .clippy-balloon div[style*="max-width: 200px"] {
        height: auto !important;

        font-family:
          "Microsoft Sans",
          "MS Sans Serif",
          sans-serif !important;

        font-size: 10pt !important;
        line-height: 13px !important;

        letter-spacing: 0 !important;
      }
    `;


    document.head.appendChild(
      style
    );


    return () => {
      document
        .getElementById(
          styleId
        )
        ?.remove();
    };
  }, []);


  /* ======================================
     MAIN CHATTER LIFECYCLE
  ====================================== */

  React.useEffect(() => {
    const lifecycleId =
      ++lifecycleIdRef.current;


    clearTimers();


    /* ==================================
       NOT ALLOWED
    ================================== */

    if (
      !clippy ||
      !clippyAllowed
    ) {
      hideClippy();

      return undefined;
    }


    let firstAppearance =
      true;


    /* ==================================
       VALIDITY
    ================================== */

    const lifecycleStillValid =
      () =>
        lifecycleIdRef.current ===
          lifecycleId &&
        clippyAllowed;


    /* ==================================
       SCHEDULE
    ================================== */

    const scheduleNextAppearance =
      () => {
        if (
          !lifecycleStillValid()
        ) {
          return;
        }


        const delay =
          firstAppearance
            ? FIRST_APPEAR_DELAY
            : RANDOM_MIN_DELAY +
              Math.random() *
                RANDOM_MAX_EXTRA_DELAY;


        appearTimerRef.current =
          window.setTimeout(
            () => {
              appearTimerRef.current =
                null;

              showClippy();
            },

            delay
          );
      };


    /* ==================================
       SHOW
    ================================== */

    const showClippy =
      () => {
        if (
          !lifecycleStillValid()
        ) {
          return;
        }


        clippy.stop?.();


        /*
         * Apakah ini entrance pertama
         * dan AI Chat sedang open?
         */

        const shouldPlayEntrance =
          !hasPlayedInitialEntranceRef.current &&
          aiChatOpenRef.current;


        /*
         * Pilih message SEKALI.
         */

        const item =
          getRandomMessage();


        currentMessageRef.current =
          item.text;


        const messageDuration =
          getMessageVisibleDuration(
            item.text
          );


        /* =================================
           INITIAL AI CHAT ENTRANCE

           RIGHT
             ↓
           SHOW
             ↓
           MOVE LEFT
             ↓
           SPEAK
        ================================= */

        if (shouldPlayEntrance) {
          /*
           * Mulai dari RIGHT BOTTOM,
           * walaupun AI Chat sedang open.
           */

          setClippyPosition(false);


          clippy.show(true);


          isClippyVisibleRef.current =
            true;


          hasPlayedInitialEntranceRef.current =
            true;


          /*
           * Sedikit jeda supaya initial
           * right position sudah ter-render.
           */

          moveStartTimerRef.current =
            window.setTimeout(
              () => {
                moveStartTimerRef.current =
                  null;


                if (
                  !lifecycleStillValid() ||
                  !isClippyVisibleRef.current
                ) {
                  return;
                }


                /*
                 * RIGHT → LEFT
                 */

                moveClippy(
                  INITIAL_MOVE_DURATION,
                  true
                );
              },

              INITIAL_MOVE_START_DELAY
            );


          /*
           * Balloon muncul setelah
           * movement selesai.
           */

          const speechDelay =
            INITIAL_MOVE_START_DELAY +
            INITIAL_MOVE_DURATION +
            SPEECH_AFTER_MOVE_DELAY;


          speechTimerRef.current =
            window.setTimeout(
              () => {
                speechTimerRef.current =
                  null;


                if (
                  !lifecycleStillValid() ||
                  !isClippyVisibleRef.current
                ) {
                  return;
                }


                clippy.speak(
                  item.text,
                  true
                );
              },

              speechDelay
            );


          /*
           * Hide dihitung setelah speech.
           */

          hideTimerRef.current =
            window.setTimeout(
              () => {
                hideTimerRef.current =
                  null;


                if (
                  !lifecycleStillValid()
                ) {
                  return;
                }


                clippy.stop?.();

                clippy.hide?.();


                isClippyVisibleRef.current =
                  false;


                currentMessageRef.current =
                  null;


                firstAppearance =
                  false;


                scheduleNextAppearance();
              },

              speechDelay +
                messageDuration
            );


          return;
        }


        /* =================================
           NORMAL APPEARANCE

           Langsung muncul pada posisi
           yang benar.
        ================================= */

        setClippyPosition(
          aiChatOpenRef.current
        );


        clippy.show(true);


        isClippyVisibleRef.current =
          true;


        speechTimerRef.current =
          window.setTimeout(
            () => {
              speechTimerRef.current =
                null;


              if (
                !lifecycleStillValid() ||
                !isClippyVisibleRef.current
              ) {
                return;
              }


              clippy.speak(
                item.text,
                true
              );
            },

            NORMAL_SPEECH_DELAY
          );


        hideTimerRef.current =
          window.setTimeout(
            () => {
              hideTimerRef.current =
                null;


              if (
                !lifecycleStillValid()
              ) {
                return;
              }


              clippy.stop?.();

              clippy.hide?.();


              isClippyVisibleRef.current =
                false;


              currentMessageRef.current =
                null;


              firstAppearance =
                false;


              scheduleNextAppearance();
            },

            NORMAL_SPEECH_DELAY +
              messageDuration
          );
      };


    /* ==================================
       START
    ================================== */

    scheduleNextAppearance();


    /* ==================================
       CLEANUP
    ================================== */

    return () => {
      lifecycleIdRef.current += 1;

      clearTimers();
    };
  }, [
    clippy,
    clippyAllowed,
    clearTimers,
    hideClippy,
    moveClippy,
    setClippyPosition,
    getRandomMessage,
  ]);


  /* ======================================
     AI CHAT POSITION CHANGE

     OPEN  → MOVE LEFT
     CLOSE → MOVE RIGHT

     Tidak restart main lifecycle.
  ====================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      !desktopReady ||
      blockingWindowOpen ||
      !isClippyVisibleRef.current
    ) {
      return undefined;
    }


    /*
     * Initial entrance punya movement
     * sendiri.
     *
     * Jangan ganggu entrance pertama
     * sebelum selesai.
     */

    if (
      !hasPlayedInitialEntranceRef.current
    ) {
      return undefined;
    }


    /*
     * Kalau ada pending speech,
     * hentikan timer.
     *
     * Kita restore setelah movement.
     */

    if (
      speechTimerRef.current
    ) {
      window.clearTimeout(
        speechTimerRef.current
      );

      speechTimerRef.current =
        null;
    }


    if (
      restoreSpeechTimerRef.current
    ) {
      window.clearTimeout(
        restoreSpeechTimerRef.current
      );

      restoreSpeechTimerRef.current =
        null;
    }


    const currentMessage =
      currentMessageRef.current;


    /*
     * speak(..., true) bisa menahan queue.
     *
     * Jadi:
     *
     * stop speech
     * → keep visible
     * → move
     * → restore balloon
     */

    clippy.stop?.();


    clippy.show(true);


    isClippyVisibleRef.current =
      true;


    /*
     * AI Chat true
     * → LEFT
     *
     * AI Chat false
     * → RIGHT
     */

    moveClippy(
      MOVE_DURATION,
      aiChatOpen
    );


    if (!currentMessage) {
      return undefined;
    }


    restoreSpeechTimerRef.current =
      window.setTimeout(
        () => {
          restoreSpeechTimerRef.current =
            null;


          if (
            !clippy ||
            !desktopReady ||
            blockingWindowOpen ||
            !isClippyVisibleRef.current
          ) {
            return;
          }


          clippy.speak(
            currentMessage,
            true
          );
        },

        MOVE_DURATION +
          SPEECH_AFTER_MOVE_DELAY
      );


    return () => {
      if (
        restoreSpeechTimerRef.current
      ) {
        window.clearTimeout(
          restoreSpeechTimerRef.current
        );

        restoreSpeechTimerRef.current =
          null;
      }
    };
  }, [
    aiChatOpen,
    clippy,
    desktopReady,
    blockingWindowOpen,
    moveClippy,
  ]);


  /* ======================================
     WINDOW RESIZE
  ====================================== */

  React.useEffect(() => {
    if (!clippy) {
      return undefined;
    }


    const handleResize =
      () => {
        if (
          !desktopReady ||
          blockingWindowOpen ||
          !isClippyVisibleRef.current
        ) {
          return;
        }


        /*
         * Resize cukup snap.
         *
         * Tidak perlu movement animation.
         */

        setClippyPosition(
          aiChatOpenRef.current
        );
      };


    window.addEventListener(
      'resize',
      handleResize
    );


    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );
    };
  }, [
    clippy,
    desktopReady,
    blockingWindowOpen,
    setClippyPosition,
  ]);


  /* ======================================
     FINAL CLEANUP
  ====================================== */

  React.useEffect(() => {
    return () => {
      lifecycleIdRef.current += 1;


      clearTimers();


      currentMessageRef.current =
        null;


      clippy?.stop?.();

      clippy?.hide?.();
    };
  }, [
    clippy,
    clearTimers,
  ]);


  return null;
}
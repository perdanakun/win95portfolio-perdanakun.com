import React from 'react';

import {
  useClippy,
} from '@react95/clippy';


/* ======================================
   GUIDE COPY
====================================== */

const COPY = {

  intro:
    "Hi! I'm Clippy. I can help you find your way around Perdana's Computer.",

  introProjects:
    "Start with My Projects if you want to see Perdana's work, case studies, and how his practice is expanding from visual design into product design and design engineering.",

  introAI:
    "If you'd rather ask than browse, AI Chat can answer questions about Perdana's background, experience, skills, projects, and current direction.",

  introAbout:
    "About gives you the quick version — who Perdana is, his background, and what he's currently exploring.",

  introInbox:
    "And if you want to reach him directly, Inbox lets you send a message without leaving the portfolio.",


  about:
    "You're in About. This is the quickest place to understand who Perdana is, where he comes from, and what he's exploring now.",

  projects:
    "This is My Projects. Start here for the actual work — visual systems, product design experiments, and design engineering case studies.",

  aiAssistant:
    "AI Chat is the fastest way to explore the portfolio. Ask about Perdana's experience, skills, projects, background, or current career direction.",

  contact:
    "Inbox lets you contact Perdana directly from the portfolio, so you don't need to leave the desktop just to send a message.",

  installer:
    "The Installer is the guided introduction to Perdana's Computer. It walks through the person, the work, and the thinking behind this portfolio experience.",
};


/* ======================================
   RANDOM IDLE MESSAGES
====================================== */

const RANDOM_MESSAGES = [
  {
    text:
      "Need a hand? Try opening My Projects to see the actual work.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "AI Chat is useful if you want the short version instead of browsing everything.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "About is the quickest way to understand who Perdana is and what he's exploring.",

    animation:
      'Wave',
  },

  {
    text:
      "Inbox lets you send Perdana a message without leaving the desktop.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "The Installer isn't just decoration. It's part of the portfolio experience.",

    animation:
      'Wave',
  },

  {
    text:
      "You can open several windows at once. This is a computer, after all.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "Curious what changed recently? Check What's New.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "Some parts of this desktop are useful. Some are here because clicking things is fun.",

    animation:
      'Wave',
  },

  {
    text:
      "Yes, I'm still here.",

    animation:
      'Wave',
  },

  {
    text:
      "I wouldn't ignore the Recycle Bin forever.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "This portfolio works more like a computer than a traditional scrolling website. Feel free to look around.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "If you're looking for case studies, My Projects is probably where you want to go.",

    animation:
      'Acknowledge',
  },

  {
    text:
      "Not sure where to start? About for the person. My Projects for the work. AI Chat for questions.",

    animation:
      'Wave',
  },

  {
    text:
      "Perdana built this portfolio as an interactive design-in-code experiment.",

    animation:
      'Acknowledge',
  },
];


/* ======================================
   DEFAULT RESPONSIVE POSITION

   Posisi sekarang ±30px lebih turun
   dibanding versi sebelumnya.
====================================== */

function getClippyPosition() {

  const width =
    window.innerWidth;

  const height =
    window.innerHeight;


  /* ====================================
     SMARTPHONE
  ==================================== */

  if (width <= 600) {

    return {

      x: Math.max(
        8,
        width - 115
      ),

      y: Math.max(
        100,
        height - 140
      ),

    };

  }


  /* ====================================
     TABLET
  ==================================== */

  if (width <= 1024) {

    return {

      x: Math.max(
        16,
        width - 145
      ),

      y: Math.max(
        120,
        height - 175
      ),

    };

  }


  /* ====================================
     DESKTOP
  ==================================== */

  return {

    x: Math.max(
      24,
      width - 175
    ),

    y: Math.max(
      130,
      height - 190
    ),

  };

}


/* ======================================
   SAFE POSITION BY FEATURE
====================================== */

function getSafePosition({
  feature,
  isMobile,
  isTablet,
}) {

  const width =
    window.innerWidth;

  const height =
    window.innerHeight;

  const TASKBAR_HEIGHT = 28;


  /* ====================================
     SMARTPHONE

     Window mobile umumnya tumbuh
     dari bawah, jadi Clippy pergi
     ke area atas.
  ==================================== */

  if (isMobile) {

    switch (feature) {


      /* ================================
         AI CHAT
      ================================ */

      case 'aiAssistant':

        return {

          x: 12,

          y: 100,

        };


      /* ================================
         INBOX
      ================================ */

      case 'contact':

        return {

          x: 12,

          y: 100,

        };


      /* ================================
         PROJECTS
      ================================ */

      case 'projects':

        return {

          x: Math.max(
            12,
            width - 115
          ),

          y: 100,

        };


      /* ================================
         ABOUT
      ================================ */

      case 'about':

        return {

          x: Math.max(
            12,
            width - 115
          ),

          y: 100,

        };


      /* ================================
         INSTALLER
      ================================ */

      case 'installer':

        return {

          x: Math.max(
            12,
            width - 115
          ),

          y: Math.max(
            110,
            height - 145
          ),

        };


      default:

        return getClippyPosition();

    }

  }


  /* ====================================
     TABLET
  ==================================== */

  if (isTablet) {

    switch (feature) {


      /* ================================
         AI CHAT
      ================================ */

      case 'aiAssistant':

        return {

          x: 24,

          y: Math.max(
            130,
            height - 180
          ),

        };


      /* ================================
         INBOX
      ================================ */

      case 'contact':

        return {

          x: 24,

          y: Math.max(
            130,
            height - 180
          ),

        };


      /* ================================
         PROJECTS + ABOUT
      ================================ */

      case 'projects':
      case 'about':

        return {

          x: Math.max(
            20,
            width - 150
          ),

          y: Math.max(
            130,
            height - 180
          ),

        };


      /* ================================
         INSTALLER
      ================================ */

      case 'installer':

        return {

          x: Math.max(
            20,
            width - 150
          ),

          y: Math.max(
            130,
            height - 180
          ),

        };


      default:

        return getClippyPosition();

    }

  }


  /* ====================================
     DESKTOP
  ==================================== */

  switch (feature) {


    /* ==================================
       AI CHAT

       AI window di kanan,
       jadi Clippy pindah kiri.
    ================================== */

    case 'aiAssistant':

      return {

        x: 40,

        y: Math.max(
          150,
          height - 200
        ),

      };


    /* ==================================
       INBOX

       Contact centered,
       Clippy pindah kiri.
    ================================== */

    case 'contact':

      return {

        x: 40,

        y: Math.max(
          150,
          height - 200
        ),

      };


    /* ==================================
       PROJECTS

       Project centered,
       Clippy pindah kanan.
    ================================== */

    case 'projects':

      return {

        x: Math.max(
          24,
          width - 180
        ),

        y: Math.max(
          150,
          height - 200
        ),

      };


    /* ==================================
       ABOUT
    ================================== */

    case 'about':

      return {

        x: Math.max(
          24,
          width - 180
        ),

        y: Math.max(
          150,
          height - 200
        ),

      };


    /* ==================================
       INSTALLER

       Installer fullscreen,
       jadi hanya diposisikan ke
       area yang relatif aman.
    ================================== */

    case 'installer':

      return {

        x: Math.max(
          24,
          width - 180
        ),

        y: Math.max(
          130,

          height -
            TASKBAR_HEIGHT -
            160
        ),

      };


    default:

      return getClippyPosition();

  }

}


/* ======================================
   CLIPPY ASSISTANT
====================================== */

const GUIDE_STORAGE_KEY = 'perdana-clippy-guide-seen';

// Random Clippy muncul setiap 10–20 detik
const RANDOM_MIN_DELAY = 10000;
const RANDOM_MAX_EXTRA_DELAY = 10000;

// Setelah muncul, Clippy stay selama 8 detik
const RANDOM_VISIBLE_DURATION = 8000;

const CONTEXTUAL_VISIBLE_DURATION = 8000;

function getStoredGuideState() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(GUIDE_STORAGE_KEY) === 'true';
}

export default function ClippyAssistant({
  pcScreen,
  pcInstalled,
  isMobile,
  isTablet,
  windows,
  welcomeInstallerVisible,
  welcomeInstallerLoadingVisible,
  installerVisible,
  startGuide,
}) {
  const { clippy } = useClippy();

  const [guideCompleted, setGuideCompleted] =
    React.useState(getStoredGuideState);

  const previousState = React.useRef({
    about: false,
    projects: false,
    aiAssistant: false,
    contact: false,
  });

  const lastRandomIndex = React.useRef(-1);
  const tourStartedRef = React.useRef(false);
  const tourTimersRef = React.useRef([]);
  const chatterTimerRef = React.useRef(null);
  const chatterHideTimerRef = React.useRef(null);
  const contextualHideTimerRef = React.useRef(null);

  const installerOpen = Boolean(
    welcomeInstallerVisible ||
      welcomeInstallerLoadingVisible ||
      installerVisible
  );

  const desktopReady = Boolean(
    clippy &&
      pcScreen === 'desktop' &&
      pcInstalled &&
      !installerOpen &&
      !windows?.welcome
  );

  /* ====================================
     TIMER HELPERS
  ==================================== */

  const clearTourTimers = React.useCallback(() => {
    tourTimersRef.current.forEach((timer) => {
      window.clearTimeout(timer);
    });

    tourTimersRef.current = [];
  }, []);

  const clearChatterTimers = React.useCallback(() => {
    if (chatterTimerRef.current) {
      window.clearTimeout(chatterTimerRef.current);
      chatterTimerRef.current = null;
    }

    if (chatterHideTimerRef.current) {
      window.clearTimeout(chatterHideTimerRef.current);
      chatterHideTimerRef.current = null;
    }
  }, []);

  const clearContextualTimer = React.useCallback(() => {
    if (contextualHideTimerRef.current) {
      window.clearTimeout(contextualHideTimerRef.current);
      contextualHideTimerRef.current = null;
    }
  }, []);

  /* ====================================
     SPEAK HELPERS
  ==================================== */

  const speak = React.useCallback(
    (message, animation = 'Acknowledge') => {
      if (!clippy) {
        return;
      }

      clippy.stop?.();

      if (animation && clippy.play) {
        clippy.play(animation);
      }

      clippy.speak(message);
    },
    [clippy]
  );

  const speakRandomMessage = React.useCallback(() => {
    if (!clippy) {
      return;
    }

    let nextIndex = 0;

    do {
      nextIndex = Math.floor(
        Math.random() * RANDOM_MESSAGES.length
      );
    } while (
      RANDOM_MESSAGES.length > 1 &&
      nextIndex === lastRandomIndex.current
    );

    lastRandomIndex.current = nextIndex;

    const item = RANDOM_MESSAGES[nextIndex];
    speak(item.text, item.animation);
  }, [clippy, speak]);

  /* ====================================
     MOVE HELPER
  ==================================== */

  const moveClippy = React.useCallback(
    (feature = null) => {
      if (!clippy) {
        return;
      }

      const position = feature
        ? getSafePosition({
            feature,
            isMobile,
            isTablet,
          })
        : getClippyPosition();

      clippy.moveTo(position.x, position.y);
    },
    [clippy, isMobile, isTablet]
  );

  /* ====================================
     COMPACT SPEECH BALLOON
  ==================================== */

  React.useEffect(() => {
    const styleId = 'perdana-clippy-style';

    if (document.getElementById(styleId)) {
      return undefined;
    }

    const style = document.createElement('style');
    style.id = styleId;

    style.textContent = `
      .clippy {
        pointer-events: auto !important;
        z-index: 10 !important;
      }

      .clippy-balloon {
        font-family: "MS Sans Serif", Arial, sans-serif !important;
        z-index: 11 !important;
      }

      .clippy-content {
        font-family: "MS Sans Serif", Arial, sans-serif !important;
        font-size: 11px !important;
        line-height: 0.95 !important;
      }

      @media (max-width: 600px) {
        .clippy {
          touch-action: none !important;
          cursor: grab;
        }

        .clippy:active {
          cursor: grabbing;
        }

        .clippy-content {
          line-height: 1.05 !important;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, []);

  /* ====================================
     BASE VISIBILITY GUARD

     - Boot / installer / Welcome: hidden.
     - Returning visitor: hidden by default.
     - First guide controls its own visibility.
     - Random/contextual appearances are not
       overwritten by this effect while idle.
  ==================================== */

  React.useEffect(() => {
    if (!clippy) {
      return;
    }

    const blocked =
      pcScreen === 'boot' ||
      !pcInstalled ||
      installerOpen ||
      Boolean(windows?.welcome);

    if (blocked) {
      clearChatterTimers();
      clearContextualTimer();
      clippy.stop?.();
      clippy.hide();
      return;
    }

    if (guideCompleted) {
      clippy.stop?.();
      clippy.hide();
    }
  }, [
    clippy,
    pcScreen,
    pcInstalled,
    installerOpen,
    windows?.welcome,
    guideCompleted,
    clearChatterTimers,
    clearContextualTimer,
  ]);

  /* ====================================
     MOBILE DRAG
  ==================================== */

  React.useEffect(() => {
    if (!clippy) {
      return undefined;
    }

    let cleanupListeners = null;
    let retryTimer = null;

    const attachDragEvents = () => {
      const clippyElement =
        document.querySelector('.clippy');

      if (!clippyElement) {
        retryTimer = window.setTimeout(
          attachDragEvents,
          100
        );
        return;
      }

      clippyElement.style.pointerEvents = 'auto';
      clippyElement.style.touchAction = 'none';

      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const handlePointerDown = (event) => {
        if (window.innerWidth > 600) {
          return;
        }

        isDragging = true;

        const rect =
          clippyElement.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        clippyElement.setPointerCapture?.(
          event.pointerId
        );

        event.preventDefault();
      };

      const handlePointerMove = (event) => {
        if (!isDragging) {
          return;
        }

        const maxX = Math.max(
          0,
          window.innerWidth -
            clippyElement.offsetWidth
        );

        const maxY = Math.max(
          0,
          window.innerHeight -
            28 -
            clippyElement.offsetHeight
        );

        const x = Math.max(
          0,
          Math.min(
            maxX,
            event.clientX - offsetX
          )
        );

        const y = Math.max(
          0,
          Math.min(
            maxY,
            event.clientY - offsetY
          )
        );

        clippy.moveTo(x, y);
      };

      const handlePointerUp = (event) => {
        if (!isDragging) {
          return;
        }

        isDragging = false;

        try {
          clippyElement.releasePointerCapture?.(
            event.pointerId
          );
        } catch {
          // Pointer may already be released.
        }
      };

      const handlePointerCancel = () => {
        isDragging = false;
      };

      clippyElement.addEventListener(
        'pointerdown',
        handlePointerDown
      );

      window.addEventListener(
        'pointermove',
        handlePointerMove
      );

      window.addEventListener(
        'pointerup',
        handlePointerUp
      );

      window.addEventListener(
        'pointercancel',
        handlePointerCancel
      );

      cleanupListeners = () => {
        clippyElement.removeEventListener(
          'pointerdown',
          handlePointerDown
        );

        window.removeEventListener(
          'pointermove',
          handlePointerMove
        );

        window.removeEventListener(
          'pointerup',
          handlePointerUp
        );

        window.removeEventListener(
          'pointercancel',
          handlePointerCancel
        );
      };
    };

    attachDragEvents();

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }

      cleanupListeners?.();
    };
  }, [clippy]);

  /* ====================================
     FIRST VISIT FEATURE TOUR

     Flow:
     first install -> Welcome -> close Welcome
     -> mandatory Clippy guide -> hide
     -> mark guide complete.
  ==================================== */

  React.useEffect(() => {
    if (
      !desktopReady ||
      guideCompleted ||
      tourStartedRef.current
    ) {
      return undefined;
    }

    tourStartedRef.current = true;
    clearTourTimers();
    clearChatterTimers();
    clearContextualTimer();

    clippy.show();
    moveClippy();

    const addTourTimer = (callback, delay) => {
      const timer = window.setTimeout(
        callback,
        delay
      );

      tourTimersRef.current.push(timer);
    };

    addTourTimer(() => {
      if (!clippy) return;
      clippy.show();
      moveClippy();
      speak(COPY.intro, 'Wave');
    }, 1200);

    addTourTimer(() => {
      if (!clippy) return;
      clippy.show();
      moveClippy('projects');
      speak(COPY.introProjects);
    }, 8000);

    addTourTimer(() => {
      if (!clippy) return;
      clippy.show();
      moveClippy('aiAssistant');
      speak(COPY.introAI);
    }, 16000);

    addTourTimer(() => {
      if (!clippy) return;
      clippy.show();
      moveClippy('about');
      speak(COPY.introAbout);
    }, 24000);

    addTourTimer(() => {
      if (!clippy) return;
      clippy.show();
      moveClippy('contact');
      speak(COPY.introInbox);
    }, 32000);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.stop?.();
      clippy.hide();

      window.localStorage.setItem(
        GUIDE_STORAGE_KEY,
        'true'
      );

      setGuideCompleted(true);
    }, 39000);

    return () => {
      clearTourTimers();

      if (!getStoredGuideState()) {
        tourStartedRef.current = false;
      }
    };
  }, [
    clippy,
    desktopReady,
    guideCompleted,
    moveClippy,
    speak,
    clearTourTimers,
    clearChatterTimers,
    clearContextualTimer,
  ]);

  /* ====================================
     CENTRAL POSITION MANAGER
  ==================================== */

  React.useEffect(() => {
    if (!clippy) {
      return undefined;
    }

    if (installerOpen) {
      return undefined;
    }

    if (windows?.aiAssistant) {
      moveClippy('aiAssistant');
      return undefined;
    }

    if (windows?.contact) {
      moveClippy('contact');
      return undefined;
    }

    if (windows?.projects) {
      moveClippy('projects');
      return undefined;
    }

    if (windows?.about) {
      moveClippy('about');
      return undefined;
    }

    const timer = window.setTimeout(() => {
      moveClippy();
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    clippy,
    installerOpen,
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    moveClippy,
  ]);

  /* ====================================
     RESPONSIVE / ORIENTATION CHANGE
  ==================================== */

  React.useEffect(() => {
    if (!clippy) {
      return undefined;
    }

    const handleResize = () => {
      if (installerOpen) {
        return;
      }

      if (windows?.aiAssistant) {
        moveClippy('aiAssistant');
        return;
      }

      if (windows?.contact) {
        moveClippy('contact');
        return;
      }

      if (windows?.projects) {
        moveClippy('projects');
        return;
      }

      if (windows?.about) {
        moveClippy('about');
        return;
      }

      moveClippy();
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
    installerOpen,
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    moveClippy,
  ]);

  /* ====================================
     CONTEXTUAL GUIDE HELPER

     Contextual messages only run AFTER the
     mandatory first guide is complete.
  ==================================== */

  const showContextualGuide = React.useCallback(
    (
      message,
      feature,
      animation = 'Acknowledge'
    ) => {
      if (
        !clippy ||
        !guideCompleted ||
        !desktopReady
      ) {
        return;
      }

      clearChatterTimers();
      clearContextualTimer();

      clippy.show();
      moveClippy(feature);
      speak(message, animation);

      contextualHideTimerRef.current =
        window.setTimeout(() => {
          clippy.stop?.();
          clippy.hide();
          contextualHideTimerRef.current = null;
        }, CONTEXTUAL_VISIBLE_DURATION);
    },
    [
      clippy,
      guideCompleted,
      desktopReady,
      moveClippy,
      speak,
      clearChatterTimers,
      clearContextualTimer,
    ]
  );

  /* ====================================
     ABOUT CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {
    const isOpen = Boolean(windows?.about);

    if (
      isOpen &&
      !previousState.current.about
    ) {
      showContextualGuide(
        COPY.about,
        'about'
      );
    }

    previousState.current.about = isOpen;
  }, [windows?.about, showContextualGuide]);

  /* ====================================
     PROJECTS CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {
    const isOpen = Boolean(windows?.projects);

    if (
      isOpen &&
      !previousState.current.projects
    ) {
      showContextualGuide(
        COPY.projects,
        'projects'
      );
    }

    previousState.current.projects = isOpen;
  }, [windows?.projects, showContextualGuide]);

  /* ====================================
     AI CHAT CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {
    const isOpen = Boolean(
      windows?.aiAssistant
    );

    if (
      isOpen &&
      !previousState.current.aiAssistant
    ) {
      showContextualGuide(
        COPY.aiAssistant,
        'aiAssistant'
      );
    }

    previousState.current.aiAssistant = isOpen;
  }, [
    windows?.aiAssistant,
    showContextualGuide,
  ]);

  /* ====================================
     INBOX CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {
    const isOpen = Boolean(windows?.contact);

    if (
      isOpen &&
      !previousState.current.contact
    ) {
      showContextualGuide(
        COPY.contact,
        'contact'
      );
    }

    previousState.current.contact = isOpen;
  }, [windows?.contact, showContextualGuide]);

/* ====================================
   RANDOM IDLE CHATTER

   Only after first guide is complete.
   Wait 10–20s -> show -> speak ->
   remain visible for 8s -> hide -> repeat.
==================================== */
React.useEffect(() => {
  if (
    !clippy ||
    !startGuide ||
    guideCompleted ||
    tourStartedRef.current
  ) {
    return undefined;
  }

  tourStartedRef.current = true;

  clearTourTimers();
  clearChatterTimers();
  clearContextualTimer();

  // pastikan Clippy benar-benar mulai dari kondisi visible
  clippy.stop?.();
  clippy.show();
  moveClippy();

  const addTourTimer = (callback, delay) => {
    const timer = window.setTimeout(
      callback,
      delay
    );

    tourTimersRef.current.push(timer);
  };

  addTourTimer(() => {
    if (!clippy) return;

    clippy.show();
    moveClippy();
    speak(COPY.intro, 'Wave');
  }, 500);

  addTourTimer(() => {
    if (!clippy) return;

    clippy.show();
    moveClippy('projects');
    speak(COPY.introProjects);
  }, 8000);

  addTourTimer(() => {
    if (!clippy) return;

    clippy.show();
    moveClippy('aiAssistant');
    speak(COPY.introAI);
  }, 16000);

  addTourTimer(() => {
    if (!clippy) return;

    clippy.show();
    moveClippy('about');
    speak(COPY.introAbout);
  }, 24000);

  addTourTimer(() => {
    if (!clippy) return;

    clippy.show();
    moveClippy('contact');
    speak(COPY.introInbox);
  }, 32000);

  addTourTimer(() => {
    if (!clippy) return;

    clippy.stop?.();
    clippy.hide();

    window.localStorage.setItem(
      GUIDE_STORAGE_KEY,
      'true'
    );

    setGuideCompleted(true);
  }, 39000);

  return () => {
    clearTourTimers();
  };
}, [
  clippy,
  startGuide,
  guideCompleted,
  moveClippy,
  speak,
  clearTourTimers,
  clearChatterTimers,
  clearContextualTimer,
]);
  /* ====================================
     GLOBAL CLEANUP
  ==================================== */

  React.useEffect(() => {
    return () => {
      clearTourTimers();
      clearChatterTimers();
      clearContextualTimer();
    };
  }, [
    clearTourTimers,
    clearChatterTimers,
    clearContextualTimer,
  ]);

  return null;
}

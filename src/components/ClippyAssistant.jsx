import React from 'react';

import {
  useClippy,
} from '@react95/clippy';


/* ======================================
   GUIDE COPY
====================================== */

const COPY = {

  intro:
    "Hey! Looks like setup is complete. I'm Clippy. I'll help you find your way around.",

  introComputer:
    "This isn't a traditional portfolio. Think of it as Perdana's computer — projects, experiments, notes, and a few things you probably weren't supposed to click.",

  introProjectsPrompt:
    "Let's start with the important part. Open My Projects and I'll show you around.",

  introProjects:
    "There we go. This is where you'll find the actual work — from visual systems to Product Design and Design Engineering experiments.",

  introAI:
    "If you'd rather ask than browse, AI Chat knows its way around this computer.",

  introAbout:
    "About gives you the short version — who Perdana is, where he's coming from, and what he's working toward.",

  introInbox:
    "And if you want to talk to the human behind all this, Inbox is right here.",

  introEnd:
    "That's enough from me. Explore anything you like. I'll be around if you need me.",

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
   CLIPPY TOUR POSITION
====================================== */

function getFirstTourPosition() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const TASKBAR_HEIGHT = 28;

  if (width <= 600) {
    return {
      x: Math.max(8, width - 110),
      y: Math.max(80, height - TASKBAR_HEIGHT - 120),
    };
  }

  if (width <= 1024) {
    return {
      x: Math.max(16, width - 130),
      y: Math.max(100, height - TASKBAR_HEIGHT - 140),
    };
  }

  return {
    x: Math.max(24, width - 120),
    y: Math.max(100, height - TASKBAR_HEIGHT - 150),
  };
}

/* ======================================
   CLIPPY TOUR — DESKTOP ICON POSITION

   Mengikuti layout getDesktopIconPosition()
   yang digunakan di App.
====================================== */

function getTourFeaturePosition(
  feature,
  isMobile,
  isTablet
) {
  const iconWidth = 80;
  const iconHeight = 80;

  const featureIndex = {
    about: 0,
    installer: 1,
    aiAssistant: 2,
    projects: 3,
    contact: 4,
  };

  const index = featureIndex[feature];

  if (index === undefined) {
    return getFirstTourPosition();
  }

  /* ====================================
     SMARTPHONE + TABLET
     2-column desktop icon layout
  ==================================== */

  if (isMobile || isTablet) {
    const startX = 16;
    const startY = 16;
    const gapX = 12;
    const gapY = 12;
    const columns = 2;

    const column = index % columns;
    const row = Math.floor(index / columns);

    const iconX =
      startX +
      column * (iconWidth + gapX);

    const iconY =
      startY +
      row * (iconHeight + gapY);

    return {
      x: iconX + iconWidth + 10,
      y: iconY + 10,
    };
  }

  /* ====================================
     DESKTOP
     1-column desktop icon layout
  ==================================== */

  const iconX = 24;
  const iconY = 24 + index * 96;

  return {
    x: iconX + iconWidth + 20,
    y: iconY + 5,
  };
}


/* ======================================
   CLIPPY ASSISTANT
====================================== */

const GUIDE_STORAGE_KEY = 'perdana-clippy-guide-seen';

// Desktop Clippy muncul secara berkala, bicara, lalu menghilang lagi.
// Ritme ini sengaja dibuat seperti Clippy lama: tidak selalu ada di layar.
const RANDOM_MIN_DELAY = 10000;
const RANDOM_MAX_EXTRA_DELAY = 10000;
const RANDOM_VISIBLE_DURATION = 8000;
const CONTEXTUAL_VISIBLE_DURATION = 8000;

// Clippy.JS queues actions. Keep movement short enough that
// the balloon appears after Clippy has reached its target.
const MOVE_DURATION = 650;
const ANIMATION_DURATION = 900;

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
  const tourContinuationStartedRef = React.useRef(false);
  const tourTimersRef = React.useRef([]);
  const chatterTimerRef = React.useRef(null);
  const chatterHideTimerRef = React.useRef(null);
  const contextualHideTimerRef = React.useRef(null);

  const [tourPhase, setTourPhase] = React.useState('idle');

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

  const contextualWindowOpen = Boolean(
    windows?.about ||
      windows?.projects ||
      windows?.aiAssistant ||
      windows?.contact
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

      // IMPORTANT: do not call clippy.stop() here.
      // moveTo(), play(), and speak() are queued by Clippy.JS.
      // Calling stop() after moveTo() clears the movement queue and
      // can leave the balloon detached from the visible agent.
      if (animation && clippy.play) {
        clippy.play(animation, ANIMATION_DURATION);
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
    (feature = null, duration = MOVE_DURATION) => {
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

      clippy.moveTo(position.x, position.y, duration);
    },
    [clippy, isMobile, isTablet]
  );

   /* ====================================
     FIRST MOVE HELPER
  ==================================== */

  const moveClippyToTourFeature = React.useCallback(
  (feature) => {
    if (!clippy) {
      return;
    }

    const position = getTourFeaturePosition(
      feature,
      isMobile,
      isTablet
    );

    clippy.moveTo(
      position.x,
      position.y,
      MOVE_DURATION
    );
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

      .clippy-balloon,
      .clippy-balloon *,
      .clippy-content,
      .clippy-content *,
      .clippy-balloon-content,
      .clippy-balloon-content * {
        font-family: "MS Sans Serif", Arial, sans-serif !important;
        font-size: 11px !important;
        line-height: 10px !important;
      }

      .clippy-balloon p,
      .clippy-content p,
      .clippy-balloon-content p {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }

      @media (max-width: 600px) {
        .clippy {
          touch-action: none !important;
          cursor: grab;
        }

        .clippy:active {
          cursor: grabbing;
        }

        .clippy-balloon,
        .clippy-balloon *,
        .clippy-content,
        .clippy-content *,
        .clippy-balloon-content,
        .clippy-balloon-content * {
          line-height: 10px !important;
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
     - First tour controls its own visibility.
     - After the tour, Desktop Clippy remains visible.
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
    clearTourTimers();
    clearChatterTimers();
    clearContextualTimer();

    if (!guideCompleted) {
      tourStartedRef.current = false;
      tourContinuationStartedRef.current = false;
      setTourPhase('idle');
    }

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
  clearTourTimers,
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
     CLICK CLIPPY TO TALK

     Desktop idle Clippy can be clicked while visible.
     Clicking gives one random line and restarts the hide countdown.
     We avoid this during the First Tour/contextual response so the
     scripted onboarding is not interrupted.
  ==================================== */

  React.useEffect(() => {
    if (!clippy) {
      return undefined;
    }

    let cleanup = null;
    let retryTimer = null;

    const attachClick = () => {
      const clippyElement = document.querySelector('.clippy');

      if (!clippyElement) {
        retryTimer = window.setTimeout(attachClick, 100);
        return;
      }

      const handleClick = (event) => {
        // Desktop interaction only. Mobile Clippy is reserved for
        // onboarding and contextual responses because screen space is tight.
        if (isMobile || !guideCompleted || !desktopReady || contextualWindowOpen) {
          return;
        }

        event.stopPropagation();

        // Do not reset the appearance/hide lifecycle here.
        // The click only adds another line while Clippy is already visible.
        clippy.stop?.();
        clippy.show(true);
        speakRandomMessage();
      };

      clippyElement.addEventListener('click', handleClick);
      cleanup = () => clippyElement.removeEventListener('click', handleClick);
    };

    attachClick();

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      cleanup?.();
    };
  }, [
    clippy,
    isMobile,
    guideCompleted,
    desktopReady,
    contextualWindowOpen,
    speakRandomMessage,
  ]);

  /* ====================================
     FIRST VISIT FEATURE TOUR

     Flow:
     first install -> Welcome -> close Welcome
     -> Clippy introduction
     -> ask user to open My Projects
     -> wait for real interaction
     -> continue orientation
     -> mark guide complete
     -> hand off to persistent Desktop Clippy.
  ==================================== */

  React.useEffect(() => {
    if (
      !desktopReady ||
      guideCompleted ||
      tourStartedRef.current
    ) {
      return;
    }

    tourStartedRef.current = true;
    clearTourTimers();
    clearChatterTimers();

    clippy.stop?.();
    clippy.show(true);

    const firstPosition = getFirstTourPosition();

    clippy.moveTo(
      firstPosition.x,
      firstPosition.y,
      0
    );

    const addTourTimer = (callback, delay) => {
      const timer = window.setTimeout(
        callback,
        delay
      );

      tourTimersRef.current.push(timer);
    };

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      speak(COPY.intro, 'Wave');
    }, 500);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      speak(COPY.introComputer, 'Acknowledge');
    }, 4500);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippyToTourFeature('projects');
      speak(COPY.introProjectsPrompt, 'Wave');
      setTourPhase('waiting-projects');
    }, 9500);
  }, [
    clippy,
    desktopReady,
    guideCompleted,
    moveClippyToTourFeature,
    speak,
    clearTourTimers,
    clearChatterTimers,
  ]);

  /* ====================================
     FIRST TOUR — WAIT FOR MY PROJECTS

     The tour does not continue until the user
     actually opens My Projects. This gives the
     onboarding one meaningful interaction without
     forcing every icon to be clicked.
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      guideCompleted ||
      tourPhase !== 'waiting-projects' ||
      !windows?.projects ||
      tourContinuationStartedRef.current
    ) {
      return;
    }

    tourContinuationStartedRef.current = true;
    clearTourTimers();
    clearChatterTimers();

    clippy.stop?.();
    clippy.show(true);
    moveClippyToTourFeature('projects');
    speak(COPY.introProjects, 'Acknowledge');

    const addTourTimer = (callback, delay) => {
      const timer = window.setTimeout(
        callback,
        delay
      );

      tourTimersRef.current.push(timer);
    };

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippyToTourFeature('aiAssistant');
      speak(COPY.introAI);
    }, 4500);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippyToTourFeature('about');
      speak(COPY.introAbout);
    }, 8500);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippyToTourFeature('contact');
      speak(COPY.introInbox);
    }, 12500);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippy();
      speak(COPY.introEnd, 'Wave');
    }, 16500);

    addTourTimer(() => {
      if (!clippy) return;

      window.localStorage.setItem(
        GUIDE_STORAGE_KEY,
        'true'
      );

      setGuideCompleted(true);
      setTourPhase('complete');

      // First Tour is complete. Desktop behavior takes over.
      // Clippy disappears until the next random/contextual appearance.
      clippy.stop?.();
      clippy.hide();
    }, 21500);
  }, [
    clippy,
    guideCompleted,
    tourPhase,
    windows?.projects,
    moveClippy,
    moveClippyToTourFeature,
    speak,
    clearTourTimers,
    clearChatterTimers,
  ]);

  /* ====================================
     CENTRAL POSITION MANAGER

     This manager only owns the idle/default position.
     Feature windows are positioned by contextual guides,
     and the first visit tour owns its own movement.
  ==================================== */

  React.useEffect(() => {
    if (!clippy) {
      return undefined;
    }

    if (
      !guideCompleted ||
      !desktopReady ||
      contextualWindowOpen ||
      isMobile
    ) {
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
    guideCompleted,
    desktopReady,
    contextualWindowOpen,
    isMobile,
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
      if (installerOpen || !guideCompleted) {
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
    guideCompleted,
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

      // Contextual response may appear on desktop OR mobile.
      // It is temporary so it does not permanently occupy screen space.
      clippy.stop?.();
      clippy.show(true);
      moveClippy(feature);
      speak(message, animation);

      contextualHideTimerRef.current = window.setTimeout(() => {
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

   Desktop only. After the first guide is complete:
   wait 10–20s -> appear -> speak -> stay 8s -> hide -> repeat.

   On smartphones there is NO idle/Desktop Clippy.
   Mobile Clippy only appears during the First Tour and
   contextual responses to opened windows.
==================================== */

React.useEffect(() => {
  if (
    !clippy ||
    !guideCompleted ||
    !desktopReady ||
    contextualWindowOpen ||
    isMobile
  ) {
    clearChatterTimers();

    // Once onboarding is over, mobile should not keep an idle Clippy.
    if (clippy && isMobile && guideCompleted && !contextualWindowOpen) {
      clippy.stop?.();
      clippy.hide();
    }

    return undefined;
  }

  const scheduleNextChatter = () => {
    clearChatterTimers();

    const delay =
      RANDOM_MIN_DELAY +
      Math.random() * RANDOM_MAX_EXTRA_DELAY;

    chatterTimerRef.current = window.setTimeout(() => {
      if (!clippy) {
        return;
      }

      clippy.stop?.();
      clippy.show(true);
      moveClippy();
      speakRandomMessage();

      chatterHideTimerRef.current = window.setTimeout(() => {
        clippy.stop?.();
        clippy.hide();
        chatterHideTimerRef.current = null;

        scheduleNextChatter();
      }, RANDOM_VISIBLE_DURATION);
    }, delay);
  };

  scheduleNextChatter();

  return () => {
    clearChatterTimers();
  };
}, [
  clippy,
  guideCompleted,
  desktopReady,
  contextualWindowOpen,
  isMobile,
  moveClippy,
  speakRandomMessage,
  clearChatterTimers,
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

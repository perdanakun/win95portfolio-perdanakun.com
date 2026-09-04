import React from 'react';
import { useClippy } from '@react95/clippy';

/* ======================================
   GUIDE COPY
====================================== */

const COPY = {
  paintIntro:
    "Welcome to Perdana's Computer. Perdana made this little piece of art especially for you. Give it a quick scan, and follow the arrows if anything catches your eye.",

  paintClose:
    "When you're done, close this window. I'll show you around real quick.",

  aiLead:
    "Nice. Perdana told me there's one thing you should try first.",

  aiOpenPrompt:
    "Open AI Chat. I'll introduce you.",

  aiFriend:
    "This is my friend, perdana.ai. He's a little shy, so he won't say much unless you ask. But he knows Perdana really well.",

  aiQuestion:
    'Try asking him something like, "What is Perdana working on right now?"',

  aiClose:
    "Give him a try. When you're done, close AI Chat and I'll show you the rest.",

  tourContinue:
    "Nice. A few more useful places before I get out of your way.",

  projects:
    "My Projects is where Perdana keeps the actual work — visual systems, Product Design, and Design Engineering experiments.",

  about:
    "About gives you the short version of who Perdana is, where he's coming from, and what he's working toward.",

  contact:
    "And Inbox is the easiest way to reach the human behind this computer.",

  introEnd:
    "That's enough from me. Explore anything you like. I'll pop in from time to time if I have something useful to say.",

  exploreInstead:
    "Looks like you've got this. I'll let you explore.",

  interrupted:
    "Welcome back. Looks like we didn't finish the tour last time. I'll stay out of the way — feel free to explore.",

  mobileWelcome:
    "Welcome to Perdana's Computer. Perdana asked me to say hi. Everything's ready — have a look around and see what you find.",

  mobileWelcomeBack:
    "Welcome back. Perdana's Computer is ready whenever you are.",

  contextualAbout:
    "You're in About. This is the quickest place to understand who Perdana is and what he's exploring now.",

  contextualProjects:
    "This is My Projects. Start here for the actual work — visual systems, Product Design, and Design Engineering experiments.",

  contextualAI:
    "Need a shortcut? perdana.ai knows Perdana pretty well. Ask him about the work, experience, projects, or current direction.",

  contextualContact:
    "Inbox lets you contact Perdana directly without leaving the desktop.",
};

/* ======================================
   RANDOM IDLE MESSAGES
====================================== */

const RANDOM_MESSAGES = [
  {
    text:
      "Need a hand? Try opening My Projects to see the actual work.",
    animation: 'Acknowledge',
  },
  {
    text:
      "perdana.ai is useful if you'd rather ask than browse everything.",
    animation: 'Acknowledge',
  },
  {
    text:
      "About is the quickest way to understand who Perdana is and what he's exploring.",
    animation: 'Wave',
  },
  {
    text:
      "Inbox lets you send Perdana a message without leaving the desktop.",
    animation: 'Acknowledge',
  },
  {
    text:
      "The Installer isn't just decoration. It's part of the portfolio experience.",
    animation: 'Wave',
  },
  {
    text:
      "You can open several windows at once. This is a computer, after all.",
    animation: 'Acknowledge',
  },
  {
    text:
      "Curious what changed recently? Check What's New.",
    animation: 'Acknowledge',
  },
  {
    text:
      "Some parts of this desktop are useful. Some are here because clicking things is fun.",
    animation: 'Wave',
  },
  {
    text:
      "Yes, I'm still here.",
    animation: 'Wave',
  },
  {
    text:
      "I wouldn't ignore the Recycle Bin forever.",
    animation: 'Acknowledge',
  },
  {
    text:
      "This portfolio works more like a computer than a traditional scrolling website. Feel free to look around.",
    animation: 'Acknowledge',
  },
  {
    text:
      "If you're looking for case studies, My Projects is probably where you want to go.",
    animation: 'Acknowledge',
  },
  {
    text:
      "Not sure where to start? About for the person. My Projects for the work. perdana.ai for questions.",
    animation: 'Wave',
  },
  {
    text:
      "Perdana built this portfolio as an interactive design-in-code experiment.",
    animation: 'Acknowledge',
  },
];

/* ======================================
   DEFAULT RESPONSIVE POSITION
====================================== */

function getClippyPosition() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // SMARTPHONE
  if (width <= 600) {
    return {
      x: Math.max(8, width - 115),
      y: Math.max(100, height - 140),
    };
  }

  // TABLET
  if (width <= 1024) {
    return {
      x: Math.max(16, width - 145),
      y: Math.max(120, height - 175),
    };
  }

  // DESKTOP
  return {
    x: Math.max(24, width - 175),
    y: Math.max(130, height - 190),
  };
}

/* ======================================
   SAFE POSITION BY FEATURE

   Keep Clippy away from the window being
   explained as much as the viewport allows.
====================================== */

function getSafePosition({
  feature,
  isMobile,
  isTablet,
}) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const TASKBAR_HEIGHT = 28;

  /* --------------------------------------
     SMARTPHONE
     Only used for the short welcome.
  -------------------------------------- */

  if (isMobile) {
    return {
      x: Math.max(8, width - 112),
      y: Math.max(
        80,
        height - TASKBAR_HEIGHT - 125
      ),
    };
  }

  /* --------------------------------------
     TABLET
  -------------------------------------- */

  if (isTablet) {
    switch (feature) {
      case 'aiAssistant':
        // AI Chat is on the right, so Clippy stays left.
        return {
          x: 20,
          y: Math.max(
            110,
            height - TASKBAR_HEIGHT - 155
          ),
        };

      case 'contact':
        return {
          x: 20,
          y: Math.max(
            110,
            height - TASKBAR_HEIGHT - 155
          ),
        };

      case 'projects':
      case 'about':
        return {
          x: Math.max(20, width - 145),
          y: Math.max(
            110,
            height - TASKBAR_HEIGHT - 155
          ),
        };

      case 'paintHero':
        // Paint is large/centered on tablet.
        // Bottom-left tends to leave the main artwork readable.
        return {
          x: 16,
          y: Math.max(
            110,
            height - TASKBAR_HEIGHT - 145
          ),
        };

      default:
        return getClippyPosition();
    }
  }

  /* --------------------------------------
     DESKTOP
  -------------------------------------- */

  switch (feature) {
    case 'aiAssistant':
      // AI window lives on the right side.
      return {
        x: 40,
        y: Math.max(
          150,
          height - TASKBAR_HEIGHT - 170
        ),
      };

    case 'contact':
      return {
        x: 40,
        y: Math.max(
          150,
          height - TASKBAR_HEIGHT - 170
        ),
      };

    case 'projects':
    case 'about':
      return {
        x: Math.max(24, width - 180),
        y: Math.max(
          150,
          height - TASKBAR_HEIGHT - 170
        ),
      };

    case 'paintHero':
      // Paint is centered. Keep Clippy on the left edge.
      return {
        x: 28,
        y: Math.max(
          145,
          height - TASKBAR_HEIGHT - 170
        ),
      };

    case 'installer':
      return {
        x: Math.max(24, width - 180),
        y: Math.max(
          130,
          height - TASKBAR_HEIGHT - 160
        ),
      };

    default:
      return getClippyPosition();
  }
}

/* ======================================
   TOUR FEATURE POSITION

   IMPORTANT:
   This mirrors getDesktopIconPosition()
   from App.jsx.

   Actual App.jsx icon indexes:
   0 About
   1 Installer
   2 Inbox
   3 My Projects
   4 Games
   5 Recycle Bin
   6 AI Chat
   7 Media Player
   8 MS Paint
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
    contact: 2,
    projects: 3,
    aiAssistant: 6,
    paintHero: 8,
  };

  const index = featureIndex[feature];

  if (index === undefined) {
    return getClippyPosition();
  }

  /* --------------------------------------
     SMARTPHONE + TABLET
     App.jsx uses a 2-column icon grid.
  -------------------------------------- */

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
      y: iconY + 8,
    };
  }

  /* --------------------------------------
     DESKTOP
     App.jsx uses max 6 rows per column.
  -------------------------------------- */

  const startX = 24;
  const startY = 24;
  const gapX = 12;
  const gapY = 12;
  const maxRows = 6;

  const column = Math.floor(index / maxRows);
  const row = index % maxRows;

  const iconX =
    startX +
    column * (iconWidth + gapX);

  const iconY =
    startY +
    row * (iconHeight + gapY);

  return {
    x: iconX + iconWidth + 18,
    y: iconY + 5,
  };
}

/* ======================================
   STORAGE / VISIT HELPERS
====================================== */

const GUIDE_STORAGE_KEY =
  'perdana-clippy-guide-seen';

const GUIDE_STARTED_KEY =
  'perdana-clippy-guide-started';

const GUIDE_STARTED_VISIT_KEY =
  'perdana-clippy-guide-started-visit';

/*
 * One ID per actual page load/module lifetime.
 * This lets us distinguish:
 *
 * - same visit / React re-render
 * - a genuinely later visit after an unfinished tour
 */
const CURRENT_VISIT_ID =
  typeof window !== 'undefined'
    ? `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`
    : 'server';

function getStoredBoolean(key) {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.localStorage.getItem(key) === 'true'
  );
}

function getStoredGuideState() {
  return getStoredBoolean(GUIDE_STORAGE_KEY);
}

function getStoredGuideStarted() {
  return getStoredBoolean(GUIDE_STARTED_KEY);
}

function getStoredStartedVisitId() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(
    GUIDE_STARTED_VISIT_KEY
  );
}

/* ======================================
   TIMING
====================================== */

/*
 * Normal idle Clippy:
 * wait 18–30s -> appear -> speak -> stay 8s -> hide.
 */
const RANDOM_MIN_DELAY = 18000;
const RANDOM_MAX_EXTRA_DELAY = 12000;
const RANDOM_VISIBLE_DURATION = 8000;

const CONTEXTUAL_VISIBLE_DURATION = 8000;
const MOBILE_GREETING_VISIBLE_DURATION = 7000;

const MOVE_DURATION = 650;
const ANIMATION_DURATION = 900;

/* ======================================
   CLIPPY ASSISTANT
====================================== */

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

  const initialGuideCompletedRef =
    React.useRef(getStoredGuideState());

  const initialGuideStartedRef =
    React.useRef(getStoredGuideStarted());

  const initialStartedVisitRef =
    React.useRef(getStoredStartedVisitId());

  /*
   * If a previous page visit started the tour but
   * never completed it, we do NOT replay the whole
   * onboarding. We greet briefly and get out of the way.
   */
  const interruptedPreviousVisitRef =
    React.useRef(
      !initialGuideCompletedRef.current &&
        initialGuideStartedRef.current &&
        Boolean(initialStartedVisitRef.current) &&
        initialStartedVisitRef.current !==
          CURRENT_VISIT_ID
    );

  const [
    guideCompleted,
    setGuideCompleted,
  ] = React.useState(
    initialGuideCompletedRef.current
  );

  const [tourPhase, setTourPhase] =
    React.useState('idle');

  const previousState = React.useRef({
    about: false,
    projects: false,
    aiAssistant: false,
    contact: false,
  });

  const tourPreviousState = React.useRef({
    about: Boolean(windows?.about),
    projects: Boolean(windows?.projects),
    aiAssistant: Boolean(
      windows?.aiAssistant
    ),
    contact: Boolean(windows?.contact),
  });

  const lastRandomIndex = React.useRef(-1);

  const tourStartedRef = React.useRef(false);
  const mobileGreetingStartedRef =
    React.useRef(false);

  const tourTimersRef = React.useRef([]);
  const chatterTimerRef = React.useRef(null);
  const chatterHideTimerRef =
    React.useRef(null);
  const contextualHideTimerRef =
    React.useRef(null);
  const mobileHideTimerRef =
    React.useRef(null);

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

  const clearTourTimers =
    React.useCallback(() => {
      tourTimersRef.current.forEach((timer) => {
        window.clearTimeout(timer);
      });

      tourTimersRef.current = [];
    }, []);

  const clearChatterTimers =
    React.useCallback(() => {
      if (chatterTimerRef.current) {
        window.clearTimeout(
          chatterTimerRef.current
        );
        chatterTimerRef.current = null;
      }

      if (chatterHideTimerRef.current) {
        window.clearTimeout(
          chatterHideTimerRef.current
        );
        chatterHideTimerRef.current =
          null;
      }
    }, []);

  const clearContextualTimer =
    React.useCallback(() => {
      if (contextualHideTimerRef.current) {
        window.clearTimeout(
          contextualHideTimerRef.current
        );

        contextualHideTimerRef.current =
          null;
      }
    }, []);

  const clearMobileTimer =
    React.useCallback(() => {
      if (mobileHideTimerRef.current) {
        window.clearTimeout(
          mobileHideTimerRef.current
        );

        mobileHideTimerRef.current =
          null;
      }
    }, []);

  const addTourTimer = React.useCallback(
    (callback, delay) => {
      const timer = window.setTimeout(
        callback,
        delay
      );

      tourTimersRef.current.push(timer);

      return timer;
    },
    []
  );

  /* ====================================
     GUIDE STATE HELPERS
  ==================================== */

  const markGuideStarted =
    React.useCallback(() => {
      if (typeof window === 'undefined') {
        return;
      }

      window.localStorage.setItem(
        GUIDE_STARTED_KEY,
        'true'
      );

      window.localStorage.setItem(
        GUIDE_STARTED_VISIT_KEY,
        CURRENT_VISIT_ID
      );
    }, []);

  const markGuideComplete =
    React.useCallback(() => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          GUIDE_STORAGE_KEY,
          'true'
        );

        window.localStorage.removeItem(
          GUIDE_STARTED_KEY
        );

        window.localStorage.removeItem(
          GUIDE_STARTED_VISIT_KEY
        );
      }

      setGuideCompleted(true);
      setTourPhase('complete');
    }, []);

  /* ====================================
     SPEAK HELPERS
  ==================================== */

  const speak = React.useCallback(
    (
      message,
      animation = 'Acknowledge'
    ) => {
      if (!clippy) {
        return;
      }

      /*
       * Do not call stop() inside this helper.
       * Clippy.JS queues moveTo(), play(), speak().
       */
      if (animation && clippy.play) {
        clippy.play(
          animation,
          ANIMATION_DURATION
        );
      }

      clippy.speak(message);
    },
    [clippy]
  );

  const speakRandomMessage =
    React.useCallback(() => {
      if (!clippy) {
        return;
      }

      let nextIndex = 0;

      do {
        nextIndex = Math.floor(
          Math.random() *
            RANDOM_MESSAGES.length
        );
      } while (
        RANDOM_MESSAGES.length > 1 &&
        nextIndex === lastRandomIndex.current
      );

      lastRandomIndex.current = nextIndex;

      const item =
        RANDOM_MESSAGES[nextIndex];

      speak(item.text, item.animation);
    }, [clippy, speak]);

  /* ====================================
     MOVE HELPERS
  ==================================== */

  const moveClippy = React.useCallback(
    (
      feature = null,
      duration = MOVE_DURATION
    ) => {
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

      clippy.moveTo(
        position.x,
        position.y,
        duration
      );
    },
    [clippy, isMobile, isTablet]
  );

  const moveClippyToTourFeature =
    React.useCallback(
      (feature) => {
        if (!clippy) {
          return;
        }

        const position =
          getTourFeaturePosition(
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
    const styleId =
      'perdana-clippy-style';

    if (
      document.getElementById(styleId)
    ) {
      return undefined;
    }

    const style =
      document.createElement('style');

    style.id = styleId;

    style.textContent = `
.clippy {
  pointer-events: auto !important;
  z-index: 10 !important;
}

.clippy-balloon {
  z-index: 11 !important;
}

.clippy-content {
  font-family: "MS Sans Serif", "Microsoft Sans Serif", Arial, sans-serif !important;
  font-size: 11px !important;
  line-height: 13px !important;
}

.clippy-balloon div[style*="max-width: 200px"] {
  height: auto !important;
  font-family: "Microsoft Sans", "MS Sans Serif", sans-serif !important;
  font-size: 10pt !important;
  line-height: 13px !important;
  letter-spacing: 0 !important;
}
 
      @media (max-width: 600px) {
        .clippy {
          touch-action: manipulation !important;
        }

        .clippy-balloon-content,
        .clippy-balloon-content *,
        .clippy-content,
        .clippy-content *,
        .clippy-balloon,

      }
    `;

    document.head.appendChild(style);

    return () => {
      document
        .getElementById(styleId)
        ?.remove();
    };
  }, []);

  /* ====================================
     BASE VISIBILITY GUARD

     Clippy is always hidden during:
     - Boot
     - not installed
     - Installer
     - Welcome

     After Welcome closes:
     - desktop/tablet = first-tour logic
     - mobile = one short greeting only
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

    if (!blocked) {
      return;
    }

    clearTourTimers();
    clearChatterTimers();
    clearContextualTimer();
    clearMobileTimer();

    clippy.stop?.();
    clippy.hide();
  }, [
    clippy,
    pcScreen,
    pcInstalled,
    installerOpen,
    windows?.welcome,
    clearTourTimers,
    clearChatterTimers,
    clearContextualTimer,
    clearMobileTimer,
  ]);

  /* ====================================
     MOBILE — WELCOME ONLY

     First install:
       Welcome closes
       -> one short welcome
       -> mark guide complete
       -> hide

     Returning visit:
       Desktop opens
       -> one short "welcome back"
       -> hide

     No mobile tour.
     No mobile contextual guide.
     No mobile idle chatter.
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      !desktopReady ||
      !isMobile ||
      mobileGreetingStartedRef.current
    ) {
      return undefined;
    }

    mobileGreetingStartedRef.current = true;

    clearTourTimers();
    clearChatterTimers();
    clearContextualTimer();
    clearMobileTimer();

    const firstMobileGreeting =
      !guideCompleted;

    clippy.stop?.();
    clippy.show(true);

    const position = getSafePosition({
      feature: null,
      isMobile: true,
      isTablet: false,
    });

    clippy.moveTo(
      position.x,
      position.y,
      0
    );

    speak(
      firstMobileGreeting
        ? COPY.mobileWelcome
        : COPY.mobileWelcomeBack,
      'Wave'
    );

    if (firstMobileGreeting) {
      markGuideStarted();
      markGuideComplete();
    }

    mobileHideTimerRef.current =
      window.setTimeout(() => {
        clippy.stop?.();
        clippy.hide();
        mobileHideTimerRef.current =
          null;
      }, MOBILE_GREETING_VISIBLE_DURATION);

    return () => {
      clearMobileTimer();
    };
  }, [
    clippy,
    desktopReady,
    isMobile,
    guideCompleted,
    speak,
    markGuideStarted,
    markGuideComplete,
    clearTourTimers,
    clearChatterTimers,
    clearContextualTimer,
    clearMobileTimer,
  ]);

  /* ====================================
     DESKTOP / TABLET FIRST VISIT

     Preferred flow:
       Welcome closes
       -> Paint is already open
       -> Clippy frames Paint as Perdana's art
       -> ask visitor to close Paint when done
       -> wait for real close interaction
       -> AI Chat next

     If a previous visit abandoned the tour:
       brief welcome-back
       -> complete guide
       -> do not replay onboarding
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      !desktopReady ||
      isMobile ||
      guideCompleted ||
      tourStartedRef.current
    ) {
      return;
    }

    tourStartedRef.current = true;

    clearTourTimers();
    clearChatterTimers();
    clearContextualTimer();

    /*
     * Previous visit started but never finished:
     * do not restart the tutorial from Paint.
     */
    if (
      interruptedPreviousVisitRef.current
    ) {
      clippy.stop?.();
      clippy.show(true);
      moveClippy();

      speak(COPY.interrupted, 'Wave');

      /*
       * Prevent contextual effects from firing
       * immediately for an already-open window
       * when guideCompleted flips to true.
       */
      previousState.current = {
        about: Boolean(windows?.about),
        projects: Boolean(
          windows?.projects
        ),
        aiAssistant: Boolean(
          windows?.aiAssistant
        ),
        contact: Boolean(
          windows?.contact
        ),
      };

      markGuideComplete();

      addTourTimer(() => {
        clippy.stop?.();
        clippy.hide();
      }, 7000);

      return;
    }

    markGuideStarted();

    clippy.stop?.();
    clippy.show(true);

    /*
     * The expected App.jsx behavior is:
     * desktop/tablet auto-open Paint after Welcome.
     *
     * If Paint is already closed for any reason,
     * skip straight to the AI step instead of
     * blocking the visitor.
     */
    if (!windows?.paintHero) {
      setTourPhase('after-paint');
      return;
    }

    setTourPhase('waiting-paint-close');

    moveClippy('paintHero');

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippy('paintHero');
      speak(COPY.paintIntro, 'Wave');
    }, 850);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippy('paintHero');
      speak(COPY.paintClose);
    }, 7200);
  }, [
    clippy,
    desktopReady,
    isMobile,
    guideCompleted,
    windows?.paintHero,
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    moveClippy,
    speak,
    markGuideStarted,
    markGuideComplete,
    addTourTimer,
    clearTourTimers,
    clearChatterTimers,
    clearContextualTimer,
  ]);

  /* ====================================
     PAINT CLOSED -> AI CHAT
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      guideCompleted ||
      isMobile
    ) {
      return;
    }

    const shouldStartAI =
      tourPhase === 'after-paint' ||
      (tourPhase ===
        'waiting-paint-close' &&
        !windows?.paintHero);

    if (!shouldStartAI) {
      return;
    }

    clearTourTimers();

    clippy.stop?.();
    clippy.show(true);
    moveClippy();

    speak(COPY.aiLead, 'Acknowledge');

    setTourPhase('leading-to-ai');

    addTourTimer(() => {
      if (!clippy) return;

      clippy.stop?.();
      clippy.show(true);

      /*
       * Point at the REAL AI Chat icon position
       * from App.jsx (index 6).
       */
      moveClippyToTourFeature(
        'aiAssistant'
      );

      speak(COPY.aiOpenPrompt, 'Wave');

      setTourPhase('waiting-ai-open');
    }, 3300);
  }, [
    clippy,
    guideCompleted,
    isMobile,
    tourPhase,
    windows?.paintHero,
    moveClippy,
    moveClippyToTourFeature,
    speak,
    addTourTimer,
    clearTourTimers,
  ]);

  /* ====================================
     AI CHAT OPENED

     AI Chat window is on the RIGHT.
     Clippy moves to a safe LEFT position.
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      guideCompleted ||
      isMobile ||
      tourPhase !== 'waiting-ai-open' ||
      !windows?.aiAssistant
    ) {
      return;
    }

    clearTourTimers();

    clippy.stop?.();
    clippy.show(true);

    // Window is on the right -> Clippy goes left.
    moveClippy('aiAssistant');

    speak(COPY.aiFriend, 'Acknowledge');

    setTourPhase('waiting-ai-close');

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippy('aiAssistant');
      speak(COPY.aiQuestion);
    }, 5600);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.show(true);
      moveClippy('aiAssistant');
      speak(COPY.aiClose);
    }, 10300);
  }, [
    clippy,
    guideCompleted,
    isMobile,
    tourPhase,
    windows?.aiAssistant,
    moveClippy,
    speak,
    addTourTimer,
    clearTourTimers,
  ]);

  /* ====================================
     AI CHAT CLOSED -> SHORT ORIENTATION
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      guideCompleted ||
      isMobile ||
      tourPhase !== 'waiting-ai-close' ||
      windows?.aiAssistant
    ) {
      return;
    }

    clearTourTimers();

    clippy.stop?.();
    clippy.show(true);
    moveClippy();

    speak(
      COPY.tourContinue,
      'Acknowledge'
    );

    setTourPhase('orientation');
  }, [
    clippy,
    guideCompleted,
    isMobile,
    tourPhase,
    windows?.aiAssistant,
    moveClippy,
    speak,
    clearTourTimers,
  ]);

  /* ====================================
     SHORT ORIENTATION

     No more forced clicks.
     Clippy simply points out:
       My Projects -> About -> Inbox -> End

     The visitor can interrupt by opening
     something else; divergence logic below
     will gracefully end the scripted tour.
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      guideCompleted ||
      isMobile ||
      tourPhase !== 'orientation'
    ) {
      return;
    }

    clearTourTimers();

    addTourTimer(() => {
      if (!clippy) return;

      clippy.stop?.();
      clippy.show(true);

      moveClippyToTourFeature('projects');

      speak(
        COPY.projects,
        'Acknowledge'
      );
    }, 2600);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.stop?.();
      clippy.show(true);

      moveClippyToTourFeature('about');

      speak(COPY.about);
    }, 7200);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.stop?.();
      clippy.show(true);

      moveClippyToTourFeature('contact');

      speak(COPY.contact);
    }, 11600);

    addTourTimer(() => {
      if (!clippy) return;

      clippy.stop?.();
      clippy.show(true);

      moveClippy();

      speak(COPY.introEnd, 'Wave');
    }, 15800);

    addTourTimer(() => {
      if (!clippy) return;

      previousState.current = {
        about: Boolean(windows?.about),
        projects: Boolean(
          windows?.projects
        ),
        aiAssistant: Boolean(
          windows?.aiAssistant
        ),
        contact: Boolean(
          windows?.contact
        ),
      };

      markGuideComplete();

      clippy.stop?.();
      clippy.hide();
    }, 21600);

    return () => {
      /*
       * Intentionally do not clear timers here
       * just because the effect is re-evaluated.
       * Other lifecycle actions explicitly call
       * clearTourTimers() when they need to stop
       * the tour.
       */
    };
  }, [
    clippy,
    guideCompleted,
    isMobile,
    tourPhase,
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    moveClippy,
    moveClippyToTourFeature,
    speak,
    addTourTimer,
    clearTourTimers,
    markGuideComplete,
  ]);

  /* ====================================
     TOUR DIVERGENCE

     Clippy knows the preferred path,
     but never traps the visitor inside it.

     If the visitor opens something other
     than the requested next step, gracefully
     end the scripted tour and let them explore.
  ==================================== */

  React.useEffect(() => {
    const current = {
      about: Boolean(windows?.about),
      projects: Boolean(
        windows?.projects
      ),
      aiAssistant: Boolean(
        windows?.aiAssistant
      ),
      contact: Boolean(
        windows?.contact
      ),
    };

    const newlyOpened = {
      about:
        current.about &&
        !tourPreviousState.current.about,

      projects:
        current.projects &&
        !tourPreviousState.current.projects,

      aiAssistant:
        current.aiAssistant &&
        !tourPreviousState.current
          .aiAssistant,

      contact:
        current.contact &&
        !tourPreviousState.current.contact,
    };

    const openedFeature = Object.keys(
      newlyOpened
    ).find((key) => newlyOpened[key]);

    tourPreviousState.current = current;

    if (
      !clippy ||
      guideCompleted ||
      isMobile ||
      !openedFeature
    ) {
      return;
    }

    let isExpectedAction = false;

    if (
      tourPhase === 'waiting-ai-open' &&
      openedFeature === 'aiAssistant'
    ) {
      isExpectedAction = true;
    }

    if (isExpectedAction) {
      return;
    }

    const shouldGracefullyExit =
      tourPhase ===
        'waiting-paint-close' ||
      tourPhase === 'leading-to-ai' ||
      tourPhase === 'waiting-ai-open' ||
      tourPhase === 'waiting-ai-close' ||
      tourPhase === 'orientation';

    if (!shouldGracefullyExit) {
      return;
    }

    clearTourTimers();
    clearChatterTimers();
    clearContextualTimer();

    clippy.stop?.();
    clippy.show(true);
    moveClippy();

    speak(
      COPY.exploreInstead,
      'Acknowledge'
    );

    /*
     * Treat the current open window as already
     * acknowledged so contextual guidance does
     * not immediately repeat itself.
     */
    previousState.current = current;

    markGuideComplete();

    addTourTimer(() => {
      clippy.stop?.();
      clippy.hide();
    }, 5200);
  }, [
    clippy,
    guideCompleted,
    isMobile,
    tourPhase,
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    moveClippy,
    speak,
    addTourTimer,
    markGuideComplete,
    clearTourTimers,
    clearChatterTimers,
    clearContextualTimer,
  ]);

  /* ====================================
     CENTRAL POSITION MANAGER

     Normal desktop/tablet idle position only.
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
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
      if (
        installerOpen ||
        !guideCompleted ||
        isMobile
      ) {
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
    isMobile,
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    moveClippy,
  ]);

  /* ====================================
     CONTEXTUAL GUIDE HELPER

     Desktop/tablet only.
     Mobile is welcome-only.
  ==================================== */

  const showContextualGuide =
    React.useCallback(
      (
        message,
        feature,
        animation = 'Acknowledge'
      ) => {
        if (
          !clippy ||
          !guideCompleted ||
          !desktopReady ||
          isMobile
        ) {
          return;
        }

        clearChatterTimers();
        clearContextualTimer();

        clippy.stop?.();
        clippy.show(true);

        moveClippy(feature);
        speak(message, animation);

        contextualHideTimerRef.current =
          window.setTimeout(() => {
            clippy.stop?.();
            clippy.hide();

            contextualHideTimerRef.current =
              null;
          }, CONTEXTUAL_VISIBLE_DURATION);
      },
      [
        clippy,
        guideCompleted,
        desktopReady,
        isMobile,
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
    const isOpen = Boolean(
      windows?.about
    );

    if (
      isOpen &&
      !previousState.current.about
    ) {
      showContextualGuide(
        COPY.contextualAbout,
        'about'
      );
    }

    previousState.current.about = isOpen;
  }, [
    windows?.about,
    showContextualGuide,
  ]);

  /* ====================================
     PROJECTS CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {
    const isOpen = Boolean(
      windows?.projects
    );

    if (
      isOpen &&
      !previousState.current.projects
    ) {
      showContextualGuide(
        COPY.contextualProjects,
        'projects'
      );
    }

    previousState.current.projects =
      isOpen;
  }, [
    windows?.projects,
    showContextualGuide,
  ]);

  /* ====================================
     AI CHAT CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {
    const isOpen = Boolean(
      windows?.aiAssistant
    );

    if (
      isOpen &&
      !previousState.current
        .aiAssistant
    ) {
      showContextualGuide(
        COPY.contextualAI,
        'aiAssistant'
      );
    }

    previousState.current.aiAssistant =
      isOpen;
  }, [
    windows?.aiAssistant,
    showContextualGuide,
  ]);

  /* ====================================
     INBOX CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {
    const isOpen = Boolean(
      windows?.contact
    );

    if (
      isOpen &&
      !previousState.current.contact
    ) {
      showContextualGuide(
        COPY.contextualContact,
        'contact'
      );
    }

    previousState.current.contact =
      isOpen;
  }, [
    windows?.contact,
    showContextualGuide,
  ]);

  /* ====================================
     CLICK CLIPPY TO TALK

     Desktop/tablet idle Clippy only.
     Disabled during:
       - mobile
       - first tour
       - contextual window
  ==================================== */

  React.useEffect(() => {
    if (!clippy) {
      return undefined;
    }

    let cleanup = null;
    let retryTimer = null;

    const attachClick = () => {
      const clippyElement =
        document.querySelector('.clippy');

      if (!clippyElement) {
        retryTimer = window.setTimeout(
          attachClick,
          100
        );
        return;
      }

      const handleClick = (event) => {
        if (
          isMobile ||
          !guideCompleted ||
          !desktopReady ||
          contextualWindowOpen
        ) {
          return;
        }

        event.stopPropagation();

        /*
         * Clicking only adds a line while
         * Clippy is already on screen.
         */
        clippy.stop?.();
        clippy.show(true);
        speakRandomMessage();
      };

      clippyElement.addEventListener(
        'click',
        handleClick
      );

      cleanup = () => {
        clippyElement.removeEventListener(
          'click',
          handleClick
        );
      };
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
     RANDOM IDLE CHATTER

     Desktop + tablet only.

     After guide complete:
     wait 18–30s
     -> appear
     -> speak
     -> stay 8s
     -> hide
     -> repeat

     Mobile has NO idle Clippy.
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

      if (
        clippy &&
        isMobile &&
        guideCompleted
      ) {
        /*
         * Don't fight the mobile greeting timer.
         * It owns visibility while the greeting
         * is active.
         */
        if (
          !mobileHideTimerRef.current
        ) {
          clippy.stop?.();
          clippy.hide();
        }
      }

      return undefined;
    }

    const scheduleNextChatter = () => {
      clearChatterTimers();

      const delay =
        RANDOM_MIN_DELAY +
        Math.random() *
          RANDOM_MAX_EXTRA_DELAY;

      chatterTimerRef.current =
        window.setTimeout(() => {
          if (!clippy) {
            return;
          }

          clippy.stop?.();
          clippy.show(true);

          moveClippy();
          speakRandomMessage();

          chatterHideTimerRef.current =
            window.setTimeout(() => {
              clippy.stop?.();
              clippy.hide();

              chatterHideTimerRef.current =
                null;

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
      clearMobileTimer();
    };
  }, [
    clearTourTimers,
    clearChatterTimers,
    clearContextualTimer,
    clearMobileTimer,
  ]);

  return null;
}
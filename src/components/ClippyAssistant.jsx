import React from 'react';
import { useClippy } from '@react95/clippy';

/* ======================================
   CONTEXTUAL COPY
====================================== */

const CONTEXTUAL_MESSAGES = {
  about: {
    text:
      "You're in About. This is the quickest place to understand who Perdana is and what he's exploring now.",
    animation: 'Wave',
  },
  projects: {
    text:
      "This is My Projects. Start here for the actual work — visual systems, Product Design, and Design Engineering experiments.",
    animation: 'Acknowledge',
  },
  aiAssistant: {
    text:
      'Need a shortcut? perdana.ai knows Perdana pretty well. Ask about the work, experience, projects, or current direction.',
    animation: 'Acknowledge',
  },
  contact: {
    text:
      'Inbox lets you contact Perdana directly without leaving the desktop.',
    animation: 'Acknowledge',
  },
  blog: {
    text:
      "This is Writing. It's where Perdana documents the thinking, experiments, and things he learns along the way.",
    animation: 'Wave',
  },
  whatsNew: {
    text:
      "What's New keeps track of recent changes to this little computer.",
    animation: 'Acknowledge',
  },
  recycleBin: {
    text:
      "You opened the Recycle Bin. I knew curiosity would get you eventually.",
    animation: 'Wave',
  },
  desktopVideo: {
    text:
      'Media Player is here because not every part of a portfolio needs to be serious.',
    animation: 'Acknowledge',
  },
  paintHero: {
    text:
      "MS Paint is Perdana's quick visual introduction. Very polished portfolios are overrated anyway.",
    animation: 'Wave',
  },
};

/* ======================================
   RANDOM IDLE MESSAGES
====================================== */

const RANDOM_MESSAGES = [
  {
    text:
      'Need a hand? Try opening My Projects to see the actual work.',
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
      'Inbox lets you send Perdana a message without leaving the desktop.',
    animation: 'Acknowledge',
  },
  {
    text:
      "The Installer isn't just decoration. It's part of the portfolio experience.",
    animation: 'Wave',
  },
  {
    text:
      'You can open several windows at once. This is a computer, after all.',
    animation: 'Acknowledge',
  },
  {
    text:
      "Curious what changed recently? Check What's New.",
    animation: 'Acknowledge',
  },
  {
    text:
      'Some parts of this desktop are useful. Some are here because clicking things is fun.',
    animation: 'Wave',
  },
  {
    text: "Yes, I'm still here.",
    animation: 'Wave',
  },
  {
    text:
      "I wouldn't ignore the Recycle Bin forever.",
    animation: 'Acknowledge',
  },
  {
    text:
      'This portfolio works more like a computer than a traditional scrolling website. Feel free to look around.',
    animation: 'Acknowledge',
  },
  {
    text:
      "If you're looking for case studies, My Projects is probably where you want to go.",
    animation: 'Acknowledge',
  },
  {
    text:
      'Not sure where to start? About for the person. My Projects for the work. perdana.ai for questions.',
    animation: 'Wave',
  },
  {
    text:
      'Perdana built this portfolio as an interactive design-in-code experiment.',
    animation: 'Acknowledge',
  },
];

/* ======================================
   TIMING
====================================== */

// Desktop/tablet idle Clippy:
// wait 18–30s -> appear -> speak -> stay 8s -> hide -> repeat.
const RANDOM_MIN_DELAY = 5000;
const RANDOM_MAX_EXTRA_DELAY = 5000;
const RANDOM_VISIBLE_DURATION = 8000;
const CONTEXTUAL_VISIBLE_DURATION = 8000;

const MOVE_DURATION = 650;
const ANIMATION_DURATION = 900;
const TASKBAR_HEIGHT = 28;

/* ======================================
   POSITION HELPERS
====================================== */

function getClippyPosition() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width <= 600) {
    return {
      x: Math.max(8, width - 112),
      y: Math.max(80, height - TASKBAR_HEIGHT - 125),
    };
  }

  if (width <= 1024) {
    return {
      x: Math.max(16, width - 145),
      y: Math.max(110, height - TASKBAR_HEIGHT - 155),
    };
  }

  return {
    x: Math.max(24, width - 175),
    y: Math.max(130, height - TASKBAR_HEIGHT - 170),
  };
}

function getSafePosition({
  feature,
  isMobile,
  isTablet,
}) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (isMobile) {
    // Mobile only shows contextual Clippy briefly.
    // Keep him near the lower-right corner.
    return {
      x: Math.max(8, width - 112),
      y: Math.max(80, height - TASKBAR_HEIGHT - 125),
    };
  }

  if (isTablet) {
    switch (feature) {
      case 'aiAssistant':
      case 'contact':
        return {
          x: 20,
          y: Math.max(110, height - TASKBAR_HEIGHT - 155),
        };

      case 'paintHero':
        return {
          x: 16,
          y: Math.max(110, height - TASKBAR_HEIGHT - 145),
        };

      case 'projects':
      case 'about':
      case 'blog':
      case 'whatsNew':
      case 'recycleBin':
      case 'desktopVideo':
      default:
        return {
          x: Math.max(20, width - 145),
          y: Math.max(110, height - TASKBAR_HEIGHT - 155),
        };
    }
  }

  switch (feature) {
    case 'aiAssistant':
    case 'contact':
      return {
        x: 40,
        y: Math.max(150, height - TASKBAR_HEIGHT - 170),
      };

    case 'paintHero':
      return {
        x: 28,
        y: Math.max(145, height - TASKBAR_HEIGHT - 170),
      };

    case 'projects':
    case 'about':
    case 'blog':
    case 'whatsNew':
    case 'recycleBin':
    case 'desktopVideo':
    default:
      return {
        x: Math.max(24, width - 180),
        y: Math.max(130, height - TASKBAR_HEIGHT - 160),
      };
  }
}

/* ======================================
   CLIPPY ASSISTANT

   UX MODE:
   - NO first tour
   - NO guided sequence
   - NO click-to-talk
   - random idle on desktop/tablet only
   - contextual speech when selected windows open
   - hidden during Boot / Installer / Welcome
====================================== */

export default function ClippyAssistant({
  pcScreen,
  isMobile,
  isTablet,
  windows,
  desktopInstallerVisible,
}) {
  const { clippy } = useClippy();

  const lastRandomIndex = React.useRef(-1);

  // Initialize with the current state so windows that are already open on
  // initial render (especially Paint Hero) do not trigger contextual speech.
  const previousState = React.useRef({
    about: Boolean(windows?.about),
    projects: Boolean(windows?.projects),
    aiAssistant: Boolean(windows?.aiAssistant),
    contact: Boolean(windows?.contact),
    blog: Boolean(windows?.blog),
    whatsNew: Boolean(windows?.whatsNew),
    recycleBin: Boolean(windows?.recycleBin),
    desktopVideo: Boolean(windows?.desktopVideo),
    paintHero: Boolean(windows?.paintHero),
  });

  const chatterTimerRef = React.useRef(null);
  const chatterHideTimerRef = React.useRef(null);
  const contextualHideTimerRef = React.useRef(null);

  const installerOpen = Boolean(
    desktopInstallerVisible
  );

  const desktopReady = Boolean(
    clippy &&
      pcScreen === 'desktop' &&
      !installerOpen &&
      !windows?.welcome
  );

  // Pause idle chatter while these primary windows are open.
  // Paint is intentionally excluded because it auto-opens on desktop/tablet.
  const contextualWindowOpen = Boolean(
    windows?.about ||
      windows?.projects ||
      windows?.aiAssistant ||
      windows?.contact ||
      windows?.blog ||
      windows?.whatsNew ||
      windows?.recycleBin ||
      windows?.desktopVideo
  );

  /* ====================================
     TIMER HELPERS
  ==================================== */

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
     SPEAK / MOVE HELPERS
  ==================================== */

  const speak = React.useCallback(
    (message, animation = 'Acknowledge') => {
      if (!clippy) return;

      if (animation && clippy.play) {
        clippy.play(animation, ANIMATION_DURATION);
      }

      clippy.speak(message);
    },
    [clippy]
  );

  const moveClippy = React.useCallback(
    (feature = null, duration = MOVE_DURATION) => {
      if (!clippy) return;

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

  const speakRandomMessage = React.useCallback(() => {
    if (!clippy) return;

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

  const showContextualMessage = React.useCallback(
    (feature) => {
      if (!clippy || !desktopReady) return;

      const item = CONTEXTUAL_MESSAGES[feature];
      if (!item) return;

      clearChatterTimers();
      clearContextualTimer();

      clippy.stop?.();
      clippy.show(true);
      moveClippy(feature, isMobile ? 0 : MOVE_DURATION);
      speak(item.text, item.animation);

      contextualHideTimerRef.current =
        window.setTimeout(() => {
          clippy.stop?.();
          clippy.hide();
          contextualHideTimerRef.current = null;
        }, CONTEXTUAL_VISIBLE_DURATION);
    },
    [
      clippy,
      desktopReady,
      isMobile,
      moveClippy,
      speak,
      clearChatterTimers,
      clearContextualTimer,
    ]
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
        pointer-events: none !important;
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
    `;

    document.head.appendChild(style);

    return () => {
      document
        .getElementById(styleId)
        ?.remove();
    };
  }, []);

  /* ====================================
     GLOBAL VISIBILITY GUARD

     Always hide Clippy during:
     - Boot
     - Installer
     - Welcome after Reset
  ==================================== */

  React.useEffect(() => {
    if (!clippy) return;

    if (desktopReady) return;

    clearChatterTimers();
    clearContextualTimer();

    clippy.stop?.();
    clippy.hide();
  }, [
    clippy,
    desktopReady,
    clearChatterTimers,
    clearContextualTimer,
  ]);

  /* ====================================
     CONTEXTUAL WINDOW OPEN

     Detect false -> true only.
     Initial Paint Hero does not trigger because
     previousState starts from current App state.
  ==================================== */

  React.useEffect(() => {
    const current = {
      about: Boolean(windows?.about),
      projects: Boolean(windows?.projects),
      aiAssistant: Boolean(windows?.aiAssistant),
      contact: Boolean(windows?.contact),
      blog: Boolean(windows?.blog),
      whatsNew: Boolean(windows?.whatsNew),
      recycleBin: Boolean(windows?.recycleBin),
      desktopVideo: Boolean(windows?.desktopVideo),
      paintHero: Boolean(windows?.paintHero),
    };

    const newlyOpened = Object.keys(current).find(
      (key) =>
        current[key] &&
        !previousState.current[key]
    );

    previousState.current = current;

    if (!newlyOpened) return;

    showContextualMessage(newlyOpened);
  }, [
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    windows?.blog,
    windows?.whatsNew,
    windows?.recycleBin,
    windows?.desktopVideo,
    windows?.paintHero,
    showContextualMessage,
  ]);

  /* ====================================
     RANDOM IDLE CHATTER

     Desktop/tablet only.
     Mobile random Clippy stays OFF.
  ==================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      !desktopReady ||
      contextualWindowOpen ||
      isMobile
    ) {
      clearChatterTimers();
      return undefined;
    }

    const scheduleNextChatter = () => {
      clearChatterTimers();

      const delay =
        RANDOM_MIN_DELAY +
        Math.random() * RANDOM_MAX_EXTRA_DELAY;

      chatterTimerRef.current =
        window.setTimeout(() => {
          if (!clippy) return;

          clippy.stop?.();
          clippy.show(true);
          moveClippy();
          speakRandomMessage();

          chatterHideTimerRef.current =
            window.setTimeout(() => {
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
    desktopReady,
    contextualWindowOpen,
    isMobile,
    moveClippy,
    speakRandomMessage,
    clearChatterTimers,
  ]);

  /* ====================================
     RESPONSIVE POSITION
  ==================================== */

  React.useEffect(() => {
    if (!clippy) return undefined;

    const handleResize = () => {
      if (!desktopReady) return;

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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );
    };
  }, [
    clippy,
    desktopReady,
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
    moveClippy,
  ]);

  /* ====================================
     CLEANUP
  ==================================== */

  React.useEffect(() => {
    return () => {
      clearChatterTimers();
      clearContextualTimer();
      clippy?.stop?.();
      clippy?.hide?.();
    };
  }, [
    clippy,
    clearChatterTimers,
    clearContextualTimer,
  ]);

  return null;
}

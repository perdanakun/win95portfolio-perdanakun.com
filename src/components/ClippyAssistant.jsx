import React from 'react';
import { useClippy } from '@react95/clippy';

/* ======================================
   CONFIG
====================================== */

const APPEAR_DELAY = 1200;
const HIDE_DELAY = 7000;

const TASKBAR_HEIGHT = 28;


/* ======================================
   WELCOME MESSAGES
====================================== */

const WELCOME_MESSAGES = [
  "Looks like you're exploring a portfolio! Try clicking around the icons up top.",

  "Psst — there's an AI on the right if you've got questions about Perdana.",

  "New here? Click any folder to start digging through Perdana's work.",

  "Welcome to Perdana's Computer! Everything on this desktop is here to be explored.",

  "Not sure where to start? My Projects is probably a good place.",

  "Yes, this really is a portfolio. Perdana just made it look like a computer.",

  "Go ahead, click things. That's kind of the point.",

  "Looking for Perdana's work? Try opening My Projects.",

  "You can ask perdana.ai on the right if you'd rather talk than browse.",

  "This desktop has more than it looks. Feel free to poke around.",
];


function getRandomWelcomeMessage() {
  const randomIndex =
    Math.floor(
      Math.random() *
        WELCOME_MESSAGES.length
    );

  return WELCOME_MESSAGES[
    randomIndex
  ];
}


/* ======================================
   PAGE-LOAD GUARD
====================================== */

let hasClippyGreetedThisPageLoad =
  false;


/* ======================================
   POSITION
====================================== */

function getClippyPosition() {
  const height =
    window.innerHeight;

  return {
    // LEFT BOTTOM
    x: 12,

    // Sedikit di atas taskbar
    y: Math.max(
      80,
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
  desktopInstallerVisible,
}) {
  const { clippy } =
    useClippy();


  /* ======================================
     DESKTOP READY
  ====================================== */

const desktopReady =
  Boolean(
    clippy &&
    pcScreen === 'desktop' &&
    !desktopInstallerVisible
  );


  /* ======================================
     BASIC CSS
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
        z-index: 9998 !important;
      }

      .clippy-balloon {
        pointer-events: none !important;
        z-index: 9999 !important;
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
     ONE-TIME RANDOM WELCOME
  ====================================== */

  React.useEffect(() => {
    if (
      !clippy ||
      !desktopReady ||
      hasClippyGreetedThisPageLoad
    ) {
      return undefined;
    }


    let hideTimer = null;


    const appearTimer =
      window.setTimeout(
        () => {

          /*
           * Prevent double execution
           * in React StrictMode.
           */

          if (
            hasClippyGreetedThisPageLoad
          ) {
            return;
          }


          /*
           * Clippy sudah menjalankan
           * greeting untuk page load ini.
           */

          hasClippyGreetedThisPageLoad =
            true;


          /* ------------------------------
             RANDOM MESSAGE
          ------------------------------ */

          const welcomeMessage =
            getRandomWelcomeMessage();


          /* ------------------------------
             POSITION
          ------------------------------ */

          const position =
            getClippyPosition();


          /* ------------------------------
             RESET
          ------------------------------ */

          clippy.stop?.();


          /* ------------------------------
             MOVE WHILE HIDDEN
          ------------------------------ */

          clippy.moveTo?.(
            position.x,
            position.y
          );


          /* ------------------------------
             SHOW
          ------------------------------ */

          clippy.show?.();


          /* ------------------------------
             SPEAK
          ------------------------------ */

          clippy.speak?.(
            welcomeMessage,
            true
          );


          /* ------------------------------
             HIDE
          ------------------------------ */

          hideTimer =
            window.setTimeout(
              () => {

                clippy.stop?.();

                clippy.hide?.();

              },

              HIDE_DELAY
            );

        },

        APPEAR_DELAY
      );


    /* ==================================
       CLEANUP
    ================================== */

    return () => {

      window.clearTimeout(
        appearTimer
      );


      if (hideTimer) {
        window.clearTimeout(
          hideTimer
        );
      }

    };

  }, [
    clippy,
    desktopReady,
  ]);


  /* ======================================
     FINAL CLEANUP
  ====================================== */

  React.useEffect(() => {

    return () => {

      clippy?.stop?.();

      clippy?.hide?.();

    };

  }, [clippy]);


  return null;
}
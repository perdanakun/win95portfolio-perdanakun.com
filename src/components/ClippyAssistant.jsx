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

  const { clippy } =
    useClippy();


  /* ====================================
     PREVIOUS WINDOW STATE

     Digunakan supaya contextual
     message hanya muncul ketika
     false -> true.
  ==================================== */

  const previousState =
    React.useRef({

      about: false,

      projects: false,

      aiAssistant: false,

      contact: false,

      installer: false,

    });


  /* ====================================
     FIRST VISIT TOUR TIMERS
  ==================================== */

  const introTimers =
    React.useRef([]);


  /* ====================================
     RANDOM MESSAGE HISTORY
  ==================================== */

  const lastRandomIndex =
    React.useRef(-1);


  /* ====================================
     SPEAK HELPER
  ==================================== */

  const speak =
    React.useCallback(
      (
        message,
        animation = 'Acknowledge'
      ) => {

        if (!clippy) {
          return;
        }


        /*
          Stop queue / animation lama
          supaya message baru punya
          prioritas.
        */

        if (clippy.stop) {

          clippy.stop();

        }


        /*
          Mainkan animation bila tersedia.
        */

        if (
          animation &&
          clippy.play
        ) {

          clippy.play(
            animation
          );

        }


        /*
          Speech balloon.
        */

        clippy.speak(
          message
        );

      },
      [
        clippy,
      ]
    );


  /* ====================================
     RANDOM SPEAK HELPER
  ==================================== */

  const speakRandomMessage =
    React.useCallback(() => {

      if (!clippy) {
        return;
      }


      let nextIndex =
        0;


      /*
        Hindari pesan yang sama
        dua kali berturut-turut.
      */

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


      const item =
        RANDOM_MESSAGES[
          nextIndex
        ];


      speak(
        item.text,
        item.animation
      );

    }, [
      clippy,
      speak,
    ]);


  /* ====================================
     MOVE HELPER
  ==================================== */

  const moveClippy =
    React.useCallback(
      (
        feature = null
      ) => {

        if (!clippy) {
          return;
        }


        const position =
          feature
            ? getSafePosition({
                feature,
                isMobile,
                isTablet,
              })
            : getClippyPosition();


        clippy.moveTo(
          position.x,
          position.y
        );

      },
      [
        clippy,
        isMobile,
        isTablet,
      ]
    );


  /* ====================================
     COMPACT SPEECH BALLOON

     Inject styling karena balloon
     dibuat oleh Clippy library.
  ==================================== */

  React.useEffect(() => {

    const styleId =
      'perdana-clippy-style';


    /*
      Jangan duplicate style.
    */

    if (
      document.getElementById(
        styleId
      )
    ) {

      return;

    }


    const style =
      document.createElement(
        'style'
      );


    style.id =
      styleId;


    style.textContent = `

      .clippy {
        pointer-events: auto !important;
      }

      .clippy-balloon {
        font-family:
          "MS Sans Serif",
          Arial,
          sans-serif !important;
      }

      .clippy-content {
        font-family:
          "MS Sans Serif",
          Arial,
          sans-serif !important;

        font-size:
          11px !important;

        line-height:
          1.08 !important;
      }

      @media (max-width: 600px) {

        .clippy {
          touch-action:
            none !important;

          cursor:
            grab;
        }

        .clippy:active {
          cursor:
            grabbing;
        }

        .clippy-content {
          line-height:
            1.05 !important;
        }

      }

    `;


    document.head.appendChild(
      style
    );


    return () => {

      /*
        Tidak wajib dibuang karena
        component biasanya hidup sepanjang
        lifecycle app.

        Tapi cleanup tetap aman.
      */

      const element =
        document.getElementById(
          styleId
        );


      if (element) {

        element.remove();

      }

    };

  }, []);


  /* ====================================
     SHOW / HIDE
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {
      return;
    }


    /*
      Tidak tampil ketika BIOS / boot.
    */

    if (
      pcScreen === 'boot'
    ) {

      clippy.hide();

      return;

    }


    /*
      Installer + Desktop
      Clippy tampil.
    */

    clippy.show();

  }, [
    clippy,
    pcScreen,
  ]);


  /* ====================================
     MOBILE DRAG

     Hanya smartphone yang draggable.
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {
      return;
    }


    let cleanupListeners =
      null;

    let retryTimer =
      null;


    const attachDragEvents =
      () => {

        const clippyElement =
          document.querySelector(
            '.clippy'
          );


        /*
          DOM Clippy bisa muncul sedikit
          setelah object Clippy ready.
        */

        if (!clippyElement) {

          retryTimer =
            window.setTimeout(
              attachDragEvents,
              100
            );

          return;

        }


        clippyElement.style.pointerEvents =
          'auto';

        clippyElement.style.touchAction =
          'none';


        let isDragging =
          false;

        let offsetX =
          0;

        let offsetY =
          0;


        /* ==============================
           POINTER DOWN
        ============================== */

        const handlePointerDown =
          (
            event
          ) => {

            /*
              Drag hanya mobile.
            */

            if (
              window.innerWidth > 600
            ) {

              return;

            }


            isDragging =
              true;


            const rect =
              clippyElement
                .getBoundingClientRect();


            offsetX =
              event.clientX -
              rect.left;


            offsetY =
              event.clientY -
              rect.top;


            clippyElement
              .setPointerCapture?.(
                event.pointerId
              );


            event.preventDefault();

          };


        /* ==============================
           POINTER MOVE
        ============================== */

        const handlePointerMove =
          (
            event
          ) => {

            if (!isDragging) {

              return;

            }


            const maxX =
              Math.max(
                0,

                window.innerWidth -
                  clippyElement.offsetWidth
              );


            const maxY =
              Math.max(
                0,

                window.innerHeight -
                  28 -
                  clippyElement.offsetHeight
              );


            const x =
              Math.max(
                0,

                Math.min(
                  maxX,

                  event.clientX -
                    offsetX
                )
              );


            const y =
              Math.max(
                0,

                Math.min(
                  maxY,

                  event.clientY -
                    offsetY
                )
              );


            clippy.moveTo(
              x,
              y
            );

          };


        /* ==============================
           POINTER UP
        ============================== */

        const handlePointerUp =
          (
            event
          ) => {

            if (!isDragging) {

              return;

            }


            isDragging =
              false;


            try {

              clippyElement
                .releasePointerCapture?.(
                  event.pointerId
                );

            } catch {

              /*
                Pointer mungkin sudah
                dilepas oleh browser.
              */

            }

          };


        /* ==============================
           POINTER CANCEL
        ============================== */

        const handlePointerCancel =
          () => {

            isDragging =
              false;

          };


        /* ==============================
           LISTENERS
        ============================== */

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


        cleanupListeners =
          () => {

            clippyElement
              .removeEventListener(
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

        window.clearTimeout(
          retryTimer
        );

      }


      if (cleanupListeners) {

        cleanupListeners();

      }

    };

  }, [
    clippy,
  ]);


  /* ====================================
     FIRST VISIT FEATURE TOUR
  ==================================== */

  React.useEffect(() => {

    if (
      !clippy ||
      pcScreen !== 'desktop' ||
      !pcInstalled
    ) {

      return;

    }


    /*
      Jangan mulai desktop tour ketika
      installer masih terlihat.
    */

    if (
      welcomeInstallerVisible ||
      welcomeInstallerLoadingVisible ||
      installerVisible
    ) {

      return;

    }


    const hasSeenGuide =
      localStorage.getItem(
        'perdana-clippy-guide-seen'
      );


    if (hasSeenGuide) {

      return;

    }


    /*
      Bersihkan timer lama.
    */

    introTimers.current
      .forEach(
        (
          timer
        ) => {

          window.clearTimeout(
            timer
          );

        }
      );


    introTimers.current =
      [];


    /* ==================================
       INTRO
    ================================== */

    introTimers.current.push(

      window.setTimeout(
        () => {

          moveClippy();


          speak(
            COPY.intro,
            'Wave'
          );

        },
        1200
      )

    );


    /* ==================================
       PROJECTS
    ================================== */

    introTimers.current.push(

      window.setTimeout(
        () => {

          moveClippy(
            'projects'
          );


          speak(
            COPY.introProjects
          );

        },
        8000
      )

    );


    /* ==================================
       AI CHAT
    ================================== */

    introTimers.current.push(

      window.setTimeout(
        () => {

          moveClippy(
            'aiAssistant'
          );


          speak(
            COPY.introAI
          );

        },
        16000
      )

    );


    /* ==================================
       ABOUT
    ================================== */

    introTimers.current.push(

      window.setTimeout(
        () => {

          moveClippy(
            'about'
          );


          speak(
            COPY.introAbout
          );

        },
        24000
      )

    );


    /* ==================================
       INBOX
    ================================== */

    introTimers.current.push(

      window.setTimeout(
        () => {

          moveClippy(
            'contact'
          );


          speak(
            COPY.introInbox
          );


          /*
            Tour selesai.
          */

          localStorage.setItem(
            'perdana-clippy-guide-seen',
            'true'
          );

        },
        32000
      )

    );


    return () => {

      introTimers.current
        .forEach(
          (
            timer
          ) => {

            window.clearTimeout(
              timer
            );

          }
        );


      introTimers.current =
        [];

    };

  }, [
    clippy,

    pcScreen,

    pcInstalled,

    welcomeInstallerVisible,
    welcomeInstallerLoadingVisible,
    installerVisible,

    speak,

    moveClippy,
  ]);


  /* ====================================
     CANCEL FIRST TOUR WHEN USER ACTS
  ==================================== */

  React.useEffect(() => {

    const userOpenedFeature =
      Boolean(

        windows?.about ||

        windows?.projects ||

        windows?.aiAssistant ||

        windows?.contact

      );


    if (!userOpenedFeature) {

      return;

    }


    /*
      User sudah tahu cara eksplorasi.
      Stop scripted tour.
    */

    introTimers.current
      .forEach(
        (
          timer
        ) => {

          window.clearTimeout(
            timer
          );

        }
      );


    introTimers.current =
      [];


    /*
      Jangan restart scripted tour
      setelah window ditutup.
    */

    localStorage.setItem(
      'perdana-clippy-guide-seen',
      'true'
    );

  }, [
    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,
  ]);


  /* ====================================
     CENTRAL POSITION MANAGER

     Priority:

     Installer
     AI Chat
     Inbox
     Projects
     About
     Home
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {

      return;

    }


    const installerOpen =
      Boolean(

        welcomeInstallerVisible ||

        welcomeInstallerLoadingVisible ||

        installerVisible

      );


    /* ==================================
       INSTALLER
    ================================== */

    if (installerOpen) {

      moveClippy(
        'installer'
      );

      return;

    }


    /* ==================================
       AI CHAT
    ================================== */

    if (
      windows?.aiAssistant
    ) {

      moveClippy(
        'aiAssistant'
      );

      return;

    }


    /* ==================================
       INBOX
    ================================== */

    if (
      windows?.contact
    ) {

      moveClippy(
        'contact'
      );

      return;

    }


    /* ==================================
       PROJECTS
    ================================== */

    if (
      windows?.projects
    ) {

      moveClippy(
        'projects'
      );

      return;

    }


    /* ==================================
       ABOUT
    ================================== */

    if (
      windows?.about
    ) {

      moveClippy(
        'about'
      );

      return;

    }


    /* ==================================
       RETURN HOME
    ================================== */

    const timer =
      window.setTimeout(
        () => {

          moveClippy();

        },
        250
      );


    return () => {

      window.clearTimeout(
        timer
      );

    };

  }, [
    clippy,

    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,

    welcomeInstallerVisible,
    welcomeInstallerLoadingVisible,
    installerVisible,

    moveClippy,
  ]);


  /* ====================================
     RESPONSIVE / ORIENTATION CHANGE
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {

      return;

    }


    const handleResize =
      () => {

        const installerOpen =
          Boolean(

            welcomeInstallerVisible ||

            welcomeInstallerLoadingVisible ||

            installerVisible

          );


        if (installerOpen) {

          moveClippy(
            'installer'
          );

          return;

        }


        if (
          windows?.aiAssistant
        ) {

          moveClippy(
            'aiAssistant'
          );

          return;

        }


        if (
          windows?.contact
        ) {

          moveClippy(
            'contact'
          );

          return;

        }


        if (
          windows?.projects
        ) {

          moveClippy(
            'projects'
          );

          return;

        }


        if (
          windows?.about
        ) {

          moveClippy(
            'about'
          );

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

    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,

    welcomeInstallerVisible,
    welcomeInstallerLoadingVisible,
    installerVisible,

    moveClippy,
  ]);


  /* ====================================
     ABOUT CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {

      return;

    }


    const isOpen =
      Boolean(
        windows?.about
      );


    if (
      isOpen &&
      !previousState.current.about
    ) {

      speak(
        COPY.about
      );

    }


    previousState.current.about =
      isOpen;

  }, [
    clippy,
    windows?.about,
    speak,
  ]);


  /* ====================================
     PROJECTS CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {

      return;

    }


    const isOpen =
      Boolean(
        windows?.projects
      );


    if (
      isOpen &&
      !previousState.current.projects
    ) {

      speak(
        COPY.projects
      );

    }


    previousState.current.projects =
      isOpen;

  }, [
    clippy,
    windows?.projects,
    speak,
  ]);


  /* ====================================
     AI CHAT CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {

      return;

    }


    const isOpen =
      Boolean(
        windows?.aiAssistant
      );


    if (
      isOpen &&
      !previousState
        .current
        .aiAssistant
    ) {

      speak(
        COPY.aiAssistant
      );

    }


    previousState
      .current
      .aiAssistant =
        isOpen;

  }, [
    clippy,
    windows?.aiAssistant,
    speak,
  ]);


  /* ====================================
     INBOX CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {

      return;

    }


    const isOpen =
      Boolean(
        windows?.contact
      );


    if (
      isOpen &&
      !previousState.current.contact
    ) {

      speak(
        COPY.contact
      );

    }


    previousState.current.contact =
      isOpen;

  }, [
    clippy,
    windows?.contact,
    speak,
  ]);


  /* ====================================
     INSTALLER CONTEXTUAL GUIDE
  ==================================== */

  React.useEffect(() => {

    if (!clippy) {

      return;

    }


    const isOpen =
      Boolean(

        welcomeInstallerVisible ||

        welcomeInstallerLoadingVisible ||

        installerVisible

      );


    if (
      isOpen &&
      !previousState.current.installer
    ) {

      speak(
        COPY.installer,
        'Wave'
      );

    }


    previousState.current.installer =
      isOpen;

  }, [
    clippy,

    welcomeInstallerVisible,
    welcomeInstallerLoadingVisible,
    installerVisible,

    speak,
  ]);


  /* ====================================
     RANDOM IDLE CHATTER

     Clippy bicara random ketika user
     sedang berada di desktop idle.

     Delay setiap message:
     ±20 sampai 40 detik.
  ==================================== */

  React.useEffect(() => {

    if (
      !clippy ||
      pcScreen !== 'desktop' ||
      !pcInstalled
    ) {

      return;

    }


    const installerOpen =
      Boolean(

        welcomeInstallerVisible ||

        welcomeInstallerLoadingVisible ||

        installerVisible

      );


    /*
      Installer punya contextual guide
      sendiri, jadi idle chatter off.
    */

    if (installerOpen) {

      return;

    }


    let chatterTimer =
      null;

    let cancelled =
      false;


    const scheduleNextMessage =
      () => {

        if (cancelled) {

          return;

        }


        /*
          Random:
          20–40 seconds.
        */

        const delay =
          20000 +
          Math.random() *
          20000;


        chatterTimer =
          window.setTimeout(
            () => {

              if (cancelled) {

                return;

              }


              /*
                Jangan potong contextual
                experience ketika user
                sedang membuka feature utama.
              */

              const importantWindowOpen =
                Boolean(

                  windows?.about ||

                  windows?.projects ||

                  windows?.aiAssistant ||

                  windows?.contact

                );


              if (
                !importantWindowOpen
              ) {

                speakRandomMessage();

              }


              /*
                Schedule random berikutnya.
              */

              scheduleNextMessage();

            },
            delay
          );

      };


    scheduleNextMessage();


    return () => {

      cancelled =
        true;


      if (chatterTimer) {

        window.clearTimeout(
          chatterTimer
        );

      }

    };

  }, [
    clippy,

    pcScreen,
    pcInstalled,

    windows?.about,
    windows?.projects,
    windows?.aiAssistant,
    windows?.contact,

    welcomeInstallerVisible,
    welcomeInstallerLoadingVisible,
    installerVisible,

    speakRandomMessage,
  ]);


  return null;
}
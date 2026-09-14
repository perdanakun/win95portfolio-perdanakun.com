import '@react95/core/GlobalStyle';
import '@react95/core/themes/win95.css';
import '@react95/icons/icons.css';
import './styles/fonts.css';
import installerBackground from './assets/images/win95_install.jpg';
import winBackground from './assets/images/windows_cloud.jpeg';
import winDawn from './assets/images/1dawn.png';
import winMorning from './assets/images/2morning.png';
import winMidday from './assets/images/3midday.png';
import winAfternoon from './assets/images/4afternoon.png';
import winSunset from './assets/images/5sunset.png';
import winBlueHour from './assets/images/6bluehour.png';
import winampIcon16 from './assets/icons/winamp2-16x16.png';
import winampIcon32  from './assets/icons/winamp2-32x32.png';

import didiKempotVideo from './assets/video/didikempot_bakso_sarjana.mp4';
import WinampPlayer from './components/WinampPlayer';

import ClippyAssistant from './components/ClippyAssistant';

import ExploreContent  from './components/ExploreContent.jsx';


import AiAssistantContentModal from './components/AiAssistantContentModal';
import ProjectFolderContent from './components/ProjectFolderContent';
import CSGameModal from './components/CSGameModal';
import FlappyGame from './components/FlappyGame';
import ContactContent from './components/ContactContent';
import Changelog from './components/Changelog';
import RecycleBin from './components/RecycleBin';
import AboutContent from './components/AboutContent';
import AlertModal from './components/AlertModal';
import AlertModalDesktop from './components/AlertModalDesktop'
import AlertModalFailed from './components/AlertModalFailed';
import AlertModalEmailFile from './components/AlertModalEmailFile';
import CameraModal from './components/CameraModal';
import AiAssistant from "./components/AiAssistant";
import AiAssistantSphere from "./components/AiAssistantSphere";

import ImageViewer from './components/ImageViewer';
import ImageGalleryViewer from './components/ImageGalleryViewer';
import VideoViewer from './components/VideoViewer';

import PaintHeroContent from './components/PaintHeroContent';

import PerdanaInstallerDesktop from './components/installer/PerdanaInstallerDesktop';

import BlogContent from './components/BlogContent';
import BrowserModal from './components/BrowserModal';
import WelcomeModal from './components/WelcomeModal';
import PerdanaBootScreen from './components/boot/PerdanaBootScreen';

import ProjectWindowModal from './components/ProjectWindowModal';
import NotepadModal from './components/NotepadModal';

import HoloHealthContent from './project/HoloHealthContent';
import ShipUIContent from './project/ShipUIContent';
import MayoraContent from './project/MayoraContent';
import PerdanaComputerProductContent from './project/PerdanaComputerProductContent';
import PerdanaComputerProductOverview from './project/PerdanaComputerProductOverview';
import TravelXXXFigmaContent from './project/TravelXXXFigmaContent.jsx';

import CaseStudyViewer from './components/CaseStudyViewer';
import TravelXXXCaseStudyContent from './project/TravelXXXCaseStudyContent';
import PerdanaComputerVisualCaseStudyContent from './project/PerdanaComputerVisualCaseStudyContent';

import ReadmeProduct from './project/ReadmeProduct';
import ReadmeTravelXXX from './project/ReadmeTravelXXX';
import PRDTravelXXX from './project/PRDTravelXXX';

import MobileWebPreview from './components/MobileWebPreview';



import { getAIResponse } from "./services/aiService";
import { Frame, TitleBar, Button, TaskBar, List, Modal, useModal } from '@react95/core';

import {
  ClippyProvider,
} from '@react95/clippy';

import { 
  Notepad,
  Notepad2,
  Folder, 
  Globe, 
  Mail,
  Mailnews2,
  Mailnews14,
  Mapi32801,
  Computer, 
  User, 
  PowerOff, 
  Joy102,
  Shell3232,
  RecycleFull,
  Wangimg128,
  WindowsExplorer,
  FolderFile,
  MsDos,
  Drvspace7,
  Intl101,
  Install,
  Sndrec3210,
  Sndvol32303,
  Url1102,
  Textchat,
  Computer4,
  FilePin,
  Wordpad,
  Mplayer110,
  Freecell1,
  Mspaint,
  MicrosoftNetwork,
  Mshtml32548,
} from '@react95/icons';
import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import aiOpenSound from './assets/sounds/ai_assistant_open.wav';




// Fungi baru klik and tap DesktopIcon
function DesktopIcon({
  children,
  onOpen,
  onSelect,
}) {
  const handlePointerUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Smartphone / tablet / pen:
    // 1 tap langsung buka
    if (
      e.pointerType === 'touch' ||
      e.pointerType === 'pen'
    ) {
      onOpen?.();
      return;
    }

    // Desktop mouse:
    // 1 click hanya select
    if (e.pointerType === 'mouse') {
      onSelect?.();
    }
  };

  const handleClick = (e) => {
    // PENTING:
    // click adalah event terpisah dari pointerUp.
    // Stop di sini supaya tidak bubble ke <main>
    // dan menghapus selectedDesktopIcon.
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Desktop mouse:
    // double click buka
    onOpen?.();
  };

  return (
    <div
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'manipulation',
      }}
    >
      {children}
    </div>
  );
}

// Drag resize window mobile
function ResizableModal({
  isMobile,
  isTablet = false,

  // =========================
  // POSITION LOCK
  // =========================
  lockPosition = false,

// =========================
// SMARTPHONE
// =========================
minHeightRatio = 0.5,
mobileHeightRatio = 1,
mobileWidth = '100vw',
mobileLockBottom = true,


  // =========================
  // TABLET
  // =========================
  tabletWidth = 'auto',
  tabletHeight = 'auto',
  tabletTop = 'auto',
  tabletLeft = 'auto',
  tabletRight = 'auto',
  tabletBottom = 'auto',
  tabletTransform = 'none',

  // =========================
  // DESKTOP
  // =========================
  desktopWidth = 'auto',
  desktopHeight = 'auto',
  desktopTop = 'auto',
  desktopLeft = 'auto',
  desktopRight = 'auto',
  desktopBottom = 'auto',
  desktopTransform = 'none',

  children,
  titleBarOptions,
  ...props
}) {

  const TASKBAR_HEIGHT = 28;

  const getMaxHeight = () => {
    return window.innerHeight - TASKBAR_HEIGHT;
  };

  const getMinHeight = () => {
    return window.innerHeight * minHeightRatio;
  };

const [height, setHeight] = useState(() => {
  if (isMobile) {
    return window.innerHeight * mobileHeightRatio;
  }

  return getMaxHeight();
});


  const resizeRef = useRef(null);

  const startResize = (e) => {
    if (!isMobile) return;

    const titleBar = e.target.closest('.draggable');

    if (!titleBar) {
      return;
    }

    if (e.target.closest('button')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    resizeRef.current = {
      startY: e.clientY,
      startHeight: height,
    };

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ns-resize';

    window.addEventListener('pointermove', handleResize);
    window.addEventListener('pointerup', stopResize);
  };

  const handleResize = (e) => {
    if (!resizeRef.current) return;

    const {
      startY,
      startHeight,
    } = resizeRef.current;

    const deltaY = e.clientY - startY;

    const newHeight = startHeight - deltaY;

    const minHeight = getMinHeight();
    const maxHeight = getMaxHeight();

    const clampedHeight = Math.max(
      minHeight,
      Math.min(maxHeight, newHeight)
    );

    setHeight(clampedHeight);
  };

  const stopResize = () => {
    resizeRef.current = null;

    document.body.style.userSelect = '';
    document.body.style.cursor = '';

    window.removeEventListener(
      'pointermove',
      handleResize
    );

    window.removeEventListener(
      'pointerup',
      stopResize
    );
  };

  useEffect(() => {
    return () => {
      stopResize();
    };
  }, []);

  // =========================
// LOCK DRAG TABLET / DESKTOP
// =========================

  const preventDrag = (e) => {
  if (!lockPosition) return;

  const titleBar = e.target.closest('.draggable');

  if (!titleBar) return;

  if (e.target.closest('button')) return;

  e.preventDefault();
  e.stopPropagation();
};

  /*
   * =====================================
   * SMARTPHONE
   * TETAP SEPERTI PUNYA KAMU
   * =====================================
   */
if (isMobile) {
  const maxHeight =
    window.innerHeight -
    (mobileLockBottom ? TASKBAR_HEIGHT : 0);

  const safeHeight = Math.min(height, maxHeight);

  return (
    <Modal
      {...props}
      titleBarOptions={titleBarOptions}
      onPointerDownCapture={startResize}
      style={{
        position: 'fixed',

        left: 0,
        right: 0,

        // hitung posisi atas secara eksplisit
        top: `${maxHeight - safeHeight}px`,

        bottom: 'auto',

        width: mobileWidth,
        height: `${safeHeight}px`,

        maxWidth: '100vw',
        maxHeight: `${maxHeight}px`,

        transform: 'none',
        margin: 0,

        boxSizing: 'border-box',
      }}
    >
      {children}
    </Modal>
  );
}



  
  /*
   * =====================================
   * TABLET
   * UKURAN/POSISI NANTI PER WINDOW
   * =====================================
   */
  
  if (isTablet) {
  return (
    <Modal
      {...props}
      titleBarOptions={titleBarOptions}

      // =========================
      // LOCK DRAG SESUAI WINDOW
      // =========================
      onPointerDownCapture={preventDrag}

      style={{
        position: 'fixed',

        top: tabletTop,
        left: tabletLeft,
        right: tabletRight,
        bottom: tabletBottom,

        width: tabletWidth,
        height: tabletHeight,

        transform: tabletTransform,

        boxSizing: 'border-box',
      }}
    >
      {children}
    </Modal>
  );
}

  /*
   * =====================================
   * DESKTOP
   * UKURAN/POSISI NANTI PER WINDOW
   * =====================================
   */
return (
  <Modal
    {...props}
    titleBarOptions={titleBarOptions}

    // =========================
    // LOCK DRAG SESUAI WINDOW
    // =========================
    onPointerDownCapture={preventDrag}

    style={{
      position: 'fixed',

      top: desktopTop,
      left: desktopLeft,
      right: desktopRight,
      bottom: desktopBottom,

      width: desktopWidth,
      height: desktopHeight,

      transform: desktopTransform,

      boxSizing: 'border-box',
    }}
  >
    {children}
  </Modal>
);
}


function App() {


  // ==========================================
  // PERDANA PC — VIRTUAL PC STATE
  // ==========================================

  const PC_STORAGE_KEY = 'perdana-pc';

  const getPCState = () => {
    try {
      const saved = localStorage.getItem(
        PC_STORAGE_KEY
      );

      if (!saved) {
        return {
          installed: false,
          welcomeEnabled: true,
        };
      }

      return JSON.parse(saved);
    } catch {
      return {
        installed: false,
        welcomeEnabled: true,
      };
    }
  };

const [pcState, setPcState] = useState(getPCState);

// CURRENT ENTRY FLOW:
// Every visit starts with the Boot screen, then goes straight to Desktop.
// The Installer remains optional and can only be launched from the Desktop icon.
const BOOT_STORAGE_KEY = 'perdana-boot-seen';
const [pcScreen, setPcScreen] = useState(() => {
  try {
    const hasSeenBoot =
      localStorage.getItem(BOOT_STORAGE_KEY) === 'true';

    return hasSeenBoot ? 'desktop' : 'boot';
  } catch {
    return 'boot';
  }
});



// ==========================================
// PERDANA PC INSTALLER LIFECYCLE
// ==========================================

// TEMP UX EXPERIMENT:
// Automatic first-visit installer is disabled.
// Everyone lands directly on Desktop.
// Keep the installer components/state below dormant for easy rollback.



  // this PC already installed something like that

  const savePCState = (nextState) => {
  setPcState(nextState);

  localStorage.setItem(
    PC_STORAGE_KEY,
    JSON.stringify(nextState)
  );
};
// ==========================================
// CLIPPY LIFECYCLE
// ==========================================
// Clippy is mounted as soon as the virtual PC is installed.
// ClippyAssistant itself keeps Clippy hidden during installer / Welcome,
// runs the first tour after the first Welcome is closed, and then handles
// the normal desktop assistant behavior.


// Desktop Icon Select
const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
// ==========================================
// RESPONSIVE DESKTOP ICON POSITION
// ==========================================

const getDesktopIconPosition = (index) => {
  const iconWidth = 80;
  const iconHeight = 80;

  const gapX = 12;
  const gapY = 12;


  // =========================
  // SMARTPHONE + TABLET
  // Tetap seperti sekarang
  // =========================

  if (isMobile || isTablet) {
    const startX = 16;
    const startY = 16;

    const columns = 2;

    const column =
      index % columns;

    const row =
      Math.floor(
        index / columns
      );

    return {
      x:
        startX +
        column *
          (iconWidth + gapX),

      y:
        startY +
        row *
          (iconHeight + gapY),

      width: iconWidth,
      height: iconHeight,
    };
  }

// =========================
// DESKTOP
// =========================

const startX = 24;
const startY = 24;

const desktopIconCount = 10;
const columns = 2;

const TASKBAR_HEIGHT = 28;
const CLIPPY_BOTTOM_OFFSET = 170;
const SAFE_GAP_ABOVE_CLIPPY = 32;

const clippyTop =
  window.innerHeight -
  TASKBAR_HEIGHT -
  CLIPPY_BOTTOM_OFFSET;

const availableHeight =
  clippyTop -
  startY -
  SAFE_GAP_ABOVE_CLIPPY;

const maxSafeRows =
  Math.max(
    1,
    Math.floor(
      (availableHeight + gapY) /
        (iconHeight + gapY)
    )
  );

// =========================
// DESKTOP = COLUMN-FIRST
//
// 0   6
// 1   7
// 2   8
// 3
// 4
// 5
// =========================

const rowsPerColumn = 6;

const column =
  Math.floor(index / rowsPerColumn);

const row =
  index % rowsPerColumn;

return {
  x:
    startX +
    column *
      (iconWidth + gapX),

  y:
    startY +
    row *
      (iconHeight + gapY),

  width: iconWidth,
  height: iconHeight,
};

/*
 * Safety fallback:
 * kalau layar terlalu pendek,
 * pindahkan overflow ke kolom berikutnya.
 */

const safeColumn =
  row >= maxSafeRows
    ? column +
      Math.floor(
        row / maxSafeRows
      ) * columns
    : column;

const safeRow =
  row % maxSafeRows;

return {
  x:
    startX +
    safeColumn *
      (iconWidth + gapX),

  y:
    startY +
    safeRow *
      (iconHeight + gapY),

  width: iconWidth,
  height: iconHeight,
};
};


 // ==========================================
  // DYNAMIC WALLPAPER - DINONAKTIFKAN
  // ==========================================

  // const getBackgroundByTime = () => {
  //   const now = new Date();
  //   const hour = now.getHours();
  //   const minute = now.getMinutes();
  //   const time = hour + minute / 60;
  //   if (time >= 5 && time < 7) { return winDawn; }
  //   if (time >= 7 && time < 11) { return winMorning; }
  //   if (time >= 11 && time < 15) { return winMidday; }
  //   if (time >= 15 && time < 17) { return winAfternoon; }
  //   if (time >= 17 && time < 18.5) { return winSunset; }
  //   if (time >= 18.5 && time < 21) { return winBlueHour; }
  //   return winNight;
  // };

  // Set ke satu gambar statis saja (ubah 'winNight' )
  const [currentBackground, setCurrentBackground] = useState(winBackground);

  // useEffect untuk interval waktu 
  /*
  useEffect(() => {
    const updateBackground = () => {
      setCurrentBackground(getBackgroundByTime());
    };

    updateBackground();

    const interval = setInterval(() => {
      updateBackground();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
  */

  // ==========================================

// Mengatur responsivenes dan tap di device selain PC
const [isMobile, setIsMobile] = useState(
  typeof window !== 'undefined' && window.innerWidth <= 600
);

const [isTablet, setIsTablet] = useState(
  typeof window !== 'undefined' &&
  window.innerWidth > 600 &&
  window.innerWidth <= 1024
);

const [isTouchDevice, setIsTouchDevice] = useState(false);

useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;

    setIsMobile(width <= 600);
    setIsTablet(width > 600 && width <= 1024);

    setIsTouchDevice(
      window.matchMedia('(pointer: coarse)').matches
    );
  };

  handleResize();

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// ==========================================
// PAINT HERO — DEFAULT DESKTOP LANDING
// ==========================================
// Paint Hero opens on every page load after Boot on desktop/tablet.
// Smartphones still land on a clean Desktop without auto-opening Paint.

  // Menyimpan status true (terbuka) atau false (tertutup) untuk setiap aplikasi/jendela
const [windows, setWindows] = useState({
  welcome: false,
  about: false,
  projects: false,
  contact: false,
  winamp: false,
  explore: false,

  // DEFAULT LANDING WINDOW
  // Desktop + Tablet = open
  // Smartphone = closed
  aiAssistant: !isMobile,

  recycleBin: false,
  imageViewer: false,
  blog: false,
  browser: false,
  whatsNew: false,

  // Paint sekarang manual saja
  paintHero: false,

  desktopVideo: false,

  // Project windows
  holohealth: false,
  'ship-ui': false,
  mayora: false,
  'perdana-computer-product': false,
  'perdana-computer-visual-case-study': false,
  'travelxxx-preview': false,
  'travelxxx-case-study': false,

  // Notepad windows
  'readme-product': false,
  'readme-travelxxx': false,
  'prd-travelxxx': false,
  'perdana-computer-overview': false,
});
// Travelxxx Porject Modal SLIDER
const [aiChatIdle, setAiChatIdle] = useState(false);

// Travelxxx Porject Modal SLIDER
const [
  travelXXXSlideState,
  setTravelXXXSlideState,
] = useState({
  currentSlide: 0,
  slideNumber: 1,
  totalSlides: 19,
  canGoBack: false,
  canGoForward: true,
});


const [
  perdanaComputerSlideState,
  setPerdanaComputerSlideState,
] = useState({
  currentSlide: 0,
  slideNumber: 1,
  totalSlides: 1,
  canGoBack: false,
  canGoForward: false,
});

// Window Porject Modal

useEffect(() => {
  const handleOpenProjectWindow = (event) => {
    const windowName =
      event.detail?.windowName;

    if (!windowName) return;

    setWindows((prev) => ({
      ...prev,
      [windowName]: true,
    }));
  };

  window.addEventListener(
    'open-project-window',
    handleOpenProjectWindow
  );

  return () => {
    window.removeEventListener(
      'open-project-window',
      handleOpenProjectWindow
    );
  };
}, []);

// State untuk Alert Modal Desktop (Fitur yang masih locked / on progress)
// Tambahkan ini di antara state-state lainnya
const [alertDesktop, setAlertDesktop] = useState({
  show: false,
  title: 'Alert',
  message: 'This feature is still locked.'
});

const openAlertDesktop = (title, message) => {
  setAlertDesktop({ show: true, title, message });
};

// ==========================================
// WELCOME LIFECYCLE
// ==========================================

// Menandai bahwa Boot dipanggil dari Reset Desktop.
// Kalau true, setelah Boot selesai tampilkan Welcome.
const [showWelcomeAfterReset, setShowWelcomeAfterReset] = useState(false);

// ==========================================
// DESKTOP INSTALLER — ORIGINAL FULL FLOW
// ==========================================
// Installer launched from Desktop / Start Menu.
// PerdanaInstallerDesktop owns the entire old flow:
// InstallerWelcome → WelcomeAbout → System Requirements
// → Tree + Content → Loading → Complete.
const [desktopInstallerVisible, setDesktopInstallerVisible] = useState(false);

const openInstaller = () => {
  setDesktopInstallerVisible(true);
};

// Muted Desktop Feature
const [isMuted, setIsMuted] = useState(false);

const toggleMute = () => {
  setIsMuted(prev => !prev);
};


// AI Assistant v2
const [aiAssistantV2Visible, setAiAssistantV2Visible] = useState(false);

const [aiSphereVisible, setAiSphereVisible] = useState(true);

  // Sound Effect
  // AI Assistant Open Sound
  useEffect(() => {
  if (windows.aiAssistant) {
    const audio = new Audio(aiOpenSound);
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Browser bisa memblokir autoplay dalam kondisi tertentu
    });
  }
}, [windows.aiAssistant]);


  const toggleWindow = (name, value) => {
  setWindows(prev => ({
    ...prev,
    [name]: value
  }));
};

// ==========================================
// VIRTUAL PC RESTART
// ==========================================

const handleRestart = () => {
  // Tutup semua window
  setWindows({
    welcome: false,
    about: false,
    projects: false,
    contact: false,
    winamp: false,
    aiAssistant: false,
    recycleBin: false,
    imageViewer: false,
    blog: false,
    browser: false,
    whatsNew: false,
    explore: false,

    desktopVideo: false,

    // Reset behaves like a fresh startup: Boot -> Desktop + Paint Hero.
    paintHero: false,

// Project windows
  holohealth: false,
  'ship-ui': false,
  mayora: false,
  'perdana-computer-product': false,
  'perdana-computer-visual-case-study': false,
  'travelxxx-preview': false,
  'travelxxx-case-study': false,

  // Notepad windows
  'readme-product': false,
  'readme-travelxxx': false,
  'prd-travelxxx': false,
    'perdana-computer-overview': false,
  });

// Manual Reset Desktop:
// Boot → Welcome → Desktop
setDesktopInstallerVisible(false);
setShowWelcomeAfterReset(true);
setPcScreen('boot');
};

// Mapping Content Project

const projectWindows = {
  holohealth: {
    title: 'HoloHealth - Case Studies',
    content: (
      <HoloHealthContent />
    ),
  },

  'ship-ui': {
    title: 'Shipfaster UI- Case Studies',
    content: (
      <ShipUIContent />
    ),
  },

  mayora: {
    title: 'Mayora - Case Studies',
    content: (
      <MayoraContent />
    ),
  },

  'perdana-computer-product': {
    title: "Perdana's Computer - Case Studies",
    content: (
      <PerdanaComputerProductContent />
    ),
  },

    'perdana-computer-visual-case-study': {
  title:
    "Perdana's Computer - Visual Case Study",

  url:
    'perdanakun.com',

  lockContent:
    true,

  slideNavigation: {
    currentPage:
      perdanaComputerSlideState.slideNumber,

    totalPages:
      perdanaComputerSlideState.totalSlides,

    canGoPrevious:
      perdanaComputerSlideState.canGoBack,

    canGoNext:
      perdanaComputerSlideState.canGoForward,

    onPrevious: () => {
      window.dispatchEvent(
        new CustomEvent(
          'perdana-computer-case-study-prev'
        )
      );
    },

    onNext: () => {
      window.dispatchEvent(
        new CustomEvent(
          'perdana-computer-case-study-next'
        )
      );
    },
  },

  content: (
    <PerdanaComputerVisualCaseStudyContent
      onSlideChange={
        setPerdanaComputerSlideState
      }
    />
  ),
},

    'travelxxx-case-study': {
      title:
        'TravelXXX - Case Study',

      url:
        'travelxxx.perdanakun.com',

      lockContent:
        true,

      slideNavigation: {
        currentPage:
          travelXXXSlideState.slideNumber,

        totalPages:
          travelXXXSlideState.totalSlides,

        canGoPrevious:
          travelXXXSlideState.canGoBack,

        canGoNext:
          travelXXXSlideState.canGoForward,

        onPrevious: () => {
          window.dispatchEvent(
            new CustomEvent(
              'travelxxx-case-study-prev'
            )
          );
        },

        onNext: () => {
          window.dispatchEvent(
            new CustomEvent(
              'travelxxx-case-study-next'
            )
          );
        },
      },

      content: (
        <TravelXXXCaseStudyContent
          onSlideChange={
            setTravelXXXSlideState
          }
        />
      ),
    },
};

// ==========================================
// MAPPING NOTEPAD WINDOWS
// ==========================================

const notepadWindows = {
  'readme-product': {
    title: "ReadMe.txt - Notepad",

    content: (
      <ReadmeProduct />
    ),
  },

    'readme-travelxxx': {
    title: "Workflow - Notepad",

    content: (
      <ReadmeTravelXXX />
    ),
  },

      'prd-travelxxx': {
    title: "Overview - Notepad",

    content: (
      <PRDTravelXXX />
    ),
  },

    'perdana-computer-overview': {
    title: "Overview- Perdana's Computer",

    content: (
      <PerdanaComputerProductOverview />
    ),
  },
};


//Desktop Video Player
const desktopVideo = {
  id: 'didi-kempot-bakso-sarjana',

  name: 'Bakso Sarjana.mp4',

  type: 'video',

  sourceType: 'local',

  src: didiKempotVideo,
};

//restore minimize AIsphere AI assistant
const minimizeAI = () => {
  setAiAssistantV2Visible(false);
  setAiSphereVisible(true);
};

const openAiAssistantV2 = () => {
  setAiSphereVisible(false);
  setAiAssistantV2Visible(true);
};


// Fungsi open klik thumbnail after minimize
const openWindow = (name) => {
  // force close dulu supaya React95 reset state minimize internalnya
  setWindows(prev => ({
    ...prev,
    [name]: false
  }));

  // buka kembali
  setTimeout(() => {
    setWindows(prev => ({
      ...prev,
      [name]: true
    }));
  }, 10);
};

  // Fungsi untuk membuka tab baru di browser (digunakan untuk CV dan Medium)
  const openExternalLink = (url) => {
    window.open(url, '_blank');
  };


  const searchInputStyle = {
    flex: 1,
    height: '30px',
    padding: '0 10px',
    border: 'none',
    boxShadow: 'inset 2px 2px 0px #868686, inset -2px -2px 0px #ffffff',
    backgroundColor: 'white',
    fontFamily: 'sans-serif',
    fontSize: '13px',
    outline: 'none'
  };

  // Fungsi OpenImageFile
const [imageViewers, setImageViewers] = useState([]);

  const openImageFile = (file) => {
    setImageViewers(prev => {
      // Jangan buka window yang sama dua kali
      if (prev.some(viewer => viewer.file.id === file.id)) {
        return prev;
      }

      return [
        ...prev,
        {
          id: `${file.id}-${Date.now()}`,
          file,
          width: 300,
          height: 200,
        },
      ];
    });
  };

const closeImageViewer = (viewerId) => {
  setImageViewers(prev =>
    prev.filter(viewer => viewer.id !== viewerId)
  );
};

  // Fungsi menghitung ukuran window untuk mendapat rasio asli
const handleImageLoad = (viewerId, e) => {
  const img = e.currentTarget;

  const naturalWidth = img.naturalWidth;
  const naturalHeight = img.naturalHeight;

  // Maksimal 70% layar
  const maxWidth = window.innerWidth * 0.8;
  const maxHeight = window.innerHeight * 0.8;

  const scale = Math.min(
    1,
    maxWidth / naturalWidth,
    maxHeight / naturalHeight
  );

  const width = Math.round(naturalWidth * scale);
  const height = Math.round(naturalHeight * scale);

  setImageViewers(prev =>
    prev.map(viewer =>
      viewer.id === viewerId
        ? {
            ...viewer,
            width,
            height,
          }
        : viewer
    )
  );
};

// ==========================================
// IMAGE GALLERY
// ==========================================

const [
  imageGallery,
  setImageGallery,
] = useState(null);

const [
  imageGalleryTitle,
  setImageGalleryTitle,
] = useState(
  'Image Gallery'
);

// ==========================================
// OPEN IMAGE GALLERY EVENT
// ==========================================

useEffect(() => {
  const handleOpenImageGallery = (
    event
  ) => {
    const items =
      event.detail?.items;

    const startIndex =
      event.detail?.startIndex ?? 0;

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return;
    }

    const safeIndex =
      startIndex >= 0 &&
      startIndex < items.length
        ? startIndex
        : 0;

    setImageGallery({
      items,
      startIndex:
        safeIndex,
    });

    setImageGalleryTitle(
      items[safeIndex]?.name ||
        'Image Gallery'
    );
  };

  window.addEventListener(
    'open-image-gallery',
    handleOpenImageGallery
  );

  return () => {
    window.removeEventListener(
      'open-image-gallery',
      handleOpenImageGallery
    );
  };
}, []);

const closeImageGallery = () => {
  setImageGallery(null);

  setImageGalleryTitle(
    'Image Gallery'
  );
};

// ==========================================
// VIDEO VIEWER
// ==========================================
const [
  activeVideo,
  setActiveVideo,
] = useState(null);


// Video Viewer Event

useEffect(() => {
  const handleOpenVideoViewer = (
    event
  ) => {
    const file =
      event.detail?.file;

    if (!file) {
      return;
    }

    setActiveVideo(file);
  };

  window.addEventListener(
    'open-video-viewer',
    handleOpenVideoViewer
  );

  return () => {
    window.removeEventListener(
      'open-video-viewer',
      handleOpenVideoViewer
    );
  };
}, []);

  //Notification allert send email
  const [showContactAlert, setShowContactAlert] = useState(false);
const [showContactErrorAlert, setShowContactErrorAlert] = useState(false);
  // Fungsi Camera Contact
  const [showCamera, setShowCamera] = useState(false);
  const [cameraAttachment, setCameraAttachment] = useState(null);

  // Notification attachment too large
const [showAttachmentAlert, setShowAttachmentAlert] = useState(false);
const [attachmentAlertMessage, setAttachmentAlertMessage] = useState('');

const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};


const handleAttachmentTooLarge = (file) => {
  setAttachmentAlertMessage(
    <>
      <strong>{file.name}</strong> is too large.
      <br />
      File size: <strong>{formatFileSize(file.size)}</strong>
      <br />
      Maximum attachment size is <strong>1.5 MB</strong> per file.
    </>
  );

  setShowAttachmentAlert(true);
};

// ==========================================
// CLIPPY — CHECK IF ANY WINDOW IS OPEN
// ==========================================
const hasBlockingDesktopWindow = Boolean(
  // Semua windows KECUALI AI Chat
  Object.entries(windows).some(
    ([key, value]) =>
      key !== 'aiAssistant' &&
      Boolean(value)
  ) ||

  desktopInstallerVisible ||

  imageViewers.length > 0 ||
  imageGallery ||
  activeVideo ||

  alertDesktop.show ||
  showContactAlert ||
  showContactErrorAlert ||
  showAttachmentAlert ||

  showCamera ||

  aiAssistantV2Visible
);


  return (
    <>

      {/* ==========================================
          CLIPPY — LIGHTWEIGHT ASSISTANT
          No first tour. Random + contextual only.
      ========================================== */}
{!isMobile && (
  <ClippyAssistant
    pcScreen={pcScreen}
    isMobile={isMobile}
    isTablet={isTablet}
    windows={windows}
    desktopInstallerVisible={desktopInstallerVisible}
    hasBlockingDesktopWindow={hasBlockingDesktopWindow}
  />
)}

      {/* CSS Reset untuk layar full screen dan background Windows XP */}
      <style>
        {`
          html, body, #root {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;

            background-image: url(${currentBackground});

           /* background-image: url(${winBackground}); ganti background-color: #008080;*/
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;



.portfolio-identity {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
            .draggable {
              justify-content: flex-start !important;
            }

            .draggable > div:first-of-type {
              text-align: left !important;
            }

        
         /* Aturan ukraun input smartphone, supaya ga nge zoom */
        @media (max-width: 600px) {
          .contact-input {
            font-size: 16px !important;
            transform: scale(0.75);
            transform-origin: left center;
          }
        }


         /* Aturan scrollbar tipis dan mungil */
         div::-webkit-scrollbar {
            width: 3px; 
         }
         div::-webkit-scrollbar-track {
            background: #ffffff;
         }
         div::-webkit-scrollbar-thumb {
            background: #ffffff; 
            border-radius: 4px;  
         }
         div::-webkit-scrollbar-thumb:hover {
            background: #ffffff;
         }
        `}
      </style>

{/* --- BOOT PERDANA PC --- */}
{pcScreen === 'boot' && (
  <PerdanaBootScreen
    onBootComplete={() => {
      try {
        localStorage.setItem(
          BOOT_STORAGE_KEY,
          'true'
        );
      } catch {
        // ignore storage error
      }

      setPcScreen('desktop');

      // Kalau Boot berasal dari Reset Desktop,
      // tampilkan Welcome setelah Boot selesai.
      if (showWelcomeAfterReset) {
        setWindows(prev => ({
          ...prev,
          welcome: true,
        }));

        setShowWelcomeAfterReset(false);
      }
    }}
  />
)}

      {/* --- CONTAINER DESKTOP UTAMA --- */}

{/* =========================
    ORIGINAL FULL INSTALLER FLOW
========================= */}
{pcScreen === 'desktop' && desktopInstallerVisible ? (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',

      backgroundImage: `url(${installerBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',

      overflow: 'hidden',
      zIndex: 99999,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.5) 12%,
            transparent 35%,
            transparent 65%,
            rgba(0, 0, 0, 0.5) 88%,
            rgba(0, 0, 0, 0.9) 100%
          )
        `,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />

    <div
      style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <PerdanaInstallerDesktop
        isMobile={isMobile}
        isTablet={isTablet}
        onClose={() => {
          setDesktopInstallerVisible(false);
        }}
        onFinish={() => {
          const nextState = {
            ...pcState,
            installed: true,
          };

          savePCState(nextState);

          // The old installer already handles Loading + Complete internally.
          // Finish closes Setup and returns to Desktop.
          setDesktopInstallerVisible(false);
        }}
      />
    </div>
  </div>
) : pcScreen === 'desktop' ? (
<main
  aria-label="Perdana's Computer — portfolio of Perdana Kurniawan Arta"
  onClick={() => setSelectedDesktopIcon(null)}
  style={{
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }}
>


  <header
  className="portfolio-identity"
  aria-label="Perdana Kurniawan Arta"
>
  <h1>Perdana Kurniawan Arta</h1>

  <p>
    Also known as <strong>Perdanakun</strong>.
  </p>

  <p>
    Visual Designer and Design Lead exploring Product Design and
    Design Engineering through UX, Design Systems, Front-End,
    and design-in-code practice.
  </p>
</header>

  
  {/* <DynamicXPBackground /> */}

  {/* THUMBNAIL DESKTOP */}

{/* --- THUMBNAIL AI SPHERE --- */}

{/* =====================================================
    COLUMN 1
===================================================== */}

{/* About */}
<Rnd
  default={getDesktopIconPosition(0)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'about'}
    onSelect={() => setSelectedDesktopIcon('about')}
    onOpen={() => openWindow('about')}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Computer variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'about'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        About
      </span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Installer */}
<Rnd
  default={getDesktopIconPosition(1)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'installer'}
    onSelect={() => setSelectedDesktopIcon('installer')}
    onOpen={openInstaller}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Install variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'installer'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        Installer
      </span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Inbox */}
<Rnd
  default={getDesktopIconPosition(2)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'inbox'}
    onSelect={() => setSelectedDesktopIcon('inbox')}
    onOpen={() => openWindow('contact')}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Mapi32801 variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'inbox'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        Inbox
      </span>
    </div>
  </DesktopIcon>
</Rnd>


{/* Media Player */}
<Rnd
  default={getDesktopIconPosition(3)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'desktopVideo'}
    onSelect={() => setSelectedDesktopIcon('desktopVideo')}
    onOpen={() => openWindow('desktopVideo')}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Mplayer110 variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'desktopVideo'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        Media Player
      </span>
    </div>
  </DesktopIcon>
</Rnd>


{/* Winamp */}
<Rnd
  default={getDesktopIconPosition(4)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'winamp'}
    onSelect={() => setSelectedDesktopIcon('winamp')}
    onOpen={() => openWindow('winamp')}
  >
    <div style={desktopIconStyle}>
      <div
        style={{
          fontSize: '32px',
          marginBottom: '0',
        }}
      >
        <img
          src={winampIcon32}
          alt=""
          draggable={false}
          style={{
            width: '32px',
            height: '32px',
            display: 'inline-block',
            verticalAlign: 'middle',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'winamp'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        Winamp
      </span>
    </div>
  </DesktopIcon>
</Rnd>


{/* Recycle Bin */}
<Rnd
  default={getDesktopIconPosition(5)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'recycleBin'}
    onSelect={() => setSelectedDesktopIcon('recycleBin')}
    onOpen={() => openWindow('recycleBin')}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <RecycleFull variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'recycleBin'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        Recycle Bin
      </span>
    </div>
  </DesktopIcon>
</Rnd>



{/* =====================================================
    COLUMN 2
===================================================== */}

{/* Explore */}
<Rnd
  default={getDesktopIconPosition(6)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'explore'}
    onSelect={() =>
      setSelectedDesktopIcon('explore')
    }
    onOpen={() =>
      openWindow('explore')
    }
  >
    <div style={desktopIconStyle}>
      <div
        style={{
          fontSize: '32px',
          marginBottom: '0',
        }}
      >
        <Mshtml32548 variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,

          ...(selectedDesktopIcon ===
          'explore'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        Explore
      </span>
    </div>
  </DesktopIcon>
</Rnd>



{/* My Projects */}
<Rnd
  default={getDesktopIconPosition(7)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'projects'}
    onSelect={() => setSelectedDesktopIcon('projects')}
    onOpen={() => openWindow('projects')}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Folder variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'projects'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        Projects
      </span>
    </div>
  </DesktopIcon>
</Rnd>


{/* AI Chat */}
<Rnd
  default={getDesktopIconPosition(8)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'aiAssistant'}
    onSelect={() => setSelectedDesktopIcon('aiAssistant')}
    onOpen={() => openWindow('aiAssistant')}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <MicrosoftNetwork variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'aiAssistant'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        AI Chat
      </span>
    </div>
  </DesktopIcon>
</Rnd>






{/* MS Paint */}
<Rnd
  default={getDesktopIconPosition(9)}
  bounds="window"
  enableResizing={false}
  disableDragging={isMobile || isTablet}
>
  <DesktopIcon
    selected={selectedDesktopIcon === 'paintHero'}
    onSelect={() => setSelectedDesktopIcon('paintHero')}
    onOpen={() => openWindow('paintHero')}
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Mspaint variant="32x32_4" />
      </div>

      <span
        style={{
          ...desktopIconLabelStyle,
          ...(selectedDesktopIcon === 'paintHero'
            ? desktopIconLabelSelectedStyle
            : {}),
        }}
      >
        MS Paint
      </span>
    </div>
  </DesktopIcon>
</Rnd>


 {/* --- JENDELA ALERT--- */}
{/* Render Alert Modal untuk fitur locked */}
<AlertModalDesktop
  show={alertDesktop.show}
  title={alertDesktop.title}
  message={alertDesktop.message}
  onClose={() => setAlertDesktop({ ...alertDesktop, show: false })}
/>

{/* --- JENDELA PAINT HERO --- */}
{windows.paintHero &&
  !windows.welcome && (
    <ResizableModal
      isMobile={isMobile}
      isTablet={isTablet}

      // =========================
      // SMARTPHONE
      // =========================
      mobileHeightRatio={1}
      minHeightRatio={0.4}
      mobileWidth="100vw"
      mobileLockBottom={true}

      // =========================
      // TABLET / iPAD
      // =========================
      tabletWidth="90%"
      tabletHeight="auto"
      tabletTop="50%"
      tabletLeft="50%"
      tabletRight="auto"
      tabletBottom="auto"
      tabletTransform="translate(-50%, -50%)"

      // =========================
      // DESKTOP
      // =========================
      desktopWidth="auto"
      desktopHeight="55%"
      desktopTop="50%"
      desktopLeft="50%"
      desktopRight="auto"
      desktopBottom="auto"
      desktopTransform="translate(-55%, -55%)"

      title="untitled - Paint"

      icon={
        <Mspaint variant="16x16_4" />
      }

      titleBarOptions={
        <>
          <Modal.Minimize />

          <TitleBar.Close
            onClick={() =>
              toggleWindow('paintHero', false)
            }
          />
        </>
      }
    >
      <PaintHeroContent
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </ResizableModal>
  )}

   {/* --- JENDELA MODAL WINAMP --- */}
    {windows.winamp && (
      <WinampPlayer
        isMobile={isMobile}
        isTablet={isTablet}

        onClose={() =>
          toggleWindow(
            'winamp',
            false
          )
        }
      />
    )}


        {/* --- JENDELA MODAL UNTUK MASING-MASING APLIKASI --- */}

        {/* --- JENDELA AI MESSENGER MINIMIZE--- */}

  {/* --- JENDELA AI ASSISTANT v2 --- */}
  {/* aiAssistantV2Visible && (
  <AiAssistant
    isMobile={isMobile}
    isTablet={isTablet}
    isTouchDevice={isTouchDevice}

    style={
      isMobile
        ? {
            // SMARTPHONE
            position: 'fixed',
            left: '0',
            top: '0',
            right: '0',
            bottom: '28px',

            width: '100vw',
            height: 'auto',

            maxWidth: '100vw',
            maxHeight: 'none',

            transform: 'none',

            boxSizing: 'border-box',
          }
        : isTablet
        ? {
            // TABLET
            position: 'fixed',
            right: '0',
            top: '0',
            bottom: '28px',

            width: '40%',
            height: 'auto',

            maxWidth: '90vw',
            maxHeight: 'calc(100vh - 28px)',

            boxSizing: 'border-box',
          }
        : {
            // DESKTOP
            position: 'fixed',
            right: '0',
            top: '0',
            bottom: '28px',

            width: '20%',
            height: 'auto',

            maxWidth: 'none',
            maxHeight: 'calc(100vh - 28px)',

            boxSizing: 'border-box',
          }
    }

    onMinimize={() => {
      setAiAssistantV2Visible(false);
      setAiSphereVisible(true);
    }}

    onClose={() => {
      setAiAssistantV2Visible(false);
      setAiSphereVisible(true);
    }}

    onMaximize={() => {
      // AiAssistant menangani maximize internal
    }}

    onRestore={() => {
      // AiAssistant menangani restore internal
    }}
  />
)} 

INI ENDING KODE INACTIVE*/}




{/* =========================
    Jendela Welcome
========================= */}


{windows.welcome && (
  <WelcomeModal
    isMobile={isMobile}
    isTablet={isTablet}

    onClose={() => {
      // ClippyAssistant watches windows.welcome.
      // First install + unseen guide -> first tour starts here.
      // Reset + completed guide -> normal desktop Clippy resumes here.
      toggleWindow('welcome', false);
    }}

    openWindow={openWindow}
  />
)}

{/* =========================
    Jendela Writing
========================= */}

{windows.blog && (
  <ResizableModal
    isMobile={isMobile}
    isTablet={isTablet}

    // =========================
    // SMARTPHONE
    // =========================

    mobileHeightRatio={0.78}
    minHeightRatio={0.55}
    mobileWidth="100vw"

    // =========================
    // TABLET
    // =========================

    tabletWidth="80%"
    tabletHeight="70%"
    tabletTop="50%"
    tabletLeft="50%"
    tabletRight="auto"
    tabletBottom="auto"
    tabletTransform="translate(-50%, -50%)"

    // =========================
    // DESKTOP
    // =========================

    desktopWidth="55%"
    desktopHeight="70%"
    desktopTop="50%"
    desktopLeft="50%"
    desktopRight="auto"
    desktopBottom="auto"
    desktopTransform="translate(-50%, -50%)"

    // =========================
    // WINDOW
    // =========================

    title="Writing.exe"

    icon={
      <Notepad variant="16x16_4" />
    }

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow('blog', false)
          }
        />
      </>
    }
  >
    <BlogContent
      isMobile={isMobile}
    />
  </ResizableModal>
)}



{/* =========================
    Jendela AI Assistant
========================= */}

{windows.aiAssistant && (
  <ResizableModal
    id="aiAssistant-window"

    isMobile={isMobile}
    isTablet={isTablet}

    // =========================
    // SMARTPHONE
    // =========================

    mobileHeightRatio={1}
    minHeightRatio={0.5}
    mobileWidth="100vw"

    // =========================
    // TABLET
    // LOCK KANAN
    // =========================

    tabletWidth="50%"
    tabletHeight="auto"
    tabletTop="0"
    tabletLeft="auto"
    tabletRight="0"
    tabletBottom="28px"

    // =========================
    // DESKTOP
    // LOCK KANAN
    // =========================

    desktopWidth="22%"
    desktopHeight="auto"
    desktopTop="0"
    desktopLeft="auto"
    desktopRight="0"
    desktopBottom="28px"

    icon={
      <MicrosoftNetwork variant="16x16_4" />
    }

    title="AI Chat.exe"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow(
              'aiAssistant',
              false
            )
          }
        />
      </>
    }
  >
    <AiAssistantContentModal />
  </ResizableModal>
)}

{/* --- JENDELA CHANGELOG --- */}

{windows.whatsNew && (
  <ResizableModal
    isMobile={isMobile}
    isTablet={isTablet}

    // =========================
    // SMARTPHONE
    // =========================

    mobileHeightRatio={0.72}
    minHeightRatio={0.5}
    mobileWidth="100vw"

    // =========================
    // TABLET
    // =========================

    tabletWidth="480px"
    tabletHeight="68%"
    tabletTop="50%"
    tabletLeft="50%"
    tabletRight="auto"
    tabletBottom="auto"
    tabletTransform="translate(-50%, -50%)"

    // =========================
    // DESKTOP
    // =========================

    desktopWidth="440px"
    desktopHeight="600px"
    desktopTop="50%"
    desktopLeft="50%"
    desktopRight="auto"
    desktopBottom="auto"
    desktopTransform="translate(-50%, -50%)"

    icon={
      <FilePin variant="16x16_4" />
    }

    title="What's New"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow(
              'whatsNew',
              false
            )
          }
        />
      </>
    }
  >
    <Changelog
      isMobile={isMobile}

      onClose={() =>
        toggleWindow(
          'whatsNew',
          false
        )
      }
    />
  </ResizableModal>
)}
{/* --- JENDELA PROJECTS --- */}
{windows.projects && (
 <ResizableModal
  isMobile={isMobile}
  isTablet={isTablet}

  mobileHeightRatio={0.6}
  minHeightRatio={0.6}

  lockPosition={false}

  tabletWidth="70%"
  tabletHeight="60%"
  tabletTop="50%"
  tabletLeft="50%"
  tabletRight="auto"
  tabletBottom="auto"
  tabletTransform="translate(-50%, -50%)"

  desktopWidth="47%"
  desktopHeight="65%"
  desktopTop="50%"
  desktopLeft="50%"
  desktopRight="auto"
  desktopBottom="auto"
  desktopTransform="translate(-50%, -50%)"

  icon={<Folder variant="16x16_4" />}
  title="Project Explorer"

  titleBarOptions={
    <>
      <Modal.Minimize />

      <TitleBar.Close
        onClick={() => toggleWindow('projects', false)}
      />
    </>
  }
>
  <ProjectFolderContent
    isTouchDevice={isTouchDevice}
  />
</ResizableModal>

)}

{/* =========================
    Jendela Project
========================= */}

{/* =========================================================
    EXPLORE
========================================================= */}

{windows.explore && (
  <ProjectWindowModal
    title="Explore - Microsoft Internet Explorer"

    icon={
      <Mshtml32548 variant="16x16_4" />
    }

    isMobile={isMobile}
    isTablet={isTablet}

    url="https://www.perdanakun.com/explore"

    startMaximized={true}
    lockMaximized={true}
    animateOpen={true}

    lockContent={false}

    onClose={() =>
      toggleWindow(
        'explore',
        false
      )
    }
  >
    <ExploreContent />
  </ProjectWindowModal>
)}

{/* =========================================================
    JENDELA PROJECT INSIDE
========================================================= */}

{Object.entries(projectWindows).map(
  ([windowName, project]) => {
    if (!windows[windowName]) {
      return null;
    }

    return (
      <ProjectWindowModal
        key={windowName}

        title={project.title}

        icon={
          <Url1102
            variant="16x16_4"
          />
        }

        isMobile={isMobile}
        isTablet={isTablet}

        width={
          project.width ||
          '80%'
        }

        height={
          project.height ||
          '90%'
        }

        url={
          project.url ||
          'https://www.perdanakun.com/'
        }

        lockContent={
          project.lockContent ||
          false
        }

        slideNavigation={
          project.slideNavigation ||
          null
        }

        onClose={() =>
          toggleWindow(
            windowName,
            false
          )
        }
      >
        {project.content}
      </ProjectWindowModal>
    );
  }
)}

{/* =========================================================
    JENDELA NOTEPAD OVERVIEW 
========================================================= */}

{Object.entries(notepadWindows).map(
  ([windowName, notepad]) =>
    windows[windowName] && (
      <NotepadModal
        key={windowName}

        title={notepad.title}

        icon={
          <Notepad2 variant="16x16_4" />
        }

        isMobile={isMobile}
        isTablet={isTablet}

        width="60%"
        height="80%"

        onClose={() =>
          toggleWindow(
            windowName,
            false
          )
        }
      >
        {notepad.content}
      </NotepadModal>
    )
)}


{/* =========================
    Jendela Contact
========================= */}

{windows.contact && (
  <ResizableModal
    isMobile={isMobile}
    isTablet={isTablet}

    // =========================
    // SMARTPHONE
    // =========================

    mobileHeightRatio={0.72}
    minHeightRatio={0.6}
    mobileWidth="100vw"

    // =========================
    // TABLET
    // CENTER
    // =========================

    tabletWidth="70%"
    tabletHeight="50%"
    tabletTop="50%"
    tabletLeft="50%"
    tabletRight="auto"
    tabletBottom="auto"
    tabletTransform="translate(-50%, -50%)"

    // =========================
    // DESKTOP
    // CENTER
    // =========================

    desktopWidth="40%"
    desktopHeight="60%"
    desktopTop="50%"
    desktopLeft="50%"
    desktopRight="auto"
    desktopBottom="auto"
    desktopTransform="translate(-90%, -70%)"

    icon={
      <Mapi32801 variant="16x16_4" />
    }

    title="Mail"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow('contact', false)
          }
        />
      </>
    }
  >
    <ContactContent
      isMobile={isMobile}
      onSendSuccess={() =>
        setShowContactAlert(true)
      }
      onSendError={() =>
        setShowContactErrorAlert(true)
      }
      onOpenCamera={() =>
        setShowCamera(true)
      }
      cameraAttachment={
        cameraAttachment
      }
      onRemoveAttachment={() =>
        setCameraAttachment(null)
      }
      onAttachmentTooLarge={
        handleAttachmentTooLarge
      }
    />
  </ResizableModal>
)}

{/* Jendela Contact Camera */}
{showCamera && (
  <Modal
    key="camera-window"
    icon={<Mapi32801 variant="16x16_4" />}
    title="Camera.exe"
    style={{
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '450px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      boxSizing: 'border-box',
    }}
    titleBarOptions={
      <TitleBar.Close
        onClick={() => setShowCamera(false)}
      />
    }
  >
    <CameraModal
      show={showCamera}
      onClose={() => setShowCamera(false)}
      onCapture={(file) => {
        setCameraAttachment(file);
        setShowCamera(false);
      }}
    />
  </Modal>
)}


        {/* Jendela Contact Alert Message Sent */}
      <AlertModal
      show={showContactAlert}
      title="Message Sent!"
      message={
        <>
          Your message has been sent successfully.
          <br />
          Thanks for reaching out!
        </>
      }
      onClose={() => setShowContactAlert(false)}
      />

      {/* Jendela Contact Alert Attachment Too Large */}

      {/* Jendela Contact Alert Send Error */}
      <AlertModalFailed
        show={showContactErrorAlert}
        title="Message Failed"
        message={
          <>
            Sorry, your message could not be sent.
            <br />
            Please try again.
          </>
        }
        onClose={() => setShowContactErrorAlert(false)}
      />

<AlertModalEmailFile
  show={showAttachmentAlert}
  title="Attachment Too Large"
  message={attachmentAlertMessage}
  onClose={() => setShowAttachmentAlert(false)}
/>
{/* Jendela csGame */}
{windows.csGame && (
  <Modal
    key="csGame-window"
    icon={<MsDos variant="16x16_32" />}
    title="Games.exe"
    style={{
      position: 'fixed',

      ...(isMobile
        ? {
            top: 0,
            left: 0,
            right: 0,
            bottom: '28px',

            width: '100vw',
            height: 'auto',

            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 28px)',

            transform: 'none',
            margin: 0,
          }

        : isTablet
        ? {
            top: 0,
            left: 0,

            width: '100vw',
            height: 'auto',

            bottom: '28px',

            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 28px)',

            transform: 'none',
            margin: 0,
          }

        : {
            top: 0,
            left: 0,

            width: '100vw',
            height: 'auto',

            bottom: '28px',

            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 28px)',

            transform: 'none',
            margin: 0,
          }),

      boxSizing: 'border-box',
    }}

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow('csGame', false)
          }
        />
      </>
    }
  >
    <FlappyGame />
  </Modal>
)}

{/* Jendela About */}
{windows.about && (
  <Modal
    key="about-window"
    icon={<Computer variant="16x16_4" />}
    title="About Perdana's Computer"
    style={{
      position: 'fixed',

      // =====================================
      // SMARTPHONE
      // FULLSCREEN - TASKBAR
      // =====================================
      ...(isMobile
        ? {
            top: 0,
            left: 0,
            right: 0,
            bottom: '28px',

            width: '100vw',
            height: 'auto',

            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 28px)',

            transform: 'none',
            margin: 0,
          }

        // =====================================
        // TABLET
        // PROPERTIES DIALOG
        // =====================================
        : isTablet
        ? {
            left: '50%',
            top: '50%',

            width: 'min(620px, 88vw)',
            height: 'min(440px, 72vh)',

            minWidth: '520px',
            minHeight: '380px',

            maxWidth: 'calc(100vw - 40px)',
            maxHeight: 'calc(100vh - 50px)',

            transform: 'translate(-50%, -50%)',
          }

        // =====================================
        // DESKTOP
        // PROPERTIES DIALOG
        // =====================================
        : {
            left: '50%',
            top: '50%',

            width: '450px',
            height: 'auto',
            minHeight: '600px',

            maxWidth: 'calc(100vw - 40px)',
            maxHeight: 'calc(100vh - 60px)',

            transform: 'translate(-50%, -50%)',
          }),

      boxSizing: 'border-box',
    }}

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() => toggleWindow('about', false)}
        />
      </>
    }
  >
    <AboutContent
  onClose={() => toggleWindow('about', false)}
/>
  </Modal>
)}

{/* --- JENDELA RECYCLE BIN --- */}

{windows.recycleBin && (
  <ResizableModal
    isMobile={isMobile}
    isTablet={isTablet}

    // =========================
    // SMARTPHONE
    // =========================

    mobileHeightRatio={0.45}
    minHeightRatio={0.35}
    mobileWidth="100vw"

    // =========================
    // TABLET
    // LEBIH KE KIRI + ATAS
    // DARI PROJECTS
    // =========================

    tabletWidth="60%"
    tabletHeight="30%"
    tabletTop="35%"
    tabletLeft="35%"
    tabletRight="auto"
    tabletBottom="auto"
    tabletTransform="translate(-50%, -50%)"

    // =========================
    // DESKTOP
    // LEBIH KE KIRI + ATAS
    // DARI PROJECTS
    // =========================

    desktopWidth="30%"
    desktopHeight="45%"
    desktopTop="35%"
    desktopLeft="35%"
    desktopRight="auto"
    desktopBottom="auto"
    desktopTransform="translate(-50%, -50%)"

    icon={
      <RecycleFull variant="16x16_4" />
    }

    title="Recycle Bin"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow(
              'recycleBin',
              false
            )
          }
        />
      </>
    }
  >
    <RecycleBin
      onOpenFile={openImageFile}
      isTouchDevice={isTouchDevice}
    />
  </ResizableModal>
)}

{/* --- JENDELA IMAGE VIEWER --- */}
{imageViewers.map((viewer) => (
  <ResizableModal
    key={viewer.id}
    id={`image-viewer-${viewer.id}`}

    isMobile={isMobile}
    isTablet={isTablet}

    mobileWidth="100vw"

    // =========================
    // TABLET
    // =========================
    tabletWidth={`${viewer.width + 28}px`}
    tabletHeight={`${viewer.height + 90}px`}
    tabletTop="50%"
    tabletLeft="50%"
    tabletRight="auto"
    tabletBottom="auto"
    tabletTransform="translate(-50%, -50%)"

    // =========================
    // DESKTOP
    // =========================
    desktopWidth={`${viewer.width + 28}px`}
    desktopHeight={`${viewer.height + 90}px`}
    desktopTop="50%"
    desktopLeft="50%"
    desktopRight="auto"
    desktopBottom="auto"
    desktopTransform="translate(-50%, -50%)"

    icon={<Wangimg128 variant="16x16_4" />}
    title={viewer.file.name}

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() => closeImageViewer(viewer.id)}
        />
      </>
    }
  >
    <ImageViewer
      viewer={viewer}
      onImageLoad={handleImageLoad}
    />
  </ResizableModal>
))}


{/* =========================================
    IMAGE GALLERY
========================================= */}

{imageGallery && (
  <ResizableModal
    id="image-gallery"

    isMobile={isMobile}
    isTablet={isTablet}

    // =========================
    // SMARTPHONE
    // =========================

    mobileWidth="100vw"
    mobileHeightRatio={1}
    minHeightRatio={0.5}

    // =========================
    // TABLET
    // =========================

    tabletWidth="auto"
    tabletHeight="auto"

    tabletTop="50%"
    tabletLeft="50%"
    tabletRight="auto"
    tabletBottom="auto"

    tabletTransform=
      "translate(-50%, -50%)"

    // =========================
    // DESKTOP
    // =========================

    desktopWidth="70%"
    desktopHeight="auto"

    desktopTop="50%"
    desktopLeft="50%"
    desktopRight="auto"
    desktopBottom="auto"

    desktopTransform=
      "translate(-50%, -50%)"

    icon={
      <Wangimg128
        variant="16x16_4"
      />
    }

    title={
      imageGalleryTitle
    }

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={
            closeImageGallery
          }
        />
      </>
    }
  >
    <ImageGalleryViewer
      items={
        imageGallery.items
      }

      initialIndex={
        imageGallery.startIndex
      }

      onIndexChange={(
        index,
        item
      ) => {
        setImageGalleryTitle(
          item?.name ||
            'Image Gallery'
        );
      }}
    />
  </ResizableModal>
)}

{/* =========================================
    VIDEO VIEWER
========================================= */}
{activeVideo && (
  <ResizableModal
    id="video-viewer"

    isMobile={isMobile}
    isTablet={isTablet}

    mobileWidth="100vw"
    mobileHeightRatio={1}
    minHeightRatio={0.5}

    tabletWidth="auto"
    tabletHeight="auto"
    tabletTop="50%"
    tabletLeft="50%"
    tabletRight="auto"
    tabletBottom="auto"
    tabletTransform=
      "translate(-50%, -50%)"

    desktopWidth="auto"
    desktopHeight="auto"
    desktopTop="50%"
    desktopLeft="50%"
    desktopRight="auto"
    desktopBottom="auto"
    desktopTransform=
      "translate(-50%, -50%)"

    icon={
      <Mplayer110
        variant="16x16_4"
      />
    }

    title={
      activeVideo.name
    }

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            setActiveVideo(null)
          }
        />
      </>
    }
  >
    <VideoViewer
      video={activeVideo}
    />
  </ResizableModal>
)}



{/* =========================================================
    DESKTOP VIDEO
========================================================= */}

{windows.desktopVideo && (
  <ResizableModal
    isMobile={isMobile}
    isTablet={isTablet}

    // =========================
    // SMARTPHONE
    // =========================

    mobileHeightRatio={0.72}
    minHeightRatio={0.5}
    mobileWidth="100vw"

    // =========================
    // TABLET
    // =========================

    tabletWidth="600px"
    tabletHeight="auto"

    tabletTop="50%"
    tabletLeft="50%"

    tabletRight="auto"
    tabletBottom="auto"

    tabletTransform="translate(-50%, -50%)"

    // =========================
    // DESKTOP
    // =========================

    desktopWidth="auto"
    desktopHeight="auto"

    desktopTop="50%"
    desktopLeft="50%"

    desktopRight="auto"
    desktopBottom="auto"

    desktopTransform="translate(-50%, -50%)"

    // =========================
    // WINDOW
    // =========================

    icon={
      <Mplayer110
        variant="16x16_4"
      />
    }

    title="Bakso Sarjana.mp4 - Media Player"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow(
              'desktopVideo',
              false
            )
          }
        />
      </>
    }
  >
    <VideoViewer
      video={
        desktopVideo
      }
    />
  </ResizableModal>
)}


{/* =========================================================
    MOBILE PREVIEW PROJCTS
========================================================= */}



{windows['travelxxx-preview'] && (
  <ResizableModal
    isMobile={isMobile}
    isTablet={isTablet}

    // Smartphone visitor
    mobileHeightRatio={1}
    minHeightRatio={0.6}
    mobileWidth="100vw"

    // Tablet
    tabletWidth="70%"
    tabletHeight="85%"
    tabletTop="50%"
    tabletLeft="50%"
    tabletRight="auto"
    tabletBottom="auto"
    tabletTransform="translate(-50%, -50%)"

// Desktop
desktopWidth="520px"
desktopHeight="92%"
desktopTop="50%"
desktopLeft="auto"
desktopRight="12px"
desktopBottom="auto"
desktopTransform="translateY(-50%)"

    title="TravelXXX - Mobile Preview"

    icon={
      <Mshtml32548 variant="16x16_4" />
    }

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow(
              'travelxxx-preview',
              false
            )
          }
        />
      </>
    }
  >
<MobileWebPreview
  url="https://travelxxx-hotel-compass.vercel.app/"
  liveUrl="https://travelxxx.perdanakun.com/"
  title="TravelXXX"
  width={480}
  height={956}
/>
  </ResizableModal>
)}


        {/* --- TASKBAR BAWAH BAWAAN REACT95 --- */}
   <TaskBar
  style={{
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    zIndex: 99999,
  }}
  list={
    <List style={{ width: '240px' }}>

      <List.Item
        icon={<Textchat variant="16x16_4" />}
        onClick={() => toggleWindow('welcome', true)}
      >
        Welcome
      </List.Item>
      <List.Item
        icon={<FilePin variant="16x16_4" />}
        onClick={() => toggleWindow('whatsNew', true)}
      >
        What's New
      </List.Item>

      <List.Divider />

      {/* ABOUT */}
      <List.Item
        icon={<Computer variant="16x16_4" />}
        onClick={() => toggleWindow('about', true)}
      >
        About
      </List.Item>

            <List.Item
        icon={<MicrosoftNetwork variant="16x16_4" />}
        onClick={() => toggleWindow('aiAssistant', true)}
      >
        AI Chat
      </List.Item>

      {/* PROJECTS */}
      <List.Item
        icon={<Folder variant="16x16_4" />}
        onClick={() => toggleWindow('projects', true)}
      >
        Projects
      </List.Item>

      {/* CONTACT */}
      <List.Item
        icon={<Mapi32801 variant="16x16_4" />}
        onClick={() => toggleWindow('contact', true)}
      >
        Inbox
      </List.Item>

      {/* GAMES */}
      <List.Item
        icon={<Mshtml32548 variant="16x16_4" />}
      onClick={() => toggleWindow('explore', true)}
      >
        Explore
      </List.Item>

      {/* WRITING */}
      <List.Item
        icon={<Wordpad variant="16x16_4" />}
        onClick={() =>
          openAlertDesktop(
            'Feature Locked',
            <>
              This module is still under construction. While I'm polishing the
              design & code, feel free to browse my thoughts on{' '}
              <a
                href="https://medium.com/@perdanakun"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#000080',
                  textDecoration: 'underline',
                }}
              >
                Medium
              </a>
            </>
          )
        }
      >
        Writing
      </List.Item>

      {/* PAINT */}
      <List.Item
        icon={
          <Mspaint variant="16x16_4" />
        }
        onClick={() =>
          openWindow('paintHero')
        }
      >
        Paint
      </List.Item>

      {/* INSTALLER */}
      <List.Item
        icon={<Computer variant="16x16_4" />}
        onClick={openInstaller}
      >
        Installer
      </List.Item>

      <List.Divider />

      {/* RESET */}
      <List.Item
        icon={<Computer4 variant="16x16_4" />}
        onClick={handleRestart}
      >
        Reset Desktop
      </List.Item>

    </List>
  }
/>
  </main>
) : null}

    </>
  );
}

const desktopIconStyle = {
  width: '80px', 
  textAlign: 'center', 
  cursor: 'grab',
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  textShadow: '1px 1px black',
  userSelect: 'none'
};

const desktopIconLabelStyle = {
  display: 'block',
  lineHeight: '20px',
  marginTop: '4px',
  color: 'black',
  textShadow: 'none',
};

const desktopIconLabelSelectedStyle = {
  backgroundColor: '#000080',
  color: '#ffffff',
  textShadow: 'none',

  outline: '1px dotted #ffffff',
  outlineOffset: '-1px',

  padding: '1px 2px',
};

const inputStyle = {
  width: '100%',
  padding: '6px',
  border: 'none',
  boxShadow: 'inset 2px 2px 0px #868686, inset -2px -2px 0px #ffffff',
  backgroundColor: 'white',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  outline: 'none'
};


function AppWithClippy() {
  const pathname =
    typeof window !== 'undefined'
      ? window.location.pathname
          .replace(/\/+$/, '') || '/'
      : '/';

  // =========================================================
  // STANDALONE EXPLORE PAGE
  // =========================================================
if (pathname === '/explore') {
  return (
    <>
      <style>
        {`
          html,
          body,
          #root {
            width: 100%;
            min-width: 100%;
            min-height: 100%;

            margin: 0;
            padding: 0;

            background: #ffffff;
          }

          body {
            overflow-x: hidden;
          }
        `}
      </style>

      <main
        style={{
          position: 'fixed',

          inset: 0,

          width: '100vw',
          height: '100vh',

          margin: 0,
          padding: 0,

          background: '#ffffff',

          overflowX: 'hidden',
          overflowY: 'auto',

          boxSizing: 'border-box',
        }}
      >
        <ExploreContent />
      </main>
    </>
  );
}

  // =========================================================
  // PERDANA'S COMPUTER
  // =========================================================

  return (
    <ClippyProvider>
      <App />
    </ClippyProvider>
  );
}

export default AppWithClippy;

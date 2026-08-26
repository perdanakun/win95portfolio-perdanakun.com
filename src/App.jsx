import '@react95/core/GlobalStyle';
import '@react95/core/themes/win95.css';
import '@react95/icons/icons.css';
import './styles/fonts.css';
import installerBackground from './assets/images/win95_install.jpg';
import winBackground from './assets/images/win_background2.jpg';
import winDawn from './assets/images/1dawn.png';
import winMorning from './assets/images/2morning.png';
import winMidday from './assets/images/3midday.png';
import winAfternoon from './assets/images/4afternoon.png';
import winSunset from './assets/images/5sunset.png';
import winBlueHour from './assets/images/6bluehour.png';

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
import AlertModalInstall from './components/AlertModalInstall';
import AlertModalFailed from './components/AlertModalFailed';
import AlertModalEmailFile from './components/AlertModalEmailFile';
import CameraModal from './components/CameraModal';
import AiAssistant from "./components/AiAssistant";
import AiAssistantSphere from "./components/AiAssistantSphere";
import ImageViewer from './components/ImageViewer';
import WelcomeInstaller from './components/installer/WelcomeInstaller';
import WelcomeInstallerLoading from './components/installer/WelcomeInstallerLoading';
import PerdanaInstaller from './components/installer/PerdanaInstaller';
import BlogContent from './components/BlogContent';
import BrowserModal from './components/BrowserModal';
import WelcomeModal from './components/WelcomeModal';
import PerdanaBootScreen from './components/boot/PerdanaBootScreen';
import PerdanaInstallLoading from './components/installer/PerdanaInstallLoading';

import ProjectWindowModal from './components/ProjectWindowModal';

import HoloHealthContent from './project/HoloHealthContent';
import ShipUIContent from './project/ShipUIContent';
import MayoraContent from './project/MayoraContent';
import PerdanaComputerProductContent from './project/PerdanaComputerProductContent';

import { getAIResponse } from "./services/aiService";
import { Frame, TitleBar, Button, TaskBar, List, Modal, useModal } from '@react95/core';
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
  Textchat,
  Computer4,
  FilePin,
  Wordpad,
} from '@react95/icons';
import { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import aiOpenSound from './assets/sounds/ai_assistant_open.wav';


// Fungi baru klik and tap DesktopIcon
function DesktopIcon({ children, onOpen }) {
  const handleDoubleClick = (e) => {
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    onOpen();
  };

  const handlePointerUp = (e) => {
    if (
      e.pointerType === 'touch' ||
      e.pointerType === 'pen'
    ) {
      e.preventDefault();
      e.stopPropagation();

      onOpen();
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onPointerUp={handlePointerUp}
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
    return (
      <Modal
        {...props}
        titleBarOptions={titleBarOptions}
        onPointerDownCapture={startResize}
        style={{
          position: 'fixed',

          top: 'auto',
          left: 0,
          right: 0,

          bottom: mobileLockBottom
            ? `${TASKBAR_HEIGHT}px`
            : 0,

          width: mobileWidth,
          height: `${height}px`,

          maxWidth: '100vw',

          maxHeight: mobileLockBottom
            ? `calc(100vh - ${TASKBAR_HEIGHT}px)`
            : '100vh',

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

const [pcScreen, setPcScreen] = useState(() => {
  const state = getPCState();

  return state.installed
    ? 'desktop'
    : 'boot';
});


  // DEBUG Boot PC


useEffect(() => {

  if (pcScreen !== 'boot') {
    return;
  }

  const bootTimer = setTimeout(() => {
    setPcScreen('desktop');
  }, 6000);

  return () => {
    clearTimeout(bootTimer);
  };

}, [pcScreen]);


// ==========================================
// PERDANA PC INSTALLER LIFECYCLE
// ==========================================

useEffect(() => {
  // Jangan cek installer sebelum boot selesai
  if (pcScreen !== 'desktop') {
    return;
  }

  // Kalau sudah pernah install, jangan munculkan otomatis
  if (pcState.installed) {
    return;
  }

  // First boot → tampilkan Welcome Installer terlebih dahulu
  setWelcomeInstallerVisible(true);
}, [pcScreen, pcState.installed]);



  // this PC already installed something like that

  const savePCState = (nextState) => {
  setPcState(nextState);

  localStorage.setItem(
    PC_STORAGE_KEY,
    JSON.stringify(nextState)
  );
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

  // Menyimpan status true (terbuka) atau false (tertutup) untuk setiap aplikasi/jendela
const [windows, setWindows] = useState({
  welcome: false,
  about: false,
  projects: false,
  contact: false,
  csGame: false,
  aiAssistant: false,
  recycleBin: false,
  imageViewer: false,
  blog: false,
  browser: false,

    // Project windows
  holohealth: false,
  'ship-ui': false,
   mayora: false,
   'perdana-computer-product': false,
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

// Alert Installer
const [showInstallAlert, setShowInstallAlert] = useState(false);

// ==========================================
// WINDOWS BOOT SESSION
// ==========================================

useEffect(() => {
  // Jangan buka Welcome sebelum desktop siap
  if (pcScreen !== 'desktop') {
    return;
  }

  // Kalau PC belum selesai di-install,
  // installer harus punya prioritas.
  if (!pcState.installed) {
    return;
  }

  const bootSession = sessionStorage.getItem(
    'perdana-boot-session'
  );

  // Welcome hanya otomatis sekali
  // dalam satu browser session / boot session.
  if (!bootSession) {
    setWindows(prev => ({
      ...prev,
      welcome: true,
    }));

    sessionStorage.setItem(
      'perdana-boot-session',
      'true'
    );
  }
}, [pcScreen, pcState.installed]);



// Perdana PC Installer
const [welcomeInstallerVisible, setWelcomeInstallerVisible] = useState(false);
const [welcomeInstallerLoadingVisible, setWelcomeInstallerLoadingVisible] = useState(false);
const [installerVisible, setInstallerVisible] = useState(false);


// Desktop Icon Installer
const openInstaller = () => {
  setWelcomeInstallerVisible(true);
  setInstallerVisible(false);
};




// ==========================================
// PERDANA INSTALLER LOADING
// ==========================================
const [isInstalling, setIsInstalling] = useState(false);

useEffect(() => {
  if (!isInstalling) {
    return;
  }

  const installTimer = setTimeout(() => {
    setIsInstalling(false);
    setInstallerVisible(false);
  }, 3000);

  return () => {
    clearTimeout(installTimer);
  };
}, [isInstalling]);

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
    csGame: false,
    aiAssistant: false,
    recycleBin: false,
    imageViewer: false,
    blog: false,
    browser: false,

// Project windows
  holohealth: false,
  'ship-ui': false,
  mayora: false,
  'perdana-computer-product': false,
  });

  // Reset boot session supaya Welcome muncul lagi
  sessionStorage.removeItem('perdana-boot-session');

  // Masuk ke boot screen
  setPcScreen('boot');
};

// Mapping Content Project

const projectWindows = {
  holohealth: {
    title: 'HoloHealth.exe',
    content: (
      <HoloHealthContent />
    ),
  },

  'ship-ui': {
    title: 'Ship UI.exe',
    content: (
      <ShipUIContent />
    ),
  },

  mayora: {
    title: 'Mayora.exe',
    content: (
      <MayoraContent />
    ),
  },

  'perdana-computer-product': {
    title: "Perdana's Computer.exe",
    content: (
      <PerdanaComputerProductContent />
    ),
  },
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

  return (
    <>
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
  <PerdanaBootScreen />
)}

      {/* --- CONTAINER DESKTOP UTAMA --- */}
{/* =========================
    WINDOWS 95 INSTALL LOADING
========================= */}
{pcScreen === 'desktop' && isInstalling && (
  <PerdanaInstallLoading 
  winBackground={winBackground}
  />
)}
{/* =========================
    WINDOWS 95 INSTALL FLOW
========================= */}

{pcScreen === 'desktop' && (
  welcomeInstallerVisible ||
  welcomeInstallerLoadingVisible ||
  installerVisible
) ? (

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

    {/* =========================
        FADING BACKGROUND
    ========================= */}
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

      {/* =========================
          WELCOME INSTALLER
      ========================= */}
      {welcomeInstallerVisible && (
<WelcomeInstaller
  isMobile={isMobile}
  isTablet={isTablet}

onContinue={() => {
  setWelcomeInstallerVisible(false);
  setWelcomeInstallerLoadingVisible(true);
}}


  onClose={() => {
    setWelcomeInstallerVisible(false);
  }}
/>
      )}

      {/* =========================
    WELCOME INSTALLER LOADING
========================= */}

{welcomeInstallerLoadingVisible && (
  <WelcomeInstallerLoading
    isMobile={isMobile}
    isTablet={isTablet}

    onComplete={() => {
      setWelcomeInstallerLoadingVisible(false);
      setInstallerVisible(true);
    }}
  />
)}


      {/* =========================
          PERDANA INSTALLER
      ========================= */}
      {installerVisible && (
        <PerdanaInstaller
          isMobile={isMobile}
          isTablet={isTablet}

          onClose={() => {
            setInstallerVisible(false);
          }}

          onFinish={() => {
            const nextState = {
              ...pcState,
              installed: true,
            };

            savePCState(nextState);

            setIsInstalling(true);
          }}
        />
      )}

{/* =========================
    INSTALLATION NOTE
========================= */}
{(
  welcomeInstallerVisible ||
  welcomeInstallerLoadingVisible ||
  installerVisible
) && (

  <div
    style={{
      position: 'absolute',

      left: '50%',
      bottom: isMobile
        ? '6%'
        : isTablet
        ? '4%'
        : '3%',

      transform: 'translateX(-50%)',

      width: isMobile
        ? '90%'
        : isTablet
        ? '75%'
        : '100%',

      maxWidth: isMobile
        ? '360px'
        : isTablet
        ? '600px'
        : 'none',

      padding: '0 16px',

      color: '#dadada',

      fontFamily:
        '"MS Sans Serif", Arial, sans-serif',

      fontSize: isMobile
        ? 9
        : isTablet
        ? 10
        : 11,

      fontWeight: 'normal',

      textShadow: '1px 1px 0 #000',

      textAlign: 'center',

      lineHeight: isMobile
        ? 1.4
        : isTablet
        ? 1.4
        : 1.3,

      boxSizing: 'border-box',

      userSelect: 'none',
      pointerEvents: 'none',

      zIndex: 10001,
    }}
  >
    This setup runs automatically the first time you visit.
    <br />
    Once you're in, you can launch it again from the desktop.
  </div>
)}

    </div>
  </div>
) : pcScreen === 'desktop' ? (
  <main
    aria-label="Perdana's Computer — portfolio of Perdana Kurniawan Arta"
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
{/*aiSphereVisible && (
  <AiAssistantSphere
    onClick={openAiAssistantV2}
  />
)/*}
{/* About */}
<Rnd
  default={{ x: 24, y: 24, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>
  <DesktopIcon onOpen={() => openWindow('about')}>
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Computer variant="32x32_4" />
      </div>
      <span>About</span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Installer */}
<Rnd
  default={{ x: 24, y: 120, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>
  <DesktopIcon onOpen={() => setShowInstallAlert(true)}>
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Install variant="32x32_4" />
      </div>
      <span>Installer</span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Contact */}
<Rnd
  default={{ x: 24, y: 216, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>
  <DesktopIcon onOpen={() => openWindow('contact')}>
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Mapi32801 variant="32x32_4" />
      </div>
      <span>Mail</span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Projects */}
<Rnd
  default={{ x: 120, y: 120, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>

  <DesktopIcon onOpen={() => openWindow('projects')}>
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Folder variant="32x32_4" />
      </div>
      <span>My Projects</span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Recycle Bin */}
<Rnd
  default={{ x: 24, y: 408, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>
  <DesktopIcon onOpen={() => openWindow('recycleBin')}>
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <RecycleFull variant="32x32_4" />
      </div>
      <span>Recycle Bin</span>
    </div>
  </DesktopIcon>
</Rnd>

{/* AI Chat */}
<Rnd
  default={{ x: 120, y: 24, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>
  <DesktopIcon onOpen={() => openWindow('aiAssistant')}>
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Intl101 variant="32x32_4" />
      </div>
      <span>AI Chat</span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Games */}
<Rnd
  default={{ x: 24, y: 312, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>

  <DesktopIcon
    onOpen={() =>
      openAlertDesktop(
        "I'm sorry...",
        "This game module is still under construction. While I'm polishing the design & code for your entertainment, please check back in the next system update."
      )
    }
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <MsDos variant="32x32_32" />
      </div>
      <span>Games</span>
    </div>
  </DesktopIcon>
</Rnd>

{/* Writing */}
<Rnd
  default={{ x: 120, y: 216, width: 80, height: 80 }}
  bounds="window"
  enableResizing={false}
  disableDragging={false}
>
  <DesktopIcon
    onOpen={() =>
      openAlertDesktop(
        'Feature Locked',
        <>
          This module is still under construction. While I'm polishing the
          design & code, feel free to browse my thoughts on{' '}
          <a
            href="https://medium.com/@perdanakun"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#000080', textDecoration: 'underline' }}
          >
            Medium
          </a>
        </>
      )
    }
  >
    <div style={desktopIconStyle}>
      <div style={{ fontSize: '32px', marginBottom: '0' }}>
        <Wordpad variant="32x32_4" />
      </div>
      <span>Writing</span>
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

<AlertModalInstall
  show={showInstallAlert}
title="Perdana Installer"
message={
<>
  Perdana's Computer is already installed.{" "}
  <strong>Do you want to install it again</strong> and explore the profile from the beginning?
</>
}



  onClose={() => setShowInstallAlert(false)}
  onConfirm={() => {
    setShowInstallAlert(false);
    openInstaller();
  }}
/>



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
    Jendela Project
========================= */}

{/* =========================================================
    JENDELA PROJECT INSIDE
========================================================= */}
{Object.entries(projectWindows).map(
  ([windowName, project]) =>
    windows[windowName] && (
      <ProjectWindowModal
        key={windowName}

        title={project.title}

        icon={
          <Folder variant="16x16_4" />
        }

        style={{
          zIndex: 200,
        }}

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
        {project.content}
      </ProjectWindowModal>
    )
)}


{/* =========================
    Jendela Welcome
========================= */}


{windows.welcome && (
  <WelcomeModal
    isMobile={isMobile}
    isTablet={isTablet}
    onClose={() => toggleWindow('welcome', false)}
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

    /*
     * Replace this with whichever
     * React95 icon you want for Writing.
     *
     * You can temporarily remove
     * the icon prop if necessary.
     */
    icon={<Notepad variant="16x16_4" />}

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




{/* --- JENDELA AI MESSENGER --- */}
{windows.aiAssistant && (
  <ResizableModal
    id="aiAssistant-window"

    isMobile={isMobile}
    isTablet={isTablet}

    minHeightRatio={0.5}

    // =========================
    // SMARTPHONE
    // TETAP / TIDAK DIUBAH
    // =========================
    mobileWidth="100vw"

    // =========================
    // TABLET
    // LOCK KANAN
    // MINUS TASKBAR
    // MAX WIDTH 30%
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
    // MINUS TASKBAR
    // MAX WIDTH 30%
    // =========================
    desktopWidth="20%"
    desktopHeight="auto"
    desktopTop="0"
    desktopLeft="auto"
    desktopRight="0"
    desktopBottom="28px"

    icon={<Intl101 variant="16x16_4" />}
    title="AI Assistant.exe"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() =>
            toggleWindow('aiAssistant', false)
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
  <Changelog
    isMobile={isMobile}
    isTablet={isTablet}
    onClose={() =>
      toggleWindow('whatsNew', false)
    }
  />
)}

{/* --- JENDELA PROJECTS --- */}
{windows.projects && (
 <ResizableModal
  isMobile={isMobile}
  isTablet={isTablet}

  mobileHeightRatio={0.4}
  minHeightRatio={0.4}

  lockPosition={false}

  tabletWidth="70%"
  tabletHeight="60%"
  tabletTop="50%"
  tabletLeft="50%"
  tabletRight="auto"
  tabletBottom="auto"
  tabletTransform="translate(-50%, -50%)"

  desktopWidth="40%"
  desktopHeight="50%"
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


{/* Jendela Contact */}
{windows.contact && (
  <ResizableModal
    isMobile={isMobile}
    isTablet={isTablet}

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
    desktopTransform="translate(-50%, -50%)"

    icon={<Mapi32801 variant="16x16_4" />}
    title="Contact.exe"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() => toggleWindow('contact', false)}
        />
      </>
    }
  >
    <ContactContent
      isMobile={isMobile}
      onSendSuccess={() => setShowContactAlert(true)}
      onSendError={() => setShowContactErrorAlert(true)}
      onOpenCamera={() => setShowCamera(true)}
      cameraAttachment={cameraAttachment}
      onRemoveAttachment={() => setCameraAttachment(null)}
      onAttachmentTooLarge={handleAttachmentTooLarge}
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

    icon={<RecycleFull variant="16x16_4" />}
    title="Recycle Bin"

    titleBarOptions={
      <>
        <Modal.Minimize />

        <TitleBar.Close
          onClick={() => toggleWindow('recycleBin', false)}
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
        onClick={() =>
          openAlertDesktop(
            'Sorry about that...',
            <>
              This section is still under construction. While I'm polishing the
              design & code, you can know a little more about me by checking out
              my{' '}
              <a
                href="https://linkedin.com/in/perdanakun"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#000080',
                  textDecoration: 'underline',
                }}
              >
                LinkedIn
              </a>
            </>
          )
        }
      >
        About
      </List.Item>

            <List.Item
        icon={<Intl101 variant="16x16_4" />}
        onClick={() => toggleWindow('aiAssistant', true)}
      >
        AI Chat
      </List.Item>

      {/* PROJECTS */}
      <List.Item
        icon={<Folder variant="16x16_4" />}
        onClick={() => toggleWindow('projects', true)}
      >
        My Projects
      </List.Item>

      {/* CONTACT */}
      <List.Item
        icon={<Mapi32801 variant="16x16_4" />}
        onClick={() => toggleWindow('contact', true)}
      >
        Mail
      </List.Item>

      {/* GAMES */}
      <List.Item
        icon={<MsDos variant="16x16_32" />}
        onClick={() =>
          openAlertDesktop(
            "I'm sorry...",
            "This game module is still under construction. While I'm polishing the design & code for your entertainment, please check back in the next system update."
          )
        }
      >
        Games
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

      {/* INSTALLER */}
      <List.Item
        icon={<Computer variant="16x16_4" />}
        onClick={() => setShowInstallAlert(true)}
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

export default App;
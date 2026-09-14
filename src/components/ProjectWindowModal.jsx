import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
  Modal,
  TitleBar,
} from '@react95/core';

import {
  Folder,
  User4,
  Refresh,

  Inetcpl1313,
  Fave,
  Inetcpl1308,
  Time,
  Websrch,
  Nwnp32PrinterIcon,
  Mailnews12,
  Globe,
  Progman44,
  Progman45,
  Logo,
  Ie,

} from '@react95/icons';

export default function ProjectWindowModal({
  title = 'Project.exe',
  icon = null,

  isMobile = false,
  isTablet = false,

  onClose,

  url = 'https://www.perdanakun.com/',
  statusText = 'Done',

  width = '60%',
  height = '70%',

  top = '50%',
  left = '50%',

  transform = 'translate(-50%, -50%)',

  // CASE STUDY / BROWSER NAVIGATION
  onBack,
  onForward,

  canGoBack = false,
  canGoForward = false,

  lockContent = false,

  // OPTIONAL GENERIC SLIDER NAVIGATION
  slideNavigation = null,

  // =========================================================
  // WINDOW BEHAVIOR
  // =========================================================

  // Membuka window dalam kondisi maximize
  startMaximized = false,

  // Saat maximized, posisi window dikunci. Restore tetap tersedia.
  lockMaximized = false,

  // Animasi kecil -> fullscreen ketika mount
  animateOpen = false,

  children,
}) {
  // =========================================================
  // REFS
  // =========================================================

  const modalRef = useRef(null);

  // =========================================================
  // MAXIMIZE STATE
  // =========================================================

const [isMaximized, setIsMaximized] = useState(
  () => startMaximized
);

  // =========================================================
  // SAVE NORMAL WINDOW RECT
  // =========================================================

  const [normalRect, setNormalRect] = useState(null);

  // =========================================================
  // ADDRESS STATE
  // =========================================================

  const [address, setAddress] = useState(url);

  useEffect(() => {
    setAddress(url);
  }, [url]);

  // =========================================================
  // GENERIC SLIDE NAVIGATION
  // =========================================================

  const hasSlideNavigation =
    Boolean(slideNavigation);

  const currentPage =
    slideNavigation?.currentPage ?? 1;

  const totalPages =
    slideNavigation?.totalPages ?? 1;

  const effectiveOnBack =
    slideNavigation?.onPrevious ??
    onBack;

  const effectiveOnForward =
    slideNavigation?.onNext ??
    onForward;

  const effectiveCanGoBack =
    hasSlideNavigation
      ? (
          slideNavigation?.canGoPrevious ??
          currentPage > 1
        )
      : canGoBack;

  const effectiveCanGoForward =
    hasSlideNavigation
      ? (
          slideNavigation?.canGoNext ??
          currentPage < totalPages
        )
      : canGoForward;

  // =========================================================
  // WINDOW STYLE
  // =========================================================

  const getNormalWindowStyle = useCallback(() => {
    // =======================================================
    // MOBILE
    // =======================================================

    if (isMobile) {
      return {
        position: 'fixed',

        top: 0,
        left: 0,
        right: 0,
        bottom: '28px',

        width: '100vw',
        height: 'auto',

        maxWidth: '100vw',
        maxHeight: 'calc(100vh - 28px)',

        minWidth: 0,
        minHeight: 0,

        transform: 'none',
        margin: 0,

        boxSizing: 'border-box',

        overflow: 'hidden',
      };
    }

    // =======================================================
    // TABLET
    // =======================================================

    if (isTablet) {
      return {
        position: 'fixed',

        top,
        left,

        width: '70vw',
        height: '70vh',

        maxWidth: '90vw',
        maxHeight: 'calc(100vh - 40px)',

        minWidth: 0,
        minHeight: 0,

        transform,

        boxSizing: 'border-box',

        overflow: 'hidden',
      };
    }

    // =======================================================
    // DESKTOP
    // =======================================================

    return {
      position: 'fixed',

      top,
      left,

      width,
      height,

      maxWidth: 'calc(100vw - 20px)',
      maxHeight: 'calc(100vh - 50px)',

      minWidth: 0,
      minHeight: 0,

      transform,

      boxSizing: 'border-box',

      overflow: 'hidden',
    };
  }, [
    isMobile,
    isTablet,
    top,
    left,
    width,
    height,
    transform,
  ]);

  // =========================================================
  // MAXIMIZED STYLE
  // =========================================================

  const getMaximizedWindowStyle = () => {
    return {
      position: 'fixed',

      /*
       * LOCK KE VIEWPORT
       *
       * top    = 0
       * right  = 0
       * bottom = 28px  -> taskbar
       * left   = 0
       */
      top: 0,
      right: 0,
      bottom: '28px',
      left: 0,

      width: 'auto',
      height: 'auto',

      maxWidth: 'none',
      maxHeight: 'none',

      minWidth: 0,
      minHeight: 0,

      transform: 'none',

      margin: 0,

      boxSizing: 'border-box',

      overflow: 'hidden',
    };
  };

  // =========================================================
  // FINAL WINDOW STYLE
  // =========================================================

const baseWindowStyle = isMaximized
  ? getMaximizedWindowStyle()
  : getNormalWindowStyle();

const windowStyle = {
  ...baseWindowStyle,

  ...(animateOpen
    ? {
        animation:
          'project-window-open-fullscreen 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformOrigin: '50% 50%',
        willChange: 'transform, opacity',
      }
    : {}),
};
  // =========================================================
  // MAXIMIZE / RESTORE
  // =========================================================
const toggleMaximize = () => {
  if (isMobile) {
    return;
  }

    const element = modalRef.current;

    // =======================================================
    // MAXIMIZE
    // =======================================================

    if (!isMaximized) {
      if (element) {
        const rect = element.getBoundingClientRect();

        setNormalRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }

      setIsMaximized(true);

      return;
    }

    // =======================================================
    // RESTORE
    // =======================================================

    setIsMaximized(false);
  };


  // =========================================================
// LOCK DRAG WHEN WINDOW IS FORCED MAXIMIZED
// =========================================================

const preventLockedWindowDrag = (event) => {
  // Window normal tetap boleh digeser.
  // Posisi hanya dikunci saat mode maximize aktif.
  if (!lockMaximized || !isMaximized) {
    return;
  }

  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const titleBar = target.closest('.draggable');

  if (!titleBar) {
    return;
  }

  // Tombol titlebar tetap boleh dipakai
  if (target.closest('button')) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
};

  // =========================================================
  // ADDRESS SUBMIT
  // =========================================================

  const handleAddressSubmit = (event) => {
    event.preventDefault();

    const value = address.trim();

    if (!value) {
      return;
    }

    let target = value;

    if (
      !target.startsWith('http://') &&
      !target.startsWith('https://')
    ) {
      target = `https://${target}`;
    }

    setAddress(target);
  };

  // =========================================================
  // MENU ITEM STYLE
  // =========================================================

  const menuItemStyle = {
    display: 'inline-flex',

    alignItems: 'center',

    height: '18px',

    padding: '1px 6px',

    boxSizing: 'border-box',

    whiteSpace: 'nowrap',

    fontFamily: 'MS Sans Serif, sans-serif',

    fontSize: '11px',

    lineHeight: '12px',

    color: '#000000',

    userSelect: 'none',

    cursor: 'default',
  };
// =========================================================
// TOOLBAR
// =========================================================
const ToolbarButton = ({
  label,
  icon: Icon,
  width = 64,
  iconVariant,
  isMobile = false,

  disabled = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] =
    useState(false);

  const [isPressed, setIsPressed] =
    useState(false);

  const buttonWidth = isMobile
    ? '40px'
    : `${width}px`;

  const buttonHeight = isMobile
    ? '30px'
    : '38px';

  const iconSize = isMobile
    ? 16
    : 20;

  return (
    
    <Button
      type="button"
      aria-label={label}

      disabled={disabled}

      onClick={() => {
        if (
          disabled ||
          typeof onClick !== 'function'
        ) {
          return;
        }

        onClick();
      }}

      onMouseEnter={() => {
        if (disabled) {
          return;
        }

        setIsHovered(true);
      }}

      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}

      onMouseDown={() => {
        if (disabled) {
          return;
        }

        setIsPressed(true);
      }}

      onMouseUp={() => {
        if (disabled) {
          return;
        }

        setIsPressed(false);
      }}

      style={{
        width: buttonWidth,
        height: buttonHeight,

        padding: isMobile
          ? '1px'
          : '2px 3px',

        margin: 0,

        boxSizing: 'border-box',

        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'center',

        gap: isMobile
          ? 0
          : '2px',

        fontFamily:
          'MS Sans Serif, sans-serif',

        fontSize: isMobile
          ? '9px'
          : '10px',

        lineHeight: '11px',

        flexShrink: 0,

        background:
          isHovered
            ? '#c0c0c0'
            : 'transparent',

        border:
          isHovered
            ? isPressed
              ? '1px solid #808080'
              : '1px solid #ffffff'
            : '1px solid transparent',

        boxShadow:
          isHovered && !isPressed
            ? 'inset -1px -1px 0 #808080'
            : isPressed
              ? 'inset 1px 1px 0 #808080'
              : 'none',

        transform:
          isPressed
            ? 'translate(1px, 1px)'
            : 'none',
      }}
    >
      <Icon
        variant={iconVariant}
        style={{
          width: iconSize,
          height: iconSize,

          opacity: disabled
            ? 0.45
            : 1,

          filter: disabled
            ? 'grayscale(1)'
            : 'none',
        }}
      />

      {!isMobile && (
        <span
          style={{
            opacity: disabled
              ? 0.55
              : 1,
          }}
        >
          {label}
        </span>
      )}
    </Button>
  );
};

// =========================================================
// RENDER
// =========================================================

return (
  <>
    {animateOpen && (
      <style>
        {`
          @keyframes project-window-open-fullscreen {
            0% {
              transform: scale(0.55);
              opacity: 0.5;
            }

            70% {
              transform: scale(1.01);
              opacity: 1;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            @keyframes project-window-open-fullscreen {
              from {
                transform: none;
                opacity: 1;
              }

              to {
                transform: none;
                opacity: 1;
              }
            }
          }
        `}
      </style>
    )}

    <Modal
      ref={modalRef}
      icon={icon}
      title={title}

      style={windowStyle}

      onPointerDownCapture={
        preventLockedWindowDrag
      }

      titleBarOptions={
        <>
          {/* MINIMIZE */}
          <Modal.Minimize />

          {/* MAXIMIZE / RESTORE */}
          {!isMobile &&
            (isMaximized ? (
              <TitleBar.Restore
                onClick={toggleMaximize}
              />
            ) : (
              <TitleBar.Maximize
                onClick={toggleMaximize}
              />
            ))}

          {/* CLOSE */}
          <TitleBar.Close
            onClick={onClose}
          />
        </>
      }
    >
      {/* =====================================================
          WINDOW BODY
      ===================================================== */}

      <div
        style={{
          flex: '1 1 0',

          minWidth: 0,
          minHeight: 0,

          width: '100%',
          height: '100%',

          padding: 6,
          margin: 0,

          boxSizing: 'border-box',

          background: '#c0c0c0',

          display: 'flex',

          flexDirection: 'column',

          overflow: 'hidden',
        }}
      >
        {/* ===================================================
            MENU BAR
        =================================================== */}

        <header
          style={{
            flexShrink: 0,

            minWidth: 0,

            width: '100%',

            height: '22px',
            minHeight: '22px',

            boxSizing: 'border-box',

            background: '#c0c0c0',

            borderBottom: '1px solid #808080',

            display: 'flex',

            alignItems: 'center',

            gap: isMobile
              ? '2px'
              : '4px',

            padding: isMobile
              ? '2px 4px'
              : '2px 6px',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '11px',

            lineHeight: '12px',

            color: '#000000',

            userSelect: 'none',

            overflow: 'hidden',
          }}
        >
          <span style={menuItemStyle}>
            <u>F</u>ile
          </span>

          <span style={menuItemStyle}>
            <u>E</u>dit
          </span>

          <span style={menuItemStyle}>
            <u>V</u>iew
          </span>

          {!isMobile && (
            <span style={menuItemStyle}>
              Favorites
            </span>
          )}

          {!isMobile && (
            <span style={menuItemStyle}>
              <u>T</u>ools
            </span>
          )}

          <span style={menuItemStyle}>
            <u>H</u>elp
          </span>
        </header>
{/* ===================================================
    INTERNET EXPLORER TOOLBAR
=================================================== */}

<div
  style={{
    flexShrink: 0,

    minWidth: 0,

    width: '100%',

    height: isMobile
      ? '30px'
      : '42px',

    minHeight: isMobile
      ? '30px'
      : '42px',

    boxSizing: 'border-box',

    background: '#c0c0c0',

    borderBottom:
      '1px solid #808080',

    display: 'flex',

    alignItems: 'center',

    gap: isMobile
      ? '2px'
      : '3px',

    padding: isMobile
      ? '2px 3px'
      : '2px 5px',

    overflow: 'hidden',
  }}
>
  {/* =================================================
      NAVIGATION
  ================================================= */}

  <ToolbarButton
    label="Back"
    icon={Progman44}
    width={64}
    isMobile={isMobile}

    onClick={effectiveOnBack}
    disabled={
      typeof effectiveOnBack === 'function'
        ? !effectiveCanGoBack
        : false
    }
  />

  <ToolbarButton
    label="Forward"
    icon={Progman45}
    width={64}
    isMobile={isMobile}

    onClick={effectiveOnForward}
    disabled={
      typeof effectiveOnForward === 'function'
        ? !effectiveCanGoForward
        : false
    }
  />

  <ToolbarButton
    label="Stop"
    icon={User4}
    iconVariant="32x32_4"
    width={64}
    isMobile={isMobile}
    disabled={hasSlideNavigation}
  />

  <ToolbarButton
    label="Refresh"
    icon={Refresh}
    iconVariant="16x16_4"
    width={64}
    isMobile={isMobile}
    disabled={hasSlideNavigation}
  />

  <ToolbarButton
    label="Home"
    icon={Ie}
    iconVariant="16x16_8"
    width={64}
    isMobile={isMobile}
    disabled={hasSlideNavigation}
  />

  {/* =================================================
      DIVIDER
  ================================================= */}

  {!isMobile && (
    <div
      style={{
        width: '1px',
        height: '30px',

        margin: '0 4px',

        flexShrink: 0,

        background: '#808080',

        borderRight:
          '1px solid #ffffff',

        boxSizing: 'border-box',
      }}
    />
  )}

  {/* =================================================
      SEARCH / FAVORITES / HISTORY / CHANNELS
  ================================================= */}

  {!isMobile && (
    <>
      <ToolbarButton
        label="Search"
        width={64}
        icon={Websrch}
        iconVariant="16x16_4"
        isMobile={isMobile}
          disabled={hasSlideNavigation}
      />

      <ToolbarButton
        label="Favorites"
        width={70}
        icon={Fave}
        iconVariant="16x16_4"
        isMobile={isMobile}
          disabled={hasSlideNavigation}
      />

      <ToolbarButton
        label="History"
         icon={Time}
        iconVariant="16x16_4"
        width={64}
        isMobile={isMobile}
          disabled={hasSlideNavigation}
      />

      <ToolbarButton
        label="Channels"
        icon={Globe}
        iconVariant="16x16_4"
        width={68}
        isMobile={isMobile}
          disabled={hasSlideNavigation}
      />
    </>
  )}

  {/* =================================================
      DIVIDER
  ================================================= */}

  {!isMobile && (
    <div
      style={{
        width: '1px',
        height: '30px',

        margin: '0 4px',

        flexShrink: 0,

        background: '#808080',

        borderRight:
          '1px solid #ffffff',

        boxSizing: 'border-box',
      }}
    />
  )}

  {/* =================================================
      FULL SCREEN / MAIL
  ================================================= */}

  {!isMobile && (
    <>

      <ToolbarButton
        label="Mail"
        icon={Mailnews12}
        iconVariant="16x16_4"
        width={64}
        isMobile={isMobile}
          disabled={hasSlideNavigation}
      />

      <ToolbarButton
        label="Print"
        icon={Nwnp32PrinterIcon}
        iconVariant="16x16_4"
        width={72}
        isMobile={isMobile}
          disabled={hasSlideNavigation}
      />

    </>
  )}



  {/* =================================================
      EMPTY SPACE
  ================================================= */}

  <div
    style={{
      flex: '1 1 0',
      minWidth: 0,
    }}
  />
</div>


        {/* ===================================================
            ADDRESS BAR
        =================================================== */}

        <header
          style={{
            flexShrink: 0,

            minWidth: 0,

            width: '100%',

            height: isMobile
              ? '28px'
              : '29px',

            minHeight: isMobile
              ? '28px'
              : '29px',

            boxSizing: 'border-box',

            background: '#c0c0c0',

            borderBottom:
              '1px solid #808080',

            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            padding: isMobile
              ? '3px 4px'
              : '3px 6px',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '11px',

            color: '#000000',
          }}
        >
          {/* ADDRESS LABEL */}

          <span
            style={{
              flexShrink: 0,

              whiteSpace: 'nowrap',

              fontFamily:
                'MS Sans Serif, sans-serif',

              fontSize: '11px',

              lineHeight: '16px',

              color: '#000000',
            }}
          >
            Address
          </span>

          {/* ADDRESS FORM */}

          <form
            onSubmit={handleAddressSubmit}
            style={{
              display: 'flex',

              flex: '1 1 0',

              minWidth: 0,

              height: '20px',

              margin: 0,
              padding: 0,

              boxSizing: 'border-box',
            }}
          >
            <input
              type="text"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
              aria-label="Address"
              spellCheck={false}
              style={{
                width: '100%',

                minWidth: 0,

                height: '20px',

                padding: '1px 4px',

                margin: 0,

                border:
                  '1px solid #808080',

                borderRadius: 0,

                outline: 'none',

                boxSizing: 'border-box',

                backgroundColor: '#ffffff',

                color: '#000000',

                fontFamily:
                  'MS Sans Serif, sans-serif',

                fontSize: '11px',

                lineHeight: '16px',

                caretColor: '#000000',

                boxShadow:
                  'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff',
              }}
            />
          </form>
        </header>

        {/* ===================================================
            BROWSER CONTENT FRAME
        =================================================== */}

        <div
          aria-label="Browser content frame"
          style={{
            flex: '1 1 0',

            minWidth: 0,
            minHeight: 0,

            width: '100%',

            margin: 0,

            background: '#ffffff',

            boxSizing: 'border-box',

            border: '2px solid',

            borderTopColor: '#808080',

            borderLeftColor: '#808080',

            borderRightColor: '#ffffff',

            borderBottomColor: '#ffffff',

            boxShadow: `
              inset 1px 1px 0 #000000,
              inset -1px -1px 0 #dfdfdf
            `,

            display: 'flex',

            flexDirection: 'column',

            position: 'relative',

            overflow: 'hidden',
          }}
        >
          {/* =================================================
              ACTUAL SCROLLABLE CONTENT
          ================================================= */}

          <main
            className="reading-font"
            aria-label="Browser page content"
            style={{
              flex: '1 1 0',

              minWidth: 0,
              minHeight: 0,

              width: '100%',

              background: '#ffffff',

              boxSizing: 'border-box',

              overflowY: lockContent
                ? 'hidden'
                : 'auto',

              overflowX: 'hidden',

              color: '#000000',

              fontFamily:
                'MS Sans Serif, sans-serif',

              textAlign: 'left',

              touchAction: lockContent
                ? 'none'
                : 'pan-y',

              WebkitOverflowScrolling:
                'touch',

              scrollbarWidth: 'auto',
            }}
          >
            {children}
          </main>

 {/* =================================================
    OPTIONAL SLIDE NAVIGATION OVERLAY
    Modern controls that belong to the content,
    not to the Windows 95 shell.
================================================= */}

{hasSlideNavigation && (
  <>
    {/* PREVIOUS */}

    {effectiveCanGoBack && (
      <button
        type="button"
        aria-label="Previous slide"
        onClick={effectiveOnBack}
 style={{
  position: 'absolute',

  left: isMobile
    ? '10px'
    : '18px',

  top: '50%',

  transform:
    'translateY(-50%)',

  width: isMobile
    ? '32px'
    : '40px',

  height: isMobile
    ? '40px'
    : '48px',

  padding: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // NO BUTTON SHAPE
  border: 'none',
  outline: 'none',
  background: 'transparent',
  boxShadow: 'none',

  color: '#000000',

  fontFamily:
    'Arial, sans-serif',

  fontSize: isMobile
    ? '32px'
    : '40px',

  fontWeight: 300,

  lineHeight: 1,

  cursor: 'pointer',

  zIndex: 20,

  userSelect: 'none',

  WebkitTapHighlightColor:
    'transparent',
}}
      >
        ‹
      </button>
    )}

    {/* NEXT */}

    {effectiveCanGoForward && (
      <button
        type="button"
        aria-label="Next slide"
        onClick={effectiveOnForward}
style={{
  position: 'absolute',

  right: isMobile
    ? '10px'
    : '18px',

  top: '50%',

  transform:
    'translateY(-50%)',

  width: isMobile
    ? '32px'
    : '40px',

  height: isMobile
    ? '40px'
    : '48px',

  padding: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // NO BUTTON SHAPE
  border: 'none',
  outline: 'none',
  background: 'transparent',
  boxShadow: 'none',

  color: '#000000',

  fontFamily:
    'Arial, sans-serif',

  fontSize: isMobile
    ? '32px'
    : '40px',

  fontWeight: 300,

  lineHeight: 1,

  cursor: 'pointer',

  zIndex: 20,

  userSelect: 'none',

  WebkitTapHighlightColor:
    'transparent',
}}
      >
        ›
      </button>
    )}

    {/* PAGE COUNTER */}

    <div
      aria-label={`Slide ${currentPage} of ${totalPages}`}
      style={{
        position: 'absolute',

        left: '50%',

        bottom: isMobile
          ? '10px'
          : '16px',

        transform:
          'translateX(-50%)',

        minWidth: isMobile
          ? '52px'
          : '60px',

        height: isMobile
          ? '24px'
          : '28px',

        padding: isMobile
          ? '0 9px'
          : '0 11px',

        boxSizing:
          'border-box',

        display: 'flex',

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: '999px',

        background:
          'rgba(0, 0, 0, 0.55)',

        color: '#ffffff',

        fontFamily:
          'Arial, sans-serif',

        fontSize: isMobile
          ? '11px'
          : '12px',

        fontWeight: 500,

        letterSpacing:
          '0.2px',

        lineHeight: 1,

        whiteSpace: 'nowrap',

        userSelect: 'none',

        pointerEvents: 'none',

        zIndex: 20,

        backdropFilter:
          'blur(4px)',

        WebkitBackdropFilter:
          'blur(4px)',


      }}
    >
      {currentPage}
      {' / '}
      {totalPages}
    </div>
  </>
)}
        </div>
      </div>
    </Modal>
  </>
);
}
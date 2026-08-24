import React, {
  useCallback,
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
  ArrowLeft,
  ArrowRight,
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

  // =========================================================
  // BROWSER
  // =========================================================

  url = 'https://www.perdanakun.com/',
  statusText = 'Done',

  // =========================================================
  // NORMAL WINDOW
  // =========================================================

  width = '60%',
  height = '70%',

  top = '50%',
  left = '50%',

  transform = 'translate(-50%, -50%)',

  children,
}) {
  // =========================================================
  // REFS
  // =========================================================

  const modalRef = useRef(null);

  // =========================================================
  // MAXIMIZE STATE
  // =========================================================

  const [isMaximized, setIsMaximized] = useState(false);

  // =========================================================
  // SAVE NORMAL WINDOW RECT
  // =========================================================

  const [normalRect, setNormalRect] = useState(null);

  // =========================================================
  // ADDRESS STATE
  // =========================================================

  const [address, setAddress] = useState(url);

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

  const windowStyle = isMaximized
    ? getMaximizedWindowStyle()
    : getNormalWindowStyle();

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

      onMouseEnter={() => {
        setIsHovered(true);
      }}

      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}

      onMouseDown={() => {
        setIsPressed(true);
      }}

      onMouseUp={() => {
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
        }}
      />

      {!isMobile && (
        <span>
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
    <Modal
      ref={modalRef}
      icon={icon}
      title={title}

      /*
       * INI YANG MENGONTROL POSISI WINDOW
       */
      style={windowStyle}

      titleBarOptions={
        <>
          {/* =================================================
              MINIMIZE
          ================================================= */}

          <Modal.Minimize />

          {/* =================================================
              MAXIMIZE / RESTORE
          ================================================= */}

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

          {/* =================================================
              CLOSE
          ================================================= */}

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
  />

  <ToolbarButton
    label="Forward"
    icon={Progman45}
    width={64}
    isMobile={isMobile}
  />

  <ToolbarButton
    label="Stop"
    icon={User4}
    iconVariant="32x32_4"
    width={64}
    isMobile={isMobile}
  />

  <ToolbarButton
    label="Refresh"
    icon={Refresh}
    iconVariant="16x16_4"
    width={64}
    isMobile={isMobile}
  />

  <ToolbarButton
    label="Home"
    icon={Ie}
    iconVariant="16x16_8"
    width={64}
    isMobile={isMobile}
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
      />

      <ToolbarButton
        label="Favorites"
        width={70}
        icon={Fave}
        iconVariant="16x16_4"
        isMobile={isMobile}
      />

      <ToolbarButton
        label="History"
         icon={Time}
        iconVariant="16x16_4"
        width={64}
        isMobile={isMobile}
      />

      <ToolbarButton
        label="Channels"
        icon={Globe}
        iconVariant="16x16_4"
        width={68}
        isMobile={isMobile}
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
      />

      <ToolbarButton
        label="Print"
        icon={Nwnp32PrinterIcon}
        iconVariant="16x16_4"
        width={72}
        isMobile={isMobile}
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

              overflowY: 'auto',

              overflowX: 'hidden',

              color: '#000000',

              fontFamily:
                'MS Sans Serif, sans-serif',

              textAlign: 'left',

              touchAction: 'pan-y',

              WebkitOverflowScrolling:
                'touch',

              scrollbarWidth: 'auto',
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </Modal>
  );
}
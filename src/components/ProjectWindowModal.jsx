import React, {
  useCallback,
  useRef,
  useState,
} from 'react';

import {
  Modal,
  TitleBar,
} from '@react95/core';

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
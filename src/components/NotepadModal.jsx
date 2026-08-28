import React, {
  useCallback,
  useRef,
  useState,
} from 'react';

import {
  Modal,
  TitleBar,
} from '@react95/core';

/* =========================================================
   NOTEPAD WINDOW MODAL
========================================================= */

export default function NotepadWindowModal({
  title = 'Untitled - Notepad',
  icon = null,

  isMobile = false,
  isTablet = false,

  onClose,

  /* =======================================================
     WINDOW SIZE
  ======================================================= */

  width = '60%',
  height = '70%',

  top = '50%',
  left = '50%',

  transform = 'translate(-50%, -50%)',

  /* =======================================================
     CONTENT
  ======================================================= */

  children,

  contentClassName = '',

  contentStyle = {},

  padding = '8px',

  wordWrap = true,
}) {
  /* =========================================================
     REFS
  ========================================================= */

  const modalRef = useRef(null);

  /* =========================================================
     MAXIMIZE STATE
  ========================================================= */

  const [isMaximized, setIsMaximized] =
    useState(false);

  /* =========================================================
     NORMAL WINDOW STYLE
  ========================================================= */

  const getNormalWindowStyle = useCallback(() => {
    /* =======================================================
       MOBILE
    ======================================================= */

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

    /* =======================================================
       TABLET
    ======================================================= */

    if (isTablet) {
      return {
        position: 'fixed',

        top,
        left,

        width: '75vw',
        height: '72vh',

        maxWidth: '92vw',
        maxHeight: 'calc(100vh - 40px)',

        minWidth: 0,
        minHeight: 0,

        transform,

        boxSizing: 'border-box',

        overflow: 'hidden',
      };
    }

    /* =======================================================
       DESKTOP
    ======================================================= */

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

  /* =========================================================
     MAXIMIZED WINDOW STYLE
  ========================================================= */

  const getMaximizedWindowStyle = () => {
    return {
      position: 'fixed',

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

  /* =========================================================
     FINAL WINDOW STYLE
  ========================================================= */

  const windowStyle = isMaximized
    ? getMaximizedWindowStyle()
    : getNormalWindowStyle();

  /* =========================================================
     MAXIMIZE / RESTORE
  ========================================================= */

  const toggleMaximize = () => {
    if (isMobile) {
      return;
    }

    setIsMaximized((current) => !current);
  };

  /* =========================================================
     MENU ITEM STYLE
  ========================================================= */

  const menuItemStyle = {
    display: 'inline-flex',

    alignItems: 'center',

    height: '18px',

    padding: '1px 6px',

    boxSizing: 'border-box',

    whiteSpace: 'nowrap',

    fontFamily:
      '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',

    fontSize: '11px',

    lineHeight: '12px',

    color: '#000000',

    userSelect: 'none',

    cursor: 'default',
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <Modal
      ref={modalRef}
      icon={icon}
      title={title}
      style={windowStyle}
      titleBarOptions={
        <>
          {/* ===============================================
              MINIMIZE
          =============================================== */}

          <Modal.Minimize />

          {/* ===============================================
              MAXIMIZE / RESTORE
          =============================================== */}

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

          {/* ===============================================
              CLOSE
          =============================================== */}

          <TitleBar.Close
            onClick={onClose}
          />
        </>
      }
    >
      {/* =====================================================
          NOTEPAD BODY
      ===================================================== */}

      <div
        style={{
          flex: '1 1 0',

          minWidth: 0,
          minHeight: 0,

          width: '100%',
          height: '100%',

          margin: 0,
          padding: 0,

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

            display: 'flex',

            alignItems: 'center',

            padding: isMobile
              ? '2px 2px'
              : '2px 4px',

            fontFamily:
              '"MS Sans Serif", "Microsoft Sans Serif", sans-serif',

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
            <u>S</u>earch
          </span>

          <span style={menuItemStyle}>
            <u>H</u>elp
          </span>
        </header>

        {/* ===================================================
            NOTEPAD CONTENT FRAME
        =================================================== */}

        <div
          aria-label="Notepad document"
          style={{
            flex: '1 1 0',

            minWidth: 0,
            minHeight: 0,

            width: '100%',

            margin: 0,

            background: '#ffffff',

            boxSizing: 'border-box',

            /*
             * Windows 95 inset border
             */

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

              IMPORTANT:
              children means this can receive:

              - JSX
              - React components
              - rendered Markdown
              - plain text
          ================================================= */}

          <main
            className={contentClassName}
            style={{
              flex: '1 1 0',

              minWidth: 0,
              minHeight: 0,

              width: '100%',

              padding,

              margin: 0,

              boxSizing: 'border-box',

              background: '#ffffff',

              color: '#000000',

              /*
               * Classic Notepad-ish text appearance.
               *
               * Change this later if you want your case-study
               * reading font instead.
               */

              fontFamily:
                '"Courier New", monospace',

              fontSize: isMobile
                ? '12px'
                : '13px',

              lineHeight: '1.45',

              textAlign: 'left',

              whiteSpace: wordWrap
                ? 'pre-wrap'
                : 'pre',

              overflowY: 'auto',

              overflowX: wordWrap
                ? 'hidden'
                : 'auto',

              overflowWrap: wordWrap
                ? 'break-word'
                : 'normal',

              touchAction: 'pan-y',

              WebkitOverflowScrolling:
                'touch',

              scrollbarWidth: 'auto',

              ...contentStyle,
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </Modal>
  );
}
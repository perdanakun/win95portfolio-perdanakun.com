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
  ArrowLeft,
  ArrowRight,
  Refresh,
  User4,
  Websrch,
  Fave,
  Time,
  Globe,
  Mailnews12,
  Nwnp32PrinterIcon,
  Ie,
  Progman44,
  Progman45,
} from '@react95/icons';


// =========================================================
// DEFAULT CONFIG
// =========================================================

const GOOGLE_URL = 'https://www.google.com/';

const DEFAULT_HISTORY = [
  GOOGLE_URL,
];


// =========================================================
// URL NORMALIZER
// =========================================================

const normalizeUrl = (value) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return GOOGLE_URL;
  }

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
};


// =========================================================
// TOOLBAR BUTTON
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

      onClick={onClick}

      onMouseEnter={() => {
        if (!disabled) {
          setIsHovered(true);
        }
      }}

      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}

      onMouseDown={() => {
        if (!disabled) {
          setIsPressed(true);
        }
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
          disabled
            ? 'transparent'
            : isHovered
              ? '#c0c0c0'
              : 'transparent',

        border:
          disabled
            ? '1px solid transparent'
            : isHovered
              ? isPressed
                ? '1px solid #808080'
                : '1px solid #ffffff'
              : '1px solid transparent',

        boxShadow:
          disabled
            ? 'none'
            : isHovered && !isPressed
              ? 'inset -1px -1px 0 #808080'
              : isPressed
                ? 'inset 1px 1px 0 #808080'
                : 'none',

        transform:
          isPressed
            ? 'translate(1px, 1px)'
            : 'none',

        opacity:
          disabled
            ? 0.45
            : 1,

        cursor:
          disabled
            ? 'default'
            : 'pointer',
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
// BROWSER WINDOW
// =========================================================

export default function BrowserWindow({
  title = 'Internet Explorer',

  icon = <Ie />,

  isMobile = false,
  isTablet = false,

  onClose,

  width = '70%',
  height = '75%',

  top = '50%',
  left = '50%',

  transform = 'translate(-50%, -50%)',
}) {

  // =======================================================
  // REFS
  // =======================================================

  const modalRef = useRef(null);

  const iframeRef = useRef(null);

  const addressInputRef = useRef(null);


  // =======================================================
  // WINDOW STATE
  // =======================================================

  const [
    isMaximized,
    setIsMaximized,
  ] = useState(false);


  // =======================================================
  // ADDRESS
  // =======================================================

  const [
    address,
    setAddress,
  ] = useState(GOOGLE_URL);


  // =======================================================
  // CURRENT URL
  // =======================================================

  const [
    currentUrl,
    setCurrentUrl,
  ] = useState(GOOGLE_URL);


  // =======================================================
  // HISTORY
  // =======================================================

  const [
    history,
    setHistory,
  ] = useState(DEFAULT_HISTORY);


  // =======================================================
  // HISTORY INDEX
  // =======================================================

  const [
    historyIndex,
    setHistoryIndex,
  ] = useState(0);


  // =======================================================
  // DROPDOWN
  // =======================================================

  const [
    showDropdown,
    setShowDropdown,
  ] = useState(false);


  // =======================================================
  // NORMAL WINDOW RECT
  // =======================================================

  const [
    normalRect,
    setNormalRect,
  ] = useState(null);


  // =======================================================
  // WINDOW STYLE
  // =======================================================

  const getNormalWindowStyle =
    useCallback(() => {

      // -----------------------------------------------------
      // MOBILE
      // -----------------------------------------------------

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
          maxHeight:
            'calc(100vh - 28px)',

          minWidth: 0,
          minHeight: 0,

          transform: 'none',

          margin: 0,

          boxSizing: 'border-box',

          overflow: 'hidden',
        };
      }


      // -----------------------------------------------------
      // TABLET
      // -----------------------------------------------------

      if (isTablet) {
        return {
          position: 'fixed',

          top,
          left,

          width: '70vw',
          height: '70vh',

          maxWidth: '90vw',
          maxHeight:
            'calc(100vh - 40px)',

          minWidth: 0,
          minHeight: 0,

          transform,

          boxSizing: 'border-box',

          overflow: 'hidden',
        };
      }


      // -----------------------------------------------------
      // DESKTOP
      // -----------------------------------------------------

      return {
        position: 'fixed',

        top,
        left,

        width,
        height,

        maxWidth:
          'calc(100vw - 20px)',

        maxHeight:
          'calc(100vh - 50px)',

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


  // =======================================================
  // MAXIMIZED STYLE
  // =======================================================

  const getMaximizedWindowStyle =
    () => ({
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
    });


  // =======================================================
  // FINAL WINDOW STYLE
  // =======================================================

  const windowStyle = isMaximized
    ? getMaximizedWindowStyle()
    : getNormalWindowStyle();


  // =======================================================
  // MAXIMIZE
  // =======================================================

  const toggleMaximize = () => {

    if (isMobile) {
      return;
    }


    const element =
      modalRef.current;


    if (!isMaximized) {

      if (element) {

        const rect =
          element.getBoundingClientRect();

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


    setIsMaximized(false);
  };


  // =======================================================
  // OPEN DIRECTLY IN BROWSER
  // =======================================================

  const openDirectly = (
    targetUrl = currentUrl,
  ) => {

    window.open(
      targetUrl,
      '_blank',
      'noopener,noreferrer',
    );
  };


  // =======================================================
  // NAVIGATE
  // =======================================================

  const navigateTo = (
    rawUrl,
    {
      addToHistory = true,
      direct = false,
    } = {},
  ) => {

    const target =
      normalizeUrl(rawUrl);


    // -----------------------------------------------------
    // UPDATE ADDRESS
    // -----------------------------------------------------

    setAddress(target);

    setCurrentUrl(target);


    // -----------------------------------------------------
    // HISTORY
    // -----------------------------------------------------

    if (addToHistory) {

      setHistory((previous) => {

        const next =
          previous.slice(
            0,
            historyIndex + 1,
          );

        if (
          next[next.length - 1] === target
        ) {
          return next;
        }

        return [
          ...next,
          target,
        ];
      });


      setHistoryIndex(
        (previous) =>
          previous + 1,
      );
    }


    // -----------------------------------------------------
    // DIRECT MODE
    // -----------------------------------------------------

    if (direct) {
      openDirectly(target);
    }
  };


  // =======================================================
  // ADDRESS SUBMIT
  // =======================================================

  const handleAddressSubmit = (
    event,
  ) => {

    event.preventDefault();

    const value =
      address.trim();


    if (!value) {
      return;
    }


    navigateTo(value);

    setShowDropdown(false);
  };


  // =======================================================
  // BACK
  // =======================================================

  const goBack = () => {

    if (historyIndex <= 0) {
      return;
    }


    const nextIndex =
      historyIndex - 1;

    const target =
      history[nextIndex];


    setHistoryIndex(
      nextIndex,
    );

    setCurrentUrl(target);
    setAddress(target);
  };


  // =======================================================
  // FORWARD
  // =======================================================

  const goForward = () => {

    if (
      historyIndex >=
      history.length - 1
    ) {
      return;
    }


    const nextIndex =
      historyIndex + 1;

    const target =
      history[nextIndex];


    setHistoryIndex(
      nextIndex,
    );

    setCurrentUrl(target);
    setAddress(target);
  };


  // =======================================================
  // REFRESH
  // =======================================================

  const refreshPage = () => {

    if (
      iframeRef.current
    ) {

      try {

        iframeRef.current.contentWindow
          .location
          .reload();

      } catch (error) {

        setCurrentUrl(
          `${currentUrl}`,
        );
      }

      return;
    }


    setCurrentUrl(
      `${currentUrl}`,
    );
  };


  // =======================================================
  // HOME
  // =======================================================

  const goHome = () => {

    navigateTo(
      GOOGLE_URL,
    );
  };


  // =======================================================
  // SEARCH
  // =======================================================

  const searchGoogle = () => {

    const query =
      window.prompt(
        'Search Google:',
      );


    if (!query) {
      return;
    }


    const searchUrl =
      `https://www.google.com/search?q=${encodeURIComponent(
        query,
      )}`;


    navigateTo(
      searchUrl,
    );
  };


  // =======================================================
  // DROPDOWN SELECT
  // =======================================================

  const selectHistoryItem = (
    item,
  ) => {

    navigateTo(item);

    setShowDropdown(false);
  };


  // =======================================================
  // ESCAPE DROPDOWN
  // =======================================================

  useEffect(() => {

    const handleKeyDown = (
      event,
    ) => {

      if (
        event.key === 'Escape'
      ) {
        setShowDropdown(false);
      }
    };


    window.addEventListener(
      'keydown',
      handleKeyDown,
    );


    return () => {

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );

    };

  }, []);


  // =======================================================
  // MENU ITEM
  // =======================================================

  const menuItemStyle = {
    display: 'inline-flex',

    alignItems: 'center',

    height: '18px',

    padding: '1px 6px',

    boxSizing: 'border-box',

    whiteSpace: 'nowrap',

    fontFamily:
      'MS Sans Serif, sans-serif',

    fontSize: '11px',

    lineHeight: '12px',

    color: '#000000',

    userSelect: 'none',

    cursor: 'default',
  };


  // =======================================================
  // RENDER
  // =======================================================

  return (
    
    <Modal
      ref={modalRef}

      icon={icon}

      title={title}

      style={windowStyle}

      titleBarOptions={
        <>
          <Modal.Minimize />

          {!isMobile && (
            isMaximized ? (
              <TitleBar.Restore
                onClick={
                  toggleMaximize
                }
              />
            ) : (
              <TitleBar.Maximize
                onClick={
                  toggleMaximize
                }
              />
            )
          )}

          <TitleBar.Close
            onClick={onClose}
          />
        </>
      }
    >

      {/* =================================================
          WINDOW BODY
      ================================================= */}

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

        {/* ===============================================
            MENU BAR
        =============================================== */}

        <header
          style={{
            flexShrink: 0,

            width: '100%',
            height: '22px',

            minHeight: '22px',

            boxSizing: 'border-box',

            background: '#c0c0c0',

            borderBottom:
              '1px solid #808080',

            display: 'flex',

            alignItems: 'center',

            gap: '4px',

            padding:
              '2px 6px',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '11px',

            lineHeight: '12px',

            color: '#000000',

            userSelect: 'none',

            overflow: 'hidden',
          }}
        >

          <span
            style={menuItemStyle}
          >
            <u>F</u>ile
          </span>

          <span
            style={menuItemStyle}
          >
            <u>E</u>dit
          </span>

          <span
            style={menuItemStyle}
          >
            <u>V</u>iew
          </span>

          {!isMobile && (
            <span
              style={menuItemStyle}
            >
              Favorites
            </span>
          )}

          {!isMobile && (
            <span
              style={menuItemStyle}
            >
              <u>T</u>ools
            </span>
          )}

          <span
            style={menuItemStyle}
          >
            <u>H</u>elp
          </span>

        </header>


        {/* ===============================================
            TOOLBAR
        =============================================== */}

        <div
          style={{
            flexShrink: 0,

            width: '100%',

            height:
              isMobile
                ? '30px'
                : '42px',

            minHeight:
              isMobile
                ? '30px'
                : '42px',

            boxSizing:
              'border-box',

            background: '#c0c0c0',

            borderBottom:
              '1px solid #808080',

            display: 'flex',

            alignItems: 'center',

            gap:
              isMobile
                ? '2px'
                : '3px',

            padding:
              isMobile
                ? '2px 3px'
                : '2px 5px',

            overflow: 'hidden',
          }}
        >

          {/* BACK */}

          <ToolbarButton
            label="Back"
            icon={Progman44}
            width={64}
            isMobile={isMobile}
            disabled={
              historyIndex <= 0
            }
            onClick={goBack}
          />


          {/* FORWARD */}

          <ToolbarButton
            label="Forward"
            icon={Progman45}
            width={64}
            isMobile={isMobile}
            disabled={
              historyIndex >=
              history.length - 1
            }
            onClick={goForward}
          />


          {/* STOP */}

          <ToolbarButton
            label="Stop"
            icon={User4}
            iconVariant="32x32_4"
            width={64}
            isMobile={isMobile}
          />


          {/* REFRESH */}

          <ToolbarButton
            label="Refresh"
            icon={Refresh}
            iconVariant="16x16_4"
            width={64}
            isMobile={isMobile}
            onClick={refreshPage}
          />


          {/* HOME */}

          <ToolbarButton
            label="Home"
            icon={Ie}
            iconVariant="16x16_8"
            width={64}
            isMobile={isMobile}
            onClick={goHome}
          />


          {!isMobile && (
            <>
              {/* DIVIDER */}

              <div
                style={{
                  width: '1px',
                  height: '30px',

                  margin:
                    '0 4px',

                  flexShrink: 0,

                  background:
                    '#808080',

                  borderRight:
                    '1px solid #ffffff',
                }}
              />


              {/* SEARCH */}

              <ToolbarButton
                label="Search"
                width={64}
                icon={Websrch}
                iconVariant="16x16_4"
                onClick={
                  searchGoogle
                }
              />


              {/* FAVORITES */}

              <ToolbarButton
                label="Favorites"
                width={70}
                icon={Fave}
                iconVariant="16x16_4"
              />


              {/* HISTORY */}

              <ToolbarButton
                label="History"
                icon={Time}
                iconVariant="16x16_4"
                width={64}
                onClick={() => {
                  setShowDropdown(
                    (previous) =>
                      !previous,
                  );
                }}
              />


              {/* CHANNELS */}

              <ToolbarButton
                label="Channels"
                icon={Globe}
                iconVariant="16x16_4"
                width={68}
              />


              {/* DIVIDER */}

              <div
                style={{
                  width: '1px',
                  height: '30px',

                  margin:
                    '0 4px',

                  flexShrink: 0,

                  background:
                    '#808080',

                  borderRight:
                    '1px solid #ffffff',
                }}
              />


              {/* MAIL */}

              <ToolbarButton
                label="Mail"
                icon={Mailnews12}
                iconVariant="16x16_4"
                width={64}
              />


              {/* PRINT */}

              <ToolbarButton
                label="Print"
                icon={
                  Nwnp32PrinterIcon
                }
                iconVariant="16x16_4"
                width={72}
              />
            </>
          )}


          <div
            style={{
              flex: '1 1 0',
              minWidth: 0,
            }}
          />

        </div>


        {/* ===============================================
            ADDRESS BAR
        =============================================== */}

        <header
          style={{
            position: 'relative',

            flexShrink: 0,

            width: '100%',

            height:
              isMobile
                ? '28px'
                : '29px',

            minHeight:
              isMobile
                ? '28px'
                : '29px',

            boxSizing:
              'border-box',

            background:
              '#c0c0c0',

            borderBottom:
              '1px solid #808080',

            display: 'flex',

            alignItems: 'center',

            gap: '5px',

            padding:
              isMobile
                ? '3px 4px'
                : '3px 6px',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '11px',

            color: '#000000',
          }}
        >

          {/* LABEL */}

          <span
            style={{
              flexShrink: 0,

              whiteSpace:
                'nowrap',

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
            onSubmit={
              handleAddressSubmit
            }

            style={{
              display: 'flex',

              flex: '1 1 0',

              minWidth: 0,

              height: '20px',

              margin: 0,
              padding: 0,

              boxSizing:
                'border-box',
            }}
          >

            <input
              ref={
                addressInputRef
              }

              type="text"

              value={address}

              onFocus={() => {
                setShowDropdown(
                  true,
                );
              }}

              onChange={(
                event,
              ) => {
                setAddress(
                  event.target.value,
                );

                setShowDropdown(
                  true,
                );
              }}

              aria-label="Address"

              spellCheck={false}

              style={{
                width: '100%',

                minWidth: 0,

                height: '20px',

                padding:
                  '1px 22px 1px 4px',

                margin: 0,

                border:
                  '1px solid #808080',

                borderRadius: 0,

                outline: 'none',

                boxSizing:
                  'border-box',

                backgroundColor:
                  '#ffffff',

                color: '#000000',

                fontFamily:
                  'MS Sans Serif, sans-serif',

                fontSize: '11px',

                lineHeight: '16px',

                caretColor:
                  '#000000',

                boxShadow:
                  `
                  inset 1px 1px 0 #000000,
                  inset -1px -1px 0 #ffffff
                  `,
              }}
            />

          </form>


          {/* DROPDOWN ARROW */}

          <button
            type="button"

            onClick={() => {
              setShowDropdown(
                (previous) =>
                  !previous,
              );

              addressInputRef
                .current
                ?.focus();
            }}

            style={{
              position:
                'absolute',

              right:
                isMobile
                  ? '5px'
                  : '7px',

              top: '5px',

              width: '16px',
              height: '18px',

              padding: 0,

              border:
                '1px solid #808080',

              background:
                '#c0c0c0',

              boxShadow:
                `
                inset 1px 1px 0 #ffffff,
                inset -1px -1px 0 #808080
                `,

              fontFamily:
                'Arial, sans-serif',

              fontSize: '9px',

              lineHeight: '12px',

              cursor: 'pointer',

              display: 'flex',

              alignItems:
                'center',

              justifyContent:
                'center',
            }}
          >
            ▼
          </button>


          {/* =============================================
              ADDRESS DROPDOWN
          ============================================= */}

          {showDropdown && (
            <div
              style={{
                position:
                  'absolute',

                zIndex: 9999,

                top:
                  isMobile
                    ? '27px'
                    : '28px',

                left:
                  isMobile
                    ? '42px'
                    : '57px',

                right:
                  isMobile
                    ? '4px'
                    : '7px',

                maxHeight:
                  '180px',

                overflowY:
                  'auto',

                background:
                  '#ffffff',

                border:
                  '1px solid #000000',

                boxShadow:
                  '2px 2px 0 #808080',

                fontFamily:
                  'MS Sans Serif, sans-serif',

                fontSize: '11px',
              }}
            >

              {history.length === 0 ? (

                <div
                  style={{
                    padding:
                      '5px 6px',

                    color:
                      '#808080',
                  }}
                >
                  No history
                </div>

              ) : (

                [...history]
                  .reverse()
                  .map(
                    (
                      item,
                      index,
                    ) => (

                      <button
                        key={`${item}-${index}`}

                        type="button"

                        onMouseDown={(
                          event,
                        ) => {
                          event.preventDefault();
                        }}

                        onClick={() => {
                          selectHistoryItem(
                            item,
                          );
                        }}

                        style={{
                          display:
                            'block',

                          width:
                            '100%',

                          padding:
                            '4px 6px',

                          margin: 0,

                          border: 0,

                          borderBottom:
                            '1px solid #dfdfdf',

                          background:
                            '#ffffff',

                          color:
                            '#000000',

                          textAlign:
                            'left',

                          fontFamily:
                            'MS Sans Serif, sans-serif',

                          fontSize:
                            '11px',

                          whiteSpace:
                            'nowrap',

                          overflow:
                            'hidden',

                          textOverflow:
                            'ellipsis',

                          cursor:
                            'pointer',
                        }}
                      >
                        {item}
                      </button>
                    ),
                  )
              )}

            </div>
          )}

        </header>


        {/* ===============================================
            BROWSER CONTENT
        =============================================== */}

        <div
          aria-label={
            'Browser content frame'
          }

          style={{
            flex:
              '1 1 0',

            minWidth: 0,
            minHeight: 0,

            width: '100%',

            margin: 0,

            background:
              '#ffffff',

            boxSizing:
              'border-box',

            border:
              '2px solid',

            borderTopColor:
              '#808080',

            borderLeftColor:
              '#808080',

            borderRightColor:
              '#ffffff',

            borderBottomColor:
              '#ffffff',

            boxShadow:
              `
              inset 1px 1px 0 #000000,
              inset -1px -1px 0 #dfdfdf
              `,

            display: 'flex',

            flexDirection:
              'column',

            overflow:
              'hidden',
          }}
        >

          {/* =============================================
              IFRAME
          ============================================= */}

          <iframe
            ref={
              iframeRef
            }

            key={
              currentUrl
            }

            title="Internet Explorer"

            src={
              currentUrl
            }

            style={{
              width: '100%',

              height: '100%',

              flex:
                '1 1 0',

              minWidth: 0,
              minHeight: 0,

              border: 0,

              display: 'block',

              background:
                '#ffffff',
            }}

            onLoad={() => {
              /*
               * Untuk website yang mengizinkan iframe,
               * kita bisa mengetahui bahwa page sudah load.
               */

              setAddress(
                currentUrl,
              );
            }}
          />

        </div>


        {/* ===============================================
            STATUS BAR
        =============================================== */}

        <div
          style={{
            flexShrink: 0,

            height:
              isMobile
                ? '18px'
                : '20px',

            minHeight:
              isMobile
                ? '18px'
                : '20px',

            marginTop: '3px',

            boxSizing:
              'border-box',

            background:
              '#c0c0c0',

            borderTop:
              '1px solid #808080',

            display: 'flex',

            alignItems:
              'center',

            padding:
              '1px 5px',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '10px',

            color:
              '#000000',

            whiteSpace:
              'nowrap',

            overflow:
              'hidden',

            textOverflow:
              'ellipsis',
          }}
        >

          <span>
            {currentUrl}
          </span>

        </div>

      </div>

    </Modal>
  );
}
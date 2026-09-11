import React, {
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Modal,
  TitleBar,
} from '@react95/core';

import {
  Url1102,
  Progman44,
  Progman45,
  User4,
  Refresh,
  Ie,
  Websrch,
  Fave,
  Time,
} from '@react95/icons';

// =========================================================
// TOOLBAR BUTTON
// =========================================================

function ToolbarButton({
  label,
  icon: Icon,
  iconVariant,
  disabled = false,
  onClick,
}) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: '58px',
        height: '40px',

        padding: '2px 3px',
        margin: 0,

        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'center',

        gap: '2px',

        flexShrink: 0,

        fontFamily:
          'MS Sans Serif, sans-serif',

        fontSize: '10px',

        opacity: disabled
          ? 0.45
          : 1,
      }}
    >
      <Icon
        variant={iconVariant}
        style={{
          width: 20,
          height: 20,

          filter: disabled
            ? 'grayscale(1)'
            : 'none',
        }}
      />

      <span>
        {label}
      </span>
    </Button>
  );
}

// =========================================================
// CASE STUDY VIEWER
// =========================================================

export default function CaseStudyViewer({
  title = 'Case Study',

  address =
    'https://perdanakun.com',

  children,

  isMobile,
  isTablet,

  onClose,
}) {
  // =========================================================
  // SLIDE STATE FROM CONTENT
  // =========================================================

  const [
    slideState,
    setSlideState,
  ] = useState({
    current: 0,
    total: 1,
  });

  useEffect(() => {
    const handleSlideState = (
      event
    ) => {
      setSlideState(
        event.detail
      );
    };

    window.addEventListener(
      'case-study-slide-state',
      handleSlideState
    );

    return () => {
      window.removeEventListener(
        'case-study-slide-state',
        handleSlideState
      );
    };
  }, []);

  const canGoBack =
    slideState.current > 0;

  const canGoForward =
    slideState.current <
    slideState.total - 1;

  // =========================================================
  // NAVIGATION
  // =========================================================

  const goBack = () => {
    window.dispatchEvent(
      new CustomEvent(
        'case-study-prev'
      )
    );
  };

  const goForward = () => {
    window.dispatchEvent(
      new CustomEvent(
        'case-study-next'
      )
    );
  };

  // =========================================================
  // WINDOW SIZE
  // =========================================================

  const windowStyle =
    isMobile
      ? {
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

          margin: 0,

          boxSizing:
            'border-box',

          overflow: 'hidden',
        }
      : {
          position: 'fixed',

          top: '50%',
          left: '50%',

          transform:
            'translate(-50%, -50%)',

          width: isTablet
            ? '88vw'
            : '72vw',

          height: 'auto',

          maxWidth: '1280px',
          maxHeight: '92vh',

          margin: 0,

          boxSizing:
            'border-box',

          overflow: 'hidden',
        };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <Modal
      id="case-study-viewer"

      title={title}

      icon={
        <Url1102
          variant="16x16_4"
        />
      }

      style={windowStyle}

      titleBarOptions={
        <>
          <Modal.Minimize />

          <TitleBar.Close
            onClick={onClose}
          />
        </>
      }
    >
      <div
        style={{
          width: '100%',

          minWidth: 0,
          minHeight: 0,

          display: 'flex',
          flexDirection: 'column',

          background:
            '#c0c0c0',

          boxSizing:
            'border-box',

          overflow: 'hidden',
        }}
      >
        {/* ===============================================
            MENU BAR
        =============================================== */}

        <div
          style={{
            flexShrink: 0,

            height: '22px',

            display: 'flex',
            alignItems: 'center',

            gap: '4px',

            padding: '2px 6px',

            boxSizing:
              'border-box',

            borderBottom:
              '1px solid #808080',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '11px',

            userSelect: 'none',
          }}
        >
          <span>
            <u>F</u>ile
          </span>

          <span>
            <u>E</u>dit
          </span>

          <span>
            <u>V</u>iew
          </span>

          {!isMobile && (
            <>
              <span>
                Favorites
              </span>

              <span>
                <u>T</u>ools
              </span>
            </>
          )}

          <span>
            <u>H</u>elp
          </span>
        </div>

        {/* ===============================================
            TOOLBAR
        =============================================== */}

        <div
          style={{
            flexShrink: 0,

            height: isMobile
              ? '34px'
              : '44px',

            display: 'flex',
            alignItems: 'center',

            gap: '2px',

            padding: '2px 4px',

            boxSizing:
              'border-box',

            borderBottom:
              '1px solid #808080',

            overflow: 'hidden',
          }}
        >
          {/* BACK */}

          <ToolbarButton
            label="Back"
            icon={Progman44}
            disabled={
              !canGoBack
            }
            onClick={goBack}
          />

          {/* FORWARD */}

          <ToolbarButton
            label="Forward"
            icon={Progman45}
            disabled={
              !canGoForward
            }
            onClick={goForward}
          />

          {/* DUMMY */}

          {!isMobile && (
            <>
              <ToolbarButton
                label="Stop"
                icon={User4}
                iconVariant="32x32_4"
                disabled
              />

              <ToolbarButton
                label="Refresh"
                icon={Refresh}
                iconVariant="16x16_4"
                disabled
              />

              <ToolbarButton
                label="Home"
                icon={Ie}
                iconVariant="16x16_8"
                disabled
              />

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

              <ToolbarButton
                label="Search"
                icon={Websrch}
                iconVariant="16x16_4"
                disabled
              />

              <ToolbarButton
                label="Favorites"
                icon={Fave}
                iconVariant="16x16_4"
                disabled
              />

              <ToolbarButton
                label="History"
                icon={Time}
                iconVariant="16x16_4"
                disabled
              />
            </>
          )}
        </div>

        {/* ===============================================
            ADDRESS BAR
        =============================================== */}

        <div
          style={{
            flexShrink: 0,

            height: '29px',

            display: 'flex',
            alignItems: 'center',

            gap: '5px',

            padding: '3px 6px',

            boxSizing:
              'border-box',

            borderBottom:
              '1px solid #808080',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '11px',
          }}
        >
          <span
            style={{
              flexShrink: 0,
            }}
          >
            Address
          </span>

          <div
            style={{
              flex: 1,

              minWidth: 0,

              height: '20px',

              display: 'flex',
              alignItems: 'center',

              padding: '1px 5px',

              boxSizing:
                'border-box',

              background:
                '#ffffff',

              border:
                '1px solid #808080',

              boxShadow:
                'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff',

              overflow: 'hidden',

              whiteSpace:
                'nowrap',

              textOverflow:
                'ellipsis',
            }}
          >
            {address}
          </div>
        </div>

        {/* ===============================================
            16:9 CASE STUDY CONTENT
        =============================================== */}

        <div
          style={{
            width: '100%',

            aspectRatio:
              '16 / 9',

            minWidth: 0,
            minHeight: 0,

            background:
              '#ffffff',

            border: '2px solid',

            borderTopColor:
              '#808080',

            borderLeftColor:
              '#808080',

            borderRightColor:
              '#ffffff',

            borderBottomColor:
              '#ffffff',

            boxSizing:
              'border-box',

            overflow: 'hidden',

            display: 'flex',
          }}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
}
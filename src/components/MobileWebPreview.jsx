
import React, {
  useState,
} from 'react';

export default function MobileWebPreview({
  url,
  liveUrl,
  title = 'Mobile Preview',
  width = 390,
  height = 844,
}) {
  const [loading, setLoading] =
    useState(true);

  const publicUrl =
    liveUrl || url;

  const openLiveWebsite = () => {
    if (!publicUrl) return;

    window.open(
      publicUrl,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const getDisplayUrl = (
    value
  ) => {
    if (!value) return '';

    try {
      return new URL(
        value
      ).hostname;
    } catch {
      return value;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',

        display: 'flex',
        flexDirection: 'column',

        background: '#ffffff',

        boxSizing: 'border-box',

        overflow: 'hidden',
      }}
    >
      {/* =====================================
          DEVICE SECTION
      ===================================== */}
      
  {/* ===================================
      SMARTPHONE NOTICE
  =================================== */}

  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',

      gap: '6px',

      padding:
        '8px 10px 7px',

      borderBottom:
        '1px solid #808080',

      boxSizing: 'border-box',

      lineHeight: '15px',
    }}
  >
    {/* INFO ICON */}

    <div
      style={{
        width: '15px',
        height: '15px',

        minWidth: '15px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: '50%',

        background: '#000080',

        color: '#ffffff',

        fontFamily:
          'Arial, sans-serif',

        fontSize: '10px',
        fontWeight: 'bold',

        boxSizing: 'border-box',

        marginTop: '1px',
      }}
    >
      i
    </div>

    {/* NOTICE TEXT */}

    <div>
      <strong>
        Disclaimer:
      </strong>{' '}

      For the best experience,
      open the link below in your
      smartphone.
    </div>
  </div>

      <div
        style={{
          flex: 1,

          width: '100%',
          minHeight: 0,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          padding: '12px',

          boxSizing: 'border-box',

          overflow: 'hidden',
        }}
      >
        
        {/* ===================================
            PHONE FRAME

            Height follows available space.
            Width follows original aspect ratio.
        =================================== */}

        <div
          style={{
            position: 'relative',

            height: '100%',

            maxHeight: `${height}px`,

            aspectRatio:
              `${width} / ${height}`,

            maxWidth: '100%',

            background: '#111',

            border:
              '3px solid #222',

            borderRadius:
              '34px',

            padding: '9px',

            boxSizing:
              'border-box',

            boxShadow:
              '6px 6px 0 rgba(0,0,0,0.25)',

            flexShrink: 1,
          }}
        >
          {/* TOP SENSOR */}

          <div
            style={{
              position: 'absolute',

              top: '7px',
              left: '50%',

              transform:
                'translateX(-50%)',

              width: '70px',
              height: '16px',

              maxWidth: '25%',

              background: '#111',

              borderRadius:
                '0 0 10px 10px',

              zIndex: 3,

              pointerEvents: 'none',
            }}
          />

          {/* =================================
              SCREEN
          ================================= */}

          <div
            style={{
              position: 'relative',

              width: '100%',
              height: '100%',

              overflow: 'hidden',

              borderRadius:
                '26px',

              background: '#fff',

              touchAction: 'auto',

              WebkitOverflowScrolling:
                'touch',
            }}
          >
            {/* LOADING */}

            {loading && (
              <div
                style={{
                  position:
                    'absolute',

                  inset: 0,

                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',

                  zIndex: 2,

                  background:
                    '#fff',

                  fontFamily:
                    'MS Sans Serif, sans-serif',

                  fontSize:
                    '11px',

                  pointerEvents:
                    'none',
                }}
              >
                Loading {title}...
              </div>
            )}

            {/* LIVE WEBSITE */}

            <iframe
              src={url}
              title={title}

              onLoad={() =>
                setLoading(false)
              }

              style={{
                position:
                  'absolute',

                inset: 0,

                width: '100%',
                height: '100%',

                border: 0,

                display: 'block',

                background:
                  '#fff',
              }}
            />
          </div>
        </div>
      </div>
{/* =====================================
    LIVE WEB SECTION
===================================== */}

<div
  style={{
    width: '100%',

    flexShrink: 0,

    display: 'flex',
    flexDirection: 'column',

    background: '#c0c0c0',

    borderTop:
      '1px solid #808080',

    boxSizing: 'border-box',

    fontFamily:
      'MS Sans Serif, sans-serif',

    fontSize: '11px',
  }}
>
  {/* ===================================
    LIVE WEB ROW
=================================== */}

<div
  style={{
    width: '100%',

    display: 'flex',
    alignItems: 'center',

    gap: '8px',

    padding: '7px 10px',

    boxSizing: 'border-box',
  }}
>
  {/* LIVE STATUS */}

  <div
    style={{
      display: 'flex',
      alignItems: 'center',

      gap: '6px',

      flexShrink: 0,

      whiteSpace: 'nowrap',
    }}
  >
    {/* LIVE DOT */}

    <div
      style={{
        width: '8px',
        height: '8px',

        minWidth: '8px',

        borderRadius: '50%',

        background: '#00a000',

        border:
          '1px solid #006000',

        boxSizing: 'border-box',
      }}
    />

    <strong>
      Live Web
    </strong>
  </div>

  {/* URL FIELD */}

  <input
    type="text"

    value={publicUrl}

    readOnly

    onFocus={(event) => {
      event.target.select();
    }}

    aria-label="Live website URL"

    style={{
      flex: 1,

      minWidth: 0,

      height: '24px',

padding: '2px 5px',
      boxSizing: 'border-box',

      background: '#ffffff',

      color: '#000000',

      borderTop:
        '2px solid #808080',

      borderLeft:
        '2px solid #808080',

      borderRight:
        '2px solid #ffffff',

      borderBottom:
        '2px solid #ffffff',

      outline: 'none',

      fontFamily:
        'MS Sans Serif, sans-serif',

      fontSize: '11px',

      lineHeight: '16px',
    }}
  />

  {/* OPEN BUTTON */}

  <button
    type="button"

    onClick={
      openLiveWebsite
    }

    style={{
      flexShrink: 0,

      height: '28px',

      padding: '3px 10px',

      background: '#c0c0c0',

      borderTop:
        '2px solid #ffffff',

      borderLeft:
        '2px solid #ffffff',

      borderRight:
        '2px solid #404040',

      borderBottom:
        '2px solid #404040',

      boxSizing: 'border-box',

      fontFamily:
        'MS Sans Serif, sans-serif',

      fontSize: '11px',

      color: '#000',

      cursor: 'pointer',

      whiteSpace: 'nowrap',
    }}
  >
    Open Live Web
  </button>
</div>
</div>
    </div>
  );
}


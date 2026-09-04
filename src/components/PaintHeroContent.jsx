import React, { useEffect, useRef, useState } from 'react';
import { Button, Frame } from '@react95/core';
import perdanaWordart from '../assets/images/perdana-wordart.png';
import perdanaWordartTitle from '../assets/images/perdana-wordart-title.png';

import toolsSprite from '../assets/paint/tools.svg';
/**
 * PaintHeroContent
 * ----------------
 * Windows 95 Paint-inspired content.
 *
 * IMPORTANT
 * - Toolbar icons intentionally use <Folder /> as placeholders.
 * - The canvas viewport uses REAL scrolling (overflow: auto).
 * - Canvas keeps a fixed drawing size, so it does not stretch to the window.
 * - Uses React95 <Button /> and <Frame /> for native-looking controls.
 */

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 530;

const LAYOUT = {
  offsetX: -30,

  paddingX: 90,
  paddingTop: 25,
  paddingBottom: 10,

  heroMaxHeight: 400,
  gapAfterHero: 10,

  contentWidth: 920,
};

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#c0c0c0', '#ffffff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
  '#404040', '#a0a0a0', '#ff8080', '#ffff80', '#80ff80', '#80ffff', '#8080ff', '#ff80ff',
  '#804000', '#0080ff', '#008040', '#ff0080',
];

const TOOL_ITEMS = [
  { id: 'free-select', label: 'Free-Form Select', spriteIndex: 0 },
  { id: 'select', label: 'Select', spriteIndex: 1 },
  { id: 'eraser', label: 'Eraser / Color Eraser', spriteIndex: 2 },
  { id: 'fill', label: 'Fill With Color', spriteIndex: 3 },
  { id: 'eyedropper', label: 'Pick Color', spriteIndex: 4 },
  { id: 'magnifier', label: 'Magnifier', spriteIndex: 5 },
  { id: 'pencil', label: 'Pencil', spriteIndex: 6 },
  { id: 'brush', label: 'Brush', spriteIndex: 7 },
  { id: 'airbrush', label: 'Airbrush', spriteIndex: 8 },
  { id: 'text', label: 'Text', spriteIndex: 9 },
  { id: 'line', label: 'Line', spriteIndex: 10 },
  { id: 'curve', label: 'Curve', spriteIndex: 11 },
  { id: 'rectangle', label: 'Rectangle', spriteIndex: 12 },
  { id: 'polygon', label: 'Polygon', spriteIndex: 13 },
  { id: 'ellipse', label: 'Ellipse', spriteIndex: 14 },
  {
    id: 'rounded-rectangle',
    label: 'Rounded Rectangle',
    spriteIndex: 15,
  },
];

function clearCanvas(ctx, width, height) {
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}


const HERO_IMAGE_SRC = perdanaWordartTitle;
function drawHeroImage(ctx, canvas, onDone) {
  const image = new Image();

  image.onload = () => {
    /*
     * WordArt dan PortfolioIntro menggunakan
     * content wrapper yang sama.
     */
    const contentWidth =
      canvas.width - LAYOUT.paddingX * 2;

    const availableHeroWidth = contentWidth;

    const scale = Math.min(
      availableHeroWidth / image.naturalWidth,
      LAYOUT.heroMaxHeight / image.naturalHeight
    );

    const width =
      image.naturalWidth * scale;

    const height =
      image.naturalHeight * scale;

    /*
     * Center WordArt di dalam content wrapper,
     * BUKAN di seluruh canvas.
     */
const x =
  LAYOUT.paddingX +
  (contentWidth - width) / 2 +
  LAYOUT.offsetX;

    const y = LAYOUT.paddingTop;

    ctx.drawImage(
      image,
      x,
      y,
      width,
      height
    );

    /*
     * Simpan actual rendered height.
     * PortfolioIntro akan menggunakan nilai
     * yang sama untuk menentukan posisi content.
     */
    onDone?.({
      width,
      height,
      x,
      y,
    });
  };

  image.onerror = () => {
    console.error(
      `Failed to load hero image: ${HERO_IMAGE_SRC}`
    );

    onDone?.(null);
  };

  image.src = HERO_IMAGE_SRC;
}

/**
 * Clickable quick-scan content rendered as HTML above the real canvas.
 *
 * The WordArt hero PNG is rasterized directly onto the canvas
 * so Pencil / Brush / Eraser can interact with it.
 *
 * Experience/project names remain HTML so they can stay clickable.
 */

function PortfolioIntro({
  onOpenExperience,
  onOpenProject,
  heroLayout,
}) {
  const experience = [
    {
      year: 'NOW',
      company: 'Exploring',
      role: 'Product Designer + Design Engineer',
    },
    {
      year: '2016 - 2026',
      company: 'Conania',
      role: 'Visual and Design Lead',
    },
    {
      year: '2019 - 2023',
      company: 'Sinidikara',
      role: 'Graphic Designer',
    },
  ];

  const projects = [
    {
      name: 'TravelXXX',
      url: 'https://travelxxx.perdanakun.com/explore',
    },
    {
      name: "Perdana's Computer",
      url: 'https://www.perdanakun.com/',
    },
    {
      name: 'Shipfaster UI',
      windowName: 'ship-ui',
    },
    {
      name: 'HoloHealth',
      windowName: 'holohealth',
    },
  ];

  /*
   * Content dimulai dari actual bottom WordArt
   * + whitespace yang kita tentukan.
   */
  const heroBottom = heroLayout
    ? heroLayout.y + heroLayout.height
    : LAYOUT.paddingTop + LAYOUT.heroMaxHeight;

  const contentTop =
    heroBottom + LAYOUT.gapAfterHero;

  const contentWidth =
    CANVAS_WIDTH - LAYOUT.paddingX * 2;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,

        width: `${CANVAS_WIDTH}px`,
        height: `${CANVAS_HEIGHT}px`,

        pointerEvents: 'none',

        color: '#000',

        fontFamily:
          'MS Sans Serif, Arial, sans-serif',

        userSelect: 'none',
      }}
    >
<div
  style={{
    position: 'absolute',

    left: `calc(50% + ${LAYOUT.offsetX}px)`,
    transform: 'translateX(-50%)',

    top: `${contentTop}px`,

    // Lebar keseluruhan content
    width: `${LAYOUT.contentWidth}px`,

    display: 'grid',

    // kiri | kanan
    gridTemplateColumns: '1fr auto',

    alignItems: 'start',

    pointerEvents: 'none',
  }}
>
        {/* ======================================
            EXPERIENCE
        ====================================== */}

<section
  style={{
    gridColumn: 1,
    justifySelf: 'start',
    minWidth: 0,
  }}
>

          <div
            style={{
              display: 'grid',
              gap: '7px',
            }}
          >
            {experience.map((item) => (
              <button
                key={`${item.year}-${item.company}`}
                type="button"

                onClick={onOpenExperience}

                style={{
                  ...introLinkStyle,

                  pointerEvents: 'auto',

                  display: 'grid',

                  gridTemplateColumns:
                    '74px 90px minmax(0, 1fr)',

                  gap: '5px',

                  width: '100%',

                  alignItems: 'baseline',

                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    color: '#666',

                    fontVariantNumeric:
                      'tabular-nums',
                  }}
                >
                  {item.year}
                </span>

                <span
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {item.company}
                </span>

                <span>
                  {item.role}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ======================================
            PROJECTS
        ====================================== */}

 <section
  style={{
    gridColumn: 2,
    justifySelf: 'end',
    minWidth: 0,
  }}
>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, max-content)',
            columnGap: '24px',
            rowGap: '8px',
            justifyContent: 'start',
          }}
        >
            {projects.map((project) => (
              <button
                key={project.name}
                type="button"

                onClick={() => {
                  if (project.url) {
                    window.open(
                      project.url,
                      '_blank',
                      'noopener,noreferrer'
                    );

                    return;
                  }

                  if (project.windowName) {
                    onOpenProject(
                      project.windowName
                    );
                  }
                }}

                style={{
                  ...introLinkStyle,

                  pointerEvents: 'auto',

                  width: 'fit-content',

                  fontWeight: 700,

                  textDecoration:
                    'underline',

                }}
              >
                {project.name} ↗
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const introLinkStyle = {
  appearance: 'none',
  border: 0,
  padding: 0,
  margin: 0,
  background: 'transparent',
  color: '#000080',
  fontFamily: 'MS Sans Serif, Arial, sans-serif',
  fontSize: '12px',
  lineHeight: 1.35,
  cursor: 'pointer',
};

function ToolButton({ item, active, onClick }) {
  return (
    <Button
      type="button"
      title={item.label}
      aria-label={item.label}
      aria-pressed={active}
      onClick={() => onClick(item.id)}
      style={{
        width: 34,
        minWidth: 34,
        height: 34,
        minHeight: 34,

        padding: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        boxSizing: 'border-box',
        backgroundColor: '#c0c0c0',


        borderColor: active
          ? '#808080 #ffffff #ffffff #808080'
          : '#ffffff #808080 #808080 #ffffff',

        cursor: 'pointer',
      }}
    >
<span
  aria-hidden="true"
  style={{
    width: 32,
    height: 32,
    display: 'block',

    backgroundImage: `url(${toolsSprite})`,
    backgroundRepeat: 'no-repeat',

    backgroundPosition: `${-8 - item.spriteIndex * 32}px -8px`,
  }}
/>
    </Button>
  );
}

export default function PaintHeroContent({
  onOpenExperience,
}) {

  const [heroLayout, setHeroLayout] = useState(null);

  const canvasRef = useRef(null);
  const canvasScrollRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);

  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(5);

  const [introVisible, setIntroVisible] = useState(true);
  const [canvasScale, setCanvasScale] = useState(1);

  const [statusText, setStatusText] = useState(
    'For Help, click Help Topics on the Help Menu.'
  );

  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    return ctx;
  };

  const restoreIntro = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();

    if (!canvas || !ctx) return;

    clearCanvas(ctx, canvas.width, canvas.height);
    setIntroVisible(false);

    drawHeroImage(ctx, canvas, (layout) => {
      setHeroLayout(layout);
      setIntroVisible(true);
    });

    if (canvasScrollRef.current) {
      canvasScrollRef.current.scrollTo({
        left: 0,
        top: 0,
      });
    }

    setStatusText('Portfolio intro restored.');
  };

  const newCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getContext();

    if (!canvas || !ctx) return;

    clearCanvas(ctx, canvas.width, canvas.height);
    setIntroVisible(false);

    if (canvasScrollRef.current) {
      canvasScrollRef.current.scrollTo({
        left: 0,
        top: 0,
      });
    }

    setStatusText('Created a new blank image.');
  };

  const openProjectWindow = (windowName) => {
    if (!windowName) return;

    window.dispatchEvent(
      new CustomEvent('open-project-window', {
        detail: {
          windowName,
        },
      })
    );

    setStatusText(`Opening ${windowName}...`);
  };

  const openExperience = () => {
    if (typeof onOpenExperience === 'function') {
      onOpenExperience();
      return;
    }

    setStatusText(
      'Experience window is not connected yet.'
    );
  };

  useEffect(() => {
    restoreIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return undefined;

    const updateScale = () => {
      const availableWidth = container.clientWidth;
      if (!availableWidth) return;

      setCanvasScale(
        Math.min(1, availableWidth / CANVAS_WIDTH)
      );
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /**
   * Pointer coordinates are translated from the scaled CSS size back
   * into the logical 1200 x 720 canvas coordinate system.
   */
  const getCanvasPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x:
        ((event.clientX - rect.left) / rect.width) *
        canvas.width,

      y:
        ((event.clientY - rect.top) / rect.height) *
        canvas.height,
    };
  };

  const startDrawing = (event) => {
    if (
      event.pointerType === 'mouse' &&
      event.button !== 0
    ) {
      return;
    }

    const drawableTools = [
      'pencil',
      'brush',
      'eraser',
    ];

    if (!drawableTools.includes(tool)) {
      const toolName =
        TOOL_ITEMS.find(
          (item) => item.id === tool
        )?.label || tool;

      setStatusText(
        `${toolName} is visual-only for now.`
      );

      return;
    }

    event.currentTarget.setPointerCapture?.(
      event.pointerId
    );

    drawingRef.current = true;
    lastPointRef.current = getCanvasPoint(event);
  };

  const draw = (event) => {
    if (!drawingRef.current) return;

    const ctx = getContext();
    if (!ctx) return;

    const currentPoint = getCanvasPoint(event);
    const previousPoint =
      lastPointRef.current || currentPoint;

    ctx.beginPath();
    ctx.moveTo(
      previousPoint.x,
      previousPoint.y
    );
    ctx.lineTo(
      currentPoint.x,
      currentPoint.y
    );

    if (tool === 'eraser') {
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = Math.max(
        brushSize * 7,
        30
      );
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth =
        tool === 'brush'
          ? brushSize * 2
          : brushSize;
    }

    ctx.stroke();

    lastPointRef.current = currentPoint;
  };

  const stopDrawing = (event) => {
    drawingRef.current = false;
    lastPointRef.current = null;

    try {
      event.currentTarget.releasePointerCapture?.(
        event.pointerId
      );
    } catch {
      // Pointer may already be released.
    }
  };

  const handleToolChange = (nextTool) => {
    setTool(nextTool);

    const toolName =
      TOOL_ITEMS.find(
        (item) => item.id === nextTool
      )?.label || nextTool;

    setStatusText(toolName);
  };



  return (
    <>
      <style>
        {`
          /*
           * REAL scrollbars for Paint canvas.
           * Scoped so this does not affect the rest of your portfolio.
           */
          .paint95-canvas-scroll {
            scrollbar-width: auto;
            scrollbar-color: #c0c0c0 #dfdfdf;
          }

          .paint95-canvas-scroll::-webkit-scrollbar {
            width: 18px !important;
            height: 18px !important;
          }

          .paint95-canvas-scroll::-webkit-scrollbar-track {
            background: #dfdfdf !important;
            border-left: 1px solid #808080;
            border-top: 1px solid #808080;
          }

          .paint95-canvas-scroll::-webkit-scrollbar-thumb {
            background: #c0c0c0 !important;
            border: 1px solid #000;
            box-shadow:
              inset 1px 1px 0 #fff,
              inset -1px -1px 0 #808080;
            border-radius: 0 !important;
          }

          .paint95-canvas-scroll::-webkit-scrollbar-thumb:hover {
            background: #c0c0c0 !important;
          }

          .paint95-canvas-scroll::-webkit-scrollbar-corner {
            background: #c0c0c0 !important;
          }

          @media (max-width: 700px) {
            .paint95-canvas-scroll::-webkit-scrollbar {
              width: 12px !important;
              height: 12px !important;
            }
          }
        `}
      </style>

      <div
        style={{
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,

          display: 'flex',
          flexDirection: 'column',

          overflow: 'hidden',

          backgroundColor: '#c0c0c0',

          fontFamily:
            'MS Sans Serif, sans-serif',

          fontSize: '11px',

          boxSizing: 'border-box',
        }}
      >
        {/* =====================================================
            MENU BAR
        ====================================================== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',

            gap: '2px',

            minHeight: '25px',
            flexShrink: 0,

            padding: '2px 5px',

            backgroundColor: '#c0c0c0',

            borderBottom: '1px solid #808080',

            boxSizing: 'border-box',

            userSelect: 'none',
          }}
        >
          <button
            type="button"
            onClick={newCanvas}
            style={menuItemStyle}
          >
            <u>N</u>ew
          </button>

          <button
            type="button"
            style={menuItemStyle}
            onClick={restoreIntro}
          >
            <u>R</u>estore
          </button>

          <button
            type="button"
            style={menuItemStyle}
          >
            <u>V</u>iew
          </button>

          <button
            type="button"
            onClick={restoreIntro}
            style={menuItemStyle}
          >
            <u>I</u>mage
          </button>

          <button
            type="button"
            style={menuItemStyle}
          >
            <u>O</u>ptions
          </button>

          <button
            type="button"
            style={menuItemStyle}
          >
            <u>H</u>elp
          </button>
        </div>

        {/* =====================================================
            WORKSPACE
        ====================================================== */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,

            display: 'flex',

            overflow: 'hidden',

            backgroundColor: '#c0c0c0',
          }}
        >
          {/* LEFT TOOLBOX */}
          <div
            style={{
              width: '78px',
              minWidth: '78px',

              flexShrink: 0,

              display: 'flex',
              flexDirection: 'column',

              padding: '4px',

              boxSizing: 'border-box',

              backgroundColor: '#c0c0c0',

              borderRight: '1px solid #808080',
            }}
          >
            <div
              style={{
                display: 'grid',

                gridTemplateColumns:
                  'repeat(2, 34px)',

                gridAutoRows: '34px',

                gap: '2px',
              }}
            >
              {TOOL_ITEMS.map((item) => (
                <ToolButton
                  key={item.id}
                  item={item}
                  active={tool === item.id}
                  onClick={handleToolChange}
                />
              ))}
            </div>

            {/* Classic tool options box */}
            <Frame
              boxShadow="in"
              style={{
                height: '94px',

                marginTop: '8px',

                padding: '6px',

                display: 'flex',
                flexDirection: 'column',

                alignItems: 'center',
                justifyContent: 'center',

                gap: '6px',

                boxSizing: 'border-box',

                backgroundColor: '#c0c0c0',
              }}
            >
 {/*
  [3, 5, 9].map((size) => (
    <Button
      key={size}
      type="button"
      active={brushSize === size}
      onClick={() => {
        setBrushSize(size);
        setStatusText(`Brush size: ${size}`);
      }}
      style={{
        width: '46px',
        minWidth: '46px',
        height: '18px',
        minHeight: '18px',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          display: 'block',
          width: '25px',
          height: `${Math.max(1, Math.round(size / 2))}px`,
          backgroundColor: '#000',
        }}
      />
    </Button>
  ))
*/}
            </Frame>
          </div>

          {/* CANVAS AREA */}
          <div
            style={{
              flex: 1,

              minWidth: 0,
              minHeight: 0,

              padding: '3px',

              overflow: 'hidden',

              backgroundColor: '#c0c0c0',

              boxSizing: 'border-box',
            }}
          >
            <Frame
              boxShadow="in"
              style={{
                width: '100%',
                height: '100%',

                minWidth: 0,
                minHeight: 0,

                padding: 0,

                overflow: 'hidden',

                boxSizing: 'border-box',

                backgroundColor: '#808080',
              }}
            >
                <div
                  ref={canvasScrollRef}
                  className="paint95-canvas-scroll"
                  style={{
                    width: '100%',
                    height: '100%',
                    minWidth: 0,
                    minHeight: 0,
                    overflow: 'auto',
                    backgroundColor: '#808080',
                    boxSizing: 'border-box',
                  }}
                >
                  <div
                    ref={canvasContainerRef}
                    style={{
                      width: '100%',
                      minHeight: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${CANVAS_WIDTH * canvasScale}px`,
                        height: `${CANVAS_HEIGHT * canvasScale}px`,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: `${CANVAS_WIDTH}px`,
                          height: `${CANVAS_HEIGHT}px`,
                          transform: `scale(${canvasScale})`,
                          transformOrigin: 'top left',
                          backgroundColor: '#ffffff',
                        }}
                      >
                  <canvas
                    ref={canvasRef}

                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}

                    onPointerDown={startDrawing}
                    onPointerMove={draw}
                    onPointerUp={stopDrawing}
                    onPointerCancel={stopDrawing}

                    onPointerLeave={(event) => {
                      if (
                        drawingRef.current &&
                        event.buttons === 0
                      ) {
                        stopDrawing(event);
                      }
                    }}

                    style={{
                      position: 'absolute',
                      inset: 0,

                      display: 'block',

                      width: `${CANVAS_WIDTH}px`,
                      height: `${CANVAS_HEIGHT}px`,

                      margin: 0,

                      backgroundColor: '#ffffff',

                      cursor:
                        tool === 'eraser'
                          ? 'cell'
                          : 'crosshair',

                      touchAction: 'none',

                      imageRendering: 'auto',
                    }}
                  />

                  {introVisible && (
                    <PortfolioIntro
                      heroLayout={heroLayout}
                      onOpenExperience={openExperience}
                      onOpenProject={openProjectWindow}
                    />
                  )}
                      </div>
                    </div>
                  </div>
                </div>
            </Frame>
          </div>
        </div>

        {/* =====================================================
            COLOR PALETTE
        ====================================================== */}
        <div
          style={{
            minHeight: '58px',
            flex: '0 0 58px',

            display: 'flex',
            alignItems: 'center',

            gap: '8px',

            padding: '6px 8px',

            backgroundColor: '#c0c0c0',

            borderTop: '1px solid #ffffff',
            borderBottom: '1px solid #808080',

            boxSizing: 'border-box',

            overflow: 'hidden',
          }}
        >
          {/* current foreground/background */}
          <Frame
            boxShadow="in"
            style={{
              width: '48px',
              minWidth: '48px',

              height: '42px',

              position: 'relative',

              backgroundColor: '#e2e2e2',
               boxShadow:
                    'inset 2px 2px 0 #808080',
              

              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                position: 'absolute',

                left: '5px',
                top: '5px',

                width: '22px',
                height: '22px',

                backgroundColor: color,

                border: '1px solid #eeeeee',

                zIndex: 2,

                boxSizing: 'border-box',
              }}
            />

            <div
              style={{
                position: 'absolute',

                right: '5px',
                bottom: '5px',

                width: '22px',
                height: '22px',

                backgroundColor: secondaryColor,

                border: '1px solid #808080',
                

                zIndex: 1,

                boxSizing: 'border-box',
              }}
            />
          </Frame>

          {/* palette */}
          <div
            style={{
              display: 'grid',

              gridTemplateColumns:
                'repeat(14, 18px)',

              gridTemplateRows:
                'repeat(2, 18px)',

              gap: '2px',

              flexShrink: 0,
            }}
          >
            {COLORS.map((swatch, index) => (
              <button
                key={`${swatch}-${index}`}

                type="button"

                title={swatch}
                aria-label={`Choose ${swatch}`}

                onClick={() => {
                  setColor(swatch);

                  if (
                    tool !== 'pencil' &&
                    tool !== 'brush'
                  ) {
                    setTool('pencil');
                  }

                  setStatusText(
                    `Foreground color: ${swatch}`
                  );
                }}

                onContextMenu={(event) => {
                  event.preventDefault();

                  setSecondaryColor(swatch);

                  setStatusText(
                    `Background color: ${swatch}`
                  );
                }}

                style={{
                  width: '18px',
                  height: '18px',

                  padding: 0,
                  margin: 0,

                  border: '1px solid #808080',

                  backgroundColor: swatch,

                  boxShadow:
                    'inset 1.5px 1.5px 0 #000000',

                  cursor: 'pointer',

                  boxSizing: 'border-box',
                }}
              />
            ))}
          </div>
        </div>

        {/* =====================================================
            STATUS BAR
        ====================================================== */}
        <div
          style={{
            minHeight: '28px',
            flex: '0 0 28px',

            display: 'grid',

            gridTemplateColumns:
              'minmax(0, 1fr) 40px 32px',

            gap: '3px',

            padding: '3px 4px',

            backgroundColor: '#c0c0c0',
            borderTop: '1px solid #ffffff',
            borderBottom: '1px solid #808080',

            boxSizing: 'border-box',
          }}
        >
          <Frame
            boxShadow="in"
            style={statusFrameStyle}  
          >
            {statusText}
          </Frame>

          <Frame
            boxShadow="in"
            style={statusFrameStyle}
          >
            {tool}
          </Frame>
        </div>
      </div>
    </>
  );
}




const menuItemStyle = {
  padding: '2px 5px',
  margin: 0,

  border: 0,

  backgroundColor: 'transparent',

  color: '#000',

  fontFamily:
    'MS Sans Serif, sans-serif',

  fontSize: '11px',

  cursor: 'pointer',
};

const statusFrameStyle = {
  minWidth: 0,

  height: '100%',

  display: 'flex',
  alignItems: 'center',

  padding: '0 5px',

  overflow: 'hidden',

  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',

  boxSizing: 'border-box',

  fontFamily:
    'MS Sans Serif, sans-serif',

  fontSize: '10px',
};

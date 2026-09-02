import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
} from '@react95/core';

export default function ImageGalleryViewer({
  items = [],
  initialIndex = 0,
  onIndexChange,
}) {
  // =========================================================
  // STATE
  // =========================================================

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(initialIndex);

  const touchStartX =
    useRef(null);

  const touchStartY =
    useRef(null);

  // =========================================================
  // CURRENT ITEM
  // =========================================================

  const currentItem =
    items[currentIndex] || null;

  // =========================================================
  // RESET INDEX
  // =========================================================

  useEffect(() => {
    if (
      initialIndex >= 0 &&
      initialIndex < items.length
    ) {
      setCurrentIndex(
        initialIndex
      );
    } else {
      setCurrentIndex(0);
    }
  }, [
    initialIndex,
    items,
  ]);

  // =========================================================
  // INDEX CHANGE CALLBACK
  // =========================================================

  useEffect(() => {
    if (!currentItem) {
      return;
    }

    if (
      typeof onIndexChange ===
      'function'
    ) {
      onIndexChange(
        currentIndex,
        currentItem
      );
    }
  }, [
    currentIndex,
    currentItem,
    onIndexChange,
  ]);

  // =========================================================
  // PREVIOUS
  // =========================================================
const goPrevious = () => {
  if (
    items.length <= 1 ||
    currentIndex === 0
  ) {
    return;
  }

  setCurrentIndex(
    currentIndex - 1
  );
};

const goNext = () => {
  if (
    items.length <= 1 ||
    currentIndex ===
      items.length - 1
  ) {
    return;
  }

  setCurrentIndex(
    currentIndex + 1
  );
};

  // =========================================================
  // KEYBOARD NAVIGATION
  // =========================================================

useEffect(() => {
  const handleKeyDown = (
    event
  ) => {
    if (
      event.key ===
      'ArrowLeft'
    ) {
      event.preventDefault();

      setCurrentIndex(
        (previous) =>
          Math.max(
            0,
            previous - 1
          )
      );
    }

    if (
      event.key ===
      'ArrowRight'
    ) {
      event.preventDefault();

      setCurrentIndex(
        (previous) =>
          Math.min(
            items.length - 1,
            previous + 1
          )
      );
    }
  };

  window.addEventListener(
    'keydown',
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      'keydown',
      handleKeyDown
    );
  };
}, [
  items.length,
]);

  // =========================================================
  // TOUCH / SWIPE START
  // =========================================================

  const handleTouchStart = (
    event
  ) => {
    if (
      !event.touches ||
      event.touches.length === 0
    ) {
      return;
    }

    touchStartX.current =
      event.touches[0].clientX;

    touchStartY.current =
      event.touches[0].clientY;
  };

  // =========================================================
  // TOUCH / SWIPE END
  // =========================================================

  const handleTouchEnd = (
    event
  ) => {
    if (
      touchStartX.current ===
        null ||
      touchStartY.current ===
        null
    ) {
      return;
    }

    const touch =
      event.changedTouches?.[0];

    if (!touch) {
      return;
    }

    const differenceX =
      touchStartX.current -
      touch.clientX;

    const differenceY =
      touchStartY.current -
      touch.clientY;

    const horizontalDistance =
      Math.abs(
        differenceX
      );

    const verticalDistance =
      Math.abs(
        differenceY
      );

    const swipeThreshold = 50;

    // Only treat it as gallery swipe
    // when horizontal movement is
    // stronger than vertical movement.
    if (
      horizontalDistance >
        swipeThreshold &&
      horizontalDistance >
        verticalDistance
    ) {
      if (
        differenceX > 0
      ) {
        goNext();
      } else {
        goPrevious();
      }
    }

    touchStartX.current =
      null;

    touchStartY.current =
      null;
  };

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (
    !currentItem ||
    items.length === 0
  ) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',

          display: 'flex',
          alignItems: 'center',
          justifyContent:
            'center',

          padding: '16px',

          boxSizing:
            'border-box',

          fontFamily:
            'MS Sans Serif, sans-serif',

          fontSize: '11px',

          backgroundColor:
            '#c0c0c0',
        }}
      >
        No image available.
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================
return (
  <div
    style={{
      width: '100%',
      height: '100%',

      display: 'flex',
      flexDirection: 'column',

      minWidth: 0,
      minHeight: 0,

      overflow: 'hidden',

      backgroundColor: '#c0c0c0',

      fontFamily:
        'MS Sans Serif, sans-serif',

      boxSizing: 'border-box',
    }}
  >

    {/* =========================
        MENU BAR
    ========================= */}

    <div
      style={{
        flexShrink: 0,

        display: 'flex',
        gap: '6px',

        padding: '2px 6px',

        backgroundColor:
          '#c0c0c0',

        borderBottom:
          '1px solid #808080',

        fontSize: '11px',

        userSelect: 'none',
      }}
    >
      <span
        style={{
          padding: '1px 4px',
        }}
      >
        <u>F</u>ile
      </span>

      <span
        style={{
          padding: '1px 4px',
        }}
      >
        <u>E</u>dit
      </span>

      <span
        style={{
          padding: '1px 4px',
        }}
      >
        <u>V</u>iew
      </span>

      <span
        style={{
          padding: '1px 4px',
        }}
      >
        <u>H</u>elp
      </span>
    </div>


    {/* =========================
        IMAGE AREA
    ========================= */}

    <div
      onTouchStart={
        handleTouchStart
      }

      onTouchEnd={
        handleTouchEnd
      }

      style={{
        flex: 1,

        minWidth: 0,
        minHeight: 0,

        backgroundColor: 'white',

        margin: '2px',

        boxShadow:
          'inset 1px 1px 0px #0a0a0a, inset -1px -1px 0px #dfdfdf',

        display: 'flex',

        alignItems: 'center',

        justifyContent: 'center',

        overflow: 'hidden',

        boxSizing: 'border-box',

        touchAction: 'pan-y',

        WebkitTapHighlightColor:
          'transparent',
      }}
    >
      <img
        src={
          currentItem.image
        }

        alt={
          currentItem.name ||
          `Image ${
            currentIndex + 1
          }`
        }

        draggable={false}

        style={{
          display: 'block',

          width: 'auto',
          height: 'auto',

          maxWidth: '100%',
          maxHeight: '100%',

          objectFit: 'contain',

          userSelect: 'none',

          WebkitUserDrag:
            'none',
        }}
      />
    </div>


    {/* =========================
        NAVIGATION
    ========================= */}

    <div
      style={{
        flexShrink: 0,

        minHeight: '40px',

        display: 'flex',

        alignItems: 'center',

        justifyContent:
          'space-between',

        gap: '8px',

        padding:
          '4px 8px 6px',

        boxSizing: 'border-box',
      }}
    >
      <Button
        onClick={
          goPrevious
        }

        disabled={
          currentIndex === 0
        }

        style={{
          minWidth: '74px',

          height: '24px',

          fontFamily:
            'MS Sans Serif, sans-serif',

          fontSize: '11px',
        }}
      >
        {'< Prev'}
      </Button>


      <div
        style={{
          flex: 1,

          minWidth: 0,

          textAlign: 'center',

          fontSize: '11px',

          whiteSpace: 'nowrap',

          userSelect: 'none',
        }}
      >
        {currentIndex + 1}
        {' of '}
        {items.length}
      </div>


      <Button
        onClick={
          goNext
        }

        disabled={
          currentIndex ===
          items.length - 1
        }

        style={{
          minWidth: '74px',

          height: '24px',

          fontFamily:
            'MS Sans Serif, sans-serif',

          fontSize: '11px',
        }}
      >
        {'Next >'}
      </Button>
    </div>
  </div>
);
}
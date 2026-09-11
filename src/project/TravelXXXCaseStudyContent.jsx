import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const SLIDE_COUNT = 19;

const MOTION_SLIDES = new Set([
  8,
  10,
  12,
  15,
  18,
]);

const getSlideSrc = (index) => {
  const number = String(
    index + 1
  ).padStart(2, '0');

  return `/projects/travelxxx/case-study/slides/${number}.png`;
};

const getMotionSrc = (
  slideNumber
) => {
  const number = String(
    slideNumber
  ).padStart(2, '0');

  return `/projects/travelxxx/case-study/slides/${number}.webm`;
};

export default function TravelXXXCaseStudyContent({
  onSlideChange,
}) {
  // =========================================================
  // STATE
  // =========================================================

  const [
    currentSlide,
    setCurrentSlide,
  ] = useState(0);

  const touchStartX =
    useRef(null);

  const touchStartY =
    useRef(null);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const goPrevious =
    useCallback(() => {
      setCurrentSlide(
        (current) =>
          Math.max(
            0,
            current - 1
          )
      );
    }, []);

  const goNext =
    useCallback(() => {
      setCurrentSlide(
        (current) =>
          Math.min(
            SLIDE_COUNT - 1,
            current + 1
          )
      );
    }, []);

  // =========================================================
  // SHELL NAVIGATION
  // =========================================================

  useEffect(() => {
    const handlePrevious = () => {
      goPrevious();
    };

    const handleNext = () => {
      goNext();
    };

    window.addEventListener(
      'travelxxx-case-study-prev',
      handlePrevious
    );

    window.addEventListener(
      'travelxxx-case-study-next',
      handleNext
    );

    return () => {
      window.removeEventListener(
        'travelxxx-case-study-prev',
        handlePrevious
      );

      window.removeEventListener(
        'travelxxx-case-study-next',
        handleNext
      );
    };
  }, [
    goPrevious,
    goNext,
  ]);

  // =========================================================
  // REPORT CURRENT SLIDE TO PARENT SHELL
  // =========================================================

  useEffect(() => {
    if (
      typeof onSlideChange !==
      'function'
    ) {
      return;
    }

    onSlideChange({
      currentSlide,

      slideNumber:
        currentSlide + 1,

      totalSlides:
        SLIDE_COUNT,

      canGoBack:
        currentSlide > 0,

      canGoForward:
        currentSlide <
        SLIDE_COUNT - 1,
    });
  }, [
    currentSlide,
    onSlideChange,
  ]);

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

        goPrevious();
      }

      if (
        event.key ===
        'ArrowRight'
      ) {
        event.preventDefault();

        goNext();
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
    goPrevious,
    goNext,
  ]);

  // =========================================================
  // PRELOAD NEXT STATIC IMAGE ONLY
  // =========================================================

  useEffect(() => {
    const nextIndex =
      currentSlide + 1;

    if (
      nextIndex >=
      SLIDE_COUNT
    ) {
      return;
    }

    const nextSlideNumber =
      nextIndex + 1;

    // Do not preload motion assets.
    // WebM is requested only when its slide becomes active.
    if (
      MOTION_SLIDES.has(
        nextSlideNumber
      )
    ) {
      return;
    }

    const image =
      new Image();

    image.src =
      getSlideSrc(
        nextIndex
      );
  }, [
    currentSlide,
  ]);

  // =========================================================
  // TOUCH / SWIPE
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
  // CURRENT SLIDE
  // =========================================================

  const slideNumber =
    currentSlide + 1;

  const isMotion =
    MOTION_SLIDES.has(
      slideNumber
    );

  const isFinalSlide =
    currentSlide ===
    SLIDE_COUNT - 1;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      onTouchStart={
        handleTouchStart
      }

      onTouchEnd={
        handleTouchEnd
      }

      style={{
        width: '100%',
        height: '100%',

        minWidth: 0,
        minHeight: 0,

        display: 'flex',

        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden',

        backgroundColor:
          '#ffffff',

        boxSizing:
          'border-box',

        touchAction: 'pan-y',

        WebkitTapHighlightColor:
          'transparent',
      }}
    >
      {isMotion ? (
        <video
          key={slideNumber}

          src={getMotionSrc(
            slideNumber
          )}

          autoPlay
          loop
          muted
          playsInline

          controls={false}

          preload="metadata"

          style={{
            display: 'block',

            width: '100%',
            height: '100%',

            objectFit:
              'contain',

            userSelect:
              'none',

            WebkitUserDrag:
              'none',
          }}
        />
      ) : isFinalSlide ? (
        <a
          href="https://travelxxx.perdanakun.com"

          target="_blank"

          rel="noopener noreferrer"

          style={{
            width: '100%',
            height: '100%',

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            cursor: 'pointer',

            textDecoration:
              'none',
          }}
        >
          <img
            src={getSlideSrc(
              currentSlide
            )}

            alt="Open TravelXXX Live Prototype"

            draggable={false}

            decoding="async"

            style={{
              display: 'block',

              width: '100%',
              height: '100%',

              objectFit:
                'contain',

              userSelect:
                'none',

              WebkitUserDrag:
                'none',
            }}
          />
        </a>
      ) : (
        <img
          src={getSlideSrc(
            currentSlide
          )}

          alt={`TravelXXX Case Study ${slideNumber}`}

          draggable={false}

          decoding="async"

          style={{
            display: 'block',

            width: '100%',
            height: '100%',

            objectFit:
              'contain',

            userSelect:
              'none',

            WebkitUserDrag:
              'none',
          }}
        />
      )}
    </div>
  );
}

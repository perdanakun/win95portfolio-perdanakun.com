import React, {
  useEffect,
  useRef,
} from 'react';

import Webamp from 'webamp';

export default function WinampPlayer({
  onClose,

  isMinimized = false,

  isMobile = false,
  isTablet = false,
}) {
  const containerRef =
    useRef(null);

  const webampRef =
    useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const webamp = new Webamp({
      initialTracks: [
        {
          metaData: {
            artist: 'Mahadewa',
            title: 'Mistikus Cinta',
          },

          url:
            '/audio/MahadewA_Mistikus_Cinta.mp3',
        },
      ],
    });

    webampRef.current =
      webamp;

    const renderPromise =
      webamp.renderInto(
        containerRef.current
      );

    Promise.resolve(
      renderPromise
    ).then(() => {
      const root =
        containerRef.current
          ?.firstElementChild;

      if (root) {
        root.style.pointerEvents =
          'auto';
      }
    });

    if (
      typeof webamp.onClose ===
      'function'
    ) {
      webamp.onClose(() => {
        if (
          typeof onClose ===
          'function'
        ) {
          onClose();
        }
      });
    }

    return () => {
      if (
        webampRef.current &&
        typeof webampRef.current
          .dispose === 'function'
      ) {
        webampRef.current.dispose();
      }

      webampRef.current =
        null;
    };
  }, [
    onClose,
  ]);

  const scale =
    isMobile
      ? 0.9
      : isTablet
        ? 1
        : 1.2;

  return (
    <div
      style={{
        position: 'fixed',

        inset: 0,

        zIndex: 9999,

        pointerEvents: 'none',

        visibility:
          isMinimized
            ? 'hidden'
            : 'visible',
      }}
    >
      <div
        ref={containerRef}

        style={{
          position: 'relative',

          width: '100%',
          height: '100%',

          pointerEvents: 'none',

          transform:
            `scale(${scale})`,

          transformOrigin:
            'center center',
        }}
      />
    </div>
  );
}
import React, {
  useEffect,
  useRef,
} from 'react';

import Webamp from 'webamp';

export default function WinampPlayer({
  onClose,

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
            artist: 'Dewa',
            title: 'Mistikus Cinta',
          },

          url:
            '/audio/MahadewA_Mistikus_Cinta.mp3',
        },
      ],
    });

    webampRef.current =
      webamp;

    webamp.renderInto(
      containerRef.current
    );

    return () => {
      if (
        webampRef.current &&
        typeof webampRef.current.dispose ===
          'function'
      ) {
        webampRef.current.dispose();
      }

      webampRef.current =
        null;
    };
  }, []);

  useEffect(() => {
    const webamp =
      webampRef.current;

    if (!webamp) {
      return;
    }

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
  }, [onClose]);

  // =========================================================
  // RESPONSIVE SCALE
  // =========================================================

  const scale =
    isMobile
      ? 0.82
      : isTablet
        ? 1.05
        : 1.35;

return (
  <div
    ref={containerRef}
    style={{
      position: 'fixed',
      inset: 0,

      pointerEvents: 'auto',

      zIndex: 9999,

      transform: isMobile
        ? 'scale(0.9)'
        : isTablet
          ? 'scale(1.1)'
          : 'scale(1.2)',

      transformOrigin: 'center center',
    }}
  />
);
}
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
   Range,
   Frame,
} from '@react95/core';


export default function VideoViewer({
  video,
}) {
  const playerContainerRef =
    useRef(null);

  const playerRef =
    useRef(null);

  const timerRef =
    useRef(null);


  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);

  const [
    duration,
    setDuration,
  ] = useState(0);

  const [
    volume,
    setVolume,
  ] = useState(100);

  const [
    isMuted,
    setIsMuted,
  ] = useState(false);


  // =========================================================
  // VIDEO ID
  // =========================================================

  const videoId =
    video?.youtubeId;


  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (
    seconds
  ) => {
    if (
      !Number.isFinite(
        seconds
      )
    ) {
      return '0:00';
    }


    const safeSeconds =
      Math.max(
        0,
        Math.floor(seconds)
      );


    const hours =
      Math.floor(
        safeSeconds / 3600
      );

    const minutes =
      Math.floor(
        (
          safeSeconds % 3600
        ) / 60
      );

    const remainingSeconds =
      safeSeconds % 60;


    if (hours > 0) {
      return `${hours}:${String(
        minutes
      ).padStart(
        2,
        '0'
      )}:${String(
        remainingSeconds
      ).padStart(
        2,
        '0'
      )}`;
    }


    return `${minutes}:${String(
      remainingSeconds
    ).padStart(
      2,
      '0'
    )}`;
  };


  // =========================================================
  // UPDATE PLAYER TIME
  // =========================================================

  const updatePlayerTime =
    () => {
      const player =
        playerRef.current;


      if (
        !player ||
        typeof player.getCurrentTime !==
          'function'
      ) {
        return;
      }


      const time =
        player.getCurrentTime();

      const total =
        player.getDuration();


      if (
        Number.isFinite(
          time
        )
      ) {
        setCurrentTime(
          time
        );
      }


      if (
        Number.isFinite(
          total
        ) &&
        total > 0
      ) {
        setDuration(
          total
        );
      }
    };


  // =========================================================
  // CREATE YOUTUBE PLAYER
  // =========================================================

  useEffect(() => {
    if (
      !videoId ||
      !playerContainerRef.current
    ) {
      return;
    }


    let isCancelled =
      false;


    const createPlayer = () => {
      if (
        isCancelled ||
        !window.YT ||
        !window.YT.Player ||
        !playerContainerRef.current
      ) {
        return;
      }


      playerRef.current =
        new window.YT.Player(
          playerContainerRef.current,
          {
            width: '100%',
            height: '100%',

            videoId,

            playerVars: {
              controls: 0,

              rel: 0,

              playsinline: 1,

              disablekb: 1,

              fs: 0,

              modestbranding: 1,
            },

            events: {
              onReady: (
                event
              ) => {
                const player =
                  event.target;


                const total =
                  player.getDuration();


                if (
                  Number.isFinite(
                    total
                  )
                ) {
                  setDuration(
                    total
                  );
                }


                const playerVolume =
                  player.getVolume();


                if (
                  Number.isFinite(
                    playerVolume
                  )
                ) {
                  setVolume(
                    playerVolume
                  );
                }


                setIsMuted(
                  player.isMuted()
                );


                setCurrentTime(
                  player.getCurrentTime() ||
                    0
                );
              },


              onStateChange: (
                event
              ) => {
                const state =
                  event.data;


                if (
                  state ===
                  window.YT
                    .PlayerState
                    .PLAYING
                ) {
                  setIsPlaying(
                    true
                  );

                  return;
                }


                if (
                  state ===
                  window.YT
                    .PlayerState
                    .ENDED
                ) {
                  setIsPlaying(
                    false
                  );

                  setCurrentTime(
                    event.target
                      .getDuration()
                  );

                  return;
                }


                setIsPlaying(
                  false
                );
              },
            },
          }
        );
    };


    // =======================================================
    // API ALREADY LOADED
    // =======================================================

    if (
      window.YT &&
      window.YT.Player
    ) {
      createPlayer();
    } else {
      // =====================================================
      // LOAD API ONLY ONCE
      // =====================================================

      const existingScript =
        document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]'
        );


      if (!existingScript) {
        const script =
          document.createElement(
            'script'
          );

        script.src =
          'https://www.youtube.com/iframe_api';

        document.body.appendChild(
          script
        );
      }


      const previousCallback =
        window.onYouTubeIframeAPIReady;


      window.onYouTubeIframeAPIReady =
        () => {
          if (
            typeof previousCallback ===
            'function'
          ) {
            previousCallback();
          }


          createPlayer();
        };
    }


    return () => {
      isCancelled =
        true;


      if (
        timerRef.current
      ) {
        clearInterval(
          timerRef.current
        );

        timerRef.current =
          null;
      }


      if (
        playerRef.current &&
        typeof playerRef.current
          .destroy ===
          'function'
      ) {
        playerRef.current
          .destroy();
      }


      playerRef.current =
        null;
    };
  }, [
    videoId,
  ]);


  // =========================================================
  // TIMER
  // =========================================================

  useEffect(() => {
    if (
      timerRef.current
    ) {
      clearInterval(
        timerRef.current
      );

      timerRef.current =
        null;
    }


    if (isPlaying) {
      timerRef.current =
        setInterval(
          () => {
            updatePlayerTime();
          },
          250
        );
    }


    return () => {
      if (
        timerRef.current
      ) {
        clearInterval(
          timerRef.current
        );

        timerRef.current =
          null;
      }
    };
  }, [
    isPlaying,
  ]);


  // =========================================================
  // PLAY / PAUSE
  // =========================================================

  const togglePlay = () => {
    const player =
      playerRef.current;


    if (!player) {
      return;
    }


    if (isPlaying) {
      if (
        typeof player.pauseVideo ===
        'function'
      ) {
        player.pauseVideo();
      }

      return;
    }


    if (
      typeof player.playVideo ===
      'function'
    ) {
      player.playVideo();
    }
  };

// =========================================================
  // STOP VIDEO
  // =========================================================

const stopVideo = () => {
  const player =
    playerRef.current;

  if (!player) {
    return;
  }


  if (
    typeof player.pauseVideo ===
    'function'
  ) {
    player.pauseVideo();
  }


  if (
    typeof player.seekTo ===
    'function'
  ) {
    player.seekTo(
      0,
      true
    );
  }


  setCurrentTime(
    0
  );

  setIsPlaying(
    false
  );
};

  // =========================================================
  // RESTART
  // =========================================================

  const restartVideo = () => {
    const player =
      playerRef.current;


    if (!player) {
      return;
    }


    if (
      typeof player.seekTo ===
      'function'
    ) {
      player.seekTo(
        0,
        true
      );
    }


    setCurrentTime(
      0
    );


    if (
      typeof player.playVideo ===
      'function'
    ) {
      player.playVideo();
    }
  };


  // =========================================================
  // SEEK
  // =========================================================

  const handleSeek = (
    event
  ) => {
    const value =
      Number(
        event.target.value
      );


    if (
      !Number.isFinite(
        value
      )
    ) {
      return;
    }


    setCurrentTime(
      value
    );


    const player =
      playerRef.current;


    if (
      !player ||
      typeof player.seekTo !==
        'function'
    ) {
      return;
    }


    player.seekTo(
      value,
      true
    );
  };


  // =========================================================
  // MUTE
  // =========================================================

  const toggleMute = () => {
    const player =
      playerRef.current;


    if (!player) {
      return;
    }


    if (
      typeof player.isMuted !==
        'function'
    ) {
      return;
    }


    if (
      player.isMuted()
    ) {
      if (
        typeof player.unMute ===
        'function'
      ) {
        player.unMute();
      }

      setIsMuted(
        false
      );

      return;
    }


    if (
      typeof player.mute ===
      'function'
    ) {
      player.mute();
    }


    setIsMuted(
      true
    );
  };


  // =========================================================
  // VOLUME
  // =========================================================

  const handleVolumeChange = (
    event
  ) => {
    const newVolume =
      Number(
        event.target.value
      );


    if (
      !Number.isFinite(
        newVolume
      )
    ) {
      return;
    }


    setVolume(
      newVolume
    );


    const player =
      playerRef.current;


    if (
      !player ||
      typeof player.setVolume !==
        'function'
    ) {
      return;
    }


    player.setVolume(
      newVolume
    );


    if (
      newVolume <= 0
    ) {
      if (
        typeof player.mute ===
        'function'
      ) {
        player.mute();
      }


      setIsMuted(
        true
      );

      return;
    }


    if (
      typeof player.isMuted ===
        'function' &&
      player.isMuted()
    ) {
      if (
        typeof player.unMute ===
          'function'
      ) {
        player.unMute();
      }
    }


    setIsMuted(
      false
    );
  };


  // =========================================================
  // FULLSCREEN
  // =========================================================

  const openFullscreen = () => {
    const iframe =
      playerRef.current
        ?.getIframe?.();


    if (!iframe) {
      return;
    }


    if (
      iframe.requestFullscreen
    ) {
      iframe.requestFullscreen();

      return;
    }


    if (
      iframe.webkitRequestFullscreen
    ) {
      iframe.webkitRequestFullscreen();

      return;
    }


    if (
      iframe.msRequestFullscreen
    ) {
      iframe.msRequestFullscreen();
    }
  };


  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!videoId) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',

          display: 'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          padding: '16px',

          boxSizing:
            'border-box',

          backgroundColor:
            '#c0c0c0',

          fontFamily:
            'MS Sans Serif, sans-serif',

          fontSize: '11px',
        }}
      >
        No video available.
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

        flexDirection:
          'column',

        minWidth: 0,
        minHeight: 0,

        overflow: 'hidden',

        backgroundColor:
          '#c0c0c0',

        fontFamily:
          'MS Sans Serif, sans-serif',

        boxSizing:
          'border-box',
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

          padding:
            '2px 6px',

          backgroundColor:
            '#c0c0c0',

          borderBottom:
            '1px solid #808080',

          fontSize:
            '11px',

          userSelect:
            'none',
        }}
      >
        <span
          style={{
            padding:
              '1px 4px',
          }}
        >
          <u>F</u>ile
        </span>

        <span
          style={{
            padding:
              '1px 4px',
          }}
        >
          <u>E</u>dit
        </span>

        <span
          style={{
            padding:
              '1px 4px',
          }}
        >
          <u>V</u>iew
        </span>

        <span
          style={{
            padding:
              '1px 4px',
          }}
        >
          <u>H</u>elp
        </span>
      </div>


      {/* =========================
          VIDEO AREA
      ========================= */}

      <div
        style={{
          flex: 1,

          minWidth: 0,
          minHeight: 0,

          margin:
            '2px',

          backgroundColor:
            'black',

          boxShadow:
            'inset 1px 1px 0px #0a0a0a, inset -1px -1px 0px #dfdfdf',

          display:
            'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          overflow:
            'hidden',

          boxSizing:
            'border-box',
        }}
      >
{/* =======================
    4:3 PLAYER WRAPPER
======================= */}

<div
  style={{
    width: '720px',
    maxWidth: '100%',

    aspectRatio: '4 / 3',

    backgroundColor: '#000',

    position: 'relative',

    overflow: 'hidden',

    flexShrink: 0,
  }}
>
  <div
    ref={playerContainerRef}
    style={{
      position: 'absolute',

      inset: 0,

      width: '100%',
      height: '100%',
    }}
  />
</div>
      </div>



 {/* =========================
    PLAYER CONTROLS
========================= */}

<Frame
  style={{
    flexShrink: 0,

    display: 'flex',
    flexDirection: 'column',

    padding: '24px',

    gap: '8px',

    backgroundColor: '#c0c0c0',

    boxSizing: 'border-box',
  }}
>

  {/* =======================
      TIME DISPLAY
  ======================= */}

  <div
    style={{
      display: 'flex',

      justifyContent:
        'space-between',

      alignItems: 'center',

      fontFamily:
        'MS Sans Serif, sans-serif',

      fontSize: '11px',

      userSelect: 'none',
    }}
  >
    <span>
      {formatTime(
        currentTime
      )}
    </span>

    <span>
      {formatTime(
        duration
      )}
    </span>
  </div>


  {/* =======================
      PROGRESS
  ======================= */}
<div
    style={{
      paddingBottom: '4px',
    }}
  >
  <Range
    min="0"

    max={
      duration || 0
    }

    step="0.1"

    value={
      Math.min(
        currentTime,
        duration || 0
      )
    }

    onChange={
      handleSeek
    }

    aria-label="Video progress"

    style={{
      width: '100%',
    }}
  />
</div>

  {/* =======================
      BUTTONS
  ======================= */}

  <div
    style={{
      display: 'flex',

      alignItems: 'center',

      gap: '4px',

      width: '100%',
    }}
  >

    {/* PLAY / PAUSE */}

    <Button
      onClick={
        togglePlay
      }

      title={
        isPlaying
          ? 'Pause'
          : 'Play'
      }

      style={{
        width: '34px',
        minWidth: '34px',

        height: '30px',

        padding: 0,

        fontFamily:
          'Arial, sans-serif',

        fontSize: '15px',

        display: 'flex',

        alignItems: 'center',

        justifyContent:
          'center',
      }}
    >
      {isPlaying
        ? 'Ⅱ'
        : '▶'}
    </Button>


    {/* STOP */}

    <Button
      onClick={
        stopVideo
      }

      title="Stop"

      style={{
        width: '34px',
        minWidth: '34px',

        height: '30px',

        padding: 0,

        fontSize: '13px',

        display: 'flex',

        alignItems: 'center',

        justifyContent:
          'center',
      }}
    >
      ■
    </Button>


    {/* MUTE */}

    <Button
      onClick={
        toggleMute
      }

      title={
        isMuted
          ? 'Unmute'
          : 'Mute'
      }

      style={{
        width: '44px',
        minWidth: '44px',

        height: '30px',

        padding: 0,

        fontFamily:
          'MS Sans Serif, sans-serif',

        fontSize: '10px',
      }}
    >
      {isMuted
        ? 'Mute'
        : 'Sound'}
    </Button>


    {/* VOLUME */}

    <Range
      min="0"

      max="100"

      step="1"

      value={
        isMuted
          ? 0
          : volume
      }

      onChange={
        handleVolumeChange
      }

      aria-label="Volume"

      style={{
        width: '90px',

        flexShrink: 0,
      }}
    />


    {/* SPACER */}

    <div
      style={{
        flex: 1,
      }}
    />


    {/* FULLSCREEN */}

    <Button
      onClick={
        openFullscreen
      }

      title="Fullscreen"

      style={{
        minWidth: '72px',

        height: '30px',

        fontFamily:
          'MS Sans Serif, sans-serif',

        fontSize: '11px',
      }}
    >
      Fullscreen
    </Button>

  </div>
</Frame>
    </div>
  );
}
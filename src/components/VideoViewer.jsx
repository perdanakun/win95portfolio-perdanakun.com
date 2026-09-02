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

import {
  ClassicPlayIcon,
  ClassicPauseIcon,
  ClassicStopIcon,
  ClassicPreviousIcon,
  ClassicNextIcon,
  ClassicRewindIcon,
  ClassicFastForwardIcon,
  ClassicVolumeIcon,
  ClassicMuteIcon,
  ClassicFullscreenIcon,
} from './ClassicMediaIcons';


export default function VideoViewer({
  video,
}) {
  const playerContainerRef =
    useRef(null);

  const playerRef =
    useRef(null);

  const localVideoRef =
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
  // VIDEO SOURCE
  // =========================================================

  const videoId =
    video?.youtubeId || null;

  const localSrc =
    video?.src || null;

  const isYouTube =
    Boolean(videoId);

  const isLocal =
    Boolean(localSrc);


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
      return '00:00';
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


    return `${String(
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
  };


  // =========================================================
  // RESET STATE WHEN VIDEO CHANGES
  // =========================================================

  useEffect(() => {
    setIsPlaying(false);

    setCurrentTime(0);

    setDuration(0);

    setVolume(100);

    setIsMuted(false);
  }, [
    videoId,
    localSrc,
  ]);


  // =========================================================
  // UPDATE PLAYER TIME
  // =========================================================

  const updatePlayerTime = () => {
    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
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

      return;
    }


    // =========================
    // LOCAL VIDEO
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }

      const time =
        player.currentTime;

      const total =
        player.duration;

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
    }
  };


  // =========================================================
  // CREATE YOUTUBE PLAYER
  // =========================================================

  useEffect(() => {
    if (
      !isYouTube ||
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
    isYouTube,
    videoId,
  ]);


  // =========================================================
  // LOCAL VIDEO EVENTS
  // =========================================================

  useEffect(() => {
    if (
      !isLocal ||
      !localVideoRef.current
    ) {
      return;
    }

    const player =
      localVideoRef.current;


    const handleLoadedMetadata =
      () => {
        if (
          Number.isFinite(
            player.duration
          )
        ) {
          setDuration(
            player.duration
          );
        }

        setCurrentTime(
          player.currentTime || 0
        );

        setVolume(
          Math.round(
            player.volume * 100
          )
        );

        setIsMuted(
          player.muted
        );
      };


    const handlePlay =
      () => {
        setIsPlaying(
          true
        );
      };


    const handlePause =
      () => {
        setIsPlaying(
          false
        );
      };


    const handleEnded =
      () => {
        setIsPlaying(
          false
        );

        setCurrentTime(
          player.duration || 0
        );
      };


    const handleTimeUpdate =
      () => {
        if (
          Number.isFinite(
            player.currentTime
          )
        ) {
          setCurrentTime(
            player.currentTime
          );
        }
      };


    const handleVolumeUpdate =
      () => {
        setVolume(
          Math.round(
            player.volume * 100
          )
        );

        setIsMuted(
          player.muted
        );
      };


    player.addEventListener(
      'loadedmetadata',
      handleLoadedMetadata
    );

    player.addEventListener(
      'play',
      handlePlay
    );

    player.addEventListener(
      'pause',
      handlePause
    );

    player.addEventListener(
      'ended',
      handleEnded
    );

    player.addEventListener(
      'timeupdate',
      handleTimeUpdate
    );

    player.addEventListener(
      'volumechange',
      handleVolumeUpdate
    );


    return () => {
      player.removeEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      );

      player.removeEventListener(
        'play',
        handlePlay
      );

      player.removeEventListener(
        'pause',
        handlePause
      );

      player.removeEventListener(
        'ended',
        handleEnded
      );

      player.removeEventListener(
        'timeupdate',
        handleTimeUpdate
      );

      player.removeEventListener(
        'volumechange',
        handleVolumeUpdate
      );
    };
  }, [
    isLocal,
    localSrc,
  ]);


  // =========================================================
  // TIMER
  // YOUTUBE NEEDS POLLING
  // LOCAL VIDEO ALREADY HAS timeupdate
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


    if (
      isPlaying &&
      isYouTube
    ) {
      timerRef.current =
        setInterval(
          updatePlayerTime,
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
    isYouTube,
  ]);


  // =========================================================
  // PLAY / PAUSE
  // =========================================================

  const togglePlay = () => {
    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
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

      return;
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }


      if (player.paused) {
        player
          .play()
          .catch(() => {
            // Browser may block playback
          });

        return;
      }


      player.pause();
    }
  };


  // =========================================================
  // STOP
  // =========================================================

  const stopVideo = () => {
    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
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
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }

      player.pause();

      player.currentTime =
        0;
    }


    setCurrentTime(
      0
    );

    setIsPlaying(
      false
    );
  };


  // =========================================================
  // REWIND 10 SEC
  // =========================================================

  const rewindVideo = () => {
    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
      const player =
        playerRef.current;

      if (
        !player ||
        typeof player.getCurrentTime !==
          'function' ||
        typeof player.seekTo !==
          'function'
      ) {
        return;
      }

      const nextTime =
        Math.max(
          0,
          player.getCurrentTime() -
            10
        );

      player.seekTo(
        nextTime,
        true
      );

      setCurrentTime(
        nextTime
      );

      return;
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }

      const nextTime =
        Math.max(
          0,
          player.currentTime -
            10
        );

      player.currentTime =
        nextTime;

      setCurrentTime(
        nextTime
      );
    }
  };


  // =========================================================
  // FORWARD 10 SEC
  // =========================================================

  const forwardVideo = () => {
    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
      const player =
        playerRef.current;

      if (
        !player ||
        typeof player.getCurrentTime !==
          'function' ||
        typeof player.getDuration !==
          'function' ||
        typeof player.seekTo !==
          'function'
      ) {
        return;
      }

      const total =
        player.getDuration();

      const nextTime =
        Math.min(
          total,
          player.getCurrentTime() +
            10
        );

      player.seekTo(
        nextTime,
        true
      );

      setCurrentTime(
        nextTime
      );

      return;
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }

      const total =
        Number.isFinite(
          player.duration
        )
          ? player.duration
          : 0;

      const nextTime =
        Math.min(
          total,
          player.currentTime +
            10
        );

      player.currentTime =
        nextTime;

      setCurrentTime(
        nextTime
      );
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


    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
      const player =
        playerRef.current;

      if (
        player &&
        typeof player.seekTo ===
          'function'
      ) {
        player.seekTo(
          value,
          true
        );
      }

      return;
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }

      player.currentTime =
        value;
    }
  };


  // =========================================================
  // MUTE
  // =========================================================

  const toggleMute = () => {
    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
      const player =
        playerRef.current;

      if (
        !player ||
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

      return;
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }

      player.muted =
        !player.muted;

      setIsMuted(
        player.muted
      );
    }
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


    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
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

      return;
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      const player =
        localVideoRef.current;

      if (!player) {
        return;
      }

      player.volume =
        Math.max(
          0,
          Math.min(
            1,
            newVolume / 100
          )
        );


      if (
        newVolume <= 0
      ) {
        player.muted =
          true;

        setIsMuted(
          true
        );

        return;
      }


      if (player.muted) {
        player.muted =
          false;
      }

      setIsMuted(
        false
      );
    }
  };


  // =========================================================
  // FULLSCREEN
  // =========================================================

  const openFullscreen = () => {
    let element =
      null;


    // =========================
    // YOUTUBE
    // =========================

    if (isYouTube) {
      element =
        playerRef.current
          ?.getIframe?.();
    }


    // =========================
    // LOCAL
    // =========================

    if (isLocal) {
      element =
        localVideoRef.current;
    }


    if (!element) {
      return;
    }


    if (
      element.requestFullscreen
    ) {
      element.requestFullscreen();

      return;
    }


    if (
      element.webkitRequestFullscreen
    ) {
      element.webkitRequestFullscreen();

      return;
    }


    if (
      element.msRequestFullscreen
    ) {
      element.msRequestFullscreen();
    }
  };


  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (
    !isYouTube &&
    !isLocal
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
        flexDirection: 'column',

        minWidth: 0,
        minHeight: 0,

        overflow: 'hidden',

        backgroundColor:
          '#c0c0c0',

        fontFamily:
          'MS Sans Serif, sans-serif',

        boxSizing: 'border-box',
      }}
    >

      {/* =====================================================
          MENU BAR
      ===================================================== */}

      <div
        style={{
          flexShrink: 0,

          display: 'flex',
          alignItems: 'center',

          padding: '2px 4px',

          backgroundColor:
            '#c0c0c0',

          borderBottom:
            '1px solid #808080',

          fontSize: '11px',

          userSelect: 'none',

          overflow: 'hidden',
        }}
      >
        <span
          style={{
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          <u>F</u>ile
        </span>

        <span
          style={{
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          <u>V</u>iew
        </span>

        <span
          style={{
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          <u>P</u>lay
        </span>

        <span
          style={{
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          <u>N</u>avigate
        </span>

        <span
          style={{
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          F<u>a</u>vorites
        </span>

        <span
          style={{
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          <u>H</u>elp
        </span>
      </div>


      {/* =====================================================
          VIDEO AREA
      ===================================================== */}

      <div
        style={{
          flex: 1,

          minWidth: 0,
          minHeight: 0,

          display: 'flex',

          alignItems: 'center',

          justifyContent:
            'center',

          margin: '2px',

          backgroundColor:
            '#000',

          boxShadow:
            'inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff',

          overflow: 'hidden',

          boxSizing:
            'border-box',
        }}
      >

        <div
          style={{
            width: '720px',

            maxWidth: '100%',

            aspectRatio:
              '16 / 9',

            maxHeight: '100%',

            position: 'relative',

            backgroundColor:
              '#000',

            overflow: 'hidden',

            flexShrink: 0,
          }}
        >

          {isYouTube ? (
            <div
              ref={
                playerContainerRef
              }

              style={{
                position:
                  'absolute',

                inset: 0,

                width: '100%',
                height: '100%',
              }}
            />
          ) : (
            <video
              ref={
                localVideoRef
              }

              src={
                localSrc
              }

              preload="metadata"

              playsInline

              style={{
                position:
                  'absolute',

                inset: 0,

                width: '100%',
                height: '100%',

                objectFit:
                  'contain',

                backgroundColor:
                  '#000',
              }}
            />
          )}

        </div>
      </div>


      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <Frame
        style={{
          flexShrink: 0,

          padding:
            '5px 6px 3px',

          backgroundColor:
            '#c0c0c0',

          boxSizing:
            'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',

            alignItems: 'center',

            gap: '6px',

            width: '100%',

            minWidth: 0,
          }}
        >
          <span
            style={{
              width: '40px',

              flexShrink: 0,

              fontSize: '10px',

              textAlign:
                'right',

              userSelect:
                'none',
            }}
          >
            {formatTime(
              currentTime
            )}
          </span>


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

            aria-label=
              "Video progress"

            style={{
              flex: 1,

              minWidth: 0,
            }}
          />


          <span
            style={{
              width: '40px',

              flexShrink: 0,

              fontSize: '10px',

              userSelect:
                'none',
            }}
          >
            {formatTime(
              duration
            )}
          </span>
        </div>
      </Frame>


      {/* =====================================================
          MEDIA CONTROLS
      ===================================================== */}

      <div
        style={{
          flexShrink: 0,

          minHeight: '48px',

          display: 'flex',

          alignItems: 'center',

          gap: '3px',

          padding: '4px 6px',

          boxSizing:
            'border-box',

          backgroundColor:
            '#c0c0c0',

          borderTop:
            '1px solid #dfdfdf',

          userSelect: 'none',
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
            width: '32px',

            minWidth:
              '32px',

            height: '32px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',
          }}
        >
          {isPlaying ? (
            <ClassicPauseIcon
              size={14}
            />
          ) : (
            <ClassicPlayIcon
              size={14}
            />
          )}
        </Button>


        {/* STOP */}

        <Button
          onClick={
            stopVideo
          }

          title="Stop"

          style={{
            width: '32px',

            minWidth:
              '32px',

            height: '32px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',
          }}
        >
          <ClassicStopIcon
            size={13}
          />
        </Button>


        {/* DIVIDER */}

        <div
          style={{
            width: '2px',

            height: '26px',

            flexShrink: 0,

            margin: '0 8px',

            borderLeft:
              '1px solid #808080',

            borderRight:
              '1px solid #ffffff',
          }}
        />


        {/* PREVIOUS */}

        <Button
          disabled

          title="Previous"

          style={{
            width: '30px',

            minWidth:
              '30px',

            height: '30px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',
          }}
        >
          <ClassicPreviousIcon
            size={13}
          />
        </Button>


        {/* REWIND */}

        <Button
          onClick={
            rewindVideo
          }

          title="Rewind 10 seconds"

          style={{
            width: '30px',

            minWidth:
              '30px',

            height: '30px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',
          }}
        >
          <ClassicRewindIcon
            size={14}
          />
        </Button>


        {/* FAST FORWARD */}

        <Button
          onClick={
            forwardVideo
          }

          title="Forward 10 seconds"

          style={{
            width: '30px',

            minWidth:
              '30px',

            height: '30px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',
          }}
        >
          <ClassicFastForwardIcon
            size={14}
          />
        </Button>


        {/* NEXT */}

        <Button
          disabled

          title="Next"

          style={{
            width: '30px',

            minWidth:
              '30px',

            height: '30px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',
          }}
        >
          <ClassicNextIcon
            size={13}
          />
        </Button>


        {/* SPACER */}

        <div
          style={{
            flex: 1,

            minWidth: '8px',
          }}
        />


        {/* VOLUME BUTTON */}

        <div
          onClick={
            toggleMute
          }

          title={
            isMuted
              ? 'Unmute'
              : 'Mute'
          }

          style={{
            width: '30px',

            minWidth:
              '30px',

            height: '30px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            cursor: 'pointer',
          }}
        >
          {isMuted ||
          volume === 0 ? (
            <ClassicMuteIcon
              size={16}
            />
          ) : (
            <ClassicVolumeIcon
              size={16}
            />
          )}
        </div>


        {/* VOLUME RANGE */}

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
            width: '96px',

            flexShrink: 0,
          }}
        />


        {/* FULLSCREEN */}

        <div
          onClick={
            openFullscreen
          }

          title="Fullscreen"

          style={{
            width: '30px',

            minWidth:
              '30px',

            height: '30px',

            marginLeft: '3px',

            padding: 0,

            display: 'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            cursor: 'pointer',
          }}
        >
          <ClassicFullscreenIcon
            size={13}
          />
        </div>
      </div>


      {/* =====================================================
          STATUS BAR
      ===================================================== */}

      <div
        style={{
          flexShrink: 0,

          minHeight: '20px',

          margin:
            '0 4px 4px',

          display: 'flex',

          alignItems: 'center',

          padding: '2px 6px',

          boxSizing:
            'border-box',

          backgroundColor:
            '#000',

          color: '#c0c0c0',

          boxShadow:
            'inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff',

          fontSize: '10px',
        }}
      >
        {isPlaying
          ? `Playing - ${video?.name || 'Video'}`
          : currentTime > 0
            ? 'Paused'
            : 'Ready'}
      </div>
    </div>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@react95/core';
import shutterSound from '../assets/sounds/camera_shutter.wav';

export default function CameraModal({
  show,
  onClose,
  onCapture
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const shutterSoundRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  // ================= CAMERA SOUND =================

  useEffect(() => {
    shutterSoundRef.current = new Audio(shutterSound);

    return () => {
      if (shutterSoundRef.current) {
        shutterSoundRef.current.pause();
        shutterSoundRef.current = null;
      }
    };
  }, []);

  // ================= CAMERA START / STOP =================

  useEffect(() => {
    if (!show) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [show]);

  const startCamera = async () => {
    try {
      setError('');
      setCameraReady(false);

      // Stop previous stream if there is one
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Make sure video is ready before allowing capture
        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            ?.play()
            .catch(() => {});

          setCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);

      setCameraReady(false);

      setError(
        'Unable to access the camera. Please allow camera permission.'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraReady(false);
  };

  // ================= CAPTURE =================

  const handleCapture = () => {
    const video = videoRef.current;

    if (
      !video ||
      !cameraReady ||
      !video.videoWidth ||
      !video.videoHeight
    ) {
      return;
    }

    // ================= CAMERA SHUTTER SOUND =================

    if (shutterSoundRef.current) {
      shutterSoundRef.current.currentTime = 0;

      shutterSoundRef.current
        .play()
        .catch(() => {});
    }

    // ================= CREATE CANVAS =================

    const canvas = document.createElement('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    /*
     * IMPORTANT:
     *
     * The <video> preview is mirrored using CSS:
     *
     * transform: scaleX(-1)
     *
     * But the actual video pixels are NOT mirrored.
     *
     * Therefore, we intentionally DO NOT use:
     *
     * context.scale(-1, 1)
     *
     * here.
     *
     * This makes the saved result NORMAL / NOT MIRRORED.
     */

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // ================= CONVERT TO IMAGE =================

    const imageData = canvas.toDataURL(
      'image/jpeg',
      0.9
    );

    setPhoto(imageData);

    // Stop camera after taking photo
    stopCamera();
  };

  // ================= RETAKE =================

  const handleRetake = () => {
    setPhoto(null);
    setError('');

    startCamera();
  };

  // ================= USE PHOTO =================

  const handleUsePhoto = () => {
    if (!photo) {
      return;
    }

    // ================= BASE64 → BINARY =================

    const parts = photo.split(',');

    const byteString = atob(parts[1]);

    const mimeString = parts[0]
      .split(':')[1]
      .split(';')[0];

    const arrayBuffer = new ArrayBuffer(
      byteString.length
    );

    const intArray = new Uint8Array(
      arrayBuffer
    );

    for (
      let i = 0;
      i < byteString.length;
      i++
    ) {
      intArray[i] =
        byteString.charCodeAt(i);
    }

    // ================= FILE NAME =================

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    const now = new Date();

    const pad = (value) =>
      String(value).padStart(2, '0');

    const fileName =
      `Caught-You-Smiling-on-${dayNames[now.getDay()]}-${pad(
        now.getDate()
      )}-${monthNames[now.getMonth()]}-${now.getFullYear()}.jpg`;

    // ================= CREATE FILE =================

    const file = new File(
      [arrayBuffer],
      fileName,
      {
        type: mimeString
      }
    );

    // ================= SEND FILE TO APP =================

    if (onCapture) {
      onCapture(file);
    }

    // Reset state
    setPhoto(null);
    setError('');

    // Close camera window
    onClose();
  };

  // ================= CLOSE =================

  const handleClose = () => {
    stopCamera();

    setPhoto(null);
    setError('');

    onClose();
  };

  // ================= HIDDEN =================

  if (!show) {
    return null;
  }

  // ================= BUTTON STYLE =================

  const cameraButtonStyle = {
    height: 28,
    minHeight: 28,
    boxSizing: 'border-box'
  };

  // ================= RENDER =================

  return (
    <div
      style={{
        width: '100%',
        height: '100%',

        minWidth: 0,
        minHeight: 0,

        boxSizing: 'border-box',

        padding: 10,

        background: '#c0c0c0',

        display: 'flex',
        flexDirection: 'column',

        gap: 10,

        overflow: 'hidden'
      }}
    >

      {/* ================= CAMERA PREVIEW ================= */}

      <div
        style={{
          flex: 1,

          minHeight: 0,

          background: '#000',

          display: 'flex',

          alignItems: 'center',
          justifyContent: 'center',

          overflow: 'hidden',

          boxSizing: 'border-box',

          /*
           * Windows 95 bevel
           */
          borderTop:
            '2px solid #808080',

          borderLeft:
            '2px solid #808080',

          borderRight:
            '2px solid #ffffff',

          borderBottom:
            '2px solid #ffffff'
        }}
      >

        {/* ================= LIVE CAMERA ================= */}

        {!photo && !error && (
          <video
            ref={videoRef}

            autoPlay
            playsInline
            muted

            style={{
              width: '100%',
              height: '100%',

              objectFit: 'cover',

              /*
               * MIRROR ONLY THE LIVE PREVIEW
               *
               * This does NOT affect the captured image.
               */
              transform: 'scaleX(-1)'
            }}
          />
        )}

        {/* ================= CAPTURED PHOTO ================= */}

        {photo && (
          <img
            src={photo}
            alt="Captured"

            style={{
              width: '100%',
              height: '100%',

              objectFit: 'contain',

              display: 'block'

              /*
               * IMPORTANT:
               *
               * No scaleX(-1) here.
               *
               * Therefore the captured photo
               * remains NORMAL / NOT MIRRORED.
               */
            }}
          />
        )}

        {/* ================= ERROR ================= */}

        {error && (
          <div
            style={{
              padding: 20,

              color: '#fff',

              fontFamily:
                'MS Sans Serif, sans-serif',

              fontSize: 12,

              textAlign: 'center'
            }}
          >
            {error}
          </div>
        )}

      </div>

      {/* ================= CONTROLS ================= */}

      <div
        style={{
          flexShrink: 0,

          display: 'flex',

          alignItems: 'center',
          justifyContent: 'center',

          gap: 8,

          minHeight: 30
        }}
      >

        {/* ================= TAKE PHOTO ================= */}

        {!photo && !error && (
          <Button
            disabled={!cameraReady}
            onClick={handleCapture}

            style={{
              ...cameraButtonStyle,
              width: 120
            }}
          >
            Take Photo
          </Button>
        )}

        {/* ================= AFTER PHOTO ================= */}

        {photo && (
          <>
            <Button
              onClick={handleRetake}

              style={{
                ...cameraButtonStyle,
                width: 80
              }}
            >
              Retake
            </Button>

            <Button
              onClick={handleUsePhoto}

              style={{
                ...cameraButtonStyle,
                width: 100
              }}
            >
              Use Photo
            </Button>
          </>
        )}

        {/* ================= ERROR ================= */}

        {error && (
          <Button
            onClick={startCamera}

            style={{
              ...cameraButtonStyle,
              width: 80
            }}
          >
            Retry
          </Button>
        )}

      </div>

    </div>
  );
}

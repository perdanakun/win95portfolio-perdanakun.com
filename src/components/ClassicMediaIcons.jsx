import React from 'react';


function BaseIcon({
  children,
  size = 16,
  ...props
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"

      fill="none"

      xmlns="http://www.w3.org/2000/svg"

      shapeRendering="crispEdges"

      aria-hidden="true"

      {...props}
    >
      {children}
    </svg>
  );
}


// =========================================================
// PLAY
// =========================================================

export function ClassicPlayIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <path
        d="M5 3V13L13 8L5 3Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// PAUSE
// =========================================================

export function ClassicPauseIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <rect
        x="4"
        y="3"
        width="3"
        height="10"
        fill="currentColor"
      />

      <rect
        x="9"
        y="3"
        width="3"
        height="10"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// STOP
// =========================================================

export function ClassicStopIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <rect
        x="4"
        y="4"
        width="8"
        height="8"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// PREVIOUS
// =========================================================

export function ClassicPreviousIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <rect
        x="2"
        y="3"
        width="2"
        height="10"
        fill="currentColor"
      />

      <path
        d="M13 3L5 8L13 13V3Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// NEXT
// =========================================================

export function ClassicNextIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <path
        d="M3 3V13L11 8L3 3Z"
        fill="currentColor"
      />

      <rect
        x="12"
        y="3"
        width="2"
        height="10"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// REWIND
// =========================================================

export function ClassicRewindIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <path
        d="M8 3L2 8L8 13V3Z"
        fill="currentColor"
      />

      <path
        d="M14 3L8 8L14 13V3Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// FAST FORWARD
// =========================================================

export function ClassicFastForwardIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <path
        d="M2 3V13L8 8L2 3Z"
        fill="currentColor"
      />

      <path
        d="M8 3V13L14 8L8 3Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// VOLUME
// =========================================================

export function ClassicVolumeIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <rect
        x="1"
        y="6"
        width="3"
        height="4"
        fill="currentColor"
      />

      <path
        d="M4 6L8 3V13L4 10V6Z"
        fill="currentColor"
      />

      <rect
        x="10"
        y="6"
        width="1"
        height="4"
        fill="currentColor"
      />

      <rect
        x="12"
        y="5"
        width="1"
        height="6"
        fill="currentColor"
      />

      <rect
        x="14"
        y="4"
        width="1"
        height="8"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// MUTE
// =========================================================

export function ClassicMuteIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>
      <rect
        x="1"
        y="6"
        width="3"
        height="4"
        fill="currentColor"
      />

      <path
        d="M4 6L8 3V13L4 10V6Z"
        fill="currentColor"
      />

      <rect
        x="10"
        y="5"
        width="1"
        height="1"
        fill="currentColor"
      />

      <rect
        x="11"
        y="6"
        width="1"
        height="1"
        fill="currentColor"
      />

      <rect
        x="12"
        y="7"
        width="1"
        height="2"
        fill="currentColor"
      />

      <rect
        x="11"
        y="9"
        width="1"
        height="1"
        fill="currentColor"
      />

      <rect
        x="10"
        y="10"
        width="1"
        height="1"
        fill="currentColor"
      />

      <rect
        x="13"
        y="5"
        width="1"
        height="1"
        fill="currentColor"
      />

      <rect
        x="12"
        y="6"
        width="1"
        height="1"
        fill="currentColor"
      />

      <rect
        x="10"
        y="9"
        width="1"
        height="1"
        fill="currentColor"
      />

      <rect
        x="9"
        y="10"
        width="1"
        height="1"
        fill="currentColor"
      />
    </BaseIcon>
  );
}


// =========================================================
// FULLSCREEN
// =========================================================

export function ClassicFullscreenIcon({
  size = 16,
}) {
  return (
    <BaseIcon size={size}>

      {/* TOP LEFT */}

      <rect
        x="2"
        y="2"
        width="5"
        height="2"
        fill="currentColor"
      />

      <rect
        x="2"
        y="2"
        width="2"
        height="5"
        fill="currentColor"
      />


      {/* TOP RIGHT */}

      <rect
        x="9"
        y="2"
        width="5"
        height="2"
        fill="currentColor"
      />

      <rect
        x="12"
        y="2"
        width="2"
        height="5"
        fill="currentColor"
      />


      {/* BOTTOM LEFT */}

      <rect
        x="2"
        y="12"
        width="5"
        height="2"
        fill="currentColor"
      />

      <rect
        x="2"
        y="9"
        width="2"
        height="5"
        fill="currentColor"
      />


      {/* BOTTOM RIGHT */}

      <rect
        x="9"
        y="12"
        width="5"
        height="2"
        fill="currentColor"
      />

      <rect
        x="12"
        y="9"
        width="2"
        height="5"
        fill="currentColor"
      />
    </BaseIcon>
  );
}
import React from 'react';

const FIGMA_PROTOTYPE_URL =
  'https://embed.figma.com/proto/y0tYg3S2CwfQ2ErjS4GYC4/TRAVELXXX?node-id=1-2&p=f&viewport=56%2C-598%2C0.29&scaling=contain&content-scaling=fixed&page-id=0%3A1&embed-host=share';

export default function TravelXXXFigmaContent() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        background: '#ffff',
      }}
    >
      <iframe
        title="TravelXXX Case Study"
        src={FIGMA_PROTOTYPE_URL}
        allowFullScreen
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </div>
  );
}
import React, { useState } from 'react';
import { Wangimg129 } from '@react95/icons';

import imgNimu from '../assets/images/img_nimu_new.jpeg';
import imgMiyu from '../assets/images/img_miyu_new.jpg';
import imgCelsi from '../assets/images/img_celsi.jpeg';

export default function RecycleBin({
  onOpenFile,
  isTouchDevice,
}) {
  const [selectedFile, setSelectedFile] = useState(null);

 const files = [
  {
    id: 1,
    name: 'nimu.jpeg',
    imagePath: imgNimu,
  },
  {
    id: 2,
    name: 'miyu.jpg',
    imagePath: imgMiyu,
  },
  {
    id: 3,
    name: 'celsi.jpeg',
    imagePath: imgCelsi,
  },
];

  // =========================
  // SINGLE CLICK / SELECT
  // =========================

  const handleFileClick = (file) => {
    setSelectedFile(file.id);
  };

  // =========================
  // OPEN FILE
  // =========================

  const handleFileDoubleClick = (file) => {
    onOpenFile(file);
  };

  // =========================
  // CLICK AREA KOSONG
  // =========================

  const handleExplorerClick = () => {
    setSelectedFile(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontFamily: 'MS Sans Serif, sans-serif',
      }}
    >
{/* =========================
    MENU BAR
========================= */}

<div
  style={{
    display: 'flex',
    gap: '6px',
    padding: '2px 6px',
    backgroundColor: '#c0c0c0',
    borderBottom: '1px solid #808080',
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
          EXPLORER AREA
      ========================= */}

      <div
        onClick={handleExplorerClick}
        style={{
          flex: 1,

          backgroundColor: 'white',

          padding: '12px',

          overflowY: 'auto',

          boxShadow:
            'inset 1px 1px 0px #0a0a0a, inset -1px -1px 0px #dfdfdf',

          margin: '2px',

          // Touch device
          touchAction: 'pan-y',
        }}
      >

        <div
          style={{
            display: 'grid',

            gridTemplateColumns:
              'repeat(auto-fill, 120px)',

            gridAutoRows: '90px',

            gap: '8px',

            alignItems: 'start',

            padding: '4px',
          }}
        >

          {files.map((file) => {

            const isSelected =
              selectedFile === file.id;

            return (
              <div
                key={file.id}

                // =========================
                // PC: SINGLE CLICK = SELECT
                // =========================

                onClick={(e) => {
                  e.stopPropagation();

                  if (!isTouchDevice) {
                    handleFileClick(file);
                  }
                }}

                // =========================
                // PC: DOUBLE CLICK = OPEN
                // =========================

                onDoubleClick={(e) => {
                  e.stopPropagation();

                  if (!isTouchDevice) {
                    handleFileDoubleClick(file);
                  }
                }}

                // =========================
                // SMARTPHONE + TABLET
                // 1 TAP = OPEN
                // =========================

                onPointerUp={(e) => {
                  if (
                    isTouchDevice &&
                    (
                      e.pointerType === 'touch' ||
                      e.pointerType === 'pen'
                    )
                  ) {
                    e.preventDefault();
                    e.stopPropagation();

                    handleFileDoubleClick(file);
                  }
                }}

                style={{
                  display: 'flex',

                  flexDirection: 'column',

                  alignItems: 'center',

                  width: '120px',

                  cursor: 'pointer',

                  userSelect: 'none',

                  padding: '4px',

                  textAlign: 'center',

                  boxSizing: 'border-box',

                  backgroundColor: isSelected
                    ? '#000080'
                    : 'transparent',

                  color: isSelected
                    ? 'white'
                    : 'black',

                  touchAction: 'manipulation',
                }}
              >

                {/* =========================
                    FILE ICON
                ========================= */}

                <div
                  style={{
                    marginBottom: '4px',

                    pointerEvents: 'none',
                  }}
                >
                  <Wangimg129
                    variant="32x32_4"
                  />
                </div>


                {/* =========================
                    FILE NAME
                ========================= */}

                <span
                  style={{
                    fontSize: '11px',

                    lineHeight: '1.2',

                    width: '100%',

                    textAlign: 'center',

                    wordBreak: 'normal',

                    overflowWrap: 'break-word',

                    pointerEvents: 'none',
                  }}
                >
                  {file.name}
                </span>

              </div>
            );
          })}

        </div>

      </div>


      {/* =========================
          STATUS BAR
      ========================= */}

      <div
        style={{
          display: 'flex',

          alignItems: 'center',

          padding: '2px 6px',

          fontSize: '11px',

          color: '#000',

          backgroundColor: '#c0c0c0',

          boxShadow:
            'inset 1px 1px 0px #dfdfdf, inset -1px -1px 0px #0a0a0a',

          marginTop: '2px',

          height: '20px',
        }}
      >
        {files.length} object(s)
      </div>

    </div>
  );
}
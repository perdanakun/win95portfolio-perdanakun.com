import React, { useEffect, useState, useRef } from 'react';
import {
  FileText,
  Folder,
  FolderOpen,
  Shdocvw272,
  Notepad2,
  Wordpad,
  Url1102,
} from '@react95/icons';

import githubIcon from '../icons/github.svg';
import instagramIcon from '../icons/instagram.svg';

import holohealthIcon from '../assets/images/case-study/holohealthIcon.png';

// =========================================================
// FILE ICON
// =========================================================

const renderFileIcon = (type) => {
  switch (type) {

case 'holohealth':
  return (
    <img
      src={holohealthIcon}
      alt="HoloHealth"
      style={{
        width: '20px',
        height: '20px',
        objectFit: 'contain',
      }}
    />
  );


    case 'github':
      return (
        <img
          src={githubIcon}
          alt=""
          style={{
            width: '16px',
            height: '16px',
            objectFit: 'contain',
          }}
        />
      );

    case 'instagram':
      return (
        <img
          src={instagramIcon}
          alt=""
          style={{
            width: '16px',
            height: '16px',
            objectFit: 'contain',
          }}
        />
      );

    case 'website':
      return (
        <Url1102
          variant="16x16_4"
        />
      );

    case 'documentation':
      return (
        <Wordpad
          variant="16x16_4"
        />
      );

    case 'caseStudy':
      return (
        <Notepad2
          variant="16x16_4"
        />
      );

    default:
      return (
        <FileText
          variant="16x16_4"
        />
      );
  }
};


export default function LocalTree({
  data = [],
  expandedIds = [],
  selectedItem = null,
  currentFolder = null,

  onFolderClick,
  onFolderDoubleClick,

  onFileClick,
  onFileDoubleClick,

  onToggleFolder,

  // Dipanggil ketika tombol "-" ditekan
  onFolderCollapse,

  resetExpanded = false,
}) {
  // =========================================================
  // INTERNAL EXPANDED STATE
  // =========================================================

  const [internalExpandedIds, setInternalExpandedIds] =
    useState(expandedIds);

    const expandedIdsRef = useRef(expandedIds);

useEffect(() => {
  expandedIdsRef.current = internalExpandedIds;
}, [internalExpandedIds]);

  // =========================================================
  // SYNC WITH PARENT
  // =========================================================

  useEffect(() => {
    setInternalExpandedIds(expandedIds);
  }, [expandedIds]);

  // =========================================================
  // RESET TREE
  // =========================================================

  useEffect(() => {
    if (!resetExpanded) return;

    setInternalExpandedIds([]);
  }, [resetExpanded]);

  // =========================================================
  // EXPANDED CHECK
  // =========================================================

  const isExpanded = (treeId) => {
    return internalExpandedIds.includes(treeId);
  };

  // =========================================================
  // GET ORIGINAL ITEM
  // =========================================================

  const getSourceItem = (item) => {
    return (
      item.source ||
      item.original ||
      item.data ||
      item
    );
  };

  // =========================================================
  // FIND NODE BY ID
  // =========================================================

  const findNodeById = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }

      if (
        Array.isArray(node.children) &&
        node.children.length > 0
      ) {
        const found = findNodeById(
          node.children,
          id
        );

        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  // =========================================================
  // TOGGLE FOLDER
  // =========================================================

const toggleFolder = (item) => {
  if (!item) return;

const treeId =
  item.treeId ?? `folder-${item.id}`;

const nodeKey =
  item.treeId ??
  `${item.type}-${item.id}-${level}`;

  const previous =
    expandedIdsRef.current;

  const currentlyExpanded =
    previous.includes(treeId);

  const next = currentlyExpanded
    ? previous.filter(
        (id) => id !== treeId
      )
    : [...previous, treeId];

  // Update local state
  setInternalExpandedIds(next);

  // Update parent AFTER state calculation,
  // bukan dari dalam state updater.
  onToggleFolder?.(
    item,
    next
  );
};

  // =========================================================
  // AUTO EXPAND CURRENT FOLDER
  // =========================================================

  useEffect(() => {
    if (!currentFolder) return;

    const matchingNode = findNodeById(
      data,
      currentFolder.id
    );

    if (!matchingNode) return;

    const treeId =
      matchingNode.treeId ??
      `folder-${matchingNode.id}`;

    setInternalExpandedIds((previous) => {
      if (previous.includes(treeId)) {
        return previous;
      }

      const next = [
        ...previous,
        treeId,
      ];

      onToggleFolder?.(
        matchingNode,
        next
      );

      return next;
    });
  }, [currentFolder, data]);

  // =========================================================
  // RENDER NODE
  // =========================================================

const renderNode = (
  item,
  level = 0,
  path = '0'
) => {
    if (!item) return null;

    const hasChildren =
      item.type === 'folder' &&
      Array.isArray(item.children) &&
      item.children.length > 0;

// ID untuk logic expand/collapse
const treeId =
  item.treeId ??
  `${item.type}-${item.id}`;

// Key khusus React.
// Path membuat key tetap unik walaupun
// ada item dengan ID yang sama.
const nodeKey =
  item.treeId ??
  `${item.type}-${item.id}-${path}`;

    const expanded =
      isExpanded(treeId);

    const sourceItem =
      getSourceItem(item);

    // =======================================================
    // SELECTED
    // =======================================================

    const isSelected =
      selectedItem?.type === item.type &&
      selectedItem?.id === item.id;

    // =======================================================
    // CURRENT FOLDER
    // =======================================================

    const isCurrentFolder =
      item.type === 'folder' &&
      currentFolder?.id === item.id;

    // =======================================================
    // TOUCH / PEN DETECTION
    // =======================================================

    const isTouchPointer = (e) => {
      return (
        e.pointerType === 'touch' ||
        e.pointerType === 'pen'
      );
    };

    // =======================================================
    // FOLDER ACTION
    // =======================================================

    const handleFolderAction = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (item.type !== 'folder') {
        return;
      }

      onFolderClick?.(
        sourceItem,
        item
      );
    };

    // =======================================================
    // FILE ACTION
    // =======================================================

    const handleFileAction = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (item.type !== 'file') {
        return;
      }

      onFileClick?.(
        sourceItem,
        item
      );
    };

    // =======================================================
    // DESKTOP DOUBLE CLICK
    // =======================================================

    const handleDoubleClick = (e) => {
      // Touch / pen tidak menggunakan double click.
      // Mereka menggunakan pointerUp sebagai tap.
      if (isTouchPointer(e)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (item.type === 'folder') {
        onFolderDoubleClick?.(
          sourceItem,
          item
        );

        return;
      }

      if (item.type === 'file') {
        onFileDoubleClick?.(
          sourceItem,
          item
        );
      }
    };

    // =======================================================
    // TOUCH / PEN TAP
    // =======================================================

    const handlePointerUp = (e) => {
      if (!isTouchPointer(e)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (item.type === 'folder') {
        onFolderClick?.(
          sourceItem,
          item
        );

        return;
      }

      if (item.type === 'file') {
        onFileClick?.(
          sourceItem,
          item
        );
      }
    };

    // =======================================================
    // DESKTOP CLICK
    // =======================================================

    const handleClick = (e) => {
      // Touch / pen sudah ditangani pointerUp.
      if (isTouchPointer(e)) {
        return;
      }

      if (item.type === 'folder') {
        handleFolderAction(e);
        return;
      }

      if (item.type === 'file') {
        handleFileAction(e);
      }
    };

// =======================================================
// EXPANDER
// =======================================================

const handleExpanderClick = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!hasChildren) {
    return;
  }

  // "-" = BACK / COLLAPSE
  if (expanded) {
    onFolderCollapse?.(
      sourceItem,
      item
    );

    return;
  }

  // "+" = EXPAND
  toggleFolder(item);
};

// =======================================================
// EXPANDER POINTER UP
// =======================================================
// Touch / pen hanya menghentikan event agar
// tidak naik ke parent folder.
//
// Toggle tetap dilakukan oleh onClick.

const handleExpanderPointerUp = (e) => {
  if (!isTouchPointer(e)) {
    return;
  }

  e.stopPropagation();
};

    // =======================================================
    // NODE
    // =======================================================

    return (
      <React.Fragment key={nodeKey}>
        <div
          onClick={handleClick}
          onPointerUp={handlePointerUp}
          onDoubleClick={handleDoubleClick}

          style={{
            display: 'flex',
            alignItems: 'center',

            height: '20px',

            paddingLeft:
              `${level * 16}px`,

            paddingRight: '4px',

            fontFamily:
              'MS Sans Serif, sans-serif',

            fontSize: '11px',

backgroundColor:
  isSelected
    ? '#000080'
    : 'transparent',

color:
  isSelected
    ? 'white'
    : 'black',


            cursor: 'pointer',

            userSelect: 'none',

            whiteSpace: 'nowrap',

            boxSizing: 'border-box',

            // Sama seperti DesktopIcon
            touchAction: 'manipulation',
          }}
        >

     {/* =================================================
    EXPANDER
================================================= */}

{hasChildren ? (
  <div
    onClick={handleExpanderClick}
    onPointerUp={handleExpanderPointerUp}

    style={{
      width: '12px',
      minWidth: '12px',

      height: '20px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      textAlign: 'center',

      fontSize: '11px',

      cursor: 'pointer',

      color:
        isSelected ||
        isCurrentFolder
          ? 'white'
          : 'black',

      userSelect: 'none',

      touchAction: 'manipulation',

      flexShrink: 0,
    }}
  >
    {expanded ? '-' : '+'}
  </div>
) : (
  <div
    style={{
      width: '12px',
      minWidth: '12px',

      height: '20px',

      flexShrink: 0,
    }}
  />
)}

          {/* =================================================
              ICON
          ================================================= */}

          <div
            style={{
              width: '18px',
              minWidth: '18px',

              display: 'flex',

              alignItems: 'center',

              justifyContent: 'center',

              marginRight: '3px',

              pointerEvents: 'none',
            }}
          >
   {item.type === 'folder' ? (
  expanded ? (
    <FolderOpen
      variant="16x16_4"
    />
  ) : (
    <Folder
      variant="16x16_4"
    />
  )
) : (
  renderFileIcon(item.source?.iconType)
)}
          </div>

          {/* =================================================
              LABEL
          ================================================= */}

          <span
            style={{
              overflow: 'hidden',

              textOverflow: 'ellipsis',

              pointerEvents: 'none',

              lineHeight: '20px',
            }}
          >
            {item.name}
          </span>
        </div>

        {/* ===================================================
            CHILDREN
        =================================================== */}

        {hasChildren && expanded && (
          <div>
{item.children.map(
  (child, index) =>
    renderNode(
      child,
      level + 1,
      `${path}-${index}`
    )
)}
          </div>
        )}
      </React.Fragment>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        width: '100%',
        height: '100%',

        backgroundColor: 'white',

        overflow: 'auto',

        fontFamily:
          'MS Sans Serif, sans-serif',

        fontSize: '11px',

        boxSizing: 'border-box',

        userSelect: 'none',

        touchAction: 'manipulation',
      }}
    >
      {data.map((item) =>
        renderNode(item)
      )}
    </div>
  );
}
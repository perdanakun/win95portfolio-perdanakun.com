import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Notepad2,
  Wordpad,
  Shdocvw272,
} from '@react95/icons';

import holohealthIcon from '../assets/images/case-study/holohealthIcon.png';
import shipfasterIcon from '../assets/icons/shipfaster.svg';
import figmaIcon from '../assets/icons/figma.svg';
import githubIcon from '../assets/icons/github.svg';
import instagramIcon from '../assets/icons/instagram.svg';


export default function TreeDropdown({
  data = [],
  currentFolder = null,
  onFolderSelect,
  onFileSelect,
}) {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    expandedIds,
    setExpandedIds,
  ] = useState([]);

  const dropdownRef =
    useRef(null);

  // =========================================================
  // CLOSE WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
    };
  }, []);

  // =========================================================
  // CURRENT PATH
  // =========================================================

  const findPath = (
    items,
    targetId,
    parents = []
  ) => {
    if (!Array.isArray(items)) {
      return null;
    }

    for (const item of items) {
      if (item.id === targetId) {
        return [
          ...parents,
          item,
        ];
      }

      if (
        item.type === 'folder' &&
        Array.isArray(
          item.children
        )
      ) {
        const result =
          findPath(
            item.children,
            targetId,
            [
              ...parents,
              item,
            ]
          );

        if (result) {
          return result;
        }
      }
    }

    return null;
  };

  const currentPath =
    currentFolder
      ? findPath(
          data,
          currentFolder.id
        )
      : null;

  const currentLabel =
    currentFolder
      ? currentFolder.name
      : 'Projects';

  // =========================================================
  // TOGGLE
  // =========================================================

  const toggleFolder = (
    item
  ) => {
    setExpandedIds(
      (previous) => {
        if (
          previous.includes(
            item.id
          )
        ) {
          return previous.filter(
            (id) =>
              id !== item.id
          );
        }

        return [
          ...previous,
          item.id,
        ];
      }
    );
  };

  // =========================================================
  // SELECT
  // =========================================================

  const handleItemClick = (
    item
  ) => {
    if (!item) {
      return;
    }

    if (
      item.type === 'folder'
    ) {
      if (
        item.isLocked
      ) {
        alert(
          `${item.name}\n\n${item.message}`
        );

        return;
      }

      if (
        item.openWindow
      ) {
        window.dispatchEvent(
          new CustomEvent(
            'open-project-window',
            {
              detail: {
                windowName:
                  item.openWindow,
              },
            }
          )
        );

        setIsOpen(false);

        return;
      }

      onFolderSelect?.(
        item
      );

      setIsOpen(false);

      return;
    }

    if (
      item.openWindow
    ) {
      window.dispatchEvent(
        new CustomEvent(
          'open-project-window',
          {
            detail: {
              windowName:
                item.openWindow,
            },
          }
        )
      );

      setIsOpen(false);

      return;
    }

    if (item.link) {
      window.open(
        item.link,
        '_blank',
        'noopener,noreferrer'
      );

      setIsOpen(false);

      return;
    }

    onFileSelect?.(
      item
    );

    setIsOpen(false);
  };

  // =========================================================
  // ICON
  // =========================================================

  const renderIcon = (
    item,
    isExpanded
  ) => {
    if (
      item.type === 'folder'
    ) {
      if (
        isExpanded
      ) {
        return (
          <FolderOpen
            variant="16x16_4"
          />
        );
      }

      return (
        <Folder
          variant="16x16_4"
        />
      );
    }

    switch (
      item.iconType
    ) {
      case 'holohealth':
        return (
          <img
            src={
              holohealthIcon
            }
            alt=""
            style={{
              width: '18px',
              height: '18px',
              objectFit:
                'contain',
            }}
          />
        );

      case 'shipfaster':
        return (
          <img
            src={
              shipfasterIcon
            }
            alt="Shipfaster"
            style={{
              width: '16px',
              height: '16px',
              objectFit:
                'contain',
            }}
          />
        );

      case 'github':
        return (
          <img
            src={
              githubIcon
            }
            alt="github"
            style={{
              width: '16px',
              height: '16px',
              objectFit:
                'contain',
            }}
          />
        );

      case 'instagram':
        return (
          <img
            src={
              instagramIcon
            }
            alt="instagram"
            style={{
              width: '16px',
              height: '16px',
              objectFit:
                'contain',
            }}
          />
        );

      case 'figma':
         return (
           <img
             src={figmaIcon}
             alt="Figma"
             style={{
              width: '16px',
              height: '16px',
              objectFit:
                'contain',
            }}
          />
        );

      case 'website':
        return (
          <Shdocvw272
            variant="16x16_4"
          />
        );

      case 'caseStudy':
        return (
          <Notepad2
            variant="16x16_4"
          />
        );

      case 'documentation':
        return (
          <Wordpad
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

  // =========================================================
  // TREE NODE
  // =========================================================

  const renderNode = (
    item,
    depth = 0
  ) => {
    const isFolder =
      item.type === 'folder';

    const hasChildren =
      isFolder &&
      Array.isArray(
        item.children
      ) &&
      item.children.length >
        0;

    const isExpanded =
      expandedIds.includes(
        item.id
      );

    const isSelected =
      currentFolder?.id ===
      item.id;

    return (
      <React.Fragment
        key={item.id}
      >
        <div
          onClick={(event) => {
            event.stopPropagation();

            if (
              isFolder &&
              hasChildren
            ) {
              toggleFolder(
                item
              );
            }

            handleItemClick(
              item
            );
          }}

          style={{
            display:
              'flex',

            alignItems:
              'center',

            height:
              '22px',

            paddingLeft:
              `${4 + depth * 16}px`,

            paddingRight:
              '6px',

            gap:
              '2px',

            boxSizing:
              'border-box',

            cursor:
              item.isLocked
                ? 'not-allowed'
                : 'pointer',

            backgroundColor:
              isSelected
                ? '#000080'
                : 'transparent',

            color:
              isSelected
                ? 'white'
                : 'black',

            opacity:
              item.isLocked
                ? 0.55
                : 1,

            userSelect:
              'none',

            whiteSpace:
              'nowrap',
          }}
        >
          {/* EXPAND BUTTON */}

          <div
            style={{
              width:
                '14px',

              height:
                '16px',

              display:
                'flex',

              alignItems:
                'center',

              justifyContent:
                'center',

              flexShrink:
                0,
            }}
          >
            {isFolder &&
            hasChildren ? (
              isExpanded ? (
                <ChevronDown
                  variant="16x16_4"
                />
              ) : (
                <ChevronRight
                  variant="16x16_4"
                />
              )
            ) : null}
          </div>

          {/* ICON */}

          <div
            style={{
              width:
                '20px',

              height:
                '18px',

              display:
                'flex',

              alignItems:
                'center',

              justifyContent:
                'center',

              flexShrink:
                0,

              filter:
                item.isLocked
                  ? 'grayscale(100%)'
                  : 'none',
            }}
          >
            {renderIcon(
              item,
              isExpanded
            )}
          </div>

          {/* NAME */}

          <span
            style={{
              fontSize:
                '11px',

              lineHeight:
                '16px',

              overflow:
                'hidden',

              textOverflow:
                'ellipsis',
            }}
          >
            {item.name}
          </span>
        </div>

        {/* CHILDREN */}

        {isFolder &&
        hasChildren &&
        isExpanded
          ? item.children.map(
              (child) =>
                renderNode(
                  child,
                  depth + 1
                )
            )
          : null}
      </React.Fragment>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      ref={dropdownRef}

      style={{
        position:
          'relative',

        width:
          '100%',
      }}
    >
      {/* ===================================================
          CLOSED DROPDOWN
      =================================================== */}

      <div
        onClick={() =>
          setIsOpen(
            (previous) =>
              !previous
          )
        }

        style={{
          display:
            'flex',

          alignItems:
            'center',

          justifyContent:
            'space-between',

          height:
            '22px',

          minHeight:
            '22px',

          padding:
            '0 3px 0 5px',

          backgroundColor:
            '#ffffff',

          border:
            '1px solid #808080',

          boxShadow:
            'inset 1px 1px 0 #0a0a0a, inset -1px -1px 0 #dfdfdf',

          boxSizing:
            'border-box',

          cursor:
            'pointer',

          userSelect:
            'none',
        }}
      >
        <div
          style={{
            display:
              'flex',

            alignItems:
              'center',

            gap:
              '5px',

            minWidth:
              0,

            overflow:
              'hidden',
          }}
        >
          {currentFolder ? (
            renderIcon(
              currentFolder,
              false
            )
          ) : (
            <Folder
              variant="16x16_4"
            />
          )}

          <span
            style={{
              fontSize:
                '11px',

              overflow:
                'hidden',

              textOverflow:
                'ellipsis',

              whiteSpace:
                'nowrap',
            }}
          >
            {currentLabel}
          </span>
        </div>

        <div
          style={{
            display:
              'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            width:
              '16px',

            height:
              '16px',

            flexShrink:
              0,
          }}
        >
          {isOpen ? (
            <ChevronDown
              variant="16x16_4"
            />
          ) : (
            <ChevronRight
              variant="16x16_4"
            />
          )}
        </div>
      </div>

      {/* ===================================================
          OPEN TREE
      =================================================== */}

      {isOpen && (
        <div
          style={{
            position:
              'absolute',

            top:
              '24px',

            left:
              0,

            right:
              0,

            zIndex:
              9999,

            maxHeight:
              '280px',

            overflowY:
              'auto',

            overflowX:
              'hidden',

            backgroundColor:
              '#ffffff',

            border:
              '1px solid #808080',

            boxShadow:
              '2px 2px 0 #000000',

            padding:
              '2px 0',

            boxSizing:
              'border-box',
          }}
        >
          {/* ROOT */}

          <div
            onClick={(event) => {
              event.stopPropagation();

              onFolderSelect?.(
                null
              );

              setIsOpen(
                false
              );
            }}

            style={{
              display:
                'flex',

              alignItems:
                'center',

              height:
                '22px',

              paddingLeft:
                '5px',

              paddingRight:
                '6px',

              gap:
                '5px',

              cursor:
                'pointer',

              backgroundColor:
                !currentFolder
                  ? '#000080'
                  : 'transparent',

              color:
                !currentFolder
                  ? 'white'
                  : 'black',

              userSelect:
                'none',
            }}
          >
            <Folder
              variant="16x16_4"
            />

            <span
              style={{
                fontSize:
                  '11px',
              }}
            >
              Projects
            </span>
          </div>

          {/* TREE */}

          {data.map(
            (item) =>
              renderNode(
                item,
                0
              )
          )}
        </div>
      )}
    </div>
  );
}

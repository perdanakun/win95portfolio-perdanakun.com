import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Back,
  FileText,
  Folder,
  FolderOpen,
  Notepad2,
  Shdocvw272,
  Wordpad,
  Url1102,
} from '@react95/icons';

import {
  Button,
} from '@react95/core';


import arrowDownIcon from '../assets/icons/arrow_down.png';


import holohealthIcon from '../assets/images/case-study/holohealthIcon.png';
import shipfasterIcon from '../assets/icons/shipfaster.svg';
import mayoraIcon from '../assets/icons/mayora.svg';
import figmaIcon from "../assets/icons/figma.svg";
import githubIcon from "../assets/icons/github.svg";
import instagramIcon from "../assets/icons/instagram.svg";

import LocalTree from './LocalTree';


export default function ProjectFolderContent({
  isTouchDevice,
}) {
  // =========================================================
  // RESPONSIVE STATE
  // =========================================================

  const [
    isMobile,
    setIsMobile,
  ] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(
        window.innerWidth <= 700
      );
    };

    checkScreenSize();

    window.addEventListener(
      'resize',
      checkScreenSize
    );

    return () => {
      window.removeEventListener(
        'resize',
        checkScreenSize
      );
    };
  }, []);

  // =========================================================
  // DEVICE MODE
  // =========================================================

  const isTouch =
    isTouchDevice ||
    isMobile;

  // =========================================================
  // STATE
  // =========================================================

  const [
    currentFolder,
    setCurrentFolder,
  ] = useState(null);

  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);

  const [
    expandedIds,
    setExpandedIds,
  ] = useState([]);

  const [
    isDropdownOpen,
    setIsDropdownOpen,
  ] = useState(false);

  const [
    resetTree,
    setResetTree,
  ] = useState(false);

  const dropdownRef =
    useRef(null);

  // =========================================================
  // PROJECT DATA
  // =========================================================

  const projects = [
    {
      id: 'visual-design',
      name: 'Visual Design',
      type: 'folder',
      iconType: 'folder',
      isLocked: false,
      message: '',
      children: [
        {
          id: 'holohealth',
          name: 'HoloHealth',
          type: 'folder',
          iconType: 'folder',
          isLocked: false,
          message: '',
          children: [
             {
              id: 'holohealth-case-study',
              name: 'Case Studies',
              type: 'file',
              iconType: 'website',
              openWindow: 'holohealth',
            },
            {
              id: 'holohealth-icon-system',
              name: 'Holoealth',
              type: 'file',
              iconType: 'holohealth',
              link: 'https://holo.health/',
            },
          ],
        },

        {
          id: 'ship-ui',
          name: 'Ship UI',
          type: 'folder',
          iconType: 'folder',
          isLocked: false,
          children: [
             {
              id: 'ship-ui-case-study',
              name: 'Case Studies',
              type: 'file',
              iconType: 'website',
              openWindow: 'ship-ui',
            },
            {
              id: 'ship-ui-live-preview',
              name: 'Live Preview',
              type: 'file',
              iconType: 'figma',
              openWindow: 'ship-ui-figma',
            },
            {
              id: 'ship-ui-icon-system',
              name: 'Shipfaster UI',
              type: 'file',
              iconType: 'shipfaster',
              link: 'https://www.shipfasterui.com/',
            },
          ],
        },

        {
          id: 'mayora',
          name: 'Mayora',
          type: 'folder',
          iconType: 'folder',
          isLocked: false,
          children: [
             {
              id: 'mayora-case-study',
              name: 'Case Studies',
              type: 'file',
              iconType: 'website',
              openWindow: 'mayora',
            },
            {
              id: 'mayora-icon-system',
              name: 'Mayora Official',
              type: 'file',
              iconType: 'mayora',
              link: 'https://www.instagram.com/mayoraofficial/',
            },
          ],
        },
      ],
    },

    {
      id: 'product-design',
      name: 'Product Design',
      type: 'folder',
      iconType: 'folder',
      isLocked: false,
      message: '',
      children: [
        {
          id: 'perdana-computer-product',
          name: "Perdana's Computer",
          type: 'folder',
          iconType: 'folder',
          isLocked: false,
          children: [
        {
          id: 'pc-product-overview',
          name: 'Overview',
          type: 'file',
          iconType: 'file',
          openWindow: 'perdana-computer-product',
        },
        {
          id: 'pc-product-case-studies',
          name: 'Case Studies',
          type: 'file',
          iconType: 'website',
          openWindow: 'perdana-computer-product',
        },
            
            {
              id: 'pc-features',
              name: 'Features',
              type: 'folder',
              iconType: 'folder',
              isLocked: true,
              message: 'This folder is still on progress!',
              children: [
                {
                  id: 'pc-installer',
                  name: 'Installer',
                  type: 'file',
                  iconType: 'documentation',
                },
                {
                  id: 'pc-project-folder',
                  name: 'Project Folder',
                  type: 'file',
                  iconType: 'documentation',
                },
                {
                  id: 'pc-ai-chat',
                  name: 'AI Chat',
                  type: 'file',
                  iconType: 'documentation',
                },
                {
                  id: 'pc-contact',
                  name: 'Contact',
                  type: 'file',
                  iconType: 'documentation',
                },
                {
                  id: 'pc-writing',
                  name: 'Writing',
                  type: 'file',
                  iconType: 'documentation',
                },
                {
                  id: 'pc-did-you-know',
                  name: 'Did You Know?',
                  type: 'file',
                  iconType: 'documentation',
                },
                {
                  id: 'pc-gimmicks',
                  name: 'Gimmicks & Easter Eggs',
                  type: 'file',
                  iconType: 'caseStudy',
                },
              ],
            },
          ],
        },
      {
       id: 'hotel booking',
       name: 'Hotel Booking',
       type: 'folder',
       iconType: 'folder',
       isLocked: true,
       message: 'This folder is still on progress!',
      },
      ],
    },

    {
      id: 'design-engineering',
      name: 'Design Engineering',
      type: 'folder',
      iconType: 'folder',
      isLocked: false,
      message: '',
      children: [
        {
          id: 'perdana-computer-engineering',
          name: "Perdana's Computer",
          type: 'folder',
          iconType: 'folder',
          isLocked: true,
          message:
            'This folder is currently unavailable.',
          children: [
            {
              id: 'pc-engineering-overview',
              name: 'Overview',
              type: 'file',
              iconType: 'caseStudy',
            },
            {
              id: 'pc-architecture',
              name: 'Architecture',
              type: 'file',
              iconType: 'documentation',
            },
            {
              id: 'pc-design-system',
              name: 'Design System',
              type: 'file',
              iconType: 'documentation',
            },
            {
              id: 'pc-interaction',
              name: 'Interaction',
              type: 'file',
              iconType: 'documentation',
            },
            {
              id: 'pc-build',
              name: 'Build',
              type: 'file',
              iconType: 'github',
              link:
                'https://github.com/perdanakun/perdanakun.com',
            },
          ],
        },
      ],
    },
  ];

  // =========================================================
  // HELPERS
  // =========================================================

  const getChildren = (
    folder
  ) => {
    if (!folder) {
      return [];
    }

    return Array.isArray(
      folder.children
    )
      ? folder.children
      : [];
  };

  // =========================================================
  // FIND PARENT FOLDER
  // =========================================================

  const findParentFolder = (
    items,
    targetId,
    parent = null
  ) => {
    if (!Array.isArray(items)) {
      return null;
    }

    for (const item of items) {
      if (item.type !== 'folder') {
        continue;
      }

      if (item.id === targetId) {
        return parent;
      }

      const result =
        findParentFolder(
          item.children,
          targetId,
          item
        );

      if (result !== null) {
        return result;
      }
    }

    return null;
  };

  // =========================================================
  // FIND FOLDER PATH
  // =========================================================

  const findFolderPath = (
    items,
    targetId,
    path = []
  ) => {
    if (!Array.isArray(items)) {
      return null;
    }

    for (const item of items) {
      if (item.type !== 'folder') {
        continue;
      }

      const nextPath = [
        ...path,
        item,
      ];

      if (item.id === targetId) {
        return nextPath;
      }

      const result =
        findFolderPath(
          item.children,
          targetId,
          nextPath
        );

      if (result) {
        return result;
      }
    }

    return null;
  };

  // =========================================================
  // BUILD TREE DATA
  // =========================================================

  const buildTreeData = (
    items
  ) => {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.map(
      (item) => {
        const isFolder =
          item.type === 'folder';

        return {
          treeId:
            `${isFolder ? 'folder' : 'file'}-${item.id}`,

          type:
            item.type,

          id:
            item.id,

          name:
            item.name,

          link:
            item.link,

          iconType:
            item.iconType,

          isLocked:
            item.isLocked ||
            false,

          message:
            item.message ||
            '',

          source:
            item,

          children:
            isFolder
              ? buildTreeData(
                  item.children
                )
              : [],
        };
      }
    );
  };

  const treeData =
    buildTreeData(
      projects
    );

  // =========================================================
  // ICONS
  // =========================================================

  const renderFolderIcon = (
    folder,
    size = '16x16_4'
  ) => {
    if (
      folder?.id ===
      currentFolder?.id
    ) {
      return (
        <FolderOpen
          variant={size}
        />
      );
    }

    return (
      <Folder
        variant={size}
      />
    );
  };

  const renderFileIcon = (
    type,
    size = '16x16_4'
  ) => {
    switch (type) {
      case 'holohealth':
        return (
          <img
            src={holohealthIcon}
            alt="HoloHealth"
            style={{
              width:
                size === '32x32_4'
                  ? '45px'
                  : '20px',

              height:
                size === '32x32_4'
                  ? '45px'
                  : '20px',

              objectFit:
                'contain',
            }}
          />
        );


        case 'shipfaster':
        return (
          <img
            src={shipfasterIcon}
            alt="Shipfaster"
            style={{
              width:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              height:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              objectFit:
                'contain',
            }}
          />
        );

         case 'mayora':
        return (
          <img
            src={mayoraIcon}
            alt="Mayora"
            style={{
              width:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              height:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              objectFit:
                'contain',
            }}
          />
        );
      case 'github':
        return (
          <img
            src={githubIcon}
            alt="GitHub"
            style={{
              width:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              height:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              objectFit:
                'contain',
            }}
          />
        );

      case 'instagram':
        return (
          <img
            src={instagramIcon}
            alt="Instagram"
            style={{
              width:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              height:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

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
              width:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              height:
                size === '32x32_4'
                  ? '32px'
                  : '16px',

              objectFit:
                'contain',
            }}
          />
        );

      case 'website':
        return (
          <Url1102
            variant={size}
          />
        );

      case 'caseStudy':
        return (
          <Notepad2
            variant={size}
          />
        );

      case 'documentation':
        return (
          <Wordpad
            variant={size}
          />
        );

      default:
        return (
          <FileText
            variant={size}
          />
        );
    }
  };

  // =========================================================
  // OPEN EXTERNAL LINK
  // =========================================================

  const openExternalLink = (
    url
  ) => {
    if (!url) {
      return;
    }

    window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  };

  // =========================================================
  // OPEN PROJECT WINDOW
  // =========================================================

  const openProjectWindow = (
    windowName
  ) => {
    if (!windowName) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(
        'open-project-window',
        {
          detail: {
            windowName,
          },
        }
      )
    );

    setIsDropdownOpen(
      false
    );
  };

  // =========================================================
  // OPEN FOLDER
  // =========================================================

  const openFolder = (
    folder
  ) => {
    if (!folder) {
      return;
    }

    if (folder.isLocked) {
      alert(
        `${folder.name}\n\n${folder.message}`
      );

      return;
    }

    setCurrentFolder(
      folder
    );

    setSelectedItem(
      null
    );

    setIsExpandedForFolder(
      folder
    );

    setIsDropdownOpen(
      false
    );
  };

  // =========================================================
  // EXPAND FOLDER IN TREE
  // =========================================================

  const setIsExpandedForFolder = (
    folder
  ) => {
    if (!folder) {
      return;
    }

    const treeId =
      `folder-${folder.id}`;

    setExpandedIds(
      (previous) => {
        if (
          previous.includes(
            treeId
          )
        ) {
          return previous;
        }

        return [
          ...previous,
          treeId,
        ];
      }
    );
  };

  // =========================================================
  // FOLDER CLICK
  // =========================================================

  const handleFolderClick = (
    folder
  ) => {
    if (!folder) {
      return;
    }

    // -------------------------------------------------------
    // TOUCH / MOBILE
    // -------------------------------------------------------

    if (isTouch) {
      if (
        folder.openWindow
      ) {
        openProjectWindow(
          folder.openWindow
        );

        return;
      }

      openFolder(
        folder
      );

      return;
    }

    // -------------------------------------------------------
    // DESKTOP
    // -------------------------------------------------------

    setSelectedItem({
      type:
        'folder',

      id:
        folder.id,
    });
  };

  // =========================================================
  // FOLDER DOUBLE CLICK
  // =========================================================

  const handleFolderDoubleClick = (
    folder
  ) => {
    if (!folder) {
      return;
    }

    if (isTouch) {
      return;
    }

    if (
      folder.openWindow
    ) {
      openProjectWindow(
        folder.openWindow
      );

      return;
    }

    openFolder(
      folder
    );
  };

  // =========================================================
  // FILE CLICK
  // =========================================================

  const handleFileClick = (
    file
  ) => {
    if (!file) {
      return;
    }

    // -------------------------------------------------------
    // TOUCH / MOBILE
    // -------------------------------------------------------

    if (isTouch) {
      if (
        file.openWindow
      ) {
        openProjectWindow(
          file.openWindow
        );

        return;
      }

      if (file.link) {
        openExternalLink(
          file.link
        );
      }

      return;
    }

    // -------------------------------------------------------
    // DESKTOP
    // -------------------------------------------------------

    setSelectedItem({
      type:
        'file',

      id:
        file.id,
    });
  };

  // =========================================================
  // FILE DOUBLE CLICK
  // =========================================================

  const handleFileDoubleClick = (
    file
  ) => {
    if (!file) {
      return;
    }

    if (isTouch) {
      return;
    }

    if (
      file.openWindow
    ) {
      openProjectWindow(
        file.openWindow
      );

      return;
    }

    if (file.link) {
      openExternalLink(
        file.link
      );
    }
  };

  // =========================================================
  // TREE FOLDER
  // =========================================================

  const handleTreeFolderClick = (
    item
  ) => {
    if (!item) {
      return;
    }

    handleFolderClick(
      item.source ||
        item
    );
  };

  const handleTreeFolderDoubleClick = (
    item
  ) => {
    if (!item) {
      return;
    }

    handleFolderDoubleClick(
      item.source ||
        item
    );
  };

  // =========================================================
  // TREE FILE
  // =========================================================

  const handleTreeFileClick = (
    item
  ) => {
    if (!item) {
      return;
    }

    handleFileClick(
      item.source ||
        item
    );
  };

  const handleTreeFileDoubleClick = (
    item
  ) => {
    if (!item) {
      return;
    }

    handleFileDoubleClick(
      item.source ||
        item
    );
  };

  // =========================================================
  // TREE TOGGLE
  // =========================================================

  const handleTreeToggle = (
    item,
    nextExpandedIds
  ) => {
    setExpandedIds(
      nextExpandedIds
    );
  };

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = () => {
    if (!currentFolder) {
      return;
    }

    const parentFolder =
      findParentFolder(
        projects,
        currentFolder.id
      );

    setCurrentFolder(
      parentFolder
    );

    setSelectedItem(
      null
    );

    setIsDropdownOpen(
      false
    );

    if (parentFolder) {
      setExpandedIds(
        (previous) => {
          const parentTreeId =
            `folder-${parentFolder.id}`;

          return previous.filter(
            (id) =>
              id ===
              parentTreeId
          );
        }
      );
    } else {
      setExpandedIds(
        []
      );
    }
  };

  // =========================================================
  // TREE COLLAPSE
  // =========================================================

  const handleTreeFolderCollapse = () => {
    handleBack();
  };

  // =========================================================
  // EMPTY EXPLORER AREA
  // =========================================================

  const handleExplorerClick = () => {
    setSelectedItem(
      null
    );
  };

  // =========================================================
  // DROPDOWN TOGGLE
  // =========================================================

  const handleDropdownToggle = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDropdownOpen(
      (previous) =>
        !previous
    );
  };

  // =========================================================
  // CLOSE DROPDOWN OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        !dropdownRef.current
      ) {
        return;
      }

      if (
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setIsDropdownOpen(
          false
        );
      }
    };

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    );

    document.addEventListener(
      'touchstart',
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );

      document.removeEventListener(
        'touchstart',
        handleOutsideClick
      );
    };
  }, []);

  // =========================================================
  // DROPDOWN TREE NODE
  // =========================================================

  const renderDropdownNode = (
    item,
    level = 0
  ) => {
    if (!item) {
      return null;
    }

    const isFolder =
      item.type ===
      'folder';

    const isCurrent =
      isFolder &&
      currentFolder?.id ===
        item.id;

    const isSelected =
      selectedItem?.type ===
        item.type &&
      selectedItem?.id ===
        item.id;

    const indent =
      level * 16;

    // =======================================================
    // FOLDER
    // =======================================================

    if (isFolder) {
      return (
        <React.Fragment
          key={item.id}
        >
          <div
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              handleFolderClick(
                item
              );
            }}

            onDoubleClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              handleFolderDoubleClick(
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

              minHeight:
                '22px',

              paddingLeft:
                `${indent + 4}px`,

              paddingRight:
                '4px',

              boxSizing:
                'border-box',

              backgroundColor:
                isSelected

                  ? '#000080'
                  : '#ffffff',

              color:
                isSelected

                  ? '#ffffff'
                  : '#000000',

              fontFamily:
                'MS Sans Serif, sans-serif',

              fontSize:
                '11px',

              cursor:
                item.isLocked
                  ? 'not-allowed'
                  : 'pointer',

              userSelect:
                'none',

              whiteSpace:
                'nowrap',

              touchAction:
                'manipulation',

              WebkitTapHighlightColor:
                'transparent',

              opacity:
                item.isLocked
                  ? 0.55
                  : 1,
            }}
          >
            <div
              style={{
                width:
                  '18px',

                minWidth:
                  '18px',

                height:
                  '18px',

                display:
                  'flex',

                alignItems:
                  'center',

                justifyContent:
                  'center',

                marginRight:
                  '4px',

                pointerEvents:
                  'none',
              }}
            >
              {renderFolderIcon(
                item
              )}
            </div>

            <span
              style={{
                overflow:
                  'hidden',

                textOverflow:
                  'ellipsis',

                whiteSpace:
                  'nowrap',

                lineHeight:
                  '20px',

                pointerEvents:
                  'none',
              }}
            >
              {item.name}
            </span>
          </div>

          {/* CHILDREN */}

          {Array.isArray(
            item.children
          ) &&
            item.children.map(
              (child) =>
                renderDropdownNode(
                  child,
                  level + 1
                )
            )}
        </React.Fragment>
      );
    }

    // =======================================================
    // FILE
    // =======================================================

    return (
      <div
        key={item.id}

        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          handleFileClick(
            item
          );

          setIsDropdownOpen(
            false
          );
        }}

        onDoubleClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          handleFileDoubleClick(
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

          minHeight:
            '22px',

          paddingLeft:
            `${indent + 4}px`,

          paddingRight:
            '4px',

          boxSizing:
            'border-box',

          backgroundColor:
            isSelected
              ? '#000080'
              : '#ffffff',

          color:
            isSelected
              ? '#ffffff'
              : '#000000',

          fontFamily:
            'MS Sans Serif, sans-serif',

          fontSize:
            '11px',

          cursor:
            item.link ||
            item.openWindow
              ? 'pointer'
              : 'default',

          userSelect:
            'none',

          whiteSpace:
            'nowrap',

          touchAction:
            'manipulation',

          WebkitTapHighlightColor:
            'transparent',
        }}
      >
        <div
          style={{
            width:
              '18px',

            minWidth:
              '18px',

            height:
              '18px',

            display:
              'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            marginRight:
              '4px',

            pointerEvents:
              'none',
          }}
        >
          {renderFileIcon(
            item.iconType
          )}
        </div>

        <span
          style={{
            overflow:
              'hidden',

            textOverflow:
              'ellipsis',

            whiteSpace:
              'nowrap',

            lineHeight:
              '20px',

            pointerEvents:
              'none',
          }}
        >
          {item.name}
        </span>
      </div>
    );
  };

  // =========================================================
  // CURRENT FOLDER NAME
  // =========================================================

  const currentFolderName =
    currentFolder
      ? currentFolder.name
      : 'C:\\';

  // =========================================================
  // CURRENT FOLDER PATH
  // =========================================================

  const currentFolderPath =
    currentFolder
      ? findFolderPath(
          projects,
          currentFolder.id
        )
      : [];

  // =========================================================
  // CURRENT CHILDREN
  // =========================================================

  const currentChildren =
    currentFolder
      ? getChildren(
          currentFolder
        )
      : projects;

  // =========================================================
  // OBJECT COUNT
  // =========================================================

  const currentObjectCount =
    currentChildren.length;

  // =========================================================
  // EXPLORER ITEM
  // =========================================================

  const renderExplorerItem = (
    item
  ) => {
    if (!item) {
      return null;
    }

    const isFolder =
      item.type ===
      'folder';

    const isSelected =
      selectedItem?.type ===
        item.type &&
      selectedItem?.id ===
        item.id;

    // =======================================================
    // FOLDER
    // =======================================================

    if (isFolder) {
      return (
        <div
          key={item.id}

          onClick={(event) => {
            event.stopPropagation();

            handleFolderClick(
              item
            );
          }}

          onDoubleClick={(event) => {
            event.stopPropagation();

            handleFolderDoubleClick(
              item
            );
          }}

          style={{
            display:
              'flex',

            flexDirection:
              'column',

            alignItems:
              'center',

            justifyContent:
              'flex-start',

            width:
              'var(--explorer-item-width)',

            minHeight:
              'var(--explorer-item-height)',

            cursor:
              item.isLocked
                ? 'not-allowed'
                : 'pointer',

            userSelect:
              'none',

            padding:
              '4px',

            textAlign:
              'center',

            boxSizing:
              'border-box',

            backgroundColor:
              isSelected
                ? '#000080'
                : 'transparent',

            color:
              isSelected
                ? '#ffffff'
                : '#000000',

            touchAction:
              'manipulation',

            WebkitTapHighlightColor:
              'transparent',
          }}
        >
          <div
            style={{
              marginBottom:
                '0px',

              opacity:
                item.isLocked
                  ? 0.55
                  : 1,

              filter:
                item.isLocked
                  ? 'grayscale(100%)'
                  : 'none',

              pointerEvents:
                'none',
            }}
          >
            {renderFolderIcon(
              item,
              '32x32_4'
            )}
          </div>

          <span
            style={{
              fontSize:
                '11px',

              lineHeight:
                '1.2',

              width:
                '100%',

              textAlign:
                'center',

              wordBreak:
                'normal',

              overflowWrap:
                'break-word',

              pointerEvents:
                'none',
            }}
          >
            {item.name}
          </span>
        </div>
      );
    }

    // =======================================================
    // FILE
    // =======================================================

    return (
      <div
        key={item.id}

        onClick={(event) => {
          event.stopPropagation();

          handleFileClick(
            item
          );
        }}

        onDoubleClick={(event) => {
          event.stopPropagation();

          handleFileDoubleClick(
            item
          );
        }}

        style={{
          display:
            'flex',

          flexDirection:
            'column',

          alignItems:
            'center',

          justifyContent:
            'flex-start',

          width:
            'var(--explorer-item-width)',

          minHeight:
            'var(--explorer-item-height)',

          cursor:
            item.link ||
            item.openWindow
              ? 'pointer'
              : 'default',

          userSelect:
            'none',

          padding:
            '4px',

          textAlign:
            'center',

          boxSizing:
            'border-box',

          backgroundColor:
            isSelected
              ? '#000080'
              : 'transparent',

          color:
            isSelected
              ? '#ffffff'
              : '#000000',

          touchAction:
            'manipulation',

          WebkitTapHighlightColor:
            'transparent',
        }}
      >
        <div
          style={{
            marginBottom:
              '8px',

            pointerEvents:
              'none',

            display:
              'flex',

            alignItems:
              'center',

            justifyContent:
              'center',

            width:
              '32px',

            height:
              '32px',
          }}
        >
          {renderFileIcon(
            item.iconType,
            '32x32_4'
          )}
        </div>

        <span
          style={{
            fontSize:
              '11px',

            lineHeight:
              '1.2',

            width:
              '100%',

            textAlign:
              'center',

            wordBreak:
              'normal',

            overflowWrap:
              'break-word',

            pointerEvents:
              'none',
          }}
        >
          {item.name}
        </span>
      </div>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        '--explorer-item-width':
          isMobile
            ? '90px'
            : '120px',

        '--explorer-item-height':
          isMobile
            ? '60px'
            : '70px',

        display:
          'flex',

        flexDirection:
          'column',

        height:
          '100%',

        width:
          '100%',

        minWidth:
          0,

        fontFamily:
          'MS Sans Serif, sans-serif',
      }}
    >
      {/* =====================================================
          MENU BAR
      ===================================================== */}

      <div
        style={{
          display:
            'flex',

          alignItems:
            'center',

          gap:
            isMobile
              ? '4px'
              : '6px',

          padding:
            isMobile
              ? '3px 5px'
              : '2px 6px',

          backgroundColor:
            '#c0c0c0',

          borderBottom:
            '1px solid #808080',

          fontSize:
            '11px',

          userSelect:
            'none',

          flexShrink:
            0,
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
          <u>N</u>ew
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

      {/* =====================================================
          DROPDOWN + BACK
      ===================================================== */}

      <div
        ref={
          dropdownRef
        }

        style={{
          position:
            'relative',

          display:
            'flex',

          alignItems:
            'center',

          gap:
            '4px',

          padding:
            isMobile
              ? '4px'
              : '3px 4px',

          backgroundColor:
            '#c0c0c0',

          borderBottom:
            '1px solid #808080',

          flexShrink:
            0,

          boxSizing:
            'border-box',

          zIndex:
            100,
        }}
      >
        {/* ===================================================
            DROPDOWN
        =================================================== */}

        <div
          style={{
            position:
              'relative',

            flex:
              1,

            minWidth:
              0,
          }}
        >
<div
  onClick={handleDropdownToggle}

  style={{
    width:
      '100%',

    height:
      isMobile
        ? '24px'
        : '22px',

    display:
      'flex',

    alignItems:
      'center',

    justifyContent:
      'space-between',

    padding:
      '1px 2px 1px 4px',

    backgroundColor:
      '#ffffff',

    color:
      '#000000',

    border:
      '1px solid #808080',

    borderTopColor:
      '#404040',

    borderLeftColor:
      '#404040',

    borderRightColor:
      '#ffffff',

    borderBottomColor:
      '#ffffff',

    fontFamily:
      'MS Sans Serif, sans-serif',

    fontSize:
      '11px',

    textAlign:
      'left',

    cursor:
      'pointer',

    boxSizing:
      'border-box',

    userSelect:
      'none',

    touchAction:
      'manipulation',

    WebkitTapHighlightColor:
      'transparent',
  }}
>
            <span
              style={{
                display:
                  'flex',

                alignItems:
                  'center',

                minWidth:
                  0,

                overflow:
                  'hidden',
              }}
            >
              <span
                style={{
                  width:
                    '18px',

                  minWidth:
                    '18px',

                  height:
                    '18px',

                  display:
                    'flex',

                  alignItems:
                    'center',

                  justifyContent:
                    'center',

                  marginRight:
                    '4px',
                }}
              >
                {currentFolder ? (
                  renderFolderIcon(
                    currentFolder
                  )
                ) : (
                  <Folder
                    variant="16x16_4"
                  />
                )}
              </span>

              <span
                style={{
                  overflow:
                    'hidden',

                  textOverflow:
                    'ellipsis',

                  whiteSpace:
                    'nowrap',
                }}
              >
                {currentFolderName}
              </span>
            </span>

            {/* ARROW */}

<Button
  onClick={(event) => {
    event.stopPropagation();
    handleDropdownToggle(event);
  }}
  style={{
    width: '18px',
    minWidth: '18px',
    height: '18px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: '4px',

    padding: 0,

    boxSizing: 'border-box',
  }}
>
  <img
    src={arrowDownIcon}
    alt=""
    style={{
      width: '8px',
      height: '8px',

      objectFit: 'contain',

      transform:
        isDropdownOpen
          ? 'rotate(180deg)'
          : 'none',

      imageRendering: 'pixelated',

      pointerEvents: 'none',
    }}
  />
</Button>


         </div>

          {/* =================================================
              DROPDOWN PANEL
          ================================================= */}

          {isDropdownOpen && (
            <div
              style={{
                position:
                  'absolute',

                top:
                  'calc(100% + 1px)',

                left:
                  0,

                right:
                  0,

                maxHeight:
                  isMobile
                    ? '260px'
                    : '320px',

                overflowY:
                  'auto',

                overflowX:
                  'hidden',

                backgroundColor:
                  '#ffffff',

                border:
                  '1px solid #000000',

                boxShadow:
                  '2px 2px 0px rgba(0, 0, 0, 0.35)',

                zIndex:
                  9999,

                boxSizing:
                  'border-box',

                padding:
                  '1px 0',
              }}
            >
              {/* ROOT */}

              <div
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  setCurrentFolder(
                    null
                  );

                  setSelectedItem(
                    null
                  );

                  setExpandedIds(
                    []
                  );

                  setIsDropdownOpen(
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

                  minHeight:
                    '22px',

                  paddingLeft:
                    '4px',

                  paddingRight:
                    '4px',

                  backgroundColor:
                    !currentFolder
                      ? '#000080'
                      : '#ffffff',

                  color:
                    !currentFolder
                      ? '#ffffff'
                      : '#000000',

                  fontFamily:
                    'MS Sans Serif, sans-serif',

                  fontSize:
                    '11px',

                  cursor:
                    'pointer',

                  userSelect:
                    'none',

                  whiteSpace:
                    'nowrap',

                  touchAction:
                    'manipulation',

                  WebkitTapHighlightColor:
                    'transparent',
                }}
              >
                <div
                  style={{
                    width:
                      '18px',

                    minWidth:
                      '18px',

                    height:
                      '18px',

                    display:
                      'flex',

                    alignItems:
                      'center',

                    justifyContent:
                      'center',

                    marginRight:
                      '4px',
                  }}
                >
                  <Folder
                    variant="16x16_4"
                  />
                </div>

                <span>
                  C:\
                </span>
              </div>

              {/* TREE */}

              {projects.map(
                (item) =>
                  renderDropdownNode(
                    item,
                    0
                  )
              )}
            </div>
          )}
        </div>

        {/* ===================================================
            BACK BUTTON
        =================================================== */}

       <Button
  onClick={handleBack}
  disabled={!currentFolder}
  style={{
    height:
      isMobile
        ? '24px'
        : '22px',

    minWidth:
      isMobile
        ? '38px'
        : '40px',

    padding:
      '1px 7px',

    display:
      'flex',

    alignItems:
      'center',

    justifyContent:
      'center',

    gap:
      '4px',

    fontFamily:
      'MS Sans Serif, sans-serif',

    fontSize:
      '11px',

    boxSizing:
      'border-box',
  }}
>
  <Back
    variant="16x16_4"
  />

</Button>

      </div>
      {/* =====================================================
          DIRECTORY HEADER
      ===================================================== 

      <div
        style={{
          display: 'flex',
          alignItems: 'center',

          height: '22px',
          minHeight: '22px',

          backgroundColor: '#c0c0c0',

          borderBottom:
            '1px solid #808080',

          fontFamily:
            'MS Sans Serif, sans-serif',

          fontSize: '11px',

          userSelect: 'none',

          flexShrink: 0,

          boxSizing: 'border-box',
        }}
      >
        {/* LEFT — ALL FOLDER 

        <div
          style={{
            width: '180px',
            minWidth: '180px',

            height: '100%',

            display: 'flex',
            alignItems: 'center',

            padding:
              '0 6px',

            boxSizing:
              'border-box',

            borderRight:
              '1px solid #808080',

            overflow:
              'hidden',

            whiteSpace:
              'nowrap',

            textOverflow:
              'ellipsis',

            color: '#000',
          }}
        >
          All Folder
        </div>

        {/* RIGHT — CONTENTS OF 

        <div
          style={{
            flex: 1,

            minWidth: 0,

            height: '100%',

            display: 'flex',
            alignItems: 'center',

            padding:
              '0 6px',

            boxSizing:
              'border-box',

            overflow:
              'hidden',

            whiteSpace:
              'nowrap',

            textOverflow:
              'ellipsis',

            color: '#000',
          }}
        >
          Contents of&nbsp;
          <span>
            "{currentFolder?.name || 'C:\\'}"
          </span>
        </div>
      </div>


      {/* =====================================================
          MAIN EXPLORER
      ===================================================== */}

      <div
        style={{
          flex:
            1,

          display:
            'flex',

          minHeight:
            0,

          minWidth:
            0,

          backgroundColor:
            'white',

          overflow:
            'hidden',

          margin:
            '1px',

          boxShadow:
            'inset 1px 1px 0px #0a0a0a, inset -1px -1px 0px #dfdfdf',
        }}
      >
        {/* ===================================================
            LEFT TREE
        =================================================== */}

        {!isMobile && (
          <div
            style={{
              width:
                '180px',

              minWidth:
                '180px',

              backgroundColor:
                '#ffffff',

              overflow:
                'auto',

              borderRight:
                '1px solid #808080',

              padding:
                '4px',

              boxSizing:
                'border-box',

              touchAction:
                'pan-y',

              flexShrink:
                0,
            }}

            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <LocalTree
              data={
                treeData
              }

              expandedIds={
                expandedIds
              }

              currentFolder={
                currentFolder
              }

              selectedItem={
                selectedItem
              }

              onFolderClick={
                handleTreeFolderClick
              }

              onFolderDoubleClick={
                handleTreeFolderDoubleClick
              }

              onFileClick={
                handleTreeFileClick
              }

              onFileDoubleClick={
                handleTreeFileDoubleClick
              }

              onToggleFolder={
                handleTreeToggle
              }

              onFolderCollapse={
                handleTreeFolderCollapse
              }

              resetExpanded={
                resetTree
              }
            />
          </div>
        )}

        {/* ===================================================
            RIGHT CONTENT
        =================================================== */}

        <div
          onClick={
            handleExplorerClick
          }

          style={{
            flex:
              1,

            minWidth:
              0,

            minHeight:
              0,

            backgroundColor:
              'white',

            padding:
              isMobile
                ? '8px'
                : '12px',

            overflowY:
              'auto',

            overflowX:
              'hidden',


            touchAction:
              'pan-y',
          }}
        >
          <div
            style={{
              display:
                'grid',

              gridTemplateColumns:
                isMobile
                  ? 'repeat(auto-fill, minmax(90px, 1fr))'
                  : 'repeat(auto-fill, 120px)',

              gridAutoRows:
                isMobile
                  ? '82px'
                  : '90px',

              gap:
                isMobile
                  ? '6px'
                  : '8px',

              alignItems:
                'start',

              justifyItems:
                'start',

              padding:
                isMobile
                  ? '2px'
                  : '4px',

              width:
                '100%',

              boxSizing:
                'border-box',
            }}
          >
            {currentChildren.map(
              (item) =>
                renderExplorerItem(
                  item
                )
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          STATUS BAR
      ===================================================== */}

      <div
        style={{
          display:
            'flex',

          alignItems:
            'center',

          padding:
            '2px 6px',

          fontSize:
            '11px',

          color:
            '#000000',

          backgroundColor:
            '#c0c0c0',

          boxShadow:
            'inset 1px 1px 0px #dfdfdf, inset -1px -1px 0px #0a0a0a',

          marginTop:
            '2px',

          height:
            '20px',

          flexShrink:
            0,

          boxSizing:
            'border-box',
        }}
      >
        {currentObjectCount}
        {' object(s)'}
      </div>
    </div>
  );
}

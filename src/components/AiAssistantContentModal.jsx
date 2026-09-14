import React, { useEffect, useRef, useState } from 'react';
import { Button, Frame, Modal } from '@react95/core';
import {
  Mailnews12,
  Refresh,
  Time,
  User4,
  Websrch,
  Issue,
  Drvspace7,
  User5,
} from '@react95/icons';
import { createPortal } from 'react-dom';

import { getAIResponse } from '../services/aiService';
import aiMessageSent from '../assets/sounds/ai_assistant_message_sent.wav';

export default function AiAssistantContentModal() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 600
  );

  const [showInfo, setShowInfo] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
  const [chatHistory, setChatHistory] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const [infoPosition, setInfoPosition] = useState({
    top: 0,
    left: 0,
  });

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const chatScrollRef = useRef(null);
  const infoButtonRef = useRef(null);

  /* =====================================================
     RESPONSIVE
  ===================================================== */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* =====================================================
     LOCAL TIME
  ===================================================== */

  useEffect(() => {
    const updateLocalHour = () => {
      setCurrentHour(new Date().getHours());
    };

    const interval = setInterval(updateLocalHour, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  /* =====================================================
     AUTO SCROLL
  ===================================================== */

  const scrollToBottom = () => {
    const scrollContainer = chatScrollRef.current;

    if (!scrollContainer) return;

    scrollContainer.scrollTop =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;
  };

  useEffect(() => {
    requestAnimationFrame(scrollToBottom);
  }, [chatHistory, loading]);

  /* =====================================================
     PLACEHOLDER ROTATION
  ===================================================== */

  const placeholders = [
    'Ask me anything about my life...',
    'What do you want to know about me?',
    'Search my memories or ask a question...',
    "What's on your mind? Drop a message...",
    'Curious about my background or routine?',
    'Think out loud—type your thoughts here...',
    'Test my memory—ask me a personal fact.',
    'Need a reminder or just want to chat?',
    'What should we check or talk about?',
    'Type a question or a detail about me...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) =>
        (prevIndex + 1) % placeholders.length
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  /* =====================================================
     SUGGESTED QUESTIONS
  ===================================================== */

  const suggestionSets = {
    initial: [
      'What is Perdana working on now?',
      'Why is he moving into Product Design?',
      'Can he code?',
    ],

    travelxxx: [
      'Why is Compare the main feature?',
      'How did he design TravelXXX?',
      'What will he test next?',
    ],

    portfolio: [
      'Why Windows 95?',
      'How was this portfolio built?',
      'What did he learn from testing it?',
    ],

    code: [
      'How does he use AI?',
      'What can he build himself?',
      'What does Design in Code mean?',
    ],

    career: [
      'Is he starting his career over?',
      'What does he bring from Visual Design?',
      'Where does he want to go next?',
    ],

    experience: [
      'What did he do at Conania?',
      'What kind of clients has he worked with?',
      'What did freelance work teach him?',
    ],

    hiring: [
      'What role is he looking for?',
      'Why consider him for Product Design?',
      'Is he currently available?',
    ],
  };

  const getSuggestedQuestions = (history) => {
    if (!history.length) {
      return suggestionSets.initial;
    }

    const recentUserMessages = history
      .filter((item) => item.sender === 'user')
      .slice(-2)
      .map((item) => item.text.toLowerCase())
      .join(' ');

    const latestAIMessage =
      [...history]
        .reverse()
        .find((item) => item.sender === 'ai')
        ?.text.toLowerCase() || '';

    const recentContext = `${recentUserMessages} ${latestAIMessage}`;

    let suggestions = suggestionSets.initial;

    if (
      recentContext.includes('travelxxx') ||
      recentContext.includes('travel xxx') ||
      recentContext.includes('hotel') ||
      recentContext.includes('compare')
    ) {
      suggestions = suggestionSets.travelxxx;
    } else if (
      recentContext.includes("perdana's computer") ||
      recentContext.includes('perdana computer') ||
      recentContext.includes('windows 95') ||
      recentContext.includes('portfolio website')
    ) {
      suggestions = suggestionSets.portfolio;
    } else if (
      recentContext.includes('hire') ||
      recentContext.includes('hiring') ||
      recentContext.includes('recruiter') ||
      recentContext.includes('available') ||
      recentContext.includes('candidate') ||
      recentContext.includes('role is he looking')
    ) {
      suggestions = suggestionSets.hiring;
    } else if (
      recentContext.includes('code') ||
      recentContext.includes('coding') ||
      recentContext.includes('react') ||
      recentContext.includes('design engineering') ||
      recentContext.includes('design in code') ||
      recentContext.includes('front-end')
    ) {
      suggestions = suggestionSets.code;
    } else if (
      recentContext.includes('career') ||
      recentContext.includes('pivot') ||
      recentContext.includes('product design') ||
      recentContext.includes('transition') ||
      recentContext.includes('starting over')
    ) {
      suggestions = suggestionSets.career;
    } else if (
      recentContext.includes('experience') ||
      recentContext.includes('conania') ||
      recentContext.includes('fiverr') ||
      recentContext.includes('visual design') ||
      recentContext.includes('client')
    ) {
      suggestions = suggestionSets.experience;
    }

    const askedQuestions = new Set(
      history
        .filter((item) => item.sender === 'user')
        .map((item) => item.text.trim().toLowerCase())
    );

    const freshSuggestions = suggestions.filter(
      (question) => !askedQuestions.has(question.toLowerCase())
    );

    if (!freshSuggestions.length) {
      return suggestionSets.initial
        .filter((question) => !askedQuestions.has(question.toLowerCase()))
        .slice(0, 3);
    }

    return freshSuggestions.slice(0, 3);
  };

  const suggestedQuestions = getSuggestedQuestions(chatHistory);
  const emptyStateSuggestions = suggestionSets.initial.slice(0, 3);

  /* =====================================================
     GREETING
  ===================================================== */

  const getGreetingByTime = (hour) => {
    if (hour < 5) {
      return "still up this late? hope you're doing okay — welcome to Perdana's corner.";
    }

    if (hour < 8) {
      return "up early! hope your day's off to a good start. this is Perdana's little corner of the web.";
    }

    if (hour < 12) {
      return "morning! hope you slept well — grab a coffee, this is Perdana's playground.";
    }

    if (hour < 15) {
      return "hey, hope your day's going smooth — glad you swung by. this is Perdana's space.";
    }

    if (hour < 18) {
      return "afternoon! hope things are going well so far — this is Perdana's work you're looking at.";
    }

    if (hour < 21) {
      return "evening! hope you had a good day — you're in the right place, this is Perdana's world.";
    }

    return "still up? take it easy — this is Perdana's world, welcome.";
  };

  const greetingText = getGreetingByTime(currentHour);

  /* =====================================================
     MESSAGE TIME
  ===================================================== */

  const getMessageTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = (message) => {
    const userMessage = message.trim();

    if (!userMessage || loading) return;

    const currentHistory = chatHistory;

    setPrompt('');

    const audio = new Audio(aiMessageSent);
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Browser may block audio playback in some situations.
    });

    setChatHistory((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userMessage,
        time: getMessageTime(),
      },
    ]);

    setLoading(true);

    getAIResponse(userMessage, currentHistory)
      .then((response) => {
        setTimeout(() => {
          setChatHistory((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: response || "Sorry, I couldn't get a response.",
              time: getMessageTime(),
            },
          ]);

          setLoading(false);
        }, 800);
      })
      .catch((error) => {
        console.error('Gagal memanggil AI:', error);

        setChatHistory((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Something went wrong with the AI.',
            time: getMessageTime(),
          },
        ]);

        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 850);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(prompt);
  };

  /* =====================================================
     TOOLBAR ACTIONS
  ===================================================== */

  const startNewChat = () => {
    setChatHistory([]);
    setPrompt('');
    setLoading(false);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const focusComposer = () => {
    inputRef.current?.focus();
  };

const toggleInfo = () => {
  setShowInfo((prev) => !prev);
};

  useEffect(() => {
    if (!showInfo) return;

    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [showInfo]);

  /* =====================================================
     MINI AI AVATAR
  ===================================================== */

  const MiniAiAvatar = () => (
    <div className="ai-chat-avatar" aria-hidden="true">
      <div className="ai-chat-avatar-body">
        <div className="ai-chat-avatar-eye ai-chat-avatar-eye-left" />
        <div className="ai-chat-avatar-eye ai-chat-avatar-eye-right" />
      </div>
    </div>
  );

  /* =====================================================
     TOOLBAR BUTTON
  ===================================================== */

  const ToolbarButton = ({
    label,
    icon: Icon,
    iconVariant,
    onClick,
    buttonRef,
  }) => (
    <Button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className="ai-toolbar-button"
      title={label}
      aria-label={label}
      style={{
        width: isMobile ? '34px' : '54px',
        height: isMobile ? '30px' : '38px',
        minWidth: isMobile ? '34px' : '54px',
        padding: isMobile ? '2px' : '2px 3px',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1px',
        flexShrink: 0,
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '9px',
        lineHeight: '10px',
      }}
    >
      <Icon
        variant={iconVariant}
        style={{
          width: isMobile ? '15px' : '18px',
          height: isMobile ? '15px' : '18px',
          flexShrink: 0,
        }}
      />

      {!isMobile && <span>{label}</span>}
    </Button>
  );

  /* =====================================================
     MENU ITEM
  ===================================================== */

  const menuItemStyle = {
    padding: '2px 7px',
    whiteSpace: 'nowrap',
    fontFamily: 'MS Sans Serif, sans-serif',
    fontSize: '11px',
    lineHeight: '14px',
    color: '#000000',
    userSelect: 'none',
    cursor: 'default',
  };

  return (
    <Modal.Content
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        backgroundColor: '#c0c0c0',
      }}
    >
      <style>{`
        @keyframes aiBlinkLeft {
          0%, 42%, 46%, 100% { transform: scaleY(1); }
          44% { transform: scaleY(0.08); }
        }

        @keyframes aiBlinkRight {
          0%, 57%, 61%, 100% { transform: scaleY(1); }
          59% { transform: scaleY(0.08); }
        }

        .ai-chat-avatar {
          position: relative;
          width: 22px;
          height: 20px;
          flex-shrink: 0;
        }

        .ai-chat-avatar-body {
          position: absolute;
          left: 50%;
          top: 1px;
          transform: translateX(-50%);
          width: 15px;
          height: 15px;
          background: #141414;
          border-radius: 4px;
        }

        .ai-chat-avatar-eye {
          position: absolute;
          top: 5px;
          width: 2px;
          height: 4px;
          background: #f8f5f4;
          transform-origin: center;
        }

        .ai-chat-avatar-eye-left {
          left: 4px;
          animation: aiBlinkLeft 3.2s infinite ease-in-out;
        }

        .ai-chat-avatar-eye-right {
          right: 4px;
          animation: aiBlinkRight 3.2s infinite ease-in-out;
        }

        .ai-chat-scroll {
          scrollbar-width: auto;
          scrollbar-color: #808080 #dfdfdf;
          scrollbar-gutter: stable;
        }

        .ai-chat-scroll::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }

        .ai-chat-scroll::-webkit-scrollbar-track {
          background: #dfdfdf;
          border-left: 1px solid #808080;
        }

        .ai-chat-scroll::-webkit-scrollbar-thumb {
          background: #c0c0c0;
          border-top: 2px solid #ffffff;
          border-left: 2px solid #ffffff;
          border-right: 2px solid #808080;
          border-bottom: 2px solid #808080;
          min-height: 28px;
        }

        .ai-chat-scroll::-webkit-scrollbar-corner {
          background: #c0c0c0;
        }

.ai-log-line {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  column-gap: 6px;

  /* bikin time, username, dan message sejajar */
  align-items: baseline;

  width: 100%;
  padding: 1px 0;
  box-sizing: border-box;

  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  text-align: left;
}

        .ai-log-time {
          color: #808080;
          white-space: nowrap;
          user-select: none;
        }

        .ai-log-name {
          white-space: nowrap;
          font-weight: bold;
        }

        .ai-log-name-user {
          color: #0000a0;
        }

        .ai-log-name-ai {
          color: #008000;
        }

        .ai-log-text {
          min-width: 0;
          color: #000000;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .ai-system-line {
          width: 100%;
          color: #666666;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          line-height: 1.45;
          text-align: left;
          white-space: pre-wrap;
        }

        .ai-system-line strong {
          color: #008000;
          font-weight: bold;
        }

        .ai-suggested-question {
          color: #0000a0;
          cursor: pointer;
          text-decoration: none;
        }

        .ai-suggested-question:hover,
        .ai-suggested-question:focus {
          color: #ffffff;
          background: #000080;
          outline: none;
        }

        .ai-toolbar-button:focus {
          outline: 1px dotted #000000;
          outline-offset: -4px;
        }

        @media (max-width: 600px) {
          .ai-log-line {
            column-gap: 4px;
            font-size: 11px;
          }

          .ai-log-time {
            display: none;
          }
        }
      `}</style>

      {/* =====================================================
          MENU BAR
      ===================================================== */}

      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          minHeight: '22px',
          boxSizing: 'border-box',
          backgroundColor: '#c0c0c0',
          borderBottom: '1px solid #808080',
          overflow: 'hidden',
        }}
      >
        <span style={menuItemStyle}>
          <u>F</u>ile
        </span>

        <span style={menuItemStyle}>
          <u>C</u>hat
        </span>

        <span style={menuItemStyle}>
          <u>V</u>iew
        </span>

        {!isMobile && (
          <span style={menuItemStyle}>
            <u>T</u>ools
          </span>
        )}

        <span style={menuItemStyle}>
          <u>H</u>elp
        </span>
      </div>

      {/* =====================================================
          CHAT / MSN-STYLE TOOLBAR
      ===================================================== */}

      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '2px' : '3px',
          width: '100%',
          minWidth: 0,
          minHeight: isMobile ? '34px' : '44px',
          boxSizing: 'border-box',
          backgroundColor: '#c0c0c0',
          borderBottom: '1px solid #808080',
          overflow: 'hidden',
        }}
      >

        {/* Existing perdana.ai identity, expanded into a toolbar panel */}
        <Frame
          variant="well"
          style={{
            minWidth: 0,
            flex: '1 1 auto',
            height: isMobile ? '28px' : '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: isMobile ? '2px 5px' : '3px 7px',
            boxSizing: 'border-box',
            backgroundColor: '#dfdfdf',
            overflow: 'hidden',
          }}
        >
          {!isMobile && <MiniAiAvatar />}

          <div
            style={{
              minWidth: 0,
              flex: '1 1 auto',
              fontFamily: 'MS Sans Serif, sans-serif',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '11px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'left',
                
              }}
            >
              perdana.ai
            </div>
          </div>
        </Frame>

{!isMobile && (
  <>
    <ToolbarButton

      icon={Refresh}
      iconVariant="16x16_4"
      onClick={startNewChat}
    />

    <ToolbarButton

      icon={User5}
      iconVariant="32x32_4"
      onClick={toggleInfo}
    />
  </>
)}

      </div>
{/* =====================================================
    ABOUT / INFO PANEL
===================================================== */}

{showInfo && (
  <div
    style={{
      flexShrink: 0,

      width: '100%',

      padding: '6px 8px',

      boxSizing: 'border-box',

      backgroundColor: '#ffffcc',

      borderBottom: '1px solid #808080',

      fontFamily: 'MS Sans Serif, sans-serif',

      fontSize: '11px',
      lineHeight: '1.4',

      color: '#000000',

      textAlign: 'left',
    }}
  >
    <strong>perdana.ai is an LLM chatbot</strong>

    <div
      style={{
        marginTop: '3px',

        fontSize: '10px',

        color: '#333333',
      }}
    >
      This is an AI-powered portfolio assistant. It can answer questions
      about Perdana, his work, projects, skills, and career direction.
      AI can make mistakes, so double-check important information.
    </div>
  </div>
)}

      {/* =====================================================
          CHAT HISTORY — mIRC / MSN TRANSCRIPT STYLE
      ===================================================== */}

      <div
        ref={chatScrollRef}
        className="ai-chat-scroll"
        style={{
          flex: '1 1 0',
          minHeight: 0,
          width: '100%',
          padding: isMobile ? '8px 6px' : '8px 10px',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          overflowY: 'scroll',
          overflowX: 'hidden',
          borderTop: '1px solid #808080',
          borderLeft: '1px solid #808080',
          borderRight: '1px solid #ffffff',
          borderBottom: '1px solid #ffffff',
        }}
      >
        {/* EMPTY / CONNECTED STATE */}
        {chatHistory.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              minHeight: '100%',
            }}
          >
            <div className="ai-system-line">
              *** <strong> Online · AI assistant {'<ready>'} </strong>
            </div>


            <div className="ai-system-line">
              *** {greetingText}
            </div>

            <div
              style={{
                height: '1px',
                margin: '5px 0 3px',
                backgroundColor: '#d0d0d0',
              }}
            />

            <div className="ai-system-line">
              Quick questions:
            </div>

            {emptyStateSuggestions.map((question, index) => (
              <div
                key={question}
                className="ai-system-line ai-suggested-question"
                role="button"
                tabIndex={0}
                onClick={() => sendMessage(question)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    sendMessage(question);
                  }
                }}
                style={{
                  padding: '2px 4px',
                }}
              >
                {index + 1}. {question}
              </div>
            ))}
          </div>
        )}

        {/* CONVERSATION LOG */}
        {chatHistory.map((chat, index) => (
          <div className="ai-log-line" key={`${chat.sender}-${index}`}>
            <span className="ai-log-time">[{chat.time || '--:--'}]</span>

            <span
              className={`ai-log-name ${
                chat.sender === 'user'
                  ? 'ai-log-name-user'
                  : 'ai-log-name-ai'
              }`}
            >
              {chat.sender === 'user' ? '<you>' : '<perdana.ai>'}
            </span>

            <span className="ai-log-text">{chat.text}</span>
          </div>
        ))}

        {/* TYPING LINE */}
        {loading && (
          <div className="ai-log-line">
            <span className="ai-log-time">[{getMessageTime()}]</span>
            <span className="ai-log-name ai-log-name-ai">*</span>
            <span
              className="ai-log-text"
              style={{
                color: '#666666',
                fontStyle: 'italic',
              }}
            >
              perdana.ai is typing...
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          CONTEXTUAL SUGGESTED QUESTIONS
      ===================================================== */}

      {chatHistory.length > 0 &&
        !loading &&
        chatHistory[chatHistory.length - 1]?.sender === 'ai' &&
        suggestedQuestions.length > 0 && (
          <div
            style={{
              width: '100%',
              flexShrink: 0,
              backgroundColor: '#ffffff',
              borderTop: '1px solid #c8c8c8',
              borderLeft: '1px solid #808080',
              borderRight: '1px solid #ffffff',
              borderBottom: '1px solid #ffffff',
              padding: '8px 8px 5px',
              fontFamily: 'MS Sans Serif, sans-serif',
              fontSize: '11px',
              lineHeight: '1.6',
              boxSizing: 'border-box',
              textAlign: 'left'
              
            }}
          >

            {suggestedQuestions.map((question) => (
              <div
                key={question}
                className="ai-suggested-question"
                role="button"
                tabIndex={0}
                onClick={() => sendMessage(question)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    sendMessage(question);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '3px 4px',
                  boxSizing: 'border-box',
                  userSelect: 'none',
                }}
              >
                ↳ {question}
              </div>
            ))}
          </div>
        )}

      {/* =====================================================
          GREY SEPARATOR
      ===================================================== */}

      <div
        style={{
          width: '100%',
          height: '6px',
          flexShrink: 0,
          backgroundColor: '#c0c0c0',
          borderTop: '1px solid #808080',
          boxSizing: 'border-box',
        }}
      />

      {/* =====================================================
          INPUT / MESSAGE COMPOSER
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '4px',
          flexShrink: 0,
          minWidth: 0,
          width: '100%',
          backgroundColor: '#c0c0c0',
          boxSizing: 'border-box',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={isFocused ? '' : placeholders[placeholderIndex]}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={loading}
          style={{
            flex: 1,
            minWidth: 0,
            width: '100%',
            height: isMobile ? '42px' : '38px',
            padding: '0 7px',
            border: '2px inset #ffffff',
            borderRadius: 0,
            backgroundColor: '#ffffff',
            fontSize: isMobile ? '14px' : '12px',
            outline: 'none',
            color: '#000000',
            fontFamily: 'MS Sans Serif, sans-serif',
            boxSizing: 'border-box',
          }}
        />

        <Button
          type="submit"
          disabled={loading}
          style={{
            flexShrink: 0,
            minWidth: isMobile ? '54px' : '64px',
            fontFamily: 'MS Sans Serif, sans-serif',
            fontSize: '11px',
          }}
        >
          Send
        </Button>
      </form>
    </Modal.Content>
  );
}

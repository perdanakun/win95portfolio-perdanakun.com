import React, { useState, useEffect, useRef } from 'react';
import { Modal, Frame, Button } from '@react95/core';
import { createPortal } from 'react-dom';
import { getAIResponse } from '../services/aiService'; // Sesuaikan path import
 import aiMessageSent from '../assets/sounds/ai_assistant_message_sent.wav';

export default function AiAssistantContentModal() {

const [isMobile, setIsMobile] = useState(
  typeof window !== 'undefined' && window.innerWidth <= 600
);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  const [showInfo, setShowInfo] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
 

  
  useEffect(() => {
    const updateLocalHour = () => {
      setCurrentHour(new Date().getHours());
    };

    const interval = setInterval(updateLocalHour, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

const infoButtonRef = useRef(null);

  const [infoPosition, setInfoPosition] = useState({
    top: 0,
    left: 0,
  });

  const [chatHistory, setChatHistory] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  
  const inputRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Auto-scroll ke bawah saat chat history atau status loading berubah, green online color
useEffect(() => {
  const scrollContainer = chatScrollRef.current;

  if (!scrollContainer) return;

  requestAnimationFrame(() => {
    scrollContainer.scrollTop =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;
  });
}, [chatHistory, loading]);

  // Animasi rotasi placeholder input
  const placeholders = [
    "Ask me anything about my life...",
    "What do you want to know about me?",
    "Search my memories or ask a question...",
    "What's on your mind? Drop a message...",
    "Curious about my background or routine?",
    "Think out loud—type your thoughts here...",
    "Test my memory—ask me a personal fact.",
    "Need a reminder or just want to chat?",
    "What should we check or talk about?",
    "Type a question or a detail about me..."
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) =>
        (prevIndex + 1) % placeholders.length
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Suggested questions are handled locally so they appear instantly
  // and do not require another AI/API call.
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

    // Use both what the visitor asked and what the AI just talked about.
    // This makes follow-up prompts feel connected to the actual conversation.
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

    // If every question in a contextual set has already been used, fall back
    // to unused initial questions instead of leaving the suggestion area empty.
    if (!freshSuggestions.length) {
      return suggestionSets.initial
        .filter((question) => !askedQuestions.has(question.toLowerCase()))
        .slice(0, 3);
    }

    return freshSuggestions.slice(0, 3);
  };

  const suggestedQuestions = getSuggestedQuestions(chatHistory);

const getGreetingByTime = (hour) => {
  if (hour < 5) return "still up this late? hope you're doing okay — welcome to Perdana's corner.";
  if (hour < 8) return "up early! hope your day's off to a good start. this is Perdana's little corner of the web.";
  if (hour < 12) return "morning! hope you slept well — grab a coffee, this is Perdana's playground.";
  if (hour < 15) return "hey, hope your day's going smooth — glad you swung by. this is Perdana's space.";
  if (hour < 18) return "afternoon! hope things are going well so far — this is Perdana's work you're looking at.";
  if (hour < 21) return "evening! hope you had a good day — you're in the right place, this is Perdana's world.";
  return "still up? take it easy — this is Perdana's world, welcome.";
};

  const greetingText = getGreetingByTime(currentHour);
  const emptyStateSuggestions = suggestionSets.initial.slice(0, 3);

  // One send function is used by both the text input and follow-up prompts.
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
      { sender: 'user', text: userMessage },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(prompt);
  };

  // Handle Show Info

useEffect(() => {
  if (!showInfo) return;

  const timer = setTimeout(() => {
    setShowInfo(false);
  }, 2000);

  return () => clearTimeout(timer);
}, [showInfo]);

  const MiniAiAvatar = () => (
    <div
      className="ai-chat-avatar"
      aria-hidden="true"
    >
      <div className="ai-chat-avatar-body">
        <div className="ai-chat-avatar-eye ai-chat-avatar-eye-left" />
        <div className="ai-chat-avatar-eye ai-chat-avatar-eye-right" />
      </div>
    </div>
  );

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
  }}
>



      {/* CSS TERPADU UNTUK ANIMASI GAYA AI */}
      <style>{`

/* =========================================
   CHAT HISTORY ANIMATION
   ========================================= */
@keyframes chatMessageUp {
  from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: bottom;
  }

  to {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

.chat-message-animate {
  animation: chatMessageUp 0.25s ease-out;
}
/* =========================================
   MOBILE AI HERO / BLINKING CHARACTER
   ========================================= */

@keyframes aiBlinkLeft {
  0%, 42%, 46%, 100% {
    transform: scaleY(1);
  }

  44% {
    transform: scaleY(0.08);
  }
}

@keyframes aiBlinkRight {
  0%, 57%, 61%, 100% {
    transform: scaleY(1);
  }

  59% {
    transform: scaleY(0.08);
  }
}

.ai-empty-state {
  width: 100%;
  min-height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 28px 18px 22px;
  box-sizing: border-box;

  background: #ffffff;
  text-align: center;
}

.ai-hero-character {
  position: relative;

  width: 68px;
  height: 68px;

  flex-shrink: 0;
}

.ai-hero-body {
  position: absolute;

  left: 50%;
  transform: translateX(-50%);

  width: 46px;
  height: 40px;

  background: #141414;

  border-radius: 2px;
}

.ai-hero-eye {
  position: absolute;

  top: 13px;

  width: 6px;
  height: 10px;

  background: #f8f5f4;


  transform-origin: center;
}

.ai-hero-eye-left {
  left: 12px;
  animation: aiBlinkLeft 3.2s infinite ease-in-out;
}

.ai-hero-eye-right {
  right: 12px;
  animation: aiBlinkRight 3.2s infinite ease-in-out;
}

.ai-hero-mouth {
  position: absolute;

  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);

  width: 8px;
  height: 3px;

  background: #f8f5f4;
  border-radius: 2px;
}

.ai-hero-leg {
  position: absolute;

  top: 52px;

  width: 6px;
  height: 12px;

  background: #273bd3;
  border: 1px solid #273bd3;
  box-sizing: border-box;
}

.ai-hero-leg-one {
  left: 20px;
}

.ai-hero-leg-two {
  left: 32px;
}

.ai-hero-leg-three {
  right: 32px;
}

.ai-hero-leg-four {
  right: 20px;
}

.ai-greeting-text {
  max-width: 340px;

  margin: 0 0 15px;

  color: #343434;

  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.15px;
}

.ai-empty-suggestions {
  width: 100%;
  max-width: 360px;

  margin-top: 2px;

  font-family: sans-serif;
  font-size: 11px;
  line-height: 1.4;
  text-align: left;
}

.ai-empty-divider {
  width: calc(100% - 24px);
  height: 1px;

  margin: 0 12px 5px;

  background: #dedede;
}

.ai-empty-suggestion {
  display: flex;
  align-items: flex-start;

  gap: 6px;

  width: 100%;

  padding: 7px 8px;

  box-sizing: border-box;
  user-select: none;
}


/* =========================================
   MINI AI CHAT AVATAR
   ========================================= */

.ai-chat-avatar {
  position: relative;

  width: 22px;
  height: 22px;

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
  border-radius: 1px;
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

.ai-chat-avatar-leg {
  position: absolute;

  top: 16px;

  width: 2px;
  height: 5px;

  background: #141414;
}

.ai-chat-avatar-leg-one {
  left: 4px;
}

.ai-chat-avatar-leg-two {
  left: 8px;
}

.ai-chat-avatar-leg-three {
  right: 8px;
}

.ai-chat-avatar-leg-four {
  right: 4px;
}

/* =========================================
   CONTEXTUAL FOLLOW-UP QUESTIONS
   ========================================= */
.ai-suggested-question {
  color: #7b8798;
  cursor: pointer;
  transition: color 0.12s ease, background-color 0.12s ease;
}

.ai-suggested-question:hover,
.ai-suggested-question:focus {
  color: #273bd3;
  background-color: #f5f5f5;
  outline: none;
}
      `}</style>

      {/* HEADER INFO AI */}
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
    minWidth: 0,
    flexShrink: 0,

    padding: '6px 10px',

    backgroundColor: '#dfdfdf',
    borderBottom: '1px solid #808080',

    fontFamily: 'sans-serif',
    fontSize: '11px',

    boxSizing: 'border-box',
  }}
>

<div
  style={{
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    minWidth: 0,
  }}
>


               <span style={{ 
            width: '8px', height: '8px', 
            backgroundColor: '#008000',
            display: 'inline-block', borderRadius: '50%', flexShrink: 0,
            transform: 'translateY(3px)' 
          }}>

          </span>
          perdana.ai
        </div>

        <div style={{ position: 'relative' }}>
<Button
  ref={infoButtonRef}
  onClick={() => {
    if (!showInfo && infoButtonRef.current) {
      const rect = infoButtonRef.current.getBoundingClientRect();

      setInfoPosition({
        top: rect.top,
        left: rect.right - 240,
      });
    }

    setShowInfo(!showInfo);
  }}
style={{
    width: '20px',
    height: '20px',
    minWidth: '20px',
    padding: 0,
    fontSize: '11px',
    fontWeight: 'bold',
    lineHeight: '1',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  title="about this AI"
>
  i
</Button>


{showInfo &&
  createPortal(
    <div
style={{
  position: 'fixed',

  top: `${infoPosition.top}px`,

  left: isMobile
    ? '10px'
    : `${infoPosition.left}px`,

  width: isMobile
    ? 'calc(100vw - 20px)'
    : '220px',

  maxWidth: 'calc(100vw - 20px)',

  backgroundColor: '#ffffcc',
  border: '1px solid #000000',
  padding: '8px',
  boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
  textAlign: 'left',
  color: '#000000',
  lineHeight: '1.3',
  zIndex: 99999,
  fontFamily: 'sans-serif',
  fontSize: '11px',
  boxSizing: 'border-box',
}}
    >
      <strong>perdana.ai is an LLM chatbot</strong>

      <div
        style={{
          fontSize: '10px',
          marginTop: '4px',
        }}
      >
        This is an AI-powered chatbot assistant. AI can make mistakes or
        provide inaccurate information. Please double-check important
        information.
      </div>
    </div>,
    document.body
  )}

        </div>
      </div>


{/* AREA CHAT HISTORY */}
<div
  ref={chatScrollRef}
  style={{
    flex: 1,
    minHeight: 0,
    backgroundColor: '#ffffff',
    padding: chatHistory.length === 0 ? '0px' : '8px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: 0,
  }}
>


{/* EMPTY STATE / MOBILE AI HERO */}

{chatHistory.length === 0 && (
  <div className="ai-empty-state">
    {/* BLINKING CHARACTER */}
    <div
      className="ai-hero-character"
      aria-hidden="true"
    >
      <div className="ai-hero-body">
        <div className="ai-hero-eye ai-hero-eye-left" />
        <div className="ai-hero-eye ai-hero-eye-right" />
  
      </div>

      
    </div>

    {/* TIME-AWARE GREETING */}
    <div className="ai-greeting-text">
      {greetingText}
    </div>

    {/* STARTER QUESTIONS */}
    <div className="ai-empty-suggestions">
      <div className="ai-empty-divider" />

      {emptyStateSuggestions.map((question) => (
        <div
          key={question}
          className="ai-empty-suggestion ai-suggested-question"
          role="button"
          tabIndex={0}
          onClick={() => sendMessage(question)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              sendMessage(question);
            }
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              color: '#8a96a6',
              transform: 'translateY(1px)',
            }}
          >
            ↳
          </span>

          <span>{question}</span>
        </div>
      ))}
    </div>
  </div>
)}


{/* AREA CHATBOX AI */}


{chatHistory.map((chat, index) => {
  return (
    <React.Fragment key={index}>
      <div
        style={{
          position: 'relative',
          alignSelf: chat.sender === 'user' ? 'flex-end' : 'flex-start',
          marginLeft: chat.sender === 'ai' ? '36px' : '0px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: '12px',
          maxWidth: '85%',
          backgroundColor:
            chat.sender === 'user' ? '#273bd3' : '#f2f2f2',
          color:
            chat.sender === 'user' ? '#ffffff' : '#000000',
          padding: '8px 15px',
          borderRadius: '10px',
          fontSize: '12px',
          lineHeight: '1.4',
          fontFamily: 'sans-serif',
          textAlign: 'left',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {chat.sender === 'ai' && (
          <Frame
            variant="well"
            style={{
              position: 'absolute',
              left: '-34px',
              top: '4px',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              flexShrink: 0,
              margin: 0,
              padding: 0,
              boxSizing: 'border-box',
            }}
          >
            <MiniAiAvatar />
          </Frame>
        )}

        {chat.text}
      </div>
    </React.Fragment>
  );
})}

        
{loading && (
  <div
    style={{
      position: 'relative',
      alignSelf: 'flex-start',
      marginLeft: '36px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      color: '#666',
      padding: '8px 15px',
      borderRadius: '10px',
      fontSize: '12px',
      fontStyle: 'italic',
      lineHeight: '1.4',
      fontFamily: 'sans-serif',
    }}
  >
    <Frame
            variant="well"
            style={{
              position: 'absolute',
              left: '-34px',
              top: '4px',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              flexShrink: 0,
              margin: 0,
              padding: 0,
              boxSizing: 'border-box',
            }}
          >
            <MiniAiAvatar />
          </Frame>

    is typing...
  </div>
)}


        
      </div>

{/* CONTEXTUAL SUGGESTED QUESTIONS */}
{chatHistory.length > 0 &&
  !loading &&
  chatHistory[chatHistory.length - 1]?.sender === 'ai' &&
  suggestedQuestions.length > 0 && (
    <div
      style={{
        width: '100%',
        flexShrink: 0,
        backgroundColor: '#ffffff',
        padding: '0 8px 6px',
        fontFamily: 'sans-serif',
        fontSize: '11px',
        lineHeight: '1.4',
        boxSizing: 'border-box',
      }}
    >
      {/* SHORT DIVIDER */}
      <div
        style={{
          width: '88%',
          height: '1px',
          backgroundColor: '#dedede',
          margin: '0 auto 5px',
        }}
      />

      {suggestedQuestions.map((question) => (
        <div
          key={question}
          className="ai-suggested-question"
          role="button"
          tabIndex={0}
          onClick={() => sendMessage(question)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              sendMessage(question);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '6px',
            width: '100%',
            padding: '6px 4px',
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              color: '#8a96a6',
              transform: 'translateY(1px)',
            }}
          >
            ↳
          </span>

          <span>{question}</span>
        </div>
      ))}
    </div>
  )}

      {/* GREY GAP BEFORE INPUT */}
      <div
        style={{
          width: '100%',
          height: '6px',
          flexShrink: 0,
          backgroundColor: '#c0c0c0',
        }}
      />
  
      {/* INPUT & FORM */}
      <form
  onSubmit={handleSubmit}
  style={{
    display: 'flex',
    gap: '4px',
    flexShrink: 0,
    minWidth: 0,
    width: '100%',
    background: '#c0c0c0',
    marginTop: 'auto',
    boxSizing: 'border-box',
  }}
>
        <input
          ref={inputRef}
          type="text"
          placeholder={isFocused ? "" : placeholders[placeholderIndex]}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={loading}
style={{
    flex: 1,
    minWidth: 0,
    width: '100%',
    height: '48px',
    padding: '0 8px',
    border: '2px inset #ffffff',
    backgroundColor: '#ffffff',
    fontSize: isMobile ? '14px' : '12px',
    outline: 'none',
    color: '#000000',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
  }}
/>
<Button
  type="submit"
  disabled={loading}
  style={{
    flexShrink: 0,
    minWidth: isMobile ? '52px' : 'auto',
  }}
>
  Send
</Button>
      </form>

    </Modal.Content>
  );
}
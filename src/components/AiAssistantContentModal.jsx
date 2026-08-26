import React, { useState, useEffect, useRef } from 'react';
import { Modal, Frame, Button } from '@react95/core';
import { Intl101 } from '@react95/icons';
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
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

// Handle submit pesan chat
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = prompt; 
    setPrompt('');

    // --- PUTAR SOUND EFFECT DI SINI ---
    const audio = new Audio(aiMessageSent);
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Menghindari error jika diblokir autoplay oleh browser
    });

    // Masukkan pesan user dan aktifkan loading secara bersamaan
    setChatHistory(prev => [
      ...prev, 
      { sender: 'user', text: userMessage }
    ]);
    setLoading(true);

    // Panggil AI
   getAIResponse(userMessage, chatHistory)
      .then((response) => {
        setTimeout(() => {
          setChatHistory(prev => [
            ...prev, 
            { sender: 'ai', text: response || 'Maaf, sepertinya tidak ada respons dari AI.' }
          ]);
          setLoading(false);
        }, 800); // Jeda simulasi waktu baca/ketik AI selesai
      })
      .catch((error) => {
        console.error("Gagal memanggil AI:", error);
        setChatHistory(prev => [
          ...prev, 
          { sender: 'ai', text: 'Terjadi kesalahan sistem pada AI.' }
        ]);
        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 850);
      });
  };

  // Handle Show Info

useEffect(() => {
  if (!showInfo) return;

  const timer = setTimeout(() => {
    setShowInfo(false);
  }, 2000);

  return () => clearTimeout(timer);
}, [showInfo]);
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

    padding: '4px',

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
   MINIMAL CRT AI FACE
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

.ai-eye-left {
  animation: aiBlinkLeft 3.2s infinite ease-in-out;
  transform-origin: center;
}

.ai-eye-right {
  animation: aiBlinkRight 3.2s infinite ease-in-out;
  transform-origin: center;
}

/* =========================================
   CRT AI FACE GLOW
   ========================================= */

.ai-eye-left,
.ai-eye-right {
  box-shadow:
    0 0 4px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 255, 255, 0.45),
    0 0 18px rgba(255, 255, 255, 0.2);

  filter: brightness(1.05);
}

.ai-face-line,
.ai-face-mouth {
  box-shadow:
    0 0 4px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 255, 255, 0.45),
    0 0 16px rgba(255, 255, 255, 0.2);

  filter: brightness(1.05);
}

/* =========================================
   RETRO CRT SCREEN
   ========================================= */

.ai-container-glow {
  position: relative;
  overflow: hidden;

  background: #141414;

  box-shadow:
    inset 0 0 25px rgba(0, 0, 0, 0.9),
    inset 0 0 8px rgba(255, 255, 255, 0.08),
    0 0 12px rgba(255, 255, 255, 0.08);

  /* subtle CRT flicker */
  animation: crtFlicker 0.12s infinite;
}


/* =========================================
   SCREEN FLICKER
   ========================================= */

@keyframes crtFlicker {
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: 0.98;
  }
}


/* =========================================
   SCANLINES
   ========================================= */

.ai-container-glow::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.035) 0px,
      rgba(255, 255, 255, 0.035) 1px,
      rgba(0, 0, 0, 0.12) 2px,
      rgba(0, 0, 0, 0.12) 4px
    );

  pointer-events: none;
  z-index: 20;
}


/* =========================================
   CRT GLITCH / SCREEN TEARING
   ========================================= */

.ai-container-glow::after {
  content: "";
  position: absolute;

  left: -10%;
  width: 120%;

  height: 20px;

  top: 0;

  background:
    linear-gradient(
      to right,
      transparent 0%,
      rgba(255,255,255,0.05) 20%,
      rgba(255,255,255,0.15) 50%,
      rgba(255,255,255,0.04) 80%,
      transparent 100%
    );

  opacity: 0;

  pointer-events: none;
  z-index: 30;

  animation: crtTear 4s infinite;
}


@keyframes crtTear {

  /* normal */
  0%,
  82% {
    top: -20px;
    opacity: 0;
    transform: translateX(0);
  }

  /* glitch starts */
  83% {
    top: 25%;
    opacity: 0.8;
    transform: translateX(-8px);
  }

  84% {
    top: 26%;
    opacity: 0.5;
    transform: translateX(10px);
  }

  85% {
    top: 27%;
    opacity: 0.9;
    transform: translateX(-5px);
  }

  86% {
    top: 28%;
    opacity: 0;
    transform: translateX(4px);
  }

  /* second tear */
  87% {
    top: 55%;
    opacity: 0.7;
    transform: translateX(8px);
  }

  88% {
    top: 56%;
    opacity: 0;
    transform: translateX(-8px);
  }

  /* back to normal */
  100% {
    top: -20px;
    opacity: 0;
    transform: translateX(0);
  }
}

/* =========================================
   CRT RGB GLITCH
   ========================================= */
.crt-rgb-glitch {
  position: absolute;

  left: -10%;
  top: 42%;

  width: 120%;
  height: 35px;

  pointer-events: none;
  z-index: 25;

  opacity: 0;

  mix-blend-mode: screen;

  background:
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.25),
      transparent 30%,
      transparent 70%,
      rgba(0, 100, 255, 0.25)
    );

  animation: rgbShift 6s infinite steps(1);
}

@keyframes rgbShift {
  0%, 85% {
    opacity: 0;
    transform: translateX(0);
  }

  86% {
    opacity: 0.7;
    transform: translateX(-8px);
  }

  87% {
    opacity: 0.4;
    transform: translateX(8px);
  }

  88% {
    opacity: 0;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
  }
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
      <strong>perdana.ai is a LLM chatbot</strong>

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
    marginBottom: '6px',
  }}
>


{/* AREA ANIMASI MATA AI */}

{chatHistory.length === 0 && (
  <div
    className="ai-container-glow"
    style={{
      backgroundColor: '#141414',
      width: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      textAlign: 'center',
      padding: '20px',
      color: '#666666',
      fontFamily: 'sans-serif',

    }}
  >

{/* CRT RGB GLITCH */}
<div
  className="crt-rgb-glitch"
  aria-hidden="true"
/>

{/* AI FACE */}
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
  }}
>

  {/* EYES */}
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
    }}
  >

    {/* LEFT EYE */}
    <div
      className="ai-eye-left"
      style={{
        width: '20px',
        height: '38px',
        backgroundColor: '#f8f5f4',
        borderRadius: '7px',
      }}
    />

    {/* RIGHT EYE */}
    <div
      className="ai-eye-right"
      style={{
        width: '20px',
        height: '38px',
        backgroundColor: '#f8f5f4',
        borderRadius: '7px',
      }}
    />

  </div>

  {/* MOUTH */}
  <div
    className="ai-face-mouth"
    style={{
      width: '24px',
      height: '7px',
      backgroundColor: '#f8f5f4',
      borderRadius: '5px',
    }}
  />

</div>


  </div>
)}


{/* AREA CHATBOX AI */}


{chatHistory.map((chat, index) => (
  <div
    key={index}
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

          width: '24px',
          height: '24px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: '#f2f2f2',
          flexShrink: 0,
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <Intl101 variant="32x32_4" />
      </Frame>
    )}

    {chat.text}
  </div>
))}

        
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
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        flexShrink: 0,
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      <Intl101 variant="32x32_4" />
    </Frame>

    is typing...
  </div>
)}


        
      </div>

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
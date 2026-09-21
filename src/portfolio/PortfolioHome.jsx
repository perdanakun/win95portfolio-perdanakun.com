import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  Home,
  Menu,
  Moon,
  SendHorizontal,
  Sun,
  Trash2,
  UserRound,
  X,
  Astroid,
} from 'lucide-react'

import { getAIResponse } from '../services/aiService.js'
import './PortfolioHome.css'

/* =====================================================
   DATA
===================================================== */

const projects = [
  {
    title: 'TravelXXX',
    type: 'Product Design',
    year: '2026',
    description:
      'A hotel search and booking exploration focused on reducing uncertainty around rooms, pricing, and availability.',
    prompt:
      'Tell me about the TravelXXX project. What problem was Perdana trying to solve, and what design decisions did he make?',
  },
  {
    title: "Perdana's Computer",
    type: 'Design Engineering',
    year: '2026',
    description:
      'An experimental personal portfolio designed and built as a Windows 95-inspired desktop environment using React.',
    prompt:
      "Tell me about Perdana's Computer, why it was designed like Windows 95, and how it was built.",
  },
  {
    title: 'HoloHealth',
    type: 'Product Design / UX',
    year: '2026',
    description:
      'A product design exploration around clearer healthcare interactions and digital experiences.',
    prompt:
      'Tell me about the HoloHealth project and what Perdana explored in it.',
  },
  {
    title: 'ShipFaster',
    type: 'Product Exploration',
    year: '2026',
    description:
      'An exploration around simplifying workflows and translating product ideas into usable interfaces.',
    prompt:
      'Tell me about the ShipFaster project.',
  },
  {
    title: 'Mayora',
    type: 'Visual Design',
    year: '2019–2022',
    description:
      'Social media visual design work supporting Mayora brands across an extended period of audience growth.',
    prompt:
      'Tell me about Perdana’s visual design work for Mayora.',
  },
]

const writings = [
  {
    title:
      'Getting Killed by AI: The End of the Average Design Freelancer',
    meta: '2026 · Essay',
    prompt:
      'Summarize Perdana’s essay "Getting Killed by AI: The End of the Average Design Freelancer."',
  },
  {
    title:
      'I Spent a Decade Learning How to Design Things. Now I Want to Learn How to Build Them.',
    meta: '2026 · Essay',
    prompt:
      'Tell me about Perdana’s essay about spending a decade learning design and now learning how to build.',
  },
  {
    title:
      'What Does “Entry Level” Mean When You’re Pivoting Into Product Design?',
    meta: '2026 · Essay',
    prompt:
      'Tell me about Perdana’s writing on being entry level while transitioning into product design.',
  },
]

const viewConfig = {
  home: {
    label: 'Home',
    placeholder: 'Ask about Perdana',
    suggestions: [
      'Summarize Perdana for me.',
    ],
  },

  work: {
    label: 'Recent work',
    placeholder: 'Ask about my work',
    suggestions: [
      'Which project best shows product thinking?',
      'What has he built with React?',
      'Show me his visual design background.',
    ],
  },

  writing: {
    label: 'Writing',
    placeholder: 'Ask about my writing',
    suggestions: [
      'What does Perdana write about?',
      'Summarize his essay about AI and freelancers.',
      'Why does he write about career transition?',
    ],
  },

  about: {
    label: 'About',
    placeholder: 'Ask about my background',
    suggestions: [
      'Tell me about Perdana’s experience.',
      'Why is he moving into product design?',
      'What skills transfer from visual design?',
    ],
  },
}

/* =====================================================
   HELPERS
===================================================== */

function createThreadId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `thread-${Date.now()}`
}

function createThreadTitle(question) {
  const clean = question
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[?.!]+$/, '')

  if (clean.length <= 32) {
    return clean
  }

  return `${clean.slice(0, 32).trim()}…`
}

function loadStoredThreads() {
  try {
    const stored = window.localStorage.getItem('perdana-chat-history')

    if (!stored) return []

    const parsed = JSON.parse(stored)

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/* =====================================================
   APP
===================================================== */

export default function PortfolioHome() {
  const [activeView, setActiveView] = useState('home')
  const [activeThreadId, setActiveThreadId] = useState(null)

  // Hidden by default, like ChatGPT's collapsed sidebar state.
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [dark, setDark] = useState(() => {
    const saved = window.localStorage.getItem('perdana-theme')

    if (saved) {
      return saved === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [threads, setThreads] = useState(loadStoredThreads)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)

  const conversationRef = useRef(null)

  const activeThread =
    threads.find((thread) => thread.id === activeThreadId) || null

  const isChatView = activeView === 'chat' && activeThread

  const currentConfig =
    activeView === 'chat'
      ? {
          label: activeThread?.title || 'Chat',
          placeholder: 'Ask a follow-up',
          suggestions: [],
        }
      : viewConfig[activeView]

  /* =====================================================
     PERSISTENCE
  ===================================================== */

  useEffect(() => {
    window.localStorage.setItem(
      'perdana-theme',
      dark ? 'dark' : 'light',
    )
  }, [dark])

  useEffect(() => {
    window.localStorage.setItem(
      'perdana-chat-history',
      JSON.stringify(threads),
    )
  }, [threads])

  useEffect(() => {
    if (!conversationRef.current || activeView !== 'chat') return

    conversationRef.current.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [activeView, activeThread?.messages?.length, isThinking])

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const navigateTo = (view) => {
    setActiveView(view)
    setActiveThreadId(null)
    setSidebarOpen(false)
  }

  const newChat = () => {
    setActiveView('home')
    setActiveThreadId(null)
    setInput('')
    setSidebarOpen(false)
  }

  const openThread = (threadId) => {
    setActiveThreadId(threadId)
    setActiveView('chat')
    setSidebarOpen(false)
  }

  const deleteThread = (threadId) => {
    setThreads((current) =>
      current.filter((thread) => thread.id !== threadId),
    )

    if (activeThreadId === threadId) {
      setActiveThreadId(null)
      setActiveView('home')
      setInput('')
    }
  }

  const clearAllChats = () => {
    setThreads([])
    setActiveThreadId(null)
    setActiveView('home')
    setInput('')
    setIsThinking(false)
  }

  /* =====================================================
     CHAT
  ===================================================== */

  const ask = async (question) => {
    const cleanQuestion = question.trim()

    if (!cleanQuestion || isThinking) return

    const userMessage = {
      role: 'user',
      text: cleanQuestion,
    }

    let threadId = activeThreadId
    let previousMessages = []

    // Asking from Home / Work / Writing / About creates a new ChatGPT-like thread.
    if (activeView !== 'chat' || !activeThread) {
      threadId = createThreadId()

      const newThread = {
        id: threadId,
        title: createThreadTitle(cleanQuestion),
        messages: [userMessage],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      setThreads((current) => [newThread, ...current])
      setActiveThreadId(threadId)
      setActiveView('chat')
    } else {
      previousMessages = activeThread.messages

      setThreads((current) => {
        const updatedThread = {
          ...activeThread,
          messages: [...activeThread.messages, userMessage],
          updatedAt: Date.now(),
        }

        return [
          updatedThread,
          ...current.filter((thread) => thread.id !== activeThread.id),
        ]
      })
    }

    const history = previousMessages.map((message) => ({
      sender: message.role === 'user' ? 'user' : 'ai',
      text: message.text,
    }))

    setInput('')
    setIsThinking(true)

    try {
      const answer = await getAIResponse(cleanQuestion, history)

      const assistantMessage = {
        role: 'assistant',
        text: answer,
      }

      setThreads((current) =>
        current.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                messages: [...thread.messages, assistantMessage],
                updatedAt: Date.now(),
              }
            : thread,
        ),
      )
    } catch (error) {
      console.error(error)

      setThreads((current) =>
        current.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                messages: [
                  ...thread.messages,
                  {
                    role: 'assistant',
                    text:
                      "I couldn't answer that just now. Please try again.",
                  },
                ],
                updatedAt: Date.now(),
              }
            : thread,
        ),
      )
    } finally {
      setIsThinking(false)
    }
  }

  const submit = () => {
    ask(input)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      className={`portfolio-v2 ${dark ? 'dark' : ''} ${
        sidebarOpen ? 'sidebar-visible' : ''
      }`}
    >
      {/* =================================================
          SIDEBAR OPEN BUTTON
          Only visible while sidebar is hidden.
      ================================================= */}

      <div className="portfolio-top-controls">
      <button
        type="button"
        className="top-identity"
        onClick={newChat}
      >
        <Astroid size={10} />
        <span>{' '}Perdana Kurniawan Arta</span>
      </button>

        <div className="top-right-controls">
          <button
            type="button"
            className="top-theme-toggle"
            onClick={() => setDark((current) => !current)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="sidebar-open-button"
            type="button"
            onClick={() => setSidebarOpen((current) => !current)}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            title={sidebarOpen ? 'Close menu' : 'Menu'}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* =================================================
          MOBILE / OVERLAY BACKDROP
      ================================================= */}

      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`portfolio-sidebar ${
          sidebarOpen ? 'is-open' : ''
        }`}
      >
        <nav className="sidebar-navigation">
          <SidebarButton
            active={activeView === 'home'}
            icon={<Home size={12} />}
            label="Home"
            onClick={() => navigateTo('home')}
          />

          <SidebarButton
            active={activeView === 'work'}
            icon={<BriefcaseBusiness size={12} />}
            label="Recent work"
            onClick={() => navigateTo('work')}
          />

          <SidebarButton
            active={activeView === 'writing'}
            icon={<FileText size={12} />}
            label="Writing"
            onClick={() => navigateTo('writing')}
          />

          <SidebarButton
            active={activeView === 'about'}
            icon={<UserRound size={12} />}
            label="About"
            onClick={() => navigateTo('about')}
          />
        </nav>

        {/* =================================================
            CHAT HISTORY
            Appears automatically after the first prompt.
        ================================================= */}

        <div className="sidebar-history">
          <div className="sidebar-history-heading">
            <span className="sidebar-label">Chats</span>

            {threads.length > 0 && (
              <button
                type="button"
                className="clear-chats-button"
                onClick={clearAllChats}
                title="Delete all chats"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="history-list">
            {threads.length === 0 ? (
              <span className="history-empty">No chats yet</span>
            ) : (
              threads.map((thread) => (
                <div
                  className={`history-row ${
                    activeView === 'chat' &&
                    activeThreadId === thread.id
                      ? 'active'
                      : ''
                  }`}
                  key={thread.id}
                >
                  <button
                    type="button"
                    className="history-item"
                    onClick={() => openThread(thread.id)}
                    title={thread.title}
                  >
                    {thread.title}
                  </button>

                  <button
                    type="button"
                    className="history-delete"
                    onClick={(event) => {
                      event.stopPropagation()
                      deleteThread(thread.id)
                    }}
                    aria-label={`Delete chat: ${thread.title}`}
                    title="Delete chat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="sidebar-secondary">
          <a href="/computer" className="sidebar-link">
            Perdana&apos;s Computer
            <ArrowUpRight size={12} />
          </a>

          <a
            href="https://linkedin.com/in/perdanakun/"
            className="sidebar-link"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
            <ArrowUpRight size={12} />
          </a>

          <a
            href="https://github.com/perdanakun"
            className="sidebar-link"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <ArrowUpRight size={12} />
          </a>

          <a
            href="https://www.instagram.com/perdanakun/"
            className="sidebar-link"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
            <ArrowUpRight size={12} />
          </a>
        </div>


      </aside>

      {/* =================================================
          ONE WORKSPACE
          Home, portfolio pages and AI conversation all
          occupy this same central scroll area.
      ================================================= */}

      <main className="portfolio-workspace">
        <div
          className="workspace-scroll"
          ref={activeView === 'chat' ? conversationRef : null}
        >
          {activeView === 'home' && (
            <HomeView
              input={input}
              setInput={setInput}
              onSubmit={submit}
              onKeyDown={handleKeyDown}
              isThinking={isThinking}
              onAsk={ask}
            />
          )}

          {activeView === 'work' && <WorkView onAsk={ask} />}
          {activeView === 'writing' && <WritingView onAsk={ask} />}
          {activeView === 'about' && <AboutView onAsk={ask} />}

          {isChatView && (
            <ChatView
              thread={activeThread}
              isThinking={isThinking}
            />
          )}
        </div>

        {activeView !== 'home' && (
          <ChatComposer
            input={input}
            setInput={setInput}
            onSubmit={submit}
            onKeyDown={handleKeyDown}
            isThinking={isThinking}
            placeholder={currentConfig.placeholder}
            suggestions={
              activeView === 'chat'
                ? []
                : currentConfig.suggestions
            }
            onAsk={ask}
          />
        )}

        <p className="portfolio-footer">
          AI can make mistakes. Explore the portfolio for the full context.
          <span> Want to connect? </span>
          <a
            href="https://linkedin.com/in/perdanakun/"
            target="_blank"
            rel="noreferrer"
          >
            Find me on LinkedIn.
          </a>
        </p>
      </main>
    </div>
  )
}

/* =====================================================
   SIDEBAR BUTTON
===================================================== */

function SidebarButton({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`sidebar-nav-button ${
        active ? 'active' : ''
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

/* =====================================================
   HOME / NEW CHAT STATE
===================================================== */

function HomeView({
  input,
  setInput,
  onSubmit,
  onKeyDown,
  isThinking,
  onAsk,
}) {
  return (
    <section className="home-view">
      <div className="home-content">
        <h1>
          Designer who <u>understand business</u>{' '}
          <i><ScrambleText text="design in code" /></i>{' '}& <b>ships it.</b>
        </h1>

        <a
          href="/computer"
          className="home-explore-link"
        >
          <span>Explore more on</span>
          <strong>Perdana&apos;s Computer</strong>
          <ArrowUpRight size={13} />
        </a>

        <ChatComposer
          variant="home"
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
          isThinking={isThinking}
          placeholder="Ask about Perdana"
          suggestions={viewConfig.home.suggestions}
          onAsk={onAsk}
        />
      </div>
    </section>
  )
}

/* =====================================================
   SCRAMBLE TEXT
===================================================== */

function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState(text)
  const timerRef = useRef(null)

  const runScramble = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      setDisplayText(text)
      return
    }

    if (timerRef.current) {
      window.clearInterval(timerRef.current)
    }

    const characters = '01{}[]<>/\\*+-=_$#@'
    let frame = 0
    const revealEvery = 2

    timerRef.current = window.setInterval(() => {
      frame += 1

      const revealedCharacters = Math.floor(
        frame / revealEvery,
      )

      const nextText = text
        .split('')
        .map((character, index) => {
          if (character === ' ') return ' '

          if (index < revealedCharacters) {
            return character
          }

          return characters[
            Math.floor(Math.random() * characters.length)
          ]
        })
        .join('')

      setDisplayText(nextText)

      if (revealedCharacters >= text.length) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
        setDisplayText(text)
      }
    }, 42)
  }

  useEffect(() => {
    runScramble()

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [text])

  return (
    <span
      className="scramble-text"
      aria-label={text}
      onMouseEnter={runScramble}
      onFocus={runScramble}
      tabIndex={0}
    >
      <span aria-hidden="true">
        {displayText}
      </span>
    </span>
  )
}

/* =====================================================
   CHAT COMPOSER
===================================================== */

function ChatComposer({
  variant = 'default',
  input,
  setInput,
  onSubmit,
  onKeyDown,
  isThinking,
  placeholder,
  suggestions = [],
  onAsk,
}) {
  const isHome = variant === 'home'

  return (
    <div
      className={`composer-area ${
        isHome ? 'home-composer-area' : ''
      }`}
    >
      {!isHome && suggestions.length > 0 && (
        <div className="composer-suggestions">
          {suggestions.map((question) => (
            <button
              type="button"
              key={question}
              onClick={() => onAsk(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}

      <div className="composer-shell">
        <textarea
          rows={1}
          value={input}
          placeholder={placeholder}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          disabled={isThinking}
        />

        <button
          type="button"
          className="composer-send"
          onClick={onSubmit}
          disabled={!input.trim() || isThinking}
          aria-label="Send message"
        >
          <SendHorizontal size={17} />
        </button>
      </div>

      {isHome && suggestions.length > 0 && (
        <div className="composer-suggestions home-question-suggestion">
          {suggestions.map((question) => (
            <button
              type="button"
              key={question}
              onClick={() => onAsk(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* =====================================================
   CHAT VIEW
   This replaces Home after the first prompt.
===================================================== */

function ChatView({
  thread,
  isThinking,
}) {
  return (
    <section className="chat-view">
      <div className="conversation-messages">
        {thread.messages.map((message, index) => (
          <div
            key={`${thread.id}-${index}`}
            className={`message ${
              message.role === 'user'
                ? 'user-message'
                : 'assistant-message'
            }`}
          >
            <div className="message-body">
              {message.text}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="message assistant-message">
            <div className="thinking-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* =====================================================
   WORK VIEW
===================================================== */

function WorkView({ onAsk }) {
  return (
    <section className="content-view">
      <header className="view-header">
        <p>PORTFOLIO</p>
        <h1>Recent work</h1>

        <span>
          A selection of product, design engineering, and visual
          design work.
        </span>
      </header>

      <div className="project-grid">
        {projects.map((project, index) => (
          <button
            type="button"
            className="project-card"
            key={project.title}
            onClick={() => onAsk(project.prompt)}
          >
            <div className="project-card-top">
              <span>
                {String(index + 1).padStart(2, '0')}
              </span>

              <ArrowUpRight size={16} />
            </div>

            <div className="project-card-body">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>

            <div className="project-card-meta">
              <span>{project.type}</span>
              <span>{project.year}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

/* =====================================================
   WRITING VIEW
===================================================== */

function WritingView({ onAsk }) {
  return (
    <section className="content-view">
      <header className="view-header">
        <p>WRITING</p>

        <h1>
          Notes on design, work and technology.
        </h1>

        <span>
          Essays about design practice, AI, career transitions,
          and building things.
        </span>
      </header>

      <div className="article-list">
        {writings.map((article, index) => (
          <button
            type="button"
            className="article-row"
            key={article.title}
            onClick={() => onAsk(article.prompt)}
          >
            <span className="article-index">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div>
              <h2>{article.title}</h2>
              <span>{article.meta}</span>
            </div>

            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
    </section>
  )
}

/* =====================================================
   ABOUT VIEW
===================================================== */

function AboutView({ onAsk }) {
  return (
    <section className="content-view about-view">
      <header className="view-header">
        <p>ABOUT</p>

        <h1>
          A visual designer learning to take ideas further into
          products and code.
        </h1>
      </header>

      <div className="about-copy">
        <p>
          I’ve spent more than a decade working across visual
          design, iconography, illustration, and digital
          experiences.
        </p>

        <p>
          That work taught me how to build visual systems, make
          decisions under constraints, work with clients, and
          translate ambiguous ideas into something tangible.
        </p>

        <p>
          I’m now moving deeper into product design while
          learning how those design decisions translate into
          working interfaces through React and front-end
          development.
        </p>
      </div>

      <div className="about-facts">
        <div>
          <span>10+ years</span>
          <p>Visual design experience</p>
        </div>

        <div>
          <span>3,000+</span>
          <p>Icons and illustrations</p>
        </div>

        <div>
          <span>Product Design</span>
          <p>Current direction</p>
        </div>

        <div>
          <span>React</span>
          <p>Currently building with</p>
        </div>
      </div>

      <button
        type="button"
        className="ask-about-button"
        onClick={() =>
          onAsk(
            'Tell me more about Perdana’s background, experience, and transition into product design.',
          )
        }
      >
        Ask about my background
        <ArrowUpRight size={14} />
      </button>
    </section>
  )
}

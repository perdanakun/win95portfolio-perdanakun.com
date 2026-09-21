import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  Eye,
  Home,
  Menu,
  Moon,
  SendHorizontal,
  Sparkles,
  Sun,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'

import { getAIResponse } from '../services/aiService.js'
import HoloHealthContent from '../project/HoloHealthContent.jsx'
import resumePdf from '../assets/files/perdana_kurniawan_arta_resume.pdf'
import './PortfolioHome.css'

/* =====================================================
   PROJECT MEDIA
   Assets live in /public, so they do not need JS imports.
   Build the gallery from the folder naming convention instead.
===================================================== */

function createProjectMedia({
  folder,
  total,
  videoSlides = [],
  extras = [],
}) {
  const videoSet = new Set(videoSlides)

  const numberedMedia = Array.from(
    { length: total },
    (_, index) => {
      const slideNumber = index + 1
      const fileNumber = String(slideNumber).padStart(2, '0')
      const extension = videoSet.has(slideNumber)
        ? 'webm'
        : 'png'

      return `/projects/${folder}/case-study/slides/${fileNumber}.${extension}`
    },
  )

  const extraMedia = extras.map(
    (fileName) =>
      `/projects/${folder}/case-study/slides/${fileName}`,
  )

  return [...numberedMedia, ...extraMedia]
}

function createWritingThumbnail(number) {
  const base = `/writings/${number}`

  return [
    `${base}.png`,
    `${base}.jpg`,
    `${base}.jpeg`,
    `${base}.webp`,
    `${base}.gif`,
  ]
}


function createAboutMedia(number) {
  const base = `/projects/${number}`

  return [
    `${base}.png`,
    `${base}.jpg`,
    `${base}.jpeg`,
    `${base}.webp`,
    `${base}.gif`,
    `${base}.webm`,
    `${base}.mp4`,
  ]
}

const aboutGallery = Array.from(
  { length: 5 },
  (_, index) =>
    createAboutMedia(
      String(index + 1).padStart(2, '0'),
    ),
)

/* =====================================================
   DATA
===================================================== */

const projects = [
  {
    title: 'TravelXXX',
    editorialTitle: 'Reducing Uncertainty in Hotel Booking',
    type: 'Product Design',
    year: '2026',
    description:
      'A hotel search and booking exploration focused on reducing uncertainty around rooms, pricing, and availability.',
    prompt:
      'Tell me about the TravelXXX project. What problem was Perdana trying to solve, and what design decisions did he make?',
    slug: 'travelxxx',
    cover: '/projects/travelxxx.webm',
    gallery: createProjectMedia({
      folder: 'travelxxx',
      total: 17,
      videoSlides: [8, 10, 12, 15],
    }),
  },
  {
    title: "Perdana's Computer",
    editorialTitle: 'The first and ugliest portfolio ever',
    type: 'Design Engineering',
    year: '2026',
    description:
      'An experimental personal portfolio designed and built as a Windows 95-inspired desktop environment using React.',
    prompt:
      "Tell me about Perdana's Computer, why it was designed like Windows 95, and how it was built.",
    slug: 'perdana-computer',
    cover: '/projects/perdanakun.webm',
    gallery: createProjectMedia({
      folder: 'perdana-computer',
      total: 7,
      extras: ['perdanakun.png'],
    }),
  },
  {
    title: 'HoloHealth',
    editorialTitle: 'Making Veterinary Care Easier to Understand',
    type: 'Iconography Design System',
    year: '2026',
    description:
      'An icon library designed for a veterinary project, translating complex veterinary terms and concepts into clear, approachable visual language.',
    prompt:
      'Tell me about the HoloHealth project and what Perdana explored in it.',
    slug: 'holohealth',
    cover: null,
  },
  {
    title: 'ShipFaster',
    editorialTitle: 'Designing Icons for UI kit and Design System',
    type: 'Iconography Design System',
    year: '2026',
    description:
      'An icon library designed for digital product templates and design systems, giving designers a flexible and consistent set of icons to work with. The project explored visual consistency, reusable components, variants, and sizing to make iconography easier to use across product interfaces.',
    prompt:
      'Tell me about the ShipFaster project and how Perdana designed its icon system for digital products.',
    slug: 'shipfaster',
    cover: null,
  },
  {
    title: 'Mayora',
    editorialTitle: 'Designing for Everyday Attention',
    type: 'Visual Design',
    year: '2019–2022',
    description:
      'Social media visual design work supporting Mayora brands across an extended period of audience growth.',
    prompt:
      'Tell me about Perdana’s visual design work for Mayora.',
    slug: 'mayora',
    cover: null,
    externalCaseStudy:
      'https://honorable-slicer-cf7.notion.site/Mayora-Unwrapped-Strategic-Social-Media-in-Action-2d13e6c89623802aaf4fe1ed7c23ae28',
  },
]

const writings = [
  {
    title:
      'Getting Killed by AI: The End of the Average Design Freelancer',
    meta: '2026 · LinkedIn',
    thumbnail: createWritingThumbnail('01'),
    url:
      'https://www.linkedin.com/pulse/getting-killed-ai-end-average-design-freelancer-kurniawan-arta-7urlc/',
    prompt:
      'Summarize Perdana’s essay "Getting Killed by AI: The End of the Average Design Freelancer."',
  },
  {
    title:
      'What Does “Entry Level” Mean When You’re Pivoting Into Product Design?',
    meta: '2026 · LinkedIn',
    thumbnail: createWritingThumbnail('02'),
    url:
      'https://www.linkedin.com/pulse/what-does-entry-level-mean-when-youre-pivoting-design-kurniawan-arta-kbb1c/',
    prompt:
      'Tell me about Perdana’s writing on being entry level while transitioning into product design.',
  },
  {
    title:
      'I Spent a Decade Learning How to Design Things. Now I Want to Learn How to Build Them.',
    meta: '2026 · Medium',
    thumbnail: createWritingThumbnail('03'),
    url:
      'https://medium.com/@perdanakun/i-spent-a-decade-learning-how-to-design-things-now-i-want-to-learn-how-to-build-them-6d3985c24f35',
    prompt:
      'Tell me about Perdana’s essay about spending a decade learning design and now learning how to build.',
  },
]

const viewConfig = {
  home: {
    label: 'Home',
    placeholder: 'Ask about Perdana',
    suggestions: [
      {
        label: 'Summarize Perdana',
        icon: Sparkles,
        type: 'chat',
        prompt:
          'Give me a concise overview of Perdana: his background, current direction, work, and what he is learning to build.',
      },
      {
        label: 'See what he built',
        icon: BriefcaseBusiness,
        type: 'page',
        view: 'work',
        prompt:
          'Give me a concise overview of Perdana’s work, the kinds of problems he explores, and how his projects connect visual design, product thinking, and code.',
      },
      {
        label: 'Explore his writing',
        icon: FileText,
        type: 'page',
        view: 'writing',
        prompt:
          'Give me a concise overview of what Perdana writes about and the recurring themes across his essays.',
      },
      {
        label: 'Who is Perdana?',
        icon: UserRound,
        type: 'page',
        view: 'about',
        prompt:
          'Give me a concise overview of Perdana’s background, experience, and current transition into product design and design engineering.',
      },
    ],
  },

  work: {
    label: 'Work',
    placeholder: 'Ask about my work',
    suggestions: [
      'Which project best shows product thinking?',
      'Show me his visual design background.',
    ],
  },

  writing: {
    label: 'Writing',
    placeholder: 'Ask about my writing',
    suggestions: [
      'What does Perdana write about?',
      'Summarize his essay about AI and freelancers.',
    ],
  },

  about: {
    label: 'About',
    placeholder: 'Ask about my background',
    suggestions: [
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


function getGreetingByTime(hour) {
  if (hour < 5) return 'Still up?'
  if (hour < 8) return 'Early start?'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  if (hour < 22) return 'Good evening'

  return 'Good night!'
}

const homePlaceholderPrompts = [
  'ask me anything about Perdana',
  'curious about what he is building?',
  'want to see his work?',
  'ask about his design process',
  'curious why he is learning to code?',
  'want the short version of his background?',
]

function useDynamicHomePlaceholder(active) {
  const [promptIndex, setPromptIndex] = useState(0)
  const [typedPrompt, setTypedPrompt] = useState('')
  const [greeting, setGreeting] = useState(() =>
    getGreetingByTime(new Date().getHours()),
  )
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia('(max-width: 760px)').matches,
  )

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(
        getGreetingByTime(new Date().getHours()),
      )
    }

    updateGreeting()

    const timer = window.setInterval(
      updateGreeting,
      60 * 1000,
    )

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const mediaQuery =
      window.matchMedia('(max-width: 760px)')

    const handleChange = (event) => {
      setIsMobile(event.matches)
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener(
      'change',
      handleChange,
    )

    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleChange,
      )
    }
  }, [])

  useEffect(() => {
    if (!active || isMobile) {
      setTypedPrompt('')
      return undefined
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const prompt =
      homePlaceholderPrompts[promptIndex]

    if (reduceMotion) {
      setTypedPrompt(prompt)
      return undefined
    }

    let timeoutId
    let cancelled = false
    let characterIndex = 0

    const typeNextCharacter = () => {
      if (cancelled) return

      characterIndex += 1

      setTypedPrompt(
        prompt.slice(0, characterIndex),
      )

      if (characterIndex < prompt.length) {
        timeoutId = window.setTimeout(
          typeNextCharacter,
          34,
        )
        return
      }

      timeoutId = window.setTimeout(
        eraseCharacter,
        1900,
      )
    }

    const eraseCharacter = () => {
      if (cancelled) return

      characterIndex -= 1

      setTypedPrompt(
        prompt.slice(0, characterIndex),
      )

      if (characterIndex > 0) {
        timeoutId = window.setTimeout(
          eraseCharacter,
          18,
        )
        return
      }

      timeoutId = window.setTimeout(() => {
        if (cancelled) return

        setPromptIndex(
          (current) =>
            (current + 1) %
            homePlaceholderPrompts.length,
        )
      }, 260)
    }

    setTypedPrompt('')

    timeoutId = window.setTimeout(
      typeNextCharacter,
      350,
    )

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [active, promptIndex, isMobile])

  if (!active) {
    return ''
  }

  if (isMobile) {
    return greeting
  }

  return `${greeting}... ${typedPrompt}`
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
  const [activeProjectSlug, setActiveProjectSlug] = useState(null)
  const [pageInsight, setPageInsight] = useState(null)

  const conversationRef = useRef(null)
  const themeAnimatingRef = useRef(false)
  const pageInsightRequestRef = useRef(0)

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

  const handleThemeToggle = async (event) => {
    const nextDark = !dark

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (
      reduceMotion ||
      typeof document.startViewTransition !==
        'function'
    ) {
      setDark(nextDark)
      return
    }

    if (themeAnimatingRef.current) return

    themeAnimatingRef.current = true

    const rect =
      event.currentTarget.getBoundingClientRect()

    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition =
      document.startViewTransition(() => {
        flushSync(() => {
          setDark(nextDark)
        })
      })

    try {
      await transition.ready

      const animation =
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 560,
            easing:
              'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement:
              '::view-transition-new(root)',
          },
        )

      await animation.finished
    } catch {
      // If the browser aborts the transition,
      // the theme state has still already changed.
    } finally {
      themeAnimatingRef.current = false
    }
  }

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const navigateTo = (view) => {
    setActiveView(view)
    setActiveThreadId(null)
    setPageInsight(null)
    setSidebarOpen(false)
  }

  const newChat = () => {
    setActiveView('home')
    setActiveThreadId(null)
    setPageInsight(null)
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

  const openPageWithAI = async (view, prompt) => {
    const requestId =
      pageInsightRequestRef.current + 1

    pageInsightRequestRef.current = requestId

    setActiveThreadId(null)
    setActiveProjectSlug(null)
    setActiveView(view)
    setSidebarOpen(false)

    setPageInsight({
      view,
      text: '',
      isLoading: true,
    })

    try {
      const answer = await getAIResponse(
        prompt,
        [],
      )

      if (
        pageInsightRequestRef.current !==
        requestId
      ) {
        return
      }

      setPageInsight({
        view,
        text: answer,
        isLoading: false,
      })
    } catch (error) {
      console.error(error)

      if (
        pageInsightRequestRef.current !==
        requestId
      ) {
        return
      }

      setPageInsight({
        view,
        text:
          "I couldn't load the summary just now.",
        isLoading: false,
      })
    }
  }

  const handleHomeSuggestion = (suggestion) => {
    if (suggestion.type === 'page') {
      openPageWithAI(
        suggestion.view,
        suggestion.prompt,
      )
      return
    }

    ask(suggestion.prompt)
  }

  /* =====================================================
     CHAT
  ===================================================== */

  const ask = async (question, options = {}) => {
    const cleanQuestion = question.trim()

    if (options.projectSlug) {
      setActiveProjectSlug(options.projectSlug)
    } else if (activeView !== 'chat') {
      setActiveProjectSlug(null)
    }

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
        <span className="top-identity-avatar" aria-hidden="true">
          <img src="/profile/perdanakun.png" alt="" />
        </span>
        <span>Perdanakun</span>
      </button>

        <div className="top-right-controls">
          <button
            type="button"
            className="top-theme-toggle"
            onClick={handleThemeToggle}
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
            label="Work"
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
              onHomeSuggestion={handleHomeSuggestion}
            />
          )}

          {activeView === 'work' && (
            <WorkView
              onAsk={(project) =>
                ask(project.prompt, { projectSlug: project.slug })
              }
              insight={
                pageInsight?.view === 'work'
                  ? pageInsight
                  : null
              }
            />
          )}
          {activeView === 'writing' && (
            <WritingView
              insight={
                pageInsight?.view === 'writing'
                  ? pageInsight
                  : null
              }
            />
          )}

          {activeView === 'about' && (
            <AboutView
              onAsk={ask}
              insight={
                pageInsight?.view === 'about'
                  ? pageInsight
                  : null
              }
            />
          )}

          {isChatView && (
            <ChatView
              thread={activeThread}
              isThinking={isThinking}
              project={
                projects.find(
                  (project) => project.slug === activeProjectSlug,
                ) || null
              }
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

        {activeView === 'home' && (
          <p className="portfolio-footer">
            <span className="portfolio-footer-desktop">
              AI-generated content may occasionally contain inaccuracies or incomplete context. For the full and accurate picture, explore this portfolio further, or visit{' '}
              <a href="/computer">Perdana&apos;s Computer</a>, connect with me on{' '}
              <a
                href="https://linkedin.com/in/perdanakun/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>{' '}
              and see what I&apos;m building on{' '}
              <a
                href="https://github.com/perdanakun"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>.
            </span>

            <span className="portfolio-footer-mobile">
              AI can make mistakes. Connect via{' '}
              <a
                href="https://linkedin.com/in/perdanakun/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>.
            </span>
          </p>
        )}
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
  onHomeSuggestion,
}) {
  const dynamicPlaceholder =
    useDynamicHomePlaceholder(!input)

  return (
    <section className="home-view">
      <div className="home-content">
        <h1 className="hero-heading">
          <span className="hero-row">
            <span className="hero-chunk">
              Designer who
            </span>{' '}
            <u className="hero-chunk">
              understand business
            </u>
          </span>

          <span className="hero-row">
            <i className="hero-chunk">
              <ScrambleText text="design in code" />
            </i>{' '}
            <span className="hero-chunk">
              & <b>ships it.</b>
            </span>
          </span>
        </h1>

        <ChatComposer
          variant="home"
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
          isThinking={isThinking}
          placeholder={dynamicPlaceholder}
          suggestions={viewConfig.home.suggestions}
          onAsk={onAsk}
          onSuggestion={onHomeSuggestion}
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
  onSuggestion,
}) {
  const isHome = variant === 'home'

  const getSuggestionLabel = (suggestion) =>
    typeof suggestion === 'string'
      ? suggestion
      : suggestion.label

  const getSuggestionIcon = (suggestion) =>
    typeof suggestion === 'string'
      ? null
      : suggestion.icon || null

  const handleSuggestionClick = (suggestion) => {
    if (onSuggestion) {
      onSuggestion(suggestion)
      return
    }

    const prompt =
      typeof suggestion === 'string'
        ? suggestion
        : suggestion.prompt || suggestion.label

    onAsk(prompt)
  }

  return (
    <div
      className={`composer-area ${
        isHome ? 'home-composer-area' : ''
      }`}
    >
      {!isHome && suggestions.length > 0 && (
        <div className="composer-suggestions">
          {suggestions.map((suggestion) => {
            const label =
              getSuggestionLabel(suggestion)
            const SuggestionIcon =
              getSuggestionIcon(suggestion)

            return (
              <button
                type="button"
                key={label}
                onClick={() =>
                  handleSuggestionClick(suggestion)
                }
              >
                {SuggestionIcon && (
                  <SuggestionIcon
                    className="suggestion-icon"
                    size={13}
                    aria-hidden="true"
                  />
                )}
                <span>{label}</span>
              </button>
            )
          })}
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
          {suggestions.map((suggestion) => {
            const label =
              getSuggestionLabel(suggestion)
            const SuggestionIcon =
              getSuggestionIcon(suggestion)

            return (
              <button
                type="button"
                key={label}
                onClick={() =>
                  handleSuggestionClick(suggestion)
                }
              >
                {SuggestionIcon && (
                  <SuggestionIcon
                    className="suggestion-icon"
                    size={13}
                    aria-hidden="true"
                  />
                )}
                <span>{label}</span>
              </button>
            )
          })}
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
  project,
}) {
  return (
    <section className="chat-view">
      <div className="conversation-messages">
        {thread.messages.map((message, index) => (
          <div
            key={`${thread.id}-${index}`}
            className={`message ${
              message.role === 'user' ? 'user-message' : 'assistant-message'
            }`}
          >
            <div className="message-body">{message.text}</div>
          </div>
        ))}

        {!isThinking && project && (
          <ProjectCaseStudy project={project} />
        )}

        {isThinking && (
          <div className="message assistant-message">
            <div className="thinking-dots">
              <span />
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

function ProjectCaseStudy({ project }) {
  if (project.slug === 'holohealth') {
    return (
      <section className="chat-holohealth-case-study">
        <HoloHealthContent embedded />
      </section>
    )
  }

  if (project.slug === 'mayora') {
    return (
      <section className="chat-project-case-study chat-external-case-study">
        <div className="chat-project-heading">
          <span>FULL CASE STUDY</span>
          <h2>Mayora Unwrapped</h2>
          <p>
            The complete case study lives on Notion, including the broader
            social media strategy, visual work, and project context.
          </p>
        </div>

        <a
          className="external-case-study-link"
          href={project.externalCaseStudy}
          target="_blank"
          rel="noreferrer"
        >
          View full case study on Notion
          <ArrowUpRight size={14} />
        </a>
      </section>
    )
  }

  if (!project.gallery?.length) {
    return null
  }

  return (
    <section className="chat-project-case-study">
      <div className="chat-project-heading">
        <span>CASE STUDY</span>
        <h2>{project.title}</h2>
        <p>
          Selected visuals from the project. Ask a follow-up about the problem,
          process, or design decisions for more context.
        </p>
      </div>

      <div className="chat-project-gallery">
        {project.gallery.map((src, index) => {
          const isVideo = src.endsWith('.webm')

          return (
            <figure className="chat-project-visual" key={src}>
              {isVideo ? (
                <video
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} case study motion visual ${index + 1}`}
                />
              ) : (
                <img
                  src={src}
                  alt={`${project.title} case study visual ${index + 1}`}
                  loading="lazy"
                />
              )}
            </figure>
          )
        })}
      </div>
    </section>
  )
}

function PageAIInsight({ insight }) {
  if (!insight) return null

  return (
    <div className="page-ai-insight">
      <span className="page-ai-insight-label">
        AI SUMMARY
      </span>

      {insight.isLoading ? (
        <div className="thinking-dots">
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <p>{insight.text}</p>
      )}
    </div>
  )
}

function PortfolioMedia({
  src,
  label,
  compact = false,
}) {
  const sources = Array.isArray(src)
    ? src
    : src
      ? [src]
      : []

  const [sourceIndex, setSourceIndex] =
    useState(0)
  const [sourceFailed, setSourceFailed] =
    useState(false)

  useEffect(() => {
    setSourceIndex(0)
    setSourceFailed(false)
  }, [src])

  const activeSrc =
    !sourceFailed && sources.length > 0
      ? sources[sourceIndex]
      : null

  const isVideo =
    typeof activeSrc === 'string' &&
    /\.(webm|mp4)$/i.test(activeSrc)

  const handleMediaError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex(
        (current) => current + 1,
      )
      return
    }

    setSourceFailed(true)
  }

  return (
    <div
      className={`portfolio-media ${
        compact ? 'is-compact' : ''
      } ${
        activeSrc
          ? 'has-media'
          : 'is-placeholder'
      }`}
    >
      {activeSrc ? (
        isVideo ? (
          <video
            src={activeSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            onError={handleMediaError}
          />
        ) : (
          <img
            src={activeSrc}
            alt={label}
            loading="lazy"
            onError={handleMediaError}
          />
        )
      ) : (
        <div className="portfolio-media-placeholder">
          <span>MEDIA PLACEHOLDER</span>
          <strong>{label}</strong>
        </div>
      )}
    </div>
  )
}

/* =====================================================
   WORK VIEW
===================================================== */

function WorkView({ onAsk, insight }) {
  const featuredProjects = projects.slice(0, 2)
  const secondaryProjects = projects.slice(2)

  const handleProjectPointerMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect()

    event.currentTarget.style.setProperty(
      '--project-cursor-x',
      `${event.clientX - rect.left}px`,
    )

    event.currentTarget.style.setProperty(
      '--project-cursor-y',
      `${event.clientY - rect.top}px`,
    )
  }

  return (
    <section className="content-view">
      <header className="view-header">
        <p>PORTFOLIO</p>
        <h1>Where visual craft meets product thinking.</h1>

        <span>
        Selected projects across product design, design engineering, and visual systems.
        </span>
      </header>

      <PageAIInsight insight={insight} />

      <div className="project-grid">
        {featuredProjects.map((project) => (
          <button
            type="button"
            className="project-card"
            key={project.title}
            onClick={() => onAsk(project)}
          >
            <div
              className="project-media-interaction"
              onPointerMove={handleProjectPointerMove}
            >
              <PortfolioMedia
                src={project.cover}
                label={`${project.title} project preview`}
              />

              <span
                className="project-hover-indicator"
                aria-hidden="true"
              >
                <Eye size={14} />
                <span>Explore more detail</span>
              </span>
            </div>

            <div className="project-card-content">
              <h2>{project.editorialTitle}</h2>

              <div className="project-card-meta">
                <span>{project.title}</span>
                <span>{project.year}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="work-secondary-section">
        <p className="work-secondary-label">
          More work
        </p>

        <div className="work-secondary-list">
          {secondaryProjects.map((project) => (
            <button
              type="button"
              className="work-secondary-row"
              key={project.title}
              onClick={() => onAsk(project)}
            >
              <div className="work-secondary-copy">
                <h2>{project.editorialTitle}</h2>

                <div className="work-secondary-meta">
                  <span>{project.title}</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <ArrowUpRight
                className="work-secondary-arrow"
                size={16}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =====================================================
   WRITING VIEW
===================================================== */

function WritingView({ insight }) {
  return (
    <section className="content-view">
      <header className="view-header">
        <p>WRITING</p>

        <h1>
          Notes on design, work and technology.
        </h1>

        <span>
          Essays about design practice, AI, career
          transitions, and building things.
        </span>
      </header>

      <PageAIInsight insight={insight} />

      <div className="article-list">
        {writings.map((article, index) => (
          <a
            className="article-row"
            key={article.title}
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            <PortfolioMedia
              src={article.thumbnail}
              label={`${article.title} article cover`}
              compact
            />

            <div className="article-content">
              <div className="article-heading">
                <ArrowUpRight
                  className="article-arrow"
                  size={16}
                />
              </div>

              <h2>{article.title}</h2>
              <span>{article.meta}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
/* =====================================================
   EXPERIENCE DATA
===================================================== */

const experienceTimeline = [
  {
    period: '2026 — Present',
    title: 'TravelXXX',
    role: 'Product Design Project',
    href: 'https://travelxxx.perdanakun.com',
    current: true,
    description:
      'Exploring hotel discovery and booking around contextual search, clearer comparison, and more confident decision-making.',
    meta: 'Research → Hypothesis → Prototype → Test → Iterate',
  },

  {
    period: '2026 — Present',
    title: 'Perdana’s Computer',
    role: 'Product Design Portfolio',
    href: '/computer',
    current: true,
    description:
      'Designed and built my portfolio as a live product experiment, combining product decisions, interaction design, AI, and front-end development.',
    meta: 'Design → Build → Test → Ship',
  },

  {
    period: '2026 — Present',
    title: 'Professional Development',
    role: 'Product Design & Design Engineering',
    current: true,
    description:
      'Taking a strategic break from client work to move deeper into product design while developing hands-on design engineering skills.',
    meta: 'UX · Prototyping · React · Design Systems · AI',
  },

  {
    period: '2016 — 2026',
    title: 'Conania',
    role: 'Visual Designer & Design Lead',
    href: 'YOUR_CONANIA_OR_FIVERR_URL',
    description:
      'Worked directly with founders, startups, and small businesses across 3,000+ projects, building visual systems and turning ambiguous requirements into implementation-ready design.',
    meta: '3,000+ projects · 2,000+ five-star ratings · 10+ years',
  },

  {
    period: '2019 — 2022',
    title: 'Sinidikara',
    role: 'Social Media Designer',
    description:
      'Built scalable visual systems and data-informed content for brands including Kopiko, Beng-Beng, and Le Minerale, contributing to community growth from 40K to 100K followers.',
    meta: 'Visual Systems · Content Strategy · Performance Data',
  },

  {
    period: '2015 — 2019',
    title: 'Earlier Experience',
    role: 'Design & Technical Foundations',
    description:
      'Worked across environmental graphics, design curation, illustration production, and technical network operations before moving fully into independent visual design.',
    meta: 'Bank Mandiri · Kementerian Sekretariat Negara · Mehibi · Telkom',
  },
];


/* =====================================================
   ABOUT VIEW
===================================================== */

function AboutView({ onAsk, insight }) {
  return (
    <section className="content-view about-view">
      <header className="view-header">
        <p>ABOUT</p>

        <h1>
          A designer who understands business, designs in code,
          and ships.
        </h1>
      </header>

      <PageAIInsight insight={insight} />

      {/* =================================================
          ABOUT COPY
      ================================================= */}

      <div className="about-copy">
        <p>
          I’ve spent more than 10 years working as a visual designer
          and design lead, directly with clients, founders, and small
          businesses across{' '}
          <a
            href="YOUR_FIVERR_OR_CONANIA_URL"
            target="_blank"
            rel="noreferrer"
            className="about-inline-link"
          >
            3,000+ projects
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
          .
        </p>

        <p>
          That experience shaped more than visual craft. It taught me
          how to understand business goals, navigate constraints and
          trade-offs, communicate with stakeholders, and turn
          ambiguous ideas into clear, scalable design systems.
        </p>

        <p>
          Now I’m bringing that foundation into{' '}
          <a href="/work" className="about-inline-link">
            product design
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
          , working across UX, interaction, prototyping, and
          implementation. I use{' '}
          <a href="/computer" className="about-inline-link">
            React and front-end development
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>{' '}
          to take ideas beyond static screens and understand how
          design decisions behave in real products.
        </p>

        <p>
          I’m not starting over. I’m moving closer to the product,
          combining design craft, business context, and code to
          design, build, and ship.
        </p>
      </div>
      {/* =================================================
          EXPERIENCE TIMELINE
      ================================================= */}

      <section className="experience-section">
        <div className="experience-heading">
          <p>EXPERIENCE</p>
        </div>

        <div className="experience-timeline">
          {experienceTimeline.map((item, index) => (
            <article
              className="experience-item"
              key={`${item.title}-${index}`}
            >
              <div className="experience-marker">
                <span
                  className={
                    item.current
                      ? 'experience-dot is-current'
                      : 'experience-dot'
                  }
                />

                {index < experienceTimeline.length - 1 && (
                  <span className="experience-line" />
                )}
              </div>

              <div className="experience-content">
                <div className="experience-topline">
                  <p className="experience-period">
                    {item.period}
                  </p>

                  {item.current && (
                    <span className="experience-current">
                      NOW
                    </span>
                  )}
                </div>

                <div className="experience-title-row">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith('http')
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        item.href.startsWith('http')
                          ? 'noreferrer'
                          : undefined
                      }
                      className="experience-title-link"
                    >
                      <h3>{item.title}</h3>

                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.8}
                      />
                    </a>
                  ) : (
                    <h3>{item.title}</h3>
                  )}

                  <p className="experience-role">
                    {item.role}
                  </p>
                </div>

                <p className="experience-description">
                  {item.description}
                </p>

                <p className="experience-meta">
                  {item.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =================================================
          ASK AI
      ================================================= */}

      <div className="about-actions">
        <button
          type="button"
          className="ask-about-button"
          onClick={() =>
            onAsk(
              'Tell me more about Perdana’s background, business experience, and transition from visual design into product design and code.',
            )
          }
        >
          Ask about my background
          <ArrowUpRight size={14} strokeWidth={1.8} />
        </button>
      </div>

      {/* =================================================
          VISUAL GALLERY
      ================================================= */}

      <div className="about-gallery">
        {aboutGallery.map((sources, index) => (
          <div
            className="about-gallery-item"
            key={`about-${index + 1}`}
          >
            <PortfolioMedia
              src={sources}
              label={`Perdana visual ${String(index + 1).padStart(
                2,
                '0',
              )}`}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

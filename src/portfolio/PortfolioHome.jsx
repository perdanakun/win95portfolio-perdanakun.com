import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react'
import { flushSync } from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  Code2,
  Eye,
  FileText,
  Images,
  Menu,
  Monitor,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  SendHorizontal,
  Sparkles,
  Folder,
  Sun,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import ModeSwitch from '../ModeSwitch.jsx'
import { getAIResponse } from '../services/aiService.js'
import HoloHealthContent from '../project/HoloHealthContent.jsx'
import GalleryView from './GalleryView.jsx'
import resumePdf from '../assets/files/perdana_kurniawan_arta_resume.pdf'
import './PortfolioHome.css'


import shipfasterHero from '../project/shipfaster/shipfsater-hero.jpg'
import shipfaster02 from '../project/shipfaster/shipfsater (4).png'
import shipfaster03 from '../project/shipfaster/shipfsater (1).png'

import holohealthHero from '../assets/images/case-study/holohealth.gif'
import holohealth02 from '../assets/images/case-study/holohealth-test1.jpg'
import holohealth03 from '../assets/images/case-study/holohealth-test2.jpg'

import mayora01 from '../project/mayora/mayora1.webp'
import mayora02 from '../project/mayora/mayora2.webp'
import mayora03 from '../project/mayora/mayora3.webp'

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
    title: 'Reducing Uncertainty in Hotel Booking',
    editorialTitle: 'TravelXXX',
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
    title: 'The first and ugliest portfolio ever',
    editorialTitle: "Perdana's Computer",
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
    archivePreview: [
      holohealthHero,
      holohealth02,
      holohealth03,
    ],
  },
  {
    title: 'ShipFaster',
    editorialTitle: 'Designing Icons for UI Kit and Design System',
    type: 'Iconography Design System',
    year: '2026',
    description:
      'An icon library designed for digital product templates and design systems, giving designers a flexible and consistent set of icons to work with. The project explored visual consistency, reusable components, variants, and sizing to make iconography easier to use across product interfaces.',
    prompt:
      'Tell me about the ShipFaster project and how Perdana designed its icon system for digital products.',
    slug: 'shipfaster',
    cover: null,
    archivePreview: [
      shipfasterHero,
      shipfaster02,
      shipfaster03,
    ],
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
    archivePreview: [
      mayora01,
      mayora02,
      mayora03,
    ],
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
        label: 'Who is Perdana?',
        icon: UserRound,
        type: 'page',
        view: 'about',
        prompt:
          'Give me a concise overview of Perdana’s background, experience, and current transition into product design and design engineering.',
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
    ],
  },
  work: {
    label: 'Projects',
    placeholder: 'Ask about my work',
    suggestions: [
      'Which project best shows product thinking?',
      'Show me his visual design background.',
    ],
  },
  gallery: {
    label: 'Gallery',
    placeholder: 'Ask about my visual work',
    suggestions: [
      'What kind of visual work has Perdana done?',
      'How does his visual background connect to Product Design?',
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
   CONTEXTUAL CHAT SUGGESTIONS

   These follow-up questions are intentionally deterministic:
   no extra AI request, no extra latency, and no extra cost.

   The latest user question determines the strongest topic.
   Project context is used as a fallback, and already-asked
   questions are filtered where possible.
===================================================== */
const chatSuggestionLibrary = {
  general: [
    'Why is Perdana moving into Product Design?',
    'What would he bring to a product team?',
    'What is he learning right now?',
    'How does Design in Code fit his direction?',
    'What role is he looking for next?',
    'What makes his background different from a typical junior Product Designer?',
  ],

  career: [
    'Why is this a pivot rather than a career restart?',
    'What transfers from 10+ years of visual design?',
    'Why Product Design before Design Engineering?',
    'What kind of product team is he looking for?',
    'What gaps is he still working to close?',
    'How does his freelance background translate to a product team?',
  ],

  portfolio: [
    'Why did he make the portfolio conversational?',
    'Why did he move away from the Windows 95-first experience?',
    'What did Microsoft Clarity change about the portfolio?',
    'What product decisions changed after observing visitors?',
    'How is the current portfolio built?',
    'What does this portfolio demonstrate about his Product Design process?',
  ],

  travelxxx: [
    'Why did Compare become the core feature?',
    'What user problem is TravelXXX testing?',
    'How does traveler personalization work?',
    'What still needs to be validated?',
    'How was TravelXXX built?',
    'What are the biggest constraints of the project?',
  ],

  computer: [
    'Why did he choose Windows 95?',
    'What did he learn from testing the portfolio?',
    "Why is Perdana's Computer now an alternate experience?",
    'How was it built in React?',
    'What friction did the original onboarding create?',
    'How did the project evolve after launch?',
  ],

  holohealth: [
    'How did he keep 2,500+ icons consistent?',
    'What did he do as Design Lead on HoloHealth?',
    'How does HoloHealth demonstrate systems thinking?',
    'How is this experience relevant to Product Design?',
    'What made the icon system scalable?',
    'What did he learn from directing another designer?',
  ],

  shipfaster: [
    'How was the Shipfaster icon system structured?',
    'How did he use components and variants?',
    'Why is Shipfaster relevant to interface design?',
    'How did he maintain consistency across styles and sizes?',
    'What does this project show about design systems?',
    'How does Shipfaster connect Visual Design to Product Design?',
  ],

  mayora: [
    'What was Perdana responsible for on Mayora?',
    'How did audience behavior influence the work?',
    'What does the 40K to 100K growth actually mean?',
    'What did he learn from long-term social media design?',
    'How does this experience transfer to Product Design?',
    'What should not be attributed to Perdana alone?',
  ],

  business: [
    'How did freelancing shape his business awareness?',
    'What did 3,000+ projects teach him?',
    'How does client work transfer to product teams?',
    'What did he learn from working directly with founders?',
    'Did he manage other designers?',
    'Why is commercial awareness useful in Product Design?',
  ],

  technical: [
    'How much can Perdana actually code?',
    'How does he use AI without treating code as a black box?',
    'What has he shipped with React?',
    'What is he learning to become a Design Engineer?',
    'Where does his technical ability stop today?',
    'How does coding change the way he designs?',
  ],

  apple: [
    'Why did he apply to Apple Developer Academy?',
    'What programming fundamentals is he learning?',
    'How does the Academy fit his Design Engineering goal?',
    'What is he trying to learn beyond UI design?',
    'How does his electronics background connect to this direction?',
    'What does he still need to improve technically?',
  ],

  writing: [
    'What themes connect Perdana’s writing?',
    'What does he mean by getting killed by AI?',
    'Why does he write about being entry-level again?',
    'How has AI changed his career direction?',
    'Why does he document the transition publicly?',
    'What does he write about design and implementation?',
  ],

  education: [
    'How does his Visual Communication Design degree help today?',
    'Why did he study Industrial Electronics before design?',
    'What did he learn from the Google UX certificate?',
    'How does his education connect to Design Engineering?',
    'Was his interest in technology new?',
    'What is he studying independently now?',
  ],

  outsideWork: [
    'What does Perdana do outside work?',
    'Why is cycling included in the About page?',
    'Where can I see his recent personal updates?',
    'What does he share on Instagram?',
    'Where can I find his Strava profile?',
    'How personal is this portfolio meant to be?',
  ],

  miranda: [
    'Where can I find a few more clues?',
    'What does Perdana share outside work?',
    'Is Miranda part of the public portfolio story?',
  ],
}

const projectSuggestionKey = {
  travelxxx: 'travelxxx',
  'perdana-computer': 'computer',
  holohealth: 'holohealth',
  shipfaster: 'shipfaster',
  mayora: 'mayora',
}

const chatSuggestionTopicRules = [
  {
    key: 'miranda',
    pattern: /\bmiranda\b/i,
  },
  {
    key: 'apple',
    pattern:
      /\bapple\b|developer academy|\bacademy\b|selection process/i,
  },
  {
    key: 'travelxxx',
    pattern:
      /travelxxx|hotel comparison|traveler profile|hotel booking|pricing transparency/i,
  },
  {
    key: 'computer',
    pattern:
      /perdana'?s computer|windows 95|installer|boot sequence|clippy/i,
  },
  {
    key: 'holohealth',
    pattern:
      /holohealth|holohelmet|veterinary icon/i,
  },
  {
    key: 'shipfaster',
    pattern:
      /shipfaster|figma ui kit|icon system/i,
  },
  {
    key: 'mayora',
    pattern:
      /mayora|kopiko|beng-beng|le minerale|sinidikara/i,
  },
  {
    key: 'portfolio',
    pattern:
      /portfolio|perdanakun\.com|clarity|conversational|chat interface|visitor behavior/i,
  },
  {
    key: 'technical',
    pattern:
      /\bcode\b|\bcoding\b|react|javascript|next\.?js|tailwind|front[- ]?end|design engineer|programming|technical/i,
  },
  {
    key: 'writing',
    pattern:
      /writing|essay|article|medium|linkedin post|killed by ai|entry level/i,
  },
  {
    key: 'business',
    pattern:
      /business|client|founder|freelance|fiverr|conania|3,000|3000|revenue|commercial/i,
  },
  {
    key: 'education',
    pattern:
      /education|degree|certificate|coursera|industrial electronics|college|university|school/i,
  },
  {
    key: 'outsideWork',
    pattern:
      /cycling|strava|instagram|outside work|off the screen|personal life/i,
  },
  {
    key: 'career',
    pattern:
      /career|pivot|product designer|product design|job|role|hire|hiring|transition|restart/i,
  },
]

function normalizeSuggestionQuestion(value = '') {
  return value
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function getChatSuggestionTopic(thread) {
  const messages = thread?.messages || []
  const lastUserMessage =
    [...messages]
      .reverse()
      .find((message) => message.role === 'user')
      ?.text || ''

  const matchedRule = chatSuggestionTopicRules.find(
    ({ pattern }) => pattern.test(lastUserMessage),
  )

  if (matchedRule) {
    return matchedRule.key
  }

  if (thread?.projectSlug) {
    return projectSuggestionKey[thread.projectSlug] || 'general'
  }

  const threadTitle = thread?.title || ''
  const titleRule = chatSuggestionTopicRules.find(
    ({ pattern }) => pattern.test(threadTitle),
  )

  return titleRule?.key || 'general'
}

function getChatSuggestions(thread, limit = 3) {
  if (!thread) {
    return chatSuggestionLibrary.general.slice(0, limit)
  }

  const messages = thread.messages || []
  const topic = getChatSuggestionTopic(thread)
  const topicSuggestions =
    chatSuggestionLibrary[topic] ||
    chatSuggestionLibrary.general

  const combinedSuggestions = [
    ...topicSuggestions,
    ...chatSuggestionLibrary.general,
  ]

  const uniqueSuggestions = Array.from(
    new Set(combinedSuggestions),
  )

  const askedQuestions = new Set(
    messages
      .filter((message) => message.role === 'user')
      .map((message) =>
        normalizeSuggestionQuestion(message.text),
      ),
  )

  const unseenSuggestions = uniqueSuggestions.filter(
    (suggestion) =>
      !askedQuestions.has(
        normalizeSuggestionQuestion(suggestion),
      ),
  )

  // Keep suggestions available even in a very long thread.
  // If the user has exhausted the unseen pool, reuse the
  // contextual pool instead of showing an empty state.
  const availableSuggestions =
    unseenSuggestions.length >= limit
      ? unseenSuggestions
      : uniqueSuggestions

  const assistantTurns = messages.filter(
    (message) => message.role === 'assistant',
  ).length

  const offset =
    availableSuggestions.length > 0
      ? assistantTurns % availableSuggestions.length
      : 0

  const rotatedSuggestions = [
    ...availableSuggestions.slice(offset),
    ...availableSuggestions.slice(0, offset),
  ]

  return rotatedSuggestions.slice(0, limit)
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
   PORTFOLIO ROUTING
===================================================== */
const portfolioPaths = {
  home: '/',
  work: '/projects',
  gallery: '/gallery',
  writing: '/writing',
  about: '/about',
}

function normalizePortfolioPath(pathname) {
  return pathname.replace(/\/+$/, '') || '/'
}

function getPortfolioRoute(pathname = window.location.pathname) {
  const path = normalizePortfolioPath(pathname)

  if (path === '/' || path === '/new') {
    return {
      view: 'home',
      projectSlug: null,
    }
  }

  if (path === '/projects') {
    return {
      view: 'work',
      projectSlug: null,
    }
  }

  if (path === '/gallery') {
    return {
      view: 'gallery',
      projectSlug: null,
    }
  }

  if (path === '/writing') {
    return {
      view: 'writing',
      projectSlug: null,
    }
  }

  if (path === '/about') {
    return {
      view: 'about',
      projectSlug: null,
    }
  }

  if (path.startsWith('/project/')) {
    const projectSlug =
      path.replace('/project/', '').split('/')[0]

    const projectExists = projects.some(
      (project) => project.slug === projectSlug,
    )

    if (projectExists) {
      return {
        view: 'project',
        projectSlug,
      }
    }
  }

  return {
    view: 'home',
    projectSlug: null,
  }
}

function getPortfolioPath(view) {
  return portfolioPaths[view] || '/'
}

/* =====================================================
   APP
===================================================== */
export default function PortfolioHome() {
  const [activeView, setActiveView] = useState(
    () => getPortfolioRoute().view,
  )
  const [activeProjectSlug, setActiveProjectSlug] = useState(
    () => getPortfolioRoute().projectSlug,
  )
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
  const [pageInsight, setPageInsight] = useState(null)
  const conversationRef = useRef(null)
  const themeAnimatingRef = useRef(false)
  const pageInsightRequestRef = useRef(0)
  const activeProject =
    projects.find(
      (project) => project.slug === activeProjectSlug,
    ) || null
  const activeThread =
    threads.find((thread) => thread.id === activeThreadId) || null
  const isChatView = activeView === 'chat' && activeThread
  const chatSuggestions = getChatSuggestions(activeThread, 2)
  const currentConfig =
    activeView === 'chat'
      ? {
          label: activeThread?.title || 'Chat',
          placeholder: 'Ask a follow-up',
          suggestions: chatSuggestions,
        }
      : activeView === 'project'
        ? {
            label: activeProject?.title || 'Project',
            placeholder: 'Ask about this project',
            suggestions: activeProject
              ? [
                  `What problem was ${activeProject.title} trying to solve?`,
                  `What design decisions shaped ${activeProject.title}?`,
                ]
              : [],
          }
        : viewConfig[activeView] || viewConfig.home
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
    const handlePopState = () => {
      const route = getPortfolioRoute()

      setActiveView(route.view)
      setActiveProjectSlug(route.projectSlug)
      setActiveThreadId(null)
      setPageInsight(null)
      setInput('')

      window.requestAnimationFrame(() => {
        conversationRef.current?.scrollTo({
          top: 0,
          behavior: 'auto',
        })
      })
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])
  useEffect(() => {
  if (!conversationRef.current || activeView !== 'chat') return

  const messageCount = activeThread?.messages?.length || 0

  // First question + first AI answer:
  // keep the user at the top of the conversation.
  if (messageCount <= 2) {
    conversationRef.current.scrollTo({
      top: 0,
      behavior: 'auto',
    })

    return
  }

  // Follow-up conversation:
  // scroll to the newest message.
  conversationRef.current.scrollTo({
    top: conversationRef.current.scrollHeight,
    behavior: 'smooth',
  })
}, [
  activeView,
  activeThreadId,
  activeThread?.messages?.length,
])

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
const closeSidebarOnMobile = () => {
  if (window.matchMedia('(max-width: 760px)').matches) {
    setSidebarOpen(false)
  }
}

const scrollWorkspaceTop = () => {
  window.requestAnimationFrame(() => {
    conversationRef.current?.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  })
}

const pushPortfolioPath = (path, { replace = false } = {}) => {
  const nextPath = normalizePortfolioPath(path)
  const currentPath = normalizePortfolioPath(
    window.location.pathname,
  )

  if (currentPath === nextPath) return

  if (replace) {
    window.history.replaceState({}, '', nextPath)
    return
  }

  window.history.pushState({}, '', nextPath)
}

const navigateTo = (view) => {
  pushPortfolioPath(getPortfolioPath(view))

  setActiveView(view)
  setActiveProjectSlug(null)
  setActiveThreadId(null)
  setPageInsight(null)

  closeSidebarOnMobile()
  scrollWorkspaceTop()
}

const openProject = (project) => {
  pushPortfolioPath(`/project/${project.slug}`)

  setActiveView('project')
  setActiveProjectSlug(project.slug)
  setActiveThreadId(null)
  setPageInsight(null)

  closeSidebarOnMobile()
  scrollWorkspaceTop()
}

const newChat = () => {
  pushPortfolioPath('/')

  setActiveView('home')
  setActiveProjectSlug(null)
  setActiveThreadId(null)
  setPageInsight(null)
  setInput('')

  closeSidebarOnMobile()
  scrollWorkspaceTop()
}

const openThread = (threadId) => {
  pushPortfolioPath('/')

  setActiveProjectSlug(null)
  setActiveThreadId(threadId)
  setActiveView('chat')

  closeSidebarOnMobile()
  scrollWorkspaceTop()
}

const deleteThread = (threadId) => {
  setThreads((current) =>
    current.filter((thread) => thread.id !== threadId),
  )

  if (activeThreadId === threadId) {
    pushPortfolioPath('/')

    setActiveProjectSlug(null)
    setActiveThreadId(null)
    setActiveView('home')
    setInput('')

    scrollWorkspaceTop()
  }
}

const clearAllChats = () => {
  pushPortfolioPath('/')

  setThreads([])
  setActiveProjectSlug(null)
  setActiveThreadId(null)
  setActiveView('home')
  setInput('')
  setIsThinking(false)

  scrollWorkspaceTop()
}

const openPageWithAI = async (view, prompt) => {
  const requestId =
    pageInsightRequestRef.current + 1

  pageInsightRequestRef.current = requestId

  pushPortfolioPath(getPortfolioPath(view))

  setActiveProjectSlug(null)
  setActiveThreadId(null)
  setActiveView(view)

  closeSidebarOnMobile()
  scrollWorkspaceTop()

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
      text: "I couldn't load the summary just now.",
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
  if (!cleanQuestion || isThinking) return
  const userMessage = {
    role: 'user',
    text: cleanQuestion,
  }
  let threadId = activeThreadId
  let previousMessages = []
  const projectSlug =
    options.projectSlug ||
    activeThread?.projectSlug ||
    activeProjectSlug ||
    null
  /*
   * Asking from Home / Work / Writing / About
   * creates a new conversation.
   *
   * If the conversation started from a project,
   * projectSlug becomes part of the thread itself.
   */
  if (activeView !== 'chat' || !activeThread) {
    if (activeView !== 'home') {
      pushPortfolioPath('/')
    }

    threadId = createThreadId()
    const newThread = {
      id: threadId,
      title: createThreadTitle(cleanQuestion),
      projectSlug,
      messages: [userMessage],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setThreads((current) => [
      newThread,
      ...current,
    ])
    setActiveThreadId(threadId)
    setActiveView('chat')
  } else {
    previousMessages = activeThread.messages
    setThreads((current) => {
      const updatedThread = {
        ...activeThread,
        projectSlug,
        messages: [
          ...activeThread.messages,
          userMessage,
        ],
        updatedAt: Date.now(),
      }
      return [
        updatedThread,
        ...current.filter(
          (thread) =>
            thread.id !== activeThread.id,
        ),
      ]
    })
  }
  const history = previousMessages.map(
    (message) => ({
      sender:
        message.role === 'user'
          ? 'user'
          : 'ai',
      text: message.text,
    }),
  )
  setInput('')
  setIsThinking(true)
  try {
    const answer = await getAIResponse(
      cleanQuestion,
      history,
    )
    const assistantMessage = {
      role: 'assistant',
      text: answer,
    }
    setThreads((current) =>
      current.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                assistantMessage,
              ],
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
  if (
    event.key === 'Enter' &&
    !event.shiftKey
  ) {
    event.preventDefault()
    submit()
  }
}
  /* =====================================================
     RENDER
  ===================================================== */
    return (
      <div
        className={`portfolio-v2 page-content ${dark ? 'dark' : ''} ${
          sidebarOpen ? 'sidebar-visible' : ''
        }`}
      >
      {/* =================================================
          SIDEBAR OPEN BUTTON
          Only visible while sidebar is hidden.
      ================================================= */}
      <div className="portfolio-top-controls">
        <div className="top-left-controls">
          <button
            className="sidebar-open-button"
            type="button"
            onClick={() => setSidebarOpen((current) => !current)}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
            title={sidebarOpen ? 'Close menu' : 'Menu'}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={19} />}
          </button>
        </div>
        <ModeSwitch active="chat" />
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
        aria-label="Portfolio navigation"
      >
        <div className="sidebar-header">
          <button
            type="button"
            className={`sidebar-identity ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => {
              if (sidebarOpen) {
                newChat()
              } else {
                setSidebarOpen(true)
              }
            }}
            aria-label={sidebarOpen ? 'Go to home' : 'Open sidebar'}
            aria-expanded={sidebarOpen}
            title={sidebarOpen ? 'Perdana' : 'Open sidebar'}
          >
            <span className="sidebar-avatar-wrap" aria-hidden="true">
              <span className="sidebar-avatar">
                <img src="/profile/perdanakun.png" alt="" />
              </span>
              <span className="sidebar-open-icon">
                <PanelLeftOpen size={18} />
              </span>
            </span>
            <span className="sidebar-name">Perdana</span>
          </button>
          {sidebarOpen && (
            <button
              type="button"
              className="sidebar-collapse-button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          )}
        </div>
        <nav className="sidebar-navigation">
          <SidebarButton
            active={activeView === 'work' || activeView === 'project'}
            icon={<Folder size={18} />}
            label="Projects"
            onClick={() => navigateTo('work')}
          />
          <SidebarButton
            active={activeView === 'gallery'}
            icon={<Images size={18} />}
            label="Gallery"
            onClick={() => navigateTo('gallery')}
          />
          <SidebarButton
            active={activeView === 'writing'}
            icon={<FileText size={18} />}
            label="Writing"
            onClick={() => navigateTo('writing')}
          />
          <SidebarButton
            active={activeView === 'about'}
            icon={<UserRound size={18} />}
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
          <a href="/computer" className="sidebar-link" title="Perdana's Computer">
            <span className="sidebar-link-main">
              <Monitor size={18} className="sidebar-link-icon" />
              <span className="sidebar-link-label">Perdana&apos;s Computer</span>
            </span>
            <ArrowUpRight size={12} className="sidebar-link-arrow" />
          </a>
          <a
            href="https://linkedin.com/in/perdanakun/"
            className="sidebar-link"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <span className="sidebar-link-main">
              <BriefcaseBusiness size={18} className="sidebar-link-icon" />
              <span className="sidebar-link-label">LinkedIn</span>
            </span>
            <ArrowUpRight size={12} className="sidebar-link-arrow" />
          </a>
          <a
            href="https://github.com/perdanakun"
            className="sidebar-link"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <span className="sidebar-link-main">
              <Code2 size={18} className="sidebar-link-icon" />
              <span className="sidebar-link-label">GitHub</span>
            </span>
            <ArrowUpRight size={12} className="sidebar-link-arrow" />
          </a>
          <a
            href="https://www.instagram.com/perdanakun/"
            className="sidebar-link"
            target="_blank"
            rel="noreferrer"
            title="Instagram"
          >
            <span className="sidebar-link-main">
              <Camera size={18} className="sidebar-link-icon" />
              <span className="sidebar-link-label">Instagram</span>
            </span>
            <ArrowUpRight size={12} className="sidebar-link-arrow" />
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
          ref={conversationRef}
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
              onOpenProject={openProject}
              insight={
                pageInsight?.view === 'work'
                  ? pageInsight
                  : null
              }
            />
          )}
          {activeView === 'gallery' && (
            <GalleryView />
          )}
          {activeView === 'project' && activeProject && (
            <ProjectView
              project={activeProject}
              onBack={() => navigateTo('work')}
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
                  (project) =>
                    project.slug === activeThread?.projectSlug,
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
            suggestions={currentConfig.suggestions}
            onAsk={ask}
          />
        )}
        {activeView === 'home' && (
          <p className="portfolio-footer">
            <span className="portfolio-footer-desktop">
              AI-generated content can make mistakes. Please double-check important information.
              <br />
              Connect with me on{' '}
              <a
                href="https://linkedin.com/in/perdanakun/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                LinkedIn
              </a>{' '}
              and see what I&apos;m building on{' '}
              <a
                href="https://github.com/perdanakun"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                GitHub
              </a>.
            </span>
            <span className="portfolio-footer-mobile">
              AI can make mistakes.{' '}
              <a
                href="https://linkedin.com/in/perdanakun/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                LinkedIn
              </a>{' '}
              ·{' '}
              <a
                href="https://github.com/perdanakun"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                GitHub
              </a>
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
      aria-label={label}
      title={label}
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
    const characters = '01{}[]<>/\\\\\\\\*+-=_$#@'
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
   MARKDOWN MESSAGE
   Renders AI responses as safe Markdown. Raw HTML is
   intentionally skipped, so AI output cannot inject HTML.
===================================================== */
function normalizeAIResponseMarkdown(text = '') {
  return text
    .replace(/\r\n/g, '\n')

    // Convert visual bullets from the AI into real Markdown lists.
    .replace(
      /(?:^|\s)•\s*/g,
      '\n- ',
    )

    // Prevent excessive empty space.
    .replace(/\n{3,}/g, '\n\n')

    .trim()
}
function MarkdownMessage({ text }) {
  const normalizedText =
    normalizeAIResponseMarkdown(text)

  return (
    <div className="markdown-message">
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkBreaks,
        ]}
        skipHtml
        components={{
          a: ({
            href = '',
            children,
            ...props
          }) => {
            const isExternal =
              /^https?:\/\//i.test(href)

            return (
              <a
                {...props}
                href={href}
                className="chat-link"
                target={
                  isExternal
                    ? '_blank'
                    : undefined
                }
                rel={
                  isExternal
                    ? 'noreferrer noopener'
                    : undefined
                }
              >
                {children}
              </a>
            )
          },

          p: ({
            children,
            ...props
          }) => (
            <p
              {...props}
              className="markdown-paragraph"
            >
              {children}
            </p>
          ),

          h1: ({
            children,
            ...props
          }) => (
            <h1
              {...props}
              className="markdown-heading markdown-h1"
            >
              {children}
            </h1>
          ),

          h2: ({
            children,
            ...props
          }) => (
            <h2
              {...props}
              className="markdown-heading markdown-h2"
            >
              {children}
            </h2>
          ),

          h3: ({
            children,
            ...props
          }) => (
            <h3
              {...props}
              className="markdown-heading markdown-h3"
            >
              {children}
            </h3>
          ),

          h4: ({
            children,
            ...props
          }) => (
            <h4
              {...props}
              className="markdown-heading markdown-h4"
            >
              {children}
            </h4>
          ),

          ul: ({
            children,
            ...props
          }) => (
            <ul
              {...props}
              className="markdown-list markdown-list-unordered"
            >
              {children}
            </ul>
          ),

          ol: ({
            children,
            ...props
          }) => (
            <ol
              {...props}
              className="markdown-list markdown-list-ordered"
            >
              {children}
            </ol>
          ),

          li: ({
            children,
            ...props
          }) => (
            <li
              {...props}
              className="markdown-list-item"
            >
              {children}
            </li>
          ),

          blockquote: ({
            children,
            ...props
          }) => (
            <blockquote
              {...props}
              className="markdown-blockquote"
            >
              {children}
            </blockquote>
          ),

          hr: (props) => (
            <hr
              {...props}
              className="markdown-divider"
            />
          ),

          code: ({
            className = '',
            children,
            ...props
          }) => {
            const isCodeBlock =
              /language-/.test(className)

            if (isCodeBlock) {
              return (
                <code
                  {...props}
                  className={`markdown-code-block ${className}`}
                >
                  {children}
                </code>
              )
            }

            return (
              <code
                {...props}
                className="markdown-inline-code"
              >
                {children}
              </code>
            )
          },

          pre: ({
            children,
            ...props
          }) => (
            <pre
              {...props}
              className="markdown-pre"
            >
              {children}
            </pre>
          ),

          table: ({
            children,
            ...props
          }) => (
            <div className="markdown-table-scroll">
              <table
                {...props}
                className="markdown-table"
              >
                {children}
              </table>
            </div>
          ),

          thead: ({
            children,
            ...props
          }) => (
            <thead
              {...props}
              className="markdown-table-head"
            >
              {children}
            </thead>
          ),

          tbody: ({
            children,
            ...props
          }) => (
            <tbody
              {...props}
              className="markdown-table-body"
            >
              {children}
            </tbody>
          ),

          tr: ({
            children,
            ...props
          }) => (
            <tr
              {...props}
              className="markdown-table-row"
            >
              {children}
            </tr>
          ),

          th: ({
            children,
            ...props
          }) => (
            <th
              {...props}
              className="markdown-table-header"
            >
              {children}
            </th>
          ),

          td: ({
            children,
            ...props
          }) => (
            <td
              {...props}
              className="markdown-table-cell"
            >
              {children}
            </td>
          ),

          input: ({
            type,
            ...props
          }) => (
            <input
              {...props}
              type={type}
              disabled
              tabIndex={-1}
              aria-hidden="true"
              className="markdown-task-checkbox"
            />
          ),
        }}
      >
        {normalizedText}
      </ReactMarkdown>
    </div>
  )
}
/* =====================================================
   CHAT VIEW
   Project case study is rendered as part of the
   conversation, immediately after the first AI reply.
===================================================== */
function ChatView({
  thread,
  isThinking,
  project,
}) {
  const firstAssistantIndex =
    thread.messages.findIndex(
      (message) =>
        message.role === 'assistant',
    )
  return (
    <section className="chat-view">
      <div className="conversation-messages">
        {thread.messages.map(
          (message, index) => (
            <Fragment
              key={`${thread.id}-${index}`}
            >
              <div
                className={`message ${
                  message.role === 'user'
                    ? 'user-message'
                    : 'assistant-message'
                }`}
              >
                <div
                  className={`message-body ${
                    message.role === 'assistant' ? 'has-markdown' : ''
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <MarkdownMessage text={message.text} />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
              {project &&
                message.role ===
                  'assistant' &&
                index ===
                  firstAssistantIndex && (
                  <ProjectCaseStudy
                    project={project}
                  />
                )}
            </Fragment>
          ),
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
   ACTIVE FOLDER PREVIEW
===================================================== */
function ArchiveFolderPreview({ project }) {
  const previews = Array.isArray(project.archivePreview)
    ? project.archivePreview.filter(Boolean)
    : project.archivePreview
      ? [project.archivePreview]
      : project.cover
        ? [project.cover]
        : []

  if (!previews.length) {
    return (
      <div
        className="archive-generated-preview"
        aria-hidden="true"
      >
        <div className="archive-preview-caption">
          <strong>{project.title}</strong>
          <span>{project.type}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="archive-preview-stack">
      {previews.slice(0, 3).map((src, index) => (
        <div
          className={`archive-preview-image archive-preview-image-${index + 1}`}
          key={`${project.slug}-${index}`}
        >
          <PortfolioMedia
            src={src}
            label={`${project.title} archived project preview ${index + 1}`}
          />
        </div>
      ))}
    </div>
  )
}
/* =====================================================
   WORK VIEW
===================================================== */
function WorkView({ onOpenProject, insight }) {
  const currentProjects = projects.slice(0, 2)
  const archivedProjects = projects.slice(2)

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
    <section className="content-view projects-view">
      <header className="view-header projects-view-header">
        <p>PROJECTS</p>

        <h1>
          Where visual craft meets product thinking.
        </h1>

        <span>
          Current product work, with selected archives from a decade
          of visual design and systems work.
        </span>
      </header>

      <PageAIInsight insight={insight} />

      <section className="projects-current-section">
        <div className="projects-section-heading">
          <p>CURRENT WORK</p>
        </div>

        <div className="project-grid">
          {currentProjects.map((project) => (
            <button
              type="button"
              className="project-card"
              key={project.title}
              onClick={() => onOpenProject(project)}
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
                  <span>View project</span>
                </span>
              </div>

              <div className="project-card-content">
                <h2>{project.editorialTitle}</h2>

                <div className="project-card-meta">
                  <span>{project.title}</span>
                  <span>
                    {project.type} · {project.year}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="projects-archive-section">
        <div className="projects-section-heading">
          <p>ARCHIVED WORK</p>
        </div>

        <div className="archive-grid">
          {archivedProjects.map((project, index) => (
            <button
              type="button"
              className="archive-card"
              key={project.title}
              onClick={() => onOpenProject(project)}
            >
              <div className="archive-folder">
                <div className="archive-folder-back">
                  <span className="archive-folder-tab">
                    ARCHIVE {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="archive-folder-sheet">
                  <ArchiveFolderPreview project={project} />
                </div>

                <div
                  className="archive-folder-front"
                  aria-hidden="true"
                >
                  <span className="archive-folder-front-label">
                    {project.title}
                  </span>

                  <span className="archive-folder-front-meta">
                    {project.year}
                  </span>
                </div>
              </div>

              <div className="archive-card-content">
                <h2>{project.title}</h2>

                <span>
                  {project.type} · {project.year}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </section>
  )
}

/* =====================================================
   PROJECT VIEW
===================================================== */
function ProjectView({ project, onBack }) {
  return (
    <section className="content-view project-detail-view">
      <button
        type="button"
        className="project-back-button"
        onClick={onBack}
      >
        <span aria-hidden="true">←</span>
        <span>Projects</span>
      </button>

      <header className="view-header project-detail-header">
        <p>
          {project.type} · {project.year}
        </p>

        <h1>{project.editorialTitle}</h1>

        <span>{project.description}</span>
      </header>

      <ProjectCaseStudy project={project} />
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
   INSTAGRAM EMBED
===================================================== */
function InstagramEmbed({ url }) {
  useEffect(() => {
    const processEmbeds = () => {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process()
      }
    }
    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]',
    )
    if (existingScript) {
      processEmbeds()
      existingScript.addEventListener('load', processEmbeds)
      return () => {
        existingScript.removeEventListener('load', processEmbeds)
      }
    }
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = processEmbeds
    document.body.appendChild(script)
    return () => {
      script.onload = null
    }
  }, [url])
  return (
    <div className="instagram-embed">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
      >
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  )
}
/* =====================================================
   STRAVA EMBED
===================================================== */
function StravaEmbed({ activityId, token }) {
  useEffect(() => {
    const oldScript = document.querySelector(
      'script[src="https://strava-embeds.com/embed.js"]',
    )
    if (oldScript) {
      oldScript.remove()
    }
    const script = document.createElement('script')
    script.src = 'https://strava-embeds.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [activityId, token])
  return (
    <div className="strava-embed-wrapper">
      <div
        className="strava-embed-placeholder"
        data-embed-type="activity"
        data-embed-id={activityId}
        data-style="standard"
        data-from-embed="false"
        data-token={token}
      />
    </div>
  )
}
/* =====================================================
   ABOUT VIEW
===================================================== */
function AboutView({ onAsk, insight }) {
  const instagramPosts = [
    'https://www.instagram.com/p/DQyHv2ok5MJ/',
    'https://www.instagram.com/p/DQbl-Lak0zN/',
    'https://www.instagram.com/p/DJmHYOszgyK/',
  ]
  const cyclingActivity = {
    profileUrl: 'https://www.strava.com/athletes/83449444',
    activityUrl: 'https://www.strava.com/activities/14290242641',
    activityId: '14290242641',
    embedToken:
      'Q9i_hDVK3ITZTE5E7G_u5FTj6-ZYpv9IwzGTBUiDa6E',
  }
  return (
    <section className="content-view about-view">
      {/* =================================================
          INTRO
      ================================================= */}
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
          Perdana has spent more than 10 years working as a visual
          designer and design lead, working directly with clients,
          founders, and small businesses across{' '}
          <a
            href="YOUR_FIVERR_OR_CONANIA_URL"
            target="_blank"
            rel="noreferrer"
            className="text-link"
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
          That experience shaped more than his visual craft. It taught
          him how to understand business goals, navigate constraints
          and trade-offs, communicate with stakeholders, and turn
          ambiguous ideas into clear, scalable design systems.
        </p>
        <p>
          Now, he’s bringing that foundation into{' '}
          <a href="/projects" className="text-link">
            product design
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
          , working across UX, interaction, prototyping, and
          implementation. He uses{' '}
          <a href="/computer" className="text-link">
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
          He’s not starting over. He’s moving closer to the product,
          combining design craft, business context, and code to
          design, build, and ship.
        </p>
      </div>
      {/* =================================================
          EXPERIENCE
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
                      className="experience-title-link text-link"
                    >
                      <h3>{item.title}</h3>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.8}
                        aria-hidden="true"
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
          <ArrowUpRight
            size={14}
            strokeWidth={1.8}
          />
        </button>
      </div>
      {/* =================================================
          INSTAGRAM
      ================================================= */}
      <section className="about-social-section">
        <div className="about-section-heading">
          <div>
            <p>RECENTLY</p>
            <h2>
              On my Social Media
            </h2>
          </div>
          <a
            href="https://www.instagram.com/perdanakun/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Instagram
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
            />
          </a>
        </div>
        <div className="instagram-grid">
          {instagramPosts.map((url) => (
            <InstagramEmbed
              key={url}
              url={url}
            />
          ))}
        </div>
      </section>
      {/* =================================================
          OFF THE SCREEN
      ================================================= */}
      <section className="activity-section">
        <div className="about-section-heading">
          <div>
            <p>OFF THE SCREEN</p>
            <h2>Moving my Body</h2>
          </div>
          <a
            href={cyclingActivity.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Strava
            <ArrowUpRight
              size={12}
              strokeWidth={1.8}
            />
          </a>
        </div>
        <div className="activity-card">
          <div className="activity-map">
            <StravaEmbed
              activityId={cyclingActivity.activityId}
              token={cyclingActivity.embedToken}
            />
          </div>
        </div>
      </section>
    </section>
  )
}
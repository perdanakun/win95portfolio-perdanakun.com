import React from 'react';

import perdanaComputerMain
  from './perdanacomputer/perdanacomputer_main.gif';

import perdanaComputerMain1
  from './perdanacomputer/perdanacomputer_main2.gif';

import perdanaComputer
  from './perdanacomputer/perdanacomputer.png';

/*
  =========================================================
  PERDANA'S COMPUTER — PRODUCT CASE STUDY
  =========================================================

  Content structure:
  Overview → Ground the Problem → Define Direction →
  Prototype & Build → Validate → Outcome → Reflection

  Typography is inherited from the global Case Study system:

  .casestudy
  .casestudy-ui
  .casestudy-ui-reading
  .casestudy-reading
  .casestudy-reading-large
  .casestudy-heading
  .casestudy-hero-title
  .casestudy-mono
  .casestudy-mono-muted

  This component keeps the original layout / visual system and
  restructures the case study around a product hypothesis and
  evidence trail.
*/

const caseStudyNavigation = [
  {
    id: 'hero',
    number: '00',
    title: 'Overview',
  },
  {
    id: 'ground-problem',
    number: '01',
    title: 'Ground the Problem',
  },
  {
    id: 'define-direction',
    number: '02',
    title: 'Define Direction',
  },
  {
    id: 'prototype-build',
    number: '03',
    title: 'Prototype & Build',
  },
  {
    id: 'validate',
    number: '04',
    title: 'Validate',
  },
  {
    id: 'outcome',
    number: '05',
    title: 'Outcome',
  },
  {
    id: 'reflection',
    number: '06',
    title: 'Reflection',
  },
];

const productPrinciples = [
  {
    title: 'Distinctive, not distracting',
    text:
      'Memorability can earn attention, but the experience still has to help a hiring team evaluate the candidate without unnecessary effort.',
  },
  {
    title: 'Show, not just tell',
    text:
      'The portfolio should demonstrate product thinking, interaction decisions, and implementation instead of only describing those capabilities in copy.',
  },
  {
    title: 'Familiar rules inside an unfamiliar format',
    text:
      'The portfolio can look unconventional while borrowing recognizable desktop concepts such as folders, windows, files, and a taskbar.',
  },
  {
    title: 'Build to learn',
    text:
      'When behavior is part of the problem, implementation can become part of prototyping so interaction friction appears earlier.',
  },
];

const portfolioFormats = [
  {
    title: 'Modern template portfolio',
    text:
      'Fast to produce, familiar to reviewers, responsive, and visually polished — but the portfolio itself provides limited evidence of interaction design or implementation.',
  },
  {
    title: 'Case-study-first portfolio',
    text:
      'Strong for structured storytelling and easy to understand, but most of the product capability still has to be explained rather than experienced.',
  },
  {
    title: 'Product-like portfolio',
    text:
      'Navigation, system states, AI, communication features, responsive behavior, and implementation can become part of the evidence — with a higher risk of usability friction.',
  },
];

export default function PerdanaComputerProductContent() {
  return (
    <div className="perdana-case-study casestudy">

      <CaseStudyNavigation />

      <main className="perdana-case-study-main">
        <div className="perdana-case-study-container">

          {/* =====================================================
              HERO / OVERVIEW
          ===================================================== */}

          <section
            id="hero"
            className="pcs-hero"
          >

            <p className="pcs-eyebrow casestudy-ui">
              Perdana's Computer — Product Design + Design Engineering Case Study
            </p>

            <h1 className="pcs-title casestudy-hero-title">
              Standing Out Without Slowing Reviewers Down
            </h1>

            <p className="pcs-lead casestudy-reading-large">
              A self-initiated portfolio product built to test one career
              hypothesis: can a portfolio become distinctive enough to be
              remembered while still making it easy for hiring teams to
              understand the work, the thinking, and the designer behind it?
            </p>

            <PlaceholderMedia
              src={perdanaComputerMain}
              alt="Perdana's Computer main portfolio experience"
            />

            <div className="pcs-future-card">

              <span className="pcs-future-label casestudy-mono">
                PROJECT NOTE
              </span>

              <p className="casestudy-reading">
                This is a self-initiated portfolio product, not a client
                project. I had no access to internal recruiting data, so
                hiring impact is treated as a hypothesis rather than a proven
                outcome. Secondary research uses public sources, while
                formative usability testing was conducted repeatedly with
                one participant from my personal circle. The findings guide
                design decisions; they are not presented as statistical
                validation.
              </p>

            </div>

          </section>


          {/* =====================================================
              01 — GROUND THE PROBLEM
          ===================================================== */}

          <section
            id="ground-problem"
            className="pcs-section"
          >

            <SectionHeading
              number="01"
              title="Ground the Problem"
              subtitle="Start with the hiring problem, then challenge the idea before committing to the interface."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                Perdana's Computer started from a career problem as much as a
                portfolio problem. I was moving from a decade of visual design
                into Product Design and Design Engineering, which meant I would
                be competing for junior product roles against candidates whose
                portfolios were already built specifically around product work.
              </p>

              <p className="pcs-body casestudy-reading">
                A conventional portfolio could show previous projects, but it
                could leave the strongest signal of the transition hidden. I
                did not only want to show polished screens. I wanted to show
                <span className="text-highlight">
                  {' '}how I notice a problem, make a decision, turn it into a
                  working interaction, test it, and change it when it fails.
                </span>
              </p>

            </div>


            <div className="pcs-problem-card">

              <span className="pcs-problem-label casestudy-ui">
                INITIAL HYPOTHESIS
              </span>

              <p className="casestudy-heading">
                If the portfolio itself became a distinctive but usable
                product, it could give hiring teams a more memorable way to
                evaluate not only what I can design, but how I think, make
                decisions, and build working interactions.
              </p>

            </div>


            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                The user was not “everyone on the internet.” The primary users
                were recruiters, hiring managers, and design leads evaluating
                whether I was worth moving forward for a Product Designer or
                Design Engineer opportunity.
              </p>

              <p className="pcs-body casestudy-reading">
                For them, the job was to understand the candidate with as
                little unnecessary effort as possible. For me, the business
                goal was to increase the probability of moving from portfolio
                screening into a real hiring conversation.
              </p>

            </div>


            {/* =================================================
                RESEARCH
            ================================================= */}

            <section className="pcs-research">

              <div className="pcs-research-intro">

                <div className="pcs-research-intro-top">
                  <span className="pcs-research-kicker casestudy-mono">
                    SECONDARY RESEARCH
                  </span>
                </div>

                <h3 className="pcs-research-title casestudy-heading">
                  I was not trying to prove that an interactive portfolio is better.
                </h3>

                <p className="pcs-research-intro-copy casestudy-reading">
                  The research was used to challenge the hypothesis from both
                  sides: what hiring teams need from portfolios, and what
                  interactivity can — and cannot — contribute to a digital
                  experience.
                </p>

              </div>


              <div className="pcs-research-findings">

                <div className="pcs-research-section-label casestudy-mono">
                  KEY FINDINGS
                </div>


                <article className="pcs-research-finding">

                  <div className="pcs-research-finding-index casestudy-mono">
                    01
                  </div>

                  <div className="pcs-research-finding-main">

                    <div className="pcs-research-finding-meta">
                      <span className="casestudy-mono">
                        HIRING AUDIENCE
                      </span>
                      <span className="pcs-research-finding-tag">
                        CLARITY
                      </span>
                    </div>

                    <h4 className="casestudy-heading">
                      A portfolio has to serve the person evaluating it.
                    </h4>

                    <p className="casestudy-reading">
                      Nielsen Norman Group's 2026 interview with design
                      recruiter Hang Xu highlights a common mistake in UX
                      hiring: candidates often optimize application materials
                      for other designers instead of understanding the actual
                      reviewer. The first evaluator may be a recruiter, product
                      manager, founder, or design leader with a different level
                      of design knowledge and a different goal.
                    </p>

                    <div className="pcs-research-response">
                      <span className="casestudy-mono">
                        PRODUCT IMPLICATION
                      </span>
                      <strong className="casestudy-reading">
                        <span className="text-highlight">
                          Design the portfolio around evaluation, not around
                          proving how much design terminology I know.
                        </span>
                      </strong>
                    </div>

                    <span className="pcs-research-source casestudy-mono">
                      NIELSEN NORMAN GROUP · UX HIRING INSIGHTS · 2026
                    </span>

                  </div>

                </article>


                <article className="pcs-research-finding">

                  <div className="pcs-research-finding-index casestudy-mono">
                    02
                  </div>

                  <div className="pcs-research-finding-main">

                    <div className="pcs-research-finding-meta">
                      <span className="casestudy-mono">
                        ENTRY-LEVEL MARKET
                      </span>
                      <span className="pcs-research-finding-tag">
                        JUDGMENT
                      </span>
                    </div>

                    <h4 className="casestudy-heading">
                      Surface polish alone is becoming weaker evidence.
                    </h4>

                    <p className="casestudy-reading">
                      Nielsen Norman Group's State of UX 2026 describes a
                      competitive entry-level market and argues that UI alone
                      is becoming less of a differentiator as interfaces become
                      easier to produce through standardization and AI-assisted
                      tools. Contextual understanding, critical thinking,
                      judgment, and adaptability become stronger signals.
                    </p>

                    <div className="pcs-research-response">
                      <span className="casestudy-mono">
                        PRODUCT IMPLICATION
                      </span>
                      <strong className="casestudy-reading">
                        <span className="text-highlight">
                          Make the portfolio demonstrate decisions and behavior,
                          not only finished screens.
                        </span>
                      </strong>
                    </div>

                    <span className="pcs-research-source casestudy-mono">
                      NIELSEN NORMAN GROUP · STATE OF UX 2026
                    </span>

                  </div>

                </article>


                <article className="pcs-research-finding">

                  <div className="pcs-research-finding-index casestudy-mono">
                    03
                  </div>

                  <div className="pcs-research-finding-main">

                    <div className="pcs-research-finding-meta">
                      <span className="casestudy-mono">
                        REVIEWER ATTENTION
                      </span>
                      <span className="pcs-research-finding-tag">
                        FRICTION
                      </span>
                    </div>

                    <h4 className="casestudy-heading">
                      Standing out cannot require the reviewer to work harder.
                    </h4>

                    <p className="casestudy-reading">
                      Guidance from design recruiter Korin Harris emphasizes
                      quick project access, easy-to-parse information, and
                      avoiding visual effects or interactions that come at the
                      expense of basic usability. Novelty can earn attention,
                      but clarity still has to earn the next click.
                    </p>

                    <div className="pcs-research-response">
                      <span className="casestudy-mono">
                        PRODUCT IMPLICATION
                      </span>
                      <strong className="casestudy-reading">
                        <span className="text-highlight">
                          Distinctiveness is useful only if the work remains
                          easy to find and understand.
                        </span>
                      </strong>
                    </div>

                    <span className="pcs-research-source casestudy-mono">
                      DRIBBBLE · DESIGN RECRUITER PORTFOLIO TIPS
                    </span>

                  </div>

                </article>


                <article className="pcs-research-finding">

                  <div className="pcs-research-finding-index casestudy-mono">
                    04
                  </div>

                  <div className="pcs-research-finding-main">

                    <div className="pcs-research-finding-meta">
                      <span className="casestudy-mono">
                        WEB INTERACTIVITY
                      </span>
                      <span className="pcs-research-finding-tag">
                        COUNTER-EVIDENCE
                      </span>
                    </div>

                    <h4 className="casestudy-heading">
                      Interactivity can support engagement, but it does not
                      automatically improve understanding.
                    </h4>

                    <p className="casestudy-reading">
                      Yang and Shen's meta-analysis covered 63 studies and
                      13,484 participants. Web interactivity was associated
                      with outcomes such as enjoyment, positive attitudes, and
                      behavioral intention, but it did not automatically improve
                      knowledge acquisition, cognitive elaboration, or recall.
                    </p>

                    <div className="pcs-research-response">
                      <span className="casestudy-mono">
                        PRODUCT IMPLICATION
                      </span>
                      <strong className="casestudy-reading">
                        <span className="text-highlight">
                          Interaction can support exploration, but it cannot
                          replace clear communication.
                        </span>
                      </strong>
                    </div>

                    <span className="pcs-research-source casestudy-mono">
                      YANG & SHEN · COMMUNICATION RESEARCH · 2018
                    </span>

                  </div>

                </article>

              </div>


              <div className="pcs-research-translation">

                <div className="pcs-research-translation-header">
                  <span className="casestudy-mono">
                    REFINED PRODUCT TENSION
                  </span>
                  <span className="casestudy-mono">
                    DISTINCTIVENESS ↔ EFFICIENCY
                  </span>
                </div>

                <div className="pcs-research-flow">

                  <div className="pcs-research-flow-item">
                    <span className="casestudy-mono">
                      CANDIDATE NEED
                    </span>
                    <strong className="casestudy-heading">
                      Be remembered
                    </strong>
                  </div>

                  <div className="pcs-research-flow-arrow">
                    ↔
                  </div>

                  <div className="pcs-research-flow-item">
                    <span className="casestudy-mono">
                      REVIEWER NEED
                    </span>
                    <strong className="casestudy-heading">
                      Evaluate quickly
                    </strong>
                  </div>

                  <div className="pcs-research-flow-arrow">
                    →
                  </div>

                  <div className="pcs-research-flow-item pcs-research-flow-item-final">
                    <span className="casestudy-mono">
                      PRODUCT GOAL
                    </span>
                    <strong className="casestudy-heading">
                      Distinctive without friction
                    </strong>
                  </div>

                </div>

              </div>


              <div className="pcs-research-conclusion">

                <span className="casestudy-mono">
                  REFINED PROBLEM
                </span>

                <h4 className="casestudy-heading">
                  <span className="text-highlight">
                    How might I create a portfolio that stands out in a crowded
                    hiring process while still making it fast and easy for
                    hiring teams to understand my work, thinking, and direction?
                  </span>
                </h4>

                <p className="casestudy-reading">
                  The research did not validate the solution. It made the
                  constraint clearer: an unconventional portfolio only works if
                  the reviewer can still evaluate the candidate without paying
                  a usability tax for the novelty.
                </p>

              </div>


              <div className="pcs-research-sources">

                <span className="casestudy-mono">
                  SOURCES
                </span>

                <a
                  href="https://www.nngroup.com/articles/ux-hiring-insights/"
                  target="_blank"
                  rel="noreferrer"
                  className="casestudy-reading"
                >
                  Nielsen Norman Group — UX Hiring: Insights from a Design Recruiter ↗
                </a>

                <a
                  href="https://www.nngroup.com/articles/state-of-ux-2026/"
                  target="_blank"
                  rel="noreferrer"
                  className="casestudy-reading"
                >
                  Nielsen Norman Group — State of UX 2026 ↗
                </a>

                <a
                  href="https://dribbble.com/resources/career/design-recruiter-portfolio-tips"
                  target="_blank"
                  rel="noreferrer"
                  className="casestudy-reading"
                >
                  Dribbble — What Design Recruiters Look For ↗
                </a>

                <a
                  href="https://doi.org/10.1177/0093650217700748"
                  target="_blank"
                  rel="noreferrer"
                  className="casestudy-reading"
                >
                  Yang & Shen — Effects of Web Interactivity: A Meta-Analysis ↗
                </a>

              </div>

            </section>


            <div className="pcs-future-card">

              <span className="pcs-future-label casestudy-mono">
                SUCCESS HYPOTHESIS
              </span>

              <p className="casestudy-reading">
                In the short term, success means a visitor can understand what
                kind of designer I am becoming, find relevant work, understand
                where they are, use shortcuts when time is limited, and contact
                me without unnecessary friction. The longer-term business signal
                is whether the portfolio helps applications progress from
                screening into interviews and eventually an offer.
              </p>

            </div>

          </section>


          {/* =====================================================
              02 — DEFINE DIRECTION
          ===================================================== */}

          <section
            id="define-direction"
            className="pcs-section"
          >

            <SectionHeading
              number="02"
              title="Define the Direction"
              subtitle="Choose a product direction that can create differentiation without hiding the work."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                I did not run a formal competitor study of three named
                portfolios, and I did not create three polished concepts just
                to manufacture a selection exercise. The real comparison was
                between portfolio formats I had already observed and one I had
                already tried myself through modern Framer-style templates.
              </p>

            </div>


            <div className="pcs-design-grid">

              {portfolioFormats.map((item, index) => (
                <article
                  className="pcs-design-card"
                  key={item.title}
                >

                  <span className="pcs-design-number casestudy-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="casestudy-heading">
                    {item.title}
                  </h3>

                  <p className="casestudy-reading">
                    {item.text}
                  </p>

                </article>
              ))}

            </div>


            <DesignDecision
              number="DECISION 01"
              title="Use a desktop metaphor as the product direction"
            >

              <h3 className="pcs-research-title casestudy-heading">
                Why Windows 95 became more than a visual reference
              </h3>

              <p className="pcs-body casestudy-reading">
                The Windows 95 idea initially appealed to me because it was
                distinctive and personally memorable. It became more useful
                when I looked beyond the visual style and saw an existing
                interaction language: desktop, folders, files, windows, menus,
                and a taskbar.
              </p>

              <PlaceholderMedia
                src={perdanaComputer}
                alt="Windows 95-inspired visual direction for Perdana's Computer"
              />

              <p className="pcs-body casestudy-reading">
                Instead of inventing an entirely new way to navigate an
                experimental portfolio, I could borrow concepts many computer
                users already understand. The bet was not that everyone would
                remember Windows 95 perfectly. The bet was that recognizable
                desktop concepts could reduce some of the learning cost created
                by an unconventional presentation.
              </p>

              <div className="pcs-research-sources">

                <span className="casestudy-mono">
                  SUPPORTING PRINCIPLE
                </span>

                <a
                  href="https://www.nngroup.com/articles/mental-models/"
                  target="_blank"
                  rel="noreferrer"
                  className="casestudy-reading"
                >
                  Nielsen Norman Group — Mental Models and User Experience Design ↗
                </a>

              </div>

            </DesignDecision>


            <div className="pcs-research-translation">

              <div className="pcs-research-translation-header">
                <span className="casestudy-mono">
                  METAPHOR → PRODUCT BEHAVIOR
                </span>
                <span className="casestudy-mono">
                  SYSTEM MAP
                </span>
              </div>

              <div className="pcs-research-flow">

                <div className="pcs-research-flow-item">
                  <span className="casestudy-mono">
                    FOLDERS
                  </span>
                  <strong className="casestudy-heading">
                    Navigation
                  </strong>
                </div>

                <div className="pcs-research-flow-arrow">
                  →
                </div>

                <div className="pcs-research-flow-item">
                  <span className="casestudy-mono">
                    WINDOWS
                  </span>
                  <strong className="casestudy-heading">
                    Content containers
                  </strong>
                </div>

                <div className="pcs-research-flow-arrow">
                  →
                </div>

                <div className="pcs-research-flow-item pcs-research-flow-item-final">
                  <span className="casestudy-mono">
                    DESKTOP
                  </span>
                  <strong className="casestudy-heading">
                    Main workspace
                  </strong>
                </div>

              </div>

            </div>


            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                The metaphor then became a product system. Folders organize
                projects. Windows contain tasks and content. The taskbar exposes
                open state. AI Chat acts as an information shortcut. Inbox
                creates a contact flow without forcing visitors to leave the
                experience.
              </p>

              <p className="pcs-highlight-quote">
                <mark>
                  <strong>
                    If I was going to make the portfolio unconventional, the
                    interaction itself should still borrow from something familiar.
                  </strong>
                </mark>
              </p>

            </div>


            <div className="pcs-design-grid">

              {productPrinciples.map((item, index) => (
                <article
                  className="pcs-design-card"
                  key={item.title}
                >

                  <span className="pcs-design-number casestudy-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="casestudy-heading">
                    {item.title}
                  </h3>

                  <p className="casestudy-reading">
                    {item.text}
                  </p>

                </article>
              ))}

            </div>


            <div className="pcs-future-card">

              <span className="pcs-future-label casestudy-mono">
                SELECTION CRITERIA
              </span>

              <p className="casestudy-reading">
                I evaluated the direction through four practical criteria:
                <strong> problem fit, evaluation clarity, capability signal,
                and feasibility.</strong> The desktop direction required more
                implementation work, but it was the only direction where the
                portfolio itself could directly demonstrate interaction design
                and working code rather than only describe those skills.
              </p>

            </div>

          </section>


          {/* =====================================================
              03 — PROTOTYPE & BUILD
          ===================================================== */}

          <section
            id="prototype-build"
            className="pcs-section"
          >

            <SectionHeading
              number="03"
              title="Prototype by Building"
              subtitle="Use Figma to establish the flow, then move into code early because behavior is part of the hypothesis."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                I used Figma to define the first flows and basic window
                interfaces. I did not spend time exploring multiple visual
                layouts because the selected direction intentionally borrowed
                from an existing Windows 95 interface pattern.
              </p>

              <p className="pcs-body casestudy-reading">
                The more important questions were behavioral: what happens
                when a folder opens, how someone navigates deeper, how multiple
                windows behave, how an opened project stays visible, and what
                happens on mobile when desktop conventions stop translating
                cleanly.
              </p>

              <p className="pcs-highlight-quote">
                <mark>
                  <strong>
                    Figma was the starting point. React became part of the prototype.
                  </strong>
                </mark>
              </p>

            </div>

            <PlaceholderMedia
              src={perdanaComputerMain1}
              alt="Perdana's Computer design-in-code workflow"
              caption="The product moved into code early so system behavior could be designed and tested in a working environment."
            />


            <div className="pcs-process">

              <ProcessStep
                number="01"
                title="Arrive"
                text="A first-time visitor is introduced to Perdana and the idea behind the computer."
              />

              <ProcessStep
                number="02"
                title="Reach the desktop"
                text="The desktop becomes the main workspace and starting point for exploration."
              />

              <ProcessStep
                number="03"
                title="Choose a path"
                text="Visitors can open projects, profile information, writing, contact tools, or smaller experiments."
              />

              <ProcessStep
                number="04"
                title="Explore evidence"
                text="Folders and windows reveal case studies, visual work, product work, and design engineering evidence."
              />

              <ProcessStep
                number="05"
                title="Take a shortcut"
                text="AI Chat offers a faster route when a visitor wants specific information instead of manual exploration."
              />

              <ProcessStep
                number="06"
                title="Continue the conversation"
                text="Inbox provides a direct contact path from inside the portfolio experience."
              />

            </div>


            <DesignDecision
              number="BUILD 01"
              title="Start with the system shell"
            >

              <p className="pcs-body casestudy-reading">
                I started with the desktop, clickable icons, windows, and the
                taskbar system. React95 provided part of the interface
                foundation, so the goal was not to recreate every Windows
                component from zero. My responsibility was the product layer
                around it: what should exist, how the parts connect, what
                information belongs where, and how visitors move through the system.
              </p>

            </DesignDecision>


            <DesignDecision
              number="BUILD 02"
              title="Create feature surfaces before completing every backend"
            >

              <p className="pcs-body casestudy-reading">
                I then designed the main windows: About, Project Explorer,
                AI Chat, Inbox, Writing, Games, and Recycle Bin. Several of
                these began as interface shells before their complete behavior
                existed. Once the surfaces were clear, I made the functions
                operational one by one.
              </p>

            </DesignDecision>


            <DesignDecision
              number="BUILD 03"
              title="Let the product reveal new opportunities"
            >

              <p className="pcs-body casestudy-reading">
                Project navigation became functional, case studies were added,
                About was refined, Inbox was connected through Resend, and AI
                Chat evolved into a Gemini-powered interface connected to
                structured data about me. I also added an installer using
                localStorage and a randomized welcome window for repeat visits.
              </p>

              <p className="pcs-body casestudy-reading">
                The feature set did not come from one perfect specification at
                the beginning. Some ideas emerged while designing and building
                because the working product exposed new questions: what if a
                reviewer does not want to read everything? What if they want to
                contact me immediately? What if deeper folders become difficult
                to navigate?
              </p>

            </DesignDecision>


            <div className="pcs-research-translation">

              <div className="pcs-research-translation-header">
                <span className="casestudy-mono">
                  ACTUAL WORKING LOOP
                </span>
                <span className="casestudy-mono">
                  DESIGN IN CODE
                </span>
              </div>

              <div className="pcs-research-flow">

                <div className="pcs-research-flow-item">
                  <span className="casestudy-mono">
                    01
                  </span>
                  <strong className="casestudy-heading">
                    Define
                  </strong>
                </div>

                <div className="pcs-research-flow-arrow">
                  →
                </div>

                <div className="pcs-research-flow-item">
                  <span className="casestudy-mono">
                    02
                  </span>
                  <strong className="casestudy-heading">
                    Build & observe
                  </strong>
                </div>

                <div className="pcs-research-flow-arrow">
                  →
                </div>

                <div className="pcs-research-flow-item pcs-research-flow-item-final">
                  <span className="casestudy-mono">
                    03
                  </span>
                  <strong className="casestudy-heading">
                    Test & refine
                  </strong>
                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              04 — VALIDATE
          ===================================================== */}

          <section
            id="validate"
            className="pcs-section"
          >

            <SectionHeading
              number="04"
              title="Validate Through Repeated Tasks"
              subtitle="Use lightweight formative testing to catch interaction friction while the product is still changing."
            />

            <div className="pcs-future-card">

              <span className="pcs-future-label casestudy-mono">
                TESTING SETUP
              </span>

              <p className="casestudy-reading">
                <strong>Participant:</strong> 1 person from my personal circle.<br />
                <strong>Method:</strong> repeated task-based usability checks as new features were introduced.<br />
                <strong>Devices:</strong> desktop and smartphone when relevant.<br />
                <strong>Purpose:</strong> catch obvious interaction friction early — not claim population-level usability.
              </p>

            </div>


            <DesignDecision
              number="TEST 01"
              title="Finding and exploring a project"
            >

              <h3 className="pcs-research-title casestudy-heading">
                Task: find a case study about work I have done
              </h3>

              <p className="pcs-body casestudy-reading">
                I asked the participant to open the website and imagine they
                wanted to inspect a case study about my previous work. They
                understood that the desktop folders were interactive and were
                able to navigate into the project structure without instruction.
              </p>

              <div className="pcs-research-response">
                <span className="casestudy-mono">
                  FRICTION — MOBILE
                </span>
                <strong className="casestudy-reading">
                  Requiring double tap to open an item matched the desktop
                  metaphor but conflicted with the participant's expectation
                  that a single tap should open it on a phone.
                </strong>
              </div>

              <div className="pcs-research-response">
                <span className="casestudy-mono">
                  FRICTION — WAYFINDING
                </span>
                <strong className="casestudy-reading">
                  As the participant navigated deeper, similar folder icons and
                  changing content made it harder to understand the current
                  location and how deep they had explored.
                </strong>
              </div>

              <p className="pcs-body casestudy-reading">
                <strong>Iteration:</strong> I added a folder tree to expose the
                hierarchy and a current-folder control above the content so the
                user's location remains visible while navigating. For mobile,
                the interaction model needs to favor touch expectations over
                literal historical desktop behavior.
              </p>

              <p className="pcs-highlight-quote">
                <mark>
                  <strong>
                    The file tree was added because testing exposed a
                    wayfinding problem — not because it looked more like Windows.
                  </strong>
                </mark>
              </p>

            </DesignDecision>


            <DesignDecision
              number="TEST 02"
              title="Using AI when time is limited"
            >

              <h3 className="pcs-research-title casestudy-heading">
                Task: use the portfolio when you do not have much time
              </h3>

              <p className="pcs-body casestudy-reading">
                I asked what the participant would expect to do after noticing
                the AI Chat while imagining they did not have much time to
                explore. They immediately started asking questions about me.
                That supported the use case of conversational search as an
                information shortcut.
              </p>

              <p className="pcs-body casestudy-reading">
                The first implementation failed that expectation. The interface
                looked like an AI conversation, but the underlying behavior was
                still limited to template-style responses. The participant
                quickly became frustrated.
              </p>

              <div className="pcs-research-response">
                <span className="casestudy-mono">
                  FINDING
                </span>
                <strong className="casestudy-reading">
                  The feature had a useful mental model, but the interface
                  promised a level of conversation the implementation could not deliver.
                </strong>
              </div>

              <p className="pcs-body casestudy-reading">
                <strong>Iteration:</strong> I replaced the static behavior with
                a Gemini API integration connected to structured data about my
                profile, experience, projects, skills, and career direction. I
                also added language-aware responses so the assistant can answer
                in English or Indonesian based on the visitor's language.
              </p>

            </DesignDecision>


            <DesignDecision
              number="TEST 03"
              title="Contacting me through Inbox"
            >

              <h3 className="pcs-research-title casestudy-heading">
                Task: imagine you want to contact me after reviewing the portfolio
              </h3>

              <p className="pcs-body casestudy-reading">
                The participant initially looked for an email address, then
                noticed the Inbox icon and opened it. The feature itself was
                discoverable. The failure happened inside the form.
              </p>

              <p className="pcs-body casestudy-reading">
                The original Inbox required a valid sender email containing
                an @ symbol. From my perspective that protected the ability to
                reply. From the participant's perspective, the immediate goal
                was simply to send a message. The validation created enough
                friction that the task was abandoned.
              </p>

              <div className="pcs-research-response">
                <span className="casestudy-mono">
                  TRADE-OFF
                </span>
                <strong className="casestudy-reading">
                  Requiring an email improves replyability for me, but it can
                  block the user's primary goal of sending the message.
                </strong>
              </div>

              <p className="pcs-body casestudy-reading">
                <strong>Next iteration — not shipped yet:</strong> make email
                optional. If a visitor omits it, allow the message to send but
                clearly explain that I will not have a way to reply. This keeps
                the primary task completable while making the consequence explicit.
              </p>

            </DesignDecision>


            <div className="pcs-research-conclusion">

              <span className="casestudy-mono">
                WHAT THE TESTING ACTUALLY SUPPORTS
              </span>

              <h4 className="casestudy-heading">
                One participant is enough to expose friction. It is not enough
                to claim that “users prefer” the product.
              </h4>

              <p className="casestudy-reading">
                For this participant, the desktop metaphor was discoverable
                enough to begin exploring projects; deeper navigation created
                a wayfinding problem; mobile inherited a desktop interaction
                that did not fit touch expectations; AI Chat created a useful
                shortcut expectation that the first implementation failed to
                meet; and mandatory email validation blocked the contact task.
                Those observations were enough to change the product.
              </p>

            </div>

          </section>


          {/* =====================================================
              05 — OUTCOME
          ===================================================== */}

          <section
            id="outcome"
            className="pcs-section"
          >

            <SectionHeading
              number="05"
              title="Outcome"
              subtitle="Ship the first release, but keep the hiring result separate from the product result."
            />

            <div className="pcs-outcome">

              <div className="pcs-outcome-stat">

                <span className="pcs-outcome-number casestudy-heading">
                  V1
                </span>

                <span className="pcs-outcome-label casestudy-ui">
                  INITIAL RELEASE
                </span>

              </div>

              <div className="pcs-copy-stack pcs-outcome-copy">

                <p className="pcs-body casestudy-reading">
                  By 26 August 2026, the project had moved from an initial
                  hypothesis and basic wireframe into a working portfolio
                  product. The first release included the desktop environment,
                  functional windows and taskbar behavior, project folders,
                  case-study navigation, onboarding, AI, Inbox, writing,
                  responsive behavior, and smaller interactions supporting the
                  computer metaphor.
                </p>

                <p className="pcs-body casestudy-reading">
                  The implementation was built with React, HTML, CSS, and
                  JavaScript, using React95 as part of the interface foundation.
                  AI was also used as development assistance during exploration,
                  implementation, and debugging. Product, UX, visual, and final
                  implementation decisions remained my responsibility.
                </p>

              </div>

            </div>


            <div className="pcs-future-card">

              <span className="pcs-future-label casestudy-mono">
                WHAT I AM NOT CLAIMING YET
              </span>

              <p className="casestudy-reading">
                I do not yet have enough application data to claim that
                Perdana's Computer increases screening conversion, creates more
                interviews, or improves the probability of receiving an offer.
                Those are the long-term business hypotheses. Manufacturing those
                numbers would make the case study look more complete while
                making the evidence less credible.
              </p>

            </div>


            <div className="pcs-research-translation">

              <div className="pcs-research-translation-header">
                <span className="casestudy-mono">
                  TWO LEVELS OF OUTCOME
                </span>
                <span className="casestudy-mono">
                  CURRENT SNAPSHOT
                </span>
              </div>

              <div className="pcs-research-flow">

                <div className="pcs-research-flow-item">
                  <span className="casestudy-mono">
                    PRODUCT
                  </span>
                  <strong className="casestudy-heading">
                    Built, tested, iterated
                  </strong>
                </div>

                <div className="pcs-research-flow-arrow">
                  →
                </div>

                <div className="pcs-research-flow-item">
                  <span className="casestudy-mono">
                    HIRING
                  </span>
                  <strong className="casestudy-heading">
                    Still measuring
                  </strong>
                </div>

                <div className="pcs-research-flow-arrow">
                  →
                </div>

                <div className="pcs-research-flow-item pcs-research-flow-item-final">
                  <span className="casestudy-mono">
                    NORTH STAR
                  </span>
                  <strong className="casestudy-heading">
                    Open the next conversation
                  </strong>
                </div>

              </div>

            </div>


            <blockquote className="pcs-quote casestudy-reading-large">
              The goal is not simply to make someone think the website is
              cool. It is to help the right person understand my capabilities
              well enough to start the next conversation.
            </blockquote>

          </section>


          {/* =====================================================
              06 — REFLECTION
          ===================================================== */}

          <section
            id="reflection"
            className="pcs-section pcs-section-last"
          >

            <SectionHeading
              number="06"
              title="Reflection"
              subtitle="The most useful lesson was the tension between differentiation and usability — not the retro interface itself."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body-strong casestudy-heading">
                Different is useful only when it does not become expensive for the user.
              </p>

              <p className="pcs-body casestudy-reading">
                I started this project wanting to make something different and
                memorable. Research and testing made that goal more precise.
                Every unconventional interaction creates a cost. Sometimes that
                cost is worth paying because it creates engagement, communicates
                personality, or demonstrates capability. Sometimes it is simply friction.
              </p>

              <p className="pcs-body casestudy-reading">
                The mobile double-tap problem is a small example. Following
                Windows behavior made the concept more authentic. Following
                mobile behavior made the product easier to use. When those two
                goals conflict, <strong>the product has to win the argument.</strong>
              </p>

              <p className="pcs-body casestudy-reading">
                The project also changed how I think about prototyping. Figma
                was useful for defining structure, but many of the important
                questions only appeared when the product was running: how a
                folder hierarchy behaves, what happens when multiple windows
                are open, what an AI interface promises by looking like AI, and
                how a desktop interaction model behaves on a phone.
              </p>

              <p className="pcs-body casestudy-reading">
                Those are behavior questions, not only visual questions. Moving
                into React early allowed implementation to become part of the
                design process. For me, that is where Product Design and Design
                Engineering started to connect.
              </p>

            </div>


            <div className="pcs-design-grid">

              <article className="pcs-design-card">
                <span className="pcs-design-number casestudy-mono">
                  EVIDENCE
                </span>
                <h3 className="casestudy-heading">
                  Supported so far
                </h3>
                <p className="casestudy-reading">
                  I can take a self-defined problem through secondary research,
                  interaction design, implementation, task-based testing, and
                  iteration. The first participant also exposed concrete friction
                  that changed project navigation and AI behavior.
                </p>
              </article>

              <article className="pcs-design-card">
                <span className="pcs-design-number casestudy-mono">
                  ASSUMPTION
                </span>
                <h3 className="casestudy-heading">
                  Still unvalidated
                </h3>
                <p className="casestudy-reading">
                  The participant is not a recruiter or hiring manager. One
                  participant cannot represent broader usability. Memorability,
                  AI usefulness after launch, and the relationship between this
                  portfolio and hiring conversion still need stronger evidence.
                </p>
              </article>

            </div>


            <DesignDecision
              number="NEXT 01"
              title="Test with the actual target audience"
            >

              <p className="pcs-body casestudy-reading">
                The next meaningful test is with recruiters, hiring managers,
                Product Designers, or Design Leads. The question should not be
                “Do you like the Windows 95 style?” It should be:
              </p>

              <p className="pcs-highlight-quote">
                <mark>
                  <strong>
                    After exploring this portfolio, what do you think this
                    candidate can do — and what evidence led you to that conclusion?
                  </strong>
                </mark>
              </p>

            </DesignDecision>


            <DesignDecision
              number="NEXT 02"
              title="Reduce friction before adding more features"
            >

              <p className="pcs-body casestudy-reading">
                The next product work should prioritize mobile interaction,
                clearer window and folder state, and the unfinished optional
                email flow in Inbox. The portfolio already has enough features
                to test. The next question is whether those features make the
                evaluation experience more effective.
              </p>

            </DesignDecision>


            <DesignDecision
              number="NEXT 03"
              title="Measure the hiring funnel"
            >

              <p className="pcs-body casestudy-reading">
                The long-term experiment needs behavioral and career evidence:
                application → screening → portfolio review → interview → offer,
                combined with qualitative feedback about what reviewers
                understood and remembered. That will provide a stronger answer
                to the original hypothesis than page views alone.
              </p>

            </DesignDecision>


            <div className="pcs-problem-card">

              <span className="pcs-problem-label casestudy-ui">
                CLOSING
              </span>

              <p className="casestudy-heading">
                Perdana's Computer started as an attempt to create a portfolio
                that could stand out. It became a more useful experiment:
                can the portfolio itself demonstrate the kind of designer I am
                trying to become without making the person evaluating me work harder?
              </p>

            </div>


            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                The answer is not finished. Some assumptions have been
                challenged, some interactions have already failed and improved,
                and others still need better evidence.
              </p>

              <p className="pcs-body casestudy-reading">
                <strong>
                  That is why I do not see Perdana's Computer as a finished
                  portfolio. I see it as the first product in the transition.
                </strong>
              </p>

            </div>


            <dl className="pcs-snapshot">

              <Meta label="Role">
                Visual Designer → Product Design / Design Engineering
              </Meta>

              <Meta label="Product">
                Perdana's Computer
              </Meta>

              <Meta label="Status">
                Initial Release · Ongoing Iteration
              </Meta>

              <Meta label="Business Goal">
                Portfolio Screening → Interview → Offer
              </Meta>

            </dl>

          </section>

        </div>
      </main>

      {/* =========================================================
          COMPONENT STYLES
      ========================================================= */}

      <style>{`

        /* =====================================================
           COLOR + COMPONENT TOKENS
        ===================================================== */

        .perdana-case-study {

          --pcs-bg: #ffffff;
          --pcs-bg-soft: #f7f7f5;
          --pcs-bg-card: #fafafa;

          --pcs-ink: #111111;
          --pcs-body: #000000;
          --pcs-muted: #777773;
          --pcs-faint: #999995;

          --pcs-line: #e5e5e1;

          --pcs-black: #111111;
          --pcs-blue: #4568d4;
          --pcs-green: #27885c;

          width: 100%;
          min-height: 520px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background: var(--pcs-bg);
          color: var(--pcs-ink);

          box-sizing: border-box;

          text-align: left;

        }


        .perdana-case-study *,
        .perdana-case-study *::before,
        .perdana-case-study *::after {

          box-sizing: border-box;

        }


        .perdana-case-study p,
        .perdana-case-study blockquote,
        .perdana-case-study ul,
        .perdana-case-study dl,
        .perdana-case-study figure {

          margin: 0;

        }


.text-highlight {
  background: linear-gradient(
    to bottom,
    transparent 20%,
    #fff27a 20%,
    #fff27a 90%,
    transparent 90%
  );
  padding: 0 3px;
}


        /* =====================================================
           MAIN
        ===================================================== */

        .perdana-case-study-main {

          flex: 1;
          min-height: 0;

          overflow-y: auto;
          overflow-x: hidden;

          background: var(--pcs-bg);
          color: var(--pcs-body);

        }


        .perdana-case-study-container {

          width: min(55%, calc(100% - 64px));

          min-width: 320px;

          margin: 0 auto;

          padding: 40px 0 50px;

        }


        /* =====================================================
           HERO
        ===================================================== */

        .pcs-hero {

          padding-bottom: 56px;

          border-bottom:
            1px solid var(--pcs-line);

        }


        .pcs-eyebrow {

          display: flex;

          align-items: center;

          margin-bottom: 18px !important;

          color: var(--pcs-muted);


        }


        .pcs-title {

          margin: 0 0 22px !important;

          color: var(--pcs-ink);

        }


        .pcs-lead {

          max-width: 800px;

          margin: 0 0 40px !important;

          color: var(--pcs-body);

        }


        /* =====================================================
           SECTION
        ===================================================== */

        .pcs-section {

          padding: 64px 0;

          border-bottom:
            1px solid var(--pcs-line);

        }


        .pcs-section-last {

          border-bottom: 0;

          padding-bottom: 20px;

        }


        /* =====================================================
           SECTION HEADING
        ===================================================== */

        .pcs-section-heading {

          margin-bottom: 32px !important;

        }


        .pcs-section-title {

          margin: 0 !important;

          color: var(--pcs-ink);

        }


        .pcs-section-number {

          display: inline-block;

          margin-right: 10px;

          color: var(--pcs-faint);

        }


        .pcs-section-subtitle {

          max-width: 680px;

          margin: 10px 0 0 !important;

          color: var(--pcs-muted);

        }


        /* =====================================================
           COPY
        ===================================================== */

        .pcs-copy-stack {

          display: flex;

          flex-direction: column;

          gap: 22px;

          margin-bottom: 28px;

        }


        .pcs-body {

          color: var(--pcs-body);

        }


        .pcs-body strong {

          color: var(--pcs-ink);

        }


        .pcs-body-strong {

          margin: 32px 0 22px !important;

          color: var(--pcs-ink);

        }


        /* =====================================================
           PROBLEM CARD
        ===================================================== */

        .pcs-problem-card {

          margin-top: 40px;

          padding: 28px;

          background: var(--pcs-bg-soft);

          border:
            1px solid var(--pcs-line);

          border-left:
            3px solid var(--pcs-ink);

        }


        .pcs-problem-label {

          display: block;

          margin-bottom: 12px;

          color: var(--pcs-muted);

          letter-spacing: .08em;

        }


        .pcs-problem-card p {

          color: var(--pcs-ink);

        }


        /* =====================================================
           FEATURE LIST
        ===================================================== */

        .pcs-feature-list {

          display: flex;

          flex-direction: column;

          margin: 28px 0 42px;

          border-top:
            1px solid var(--pcs-line);

        }


        .pcs-feature {

          display: grid;

          grid-template-columns: 54px 1fr;

          align-items: center;

          gap: 16px;

          padding: 15px 0;

          border-bottom:
            1px solid var(--pcs-line);

        }


        .pcs-feature-number {

          color: var(--pcs-faint);

        }


        .pcs-feature-title {

          color: var(--pcs-ink);

        }


  .pcs-placeholder-image {
  display: block;

  width: 100%;
  height: 100%;

  background: transparent;

  border-radius: 0;

  border:
            5px solid var(--pcs-line);
}

.pcs-placeholder-caption {
  margin:
    12px 0 0 !important;

  font-family:
    var(--casestudy-font-ui);

  font-size:
    var(--casestudy-font-ui-size);

  line-height:
    1.5;

  letter-spacing:
    var(--casestudy-font-ui-letter-spacing);

  color:
    var(--cs-faint);

  text-align: left;
}


        /* =====================================================
           DESIGN DECISIONS
        ===================================================== */

        .pcs-design-decision {

          margin-top: 36px;

        }


        .pcs-design-grid {

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 1px;

          margin: 42px 0;

          background: var(--pcs-line);

          border:
            1px solid var(--pcs-line);

        }


        .pcs-design-card {

          min-height: 220px;

          padding: 24px;

          background: var(--pcs-bg);

        }


        .pcs-design-number {

          display: block;

          margin-bottom: 34px;

          color: var(--pcs-faint);

        }


        .pcs-design-card h3 {

          margin: 0 0 12px !important;

          color: var(--pcs-ink);

        }


        .pcs-design-card p {

          color: var(--pcs-muted);

        }


        /* =====================================================
           QUOTE
        ===================================================== */

.pcs-highlight-quote {
  max-width: 680px;
  margin: 48px auto !important;

  font-family: var(--casestudy-font-heading);
  font-size: var(--casestudy-font-reading-large-size);
  line-height: 1.5;
  letter-spacing: var(--casestudy-font-heading-letter-spacing);

  text-align: center;
}

.pcs-highlight-quote mark {
  background: #fff27a;
  color: inherit;
  padding: 2px 5px;
}


        .pcs-quote {

          margin: 44px 0 !important;

          padding: 6px 0 6px 22px;

          border-left:
            3px solid var(--pcs-ink);

          color: var(--pcs-ink);

        }


        /* =====================================================
           PROCESS
        ===================================================== */

        .pcs-process {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 1px;

          margin-top: 42px;

          background: var(--pcs-line);

          border:
            1px solid var(--pcs-line);

        }


        .pcs-process-step {

          min-height: 180px;

          padding: 20px;

          background: var(--pcs-bg);

        }


        .pcs-process-number {

          display: block;

          margin-bottom: 30px;

          color: var(--pcs-faint);

        }


        .pcs-process-step h3 {

          margin: 0 0 8px !important;

          color: var(--pcs-ink);

        }


        .pcs-process-step p {

          color: var(--pcs-muted);

        }


        /* =====================================================
           FEEDBACK
        ===================================================== */

        .pcs-feedback-card {

          margin: 38px 0 0;

          padding: 28px;

          background: var(--pcs-ink);

          color: white;

        }


        .pcs-feedback-label {

          display: block;

          margin-bottom: 24px;

          color: #aaa;

        }


        .pcs-feedback-card h3 {

          margin: 0 0 12px !important;

          color: white;

        }


        .pcs-feedback-card p {



          margin-bottom: 22px !important;

          color: #cfcfca;

        }


        .pcs-feedback-button {

          display: inline-flex;

          align-items: center;

          justify-content: center;

          padding: 10px 16px;

          background: white;

          border:
            1px solid white;

          color: #111;

          cursor: pointer;

          transition:
            background 140ms ease,
            color 140ms ease;

        }


        .pcs-feedback-button:hover {

          background: transparent;

          color: white;

        }


        /* =====================================================
           OUTCOME
        ===================================================== */

        .pcs-outcome {

          display: flex;

          align-items: flex-start;

          gap: 28px;

          margin: 0 0 36px;

        }


        .pcs-outcome-stat {

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          min-width: 150px;

          padding: 24px 20px;

          background: var(--pcs-bg-soft);

          border:
            1px solid var(--pcs-line);

        }


        .pcs-outcome-number {

          color: var(--pcs-ink);

        }


        .pcs-outcome-label {

          margin-top: 9px;

          color: var(--pcs-blue);

          letter-spacing: .06em;

          text-transform: uppercase;

        }


        .pcs-outcome-copy {

          flex: 1;

          margin-bottom: 0 !important;

        }


        .pcs-future-card {

          margin: 30px 0;

          padding: 24px;

          background: #f8f8f6;

          border:
            1px solid var(--pcs-line);

        }


        .pcs-future-label {

          display: block;

          margin-bottom: 16px;

          color: var(--pcs-faint);

        }


        .pcs-future-card p {

          margin-bottom: 14px !important;

          color: var(--pcs-body);

        }


        .pcs-future-card p:last-child {

          margin-bottom: 0 !important;

        }


        /* =====================================================
           SNAPSHOT
        ===================================================== */

        .pcs-snapshot {

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 24px 28px;

          margin: 40px 0 !important;

          padding: 22px;

          background: var(--pcs-bg-soft);

          border:
            1px solid var(--pcs-line);

        }


        .pcs-meta-item {

          min-width: 0;

        }


        .pcs-meta-label {

          display: block;

          margin-bottom: 8px;

          color: var(--pcs-faint);

          letter-spacing: .06em;

          text-transform: uppercase;

        }


        .pcs-meta-value {

          display: block;

          color: var(--pcs-ink);

        }

        /* =====================================================
   RESEARCH — BASE
===================================================== */

.pcs-research {
  margin-top: 52px;
}


/* =====================================================
   RESEARCH — INTRO
===================================================== */

.pcs-research-intro {
  padding-bottom: 28px;
}

.pcs-research-intro-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  margin-bottom: 18px;
}

.pcs-research-kicker {
  color: var(--pcs-ink);
  letter-spacing: .08em;
}

.pcs-research-status {
  color: var(--pcs-faint);
  letter-spacing: .06em;
  text-align: right;
}

.pcs-research-title {
  max-width: 760px;
  margin: 0 0 14px !important;

  color: var(--pcs-ink);
}

.pcs-research-intro-copy {
  max-width: 680px;
  color: var(--pcs-muted);
}


/* =====================================================
   RESEARCH — METRICS
===================================================== */

.pcs-research-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  border-top: 1px solid var(--pcs-line);
  border-bottom: 1px solid var(--pcs-line);

  margin-bottom: 52px;
}

.pcs-research-metric {
  min-width: 0;
  padding: 22px 24px;

  border-right: 1px solid var(--pcs-line);
}

.pcs-research-metric:first-child {
  padding-left: 0;
}

.pcs-research-metric:last-child {
  padding-right: 0;
  border-right: 0;
}

.pcs-research-metric-number {
  display: block;

  margin-bottom: 8px;



  letter-spacing: -.05em;

  color: var(--pcs-ink);
}

.pcs-research-metric-label {
  display: block;

  color: var(--pcs-muted);
  font-size: 10px;
  line-height: 1.3;
  letter-spacing: .08em;
}


/* =====================================================
   RESEARCH — SECTION LABEL
===================================================== */

.pcs-research-section-label {
  margin-bottom: 0;

  padding-bottom: 12px;

  color: var(--pcs-faint);

  letter-spacing: .08em;
}


/* =====================================================
   RESEARCH — FINDING
===================================================== */

.pcs-research-finding {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);

  gap: 18px;

  padding: 30px 0;

  border-top: 1px solid var(--pcs-line);
}

.pcs-research-finding:last-child {
  border-bottom: 1px solid var(--pcs-line);
}

.pcs-research-finding-index {
  color: var(--pcs-faint);
}

.pcs-research-finding-main {
  min-width: 0;
}

.pcs-research-finding-meta {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 12px;
}

.pcs-research-finding-meta > span:first-child {
  color: var(--pcs-muted);
  letter-spacing: .07em;
}

.pcs-research-finding-tag {
  padding: 4px 7px;

  border: 1px solid var(--pcs-line);

  color: var(--pcs-faint);

  font-family: var(--casestudy-font-mono);
  font-size: 9px;
  line-height: 1;

  letter-spacing: .06em;
}

.pcs-research-finding h4 {
  max-width: 700px;

  margin: 0 0 12px !important;

  color: var(--pcs-ink);
}

.pcs-research-finding-main > p {
  max-width: 680px;

  color: var(--pcs-muted);
}


/* =====================================================
   RESEARCH — DESIGN RESPONSE
===================================================== */

.pcs-research-response {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);

  gap: 18px;

  max-width: 700px;

  margin-top: 20px;
  padding: 16px 0;

  border-top: 1px dashed var(--pcs-line);
  border-bottom: 1px dashed var(--pcs-line);
}

.pcs-research-response > span {
  color: var(--pcs-faint);
  font-size: 9px;
  letter-spacing: .07em;
}

.pcs-research-response strong {
  color: var(--pcs-ink);
}

.pcs-research-source {
  display: block;

  margin-top: 14px;

  color: var(--pcs-faint);

  font-size: 9px;
  letter-spacing: .04em;
}


/* =====================================================
   RESEARCH — TRANSLATION
===================================================== */

.pcs-research-translation {
  margin-top: 52px;

  border: 1px solid var(--pcs-line);
  background: var(--pcs-bg-soft);
}

.pcs-research-translation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 13px 18px;

  border-bottom: 1px solid var(--pcs-line);

  color: var(--pcs-faint);

  font-size: 9px;
  letter-spacing: .07em;
}

.pcs-research-flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1.2fr;

  align-items: stretch;
}

.pcs-research-flow-item {
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 150px;

  padding: 22px;

  background: var(--pcs-bg);
}

.pcs-research-flow-item > span {
  margin-bottom: 10px;

  color: var(--pcs-faint);

  font-size: 9px;
  letter-spacing: .07em;
}

.pcs-research-flow-item strong {
  color: var(--pcs-ink);
}

.pcs-research-flow-item-final {
  background: var(--pcs-ink);
}

.pcs-research-flow-item-final > span {
  color: #999;
}

.pcs-research-flow-item-final strong {
  color: white;
}

.pcs-research-flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;

  background: var(--pcs-bg);

  color: var(--pcs-faint);

  font-size: 18px;
}


/* =====================================================
   RESEARCH — CONCLUSION
===================================================== */

.pcs-research-conclusion {
  margin-top: 24px;

  padding: 30px;


  color: white;
}

.pcs-research-conclusion > span {
  display: block;

  margin-bottom: 18px;

  color: #000000;

  font-size: 9px;
  letter-spacing: .08em;
}

.pcs-research-conclusion h4 {
  max-width: 760px;

  margin: 0 0 16px !important;

  color: 000000;
}

.pcs-research-conclusion p {
  max-width: 680px;

  color: #000000;
}


/* =====================================================
   RESEARCH — SOURCES
===================================================== */

.pcs-research-sources {
  display: flex;
  flex-direction: column;

  gap: 8px;

  margin-top: 28px;
  padding-top: 18px;

  border-top: 1px solid var(--pcs-line);
}

.pcs-research-sources > span {
  margin-bottom: 4px;

  color: var(--pcs-faint);

  font-size: 9px;
  letter-spacing: .08em;
}

.pcs-research-sources a {
  color: var(--pcs-muted);

  text-decoration: none;

  transition:
    color 140ms ease,
    padding-left 140ms ease;
}

.pcs-research-sources a:hover {
  padding-left: 4px;

  color: var(--pcs-ink);
  text-decoration: underline;
}


/* =====================================================
   RESEARCH — RESPONSIVE
===================================================== */

@media (max-width: 700px) {

  .pcs-research-intro-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .pcs-research-status {
    text-align: left;
  }

  .pcs-research-metrics {
    grid-template-columns: repeat(3, 1fr);
  }

  .pcs-research-metric {
    padding: 18px 14px;
  }

  .pcs-research-metric:first-child {
    padding-left: 0;
  }

  .pcs-research-metric-number {
    font-size: 34px;
  }

  .pcs-research-finding {
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 12px;
  }

  .pcs-research-response {
    grid-template-columns: 1fr;
    gap: 7px;
  }

  .pcs-research-flow {
    grid-template-columns: 1fr;
  }

  .pcs-research-flow-arrow {
    width: 100%;
    height: 30px;
  }

  .pcs-research-flow-item {
    min-height: 120px;
  }
}


@media (max-width: 480px) {

  .pcs-research-metric {
    padding: 16px 8px;
  }

  .pcs-research-metric-number {
    font-size: 28px;
  }

  .pcs-research-metric-label {
    font-size: 8px;
  }

  .pcs-research-finding {
    padding: 24px 0;
  }

  .pcs-research-conclusion {
    padding: 22px;
  }

}

/* =====================================================
   CASE STUDY NAVIGATION
===================================================== */
/* =====================================================
   MINIMAL LEFT NAVIGATION
===================================================== */

.pcs-navigation {
  position: fixed;

  top: 20%;
  left: 15px;

  z-index: 100;


}

.pcs-navigation-inner {
  display: flex;
  flex-direction: column;

  gap: 14px;

  width: 180px;

  padding: 0;

  border: 0;
}

.pcs-navigation-label {
  display: none;
}

.pcs-navigation-list {
  display: flex;
  flex-direction: column;

  gap: 2px;
}

.pcs-navigation-item {
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;

  padding: 6px 8px;

  border: 0;

  background: transparent;

  color: var(--pcs-faint);

  text-align: left;

  cursor: pointer;

  transition:
    color 160ms ease,
    background 160ms ease;
}

.pcs-navigation-item:hover {
  color: var(--pcs-ink);

  background: var(--pcs-bg-soft);
}


.pcs-navigation-title {
  font-size: 10px;
  line-height: 1.4;

  color: inherit;
}


/* ACTIVE */

.pcs-navigation-item.is-active {
  color: var(--pcs-ink);
}

.pcs-navigation-item.is-active

/* subtle active indicator */

.pcs-navigation-item::before {
  content: '';

  position: absolute;

  left: -8px;
  top: 50%;

  width: 3px;
  height: 3px;

  border-radius: 50%;

  background: var(--pcs-ink);

  opacity: 0;

  transform: translateY(-50%);

  transition: opacity 160ms ease;
}

.pcs-navigation-item.is-active::before {
  opacity: 1;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 1200px) {

  .pcs-navigation {
    display: none;
  }

}

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 900px) {

          .perdana-case-study-container {

            width: calc(100% - 48px);

          }


          .pcs-process {

            grid-template-columns:
              repeat(2, 1fr);

          }

        }


        @media (max-width: 700px) {

        

          .perdana-case-study-container {

            width: calc(100% - 40px);

          }


          .pcs-section {

            padding: 50px 0;

          }


          .pcs-design-grid {

            grid-template-columns: 1fr;

          }


          .pcs-process {

            grid-template-columns: 1fr;

          }


          .pcs-outcome {

            flex-direction: column;

          }


          .pcs-outcome-stat {

            width: 100%;

          }

        }


        @media (max-width: 560px) {

        

          .perdana-case-study-container {

            width: calc(100% - 32px);

            padding: 40px 0 56px;

          }


          .pcs-hero {

            padding-bottom: 40px;

          }


          .pcs-section {

            padding: 44px 0;

          }


          .pcs-snapshot {

            grid-template-columns: 1fr;

            gap: 20px;

            padding: 18px;

          }


          .pcs-problem-card {

            padding: 22px;

          }


          .pcs-design-card {

            min-height: auto;

          }


          .pcs-process-step {

            min-height: auto;

          }


        }



      `}</style>
    </div>
  );
}


/* =========================================================
   HELPERS
========================================================= */

function Meta({ label, children }) {
  return (
    <div className="pcs-meta-item">

      <span className="pcs-meta-label casestudy-ui">
        {label}
      </span>

      <span className="pcs-meta-value casestudy-ui-reading">
        {children}
      </span>

    </div>
  );
}


function SectionHeading({
  number,
  title,
  subtitle,
}) {
  return (
    <div className="pcs-section-heading">

      <h2 className="pcs-section-title casestudy-heading">

        {number && (
          <span className="pcs-section-number casestudy-mono">
            {number}
          </span>
        )}

        {title}

      </h2>

      {subtitle && (
        <p className="pcs-section-subtitle casestudy-reading">
          {subtitle}
        </p>
      )}

    </div>
  );
}


function PlaceholderMedia({
  label,
  src,
  alt = '',
  caption,
  aspect = '16 / 9',
}) {
  return (
    <figure
      className="pcs-placeholder"
      style={{
        aspectRatio: aspect,
      }}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            className="pcs-placeholder-image"
          />

          {caption && (
            <figcaption className="pcs-placeholder-caption">
              {caption}
            </figcaption>
          )}
        </>
      ) : (
        <div className="pcs-placeholder-inner">

          <div
            className="pcs-placeholder-icon casestudy-mono"
            aria-hidden="true"
          >
            +
          </div>

          <span className="pcs-placeholder-label casestudy-ui">
            {label}
          </span>

          <span className="pcs-placeholder-note casestudy-mono">
            MEDIA PLACEHOLDER
          </span>

        </div>
      )}
    </figure>
  );
}


function DesignDecision({
  number,
  title,
  children,
}) {
  return (
    <article className="pcs-design-decision">

      <div className="pcs-feature">

        <span className="pcs-feature-number casestudy-mono">
          {number}
        </span>

        <span className="pcs-feature-title casestudy-ui-reading">
          {title}
        </span>

      </div>

      <div className="pcs-copy-stack">
        {children}
      </div>

    </article>
  );
}


function ProcessStep({
  number,
  title,
  text,
}) {
  return (
    <article className="pcs-process-step">

      <span className="pcs-process-number casestudy-mono">
        {number}
      </span>

      <h3 className="casestudy-heading">
        {title}
      </h3>

      <p className="casestudy-reading">
        {text}
      </p>

    </article>
  );
}

function ResearchBar({
  label,
  value,
  suffix = '%',
}) {
  return (
    <div className="pcs-research-bar">

      <div className="pcs-research-bar-meta">

        <span className="casestudy-reading">
          {label}
        </span>

        <span className="casestudy-mono">
          {value}{suffix}
        </span>

      </div>

      <div className="pcs-research-bar-track">

        <div
          className="pcs-research-bar-fill"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}

function CaseStudyNavigation() {
  const [activeSection, setActiveSection] = React.useState('hero');

  React.useEffect(() => {
    const sections = caseStudyNavigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavigation = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <nav className="pcs-navigation" aria-label="Case study navigation">

      <div className="pcs-navigation-inner">

        <span className="pcs-navigation-label casestudy-mono">
          CONTENTS
        </span>

        <div className="pcs-navigation-list">

          {caseStudyNavigation.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`pcs-navigation-item ${
                  isActive ? 'is-active' : ''
                }`}
                onClick={() => handleNavigation(item.id)}
              >

                <span className="pcs-navigation-number casestudy-mono">
                  {item.number}
                </span>

                <span className="pcs-navigation-title casestudy-ui">
                  {item.title}
                </span>

              </button>
            );
          })}

        </div>

      </div>

    </nav>
  );
}

import React from 'react';

/*
  =========================================================
  PERDANA'S COMPUTER — PRODUCT CASE STUDY
  =========================================================

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

  This component only controls:
  - layout
  - spacing
  - colors
  - borders
  - surfaces
  - responsive behavior
  - component-specific visual treatment
*/

const productFeatures = [
  'Interactive portfolio experience',
  'Windows 95-inspired interface',
  'Explorable project structure',
  'Product-oriented navigation',
  'Design + development in React',
  'Continuous product iteration',
];

const designPrinciples = [
  {
    title: 'Memorable over ordinary',
    text:
      'The portfolio should not feel like another static case-study website. The interface itself becomes part of the experience.',
  },
  {
    title: 'Portfolio as a product',
    text:
      'Instead of treating the portfolio as a collection of pages, I approached it as a product with users, problems, interactions, and room for iteration.',
  },
  {
    title: 'Interactive, not overwhelming',
    text:
      'The interface creates small moments of exploration while keeping the actual work accessible and easy to discover.',
  },
  {
    title: 'Designed in code',
    text:
      'The visual system was designed directly in React, HTML, and CSS, allowing interaction and visual design to evolve together.',
  },
];

export default function PerdanaComputerProductContent() {
  return (
    <div className="perdana-case-study casestudy">
      <main className="perdana-case-study-main">
        <div className="perdana-case-study-container">

          {/* =====================================================
              HERO
          ===================================================== */}

          <section className="pcs-hero">

            <p className="pcs-eyebrow casestudy-ui">
              Perdana's Computer — Product Case Study
            </p>

            <h1 className="pcs-title casestudy-hero-title">
              My Portfolio Is My First Product
            </h1>

            <p className="pcs-lead casestudy-reading-large">
              A personal portfolio designed and developed as an
              interactive product — built to turn the familiar
              portfolio experience into something more memorable,
              exploratory, and human.
            </p>

            <PlaceholderMedia
              label="Portfolio interface preview"
              aspect="16 / 9"
            />

          </section>


          {/* =====================================================
              00 — PRODUCT & PROBLEM
          ===================================================== */}

          <section className="pcs-section">

            <SectionHeading
              number="00"
              title="Product & Problem"
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                Perdana's Computer started from a simple observation:
                <strong>
                  {' '}
                  recruiters and hiring teams may review hundreds (
                  sometimes thousands) of resumes and portfolios
                  during a hiring process.
                </strong>
              </p>

              <p className="pcs-body casestudy-reading">
                Yet many portfolio websites still follow almost the
                same structure: a landing page, a collection of
                projects, long case studies, and endless scrolling.
                The work might be good, but the experience itself can
                become difficult to remember.
              </p>

              <p className="pcs-body-strong casestudy-heading">
                What if the portfolio itself was treated as a product
                that needed to solve a user problem?
              </p>

              <p className="pcs-body casestudy-reading">
                That became the starting point for this project.
                Instead of designing another static portfolio, I
                wanted to
                <strong>
                  {' '}
                  create an experience that could give the person
                  reviewing it a small break from the repetitive
                  rhythm of portfolio browsing
                </strong>
                {' '}
                while still making the actual work easy to explore.
              </p>

            </div>

            <div className="pcs-problem-card">

              <span className="pcs-problem-label casestudy-ui">
                THE PROBLEM
              </span>

              <p className="casestudy-heading">
                How might I make a portfolio memorable without making
                it difficult to understand or navigate?
              </p>

            </div>

          </section>


          {/* =====================================================
              01 — ROLE & CONTRIBUTION
          ===================================================== */}

          <section className="pcs-section">

            <SectionHeading
              number="01"
              title="Role & Contribution"
              subtitle="I treated the portfolio as a product — and took responsibility for the entire process."
            />

            <div className="pcs-feature-list">

              {productFeatures.map((feature, index) => (
                <div
                  className="pcs-feature"
                  key={feature}
                >
                  <span className="pcs-feature-number casestudy-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="pcs-feature-title casestudy-ui-reading">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                My role covers the whole product process:
                <strong>
                  {' '}
                  ideation, definition, planning, visual design,
                  interaction design, development, testing, and
                  iteration.
                </strong>
              </p>

              <p className="pcs-body casestudy-reading">
                I am not only designing the interface and creating
                prototypes. I am also developing the actual product
                using React, HTML, and CSS, with the assistance of AI
                throughout the development process.
              </p>

              <p className="pcs-body casestudy-reading">
                I also use <strong>React95</strong> as part of the
                implementation, which means some of the interface
                foundations do not have to be rebuilt completely from
                scratch.
              </p>

              <p className="pcs-body casestudy-reading">
                But the visual decisions, interaction details,
                composition, content structure, and the work of
                translating the design language into a functioning
                product remain a significant part of the process.
              </p>

            </div>

            <PlaceholderMedia
              label="Design and development process"
              aspect="3 / 2"
            />

          </section>


          {/* =====================================================
              02 — KEY DESIGN DECISIONS
          ===================================================== */}

          <section className="pcs-section">

            <SectionHeading
              number="02"
              title="Key Design Decisions"
              subtitle="Make the portfolio feel like something you explore, not something you simply scroll through."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                The problem statement led to one important design
                direction: the portfolio should become part of the
                solution.
              </p>

              <p className="pcs-body-strong casestudy-heading">
                I wanted to give recruiters a reason to pause.
              </p>

              <p className="pcs-body casestudy-reading">
                Instead of presenting the portfolio as a conventional
                website, I designed it around a familiar computing
                metaphor — a Windows 95-inspired environment where
                projects, information, and interactions can be
                discovered through an interface.
              </p>

            </div>


            {/* ===================================================
                RETRO DESIGN DECISION
            =================================================== */}

            <DesignDecision
              number="01"
              title="Why a retro interface?"
            >
              <p className="casestudy-reading">
                The retro visual direction is not only an aesthetic
                choice. It is a strategy for memorability.
              </p>

              <p className="casestudy-reading">
                When many portfolio websites use similar contemporary
                layouts, a recognizable visual metaphor can help the
                experience stand apart before the recruiter even
                reaches the individual project content.
              </p>

              <p className="casestudy-reading">
                The Windows 95-inspired language also creates an
                opportunity to make interaction part of the story.
                Windows, folders, menus, buttons, dialogs, and other
                interface elements become ways to explore the work
                rather than decoration placed on top of it.
              </p>
            </DesignDecision>


            {/* ===================================================
                RESEARCH
            =================================================== */}

            <div className="pcs-research-card">

              <div className="pcs-research-header">

                <span className="pcs-research-number casestudy-mono">
                  RESEARCH
                </span>

                <span className="pcs-research-status casestudy-mono">
                  DATA TO BE ADDED
                </span>

              </div>

              <h3 className="casestudy-heading">
                Why this visual approach makes sense for the audience
              </h3>

              <p className="casestudy-reading">
                This section will document research into recruiter
                and hiring-manager demographics, portfolio browsing
                behavior, and the familiarity of retro computing
                interfaces across relevant age groups.
              </p>

              <div className="pcs-data-placeholder">

                <span className="casestudy-mono">
                  [ Recruiter / hiring manager demographic data ]
                </span>

                <span className="casestudy-mono">
                  [ Portfolio review behavior ]
                </span>

                <span className="casestudy-mono">
                  [ Memorability / distinctive interface research ]
                </span>

              </div>

            </div>


            {/* ===================================================
                DESIGN PRINCIPLES
            =================================================== */}

            <div className="pcs-design-grid">

              {designPrinciples.map((item, index) => (
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


            <PlaceholderMedia
              label="Interactive portfolio / interface exploration"
              aspect="16 / 9"
            />

            <blockquote className="pcs-quote casestudy-reading-large">
              The portfolio is not only a container for the work.
              The portfolio itself is the first product I am asking
              the user to experience.
            </blockquote>

          </section>


          {/* =====================================================
              03 — DEVELOPMENT
          ===================================================== */}

          <section className="pcs-section">

            <SectionHeading
              number="03"
              title="From Design to Code"
              subtitle="The interface was designed and built as one continuous process."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                One of the biggest differences between this project
                and a conventional portfolio design is that the
                interface did not stop at a Figma prototype.
              </p>

              <p className="pcs-body casestudy-reading">
                I translated the visual decisions directly into
                <strong>
                  {' '}
                  React, HTML, and CSS
                </strong>
                , using code as part of the design process itself.
              </p>

              <p className="pcs-body casestudy-reading">
                AI became an additional development partner during
                implementation. It helped accelerate exploration,
                debugging, and repetitive coding tasks, allowing me
                to spend more time on the visual and product decisions.
              </p>

              <p className="pcs-body casestudy-reading">
                The result is intentionally not presented as a
                finished artifact. It is a working product that can
                continue to change as I learn from people using it.
              </p>

            </div>


            <div className="pcs-process">

              <ProcessStep
                number="01"
                title="Ideate"
                text="Identify the problem with conventional portfolio experiences."
              />

              <ProcessStep
                number="02"
                title="Define"
                text="Turn the portfolio into a product with a clear user experience goal."
              />

              <ProcessStep
                number="03"
                title="Design"
                text="Develop the visual language, interface, interaction, and information architecture."
              />

              <ProcessStep
                number="04"
                title="Build"
                text="Translate the design directly into React, HTML, and CSS."
              />

              <ProcessStep
                number="05"
                title="Test"
                text="Run limited alpha testing and collect feedback from real users."
              />

              <ProcessStep
                number="06"
                title="Iterate"
                text="Use feedback and future outcomes to continuously evolve the product."
              />

            </div>

          </section>


          {/* =====================================================
              04 — TESTING
          ===================================================== */}

          <section className="pcs-section">

            <SectionHeading
              number="04"
              title="Testing"
              subtitle="This portfolio is currently an evolving product."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                Before making the experience public, I am testing it
                with a limited group of users.
              </p>

              <p className="pcs-body casestudy-reading">
                And if you are reading this case study, there is a
                good chance that <strong>you are one of the testers.</strong>
              </p>

              <p className="pcs-body-strong casestudy-heading">
                Tell me what works. Tell me what doesn't.
              </p>

              <p className="pcs-body casestudy-reading">
                The goal of this stage is not to prove that the
                portfolio is perfect. It is to understand where the
                experience creates friction, confusion, delight, or
                unexpected moments of discovery.
              </p>

            </div>


            <div className="pcs-feedback-card">

              <span className="pcs-feedback-label casestudy-mono">
                ALPHA TEST
              </span>

              <h3 className="casestudy-heading">
                You are part of the testing process.
              </h3>

              <p className="casestudy-reading">
                Found something confusing? Have an idea? Something
                feels unnecessary? I'd genuinely like to know.
              </p>

              <button
                type="button"
                className="pcs-feedback-button casestudy-ui-reading"
                onClick={() => {
                  window.location.href =
                    'mailto:hello@example.com?subject=Perdana%27s%20Computer%20Feedback';
                }}
              >
                Send feedback ↗
              </button>

            </div>


            <PlaceholderMedia
              label="User testing / feedback"
              aspect="3 / 2"
            />

          </section>


          {/* =====================================================
              05 — OUTCOME
          ===================================================== */}

          <section className="pcs-section">

            <SectionHeading
              number="05"
              title="Outcome"
            />

            <div className="pcs-outcome">

              <div className="pcs-outcome-stat">

                <span className="pcs-outcome-number casestudy-heading">
                  TBD
                </span>

                <span className="pcs-outcome-label casestudy-ui">
                  PRODUCT RESULT
                </span>

              </div>

              <div className="pcs-copy-stack pcs-outcome-copy">

                <p className="pcs-body casestudy-reading">
                  This project is still relatively new, so I do not
                  want to manufacture success metrics simply to make
                  the case study look complete.
                </p>

                <p className="pcs-body casestudy-reading">
                  Instead, I am treating the portfolio itself as an
                  ongoing experiment.
                </p>

              </div>

            </div>


            <div className="pcs-future-card">

              <span className="pcs-future-label casestudy-mono">
                SEPTEMBER 2026+
              </span>

              <p className="casestudy-reading">
                If I update this case study later and I have landed a
                product design role through this portfolio, then that
                will be one meaningful signal that the product worked.
              </p>

              <p className="casestudy-reading">
                If it did not, that is useful information too.
                The next question becomes:
                <strong>
                  {' '}
                  what should I improve?
                </strong>
              </p>

            </div>


            <PlaceholderMedia
              label="Future product outcome"
              aspect="16 / 9"
            />

          </section>


          {/* =====================================================
              REFLECTION
          ===================================================== */}

          <section className="pcs-section pcs-section-last">

            <SectionHeading
              title="A portfolio that keeps evolving"
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body-strong casestudy-heading">
                This project changed the way I think about portfolios.
              </p>

              <p className="pcs-body casestudy-reading">
                A portfolio does not have to be a static archive of
                previous work. It can be a product itself — something
                with a problem, users, a value proposition, an
                interface, interactions, testing, and continuous
                iteration.
              </p>

              <p className="pcs-body casestudy-reading">
                I also see this project as a bridge between my decade
                of experience in visual design and my growing practice
                in product design and development.
              </p>

              <p className="pcs-body casestudy-reading">
                It is not perfect. And it probably never will be.
                That's intentional.
              </p>

              <p className="pcs-body casestudy-reading">
                <strong>
                  Because this portfolio is a product — and products
                  are meant to evolve.
                </strong>
              </p>

            </div>


            <dl className="pcs-snapshot">

              <Meta label="Role">
                Product Designer · Design Engineer
              </Meta>

              <Meta label="Scope">
                Product · UX · UI · Development
              </Meta>

              <Meta label="Technology">
                React · HTML · CSS · React95
              </Meta>

              <Meta label="Status">
                Alpha Testing · Continuously Evolving
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

          text-transform: uppercase;

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


        /* =====================================================
           PLACEHOLDER MEDIA
        ===================================================== */

        .pcs-placeholder {

          position: relative;

          display: flex;

          align-items: center;

          justify-content: center;

          width: 100%;

          margin: 36px 0 0;

          background: #f2f2ef;

          border:
            1px dashed #cfcfca;

          overflow: hidden;

        }


        .pcs-placeholder-inner {

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding: 40px;

          text-align: center;

        }


        .pcs-placeholder-icon {

          width: 42px;
          height: 42px;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid #cfcfca;

          color: var(--pcs-muted);

        }


        .pcs-placeholder-label {

          color: var(--pcs-muted);

        }


        .pcs-placeholder-note {

          color: var(--pcs-faint);

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
           RESEARCH
        ===================================================== */

        .pcs-research-card {

          margin: 42px 0;

          padding: 24px;

          background: #f8f8f6;

          border:
            1px solid var(--pcs-line);

        }


        .pcs-research-header {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 16px;

          margin-bottom: 30px;

        }


        .pcs-research-number {

          color: var(--pcs-muted);

        }


        .pcs-research-status {

          padding: 5px 8px;

          background: #ecece8;

          color: var(--pcs-muted);

        }


        .pcs-research-card h3 {

          margin: 0 0 12px !important;

          color: var(--pcs-ink);

        }


        .pcs-research-card > p {

          max-width: 700px;

          color: var(--pcs-muted);

        }


        .pcs-data-placeholder {

          display: flex;

          flex-direction: column;

          gap: 8px;

          margin-top: 24px;

          padding-top: 18px;

          border-top:
            1px solid var(--pcs-line);

        }


        .pcs-data-placeholder span {

          color: var(--pcs-faint);

        }


        /* =====================================================
           QUOTE
        ===================================================== */

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

          max-width: 620px;

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


          .pcs-research-header {

            align-items: flex-start;

            flex-direction: column;

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
  aspect = '16 / 9',
}) {
  return (
    <figure
      className="pcs-placeholder"
      style={{
        aspectRatio: aspect,
      }}
    >

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
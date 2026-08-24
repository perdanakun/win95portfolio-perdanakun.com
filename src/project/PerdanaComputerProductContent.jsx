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
const caseStudyNavigation = [
  {
    id: 'hero',
    title: 'Overview',
  },
  {
    id: 'product-problem',
    title: 'Product & Problem',
  },
  {
    id: 'role-contribution',
    title: 'Role & Contribution',
  },
  {
    id: 'design-decisions',
    title: 'Key Design Decisions',
  },
  {
    id: 'design-in-code',
    title: 'From Design to Code',
  },
  {
    id: 'testing',
    title: 'Testing',
  },
  {
    id: 'outcome',
    title: 'Outcome',
  },
  {
    id: 'reflection',
    title: 'Reflection',
  },
];

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

<CaseStudyNavigation />

      <main className="perdana-case-study-main">
        <div className="perdana-case-study-container">

          {/* =====================================================
              HERO
          ===================================================== */}

          <section id="hero"
          className="pcs-hero">

            <p className="pcs-eyebrow casestudy-ui">
              Perdana's Computer — Product Case Study
            </p>

            <h1 className="pcs-title casestudy-hero-title">
              Hello Im working on this case Study!
            </h1>

            <p className="pcs-lead casestudy-reading-large">
              A personal portfolio designed and developed as an
              interactive product — built to turn the familiar
              portfolio experience into something more memorable,
              exploratory, and human.
            </p>

<PlaceholderMedia
  src={perdanaComputerMain}
  alt="Perdana Computer main visual"
/>
          </section>


          {/* =====================================================
              00 — PRODUCT & PROBLEM
          ===================================================== */}

          <section id="product-problem" 
          className="pcs-section">

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
                <u>The work might be good, but the experience itself can
                become difficult to remember.</u>
              </p>


<p className="pcs-highlight-quote">
  <mark>
  <strong>  What if the portfolio itself was treated as a product
                that needed to solve a user problem?</strong></mark>
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
              01 — Role & Contribution
          ===================================================== */}

          <section id="role-contribution"
          className="pcs-section">
<SectionHeading
  number="01"
  title="Role & Contribution"
  subtitle="Responsible for the product from concept to implementation."
/>

<div className="pcs-copy-stack">

  <p className="pcs-body casestudy-reading">
    The project covered
    <span className="text-highlight">
    <strong>  product definition, UX, visual design, interaction design,
      development, testing, and iteration.</strong>
    </span>
  </p>

  <p className="pcs-body casestudy-reading">
    The work included <u>defining the problem and experience direction,
    developing the visual and interaction system, structuring content
    and navigation, and translating the design into a working
    interface using React, HTML, and CSS.</u>
  </p>

  <p className="pcs-body casestudy-reading">
    Initial research and alpha testing were also part of the process,
    using findings and user feedback to inform further iterations.
  </p>

  <p className="pcs-body casestudy-reading">
  <strong>  AI was used as a development assistance</strong> throughout implementation,
    while <strong>React95</strong> provided part of the interface
    foundation.
  </p>

</div>

<PlaceholderMedia
  src={perdanaComputerMain1}
  alt="Perdana Computer workflow design in code"
  caption="A closer look at the workflow, bringing together product thinking, visual design, and a code alltogether."
/>

          </section>


          {/* =====================================================
              02 — KEY DESIGN DECISIONS
          ===================================================== */}

          <section id="design-decisions"
          className="pcs-section">

            <SectionHeading
              number="02"
              title="Key Design Decisions"
              subtitle="Make the portfolio feel like something you explore, not something you simply scroll through."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                The problem statement led to one important design
                direction: <u>the portfolio should become part of the
                solution.</u>
              </p>



              <p className="pcs-highlight-quote">
  <mark>
  <strong> The challenge wasn't simply getting recruiters to spend more time on my portfolio. It was making the time they already spend more memorable and useful.</strong></mark>
</p>



            </div>

{/* =================================================
    RESEARCH
================================================= */}

<section id="research"
className="pcs-research">

  {/* HEADER */}

  <div className="pcs-research-intro">

    <div className="pcs-research-intro-top">

      <span className="pcs-research-kicker casestudy-mono">
        RESEARCH
      </span>

    </div>

    <h3 className="pcs-research-title casestudy-heading">
      What makes a portfolio worth exploring?
    </h3>

    <p className="pcs-research-intro-copy casestudy-reading">
     To test whether this direction had a reasonable foundation, 
     I looked at research around web interactivity, engagement, and 
     interactive storytelling. I wasn't trying to prove that 
     interaction automatically makes a portfolio better.
      I wanted to understand when interaction could 
     support the experience rather than become decoration.
    </p>

  </div>


  {/* RESEARCH SNAPSHOT */}

  <div className="pcs-research-metrics">

    <div className="pcs-research-metric">

      <strong className="pcs-research-metric-number">
        63
      </strong>

      <span className="pcs-research-metric-label casestudy-mono">
        STUDIES
      </span>

    </div>


    <div className="pcs-research-metric">

      <strong className="pcs-research-metric-number">
        13,484
      </strong>

      <span className="pcs-research-metric-label casestudy-mono">
        PARTICIPANTS
      </span>

    </div>


    <div className="pcs-research-metric">

      <strong className="pcs-research-metric-number">
        3
      </strong>

      <span className="pcs-research-metric-label casestudy-mono">
        RESEARCH DIRECTIONS
      </span>

    </div>

  </div>


  {/* KEY FINDINGS */}

  <div className="pcs-research-findings">

    <div className="pcs-research-section-label casestudy-mono">
      KEY FINDINGS
    </div>


    {/* FINDING 01 */}

    <article className="pcs-research-finding">

      <div className="pcs-research-finding-index casestudy-mono">
        01
      </div>

      <div className="pcs-research-finding-main">

        <div className="pcs-research-finding-meta">

          <span className="casestudy-mono">
            WEB INTERACTIVITY
          </span>

          <span className="pcs-research-finding-tag">
            ENJOYMENT
          </span>

        </div>

        <h4 className="casestudy-heading">
          Interaction can make digital experiences more engaging.
        </h4>

        <p className="casestudy-reading">
          A meta-analysis of 63 studies and 13,484 participants
          found that web interactivity was associated with greater
          enjoyment, more positive attitudes, and desirable
          behavioral intentions.
        </p>


        <div className="pcs-research-response">

          <span className="casestudy-mono">
            DESIGN RESPONSE
          </span>

          <strong className="casestudy-reading">
            <span className="text-highlight">
            Use interaction to support the experience —
            not compete with the work.</span>
          </strong>

        </div>

        <span className="pcs-research-source casestudy-mono">
          YANG & SHEN · COMMUNICATION RESEARCH · 2018
        </span>

      </div>

    </article>


    {/* FINDING 02 */}

    <article className="pcs-research-finding">

      <div className="pcs-research-finding-index casestudy-mono">
        02
      </div>

      <div className="pcs-research-finding-main">

        <div className="pcs-research-finding-meta">

          <span className="casestudy-mono">
            USER ENGAGEMENT
          </span>

          <span className="pcs-research-finding-tag">
            EXPLORATION
          </span>

        </div>

        <h4 className="casestudy-heading">
          Browsing can become part of the experience.
        </h4>

        <p className="casestudy-reading">
          A peer-reviewed study of 717 mobile-commerce users
          in Indonesia found a positive relationship between
          interactivity and the customer engagement behaviors
          examined in the study.
        </p>


        <div className="pcs-research-response">

          <span className="casestudy-mono">
            DESIGN RESPONSE
          </span>

          <strong className="casestudy-reading">
           <span className="text-highlight"> Let visitors open, navigate, discover, and choose
            what they want to explore.</span>
          </strong>

        </div>

        <span className="pcs-research-source casestudy-mono">
          UTAMI ET AL. · INTERNATIONAL JOURNAL OF MARKET RESEARCH · 2022
        </span>

      </div>

    </article>


    {/* FINDING 03 */}

    <article className="pcs-research-finding">

      <div className="pcs-research-finding-index casestudy-mono">
        03
      </div>

      <div className="pcs-research-finding-main">

        <div className="pcs-research-finding-meta">

          <span className="casestudy-mono">
            INTERACTIVE STORYTELLING
          </span>

          <span className="pcs-research-finding-tag">
            AGENCY
          </span>

        </div>

        <h4 className="casestudy-heading">
          The interface can become part of how the work is discovered.
        </h4>

        <p className="casestudy-reading">
          Research comparing interactive and non-interactive
          digital storytelling provides another reference for
          treating interaction as part of the content experience,
          rather than as an additional visual layer.
        </p>


        <div className="pcs-research-response">

          <span className="casestudy-mono">
            DESIGN RESPONSE
          </span>

          <strong className="casestudy-reading">
        <span className="text-highlight"> Make the interface part of the story,
            not just a layer around it.</span>
          </strong>

        </div>

        <span className="pcs-research-source casestudy-mono">
          HOANG ET AL. · FRONTIERS IN COMPUTER SCIENCE · 2026
        </span>

      </div>

    </article>

  </div>


  {/* RESEARCH → DESIGN */}

  <div className="pcs-research-translation">

    <div className="pcs-research-translation-header">

      <span className="casestudy-mono">
        FROM RESEARCH TO DESIGN
      </span>

      <span className="casestudy-mono">
        DECISION 01
      </span>

    </div>


    <div className="pcs-research-flow">

      <div className="pcs-research-flow-item">

        <span className="casestudy-mono">
          RESEARCH
        </span>

        <strong className="casestudy-heading">
          Interactivity
        </strong>

      </div>


      <div className="pcs-research-flow-arrow">
        →
      </div>


      <div className="pcs-research-flow-item">

        <span className="casestudy-mono">
          INSIGHT
        </span>

        <strong className="casestudy-heading">
          Browsing can become exploration
        </strong>

      </div>


      <div className="pcs-research-flow-arrow">
        →
      </div>


      <div className="pcs-research-flow-item pcs-research-flow-item-final">

        <span className="casestudy-mono">
          DESIGN OBJECTIVE
        </span>

        <strong className="casestudy-heading">
          Make the portfolio worth exploring
        </strong>

      </div>

    </div>

  </div>



  {/* DESIGN IMPLICATION */}

  <div className="pcs-research-conclusion">

    <span className="casestudy-mono">
      DESIGN IMPLICATION
    </span>

    <h4 className="casestudy-heading">
  <span className="text-highlight">Make the portfolio something people explore,
      not just something they scroll through.</span> 
    </h4>

    <p className="casestudy-reading">
      The research pointed toward a simple objective: <u>increase engagement through exploration while keeping
      the actual work easy to find and understand.</u>
    </p>

  </div>

  {/* SOURCES */}

  <div className="pcs-research-sources">

    <span className="casestudy-mono">
      SOURCES
    </span>

    <a
      href="https://doi.org/10.1177/0093650217700748"
      target="_blank"
      rel="noreferrer"
      className="casestudy-reading"
    >
      Yang & Shen — Effects of Web Interactivity: A Meta-Analysis ↗
    </a>

    <a
      href="https://doi.org/10.1177/14707853211027483"
      target="_blank"
      rel="noreferrer"
      className="casestudy-reading"
    >
      Utami et al. — The Role of Interactivity on Customer Engagement ↗
    </a>

    <a
      href="https://doi.org/10.3389/fcomp.2026.1843009"
      target="_blank"
      rel="noreferrer"
      className="casestudy-reading"
    >
      Hoang et al. — The Power of Agency: Interactivity in Data Storytelling ↗
    </a>

  </div>

</section>


            {/* ===================================================
                RETRO DESIGN DECISION
            =================================================== */}

            <DesignDecision
            >

                                <h3 className="pcs-research-title casestudy-heading">
      The retro visual direction is not only an aesthetic
                choice. It is a strategy for memorability.
    </h3>
                  <p className="pcs-body casestudy-reading">
                Instead of presenting the portfolio as a conventional
                website, I designed it around a familiar computing
                metaphor — a <b>Windows 95-inspired </b>environment where
                projects, information, and interactions can be
                discovered through an interface.
              </p>
              
  <PlaceholderMedia
  src={perdanaComputer}
  alt="Perdana Computer illustration"
/>


              <p className="casestudy-reading">
                When many portfolio websites use similar contemporary
                layouts, a recognizable visual metaphor can <span className="text-highlight">
                  help the experience stand apart</span> before the recruiter even
                reaches the individual project content.
              </p>

              <p className="casestudy-reading">
                The Windows 95-inspired language also creates an
                opportunity to<span className="text-highlight"> make interaction part of the story.</span>
               Windows, folders, menus, buttons, dialogs, and other
                interface elements become ways to explore the work
                rather than decoration placed on top of it.
              </p>
            </DesignDecision>

            <blockquote className="pcs-quote casestudy-reading-large">
              The portfolio is not only a container for the work.
              The portfolio itself is the first product I am asking
              the user to experience.
            </blockquote>



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

          </section>

          


          {/* =====================================================
              03 — DEVELOPMENT
          ===================================================== */}

          <section id="design-in-code"
          className="pcs-section">

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
             <span className="text-highlight">   AI became an additional development partner during
                implementation.</span> It helped accelerate exploration,
                debugging, and repetitive coding tasks, allowing me
                to spend more time on the visual and product decisions.
              </p>

              <p className="pcs-body casestudy-reading">
                The result is intentionally not presented as a
                finished artifact. It is a <strong>working product that can
                continue to change</strong> as I learn from people using it.
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

          <section id="testing" 
          className="pcs-section">

            <SectionHeading
              number="04"
              title="Testing"
              subtitle="This portfolio is currently an evolving product."
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body casestudy-reading">
                Before making the experience public, I am testing it
                with a limited group of users.
                And if you are reading this case study, there is a
                good chance that <strong>you are one of the testers.</strong>
              </p>

              <p className="pcs-body-strong casestudy-heading">
            <span className="text-highlight">   Tell me what works. Tell me what doesn't.
          </span>     </p>

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
      'mailto:perdanakurniawan25@gmail.com' +
      '?subject=Perdana%27s%20Computer%20Feedback' +
      '&body=Hi%20Perdana,%0A%0AHere%27s%20my%20feedback:';
  }}
>
  Send feedback ↗
</button>

            </div>


          </section>


          {/* =====================================================
              05 — OUTCOME
          ===================================================== */}

          <section id="outcome" 
          className="pcs-section">

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
                  the case study look complete
                  Instead, I am treating the portfolio itself as an
                  ongoing experiment.
                </p>

              </div>

            </div>


            <div className="pcs-future-card">

              <span className="pcs-future-label casestudy-mono">
                24 AUGUST 2026
              </span>

              <p className="casestudy-reading">
                If I update this case study later and I have landed a
                product design role through this portfolio, then that
                will be one meaningful signal that the product worked.

                If it did not, that is useful information too.
                The next question becomes:
                <strong>
                  {' '}
                  what should I improve?
                </strong>
              </p>

            </div>

          </section>


          {/* =====================================================
              REFLECTION
          ===================================================== */}

          <section id="reflection"
          className="pcs-section pcs-section-last">

            <SectionHeading
              title="Reflection : a portfolio that keeps evolving"
            />

            <div className="pcs-copy-stack">

              <p className="pcs-body-strong casestudy-heading">
                This project changed the way I think about portfolios.
              </p>

              <p className="pcs-body casestudy-reading">
                A portfolio does not have to be a static archive of
                previous work. <span className="text-highlight">It can be a product itself — something
                with a problem, users, a value proposition, an
                interface, interactions, testing, and continuous
                iteration.</span>
              </p>

              <p className="pcs-body casestudy-reading">
                I also see this project as a <b>bridge between my decade
                of experience in visual design and my growing practice
                in product design and development.</b>
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
  height: auto;

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
import React from 'react';

import CaseStudyNavbar from './CaseStudyNavbar';

import shipfasterHero from './shipfaster/shipfsater-hero.jpg';

import shipfaster1 from './shipfaster/shipfsater (1).png';
import shipfaster2 from './shipfaster/shipfsater (2).png';
import shipfaster3 from './shipfaster/shipfsater (3).png';
import shipfaster4 from './shipfaster/shipfsater (4).png';


/*
=========================================================
SHIPFASTER UI — ICONOGRAPHY DESIGN SYSTEM CASE STUDY
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


=========================================================
SUGGESTED ASSETS
=========================================================

shipfaster-hero.jpg

Shipfaster UI 2.7 thumbnail / product visual
shared as context at the beginning of the project.


shipfaster-direction.jpg

Trial exploration:
Option 01 / Option 02 / refinements / selected direction.


shipfaster-workflow.jpg

Original workflow visual showing batch production,
Figma review, feedback, revision, and next batch.


shipfaster-variants.jpg

One icon shown across:

Stroke Rounded
Stroke Sharp
Solid Rounded
Solid Sharp
Duotone Rounded
Duotone Sharp


shipfaster-sizes.jpg

Same icon(s) shown across:

24 × 24
20 × 20
16 × 16 Micro


shipfaster-figma.jpg

Actual Figma component set / variant properties /
naming / organization.


shipfaster-documentation.jpg

Grid / construction / usage documentation.


shipfaster-output.jpg

Final library overview / multiple completed batches /
large wall of icons.
*/


/* =========================================================
   DATA
========================================================= */

const roleContributions = [
  'Visual direction',
  'Production supervision',
  'Component & variant architecture',
  'Naming & library organization',
  'QA',
  'Client collaboration & handoff',
];


const systemDimensions = [
  {
    number: '800',
    label: 'BASE ICONS',
  },
  {
    number: '16',
    label: 'PRODUCTION BATCHES',
  },
  {
    number: '6',
    label: 'VARIANTS / ICON',
  },
  {
    number: '3',
    label: 'UI SIZES',
  },
];


const visualVariants = [
  {
    group: 'Stroke',
    variants: ['Rounded', 'Sharp'],
  },
  {
    group: 'Solid',
    variants: ['Rounded', 'Sharp'],
  },
  {
    group: 'Duotone',
    variants: ['Rounded', 'Sharp'],
  },
];


const iconSizes = [
  {
    size: '24 × 24',
    title: 'Default',
    text:
      'The primary UI size, preserving the intended construction and visual detail.',
  },
  {
    size: '20 × 20',
    title: 'Compact',
    text:
      'A reduced version designed to remain balanced in denser interface contexts.',
  },
  {
    size: '16 × 16',
    title: 'Micro',
    text:
      'A smaller variant with additional negative space to maintain clarity at UI scale.',
  },
];


const productionFlow = [
  {
    title: 'Produce',
  },
  {
    title: 'Review in Figma',
  },
  {

    title: 'Collect Feedback',
  },
  {
    title: 'Finalize',
  },
];


export default function ShipfasterUICaseStudy() {
  return (
    <div className="shipfaster-case-study casestudy-window">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <CaseStudyNavbar
        current="Shipfaster UI"
        sections={[
          { id: 'hero', label: 'Overview' },
          { id: 'problem', label: 'Product & Problem' },
          { id: 'role', label: 'Role & Contribution' },
          { id: 'decisions', label: 'Design Decisions' },
          { id: 'output', label: 'Output' },
          { id: 'reflection', label: 'Reflection' },
        ]}
      />


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="casestudy">

        <div className="casestudy-container">


          {/* =====================================================
              HERO
          ===================================================== */}

          <section
            className="cs-hero"
            id="hero"
          >

            <p className="cs-eyebrow casestudy-ui">
              Shipfaster UI — Iconography Design System
            </p>


            <h1 className="cs-title casestudy-hero-title">
              Building an Icon Design System for Shipfaster UI
            </h1>


            <p className="cs-lead casestudy-reading-large">
              What started as 800 base icons became a system of
              styles, sizes, components, and variants — built to
              stay consistent at scale and ready for use in Figma.
            </p>


<Figure
  src={shipfasterHero}
  alt="Shipfaster UI 2.7 product context"
  caption="Shipfaster UI 2.7, shared as product context at the start of the project."
/>

          </section>



          {/* =====================================================
              00 — PRODUCT & PROBLEM
          ===================================================== */}

          <section
            className="cs-section"
            id="problem"
          >

            <SectionHeading
              number="00"
              title="Product & Problem"
              subtitle="At this scale, the challenge was no longer just drawing icons — it was defining enough structure for the entire library to behave like one system."
            />


            <div className="cs-copy-stack">

              <p className="cs-body casestudy-reading">
                <strong>Shipfaster UI</strong> is a <u>Figma UI Kit and
                design system</u> built around reusable components,
                variants, and assets for designing digital products
                more efficiently.
              </p>


              <p className="cs-body casestudy-reading">
                The team commissioned a custom icon library for the
                system:
                <strong> 800 base icons</strong>, multiple visual
                treatments, three interface sizes, and a Figma setup based on reusable
                components and variants.
              </p>


              <p className="cs-body casestudy-reading">
                Their initial plan was to introduce completed icon
                categories into the Shipfaster UI design system
                progressively, beginning with several core UI
                categories as part of a planned beta update.
              </p>


<p className="cs-body casestudy-reading">
  At this scale, the challenge moved beyond producing
  consistent visuals.{' '}
  <span className="text-highlight">
    <strong>The library needed rules for visual treatment, corner style,
    sizing, naming, organization, and handoff so hundreds of icons
    could remain coherent as the system expanded.</strong>
  </span>
</p>

            </div>



            {/* =================================================
                SCALE EQUATION
            ================================================= */}

            <div className="sf-system-equation">

              <SystemEquationItem
                value="800"
                label="BASE ICONS"
              />

              <span className="sf-equation-symbol casestudy-heading">
                ×
              </span>

              <SystemEquationItem
                value="6"
                label="VARIANTS"
              />

              <span className="sf-equation-symbol casestudy-heading">
                ×
              </span>

              <SystemEquationItem
                value="3"
                label="SIZES"
              />

              <span className="sf-equation-symbol casestudy-heading">
                =
              </span>

              <SystemEquationItem
                value="14,400"
                label="CONFIGURATIONS"
                highlight
              />

            </div>



            {/* =================================================
                PROBLEM STATEMENT
            ================================================= */}

            <div className="cs-problem-card">

              <span className="cs-problem-label casestudy-ui">
                THE DESIGN CHALLENGE
              </span>

              <p className="cs-problem-text casestudy-heading">
                How do you turn 800 individual icons into a reusable
                system that remains coherent across up to 14,400
                style-and-size configurations?
              </p>

            </div>
          </section>



          {/* =====================================================
              01 — ROLE & CONTRIBUTION
          ===================================================== */}

          <section
            className="cs-section"
            id="role"
          >

            <SectionHeading
              number="01"
              title="Role & Contribution"
              subtitle="Leading visual direction, production, and final systemization."
            />


            <ul className="cs-list sf-role-list">

              {roleContributions.map((item) => (

                <li
                  className="casestudy-ui-reading"
                  key={item}
                >
                  {item}
                </li>

              ))}

            </ul>


            <div className="cs-copy-stack">

              <p className="cs-body casestudy-reading">
                I led the iconography work from
               <span className="text-highlight"><strong> visual direction through final Figma
                handoff.</strong>{' '}</span>
                I established the base design and construction
                references, then supervised a designer on my team
                who helped scale production across the library.
              </p>


              <p className="cs-body casestudy-reading">
                My primary responsibility was keeping that production
                usable as a system:
                <u> reviewing consistency, resolving visual
                exceptions, defining naming, organizing assets,
                building Figma components and variants, running QA, and managing communication
                with the Shipfaster UI team.</u>
              </p>

            </div>



            {/* =================================================
                DESIGN DIRECTION
            ================================================= */}

            <div className="sf-role-subsection">

              <span className="sf-subsection-kicker casestudy-mono-muted">
                ESTABLISHING THE DIRECTION
              </span>


              <h3 className="sf-subsection-title casestudy-heading">
                The system started with a trial, not with 800 finished
                icons.
              </h3>


              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  Before scaling production,<strong> we developed multiple
                  initial directions for a small trial set</strong>. The
                  reference icons provided by the client were used
                  to understand expected structure and component
                  behavior, but the final visual language needed to
                  be developed specifically for Shipfaster UI.
                </p>


                <p className="cs-body casestudy-reading">
                  Early feedback helped establish the working rules:
                  a 1.5px stroke for outline icons,
                  cleaner negative space for filled versions,
                  smoother corner treatment, and enough visual detail
                  to stay recognizable without becoming overly complex.
                </p>


                <p className="cs-body casestudy-reading">
              <span className="text-highlight"><strong>Once the direction was aligned with the client and
                  their team, those decisions became the reference
                  for scaling the rest of the library.</strong></span>
                </p>

              </div>


<Figure
  src={shipfaster2}
  alt="first icon system draft"
/>

            </div>



            {/* =================================================
                PRODUCTION WORKFLOW
            ================================================= */}

            <div className="sf-role-subsection">

              <span className="sf-subsection-kicker casestudy-mono-muted">
                SCALING THE PRODUCTION
              </span>


              <h3 className="sf-subsection-title casestudy-heading">
                Break the library into reviewable batches before
                scaling further.
              </h3>


              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  Producing hundreds of icons at once would have made
                  feedback difficult to track. <span className="text-highlight"><strong>I proposed a batch-based
                  workflow</strong></span> with approximately
                  50 icons per milestone, working
                  directly in the shared Figma file so the client
                  could review progress continuously.
                </p>


                <p className="cs-body casestudy-reading">
                  Feedback and revisions were grouped around each
                  batch before moving deeper into new production.
                  The approach helped keep visual decisions,
                  revisions, and handoff manageable as the project
                  scaled.
                </p>

              </div>


              <div className="sf-production-flow">

                {productionFlow.map((item, index) => (
                  <React.Fragment key={item.number}>

                    <WorkflowStep
                      number={item.number}
                      title={item.title}
                      text={item.text}
                    />

                    {index < productionFlow.length - 1 && (
                      <WorkflowArrow />
                    )}

                  </React.Fragment>
                ))}

              </div>

<Figure
  src={shipfaster3}
  alt="shipfsater working process, a feedback from client"
/>

            </div>

          </section>



          {/* =====================================================
              02 — KEY DESIGN DECISIONS
          ===================================================== */}

          <section
            className="cs-section"
            id="decisions"
          >

            <SectionHeading
              number="02"
              title="Key Design Decisions"
              subtitle="Build the rules first, so hundreds of icons could scale without becoming hundreds of exceptions."
            />



            {/* =================================================
                DECISION 01 — VARIANT ARCHITECTURE
            ================================================= */}

            <DesignDecision
              number="01"
              label="VARIANT ARCHITECTURE"
              title="Separate visual style from corner treatment."
            >

              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  The initial brief described outline, filled,
                  duotone, and sharp as four styles. During
                  implementation, <span className="text-highlight"><strong>I reorganized that requirement
                  into a more reusable structure.</strong></span>
                </p>


                <p className="cs-body casestudy-reading">
                  <strong>Stroke, Solid, and Duotone</strong> became
                  the base visual treatments, while
                  <strong> Rounded and Sharp</strong> became a second
                  dimension of variation.
                </p>


                <p className="cs-body casestudy-reading">
                  This made the system easier to structure as
                  predictable properties instead of treating all
                  six outputs as unrelated styles.
                </p>

              </div>



              {/* ===============================================
                  VARIANT CARDS
              =============================================== */}

              <div className="sf-variant-system">

                {visualVariants.map((item) => (

                  <article
                    className="sf-variant-group"
                    key={item.group}
                  >

                    <span className="sf-variant-label casestudy-mono-muted">
                      BASE STYLE
                    </span>


                    <h4 className="sf-variant-title casestudy-heading">
                      {item.group}
                    </h4>


                    <div className="sf-variant-options">

                      {item.variants.map((variant) => (

                        <span
                          className="sf-variant-option casestudy-ui-reading"
                          key={variant}
                        >
                          {variant}
                        </span>

                      ))}

                    </div>

                  </article>

                ))}

              </div>



              <div className="sf-design-response">

                <span className="sf-design-response-label casestudy-mono-muted">
                  SYSTEM LOGIC
                </span>

                <strong className="casestudy-heading">
                  3 visual treatments × 2 corner treatments
                  = 6 reusable variants
                </strong>

              </div>

            </DesignDecision>



            {/* =================================================
                DECISION 02 — ICON SIZE
            ================================================= */}

            <DesignDecision
              number="02"
              label="ICON SIZING"
              title="Treat size as a design property, not an export setting."
            >

              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  Every icon was delivered in
                  <strong> 24×24, 20×20, and 16×16 versions.</strong>
                  The smallest size had an additional requirement:
                  more negative space so the icon remained clear in
                  compact UI contexts.
                </p>


                <p className="cs-body casestudy-reading">
                  The 16×16 micro version therefore could not always
                  be treated as a direct scale-down of the larger
                  icon. Where necessary, <span className="text-highlight"><strong>visual density was reduced
                  to maintain clarity at UI scale.</strong></span>
                </p>


                <p className="cs-body casestudy-reading">
                  This made size another design-system property
                  rather than simply an export setting.
                </p>

              </div>



              <div className="sf-size-grid">

                {iconSizes.map((item) => (

                  <article
                    className="sf-size-card"
                    key={item.size}
                  >

                    <span className="sf-size-value casestudy-heading">
                      {item.size}
                    </span>


                    <h4 className="sf-size-title casestudy-heading">
                      {item.title}
                    </h4>


                    <p className="cs-body casestudy-reading">
                      {item.text}
                    </p>

                  </article>

                ))}

              </div>



<Figure
  src={shipfaster4}
  alt="icon sizing and style"
  size="medium"
/>

            </DesignDecision>



            {/* =================================================
                DECISION 03 — FIGMA SYSTEM
            ================================================= */}

            <DesignDecision
              number="03"
              label="FIGMA SYSTEM"
              title="Designing the icon was only half the job."
            >

              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  In many previous icon projects, delivery ended
                  with finished SVGs or source files. Shipfaster
                  required the assets to keep working after handoff.
                </p>


                <p className="cs-body casestudy-reading">
                  The client specifically needed strokes and corners
                  to remain editable in Figma, with each icon
                  structured as reusable components and variants
                  across its available styles and sizes.
                </p>


                <p className="cs-body casestudy-reading">
                  That meant <span className="text-highlight"><strong>organizing naming and categories,
                  structuring components, reviewing consistency, and preparing the
                  collaboration file </strong></span>so another designer could
                  continue using the library without rebuilding it.
                </p>

              </div>



              <div className="sf-workflow">

                <WorkflowStep
                  number="01"
                  title="Draw"
                  text="Create and review the visual asset."
                />

                <WorkflowArrow />

                <WorkflowStep
                  number="02"
                  title="Systemize"
                  text="Apply visual, size, naming, and construction rules."
                />

                <WorkflowArrow />

                <WorkflowStep
                  number="03"
                  title="Componentize"
                  text="Build reusable Figma components and variants."
                />

                <WorkflowArrow />

                <WorkflowStep
                  number="04"
                  title="Handoff"
                  text="Organize, QA, and prepare the library for the Shipfaster UI team."
                />

              </div>



              <blockquote className="cs-quote casestudy-reading-large">
                The final deliverable wasn't only 800 drawings.
                It was a reusable system.
              </blockquote>
            </DesignDecision>

          </section>



          {/* =====================================================
              03 — OUTPUT
          ===================================================== */}

          <section
            className="cs-section"
            id="output"
          >

            <SectionHeading
              number="03"
              title="Output"
              subtitle="A completed icon system delivered to the Shipfaster UI team for integration into their design system."
            />


            <div className="sf-output-grid">

              {systemDimensions.map((item) => (

                <article
                  className="sf-output-stat"
                  key={item.label}
                >

                  <strong className="sf-output-number casestudy-heading">
                    {item.number}
                  </strong>


                  <span className="sf-output-label casestudy-mono-muted">
                    {item.label}
                  </span>

                </article>

              ))}

            </div>


            <div className="cs-copy-stack">

              <p className="cs-body casestudy-reading">
                The project was completed across
                <strong> 16 production batches</strong>, covering
                all <strong>800 base icons</strong> in the agreed
                scope.
              </p>


              <p className="cs-body casestudy-reading">
                Each icon was structured across six visual variants
                and three interface sizes, supporting up to
                <strong> 14,400 style-and-size configurations</strong>
                across the completed library.
              </p>


              <p className="cs-body casestudy-reading">
           <span className="text-highlight"><strong>The final Figma library, component
                structures, and supporting assets were handed off
                to the Shipfaster UI team.</strong></span>
              </p>


              <p className="cs-body casestudy-reading">
                <u>The project had been commissioned for their design
                system, with an initial plan to introduce completed
                categories into a beta release.</u> My involvement ended
                at final delivery, so I do not have visibility into
                how much of the complete library was ultimately
                integrated into the released product.
              </p>

            </div>



<Figure
  src={shipfaster1}
  alt="Shipfaster UI 2.7 product context"
/>


          </section>



          {/* =====================================================
              04 — REFLECTION
          ===================================================== */}

          <section
            className="cs-section cs-section-last"
            id="reflection"
          >

            <SectionHeading
              number="04"
              title="From Designing the Asset to Designing the System Around It"
            />


            <div className="cs-copy-stack">

              <p className="cs-body-strong casestudy-heading">
                Before this project, I thought of an icon set mainly
                as a collection of finished visual assets.
              </p>


              <p className="cs-body casestudy-reading">
                Shipfaster changed what “finished” meant. At this
                scale, the work was not complete when every icon
                looked right.
              </p>


              <p className="cs-body casestudy-reading">
                It was complete when the library had enough structure
                — variants, sizing, naming, components, QA, and a repeatable production process — for someone
                else to pick it up and continue working with it.
              </p>


              <p className="cs-body casestudy-reading">
                That shift — <span className="text-highlight"><strong>from designing the asset to designing
                the system around the asset — became one of the ideas
                I carried forward into the way I now think about
                digital products.</strong></span>
              </p>

            </div>



            <div className="sf-reflection-flow">

              {/* BEFORE */}

              <div className="sf-reflection-side">

                <span className="sf-reflection-label casestudy-mono-muted">
                  BEFORE
                </span>

                <strong className="casestudy-heading">
                  Design
                </strong>

                <span className="sf-reflection-direction casestudy-mono-muted">
                  ↓
                </span>

                <strong className="casestudy-heading">
                  Export
                </strong>

                <span className="sf-reflection-direction casestudy-mono-muted">
                  ↓
                </span>

                <strong className="casestudy-heading">
                  Deliver
                </strong>

              </div>


              <span className="sf-reflection-arrow casestudy-heading">
                →
              </span>



              {/* AFTER */}

              <div className="sf-reflection-side sf-reflection-side-final">

                <span className="sf-reflection-label casestudy-mono">
                  AFTER
                </span>

                <strong className="casestudy-heading">
                  Design
                </strong>

                <span className="sf-reflection-direction casestudy-mono">
                  ↓
                </span>

                <strong className="casestudy-heading">
                  Define Rules
                </strong>

                <span className="sf-reflection-direction casestudy-mono">
                  ↓
                </span>

                <strong className="casestudy-heading">
                  Build Variants
                </strong>

                <span className="sf-reflection-direction casestudy-mono">
                  ↓
                </span>

                <strong className="casestudy-heading">
                  Componentize
                </strong>

                <span className="sf-reflection-direction casestudy-mono">
                  ↓
                </span>

                <strong className="casestudy-heading">
                  QA
                </strong>

                <span className="sf-reflection-direction casestudy-mono">
                  ↓
                </span>

                <strong className="casestudy-heading">
                  Handoff
                </strong>

              </div>

            </div>



            <dl className="cs-snapshot">

              <Meta label="Role">
                Iconography Design Lead
              </Meta>

              <Meta label="Timeline">
                Jun 2024 – Aug 2024
              </Meta>

              <Meta label="Scope">
                800 Icons · 16 Batches
              </Meta>

              <Meta label="Focus">
                Iconography · Components · Variants · Design Systems
              </Meta>

            </dl>

          </section>

        </div>

      </main>



      {/* =========================================================
          COMPONENT STYLES
      ========================================================= */}

      <style>{`

        /*
        =========================================================
        SHIPFASTER UI — LOCAL CASE STUDY STYLES
        =========================================================

        Typography comes from the global Case Study system.

        This stylesheet only controls:
        - layout
        - spacing
        - surfaces
        - borders
        - color overrides
        - responsive behavior
        =========================================================
        */


        /* =========================================================
           COLOR TOKENS
        ========================================================= */

        .shipfaster-case-study {

          --sf-bg: #ffffff;
          --sf-bg-alt: #fafbff;
          --sf-bg-accent: #6366F1;

          --sf-ink: #0a0a0a;
          --sf-body: #343432;

          --sf-muted: #666663;
          --sf-faint: #8f8f8b;

          --sf-line: #C6D1FE;
          --sf-line-soft: #C6D1FE;

          width: 100%;
          min-height: 520px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background:
            var(--sf-bg);

          color:
            var(--sf-ink);

          box-sizing:
            border-box;

          text-align:
            left;
        }


        .shipfaster-case-study *,
        .shipfaster-case-study *::before,
        .shipfaster-case-study *::after {
          box-sizing:
            border-box;
        }


        .shipfaster-case-study p,
        .shipfaster-case-study blockquote,
        .shipfaster-case-study ul,
        .shipfaster-case-study dl,
        .shipfaster-case-study figure {
          margin:
            0;
        }

        /* =========================================================
           IMAGE FIGURE
        ========================================================= */
.shipfaster-case-study .sf-figure {
  width: 100%;
  margin-top: 38px;
}


.shipfaster-case-study .sf-figure-image {
  display: block;

  width: 100%;
  height: auto;

  border: 0;

  background: transparent;
}


.shipfaster-case-study .sf-figure-caption {
  display: block;

  margin-top: 10px;

  color:
    var(--sf-faint);
}



/* Full — default */
.shipfaster-case-study .sf-figure-full {
  width: 100%;
}


/* Medium */
.shipfaster-case-study .sf-figure-medium {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}


/* Small — cocok untuk vertical image */
.shipfaster-case-study .sf-figure-small {
  width: 45%;
  margin-left: auto;
  margin-right: auto;
}


/* Extra small */
.shipfaster-case-study .sf-figure-xsmall {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}
/* =========================================================
   TEXT HIGHLIGHT
========================================================= */

.shipfaster-case-study .text-highlight {
  background: linear-gradient(
    to bottom,
    transparent 20%,
    #fff27a 20%,
    #fff27a 90%,
    transparent 90%
  );

  padding: 0 3px;

  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
        /* =========================================================
           GLOBAL TYPOGRAPHY COLOR OVERRIDES
        ========================================================= */

        .shipfaster-case-study .casestudy {
          color:
            var(--sf-body);
        }


        .shipfaster-case-study .casestudy-reading,
        .shipfaster-case-study .casestudy-reading-large {
          color:
            var(--sf-body);
        }


        .shipfaster-case-study .casestudy-heading,
        .shipfaster-case-study .casestudy-hero-title {
          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .casestudy-ui,
        .shipfaster-case-study .casestudy-ui-reading {
          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .casestudy-mono {
          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .casestudy-mono-muted {
          color:
            var(--sf-faint);
        }


        .shipfaster-case-study strong {
          color:
            var(--sf-ink);
        }



        /* =========================================================
           MAIN
        ========================================================= */

        .shipfaster-case-study .casestudy {

          flex: 1;
          min-height: 0;

          overflow-y: auto;
          overflow-x: hidden;

          background:
            var(--sf-bg);

          text-align:
            left;
        }


        .shipfaster-case-study .casestudy-container {

          width:
            min(55%, calc(100% - 64px));

          min-width:
            320px;

          margin:
            0 auto;

          padding:
            40px 0 50px;

          text-align:
            left;
        }



        /* =========================================================
           HERO
        ========================================================= */

        .shipfaster-case-study .cs-hero {
          text-align:
            left;
        }


        .shipfaster-case-study .cs-eyebrow {

          display:
            flex;

          align-items:
            center;

          margin-bottom:
            18px !important;

          color:
            var(--sf-muted);
        }


        .shipfaster-case-study .cs-title {

          max-width:
            900px;

          margin:
            0 0 22px !important;

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .cs-lead {

          max-width:
            820px;

          margin:
            0 0 40px !important;

          color:
            var(--sf-body);
        }



        /* =========================================================
           SECTIONS
        ========================================================= */

        .shipfaster-case-study .cs-section {

          padding:
            58px 0;

          border-bottom:
            1px solid var(--sf-line-soft);
        }


        .shipfaster-case-study .cs-section-last {
          border-bottom:
            0;
        }


        .shipfaster-case-study .cs-section-heading {

          margin-bottom:
            30px;
        }


        .shipfaster-case-study .cs-section-number {

          display:
            block;

          margin-bottom:
            10px;
        }


        .shipfaster-case-study .cs-section-title {

          margin:
            0;

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .cs-section-subtitle {

          max-width:
            760px;

          margin-top:
            12px !important;

          color:
            var(--sf-muted);
        }



        /* =========================================================
           COPY
        ========================================================= */

        .shipfaster-case-study .cs-copy-stack {

          display:
            flex;

          flex-direction:
            column;

          gap:
            18px;

          max-width:
            780px;
        }


        .shipfaster-case-study .cs-body {

          color:
            var(--sf-body);
        }


        .shipfaster-case-study .cs-body strong {

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .cs-body-strong {

          color:
            var(--sf-ink);
        }



        /* =========================================================
           CONTRIBUTION LIST
        ========================================================= */

        .shipfaster-case-study .cs-list {

          display:
            grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap:
            1px;

          padding:
            1px;

          margin:
            0 0 34px !important;

          list-style:
            none;

          background:
            var(--sf-line);
        }


        .shipfaster-case-study .cs-list li {

          display:
            flex;

          align-items:
            center;

          min-height:
            62px;

          padding:
            14px 16px;

          background:
            var(--sf-bg);

          color:
            var(--sf-ink);
        }



        /* =========================================================
           ROLE SUBSECTIONS
        ========================================================= */

        .shipfaster-case-study .sf-role-subsection {

          margin-top:
            52px;

          padding-top:
            42px;

          border-top:
            1px solid var(--sf-line-soft);
        }


        .shipfaster-case-study .sf-subsection-kicker {

          display:
            block;

          margin-bottom:
            12px;
        }


        .shipfaster-case-study .sf-subsection-title {

          max-width:
            780px;

          margin:
            0 0 24px;

          color:
            var(--sf-ink);
        }



        /* =========================================================
           MEDIA PLACEHOLDER
        ========================================================= */

        .shipfaster-case-study .sf-media-placeholder {

          width:
            100%;

          aspect-ratio:
            var(--sf-placeholder-ratio);

          min-height:
            260px;

          margin-top:
            38px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            32px;

          border:
            1px dashed #c8c8c3;

          background:
            var(--sf-bg-alt);
        }


        .shipfaster-case-study
        .sf-media-placeholder-content {

          width:
            min(100%, 520px);

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          gap:
            9px;

          text-align:
            center;
        }


        .shipfaster-case-study
        .sf-media-placeholder-label {

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study
        .sf-media-placeholder-asset {

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study
        .sf-media-placeholder-note {

          max-width:
            460px;

          color:
            var(--sf-muted);
        }



        /* =========================================================
           PROBLEM
        ========================================================= */

        .shipfaster-case-study .cs-problem-card {

          margin-top:
            36px;

          padding:
            26px;

          border:
            1px solid var(--sf-line);

          background:
            var(--sf-bg-alt);
        }


        .shipfaster-case-study .cs-problem-label {

          display:
            block;

          margin-bottom:
            12px;

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study .cs-problem-text {

          max-width:
            760px;

          margin:
            0;

          color:
            var(--sf-ink);
        }



        /* =========================================================
           SYSTEM EQUATION
        ========================================================= */

        .shipfaster-case-study .sf-system-equation {

          display:
            grid;

          grid-template-columns:
            1fr auto 1fr auto 1fr auto 1.3fr;

          align-items:
            stretch;

          gap:
            12px;

          margin-top:
            36px;
        }


        .shipfaster-case-study .sf-equation-item {

          display:
            flex;

          flex-direction:
            column;

          justify-content:
            center;

          min-height:
            112px;

          padding:
            18px;

          border:
            1px solid var(--sf-line);

          background:
            var(--sf-bg);
        }


        .shipfaster-case-study
        .sf-equation-item-highlight {

          background:
            var(--sf-bg);

          border-color:
            var(--sf-line);
        }


        .shipfaster-case-study .sf-equation-value {

          display:
            block;

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study
        .sf-equation-item-highlight
        .sf-equation-value {

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .sf-equation-label {

          display:
            block;

          margin-top:
            8px;

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study
        .sf-equation-item-highlight
        .sf-equation-label {

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study .sf-equation-symbol {

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            var(--sf-faint);
        }



        /* =========================================================
           PRODUCTION FLOW
        ========================================================= */

        .shipfaster-case-study .sf-production-flow {

          display:
            grid;

          grid-template-columns:
            1fr auto 1fr auto 1fr auto 1fr;

          align-items:
            stretch;

          gap:
            10px;

          margin-top:
            34px;
        }



        /* =========================================================
           DESIGN DECISION
        ========================================================= */

        .shipfaster-case-study .sf-design-decision {

          padding:
            48px 0;

          border-top:
            1px solid var(--sf-line-soft);
        }


        .shipfaster-case-study
        .sf-design-decision:first-of-type {

          margin-top:
            8px;
        }


        .shipfaster-case-study .sf-decision-meta {

          display:
            flex;

          justify-content:
            space-between;

          align-items:
            center;

          gap:
            16px;

          margin-bottom:
            16px;

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study .sf-decision-title {

          max-width:
            820px;

          margin:
            0 0 26px;

          color:
            var(--sf-ink);
        }



        /* =========================================================
           VARIANT SYSTEM
        ========================================================= */

        .shipfaster-case-study .sf-variant-system {

          display:
            grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap:
            1px;

          padding:
            1px;

          margin-top:
            34px;

          background:
            var(--sf-line);
        }


        .shipfaster-case-study .sf-variant-group {

          min-height:
            180px;

          padding:
            22px;

          background:
            var(--sf-bg-alt);
        }


        .shipfaster-case-study .sf-variant-label {

          display:
            block;

          margin-bottom:
            10px;

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study .sf-variant-title {

          margin:
            0;

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .sf-variant-options {

          display:
            flex;

          flex-wrap:
            wrap;

          gap:
            8px;

          margin-top:
            24px;
        }


        .shipfaster-case-study .sf-variant-option {

          padding:
            7px 10px;

          border:
            1px solid var(--sf-line);

          background:
            var(--sf-bg);

          color:
            var(--sf-body);
        }



        /* =========================================================
           DESIGN RESPONSE
        ========================================================= */

        .shipfaster-case-study .sf-design-response {

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            20px;

          margin-top:
            18px;

          padding:
            20px 22px;

          border:
            1px solid var(--sf-line);

          background:
            var(--sf-bg);
        }


        .shipfaster-case-study
        .sf-design-response-label {

          flex:
            0 0 auto;

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study
        .sf-design-response strong {

          color:
            var(--sf-ink);

          text-align:
            right;
        }



        /* =========================================================
           SIZE SYSTEM
        ========================================================= */

        .shipfaster-case-study .sf-size-grid {

          display:
            grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap:
            1px;

          padding:
            1px;

          margin-top:
            34px;

          background:
            var(--sf-line);
        }


        .shipfaster-case-study .sf-size-card {

          padding:
            24px;

          background:
            var(--sf-bg);
        }


        .shipfaster-case-study .sf-size-value {

          display:
            block;

          margin-bottom:
            22px;

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .sf-size-title {

          margin:
            0 0 10px;

          color:
            var(--sf-ink);
        }



        /* =========================================================
           WORKFLOW
        ========================================================= */

        .shipfaster-case-study .sf-workflow {

          display:
            grid;

          grid-template-columns:
            1fr auto 1fr auto 1fr auto 1fr;

          align-items:
            stretch;

          gap:
            10px;

          margin-top:
            34px;
        }


        .shipfaster-case-study .sf-workflow-step {

          min-height:
            150px;

          padding:
            20px;

          border:
            1px solid var(--sf-line);

          background:
            var(--sf-bg-alt);
        }


        .shipfaster-case-study .sf-workflow-number {

          display:
            block;

          margin-bottom:
            24px;

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study .sf-workflow-step strong {

          display:
            block;

          margin-bottom:
            8px;

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .sf-workflow-step p {

          margin:
            0;

          color:
            var(--sf-muted);
        }


        .shipfaster-case-study .sf-workflow-arrow {

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          color:
            var(--sf-faint);
        }



        /* =========================================================
           QUOTE
        ========================================================= */

        .shipfaster-case-study .cs-quote {

          max-width:
            880px;

          margin:
            42px 0 0 !important;

          padding:
            26px 0 26px 24px;

          border-left:
            2px solid var(--sf-ink);

          color:
            var(--sf-ink);
        }



        /* =========================================================
           OUTPUT
        ========================================================= */

        .shipfaster-case-study .sf-output-grid {

          display:
            grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap:
            1px;

          padding:
            1px;

          margin-bottom:
            36px;

          background:
            var(--sf-line);
        }


        .shipfaster-case-study .sf-output-stat {

          min-height:
            150px;

          padding:
            22px;

          display:
            flex;

          flex-direction:
            column;

          justify-content:
            space-between;

          background:
            var(--sf-bg-alt);
        }


        .shipfaster-case-study .sf-output-number {

          display:
            block;

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study .sf-output-label {

          display:
            block;

          color:
            var(--sf-faint);
        }



        /* =========================================================
           META / SNAPSHOT
        ========================================================= */

        .shipfaster-case-study .cs-meta,
        .shipfaster-case-study .cs-snapshot {

          display:
            grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap:
            28px;

          padding:
            28px 0 0;

          margin:
            0 !important;
        }


        .shipfaster-case-study .cs-snapshot {

          margin-top:
            44px !important;

          border-top:
            1px solid var(--sf-line);
        }


        .shipfaster-case-study .cs-meta-item {

          min-width:
            0;
        }


        .shipfaster-case-study .cs-meta-label {

          display:
            block;

          margin-bottom:
            8px;

          color:
            var(--sf-faint);

          text-transform:
            uppercase;
        }


        .shipfaster-case-study .cs-meta-value {

          display:
            block;

          margin:
            0;

          color:
            var(--sf-ink);
        }



        /* =========================================================
           REFLECTION
        ========================================================= */

        .shipfaster-case-study .sf-reflection-flow {

          display:
            grid;

          grid-template-columns:
            1fr auto 1.5fr;

          gap:
            22px;

          align-items:
            center;

          margin-top:
            40px;
        }


        .shipfaster-case-study .sf-reflection-side {

          min-height:
            auto;

          padding:
            26px;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          gap:
            11px;

          border:
            1px solid var(--sf-line);

          background:
            #ffffff;

          text-align:
            center;
        }


        .shipfaster-case-study
        .sf-reflection-side-final {

          background:
            var(--sf-bg-alt);

          border-color:
            var(--sf-line);
        }


        .shipfaster-case-study
        .sf-reflection-label {

          margin-bottom:
            16px;

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study
        .sf-reflection-side strong {

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study
        .sf-reflection-direction {

          color:
            var(--sf-faint);
        }


        .shipfaster-case-study
        .sf-reflection-side-final
        strong {

          color:
            var(--sf-ink);
        }


        .shipfaster-case-study
        .sf-reflection-side-final
        .sf-reflection-label {

          color:
            #a2a29d;
        }


        .shipfaster-case-study
        .sf-reflection-side-final
        .sf-reflection-direction {

          color:
            #8c8c88;
        }


        .shipfaster-case-study .sf-reflection-arrow {

          color:
            var(--sf-faint);
        }



        /* =========================================================
           RESPONSIVE — TABLET
        ========================================================= */

        @media (max-width: 1100px) {

          .shipfaster-case-study
          .casestudy-container {

            width:
              min(70%, calc(100% - 56px));
          }


          .shipfaster-case-study
          .sf-system-equation {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .shipfaster-case-study
          .sf-equation-symbol {

            display:
              none;
          }


          .shipfaster-case-study
          .sf-workflow,
          .shipfaster-case-study
          .sf-production-flow {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .shipfaster-case-study
          .sf-workflow-arrow {

            display:
              none;
          }

        }



        /* =========================================================
           RESPONSIVE — MOBILE
        ========================================================= */

        @media (max-width: 760px) {

          .shipfaster-case-study
          .casestudy-container {

            width:
              calc(100% - 32px);

            min-width:
              0;

            padding:
              28px 0 40px;
          }


          .shipfaster-case-study
          .cs-section {

            padding:
              48px 0;
          }


          .shipfaster-case-study
          .cs-meta,
          .shipfaster-case-study
          .cs-snapshot {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .shipfaster-case-study
          .cs-list {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .shipfaster-case-study
          .sf-variant-system,
          .shipfaster-case-study
          .sf-size-grid {

            grid-template-columns:
              1fr;
          }


          .shipfaster-case-study
          .sf-output-grid {

            grid-template-columns:
              repeat(2, 1fr);
          }


          .shipfaster-case-study
          .sf-reflection-flow {

            grid-template-columns:
              1fr;
          }


          .shipfaster-case-study
          .sf-reflection-arrow {

            transform:
              rotate(90deg);

            text-align:
              center;
          }


          .shipfaster-case-study
          .sf-design-response {

            flex-direction:
              column;

            align-items:
              flex-start;
          }


          .shipfaster-case-study
          .sf-design-response strong {

            text-align:
              left;
          }

        }



        /* =========================================================
           RESPONSIVE — SMALL MOBILE
        ========================================================= */

        @media (max-width: 520px) {

          .shipfaster-case-study
          .cs-meta,
          .shipfaster-case-study
          .cs-snapshot,
          .shipfaster-case-study
          .cs-list,
          .shipfaster-case-study
          .sf-output-grid,
          .shipfaster-case-study
          .sf-system-equation,
          .shipfaster-case-study
          .sf-workflow,
          .shipfaster-case-study
          .sf-production-flow {

            grid-template-columns:
              1fr;
          }


          .shipfaster-case-study
          .sf-output-stat {

            min-height:
              120px;
          }


          .shipfaster-case-study
          .sf-media-placeholder {

            min-height:
              220px;

            padding:
              22px;
          }

        }

      `}</style>

    </div>
  );
}



/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  number,
  title,
  subtitle,
}) {
  return (
    <div className="cs-section-heading">

      {number && (
        <span className="cs-section-number casestudy-mono-muted">
          {number}
        </span>
      )}

      <h2 className="cs-section-title casestudy-heading">
        {title}
      </h2>

      {subtitle && (
        <p className="cs-section-subtitle casestudy-reading-large">
          {subtitle}
        </p>
      )}

    </div>
  );
}



/* =========================================================
   META
========================================================= */

function Meta({
  label,
  children,
}) {
  return (
    <div className="cs-meta-item">

      <dt className="cs-meta-label casestudy-ui">
        {label}
      </dt>

      <dd className="cs-meta-value casestudy-ui-reading">
        {children}
      </dd>

    </div>
  );
}



/* =========================================================
   MEDIA PLACEHOLDER
========================================================= */

function MediaPlaceholder({
  label,
  asset,
  note,
  ratio = '16 / 10',
}) {
  return (
    <div
      className="sf-media-placeholder"
      style={{
        '--sf-placeholder-ratio': ratio,
      }}
    >

      <div className="sf-media-placeholder-content">

        <span className="sf-media-placeholder-label casestudy-mono-muted">
          {label}
        </span>

        <strong className="sf-media-placeholder-asset casestudy-heading">
          {asset}
        </strong>

        {note && (
          <p className="sf-media-placeholder-note casestudy-reading">
            {note}
          </p>
        )}

      </div>

    </div>
  );
}
/* =========================================================
   IMAGE
========================================================= */

function Figure({
  src,
  alt,
  caption,
  size = 'full',
}) {
  return (
    <figure className={`sf-figure sf-figure-${size}`}>
      <img
        src={src}
        alt={alt}
        className="sf-figure-image"
      />

      {caption && (
        <figcaption className="sf-figure-caption casestudy-mono-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* =========================================================
   SYSTEM EQUATION
========================================================= */

function SystemEquationItem({
  value,
  label,
  highlight = false,
}) {
  return (
    <div
      className={[
        'sf-equation-item',
        highlight
          ? 'sf-equation-item-highlight'
          : '',
      ].join(' ')}
    >

      <strong className="sf-equation-value casestudy-heading">
        {value}
      </strong>

      <span className="sf-equation-label casestudy-mono">
        {label}
      </span>

    </div>
  );
}



/* =========================================================
   DESIGN DECISION
========================================================= */

function DesignDecision({
  number,
  label,
  title,
  children,
}) {
  return (
    <article className="sf-design-decision">

      <div className="sf-decision-meta casestudy-mono-muted">

        <span>
          DECISION {number}
        </span>

        <span>
          {label}
        </span>

      </div>


      <h3 className="sf-decision-title casestudy-heading">
        {title}
      </h3>


      {children}

    </article>
  );
}



/* =========================================================
   WORKFLOW
========================================================= */

function WorkflowStep({
  number,
  title,
  text,
}) {
  return (
    <div className="sf-workflow-step">

      <span className="sf-workflow-number casestudy-mono-muted">
        {number}
      </span>

      <strong className="casestudy-heading">
        {title}
      </strong>

      <p className="casestudy-reading">
        {text}
      </p>

    </div>
  );
}


function WorkflowArrow() {
  return (
    <span className="sf-workflow-arrow casestudy-heading">
      →
    </span>
  );
}
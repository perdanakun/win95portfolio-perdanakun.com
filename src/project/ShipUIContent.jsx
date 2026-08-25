import React from 'react';

import CaseStudyNavbar from './CaseStudyNavbar';


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


Suggested future assets:

shipfaster-hero.jpg
shipfaster-project-overview.jpg
shipfaster-production.jpg
shipfaster-variants.jpg
shipfaster-sizes.jpg
shipfaster-figma.jpg
shipfaster-documentation.jpg
shipfaster-output.jpg
*/


const roleContributions = [
  'Iconography direction',
  'Base icon design',
  'Production supervision',
  'Naming architecture',
  'Figma components & variants',
  'Library organization',
  'Documentation',
  'Visual QA',
  'Client communication',
];


const systemDimensions = [
  {
    number: '800',
    label: 'BASE ICONS',
  },
  {
    number: '6',
    label: 'VISUAL VARIANTS',
  },
  {
    number: '3',
    label: 'SIZES',
  },
  {
    number: '14,400',
    label: 'CONFIGURATIONS',
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
      'A small-size variant with additional negative space to maintain clarity at UI scale.',
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
              800 Icons. 14,400 Configurations. One System.
            </h1>


            <p className="cs-lead casestudy-reading-large">
              A scalable icon library created for Shipfaster UI —
              designed across multiple visual treatments and sizes,
              then structured as reusable Figma components and variants.
            </p>


            <MediaPlaceholder
              label="HERO VISUAL"
              asset="shipfaster-hero.jpg"
              note="Recommended: complete icon library or strongest Figma overview."
              ratio="16 / 9"
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
              subtitle="The challenge was not only designing hundreds of icons. It was making thousands of configurations behave like one system."
            />


            <div className="cs-copy-stack">

              <p className="cs-body casestudy-reading">
                <strong>Shipfaster UI</strong> is a Figma UI Kit and
                design system built around reusable components,
                variants, and assets for designing digital products
                more efficiently.
              </p>


              <p className="cs-body casestudy-reading">
                The team needed a custom icon library for the system:
                <strong> 800 UI icons</strong>, each available across
                multiple visual treatments and three interface sizes.
              </p>


              <p className="cs-body casestudy-reading">
                What initially sounds like an icon-production problem
                becomes a system problem at this scale. Every icon had
                to remain visually related while supporting different
                styles, corner treatments, sizes, naming rules, and
                future use by other designers.
              </p>

            </div>


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


            <div className="cs-problem-card">

              <span className="cs-problem-label casestudy-ui">
                THE DESIGN CHALLENGE
              </span>

              <p className="cs-problem-text casestudy-heading">
                How do you turn 800 individual icons into a reusable
                system that remains coherent across 14,400 style and
                size configurations?
              </p>

            </div>


            <MediaPlaceholder
              label="PROJECT OVERVIEW"
              asset="shipfaster-project-overview.jpg"
              note="Recommended: client brief, initial style exploration, or overview of the icon categories."
            />

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
              subtitle="Leading the system while scaling production across a small design team."
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
                <strong> visual-system definition through final Figma
                handoff.</strong> I created the base design direction
                and construction references, then supervised a designer
                on my team who helped scale production of the raw icon
                assets.
              </p>


              <p className="cs-body casestudy-reading">
                As production expanded, my role increasingly focused
                on the system around the icons:
                <strong> reviewing consistency, resolving visual
                exceptions, defining naming, organizing the library,
                building components and variants, documenting the
                system, and running final visual QA.</strong>
              </p>


              <p className="cs-body casestudy-reading">
                I also managed communication with the Shipfaster UI
                team throughout the project and prepared the final
                assets inside a collaborative Figma file for handoff.
              </p>

            </div>


            <MediaPlaceholder
              label="PRODUCTION & DIRECTION"
              asset="shipfaster-production.jpg"
              note="Recommended: base design, raw production files, review process, or production-to-final comparison."
            />

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
              subtitle="Design the library around reusable relationships instead of treating every output as an isolated asset."
            />



            {/* =================================================
                DECISION 01 — VARIANTS
            ================================================= */}

            <DesignDecision
              number="01"
              label="VARIANT ARCHITECTURE"
              title="Separate visual style from corner treatment."
            >

              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  The initial brief described four icon styles:
                  outline, filled, duotone, and sharp. During
                  implementation, the structure became more
                  systematic.
                </p>


                <p className="cs-body casestudy-reading">
                  Instead of treating sharp icons as an unrelated
                  fourth style, the final library paired
                  <strong> three base visual treatments</strong> with
                  <strong> two corner treatments.</strong>
                </p>

              </div>


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
                  = 6 reusable variants per icon.
                </strong>

              </div>


              <MediaPlaceholder
                label="6 VARIANTS"
                asset="shipfaster-variants.jpg"
                note="Best visual: one icon shown as Stroke Rounded / Stroke Sharp / Solid Rounded / Solid Sharp / Duotone Rounded / Duotone Sharp."
                ratio="1 / 1"
              />

            </DesignDecision>



            {/* =================================================
                DECISION 02 — SIZES
            ================================================= */}

            <DesignDecision
              number="02"
              label="ICON SIZING"
              title="Smaller icons were designed for their context, not only scaled down."
            >

              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  Every icon was delivered in
                  <strong> 24×24, 20×20, and 16×16</strong> versions.
                  The smallest size had an additional requirement:
                  more negative space so the icon remained clear in
                  compact UI contexts.
                </p>


                <p className="cs-body casestudy-reading">
                  That meant size could not be treated as a purely
                  mechanical transformation. Shapes and visual density
                  had to remain balanced as the available space became
                  smaller.
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


              <MediaPlaceholder
                label="SIZE COMPARISON"
                asset="shipfaster-sizes.jpg"
                note="Best visual: the same icon family at 24px / 20px / 16px using the exported collaboration-file layout."
              />

            </DesignDecision>



            {/* =================================================
                DECISION 03 — FIGMA SYSTEM
            ================================================= */}

            <DesignDecision
              number="03"
              label="FIGMA SYSTEM"
              title="The deliverable had to be usable, not merely finished."
            >

              <div className="cs-copy-stack">

                <p className="cs-body casestudy-reading">
                  My previous icon projects often ended with a set of
                  finished visual assets. Shipfaster required another
                  layer of work:
                  <strong> the icons had to become functioning parts
                  of a design system.</strong>
                </p>


                <p className="cs-body casestudy-reading">
                  Each icon was organized in Figma with its available
                  styles and sizes structured as components and
                  variants, supported by naming, library organization,
                  construction references, documentation, and QA.
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
                  text="Apply style, size, naming, and construction rules."
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
                  text="Organize, document, QA, and prepare the library for the product team."
                />

              </div>


              <blockquote className="cs-quote casestudy-reading-large">
                The deliverable wasn't a folder of finished icons.
                It was a system another designer could actually use.
              </blockquote>


              <MediaPlaceholder
                label="FIGMA COMPONENT SYSTEM"
                asset="shipfaster-figma.jpg"
                note="Recommended: Figma component set, variant properties, naming structure, or library organization."
              />


              <MediaPlaceholder
                label="DOCUMENTATION"
                asset="shipfaster-documentation.jpg"
                note="Recommended: grid guide, construction rules, size guidance, or documentation pages."
              />

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
              subtitle="A production-scale icon library prepared for integration into the Shipfaster UI design system."
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
                The completed project covered
                <strong> 800 base icons</strong> organized across
                <strong> 16 production batches.</strong> Each icon was
                developed with six visual configurations and three UI
                sizes, creating up to
                <strong> 14,400 style-and-size configurations</strong>
                across the library.
              </p>


              <p className="cs-body casestudy-reading">
                The final work was delivered through a collaborative
                Figma file for handoff to the Shipfaster UI team, with
                icons organized as reusable components and variants
                rather than disconnected visual assets.
              </p>


              <p className="cs-body casestudy-reading">
                Icons from the system were incorporated into Shipfaster
                UI. Final product integration was handled by their team
                after handoff, so the delivered Figma library represents
                the scope of my contribution rather than claiming that
                every individual icon was released.
              </p>

            </div>


            <MediaPlaceholder
              label="FINAL LIBRARY"
              asset="shipfaster-output.jpg"
              note="Recommended: strongest wide composition showing multiple icon categories or the completed Figma library."
              ratio="16 / 9"
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
              title="From Icon Assets to Design-System Components"
            />


            <div className="cs-copy-stack">

              <p className="cs-body-strong casestudy-heading">
                I was already comfortable designing icon sets before
                this project. What changed was my understanding of
                what happens after the icons are drawn.
              </p>


              <p className="cs-body casestudy-reading">
                At this scale, handing off finished visual assets was
                not enough. The work had to account for
                <strong> variants, sizing, naming, components,
                organization, documentation, QA, and how another
                designer would actually use the library.</strong>
              </p>


              <p className="cs-body casestudy-reading">
                It shifted my thinking from delivering individual
                visual assets toward designing the rules and reusable
                structures behind them — a way of working that now
                informs how I approach design systems, product design,
                and design engineering.
              </p>

            </div>


            <div className="sf-reflection-flow">

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
                  Document & QA
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
          --sf-bg-alt: #f7f7f5;

          --sf-ink: #0a0a0a;
          --sf-body: #343432;

          --sf-muted: #666663;
          --sf-faint: #8f8f8b;

          --sf-line: #d9d9d5;
          --sf-line-soft: #ecece8;

          width: 100%;
          min-height: 520px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background:
            var(--sf-bg);

          color:
            var(--sf-ink);

          box-sizing: border-box;

          text-align: left;
        }


        .shipfaster-case-study *,
        .shipfaster-case-study *::before,
        .shipfaster-case-study *::after {
          box-sizing: border-box;
        }


        .shipfaster-case-study p,
        .shipfaster-case-study blockquote,
        .shipfaster-case-study ul,
        .shipfaster-case-study dl,
        .shipfaster-case-study figure {
          margin: 0;
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

          text-align: left;
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
          text-align: left;
        }


        .shipfaster-case-study .cs-eyebrow {

          display: flex;
          align-items: center;

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
           META
        ========================================================= */

        .shipfaster-case-study .cs-meta,
        .shipfaster-case-study .cs-snapshot {

          display: grid;

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
          min-width: 0;
        }


        .shipfaster-case-study .cs-meta-label {

          display: block;

          margin-bottom:
            8px;

          color:
            var(--sf-faint);

          text-transform:
            uppercase;
        }


        .shipfaster-case-study .cs-meta-value {

          display: block;

          margin: 0;

          color:
            var(--sf-ink);
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
          border-bottom: 0;
        }


        .shipfaster-case-study .cs-section-heading {
          margin-bottom:
            30px;
        }


        .shipfaster-case-study .cs-section-number {

          display: block;

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

          display: flex;
          flex-direction: column;

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

          display: grid;

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

          display: flex;
          align-items: center;

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
            var(--sf-ink);

          border-color:
            var(--sf-ink);
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
            #ffffff;
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
            #bdbdb8;
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
            310px;

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
            var(--sf-bg-alt);

          text-align:
            center;
        }


        .shipfaster-case-study
        .sf-reflection-side-final {

          background:
            var(--sf-ink);

          border-color:
            var(--sf-ink);
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
            #ffffff;
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
          .sf-workflow {

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
          .sf-workflow {

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
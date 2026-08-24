import React from 'react';

import holohealthGif from '../assets/images/case-study/holohealth.gif';
import holohealthGif4 from '../assets/images/case-study/holohealth4.gif';

import holohealthTest1 from '../assets/images/case-study/holohealth-test1.jpg';
import holohealthTest2 from '../assets/images/case-study/holohealth-test2.jpg';
import holohealthTest3 from '../assets/images/case-study/holohealth-test3.jpg';

import icon1 from './holohelalth/icons (1).svg';
import icon2 from './holohelalth/icons (2).svg';
import icon3 from './holohelalth/icons (3).svg';
import icon4 from './holohelalth/icons (4).svg';
import icon5 from './holohelalth/icons (5).svg';
import icon6 from './holohelalth/icons (6).svg';
import icon7 from './holohelalth/icons (7).svg';
import icon8 from './holohelalth/icons (8).svg';
import icon9 from './holohelalth/icons (9).svg';
import icon10 from './holohelalth/icons (10).svg';


const holoHealthIcons = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
];

const iconModules = import.meta.glob(
  './holohelalth/icon_example *.svg',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const holoHealthExampleIcons = Object.entries(iconModules)
  .sort(([a], [b]) => {
    const numberA = Number(
      a.match(/icon_example (\d+)\.svg$/)?.[1]
    );

    const numberB = Number(
      b.match(/icon_example (\d+)\.svg$/)?.[1]
    );

    return numberA - numberB;
  })
  .map(([, src]) => src);



const NOTION_URL =
  'https://app.notion.com/p/HoloHealth-Iconography-Visual-System-3c23e6c896238027a77ef87eeb315a85';
const veterinaryTerms = [
  'Paroxysmal Dyskinesia',
  'Vestibular Ataxia',
  'Leptospirosis',
  'Canine Epilepsy',
  'Hip Dysplasia',
  'Cardiomyopathy',
  'Osteoarthritis',
  'Atopic Dermatitis',
  'Pancreatitis',
  'Gastroenteritis',
  'Neuropathy',
  'Encephalitis',
  'Meningitis',
  'Tachycardia',
  'Bradycardia',
  'Heart Murmur',
  'Arrhythmia',
  'Hypertension',
  'Dermatitis',
  'Skin Infection',
  'Alopecia',
  'Pruritus',
  'Allergic Reaction',
  'Fungal Infection',
  'Anemia',
  'Thrombocytopenia',
  'Leukocytosis',
  'Dehydration',
  'Hypoglycemia',
  'Hyperglycemia',
  'Electrolyte Imbalance',
  'Endoscopy',
  'Analgesic',
  'Anticonvulsant',
  'Sedative',
  'Immunosuppressant',
  'Antiparasitic',
];


export default function HoloHealthCaseStudyRetro() {
  return (
    <div className="casestudy-window">
      <main className="casestudy">
        <div className="casestudy-container">

          {/* =====================================================
              HERO
          ===================================================== */}

          <section className="cs-hero">

            <p className="cs-eyebrow">
              HoloHealth — Visual System
            </p>

            <h1 className="cs-title">
              Turning Veterinary Complexity into a Visual System
            </h1>

            <p className="cs-lead">
              2,500+ icon system that turns highly specific veterinary
              health content into something anyone can read at a glance.
            </p>

            <figure className="cs-hero-figure">
              <img
                src={holohealthGif}
                alt="HoloHealth website and visual language"
                className="cs-hero-image"
              />
            </figure>
            
{/*
<dl className="cs-meta">
  <Meta label="Role">
    Visual Design Lead
  </Meta>

  <Meta label="Timeline">
    Apr 2025 – Jun 2026
  </Meta>

  <Meta label="Scope">
    2,500+ icons
  </Meta>

  <Meta label="Focus">
    Visual Language
  </Meta>
</dl>
*/}

          </section>
{/* =====================================================
    00 — THE BACKGROUND
===================================================== */}

<section className="cs-section">

  <div className="cs-copy-stack">

    <p className="cs-body">
      <strong>HoloHealth</strong> is a forward-thinking veterinary technology project
      aimed at revolutionizing animal healthcare through the
      convergence of artificial intelligence (AI), neurotechnology,
      and spatial computing.
    </p>

    <p className="cs-body">
      Moving beyond traditional two-dimensional diagnostics, <strong>the
      project introduces advanced 3D holographic imaging to
      veterinary medicine.</strong> By transforming standard radiology scans
      into interactive, spatial visual fields, HoloHealth empowers
      veterinary surgeons with unprecedented anatomical insights
      prior to surgical procedures.
    </p>


  </div>

</section>



          {/* =====================================================
              01 — THE PROBLEM
          ===================================================== */}

          <section className="cs-section">

            <SectionHeading
              number="01"
              title="The Problem"
            />
    <div className="cs-term-row">

  <RandomTerm
    terms={veterinaryTerms}
    interval={2300}
    scrambleDuration={520}
  />

  <RandomTerm
    terms={veterinaryTerms}
    interval={3100}
    scrambleDuration={680}
  />

  <RandomTerm
    terms={veterinaryTerms}
    interval={2700}
    scrambleDuration={580}
  />

  <RandomTerm
    terms={veterinaryTerms}
    interval={3600}
    scrambleDuration={720}
  />

  <RandomTerm
    terms={veterinaryTerms}
    interval={2500}
    scrambleDuration={460}
  />

  <RandomTerm
    terms={veterinaryTerms}
    interval={3300}
    scrambleDuration={640}
  />

  <RandomTerm
    terms={veterinaryTerms}
    interval={2900}
    scrambleDuration={540}
  />

  <RandomTerm
    terms={veterinaryTerms}
    interval={3900}
    scrambleDuration={760}
  />

</div>





            <div className="cs-copy-stack">

<p className="cs-body"> <strong>What do these words mean to you?</strong> </p>
<p className="cs-body"> To a veterinarian, they represent specific 
  diseases, conditions, symptoms, and health states. 
  But to most people, they can feel complex, unfamiliar, and 
  difficult to understand at a glance. </p> 
<p className="cs-body"> Now imagine thousands of veterinary terms 
  like these — each with its own meaning and medical context. 
  <strong>The challenge was not simply organizing this information, 
  but finding a visual way to make it instantly recognizable.</strong> </p> 
<p className="cs-body"> That became the core design challenge behind 
  HoloHealth: translating complex veterinary knowledge into a clear,
   consistent, and scalable icon system — one that could make even the 
   most unfamiliar terms easier to understand. </p>

            </div>

          </section>


          {/* =====================================================
              02 — MY ROLE
          ===================================================== */}

          <section className="cs-section">

            <SectionHeading
              number="02"
              title="Role & Contribution"
            />

                <ul className="cs-list">

              <li>
                Visual direction
              </li>

              <li>
                Complex concept translation
              </li>

              <li>
                Production supervision
              </li>

              <li>
                Visual QA
              </li>

              <li>
                Cross-functional visual assets
              </li>

            </ul>

            <div className="cs-copy-stack">

              <p className="cs-body">
                I worked directly with the founder to <strong>create the master visual of
                veterinary content into visual system</strong> that were
                understandable to users while staying aligned with the
                brand. I also <strong>supervised and manage designer</strong> — reviewing
                execution and maintaining consistency as the system grew —
                and <strong>produced reference assets for cross-functional teams</strong>,
                including material later developed into motion.
              </p>

            </div>


<IconScaleCarousel
  icons={holoHealthIcons}
/>


          </section>


          {/* =====================================================
              03 — KEY DECISIONS
          ===================================================== */}

          <section className="cs-section">

            <SectionHeading
              number="03"
              title="Key Design Decisions"
              subtitle="Make complex feel familiar to reduce cognitive load without reducing meaning."
            />

            <div className="cs-copy-stack">

              <p className="cs-body">
                Rather than invent unfamiliar visual metaphors, I used
                human medical references as a starting point and adapted
                them to veterinary contexts, so complex concepts felt
                intuitive to non-specialists.
              </p>

              <p className="cs-body-strong">
                Color became an additional layer of meaning across the
                system.
              </p>

            </div>

            <div className="cs-states">

              <State
                color="blue"
                label="Low"
                text="Lower or less severe health state."
              />

              <State
                color="green"
                label="Normal"
                text="Healthy or expected health state."
              />

              <State
                color="red"
                label="High / critical"
                text="Elevated, severe, or critical state."
              />

            </div>

            <p className="cs-body">
              Alongside color, we set consistent rules for shape,
              proportion, detail, and visual logic — so very different
              veterinary subjects still read as one system.
            </p>

            <IconScaleSystem
  icons={holoHealthExampleIcons}
/>


            <blockquote className="cs-quote">
              The goal wasn't to make every concept look the same. It
              was to make every concept feel like it belongs to the same
              visual language.
            </blockquote>
          </section>


          {/* =====================================================
              04 — OUTCOME
          ===================================================== */}

          <section className="cs-section">

            <SectionHeading
              number="04"
              title="Outcome"
            />

            <div className="cs-outcome">

              <div className="cs-outcome-stat">

                <span className="cs-outcome-number">
                  2,500+
                </span>

                <span className="cs-outcome-label">
                  ICONS SYSTEM
                </span>

              </div>

              <p className="cs-body cs-outcome-copy">
                
                became the <strong>foundation for a scalable product visual
                system</strong>  covering multiple species, conditions,
                behaviors, medications, devices, services, and health
                states.The master icons<strong> became production references,
                illustration foundations, and part of the broader
                HoloHealth design system.</strong> 
                </p>

            </div>

                            
 <p>            I reviewed production output,
                resolved inconsistencies, and introduced new solutions
                when existing rules weren't enough —  helping the
               <strong> language scale across the design team and
                cross-functional product work.</strong>
</p>

            <Figure
              src={holohealthGif4}
              alt="HoloHealth iconography in product context"
              caption="The visual language applied in its actual product context."
            />

          </section>


          {/* =====================================================
              REFLECTION
          ===================================================== */}

          <section className="cs-section cs-section-last">

            <SectionHeading
              title="From visual assets to visual systems"
            />

            <div className="cs-copy-stack">

                          <Figure
              src={holohealthTest2}
              alt="HoloHealth visual system and icon details"
              caption="A selection of icons across different veterinary subjects, following the same underlying visual logic."
            />


              <p className="cs-body-strong">
                This project shifted my focus from creating individual
                assets toward understanding the systems behind them:
                patterns, constraints, reusable decisions, and ways of
                working that another designer can pick up and continue.
              </p>

              <p className="cs-body">
                It reinforced how visual design can make complex
                information more approachable — not by removing
                complexity, but by giving it a structure people can
                understand.
              </p>

            </div>

            <dl className="cs-snapshot">

              <Meta label="Role">
                Visual Design Lead
              </Meta>

              <Meta label="Timeline">
                Apr 2025 – Jun 2026
              </Meta>

              <Meta label="Scope">
                2,500+ icons
              </Meta>

              <Meta label="Focus">
                Visual Language · Iconography · Production · QA
              </Meta>

            </dl>

            <a
              href={NOTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-link"
            >
              Open full case study ↗
            </a>

          </section>

        </div>
      </main>


      {/* =========================================================
          COMPONENT STYLES
      ========================================================= */}

      <style>{`
/* =========================================================
   ICON SCALE SYSTEM
========================================================= */

.cs-icon-scale-system {
  width: 100%;
  margin: 42px 0 40px;
}


/* =========================================================
   FIXED ICON GRID
========================================================= */

.cs-icon-scale-field {
  display: grid;

  grid-template-columns: repeat(6, 96px);
  grid-template-rows: repeat(5, 96px);

  column-gap: 70px;
  row-gap: 20px;

  justify-content: center;

  width: 100%;

}



/* =========================================================
   FIXED CELL
========================================================= */

.cs-icon-scale-cell {
  width: 96px;
  height: 96px;

  display: flex;

  align-items: center;
  justify-content: center;

  overflow: hidden;
}


/* =========================================================
   ICON
========================================================= */

.cs-icon-scale-cell img {
  display: block;

  max-width: 96px;
  max-height: 96px;

  object-fit: contain;

  transition:
    width 180ms ease,
    height 180ms ease;
}


/* =========================================================
   CONTROLS
========================================================= */

.cs-icon-scale-controls {
  display: flex;

  align-items: center;

  gap: 14px;

  margin-top: 16px;
}


.cs-icon-scale-label {
  flex: 0 0 auto;

  font-family:
    var(--casestudy-font-ui);

  font-size:
    var(--casestudy-font-ui-size);

  line-height: 1;

  color:
    var(--cs-faint);

  text-transform:
    uppercase;

  letter-spacing:
    0.06em;
}


.cs-icon-scale-slider {
  flex: 1;

  width: 100%;
  height: 2px;

  appearance: none;

  background:
    #383836;

  cursor: pointer;
}


.cs-icon-scale-slider::-webkit-slider-thumb {
  appearance: none;

  width: 12px;
  height: 12px;

  border: 0;
  border-radius: 50%;

  background:
    var(--cs-ink);

  cursor: pointer;
}


.cs-icon-scale-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;

  border: 0;
  border-radius: 50%;

  background:
    var(--cs-ink);

  cursor: pointer;
}


.cs-icon-scale-value {
  flex: 0 0 42px;

  font-family:
    var(--casestudy-font-mono);

  font-size:
    var(--casestudy-font-mono-size);

  line-height: 1;

  color:
    var(--cs-muted);

  text-align: right;
}


/* =========================================================
   ICON SCALE CAROUSEL
========================================================= */

.cs-icon-carousel {
  width: 100%;
  margin: 42px 0 0;
  text-align: center;
}

.cs-icon-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 20px;
}

.cs-icon-button {
  width: 42px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: 0;
  color: var(--cs-muted);
  font-family: var(--casestudy-font-ui);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition:
    color 140ms ease,
    transform 140ms ease;
}

.cs-icon-button:hover {
  color: var(--cs-ink);
}

.cs-icon-button-prev:hover {
  transform: translateX(-3px);
}

.cs-icon-button-next:hover {
  transform: translateX(3px);
}

.cs-icon-button:active {
  transform: scale(0.9);
}

.cs-icon-button-prev:active {
  transform: translateX(-2px) scale(0.9);
}

.cs-icon-button-next:active {
  transform: translateX(2px) scale(0.9);
}

.cs-icon-counter {
  min-width: 62px;
  font-family: var(--casestudy-font-mono);
  font-size: var(--casestudy-font-mono-size);
  line-height: 1;
  letter-spacing: 0.04em;
  color: var(--cs-faint);
  text-align: center;
}

.cs-icon-counter-divider {
  color: #444;
}


/* =========================================================
   STAGE
========================================================= */

.cs-icon-stage {
  position: relative;
  width: 100%;

  /*
    Responsive height.
    Smaller on phones, more generous on desktop.
  */
  height: clamp(170px, 25vw, 260px);

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  background: #000000;
}


/* =========================================================
   ICON ITEM
========================================================= */

.cs-icon-item {
  position: absolute;
  left: 50%;
  top: 50%;

  /*
    Base icon size is now responsive.
  */
  width: clamp(64px, 8vw, 110px);
  height: clamp(64px, 8vw, 110px);

  display: flex;
  align-items: center;
  justify-content: center;

  transform:
    translate(
      calc(-50% + var(--icon-distance) * clamp(70px, 11vw, 150px)),
      -50%
    )
    scale(var(--icon-scale));

  opacity: var(--icon-opacity);

  z-index:
    calc(10 - abs(var(--icon-distance)));

  transition:
    transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 400ms ease;

  pointer-events: none;
}

.cs-icon-item img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
}


/* =========================================================
   STAGE
========================================================= */

.cs-icon-stage {
  position: relative;

  width: 100%;
  height: 260px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  background:
    #000000;


}


/* =========================================================
   ICON ITEM
========================================================= */
.cs-icon-item {
  position: absolute;

  left: 50%;
  top: 50%;

  width: 110px;
  height: 110px;

  display: flex;
  align-items: center;
  justify-content: center;

  transform:
    translate(
      calc(-50% + var(--icon-distance) * 150px),
      -50%
    )
    scale(var(--icon-scale));

  opacity:
    calc(
      1 - abs(var(--icon-distance)) * 0.18
    );

  z-index:
    calc(10 - abs(var(--icon-distance)));

  transition:
    transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 400ms ease;

  pointer-events: none;
}


        /* =========================================================
           COLOR TOKENS
        ========================================================= */

        .casestudy-window {

          --cs-bg: #000000;
          --cs-bg-alt: #111111;

          --cs-ink: #f5f5f2;
          --cs-body: #c8c8c5;

          --cs-muted: #92928f;
          --cs-faint: #666662;

          --cs-line: #292927;

          --cs-blue: #7895ff;
          --cs-green: #35c77a;
          --cs-red: #f05a70;

          width: 100%;
          min-height: 520px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background: var(--cs-bg);
          color: var(--cs-ink);

          border-color:
            #444
            #222
            #222
            #444;

          box-sizing: border-box;

          text-align: left;
        }


        .casestudy-window *,
        .casestudy-window *::before,
        .casestudy-window *::after {
          box-sizing: border-box;
        }


        .casestudy-window p,
        .casestudy-window blockquote,
        .casestudy-window ul,
        .casestudy-window dl,
        .casestudy-window figure {
          margin: 0;
        }


        /* =========================================================
           MAIN CASE STUDY
        ========================================================= */

        .casestudy {

          flex: 1;
          min-height: 0;

          overflow-y: auto;
          overflow-x: hidden;

          background: var(--cs-bg);

          font-family:
            var(--casestudy-font-reading);

          color: var(--cs-body);

          text-align: left;

          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }


        .casestudy-container {

          width:
            min(55%, calc(100% - 64px));

          min-width: 320px;

          margin: 0 auto;

          /*
            More generous vertical rhythm.
          */

          padding:
            40px 0 50px;

          text-align: left;
        }


        /* =========================================================
           HERO
        ========================================================= */

        .cs-hero {

          text-align: left;
        }


        .cs-eyebrow {

          display: flex;
          align-items: center;
          justify-content: flex-start;

          margin-bottom: 18px !important;

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-size);

          line-height:
            var(--casestudy-font-ui-line-height);

          letter-spacing:
            var(--casestudy-font-ui-letter-spacing);

          color: var(--cs-muted);

          text-align: left;
        }


        .cs-title {


          margin:
            0 0 22px !important;

          font-family:
            var(--casestudy-font-heading);

          font-style: normal;

          font-weight: 700;

          font-size:
            var(--casestudy-font-hero-size);

          line-height:
            1.04;

          letter-spacing:
            var(--casestudy-font-hero-letter-spacing);

          color: var(--cs-ink);

          text-align: left;
        }


        .cs-lead {


          margin:
            0 0 40px !important;

          font-family:
            var(--casestudy-font-reading);

          font-style: normal;

          font-weight: 400;

          font-size:
            var(--casestudy-font-reading-large-size);

          line-height:
            1.55;

          letter-spacing:
            var(--casestudy-font-reading-large-letter-spacing);

          color: #d0d0cd;

          text-align: left;
        }


        /* =========================================================
           HERO IMAGE
        ========================================================= */

        .cs-hero-figure {

          text-align: left;
        }


        .cs-hero-image {

          display: block;

          width: 100%;
          height: auto;

          /*
            No border.
          */

          border: 0;

          background: transparent;

          border-radius: 0;
        }


        /* =========================================================
           META
        ========================================================= */

        .cs-meta {

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap:
            28px;

          margin: 0 !important;

          text-align: left;
        }


        .cs-meta-item {

          min-width: 0;

          text-align: left;
        }


        .cs-meta-label {

          display: block;

          margin-bottom: 8px;

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-size);

          line-height:
            var(--casestudy-font-ui-line-height);

          letter-spacing:
            0.06em;

          color:
            var(--cs-faint);

          text-transform:
            uppercase;

          text-align: left;
        }


        .cs-meta-value {

          display: block;

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-reading-size);

          line-height:
            1.45;

          letter-spacing:
            var(--casestudy-font-ui-letter-spacing);

          font-weight: 400;

          color:
            var(--cs-ink);

          text-align: left;
        }


        /* =========================================================
           SECTIONS
        ========================================================= */

        .cs-section {

          padding:
            30px 0;

          border-bottom:
            1px solid var(--cs-line);

          text-align: left;
        }


        .cs-section-last {

          border-bottom: 0;

          padding-bottom: 12px;
        }


        /* =========================================================
           SECTION HEADING
        ========================================================= */

        .cs-section-heading {

          margin-bottom:
            30px !important;

          text-align: left;
        }


        .cs-section-title {

          margin: 0 !important;

          font-family:
            var(--casestudy-font-heading);

          font-style: normal;

          font-weight:
            var(--casestudy-font-heading-weight);

          font-size: 21px;

          line-height: 1.3;

          letter-spacing:
            var(--casestudy-font-heading-letter-spacing);

          color:
            var(--cs-ink);

          text-align: left;
        }


        .cs-section-number {

          display: inline-block;

          margin-right: 10px;

          font-family:
            var(--casestudy-font-mono);

          font-size:
            var(--casestudy-font-mono-size);

          line-height:
            var(--casestudy-font-mono-line-height);

          letter-spacing:
            var(--casestudy-font-mono-letter-spacing);

          color:
            var(--cs-faint);

          text-align: left;
        }


        .cs-section-subtitle {

          margin:
            9px 0 0 !important;

          font-family:
            var(--casestudy-font-reading);

          font-size:
            var(--casestudy-font-reading-size);

          line-height:
            1.55;

          letter-spacing:
            var(--casestudy-font-reading-letter-spacing);

          color:
            var(--cs-muted);

          text-align: left;
        }


        /* =========================================================
           COPY STACK
        ========================================================= */

        .cs-copy-stack {

          display: flex;

          flex-direction: column;

          gap: 22px;

          margin-bottom: 28px;
        }


        /* =========================================================
           BODY COPY
        ========================================================= */

        .cs-body {


          margin: 0 !important;

          font-family:
            var(--casestudy-font-reading);

          font-style: normal;

          font-weight: 400;

          font-size:
            var(--casestudy-font-reading-size);

          line-height:
            1.7;

          letter-spacing:
            var(--casestudy-font-reading-letter-spacing);

          color:
            var(--cs-body);

          text-align: left;
        }


        .cs-body-strong {



          margin:
            32px 0 22px !important;

          font-family:
            var(--casestudy-font-heading);

          font-style: normal;

          font-weight:
            var(--casestudy-font-heading-weight);

          font-size:
            var(--casestudy-font-reading-large-size);

          line-height:
            1.45;

          letter-spacing:
            var(--casestudy-font-heading-letter-spacing);

          color:
            var(--cs-ink);

          text-align: left;
        }


        .cs-body strong {

          font-family:
            var(--casestudy-font-heading);

          font-weight:
            var(--casestudy-font-heading-weight);

          letter-spacing:
            var(--casestudy-font-heading-letter-spacing);

          color:
            var(--cs-ink);
        }


        /* =========================================================
           PROBLEM TERMS
        ========================================================= */
/* =========================================================
   RANDOM TERMS — TYPOGRAPHIC
========================================================= */
.cs-term-row {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  column-gap: 48px;
  row-gap: 16px;

  width: 100%;
  max-width: 900px;

  margin:
    12px auto 42px !important;

  text-align: center;
}

.cs-term {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-width: 0;
  height: 34px;

  padding: 0;
  margin: 0;

  background: transparent;
  border: 0;

  font-family: var(--casestudy-font-heading);
  font-size: clamp(20px, 2.8vw, 30px);
  line-height: 1;

  letter-spacing: -0.035em;
  font-weight: 600;

  color: #f5f5f2;
  text-align: center;

  /*
    Jangan biarkan term panjang
    memperbesar layout.
  */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition:
    color 120ms ease,
    opacity 120ms ease,
    filter 120ms ease;
}


.cs-term-scrambling {
  color:
    #777773;

  opacity:
    0.65;

  filter:
    blur(0.2px);
}


        /* =========================================================
           ROLE LIST
        ========================================================= */

        .cs-list {

          display: flex;

          flex-wrap: wrap;

          justify-content: flex-start;

          gap: 9px;

          list-style: none;

          padding: 0;

          margin:
            28px 0 32px !important;

          text-align: left;
        }


        .cs-list li {

          padding:
            8px 12px;

          background:
            rgba(255, 255, 255, 0.035);

          border:
            1px solid rgba(255, 255, 255, 0.08);

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-size);

          line-height:
            1.4;

          letter-spacing:
            var(--casestudy-font-ui-letter-spacing);

          color:
            #d4d4d1;

          text-align: left;
        }


        /* =========================================================
           HEALTH STATES
        ========================================================= */

        .cs-states {

          display: flex;

          flex-direction: column;

          gap: 1px;

          margin:
            26px 0 30px;

          background:
            var(--cs-line);

          border:
            1px solid var(--cs-line);

          text-align: left;
        }


        .cs-state {

          display: flex;

          align-items: baseline;

          justify-content: flex-start;

          gap: 14px;

          padding:
            15px 16px;

          background:
            #111;

          text-align: left;
        }


        .cs-state-dot {

          width: 8px;
          height: 8px;

          flex: 0 0 auto;

          border-radius: 50%;
        }


        .cs-state-blue {
          background:
            var(--cs-blue);
        }


        .cs-state-green {
          background:
            var(--cs-green);
        }


        .cs-state-red {
          background:
            var(--cs-red);
        }


        .cs-state-label {

          min-width: 110px;

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-reading-size);

          line-height:
            1.45;

          font-weight: 700;

          color:
            var(--cs-ink);

          text-align: left;
        }


        .cs-state-text {

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-size);

          line-height:
            1.5;

          color:
            var(--cs-muted);

          text-align: left;
        }


        /* =========================================================
           QUOTE
        ========================================================= */

        .cs-quote {


          margin:
            38px 0 !important;

          padding:
            4px 0 4px 20px;

          border-left:
            2px solid var(--cs-green);

          font-family:
            var(--casestudy-font-reading);

          font-size:
            var(--casestudy-font-reading-large-size);

          line-height:
            1.55;

          letter-spacing:
            var(--casestudy-font-reading-large-letter-spacing);

          font-weight: 400;

          color:
            #e5e5e1;

          text-align: left;
        }


        /* =========================================================
           OUTCOME
        ========================================================= */

        .cs-outcome {

          display: flex;

          align-items: flex-start;

          justify-content: flex-start;

          gap: 28px;

          margin:
            0 0 36px;

          text-align: left;
        }

.cs-outcome-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 128px;
  padding: 18px 20px;

  background: #0d0d0d;
  border: 1px solid var(--cs-line);

  text-align: center;
}


        .cs-outcome-number {

          font-family:
            var(--casestudy-font-heading);

          font-size: 32px;

          line-height: 1;

          font-weight: 700;

          letter-spacing:
            var(--casestudy-font-heading-letter-spacing);

          color:
            var(--cs-ink);

          text-align: left;
        }


        .cs-outcome-label {

          margin-top:
            9px;

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-size);

          line-height:
            var(--casestudy-font-ui-line-height);

          letter-spacing:
            0.06em;

          color:
            var(--cs-green);

          text-transform:
            uppercase;

          text-align: left;
        }


        .cs-outcome-copy {

          flex: 1;

          margin-bottom: 0 !important;

          text-align: left;
        }


        /* =========================================================
           FIGURES
        ========================================================= */

        .cs-figure {

          margin:
            36px 0 0 !important;

          text-align: left;
        }


        .cs-figure img {

          display: block;

          width: 100%;

          height: auto;

          /*
            Images intentionally have NO border.
          */

          border: 0;

          background:
            transparent;

          border-radius: 0;
        }


        .cs-figure-caption {


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


        /* =========================================================
           SNAPSHOT
        ========================================================= */

        .cs-snapshot {

          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap:
            24px 28px;

          margin:
            36px 0 !important;

          padding:
            22px;

          background:
            rgba(255, 255, 255, 0.025);

          border:
            1px solid var(--cs-line);

          text-align: left;
        }


        .cs-snapshot > .cs-meta-item {

          min-width: 0;

          text-align: left;
        }


        /* =========================================================
           LINK
        ========================================================= */

        .cs-link {

          display: inline-flex;

          align-items: center;

          justify-content: flex-start;

          padding:
            10px 16px;

          background:
            #f2f2ef;

          border:
            2px solid #f2f2ef;

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-reading-size);

          line-height:
            1.4;

          font-weight: 500;

          color:
            #080808;

          text-decoration: none;

          text-align: left;

          transition:
            background 140ms ease,
            color 140ms ease;
        }


        .cs-link:hover {

          background:
            transparent;

          color:
            #f2f2ef;
        }


        /* =========================================================
           STATUS BAR
        ========================================================= */

        .casestudy-statusbar {

          flex:
            0 0 23px;

          height:
            23px;

          display: flex;

          gap:
            4px;

          padding:
            2px 4px;

          background:
            #353535;

          text-align: left;
        }


        .casestudy-status-item {

          display: flex;

          align-items: center;

          justify-content: flex-start;

          min-width: 0;

          padding:
            0 6px;

          overflow: hidden;

          white-space: nowrap;

          text-overflow: ellipsis;

          border-top:
            1px solid #505050;

          border-left:
            1px solid #505050;

          border-right:
            1px solid #111;

          border-bottom:
            1px solid #111;

          font-family:
            var(--casestudy-font-ui);

          font-size:
            var(--casestudy-font-ui-size);

          line-height:
            var(--casestudy-font-ui-line-height);

          letter-spacing:
            var(--casestudy-font-ui-letter-spacing);

          color:
            #e5e5e5;

          text-align: left;
        }


        .casestudy-status-item:first-child {
          flex: 1;
        }


        .casestudy-status-ready {

          flex:
            0 0 100px;

          width:
            100px;
        }


        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 900px) {

          .casestudy-container {

            width:
              calc(100% - 48px);
          }


          .cs-meta {

            grid-template-columns:
              repeat(2, 1fr);

            gap:
              24px;
          }


          .cs-section {

            padding:
              56px 0;
          }
        }


@media (max-width: 700px) {

  .cs-icon-stage {
    height: 220px;
  }

  .cs-icon-item {
    width: 82px;
    height: 82px;

    transform:
      translate(
        calc(-50% + var(--icon-distance) * 90px),
        -50%
      )
      scale(var(--icon-scale));
  }

}


  .cs-term-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 14px;
    row-gap: 10px;

    margin: 12px auto 36px !important;
  }

  .cs-term {
    height: 30px;
    font-size: 21px;
    line-height: 1;
  }
}
          .casestudy-container {

            width:
              calc(100% - 40px);

            padding:
              48px 0 72px;
          }


          .cs-hero {

            padding-bottom:
              44px;

            margin-bottom:
              44px;
          }


          .cs-title {

            font-size:
              26px;

            line-height:
              1.08;

            letter-spacing:
              -0.035em;

            margin-bottom:
              18px !important;
          }


          .cs-lead {

            font-size:
              var(--casestudy-font-reading-size);

            line-height:
              1.65;

            margin-bottom:
              32px !important;
          }


          .cs-outcome {

            flex-direction:
              column;

            gap:
              20px;
          }


          .cs-outcome-stat {

            width:
              100%;
          }


          .cs-outcome-number {

            font-size:
              28px;
          }


          .cs-state {

            align-items:
              flex-start;
          }


          .cs-state-label {

            min-width:
              90px;
          }
        }


        @media (max-width: 560px) {

          .casestudy-container {

            width:
              calc(100% - 32px);

            padding:
              40px 0 56px;
          }


          .cs-hero {

            padding-bottom:
              40px;

            margin-bottom:
              40px;
          }


          .cs-meta {

            grid-template-columns:
              1fr 1fr;

            gap:
              22px 16px;
          }


          .cs-section {

            padding:
              48px 0;
          }


          .cs-section-heading {

            margin-bottom:
              26px !important;
          }


          .cs-copy-stack {

            gap:
              20px;

            margin-bottom:
              24px;
          }


          .cs-body {

            line-height:
              1.72;
          }


          .cs-body-strong {

            margin:
              28px 0 20px !important;

            line-height:
              1.45;
          }


          .cs-term-row {

            gap:
              7px;

            margin-bottom:
              24px !important;
          }


.cs-term {
  font-size: clamp(22px, 2.2vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.035em;
}


          .cs-list {

            gap:
              7px;

            margin:
              24px 0 28px !important;
          }


          .cs-list li {

            padding:
              7px 9px;
          }


          .cs-state {

            display:
              grid;

            grid-template-columns:
              8px 1fr;

            column-gap:
              10px;

            row-gap:
              4px;

            padding:
              14px;
          }


          .cs-state-dot {

            grid-row:
              1 / span 2;

            margin-top:
              5px;
          }


          .cs-state-label {

            min-width:
              0;
          }


          .cs-state-text {

            grid-column:
              2;
          }


          .cs-quote {

            margin:
              32px 0 !important;

            padding-left:
              16px;

            line-height:
              1.5;
          }


          .cs-figure {

            margin-top:
              32px !important;
          }


          .cs-figure-caption {

            margin-top:
              10px !important;

            line-height:
              1.45;
          }


          .cs-snapshot {

            grid-template-columns:
              1fr;

            gap:
              20px;

            margin:
              32px 0 !important;

            padding:
              18px;
          }


          .casestudy-status-ready {

            flex-basis:
              70px;

            width:
              70px;
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
    <div className="cs-meta-item">

      <span className="cs-meta-label">
        {label}
      </span>

      <span className="cs-meta-value">
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
    <div className="cs-section-heading">

      <h2 className="cs-section-title">

        {number && (
          <span className="cs-section-number">
            {number}
          </span>
        )}

        {title}

      </h2>

      {subtitle && (
        <p className="cs-section-subtitle">
          {subtitle}
        </p>
      )}

    </div>
  );
}


function Figure({
  src,
  alt,
  caption,
}) {
  return (
    <figure className="cs-figure">

      <img
        src={src}
        alt={alt}
      />

      {caption && (
        <figcaption className="cs-figure-caption">
          {caption}
        </figcaption>
      )}

    </figure>
  );
}


function State({
  color,
  label,
  text,
}) {
  return (
    <div className="cs-state">

      <span
        className={`cs-state-dot cs-state-${color}`}
        aria-hidden="true"
      />

      <span className="cs-state-label">
        {label}
      </span>

      <span className="cs-state-text">
        {text}
      </span>

    </div>
  );
}

function RandomTerm({
  terms,
  interval = 2600,
  scrambleDuration = 650,
}) {
  const getRandomTerm = React.useCallback(() => {
    return terms[
      Math.floor(
        Math.random() * terms.length
      )
    ];
  }, [terms]);

  const [current, setCurrent] = React.useState(
    getRandomTerm()
  );

  const [isScrambling, setIsScrambling] =
    React.useState(false);

  const randomTerm = React.useCallback(() => {
    if (!terms.length) return;

    const availableTerms = terms.filter(
      (term) => term !== current
    );

    const nextTerm =
      availableTerms[
        Math.floor(
          Math.random() * availableTerms.length
        )
      ];

    setIsScrambling(true);

    const startTime = Date.now();

    const scramble = () => {
      const elapsed =
        Date.now() - startTime;

      if (elapsed >= scrambleDuration) {
        setCurrent(nextTerm);
        setIsScrambling(false);
        return;
      }

      const randomText =
        terms[
          Math.floor(
            Math.random() * terms.length
          )
        ];

      setCurrent(randomText);

      const progress =
        elapsed / scrambleDuration;

      const delay =
        35 +
        Math.pow(progress, 2) * 140;

      setTimeout(scramble, delay);
    };

    scramble();
  }, [
    terms,
    current,
    scrambleDuration,
  ]);

  React.useEffect(() => {
    const timer = setInterval(
      randomTerm,
      interval
    );

    return () => clearInterval(timer);
  }, [randomTerm, interval]);

  return (
    <span
      className={`cs-term ${
        isScrambling
          ? 'cs-term-scrambling'
          : ''
      }`}
    >
      {current}
    </span>
  );
}

// Icon Scale
function IconScaleCarousel({ icons }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const previous = () => {
    setActiveIndex((current) =>
      current === 0
        ? icons.length - 1
        : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === icons.length - 1
        ? 0
        : current + 1
    );
  };

  const getDistance = (index) => {
    let distance = index - activeIndex;

    const half = Math.floor(icons.length / 2);

    if (distance > half) {
      distance -= icons.length;
    }

    if (distance < -half) {
      distance += icons.length;
    }

    return distance;
  };

  const visualMap = {
  '-2': {
    scale: 0.42,
    opacity: 0.22,
  },
  '-1': {
    scale: 0.64,
    opacity: 0.50,
  },
  '0': {
    scale: 1.12,
    opacity: 1,
  },
  '1': {
    scale: 0.64,
    opacity: 0.50,
  },
  '2': {
    scale: 0.42,
    opacity: 0.22,
  },
};

  return (
    <div className="cs-icon-carousel">

      <div className="cs-icon-stage">

        {icons.map((icon, index) => {

          const distance = getDistance(index);

          if (Math.abs(distance) > 2) {
            return null;
          }

          const visual =
            visualMap[String(distance)];

          return (
            <div
              key={index}
              className="cs-icon-item"
              style={{
                '--icon-distance': distance,
                '--icon-scale': visual.scale,
                '--icon-opacity': visual.opacity,
              }}
            >

              <img
                src={icon}
                alt={`HoloHealth icon ${index + 1}`}
              />

            </div>
          );
        })}

      </div>

<div className="cs-icon-controls">

  <button
    type="button"
    className="cs-icon-button cs-icon-button-prev"
    onClick={previous}
    aria-label="Previous icon"
  >
    <span aria-hidden="true">←</span>
  </button>

  <span className="cs-icon-counter">
    {String(activeIndex + 1).padStart(2, '0')}
    <span className="cs-icon-counter-divider"> / </span>
    {String(icons.length).padStart(2, '0')}
  </span>

  <button
    type="button"
    className="cs-icon-button cs-icon-button-next"
    onClick={next}
    aria-label="Next icon"
  >
    <span aria-hidden="true">→</span>
  </button>

</div>


    </div>
  );
}
function IconScaleSystem({ icons }) {
  const MIN_SIZE = 48;
  const MAX_SIZE = 96;

  const [scale, setScale] = React.useState(50);

  const iconSize =
    MIN_SIZE +
    ((MAX_SIZE - MIN_SIZE) * scale) / 100;

  const visibleIcons = icons.slice(0, 30);

  return (
    <div className="cs-icon-scale-system">

      <div className="cs-icon-scale-field">

        {visibleIcons.map((icon, index) => (
          <div
            className="cs-icon-scale-cell"
            key={index}
          >
            <img
              src={icon}
              alt=""
              aria-hidden="true"
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
              }}
            />
          </div>
        ))}

      </div>

      <div className="cs-icon-scale-controls">

        <span className="cs-icon-scale-label">
          Scale
        </span>

        <input
          type="range"
          min="0"
          max="100"
          value={scale}
          onChange={(event) =>
            setScale(Number(event.target.value))
          }
          className="cs-icon-scale-slider"
          aria-label="Icon scale"
        />

        <span className="cs-icon-scale-value">
          {Math.round(iconSize)}px
        </span>

      </div>

    </div>
  );
}

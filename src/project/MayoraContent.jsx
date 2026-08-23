import React from 'react';

import holohealthGif from '../assets/images/case-study/holohealth.gif';
import holohealthGif4 from '../assets/images/case-study/holohealth4.gif';

import holohealthTest1 from '../assets/images/case-study/holohealth-test1.jpg';
import holohealthTest2 from '../assets/images/case-study/holohealth-test2.jpg';
import holohealthTest3 from '../assets/images/case-study/holohealth-test3.jpg';

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
  'Electrolyte Imbalance',,
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
              HoloHealth — Visual Language
            </p>

            <h1 className="cs-title">
              Translating Veterinary complexity into Visual Language
            </h1>

            <p className="cs-lead">
              A 2,500+ icon system that turns highly specific veterinary
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
      <b>HoloHealth</b> is a forward-thinking veterinary technology project
      aimed at revolutionizing animal healthcare through the
      convergence of artificial intelligence (AI), neurotechnology,
      and spatial computing.
    </p>

    <p className="cs-body">
      Moving beyond traditional two-dimensional diagnostics, <b>the
      project introduces advanced 3D holographic imaging to
      veterinary medicine.</b> By transforming standard radiology scans
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

<p className="cs-body"> What do these words mean to you? </p>
<p className="cs-body"> To a veterinarian, they represent specific 
  diseases, conditions, symptoms, and health states. 
  But to most people, they can feel complex, unfamiliar, and 
  difficult to understand at a glance. </p> 
<p className="cs-body"> Now imagine thousands of veterinary terms 
  like these — each with its own meaning and medical context. 
  <b>The challenge was not simply organizing this information, 
  but finding a visual way to make it instantly recognizable.</b> </p> 
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
              title="My role"
            />

            <div className="cs-copy-stack">

              <p className="cs-body">
                I worked directly with the founder to turn complex
                veterinary content into visual concepts that were
                understandable to users while staying aligned with the
                brand. I also supervised a second designer — reviewing
                execution and maintaining consistency as the system grew —
                and produced reference assets for cross-functional teams,
                including material later developed into motion.
              </p>

            </div>

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

            <Figure
              src={holohealthTest3}
              alt="HoloHealth visual design explorations"
              caption="Early explorations showing how veterinary concepts were translated into a clear visual language."
            />

          </section>


          {/* =====================================================
              03 — KEY DECISIONS
          ===================================================== */}

          <section className="cs-section">

            <SectionHeading
              number="03"
              title="Make complex feel familiar"
              subtitle="Reduce cognitive load without reducing meaning."
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

            <blockquote className="cs-quote">
              The goal wasn't to make every concept look the same. It
              was to make every concept feel like it belongs to the same
              visual language.
            </blockquote>

            <Figure
              src={holohealthTest2}
              alt="HoloHealth visual system and icon details"
              caption="A selection of icons across different veterinary subjects, following the same underlying visual logic."
            />

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
                  Icons
                </span>

              </div>

              <p className="cs-body cs-outcome-copy">
                <strong>
                  2,500+ icons
                </strong>{' '}
                became the foundation for a scalable product visual
                system, covering multiple species, conditions,
                behaviors, medications, devices, services, and health
                states. The master icons became production references,
                illustration foundations, and part of the broader
                HoloHealth design system. I reviewed production output,
                resolved inconsistencies, and introduced new solutions
                when existing rules weren't enough — helping the
                language scale across the design team and
                cross-functional product work.
              </p>

            </div>

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
          STATUS BAR
      ========================================================= */}

      <div className="casestudy-statusbar">

        <div className="casestudy-status-item">
          HoloHealth — Translating Veterinary Complexity Into Visual Language
        </div>

        <div className="casestudy-status-item casestudy-status-ready">
          Ready
        </div>

      </div>


      {/* =========================================================
          COMPONENT STYLES
      ========================================================= */}

      <style>{`

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
  display: block;

  width: 100%;
  min-width: 0;

  padding: 0;
  margin: 0;

  background: transparent;
  border: 0;

  font-family:
    var(--casestudy-font-heading);

  font-size:
    clamp(22px, 2.2vw, 32px);

  line-height: 1.15;

  letter-spacing:
    -0.035em;

  font-weight: 600;

  color:
    #f5f5f2;

  text-align: center;

  white-space: nowrap;

  overflow: hidden;

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

          flex: 0 0 auto;

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          min-width: 128px;

          padding:
            18px 20px;

          background:
            #0d0d0d;

          border:
            1px solid var(--cs-line);

          text-align: left;
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

.cs-term-row {
    grid-template-columns: 1fr;

    row-gap: 14px;
  }

  .cs-term:nth-child(n + 5) {
    display: none;
  }

  .cs-term:nth-child(1),
  .cs-term:nth-child(2),
  .cs-term:nth-child(3),
  .cs-term:nth-child(4) {
    text-align: center;
  }

  .cs-term {
    font-size: 24px;
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
  scrambleDuration = 1050,
}) {
  const [current, setCurrent] = React.useState(terms[0]);
  const [isScrambling, setIsScrambling] = React.useState(false);

  const randomTerm = React.useCallback(() => {
    if (!terms.length) return;

    const availableTerms = terms.filter(
      (term) => term !== current
    );

    const nextTerm =
      availableTerms[
        Math.floor(Math.random() * availableTerms.length)
      ];

    setIsScrambling(true);

    const startTime = Date.now();

    const scramble = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= scrambleDuration) {
        setCurrent(nextTerm);
        setIsScrambling(false);
        return;
      }

      const randomText =
        terms[Math.floor(Math.random() * terms.length)];

      setCurrent(randomText);

      const progress = elapsed / scrambleDuration;

      const delay =
        35 + Math.pow(progress, 2) * 140;

      setTimeout(scramble, delay);
    };

    scramble();
  }, [terms, current, scrambleDuration]);

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
        isScrambling ? 'cs-term-scrambling' : ''
      }`}
    >
      {current}
    </span>
  );
}


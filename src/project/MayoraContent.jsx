import React from 'react';
import CaseStudyNavbar from './CaseStudyNavbar';

const NOTION_URL =
  'https://honorable-slicer-cf7.notion.site/Mayora-Unwrapped-Strategic-Social-Media-in-Action-2d13e6c89623802aaf4fe1ed7c23ae28';

export default function MayoraCaseStudyRetro() {
  return (
    <div className="casestudy-window">
      <CaseStudyNavbar
        current="Mayora"
        sections={[
          { id: 'hero', label: 'Overview' },
          { id: 'case-study', label: 'Full Case Study' },
        ]}
      />

      <main className="casestudy">
        <div className="casestudy-container">
          {/* =====================================================
              HERO
          ===================================================== */}
          <section className="cs-hero" id="hero">
            <p className="cs-eyebrow">Mayora — Social Media Strategy</p>

            <h1 className="cs-title">
              Growing a Brand Community Through Strategic Social Media
            </h1>

            <p className="cs-lead">
              A social media case study covering content strategy,
              experimentation, and scalable visual systems that helped grow
              Mayora&apos;s community from <strong>40K to 100K followers</strong>.
            </p>
          </section>

          {/* =====================================================
              FULL CASE STUDY HANDOFF
          ===================================================== */}
          <section className="cs-section cs-section-last" id="case-study">

            <div className="cs-copy-stack">
              <p className="cs-body">
                The original Mayora case study is already documented in more
                detail on Notion, including the strategic thinking, content
                experiments, visual approach, and the work behind growing the
                community.
              </p>

              <p className="cs-body">
                Rather than duplicate the entire story here right now, this page
                acts as a bridge to the existing case study while I continue
                rebuilding the portfolio around the new Perdana&apos;s Computer
                experience.
              </p>
            </div>

            <div className="cs-notion-panel">
              <div className="cs-notion-panel-header">
                <span className="cs-notion-icon" aria-hidden="true">
                  N
                </span>

                <div>
                  <p className="cs-notion-label">FULL CASE STUDY</p>
                  <h3 className="cs-notion-title">
                    Mayora Unwrapped — Strategic Social Media in Action
                  </h3>
                </div>
              </div>

              <p className="cs-notion-description">
                Read the complete case study on Notion for the full context,
                process, experiments, and outcome.
              </p>

              <a
                className="cs-link"
                href={NOTION_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the full case study on Notion ↗
              </a>
            </div>

            <blockquote className="cs-quote">
              The website version is intentionally short for now. The deeper
              story is already written — it just lives somewhere else.
            </blockquote>
          </section>
        </div>
      </main>

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
          --cs-green: #35c77a;

          width: 100%;
          min-height: 520px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background: var(--cs-bg);
          color: var(--cs-ink);

          border-color: #444 #222 #222 #444;
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
        .casestudy-window dl {
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

          font-family: var(--casestudy-font-reading);
          color: var(--cs-body);
          text-align: left;

          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .casestudy-container {
          width: min(55%, calc(100% - 64px));
          min-width: 320px;

          margin: 0 auto;
          padding: 40px 0 50px;

          text-align: left;
        }

        /* =========================================================
           HERO
        ========================================================= */

        .cs-hero {
          padding-bottom: 30px;
          border-bottom: 1px solid var(--cs-line);
          text-align: left;
        }

        .cs-eyebrow {
          display: flex;
          align-items: center;
          justify-content: flex-start;

          margin-bottom: 18px !important;

          font-family: var(--casestudy-font-ui);
          font-size: var(--casestudy-font-ui-size);
          line-height: var(--casestudy-font-ui-line-height);
          letter-spacing: var(--casestudy-font-ui-letter-spacing);

          color: var(--cs-muted);
          text-align: left;
        }

        .cs-title {
          margin: 0 0 22px !important;

          font-family: var(--casestudy-font-heading);
          font-style: normal;
          font-weight: 700;
          font-size: var(--casestudy-font-hero-size);
          line-height: 1.04;
          letter-spacing: var(--casestudy-font-hero-letter-spacing);

          color: var(--cs-ink);
          text-align: left;
        }

        .cs-lead {
          margin: 0 0 40px !important;

          font-family: var(--casestudy-font-reading);
          font-style: normal;
          font-weight: 400;
          font-size: var(--casestudy-font-reading-large-size);
          line-height: 1.55;
          letter-spacing: var(--casestudy-font-reading-large-letter-spacing);

          color: #d0d0cd;
          text-align: left;
        }

        .cs-lead strong {
          color: var(--cs-ink);
          font-family: var(--casestudy-font-heading);
          font-weight: var(--casestudy-font-heading-weight);
        }

        /* =========================================================
           PROJECT CARD
        ========================================================= */

        .cs-project-card {
          width: 100%;
          margin: 0 0 34px;

          border: 1px solid var(--cs-line);
          background: #090909;
        }

        .cs-project-card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;

          padding: 9px 12px;
          border-bottom: 1px solid var(--cs-line);

          font-family: var(--casestudy-font-mono);
          font-size: var(--casestudy-font-mono-size);
          line-height: var(--casestudy-font-mono-line-height);
          letter-spacing: var(--casestudy-font-mono-letter-spacing);
          color: var(--cs-faint);
        }

        .cs-project-card-content {
          min-height: 220px;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;

          padding: 32px;

          background:
            linear-gradient(
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );
          background-size: 24px 24px;
        }

        .cs-project-card-kicker {
          margin-bottom: 10px;

          font-family: var(--casestudy-font-heading);
          font-size: clamp(34px, 7vw, 72px);
          line-height: 0.9;
          font-weight: 700;
          letter-spacing: -0.06em;

          color: var(--cs-ink);
        }

        .cs-project-card-content p {
          max-width: 600px;

          font-family: var(--casestudy-font-ui);
          font-size: var(--casestudy-font-ui-reading-size);
          line-height: 1.5;
          color: var(--cs-muted);
        }

        /* =========================================================
           META
        ========================================================= */

        .cs-meta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;

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

          font-family: var(--casestudy-font-ui);
          font-size: var(--casestudy-font-ui-size);
          line-height: var(--casestudy-font-ui-line-height);
          letter-spacing: 0.06em;

          color: var(--cs-faint);
          text-transform: uppercase;
          text-align: left;
        }

        .cs-meta-value {
          display: block;

          font-family: var(--casestudy-font-ui);
          font-size: var(--casestudy-font-ui-reading-size);
          line-height: 1.45;
          letter-spacing: var(--casestudy-font-ui-letter-spacing);
          font-weight: 400;

          color: var(--cs-ink);
          text-align: left;
        }

        /* =========================================================
           SECTIONS
        ========================================================= */

        .cs-section {
          padding: 56px 0;
          border-bottom: 1px solid var(--cs-line);
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
          margin-bottom: 30px !important;
          text-align: left;
        }

        .cs-section-title {
          margin: 0 !important;

          font-family: var(--casestudy-font-heading);
          font-style: normal;
          font-weight: var(--casestudy-font-heading-weight);
          font-size: 21px;
          line-height: 1.3;
          letter-spacing: var(--casestudy-font-heading-letter-spacing);

          color: var(--cs-ink);
          text-align: left;
        }

        .cs-section-number {
          display: inline-block;
          margin-right: 10px;

          font-family: var(--casestudy-font-mono);
          font-size: var(--casestudy-font-mono-size);
          line-height: var(--casestudy-font-mono-line-height);
          letter-spacing: var(--casestudy-font-mono-letter-spacing);

          color: var(--cs-faint);
          text-align: left;
        }

        .cs-section-subtitle {
          margin: 9px 0 0 !important;

          font-family: var(--casestudy-font-reading);
          font-size: var(--casestudy-font-reading-size);
          line-height: 1.55;
          letter-spacing: var(--casestudy-font-reading-letter-spacing);

          color: var(--cs-muted);
          text-align: left;
        }

        /* =========================================================
           COPY
        ========================================================= */

        .cs-copy-stack {
          display: flex;
          flex-direction: column;
          gap: 22px;
          margin-bottom: 30px;
        }

        .cs-body {
          margin: 0 !important;

          font-family: var(--casestudy-font-reading);
          font-style: normal;
          font-weight: 400;
          font-size: var(--casestudy-font-reading-size);
          line-height: 1.7;
          letter-spacing: var(--casestudy-font-reading-letter-spacing);

          color: var(--cs-body);
          text-align: left;
        }

        /* =========================================================
           NOTION PANEL
        ========================================================= */

        .cs-notion-panel {
          margin: 34px 0 0;
          padding: 24px;

          background: #0d0d0d;
          border: 1px solid var(--cs-line);
        }

        .cs-notion-panel-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .cs-notion-icon {
          flex: 0 0 42px;
          width: 42px;
          height: 42px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          background: var(--cs-ink);
          color: #080808;
          border-radius: 4px;

          font-family: Georgia, serif;
          font-size: 25px;
          line-height: 1;
          font-weight: 700;
        }

        .cs-notion-label {
          margin-bottom: 5px !important;

          font-family: var(--casestudy-font-mono);
          font-size: var(--casestudy-font-mono-size);
          line-height: var(--casestudy-font-mono-line-height);
          letter-spacing: var(--casestudy-font-mono-letter-spacing);

          color: var(--cs-green);
        }

        .cs-notion-title {
          margin: 0;

          font-family: var(--casestudy-font-heading);
          font-size: var(--casestudy-font-reading-large-size);
          line-height: 1.35;
          font-weight: var(--casestudy-font-heading-weight);
          letter-spacing: var(--casestudy-font-heading-letter-spacing);

          color: var(--cs-ink);
        }

        .cs-notion-description {
          margin: 0 0 22px !important;

          font-family: var(--casestudy-font-reading);
          font-size: var(--casestudy-font-reading-size);
          line-height: 1.65;
          letter-spacing: var(--casestudy-font-reading-letter-spacing);

          color: var(--cs-muted);
        }

        /* =========================================================
           LINK
        ========================================================= */

        .cs-link {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;

          padding: 10px 16px;

          background: #f2f2ef;
          border: 2px solid #f2f2ef;

          font-family: var(--casestudy-font-ui);
          font-size: var(--casestudy-font-ui-reading-size);
          line-height: 1.4;
          font-weight: 500;

          color: #080808;
          text-decoration: none;
          text-align: left;

          transition:
            background 140ms ease,
            color 140ms ease;
        }

        .cs-link:hover {
          background: transparent;
          color: #f2f2ef;
        }

        /* =========================================================
           QUOTE
        ========================================================= */

        .cs-quote {
          margin: 38px 0 !important;
          padding: 4px 0 4px 20px;

          border-left: 2px solid var(--cs-green);

          font-family: var(--casestudy-font-reading);
          font-size: var(--casestudy-font-reading-large-size);
          line-height: 1.55;
          letter-spacing: var(--casestudy-font-reading-large-letter-spacing);
          font-weight: 400;

          color: #e5e5e1;
          text-align: left;
        }

        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 900px) {
          .casestudy-container {
            width: calc(100% - 48px);
          }

          .cs-meta {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 700px) {
          .casestudy-container {
            width: calc(100% - 40px);
            padding: 48px 0 72px;
          }

          .cs-title {
            font-size: 26px;
            line-height: 1.08;
            letter-spacing: -0.035em;
            margin-bottom: 18px !important;
          }

          .cs-lead {
            font-size: var(--casestudy-font-reading-size);
            line-height: 1.65;
            margin-bottom: 32px !important;
          }

          .cs-project-card-content {
            min-height: 180px;
            padding: 24px;
          }

          .cs-notion-panel {
            padding: 20px;
          }
        }

        @media (max-width: 560px) {
          .casestudy-container {
            width: calc(100% - 32px);
            padding: 40px 0 56px;
          }

          .cs-meta {
            grid-template-columns: 1fr 1fr;
            gap: 22px 16px;
          }

          .cs-section {
            padding: 48px 0;
          }

          .cs-section-heading {
            margin-bottom: 26px !important;
          }

          .cs-copy-stack {
            gap: 20px;
            margin-bottom: 24px;
          }

          .cs-notion-panel-header {
            gap: 12px;
          }

          .cs-notion-icon {
            flex-basis: 36px;
            width: 36px;
            height: 36px;
            font-size: 21px;
          }

          .cs-quote {
            margin: 32px 0 !important;
            padding-left: 16px;
            line-height: 1.5;
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
      <span className="cs-meta-label">{label}</span>
      <span className="cs-meta-value">{children}</span>
    </div>
  );
}

function SectionHeading({ number, title, subtitle }) {
  return (
    <div className="cs-section-heading">
      <h2 className="cs-section-title">
        {number && <span className="cs-section-number">{number}</span>}
        {title}
      </h2>

      {subtitle && <p className="cs-section-subtitle">{subtitle}</p>}
    </div>
  );
}

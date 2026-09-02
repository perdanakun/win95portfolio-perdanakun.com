import React from 'react';

export default function TravelXXXProductRequirements() {
  const sectionStyle = {
    marginTop: '0',
    marginBottom: '24px',
  };

  const headingStyle = {
    fontSize: '18px',
    lineHeight: '24px',
    margin: '0 0 12px',
  };

  const contentIndentStyle = {
    paddingLeft: '20px',
  };

  const paragraphStyle = {
    margin: '0 0 16px',
  };

  const listStyle = {
    margin: '4px 0 16px',
    paddingLeft: '22px',
  };

  const listItemStyle = {
    marginBottom: '8px',
  };

    const metaGridStyle = {
    display: 'grid',
    gridTemplateColumns: '100px minmax(0, 1fr)',
    columnGap: '16px',
    rowGap: '14px',
    marginTop: '20px',
  };

  const metaLabelStyle = {
    margin: 0,
    fontWeight: 700,
  };

  const metaValueStyle = {
    margin: 0,
  };

  const subheadingStyle = {
    fontSize: '14px',
    lineHeight: '22px',
    margin: '20px 0 4px',
  };

  const quoteStyle = {
    margin: '20px 0',
    padding: '12px 16px',
    borderLeft: '4px solid #808080',
    background: '#f5f5f5',
  };

  const tableStyle = {
    width: '100%',
    minWidth: '620px',
    borderCollapse: 'collapse',
    fontSize: '13px',
    lineHeight: '18px',
  };

  const tableHeaderStyle = {
    border: '1px solid #c0c0c0',
    padding: '10px',
    textAlign: 'left',
    verticalAlign: 'top',
    background: '#f5f5f5',
  };

  const tableCellStyle = {
    border: '1px solid #c0c0c0',
    padding: '10px',
    verticalAlign: 'top',
  };

  return (
    <article
      className="casestudy casestudy-reading"
      style={{
        width: '100%',
        maxWidth: '760px',
        margin: '0 auto',
        padding: '12px 16px 40px',
        boxSizing: 'border-box',
      }}
    >
      {/* =========================================================
          HERO
      ========================================================= */}

      <header
        style={{
          marginBottom: '32px',
        }}
      >
        <h1
          className="casestudy-heading"
          style={{
            fontSize: '28px',
            lineHeight: '34px',
            margin: '0 0 8px',
          }}
        >
          TravelXXX - Overview Documents
        </h1>

        <p
          className="casestudy-mono-muted"
          style={{
            margin: '0 0 24px',
          }}
        >
          A solo product design case study
        </p>

        <p style={paragraphStyle}>
          This isn&apos;t a client brief — it&apos;s the scope document I set
          for myself before building. As a solo designer-engineer, this played
          the role a PRD normally plays in a team: the point where research
          turns into decisions, and decisions turn into what actually gets
          built.
        </p>
        {/* =========================================================
            PROJECT INFO
        ========================================================= */}

        <section
          style={{
            ...sectionStyle,
            paddingBottom: '24px',
            borderTop: '1px solid #c0c0c0',
            borderBottom: '1px solid #c0c0c0',
          }}
        >
          <div style={metaGridStyle}>
            <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Project
            </p>

            <p style={metaValueStyle}>
              Personal / portfolio project
            </p>

            <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Setup
            </p>

            <p style={metaValueStyle}>
              Solo, without real product stakeholders
            </p>

             <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Duration
            </p>

            <p style={metaValueStyle}>
              30 August 2026 - TBD (ongoing)
            </p>

            <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Purpose
            </p>

            <p style={metaValueStyle}>
              Develop and demonstrate an AI-native Product Design + Design
              Engineering workflow
            </p>

            
            <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Status
            </p>

            <p style={metaValueStyle}>
              Currently in Phase 2+3 (Generative Blueprinting + Code-Prototype Execution)
            </p>
          </div>
        </section>
        
      </header>

      {/* =========================================================
          THE PROBLEM
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          The Problem
        </h2>

        <div style={contentIndentStyle}>
          <p style={paragraphStyle}>
            Travelers comparing hotels on an OTA constantly lose confidence in
            what they&apos;re paying — prices shift between browsing and
            checkout, and comparing multiple hotels means manually reopening
            tabs to track price, tier, and features side by side.
          </p>

          <p style={paragraphStyle}>
            Many travelers also don&apos;t know which hotel or area fits them
            in the first place, since their main source of inspiration — social
            media — is trend-driven, not personal.
          </p>

          <p style={paragraphStyle}>
            Existing OTAs offer no structured way to compare options
            transparently, or to explore destinations based on individual taste
            rather than what&apos;s viral.
          </p>
        </div>
      </section>

      {/* =========================================================
          HOW MIGHT WE
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          How Might We
        </h2>

        <div style={contentIndentStyle}>
          <ol style={listStyle}>
            <li style={listItemStyle}>
              <strong>
                Help travelers compare hotels — price and features —
                transparently and easily, without juggling tabs?
              </strong>
            </li>

            <li style={listItemStyle}>
              Help travelers find a hotel that fits their own holiday profile,
              not just what&apos;s trending on social media?
            </li>

            <li style={listItemStyle}>
              Give travelers a &quot;for you&quot;-style discovery experience —
              hotel recommendations based on places and vibes they&apos;re drawn
              to, the way they already browse social content?
            </li>
          </ol>

          <blockquote style={quoteStyle}>
            <p style={{ margin: 0 }}>
              <strong>Priority note:</strong> comparison started as a supporting
              feature. After deeper research and early implementation, it turned
              out to be the most unique and powerful part of the concept — no
              strong precedent exists in mainstream OTAs — so I re-scoped it as
              the primary feature. Everything else now supports it.
            </p>
          </blockquote>
        </div>
      </section>

      {/* =========================================================
          SCOPE V1
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          Scope v1
        </h2>

        <div style={contentIndentStyle}>
          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              margin: '20px 0',
            }}
          >
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>
                    Priority
                  </th>

                  <th style={tableHeaderStyle}>
                    Feature
                  </th>

                  <th style={tableHeaderStyle}>
                    Role
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td style={tableCellStyle}>
                    <strong>1 — Core differentiator</strong>
                  </td>

                  <td style={tableCellStyle}>
                    <strong>Compare hotels</strong> — price + feature
                    comparison, side-by-side, &quot;add to cart&quot; pattern
                    borrowed from e-commerce
                  </td>

                  <td style={tableCellStyle}>
                    The core value proposition
                  </td>
                </tr>

                <tr>
                  <td style={tableCellStyle}>
                    <strong>2 — Supporting</strong>
                  </td>

                  <td style={tableCellStyle}>
                    <strong>Holiday profile onboarding</strong> — a short survey
                    (budget, ambience, activities)
                  </td>

                  <td style={tableCellStyle}>
                    Personalizes comparison and discovery, not a standalone gate
                  </td>
                </tr>

                <tr>
                  <td style={tableCellStyle}>
                    <strong>3 — Discovery layer</strong>
                  </td>

                  <td style={tableCellStyle}>
                    <strong>&quot;For You&quot; explore feed</strong> —
                    social-style browsing of places/vibes, linked directly to
                    hotel recommendations nearby
                  </td>

                  <td style={tableCellStyle}>
                    Meets travelers where their actual habits already are
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUCCESS
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          Success Looks Like
        </h2>

        <div style={contentIndentStyle}>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              Travelers don&apos;t leave the platform to research elsewhere
              (no tab-switching to social media or competitor OTAs)
            </li>

            <li style={listItemStyle}>
              Travelers move from browsing to a decision without repeated
              hesitation or backtracking
            </li>

            <li style={listItemStyle}>
              Travelers are satisfied with the initial personalized
              recommendations, without needing to manually search for
              alternative areas
            </li>
          </ul>
        </div>
      </section>

      {/* =========================================================
          CONSTRAINTS
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          Constraints
        </h2>

        <div style={contentIndentStyle}>
          <p style={paragraphStyle}>
            Solo project, no real business data (uses labeled assumptions and
            industry benchmarks instead), limited secondary research, and
            usability testing limited to a small personal circle rather than a
            formal study.
          </p>
        </div>
      </section>
    </article>
  );
}
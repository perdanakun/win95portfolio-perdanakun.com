import React from 'react';

export default function PerdanaComputerOverviewContent() {
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

  const quoteStyle = {
    margin: '20px 0',
    padding: '12px 16px',
    borderLeft: '4px solid #808080',
    background: '#f5f5f5',
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
            margin: '0 0 6px',
          }}
        >
          Perdana&apos;s Computer
        </h1>

        <h2
          className="casestudy-heading"
          style={{
            fontSize: '18px',
            lineHeight: '24px',
            margin: '0 0 20px',
          }}
        >
          Turning a Portfolio Into a Product
        </h2>

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
              Role
            </p>

            <p style={metaValueStyle}>
              Solo Product Designer &amp; Design Engineer
            </p>

            <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Duration
            </p>

            <p style={metaValueStyle}>
              7–26 August 2026
            </p>

            <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Scope
            </p>

            <p style={metaValueStyle}>
              Discovery · UX · UI · Interaction Design · Development ·
              Testing · Iteration
            </p>

            <p
              className="casestudy-heading"
              style={metaLabelStyle}
            >
              Status
            </p>

            <p style={metaValueStyle}>
              Initial release · Ongoing iteration
            </p>
          </div>
        </section>

        <p style={paragraphStyle}>
          Perdana&apos;s Computer is an interactive portfolio designed
          and built as a working product to support my transition from
          Visual Design into Product Design and Design Engineering.
        </p>

        <p style={paragraphStyle}>
          The challenge was not simply to make something different. It
          was to create a portfolio that could stand out in a crowded
          hiring process{' '}
          <strong>
            without making recruiters work harder to understand the
            candidate.
          </strong>
        </p>
      </header>

      {/* =========================================================
          PROBLEM
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
            As a career pivoter, a conventional portfolio could show
            what I had done before, but it gave me limited room to
            demonstrate how I think, solve problems, design
            interactions, and turn those decisions into something
            functional.
          </p>

          <p
            className="casestudy-mono-muted"
            style={{
              margin: '20px 0 8px',
            }}
          >
            THE HYPOTHESIS
          </p>

          <blockquote style={quoteStyle}>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
              }}
            >
              Could the portfolio itself become part of the evidence?
            </p>
          </blockquote>
        </div>
      </section>

      {/* =========================================================
          APPROACH
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          The Approach
        </h2>

        <div style={contentIndentStyle}>
          <p style={paragraphStyle}>
            I used a Windows 95-inspired desktop as the product
            environment, borrowing familiar concepts such as folders,
            windows, files, and a taskbar rather than inventing an
            entirely new navigation model.
          </p>

          <p style={paragraphStyle}>
            From there, the portfolio grew into a functional system:
          </p>

          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong>Project Explorer</strong> for browsing work and
              case studies
            </li>

            <li style={listItemStyle}>
              <strong>AI Chat</strong> as a shortcut for visitors with
              limited time
            </li>

            <li style={listItemStyle}>
              <strong>Inbox</strong> for contacting me directly from the
              website
            </li>

            <li style={listItemStyle}>
              <strong>Installer &amp; Welcome flows</strong> for
              introducing the person behind the work
            </li>

            <li style={listItemStyle}>
              <strong>Working desktop interactions</strong> built in
              React
            </li>
          </ul>

          <p style={paragraphStyle}>
            The process moved quickly from basic Figma flows into code,
            using the working product itself as part of the prototyping
            process.
          </p>
        </div>
      </section>

      {/* =========================================================
          TESTING
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          Testing &amp; Iteration
        </h2>

        <div style={contentIndentStyle}>
          <p style={paragraphStyle}>
            I used repeated task-based usability testing with one
            participant to catch friction while features were being
            built.
          </p>

          <p style={paragraphStyle}>
            The tests surfaced several concrete problems:
          </p>

          <div
            style={{
              marginTop: '20px',
            }}
          >
            <h3
              className="casestudy-heading"
              style={{
                ...subheadingStyle,
                marginTop: 0,
              }}
            >
              Project navigation
            </h3>

            <p style={paragraphStyle}>
              Deeper folder structures made it difficult to understand
              the current location, leading to the addition of a folder
              tree and clearer path controls.
            </p>

            <h3
              className="casestudy-heading"
              style={subheadingStyle}
            >
              Mobile interaction
            </h3>

            <p style={paragraphStyle}>
              Desktop-style double-click behavior did not translate
              naturally to touch, highlighting where the Windows
              metaphor needed to adapt rather than be copied literally.
            </p>

            <h3
              className="casestudy-heading"
              style={subheadingStyle}
            >
              AI Chat
            </h3>

            <p style={paragraphStyle}>
              Users naturally expected a real conversation, but the
              first template-based implementation could not meet that
              expectation. The feature was rebuilt around Gemini and
              structured portfolio data.
            </p>

            <h3
              className="casestudy-heading"
              style={subheadingStyle}
            >
              Contact flow
            </h3>

            <p style={paragraphStyle}>
              Required email validation created enough friction for the
              participant to abandon the task, revealing a trade-off
              between message completion and my need for a reply
              address.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SHIPPED
      ========================================================= */}

      <section style={sectionStyle}>
        <h2
          className="casestudy-heading"
          style={headingStyle}
        >
          What Shipped
        </h2>

        <div style={contentIndentStyle}>
          <p style={paragraphStyle}>
            In roughly three weeks, the project moved from an initial
            hypothesis and basic wireframe into a working React
            portfolio with:
          </p>

          <p
            className="casestudy-mono"
            style={{
              margin: '20px 0',
              padding: '10px 12px',
              background: '#f2f2f2',
              border: '1px solid #c0c0c0',
            }}
          >
            React · React95 · JavaScript · Gemini API · Resend ·
            localStorage
          </p>

          <p style={paragraphStyle}>
            The result is not a finished experiment.
          </p>

          <p style={paragraphStyle}>
            The product still needs testing with its real target
            audience — recruiters, hiring managers, and design leads —
            and its most important business hypothesis has not yet been
            proven:
          </p>

          <blockquote style={quoteStyle}>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
              }}
            >
              Can this portfolio help the right person understand my
              capabilities well enough to start the next conversation?
            </p>
          </blockquote>
        </div>
      </section>
    </article>
  );
}
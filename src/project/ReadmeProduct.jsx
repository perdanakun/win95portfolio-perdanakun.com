import React, { useState } from 'react';

export default function ReadmeProduct() {
  const workflow = [
    {
      id: '01',
      title: 'Observe',
      signal: 'Find the opportunity',
      description:
        'Start with an observed behavior, friction, market pattern, or product gap instead of jumping straight into a solution.',
      focus: 'User problem · Product context · Business opportunity',
    },
    {
      id: '02',
      title: 'Hypothesize',
      signal: 'Turn observation into an assumption',
      description:
        'Form a clear hypothesis about what may be happening, who it affects, and why solving it could matter.',
      focus: 'Problem framing · Assumptions · User & business value',
    },
    {
      id: '03',
      title: 'Validate',
      signal: 'Look for evidence',
      description:
        'Use lightweight research, competitive evidence, reviews, or conversations with relevant users to challenge the initial assumption.',
      focus: 'Secondary research · User conversations · Evidence',
    },
    {
      id: '04',
      title: 'Define',
      signal: 'Narrow the problem',
      description:
        'Translate what was learned into a focused product opportunity, target context, core user flow, and realistic scope.',
      focus: 'Problem definition · Scope · User flow · Success hypothesis',
    },
    {
      id: '05',
      title: 'Explore',
      signal: 'Consider multiple directions',
      description:
        'Sketch and prototype more than one possible approach before committing to the first idea.',
      focus: 'Ideation · Flows · Wireframes · Alternatives',
    },
    {
      id: '06',
      title: 'Decide',
      signal: 'Make the trade-off',
      description:
        'Choose a direction based on the strongest balance between user value, business value, and feasibility.',
      focus: 'Prioritization · Trade-offs · Design rationale',
    },
    {
      id: '07',
      title: 'Design',
      signal: 'Shape the experience',
      description:
        'Turn the chosen direction into a clear interface and interaction system, using visual craft to support usability rather than decorate it.',
      focus: 'UX · UI · Interaction · Components · Visual hierarchy',
    },
    {
      id: '08',
      title: 'Test',
      signal: 'Put the solution in front of users',
      description:
        'Use task-based usability testing to find where people hesitate, misunderstand, fail, or behave differently from the assumption.',
      focus: 'Prototype testing · Usability · Behavioral evidence',
    },
    {
      id: '09',
      title: 'Iterate',
      signal: 'Respond to what changed',
      description:
        'Connect findings to design decisions and revise the product instead of treating the first polished version as final.',
      focus: 'Finding → Decision → Revision',
    },
    {
      id: '10',
      title: 'Ship',
      signal: 'Make it usable',
      description:
        'Move the strongest version toward a working prototype or real product when implementation helps test the experience more honestly.',
      focus: 'Delivery · Implementation · Design in code',
    },
    {
      id: '11',
      title: 'Reflect',
      signal: 'State what is still unknown',
      description:
        'Document what worked, what remains unvalidated, and what should be tested or improved next without inventing impact.',
      focus: 'Learnings · Limitations · Next step',
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const sectionStyle = {
    marginTop: '0',
    marginBottom: '28px',
  };

  const headingStyle = {
    fontSize: '18px',
    lineHeight: '24px',
    margin: '0 0 12px',
  };

  const paragraphStyle = {
    margin: '0 0 16px',
  };

  const quoteStyle = {
    margin: '20px 0',
    padding: '12px 16px',
    borderLeft: '4px solid #808080',
    background: '#f5f5f5',
  };

  const workflowGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(116px, 1fr))',
    gap: '8px',
    margin: '18px 0 12px',
  };

  const active = workflow[activeStep];

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

      <header style={{ marginBottom: '30px' }}>
        <p
          className="casestudy-mono-muted"
          style={{
            margin: '0 0 8px',
          }}
        >
          PRODUCT DESIGN / README.TXT
        </p>

        <h1
          className="casestudy-heading"
          style={{
            fontSize: '28px',
            lineHeight: '34px',
            margin: '0 0 6px',
          }}
        >
          How I Approach Product Design
        </h1>

        <p
          style={{
            ...paragraphStyle,
            marginTop: '18px',
          }}
        >
          My background is in Visual Design, where I spent years working
          directly with clients and stakeholders — understanding problems,
          navigating constraints, exploring directions, responding to
          feedback, and delivering real work.
        </p>

        <p style={paragraphStyle}>
          As I move into Product Design, I&apos;m combining that experience
          with the product and UX practices I&apos;m learning: problem
          framing, research, user flows, prototyping, usability testing,
          iteration, and consideration of both user and business value.
        </p>

        <blockquote style={quoteStyle}>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
            }}
          >
            I use frameworks as references, not checklists. The goal is to
            reduce uncertainty, make better decisions, and move the product
            forward.
          </p>
        </blockquote>
      </header>

      {/* =========================================================
          WORKFLOW
      ========================================================= */}

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          The Workflow
        </h2>

        <p style={paragraphStyle}>
          The exact process changes with the problem, but most projects move
          through some version of this:
        </p>

        <div
          role="list"
          aria-label="Product design workflow"
          style={workflowGridStyle}
        >
          {workflow.map((step, index) => {
            const isActive = index === activeStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(index)}
                aria-pressed={isActive}
                style={{
                  minHeight: '66px',
                  padding: '9px 10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  font: 'inherit',
                  color: '#000',
                  background: isActive ? '#000080' : '#f2f2f2',
                  borderTop: isActive
                    ? '2px solid #000'
                    : '2px solid #ffffff',
                  borderLeft: isActive
                    ? '2px solid #000'
                    : '2px solid #ffffff',
                  borderRight: isActive
                    ? '2px solid #ffffff'
                    : '2px solid #808080',
                  borderBottom: isActive
                    ? '2px solid #ffffff'
                    : '2px solid #808080',
                  boxShadow: isActive
                    ? 'inset 1px 1px 0 #808080'
                    : 'inset -1px -1px 0 #c0c0c0',
                }}
              >
                <span
                  className="casestudy-mono-muted"
                  style={{
                    display: 'block',
                    marginBottom: '4px',
                    color: isActive ? '#ffffff' : undefined,
                    opacity: isActive ? 0.8 : 1,
                  }}
                >
                  {step.id}
                </span>

                <strong
                  className="casestudy-heading"
                  style={{
                    display: 'block',
                    color: isActive ? '#ffffff' : '#000000',
                  }}
                >
                  {step.title}
                </strong>
              </button>
            );
          })}
        </div>

        {/* ACTIVE STEP DETAIL */}

        <div
          style={{
            marginTop: '10px',
            border: '1px solid #808080',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              padding: '7px 10px',
              background: '#000080',
              color: '#ffffff',
              fontWeight: 700,
            }}
          >
            {active.id} — {active.title}
          </div>

          <div
            style={{
              padding: '14px 16px 16px',
            }}
          >
            <p
              className="casestudy-heading"
              style={{
                margin: '0 0 8px',
                fontSize: '15px',
                lineHeight: '22px',
              }}
            >
              {active.signal}
            </p>

            <p style={{ margin: '0 0 12px' }}>
              {active.description}
            </p>

            <p
              className="casestudy-mono-muted"
              style={{
                margin: 0,
                paddingTop: '10px',
                borderTop: '1px solid #d0d0d0',
              }}
            >
              {active.focus}
            </p>
          </div>
        </div>

        <p
          className="casestudy-mono-muted"
          style={{
            margin: '10px 0 0',
          }}
        >
          Click a step to inspect it.
        </p>
      </section>

      {/* =========================================================
          PRINCIPLE
      ========================================================= */}

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          A Practical Process
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '10px',
          }}
        >
          {[
            ['Research', 'Reduce uncertainty before committing to a direction.'],
            ['Artifacts', 'Create them when they help make or communicate a decision.'],
            ['Visual craft', 'Use it to improve clarity, hierarchy, and interaction.'],
            ['Testing', 'Challenge the solution rather than defend it.'],
            ['Code', 'Use it when a working interaction teaches more than another mockup.'],
            ['Reflection', 'Be explicit about what is proven and what is still unknown.'],
          ].map(([title, text]) => (
            <div
              key={title}
              style={{
                padding: '12px',
                background: '#f5f5f5',
                border: '1px solid #c0c0c0',
              }}
            >
              <strong
                className="casestudy-heading"
                style={{
                  display: 'block',
                  marginBottom: '5px',
                }}
              >
                {title}
              </strong>

              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          IN PRACTICE
      ========================================================= */}

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          In Practice
        </h2>

        <p style={paragraphStyle}>
          Not every project needs every step, and the process can move
          backward when new evidence changes the direction.
        </p>

        <p style={paragraphStyle}>
          The case studies in this folder show the process through actual
          decisions: what I observed, what I assumed, what I learned, what
          changed, what I built, and what I would explore next.
        </p>

        <div
          style={{
            marginTop: '18px',
            padding: '12px 14px',
            border: '1px solid #808080',
            background: '#f2f2f2',
          }}
        >
          <p
            className="casestudy-mono-muted"
            style={{
              margin: '0 0 6px',
            }}
          >
            FIRST PROJECT USING THIS APPROACH
          </p>

          <p
            className="casestudy-heading"
            style={{
              margin: '0 0 4px',
              fontWeight: 700,
            }}
          >
            Perdana&apos;s Computer
          </p>

          <p style={{ margin: 0 }}>
            Hypothesis → product decisions → working prototype → usability
            testing → iteration → shipped React product.
          </p>
        </div>
      </section>
    </article>
  );
}

import React from 'react';

import overviewImage from './perdanacomputer/perdanda_overview.png';

export default function PerdanaComputerOverviewContent() {
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
    lineHeight: '1.55',
  };

  const listStyle = {
    margin: '8px 0 16px',
    paddingLeft: '22px',
  };

  const listItemStyle = {
    marginBottom: '10px',
    lineHeight: '1.5',
  };

  const quoteStyle = {
    margin: '16px 0 20px',
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
    lineHeight: '1.45',
  };

  const calloutStyle = {
    margin: '16px 0 20px',
    padding: '12px 14px',
    background: '#f2f2f2',
    border: '1px solid #c0c0c0',
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
      <header style={{ marginBottom: '32px' }}>
        <h1
          className="casestudy-heading"
          style={{
            fontSize: '28px',
            lineHeight: '34px',
            margin: '0 0 6px',
          }}
        >
          Perdana&apos;s Computer — Overview
        </h1>

        <p
          className="casestudy-mono-muted"
          style={{ margin: '0 0 24px' }}
        >
          I&apos;m making the ugliest portfolio ever.
        </p>

        <p style={paragraphStyle}>
          Perdana&apos;s Computer is the portfolio I built for my transition
          from 10 years in Visual Design into Product Design.
        </p>

        <p style={paragraphStyle}>
          The idea started from a simple observation: a lot of portfolios
          today are polished, modern, and functional, but after seeing so many
          of them, they can also start to feel very similar.
        </p>

        <p style={paragraphStyle}>
          I did not want to make something different just for the sake of
          being different. I wanted to see whether a portfolio could be easier
          to explore, more memorable, and still help a busy recruiter quickly
          understand the person behind the work.
        </p>
        
        <div
  style={{
    margin: '24px 0 28px',
  }}
>
  <img
    src={overviewImage}
    alt="Illustration showing repetitive portfolio experiences contrasted with the interactive Perdana's Computer portfolio"
    style={{
      display: 'block',
      width: '100%',
      height: 'auto',
    }}
  />
</div>

        <section
          style={{
            ...sectionStyle,
            paddingBottom: '24px',
            borderTop: '1px solid #c0c0c0',
            borderBottom: '1px solid #c0c0c0',
          }}
        >
          <div style={metaGridStyle}>
            <p className="casestudy-heading" style={metaLabelStyle}>Role</p>
            <p style={metaValueStyle}>Solo Product Designer &amp; Builder</p>

            <p className="casestudy-heading" style={metaLabelStyle}>Duration</p>
            <p style={metaValueStyle}>August 2026 — ongoing</p>

            <p className="casestudy-heading" style={metaLabelStyle}>Scope</p>
            <p style={metaValueStyle}>
              Product thinking · UX · UI · Interaction · Prototyping ·
              Development · Testing · Iteration
            </p>

            <p className="casestudy-heading" style={metaLabelStyle}>Status</p>
            <p style={metaValueStyle}>Shipped · Still being tested and iterated</p>
          </div>
        </section>
      </header>

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          The Hypothesis
        </h2>

        <p style={paragraphStyle}>
          Recruiters, hiring managers, and design leads often have limited
          time to explore a portfolio. That makes it difficult for them to
          quickly understand not only what a designer has made, but how they
          think, what they can build, and who they are behind the work.
        </p>

        <blockquote style={quoteStyle}>
          <p style={{ margin: 0, fontWeight: 700, lineHeight: '1.5' }}>
            If I can make that information easier to explore through multiple
            paths, visitors should be able to understand my capabilities with
            less effort and be more likely to start a conversation.
          </p>
        </blockquote>
      </section>

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          How Might I
        </h2>

        <blockquote style={quoteStyle}>
          <p style={{ margin: 0, fontWeight: 700, lineHeight: '1.5' }}>
            How might I help recruiters and hiring managers quickly understand
            who I am, what I can do, and how I think, while letting them
            explore the portfolio in the way that works best for them?
          </p>
        </blockquote>
      </section>

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          What Success Means
        </h2>

        <p style={paragraphStyle}>
          The goal is not to treat “getting hired” as the conversion.
        </p>

        <p style={paragraphStyle}>
          For this first version, the objective is smaller and more useful:
          can this portfolio help the right recruiter, hiring manager, or
          design lead understand my background well enough to start a
          conversation?
        </p>

        <div style={calloutStyle}>
          <p className="casestudy-mono" style={{ margin: 0, fontWeight: 700 }}>
            Primary success signal: a relevant conversation or interview.
          </p>
        </div>

        <p style={paragraphStyle}>
          With a background that is not purely Product Design, reaching that
          stage would already mean the portfolio is doing its job.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          Product Direction
        </h2>

        <p style={paragraphStyle}>
          From the hypothesis, two early product decisions became important.
        </p>

        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Give visitors more than one way to understand me.</strong>{' '}
            Some people will browse projects, some will read, and some may
            prefer asking directly.
          </li>

          <li style={listItemStyle}>
            <strong>Make the portfolio intentionally memorable.</strong>{' '}
            Instead of another polished portfolio template, I used an
            imperfect, old-school computer interface inspired by Windows.
          </li>
        </ul>

        <p style={paragraphStyle}>
          The “ugly” direction is intentional. It came from the observation
          that many contemporary portfolios feel highly polished but visually
          similar. I wanted to test whether imperfection, nostalgia, and
          interaction could create stronger recall without making the work
          harder to access.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          The Product
        </h2>

        <p style={paragraphStyle}>
          The result is a working portfolio built as a small product rather
          than a single scrolling page.
        </p>

        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Project Explorer</strong> — lets visitors scan and move
            between projects without leaving the desktop.
          </li>

          <li style={listItemStyle}>
            <strong>AI Chat</strong> — gives busy visitors a conversational
            shortcut to ask about my background, projects, skills, and career
            transition.
          </li>

          <li style={listItemStyle}>
            <strong>Installer</strong> — introduces who I am and what the
            portfolio contains during the first visit, while returning
            visitors can go directly to the desktop.
          </li>

          <li style={listItemStyle}>
            <strong>Inbox</strong> — lets someone start a conversation from
            inside the portfolio.
          </li>

          <li style={listItemStyle}>
            <strong>Writing</strong> — documents the process publicly and
            creates another path for people to discover the work.
          </li>

          <li style={listItemStyle}>
            <strong>Small guides, gimmicks, and easter eggs</strong> — add
            context, personality, and reasons to keep exploring without
            blocking the main portfolio experience.
          </li>
        </ul>

        <p style={paragraphStyle}>
          Each feature is documented separately inside the Features folder,
          including the problem behind it, the decision I made, how it works,
          and what changed when there was something worth iterating.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className="casestudy-heading" style={headingStyle}>
          What Shipped
        </h2>

        <p style={paragraphStyle}>
          The project moved from a rough idea and basic flows into a working
          React portfolio that I continue to use as both a portfolio and a
          learning environment.
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
          React · React95 · JavaScript · Gemini API · Resend · localStorage
        </p>

        <p style={paragraphStyle}>
          The biggest hypothesis is still unproven. The portfolio needs more
          use by its real target audience: recruiters, hiring managers, and
          design leads.
        </p>

        <blockquote style={quoteStyle}>
          <p style={{ margin: 0, fontWeight: 700, lineHeight: '1.5' }}>
            Can this portfolio help the right person understand who I am,
            what I can do, and how I think well enough to start the next
            conversation?
          </p>
        </blockquote>

        <p style={paragraphStyle}>
          That is what I am testing next.
        </p>
      </section>
    </article>
  );
}

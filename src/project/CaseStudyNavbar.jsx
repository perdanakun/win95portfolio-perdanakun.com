import React from 'react';

export default function CaseStudyNavbar({
  current = 'Case Study',
  sections = [],
}) {
  return (
    <>
      <nav className="case-study-navbar">

        <div className="case-study-navbar-links">

          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
            >
              {section.label}
            </a>
          ))}

        </div>

      </nav>

      <style>{`

        /* =====================================================
           CASE STUDY NAVIGATION
        ===================================================== */

        .case-study-navbar {
          position: fixed;

          top: 20%;
          left: 15px;

          z-index: 100;

          width: 180px;

          display: flex;
          flex-direction: column;

          gap: 18px;

          text-align: left;

          font-family: var(--casestudy-font-ui);
        }


        /* =====================================================
           BACK
        ===================================================== */

        .case-study-navbar-back {
          display: inline-flex;
          align-items: center;

          width: fit-content;

          padding: 5px 8px;

          color: var(--pcs-faint, #999995);

          font-size: 10px;
          line-height: 1.4;

          text-decoration: none;

          transition:
            color 160ms ease,
            background 160ms ease;
        }

        .case-study-navbar-back:hover {
          color: var(--pcs-ink, #111);

          background: var(--pcs-bg-soft, #f7f7f5);
        }


        /* =====================================================
           CURRENT PROJECT
        ===================================================== */

        .case-study-navbar-title {
          padding: 0 8px;

          color: var(--pcs-ink, #111);

          font-family: var(--casestudy-font-mono);

          font-size: 9px;
          line-height: 1.4;

          letter-spacing: .08em;

          text-transform: uppercase;
        }


        /* =====================================================
           LINKS
        ===================================================== */

        .case-study-navbar-links {
          display: flex;
          flex-direction: column;

          gap: 2px;
        }

        .case-study-navbar-links a {
          position: relative;

          display: flex;
          align-items: center;

          width: 100%;

          padding: 6px 8px;

          color: var(--pcs-faint, #999995);

          font-size: 10px;
          line-height: 1.4;

          text-decoration: none;

          transition:
            color 160ms ease,
            background 160ms ease;
        }

        .case-study-navbar-links a:hover {
          color: var(--pcs-ink, #111);

          background: var(--pcs-bg-soft, #f7f7f5);
        }


        /* =====================================================
           INDICATOR
        ===================================================== */

        .case-study-navbar-links a::before {
          content: '';

          position: absolute;

          left: -8px;
          top: 50%;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: var(--pcs-ink, #111);

          opacity: 0;

          transform: translateY(-50%);

          transition: opacity 160ms ease;
        }

        .case-study-navbar-links a:hover::before {
          opacity: 1;
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 1200px) {
          .case-study-navbar {
            display: none;
          }
        }

      `}</style>
    </>
  );
}
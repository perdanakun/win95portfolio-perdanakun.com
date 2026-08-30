import React from 'react';

export default function ReadmeProduct() {
  const sectionTitleStyle = {
    fontSize: '18px',
    lineHeight: '24px',
    margin: '28px 0 12px',
  };

  const paragraphStyle = {
    margin: '0 0 14px',
    lineHeight: '20px',
  };

  const listStyle = {
    margin: '0 0 18px',
    paddingLeft: '20px',
    lineHeight: '20px',
  };

  const statusStyle = {
    margin: '0 0 14px',
    lineHeight: '20px',
    fontWeight: 700,
  };

  const codeBlockStyle = {
    margin: '16px 0 20px',
    padding: '14px 16px',
    background: '#f2f2f2',
    border: '1px solid #999',
    whiteSpace: 'pre-wrap',
    overflowX: 'auto',
    fontFamily: 'monospace',
    fontSize: '13px',
    lineHeight: '19px',
  };

  return (
    <article
      className="casestudy casestudy-reading"
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '12px 16px 32px',
        boxSizing: 'border-box',
      }}
    >
      {/* INTRO */}

      <h1
        className="casestudy-heading"
        style={{
          fontSize: '28px',
          lineHeight: '34px',
          margin: '0 0 18px',
        }}
      >
        AI-Native Product Design Engineer Workflow
      </h1>

      <p style={paragraphStyle}>
        This is a solo portfolio project exploring a more AI-native way of
        moving from product thinking to a working interface.
      </p>

      <p style={paragraphStyle}>
        The goal is not to replace design thinking with AI, but to reduce the
        time spent producing intermediate artifacts and move faster between
        understanding the problem, exploring solutions, building them in code,
        and testing something people can actually use.
      </p>

      <div
        style={{
          margin: '20px 0 24px',
          padding: '14px 16px',
          border: '1px solid #999',
          background: '#f7f7f7',
          lineHeight: '20px',
        }}
      >
        <div>
          <strong>Project type:</strong> Personal / portfolio project
        </div>

        <div>
          <strong>Setup:</strong> Solo, without real product stakeholders
        </div>

        <div>
          <strong>Purpose:</strong> Develop and demonstrate an AI-native Product
          Design + Design Engineering workflow
        </div>

        <div>
          <strong>Current status:</strong> Phase 2+3 — Generative Blueprinting &
          Code-Prototype Execution
        </div>
      </div>

      {/* OLD VS NEW */}

      <h2 className="casestudy-heading" style={sectionTitleStyle}>
        Old Way vs. AI-Native Way
      </h2>

      <p style={paragraphStyle}>
        My previous UX learning followed a more traditional Figma-heavy
        workflow. This project experiments with compressing some of those
        activities while keeping the important part intact: evidence,
        reasoning, testing, and iteration.
      </p>

      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          margin: '16px 0 22px',
        }}
      >
        <table
          style={{
            width: '100%',
            minWidth: '620px',
            borderCollapse: 'collapse',
            fontSize: '13px',
            lineHeight: '18px',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  textAlign: 'left',
                  verticalAlign: 'top',
                }}
              >
                Phase
              </th>

              <th
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  textAlign: 'left',
                  verticalAlign: 'top',
                }}
              >
                Traditional / Figma-Heavy
              </th>

              <th
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  textAlign: 'left',
                  verticalAlign: 'top',
                }}
              >
                AI-Native Workflow
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Empathize & Define
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Manually producing research artifacts such as personas,
                journey maps, and synthesis documents.
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                AI-assisted synthesis and faster hypothesis framing, while
                keeping decisions grounded in actual observations and evidence.
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Ideate & Wireframe
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Sketches, low-fidelity wireframes, and manual layout exploration
                in Figma.
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Define design tokens, generate screen structures in v0, then
                immediately continue crafting the approved direction in code.
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                High-Fi Prototype
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Pixel-pushing, Auto Layout refinement, and prototype linking as
                a separate stage.
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                High-fidelity design becomes part of the same screen-by-screen
                design-to-code loop rather than a separate deliverable.
              </td>
            </tr>

            <tr>
              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Test & Ship
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Clickable prototype, handoff, then implementation.
              </td>

              <td
                style={{
                  border: '1px solid #999',
                  padding: '10px',
                  verticalAlign: 'top',
                }}
              >
                Deploy the functional prototype, test it in a live environment,
                then iterate directly in the codebase.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PHASE 1 */}

      <h2 className="casestudy-heading" style={sectionTitleStyle}>
        Phase 1 — Strategic Foundation
      </h2>

      <p style={statusStyle}>Status: ✓ Completed</p>

      <p style={paragraphStyle}>
        The first phase is still about thinking before designing. The
        difference is that AI helps compress research synthesis and
        documentation instead of replacing the evidence behind them.
      </p>

      <p style={paragraphStyle}>This phase produced:</p>

      <ul style={listStyle}>
        <li>Six research insights from observation and independent analysis</li>
        <li>A clear product problem statement</li>
        <li>Four How Might We questions</li>
        <li>
          A lightweight persona, &quot;Dinda,&quot; derived from the research
          rather than generic demographic assumptions
        </li>
        <li>
          A six-stage current-state journey connected to specific pain points
        </li>
        <li>Four must-have features for v1</li>
        <li>Qualitative success metrics for later validation</li>
      </ul>

      <p style={paragraphStyle}>
        <strong>Deliverable:</strong> PRD-OTA-Discovery-Pricing.md — the
        structured source of truth for the problem, hypotheses, scope, and
        success criteria. It also acts as the context foundation for the
        generative design phase.
      </p>

      {/* PHASE 2 + 3 */}

      <h2 className="casestudy-heading" style={sectionTitleStyle}>
        Phase 2+3 — Generative Blueprinting & Code-Prototype Execution
      </h2>

      <p style={statusStyle}>Status: ↻ In Progress</p>

      <p style={paragraphStyle}>
        I originally separated ideation / low-fidelity design and high-fidelity
        implementation into two phases. In practice, they became one continuous
        unit of work.
      </p>

      <p style={paragraphStyle}>
        Instead of finishing every wireframe first and polishing everything
        later, the workflow runs as a tight loop per screen. v0 is used for
        rapid layout generation and experimentation. VS Code is where the
        approved direction becomes the real product.
      </p>

      <pre style={codeBlockStyle}>
{`Define the design system once
        ↓
Generate one screen in v0
        ↓
Self-review / Design QA
        ↓
Approved?
        ↓
Copy relevant code into VS Code
        ↓
Refactor into reusable components
        ↓
Fine-tune layout, interactions, state, and behavior
        ↓
Generate the next screen in the same v0 thread
        ↓
Repeat`}
      </pre>

      <p style={paragraphStyle}>
        <strong>Important:</strong> reviewing a generated screen in v0 is design
        QA, not user testing. v0 is treated as a generative layout tool rather
        than the final product environment.
      </p>

      <p style={paragraphStyle}>Work completed so far:</p>

      <ul style={listStyle}>
        <li>
          Competitor and interface pattern references collected manually from
          travel, mobility, and commerce products
        </li>

        <li>
          A detailed screen-by-screen flow covering Homepage, Onboarding,
          Recommendations, Search Results, Comparison, Hotel Preview, Checkout,
          and Confirmation
        </li>

        <li>
          A lightweight Tailwind design system covering color, typography,
          spacing, and radius
        </li>

        <li>
          Screen generation prompts organized into a continuous v0 workflow
        </li>

        <li>
          Next.js environment using Tailwind and App Router prepared for local
          implementation
        </li>
      </ul>

      <p style={paragraphStyle}>
        <strong>Next:</strong> finalize the local environment, establish the
        design tokens in v0, then execute the generate → review → code →
        fine-tune loop screen by screen.
      </p>

      <p style={paragraphStyle}>
        <strong>Deliverable:</strong> a modular frontend prototype where the
        architecture, components, interaction logic, and final implementation
        remain under my control rather than being shipped as raw AI-generated
        output.
      </p>

      {/* PHASE 4 */}

      <h2 className="casestudy-heading" style={sectionTitleStyle}>
        Phase 4 — Live-Environment Validation
      </h2>

      <p style={statusStyle}>Status: ○ Not Started</p>

      <p style={paragraphStyle}>
        Real user testing happens after the screens are connected into a
        functional prototype and deployed to a staging environment.
      </p>

      <p style={paragraphStyle}>
        The goal is to test actual behavior in something closer to a real
        product rather than testing isolated static screens or a heavily
        scripted clickable prototype.
      </p>

      <ul style={listStyle}>
        <li>Deploy the prototype to a staging URL</li>
        <li>Test with approximately five people from my personal circle</li>
        <li>
          Observe friction, navigation behavior, comprehension, and actual
          feature usage
        </li>
        <li>
          Compare findings against the qualitative success metrics defined in
          Phase 1
        </li>
      </ul>

      <p style={paragraphStyle}>
        <strong>Deliverable:</strong> behavioral evidence from people using a
        functional MVP.
      </p>

      {/* PHASE 5 */}

      <h2 className="casestudy-heading" style={sectionTitleStyle}>
        Phase 5 — Connect, Iterate & Ship
      </h2>

      <p style={statusStyle}>Status: ○ Not Started</p>

      <p style={paragraphStyle}>
        At this stage, design and implementation are no longer separate
        artifacts. Screens are connected through the Next.js App Router, shared
        states and components are consolidated, and findings from validation are
        changed directly in the codebase.
      </p>

      <ul style={listStyle}>
        <li>Connect the complete product flow through routing</li>
        <li>Consolidate reusable components and persistent state</li>
        <li>Translate validation findings into implementation changes</li>
        <li>Push iterations to GitHub and ship updated builds</li>
        <li>
          Document what changed, why it changed, and what was learned for the
          final case study
        </li>
      </ul>

      <p style={paragraphStyle}>
        <strong>Deliverable:</strong> an iterated product prototype with a clear
        trail from evidence → decision → implementation → learning.
      </p>

      {/* PRINCIPLE */}

      <h2 className="casestudy-heading" style={sectionTitleStyle}>
        The Principle Behind the Workflow
      </h2>

      <p style={paragraphStyle}>
        The point of this workflow is not to make every traditional UX artifact
        disappear. It is to question which artifacts actually help make a
        decision.
      </p>

      <p style={paragraphStyle}>
        AI accelerates synthesis and generation. v0 accelerates visual
        exploration. Code turns the selected direction into something real.
        Testing provides the evidence for what should change next.
      </p>

      <p
        style={{
          margin: 0,
          lineHeight: '20px',
          fontWeight: 700,
        }}
      >
        Think → Generate → Build → Test → Learn → Ship.
      </p>
    </article>
  );
}
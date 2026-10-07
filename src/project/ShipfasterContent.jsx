import React from 'react'

import shipfasterHero from './shipfaster/shipfsater-hero.jpg'
import shipfaster1 from './shipfaster/shipfsater (1).png'
import shipfaster2 from './shipfaster/shipfsater (2).png'
import shipfaster3 from './shipfaster/shipfsater (3).png'
import shipfaster4 from './shipfaster/shipfsater (4).png'

const roleContributions = [
  'Visual direction',
  'Production supervision',
  'Component & variant architecture',
  'Naming & library organization',
  'QA',
  'Client collaboration & handoff',
]

const outputStats = [
  ['800', 'BASE ICONS'],
  ['16', 'PRODUCTION BATCHES'],
  ['6', 'VARIANTS / ICON'],
  ['3', 'UI SIZES'],
]

const variants = [
  ['Stroke', 'Rounded', 'Sharp'],
  ['Solid', 'Rounded', 'Sharp'],
  ['Duotone', 'Rounded', 'Sharp'],
]

const sizes = [
  ['24 × 24', 'Default', 'The primary UI size, preserving the intended construction and visual detail.'],
  ['20 × 20', 'Compact', 'A reduced version designed to remain balanced in denser interface contexts.'],
  ['16 × 16', 'Micro', 'A smaller variant with additional negative space to maintain clarity at UI scale.'],
]

function Figure({ src, alt, caption }) {
  return (
    <figure className="sf-embedded-figure">
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function SectionHeading({ number, title, subtitle }) {
  return (
    <div className="sf-embedded-section-heading">
      <span>{number}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

export default function ShipfasterContent({ embedded = false }) {
  return (
    <div className={`shipfaster-embedded ${embedded ? 'is-embedded' : ''}`}>
      <section className="sf-embedded-hero">
        <span className="sf-embedded-eyebrow">SHIPFASTER UI — ICONOGRAPHY DESIGN SYSTEM</span>
        <h1>Building an Icon Design System for ShipFaster UI</h1>
        <p className="sf-embedded-lead">
          What started as 800 base icons became a system of styles, sizes,
          components, and variants — built to stay consistent at scale and
          ready for use in Figma.
        </p>
        <Figure
          src={shipfasterHero}
          alt="ShipFaster UI product context"
          caption="ShipFaster UI, shared as product context at the start of the project."
        />
      </section>

      <section className="sf-embedded-section">
        <SectionHeading
          number="00"
          title="Product & Problem"
          subtitle="At this scale, the challenge was no longer just drawing icons — it was defining enough structure for the entire library to behave like one system."
        />
        <div className="sf-embedded-copy">
          <p>
            <strong>ShipFaster UI</strong> is a Figma UI kit and design system
            built around reusable components, variants, and assets for designing
            digital products more efficiently.
          </p>
          <p>
            The team commissioned a custom icon library: <strong>800 base icons</strong>,
            multiple visual treatments, three interface sizes, and a Figma setup
            based on reusable components and variants.
          </p>
          <p>
            At this scale, the challenge moved beyond producing consistent visuals.
            The library needed rules for visual treatment, corner style, sizing,
            naming, organization, and handoff so hundreds of icons could remain
            coherent as the system expanded.
          </p>
        </div>

        <div className="sf-embedded-equation">
          <div><strong>800</strong><span>BASE ICONS</span></div><b>×</b>
          <div><strong>6</strong><span>VARIANTS</span></div><b>×</b>
          <div><strong>3</strong><span>SIZES</span></div><b>=</b>
          <div className="is-highlight"><strong>14,400</strong><span>CONFIGURATIONS</span></div>
        </div>

        <blockquote className="sf-embedded-problem">
          How do you turn 800 individual icons into a reusable system that remains
          coherent across up to 14,400 style-and-size configurations?
        </blockquote>
      </section>

      <section className="sf-embedded-section">
        <SectionHeading
          number="01"
          title="Role & Contribution"
          subtitle="Leading visual direction, production, and final systemization."
        />
        <div className="sf-embedded-role-grid">
          {roleContributions.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="sf-embedded-copy">
          <p>
            I led the iconography work from <strong>visual direction through final
            Figma handoff.</strong> I established the base design and construction
            references, then supervised a designer on my team who helped scale
            production across the library.
          </p>
          <p>
            My primary responsibility was keeping that production usable as a system:
            reviewing consistency, resolving visual exceptions, defining naming,
            organizing assets, building Figma components and variants, running QA,
            and managing communication with the ShipFaster UI team.
          </p>
        </div>

        <div className="sf-embedded-subsection">
          <span className="sf-embedded-kicker">ESTABLISHING THE DIRECTION</span>
          <h3>The system started with a trial, not with 800 finished icons.</h3>
          <div className="sf-embedded-copy">
            <p>
              Before scaling production, we developed multiple initial directions for
              a small trial set. The client references helped clarify expected structure
              and component behavior, but the final visual language needed to be developed
              specifically for ShipFaster UI.
            </p>
            <p>
              Early feedback helped establish the working rules: a 1.5px stroke for
              outline icons, cleaner negative space for filled versions, smoother corner
              treatment, and enough visual detail to stay recognizable without becoming
              overly complex.
            </p>
            <p>
              Once the direction was aligned, those decisions became the reference for
              scaling the rest of the library.
            </p>
          </div>
          <Figure src={shipfaster2} alt="Early ShipFaster icon system direction" />
        </div>

        <div className="sf-embedded-subsection">
          <span className="sf-embedded-kicker">SCALING THE PRODUCTION</span>
          <h3>Break the library into reviewable batches before scaling further.</h3>
          <div className="sf-embedded-copy">
            <p>
              Producing hundreds of icons at once would have made feedback difficult to
              track. I proposed a batch-based workflow with approximately 50 icons per
              milestone, working directly in the shared Figma file so the client could
              review progress continuously.
            </p>
            <p>
              Feedback and revisions were grouped around each batch before moving deeper
              into new production. The approach helped keep visual decisions, revisions,
              and handoff manageable as the project scaled.
            </p>
          </div>
          <div className="sf-embedded-flow">
            {['Produce', 'Review in Figma', 'Collect Feedback', 'Finalize'].map((item, index, arr) => (
              <React.Fragment key={item}>
                <div><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
                {index < arr.length - 1 && <b aria-hidden="true">→</b>}
              </React.Fragment>
            ))}
          </div>
          <Figure src={shipfaster3} alt="ShipFaster production workflow and client feedback" />
        </div>
      </section>

      <section className="sf-embedded-section">
        <SectionHeading
          number="02"
          title="Key Design Decisions"
          subtitle="Build the rules first, so hundreds of icons could scale without becoming hundreds of exceptions."
        />

        <article className="sf-embedded-decision">
          <span className="sf-embedded-kicker">01 — VARIANT ARCHITECTURE</span>
          <h3>Separate visual style from corner treatment.</h3>
          <div className="sf-embedded-copy">
            <p>
              The initial brief described outline, filled, duotone, and sharp as separate
              styles. During implementation, I reorganized that requirement into a more
              reusable structure.
            </p>
            <p>
              <strong>Stroke, Solid, and Duotone</strong> became the base visual treatments,
              while <strong>Rounded and Sharp</strong> became a second dimension of variation.
            </p>
            <p>
              This made the system easier to structure as predictable properties instead
              of treating all six outputs as unrelated styles.
            </p>
          </div>
          <div className="sf-embedded-variant-grid">
            {variants.map(([title, a, b]) => (
              <div key={title}>
                <span>BASE STYLE</span>
                <strong>{title}</strong>
                <div><em>{a}</em><em>{b}</em></div>
              </div>
            ))}
          </div>
          <div className="sf-embedded-system-note">
            <span>SYSTEM LOGIC</span>
            <strong>3 visual treatments × 2 corner treatments = 6 reusable variants</strong>
          </div>
        </article>

        <article className="sf-embedded-decision">
          <span className="sf-embedded-kicker">02 — ICON SIZING</span>
          <h3>Treat size as a design property, not an export setting.</h3>
          <div className="sf-embedded-copy">
            <p>
              Every icon was delivered in <strong>24×24, 20×20, and 16×16 versions.</strong>
            </p>
            <p>
              The 16×16 micro version could not always be treated as a direct scale-down
              of the larger icon. Where necessary, visual density was reduced and negative
              space increased to keep the icon clear at UI scale.
            </p>
          </div>
          <div className="sf-embedded-size-grid">
            {sizes.map(([size, title, body]) => (
              <div key={size}><strong>{size}</strong><h4>{title}</h4><p>{body}</p></div>
            ))}
          </div>
          <Figure src={shipfaster4} alt="ShipFaster icon sizing and style variants" />
        </article>

        <article className="sf-embedded-decision">
          <span className="sf-embedded-kicker">03 — FIGMA SYSTEM</span>
          <h3>Designing the icon was only half the job.</h3>
          <div className="sf-embedded-copy">
            <p>
              In many previous icon projects, delivery ended with finished SVGs or source
              files. ShipFaster required the assets to keep working after handoff.
            </p>
            <p>
              The client needed strokes and corners to remain editable in Figma, with each
              icon structured as reusable components and variants across its available
              styles and sizes.
            </p>
            <p>
              That meant organizing naming and categories, structuring components, reviewing
              consistency, and preparing the collaboration file so another designer could
              continue using the library without rebuilding it.
            </p>
          </div>
          <div className="sf-embedded-system-flow">
            {['Draw', 'Systemize', 'Componentize', 'QA', 'Handoff'].map((item, index, arr) => (
              <React.Fragment key={item}>
                <div><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
                {index < arr.length - 1 && <b aria-hidden="true">→</b>}
              </React.Fragment>
            ))}
          </div>
          <blockquote className="sf-embedded-quote">
            The final deliverable wasn&apos;t only 800 drawings. It was a reusable system.
          </blockquote>
        </article>
      </section>

      <section className="sf-embedded-section">
        <SectionHeading
          number="03"
          title="Output"
          subtitle="A completed icon system delivered to the ShipFaster UI team for integration into their design system."
        />
        <div className="sf-embedded-output-grid">
          {outputStats.map(([number, label]) => (
            <div key={label}><strong>{number}</strong><span>{label}</span></div>
          ))}
        </div>
        <div className="sf-embedded-copy">
          <p>
            The project was completed across <strong>16 production batches</strong>, covering
            all <strong>800 base icons</strong> in the agreed scope.
          </p>
          <p>
            Each icon was structured across six visual variants and three interface sizes,
            supporting up to <strong>14,400 style-and-size configurations</strong> across the
            completed library.
          </p>
          <p>
            The final Figma library, component structures, and supporting assets were handed
            off to the ShipFaster UI team.
          </p>
          <p>
            The project had been commissioned for their design system, with an initial plan
            to introduce completed categories into a beta release. My involvement ended at
            final delivery, so I do not have visibility into how much of the complete library
            was ultimately integrated into the released product.
          </p>
        </div>
        <Figure src={shipfaster1} alt="Completed ShipFaster icon system" />
      </section>

      <section className="sf-embedded-section sf-embedded-last">
        <SectionHeading
          number="04"
          title="From Designing the Asset to Designing the System Around It"
        />
        <div className="sf-embedded-copy">
          <p><strong>Before this project, I thought of an icon set mainly as a collection of finished visual assets.</strong></p>
          <p>ShipFaster changed what “finished” meant. At this scale, the work was not complete when every icon looked right.</p>
          <p>
            It was complete when the library had enough structure — variants, sizing, naming,
            components, QA, and a repeatable production process — for someone else to pick it
            up and continue working with it.
          </p>
          <p>
            That shift — <strong>from designing the asset to designing the system around the asset</strong>
            — became one of the ideas I carried forward into the way I now think about digital products.
          </p>
        </div>
        <div className="sf-embedded-reflection">
          <div><span>BEFORE</span><strong>Design</strong><i>↓</i><strong>Export</strong><i>↓</i><strong>Deliver</strong></div>
          <b aria-hidden="true">→</b>
          <div className="is-final"><span>AFTER</span><strong>Design</strong><i>↓</i><strong>Define Rules</strong><i>↓</i><strong>Build Variants</strong><i>↓</i><strong>Componentize</strong><i>↓</i><strong>QA</strong><i>↓</i><strong>Handoff</strong></div>
        </div>
        <dl className="sf-embedded-meta">
          <div><dt>Role</dt><dd>Iconography Design Lead</dd></div>
          <div><dt>Timeline</dt><dd>Jun 2024 – Aug 2024</dd></div>
          <div><dt>Scope</dt><dd>800 Icons · 16 Batches</dd></div>
          <div><dt>Focus</dt><dd>Iconography · Components · Variants · Design Systems</dd></div>
        </dl>
      </section>

      <style>{`
        .shipfaster-embedded{width:100%;color:var(--text)}
        .shipfaster-embedded *{box-sizing:border-box}
        .shipfaster-embedded p,.shipfaster-embedded figure,.shipfaster-embedded blockquote,.shipfaster-embedded dl{margin:0}
        .sf-embedded-hero{padding:12px 0 48px}
        .sf-embedded-eyebrow,.sf-embedded-section-heading>span,.sf-embedded-kicker,.sf-embedded-variant-grid>div>span,.sf-embedded-system-note>span,.sf-embedded-output-grid span,.sf-embedded-reflection span,.sf-embedded-meta dt{color:var(--tertiary);font-size:var(--font-meta);font-weight:600;letter-spacing:.08em}
        .sf-embedded-hero h1{max-width:720px;margin:14px 0 16px;font-size:clamp(24px,3.4vw,40px);line-height:1.08;letter-spacing:-.04em;font-weight:500}
        .sf-embedded-lead{max-width:680px;color:var(--secondary);font-size:var(--font-body);line-height:1.7}
        .sf-embedded-section{padding:46px 0;border-top:1px solid var(--border)}
        .sf-embedded-last{padding-bottom:0}
        .sf-embedded-section-heading{max-width:680px;margin-bottom:28px}
        .sf-embedded-section-heading h2{margin:8px 0 0;font-size:22px;line-height:1.25;letter-spacing:-.025em;font-weight:500}
        .sf-embedded-section-heading p{margin-top:10px;color:var(--secondary);font-size:var(--font-small);line-height:1.65}
        .sf-embedded-copy{max-width:680px;display:grid;gap:16px}
        .sf-embedded-copy p{color:var(--secondary);font-size:var(--font-body);line-height:1.75}
        .sf-embedded-copy strong{color:var(--text);font-weight:600}
        .sf-embedded-figure{width:100%;margin-top:30px!important}
        .sf-embedded-figure img{width:100%;height:auto;display:block;border:1px solid var(--border);border-radius:12px;background:var(--surface)}
        .sf-embedded-figure figcaption{margin-top:8px;color:var(--tertiary);font-size:var(--font-meta);line-height:1.5}
        .sf-embedded-equation{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1.2fr;align-items:stretch;gap:8px;margin-top:30px}
        .sf-embedded-equation>div{min-width:0;display:flex;flex-direction:column;justify-content:center;min-height:104px;padding:16px;border:1px solid var(--border);border-radius:10px;background:var(--bg)}
        .sf-embedded-equation>div.is-highlight{background:var(--surface)}
        .sf-embedded-equation strong{font-size:22px;line-height:1;font-weight:500}
        .sf-embedded-equation span{margin-top:9px;color:var(--tertiary);font-size:8px;line-height:1.25;letter-spacing:.07em}
        .sf-embedded-equation>b{display:grid;place-items:center;color:var(--tertiary);font-weight:400}
        .sf-embedded-problem,.sf-embedded-quote{max-width:700px;margin-top:28px!important;padding:2px 0 2px 18px;border-left:2px solid var(--text);color:var(--text);font-size:17px;line-height:1.55;letter-spacing:-.015em}
        .sf-embedded-role-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin-bottom:28px;padding:1px;background:var(--border)}
        .sf-embedded-role-grid span{min-height:54px;display:flex;align-items:center;padding:12px 14px;background:var(--bg);color:var(--secondary);font-size:var(--font-small);line-height:1.4}
        .sf-embedded-subsection,.sf-embedded-decision{margin-top:44px;padding-top:38px;border-top:1px solid var(--border)}
        .sf-embedded-subsection h3,.sf-embedded-decision h3{max-width:680px;margin:10px 0 22px;font-size:18px;line-height:1.35;font-weight:500;letter-spacing:-.02em}
        .sf-embedded-flow,.sf-embedded-system-flow{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;align-items:stretch;gap:8px;margin-top:28px}
        .sf-embedded-flow>div,.sf-embedded-system-flow>div{min-width:0;min-height:96px;display:flex;flex-direction:column;justify-content:space-between;padding:14px;border:1px solid var(--border);border-radius:9px;background:var(--surface)}
        .sf-embedded-flow>div span,.sf-embedded-system-flow>div span{color:var(--tertiary);font-size:9px}
        .sf-embedded-flow>div strong,.sf-embedded-system-flow>div strong{font-size:var(--font-small);line-height:1.3;font-weight:500}
        .sf-embedded-flow>b,.sf-embedded-system-flow>b{display:grid;place-items:center;color:var(--tertiary);font-weight:400}
        .sf-embedded-variant-grid,.sf-embedded-size-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin-top:28px;padding:1px;background:var(--border)}
        .sf-embedded-variant-grid>div,.sf-embedded-size-grid>div{min-width:0;padding:18px;background:var(--bg)}
        .sf-embedded-variant-grid strong{display:block;margin-top:7px;font-size:15px;font-weight:500}
        .sf-embedded-variant-grid>div>div{display:flex;flex-wrap:wrap;gap:6px;margin-top:18px}
        .sf-embedded-variant-grid em{padding:6px 8px;border:1px solid var(--border);border-radius:999px;color:var(--secondary);font-size:9px;font-style:normal}
        .sf-embedded-system-note{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:12px;padding:16px 18px;border:1px solid var(--border);border-radius:10px}
        .sf-embedded-system-note strong{max-width:470px;text-align:right;font-size:var(--font-small);line-height:1.45;font-weight:500}
        .sf-embedded-size-grid strong{display:block;font-size:18px;line-height:1;font-weight:500}
        .sf-embedded-size-grid h4{margin:18px 0 7px;font-size:13px;font-weight:500}
        .sf-embedded-size-grid p{color:var(--secondary);font-size:10px;line-height:1.55}
        .sf-embedded-system-flow{grid-template-columns:1fr auto 1fr auto 1fr auto 1fr auto 1fr}
        .sf-embedded-output-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;margin-bottom:28px;padding:1px;background:var(--border)}
        .sf-embedded-output-grid>div{min-height:120px;display:flex;flex-direction:column;justify-content:space-between;padding:18px;background:var(--surface)}
        .sf-embedded-output-grid strong{font-size:24px;line-height:1;font-weight:500}
        .sf-embedded-reflection{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;margin-top:32px}
        .sf-embedded-reflection>div{min-height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;padding:20px;border:1px solid var(--border);border-radius:12px;background:var(--bg);text-align:center}
        .sf-embedded-reflection>div.is-final{background:var(--surface)}
        .sf-embedded-reflection>div strong{font-size:var(--font-small);font-weight:500}
        .sf-embedded-reflection>div i{color:var(--tertiary);font-style:normal}
        .sf-embedded-reflection>b{color:var(--tertiary);font-weight:400}
        .sf-embedded-meta{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:34px!important;padding-top:24px;border-top:1px solid var(--border)}
        .sf-embedded-meta div{min-width:0}.sf-embedded-meta dd{margin:7px 0 0;color:var(--secondary);font-size:var(--font-small);line-height:1.45}
        @media(max-width:760px){.sf-embedded-section{padding:38px 0}.sf-embedded-role-grid,.sf-embedded-variant-grid,.sf-embedded-size-grid,.sf-embedded-output-grid,.sf-embedded-meta{grid-template-columns:1fr 1fr}.sf-embedded-flow,.sf-embedded-system-flow{grid-template-columns:1fr}.sf-embedded-flow>b,.sf-embedded-system-flow>b{min-height:20px;transform:rotate(90deg)}.sf-embedded-system-note{align-items:flex-start;flex-direction:column}.sf-embedded-system-note strong{text-align:left}.sf-embedded-reflection{grid-template-columns:1fr}.sf-embedded-reflection>b{transform:rotate(90deg);text-align:center}.sf-embedded-equation{grid-template-columns:1fr auto 1fr}}
        @media(max-width:480px){.sf-embedded-role-grid,.sf-embedded-variant-grid,.sf-embedded-size-grid,.sf-embedded-output-grid,.sf-embedded-meta,.sf-embedded-equation{grid-template-columns:1fr}.sf-embedded-equation>b{min-height:18px}.sf-embedded-equation>div{min-height:88px}}
      `}</style>
    </div>
  )
}

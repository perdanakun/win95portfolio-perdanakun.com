import React from 'react';

import {
  Modal,
  Button,
} from '@react95/core';

import {
  Computer,
  Url1102,
  Wordpad,
  Notepad2,
  Download,
  Shdocvw272,
} from '@react95/icons';

import resumeFile from '../assets/files/perdana_kurniawan_arta_resume.pdf';


import perdanaImage from '../assets/images/perdana.png';

import instagramIcon from '../assets/icons/instagram.svg';
import githubIcon from '../assets/icons/github.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import mediumIcon from '../assets/icons/medium.svg';


export default function AboutContent({ onClose }) {

  return (
    <Modal.Content className="about-content">
      <style>{`

/* =====================================================
   RESUME
   ===================================================== */

.about-resume {
  width: 100%;
  min-width: 0;
}

/* ACTION BUTTONS — TOP */
.about-resume-actions {
  display: flex;
  justify-content: flex-start;
  gap: 6px;

  margin-bottom: 10px;
}

.about-resume-button {
  min-width: 120px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}


/* WHITE RESUME VIEWER */
.about-resume-viewer {
  width: 100%;
  height: 400px;
  min-width: 0;

  box-sizing: border-box;

  background: #ffffff;

  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;

  box-shadow: inset 1px 1px 0 #808080;

  overflow: hidden;
}

.about-resume-scroll {
  width: 100%;
  height: 100%;

  padding: 14px;
  box-sizing: border-box;

  overflow-x: hidden;
  overflow-y: auto;

  background: #ffffff;
  color: #000000;
}

/* HEADER */
.about-resume-header {
  padding-bottom: 10px;
  margin-bottom: 14px;

  border-bottom: 1px solid #c0c0c0;
}

.about-resume-name {
  margin-bottom: 3px;

  font-size: 14px;
  line-height: 17px;
  font-weight: bold;
}

.about-resume-role {
  margin-bottom: 5px;

  font-size: 11px;
  line-height: 14px;
  font-weight: bold;
}

.about-resume-contact {
  font-size: 10px;
  line-height: 1.5;

  overflow-wrap: anywhere;
}

.about-resume-links {
  margin-top: 2px;

  font-size: 10px;
  line-height: 1.5;
}

.about-resume-links a {
  color: #0000ee;
  text-decoration: underline;
}

/* SECTIONS */
.about-resume-section {
  margin-bottom: 16px;
}

.about-resume-section:last-child {
  margin-bottom: 0;
}

.about-resume-section-title {
  margin-bottom: 7px;

  font-size: 11px;
  line-height: 13px;
  font-weight: bold;

  text-align: left;

  text-transform: uppercase;
}

/* ITEMS */
.about-resume-item {
  margin-bottom: 11px;
  text-align: left;
}

.about-resume-item:last-child {
  margin-bottom: 0;
}

.about-resume-item-title {
  font-size: 11px;
  line-height: 14px;
  font-weight: bold;
  text-align: left;
}

.about-resume-item-meta {
  margin-top: 1px;
  margin-bottom: 4px;

  color: #404040;

  font-size: 10px;
  line-height: 1.4;
  
  
}

/* BODY COPY */
.about-resume-copy {
  margin: 0;

  font-size: 11px;
  line-height: 1.55;
  text-align: left;
}

/* BULLETS */
.about-resume-list {
  margin: 4px 0 0;
  padding-left: 20px;

  font-size: 11px;
  line-height: 1.55;
}

.about-resume-list li {
  margin-bottom: 3px;
  
}

/* SKILLS */
.about-resume-skills {
  margin: 0 0 6px;

  font-size: 11px;
  line-height: 1.55;
  text-align: left;
}

.about-resume-skills:last-child {
  margin-bottom: 0;
}

/* MOBILE */
@media (max-width: 480px) {
  .about-resume-actions {
    flex-direction: column;
  }

  .about-resume-button {
    width: 100%;
  }
 .about-resume-button svg {
  margin-right: 4px;
}

  .about-resume-viewer {
    height: 380px;
  }

  .about-resume-scroll {
    padding: 10px;
  }
}


        /* =====================================================
           ABOUT RESUME
        ===================================================== */
  .about-resume-actions {
  display: flex;
  gap: 6px;

}

.about-resume-button {
  min-width: 95px;
}
  /* =====================================================
           ABOUT CONTENT
        ===================================================== */

        .about-content {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;

          padding: 6px;
          box-sizing: border-box;
          overflow: hidden;

          display: flex;
          flex-direction: column;

          background: #c0c0c0;
          color: #000;

          font-family: "MS Sans Serif", sans-serif;
          font-size: 11px;
        }


        /* =====================================================
           CUSTOM TABS
        ===================================================== */

        .about-tabs {
          width: 100%;
          min-width: 0;
          min-height: 0;

          flex: 1 1 auto;

          display: flex;
          flex-direction: column;
        }

        .about-tab-buttons {
          width: 100%;
          height: 23px;
          flex: 0 0 23px;

          display: flex;
          align-items: flex-end;

          box-sizing: border-box;
          background: #c0c0c0;
        }

        .about-tab-button {
          position: relative;

          height: 22px;
          min-width: 72px;

          padding: 2px 11px;
          box-sizing: border-box;

          border: 1px solid transparent;

          background: #c0c0c0;
          color: #000;

          font-family: "MS Sans Serif", sans-serif;
          font-size: 11px;
          line-height: 16px;

          cursor: pointer;
          white-space: nowrap;
        }

        .about-tab-button + .about-tab-button {
          margin-left: 2px;
        }

        .about-tab-button:hover {
          background: #d0d0d0;
        }

        .about-tab-button:focus {
          outline: none;
        }

        .about-tab-button.active {
          z-index: 2;

          height: 23px;
          margin-bottom: -1px;

          background: #c0c0c0;

          border-top: 1px solid #ffffff;
          border-left: 1px solid #ffffff;
          border-right: 1px solid #636363;
          border-bottom: 1px solid #c0c0c0;
        }


        /* =====================================================
           TAB CONTENT
        ===================================================== */

        .about-tab-content {
          width: 100%;
          min-width: 0;
          min-height: 0;

          flex: 1 1 0;

          box-sizing: border-box;

          border-top: 1px solid #ffffff;
          border-left: 1px solid #ffffff;
          border-right: 1px solid #636363;
          border-bottom: 1px solid #636363;

          background: #c0c0c0;
          overflow: hidden;
        }

        .about-tab-panel {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;

          padding: 12px;
          box-sizing: border-box;

          overflow-x: hidden;
          overflow-y: auto;

          background: #c0c0c0;
        }


        /* =====================================================
           PROFILE
        ===================================================== */

        .about-profile {
          width: 100%;
          min-width: 0;

          display: grid;
          grid-template-columns: minmax(118px, 0.82fr) minmax(0, 1.18fr);
          gap: 14px;
          align-items: stretch;

          margin-bottom: 14px;
        }


        /* =====================================================
           PHOTO
        ===================================================== */

        .about-photo-frame {
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;

          padding: 2px;
          box-sizing: border-box;

          overflow: hidden;

          background: #c0c0c0;

          border-top: 1px solid #808080;
          border-left: 1px solid #808080;
          border-right: 1px solid #ffffff;
          border-bottom: 1px solid #ffffff;

          box-shadow: inset 1px 1px 0 #404040;
        }

        .about-photo {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: center top;
        }


        /* =====================================================
           PROFILE INFORMATION
        ===================================================== */

        .about-profile-info {
          min-width: 0;

          display: flex;
          flex-direction: column;
          gap: 7px;
        }


        /* =====================================================
           PROPERTY ROW
        ===================================================== */

        .about-property-row {
          width: 100%;
          min-width: 0;

          display: flex;
          flex-direction: column;
          gap: 5px;

          margin: 0;

          font-size: 11px;
          text-align: left;
        }

        .about-property-label {
          width: 100%;
          min-width: 0;

          padding: 0;

          color: #000;

          font-size: 11px;
          line-height: 13px;

          overflow-wrap: anywhere;
        }

        .about-property-value {
          width: 100%;
          min-width: 0;
          min-height: 24px;

          display: flex;
          align-items: center;

          padding: 3px 6px;
          box-sizing: border-box;

          background: #ffffff;
          color: #000000;

          border: 1px solid #808080;
          border-top-color: #404040;
          border-left-color: #404040;
          border-right-color: #ffffff;
          border-bottom-color: #ffffff;

          font-size: 11px;
          line-height: 1.35;

          white-space: normal;
          overflow-wrap: anywhere;
          word-break: normal;
        }


        /* =====================================================
           PROPERTY GROUP
        ===================================================== */

        .about-property-group {
          width: 100%;
          min-width: 0;

          margin: 0 0 12px;
          padding: 9px 10px 9px;
          box-sizing: border-box;

          border: 1px solid #808080;
        }

        .about-property-group:last-child {
          margin-bottom: 0;
        }

        .about-property-group legend {
          padding: 0 4px;

          color: #000;

          font-family: "MS Sans Serif", sans-serif;
          font-size: 11px;
          line-height: 11px;
          font-weight: bold;
          text-align: left;
        }

        .about-property-group > .about-property-row {
          margin-bottom: 8px;
        }

        .about-property-group > .about-property-row:last-of-type {
          margin-bottom: 0;
        }


        /* =====================================================
           TEXT
        ===================================================== */

        .about-text {
          margin: 0 0 8px;

          color: #000;

          font-family: "MS Sans Serif", sans-serif;
          font-size: 11px;
          line-height: 1.55;
          text-align: left;

          overflow-wrap: anywhere;
        }

        .about-text:last-child {
          margin-bottom: 0;
        }

        .about-strong {
          font-weight: bold;
          text-decoration: underline;
        }

        .about-property-group > .about-text.after-fields {
          margin-top: 10px;
        }


        /* =====================================================
           TOOL / LEARNING LIST
        ===================================================== */

        .about-tool-list {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .about-tool-row {
          min-width: 0;
          min-height: 20px;

          display: flex;
          align-items: center;
          gap: 7px;

          font-size: 11px;
        }

        .about-tool-icon {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-tool-label {
          min-width: 0;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }


        /* =====================================================
           CONTACT
        ===================================================== */

        .about-list {
          margin: 6px 0 0;
          padding-left: 20px;

          font-size: 11px;
          line-height: 1.65;
          text-align: left;
        }

        .about-online-row {
          min-width: 0;
          min-height: 22px;

          display: flex;
          align-items: center;
          gap: 7px;
        }

        .about-online-row img {
  width: 16px;
  height: 16px;

  flex: 0 0 16px;

  display: block;

  object-fit: contain;
}


        .about-online-row svg {
          flex: 0 0 auto;
        }

        .about-link {
          min-width: 0;

          color: #0000ee;

          font-size: 11px;
          line-height: 1.4;

          text-decoration: underline;
          cursor: pointer;

          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .about-actions {
          width: 100%;

          display: flex;
          justify-content: flex-end;
          gap: 6px;

          margin-top: 10px;
        }

        /* =====================================================
           BUTTON
        ===================================================== */

.about-close-button {
  width: 75px;
  min-width: 75px;
}

        /* =====================================================
           FOOTER
        ===================================================== */

        .about-footer {
          width: 100%;

          display: flex;
          justify-content: flex-end;
          align-items: center;

          gap: 6px;

          padding-top: 8px;
          box-sizing: border-box;

          flex: 0 0 auto;
        }


        /* =====================================================
           MEDIUM / SMALL WINDOW
        ===================================================== */

        @media (max-width: 480px) {

  .about-resume-actions {
  flex-direction: column;
}

.about-resume-button {
  width: 100%;
}


          .about-content {
            padding: 5px;
          }

          .about-tab-panel {
            padding: 10px;
          }

          .about-profile {
            grid-template-columns: minmax(96px, 0.72fr) minmax(0, 1.28fr);
            gap: 10px;

            margin-bottom: 12px;
          }

          .about-profile-info {
            gap: 6px;
          }

          .about-property-group {
            padding: 8px;
            margin-bottom: 10px;
          }

          .about-tab-button {
            min-width: 64px;

            padding-left: 8px;
            padding-right: 8px;
          }
        }


        /* =====================================================
           VERY SMALL WINDOW
        ===================================================== */

        @media (max-width: 360px) {


          .about-content {
            padding: 4px;
          }

          .about-tab-panel {
            padding: 8px;
          }

          .about-profile {
            grid-template-columns: 1fr;
            gap: 9px;

            margin-bottom: 12px;
          }

          .about-photo-frame {
            width: 100%;
            height: 160px;
          }

          .about-photo {
            object-position: center 22%;
          }

          .about-profile-info {
            gap: 7px;
          }

          .about-property-group {
            padding: 8px;
          }

          .about-actions {
            justify-content: stretch;
          }

          .about-actions > * {
            width: 100%;
          }

          .about-tab-buttons {
            height: 22px;
            flex-basis: 22px;
          }

          .about-tab-button {
            min-width: 0;
            flex: 1;

            padding-left: 5px;
            padding-right: 5px;
          }
        }


        /* =====================================================
           ULTRA NARROW
        ===================================================== */

        @media (max-width: 280px) {

          .about-photo-frame {
            height: 140px;
          }

          .about-tab-button {
            font-size: 10px;
          }
        }

      `}</style>


      <AboutTabs>

        {/* =====================================================
            GENERAL
        ===================================================== */}

        <AboutTab title="General">

          <div className="about-tab-panel">

            <div className="about-profile">

              <div className="about-photo-frame">
                <img
                  src={perdanaImage}
                  alt="Perdana Kurniawan Arta"
                  className="about-photo"
                />
              </div>


              <div className="about-profile-info">

                <PropertyRow
                  label="Name"
                  value="Perdana Kurniawan Arta"
                />

                <PropertyRow
                  label="Role"
                  value="Visual Designer → Product Design & Design Engineering"
                />

                <PropertyRow
                  label="Background"
                  value="10+ years in Visual Design"
                />

                <PropertyRow
                  label="Exploring"
                  value="Product, Interaction & Design in Code"
                />

              </div>

            </div>


            <PropertyGroup title="About">

              <p className="about-text">
                Perdana is a Visual Designer expanding his practice into
                Product Design and Design Engineering.
              </p>

              <p className="about-text">
                His background in visual systems, iconography, illustration,
                and design direction now serves as the foundation for exploring
                how interfaces work, behave, and get built.
              </p>

            </PropertyGroup>


            <PropertyGroup title="Direction">

              <p className="about-text">
                Bridging user needs, business goals, visual craft, and technology to build products that work.
              </p>

            </PropertyGroup>

          </div>

        </AboutTab>


        {/* =====================================================
            PRACTICE
        ===================================================== */}

        <AboutTab title="Practice">

          <div className="about-tab-panel">


            <PropertyGroup title="Current Project">

              <PropertyRow
                label="Project"
                value="Perdana's Computer"
              />

              <PropertyRow
                label="Type"
                value="Interactive Portfolio"
              />

              <PropertyRow
                label="Focus"
                value="Product Design & Design Engineering"
              />

              <PropertyRow
                label="Status"
                value="Building & Iterating"
              />

              <p className="about-text after-fields">
                A Windows 95-inspired desktop experience where visual
                direction, interaction design, product thinking, and
                front-end development come together in a working interface.
              </p>

            </PropertyGroup>


            <PropertyGroup title="Exploring">

              <div className="about-tool-list">

                <ToolRow
                  icon={<Wordpad variant="16x16_4" />}
                  label="UX & Product Thinking"
                />

                <ToolRow
                  icon={<Notepad2 variant="16x16_4" />}
                  label="Interaction Design & Design Systems"
                />

                <ToolRow
                  icon={<Computer variant="16x16_4" />}
                  label="Front-end Development & Design in Code"
                />

              </div>

            </PropertyGroup>

          </div>

        </AboutTab>


        {/* =====================================================
            CONTACT
        ===================================================== */}

        <AboutTab title="Contact">

          <div className="about-tab-panel">


            <PropertyGroup title="Availability">

              <PropertyRow
                label="Status"
                value="Open to New Opportunities"
              />

              <PropertyRow
                label="Interested In"
                value="Product Design & Design Engineering"
              />

              <p className="about-text after-fields">
Opportunities where user needs, business goals,
 design, and technology 
come together to shape and build products.
              </p>

            </PropertyGroup>

<PropertyGroup title="Online">

  <div className="about-online-row">

    <div className="about-online-icon">
      <img
        src={linkedinIcon}
        alt=""
        aria-hidden="true"
      />
    </div>

    <a
      href="https://www.linkedin.com/in/perdanakun/"
      target="_blank"
      rel="noreferrer"
      className="about-link"
    >
      linkedin.com/in/perdanakun
    </a>

  </div>


  <div className="about-online-row">

    <div className="about-online-icon">
      <img
        src={mediumIcon}
        alt=""
        aria-hidden="true"
      />
    </div>

    <a
      href="https://medium.com/@perdanakun"
      target="_blank"
      rel="noreferrer"
      className="about-link"
    >
      medium.com/@perdanakun
    </a>

  </div>


  <div className="about-online-row">

    <div className="about-online-icon">
      <img
        src={githubIcon}
        alt=""
        aria-hidden="true"
      />
    </div>

    <a
      href="https://github.com/perdanakun"
      target="_blank"
      rel="noreferrer"
      className="about-link"
    >
      github.com/perdanakun
    </a>

  </div>


  <div className="about-online-row">

    <div className="about-online-icon">
      <img
        src={instagramIcon}
        alt=""
        aria-hidden="true"
      />
    </div>

    <a
      href="https://www.instagram.com/perdanakun/"
      target="_blank"
      rel="noreferrer"
      className="about-link"
    >
      instagram.com/perdanakun
    </a>

  </div>

</PropertyGroup>



          </div>

        </AboutTab>
<AboutTab title="Resume">

  <div className="about-tab-panel">

    <PropertyGroup title="Resume">

      <div className="about-resume">

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="about-resume-actions">

          <Button
            className="about-resume-button"
            onClick={() => {
              window.open(
                resumeFile,
                '_blank',
                'noopener,noreferrer'
              );
            }}
          >
        <Shdocvw272 variant="16x16_4" />Open
          </Button>

          <Button
            className="about-resume-button"
            onClick={() => {
              const link = document.createElement('a');

              link.href = resumeFile;
              link.download =
                'perdana_kurniawan_arta_resume.pdf';

              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download variant="16x16_4" />
            Download Resume
          </Button>

        </div>


        {/* =====================================================
            RESUME VIEWER
        ===================================================== */}

        <div className="about-resume-viewer">

          <div className="about-resume-scroll">


            {/* HEADER */}

            <div className="about-resume-header">

              <div className="about-resume-name">
                PERDANA KURNIAWAN ARTA
              </div>

              <div className="about-resume-role">
                Product Design | Visual Systems | Design in Code
              </div>

              <div className="about-resume-contact">
                Jakarta, Indonesia | Open to relocation & hybrid |
                {' '}+62 858-6778-6231 |
                {' '}perdanakurniawan25@gmail.com
              </div>

              <div className="about-resume-links">

                <a
                  href="https://perdanakun.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  perdanakun.com
                </a>

                {' | '}

                <a
                  href="https://www.linkedin.com/in/perdanakun/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>

                {' | '}

                <a
                  href="https://github.com/perdanakun"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

              </div>

            </div>


            {/* =====================================================
                SUMMARY
            ===================================================== */}

            <div className="about-resume-section">

              <div className="about-resume-section-title">
                Summary
              </div>

              <p className="about-resume-copy">
                Visual Designer transitioning into Product Design,
                with a strong foundation in visual systems, design
                direction, and client-facing work across digital
                products and brands. Currently building hands-on
                experience in UX, interaction design, Figma, and
                design in code through a live self-initiated product
                and the Google UX Design Professional Certificate.
                Seeking to grow within a product team while
                contributing established visual craft, systems
                thinking, and professional design experience.
              </p>

            </div>


            {/* =====================================================
                SELECTED PRODUCT & SYSTEMS WORK
            ===================================================== */}

            <div className="about-resume-section">

              <div className="about-resume-section-title">
                Selected Product & Systems Work
              </div>


              {/* PERDANA'S COMPUTER */}

              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  Perdana&apos;s Computer — Product Design & Design Engineering
                </div>

                <div className="about-resume-item-meta">
                  Independent Project | Jun 2026–Present
                </div>

                <ul className="about-resume-list">

                  <li>
                    Designed and shipped a live interactive portfolio
                    for recruiters and design teams, using a Windows
                    95-inspired desktop experience to differentiate
                    the portfolio and encourage exploration.
                  </li>

                  <li>
                    Mapped user flows and information architecture,
                    created early wireframes in Figma, then refined
                    interactions directly in code through an
                    AI-assisted design-to-code workflow.
                  </li>

                  <li>
                    Tested early versions with 3 users and iterated
                    from feedback, simplifying project navigation
                    into two clear entry points: case study and final
                    product/result.
                  </li>

                  <li>
                    Built responsive onboarding, desktop/folder
                    navigation, AI chat, project discovery, and
                    contact flows with React, HTML/CSS/JavaScript,
                    Git/GitHub, and Vercel.
                  </li>

                </ul>

              </div>


              {/* HOLOHEALTH */}

              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  HoloHealth — Scalable Iconography System
                </div>

                <div className="about-resume-item-meta">
                  Design Lead | Apr 2025–Jun 2026
                </div>

                <ul className="about-resume-list">

                  <li>
                    Led visual direction and production for 2,500+
                    veterinary, medical, health, and product-related
                    icons/assets; established master designs,
                    directed another designer, reviewed quality,
                    and managed founder communication.
                  </li>

                </ul>

              </div>


              {/* SHIPFASTER */}

              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  Shipfaster UI — Iconography Design System
                </div>

                <div className="about-resume-item-meta">
                  Iconography Designer | Jun 2024–Aug 2024
                </div>

                <ul className="about-resume-list">

                  <li>
                    Developed a scalable icon library for a Figma UI
                    kit, building reusable components and variants
                    across styles and sizes with consistent grids and
                    implementation-ready structures.
                  </li>

                </ul>

              </div>

            </div>


            {/* =====================================================
                PROFESSIONAL EXPERIENCE
            ===================================================== */}

            <div className="about-resume-section">

              <div className="about-resume-section-title">
                Professional Experience
              </div>


              {/* INDEPENDENT DEVELOPMENT */}

              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  Product Design & Design Engineering — Independent Development
                </div>

                <div className="about-resume-item-meta">
                  Jul 2026–Present
                </div>

                <ul className="about-resume-list">

                  <li>
                    Completed the Google UX Design Professional
                    Certificate while developing foundations in UX
                    principles, user research, user flows,
                    wireframing, prototyping, and usability.
                  </li>

                  <li>
                    Expanding into Figma, responsive interfaces,
                    HTML/CSS/JavaScript, React, Git/GitHub, and
                    AI-assisted design-to-code through
                    Perdana&apos;s Computer.
                  </li>

                </ul>

              </div>


              {/* CONANIA */}

              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  Conania — Visual Designer & Design Lead
                </div>

                <div className="about-resume-item-meta">
                  Mar 2016–Jul 2026 | Indonesia
                </div>

                <ul className="about-resume-list">

                  <li>
                    Delivered 3,000+ visual design projects for
                    startups, founders, and SME clients worldwide,
                    earning 2,000+ five-star ratings.
                  </li>

                  <li>
                    Built scalable visual and icon systems for
                    digital products, websites, apps, and physical
                    products; worked directly with founders to
                    clarify requirements and translate complex ideas
                    into clear design solutions.
                  </li>

                  <li>
                    Led design direction and coordinated freelance
                    designers and production partners, managing
                    feedback, quality, and delivery across concurrent
                    projects.
                  </li>

                </ul>

              </div>


              {/* SINIDIKARA */}

              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  Sinidikara — Social Media Designer
                </div>

                <div className="about-resume-item-meta">
                  Dec 2019–Jan 2022 | Jakarta, Indonesia
                </div>

                <ul className="about-resume-list">

                  <li>
                    Contributed to growing Mayora&apos;s community
                    from 40K to 100K (+150%) through audience-informed
                    content strategy, visual design, and iterative
                    experiments informed by behavior and performance
                    data.
                  </li>

                </ul>

              </div>


              {/* ADDITIONAL EXPERIENCE */}

              <p className="about-resume-copy">

                <strong>
                  Additional Experience:
                </strong>

                {' '}
                PT Bank Mandiri — Environmental Graphic Designer
                (2019) | Kementerian Sekretariat Negara — Design
                Curator (2019) | Mehibi Studio — Graphic Design
                Intern (2016)

              </p>

            </div>


            {/* =====================================================
                EDUCATION
            ===================================================== */}

            <div className="about-resume-section">

              <div className="about-resume-section-title">
                Education & Certification
              </div>


              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  Google UX Design Professional Certificate
                </div>

                <div className="about-resume-item-meta">
                  Google / Coursera | Aug 2026
                </div>

              </div>


              <div className="about-resume-item">

                <div className="about-resume-item-title">
                  Bachelor of Design, Visual Communication Design
                </div>

                <div className="about-resume-item-meta">
                  Institut Kesenian Jakarta | 2017–2021 |
                  GPA 3.70/4.00
                </div>

              </div>

            </div>


            {/* =====================================================
                SKILLS
            ===================================================== */}

            <div className="about-resume-section">

              <div className="about-resume-section-title">
                Skills
              </div>


              <p className="about-resume-skills">

                <strong>
                  Product & UX:
                </strong>

                {' '}
                User Flows, Information Architecture, Wireframing,
                Interactive Prototyping, UX/UI Design, Interaction
                Design, Responsive Design, UX Principles

              </p>


              <p className="about-resume-skills">

                <strong>
                  Systems & Visual:
                </strong>

                {' '}
                Design Systems, UI Components, Component Variants,
                Iconography Systems, Visual Systems, Typography,
                Layout & Grid

              </p>


              <p className="about-resume-skills">

                <strong>
                  Tools & Technical:
                </strong>

                {' '}
                Figma, Adobe Illustrator, Adobe Photoshop, HTML, CSS,
                JavaScript, React, Git, GitHub, Vercel, AI-Assisted
                Design & Development

              </p>

            </div>


          </div>

        </div>

      </div>

    </PropertyGroup>

  </div>

</AboutTab>

      </AboutTabs>


    </Modal.Content>
  );
}


/* ============================================================
   CUSTOM TABS
============================================================ */
function AboutTabs({ children }) {
  const tabs = React.Children.toArray(children);
  const [activeTab, setActiveTab] = React.useState(0);

  const isFirstTab = activeTab === 0;
  const isLastTab = activeTab === tabs.length - 1;

  const handleBack = () => {
    if (!isFirstTab) {
      setActiveTab((current) => current - 1);
    }
  };

  const handleNext = () => {
    if (!isLastTab) {
      setActiveTab((current) => current + 1);
    }
  };

  return (
    <div className="about-tabs">

      <div className="about-tab-buttons">

        {tabs.map((tab, index) => {
          const title = tab.props.title;

          return (
            <button
              key={title}
              type="button"
              className={`about-tab-button ${
                activeTab === index ? 'active' : ''
              }`}
              onClick={() => setActiveTab(index)}
            >
              {title}
            </button>
          );
        })}

      </div>


      <div className="about-tab-content">
        {tabs[activeTab]}
      </div>


      <div className="about-footer">

        <Button
          className="about-close-button"
          onClick={handleBack}
          disabled={isFirstTab}
        >
          Back
        </Button>

        <Button
          className="about-close-button"
          onClick={handleNext}
          disabled={isLastTab}
        >
          Next
        </Button>

      </div>

    </div>
  );
}



/* ============================================================
   CUSTOM TAB
============================================================ */

function AboutTab({ children }) {
  return children;
}


/* ============================================================
   PROPERTY GROUP
============================================================ */

function PropertyGroup({
  title,
  children,
}) {
  return (
    <fieldset className="about-property-group">

      <legend>
        {title}
      </legend>

      {children}

    </fieldset>
  );
}


/* ============================================================
   PROPERTY ROW
============================================================ */

function PropertyRow({
  label,
  value,
}) {
  return (
    <div className="about-property-row">

      <div className="about-property-label">
        {label}
      </div>

      <div className="about-property-value">
        {value}
      </div>

    </div>
  );
}


/* ============================================================
   TOOL ROW
============================================================ */

function ToolRow({
  icon,
  label,
}) {
  return (
    <div className="about-tool-row">

      <div className="about-tool-icon">
        {icon}
      </div>

      <span className="about-tool-label">
        {label}
      </span>

    </div>
  );
}
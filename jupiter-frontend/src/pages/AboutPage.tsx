import React, { useState } from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Target,
  Eye,
  Zap,
  Check,
  X,
  Wrench,
  Gauge,
  Cpu,
  Factory,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../components/PageBanner';
import isoCertificationImg from '../assets/images/about/iso certification.jpg';
import missionImg from '../assets/images/about/mission.png';
import about1FacilityImg from '../assets/images/about/about1.jpeg';

export const AboutPage: React.FC = () => {
  useSeoMeta({
    title: 'About Jupiter Industries | Brick Making Machine Manufacturer',
    description: 'Learn about Jupiter Industries, a Coimbatore-based brick making machine manufacturer specialising in 5G, fly ash, interlock and paver block machines.',
    keywords: 'About Jupiter Industries, Machinery Manufacturer Coimbatore, ISO Certified Brick Machine, 35 Years Machinery Experience, Industrial Equipment Manufacturer India',
    ogUrl: 'https://jupitergroups.in/about-us/',
  });

  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <div className="about-page-view acme-style-about-page">
      {/* =====================================================================
          1. CONSISTENT HERO BANNER WITH BREADCRUMB
          ===================================================================== */}
      <PageBanner
        title="About Jupiter Industries – Brick Making Machine Manufacturer in Coimbatore"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* =====================================================================
          2. SECTION 1: HERO / COMPANY INTRO (CREATIVE LEFT IMAGE + RIGHT TEXT)
          ===================================================================== */}
      <section className="about-intro-section">
        <div className="container">
          <div className="about-intro-grid image-on-left">
            {/* Left Column: Creative Multi-Layer Visual Studio & Floating Badges */}
            <div className="about-intro-visual-col" style={{ order: 1 }}>
              <div className="about-creative-image-composition">
                {/* Tech background frame & glowing aura */}
                <div className="about-img-backdrop-aura"></div>
                <div className="about-img-tech-border"></div>

                {/* Primary High-Res Facility Image */}
                <div className="about-main-img-card">
                  <img
                    src={about1FacilityImg}
                    alt="Jupiter Industries Facility"
                    className="about-hero-img"
                    loading="lazy"
                  />
                  <div className="img-overlay-gradient"></div>
                </div>



                {/* Top-Left Trust Badge */}
                <div className="about-floating-top-chip">
                  <ShieldCheck size={16} className="text-orange" />
                  <span>ISO 9001:2015 Heavy Certified</span>
                </div>

                {/* Bottom Experience Badge */}
                <div className="about-floating-badge creative-left-badge">
                  <div className="badge-exp-number">35+</div>
                  <div className="badge-exp-text">
                    <strong>Years Experience</strong>
                    <span>In Heavy Engineering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Intro Text & 2-Column Checklist */}
            <div className="about-intro-text-col" style={{ order: 2 }}>
              <div className="about-pill-tag">
                <span>ABOUT JUPITER INDUSTRIES</span>
              </div>

              <h2 className="about-main-title">
                Fly Ash Brick Making Machines
              </h2>

              <p className="about-intro-desc">
                Established in Coimbatore, Tamil Nadu, Jupiter Industries is a leading manufacturer and supplier of brick making machines and concrete block machinery. We manufacture 5G Brick Making Machines, Fly Ash Brick Making Machines, Interlock Brick Machines, Paver Block Machines, Hollow & Solid Block Machines and Concrete Block Making Machines for manufacturers across India.
              </p>

              <p className="about-intro-desc-secondary">
                Our machines are engineered for high production, consistent compaction, durability and reliable long-term operation. We also manufacture and supply genuine Brick Machine Spare Parts, dies, valves and critical machine components.
              </p>

              <p className="about-intro-desc-secondary">
                From machine selection and manufacturing to installation, commissioning and after-sales support, Jupiter Industries provides complete brick and block manufacturing solutions.
              </p>

              {/* 2-Column Checklist */}
              <div className="about-checklist-grid">
                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>5G Brick Making Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Fly Ash Brick Making Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Interlock Brick Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Paver Block Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Hollow & Solid Block Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Brick Machine Spares</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Quality Tested Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Pan-India Installation & Support</span>
                </div>
              </div>

              <div className="about-intro-actions">
                <Link to="/products" className="btn btn-orange">
                  <span>Explore Machinery Range</span>
                  <ArrowRight size={17} />
                </Link>
                <Link to="/contact" className="btn btn-navy-outline">
                  <span>Contact Our Engineers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SECTION 3: "OUR MISSION & VISION" (2-COLUMN MATCHING REFERENCE)
          ===================================================================== */}
      <section className="about-mission-section">
        <div className="container">
          <div className="about-section-header text-center" style={{ marginBottom: '40px' }}>
            <div className="about-pill-tag center">
              PURPOSE & DIRECTION
            </div>
            <h2 className="about-process-title">
              Our Mission & Vision
            </h2>
          </div>

          <div className="about-mission-grid">
            {/* Left Column: Mission & Vision Cards */}
            <div className="about-mission-cards-col">
              <div className="mission-card-item">
                <div className="mission-card-icon">
                  <Target size={26} />
                </div>
                <div className="mission-card-content">
                  <h3 className="mission-card-title">Our Mission</h3>
                  <p className="mission-card-desc">
                    To manufacture reliable, high-performance brick making machines, concrete block machines and paver block machines that deliver consistent production, efficient operation and long-term value for manufacturers across India.
                  </p>
                </div>
              </div>

              <div className="mission-card-item">
                <div className="mission-card-icon vision-icon">
                  <Eye size={26} />
                </div>
                <div className="mission-card-content">
                  <h3 className="mission-card-title">Our Vision</h3>
                  <p className="mission-card-desc">
                    To become a trusted Indian brick making machine manufacturer and construction machinery company, delivering advanced manufacturing solutions for fly ash bricks, interlocking bricks, paver blocks and concrete blocks across India and global markets.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Picture Card */}
            <div className="about-mission-image-col">
              <div className="mission-image-frame">
                <img
                  src={missionImg}
                  alt="Modern Construction Machinery Facility"
                  className="mission-hero-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ISO 9001:2015 QUALITY CERTIFICATION SECTION
          ===================================================================== */}
      <section className="about-certification-section" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #F8FAFC 0%, #EDF2F7 100%)' }}>
        <div className="container">
          <div className="about-section-header text-center" style={{ marginBottom: '40px' }}>
            <div className="about-pill-tag center">
              <ShieldCheck size={14} className="text-orange" />
              <span>QUALITY & STANDARDS</span>
            </div>
            <h2 className="about-process-title">
              ISO 9001:2015 Certified Quality Management
            </h2>
            <p className="about-process-subtitle">
              Jupiter Industries follows ISO 9001:2015 certified quality management practices for the manufacturing of brick making machines, concrete block machines, paver block machines and related machinery.
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '360px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 15px 35px rgba(0, 35, 61, 0.08)',
            border: '1px solid #E2E8F0'
          }}>
            {/* Certificate Image Frame */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                border: '2px solid #00233D',
                cursor: 'pointer'
              }}
              onClick={() => setShowCertModal(true)}
            >
              <img
                src={isoCertificationImg}
                alt="Jupiter Industries ISO 9001:2015 Certificate"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* Certificate Modal Popup */}
        {showCertModal && (
          <div className="modal-backdrop-overlay" onClick={() => setShowCertModal(false)} style={{ background: 'rgba(0, 0, 0, 0.85)', zIndex: 9999 }}>
            <div className="modal-content-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', background: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}>
              <div className="modal-header-bar" style={{ padding: '16px 24px', background: '#00233D', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>ISO 9001:2015 Official Certificate</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowCertModal(false)}
                  style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div style={{ padding: '20px', textAlign: 'center', background: '#0f172a' }}>
                <img
                  src={isoCertificationImg}
                  alt="ISO Certificate Full Resolution"
                  style={{ maxWidth: '100%', maxHeight: '75vh', height: 'auto', borderRadius: '6px', border: '1px solid #334155' }}
                />
              </div>
            </div>
          </div>
        )}
      </section>


      {/* =====================================================================
          5. SECTION 4: "WHY CHOOSE JUPITER INDUSTRIES?" (8 CREATIVE CARDS)
          ===================================================================== */}
      <section className="about-why-choose-section">
        <div className="container">
          <div className="about-section-header text-center">
            <div className="about-pill-tag center">
              <span>OUR CORE STRENGTHS</span>
            </div>
            <h2 className="about-process-title">
              Why Choose <span className="text-orange">Jupiter Industries</span>?
            </h2>
            <p className="about-process-subtitle">
              Jupiter Industries manufactures and supplies 5G Brick Making Machines, Fly Ash Brick Making Machines, Interlock Brick Machines, Paver Block Machines and Concrete Block Machines, backed by precision engineering, installation and genuine machine spares.
            </p>
          </div>

          {/* 8 Creative Numbered Grid Cards with Icons & Glowing Hover */}
          <div className="why-choose-8cards-grid">
            {[
              {
                num: '01',
                title: 'Heavy-Duty Brick Making Machines',
                tag: 'Zero Distortion Frame',
                desc: 'Robust structural steel construction for reliable brick manufacturing machine performance.',
                icon: ShieldCheck,
                color: '#00233D'
              },
              {
                num: '02',
                title: 'Precision CNC Brick Dies',
                tag: '±0.05mm Micro-Tolerance',
                desc: 'Precision-machined dies for accurate and consistent Fly Ash Brick Machine production.',
                icon: Wrench,
                color: '#EA580C'
              },
              {
                num: '03',
                title: 'High-Pressure Hydraulic System',
                tag: '30 - 100 Tons Force',
                desc: 'High-tonnage hydraulics for strong, dense output from brick and block making machines.',
                icon: Gauge,
                color: '#0284C7'
              },
              {
                num: '04',
                title: 'Smart PLC Automation',
                tag: 'Touchscreen HMI',
                desc: 'PLC automation for efficient operation of 5G Brick Making Machines and Paver Block Machines.',
                icon: Cpu,
                color: '#7C3AED'
              },
              {
                num: '05',
                title: 'Efficient Machine Engineering',
                tag: 'Eco Power Pack',
                desc: 'Engineered for reliable production with optimised power consumption and low maintenance.',
                icon: Zap,
                color: '#16A34A'
              },
              {
                num: '06',
                title: 'Pan-India Machine Installation',
                tag: 'Turnkey Commissioning',
                desc: 'Complete installation and commissioning for brick making machines, block machines and paver block machines across India.',
                icon: Factory,
                color: '#D97706'
              },
              {
                num: '07',
                title: 'After-Sales Service & Support',
                tag: '100% Comprehensive',
                desc: 'Technical support for brick manufacturing machines and concrete block machines to minimise downtime.',
                icon: Award,
                color: '#DC2626'
              },
              {
                num: '08',
                title: 'Brick Machine Spares Manufacturer',
                tag: 'Same-Day Dispatch',
                desc: 'Manufacturer and supplier of brick machine spare parts, dies, valves, hydraulic cylinders and machine components.',
                icon: Layers,
                color: '#0D9488'
              }
            ].map((item) => {
              const CardIcon = item.icon;
              return (
                <div key={item.num} className="why-card-8 creative-why-card">
                  {/* Top Card Header with Icon Box & Number */}
                  <div className="why-card-header">
                    <div className="why-card-icon-wrap" style={{ background: `${item.color}15`, color: item.color }}>
                      <CardIcon size={22} />
                    </div>
                    <span className="why-card-number">{item.num}</span>
                  </div>

                  {/* Highlight Feature Tag */}
                  <div className="why-card-tag-pill">
                    <span>{item.tag}</span>
                  </div>

                  <h4 className="why-card-title">{item.title}</h4>
                  <p className="why-card-desc">{item.desc}</p>

                  {/* Bottom Accent Glow Line */}
                  <div className="why-card-accent-bar"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;

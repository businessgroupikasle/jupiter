import React, { useState } from 'react';
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
  Layers,
  Cog,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageBanner } from '../components/PageBanner';
import isoCertificationImg from '../assets/images/about/iso certification.jpg';

export const AboutPage: React.FC = () => {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <div className="about-page-view acme-style-about-page">
      {/* =====================================================================
          1. CONSISTENT HERO BANNER WITH BREADCRUMB
          ===================================================================== */}
      <PageBanner
        title="About Jupiter Industries"
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
                    src="/images/about1.png"
                    alt="Jupiter Industries Facility"
                    className="about-hero-img"
                    loading="lazy"
                  />
                  <div className="img-overlay-gradient"></div>
                </div>

                {/* Overlapping Inset Live Machine Card */}
                <div className="about-inset-machine-card">
                  <img
                    src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"
                    alt="Automated Brick Manufacturing Machine"
                    className="inset-machine-img"
                    loading="lazy"
                  />
                  <div className="inset-machine-tag">
                    <Zap size={12} className="text-orange" />
                    <span>Heavy-Duty PLC Press</span>
                  </div>
                </div>

                {/* Top-Left Trust Badge */}
                <div className="about-floating-top-chip">
                  <ShieldCheck size={16} className="text-orange" />
                  <span>ISO 9001:2015 Heavy Certified</span>
                </div>

                {/* Bottom Experience Badge */}
                <div className="about-floating-badge creative-left-badge">
                  <div className="badge-exp-number">25+</div>
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
                Reliable Construction Machinery & Equipment
              </h2>

              <p className="about-intro-desc">
                Founded in Coimbatore—the engineering capital of South India—Jupiter Industries is a premier manufacturer and exporter of heavy-duty fly ash brick making machines, hollow & solid block machines, interlocking paver machines, and automatic concrete batching plants.
              </p>

              <p className="about-intro-desc-secondary">
                Our heavy-duty machinery is built with structural rigidity, high-grade forged alloys, and world-class European hydraulic & PLC automation, delivering maximum throughput with minimal maintenance.
              </p>

              {/* 2-Column Checklist */}
              <div className="about-checklist-grid">
                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Fly Ash Brick Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Solid & Hollow Block Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Interlocking Paver Machines</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Automatic Batching Plants</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>100% Quality Tested</span>
                </div>

                <div className="about-check-item">
                  <div className="check-icon-box">
                    <Check size={15} />
                  </div>
                  <span>Pan-India Onsite Setup</span>
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
                    To engineer reliable, high-performance brick and block manufacturing machinery that helps plant owners and construction businesses achieve efficient production, consistent product quality, optimized power consumption and long-term machine performance.
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
                    To become a trusted Indian construction machinery manufacturer and global engineering partner, driving the adoption of automated manufacturing solutions and sustainable building materials such as fly ash products across India and international markets.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Picture Card */}
            <div className="about-mission-image-col">
              <div className="mission-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
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
              ISO 9001:2015 Certified Excellence
            </h2>
            <p className="about-process-subtitle">
              Jupiter Industries is fully certified for quality management systems in manufacturing heavy-duty construction machinery.
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
              Over 500+ successful plant installations across India backed by decades of heavy engineering expertise.
            </p>
          </div>

          {/* 8 Creative Numbered Grid Cards with Icons & Glowing Hover */}
          <div className="why-choose-8cards-grid">
            {[
              {
                num: '01',
                title: 'Heavy-Duty Steel Body',
                tag: 'Zero Distortion Frame',
                desc: 'High-tensile fabricated chassis built with stress-relieved steel plates to absorb millions of continuous vibration cycles.',
                icon: ShieldCheck,
                color: '#00233D'
              },
              {
                num: '02',
                title: 'Precision CNC Moulds',
                tag: '±0.05mm Micro-Tolerance',
                desc: 'CNC-machined alloy steel dies heat-treated for over 250,000 flawless production cycles with razor-sharp brick edges.',
                icon: Wrench,
                color: '#EA580C'
              },
              {
                num: '03',
                title: 'High Hydraulic Press Force',
                tag: '30 - 100 Tons Force',
                desc: 'Synchronized high-tonnage hydraulic cylinders ensuring maximum brick density, high load resistance, and zero porosity.',
                icon: Gauge,
                color: '#0284C7'
              },
              {
                num: '04',
                title: 'Smart PLC Automation',
                tag: 'Touchscreen HMI',
                desc: 'Intuitive touchscreen interface with programmable recipe memory, automated cycle diagnostics, and safety lockouts.',
                icon: Cpu,
                color: '#7C3AED'
              },
              {
                num: '05',
                title: '25% Energy Savings',
                tag: 'Eco Power Pack',
                desc: 'Eco-friendly power packs with synchronized high-G vibration motors delivering 25% daily electricity savings.',
                icon: Zap,
                color: '#16A34A'
              },
              {
                num: '06',
                title: 'Pan-India On-Site Setup',
                tag: 'Turnkey Commissioning',
                desc: 'Senior factory engineers deployed directly to your site for complete erection, calibration, and operator certification.',
                icon: Factory,
                color: '#D97706'
              },
              {
                num: '07',
                title: '1-Year Warranty & Support',
                tag: '100% Comprehensive',
                desc: 'Official 1-Year Comprehensive Onsite Warranty backed by rapid field engineer support and dedicated helplines.',
                icon: Award,
                color: '#DC2626'
              },
              {
                num: '08',
                title: 'Ready OEM Spare Parts',
                tag: 'Same-Day Dispatch',
                desc: 'Immediate dispatch of genuine replacement moulds, hydraulic cylinders, directional valves, and wear liners.',
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

import React, { useState } from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Users, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import flyashMachine from '../assets/images/Machines/flyash.png';
import heroBanner1 from '../assets/images/hero-banner1.png';

interface TestimonialItem {
  id: string;
  badge: string;
  clientName: string;
  tagline: string;
  quote: string;
  author: string;
  location: string;
  machineTitle: string;
  pills: { label: string; icon: any }[];
  machineImage: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'kovai-infra',
    badge: 'FEATURED CASE STUDY',
    clientName: 'Kovai Infra & Precast',
    tagline: 'Scaled hollow block production to 25,000 units/day with Jupiter automatic hydraulic vibration press.',
    quote: '"The heavy structural body and German hydraulic valves gave us zero downtime over 3 years of non-stop operation. Outstanding service response."',
    author: 'Kovai Infra & Precast',
    location: 'Tirupur, Tamil Nadu',
    machineTitle: 'Jupiter Automatic Hydraulic Block Press',
    pills: [
      { label: '25,000 Blocks/Day', icon: TrendingUp },
      { label: 'Zero Downtime', icon: ShieldCheck },
      { label: '24/7 Field Support', icon: Users },
    ],
    machineImage: heroBanner1,
  },
  {
    id: 'arunachala',
    badge: 'SUCCESS STORY',
    clientName: 'Arunachala Traders',
    tagline: "Enhanced production capacity with Jupiter's fly ash brick making plant, delivering consistent compaction and higher profitability.",
    quote: '"Jupiter Industries delivered a reliable machine and excellent support throughout. Our production capacity and block compressive strength improved significantly."',
    author: 'Arunachala Traders',
    location: 'Coimbatore, Tamil Nadu',
    machineTitle: 'Jupiter Automatic Fly Ash Brick Making Machine',
    pills: [
      { label: 'Higher Output', icon: TrendingUp },
      { label: 'Reliable Performance', icon: ShieldCheck },
      { label: 'Long-Term Partnership', icon: Users },
    ],
    machineImage: flyashMachine,
  },
  {
    id: 'sri-amman',
    badge: 'CUSTOMER VERDICT',
    clientName: 'Sri Amman Paver Blocks',
    tagline: 'Achieved high-density interlocking paver finish with custom CNC molds and recipe PLC automation.',
    quote: '"Jupiter’s high compaction force improved our paver compressive strength to M40 grade. Customers love the sharp edges and dense surface finish."',
    author: 'Sri Amman Pavers',
    location: 'Salem, Tamil Nadu',
    machineTitle: 'Jupiter Heavy Duty Interlocking Paver Machine',
    pills: [
      { label: 'M40 High Strength', icon: TrendingUp },
      { label: 'Precision CNC Dies', icon: ShieldCheck },
      { label: 'PLC Recipe Control', icon: Users },
    ],
    machineImage: heroBanner1,
  }
];

export const SuccessStory: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = TESTIMONIALS[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="success-story-banner-light" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #F8FAFC 0%, #EDF2F7 100%)', position: 'relative' }}>
      <div className="container relative-z10">
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 50px rgba(0, 35, 61, 0.08)',
          border: '1px solid #E2E8F0'
        }}>
          <div className="success-story-grid" style={{ gap: '48px', alignItems: 'center' }}>
            {/* Left Narrative Column */}
            <div className="success-story-left-col">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', color: '#EA580C', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '16px' }}>
                <Settings size={14} className="spin-slow" />
                <span>{current.badge}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 900, color: '#00233D', marginBottom: '16px', lineHeight: 1.2 }}>
                {current.clientName}
              </h2>

              <p style={{ color: '#475569', fontSize: '1.08rem', lineHeight: 1.65, marginBottom: '24px', maxWidth: '580px' }}>
                {current.tagline}
              </p>

              {/* Machine Badge Banner */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '12px',
                padding: '12px 18px',
                marginBottom: '24px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00233D' }}>
                  ⚙️ Machine Deployed: <span style={{ color: '#EA580C' }}>{current.machineTitle}</span>
                </span>
              </div>

              {/* Feature Pills Row */}
              <div className="success-story-badges-row">
                {current.pills.map((pill, idx) => {
                  const IconComponent = pill.icon;
                  return (
                    <div 
                      key={idx} 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: '#F1F5F9',
                        border: '1px solid #E2E8F0',
                        borderRadius: '50px',
                        color: '#00233D',
                        fontSize: '0.88rem',
                        fontWeight: 700
                      }}
                    >
                      <IconComponent size={15} style={{ color: '#EA580C' }} />
                      <span>{pill.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Machine Image + Testimonial Card */}
            <div className="success-story-right-col" style={{ gap: '20px' }}>
              {/* Machine Image Preview Box */}
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#00233D',
                border: '3px solid #00233D',
                boxShadow: '0 12px 30px rgba(0, 35, 61, 0.15)',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={current.machineImage} 
                  alt={current.machineTitle}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: 'rgba(0, 35, 61, 0.85)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(6px)'
                }}>
                  Jupiter Verified Machinery Unit
                </div>
              </div>

              {/* Quote Card */}
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '28px 24px',
                boxShadow: '0 10px 30px rgba(0, 35, 61, 0.05)'
              }}>
                <div style={{ fontSize: '2.8rem', color: '#EA580C', lineHeight: 0.8, marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
                  “
                </div>
                <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: '#1E293B', fontStyle: 'italic', marginBottom: '18px' }}>
                  {current.quote}
                </p>
                
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#EA580C', marginBottom: '20px' }}>
                  – {current.author} ({current.location})
                </div>

                <Link to="/projects" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center', padding: '12px 24px', borderRadius: '10px' }}>
                  <span>See All Case Studies</span>
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Slider Navigation */}
              {TESTIMONIALS.length > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '4px' }}>
                  <button 
                    type="button" 
                    onClick={handlePrev} 
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#00233D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                    }}
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {TESTIMONIALS.map((t, idx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        style={{
                          width: activeIdx === idx ? '24px' : '10px',
                          height: '10px',
                          borderRadius: '10px',
                          background: activeIdx === idx ? '#EA580C' : '#CBD5E1',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        aria-label={`Go to testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button 
                    type="button" 
                    onClick={handleNext} 
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      color: '#00233D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                    }}
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;

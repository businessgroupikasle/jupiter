import React from 'react';
import { Award, Building2, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import flyashImg from '../assets/images/Machines/flyash.png';

export const AboutFeatureSection: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: '35+',
      label: 'Years of Experience',
      color: '#EA580C',
      bgColor: '#FFF7ED'
    },
    {
      icon: Building2,
      value: '500+',
      label: 'Projects Completed',
      color: '#0284C7',
      bgColor: '#E0F2FE'
    },
    {
      icon: ShieldCheck,
      value: '1,000+',
      label: 'Happy Customers',
      color: '#16A34A',
      bgColor: '#DCFCE7'
    },
    {
      icon: Users,
      value: '45+',
      label: 'Team Members',
      color: '#7C3AED',
      bgColor: '#F3E8FF'
    }
  ];

  return (
    <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
      <div className="container">
        <style>{`
          .about-feature-grid {
            display: grid;
            grid-template-columns: 1.18fr 1.42fr 0.85fr;
            gap: 32px;
            align-items: center;
          }
          @media (max-width: 1024px) {
            .about-feature-grid {
              grid-template-columns: 1fr;
              gap: 36px;
            }
          }
          .about-img-card:hover img {
            transform: scale(1.08) !important;
          }
          .about-stat-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 35, 61, 0.08) !important;
            border-color: #CBD5E1 !important;
          }
        `}</style>

        <div className="about-feature-grid">
          {/* Left Column: Image Card (Enlarged) */}
          <div 
            className="about-img-card"
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 15px 35px rgba(0, 35, 61, 0.08)',
              padding: '12px',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={flyashImg} 
              alt="Jupiter Industries Heavy Duty Block & Brick Machine" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '410px', 
                objectFit: 'contain',
                transform: 'scale(1.05)',
                transition: 'transform 0.4s ease'
              }}
            />
          </div>

          {/* Center Column: Text Content with 2-line title */}
          <div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              color: '#EA580C',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              ABOUT JUPITER INDUSTRIES
            </div>

            <h2 style={{
              fontSize: 'clamp(1.4rem, 1.82vw, 1.76rem)',
              fontWeight: 900,
              color: '#00233D',
              lineHeight: 1.28,
              marginBottom: '18px'
            }}>
              Quality Brick & Block Machinery,<br />
              Built on 35+ Years of Experience
            </h2>

            <p style={{
              color: '#475569',
              fontSize: '1rem',
              lineHeight: 1.65,
              marginBottom: '28px'
            }}>
              Established in 1991, Jupiter Industries is a leading manufacturer and supplier of heavy-duty concrete block machines, fly ash brick plants, and paver block equipment in Coimbatore, serving residential, commercial, and industrial infrastructure projects across India.
            </p>

            <Link 
              to="/about" 
              className="btn btn-orange"
              style={{
                padding: '14px 28px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.92rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              <span>KNOW MORE ABOUT US</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Column: 2x2 Stat Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px'
          }}>
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div 
                  key={idx}
                  className="about-stat-card"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px 14px',
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(0, 35, 61, 0.04)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: stat.bgColor,
                    color: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px'
                  }}>
                    <IconComp size={20} />
                  </div>

                  <div style={{
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    color: '#00233D',
                    lineHeight: 1.1,
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>

                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#64748B'
                  }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

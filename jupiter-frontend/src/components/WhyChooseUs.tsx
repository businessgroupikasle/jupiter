import React from 'react';
import { Wrench, Gauge, Cpu, Award, Headset, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Wrench,
      title: 'Heavy-Duty Construction',
      desc: 'Quality Steel. Built to Last.'
    },
    {
      icon: Gauge,
      title: 'High-Tonnage Hydraulics',
      desc: 'Powerful Compaction. Consistent Output.'
    },
    {
      icon: Cpu,
      title: 'Smart PLC Automation',
      desc: 'Easy Control. Efficient Production.'
    },
    {
      icon: Award,
      title: 'Precision Engineering',
      desc: 'Accurate Dies. Consistent Bricks.'
    },
    {
      icon: Headset,
      title: 'Pan-India Support',
      desc: 'Installation. Commissioning. Service.'
    },
    {
      icon: Truck,
      title: 'Genuine OEM Spares',
      desc: 'Quality Parts. Quick Availability.'
    }
  ];

  return (
    <section style={{ padding: '72px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#EA580C',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            WHY CHOOSE JUPITER INDUSTRIES?
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
            fontWeight: 900,
            color: '#00233D'
          }}>
            Built for Performance. Trusted for Reliability.
          </h2>
        </div>

        {/* 6 Features Strip */}
        <div className="why-choose-features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
          gap: '16px',
          alignItems: 'stretch'
        }}>
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '28px 16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(0, 35, 61, 0.04)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#EA580C';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(234, 88, 12, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 35, 61, 0.04)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#FFF7ED',
                  color: '#EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  border: '1px solid #FFEDD5'
                }}>
                  <IconComp size={22} />
                </div>

                <h3 style={{
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  color: '#00233D',
                  marginBottom: '6px',
                  lineHeight: 1.3
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.80rem',
                  color: '#64748B',
                  fontWeight: 600,
                  lineHeight: 1.45,
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

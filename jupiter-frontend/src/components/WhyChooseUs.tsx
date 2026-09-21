import React from 'react';
import { Wrench, Gauge, Cpu, Award, Headset, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Wrench,
      title: 'Heavy-Duty Steel',
      desc: 'IS 2062 Structural Steel & CNC Hardened Dies'
    },
    {
      icon: Gauge,
      title: 'High-Tonnage Hydraulics',
      desc: 'Up to 200 Bar Pressure & High Compaction'
    },
    {
      icon: Cpu,
      title: 'Smart PLC Automation',
      desc: 'PLC Touchscreen Controls & Auto Stacker'
    },
    {
      icon: Award,
      title: '35+ Years Legacy',
      desc: '1,000+ Operational Plants Since 1991'
    },
    {
      icon: Headset,
      title: 'Pan-India Support',
      desc: 'On-Site Commissioning & Expert Service'
    },
    {
      icon: Truck,
      title: 'Ready OEM Spares',
      desc: 'Same-Day Dispatch for Valves & Dies'
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
            Built on Quality. Driven by Reliability.
          </h2>
        </div>

        {/* 6 Features Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '20px',
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

import React from 'react';
import { Cog, BarChart3, HardHat, Wrench } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      tag: 'STAGE 01 • ENGINEERING',
      title: 'Precision CAD Engineering',
      icon: Cog,
    },
    {
      num: '02',
      tag: 'STAGE 02 • FABRICATION',
      title: 'Ultrasonic CNC Fabrication',
      icon: BarChart3,
    },
    {
      num: '03',
      tag: 'STAGE 03 • INSTALLATION',
      title: 'On-Site Commissioning',
      icon: HardHat,
    },
    {
      num: '04',
      tag: 'STAGE 04 • SUPPORT',
      title: 'Pan-India Field Support',
      icon: Wrench,
    },
  ];

  return (
    <section className="section-padding process-section-wrap" id="process-solution" style={{ background: '#001A2C', padding: '80px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '44px' }}>
          <div className="section-pill-dash-title">
            <h2 className="section-title text-white" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', fontWeight: 900, margin: 0 }}>
              End-to-End Solutions, <span className="text-orange" style={{ color: '#FF8A00' }}>From Engineering to Field Support</span>
            </h2>
          </div>
        </div>

        {/* 4 Steps Grid - Seamless on dark background without box/card frames */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.num}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 0',
                  position: 'relative',
                  transition: 'transform 0.3s ease'
                }}
              >
                {/* Stage Tag and Number */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#FF8A00', letterSpacing: '0.08em' }}>
                    {step.tag}
                  </span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'rgba(255, 255, 255, 0.2)', fontFamily: 'monospace' }}>
                    {step.num}
                  </span>
                </div>

                {/* Icon Container */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(255, 138, 0, 0.12)',
                  color: '#FF8A00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                  border: '1px solid rgba(255, 138, 0, 0.25)'
                }}>
                  <IconComponent size={24} />
                </div>

                {/* Title */}
                <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: 800, margin: 0, lineHeight: 1.35 }}>
                  {step.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

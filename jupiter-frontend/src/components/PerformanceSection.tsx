import React from 'react';
import { Trophy, BarChart2, Headphones, CheckCircle2 } from 'lucide-react';
import performanceMachineImg from '../assets/images/Machines/performance-machine.jpg';

export const PerformanceSection: React.FC = () => {
  const stats = [
    {
      num: '35+',
      title: 'Years of Experience',
      desc: 'A legacy of trust and innovation in heavy engineering since 1991.',
      icon: Trophy,
    },
    {
      num: '500+',
      title: 'Installations',
      desc: 'Machines working across India and beyond.',
      icon: BarChart2,
    },
    {
      num: '24/7',
      title: 'Support',
      desc: 'Our team is always here to keep you running.',
      icon: Headphones,
    },
  ];

  return (
    <section className="section-padding bg-white" id="built-for-performance" style={{ padding: '80px 0', background: '#FFFFFF' }}>
      <style>{`
        .perf-three-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px;
          align-items: stretch;
        }
        @media (max-width: 1080px) {
          .perf-three-col-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .perf-col-machine {
            max-width: 550px;
            margin: 0 auto;
            width: 100%;
            min-height: 340px !important;
          }
        }
        .perf-stat-item-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 20px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 14px rgba(0, 35, 61, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .perf-stat-item-card:hover {
          transform: translateY(-3px);
          border-color: #EA580C;
          box-shadow: 0 10px 24px rgba(234, 88, 12, 0.08);
        }
      `}</style>

      <div className="container">
        <div className="perf-three-col-grid">
          
          {/* Col 1: Left Side Text & Highlights */}
          <div 
            className="performance-col-text"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%'
            }}
          >
            <div>
              <div className="section-pill-dash-title" style={{ marginBottom: '14px' }}>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 2.2vw, 2.2rem)', fontWeight: 900, color: '#00233D', margin: 0 }}>
                  Built for <span className="text-orange" style={{ color: '#EA580C' }}>performance</span>
                </h2>
              </div>

              <h3 style={{
                fontSize: 'clamp(1.2rem, 1.55vw, 1.42rem)',
                fontWeight: 800,
                color: '#00233D',
                lineHeight: 1.35,
                margin: '16px 0 12px'
              }}>
                Proven technology.<br />
                Robust design.<br />
                Real results.
              </h3>

              <p style={{
                color: '#64748B',
                fontSize: '0.90rem',
                lineHeight: 1.6,
                margin: '0 0 20px 0'
              }}>
                Engineered to deliver higher productivity, lower operating costs, and superior quality blocks and bricks under non-stop heavy industrial shifts.
              </p>

              {/* Feature Highlights to fill and balance the column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Heavy-Duty Structural Steel Rigidity',
                  'Precision High Compaction Pressure',
                  'Continuous 24/7 Shift-Ready Engineering',
                  'Energy Efficient & Low Maintenance'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: '#FFF7ED', 
                      color: '#EA580C', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle2 size={13} />
                    </div>
                    <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1E293B' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Center Image (Equal 1fr Width & Equal Stretched Height) */}
          <div className="perf-col-machine" style={{ height: '100%', display: 'flex' }}>
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '2px solid #E2E8F0',
              boxShadow: '0 12px 32px rgba(0, 35, 61, 0.08)',
              background: '#F8FAFC',
              width: '100%',
              height: '100%',
              minHeight: '380px'
            }}>
              <img 
                src={performanceMachineImg} 
                alt="Jupiter Industrial Automatic Concrete Block Machine" 
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Col 3: Right Side Stats (Equal 1fr Width & Equal Distributed Height) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            gap: '14px'
          }}>
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="perf-stat-item-card"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#FFF7ED',
                    color: '#EA580C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid #FFEDD5'
                  }}>
                    <IconComp size={22} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00233D', lineHeight: 1 }}>
                        {stat.num}
                      </span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#00233D' }}>
                        {stat.title}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.45 }}>
                      {stat.desc}
                    </p>
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

export default PerformanceSection;

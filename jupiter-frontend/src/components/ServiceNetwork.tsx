import React from 'react';
import { 
  HardHat, 
  Users, 
  Truck, 
  CheckCircle2, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceNetwork: React.FC = () => {
  const hubs = [
    { name: 'Coimbatore (HQ)', type: 'Main Plant & R&D' },
    { name: 'Chennai', type: 'Regional Hub' },
    { name: 'Bengaluru', type: 'Tech Unit' },
    { name: 'Hyderabad', type: 'Service Depot' },
    { name: 'Mumbai', type: 'Western Hub' },
    { name: 'Delhi-NCR', type: 'Northern Depot' },
  ];

  const pillars = [
    {
      num: '01',
      stage: 'STAGE 01 • TURNKEY SETUP',
      title: 'Civil Foundation & Machine Assembly',
      icon: HardHat,
      color: '#EA580C',
      bgColor: '#FFF7ED',
      borderColor: '#FFEDD5',
      desc: 'Our Coimbatore factory engineers personally travel to your plant site to oversee the complete setup from the ground up.',
      points: [
        'Civil foundation inspection & anti-vibration pad alignment',
        'Hydraulic powerpack piping & 200 Bar pressure calibration',
        'PLC panel electrical connection & touchscreen integration',
        'First trial brick production run to achieve target compressive strength'
      ]
    },
    {
      num: '02',
      stage: 'STAGE 02 • WORKFORCE TRAINING',
      title: 'Hands-On Operator & Staff Training',
      icon: Users,
      color: '#0284C7',
      bgColor: '#F0F9FF',
      borderColor: '#E0F2FE',
      desc: 'We train your local workforce on-site to ensure smooth, independent plant operation from day one.',
      points: [
        'Raw material batching: fly ash, lime, gypsum & quarry dust ratio',
        'Hydraulic compaction cycle time & vibration frequency tuning',
        'Automatic pallet stacker synchronisation & curing protocol',
        'Preventative maintenance checklist to eliminate sudden breakdowns'
      ]
    },
    {
      num: '03',
      stage: 'STAGE 03 • ZERO DOWNTIME BACKUP',
      title: 'Guaranteed 24-Hour Spares Dispatch',
      icon: Truck,
      color: '#059669',
      bgColor: '#ECFDF5',
      borderColor: '#D1FAE5',
      desc: 'Central inventory of over 10,000 ready OEM replacement parts maintained for immediate emergency dispatch.',
      points: [
        'CNC hardened mould dies for pavers, bricks & hollow blocks',
        'High-pressure hydraulic cylinders, directional valves & seals',
        'Vibration table motors, planetary gearbox spares & shafts',
        'Same-day express dispatch by road or air cargo across India'
      ]
    }
  ];

  return (
    <section 
      id="service-network"
      style={{
        padding: '85px 0',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0'
      }}
    >
      <style>{`
        .service-feature-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 4px 16px rgba(0, 35, 61, 0.04);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .service-feature-card:hover {
          transform: translateY(-6px);
          border-color: #EA580C;
          box-shadow: 0 16px 36px rgba(234, 88, 12, 0.1);
        }
        .service-hub-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #00233D;
          transition: all 0.2s ease;
        }
        .service-hub-tag:hover {
          border-color: #EA580C;
          background: #FFF7ED;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFF7ED',
            border: '1px solid #FFEDD5',
            padding: '6px 18px',
            borderRadius: '50px',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#EA580C',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={15} />
            <span>PAN-INDIA FIELD SERVICE & LIFETIME COMMISSIONING</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
            fontWeight: 900,
            color: '#00233D',
            lineHeight: 1.2,
            marginBottom: '14px'
          }}>
            Direct Factory Support. <span style={{ color: '#EA580C' }}>Zero Plant Downtime.</span>
          </h2>

          <p style={{
            color: '#64748B',
            fontSize: '1.02rem',
            lineHeight: 1.6,
            margin: 0
          }}>
            Over 1,000+ brick and block machines running across 18+ Indian states, backed by Coimbatore factory engineers, full on-site setup, and guaranteed 24-hour OEM spare dispatch.
          </p>
        </div>

        {/* 3 Large Service Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="service-feature-card">
                
                {/* Header with Icon & Stage Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: item.bgColor,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${item.borderColor}`
                  }}>
                    <IconComp size={26} />
                  </div>

                  <span style={{
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    color: '#E2E8F0',
                    fontFamily: 'monospace'
                  }}>
                    {item.num}
                  </span>
                </div>

                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: item.color,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  {item.stage}
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#00233D',
                  lineHeight: 1.3,
                  marginBottom: '10px'
                }}>
                  {item.title}
                </h3>

                <p style={{
                  color: '#64748B',
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  marginBottom: '20px'
                }}>
                  {item.desc}
                </p>

                {/* Bullet Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} style={{ color: item.color, flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Pan-India Network Corridor Banner */}
        <div style={{
          background: '#001E36',
          borderRadius: '20px',
          padding: '28px 32px',
          color: '#FFFFFF',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          boxShadow: '0 12px 30px rgba(0, 30, 54, 0.12)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#FF8A00',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}>
              <MapPin size={14} />
              <span>DIRECT REGIONAL SERVICE CORRIDORS</span>
            </div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 900, margin: '0 0 10px', color: '#FFFFFF' }}>
              Coimbatore Factory to Every Industrial Hub Across India
            </h4>
            
            {/* City Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {hubs.map((hub, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#F1F5F9'
                  }}
                >
                  <span style={{ color: '#FF8A00', marginRight: '4px' }}>•</span>
                  {hub.name}
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="tel:+919342919060"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '8px',
                background: '#EA580C',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: '0 6px 18px rgba(234, 88, 12, 0.35)'
              }}
            >
              <Phone size={16} />
              <span>Call Service: +91 93429 19060</span>
            </a>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.88rem',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>Book Engineer Visit</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceNetwork;

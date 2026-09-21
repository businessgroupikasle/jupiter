import React from 'react';
import { Link } from 'react-router-dom';
import { Cog, Wrench, Factory, Layers, Layers3, Cpu, ShieldCheck } from 'lucide-react';

export const TrustedLogos: React.FC = () => {
  const items = [
    { title: 'Fly Ash Brick Machine', slug: 'fly-ash-brick-machine', icon: Cog },
    { title: 'Hollow and Solid Block Machine', slug: 'hollow-and-solid-block-machine', icon: Layers },
    { title: 'Inter Block Making Machine', slug: 'inter-block-making-machine', icon: Layers3 },
    { title: 'Paver Block Machine', slug: 'paver-block-machine', icon: ShieldCheck },
    { title: 'Batching Plant', slug: 'batching-plant', icon: Factory },
    { title: 'Storage Silo', slug: 'storage-silo', icon: Cpu },
    { title: 'Machine Spares', slug: 'spares', icon: Wrench },
  ];

  // Tripled list for infinite seamless marquee loop
  const tickerList = [...items, ...items, ...items];

  return (
    <section style={{ 
      padding: '24px 0 20px 0', 
      background: '#FFFFFF', 
      borderBottom: '1px solid #E2E8F0',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <span style={{ 
          fontSize: '0.72rem', 
          fontWeight: 800, 
          color: '#EA580C', 
          letterSpacing: '0.12em', 
          textTransform: 'uppercase' 
        }}>
          HEAVY MACHINERY CATALOG & PRODUCTS
        </span>
      </div>

      <style>{`
        @keyframes scrollRightToLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .right-to-left-track {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 10px 0;
          animation: scrollRightToLeft 25s linear infinite;
        }
        .right-to-left-track:hover {
          animation-play-state: paused;
        }
        .right-to-left-track a {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .right-to-left-track a:hover {
          background: #FFF7ED !important;
          border-color: #EA580C !important;
          box-shadow: 0 4px 18px rgba(234, 88, 12, 0.25) !important;
        }
      `}</style>

      {/* Overflow wrapper with ample vertical breathing room so borders & shadows are never cut off */}
      <div style={{ 
        width: '100%', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap', 
        padding: '10px 0',
        margin: '0'
      }}>
        <div className="right-to-left-track">
          {tickerList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <Link
                key={idx}
                to={`/products/${item.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 18px',
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '30px',
                  color: '#00233D',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(0, 35, 61, 0.05)',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#EA580C',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComp size={13} />
                </div>
                <span style={{ color: '#00233D' }}>{item.title}</span>
                <span style={{ color: '#EA580C', fontWeight: 800, fontSize: '0.85rem' }}>→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

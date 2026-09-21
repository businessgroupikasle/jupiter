import React from 'react';
import { Link } from 'react-router-dom';
import { Cog, Wrench, Factory, Layers, Layers3, Cpu, ShieldCheck } from 'lucide-react';

export const ProductTickerBar: React.FC = () => {
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
    <div style={{
      width: '100%',
      background: 'linear-gradient(90deg, #001524 0%, #00233D 50%, #001524 100%)',
      borderTop: '2px solid #EA580C',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '16px 0',
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'nowrap'
    }}>
      <style>{`
        @keyframes marqueeContinuous {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-marquee-track {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          padding: 6px 0;
          animation: marqueeContinuous 28s linear infinite;
        }
        .ticker-marquee-track:hover {
          animation-play-state: paused;
        }
        .ticker-item-pill:hover {
          background: rgba(234, 88, 12, 0.25) !important;
          border-color: #EA580C !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="ticker-marquee-track">
        {tickerList.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <Link
              key={idx}
              to={`/products/${item.slug}`}
              className="ticker-item-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 24px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '50px',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 800,
                letterSpacing: '0.02em',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#EA580C',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <IconComp size={15} />
              </div>
              <span style={{ color: '#F8FAFC' }}>{item.title}</span>
              <span style={{ color: '#EA580C', fontWeight: 900, marginLeft: '4px' }}>→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

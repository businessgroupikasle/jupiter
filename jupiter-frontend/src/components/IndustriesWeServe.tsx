import React from 'react';
import { ArrowRight, Building2, HardHat, Layers, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export const IndustriesWeServe: React.FC = () => {
  const industries = [
    {
      id: 'building-construction',
      title: 'Building Construction',
      tag: 'Fly Ash & Solid Blocks',
      desc: 'Supplying high-strength fly ash bricks and hollow concrete blocks for residential, commercial, and industrial structures.',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      stat: '500+ Projects',
      color: '#EA580C'
    },
    {
      id: 'infrastructure-highways',
      title: 'Infrastructure & Highways',
      tag: 'Kerb Stones & Channels',
      desc: 'Heavy-duty concrete kerb stones, culverts, and sustainable fly ash utilization for national highways & smart city projects.',
      icon: HardHat,
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
      stat: 'Pan-India Delivery',
      color: '#0284C7'
    },
    {
      id: 'precast-masonry',
      title: 'Precast & Concrete Products',
      tag: 'Custom Mould Precision',
      desc: 'Precision precast concrete elements, boundary wall slabs, and high-tonnage structural blocks with zero micro-cracks.',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      stat: 'M40 Grade Strength',
      color: '#16A34A'
    },
    {
      id: 'real-estate-townships',
      title: 'Commercial Real Estate',
      tag: 'Paver & Interlocking Tiles',
      desc: 'Vibrant interlocking paver blocks, grass pavers, and pathway tiles for IT parks, shopping malls, and housing townships.',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      stat: '250k+ Cycles/Mould',
      color: '#7C3AED'
    },
  ];

  return (
    <section className="industries-serve-section" style={{ padding: '80px 0', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <div className="about-pill-tag center" style={{ marginBottom: '14px' }}>
            <span>APPLICATIONS & MARKETS</span>
          </div>
          
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)', fontWeight: 900, color: '#00233D', marginBottom: '12px' }}>
            Industries We <span className="text-orange">Serve</span>
          </h2>

          <p style={{ color: '#64748B', fontSize: '1.02rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Jupiter heavy-duty machinery powers major building construction, national infrastructure, and precast manufacturing projects across India.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="industries-cards-grid">
          {industries.map((ind) => {
            const IconComp = ind.icon;
            return (
              <div key={ind.id} className="industry-card-item">
                {/* Image Container with Badge */}
                <div className="industry-card-img">
                  <img src={ind.image} alt={ind.title} loading="lazy" />
                  <div className="industry-badge-chip">
                    <IconComp size={14} style={{ color: '#EA580C' }} />
                    <span>{ind.tag}</span>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="industry-card-content">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: ind.color, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {ind.stat}
                    </span>
                  </div>

                  <h3 className="industry-title">{ind.title}</h3>
                  <p className="industry-desc">{ind.desc}</p>
                  
                  <div className="industry-card-footer">
                    <Link 
                      to="/products" 
                      className="industry-action-link"
                      aria-label={`Explore machines for ${ind.title}`}
                    >
                      <span>Explore Machinery</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;

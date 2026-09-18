import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      initials: 'MK',
      name: 'Murugan K',
      location: 'Pollachi, Tamil Nadu',
      quote: '"Prompt customer support and reliable fleet delivery. The interlocking bricks and vibration block press have made our boundary and pathway projects effortless."'
    },
    {
      initials: 'RK',
      name: 'Ramesh Kumar',
      location: 'Coimbatore, Tamil Nadu',
      quote: '"The fly ash brick machine from Jupiter Industries exceeded our expectations. The quality, compressive strength, and timely delivery made our production process smooth and hassle-free."'
    },
    {
      initials: 'PS',
      name: 'Prakash S',
      location: 'Tiruppur, Tamil Nadu',
      quote: '"We purchased paver block machinery for our commercial precast project, and the finish was excellent. Their service team was supportive and delivered exactly as promised."'
    }
  ];

  return (
    <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
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
            WHAT OUR CLIENTS SAY
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
            fontWeight: 900,
            color: '#00233D',
            marginBottom: '10px'
          }}>
            Trusted by Builders, Contractors & Customers
          </h2>

          <p style={{
            color: '#64748B',
            fontSize: '0.98rem',
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            Hear from our satisfied customers across Tamil Nadu and South India who rely on Jupiter for consistent machinery quality and on-time service delivery.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '32px 28px',
                boxShadow: '0 4px 14px rgba(0, 35, 61, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* 5 Stars Rating & Quote Mark */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '4px', color: '#F59E0B' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <span style={{ fontSize: '2.4rem', color: '#CBD5E1', lineHeight: 0.8, fontFamily: 'Georgia, serif' }}>“</span>
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: '#334155',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  marginBottom: '28px'
                }}>
                  {rev.quote}
                </p>
              </div>

              {/* Author Initials & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  border: '1.5px solid #10B981',
                  color: '#059669',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {rev.initials}
                </div>

                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#00233D' }}>
                    {rev.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                    {rev.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

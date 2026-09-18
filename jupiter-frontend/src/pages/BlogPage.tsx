import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Home, Settings, Mail, Sparkles } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';

export const BlogPage: React.FC = () => {
  return (
    <div className="blog-page-view">
      <PageBanner
        title="Blog & Insights"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="section-padding bg-white" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container">
          <div style={{
            maxWidth: '680px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '60px 30px',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 35px rgba(0, 35, 61, 0.05)'
          }}>
            {/* Orange Icon Circle */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#FFF7ED',
              color: '#FF9200',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(255, 146, 0, 0.15)'
            }}>
              <Clock size={40} />
            </div>

            {/* Sub-badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FF9200',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '12px'
            }}>
              <Sparkles size={16} />
              <span>Under Construction</span>
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              color: '#00233D',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Coming <span className="text-orange">Soon</span>
            </h2>

            {/* Description */}
            <p style={{
              color: '#5A6E85',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto 36px auto'
            }}>
              We are working on bringing you informative technical guides, plant ROI analyses, and industry knowledge. Please check back soon!
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn-orange" style={{ padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Home size={18} />
                <span>Back to Home</span>
              </Link>
              <Link
                to="/products"
                className="btn"
                style={{
                  background: '#092039',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Explore Products</span>
                <ArrowRight size={16} className="text-orange" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



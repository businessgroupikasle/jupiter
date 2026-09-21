import React, { useState } from 'react';
import { ArrowRight, Play, Settings, BarChart3, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../assets/images/images';

interface HeroProps {
  onOpenVideoModal?: (videoUrl: string, title?: string) => void;
}

const DEFAULT_HERO_IMAGE = IMAGES.heroBanner;

export const Hero: React.FC<HeroProps> = ({ onOpenVideoModal }) => {
  const [imgSrc] = useState(DEFAULT_HERO_IMAGE);
  const [selfModalOpen, setSelfModalOpen] = useState(false);

  const handleWatchStory = () => {
    if (onOpenVideoModal) {
      onOpenVideoModal('/banner-video.mp4', 'Jupiter Industries - Watch Our Story');
    } else {
      setSelfModalOpen(true);
    }
  };

  return (
    <section 
      className="hero-section"
      style={{
        height: '800px',
        minHeight: '800px',
        backgroundPosition: 'right top',
        backgroundImage: `linear-gradient(90deg, rgba(0, 24, 39, 0.95) 0%, rgba(0, 24, 39, 0.85) 38%, rgba(0, 24, 39, 0.4) 62%, rgba(0, 24, 39, 0.1) 82%, transparent 100%), url(${imgSrc})`
      }}
    >
      <div className="container hero-container-custom">
        <div className="hero-grid-layout">
          {/* Left Text Content Overlay */}
          <div className="hero-text-column">
            <div className="hero-pill-badge">
              <span>BRICK & CONCRETE MACHINERY</span>
            </div>
            
            <h1 className="hero-main-heading">
              Machines that move <br />
              your <span className="text-orange">business forward.</span>
            </h1>
            
            <p className="hero-description-text">
              Reliable, high-performance brick and concrete machinery for a stronger, more sustainable tomorrow.
            </p>

            <div className="hero-cta-buttons">
              <Link to="/products" className="btn btn-orange">
                <span>View Our Solutions</span>
                <ArrowRight size={18} />
              </Link>
              
              <button onClick={handleWatchStory} className="btn-watch-story">
                <span className="watch-story-icon">
                  <Play size={14} fill="#FF9200" color="#FF9200" />
                </span>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* 3 Stats directly inside Hero column */}
            <div className="hero-stats-inline">
              <div className="stat-pill-item">
                <div className="stat-pill-icon">
                  <Settings size={22} className="text-orange" />
                </div>
                <div>
                  <div className="stat-pill-num">35+</div>
                  <div className="stat-pill-label">Years of Experience</div>
                </div>
              </div>

              <div className="stat-pill-item">
                <div className="stat-pill-icon">
                  <BarChart3 size={22} className="text-orange" />
                </div>
                <div>
                  <div className="stat-pill-num">500+</div>
                  <div className="stat-pill-label">Installations</div>
                </div>
              </div>

              <div className="stat-pill-item">
                <div className="stat-pill-icon">
                  <MapPin size={22} className="text-orange" />
                </div>
                <div>
                  <div className="stat-pill-num">Pan India</div>
                  <div className="stat-pill-label">Installation & Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {selfModalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setSelfModalOpen(false)} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content-card" 
            style={{ maxWidth: '860px', width: '100%', background: '#001827', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)' }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Close Button Floating at Top-Right */}
            <button 
              className="modal-close-btn" 
              onClick={() => setSelfModalOpen(false)}
              aria-label="Close video modal"
              style={{ 
                position: 'absolute', 
                top: '12px', 
                right: '12px', 
                zIndex: 20, 
                background: 'rgba(0, 18, 31, 0.85)', 
                border: '1px solid rgba(255, 255, 255, 0.25)', 
                borderRadius: '50%', 
                width: '38px', 
                height: '38px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#FFFFFF', 
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
            >
              <X size={20} />
            </button>
            <div className="modal-body-content" style={{ padding: 0, backgroundColor: '#000' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <video
                  src="/banner-video.mp4"
                  controls
                  autoPlay
                  playsInline
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

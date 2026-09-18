import React, { useState } from 'react';
import { ArrowRight, Play, Settings, BarChart3, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../assets/images/images';

interface HeroProps {
  onOpenVideoModal?: (videoUrl: string) => void;
}

const DEFAULT_HERO_IMAGE = IMAGES.heroBanner;

export const Hero: React.FC<HeroProps> = ({ onOpenVideoModal }) => {
  const [imgSrc] = useState(DEFAULT_HERO_IMAGE);

  const handleWatchStory = () => {
    if (onOpenVideoModal) {
      onOpenVideoModal('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
    } else {
      const videoSection = document.getElementById('machinery-action');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 24, 39, 0.95) 0%, rgba(0, 24, 39, 0.85) 38%, rgba(0, 24, 39, 0.4) 62%, rgba(0, 24, 39, 0.1) 82%, transparent 100%), url(${imgSrc})`
      }}
    >
      <div className="container hero-container-custom">
        <div className="hero-grid-layout">
          {/* Left Text Content Overlay */}
          <div className="hero-text-column">
            <div className="hero-pill-badge">
              <span className="hero-pill-dash"></span>
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
    </section>
  );
};

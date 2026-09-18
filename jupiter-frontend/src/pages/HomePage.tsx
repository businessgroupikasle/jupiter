import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { TrustedLogos } from '../components/TrustedLogos';
import { AboutFeatureSection } from '../components/AboutFeatureSection';
import { ApplicationCards } from '../components/ApplicationCards';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CustomerReviews } from '../components/CustomerReviews';
import { PerformanceSection } from '../components/PerformanceSection';
import { MachineryVideoSection } from '../components/MachineryVideoSection';
import { FAQSection } from '../components/FAQSection';
import { X } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const handleOpenVideo = (url: string, title: string = 'Machinery in Action') => {
    setVideoModal({ isOpen: true, url, title });
  };

  const handleCloseVideo = () => {
    setVideoModal({ isOpen: false, url: '', title: '' });
  };

  return (
    <main>
      {/* 1. Original Hero Section with 3-stat strip */}
      <Hero onOpenVideoModal={handleOpenVideo} />

      {/* 3. Trusted By Leading Companies Logo Bar */}
      <TrustedLogos />

      {/* 3. About Jupiter Industries (Matching Screenshot 1 Layout) */}
      <AboutFeatureSection />

      {/* 4. Explore Product Categories (Matching Screenshot 2 Layout) */}
      <ApplicationCards />

      {/* 5. Why Choose Jupiter Industries (6-Icon Strip Matching Screenshot 3) */}
      <WhyChooseUs />

      {/* 6. Performance Section */}
      <PerformanceSection />

      {/* 7. Client Reviews & Google Rating (Matching Screenshot 4 Layout) */}
      <CustomerReviews />

      {/* 8. Machinery in Action Video Showcase */}
      <MachineryVideoSection />

      {/* 11. FAQ Section */}
      <FAQSection />

      {/* Video Modal Popup */}
      {videoModal.isOpen && (
        <div className="modal-backdrop-overlay" onClick={handleCloseVideo}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{videoModal.title}</h3>
              <button 
                className="modal-close-btn" 
                onClick={handleCloseVideo}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body-content" style={{ padding: 0 }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title={videoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;

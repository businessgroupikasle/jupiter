import React, { useState } from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
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
  useSeoMeta({
    title: 'Jupiter Industries | Fly Ash Brick & Concrete Block Machine Manufacturer',
    description: 'Jupiter Industries – Leading manufacturer of fly ash brick machines, hollow block machines, paver block plants, batching plants and storage silos. Pan-India installation & service support.',
    keywords: 'Fly Ash Brick Machine, Concrete Block Machine, Paver Block Machine, Interlocking Brick Machine, Batching Plant, Storage Silo, Coimbatore Machinery Manufacturer, Jupiter Industries',
    ogUrl: 'https://jupitergroups.in/',
  });

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
        <div className="modal-backdrop-overlay" onClick={handleCloseVideo} style={{ zIndex: 99999 }}>
          <div 
            className="modal-content-card" 
            style={{ maxWidth: '860px', width: '100%', background: '#001827', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)' }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Close Button Floating at Top-Right */}
            <button 
              className="modal-close-btn" 
              onClick={handleCloseVideo}
              aria-label="Close modal"
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
                {videoModal.url.endsWith('.mp4') || videoModal.url.includes('banner-video') ? (
                  <video
                    src={videoModal.url}
                    controls
                    autoPlay
                    playsInline
                    onEnded={handleCloseVideo}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    src={videoModal.url || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'}
                    title={videoModal.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;

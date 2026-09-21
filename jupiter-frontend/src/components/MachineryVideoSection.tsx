import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { getStoredVideos, getYouTubeEmbedUrl } from '../services/videoService';

interface MachineryVideoSectionProps {
  onOpenVideoModal?: (videoUrl: string, title?: string) => void;
}

export const MachineryVideoSection: React.FC<MachineryVideoSectionProps> = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [storedVideos, setStoredVideos] = useState(getStoredVideos());

  React.useEffect(() => {
    const handleUpdate = () => setStoredVideos(getStoredVideos());
    window.addEventListener('jupiter_videos_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('jupiter_videos_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const videos = storedVideos.slice(0, 4);

  const currentVideo = videos[activeVideoIndex] || videos[0];

  const handleSelectVideo = (index: number) => {
    setActiveVideoIndex(index);
    setIsPlaying(true); // Plays directly in-place without popup modal!
  };

  const getEmbedSrc = (video: any) => {
    if (!video) return '';
    const rawUrl = video.videoUrl || video.embedUrl || '';
    const baseEmbed = getYouTubeEmbedUrl(rawUrl);
    return baseEmbed.includes('autoplay=1') ? baseEmbed : `${baseEmbed}?autoplay=1`;
  };

  return (
    <section className="section-padding" id="machinery-action" style={{ background: 'linear-gradient(180deg, #EDF2F7 0%, #F8FAFC 100%)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header-top" style={{ marginBottom: '32px' }}>
          <div>
            <h2 className="section-title" style={{ color: '#00233D' }}>
              Machinery <span className="text-orange">in Action</span>
            </h2>
            <p className="section-subtitle" style={{ color: '#475569' }}>
              See our machines on the production floor.
            </p>
          </div>
        </div>

        {/* Video Layout: Showcase on left + 4 Playlist Cards on right */}
        <div className="machinery-video-grid">
          {/* Main Video Box (Plays directly in-place) */}
          <div className="video-main-showcase" style={{ minHeight: '430px' }}>
            {isPlaying && currentVideo ? (
              <iframe
                key={currentVideo.id || currentVideo.videoUrl}
                src={getEmbedSrc(currentVideo)}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '430px',
                  border: 'none',
                  borderRadius: 'inherit'
                }}
              />
            ) : (
              <div 
                onClick={() => setIsPlaying(true)}
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '100%', 
                  minHeight: '430px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'flex-end' 
                }}
              >
                <img src={currentVideo?.image || (currentVideo as any)?.thumbnail} alt={currentVideo?.title} />
                
                <button className="video-play-center-btn" aria-label="Play video">
                  <Play size={28} fill="white" style={{ marginLeft: '4px' }} />
                </button>

                <div className="video-main-caption">
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '6px' }}>
                    {currentVideo?.title}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.92rem' }}>
                    Watch our machines in action • {currentVideo?.duration}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Playlist Stack */}
          <div className="video-playlist-stack" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {videos.map((vid, idx) => {
              const isActive = activeVideoIndex === idx;
              return (
                <div 
                  key={vid.id}
                  onClick={() => handleSelectVideo(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: isActive ? '#FFF7ED' : '#FFFFFF',
                    border: isActive ? '2px solid #EA580C' : '1.5px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 8px 20px rgba(234, 88, 12, 0.15)' : '0 4px 12px rgba(0, 35, 61, 0.04)',
                    transform: isActive ? 'translateX(4px)' : 'none'
                  }}
                >
                  <div className="playlist-thumb-box" style={{ width: '95px', height: '65px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img src={vid.image || (vid as any).thumbnail} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="playlist-mini-play" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0, 35, 61, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={12} fill="white" />
                    </div>
                  </div>

                  <div className="playlist-info-block" style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#00233D', marginBottom: '4px', lineHeight: 1.3 }}>
                      {vid.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EA580C' }}>
                      ⏱️ {vid.duration}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

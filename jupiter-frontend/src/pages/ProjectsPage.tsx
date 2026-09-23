import React, { useState, useEffect } from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { MapPin, Play, ArrowRight, X, ExternalLink, Image as ImageIcon, Film, ZoomIn, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VideoItem, getStoredVideos, getYouTubeEmbedUrl, fetchVideosFromDb } from '../services/videoService';
import { GalleryPhotoItem, getStoredGalleryPhotos, fetchGalleryPhotosFromDb } from '../services/galleryService';

import { PageBanner } from '../components/PageBanner';

export const ProjectsPage: React.FC = () => {
  useSeoMeta({
    title: 'Projects & Gallery | Jupiter Industries Machinery Installations',
    description: 'View Jupiter Industries’ project gallery – 500+ successful brick & block machine installations across India. Watch our machines in action through videos and customer site photos.',
    keywords: 'Jupiter Industries Projects, Brick Machine Installation Gallery, Block Machine Videos India, Industrial Machinery Site Work, Fly Ash Machine Customer Projects',
    ogUrl: 'https://jupitergroups.in/projects',
  });

  // Main Dual Options Switcher: 'videos' or 'photos'
  const [mainTab, setMainTab] = useState<'photos' | 'videos'>('videos');

  const [videos, setVideos] = useState<VideoItem[]>(getStoredVideos());
  const [photos, setPhotos] = useState<GalleryPhotoItem[]>(getStoredGalleryPhotos());
  const [activeVideoCategory, setActiveVideoCategory] = useState<string>('All');
  const [activePhotoCategory, setActivePhotoCategory] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);

  // Sync with Admin additions or modifications for both videos and photos
  useEffect(() => {
    fetchVideosFromDb().then(res => {
      if (res && res.length > 0) setVideos(res);
    }).catch(() => { });

    fetchGalleryPhotosFromDb().then(res => {
      if (res && res.length > 0) setPhotos(res);
    }).catch(() => { });

    const handleVideoUpdate = () => {
      setVideos(getStoredVideos());
    };
    const handleGalleryUpdate = () => {
      setPhotos(getStoredGalleryPhotos());
    };

    window.addEventListener('jupiter_videos_updated', handleVideoUpdate);
    window.addEventListener('jupiter_gallery_updated', handleGalleryUpdate);

    return () => {
      window.removeEventListener('jupiter_videos_updated', handleVideoUpdate);
      window.removeEventListener('jupiter_gallery_updated', handleGalleryUpdate);
    };
  }, []);

  const videoCategories = ['All', 'Block Machines', 'Brick Machines', 'Paver Machines', 'Batching & Mixers', 'Factory Tour'];
  const photoCategories = ['All', 'Block Machines', 'Fly Ash Plants', 'Paver Units', 'Batching Mixers', 'Precision Moulds', 'Factory Infrastructure'];

  const filteredVideos = activeVideoCategory === 'All'
    ? (videos || [])
    : (videos || []).filter(v => v && v.category === activeVideoCategory);

  const filteredPhotos = activePhotoCategory === 'All'
    ? (photos || [])
    : (photos || []).filter(p => p && p.category === activePhotoCategory);

  return (
    <div className="projects-page-view">
      {/* Page Banner with Breadcrumb */}
      <PageBanner
        title="Machinery Gallery & Demonstrations"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      {/* DUAL OPTION SWITCHER SECTION (WHITE BACKGROUND) */}
      <section className="section-padding" style={{ background: '#FFFFFF', paddingTop: '40px', paddingBottom: '70px' }}>
        <div className="container">
          {/* Main 2-Option Tabs Switcher */}
          <div className="gallery-tab-switcher-wrap">
            <div className="gallery-tab-switcher" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mainTab === 'photos'}
                className={`gallery-tab-btn ${mainTab === 'photos' ? 'active' : ''}`}
                onClick={() => setMainTab('photos')}
              >
                <ImageIcon size={19} />
                <span>Machine Images</span>
                <span className="gallery-tab-badge">{photos.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={mainTab === 'videos'}
                className={`gallery-tab-btn ${mainTab === 'videos' ? 'active' : ''}`}
                onClick={() => setMainTab('videos')}
              >
                <Film size={19} />
                <span>Youtube Videos</span>
                <span className="gallery-tab-badge">{videos.length}</span>
              </button>
            </div>
          </div>

          {/* =================================================================
              VIEW 1: MACHINERY IN ACTION (VIDEOS)
              ================================================================= */}
          {mainTab === 'videos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div className="section-pill-dash-title" style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#FF9200', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em' }}>
                      YOUTUBE DEMONSTRATION VIDEOS ({videos.length})
                    </span>
                  </div>
                  <h2 className="section-title" style={{ fontSize: '1.9rem', color: '#001827', margin: 0 }}>
                    Live Machinery <span className="text-orange">Video Trials</span>
                  </h2>
                </div>

                {/* Video Category Filter Pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {videoCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveVideoCategory(cat)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: activeVideoCategory === cat ? '1.5px solid #FF9200' : '1px solid #CBD5E1',
                        background: activeVideoCategory === cat ? '#FF9200' : '#F8FAFC',
                        color: activeVideoCategory === cat ? '#FFFFFF' : '#334155',
                        fontSize: '0.84rem',
                        fontWeight: activeVideoCategory === cat ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: activeVideoCategory === cat ? '0 2px 8px rgba(255, 146, 0, 0.3)' : 'none'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {filteredVideos.map((vid) => (
                  <div
                    key={vid.id}
                    className="gallery-video-card"
                    onClick={() => setSelectedVideo(vid)}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                      boxShadow: '0 4px 18px rgba(0, 24, 39, 0.07)'
                    }}
                  >
                    {/* Thumbnail Container */}
                    <div style={{ position: 'relative', width: '100%', height: '200px', background: '#0F172A', overflow: 'hidden' }}>
                      <img
                        src={vid.image}
                        alt={vid.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      />

                      {/* Category Tag */}
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(0, 24, 39, 0.88)',
                        color: '#FF9200',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 146, 0, 0.4)',
                        backdropFilter: 'blur(4px)'
                      }}>
                        {vid.category || 'Machinery'}
                      </span>

                      {/* Duration Tag */}
                      <span style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.85)',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {vid.duration}
                      </span>

                      {/* Play Button Overlay */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: '#FF0000',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(255, 0, 0, 0.4)',
                        transition: 'transform 0.2s ease'
                      }}>
                        <Play size={22} fill="white" style={{ marginLeft: '3px' }} />
                      </div>
                    </div>

                    {/* Video Info */}
                    <div style={{ padding: '18px 18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', background: '#FFFFFF' }}>
                      <div>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#001827', lineHeight: 1.4, marginBottom: '6px' }}>
                          {vid.title}
                        </h3>
                        {vid.description && (
                          <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
                            {vid.description}
                          </p>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                        <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>
                          {vid.views}
                        </span>
                        <span style={{ color: '#FF9200', fontSize: '0.84rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span>Watch Video</span>
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              VIEW 2: MACHINE IMAGES & FACTORY PHOTOS
              ================================================================= */}
          {mainTab === 'photos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div className="section-pill-dash-title" style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#FF9200', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em' }}>
                      MACHINE PHOTOS & DEPLOYMENTS ({photos.length})
                    </span>
                  </div>
                  <h2 className="section-title" style={{ fontSize: '1.9rem', color: '#001827', margin: 0 }}>
                    High-Definition <span className="text-orange">Equipment Photos</span>
                  </h2>
                </div>

                {/* Photo Category Filter Pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {photoCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActivePhotoCategory(cat)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: activePhotoCategory === cat ? '1.5px solid #FF9200' : '1px solid #CBD5E1',
                        background: activePhotoCategory === cat ? '#FF9200' : '#F8FAFC',
                        color: activePhotoCategory === cat ? '#FFFFFF' : '#334155',
                        fontSize: '0.84rem',
                        fontWeight: activePhotoCategory === cat ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: activePhotoCategory === cat ? '0 2px 8px rgba(255, 146, 0, 0.3)' : 'none'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos Grid */}
              {filteredPhotos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 20px', background: '#F8FAFC', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
                  <ImageIcon size={42} style={{ color: '#94A3B8', marginBottom: '12px' }} />
                  <p style={{ color: '#64748B', fontSize: '1rem', margin: 0 }}>No gallery photos currently uploaded for this category.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {filteredPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="gallery-photo-card"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img src={photo.image} alt={photo.title} />

                      {/* Category Tag */}
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(0, 24, 39, 0.9)',
                        color: '#FF9200',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 146, 0, 0.4)',
                        zIndex: 2
                      }}>
                        {photo.category}
                      </span>

                      {/* Zoom Icon Button */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.65)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                      }}>
                        <ZoomIn size={16} />
                      </div>

                      {/* Photo Overlay Info */}
                      <div className="gallery-photo-overlay">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FF9200', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                          <MapPin size={13} />
                          <span>{photo.location}</span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: '4px' }}>
                          {photo.title}
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
                          {photo.output}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Call to Action */}
          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-orange" style={{ padding: '14px 32px' }}>
              <span>Request Machinery Quotation</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          POPUP YOUTUBE VIDEO PLAYER MODAL
          ================================================================= */}
      {selectedVideo && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setSelectedVideo(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 15, 30, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <div
            className="modal-content-card"
            style={{
              maxWidth: '820px',
              width: '100%',
              padding: 0,
              overflow: 'hidden',
              background: '#001827',
              borderRadius: '14px',
              border: '1px solid rgba(255, 146, 0, 0.3)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', background: '#00121F', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <span style={{ color: '#FF9200', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {selectedVideo.category || 'Machinery Demonstration'}
                </span>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                className="modal-close-btn"
                style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => setSelectedVideo(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Iframe Container (16:9 Aspect Ratio) */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000' }}>
              <iframe
                title={selectedVideo.title}
                src={selectedVideo.embedUrl || getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '14px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001827', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.84rem' }}>
                Duration: {selectedVideo.duration} • {selectedVideo.views}
              </span>
              {selectedVideo.videoUrl && (
                <a
                  href={selectedVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-orange"
                  style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                >
                  <span>Watch Directly on YouTube</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          POPUP IMAGE LIGHTBOX MODAL
          ================================================================= */}
      {selectedPhoto && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 15, 30, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <div
            className="modal-content-card"
            style={{
              maxWidth: '850px',
              width: '100%',
              padding: 0,
              overflow: 'hidden',
              background: '#001827',
              borderRadius: '14px',
              border: '1px solid rgba(255, 146, 0, 0.3)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', width: '100%', maxHeight: '500px', overflow: 'hidden', background: '#000' }}>
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', display: 'block' }}
              />
              <button
                className="modal-close-btn"
                style={{ position: 'absolute', top: '16px', right: '16px', color: '#FFFFFF', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px 24px', background: '#001827', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ color: '#FF9200', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {selectedPhoto.category} • {selectedPhoto.location}
                </span>
                <span style={{ color: '#10B981', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} />
                  <span>{selectedPhoto.output}</span>
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{selectedPhoto.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

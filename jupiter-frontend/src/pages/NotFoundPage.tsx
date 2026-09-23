import React from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Box, Settings, Users, Home, ChevronRight } from 'lucide-react';
import flyAsh404Bg from '../assets/images/Machines/flyash.png';

export const NotFoundPage: React.FC = () => {
  useSeoMeta({
    title: 'Page Not Found | Jupiter Industries',
    description: 'The page you’re looking for could not be found. Browse Jupiter Industries’ range of industrial machinery or return to the homepage.',
  });

  return (
    <div className="notfound-flyash-page">
      {/* Background Visual Layers with Exact Fly Ash Brick Machine Photo */}
      <div className="notfound-flyash-bg">
        {/* Machine Factory Background Image */}
        <div 
          className="notfound-flyash-machine-bg"
          style={{
            backgroundImage: `url(${flyAsh404Bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            width: '100%',
            opacity: 0.82,
            filter: 'contrast(1.1) brightness(0.85)'
          }}
        ></div>

        {/* Blueprint Grid Lines */}
        <div className="notfound-flyash-grid"></div>

        {/* Dark Vignette Blend (Protects left-side text readability) */}
        <div 
          className="notfound-flyash-vignette"
          style={{
            background: 'linear-gradient(90deg, rgba(5, 11, 20, 0.96) 0%, rgba(5, 11, 20, 0.85) 45%, rgba(5, 11, 20, 0.2) 75%, rgba(5, 11, 20, 0.5) 100%)'
          }}
        ></div>
      </div>

      {/* Floating Center Pillar Text */}
      <div className="notfound-flyash-center-pillar">
        <div>INDUSTRY</div>
        <div>TURNS</div>
        <div>WASTE INTO</div>
        <div>A BETTER</div>
        <div>TOMORROW</div>
        <div style={{ width: '24px', height: '2.5px', backgroundColor: '#FF6B00', marginTop: '8px', borderRadius: '2px' }}></div>
      </div>

      {/* Floating Right Top Tag */}
      <div className="notfound-flyash-corner-tag notfound-flyash-tag-top-right">
        <div>FLY ASH BRICKS</div>
        <div>STRONGER CITIES</div>
        <div>CLEANER PLANET</div>
        <div style={{ width: '28px', height: '2.5px', backgroundColor: '#FF6B00', marginTop: '8px', borderRadius: '2px' }}></div>
      </div>

      {/* Floating Right Bottom Blueprint Label */}
      <div className="notfound-flyash-corner-tag notfound-flyash-tag-bottom-right">
        <div style={{ color: 'rgba(0, 180, 255, 0.9)', fontSize: '0.68rem', fontWeight: 800 }}>ENGINEERED</div>
        <div style={{ color: 'rgba(0, 180, 255, 0.9)', fontSize: '0.68rem', fontWeight: 800 }}>FOR A CLEANER TOMORROW</div>
        <div style={{ fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
          FROM FLY ASH TO A STRONGER TOMORROW
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <main className="notfound-flyash-main">
        {/* Left Column: 404 & Content */}
        <div className="notfound-flyash-left">
          {/* Rounded Pill Breadcrumb */}
          <div className="banner-breadcrumb-pill" style={{ marginBottom: '20px', display: 'inline-flex', alignSelf: 'flex-start' }}>
            <Link to="/" className="breadcrumb-home-link" title="Back to Home">
              <Home size={14} style={{ marginRight: '5px' }} />
              <span>Home</span>
            </Link>
            <ChevronRight size={13} className="breadcrumb-separator" />
            <span className="breadcrumb-current-page">404 Error</span>
          </div>

          {/* Slogan */}
          <div className="notfound-flyash-slogan">
            <div className="notfound-flyash-dash"></div>
            <span>BUILDING A GREENER TOMORROW</span>
          </div>

          {/* Giant Stylized 404 Headline */}
          <div className="notfound-flyash-404-row" aria-label="Error 404">
            <span className="notfound-flyash-404-digit">4</span>
            <span className="notfound-flyash-404-circle">0</span>
            <span className="notfound-flyash-404-digit">4</span>
          </div>

          {/* Title */}
          <h1 className="notfound-flyash-title">
            Page not found
          </h1>

          {/* Subtitle */}
          <p className="notfound-flyash-desc">
            Looks like this page is still under construction.
          </p>

          {/* Action CTA Buttons */}
          <div className="notfound-flyash-actions">
            <Link to="/" className="notfound-flyash-btn-home">
              <span>Back to Home</span>
              <ArrowRight size={19} />
            </Link>

            <Link to="/machines?category=fly-ash-bricks" className="notfound-flyash-link-explore">
              Explore Fly Ash Machines
            </Link>
          </div>

          {/* 4 Feature Badges Row */}
          <div className="notfound-flyash-features-row">
            <div className="notfound-flyash-feature-item">
              <Leaf size={22} />
              <span>SUSTAINABLE SOLUTIONS</span>
            </div>

            <div className="notfound-flyash-feature-item">
              <Box size={22} />
              <span>STRONGER COMMUNITIES</span>
            </div>

            <div className="notfound-flyash-feature-item">
              <Settings size={22} />
              <span>RELIABLE TECHNOLOGY</span>
            </div>

            <div className="notfound-flyash-feature-item">
              <Users size={22} />
              <span>A CLEANER TOMORROW</span>
            </div>
          </div>
        </div>

        {/* Right Column: Fly Ash Machine Telemetry Specs Overlay */}
        <div className="notfound-flyash-right">
          <div className="notfound-flyash-machine-card" style={{ background: 'rgba(8, 20, 36, 0.75)', border: '1px solid rgba(255, 107, 0, 0.35)' }}>
            <div className="notfound-flyash-machine-header">
              <span className="notfound-flyash-badge">JUPITER M-7000</span>
              <span style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 700 }}>
                FLY ASH BRICK MAKING PLANT
              </span>
            </div>

            <div className="notfound-flyash-specs-grid">
              <div className="notfound-flyash-spec-box">
                <div className="label">Brick Output Capacity</div>
                <div className="val">12,000 - 18,000 / Shift</div>
              </div>

              <div className="notfound-flyash-spec-box">
                <div className="label">Hydraulic Press System</div>
                <div className="val">250 Tons High Pressure</div>
              </div>

              <div className="notfound-flyash-spec-box">
                <div className="label">Standard Brick Size</div>
                <div className="val">230 x 110 x 75 mm</div>
              </div>

              <div className="notfound-flyash-spec-box">
                <div className="label">Plant Operation</div>
                <div className="val">Fully Automatic PLC Line</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

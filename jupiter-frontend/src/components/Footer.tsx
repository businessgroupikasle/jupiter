import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppButton';

import { IMAGES } from '../assets/images/images';

export const Footer: React.FC = () => {
  const location = useLocation();

  const handleNavLinkClick = (targetPath: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (location.pathname === targetPath) {
      e.preventDefault();
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand Info & Social */}
          <div className="footer-col-brand">
            <Link 
              to="/" 
              onClick={handleNavLinkClick('/')}
              className="brand-logo-group" 
              aria-label="Jupiter Industries Home" 
              style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: '16px' }}
            >
              <div style={{
                background: '#FFFFFF',
                borderRadius: '10px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)'
              }}>
                <img 
                  src={IMAGES.logo} 
                  alt="Jupiter Industries Logo" 
                  width={200}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  style={{ 
                    height: '40px', 
                    width: 'auto', 
                    display: 'block',
                    objectFit: 'contain'
                  }} 
                />
              </div>
            </Link>

            <p className="footer-bio-text">
              Jupiter Industries delivers high-performance brick, block and concrete machinery with reliable installation and after-sales support across India.
            </p>

            <div className="footer-social-row">
              <a 
                href="https://www.facebook.com/jupiterindustries.in" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-btn" 
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/jupiterindustry/" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-btn" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.youtube.com/@jupiter_industries_india" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-btn" 
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://wa.me/919342919060" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-social-btn" 
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col-quicklinks">
            <h3 className="footer-col-title">QUICK LINKS</h3>
            <ul className="footer-links-list">
              <li><Link to="/" onClick={handleNavLinkClick('/')} className="footer-link-anchor">Home</Link></li>
              <li><Link to="/about-us" onClick={handleNavLinkClick('/about-us')} className="footer-link-anchor">About Us</Link></li>
              <li><Link to="/products" onClick={handleNavLinkClick('/products')} className="footer-link-anchor">Machines</Link></li>
              <li><Link to="/gallery" onClick={handleNavLinkClick('/gallery')} className="footer-link-anchor">Gallery & Projects</Link></li>
              <li><Link to="/blog" onClick={handleNavLinkClick('/blog')} className="footer-link-anchor">Blog & Guides</Link></li>
              <li><Link to="/contact-us" onClick={handleNavLinkClick('/contact-us')} className="footer-link-anchor">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="footer-col-products">
            <h3 className="footer-col-title">OUR PRODUCTS</h3>
            <ul className="footer-links-list">
              <li><Link to="/products/fly-ash-brick-machine" onClick={handleNavLinkClick('/products/fly-ash-brick-machine')} className="footer-link-anchor">Fly Ash Machine</Link></li>
              <li><Link to="/products/hollow-and-solid-block-machine" onClick={handleNavLinkClick('/products/hollow-and-solid-block-machine')} className="footer-link-anchor">Hollow and Solid Block Machine</Link></li>
              <li><Link to="/products/inter-block-making-machine" onClick={handleNavLinkClick('/products/inter-block-making-machine')} className="footer-link-anchor">Interlock Machine</Link></li>
              <li><Link to="/products/paver-block-machine" onClick={handleNavLinkClick('/products/paver-block-machine')} className="footer-link-anchor">Paver Block Machine</Link></li>
              <li><Link to="/products/batching-plant" onClick={handleNavLinkClick('/products/batching-plant')} className="footer-link-anchor">Batching Plant</Link></li>
              <li><Link to="/products/storage-silo" onClick={handleNavLinkClick('/products/storage-silo')} className="footer-link-anchor">Storage Silo</Link></li>
              <li><Link to="/products/machine-spares" onClick={handleNavLinkClick('/products/machine-spares')} className="footer-link-anchor">Machine Spares</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col-contact">
            <h3 className="footer-col-title">CONTACT INFO</h3>
            <div className="footer-contact-item">
              <MapPin size={20} className="text-orange" style={{ flexShrink: 0, marginTop: '2px' }} />
              <a 
                href="https://www.google.com/maps?cid=8000996565713436119" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                153-154, Sri Garden, Vilankurichi, Coimbatore, Tamil Nadu - 641035
              </a>
            </div>

            <div className="footer-contact-item">
              <Phone size={18} className="text-orange" style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <a href="tel:+919159999060" style={{ color: 'inherit', textDecoration: 'none' }}>+91 91599 99060</a>
                <a href="tel:+919342919060" style={{ color: 'inherit', textDecoration: 'none' }}>+91 93429 19060</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={18} className="text-orange" style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <a href="mailto:mathivanan.md@jupitergroups.in" style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>mathivanan.md@jupitergroups.in</a>
                <a href="mailto:marketing@jupitergroups.in" style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>marketing@jupitergroups.in</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-content">
            <div>
              © 2026 Jupiter Industries. All Rights Reserved.
            </div>
            
            <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>
              Crafted and Maintained by{' '}
              <a
                href="https://ikasleinnovations.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#FF9200',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Ikasle Business Group
              </a>
            </div>

            <div className="footer-legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
              <span>•</span>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

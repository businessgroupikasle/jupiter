import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppButton';

import { IMAGES } from '../assets/images/images';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand Info & Social */}
          <div className="footer-col-brand">
            <Link to="/" className="brand-logo-group" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', marginBottom: '16px' }}>
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
                  alt="Jupiter Industries" 
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
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li><Link to="/" className="footer-link-anchor">Home</Link></li>
              <li><Link to="/about" className="footer-link-anchor">About Us</Link></li>
              <li><Link to="/products" className="footer-link-anchor">Machines</Link></li>
              <li><Link to="/projects" className="footer-link-anchor">Gallery & Projects</Link></li>
              <li><Link to="/blog" className="footer-link-anchor">Blog & Guides</Link></li>
              <li><Link to="/contact" className="footer-link-anchor">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="footer-col-products">
            <h4 className="footer-col-title">OUR PRODUCTS</h4>
            <ul className="footer-links-list">
              <li><Link to="/products/fly-ash-brick-machine" className="footer-link-anchor">Fly Ash Machine</Link></li>
              <li><Link to="/products/hollow-and-solid-block-machine" className="footer-link-anchor">Hollow and Solid Block Machine</Link></li>
              <li><Link to="/products/inter-block-making-machine" className="footer-link-anchor">Interlock Machine</Link></li>
              <li><Link to="/products/paver-block-machine" className="footer-link-anchor">Paver Block Machine</Link></li>
              <li><Link to="/products/batching-plant" className="footer-link-anchor">Batching Plant</Link></li>
              <li><Link to="/products/storage-silo" className="footer-link-anchor">Storage Silo</Link></li>
              <li><Link to="/products/machine-spares" className="footer-link-anchor">Machine Spares</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col-contact">
            <h4 className="footer-col-title">CONTACT INFO</h4>
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
                <a href="tel:+919342919060" style={{ color: 'inherit', textDecoration: 'none' }}>+91 93429 19060</a>
                <a href="tel:+919159999060" style={{ color: 'inherit', textDecoration: 'none' }}>+91 91599 99060</a>
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={18} className="text-orange" style={{ flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <a href="mailto:mathivanan.md@jupitergroups.in" style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}>mathivanan.md@jupitergroups.in</a>
                <a href="mailto:marketing@jupitergroups.in" style={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-all' }}>marketing@jupitergroups.in</a>
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
              Crafted and Maintained by Ikasle Business Group
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

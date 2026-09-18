import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

import { IMAGES } from '../assets/images/images';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productSubLinks = [
    { name: 'Fly Ash Brick Machine', path: '/products/fly-ash-brick-machine' },
    { name: 'Hollow and Solid Block Machine', path: '/products/hollow-and-solid-block-machine' },
    { name: 'Inter Block Making Machine', path: '/products/inter-block-making-machine' },
    { name: 'Paver Block Machine', path: '/products/paver-block-machine' },
    { name: 'Batching Plant', path: '/products/batching-plant' },
    { name: 'Storage Silo', path: '/products/storage-silo' },
    { name: 'Machine Spares', path: '/products/machine-spares' },
  ];

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDesktopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(false);
    }, 150);
  };

  const handleScrollToQuote = (e: React.MouseEvent) => {
    if (onOpenQuoteModal) {
      e.preventDefault();
      onOpenQuoteModal();
      return;
    }
    const enquiryElem = document.getElementById('enquiry-section');
    if (enquiryElem) {
      e.preventDefault();
      enquiryElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isProductsActive = () => {
    return (
      location.pathname.startsWith('/products') ||
      location.pathname.startsWith('/machines') ||
      productSubLinks.some(sub => location.pathname === sub.path)
    );
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : 'transparent-hero'}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo-group">
          <img src={IMAGES.logo} alt="Jupiter Industries" className="brand-logo-img" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-menu">
          <Link 
            to="/" 
            className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          <Link 
            to="/about" 
            className={`nav-link-item ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>

          {/* Products Dropdown Menu Item */}
          <div 
            className="nav-dropdown-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
          >
            <Link 
              to="/products"
              className={`nav-link-item ${isProductsActive() ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Products</span>
              <ChevronDown size={14} style={{ transition: 'transform 0.2s ease', transform: desktopDropdownOpen ? 'rotate(180deg)' : 'none' }} />
            </Link>

            {/* Dropdown Menu Container */}
            {desktopDropdownOpen && (
              <div 
                className="nav-custom-dropdown-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  minWidth: '270px',
                  background: '#081322',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '10px',
                  boxShadow: '0 14px 35px rgba(0, 15, 30, 0.45)',
                  padding: '8px 0',
                  zIndex: 1000,
                  marginTop: '6px',
                  backdropFilter: 'blur(10px)',
                  animation: 'fadeInMenu 0.18s ease'
                }}
              >
                <div style={{ padding: '6px 16px 8px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF9200', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Machinery Categories
                  </span>
                </div>
                {productSubLinks.map((sub) => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    onClick={() => setDesktopDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '10px 18px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: location.pathname === sub.path ? '#FF9200' : 'rgba(255, 255, 255, 0.9)',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      borderLeft: location.pathname === sub.path ? '3px solid #FF9200' : '3px solid transparent',
                      background: location.pathname === sub.path ? 'rgba(255, 146, 0, 0.1)' : 'transparent'
                    }}
                    className="dropdown-hover-item"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 146, 0, 0.12)';
                      e.currentTarget.style.color = '#FF9200';
                      e.currentTarget.style.paddingLeft = '22px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = location.pathname === sub.path ? 'rgba(255, 146, 0, 0.1)' : 'transparent';
                      e.currentTarget.style.color = location.pathname === sub.path ? '#FF9200' : 'rgba(255, 255, 255, 0.9)';
                      e.currentTarget.style.paddingLeft = '18px';
                    }}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            to="/gallery" 
            className={`nav-link-item ${location.pathname === '/gallery' || location.pathname === '/projects' ? 'active' : ''}`}
          >
            Gallery
          </Link>

          <Link 
            to="/blog" 
            className={`nav-link-item ${location.pathname === '/blog' ? 'active' : ''}`}
          >
            Blog
          </Link>

          <Link 
            to="/contact" 
            className={`nav-link-item ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA / Contact Group */}
        <div className="nav-actions-group">
          <a href="tel:+919342919060" className="nav-phone-contact">
            <Phone size={16} className="text-orange" />
            <span>+91 93429 19060</span>
          </a>

          <button onClick={handleScrollToQuote} className="btn btn-orange">
            <span>Request Quote</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Hamburger Button */}
          <button 
            className="nav-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer open">
          <Link 
            to="/" 
            className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link 
            to="/about" 
            className={`nav-link-item ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>

          {/* Mobile Products Accordion */}
          <div>
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                cursor: 'pointer'
              }}
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              <Link 
                to="/products"
                className={`nav-link-item ${isProductsActive() ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                }}
              >
                Products
              </Link>
              <ChevronDown 
                size={16} 
                style={{ 
                  color: '#FF9200', 
                  transform: mobileProductsOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease'
                }} 
              />
            </div>

            {mobileProductsOpen && (
              <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                {productSubLinks.map(sub => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontSize: '0.86rem',
                      color: location.pathname === sub.path ? '#FF9200' : 'rgba(255, 255, 255, 0.8)',
                      padding: '6px 0',
                      textDecoration: 'none',
                      display: 'block'
                    }}
                  >
                    • {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link 
            to="/gallery" 
            className={`nav-link-item ${location.pathname === '/gallery' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </Link>

          <Link 
            to="/blog" 
            className={`nav-link-item ${location.pathname === '/blog' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>

          <Link 
            to="/contact" 
            className={`nav-link-item ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>

          <a href="tel:+919342919060" className="nav-phone-contact" style={{ paddingTop: '10px' }}>
            <Phone size={16} className="text-orange" />
            <span>+91 93429 19060</span>
          </a>

          <button 
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleScrollToQuote(e);
            }} 
            className="btn btn-orange" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
          >
            <span>Request Quote</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
};

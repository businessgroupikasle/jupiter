import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';

import { IMAGES } from '../assets/images/images';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<any>(null);
  const subMenuTimeoutRef = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredSubCategory(null);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const productSubLinks = [
    { 
      name: 'Fly Ash Brick Machine', 
      path: '/products/fly-ash-brick-machine',
      subItems: [
        {
          name: 'Jupiter V 10 B Model – High Speed Fly Ash Brick Making Machine',
          path: '/products/fly-ash-brick-machine?model=jupiter-v-10-b-fly-ash-brick-making-machine',
          shortCode: 'V 10 B',
          tag: 'High-Speed Planetary Compaction'
        },
        {
          name: 'Jupiter V 12 B Model – High Speed Fly Ash Brick Making Machine',
          path: '/products/fly-ash-brick-machine?model=jupiter-v-12-b-fly-ash-brick-making-machine',
          shortCode: 'V 12 B',
          tag: 'High-Speed Automated Press'
        },
        {
          name: 'Jupiter V 15 B Model – High Speed Fly Ash Brick Making Machine',
          path: '/products/fly-ash-brick-machine?model=jupiter-v-15-b-fly-ash-brick-making-machine',
          shortCode: 'V 15 B',
          tag: 'Heavy-Duty 120 Ton Double Cylinder'
        },
      ]
    },
    { 
      name: 'Hollow and Solid Block Machine', 
      path: '/products/hollow-and-solid-block-machine',
      subItems: [
        {
          name: 'Jupiter HDM 800 – Hollow & Solid Block Making Machine',
          path: '/products/hollow-and-solid-block-machine?model=jupiter-hdm-800-hollow-solid-block-making-machine',
          shortCode: 'HDM 800',
          tag: 'High-Frequency 6000 VPM Vibration'
        },
        {
          name: 'Hollow & Solid Block Making Machine – Double & Triple Vibrator',
          path: '/products/hollow-and-solid-block-machine?model=double-triple-vibrator-hollow-solid-block-making-machine',
          shortCode: 'Double & Triple Vibrator',
          tag: '140 kg/cm² Hydraulic Press'
        },
      ]
    },
    { 
      name: 'Inter Block Making Machine', 
      path: '/products/inter-block-making-machine',
      subItems: [
        {
          name: 'Manual Interlock Block Making Machine – 30 Ton Hydraulic Pressing System',
          path: '/products/inter-block-making-machine?model=manual-interlock-block-making-machine',
          shortCode: 'Manual 30 Ton',
          tag: '30 Ton Bottom Pressing (150–200 Blocks/Hr)'
        },
        {
          name: 'Automatic Interlock Block Making Machine – Vertical Twin Station Model',
          path: '/products/inter-block-making-machine?model=automatic-interlock-block-making-machine',
          shortCode: 'Automatic Twin Station',
          tag: 'Vertical Twin Station (200–250 Blocks/Hr)'
        },
      ]
    },
    { 
      name: 'Paver Block Machine', 
      path: '/products/paver-block-machine',
      subItems: [
        {
          name: 'Jupiter JE PBT2 – Paver Block Making Machine',
          path: '/products/paver-block-machine?model=je-pbt2-paver-block-making-machine',
          shortCode: 'JE PBT2',
          tag: 'Vibrating Table System (2,000 Sq. Ft./Shift)'
        },
      ]
    },
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
        <Link 
          to="/" 
          onClick={(e) => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            if (location.pathname === '/') {
              e.preventDefault();
            }
          }}
          className="brand-logo-group" 
          aria-label="Jupiter Industries Home" 
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
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
              style={{ 
                height: '40px', 
                width: 'auto', 
                display: 'block',
                objectFit: 'contain'
              }} 
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-menu">
          <Link 
            to="/" 
            onClick={(e) => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              if (location.pathname === '/') {
                e.preventDefault();
              }
            }}
            className={`nav-link-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          <Link 
            to="/about-us" 
            className={`nav-link-item ${location.pathname === '/about-us' || location.pathname === '/about' ? 'active' : ''}`}
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
                {productSubLinks.map((sub: any) => {
                  const hasSubItems = sub.subItems && sub.subItems.length > 0;
                  const isHovered = hoveredSubCategory === sub.path;

                  return (
                    <div
                      key={sub.path}
                      style={{ position: 'relative' }}
                      onMouseEnter={() => {
                        if (subMenuTimeoutRef.current) clearTimeout(subMenuTimeoutRef.current);
                        if (hasSubItems) {
                          setHoveredSubCategory(sub.path);
                        } else {
                          setHoveredSubCategory(null);
                        }
                      }}
                      onMouseLeave={() => {
                        if (hasSubItems) {
                          subMenuTimeoutRef.current = setTimeout(() => {
                            setHoveredSubCategory(null);
                          }, 150);
                        }
                      }}
                    >
                      <Link
                        to={sub.path}
                        onClick={() => {
                          setDesktopDropdownOpen(false);
                          setHoveredSubCategory(null);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 18px',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          color: location.pathname === sub.path || isHovered ? '#FF9200' : 'rgba(255, 255, 255, 0.9)',
                          textDecoration: 'none',
                          transition: 'all 0.15s ease',
                          borderLeft: location.pathname === sub.path || isHovered ? '3px solid #FF9200' : '3px solid transparent',
                          background: isHovered || location.pathname === sub.path ? 'rgba(255, 146, 0, 0.12)' : 'transparent',
                          paddingLeft: isHovered ? '22px' : '18px'
                        }}
                        className="dropdown-hover-item"
                      >
                        <span>{sub.name}</span>
                        {hasSubItems && (
                          <ChevronRight
                            size={14}
                            style={{
                              color: isHovered ? '#FF9200' : 'rgba(255, 255, 255, 0.45)',
                              transition: 'transform 0.15s ease',
                              transform: isHovered ? 'translateX(3px)' : 'none'
                            }}
                          />
                        )}
                      </Link>

                      {/* Nested Flyout Submenu for Machine Models - Theme Format */}
                      {hasSubItems && isHovered && (
                        <div
                          className="nav-custom-dropdown-panel"
                          style={{
                            position: 'absolute',
                            top: '0',
                            left: '100%',
                            minWidth: '380px',
                            background: '#081322',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '10px',
                            boxShadow: '0 14px 35px rgba(0, 15, 30, 0.45)',
                            padding: '8px 0',
                            zIndex: 1010,
                            marginLeft: '4px',
                            backdropFilter: 'blur(10px)',
                            animation: 'fadeInMenu 0.18s ease'
                          }}
                          onMouseEnter={() => {
                            if (subMenuTimeoutRef.current) clearTimeout(subMenuTimeoutRef.current);
                            setHoveredSubCategory(sub.path);
                          }}
                          onMouseLeave={() => {
                            subMenuTimeoutRef.current = setTimeout(() => {
                              setHoveredSubCategory(null);
                            }, 150);
                          }}
                        >
                          {/* Invisible mouse bridge */}
                          <div style={{ position: 'absolute', top: 0, left: '-12px', width: '12px', height: '100%' }} />

                          {/* Submenu Header matching theme */}
                          <div style={{ padding: '6px 16px 8px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF9200', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                              Machine Models
                            </span>
                          </div>

                          {/* Submenu Item Links matching theme format */}
                          {sub.subItems.map((model: any) => (
                            <Link
                              key={model.path}
                              to={model.path}
                              onClick={() => {
                                setDesktopDropdownOpen(false);
                                setHoveredSubCategory(null);
                              }}
                              style={{
                                display: 'block',
                                padding: '10px 18px',
                                fontSize: '0.86rem',
                                fontWeight: 600,
                                color: 'rgba(255, 255, 255, 0.9)',
                                textDecoration: 'none',
                                transition: 'all 0.15s ease',
                                borderLeft: '3px solid transparent',
                                background: 'transparent'
                              }}
                              className="dropdown-hover-item"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 146, 0, 0.12)';
                                e.currentTarget.style.color = '#FF9200';
                                e.currentTarget.style.paddingLeft = '22px';
                                e.currentTarget.style.borderLeft = '3px solid #FF9200';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                                e.currentTarget.style.paddingLeft = '18px';
                                e.currentTarget.style.borderLeft = '3px solid transparent';
                              }}
                            >
                              {model.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
            to="/contact-us" 
            className={`nav-link-item ${location.pathname === '/contact-us' || location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA / Contact Group */}
        <div className="nav-actions-group">
          <a href="tel:+919159999060" className="nav-phone-contact" aria-label="Call Jupiter Industries at +91 91599 99060">
            <Phone size={16} className="text-orange" />
            <span>+91 91599 99060</span>
          </a>

          <button onClick={handleScrollToQuote} className="btn btn-orange" aria-label="Request Machinery Quote">
            <span>Request Quote</span>
            <ArrowRight size={16} />
          </button>

          {/* Mobile Hamburger Button */}
          <button 
            className="nav-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
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
            to="/about-us" 
            className={`nav-link-item ${location.pathname === '/about-us' || location.pathname === '/about' ? 'active' : ''}`}
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
              <div style={{ paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                {productSubLinks.map((sub: any) => {
                  const hasSubItems = sub.subItems && sub.subItems.length > 0;
                  const isExpanded = mobileExpandedCategory === sub.path;

                  return (
                    <div key={sub.path} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px'
                      }}>
                        <Link
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            fontSize: '0.88rem',
                            color: location.pathname === sub.path ? '#FF9200' : 'rgba(255, 255, 255, 0.85)',
                            padding: '10px 12px',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            flex: 1,
                            minHeight: '44px',
                            borderRadius: '6px',
                            background: location.pathname === sub.path ? 'rgba(255, 146, 0, 0.1)' : 'transparent'
                          }}
                        >
                          • {sub.name}
                        </Link>
                        {hasSubItems && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileExpandedCategory(isExpanded ? null : sub.path);
                            }}
                            style={{
                              background: isExpanded ? '#FF9200' : 'rgba(255, 146, 0, 0.15)',
                              border: '1px solid rgba(255, 146, 0, 0.35)',
                              borderRadius: '6px',
                              color: isExpanded ? '#000000' : '#FF9200',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              marginRight: '8px'
                            }}
                            aria-label={`Toggle ${sub.name} models`}
                          >
                            <span>Models</span>
                            <ChevronDown
                              size={13}
                              style={{
                                transform: isExpanded ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.2s ease'
                              }}
                            />
                          </button>
                        )}
                      </div>

                      {/* Nested Models Accordion */}
                      {hasSubItems && isExpanded && (
                        <div style={{
                          paddingLeft: '14px',
                          marginLeft: '14px',
                          borderLeft: '2px solid rgba(255, 146, 0, 0.4)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          marginTop: '4px',
                          marginBottom: '8px'
                        }}>
                          {sub.subItems.map((model: any) => (
                            <Link
                              key={model.path}
                              to={model.path}
                              onClick={() => setMobileMenuOpen(false)}
                              style={{
                                fontSize: '0.84rem',
                                color: 'rgba(255, 255, 255, 0.85)',
                                padding: '8px 10px',
                                textDecoration: 'none',
                                display: 'block',
                                borderRadius: '4px',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {model.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
            to="/contact-us" 
            className={`nav-link-item ${location.pathname === '/contact-us' || location.pathname === '/contact' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>

          <a href="tel:+919159999060" className="nav-phone-contact" style={{ paddingTop: '10px' }}>
            <Phone size={16} className="text-orange" />
            <span>+91 91599 99060</span>
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

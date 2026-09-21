import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  initials: string;
  name: string;
  location: string;
  quote: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
}

export const CustomerReviews: React.FC = () => {
  const reviews: Review[] = [
    {
      initials: 'MK',
      name: 'Murugan K',
      location: 'Pollachi, Tamil Nadu',
      quote: '"Prompt customer support and reliable fleet delivery. The interlocking bricks and vibration block press have made our boundary and pathway projects effortless."',
      colorBg: '#ECFDF5',
      colorBorder: '#10B981',
      colorText: '#059669'
    },
    {
      initials: 'RK',
      name: 'Ramesh Kumar',
      location: 'Coimbatore, Tamil Nadu',
      quote: '"The fly ash brick machine from Jupiter Industries exceeded our expectations. The quality, compressive strength, and timely delivery made our production process smooth and hassle-free."',
      colorBg: '#EFF6FF',
      colorBorder: '#3B82F6',
      colorText: '#1D4ED8'
    },
    {
      initials: 'PS',
      name: 'Prakash S',
      location: 'Tiruppur, Tamil Nadu',
      quote: '"We purchased paver block machinery for our commercial precast project, and the finish was excellent. Their service team was supportive and delivered exactly as promised."',
      colorBg: '#ECFDF5',
      colorBorder: '#10B981',
      colorText: '#059669'
    },
    {
      initials: 'SA',
      name: 'S. Annamalai',
      location: 'Madurai, Tamil Nadu',
      quote: '"Investing in Jupiter\'s automatic hydraulic brick machine increased our plant output by 40%. The heavy-duty build quality and responsive after-sales support are truly exceptional."',
      colorBg: '#FEF3C7',
      colorBorder: '#F59E0B',
      colorText: '#B45309'
    },
    {
      initials: 'KR',
      name: 'K. Rajendran',
      location: 'Salem, Tamil Nadu',
      quote: '"Consistent block density and zero unexpected downtime for over 2 years now. Their engineering guidance helped us set up our manufacturing unit effortlessly."',
      colorBg: '#F3E8FF',
      colorBorder: '#A855F7',
      colorText: '#7E22CE'
    },
    {
      initials: 'VN',
      name: 'V. Senthil Nathan',
      location: 'Trichy, Tamil Nadu',
      quote: '"The precision molds and high compaction vibrators deliver flawless surface finish pavers. Jupiter Industries is definitely our trusted partner for expansion."',
      colorBg: '#E0F2FE',
      colorBorder: '#0EA5E9',
      colorText: '#0369A1'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  // Keep index within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const gapPx = 24;
  const trackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    setContainerWidth(el.clientWidth);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardWidth = containerWidth > 0 
    ? (containerWidth - (visibleCount - 1) * gapPx) / visibleCount 
    : 0;
  const shiftPx = currentIndex * (cardWidth + gapPx);

  return (
    <section 
      style={{ 
        padding: '80px 0', 
        background: '#F8FAFC',
        overflow: 'hidden'
      }}
      aria-label="Customer Testimonials"
    >
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: '#EA580C',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            WHAT OUR CLIENTS SAY
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
            fontWeight: 900,
            color: '#00233D',
            marginBottom: '12px'
          }}>
            Trusted by Builders, Contractors & Customers
          </h2>

          <p style={{
            color: '#64748B',
            fontSize: '0.98rem',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Hear from our satisfied customers across Tamil Nadu and South India who rely on Jupiter for consistent machinery quality and on-time service delivery.
          </p>
        </div>

        {/* Carousel Outer Container */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cards Track Wrapper */}
          <div ref={trackRef} style={{ overflow: 'hidden', padding: '12px 4px 18px 4px' }}>
            <div
              style={{
                display: 'flex',
                gap: `${gapPx}px`,
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: `translateX(-${shiftPx}px)`,
                willChange: 'transform',
              }}
            >
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: cardWidth > 0 ? `0 0 ${cardWidth}px` : `0 0 calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`,
                    width: cardWidth > 0 ? `${cardWidth}px` : undefined,
                    maxWidth: cardWidth > 0 ? `${cardWidth}px` : undefined,
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '32px 28px',
                    boxShadow: '0 4px 16px rgba(0, 35, 61, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                    userSelect: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 35, 61, 0.09)';
                    e.currentTarget.style.borderColor = '#CBD5E1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 35, 61, 0.05)';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* 5 Stars Rating & Quote Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', gap: '4px', color: '#F59E0B' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={17} fill="#F59E0B" color="#F59E0B" />
                        ))}
                      </div>
                      <span style={{ fontSize: '2.4rem', color: '#CBD5E1', lineHeight: 0.8, fontFamily: 'Georgia, serif' }}>
                        “
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.96rem',
                      color: '#334155',
                      lineHeight: 1.68,
                      fontStyle: 'italic',
                      marginBottom: '28px',
                      flex: 1
                    }}>
                      {rev.quote}
                    </p>
                  </div>

                  {/* Author Initials & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid #F1F5F9', paddingTop: '18px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: rev.colorBg,
                      border: `1.5px solid ${rev.colorBorder}`,
                      color: rev.colorText,
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {rev.initials}
                    </div>

                    <div>
                      <div style={{ fontSize: '0.97rem', fontWeight: 800, color: '#00233D' }}>
                        {rev.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>
                        {rev.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Bar (Prev + Indicators + Next) */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '16px', 
            marginTop: '28px' 
          }}>
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonials"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0, 35, 61, 0.08)',
                color: '#00233D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EA580C';
                e.currentTarget.style.borderColor = '#EA580C';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.color = '#00233D';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots / Indicator Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
                const isActive = currentIndex === dotIdx;
                return (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    style={{
                      width: isActive ? '26px' : '9px',
                      height: '9px',
                      borderRadius: '5px',
                      backgroundColor: isActive ? '#EA580C' : '#CBD5E1',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0
                    }}
                  />
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next testimonials"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0, 35, 61, 0.08)',
                color: '#00233D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EA580C';
                e.currentTarget.style.borderColor = '#EA580C';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.color = '#00233D';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;

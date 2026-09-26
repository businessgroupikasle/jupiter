import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSeoMeta } from '../utils/useSeoMeta';
import { PageBanner } from '../components/PageBanner';
import { fetchBlogsFromDb, fetchBlogById, getStoredBlogs, BlogItem } from '../services/blogService';
import { Clock, Calendar, User, Eye, ArrowLeft, BookOpen, Rss, Bell, Wrench, Layers } from 'lucide-react';

/* ─── Coming Soon Banner ─────────────────────────────────────── */
const BlogComingSoon: React.FC = () => (
  <>
    <style>{`
      @keyframes cs-float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-12px); }
      }
      @keyframes cs-pulse-ring {
        0%   { transform: scale(0.9); opacity: 0.7; }
        100% { transform: scale(1.6); opacity: 0; }
      }
      @keyframes cs-fade-up {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .cs-card { animation: cs-fade-up 0.6s ease both; }
      .cs-icon-wrap { animation: cs-float 4s ease-in-out infinite; }
      .cs-pulse { position: relative; display: inline-block; }
      .cs-pulse::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 3px solid #FF6B00;
        animation: cs-pulse-ring 1.8s ease-out infinite;
      }
      .cs-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 16px;
        border-radius: 9999px;
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border: 1.5px solid;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .cs-chip:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 0, 0.18);
      }
    `}</style>

    <div className="cs-card" style={{
      maxWidth: '740px',
      margin: '0 auto',
      padding: '64px 32px 56px',
      textAlign: 'center',
    }}>

      {/* Floating Icon */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '36px' }}>
        <div className="cs-pulse">
          <div className="cs-icon-wrap" style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B00 0%, #FF9A3C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 16px 40px rgba(255, 107, 0, 0.3)',
          }}>
            <Rss size={44} color="#FFFFFF" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{
        display: 'inline-block',
        background: 'linear-gradient(90deg, #FFF7ED, #FFEDD5)',
        color: '#EA580C',
        fontSize: '0.78rem',
        fontWeight: 800,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '6px 20px',
        borderRadius: '9999px',
        border: '1.5px solid #FDBA74',
        marginBottom: '24px',
      }}>
        🚀 &nbsp; Coming Soon
      </div>

      {/* Heading */}
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 900,
        color: '#00233D',
        lineHeight: 1.2,
        letterSpacing: '-0.03em',
        marginBottom: '20px',
      }}>
        Our Blog is Being<br />
        <span style={{
          background: 'linear-gradient(90deg, #FF6B00, #FF9A3C)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Crafted for You
        </span>
      </h2>

      {/* Sub text */}
      <p style={{
        fontSize: '1.05rem',
        color: '#5A6E85',
        lineHeight: 1.7,
        maxWidth: '520px',
        margin: '0 auto 40px auto',
      }}>
        We're working on in-depth technical articles, machinery guides,
        and industry insights on fly ash brick & concrete block manufacturing.
        Stay tuned — great content is on its way!
      </p>

      {/* Topic chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '44px' }}>
        {[
          { icon: <Wrench size={14} />, label: 'Machinery Maintenance' },
          { icon: <Layers size={14} />, label: 'Fly Ash Brick Guides' },
          { icon: <BookOpen size={14} />, label: 'Technical Reports' },
          { icon: <Bell size={14} />, label: 'Industry Insights' },
        ].map(({ icon, label }) => (
          <span
            key={label}
            className="cs-chip"
            style={{ background: '#F8FAFC', color: '#334155', borderColor: '#E2E8F0' }}
          >
            {icon} {label}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div style={{
        width: '60px',
        height: '3px',
        background: 'linear-gradient(90deg, #FF6B00, #FF9A3C)',
        borderRadius: '9999px',
        margin: '0 auto 40px auto',
      }} />

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          to="/contact"
          className="btn btn-orange"
          style={{ padding: '13px 32px', fontWeight: 700, fontSize: '0.97rem' }}
        >
          Get in Touch →
        </Link>
        <Link
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '13px 28px',
            border: '2px solid #00233D',
            borderRadius: '8px',
            color: '#00233D',
            fontWeight: 700,
            fontSize: '0.97rem',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#00233D'; e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00233D'; }}
        >
          Browse Our Products
        </Link>
      </div>
    </div>
  </>
);

export const BlogPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!id) {
      setSelectedBlog(null);
      return;
    }

    const loadData = async () => {
      try {
        const detail = await fetchBlogById(id);
        if (!isMounted) return;
        if (detail) {
          setSelectedBlog(detail);
        } else {
          const list = await fetchBlogsFromDb();
          if (!isMounted) return;
          const foundInList = list.find(b => b.id === id);
          setSelectedBlog(foundInList || null);
        }
      } catch {
        // detail fetch failed silently
      }
    };

    loadData();

    const handleUpdate = () => {
      const stored = getStoredBlogs();
      const found = stored.find(b => b.id === id);
      if (found) setSelectedBlog(found);
    };

    window.addEventListener('jupiter_blogs_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('jupiter_blogs_updated', handleUpdate);
    };
  }, [id]);

  useSeoMeta({
    title: selectedBlog 
      ? `${selectedBlog.title} | Jupiter Industries Blog` 
      : 'Technical Articles & Plant Insights | Jupiter Industries',
    description: selectedBlog
      ? selectedBlog.excerpt || selectedBlog.title
      : 'Read technical guides, machinery maintenance tips, and brick making plant ROI analyses from Jupiter Industries engineers.',
    keywords: 'Fly Ash Brick Machine Guide, Concrete Block Plant ROI, Machinery Maintenance, Jupiter Industries Blog',
    ogUrl: id ? `https://jupitergroups.in/blog/${id}` : 'https://jupitergroups.in/blog',
  });

  // ─────────────────────────────────────────────────────────────
  // 1. Article Detail View (when an id is specified)
  // ─────────────────────────────────────────────────────────────
  if (id && selectedBlog) {
    return (
      <div className="blog-detail-view bg-white">
        <PageBanner
          title={selectedBlog.title}
          breadcrumbs={[
            { label: 'Blog', link: '/blog' },
            { label: selectedBlog.title.slice(0, 32) + '...' }
          ]}
        />

        <article className="section-padding" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
          <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {/* Back to Blog List */}
            <Link
              to="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FF6B00',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                marginBottom: '28px',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
            >
              <ArrowLeft size={18} />
              <span>Back to All Articles</span>
            </Link>

            {/* Category & Meta Strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{
                background: '#FFF7ED',
                color: '#EA580C',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {selectedBlog.category}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.88rem' }}>
                <Clock size={16} />
                <span>{selectedBlog.readTime}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.88rem' }}>
                <Calendar size={16} />
                <span>{selectedBlog.date}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.88rem' }}>
                <User size={16} />
                <span>{selectedBlog.author}</span>
              </div>

              {selectedBlog.views > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.88rem' }}>
                  <Eye size={16} />
                  <span>{selectedBlog.views} views</span>
                </div>
              )}
            </div>

            {/* Article Heading */}
            <h1 style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              fontWeight: 900,
              color: '#00233D',
              lineHeight: 1.25,
              marginBottom: '24px',
              letterSpacing: '-0.02em',
            }}>
              {selectedBlog.title}
            </h1>

            {/* Featured Image */}
            {selectedBlog.image && (
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '36px',
                boxShadow: '0 12px 30px rgba(0, 35, 61, 0.08)',
                background: '#F1F5F9',
                maxHeight: '440px',
              }}>
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '440px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            )}

            {/* Excerpt Lead */}
            {selectedBlog.excerpt && (
              <p style={{
                fontSize: '1.2rem',
                color: '#334155',
                lineHeight: 1.7,
                fontWeight: 500,
                borderLeft: '4px solid #FF6B00',
                paddingLeft: '20px',
                marginBottom: '32px',
                background: '#FFF9F5',
                padding: '16px 20px',
                borderRadius: '0 8px 8px 0',
              }}>
                {selectedBlog.excerpt}
              </p>
            )}

            {/* Full Body Content */}
            <div
              style={{
                fontSize: '1.05rem',
                color: '#475569',
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
              }}
            >
              {selectedBlog.content || selectedBlog.excerpt}
            </div>

            {/* Bottom CTA Card */}
            <div style={{
              marginTop: '56px',
              padding: '36px',
              background: '#00233D',
              borderRadius: '16px',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '16px'
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                Ready to Upgrade Your Machinery Plant?
              </h3>
              <p style={{ color: '#94A3B8', maxWidth: '560px', margin: 0, fontSize: '0.95rem' }}>
                Contact our factory engineering team to discuss your capacity requirements and receive a customized turnkey quote.
              </p>
              <Link
                to="/contact"
                className="btn btn-orange"
                style={{
                  padding: '12px 28px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  marginTop: '8px'
                }}
              >
                Request Plant Quotation
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. Blog Listing View — Coming Soon
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="blog-page-view bg-white">
      <PageBanner
        title="Blog & Insights"
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="section-padding bg-white" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
        <div className="container">
          <BlogComingSoon />
        </div>
      </section>
    </div>
  );
};

export default BlogPage;


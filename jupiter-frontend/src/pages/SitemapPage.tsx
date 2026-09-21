import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Lock, 
  Layers, 
  ExternalLink
} from 'lucide-react';

export const SitemapPage: React.FC = () => {
  const siteSections = [
    {
      title: 'Main Navigation Pages',
      icon: Home,
      links: [
        { label: 'Home Page', path: '/', desc: 'Primary landing page, featured machinery highlights & client stats.' },
        { label: 'About Jupiter Industries', path: '/about', desc: 'Company history, 6-stage manufacturing process & ISO certification.' },
        { label: 'Machinery Catalog', path: '/products', desc: 'Full range of fly ash, block, paver, and batching plant machinery.' },
        { label: 'Projects & Gallery', path: '/projects', desc: 'Live plant installation photos, video demonstrations & customer stories.' },
        { label: 'Blogs & Engineering Guides', path: '/blog', desc: 'Technical guides on fly ash brick manufacturing & block production.' },
        { label: 'Contact Us', path: '/contact', desc: 'Factory location map, phone numbers, email addresses & enquiry form.' },
      ]
    },
    {
      title: 'Machinery & Equipment Categories',
      icon: Package,
      links: [
        { label: 'Fly Ash Brick Making Machines', path: '/products/fly-ash-brick-machine', desc: 'Automatic & semi-automatic hydraulic fly ash brick presses.' },
        { label: 'Hollow & Solid Block Machines', path: '/products/hollow-and-solid-block-machine', desc: 'High-tonnage concrete block manufacturing plants.' },
        { label: 'Interlocking Block Machines', path: '/products/inter-block-making-machine', desc: 'Soil & concrete interlocking paving block machines.' },
        { label: 'Paver Block Making Machines', path: '/products/paver-block-machine', desc: 'Zig-zag, I-shape & decorative paver block machinery.' },
        { label: 'Concrete Batching Plants', path: '/products/batching-plant', desc: 'Automated pan mixers & weigh batchers.' },
        { label: 'Cement & Fly Ash Storage Silos', path: '/products/storage-silo', desc: 'Bulk storage silos with screw conveyors.' },
      ]
    },
    {
      title: 'Legal & Administration',
      icon: Lock,
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy', desc: 'Data privacy standards, enquiry confidentiality & terms.' },
        { label: 'Terms & Conditions', path: '/terms-and-conditions', desc: 'Commercial payment terms, delivery schedules & 1-year warranty.' }
      ]
    }
  ];

  return (
    <div className="sitemap-page">
      <PageBanner
        title="Website Sitemap"
        breadcrumbs={[{ label: 'Sitemap' }]}
      />

      <section style={{ padding: '70px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '1050px' }}>
          <div className="text-center" style={{ marginBottom: '44px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', color: '#EA580C', padding: '6px 16px', borderRadius: '20px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '12px' }}>
              <Layers size={16} /> Complete Website Directory
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#00233D', marginBottom: '12px' }}>
              Structured Sitemap & Page Index
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
              Easily navigate to any product category, company documentation, or technical guide on the Jupiter Industries website.
            </p>
          </div>

          {/* Grid of Sitemap Sections */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '28px' }}>
            {siteSections.map((section, idx) => {
              const SectionIcon = section.icon;
              return (
                <div key={idx} style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '30px 26px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px rgba(0, 35, 61, 0.05)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '2px solid #F1F5F9' }}>
                    <div style={{ background: '#FFF7ED', color: '#EA580C', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SectionIcon size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#00233D', margin: 0 }}>
                      {section.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    {section.links.map((link, lIdx) => (
                      <Link 
                        key={lIdx} 
                        to={link.path}
                        style={{
                          textDecoration: 'none',
                          display: 'block',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          transition: 'all 0.2s ease'
                        }}
                        className="sitemap-link-card"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: '#00233D', fontSize: '0.92rem' }}>
                            {link.label}
                          </span>
                          <ExternalLink size={14} style={{ color: '#EA580C' }} />
                        </div>
                        <p style={{ color: '#64748B', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
                          {link.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;

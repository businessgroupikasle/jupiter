import React from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { PageBanner } from '../components/PageBanner';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  useSeoMeta({
    title: 'Privacy Policy | Jupiter Industries',
    description: 'Read the Privacy Policy of Jupiter Industries – learn how we collect, use, and protect your personal data when you use our website or contact us for machinery enquiries.',
    keywords: 'Jupiter Industries Privacy Policy, Data Protection, Industrial Machinery Website Privacy',
    ogUrl: 'https://jupitergroups.in/privacy-policy',
  });

  return (
    <div className="privacy-policy-page">
      <PageBanner
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section style={{ padding: '70px 0', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '40px 48px',
            boxShadow: '0 15px 40px rgba(0, 35, 61, 0.06)',
            border: '1px solid #E2E8F0'
          }}>
            {/* Header Badge & Date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', color: '#EA580C', padding: '6px 16px', borderRadius: '20px', fontSize: '0.88rem', fontWeight: 700 }}>
                <ShieldCheck size={16} /> Official Privacy Statement
              </div>
              <span style={{ color: '#64748B', fontSize: '0.88rem' }}>Last Updated: September 2026</span>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00233D', marginBottom: '16px' }}>
              Jupiter Industries Privacy Commitment
            </h2>

            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '28px' }}>
              At <strong>Jupiter Industries</strong> (Coimbatore, Tamil Nadu), we respect your privacy and are committed to protecting any personal and commercial information you share with us through our website, machinery enquiry forms, or direct phone and email communications.
            </p>

            {/* Privacy Section Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Section 1 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={20} className="text-orange" />
                  1. Information We Collect
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '12px' }}>
                  When you request a quotation, submit a machinery inquiry, or contact our engineering team, we may collect the following details:
                </p>
                <ul style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '24px' }}>
                  <li>Contact details: Name, Company Name, Mobile Number, Email Address, and State/City location.</li>
                  <li>Project requirements: Desired brick/block machinery model, daily production capacity, and site location.</li>
                  <li>Technical communications: Inquiry history, customized plant layout requests, and quotation records.</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={20} className="text-orange" />
                  2. How We Use Your Information
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '12px' }}>
                  The collected information is strictly used for legitimate engineering and customer service purposes:
                </p>
                <ul style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '24px' }}>
                  <li>Preparing and delivering tailored machinery price quotes and technical specification sheets.</li>
                  <li>Coordinating Pan-India plant erection, commissioning, and technician visits.</li>
                  <li>Sending warranty updates, OEM spare parts dispatches, and periodic maintenance reminders.</li>
                  <li>Improving our website performance, machinery documentation, and customer response times.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Eye size={20} className="text-orange" />
                  3. Information Security & Confidentiality
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '12px' }}>
                  We implement robust technical and organizational security measures to prevent unauthorized access, disclosure, or modification of your data.
                </p>
                <ul style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '24px' }}>
                  <li>We <strong>NEVER sell, rent, or trade</strong> your personal or commercial data to third-party marketing companies.</li>
                  <li>Information is shared only with authorized Jupiter field engineers and logistic partners for plant delivery.</li>
                  <li>All website data submissions are encrypted via Secure Socket Layer (SSL) protocols.</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#00233D', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} className="text-orange" />
                  4. Cookies & Analytics
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  Our website uses standard essential session cookies to remember navigation state and analyze anonymized page traffic. You can disable cookies in your browser settings at any time without affecting your access to our machinery catalog.
                </p>
              </div>

              {/* Section 5 Contact */}
              <div style={{ background: '#F1F5F9', borderRadius: '12px', padding: '24px 28px', border: '1px solid #CBD5E1' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#00233D', marginBottom: '12px' }}>
                  Questions or Data Requests?
                </h4>
                <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '16px' }}>
                  If you wish to update, review, or delete your contact details from our inquiry system, please reach out to our administration office:
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.9rem', color: '#00233D', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} className="text-orange" />
                    <span>mathivanan.md@jupitergroups.in</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={16} className="text-orange" />
                    <span>+91 93429 19060</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} className="text-orange" />
                    <span>Coimbatore, Tamil Nadu - 641035</span>
                  </div>
                </div>
              </div>

            </div>

            <div style={{ marginTop: '36px', textAlign: 'center' }}>
              <Link to="/contact" className="btn btn-orange" style={{ padding: '12px 28px' }}>
                <span>Contact Engineering Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ArrowRight,
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { submitEnquiry } from '../services/api';
import { PageBanner } from '../components/PageBanner';
import { PhoneInputWithCountry } from '../components/PhoneInputWithCountry';
import { validateName, validatePhone, validateEmail } from '../utils/validation';

export const ContactPage: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    countryCode: '+91',
    phone: '',
    email: '',
    product: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const nameRes = validateName(formData.name);
    if (!nameRes.isValid && nameRes.error) {
      newErrors.name = nameRes.error;
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company name';
    }
    const phoneRes = validatePhone(formData.countryCode, formData.phone);
    if (!phoneRes.isValid && phoneRes.error) {
      newErrors.phone = phoneRes.error;
    }
    const emailRes = validateEmail(formData.email, true);
    if (!emailRes.isValid && emailRes.error) {
      newErrors.email = emailRes.error;
    }
    if (!formData.product) {
      newErrors.product = 'Please select a product of interest';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please provide details about your machinery or capacity requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Name field: strip digits — only letters, spaces, dots, hyphens allowed
    const sanitized = name === 'name' ? value.replace(/[0-9]/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const combinedMessage = `Company: ${formData.company} | Product Interest: ${formData.product} | Details: ${formData.message}`;
      const fullPhone = `${formData.countryCode} ${formData.phone.trim()}`;
      const res = await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        message: combinedMessage,
      });

      setStatusMessage({
        type: 'success',
        text: res.message || 'Thank you! Your enquiry has been submitted. Our engineering team will contact you within 24 hours.',
      });
      setFormData({
        name: '',
        company: '',
        countryCode: '+91',
        phone: '',
        email: '',
        product: '',
        message: '',
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Unable to submit enquiry right now. Please try calling +91 93429 19060 or WhatsApp us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Page Banner with Breadcrumb */}
      <PageBanner
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      {/* 2. MAIN 2-COLUMN SECTION: SEND AN ENQUIRY + 4 CONTACT CARDS */}
      <section className="section-padding contact-main-body-section bg-white">
        <div className="container">
          <div className="contact-two-column-grid">
            {/* Left Column: Dark Navy Enquiry Form */}
            <div className="contact-dark-enquiry-card">
              <div className="section-pill-dash-title" style={{ marginBottom: '10px' }}>
                <h2 className="contact-enquiry-card-title">
                  Send an <span className="text-orange">Enquiry</span>
                </h2>
              </div>
              <p className="contact-enquiry-card-subtitle">
                Share your requirements and our team will get back to you within 24 hours.
              </p>

              {statusMessage && (
                <div className={`form-status-alert ${statusMessage.type}`} style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-custom-form" noValidate>
                <div className="contact-form-2col-row">
                  <div className="contact-input-group">
                    <label className="contact-input-label">
                      Name <span className="label-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="contact-dark-input"
                      disabled={loading}
                    />
                    {errors.name && <span className="contact-field-error">{errors.name}</span>}
                  </div>

                  <div className="contact-input-group">
                    <label className="contact-input-label">
                      Company Name <span className="label-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleChange}
                      className="contact-dark-input"
                      disabled={loading}
                    />
                    {errors.company && <span className="contact-field-error">{errors.company}</span>}
                  </div>
                </div>

                <div className="contact-form-2col-row">
                  <div className="contact-input-group">
                    <label className="contact-input-label">
                      Phone <span className="label-asterisk">*</span>
                    </label>
                    <PhoneInputWithCountry
                      dialCode={formData.countryCode}
                      phoneNumber={formData.phone}
                      onDialCodeChange={(code) => {
                        setFormData(prev => ({ ...prev, countryCode: code }));
                        if (formData.phone) {
                          const v = validatePhone(code, formData.phone);
                          setErrors(prev => ({ ...prev, phone: v.isValid ? '' : (v.error || '') }));
                        }
                      }}
                      onPhoneNumberChange={(num) => {
                        setFormData(prev => ({ ...prev, phone: num }));
                        if (errors.phone) {
                          const v = validatePhone(formData.countryCode, num);
                          setErrors(prev => ({ ...prev, phone: v.isValid ? '' : (v.error || '') }));
                        }
                      }}
                      hasError={Boolean(errors.phone)}
                      disabled={loading}
                      required
                    />
                    {errors.phone && <span className="contact-field-error">{errors.phone}</span>}
                  </div>

                  <div className="contact-input-group">
                    <label className="contact-input-label">
                      Email <span className="label-asterisk">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        handleChange(e);
                        if (errors.email) {
                          const res = validateEmail(e.target.value, true);
                          setErrors(prev => ({ ...prev, email: res.isValid ? '' : (res.error || '') }));
                        }
                      }}
                      onBlur={() => {
                        const res = validateEmail(formData.email, true);
                        if (!res.isValid && res.error) {
                          setErrors(prev => ({ ...prev, email: res.error || '' }));
                        }
                      }}
                      className={`contact-dark-input ${errors.email ? 'has-error' : ''}`}
                      disabled={loading}
                    />
                    {errors.email && <span className="contact-field-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact-input-group full-width">
                  <label className="contact-input-label">
                    Product Interest <span className="label-asterisk">*</span>
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="contact-dark-select"
                    disabled={loading}
                  >
                    <option value="">Select a product</option>
                    <option value="Concrete Block Machines">Concrete Block Machines</option>
                    <option value="Fly Ash Brick Machines">Fly Ash Brick Machines</option>
                    <option value="Paver Block Machines">Paver Block Machines</option>
                    <option value="Concrete Batching Plants">Concrete Batching Plants</option>
                    <option value="Moulds & Precision Tooling">Moulds & Precision Tooling</option>
                    <option value="Spare Parts & Service Support">Spare Parts & Service Support</option>
                    <option value="Custom Plant Automation">Custom Plant Automation</option>
                  </select>
                  {errors.product && <span className="contact-field-error">{errors.product}</span>}
                </div>

                <div className="contact-input-group full-width">
                  <label className="contact-input-label">
                    Message <span className="label-asterisk">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project, capacity, or any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-dark-textarea"
                    disabled={loading}
                  ></textarea>
                  {errors.message && <span className="contact-field-error">{errors.message}</span>}
                </div>

                <div className="contact-form-footer-action">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-orange contact-submit-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  <span className="contact-submit-notice">
                    Our team will get back to you within 24 hours.
                  </span>
                </div>
              </form>
            </div>

            {/* Right Column: Single Unified Contact Info Card */}
            <div className="contact-cards-quad-grid">
              <div className="contact-single-unified-card">

                {/* Row 1: Quick Contact Phone */}
                <div className="contact-unified-row">
                  <div className="contact-quad-icon-box orange">
                    <Phone size={20} />
                  </div>
                  <div className="contact-quad-content">
                    <h3 className="contact-quad-title">Quick Contact</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '4px' }}>
                      <a href="tel:+919342919060" className="contact-quad-highlight" style={{ textDecoration: 'none', color: '#081322', margin: 0 }}>
                        +91 93429 19060
                      </a>
                      <a href="tel:+919159999060" className="contact-quad-highlight" style={{ textDecoration: 'none', color: '#081322', margin: 0 }}>
                        +91 91599 99060
                      </a>
                    </div>
                    <span className="contact-quad-subtext">Mon - Sat, 9:00 AM - 6:00 PM (IST)</span>
                  </div>
                </div>

                <div className="contact-unified-divider" />

                {/* Row 2: WhatsApp Us */}
                <a
                  href="https://wa.me/919342919060?text=Hello%20Jupiter%20Industries,%20I%20am%20interested%20in%20your%20brick%20making%20machines."
                  target="_blank"
                  rel="noreferrer"
                  className="contact-unified-row contact-unified-row--link"
                >
                  <div className="contact-quad-icon-box green">
                    <MessageSquare size={20} />
                  </div>
                  <div className="contact-quad-content">
                    <h3 className="contact-quad-title">WhatsApp Us</h3>
                    <p className="contact-quad-highlight">+91 93429 19060</p>
                    <span className="contact-quad-subtext">Quick quotation &amp; support on WhatsApp</span>
                  </div>
                </a>

                <div className="contact-unified-divider" />

                {/* Row 3: Email Us */}
                <div className="contact-unified-row">
                  <div className="contact-quad-icon-box orange">
                    <Mail size={20} />
                  </div>
                  <div className="contact-quad-content">
                    <h3 className="contact-quad-title">Email Us</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '4px' }}>
                      <a href="mailto:mathivanan.md@jupitergroups.in" className="contact-quad-highlight" style={{ fontSize: '0.87rem', wordBreak: 'break-all', textDecoration: 'none', color: '#081322', margin: 0 }}>
                        mathivanan.md@jupitergroups.in
                      </a>
                      <a href="mailto:marketing@jupitergroups.in" className="contact-quad-highlight" style={{ fontSize: '0.87rem', wordBreak: 'break-all', textDecoration: 'none', color: '#081322', margin: 0 }}>
                        marketing@jupitergroups.in
                      </a>
                    </div>
                    <span className="contact-quad-subtext">We respond within 24 hours</span>
                  </div>
                </div>

                <div className="contact-unified-divider" />

                {/* Row 4: Location */}
                <a
                  href="https://www.google.com/maps?cid=8000996565713436119"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-unified-row contact-unified-row--link"
                >
                  <div className="contact-quad-icon-box orange">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-quad-content">
                    <h3 className="contact-quad-title">Location</h3>
                    <p className="contact-quad-address">
                      153-154, Sri Garden, Vilankurichi, Coimbatore, Tamil Nadu - 641035
                    </p>
                    <span className="contact-quad-subtext">Mon - Sat, 9:00 AM - 6:00 PM (IST)</span>
                  </div>
                </a>

                <div className="contact-unified-divider" />

                {/* Social Media Row */}
                <div className="contact-unified-social-row">
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#001827' }}>
                    Connect with Jupiter Industries:
                  </span>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <a href="https://www.facebook.com/jupiterindustries.in" target="_blank" rel="noreferrer" title="Facebook" aria-label="Facebook"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: '#1877F2', color: '#fff', textDecoration: 'none', boxShadow: '0 3px 10px rgba(24,119,242,0.3)', transition: 'transform 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                    ><Facebook size={18} /></a>
                    <a href="https://www.instagram.com/jupiterindustry/" target="_blank" rel="noreferrer" title="Instagram" aria-label="Instagram"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', color: '#fff', textDecoration: 'none', boxShadow: '0 3px 10px rgba(220,39,67,0.3)', transition: 'transform 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                    ><Instagram size={18} /></a>
                    <a href="https://www.youtube.com/@jupiter_industries_india" target="_blank" rel="noreferrer" title="YouTube" aria-label="YouTube"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: '#FF0000', color: '#fff', textDecoration: 'none', boxShadow: '0 3px 10px rgba(255,0,0,0.3)', transition: 'transform 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                    ><Youtube size={18} /></a>
                    <a href="https://wa.me/919342919060" target="_blank" rel="noreferrer" title="WhatsApp" aria-label="WhatsApp"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', color: '#fff', textDecoration: 'none', boxShadow: '0 3px 10px rgba(37,211,102,0.3)', transition: 'transform 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
                    >
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COIMBATORE LOCATION (1800px CONTAINER - MAP ONLY) */}
      <section className="contact-location-section" style={{ padding: '40px 0 60px 0' }}>
        <div style={{ maxWidth: '1800px', width: '100%', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '1px solid #E2E8F0', 
            boxShadow: '0 8px 30px rgba(0, 20, 40, 0.06)' 
          }}>
            <iframe
              title="Jupiter Industries Google Map Location"
              src="https://maps.google.com/maps?cid=8000996565713436119&output=embed"
              width="100%"
              height="480"
              style={{ border: 0, display: 'block', width: '100%' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};


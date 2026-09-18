import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ArrowRight,
  CheckCircle2, 
  AlertCircle, 
  Loader2
} from 'lucide-react';
import { submitEnquiry } from '../services/api';
import { PageBanner } from '../components/PageBanner';

export const ContactPage: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
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
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Please enter your company name';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid business email address';
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const res = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: combinedMessage,
      });

      setStatusMessage({
        type: 'success',
        text: res.message || 'Thank you! Your enquiry has been submitted. Our engineering team will contact you within 24 hours.',
      });
      setFormData({
        name: '',
        company: '',
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
                <span className="pill-dash-orange"></span>
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
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="contact-dark-input"
                      disabled={loading}
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
                      onChange={handleChange}
                      className="contact-dark-input"
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

            {/* Right Column: 2x2 Grid of White Contact Cards */}
            <div className="contact-cards-quad-grid">
              {/* Card 1: Quick Contact Phone */}
              <div className="contact-info-quad-card">
                <div className="contact-quad-icon-box orange">
                  <Phone size={22} />
                </div>
                <div className="contact-quad-content">
                  <h3 className="contact-quad-title">Quick Contact</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '8px' }}>
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

              {/* Card 2: WhatsApp Us */}
              <a 
                href="https://wa.me/919342919060?text=Hello%20Jupiter%20Industries,%20I%20am%20interested%20in%20your%20brick%20making%20machines." 
                target="_blank" 
                rel="noreferrer"
                className="contact-info-quad-card"
              >
                <div className="contact-quad-icon-box green">
                  <MessageSquare size={22} />
                </div>
                <div className="contact-quad-content">
                  <h3 className="contact-quad-title">WhatsApp Us</h3>
                  <p className="contact-quad-highlight">+91 93429 19060</p>
                  <span className="contact-quad-subtext">Quick quotation & support on WhatsApp</span>
                </div>
              </a>

              {/* Card 3: Email Us */}
              <div className="contact-info-quad-card">
                <div className="contact-quad-icon-box orange">
                  <Mail size={22} />
                </div>
                <div className="contact-quad-content">
                  <h3 className="contact-quad-title">Email Us</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                    <a href="mailto:mathivanan.md@jupitergroups.in" className="contact-quad-highlight" style={{ fontSize: '0.88rem', wordBreak: 'break-all', textDecoration: 'none', color: '#081322', margin: 0 }}>
                      mathivanan.md@jupitergroups.in
                    </a>
                    <a href="mailto:marketing@jupitergroups.in" className="contact-quad-highlight" style={{ fontSize: '0.88rem', wordBreak: 'break-all', textDecoration: 'none', color: '#081322', margin: 0 }}>
                      marketing@jupitergroups.in
                    </a>
                  </div>
                  <span className="contact-quad-subtext">We respond within 24 hours</span>
                </div>
              </div>

              {/* Card 4: Location */}
              <a 
                href="https://www.google.com/maps?cid=8000996565713436119" 
                target="_blank" 
                rel="noreferrer"
                className="contact-info-quad-card"
              >
                <div className="contact-quad-icon-box orange">
                  <MapPin size={22} />
                </div>
                <div className="contact-quad-content">
                  <h3 className="contact-quad-title">Location</h3>
                  <p className="contact-quad-address">
                    153-154, Sri Garden, Vilankurichi, Coimbatore, Tamil Nadu - 641035
                  </p>
                  <span className="contact-quad-subtext">Mon - Sat, 9:00 AM - 6:00 PM (IST)</span>
                </div>
              </a>
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


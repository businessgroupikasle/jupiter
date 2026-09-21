import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitEnquiry, EnquiryPayload } from '../services/api';
import { PhoneInputWithCountry } from './PhoneInputWithCountry';
import { validateName, validatePhone, validateEmail } from '../utils/validation';

export interface EnquiryFormProps {
  isModal?: boolean;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ isModal, onSuccess }) => {
  const [formData, setFormData] = useState<EnquiryPayload & { countryCode: string }>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const nameRes = validateName(formData.name);
    if (!nameRes.isValid && nameRes.error) {
      newErrors.name = nameRes.error;
    }

    const emailRes = validateEmail(formData.email, true);
    if (!emailRes.isValid && emailRes.error) {
      newErrors.email = emailRes.error;
    }

    const phoneRes = validatePhone(formData.countryCode, formData.phone);
    if (!phoneRes.isValid && phoneRes.error) {
      newErrors.phone = phoneRes.error;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please provide details about your machinery requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Name field: strip digits — only letters, spaces, dots, hyphens allowed
    const sanitized = name === 'name' ? value.replace(/[0-9]/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    if (errors[name]) {
      if (name === 'email') {
        const res = validateEmail(value, true);
        setErrors((prev) => ({ ...prev, email: res.isValid ? undefined : res.error }));
      } else if (name === 'name') {
        const res = validateName(sanitized);
        setErrors((prev) => ({ ...prev, name: res.isValid ? undefined : res.error }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const fullPhone = `${formData.countryCode} ${formData.phone.trim()}`;
      const res = await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        message: `Machinery Requirement: ${formData.message.trim()}`,
      });
      setStatusMessage({
        type: 'success',
        text: res.message || 'Thank you. Your enquiry has been submitted successfully.',
      });
      setFormData({ name: '', email: '', phone: '', countryCode: '+91', message: '' });
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Unable to connect to server. Please try again or reach us via WhatsApp.',
      });
    } finally {
      setLoading(false);
    }
  };

  const formFieldsNode = (
    <div>
      {statusMessage && (
        <div className={`form-status-alert ${statusMessage.type}`}>
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="enquiry-fields-grid">
          {/* Name field */}
          <div>
            {isModal && <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#00233D', marginBottom: '6px' }}>Your Name *</label>}
            <input
              type="text"
              name="name"
              placeholder="e.g. Ramesh Kumar"
              value={formData.name}
              onChange={handleChange}
              className="custom-input-control"
              disabled={loading}
              style={isModal ? { background: '#F8FAFC', border: '1.5px solid #CBD5E1', color: '#0F172A', borderRadius: '10px' } : undefined}
            />
            {errors.name && <p className="form-error-msg">{errors.name}</p>}
          </div>

          {/* Email field */}
          <div>
            {isModal && <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#00233D', marginBottom: '6px' }}>Email Address *</label>}
            <input
              type="email"
              name="email"
              placeholder="e.g. name@company.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => {
                const res = validateEmail(formData.email, true);
                if (!res.isValid && res.error) {
                  setErrors((prev) => ({ ...prev, email: res.error }));
                }
              }}
              className={`custom-input-control ${errors.email ? 'has-error' : ''}`}
              disabled={loading}
              style={isModal ? { 
                background: errors.email ? '#FFF5F5' : '#F8FAFC', 
                border: errors.email ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1', 
                color: '#0F172A', 
                borderRadius: '10px' 
              } : undefined}
            />
            {errors.email && (
              <p className="form-error-msg" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px', color: '#DC2626', fontSize: '0.82rem', fontWeight: 600 }}>
                <AlertCircle size={13} />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone field with Country Code Select */}
          <div>
            {isModal && <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#00233D', marginBottom: '6px' }}>Phone Number *</label>}
            <PhoneInputWithCountry
              dialCode={formData.countryCode}
              phoneNumber={formData.phone}
              onDialCodeChange={(code) => setFormData(prev => ({ ...prev, countryCode: code }))}
              onPhoneNumberChange={(num) => {
                setFormData(prev => ({ ...prev, phone: num }));
                if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
              }}
              hasError={Boolean(errors.phone)}
              disabled={loading}
              required
            />
            {errors.phone && <p className="form-error-msg">{errors.phone}</p>}
          </div>

          {/* Message field */}
          <div>
            {isModal && <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#00233D', marginBottom: '6px' }}>Machinery Requirement *</label>}
            <input
              type="text"
              name="message"
              placeholder="e.g. Automatic Fly Ash Brick Machine"
              value={formData.message}
              onChange={handleChange}
              className="custom-input-control"
              disabled={loading}
              style={isModal ? { background: '#F8FAFC', border: '1.5px solid #CBD5E1', color: '#0F172A', borderRadius: '10px' } : undefined}
            />
            {errors.message && <p className="form-error-msg">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-field-full" style={{ marginTop: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-orange"
              style={{ width: '100%', padding: '16px 24px', fontSize: '1rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  if (isModal) {
    return formFieldsNode;
  }

  return (
    <section className="section-padding enquiry-section-wrap" id="enquiry-section">
      <div className="container">
        <div className="enquiry-box-container">
          <div className="enquiry-form-layout">
            {/* Left Header info */}
            <div className="enquiry-form-header">
              <h2>Enquire Now</h2>
              <p>Let’s build a stronger tomorrow together.</p>
            </div>

            {/* Right Form Fields */}
            {formFieldsNode}
          </div>
        </div>
      </div>
    </section>
  );
};

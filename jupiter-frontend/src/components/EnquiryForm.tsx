import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitEnquiry, EnquiryPayload } from '../services/api';

export interface EnquiryFormProps {
  isModal?: boolean;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ isModal, onSuccess }) => {
  const [formData, setFormData] = useState<EnquiryPayload>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<EnquiryPayload>>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<EnquiryPayload> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = 'Please provide details about your machinery requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
      const res = await submitEnquiry(formData);
      setStatusMessage({
        type: 'success',
        text: res.message || 'Thank you. Your enquiry has been submitted successfully.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
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
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="custom-input-control"
              disabled={loading}
            />
            {errors.name && <p className="form-error-msg">{errors.name}</p>}
          </div>

          {/* Email field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="custom-input-control"
              disabled={loading}
            />
            {errors.email && <p className="form-error-msg">{errors.email}</p>}
          </div>

          {/* Phone field */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="custom-input-control"
              disabled={loading}
            />
            {errors.phone && <p className="form-error-msg">{errors.phone}</p>}
          </div>

          {/* Message field */}
          <div>
            <input
              type="text"
              name="message"
              placeholder="Your Message (e.g., I need a block making machine)"
              value={formData.message}
              onChange={handleChange}
              className="custom-input-control"
              disabled={loading}
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

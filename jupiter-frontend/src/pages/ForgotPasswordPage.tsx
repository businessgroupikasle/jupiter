import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, AlertCircle, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { requestPasswordReset } from '../services/authService';
import { IMAGES } from '../assets/images/images';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [debugUrl, setDebugUrl] = useState<string | null>(null);

  const validateEmail = (val: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    // Realistic API delay for smooth UX
    setTimeout(() => {
      const res = requestPasswordReset(cleanEmail);
      setIsLoading(false);
      setIsSubmitted(true);
      if (res.debugResetUrl) {
        setDebugUrl(res.debugResetUrl);
      }
    }, 600);
  };

  return (
    <div
      className="admin-forgot-password-container"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        position: 'relative',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Background: Machinery Image + Dark Navy Gradient Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={IMAGES.performanceMachine}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(0,24,39,0.94) 0%, rgba(0,24,39,0.88) 40%, rgba(0,24,39,0.92) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(255,140,0,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Top Left: Back to Sign In Link */}
      <Link
        to="/admin"
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          zIndex: 50,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-3px)';
          const circle = e.currentTarget.querySelector('.back-circle') as HTMLElement;
          if (circle) circle.style.background = 'rgba(255, 255, 255, 0.22)';
          const label = e.currentTarget.querySelector('.back-label') as HTMLElement;
          if (label) label.style.color = '#FF8C00';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
          const circle = e.currentTarget.querySelector('.back-circle') as HTMLElement;
          if (circle) circle.style.background = 'rgba(255, 255, 255, 0.12)';
          const label = e.currentTarget.querySelector('.back-label') as HTMLElement;
          if (label) label.style.color = '#E6EAEF';
        }}
      >
        <div
          className="back-circle"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ArrowLeft size={18} />
        </div>
        <span
          className="back-label"
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#E6EAEF',
            letterSpacing: '0.01em',
            transition: 'color 0.2s ease',
          }}
        >
          Back to Sign In
        </span>
      </Link>

      {/* Main Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          padding: '40px 36px 36px',
          position: 'relative',
          zIndex: 10,
          boxSizing: 'border-box',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <img
            src={IMAGES.logo}
            alt="Jupiter Industries"
            style={{
              height: '50px',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Header Icon + Title */}
        <div style={{ marginBottom: '22px', textAlign: 'center' }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(255, 140, 0, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF8C00',
              marginBottom: '14px',
            }}
          >
            <Mail size={26} />
          </div>
          <h2
            style={{
              color: '#001827',
              fontSize: '1.45rem',
              fontWeight: 800,
              margin: '0 0 8px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Forgot Password?
          </h2>
          <p
            style={{
              color: '#64748B',
              fontSize: '0.88rem',
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            {isSubmitted
              ? 'Password reset instructions have been dispatched.'
              : 'Enter your registered admin email and we will send you a secure link to reset your password.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              background: '#FFF1F2',
              border: '1px solid #FECDD3',
              color: '#BE123C',
              padding: '12px 14px',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 500,
              lineHeight: 1.35,
            }}
          >
            <AlertCircle size={17} style={{ flexShrink: 0, color: '#E11D48' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success View */}
        {isSubmitted ? (
          <div>
            <div
              style={{
                background: '#ECFDF5',
                border: '1.5px solid #A7F3D0',
                color: '#065F46',
                padding: '18px 16px',
                borderRadius: '14px',
                marginBottom: '24px',
                fontSize: '0.90rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                lineHeight: 1.5,
              }}
            >
              <CheckCircle2
                size={22}
                style={{ flexShrink: 0, color: '#059669', marginTop: '2px' }}
              />
              <div>
                <strong style={{ display: 'block', marginBottom: '4px', color: '#064E3B' }}>
                  Check your inbox
                </strong>
                <span>If this email is registered, a password reset link has been sent.</span>
              </div>
            </div>

            {/* Direct testing link for local development */}
            {debugUrl && (
              <div
                style={{
                  background: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '22px',
                  fontSize: '0.80rem',
                  color: '#92400E',
                  lineHeight: 1.4,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>Development Reset Link:</div>
                <Link
                  to={debugUrl}
                  style={{
                    color: '#D97706',
                    textDecoration: 'underline',
                    wordBreak: 'break-all',
                    fontWeight: 600,
                  }}
                >
                  Click here to open the reset password link directly
                </Link>
              </div>
            )}

            <Link
              to="/admin"
              style={{
                width: '100%',
                padding: '13px 20px',
                background: 'linear-gradient(135deg, #001827 0%, #002B47 100%)',
                color: '#FFFFFF',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxSizing: 'border-box',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <ShieldCheck size={18} />
              <span>Return to Admin Sign In</span>
            </Link>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                  setDebugUrl(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Need to try a different email?
              </button>
            </div>
          </div>
        ) : (
          /* Forgot Password Form */
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '22px' }}>
              <label
                style={{
                  display: 'block',
                  color: '#334155',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  marginBottom: '7px',
                }}
              >
                Registered Admin Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="admin@jupiter.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 14px 12px 40px',
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '10px',
                    color: '#0F172A',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF8C00';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 0, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '13px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '13px 20px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #E67E00 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: isLoading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(255, 140, 0, 0.35)',
                transition: 'background 0.2s ease, opacity 0.2s ease, transform 0.15s ease',
                opacity: isLoading ? 0.75 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #E67E00 0%, #CC7000 100%)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(255, 140, 0, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #E67E00 100%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 140, 0, 0.35)';
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sending Link...</span>
                </>
              ) : (
                <span>Send Password Reset Link</span>
              )}
            </button>

            {/* Back to Login Footer */}
            <div
              style={{
                marginTop: '22px',
                textAlign: 'center',
                fontSize: '0.86rem',
                color: '#64748B',
              }}
            >
              <span>Remembered your password? </span>
              <Link
                to="/admin"
                style={{
                  color: '#FF8C00',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

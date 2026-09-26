import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Loader2,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { verifyResetToken, resetPasswordWithToken } from '../services/authService';
import { IMAGES } from '../assets/images/images';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  // Form states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status states
  const [tokenStatus, setTokenStatus] = useState<{ checked: boolean; valid: boolean; error?: string }>({
    checked: false,
    valid: false,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Validate token on mount
  useEffect(() => {
    if (!token || !email) {
      setTokenStatus({
        checked: true,
        valid: false,
        error: 'Invalid password reset link. Token or registered email is missing.',
      });
      return;
    }

    const verification = verifyResetToken(email, token);
    setTokenStatus({
      checked: true,
      valid: verification.valid,
      error: verification.error,
    });
  }, [token, email]);

  // Countdown and automatic redirect on success
  useEffect(() => {
    if (!isSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/admin?reset=success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword) {
      setErrorMsg('Please enter a new password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = resetPasswordWithToken(email, token, newPassword);
      setIsLoading(false);

      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(res.error || 'Failed to reset password. Please try again.');
      }
    }, 600);
  };

  return (
    <div
      className="admin-reset-password-container"
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

        {/* 1. Invalid or Expired Token State */}
        {tokenStatus.checked && !tokenStatus.valid && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#FEF2F2',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
                marginBottom: '16px',
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h2
              style={{
                color: '#001827',
                fontSize: '1.35rem',
                fontWeight: 800,
                margin: '0 0 10px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Invalid or Expired Link
            </h2>

            <p
              style={{
                color: '#64748B',
                fontSize: '0.88rem',
                margin: '0 0 24px 0',
                lineHeight: 1.5,
              }}
            >
              {tokenStatus.error || 'This password reset link is invalid, expired, or has already been used.'}
            </p>

            <Link
              to="/admin/forgot-password"
              style={{
                width: '100%',
                padding: '13px 20px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #E67E00 100%)',
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
                boxShadow: '0 4px 14px rgba(255, 140, 0, 0.35)',
              }}
            >
              <KeyRound size={17} />
              <span>Request New Reset Link</span>
            </Link>

            <div style={{ marginTop: '16px' }}>
              <Link
                to="/admin"
                style={{
                  color: '#64748B',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        )}

        {/* 2. Success State */}
        {isSuccess && (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#ECFDF5',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                marginBottom: '16px',
              }}
            >
              <CheckCircle2 size={30} />
            </div>

            <h2
              style={{
                color: '#001827',
                fontSize: '1.4rem',
                fontWeight: 800,
                margin: '0 0 10px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Password Reset Successfully!
            </h2>

            <p
              style={{
                color: '#475569',
                fontSize: '0.90rem',
                margin: '0 0 20px 0',
                lineHeight: 1.5,
              }}
            >
              Your admin password has been updated. You can now use your new password to sign in to the Jupiter admin panel.
            </p>

            <div
              style={{
                background: '#F1F5F9',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '22px',
                fontSize: '0.82rem',
                color: '#64748B',
              }}
            >
              Redirecting to login in <strong style={{ color: '#FF8C00' }}>{countdown}</strong> seconds...
            </div>

            <Link
              to="/admin?reset=success"
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
              }}
            >
              <ShieldCheck size={18} />
              <span>Sign In Now</span>
            </Link>
          </div>
        )}

        {/* 3. Valid Token Form State */}
        {tokenStatus.checked && tokenStatus.valid && !isSuccess && (
          <div>
            {/* Header */}
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
                <KeyRound size={26} />
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
                Reset Password
              </h2>
              <p
                style={{
                  color: '#64748B',
                  fontSize: '0.88rem',
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                Create a strong new password for your admin account.
              </p>
            </div>

            {/* Account Pill */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '9px 14px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.82rem',
              }}
            >
              <span style={{ color: '#64748B' }}>Account:</span>
              <strong style={{ color: '#001827', letterSpacing: '0.01em' }}>{email}</strong>
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

            <form onSubmit={handleSubmit}>
              {/* New Password */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    color: '#334155',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    marginBottom: '7px',
                  }}
                >
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 42px 12px 40px',
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
                  <Lock
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '13px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94A3B8',
                      pointerEvents: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title={showNewPassword ? 'Hide password' : 'Show password'}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
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
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '12px 42px 12px 40px',
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
                  <Lock
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '13px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94A3B8',
                      pointerEvents: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
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
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <span>Reset & Save Password</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;

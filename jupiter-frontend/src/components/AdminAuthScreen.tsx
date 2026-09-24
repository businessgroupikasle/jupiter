import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginAdmin, AdminUser } from '../services/authService';
import { IMAGES } from '../assets/images/images';

interface AdminAuthScreenProps {
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminAuthScreen: React.FC<AdminAuthScreenProps> = ({ onLoginSuccess }) => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // General UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginAdmin(loginEmail, loginPassword);
      setIsLoading(false);

      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Invalid admin credentials.');
      }
    }, 400);
  };

  return (
    <div
      className="admin-auth-container"
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
      {/* Background: Machine image with dark navy overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}>
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
        {/* Dark navy gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0,24,39,0.92) 0%, rgba(0,24,39,0.85) 40%, rgba(0,24,39,0.88) 100%)',
        }} />
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,140,0,0.06) 0%, transparent 70%)',
        }} />
      </div>

      {/* Top Left Corner: Back to Home Link */}
      <Link
        to="/"
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
          Back to Home
        </span>
      </Link>

      {/* Auth Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255, 255, 255, 0.97)',
        borderRadius: '24px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        padding: '40px 36px 36px',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        backdropFilter: 'blur(20px)',
      }}>

        {/* Logo */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
        }}>
          <img
            src={IMAGES.logo}
            alt="Jupiter Industries"
            style={{
              height: '52px',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Header */}
        <div style={{ marginBottom: '22px', textAlign: 'center' }}>
          <h2 style={{
            color: '#001827',
            fontSize: '1.45rem',
            fontWeight: 800,
            margin: '0 0 6px 0',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}>
            <ShieldCheck size={22} style={{ color: '#FF8C00' }} />
            Admin Sign In
          </h2>
          <p style={{
            color: '#64748B',
            fontSize: '0.88rem',
            margin: 0,
            lineHeight: 1.4
          }}>
            Access restricted to administrators
          </p>
        </div>


        {/* Error / Feedback Alert */}
        {errorMsg && (
          <div style={{
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
            lineHeight: 1.35
          }}>
            <AlertCircle size={17} style={{ flexShrink: 0, color: '#E11D48' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit}>
          {/* Admin Email */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              color: '#334155',
              fontSize: '0.86rem',
              fontWeight: 600,
              marginBottom: '7px'
            }}>
              Admin Email
            </label>
            <input
              type="email"
              placeholder="admin@jupiter.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '10px',
                color: '#0F172A',
                fontSize: '0.92rem',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
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
          </div>

          {/* Password */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{
              display: 'block',
              color: '#334155',
              fontSize: '0.86rem',
              fontWeight: 600,
              marginBottom: '7px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showLoginPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 42px 12px 14px',
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '10px',
                  color: '#0F172A',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
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
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
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
                  alignItems: 'center'
                }}
                title={showLoginPassword ? 'Hide password' : 'Show password'}
              >
                {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button — orange theme */}
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
              boxShadow: '0 4px 14px rgba(255, 140, 0, 0.35)',
              transition: 'background 0.2s ease, opacity 0.2s ease, transform 0.15s ease',
              opacity: isLoading ? 0.75 : 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #E67E00 0%, #CC7000 100%)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(255, 140, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00 0%, #E67E00 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 140, 0, 0.35)';
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In to Admin Panel'}
          </button>

          {/* Footer link */}
          <div style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '0.84rem',
            color: '#64748B'
          }}>
            <span>Not an admin? </span>
            <Link
              to="/"
              style={{
                color: '#FF8C00',
                fontWeight: 600,
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Go to website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

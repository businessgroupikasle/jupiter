import React, { useState } from 'react';
import { Shield, Lock, Mail, User, Eye, EyeOff, Key, Sparkles, ArrowRight, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { loginAdmin, signupAdmin, AdminUser } from '../services/authService';
import { IMAGES } from '../assets/images/images';

interface AdminAuthScreenProps {
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminAuthScreen: React.FC<AdminAuthScreenProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupAdminCode, setSignupAdminCode] = useState('JUPITER2026');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // General UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginAdmin(loginEmail, loginPassword);
      setIsLoading(false);

      if (res.success && res.user) {
        setSuccessMsg('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          onLoginSuccess(res.user!);
        }, 600);
      } else {
        setErrorMsg(res.error || 'Authentication failed.');
      }
    }, 400);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signupName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = signupAdmin(signupName, signupEmail, signupPassword, signupAdminCode);
      setIsLoading(false);

      if (res.success && res.user) {
        setSuccessMsg('Account created successfully! Logging you in...');
        setTimeout(() => {
          onLoginSuccess(res.user!);
        }, 800);
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setLoginEmail('admin@jupiter.com');
    setLoginPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div 
      className="admin-auth-container" 
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `linear-gradient(135deg, rgba(0, 15, 26, 0.92) 0%, rgba(0, 35, 61, 0.82) 50%, rgba(0, 15, 26, 0.92) 100%), url(${IMAGES.heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Background Subtle Cyber Glow Ring */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(234, 88, 12, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '1040px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(28px)',
        borderRadius: '24px',
        border: '1.5px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 30px 90px rgba(0, 20, 36, 0.35), 0 0 40px rgba(255, 255, 255, 0.4)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Left Branding Showcase Column */}
        <div style={{
          padding: '48px 40px',
          background: 'linear-gradient(180deg, #FFF7ED 0%, #F1F5F9 100%)',
          borderRight: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
              <img src={IMAGES.logo} alt="Jupiter Logo" style={{ height: '48px', objectFit: 'contain' }} />
              <div>
                <h2 style={{ color: '#00233D', fontSize: '1.35rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
                  Jupiter Industries
                </h2>
                <span style={{ color: '#EA580C', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  ● HEAVY MACHINERY ADMIN CONSOLE
                </span>
              </div>
            </div>

            <h1 style={{ color: '#00233D', fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.25, marginBottom: '16px' }}>
              Heavy Machinery Management Console
            </h1>

            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Secure administrative access for managing products, machinery catalogs, customer enquiries, projects, and website content.
            </p>

            {/* Feature List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ background: '#FFEDD5', padding: '8px', borderRadius: '10px', color: '#EA580C' }}>
                  <Shield size={18} />
                </div>
                <div>
                  <div style={{ color: '#00233D', fontSize: '0.9rem', fontWeight: 800 }}>Encrypted Session Auth</div>
                  <div style={{ color: '#64748B', fontSize: '0.8rem' }}>Role-based permissions & secure storage</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ background: '#E0F2FE', padding: '8px', borderRadius: '10px', color: '#0284C7' }}>
                  <Building2 size={18} />
                </div>
                <div>
                  <div style={{ color: '#00233D', fontSize: '0.9rem', fontWeight: 800 }}>Real-Time Control Panel</div>
                  <div style={{ color: '#64748B', fontSize: '0.8rem' }}>Live updates for block & brick machines</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Helper Box */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '14px',
            padding: '18px',
            color: '#1E293B',
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(0, 35, 61, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, color: '#0284C7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Quick Demo Login
              </span>
              <button 
                type="button" 
                onClick={fillDemoCredentials}
                style={{ 
                  background: '#EA580C', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '6px', 
                  padding: '5px 12px', 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(234, 88, 12, 0.3)' 
                }}
              >
                Auto Fill
              </button>
            </div>
            <div style={{ fontFamily: 'monospace', color: '#334155', fontWeight: 600 }}>Email: admin@jupiter.com</div>
            <div style={{ fontFamily: 'monospace', color: '#334155', fontWeight: 600 }}>Password: admin123</div>
          </div>
        </div>

        {/* Right Auth Forms Column */}
        <div style={{ padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Tab Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '28px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'login' ? '#EA580C' : 'transparent',
                color: activeTab === 'login' ? '#ffffff' : '#94A3B8',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'signup' ? '#EA580C' : 'transparent',
                color: activeTab === 'signup' ? '#ffffff' : '#94A3B8',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Register Admin
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#6EE7B7',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                  Admin Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="email"
                    placeholder="e.g. admin@jupiter.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 44px 12px 42px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
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
                      color: '#64748B',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: '#EA580C',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: isLoading ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 20px rgba(234, 88, 12, 0.35)',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 16px 10px 42px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="email"
                    placeholder="e.g. manager@jupiter.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 16px 10px 42px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Password
                  </label>
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                    Confirm Password
                  </label>
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Admin Security Key <span style={{ color: '#64748B', fontWeight: 400 }}>(Default: JUPITER2026)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
                  <input
                    type="text"
                    placeholder="JUPITER2026"
                    value={signupAdminCode}
                    onChange={(e) => setSignupAdminCode(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 16px 10px 42px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: '#EA580C',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: isLoading ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 20px rgba(234, 88, 12, 0.35)',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                <span>{isLoading ? 'Creating Account...' : 'Register Admin Account'}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

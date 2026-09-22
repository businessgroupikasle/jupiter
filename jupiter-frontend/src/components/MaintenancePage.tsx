import React from 'react';
import { MaintenanceConfig } from '../services/maintenanceService';
import { Phone, Mail, Clock, ShieldAlert, ArrowRight, Wrench } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppButton';

interface MaintenancePageProps {
  config: MaintenanceConfig;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ config }) => {
  const cleanPhone = config.emergencyPhone.replace(/[^0-9]/g, '');

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at 50% 20%, #00233D 0%, #00121F 85%, #000810 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 20px',
      color: '#FFFFFF',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle Background Glow Circles */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 146, 0, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '720px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        padding: '44px 36px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo and Brand */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <img 
            src="/favicon.png" 
            alt="Jupiter Industries Logo" 
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.04em', color: '#FFFFFF', display: 'block' }}>
              JUPITER INDUSTRIES
            </span>
            <span style={{ fontSize: '0.72rem', color: '#FF9200', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Heavy Industrial Machinery
            </span>
          </div>
        </div>

        {/* Maintenance Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 146, 0, 0.15)',
            border: '1px solid rgba(255, 146, 0, 0.35)',
            color: '#FF9200',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}>
            <Wrench size={16} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>MAINTENANCE MODE ACTIVE</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: '16px',
          lineHeight: 1.3
        }}>
          {config.title || 'Scheduled Machinery Infrastructure Maintenance'}
        </h1>

        {/* Notice Message */}
        <p style={{
          fontSize: '0.98rem',
          color: '#CBD5E1',
          lineHeight: 1.7,
          maxWidth: '580px',
          margin: '0 auto 24px auto'
        }}>
          {config.message || 'Jupiter Industries website is currently undergoing scheduled platform upgrades to optimize our machinery catalog and quotation system. We will be back online shortly.'}
        </p>

        {/* Estimated Time Badge */}
        {config.estimatedTime && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '10px 20px',
            borderRadius: '12px',
            color: '#94A3B8',
            fontSize: '0.88rem',
            marginBottom: '32px'
          }}>
            <Clock size={18} style={{ color: '#FF9200' }} />
            <span>{config.estimatedTime}</span>
          </div>
        )}

        {/* Emergency Contact Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '28px',
          marginTop: '8px'
        }}>
          <p style={{ fontSize: '0.86rem', color: '#94A3B8', marginBottom: '16px', fontWeight: 600 }}>
            Need urgent machinery quotations or plant dispatch support? Contact our engineering team:
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Phone */}
            {config.emergencyPhone && (
              <a 
                href={`tel:${config.emergencyPhone}`} 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#0F2744',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                <Phone size={16} style={{ color: '#FF9200' }} />
                <span>{config.emergencyPhone}</span>
              </a>
            )}

            {/* WhatsApp */}
            {cleanPhone && (
              <a 
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Jupiter Industries, I need urgent assistance regarding brick & block machinery during maintenance.')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#166534',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                <WhatsAppIcon size={18} color="#FFFFFF" />
                <span>WhatsApp Us</span>
              </a>
            )}

            {/* Email */}
            {config.emergencyEmail && (
              <a 
                href={`mailto:${config.emergencyEmail}`} 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#0F2744',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                <Mail size={16} style={{ color: '#FF9200' }} />
                <span>{config.emergencyEmail}</span>
              </a>
            )}
          </div>
        </div>

        {/* Admin Access Link */}
        <div style={{ marginTop: '36px', paddingTop: '16px', borderTop: '1px dashed rgba(255, 255, 255, 0.08)' }}>
          <a 
            href="/admin?tab=settings" 
            style={{
              fontSize: '0.82rem',
              color: '#64748B',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF9200')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            <ShieldAlert size={14} />
            <span>Administrator Access & Control Panel</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>

      <footer style={{ marginTop: '24px', fontSize: '0.78rem', color: '#475569' }}>
        © {new Date().getFullYear()} Jupiter Industries. All rights reserved.
      </footer>
    </div>
  );
};

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
import { 
  UnauthorizedPage, 
  ForbiddenPage, 
  NotFoundPage, 
  InternalServerErrorPage, 
  ServiceUnavailablePage 
} from './errors';
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const MachineCategoryPage = lazy(() => import('./pages/MachineCategoryPage').then(m => ({ default: m.MachineCategoryPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsConditionsPage = lazy(() => import('./pages/TermsConditionsPage').then(m => ({ default: m.TermsConditionsPage })));
const SitemapPage = lazy(() => import('./pages/SitemapPage').then(m => ({ default: m.SitemapPage })));
import { EnquiryForm } from './components/EnquiryForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MaintenancePage } from './components/MaintenancePage';
import { getStoredMaintenanceConfig, MaintenanceConfig } from './services/maintenanceService';
import { getCurrentUser } from './services/authService';
import { X, AlertTriangle } from 'lucide-react';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const handleScroll = () => {
      const key = `scroll_${pathname}${search}`;
      sessionStorage.setItem(key, String(window.scrollY));
      sessionStorage.setItem(`scroll_${pathname}`, String(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, search]);

  useEffect(() => {
    if (navType === 'POP') {
      const savedKey = `scroll_${pathname}${search}`;
      const saved = sessionStorage.getItem(savedKey) || sessionStorage.getItem(`scroll_${pathname}`);
      if (saved) {
        const top = parseInt(saved, 10);
        requestAnimationFrame(() => {
          window.scrollTo({ top, behavior: 'auto' });
          setTimeout(() => {
            window.scrollTo({ top, behavior: 'auto' });
          }, 80);
        });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, search, navType]);

  return null;
};

const AppContent: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [maintenanceConfig, setMaintenanceConfig] = useState<MaintenanceConfig>(() => getStoredMaintenanceConfig());
  const location = useLocation();

  useEffect(() => {
    const handleUpdate = () => {
      setMaintenanceConfig(getStoredMaintenanceConfig());
    };
    window.addEventListener('jupiter_maintenance_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('jupiter_maintenance_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const currentUser = getCurrentUser();
  const isAdmin = location.pathname.startsWith('/admin');
  const searchParams = new URLSearchParams(location.search);
  const isExplicitPreview = searchParams.get('preview') === 'true' && !!currentUser;

  if (isAdmin) {
    return (
      <ErrorBoundary fallbackTitle="Admin Dashboard Encountered an Error">
        <Routes>
          <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  // Active Maintenance Mode gate: Frontend directly enters maintenance mode when enabled
  if (maintenanceConfig.enabled && !isExplicitPreview) {
    return <MaintenancePage config={maintenanceConfig} />;
  }

  return (
    <div className="app-main-layout">
      {/* Admin Preview Notice when Maintenance Mode is ON */}
      {maintenanceConfig.enabled && (
        <div style={{
          background: '#FF9200',
          color: '#001827',
          padding: '9px 16px',
          textAlign: 'center',
          fontSize: '0.82rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          position: 'sticky',
          top: 0,
          zIndex: 9999,
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
        }}>
          <AlertTriangle size={16} />
          <span>MAINTENANCE MODE ACTIVE: Visitors see the maintenance screen. You have Admin Preview Access.</span>
          <a 
            href="/admin?tab=settings" 
            style={{ 
              textDecoration: 'underline', 
              color: '#001827', 
              marginLeft: '6px',
              fontWeight: 800
            }}
          >
            Manage in Settings &rarr;
          </a>
        </div>
      )}
      {/* Sticky Header / Navbar */}
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      {/* Dynamic Page Router */}
      <ErrorBoundary fallbackTitle="Jupiter Application Encountered an Error">
        <Suspense fallback={<div style={{ padding: '80px 24px', textAlign: 'center', color: '#00233D', fontWeight: 600 }}>Loading...</div>}>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/about" element={<Navigate to="/about-us" replace />} />
        <Route path="/about.html" element={<Navigate to="/about-us" replace />} />
        <Route path="/machines" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products.html" element={<Navigate to="/products" replace />} />

        {/* Dynamic & Sub-Product Machine Pages */}
        <Route path="/products/:categorySlug" element={<MachineCategoryPage />} />
        <Route path="/machines/:categorySlug" element={<Navigate to="/products/:categorySlug" replace />} />
        <Route path="/fly-ash-brick-machine" element={<Navigate to="/products/fly-ash-brick-machine" replace />} />
        <Route path="/fly-ash-making-machine" element={<Navigate to="/products/fly-ash-brick-machine" replace />} />
        <Route path="/30-ton-rotary-fly-ash-brick-making-machine" element={<Navigate to="/products/fly-ash-brick-machine?model=30-ton-rotary-fly-ash-brick-making-machine" replace />} />
        <Route path="/30-40-ton-rotary-fly-ash-brick-making-machine" element={<Navigate to="/products/fly-ash-brick-machine?model=30-ton-rotary-fly-ash-brick-making-machine" replace />} />
        <Route path="/hollow-and-solid-block-machine" element={<Navigate to="/products/hollow-and-solid-block-machine" replace />} />
        <Route path="/hollow-and-solid-block-making-machine" element={<Navigate to="/products/hollow-and-solid-block-machine" replace />} />
        <Route path="/jupiter-hdm-800-hollow-solid-block-making-machine" element={<Navigate to="/products/hollow-and-solid-block-machine?model=jupiter-hdm-800-hollow-solid-block-making-machine" replace />} />
        <Route path="/double-triple-vibrator-hollow-solid-block-making-machine" element={<Navigate to="/products/hollow-and-solid-block-machine?model=double-triple-vibrator-hollow-solid-block-making-machine" replace />} />
        <Route path="/inter-block-making-machine" element={<Navigate to="/products/inter-block-making-machine" replace />} />
        <Route path="/inter-locking-brick-making-machine" element={<Navigate to="/products/inter-block-making-machine" replace />} />
        <Route path="/interlocking-block-making-machine" element={<Navigate to="/products/inter-block-making-machine" replace />} />
        <Route path="/interlocking-block-machine" element={<Navigate to="/products/inter-block-making-machine" replace />} />
        <Route path="/manual-interlock-block-making-machine" element={<Navigate to="/products/inter-block-making-machine?model=manual-interlock-block-making-machine" replace />} />
        <Route path="/automatic-interlock-block-making-machine" element={<Navigate to="/products/inter-block-making-machine?model=automatic-interlock-block-making-machine" replace />} />
        <Route path="/paver-block-machine" element={<Navigate to="/products/paver-block-machine" replace />} />
        <Route path="/paver-block-making-machine" element={<Navigate to="/products/paver-block-machine" replace />} />
        <Route path="/je-pbt2-paver-block-making-machine" element={<Navigate to="/products/paver-block-machine?model=je-pbt2-paver-block-making-machine" replace />} />
        <Route path="/batching-plant" element={<Navigate to="/products/batching-plant" replace />} />
        <Route path="/patching-plant" element={<Navigate to="/products/batching-plant" replace />} />
        <Route path="/3-4-bin-batching-plant" element={<Navigate to="/products/batching-plant?model=3-4-bin-batching-plant" replace />} />
        <Route path="/cement-concrete-mixer-350-500-kg" element={<Navigate to="/products/batching-plant?model=cement-concrete-mixer-350-500-kg" replace />} />
        <Route path="/concrete-mixer-machine" element={<Navigate to="/products/batching-plant?model=cement-concrete-mixer-350-500-kg" replace />} />
        <Route path="/storage-silo" element={<Navigate to="/products/storage-silo" replace />} />
        <Route path="/fly-ash-cement-silo-60-100-ton" element={<Navigate to="/products/storage-silo?model=fly-ash-cement-silo-60-100-ton" replace />} />
        <Route path="/hammer-crusher" element={<Navigate to="/products/hammer-crusher" replace />} />
        <Route path="/ji-hammer-crusher-machine" element={<Navigate to="/products/hammer-crusher?model=ji-hammer-crusher-machine" replace />} />
        <Route path="/machine-spares" element={<Navigate to="/products/machine-spares" replace />} />
        <Route path="/spares" element={<Navigate to="/products/machine-spares" replace />} />

        <Route path="/gallery" element={<ProjectsPage />} />
        <Route path="/projects" element={<Navigate to="/gallery" replace />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/blogs" element={<Navigate to="/blog" replace />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
        <Route path="/Contact-us" element={<Navigate to="/contact-us" replace />} />

        {/* Legal & Utility Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
        <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
        <Route path="/sitemap" element={<SitemapPage />} />

        {/* Professional Custom Error Pages & Status Code Aliases */}
        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
        <Route path="/access-denied" element={<Navigate to="/403" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/500" element={<InternalServerErrorPage />} />
        <Route path="/error" element={<InternalServerErrorPage />} />
        <Route path="/server-error" element={<InternalServerErrorPage />} />
        <Route path="/503" element={<ServiceUnavailablePage />} />
        <Route path="/service-unavailable" element={<ServiceUnavailablePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      </ErrorBoundary>

      {/* Master Footer */}
      <Footer />

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton />

      {/* Global Quote Request Modal */}
      {isQuoteModalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="modal-content-card" role="dialog" aria-modal="true" aria-labelledby="global-quote-modal-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <h3 id="global-quote-modal-title" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Request Machinery Quotation</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsQuoteModalOpen(false)}
                aria-label="Close quote modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body-content">
              <EnquiryForm isModal onSuccess={() => setIsQuoteModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;

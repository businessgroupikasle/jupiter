import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { MachineCategoryPage } from './pages/MachineCategoryPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { SitemapPage } from './pages/SitemapPage';
import { EnquiryForm } from './components/EnquiryForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MaintenancePage } from './components/MaintenancePage';
import { getStoredMaintenanceConfig, MaintenanceConfig } from './services/maintenanceService';
import { getCurrentUser } from './services/authService';
import { X, AlertTriangle } from 'lucide-react';

// Scroll to top helper on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/machines" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />

        {/* Dynamic & Sub-Product Machine Pages */}
        <Route path="/products/:categorySlug" element={<MachineCategoryPage />} />
        <Route path="/machines/:categorySlug" element={<MachineCategoryPage />} />
        <Route path="/fly-ash-brick-machine" element={<MachineCategoryPage />} />
        <Route path="/fly-ash-making-machine" element={<MachineCategoryPage />} />
        <Route path="/hollow-and-solid-block-machine" element={<MachineCategoryPage />} />
        <Route path="/hollow-and-solid-block-making-machine" element={<MachineCategoryPage />} />
        <Route path="/inter-block-making-machine" element={<MachineCategoryPage />} />
        <Route path="/inter-locking-brick-making-machine" element={<MachineCategoryPage />} />
        <Route path="/paver-block-machine" element={<MachineCategoryPage />} />
        <Route path="/batching-plant" element={<MachineCategoryPage />} />
        <Route path="/patching-plant" element={<MachineCategoryPage />} />
        <Route path="/storage-silo" element={<MachineCategoryPage />} />
        <Route path="/machine-spares" element={<MachineCategoryPage />} />
        <Route path="/spares" element={<MachineCategoryPage />} />

        <Route path="/gallery" element={<ProjectsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Legal & Utility Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
        <Route path="/terms" element={<TermsConditionsPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Master Footer */}
      <Footer />

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton />

      {/* Global Quote Request Modal */}
      {isQuoteModalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsQuoteModalOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Request Machinery Quotation</h3>
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

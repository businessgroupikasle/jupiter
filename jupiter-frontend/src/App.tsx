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
import { X } from 'lucide-react';

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
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

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

  return (
    <div className="app-main-layout">
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

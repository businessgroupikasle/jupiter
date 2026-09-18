import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  subtitle?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  breadcrumbs = [],
  subtitle
}) => {
  return (
    <section className="page-banner-header">
      <div className="container">
        <h1 className="page-banner-title">{title}</h1>

        {/* Rounded Pill Breadcrumb (e.g. Home > About Us) */}
        <div className="banner-breadcrumb-pill">
          <Link to="/" className="breadcrumb-home-link" title="Back to Home">
            <Home size={14} style={{ marginRight: '5px' }} />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={13} className="breadcrumb-separator" />
              {item.link ? (
                <Link to={item.link} className="breadcrumb-item-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current-page">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {subtitle && (
          <p className="page-banner-subtitle" style={{ marginTop: '14px' }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

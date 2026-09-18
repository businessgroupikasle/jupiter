import React from 'react';

export const TrustedBrands: React.FC = () => {
  const brands = [
    { name: 'UltraTech', sub: 'CEMENT' },
    { name: 'ACC', sub: 'LIMITED' },
    { name: 'Dalmia', sub: 'BHARAT CEMENT' },
    { name: 'Shree Cement', sub: 'LEADERS' },
    { name: 'AFCONS', sub: 'INFRA' },
    { name: 'L&T', sub: 'CONSTRUCTION' },
    { name: 'NBCC', sub: 'INDIA LTD' },
  ];

  return (
    <section className="trusted-brands-section">
      <div className="container">
        <div className="brands-container-layout">
          <div className="brands-header-title">
            TRUSTED BY LEADING BUILDERS AND MANUFACTURERS
          </div>

          <div className="brands-logos-grid">
            {brands.map((brand, idx) => (
              <div key={idx} className="brand-text-logo">
                <span>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import flyashImg from '../assets/images/Machines/flyash.png';
import { getStoredProducts, ProductItem } from '../services/productService';

export const ApplicationCards: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const loadProds = () => {
      const stored = getStoredProducts();
      if (stored && stored.length > 0) {
        const matching = stored.filter(p => {
          const cat = (p.category || '').toLowerCase();
          const slug = (p.categorySlug || '').toLowerCase();
          const name = (p.name || '').toLowerCase();
          return cat.includes('fly ash') || slug.includes('fly-ash') || name.includes('fly ash') ||
                 cat.includes('silo') || slug.includes('silo') || name.includes('silo');
        });
        if (matching.length > 0) {
          setProducts(matching);
          return;
        }
      }
      setProducts(fallbackProducts);
    };

    loadProds();

    window.addEventListener('jupiter_products_updated', loadProds);
    window.addEventListener('storage', loadProds);
    return () => {
      window.removeEventListener('jupiter_products_updated', loadProds);
      window.removeEventListener('storage', loadProds);
    };
  }, []);

  // Flagship industrial products: Fly Ash Brick Machines & Storage Silos
  const fallbackProducts: ProductItem[] = [
    {
      id: 'PROD-FLYASH-VERTICAL',
      name: 'Vertical Fly Ash Brick Machine',
      category: 'Fly Ash Brick Machine',
      categorySlug: 'fly-ash-brick-machine',
      capacity: '10,000 – 20,000 Bricks / Day',
      power: '15 H.P + 2 H.P Electric Motor',
      brickSize: '230 x 110 x 75 mm',
      brandTag: 'POPULAR',
      status: 'Active',
      description: 'High-compaction automatic hydraulic fly ash brick machine for heavy-duty industrial masonry production.',
      image: '/images/flyash-vertical-machine.png',
    },
    {
      id: 'PROD-FLYASH-4BRICK-ROTARY',
      name: '4 Brick Rotary Machine',
      category: 'Fly Ash Brick Machine',
      categorySlug: 'fly-ash-brick-machine',
      capacity: '8,000 – 12,000 Bricks/hr',
      power: '15 H.P Electric Motor',
      brickSize: '230 x 110 x 75 mm',
      brandTag: 'BESTSELLER',
      status: 'Active',
      description: 'Heavy-duty rotary brick machine designed for sustainable, continuous, high-speed production.',
      image: '/images/flyash-4brick-rotary.png',
    },
    {
      id: 'PROD-STORAGE-SILO',
      name: 'Storage Silo',
      category: 'Storage Silo',
      categorySlug: 'storage-silo',
      capacity: '60 Tons | 100 Tons',
      power: 'Air Compressor & Hydraulic',
      brickSize: 'Industrial Bulk Powder Storage',
      brandTag: 'INDUSTRIAL',
      status: 'Active',
      description: 'Industrial bulk material storage silo engineered for cement, fly ash, iron oxide, and lime sludge.',
      image: '/images/storage-silo-product.png',
    },
  ];

  const displayList = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="section-padding bg-white" id="solutions-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-top" style={{ marginBottom: '32px' }}>
          <div>
            <div className="section-pill-dash-title">
              <span className="pill-dash-orange"></span>
              <h2 className="section-title">
                Explore Our <span className="text-orange">Products</span>
              </h2>
            </div>
            <p style={{ color: '#5A6E85', fontSize: '0.98rem', marginTop: '6px', maxWidth: '650px', lineHeight: 1.5 }}>
              Heavy-duty, high-capacity brick, block, and concrete machinery engineered for continuous industrial performance.
            </p>
          </div>
          <Link to="/products" className="section-view-all">
            <span>View All Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Products Cards Grid */}
        <div 
          className="application-cards-grid"
          style={{
            gridTemplateColumns: displayList.length <= 2 
              ? 'repeat(auto-fit, minmax(320px, 480px))' 
              : (displayList.length === 3 ? 'repeat(auto-fit, minmax(300px, 1fr))' : undefined),
            justifyContent: 'center'
          }}
        >
          {displayList.map((prod) => {
            const targetSlug = prod.categorySlug || (prod.category.toLowerCase().includes('silo') ? 'storage-silo' : 'fly-ash-brick-machine');
            const imgUrl = prod.image || ((prod.name.toLowerCase().includes('fly ash') || prod.category.toLowerCase().includes('fly ash'))
              ? flyashImg 
              : '/images/storage-silo-product.png');

            return (
              <Link 
                key={prod.id} 
                to={`/products/${targetSlug}?product=${prod.id}`} 
                className="app-card-item"
                style={{ textDecoration: 'none', color: 'inherit' }}
                title={`View ${prod.name}`}
              >
                {/* Machine Thumbnail */}
                <div 
                  className="app-card-img-wrap" 
                  style={{ 
                    backgroundColor: '#F8FAFC', 
                    padding: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={imgUrl} 
                    alt={prod.name} 
                    loading="lazy" 
                    style={{ 
                      maxHeight: '100%', 
                      maxWidth: '100%', 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 6px 14px rgba(0, 35, 61, 0.08))' 
                    }}
                  />
                </div>
                
                {/* Product Content Body */}
                <div className="app-card-body" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px', padding: '20px' }}>
                  <div className="app-card-text" style={{ width: '100%' }}>
                    <span style={{ 
                      fontSize: '0.74rem', 
                      fontWeight: 700, 
                      color: '#FF9200', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      {prod.category}
                    </span>
                    <h3 className="app-card-title" style={{ fontSize: '1.18rem', marginBottom: '8px', lineHeight: 1.3 }}>
                      {prod.name}
                    </h3>
                    
                    {/* 2-line clean machine description */}
                    <p 
                      className="app-card-desc"
                      style={{
                        color: '#5A6E85',
                        fontSize: '0.86rem',
                        lineHeight: 1.5,
                        margin: '6px 0 12px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '2.8em'
                      }}
                    >
                      {prod.description || 'High-performance heavy industrial machinery engineered for maximum productivity and durability.'}
                    </p>

                    {/* Machine Tech Spec Pill Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                      {prod.capacity && (
                        <span style={{ background: '#F1F5F9', color: '#00233D', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                          ⚡ {prod.capacity}
                        </span>
                      )}
                      {prod.power && (
                        <span style={{ background: '#FFF7ED', color: '#EA580C', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                          ⚙️ {prod.power}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    width: '100%', 
                    paddingTop: '10px', 
                    borderTop: '1px solid #F1F5F9' 
                  }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#00233D', letterSpacing: '0.05em' }}>
                      VIEW TECHNICAL DATA
                    </span>
                    <div className="app-arrow-btn" style={{ width: '34px', height: '34px', borderRadius: '50%' }}>
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

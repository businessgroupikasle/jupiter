import React, { useState, useEffect } from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Package } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';
import { 
  ProductItem, 
  getStoredProducts, 
  fetchProducts,
  CATEGORY_NAME_TO_SLUG_MAP 
} from '../services/productService';

export const ProductsPage: React.FC = () => {
  useSeoMeta({
    title: 'Our Machines | Fly Ash Brick, Block & Paver Machines – Jupiter Industries',
    description: 'Explore Jupiter Industries’ full range of industrial machinery – fly ash brick machines, hollow block machines, interlocking brick machines, paver block plants, batching plants and storage silos.',
    keywords: 'Buy Fly Ash Brick Machine, Block Making Machine Price India, Paver Block Plant, Batching Plant Manufacturer, Machine Spares, Jupiter Industries Products',
    ogUrl: 'https://jupitergroups.in/machines',
  });

  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all-machines';
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [products, setProducts] = useState<ProductItem[]>(getStoredProducts());

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveFilter(category);
    }
  }, [searchParams]);

  // Sync live whenever products are added, edited, or deleted
  useEffect(() => {
    fetchProducts().then(res => {
      if (res && res.length > 0) setProducts(res);
    }).catch(() => {});

    const handleProductsUpdate = () => {
      setProducts(getStoredProducts());
    };

    window.addEventListener('jupiter_products_updated', handleProductsUpdate);
    window.addEventListener('storage', handleProductsUpdate);

    return () => {
      window.removeEventListener('jupiter_products_updated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
    };
  }, []);

  const categories = [
    { id: 'all-machines', name: 'All Machines', slug: 'all-machines', catName: 'All Machines' },
    { id: 'fly-ash-brick-machine', name: 'Fly Ash Brick', slug: 'fly-ash-brick-machine', catName: 'Fly Ash Machine' },
    { id: 'hollow-and-solid-block-machine', name: 'Hollow & Solid Block', slug: 'hollow-and-solid-block-machine', catName: 'Hollow and Solid Block Machine' },
    { id: 'inter-block-making-machine', name: 'Inter Block', slug: 'inter-block-making-machine', catName: 'Interlock Machine' },
    { id: 'paver-block-machine', name: 'Paver Block', slug: 'paver-block-machine', catName: 'Paver Block Machine' },
    { id: 'batching-plant', name: 'Batching Plant', slug: 'batching-plant', catName: 'Batching Plant' },
    { id: 'storage-silo', name: 'Storage Silo', slug: 'storage-silo', catName: 'Storage Silo' },
    { id: 'machine-spares', name: 'Machine Spares', slug: 'machine-spares', catName: 'Machine Spares' },
  ];

  const filteredProducts = (products || []).filter(p => {
    if (!p) return false;
    const pCat = (p.category || '').toLowerCase();
    const pSlug = (p.categorySlug || '').toLowerCase();
    const isSpare = pCat.includes('spare') || pSlug.includes('spare');

    if (activeFilter === 'all-machines' || !activeFilter) {
      // Traditionally we might hide spares from "All Machines" to keep it just machines,
      // but if the user wants it to be a main category, we can include it or hide it.
      // Let's exclude it from "All Machines" so it doesn't clutter the main machine list,
      // but it's available when specifically clicked.
      return !isSpare;
    }

    const catObj = categories.find(c => c.id === activeFilter || c.slug === activeFilter);
    if (!catObj) return true;
    const targetSlug = catObj.slug.toLowerCase();

    if (targetSlug === 'fly-ash-brick-machine') {
      return pSlug === 'fly-ash-brick-machine' || pCat.includes('fly ash');
    }
    if (targetSlug === 'hollow-and-solid-block-machine') {
      return pSlug === 'hollow-and-solid-block-machine' || pCat.includes('hollow') || pCat.includes('solid') || (pCat.includes('block') && !pCat.includes('paver') && !pCat.includes('inter'));
    }
    if (targetSlug === 'inter-block-making-machine') {
      return pSlug === 'inter-block-making-machine' || pCat.includes('inter');
    }
    if (targetSlug === 'paver-block-machine') {
      return pSlug === 'paver-block-machine' || pCat.includes('paver');
    }
    if (targetSlug === 'batching-plant') {
      return pSlug === 'batching-plant' || pCat.includes('batch') || pCat.includes('mix');
    }
    if (targetSlug === 'storage-silo') {
      return pSlug === 'storage-silo' || pCat.includes('silo');
    }
    if (targetSlug === 'machine-spares') {
      return pSlug === 'machine-spares' || isSpare;
    }

    return p.category === catObj.catName || p.categorySlug === catObj.slug;
  });

  return (
    <div className="products-page-view">
      {/* Page Banner with Breadcrumb */}
      <PageBanner
        title="Industrial Machinery & Solutions"
        breadcrumbs={[{ label: 'Products' }]}
      />

      {/* Catalog & Filter Navigation */}
      <section className="section-padding bg-white" style={{ paddingTop: '60px', paddingBottom: '70px' }}>
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
            <span style={{
              display: 'inline-block',
              color: '#EA580C',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              OUR PRODUCTS
            </span>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
              fontWeight: 900,
              color: '#00233D',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}>
              Explore Our Product Range
            </h2>
            <p style={{
              color: '#5A6E85',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              margin: '0 auto'
            }}>
              High-performance machinery for a stronger, more sustainable tomorrow.
            </p>
          </div>

          {/* Filter Pills in Single Row */}
          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            paddingBottom: '0'
          }}>
            {categories.map(cat => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  style={{
                    background: isActive ? '#FF6B00' : '#F8FAFC',
                    color: isActive ? '#FFFFFF' : '#1E293B',
                    border: isActive ? '1px solid #FF6B00' : '1px solid #E2E8F0',
                    borderRadius: '9999px',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 4px 14px rgba(255, 107, 0, 0.35)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Modern 3-Column Products Grid */}
          <div className="products-catalog-modern-grid">
            {filteredProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 24px',
                background: '#F8FAFC',
                borderRadius: '16px',
                border: '2px dashed #E2E8F0',
                gridColumn: '1 / -1',
                margin: '10px 0'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#FFF7ED',
                  color: '#FF6B00',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Package size={30} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#00233D', marginBottom: '8px' }}>
                  No Products in this Category
                </h3>
                <p style={{ color: '#64748B', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  Machinery products for this selection will be displayed as soon as they are added in the catalog.
                </p>
                <Link to="/contact" className="btn btn-orange">
                  <span>Enquire Machinery Custom Specs</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              filteredProducts.map((prod) => {
                const targetSlug = prod.categorySlug || CATEGORY_NAME_TO_SLUG_MAP[prod.category] || 'fly-ash-brick-machine';
                const capacityVal = prod.capacity || (prod.specs && prod.specs['Capacity']) || '1,500 – 2,000 Blocks/hr';
                const operationVal = (prod.specs && (prod.specs['Operation'] || prod.specs['Operation Mode'])) || 'Automatic';
                const features = (prod.keyFeatures && prod.keyFeatures.length >= 2)
                  ? prod.keyFeatures.slice(0, 2)
                  : ['High production efficiency', 'Robust design for continuous operation'];
                return (
                  <Link 
                    key={prod.id} 
                    to={`/products/${targetSlug}?product=${prod.id}`} 
                    className="product-card-modern"
                    title={`View details for ${prod.name}`}
                  >

                    {/* Machine Photo */}
                    <div className="product-card-thumb-wrap">
                      <img src={prod.image} alt={prod.name} loading="lazy" />
                    </div>

                    {/* Title */}
                    <h3 className="product-card-title-modern">
                      {prod.name}
                    </h3>

                    {/* Specs Box */}
                    <div className="product-specs-box-modern">
                      <div className="product-specs-row-item">
                        <span className="spec-lbl">Capacity:</span>
                        <span className="spec-val">{capacityVal}</span>
                      </div>
                      <div className="product-specs-row-item">
                        <span className="spec-lbl">Operation:</span>
                        <span className="spec-val">{operationVal}</span>
                      </div>
                    </div>

                    {/* Feature Checkmark Bullets */}
                    <ul className="product-features-bullet-list">
                      {features.map((feat, fIdx) => (
                        <li key={fIdx} className="product-feature-bullet-item">
                          <CheckCircle2 size={16} className="feat-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Action Row */}
                    <div className="product-card-action-bar">
                      <span className="product-action-label-text">
                        VIEW DETAILS
                      </span>
                      <div className="product-action-circle-btn">
                        <ArrowRight size={17} />
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

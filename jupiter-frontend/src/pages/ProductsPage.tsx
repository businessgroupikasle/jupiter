import React, { useState, useEffect } from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Package } from 'lucide-react';
import { PageBanner } from '../components/PageBanner';
import { ProductCardImage } from '../components/ProductCardImage';
import { 
  ProductItem, 
  getStoredProducts, 
  fetchProducts,
  CATEGORY_NAME_TO_SLUG_MAP 
} from '../services/productService';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  useSeoMeta({
    title: 'Brick & Block Making Machines | Jupiter Industries',
    description: 'Explore Jupiter Industries’ range of 5G brick making machines, fly ash brick machines, interlock block machines, paver block machines and concrete block machinery',
    keywords: 'Brick & Block Making Machines, 5G Brick Machine, Fly Ash Brick Machine, Interlock Block Machine, Paver Block Machine, Concrete Block Machinery, Jupiter Industries Products',
    canonical: 'https://jupitergroups.in/products',
    ogUrl: 'https://jupitergroups.in/products',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Brick & Block Making Machines | Jupiter Industries',
      'url': 'https://jupitergroups.in/products',
      'description': 'Explore Jupiter Industries’ range of 5G brick making machines, fly ash brick machines, interlock block machines, paver block machines and concrete block machinery',
      'publisher': {
        '@type': 'Organization',
        'name': 'Jupiter Industries',
        'url': 'https://jupitergroups.in'
      }
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || sessionStorage.getItem('jupiter_last_product_category') || 'all-machines';
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const [products, setProducts] = useState<ProductItem[]>(getStoredProducts());

  useEffect(() => {
    const category = searchParams.get('category');
    if (category === 'machine-spares' || category === 'spares') {
      navigate('/products/machine-spares', { replace: true });
    } else if (category) {
      setActiveFilter(category);
    }
  }, [searchParams, navigate]);

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
        title="Brick Making Machines & Block Making Machines"
        breadcrumbs={[{ label: 'Products' }]}
      />

      {/* Catalog & Filter Navigation */}
      <section className="section-padding bg-white" style={{ paddingTop: '60px', paddingBottom: '70px' }}>
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto 40px auto' }}>
            <span style={{
              display: 'inline-block',
              color: '#EA580C',
              fontSize: '0.85rem',
              fontWeight: 800,
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
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Brick Making Machines & Block Making Machinery
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
              <p style={{
                color: '#334155',
                fontSize: '1.04rem',
                lineHeight: 1.7,
                margin: 0
              }}>
                Discover industrial machinery engineered to support modern brick and concrete block manufacturing. Jupiter Industries offers a comprehensive range of production equipment, including 5G Brick Making Machines, Fly Ash Brick Making Machines, Interlock Block Machines, Paver Block Machines, Concrete Block Machines, and Hollow & Solid Block Machines.
              </p>
              <p style={{
                color: '#5A6E85',
                fontSize: '0.98rem',
                lineHeight: 1.65,
                margin: 0
              }}>
                From high-speed brick production systems to specialised block manufacturing equipment, our product range serves diverse production requirements across the construction industry. Explore our machine models, compare technical specifications and production capacities, and find the right equipment for your manufacturing operations.
              </p>
              <p style={{
                color: '#5A6E85',
                fontSize: '0.98rem',
                lineHeight: 1.65,
                margin: 0
              }}>
                Browse our products to learn more about each machine and contact Jupiter Industries for technical information, product recommendations and quotations.
              </p>
            </div>
          </div>

          {/* Filter Pills in Responsive Row / Scroll */}
          <div className="products-filter-pills-bar">
            {categories.map(cat => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (cat.id === 'machine-spares' || cat.slug === 'machine-spares') {
                      navigate('/products/machine-spares');
                    } else {
                      setActiveFilter(cat.id);
                      sessionStorage.setItem('jupiter_last_product_category', cat.id);
                      if (cat.id === 'all-machines') {
                        setSearchParams({}, { replace: true });
                      } else {
                        setSearchParams({ category: cat.id }, { replace: true });
                      }
                    }
                  }}
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
                <Link to="/contact-us" className="btn btn-orange">
                  <span>Enquire Machinery Custom Specs</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              filteredProducts.map((prod) => {
                const targetSlug = prod.categorySlug || CATEGORY_NAME_TO_SLUG_MAP[prod.category] || 'fly-ash-brick-machine';
                const capacityVal = (prod.capacity && prod.capacity.trim()) || (prod.specs && prod.specs['Capacity'] && String(prod.specs['Capacity']).trim()) || '';
                const operationVal = (prod.specs && (prod.specs['Operation'] || prod.specs['Operation Mode'])) || 'Automatic';
                const features = (prod.keyFeatures && prod.keyFeatures.length >= 2)
                  ? prod.keyFeatures.slice(0, 2)
                  : ['High production efficiency', 'Robust design for continuous operation'];
                return (
                  <Link 
                    key={prod.id} 
                    to={{
                      pathname: `/products/${targetSlug}`,
                      search: `?product=${prod.id}${activeFilter && activeFilter !== 'all-machines' ? `&category=${activeFilter}` : ''}`
                    }}
                    onClick={() => {
                      sessionStorage.setItem(`scroll_${window.location.pathname}${window.location.search}`, String(window.scrollY));
                      sessionStorage.setItem(`scroll_${window.location.pathname}`, String(window.scrollY));
                      sessionStorage.setItem('jupiter_last_product_category', activeFilter);
                    }}
                    className="product-card-modern"
                    title={`View details for ${prod.name}`}
                  >

                    {/* Machine Photo */}
                    <div className="product-card-thumb-wrap">
                      <ProductCardImage src={prod.imageUrl || prod.image} alt={prod.name} />
                    </div>

                    {/* Title */}
                    <h3 className="product-card-title-modern">
                      {prod.name}
                    </h3>

                    {/* Specs Box */}
                    <div className="product-specs-box-modern">
                      {capacityVal && (
                        <div className="product-specs-row-item">
                          <span className="spec-lbl">Capacity:</span>
                          <span className="spec-val">{capacityVal}</span>
                        </div>
                      )}
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

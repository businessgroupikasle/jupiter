import React, { useState, useEffect, useMemo } from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { useParams, useSearchParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  FileText,
  Settings,
  Loader2,
  AlertCircle,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  Scan,
  Droplets,
  Coins,
  Check,
  Search,
  Zap,
  RotateCw,
  Layers,
  CircleDot,
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getCategoryBySlug, SubMachineItem, fetchProducts } from '../services/productService';
import { getStoredAncillaryEquipment, AncillaryEquipmentItem, getAncillaryEnabledCategories } from '../services/ancillaryEquipmentService';
import { submitEnquiry } from '../services/api';
import { PageBanner } from '../components/PageBanner';
import { getProductImageUrl, handleImageError } from '../utils/imageUrl';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import { IMAGES } from '../assets/images/images';
import { PhoneInputWithCountry } from '../components/PhoneInputWithCountry';
import { validateName, validatePhone, validateEmail } from '../utils/validation';
import { NotFoundPage } from './NotFoundPage';

export const DEFAULT_BADGES = ['Durable Construction', 'Consistent Dimensions', 'Lower Water Absorption', 'Cost-Effective Solution'];

export const DEFAULT_HIGHLIGHTS = [
  { title: 'High Compaction Density', description: 'Delivers sharp block corners, zero internal air voids, and high early compressive strength.' },
  { title: 'Siemens / Delta PLC Automation', description: 'Fully automated cycle management with simple one-touch touchscreen control and safety interlocks.' },
  { title: 'CNC Hardened Alloy Steel Moulds', description: 'Wear-resistant dies machined to exact tolerances ensuring hundreds of thousands of cycles.' },
  { title: 'Heavy-Duty Fabricated Chassis', description: 'Stress-relieved solid steel frame engineered to dampen vibration and withstand continuous 24/7 duty.' },
];

export const DEFAULT_ADVANTAGES = [
  { title: 'Reduced Cement Consumption', description: 'Optimum particle packing and vibration density reduces cement ratio by up to 25-30% while retaining strength.' },
  { title: 'Zero Plant Downtime', description: 'Backed by Coimbatore OEM spare parts stock and emergency 24-hour service dispatch across India.' },
  { title: 'Uniform Dimensions & Smooth Finish', description: 'Eliminates thick plastering mortar requirements, cutting masonry installation labor costs.' },
  { title: 'Faster Return on Investment', description: 'High production speed with minimal labor dependency ensures early project break-even and profitability.' },
];

interface SpareItemCardProps {
  spare: SubMachineItem;
  onOpenQuote: (name: string) => void;
  onZoom: (imgUrl: string) => void;
}

const SpareItemCard: React.FC<SpareItemCardProps> = ({ spare, onOpenQuote, onZoom }) => {
  const [selectedThumbIdx, setSelectedThumbIdx] = useState(0);

  const images = useMemo(() => {
    const list: string[] = [];
    if (spare.image) list.push(getProductImageUrl(spare.image));
    if (spare.galleryImages && spare.galleryImages.length > 0) {
      spare.galleryImages.forEach(img => { if (img) { const res = getProductImageUrl(img); if (!list.includes(res)) list.push(res); }
      });
    }
    return list.filter(Boolean);
  }, [spare]);

  const currentImg = getProductImageUrl(images[selectedThumbIdx] || images[0] || IMAGES.performanceMachine);

  const getFullImgUrl = (img?: string) => {
    if (!img || img.startsWith('data:')) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    return typeof window !== 'undefined' ? `${window.location.origin}${img.startsWith('/') ? '' : '/'}${img}` : '';
  };

  const spareImgUrl = getFullImgUrl(currentImg || spare.image);
  const spareProductUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/machine-spares#${spare.id}` : '';

  const waMessageLines = [
    `Hello Jupiter Industries, I am interested in ${spare.name}.`,
    `Please share technical catalog and price quotation.`
  ];
  if (spareProductUrl) {
    waMessageLines.push(`\nProduct Link: ${spareProductUrl}`);
  }
  if (spareImgUrl) {
    waMessageLines.push(`Product Image: ${spareImgUrl}`);
  }

  const waMessage = encodeURIComponent(waMessageLines.join('\n'));

  return (
    <div className="pdp-showcase-grid" id={spare.id} style={{ marginBottom: '56px', paddingBottom: '48px', borderBottom: '1.5px solid #E2E8F0' }}>
      {/* Left Column: Product Image Gallery */}
      <div className="pdp-gallery-col">
        {/* Main Image Card with Zoom Button */}
        <div 
          className="pdp-main-image-card"
          onClick={() => onZoom(currentImg)}
          title="Click to view full image"
        >
          <button
            type="button"
            className="pdp-zoom-btn"
            onClick={(e) => {
              e.stopPropagation();
              onZoom(currentImg);
            }}
            title="Click to zoom image"
            aria-label="Zoom image"
          >
            <Maximize2 size={18} />
          </button>
          <img
            src={currentImg}
            alt={spare.name}
            className="pdp-main-image" loading="lazy" onError={handleImageError}
          />
        </div>

        {/* Thumbnail Strip with < and > Arrows */}
        {images.length > 1 && (
          <div className="pdp-thumbnails-strip">
            <button
              type="button"
              className="pdp-thumb-arrow"
              onClick={() => setSelectedThumbIdx(prev => (prev > 0 ? prev - 1 : images.length - 1))}
              aria-label="Previous thumbnail"
            >
              <ChevronLeft size={16} />
            </button>

            {images.map((imgUrl, tIdx) => (
              <div
                key={tIdx}
                className={`pdp-thumb-box ${selectedThumbIdx === tIdx ? 'active' : ''}`}
                onClick={() => setSelectedThumbIdx(tIdx)}
              >
                <img
                  src={imgUrl}
                  alt={`${spare.name} thumbnail ${tIdx + 1}`}
                  className="pdp-thumb-img" onError={handleImageError}
                />
              </div>
            ))}

            <button
              type="button"
              className="pdp-thumb-arrow"
              onClick={() => setSelectedThumbIdx(prev => (prev < images.length - 1 ? prev + 1 : 0))}
              aria-label="Next thumbnail"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Title, Subtitle, Description & CTAs */}
      <div className="pdp-info-col">
        <h2 className="pdp-title">{spare.name}</h2>

        <div className="pdp-subtitle">
          {spare.subCategoryTag || 'Original Factory Spare Parts & Precision Moulds'}
        </div>

        <p className="pdp-desc">
          {spare.description || `${spare.name} precision manufactured by Jupiter Industries for maximum service life and heavy-duty reliability.`}
        </p>

        {/* Action Buttons Group */}
        <div className="pdp-actions-group">
          <div className="pdp-actions-row1">
            <button
              type="button"
              onClick={() => onOpenQuote(spare.name)}
              className="pdp-btn-quote"
            >
              GET A QUOTE
            </button>

            <a
              href={`https://wa.me/919342919060?text=${waMessage}`}
              target="_blank"
              rel="noreferrer"
              className="pdp-btn-whatsapp"
            >
              <WhatsAppIcon size={18} />
              <span>ENQUIRE ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MachineCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Active Model Index (if category has multiple models)
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);

  // Gallery Thumbnail Carousel State
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Active Tab in Bottom Section (Default: specifications)
  const [activeTab, setActiveTab] = useState<
    'highlights' | 'specifications' | 'features' | 'advantages'
  >('specifications');

  // Lightbox Zoom Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');

  // Machine Spares Search Query State
  const [sparesSearch, setSparesSearch] = useState('');

  // Quote Request Modal State
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedMachineName, setSelectedMachineName] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Quick Enquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Ancillary / Related Machinery list synced live with Admin Panel
  const [ancillaryEquipmentList, setAncillaryEquipmentList] = useState<AncillaryEquipmentItem[]>(() => getStoredAncillaryEquipment());
  const [ancillaryEnabledCategories, setAncillaryEnabledCategories] = useState<string[]>(() => getAncillaryEnabledCategories());

  useEffect(() => {
    const handleAncillaryUpdate = () => {
      setAncillaryEquipmentList(getStoredAncillaryEquipment());
      setAncillaryEnabledCategories(getAncillaryEnabledCategories());
    };
    window.addEventListener('jupiter_ancillary_updated', handleAncillaryUpdate);
    window.addEventListener('storage', handleAncillaryUpdate);
    return () => {
      window.removeEventListener('jupiter_ancillary_updated', handleAncillaryUpdate);
      window.removeEventListener('storage', handleAncillaryUpdate);
    };
  }, []);

  // Sync live whenever products are added, edited, or loaded
  useEffect(() => {
    fetchProducts().then(() => setUpdateTrigger(prev => prev + 1)).catch(() => {});

    const handleUpdate = () => {
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener('jupiter_products_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('jupiter_products_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const pathSlug = location.pathname.replace(/^\/(products|machines)\//, '').replace(/^\//, '');
  const currentSlug = categorySlug || pathSlug || 'fly-ash-brick-machine';
  const categoryData = useMemo(() => {
    return getCategoryBySlug(currentSlug);
  }, [currentSlug, updateTrigger]);

  const isSparesCategory = currentSlug === 'machine-spares' || currentSlug === 'spares' || (categoryData && categoryData.slug === 'machine-spares');

  const isAncillaryVisibleOnThisCategory = useMemo(() => {
    if (isSparesCategory) return false;
    const slug = (currentSlug || '').toLowerCase();
    return ancillaryEnabledCategories.some(s => s.toLowerCase() === slug);
  }, [currentSlug, isSparesCategory, ancillaryEnabledCategories]);

  const canonicalPath = categoryData ? `https://jupitergroups.in/products/${categoryData.slug}` : `https://jupitergroups.in/products/${currentSlug}`;

  // Dynamic SEO meta tags per machine category
  useSeoMeta({
    title: categoryData
      ? `${categoryData.name} | Jupiter Industries – Industrial Machinery Manufacturer`
      : 'Machine Category | Jupiter Industries',
    description: categoryData
      ? `Buy ${categoryData.name} from Jupiter Industries. ${categoryData.subTitle || categoryData.introDescription?.slice(0, 120) || 'High-performance industrial machinery with turnkey Pan-India support.'}`
      : 'Browse our range of industrial brick & block making machines. Jupiter Industries – trusted manufacturer across India.',
    keywords: categoryData
      ? `${categoryData.name}, Jupiter Industries, Buy ${categoryData.name} India, Industrial Machinery Coimbatore`
      : 'Industrial Machinery, Brick Machine, Block Machine, Jupiter Industries',
    canonical: canonicalPath,
    ogUrl: canonicalPath,
    jsonLd: categoryData ? [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': categoryData.name,
        'description': categoryData.introDescription || categoryData.subTitle,
        'url': canonicalPath,
        'brand': {
          '@type': 'Brand',
          'name': 'Jupiter Industries'
        },
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://jupitergroups.in/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Products',
            'item': 'https://jupitergroups.in/products'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': categoryData.name,
            'item': canonicalPath
          }
        ]
      }
    ] : undefined
  });

  const displaySpares = useMemo(() => {
    if (!categoryData || !isSparesCategory) return [];
    if (!sparesSearch.trim()) return categoryData.subMachines;
    const q = sparesSearch.toLowerCase();
    return categoryData.subMachines.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.subCategoryTag && s.subCategoryTag.toLowerCase().includes(q))
    );
  }, [categoryData, isSparesCategory, sparesSearch]);

  // Handle URL query param for model pre-selection (?model= or ?product=)
  useEffect(() => {
    if (categoryData && categoryData.subMachines.length > 0) {
      const modelParam = searchParams.get('model') || searchParams.get('product') || searchParams.get('id');
      if (modelParam) {
        const foundIdx = categoryData.subMachines.findIndex(
          m => m.id.toLowerCase() === modelParam.toLowerCase() ||
               (m.slug && m.slug.toLowerCase() === modelParam.toLowerCase()) ||
               m.name.toLowerCase().includes(modelParam.toLowerCase())
        );
        if (foundIdx !== -1) {
          setSelectedModelIdx(foundIdx);
          setSelectedImageIdx(0);
        }
      }
    }
  }, [categoryData, searchParams]);

  if (!categoryData) {
    return <NotFoundPage />;
  }

  // Active Machine Model
  const activeMachine: SubMachineItem | undefined = categoryData.subMachines[selectedModelIdx] || categoryData.subMachines[0];

  // Prepare images gallery - only show additional thumbnails if user actually added them
  const galleryImages: string[] = useMemo(() => {
    const list: string[] = [];
    if (activeMachine?.image) { list.push(getProductImageUrl(activeMachine.image)); }
    if (activeMachine?.galleryImages && activeMachine.galleryImages.length > 0) {
      activeMachine.galleryImages.forEach(img => { if (img && img.trim().length > 0) { const res = getProductImageUrl(img); if (!list.includes(res)) list.push(res); }
      });
    }
    return list.filter(Boolean);
  }, [activeMachine]);

  const currentDisplayImage = getProductImageUrl(galleryImages[selectedImageIdx] || galleryImages[0] || IMAGES.performanceMachine);

  // Thumbnail Navigation Handlers
  const handlePrevThumb = () => {
    setSelectedImageIdx(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNextThumb = () => {
    setSelectedImageIdx(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  // Quote Modal Handlers
  const resetQuoteForm = () => {
    setFormData({
      name: '',
      countryCode: '+91',
      phone: '',
      email: '',
      message: ''
    });
    setFormErrors({});
    setStatusMessage(null);
    setIsSubmittedSuccess(false);
  };

  const handleOpenQuote = (machineName?: string) => {
    resetQuoteForm();
    setSelectedMachineName(machineName || activeMachine?.name || categoryData.name);
    setQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setQuoteModalOpen(false);
    resetQuoteForm();
  };

  // Close quote modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quoteModalOpen) {
        handleCloseQuote();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quoteModalOpen]);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Comprehensive field validation
    const nameResult = validateName(formData.name);
    const phoneResult = validatePhone(formData.countryCode, formData.phone);
    const emailResult = validateEmail(formData.email, true);

    const errors: { name?: string; phone?: string; email?: string } = {};
    if (!nameResult.isValid) errors.name = nameResult.error;
    if (!phoneResult.isValid) errors.phone = phoneResult.error;
    if (!emailResult.isValid) errors.email = emailResult.error;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setStatusMessage({ type: 'error', text: 'Please correct the highlighted errors before submitting.' });
      return;
    }

    setFormErrors({});
    setLoading(true);
    setStatusMessage(null);
    try {
      const fullPhone = `${formData.countryCode} ${formData.phone.trim()}`;
      await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim() || 'customer@inquiry.com',
        phone: fullPhone,
        message: `Quotation for: ${selectedMachineName || activeMachine?.name || categoryData.name} | Requirement: ${formData.message}`
      });

      setIsSubmittedSuccess(true);
      setStatusMessage({
        type: 'success',
        text: 'Quotation request submitted! Our factory engineer will contact you shortly with catalog & pricing.'
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Unable to submit request. Please call +91 93429 19060 directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Build Comprehensive Specifications Parameter Rows
  const specRows: Array<{ param: string; detail: string }> = useMemo(() => {
    if (!activeMachine) return [];

    const rows: Array<{ param: string; detail: string }> = [];

    // Check if custom specTableRows are provided
    if (activeMachine.specTableRows && activeMachine.specTableRows.length > 0) {
      const firstCol = activeMachine.specTableColumns?.[0] || 'Feature';
      const secondCol = activeMachine.specTableColumns?.[1] || Object.keys(activeMachine.specTableRows[0])[1];
      activeMachine.specTableRows.forEach(r => {
        const param = r[firstCol] || r['Feature'] || r['Model'] || r['Parameter'] || '';
        const detail = r[secondCol] || Object.values(r)[1] || '';
        if (param && detail) {
          rows.push({ param, detail });
        }
      });
    }

    // Default masonry parameters if standard list
    if (rows.length === 0) {
      if (activeMachine?.brickSize && activeMachine.brickSize.trim()) {
        const param = activeMachine.brickSizeLabel || 'Brick / Mold Size';
        rows.push({ param, detail: activeMachine.brickSize.trim() });
      }
      rows.push(
        { param: 'Compressive Strength', detail: '3.5 - 7.0 N/mm² (High-Tonnage Hydraulic Compaction)' },
        { param: 'Indian Standard', detail: 'IS 2185 (PART 1) : 2005 / IS 12894' },
        { param: 'Dry Density', detail: 'Approx. 1,600 - 1,850 kg/m³' },
        { param: 'Water Absorption', detail: '<10% (Conforms strictly to IS 12894)' },
        { param: 'Efflorescence', detail: 'Nil' }
      );

      if (activeMachine?.capacity && activeMachine.capacity.trim()) {
        const param = activeMachine.capacityLabel || 'Production Capacity';
        rows.push({ param, detail: activeMachine.capacity.trim() });
      }
      if (activeMachine?.power && activeMachine.power.trim()) {
        const param = activeMachine.powerLabel || 'Total Connected Power';
        rows.push({ param, detail: activeMachine.power.trim() });
      }
      rows.push(
        { param: 'Hydraulic Working Pressure', detail: '160 – 200 Bar Maximum System Pressure' },
        { param: 'Cycle Time', detail: '15 – 20 Seconds per cycle' },
        { param: 'Raw Material Compatibility', detail: 'Fly Ash, Cement / Lime & Gypsum, Quarry Dust, Sand & Aggregate' }
      );
    }

    return rows;
  }, [activeMachine]);

  // Quick Top Specs (Key : Value alignment matching screenshot)
  const quickSpecs = useMemo(() => {
    const list: { label: string; value: string }[] = [];
    if (activeMachine?.capacity && activeMachine.capacity.trim()) {
      const label = activeMachine.capacityLabel || 'Capacity';
      list.push({ label, value: activeMachine.capacity.trim() });
    }
    if (activeMachine?.power && activeMachine.power.trim()) {
      const label = activeMachine.powerLabel || 'Power';
      list.push({ label, value: activeMachine.power.trim() });
    }
    if (activeMachine?.brickSize && activeMachine.brickSize.trim()) {
      const label = activeMachine.brickSizeLabel || 'Brick / Mold Size';
      list.push({ label, value: activeMachine.brickSize.trim() });
    }
    return list;
  }, [activeMachine]);

  const machineImgUrl = (() => {
    const rawImg = currentDisplayImage || activeMachine?.image;
    if (!rawImg || rawImg.startsWith('data:')) return '';
    if (rawImg.startsWith('http://') || rawImg.startsWith('https://')) return rawImg;
    return typeof window !== 'undefined' ? `${window.location.origin}${rawImg.startsWith('/') ? '' : '/'}${rawImg}` : '';
  })();

  const currentProductUrl = typeof window !== 'undefined' ? window.location.href : '';

  const waLines = [
    `Hello Jupiter Industries, I am interested in ${activeMachine?.name || categoryData.name}.`,
    `Please share technical catalog and price quotation.`
  ];
  if (currentProductUrl) {
    waLines.push(`\nProduct Link: ${currentProductUrl}`);
  }
  if (machineImgUrl) {
    waLines.push(`Machine Image: ${machineImgUrl}`);
  }

  const whatsappMessage = encodeURIComponent(waLines.join('\n'));

  return (
    <div className="machine-detail-page-wrapper">
      {/* 1. Header Page Banner with Breadcrumb */}
      <PageBanner
        title={isSparesCategory ? 'Machine Spares & Precision Tooling' : (activeMachine?.name || categoryData.name)}
        titleAs={!isSparesCategory && activeMachine ? 'div' : 'h1'}
        breadcrumbs={[
          { 
            label: 'Products', 
            link: (searchParams.get('category') && searchParams.get('category') !== 'all-machines')
              ? `/products?category=${searchParams.get('category')}`
              : (sessionStorage.getItem('jupiter_last_product_category') && sessionStorage.getItem('jupiter_last_product_category') !== 'all-machines'
                ? `/products?category=${sessionStorage.getItem('jupiter_last_product_category')}`
                : '/products')
          },
          { label: categoryData.name }
        ]}
      />

      {/* 2. Main Product Details Section */}
      <section className="machine-details-section">
        <div className="pdp-container">
          {categoryData.subMachines.length === 0 ? (
            <div className="machine-empty-state">
              <Settings size={36} style={{ color: '#FF6B00', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#00233D', marginBottom: '8px' }}>
                No Machinery Models Listed Yet in {categoryData.name}
              </h3>
              <p style={{ color: '#64748B', maxWidth: '440px', margin: '0 auto 20px', fontSize: '0.92rem' }}>
                We engineer custom configurations according to your daily production capacity.
              </p>
              <Link to="/contact-us" className="btn btn-orange">
                <span>Request Custom Machinery Quote</span>
              </Link>
            </div>
          ) : isSparesCategory ? (
            /* MACHINE SPARES ONE-BY-ONE VIEW (NO BOTTOM TABS) */
            <div className="pdp-spares-all-list">
              {/* Spares Search & Header Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '36px',
                padding: '18px 24px',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1.5px solid #E2E8F0'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#00233D', margin: 0 }}>
                    Genuine Machine Spares & Tooling
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
                    Showing {displaySpares.length} of {categoryData.subMachines.length} precision factory components
                  </span>
                </div>

                <div style={{ position: 'relative', width: '340px', maxWidth: '100%' }}>
                  <input
                    type="text"
                    placeholder="Search spare parts (e.g. Mould, Sensor, Cylinder)..."
                    value={sparesSearch}
                    onChange={(e) => setSparesSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                </div>
              </div>

              {/* List of all spare items rendered one-by-one with identical design */}
              {displaySpares.map((spare) => (
                <SpareItemCard
                  key={spare.id}
                  spare={spare}
                  onOpenQuote={handleOpenQuote}
                  onZoom={(img) => {
                    setLightboxImage(img);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            /* STANDARD MACHINERY VIEW (WITH TABS) */
            <>

              {/* TOP SHOWCASE: 2-COLUMN GRID (Gallery on Left, Details on Right) */}
              <div className="pdp-showcase-grid">
                {/* Left Column: Product Image Gallery */}
                <div className="pdp-gallery-col">
                  {/* Main Image Card with Zoom Button */}
                  <div 
                    className="pdp-main-image-card"
                    onClick={() => {
                      setLightboxImage(currentDisplayImage);
                      setLightboxOpen(true);
                    }}
                    title="Click to view full image"
                  >
                    <button
                      type="button"
                      className="pdp-zoom-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(currentDisplayImage);
                        setLightboxOpen(true);
                      }}
                      title="Click to zoom image"
                      aria-label="Zoom image"
                    >
                      <Maximize2 size={18} />
                    </button>
                    <img
                      src={currentDisplayImage}
                      alt={activeMachine.name}
                      className="pdp-main-image" loading="lazy" onError={handleImageError}
                    />
                  </div>

                  {/* Thumbnail Strip with < and > Arrows */}
                  {galleryImages.length > 1 && (
                    <div className="pdp-thumbnails-strip">
                      <button
                        type="button"
                        className="pdp-thumb-arrow"
                        onClick={handlePrevThumb}
                        aria-label="Previous thumbnail"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {galleryImages.map((imgUrl, tIdx) => (
                        <div
                          key={tIdx}
                          className={`pdp-thumb-box ${selectedImageIdx === tIdx ? 'active' : ''}`}
                          onClick={() => setSelectedImageIdx(tIdx)}
                        >
                          <img
                            src={imgUrl}
                            alt={`Thumbnail ${tIdx + 1}`}
                            className="pdp-thumb-img" onError={handleImageError}
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        className="pdp-thumb-arrow"
                        onClick={handleNextThumb}
                        aria-label="Next thumbnail"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Column: Title, Subtitle, Description, Quick Features & CTAs */}
                <div className="pdp-info-col">
                  <h1 className="pdp-title">{activeMachine.name}</h1>

                  <div className="pdp-subtitle">
                    {activeMachine.brandTag || activeMachine.subCategoryTag || categoryData.subTitle || 'Durable Machinery for Strong, Efficient Masonry Construction'}
                  </div>

                  <p className="pdp-desc">
                    {activeMachine.description ||
                      `${categoryData.name} manufactured and supplied by Jupiter Industries in Coimbatore. Engineered with heavy-duty structural steel and advanced hydraulic compaction for residential, commercial and industrial construction projects across India.`}
                  </p>

                  {/* 4 Feature Badges in 2x2 Grid */}
                  <div className="pdp-features-grid">
                    {(activeMachine?.featureBadges && activeMachine.featureBadges.filter(Boolean).length > 0
                      ? activeMachine.featureBadges.filter(Boolean)
                      : DEFAULT_BADGES
                    ).map((badge, bIdx) => {
                      const icons = [Hexagon, Scan, Droplets, Coins];
                      const IconComp = icons[bIdx % icons.length];
                      return (
                        <div key={bIdx} className="pdp-feature-item">
                          <IconComp size={20} className="pdp-feature-icon" />
                          <span>{badge}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Key Specifications List (Key : Value) */}
                  {quickSpecs.length > 0 && (
                    <div className="pdp-quick-specs">
                      {quickSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="pdp-spec-line">
                          <span className="pdp-spec-name">{spec.label}</span>
                          <span className="pdp-spec-colon">:</span>
                          <span className="pdp-spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons Group */}
                  <div className="pdp-actions-group">
                    <div className="pdp-actions-row1">
                      <button
                        type="button"
                        onClick={() => handleOpenQuote(activeMachine.name)}
                        className="pdp-btn-quote"
                      >
                        GET A QUOTE
                      </button>

                      <a
                        href={`https://wa.me/919342919060?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="pdp-btn-whatsapp"
                      >
                        <WhatsAppIcon size={18} />
                        <span>ENQUIRE ON WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal Section Divider */}
              <div className="pdp-section-divider"></div>

              {/* BOTTOM TABBED SECTION: 3 Columns (Tabs Sidebar, Tab Content, Need Bulk Order Card) */}
              <div className="pdp-bottom-layout">
                {/* Left Column: Vertical Tabs Sidebar */}
                <nav className="pdp-tabs-nav" aria-label="Product details tabs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('highlights')}
                    className={`pdp-tab-item ${activeTab === 'highlights' ? 'active' : ''}`}
                  >
                    Product Description
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('specifications')}
                    className={`pdp-tab-item ${activeTab === 'specifications' ? 'active' : ''}`}
                  >
                    Specifications
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('features')}
                    className={`pdp-tab-item ${activeTab === 'features' ? 'active' : ''}`}
                  >
                    Features
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('advantages')}
                    className={`pdp-tab-item ${activeTab === 'advantages' ? 'active' : ''}`}
                  >
                    Applications
                  </button>
                </nav>

                {/* Center Column: Active Tab Content Panel */}
                <div className="pdp-content-panel">
                  {/* TAB 1: SPECIFICATIONS (DEFAULT ACTIVE) */}
                  {activeTab === 'specifications' && (
                    <div className="pdp-specs-table-wrap" style={{ overflowX: 'auto' }}>
                      {activeMachine?.specTableColumns && activeMachine.specTableColumns.length > 1 && activeMachine.specTableRows && activeMachine.specTableRows.length > 0 ? (
                        <table className="pdp-specs-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              {activeMachine.specTableColumns.map((col, cIdx) => (
                                <th key={cIdx} style={{ background: '#00233D', color: '#FFFFFF', padding: '12px 16px', textAlign: 'left', fontWeight: 700, fontSize: '0.88rem' }}>
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {activeMachine.specTableRows.map((row, rIdx) => (
                              <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                {activeMachine.specTableColumns!.map((col, cIdx) => (
                                  <td 
                                    key={cIdx} 
                                    className={cIdx === 0 ? "pdp-param-cell" : "pdp-detail-cell"}
                                    style={{ padding: '12px 16px', fontWeight: cIdx === 0 ? 700 : 500, color: cIdx === 0 ? '#00233D' : '#334155', fontSize: '0.88rem' }}
                                  >
                                    {row[col] || row[Object.keys(row)[cIdx]] || '-'}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <table className="pdp-specs-table">
                          <thead>
                            <tr>
                              <th>Parameter</th>
                              <th>Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {specRows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                <td className="pdp-param-cell">{row.param}</td>
                                <td className="pdp-detail-cell">{row.detail}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}

                  {/* TAB 3: PRODUCT HIGHLIGHTS */}
                  {activeTab === 'highlights' && (
                    <div className="pdp-cards-grid">
                      {(activeMachine?.highlights && activeMachine.highlights.length > 0
                        ? activeMachine.highlights
                        : DEFAULT_HIGHLIGHTS
                      ).map((hl, idx) => (
                        <div key={idx} className="pdp-feature-card">
                          <h5>{hl.title}</h5>
                          <p>{hl.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* FEATURES TAB */}
                  {activeTab === 'features' && (
                    <div className="pdp-text-panel">
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {(activeMachine?.keyFeatures && activeMachine.keyFeatures.length > 0
                          ? activeMachine.keyFeatures
                          : [
                              'Heavy-Duty Hydraulic Power Pack with foreign-brand proportional valves',
                              'Synchronized high-frequency bottom & top directional vibration systems',
                              'Automatic pallet feeding and stacked discharge mechanism',
                              'Modular interchangeable mould design for pavers, solid blocks & bricks',
                              'Low power consumption with high-efficiency IE3 electric motors'
                            ]
                        ).map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <Check size={18} style={{ color: '#FF6B00', flexShrink: 0, marginTop: '3px' }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ADVANTAGES TAB */}
                  {activeTab === 'advantages' && (
                    <div className="pdp-cards-grid">
                      {(activeMachine?.advantages && activeMachine.advantages.length > 0
                        ? activeMachine.advantages
                        : DEFAULT_ADVANTAGES
                      ).map((adv, idx) => (
                        <div key={idx} className="pdp-feature-card">
                          <h5>{adv.title}</h5>
                          <p>{adv.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CREATIVE ANCILLARY MACHINERY & EQUIPMENT SECTION (VISIBLE ONLY ON ALLOWED CATEGORIES) */}
              {isAncillaryVisibleOnThisCategory && (
                <div className="pdp-creative-ancillary-section">
                <style>{`
                  .pdp-creative-ancillary-section {
                    margin-top: 64px;
                    padding-top: 56px;
                    border-top: 1px solid #E2E8F0;
                    position: relative;
                  }

                  .pdp-ancillary-header {
                    text-align: center;
                    max-width: 820px;
                    margin: 0 auto 46px auto;
                  }

                  .pdp-ancillary-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: #FFF7ED;
                    border: 1px solid #FFEDD5;
                    border-radius: 9999px;
                    color: #C2410C;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    margin-bottom: 14px;
                    box-shadow: 0 2px 6px rgba(255, 146, 0, 0.1);
                  }

                  .pdp-ancillary-pill-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #FF9200;
                    box-shadow: 0 0 0 3px rgba(255, 146, 0, 0.25);
                  }

                  .pdp-ancillary-title {
                    color: #00233D;
                    font-size: 2.15rem;
                    font-weight: 800;
                    margin: 0 0 12px 0;
                    letter-spacing: -0.5px;
                    line-height: 1.2;
                  }

                  .pdp-ancillary-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin: 0 auto 16px auto;
                  }

                  .pdp-ancillary-divider-line {
                    width: 50px;
                    height: 3px;
                    background: #FF9200;
                    border-radius: 3px;
                  }

                  .pdp-ancillary-divider-diamond {
                    width: 8px;
                    height: 8px;
                    background: #FF9200;
                    transform: rotate(45deg);
                    border-radius: 1px;
                  }

                  .pdp-ancillary-desc {
                    color: #555555;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0;
                  }

                  /* 2-Column Responsive Grid */
                  .pdp-ancillary-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 32px;
                    align-items: start;
                  }

                  @media (max-width: 992px) {
                    .pdp-ancillary-grid {
                      grid-template-columns: 1fr;
                      gap: 28px;
                    }
                  }

                  /* Creative Card */
                  .pdp-equipment-card {
                    background: #FFFFFF;
                    border-radius: 20px;
                    border: 1px solid rgba(0, 35, 61, 0.12);
                    box-shadow: 0 10px 30px -4px rgba(0, 35, 61, 0.08), 0 2px 6px -1px rgba(0, 35, 61, 0.04);
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 32px;
                  }

                  .pdp-equipment-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 22px 42px -8px rgba(0, 35, 61, 0.16), 0 4px 14px -2px rgba(255, 146, 0, 0.2);
                    border-color: rgba(255, 146, 0, 0.45);
                  }

                  .pdp-card-accent-bar {
                    height: 4px;
                    background: linear-gradient(90deg, #FF9200 0%, #FFA826 50%, #00233D 100%);
                  }

                  .pdp-card-header {
                    padding: 18px 24px 14px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #F1F5F9;
                    flex-wrap: wrap;
                    gap: 10px;
                  }

                  .pdp-card-header-left {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                  }

                  .pdp-card-cat-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #FF9200;
                  }

                  .pdp-card-title {
                    color: #00233D;
                    font-size: 1.4rem;
                    font-weight: 800;
                    margin: 0;
                    letter-spacing: -0.3px;
                  }

                  .pdp-card-compat-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: #FFF7ED;
                    border: 1px solid #FFEDD5;
                    color: #C2410C;
                    font-size: 0.73rem;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 9999px;
                  }

                  .pdp-card-compat-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #FF9200;
                  }

                  /* Card Body Layout */
                  .pdp-card-body-split {
                    display: flex;
                    padding: 20px 24px;
                    gap: 20px;
                    align-items: stretch;
                  }

                  @media (max-width: 640px) {
                    .pdp-card-body-split {
                      flex-direction: column;
                      padding: 16px;
                    }
                  }

                  .pdp-card-img-col {
                    flex: 0 0 42%;
                    background: radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 85%);
                    border: 1px solid #E2E8F0;
                    border-radius: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 14px;
                    position: relative;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.3s ease;
                  }

                  .pdp-card-img-col:hover {
                    border-color: #FED7AA;
                    box-shadow: 0 8px 20px rgba(255, 146, 0, 0.12);
                  }

                  .pdp-card-img {
                    max-width: 100%;
                    max-height: 180px;
                    object-fit: contain;
                    filter: drop-shadow(0 10px 15px rgba(0, 35, 61, 0.1));
                    transition: transform 0.35s ease;
                  }

                  .pdp-card-img-col:hover .pdp-card-img {
                    transform: scale(1.06);
                  }

                  .pdp-img-zoom-chip {
                    position: absolute;
                    bottom: 10px;
                    background: rgba(0, 35, 61, 0.75);
                    backdrop-filter: blur(4px);
                    color: #FFFFFF;
                    font-size: 0.68rem;
                    font-weight: 700;
                    padding: 3px 9px;
                    border-radius: 20px;
                    opacity: 0;
                    transform: translateY(6px);
                    transition: all 0.25s ease;
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                  }

                  .pdp-card-img-col:hover .pdp-img-zoom-chip {
                    opacity: 1;
                    transform: translateY(0);
                  }

                  /* Specs Column & Micro-Tiles */
                  .pdp-card-specs-col {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                  }

                  .pdp-specs-col-header {
                    font-size: 0.8rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    color: #00233D;
                    margin-bottom: 12px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                  }

                  .pdp-spec-tiles-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 10px;
                    flex: 1;
                  }

                  @media (max-width: 480px) {
                    .pdp-spec-tiles-grid {
                      grid-template-columns: 1fr;
                    }
                  }

                  .pdp-spec-tile {
                    background: linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%);
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                    padding: 12px 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    transition: all 0.25s ease;
                  }

                  .pdp-spec-tile:hover {
                    background: #FFFFFF;
                    border-color: #FED7AA;
                    box-shadow: 0 4px 12px rgba(255, 146, 0, 0.1);
                    transform: translateY(-2px);
                  }

                  .pdp-tile-icon-badge {
                    width: 32px;
                    height: 32px;
                    border-radius: 9px;
                    background: linear-gradient(135deg, #FF9200 0%, #E05300 100%);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 6px;
                    box-shadow: 0 3px 8px rgba(255, 146, 0, 0.3);
                  }

                  .pdp-tile-label {
                    color: #00233D;
                    font-size: 0.68rem;
                    font-weight: 800;
                    letter-spacing: 0.4px;
                    text-transform: uppercase;
                    margin-bottom: 4px;
                  }

                  .pdp-tile-val {
                    color: #00233D;
                    font-size: 0.78rem;
                    font-weight: 700;
                    line-height: 1.35;
                  }

                  .pdp-pill-wrap {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    justify-content: center;
                    margin-top: 2px;
                  }

                  .pdp-val-chip {
                    background: #FFF7ED;
                    border: 1px solid #FFEDD5;
                    color: #C2410C;
                    font-size: 0.68rem;
                    font-weight: 700;
                    padding: 1px 6px;
                    border-radius: 4px;
                  }

                  /* Card Footer Actions */
                  .pdp-card-footer {
                    padding: 14px 24px;
                    background: #F8FAFC;
                    border-top: 1px solid #F1F5F9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                  }

                  .pdp-card-btn-quote {
                    background: #FF9200;
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.82rem;
                    letter-spacing: 0.3px;
                    padding: 8px 18px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.25s ease;
                    box-shadow: 0 3px 10px rgba(255, 146, 0, 0.35);
                  }

                  .pdp-card-btn-quote:hover {
                    background: #E05300;
                    box-shadow: 0 5px 15px rgba(255, 146, 0, 0.45);
                    transform: translateY(-1px);
                  }

                  .pdp-card-btn-wa {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: #15803D;
                    background: #F0FDF4;
                    border: 1px solid #BBF7D0;
                    padding: 7px 14px;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s ease;
                  }

                  .pdp-card-btn-wa:hover {
                    background: #DCFCE7;
                    color: #166534;
                  }

                  /* Pallet Truck Dual Showcase */
                  .pdp-pallet-dual-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    padding: 20px 24px 14px;
                  }

                  @media (max-width: 600px) {
                    .pdp-pallet-dual-grid {
                      grid-template-columns: 1fr;
                    }
                  }

                  .pdp-pallet-subcard {
                    background: radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 85%);
                    border: 1px solid #E2E8F0;
                    border-radius: 14px;
                    padding: 16px 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s ease;
                  }

                  .pdp-pallet-subcard:hover {
                    border-color: #FED7AA;
                    box-shadow: 0 6px 16px rgba(255, 146, 0, 0.12);
                  }

                  .pdp-subcard-tag {
                    background: #00233D;
                    color: #FF9200;
                    font-size: 0.68rem;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                    padding: 2px 8px;
                    border-radius: 6px;
                    margin-bottom: 8px;
                  }

                  .pdp-pallet-img {
                    max-width: 100%;
                    max-height: 130px;
                    object-fit: contain;
                    margin-bottom: 10px;
                    filter: drop-shadow(0 6px 10px rgba(0, 35, 61, 0.08));
                    transition: transform 0.35s ease;
                  }

                  .pdp-pallet-img-type1 {
                    clip-path: inset(0 0 16% 0);
                    margin-bottom: -4px;
                  }

                  .pdp-pallet-subcard:hover .pdp-pallet-img {
                    transform: scale(1.05);
                  }

                  .pdp-pallet-subcard-text {
                    font-size: 0.76rem;
                    color: #475569;
                    font-weight: 600;
                    line-height: 1.35;
                    margin: 0;
                  }

                  .pdp-pallet-type2-specs-wrap {
                    padding: 0 24px 20px;
                  }

                  .pdp-type2-specs-title {
                    color: #00233D;
                    font-size: 0.8rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                  }

                  .pdp-pallet-specs-3col {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                  }

                  @media (max-width: 540px) {
                    .pdp-pallet-specs-3col {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>

                {/* Section Header */}
                <div className="pdp-ancillary-header">
                  <div className="pdp-ancillary-pill">
                    <span className="pdp-ancillary-pill-dot"></span>
                    <Sparkles size={14} style={{ color: '#FF9200' }} />
                    <span>Factory-Integrated Ancillary Equipment</span>
                  </div>
                  <h3 className="pdp-ancillary-title">Related Machinery & Equipment</h3>
                  <div className="pdp-ancillary-divider">
                    <div className="pdp-ancillary-divider-line"></div>
                    <div className="pdp-ancillary-divider-diamond"></div>
                    <div className="pdp-ancillary-divider-line"></div>
                  </div>
                  <p className="pdp-ancillary-desc">
                    Engineered to complement your Jupiter brick & block production line with heavy-duty automated batch mixing, continuous material conveying, and ergonomic yard handling.
                  </p>
                </div>

                {/* 2-Column Responsive Dynamic Grid */}
                {(() => {
                  const activeEquipment = ancillaryEquipmentList.filter(item => {
                    if (!item.isActive) return false;
                    if (item.applicableCategories === undefined) {
                      return (currentSlug || '').toLowerCase() === 'fly-ash-brick-machine';
                    }
                    return item.applicableCategories.map(s => s.toLowerCase()).includes((currentSlug || '').toLowerCase());
                  });
                  if (activeEquipment.length === 0) return null;

                  const leftColumnItems = activeEquipment.filter((_, idx) => idx % 2 === 0);
                  const rightColumnItems = activeEquipment.filter((_, idx) => idx % 2 === 1);

                  const renderSpecIcon = (label: string) => {
                    const l = label.toLowerCase();
                    if (l.includes('capacity')) return <Maximize2 size={16} />;
                    if (l.includes('power')) return <Zap size={16} />;
                    if (l.includes('gear')) return <Settings size={16} />;
                    if (l.includes('wheel')) return <CircleDot size={16} />;
                    if (l.includes('system') || l.includes('transport') || l.includes('truck')) return <Truck size={16} />;
                    if (l.includes('storage') || l.includes('feed') || l.includes('mode')) return <RotateCw size={16} />;
                    return <Layers size={16} />;
                  };

                  const renderCategoryIcon = (badge: string) => {
                    const b = badge.toLowerCase();
                    if (b.includes('mixing')) return <Layers size={13} />;
                    if (b.includes('convey') || b.includes('feed')) return <RotateCw size={13} />;
                    if (b.includes('transport') || b.includes('handling')) return <Truck size={13} />;
                    if (b.includes('wheel') || b.includes('hauling')) return <CircleDot size={13} />;
                    return <Sparkles size={13} />;
                  };

                  const renderEquipmentCard = (eq: AncillaryEquipmentItem) => {
                    if (eq.layoutType === 'dual_variant' && eq.variants && eq.variants.length > 0) {
                      return (
                        <div key={eq.id} className="pdp-equipment-card">
                          <div className="pdp-card-accent-bar"></div>
                          <div className="pdp-card-header">
                            <div className="pdp-card-header-left">
                              <span className="pdp-card-cat-badge">
                                {renderCategoryIcon(eq.categoryBadge)}
                                <span>{eq.categoryBadge}</span>
                              </span>
                              <h4 className="pdp-card-title">{eq.name}</h4>
                            </div>
                            <div className="pdp-card-compat-badge">
                              <span className="pdp-card-compat-dot"></span>
                              <span>{eq.compatibilityBadge}</span>
                            </div>
                          </div>

                          {/* Dual Configurations Grid */}
                          <div className="pdp-pallet-dual-grid">
                            {eq.variants.map((v) => (
                              <div
                                key={v.id}
                                className="pdp-pallet-subcard"
                                onClick={() => {
                                  setLightboxImage(v.image);
                                  setLightboxOpen(true);
                                }}
                              >
                                <span className="pdp-subcard-tag">{v.name}</span>
                                <img
                                  src={v.image}
                                  alt={v.name}
                                  className={`pdp-pallet-img ${v.imageClass || ''}`}
                                  onError={handleImageError}
                                />
                                <p className="pdp-pallet-subcard-text">
                                  {v.description}
                                </p>
                                <div className="pdp-img-zoom-chip" style={{ bottom: '8px' }}>
                                  <Maximize2 size={12} />
                                  <span>Inspect</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Variant Specs */}
                          {eq.specs && eq.specs.length > 0 && (
                            <div className="pdp-pallet-type2-specs-wrap">
                              <div className="pdp-type2-specs-title">
                                <Settings size={14} />
                                <span>{eq.specsTitle || 'Technical Specifications'}</span>
                              </div>
                              <div className="pdp-pallet-specs-3col">
                                {eq.specs.map((s, sIdx) => (
                                  <div key={sIdx} className="pdp-spec-tile">
                                    <div className="pdp-tile-icon-badge">
                                      {renderSpecIcon(s.label)}
                                    </div>
                                    <span className="pdp-tile-label">{s.label}</span>
                                    <span className="pdp-tile-val" style={{ whiteSpace: 'pre-line' }}>{s.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pdp-card-footer">
                            <button
                              type="button"
                              onClick={() => handleOpenQuote(eq.name)}
                              className="pdp-card-btn-quote"
                            >
                              <span>{eq.quoteLabel || `Get ${eq.name} Quote`}</span>
                              <ArrowRight size={14} />
                            </button>
                            <a
                              href={`https://wa.me/919342919060?text=${encodeURIComponent(eq.whatsAppMessage || `Hello Jupiter, I am interested in the ${eq.name} specifications and pricing.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="pdp-card-btn-wa"
                            >
                              <WhatsAppIcon size={16} />
                              <span>Enquire on WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      );
                    }

                    // Standard Card Layout
                    return (
                      <div key={eq.id} className="pdp-equipment-card">
                        <div className="pdp-card-accent-bar"></div>
                        <div className="pdp-card-header">
                          <div className="pdp-card-header-left">
                            <span className="pdp-card-cat-badge">
                              {renderCategoryIcon(eq.categoryBadge)}
                              <span>{eq.categoryBadge}</span>
                            </span>
                            <h4 className="pdp-card-title">{eq.name}</h4>
                          </div>
                          <div className="pdp-card-compat-badge">
                            <span className="pdp-card-compat-dot"></span>
                            <span>{eq.compatibilityBadge}</span>
                          </div>
                        </div>

                        <div className="pdp-card-body-split">
                          <div
                            className="pdp-card-img-col"
                            onClick={() => {
                              setLightboxImage(eq.image);
                              setLightboxOpen(true);
                            }}
                            title={`Click to zoom ${eq.name}`}
                          >
                            <img
                              src={eq.image}
                              alt={`Jupiter ${eq.name}`}
                              className="pdp-card-img"
                              onError={handleImageError}
                            />
                            <div className="pdp-img-zoom-chip">
                              <Maximize2 size={12} />
                              <span>Inspect</span>
                            </div>
                          </div>

                          <div className="pdp-card-specs-col">
                            <div className="pdp-specs-col-header">
                              <Settings size={14} />
                              <span>Technical Specifications</span>
                            </div>

                            <div
                              className="pdp-spec-tiles-grid"
                              style={eq.specs && eq.specs.length <= 2 ? { gridTemplateColumns: '1fr' } : undefined}
                            >
                              {eq.specs.map((s, sIdx) => {
                                const isPill = s.isPillList || (s.value.includes(',') && s.value.split(',').length >= 3);
                                return (
                                  <div
                                    key={sIdx}
                                    className="pdp-spec-tile"
                                    style={eq.specs.length <= 2 ? { padding: '14px 10px' } : undefined}
                                  >
                                    <div className="pdp-tile-icon-badge">
                                      {renderSpecIcon(s.label)}
                                    </div>
                                    <span className="pdp-tile-label">{s.label}</span>
                                    {isPill ? (
                                      <div className="pdp-pill-wrap">
                                        {s.value.split(',').map((pillVal, pIdx) => (
                                          <span key={pIdx} className="pdp-val-chip">
                                            {pillVal.trim()}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <span
                                        className="pdp-tile-val"
                                        style={s.value.length > 25 ? { fontSize: '0.74rem' } : undefined}
                                      >
                                        {s.value}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="pdp-card-footer">
                          <button
                            type="button"
                            onClick={() => handleOpenQuote(eq.name)}
                            className="pdp-card-btn-quote"
                          >
                            <span>{eq.quoteLabel || `Get ${eq.name} Quote`}</span>
                            <ArrowRight size={14} />
                          </button>
                          <a
                            href={`https://wa.me/919342919060?text=${encodeURIComponent(eq.whatsAppMessage || `Hello Jupiter, I am interested in the ${eq.name} specifications and pricing.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="pdp-card-btn-wa"
                          >
                            <WhatsAppIcon size={16} />
                            <span>Enquire on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    );
                  };

                  return (
                    <div className="pdp-ancillary-grid">
                      <div>
                        {leftColumnItems.map(renderEquipmentCard)}
                      </div>
                      <div>
                        {rightColumnItems.map(renderEquipmentCard)}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </>
          )}
        </div>
      </section>



      {/* 4. Lightbox Fullscreen Image Modal */}
      {lightboxOpen && (
        <div className="pdp-lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="pdp-lightbox-box" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="pdp-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close zoom preview"
            >
              <X size={20} />
            </button>
            <img
              src={lightboxImage || currentDisplayImage}
              alt={activeMachine?.name || 'Machine High Res Preview'}
              className="pdp-lightbox-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = IMAGES.performanceMachine || IMAGES.flyAshMachine;
              }}
            />
          </div>
        </div>
      )}

      {/* 5. Interactive Quotation Request Modal */}
      {quoteModalOpen && (
        <div className="modal-backdrop-overlay" onClick={handleCloseQuote}>
          <div className="modal-content-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Request Machinery Quotation
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
                  Product / Machine: <strong>{selectedMachineName}</strong>
                </span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseQuote}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {isSubmittedSuccess ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                  border: '2px solid #10B981',
                  boxShadow: '0 0 0 6px rgba(16, 185, 129, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#059669'
                }}>
                  <CheckCircle2 size={38} strokeWidth={2.4} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#081322', marginBottom: '10px' }}>
                  Quotation Request Submitted!
                </h4>
                <p style={{ color: '#475569', fontSize: '0.94rem', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 24px' }}>
                  Thank you! Our factory technical engineers will review your request for <strong>{selectedMachineName}</strong> and contact you shortly with catalog & pricing.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleCloseQuote}
                    className="btn btn-orange"
                    style={{ padding: '11px 26px', fontWeight: 700, borderRadius: '8px' }}
                  >
                    <span>Done</span>
                  </button>
                  <a
                    href="https://wa.me/919342919060?text=Hello%20Jupiter%20Industries,%20I%20have%20submitted%20a%20quotation%20request."
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '11px 20px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    <WhatsAppIcon size={18} />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
            <form onSubmit={handleQuoteSubmit} className="modal-body-content">
              {statusMessage && (
                <div className={`form-status-alert ${statusMessage.type}`} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{statusMessage.text}</span>
                  </div>
                </div>
              )}

              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">
                  <span>Your Full Name <span className="required-star">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  className={`form-input-field ${formErrors.name ? 'has-error' : ''}`}
                  value={formData.name}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData(prev => ({ ...prev, name: val }));
                    if (val.trim()) {
                      const v = validateName(val);
                      if (!v.isValid && (val.length >= 2 || /\d/.test(val) || /[^a-zA-Z\s.'’-]/.test(val))) {
                        setFormErrors(prev => ({ ...prev, name: v.error }));
                      } else if (v.isValid) {
                        setFormErrors(prev => ({ ...prev, name: undefined }));
                      }
                    } else if (formErrors.name) {
                      setFormErrors(prev => ({ ...prev, name: 'Full name is required.' }));
                    }
                  }}
                  onBlur={() => {
                    const v = validateName(formData.name);
                    setFormErrors(prev => ({ ...prev, name: v.isValid ? undefined : v.error }));
                  }}
                />
                {formErrors.name && (
                  <div className="form-error-text">
                    <AlertCircle size={14} />
                    <span>{formErrors.name}</span>
                  </div>
                )}
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">
                    <span>Phone / WhatsApp <span className="required-star">*</span></span>
                  </label>
                  <PhoneInputWithCountry
                    dialCode={formData.countryCode}
                    phoneNumber={formData.phone}
                    onDialCodeChange={(code) => {
                      setFormData(prev => ({ ...prev, countryCode: code }));
                      if (formData.phone) {
                        const v = validatePhone(code, formData.phone);
                        setFormErrors(prev => ({ ...prev, phone: v.isValid ? undefined : v.error }));
                      }
                    }}
                    onPhoneNumberChange={(num) => {
                      setFormData(prev => ({ ...prev, phone: num }));
                      if (formErrors.phone) {
                        const v = validatePhone(formData.countryCode, num);
                        setFormErrors(prev => ({ ...prev, phone: v.isValid ? undefined : v.error }));
                      }
                    }}
                    hasError={Boolean(formErrors.phone)}
                    required
                  />
                  {formErrors.phone && (
                    <div className="form-error-text">
                      <AlertCircle size={14} />
                      <span>{formErrors.phone}</span>
                    </div>
                  )}
                </div>

                <div className="form-group-item">
                  <label className="form-field-label">
                    <span>Email Address <span className="required-star">*</span></span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className={`form-input-field ${formErrors.email ? 'has-error' : ''}`}
                    value={formData.email}
                    onChange={e => {
                      const val = e.target.value;
                      setFormData(prev => ({ ...prev, email: val }));
                      if (formErrors.email) {
                        const v = validateEmail(val, true);
                        setFormErrors(prev => ({ ...prev, email: v.isValid ? undefined : v.error }));
                      }
                    }}
                    onBlur={() => {
                      const v = validateEmail(formData.email, true);
                      if (!v.isValid && v.error) {
                        setFormErrors(prev => ({ ...prev, email: v.error }));
                      }
                    }}
                  />
                  {formErrors.email && (
                    <div className="form-error-text">
                      <AlertCircle size={14} />
                      <span>{formErrors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group-item" style={{ marginBottom: '20px' }}>
                <label className="form-field-label">Daily Output Capacity / Location Note</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Need quotation for plant installation in Coimbatore with 15,000 bricks/day requirement..."
                  className="form-textarea-field"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-orange"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin-animate" />
                    <span>Submitting Quotation Request...</span>
                  </>
                ) : (
                  <>
                    <FileText size={18} />
                    <span>Submit Machinery Quote Request</span>
                  </>
                )}
              </button>
            </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineCategoryPage;

import React, { useState, useEffect, useMemo } from 'react';
import { useSeoMeta } from '../utils/useSeoMeta';
import { useParams, useSearchParams, useLocation, Link } from 'react-router-dom';
import {
  ArrowRight,
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
  Search
} from 'lucide-react';
import { getCategoryBySlug, SubMachineItem, fetchProducts } from '../data/machineProducts';
import { submitEnquiry } from '../services/api';
import { PageBanner } from '../components/PageBanner';
import { WhatsAppIcon } from '../components/WhatsAppButton';
import { IMAGES } from '../assets/images/images';
import { PhoneInputWithCountry } from '../components/PhoneInputWithCountry';
import { validateName, validatePhone, validateEmail } from '../utils/validation';

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
    if (spare.image) list.push(spare.image);
    if (spare.galleryImages && spare.galleryImages.length > 0) {
      spare.galleryImages.forEach(img => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    return list.filter(Boolean);
  }, [spare]);

  const currentImg = images[selectedThumbIdx] || images[0] || IMAGES.performanceMachine;

  const badges = spare.featureBadges && spare.featureBadges.length >= 4
    ? spare.featureBadges
    : ['Durable Construction', 'Consistent Dimensions', 'Lower Water Absorption', 'Cost-Effective Solution'];

  const quickSpecs = [
    { label: 'Capacity', value: spare.capacity || '2 Bricks / Cycle' },
    { label: 'Power', value: spare.power || 'Mechanical / Hydraulic Fit' },
    { label: 'Brick Size', value: spare.brickSize || '230 x 110 x 75 mm' },
  ];

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
        <div className="pdp-main-image-card">
          <button
            type="button"
            className="pdp-zoom-btn"
            onClick={() => onZoom(currentImg)}
            title="Click to zoom image"
            aria-label="Zoom image"
          >
            <Maximize2 size={18} />
          </button>
          <img
            src={currentImg}
            alt={spare.name}
            className="pdp-main-image"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = IMAGES.performanceMachine || IMAGES.flyAshMachine;
            }}
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
                  className="pdp-thumb-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = IMAGES.performanceMachine || IMAGES.flyAshMachine;
                  }}
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

      {/* Right Column: Title, Subtitle, Description, Quick Features & CTAs */}
      <div className="pdp-info-col">
        <h2 className="pdp-title">{spare.name}</h2>

        <div className="pdp-subtitle">
          {spare.subCategoryTag || 'Original Factory Spare Parts & Precision Moulds'}
        </div>

        <p className="pdp-desc">
          {spare.description || `${spare.name} precision manufactured by Jupiter Industries for maximum service life and heavy-duty reliability.`}
        </p>

        {/* 4 Feature Badges in 2x2 Grid */}
        <div className="pdp-features-grid">
          <div className="pdp-feature-item">
            <Hexagon size={20} className="pdp-feature-icon" />
            <span>{badges[0] || 'Durable Construction'}</span>
          </div>
          <div className="pdp-feature-item">
            <Scan size={20} className="pdp-feature-icon" />
            <span>{badges[1] || 'Consistent Dimensions'}</span>
          </div>
          <div className="pdp-feature-item">
            <Droplets size={20} className="pdp-feature-icon" />
            <span>{badges[2] || 'Lower Water Absorption'}</span>
          </div>
          <div className="pdp-feature-item">
            <Coins size={20} className="pdp-feature-icon" />
            <span>{badges[3] || 'Cost-Effective Solution'}</span>
          </div>
        </div>

        {/* Quick Key Specifications List (Key : Value) */}
        <div className="pdp-quick-specs">
          {quickSpecs.map((spec, sIdx) => (
            <div key={sIdx} className="pdp-spec-line">
              <span className="pdp-spec-name">{spec.label}</span>
              <span className="pdp-spec-colon">:</span>
              <span className="pdp-spec-value">{spec.value}</span>
            </div>
          ))}
        </div>

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
  const [searchParams, setSearchParams] = useSearchParams();
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

  const isSparesCategory = currentSlug === 'machine-spares' || (categoryData && categoryData.slug === 'machine-spares');

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
    ogUrl: `https://jupitergroups.in/${currentSlug}`,
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
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: '#00233D' }}>Product / Machine Category Not Found</h2>
        <p style={{ color: '#64748B', marginBottom: '24px' }}>
          The requested machinery page could not be located. Please choose from our available machines below.
        </p>
        <Link to="/products" className="btn btn-orange">
          <span>View All Machinery</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  // Active Machine Model
  const activeMachine: SubMachineItem | undefined = categoryData.subMachines[selectedModelIdx] || categoryData.subMachines[0];

  // Prepare images gallery - only show additional thumbnails if user actually added them
  const galleryImages: string[] = useMemo(() => {
    const list: string[] = [];
    if (activeMachine?.image) {
      list.push(activeMachine.image);
    }
    if (activeMachine?.galleryImages && activeMachine.galleryImages.length > 0) {
      activeMachine.galleryImages.forEach(img => {
        if (img && img.trim().length > 0 && !list.includes(img)) list.push(img);
      });
    }
    return list.filter(Boolean);
  }, [activeMachine]);

  const currentDisplayImage = galleryImages[selectedImageIdx] || galleryImages[0] || IMAGES.performanceMachine;

  // Switch Model Handler
  const handleModelSelect = (idx: number) => {
    setSelectedModelIdx(idx);
    setSelectedImageIdx(0);
    const selected = categoryData.subMachines[idx];
    if (selected) {
      setSearchParams({ model: selected.id }, { replace: true });
    }
  };

  // Thumbnail Navigation Handlers
  const handlePrevThumb = () => {
    setSelectedImageIdx(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNextThumb = () => {
    setSelectedImageIdx(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  // Quote Modal Handlers
  const handleOpenQuote = (machineName?: string) => {
    setSelectedMachineName(machineName || activeMachine?.name || categoryData.name);
    setQuoteModalOpen(true);
  };

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

      setStatusMessage({
        type: 'success',
        text: 'Quotation request submitted! Our factory engineer will contact you shortly with catalog & pricing.'
      });
      setTimeout(() => {
        setQuoteModalOpen(false);
        setStatusMessage(null);
        setFormData({ name: '', countryCode: '+91', phone: '', email: '', message: '' });
        setFormErrors({});
      }, 2000);
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
      rows.push(
        { param: 'Size (L x B x H)', detail: '230 mm x 230 mm x 70 mm (or 75 mm / Custom Mold Sizes)' },
        { param: 'Compressive Strength', detail: '3.5 - 7.0 N/mm² (High-Tonnage Hydraulic Compaction)' },
        { param: 'Indian Standard', detail: 'IS 2185 (PART 1) : 2005 / IS 12894' },
        { param: 'Dry Density', detail: 'Approx. 1,600 - 1,850 kg/m³' },
        { param: 'Water Absorption', detail: '<10% (Conforms strictly to IS 12894)' },
        { param: 'Efflorescence', detail: 'Nil' }
      );

      if (activeMachine.capacity) {
        rows.push({ param: 'Production Capacity', detail: activeMachine.capacity });
      }
      if (activeMachine.power) {
        rows.push({ param: 'Total Connected Power', detail: activeMachine.power });
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
    return [
      {
        label: 'Capacity',
        value: activeMachine?.capacity || '8,000 – 12,000 Bricks/hr'
      },
      {
        label: 'Power',
        value: activeMachine?.power || '15 H.P Electric Motor'
      },
      {
        label: 'Brick Size',
        value: activeMachine?.brickSize || activeMachine?.specs.find(s => s.label.toLowerCase().includes('size') || s.label.toLowerCase().includes('brick'))?.value || '230 x 110 x 75 to 230 x 200 x 100'
      }
    ];
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
        breadcrumbs={[
          { label: 'Products', link: '/products' },
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
              <Link to="/contact" className="btn btn-orange">
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
              {/* Optional Multi-Model Selector Bar (if category has multiple models) */}
              {categoryData.subMachines.length > 1 && (
                <div className="pdp-model-switcher">
                  <span className="pdp-model-label">Select Model:</span>
                  {categoryData.subMachines.map((subM, idx) => (
                    <button
                      key={subM.id}
                      type="button"
                      onClick={() => handleModelSelect(idx)}
                      className={`pdp-model-pill ${selectedModelIdx === idx ? 'active' : ''}`}
                    >
                      {subM.name}
                    </button>
                  ))}
                </div>
              )}

              {/* TOP SHOWCASE: 2-COLUMN GRID (Gallery on Left, Details on Right) */}
              <div className="pdp-showcase-grid">
                {/* Left Column: Product Image Gallery */}
                <div className="pdp-gallery-col">
                  {/* Main Image Card with Zoom Button */}
                  <div className="pdp-main-image-card">
                    <button
                      type="button"
                      className="pdp-zoom-btn"
                      onClick={() => {
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
                      className="pdp-main-image"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = IMAGES.performanceMachine || IMAGES.flyAshMachine;
                      }}
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
                            className="pdp-thumb-img"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = IMAGES.performanceMachine || IMAGES.flyAshMachine;
                            }}
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
                  <div className="pdp-quick-specs">
                    {quickSpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="pdp-spec-line">
                        <span className="pdp-spec-name">{spec.label}</span>
                        <span className="pdp-spec-colon">:</span>
                        <span className="pdp-spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>

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
                    Product Highlights
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
                    Advantages
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
        <div className="modal-backdrop-overlay" onClick={() => setQuoteModalOpen(false)}>
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
                onClick={() => setQuoteModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

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
                    if (formErrors.name) {
                      const v = validateName(val);
                      setFormErrors(prev => ({ ...prev, name: v.isValid ? undefined : v.error }));
                    }
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineCategoryPage;

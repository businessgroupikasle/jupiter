import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Package,
  Building2,
  Image as ImageIcon,
  PlayCircle,
  HelpCircle,
  MapPin,
  Settings,
  Search,
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Users,
  HardHat,
  Eye,
  Plus,
  X,
  ExternalLink,
  CheckCircle,
  Phone,
  Mail,
  Trash2,
  Edit,
  Save,
  Download,
  Check,
  BookOpen,
  Upload,
  LogOut,
  Truck,
  UserPlus,
  ShieldCheck,
  AlertCircle,
  Camera,
  Wrench
} from 'lucide-react';
import { IMAGES } from '../assets/images/images';
import '../styles/admin.css';
import {
  getCurrentUser,
  logoutAdmin,
  AdminUser,
  getStoredUsers,
  saveUsers,
  getStoredRoles,
  addStoredRole,
  updateCurrentAdminProfile
} from '../services/authService';
import {
  getStoredMaintenanceConfig,
  saveMaintenanceConfig,
  MaintenanceConfig
} from '../services/maintenanceService';
import { AdminAuthScreen } from '../components/AdminAuthScreen';
import { MaintenancePage } from '../components/MaintenancePage';
import {
  VideoItem,
  getYouTubeId,
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
  getStoredVideos,
  saveStoredVideos,
  addVideo,
  deleteVideo,
  fetchVideosFromDb
} from '../services/videoService';
import {
  GalleryPhotoItem,
  getStoredGalleryPhotos,
  clearAllGalleryPhotos,
  addGalleryPhoto,
  deleteGalleryPhoto,
  fetchGalleryPhotosFromDb
} from '../services/galleryService';
import {
  ProductItem,
  getStoredProducts,
  fetchProducts,
  clearAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  CATEGORY_NAME_TO_SLUG_MAP,
  getCategoryMetas,
  updateCategoryMeta
} from '../services/productService';
import { seedBackendDatabase, checkBackendStatus } from '../services/seedService';
import { DEFAULT_HIGHLIGHTS, DEFAULT_ADVANTAGES, DEFAULT_BADGES } from './MachineCategoryPage';
import {
  ProjectItem,
  getStoredProjects,
  clearAllProjects,
  addProject,
  deleteProject,
  fetchProjectsFromDb
} from '../services/projectService';
import {
  BlogItem as AdminBlogItem,
  getStoredBlogs,
  clearAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  fetchBlogsFromDb
} from '../services/blogService';
import {
  getStoredEnquiries,
  deleteStoredEnquiry,
  updateStoredEnquiryStatus,
  markStoredEnquiryAsRead,
  markAllStoredEnquiriesAsRead,
  fetchEnquiriesFromDb
} from '../services/enquiryService';

// Helper to reliably extract an image string regardless of Vite/ES module wrapping
export const resolveImg = (img: any): string => {
  if (typeof img === 'string') return img;
  if (img && typeof img.default === 'string') return img.default;
  if (img && typeof img.src === 'string') return img.src;
  return '';
};

// Reusable Image Upload Field with Drag & Drop and Preview
const ImageUploadField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
}> = ({ label, value, onChange, helperText }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const safeValue = resolveImg(value);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawData = e.target?.result as string;
      if (!rawData) return;

      // Automatically compress and resize to prevent localStorage quota overflow
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 900;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.82);
          onChange(compressed);
        } else {
          onChange(rawData);
        }
      };
      img.onerror = () => {
        onChange(rawData);
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="admin-image-upload-wrapper">
      <label className="form-field-label" style={{ display: 'block', marginBottom: '6px' }}>{label}</label>

      {safeValue ? (
        <div className="admin-upload-preview-box">
          <img src={safeValue} alt="Preview" className="admin-upload-preview-img" />
          <div className="admin-upload-preview-overlay">
            <button
              type="button"
              className="admin-preview-btn admin-preview-btn-change"
              onClick={() => inputRef.current?.click()}
            >
              <Upload size={14} />
              <span>Change Image</span>
            </button>
            <button
              type="button"
              className="admin-preview-btn admin-preview-btn-remove"
              onClick={() => onChange('')}
            >
              <Trash2 size={14} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`admin-upload-dropzone ${dragActive ? 'drag-active' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="admin-upload-icon-circle">
            <Upload size={20} />
          </div>
          <div className="admin-upload-text-main">
            <span>Click to upload</span> or drag and drop photo
          </div>
          <div className="admin-upload-subtext">
            {helperText || 'PNG, JPG, JPEG, WEBP (Max 10MB)'}
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};


// Types for Admin Dashboard
export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed' | 'In Progress';
  message?: string;
  location?: string;
  isRead?: boolean;
}

export interface ProductSpecTableRow {
  [colName: string]: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface MachineDeliveryLocationItem {
  id: string;
  clientName: string;
  locationCity: string;
  state: string;
  machineModel: string;
  deliveryDate: string;
  status: 'Delivered & Operational' | 'In Transit' | 'Installation Ongoing';
  transportVehicle?: string;
  contactPhone: string;
  notes?: string;
}

// Backwards compatibility alias
export type ServiceLocationItem = MachineDeliveryLocationItem;

export const AdminDashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => getCurrentUser());
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Profile & Avatar Settings State
  const [profileNameInput, setProfileNameInput] = useState(() => currentUser?.name || 'Jupiter Admin');
  const [profileEmailInput, setProfileEmailInput] = useState(() => currentUser?.email || 'admin@jupiter.com');
  const [profileAvatarInput, setProfileAvatarInput] = useState(() => currentUser?.avatar || '');
  const [profileAvatarPreview, setProfileAvatarPreview] = useState(() => currentUser?.avatar || '');

interface CompanySettings {
  legalName: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
}

interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
}

  // Company & SEO Settings State with LocalStorage Persistence
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    try {
      const saved = localStorage.getItem('jupiter_company_settings');
      if (saved) return JSON.parse(saved) as CompanySettings;
    } catch (e) { }
    return {
      legalName: 'Jupiter Industries',
      phone: '+91 98765 43210',
      email: 'info@jupiterindustries.com',
      whatsapp: '+91 98765 43210',
      address: 'SF No. 142/2, Industrial Estate, Pollachi Main Road, Coimbatore - 641021, Tamil Nadu, India.'
    };
  });

  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    try {
      const saved = localStorage.getItem('jupiter_seo_settings');
      if (saved) return JSON.parse(saved) as SeoSettings;
    } catch (e) { }
    return {
      metaTitle: 'Jupiter Industries | Concrete & Fly Ash Brick Machinery Manufacturer India',
      metaDescription: 'Jupiter Industries manufactures heavy-duty hydraulic fly ash brick machines, concrete block machines, and paver block plants with Pan-India installation.'
    };
  });

  // Maintenance Mode Settings State
  const [maintenanceConfig, setMaintenanceConfig] = useState<MaintenanceConfig>(() => getStoredMaintenanceConfig());
  const [isMaintenancePreviewModalOpen, setIsMaintenancePreviewModalOpen] = useState(false);

  // Sync with global maintenance updates
  useEffect(() => {
    const handleMaintenanceEvent = () => {
      setMaintenanceConfig(getStoredMaintenanceConfig());
    };
    window.addEventListener('jupiter_maintenance_updated', handleMaintenanceEvent);
    return () => window.removeEventListener('jupiter_maintenance_updated', handleMaintenanceEvent);
  }, []);

  // Keep state in sync whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileNameInput(currentUser.name);
      setProfileEmailInput(currentUser.email);
      setProfileAvatarInput(currentUser.avatar || '');
      setProfileAvatarPreview(currentUser.avatar || '');
    }
  }, [currentUser]);

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
  };

  const tabParam = searchParams.get('tab');
  const validTabs = ['dashboard', 'enquiries', 'products', 'projects', 'gallery', 'videos', 'faqs', 'locations', 'blogs', 'users', 'settings'] as const;

  const activeTab: 'dashboard' | 'enquiries' | 'products' | 'projects' | 'gallery' | 'videos' | 'faqs' | 'locations' | 'blogs' | 'users' | 'settings' = (() => {
    if (tabParam && (validTabs as readonly string[]).includes(tabParam)) {
      return tabParam as any;
    }
    if (location.pathname.includes('/products')) return 'products';
    if (location.pathname.includes('/enquiries')) return 'enquiries';
    if (location.pathname.includes('/projects')) return 'projects';
    return 'dashboard';
  })();

  const switchTab = (tabId: string) => {
    setSearchQuery('');
    setSearchParams({ tab: tabId });
  };
  const currentMonthRange = (() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startStr = start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const endStr = end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  })();
  const [dateRange, setDateRange] = useState(currentMonthRange);
  const [searchQuery, setSearchQuery] = useState('');
  const [enquiryFilter, setEnquiryFilter] = useState<'All' | 'New' | 'Contacted' | 'Closed'>('All');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
  });
  const [customEndDate, setCustomEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Selection States
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [selectedProductForSpec, setSelectedProductForSpec] = useState<ProductItem | null>(null);
  const [selectedVideoForPlay, setSelectedVideoForPlay] = useState<VideoItem | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddGalleryOpen, setIsAddGalleryOpen] = useState(false);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [isAddFAQOpen, setIsAddFAQOpen] = useState(false);
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState<string>('All');
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);

  // Custom Confirmation Dialog State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    itemName?: string;
    itemLabel?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning';
    icon?: 'trash' | 'alert';
    onConfirm: () => Promise<void> | void;
  } | null>(null);
  const [isConfirmingAction, setIsConfirmingAction] = useState(false);

  const requestConfirm = (options: {
    title?: string;
    message?: string;
    itemName?: string;
    itemLabel?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning';
    icon?: 'trash' | 'alert';
    onConfirm: () => Promise<void> | void;
  }) => {
    setConfirmModal({
      isOpen: true,
      title: options.title || 'Are you sure?',
      message: options.message || 'This action cannot be undone.',
      itemName: options.itemName,
      itemLabel: options.itemLabel,
      confirmText: options.confirmText || 'Yes, Delete',
      cancelText: options.cancelText || 'Cancel',
      variant: options.variant || 'danger',
      icon: options.icon || 'trash',
      onConfirm: options.onConfirm
    });
  };

  const handleExecuteConfirm = async () => {
    if (!confirmModal || isConfirmingAction) return;
    try {
      setIsConfirmingAction(true);
      await confirmModal.onConfirm();
    } catch (err) {
      console.error('Error executing confirmation action:', err);
    } finally {
      setIsConfirmingAction(false);
      setConfirmModal(null);
    }
  };

  const [adminProductCategory, setAdminProductCategory] = useState<string>('All');
  const adminProductCategories = [
    'All',
    'Fly Ash Brick Machine',
    'Hollow and Solid Block Machine',
    'Inter Block Making Machine',
    'Paver Block Machine',
    'Batching Plant',
    'Storage Silo',
    'Machine Spares'
  ];

  // Product Modals Sub-Tab States
  const [editProductTab, setEditProductTab] = useState<'overview' | 'highlights' | 'specifications' | 'features' | 'advantages'>('overview');
  const [addProductTab, setAddProductTab] = useState<'overview' | 'highlights' | 'specifications' | 'features' | 'advantages'>('overview');
  const [viewProductTab, setViewProductTab] = useState<'overview' | 'highlights' | 'specifications' | 'features' | 'advantages'>('overview');

  // Backend Seeding State
  const [isSeedingBackend, setIsSeedingBackend] = useState(false);
  const [seedProgress, setSeedProgress] = useState<{ current: number; total: number; item: string } | null>(null);
  const [backendHealth, setBackendHealth] = useState<{ isOnline: boolean; productCount: number; error?: string } | null>(null);

  // Check backend health periodically
  useEffect(() => {
    checkBackendStatus().then(status => setBackendHealth(status)).catch(() => {});
  }, []);

  const handleSeedBackend = async () => {
    setIsSeedingBackend(true);
    setSeedProgress({ current: 0, total: 23, item: 'Connecting to backend...' });
    try {
      const result = await seedBackendDatabase((curr, tot, item) => {
        setSeedProgress({ current: curr, total: tot, item });
      });
      if (result.success) {
        triggerToast(`🌱 ${result.message}`);
        setProducts(getStoredProducts());
        const updatedHealth = await checkBackendStatus();
        setBackendHealth(updatedHealth);
      } else {
        triggerToast(`⚠ ${result.message}`);
      }
    } catch (err: any) {
      triggerToast(`Error seeding backend: ${err.message}`);
    } finally {
      setIsSeedingBackend(false);
      setSeedProgress(null);
    }
  };

  // New Product Form State with Full Technical Specifications & Content Builder
  const [newProduct, setNewProduct] = useState<{
    name: string;
    brandTag: string;
    category: string;
    capacity: string;
    power: string;
    brickSize: string;
    image: string;
    galleryImages: string[];
    description: string;
    featureBadges: string[];
    highlights: Array<{ title: string; description: string }>;
    advantages: Array<{ title: string; description: string }>;
    keyFeatures: string[];
    specColumns: string[];
    specRows: Array<Record<string, string>>;
  }>({
    name: '',
    brandTag: '',
    category: 'Fly Ash Brick Machine',
    capacity: '',
    power: '',
    brickSize: '',
    image: '',
    galleryImages: [],
    description: '',
    featureBadges: [...DEFAULT_BADGES],
    highlights: [...DEFAULT_HIGHLIGHTS],
    advantages: [...DEFAULT_ADVANTAGES],
    keyFeatures: [
      'Heavy-Duty Fabricated Chassis',
      'High Compaction Density',
      'Low Power Consumption'
    ],
    specColumns: ['Parameter', 'Details'],
    specRows: [
      { 'Parameter': 'Capacity', 'Details': '' },
      { 'Parameter': 'Power', 'Details': '' },
      { 'Parameter': 'Brick Size', 'Details': '' }
    ],
  });

  // Editing Product Modal State
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Safe handler to open Add Product modal with clean defaults
  const handleOpenAddProduct = (category?: string) => {
    try {
      setAddProductTab('overview');
      const targetCat = category || (adminProductCategory !== 'All' ? adminProductCategory : 'Fly Ash Brick Machine');
      setNewProduct({
        name: '',
        brandTag: '',
        category: targetCat,
        capacity: '',
        power: '',
        brickSize: '',
        image: '',
        galleryImages: [],
        description: '',
        featureBadges: [...DEFAULT_BADGES],
        highlights: [...DEFAULT_HIGHLIGHTS],
        advantages: [...DEFAULT_ADVANTAGES],
        keyFeatures: [
          'Heavy-Duty Fabricated Chassis',
          'High Compaction Density',
          'Low Power Consumption'
        ],
        specColumns: ['Parameter', 'Details'],
        specRows: [
          { 'Parameter': 'Capacity', 'Details': '' },
          { 'Parameter': 'Power', 'Details': '' },
          { 'Parameter': 'Brick Size', 'Details': '' }
        ],
      });
      setIsAddProductOpen(true);
    } catch (err) {
      console.error('Error opening add product modal:', err);
      setIsAddProductOpen(true);
    }
  };

  // Safe handler to open Edit Product modal
  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditProductTab('overview');
    setEditingProduct({
      ...prod,
      brickSize: prod.brickSize || '',
      featureBadges: prod.featureBadges && prod.featureBadges.length > 0 ? [...prod.featureBadges] : [...DEFAULT_BADGES],
      galleryImages: prod.galleryImages ? [...prod.galleryImages] : [],
      highlights: prod.highlights && prod.highlights.length > 0 ? [...prod.highlights] : [...DEFAULT_HIGHLIGHTS],
      advantages: prod.advantages && prod.advantages.length > 0 ? [...prod.advantages] : [...DEFAULT_ADVANTAGES],
      keyFeatures: prod.keyFeatures && prod.keyFeatures.length > 0 ? [...prod.keyFeatures] : [
        'Heavy-Duty Hydraulic Power Pack with foreign-brand proportional valves',
        'Synchronized high-frequency bottom & top directional vibration systems',
        'Automatic pallet feeding and stacked discharge mechanism',
        'Modular interchangeable mould design for pavers, solid blocks & bricks',
        'Low power consumption with high-efficiency IE3 electric motors'
      ],
      specTableColumns: prod.specTableColumns && prod.specTableColumns.length > 0 ? [...prod.specTableColumns] : ['Parameter', 'Details'],
      specTableRows: prod.specTableRows && prod.specTableRows.length > 0 ? [...prod.specTableRows] : [
        { 'Parameter': 'Capacity', 'Details': prod.capacity || '' },
        { 'Parameter': 'Power', 'Details': prod.power || '' }
      ]
    });
  };

  // Live product URL helper
  const getProductLiveUrl = (prod: ProductItem) => {
    const slug = prod.categorySlug || CATEGORY_NAME_TO_SLUG_MAP[prod.category] || 'fly-ash-brick-machine';
    return `/machines/${slug}?model=${encodeURIComponent(prod.id)}`;
  };

  const [newProject, setNewProject] = useState({
    title: '',
    client: '',
    location: '',
    machine: '',
    year: '2024',
    status: 'Completed',
    image: ''
  });

  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Block Machines',
    location: 'Coimbatore, Tamil Nadu',
    machine: 'Jupiter Automatic Plant',
    output: '20,000 blocks / day',
    description: '',
    image: ''
  });
  const [newVideo, setNewVideo] = useState({
    title: '',
    duration: '3:30',
    image: '',
    videoUrl: '',
    category: 'Block Machines' as VideoItem['category']
  });
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', category: 'General' });
  const [newLocation, setNewLocation] = useState<{
    clientName: string;
    locationCity: string;
    state: string;
    machineModel: string;
    deliveryDate: string;
    status: MachineDeliveryLocationItem['status'];
    transportVehicle: string;
    contactPhone: string;
    notes: string;
  }>({
    clientName: '',
    locationCity: '',
    state: '',
    machineModel: 'Fully Automatic 6-Cavity Fly Ash Brick Machine',
    deliveryDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'Delivered & Operational',
    transportVehicle: '12-Wheeler Hydraulic Trailer',
    contactPhone: '+91 ',
    notes: ''
  });

  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>({
    name: '',
    email: '',
    password: '',
    role: 'Admin'
  });

  const [systemRoles, setSystemRoles] = useState<string[]>(() => {
    try { return getStoredRoles(); } catch { return ['Admin', 'Super Admin', 'Editor']; }
  });
  const [isAddingCustomRole, setIsAddingCustomRole] = useState(false);
  const [customRoleInput, setCustomRoleInput] = useState('');

  const handleSaveCustomRole = () => {
    const trimmed = customRoleInput.trim();
    if (!trimmed) return;
    const updated = addStoredRole(trimmed);
    setSystemRoles(updated);
    setNewUser(prev => ({ ...prev, role: trimmed }));
    setCustomRoleInput('');
    setIsAddingCustomRole(false);
    triggerToast(`System Role "${trimmed}" added!`);
  };


  const [newBlog, setNewBlog] = useState({ title: '', category: 'Brick Making', readTime: '5 min read', excerpt: '', image: '' });

  // Enquiries Persistent State
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(() => {
    try { return getStoredEnquiries() || []; } catch { return []; }
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    try { return getStoredProducts() || []; } catch { return []; }
  });
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try { return getStoredProjects() || []; } catch { return []; }
  });
  const [gallery, setGallery] = useState<GalleryPhotoItem[]>(() => {
    try { return getStoredGalleryPhotos() || []; } catch { return []; }
  });
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try { return getStoredVideos() || []; } catch { return []; }
  });
  const [blogs, setBlogs] = useState<AdminBlogItem[]>(() => {
    try { return getStoredBlogs() || []; } catch { return []; }
  });

  // Real-time synchronization across all tabs and services
  React.useEffect(() => {
    fetchProducts().then(res => {
      if (res && res.length > 0) setProducts(res);
    }).catch(() => { });

    fetchEnquiriesFromDb().then(res => {
      if (res) setEnquiries(res);
    }).catch(() => { });

    fetchProjectsFromDb().then(res => {
      if (res && res.length > 0) setProjects(res);
    }).catch(() => { });

    fetchGalleryPhotosFromDb().then(res => {
      if (res && res.length > 0) setGallery(res);
    }).catch(() => { });

    fetchVideosFromDb().then(res => {
      if (res && res.length > 0) setVideos(res);
    }).catch(() => { });

    fetchBlogsFromDb().then(res => {
      if (res && res.length > 0) setBlogs(res);
    }).catch(() => { });

    const syncAll = () => {
      try {
        setEnquiries(getStoredEnquiries() || []);
        setProducts(getStoredProducts() || []);
        setProjects(getStoredProjects() || []);
        setGallery(getStoredGalleryPhotos() || []);
        setVideos(getStoredVideos() || []);
        setBlogs(getStoredBlogs() || []);
      } catch (err) {
        console.error('Error in syncAll:', err);
      }
    };

    window.addEventListener('jupiter_enquiries_updated', syncAll);
    window.addEventListener('jupiter_products_updated', syncAll);
    window.addEventListener('jupiter_projects_updated', syncAll);
    window.addEventListener('jupiter_gallery_updated', syncAll);
    window.addEventListener('jupiter_videos_updated', syncAll);
    window.addEventListener('jupiter_blogs_updated', syncAll);
    window.addEventListener('storage', syncAll);

    return () => {
      window.removeEventListener('jupiter_enquiries_updated', syncAll);
      window.removeEventListener('jupiter_products_updated', syncAll);
      window.removeEventListener('jupiter_projects_updated', syncAll);
      window.removeEventListener('jupiter_gallery_updated', syncAll);
      window.removeEventListener('jupiter_videos_updated', syncAll);
      window.removeEventListener('jupiter_blogs_updated', syncAll);
      window.removeEventListener('storage', syncAll);
    };
  }, []);

  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 'FAQ-01',
      question: 'What is the daily power consumption of the automatic brick plant?',
      answer: 'Power consumption depends on the model capacity. Standard plants operate between 18 HP to 35 HP total connected load with energy-efficient hydraulic drives.',
      category: 'Technical Specifications'
    },
    {
      id: 'FAQ-02',
      question: 'Do you provide on-site foundation layout and operator training?',
      answer: 'Yes, our factory technicians handle complete turnkey foundation design, mechanical/electrical installation, and 7-day on-site operator training.',
      category: 'Installation & Support'
    },
    {
      id: 'FAQ-03',
      question: 'What is the warranty period on hydraulic cylinders and PLC units?',
      answer: 'We provide an industry-leading 24-month comprehensive warranty on hydraulic cylinders and electrical PLC panels with guaranteed Pan-India spares dispatch.',
      category: 'Warranty & Spares'
    }
  ]);

  const DEFAULT_DELIVERY_LOCATIONS: MachineDeliveryLocationItem[] = [
    {
      id: 'DEL-01',
      clientName: 'Priya Fly Ash Bricks & Blocks',
      locationCity: 'Salem Industrial Estate',
      state: 'Tamil Nadu',
      machineModel: 'Fully Automatic 6-Cavity Fly Ash Brick Machine',
      deliveryDate: '12 Mar 2026',
      status: 'Delivered & Operational',
      transportVehicle: '12-Wheeler Hydraulic Trailer (Direct Coimbatore Dispatch)',
      contactPhone: '+91 98765 43210',
      notes: 'Installed and fully commissioned. 14,000 bricks/shift output verified.'
    },
    {
      id: 'DEL-02',
      clientName: 'Sri Murugan Paver Works',
      locationCity: 'Madurai Ring Road',
      state: 'Tamil Nadu',
      machineModel: 'Hydraulic Interlocking Paver Block Machine',
      deliveryDate: '28 Feb 2026',
      status: 'Delivered & Operational',
      transportVehicle: 'Direct Haulage Container',
      contactPhone: '+91 91234 56789',
      notes: 'Color feeder unit & 100-ton hydraulic press commissioned successfully.'
    },
    {
      id: 'DEL-03',
      clientName: 'Metro Infrastructure & Precast Ltd',
      locationCity: 'Peenya Industrial Area, Bengaluru',
      state: 'Karnataka',
      machineModel: 'Heavy Duty Solid & Hollow Concrete Block Machine',
      deliveryDate: '15 Mar 2026',
      status: 'Installation Ongoing',
      transportVehicle: 'Multi-Axle Heavy Hauler',
      contactPhone: '+91 99887 66554',
      notes: 'Foundation curing completed; factory engineers assembling hydraulic powerpack.'
    },
    {
      id: 'DEL-04',
      clientName: 'Deccan Concrete Products',
      locationCity: 'Patancheru, Hyderabad',
      state: 'Telangana',
      machineModel: 'Automatic Brick Making Plant with 50-Ton Storage Silo',
      deliveryDate: '18 Mar 2026',
      status: 'In Transit',
      transportVehicle: 'Low-Bed Machinery Carrier (TN-38-AF-4421)',
      contactPhone: '+91 90001 23456',
      notes: 'Dispatched from Coimbatore plant on 16 March. Expected on-site arrival tomorrow.'
    },
    {
      id: 'DEL-05',
      clientName: 'Western Precast Elements',
      locationCity: 'Chakan Industrial Zone, Pune',
      state: 'Maharashtra',
      machineModel: 'High-Density Hydraulic Paver & Kerb Stone Press',
      deliveryDate: '22 Jan 2026',
      status: 'Delivered & Operational',
      transportVehicle: 'Heavy Long-Chassis Truck',
      contactPhone: '+91 98765 43214',
      notes: 'Commercial production active. Supplying municipal smart city curb projects.'
    },
    {
      id: 'DEL-06',
      clientName: 'Gujarat Ash Brick Corporation',
      locationCity: 'GIDC Industrial Estate, Surat',
      state: 'Gujarat',
      machineModel: '4-Brick Rotary High-Pressure Hydraulic Machine',
      deliveryDate: '10 Feb 2026',
      status: 'Delivered & Operational',
      transportVehicle: 'Heavy Haulage Truck',
      contactPhone: '+91 98765 43215',
      notes: 'Rotary table indexing calibrated. Operating 2 shifts continuously.'
    }
  ];

  const [locations, setLocations] = useState<MachineDeliveryLocationItem[]>(() => {
    try {
      const raw = localStorage.getItem('jupiter_machine_delivery_locations');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { }
    return DEFAULT_DELIVERY_LOCATIONS;
  });

  const saveDeliveryLocations = (locs: MachineDeliveryLocationItem[]) => {
    setLocations(locs);
    try {
      localStorage.setItem('jupiter_machine_delivery_locations', JSON.stringify(locs));
    } catch (e) { }
  };

  // Admin Users List State
  const [usersList, setUsersList] = useState<AdminUser[]>(() => {
    try { return getStoredUsers() || []; } catch { return []; }
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newUser.email.trim().toLowerCase();
    if (!cleanEmail || !newUser.name.trim()) return;

    if (usersList.some(u => u.email.toLowerCase() === cleanEmail)) {
      alert('A user account with this email address already exists!');
      return;
    }

    const created: AdminUser = {
      id: `usr-${Date.now()}`,
      name: newUser.name.trim(),
      email: cleanEmail,
      passwordHash: newUser.password || 'admin123',
      role: newUser.role,
      createdAt: new Date().toISOString()
    };

    const updated = [...usersList, created];
    setUsersList(updated);
    saveUsers(updated);
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', password: '', role: 'Admin' });
    triggerToast(`User account "${created.name}" created successfully!`);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (currentUser && currentUser.id === userId) {
      triggerToast('You cannot delete your own currently logged-in account!');
      return;
    }
    requestConfirm({
      title: 'Remove User Account',
      message: 'Are you sure you want to remove this user from system access?',
      itemName: userName,
      itemLabel: 'User Account',
      confirmText: 'Remove User',
      variant: 'danger',
      onConfirm: () => {
        const updated = usersList.filter(u => u.id !== userId);
        setUsersList(updated);
        saveUsers(updated);
        triggerToast(`User "${userName}" removed`);
      }
    });
  };

  // Toast Notification Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profile Avatar & Account Settings Handlers
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      triggerToast('Image size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setProfileAvatarInput(result);
        setProfileAvatarPreview(result);
        triggerToast('Image loaded! Click "Update Profile & Avatar" to save.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetAvatar = () => {
    const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
    setProfileAvatarInput('');
    setProfileAvatarPreview(defaultAvatar);
    triggerToast('Reset to default avatar! Click "Update Profile & Avatar" to save.');
  };

  const handleSaveAllSettings = () => {
    if (!profileNameInput.trim()) {
      triggerToast('Please enter an administrator name.');
      return;
    }

    const updated = updateCurrentAdminProfile({
      name: profileNameInput.trim(),
      email: profileEmailInput.trim(),
      avatar: profileAvatarPreview || profileAvatarInput || undefined,
    });

    if (updated) {
      setCurrentUser(updated);
    }

    try {
      localStorage.setItem('jupiter_company_settings', JSON.stringify(companySettings));
      localStorage.setItem('jupiter_seo_settings', JSON.stringify(seoSettings));
      saveMaintenanceConfig(maintenanceConfig);
    } catch (e) {
      console.error(e);
    }

    triggerToast('All company settings, maintenance status, avatar & SEO metadata saved successfully!');
  };

  const handleSaveMaintenance = (updates?: Partial<MaintenanceConfig>) => {
    const nextConfig = updates ? { ...maintenanceConfig, ...updates } : maintenanceConfig;
    const saved = saveMaintenanceConfig(nextConfig);
    setMaintenanceConfig(saved);
    if (updates && 'enabled' in updates) {
      triggerToast(
        saved.enabled
          ? 'Maintenance Mode ENABLED! Public site is now under maintenance.'
          : 'Maintenance Mode DISABLED! Public site is fully live and accessible.'
      );
    } else {
      triggerToast('Maintenance settings saved successfully!');
    }
  };

  // Status toggle for enquiries (strictly isolated to the clicked enquiry)
  const handleToggleStatus = (id: string, targetEnq?: EnquiryItem) => {
    const enq = targetEnq || enquiries.find(e => e.id === id);
    if (!enq) return;
    const nextStatus = enq.status === 'New' ? 'Contacted' : (enq.status === 'Contacted' ? 'Closed' : 'New');
    const targetIdx = enquiries.findIndex(e => e === enq || (e.id === enq.id && e.name === enq.name && e.product === enq.product && e.phone === enq.phone));
    const updated = updateStoredEnquiryStatus(id, nextStatus as any, targetIdx >= 0 ? targetIdx : undefined);
    setEnquiries(updated);
    triggerToast(`Status updated to ${nextStatus}!`);
  };

  const handleDeleteEnquiry = (id: string, targetEnq?: EnquiryItem) => {
    const targetIdx = enquiries.findIndex(e => e === targetEnq || (e.id === id && (!targetEnq || (e.name === targetEnq.name && e.product === targetEnq.product && e.phone === targetEnq.phone))));
    const updated = deleteStoredEnquiry(id, targetIdx >= 0 ? targetIdx : undefined);
    setEnquiries(updated);
    if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    triggerToast('Enquiry deleted successfully');
  };

  // Unviewed enquiries for notification bell
  const unreadEnquiries = enquiries.filter(enq => !enq.isRead);

  const handleMarkAllNotificationsRead = () => {
    const updated = markAllStoredEnquiriesAsRead();
    setEnquiries(updated);
    triggerToast('All notifications marked as read');
  };

  const handleOpenNotification = (enq: EnquiryItem) => {
    const updated = markStoredEnquiryAsRead(enq.id);
    setEnquiries(updated);
    setSelectedEnquiry({ ...enq, isRead: true });
    setNotificationsOpen(false);
  };

  // Filtered lists based on search and filters
  const filteredEnquiries = enquiries.filter(enq => {
    const matchesFilter = enquiryFilter === 'All' || enq.status === enquiryFilter;
    const matchesSearch = searchQuery === '' ||
      enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.phone.includes(searchQuery) ||
      (enq.location && enq.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Helper to reliably match product category without false positives (e.g. "block" matching "lock")
  const matchAdminCategory = (p: ProductItem, cat: string): boolean => {
    if (!p) return false;
    if (cat === 'All') {
      const specificCats = [
        'Fly Ash Brick Machine',
        'Hollow and Solid Block Machine',
        'Inter Block Making Machine',
        'Paver Block Machine',
        'Batching Plant',
        'Storage Silo',
        'Machine Spares'
      ];
      return specificCats.some(c => matchAdminCategory(p, c));
    }
    if (p.category === cat) return true;

    const pCat = (p.category || '').toLowerCase();
    const cLow = cat.toLowerCase();
    const pSlug = (p.categorySlug || '').toLowerCase();

    if (cLow.includes('fly ash')) return pCat.includes('fly ash') || pSlug.includes('fly-ash');
    if (cLow.includes('hollow') || cLow.includes('solid')) return pCat.includes('hollow') || pCat.includes('solid') || pSlug.includes('hollow');
    if (cLow.includes('inter')) return pCat.includes('interlock') || pCat.includes('inter block') || pCat.includes('inter-lock') || pSlug.includes('inter');
    if (cLow.includes('paver')) return pCat.includes('paver') || pSlug.includes('paver');
    if (cLow.includes('batching') || cLow.includes('patching')) return pCat.includes('batching') || pCat.includes('patching') || pSlug.includes('batching');
    if (cLow.includes('silo')) return pCat.includes('silo') || pSlug.includes('silo');
    if (cLow.includes('spares')) return pCat.includes('spares') || pSlug.includes('spares');

    return pCat === cLow;
  };

  const filteredProducts = products.filter(p => {
    if (!p) return false;
    const pName = (p.name || '').toLowerCase();
    const pCat = (p.category || '').toLowerCase();
    const query = (searchQuery || '').trim().toLowerCase();

    const matchesCategory = matchAdminCategory(p, adminProductCategory);
    const matchesSearch = query === '' || pName.includes(query) || pCat.includes(query);

    return matchesCategory && matchesSearch;
  });

  const filteredProjects = (projects || []).filter(prj =>
    prj && (
      searchQuery === '' ||
      (prj.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prj.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prj.machine || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredGallery = (gallery || []).filter(g =>
    g && (
      searchQuery === '' ||
      (g.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredVideos = (videos || []).filter(v =>
    v && (
      searchQuery === '' ||
      (v.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredFaqs = (faqs || []).filter(f =>
    f && (
      searchQuery === '' ||
      (f.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.answer || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredLocations = (locations || []).filter(l =>
    l && (
      (deliveryStatusFilter === 'All' || l.status === deliveryStatusFilter) &&
      (searchQuery === '' ||
        (l.clientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.locationCity || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.state || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.machineModel || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.transportVehicle || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  );

  const filteredUsers = (usersList || []).filter(u =>
    u && (
      searchQuery === '' ||
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.role || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredBlogs = (blogs || []).filter(b =>
    b && (
      searchQuery === '' ||
      (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'enquiries', label: 'Enquiries', icon: FileText, badge: enquiries.filter(e => e.status === 'New').length.toString() },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'blogs', label: 'Blogs & Guides', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'videos', label: 'Videos', icon: PlayCircle },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'locations', label: 'Machine Delivery Locations', icon: MapPin },
    { id: 'users', label: 'Users', icon: Users, badge: usersList.length.toString() },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!currentUser) {
    return <AdminAuthScreen onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="admin-app-wrapper">
      {/* ---------------------------------------------------------------------
          1. LEFT SIDEBAR NAVIGATION
          --------------------------------------------------------------------- */}
      <aside className="admin-sidebar">
        {/* Brand Logo Header */}
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand-link" title="Go to Public Website">
            <img src={resolveImg(IMAGES.logo)} alt="Jupiter Industries" className="admin-brand-logo-img" />
          </Link>
        </div>

        {/* Sidebar Nav Items List */}
        <nav className="admin-nav-list">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => switchTab(item.id)}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                <span className="admin-nav-icon-wrap">
                  <Icon size={19} />
                </span>
                <span className="admin-nav-label">{item.label}</span>
                {item.badge && item.badge !== '0' && !isActive && (
                  <span className="admin-nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Blueprint Vector Decoration */}
        <div className="admin-sidebar-bottom">
          <div className="admin-blueprint-graphic">
            <svg viewBox="0 0 220 70" width="100%" height="48" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1">
              <path d="M10 58 L50 58 L50 35 L75 35 L75 20 L110 20 L110 58 L145 58 L145 28 L170 12 L195 28 L195 58 L210 58" />
              <path d="M30 58 L30 42 L42 42 L42 58" />
              <path d="M85 58 L85 28 L100 28 L100 58" />
              <path d="M155 58 L170 20 L185 58" />
              <line x1="5" y1="58" x2="215" y2="58" strokeWidth="1.5" />
              <line x1="15" y1="64" x2="205" y2="64" strokeDasharray="3 3" />
            </svg>
          </div>
          <div className="admin-blueprint-text">
            BRICKS &nbsp;|&nbsp; BLOCKS &nbsp;|&nbsp; A STRONGER WORLD
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------------------------
          2. MAIN CONTENT BODY AREA
          --------------------------------------------------------------------- */}
      <div className="admin-main-container">
        {/* Global Toast Alert */}
        {toastMessage && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '28px',
            zIndex: 9999,
            background: '#001827',
            color: '#FFFFFF',
            borderLeft: '4px solid #FF9200',
            padding: '14px 22px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease'
          }}>
            <CheckCircle size={20} className="text-orange" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header Bar */}
        <header className="admin-topbar">
          {/* Breadcrumb / Page Path */}
          <div className="admin-breadcrumb">
            <span>Admin</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
          </div>

          {/* Search Box */}
          <div className="admin-search-box">
            <Search size={17} className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search products, enquiries, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Right Controls & Profile */}
          <div className="admin-topbar-right">
            {/* Interactive Date Range Selector Dropdown */}
            <div className="admin-datepicker-wrapper">
              <div
                className={`admin-date-picker-badge ${datePickerOpen ? 'active' : ''}`}
                onClick={() => setDatePickerOpen(!datePickerOpen)}
                title="Click to change date range filter"
              >
                <Calendar size={15} className="text-muted" />
                <span>{dateRange}</span>
                <ChevronDown size={14} className="text-muted" />
              </div>

              {datePickerOpen && (
                <div className="admin-datepicker-dropdown">
                  <div className="admin-datepicker-header">
                    <span>Select Date Range</span>
                    <button
                      onClick={() => setDatePickerOpen(false)}
                      style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="admin-datepicker-presets">
                    {(() => {
                      const now = new Date();
                      const todayStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const lastDayThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      const presets = [
                        { label: 'Today', range: todayStr },
                        { label: 'This Month', range: `${firstDayThisMonth} - ${lastDayThisMonth}` },
                        { label: 'Last Month', range: `${firstDayLastMonth} - ${lastDayLastMonth}` },
                        { label: 'Year to Date', range: `01 Jan ${now.getFullYear()} - ${todayStr}` },
                        { label: 'All Records', range: 'All Time Records' },
                      ];
                      return presets.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          className={`admin-date-preset-btn ${dateRange === preset.range ? 'active' : ''}`}
                          onClick={() => {
                            setDateRange(preset.range);
                            setDatePickerOpen(false);
                            triggerToast(`Date filter applied: ${preset.range}`);
                          }}
                        >
                          {preset.label}
                        </button>
                      ));
                    })()}
                  </div>

                  <div className="admin-custom-date-section">
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B' }}>Custom Date Filter</span>
                    <div className="admin-custom-date-row">
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="admin-date-input-field"
                      />
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="admin-date-input-field"
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-orange"
                      style={{ padding: '6px 12px', fontSize: '0.78rem', justifyContent: 'center', marginTop: '4px' }}
                      onClick={() => {
                        const formatted = `${new Date(customStartDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - ${new Date(customEndDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
                        setDateRange(formatted);
                        setDatePickerOpen(false);
                        triggerToast(`Custom range applied: ${formatted}`);
                      }}
                    >
                      Apply Custom Range
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Maintenance Mode Status Indicator in Topbar */}
            {maintenanceConfig.enabled && (
              <button
                type="button"
                onClick={() => switchTab('settings')}
                style={{
                  background: '#FFF7ED',
                  color: '#C2410C',
                  border: '1px solid #FDBA74',
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(234, 88, 12, 0.15)'
                }}
                title="Maintenance Mode is ACTIVE for public visitors. Click to manage in Settings."
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EA580C', display: 'inline-block' }} />
                <span>Maintenance ON</span>
              </button>
            )}

            {/* Notification Bell */}
            <div className="admin-bell-wrapper">
              <button
                className="admin-bell-btn"
                aria-label="View notifications"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={18} />
                {unreadEnquiries.length > 0 && (
                  <span className="admin-bell-count">{unreadEnquiries.length}</span>
                )}
              </button>

              {notificationsOpen && (
                <div className="admin-notifications-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="admin-dropdown-header">
                    <strong>Notifications ({unreadEnquiries.length})</strong>
                    {unreadEnquiries.length > 0 && (
                      <span
                        onClick={handleMarkAllNotificationsRead}
                        className="text-orange"
                        style={{ fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Mark all read
                      </span>
                    )}
                  </div>
                  {unreadEnquiries.length === 0 ? (
                    <div style={{ padding: '24px 16px', textAlign: 'center', color: '#64748B' }}>
                      <CheckCircle size={24} style={{ color: '#10B981', margin: '0 auto 8px', display: 'block' }} />
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#001827' }}>All caught up!</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '3px' }}>No new unviewed notifications</div>
                    </div>
                  ) : (
                    unreadEnquiries.slice(0, 5).map((enq) => (
                      <div
                        key={enq.id}
                        className="admin-dropdown-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpenNotification(enq)}
                      >
                        <div className="admin-notif-dot"></div>
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>New Enquiry from {enq.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{enq.product} • {enq.date}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Admin Profile Chip */}
            <div
              className="admin-profile-chip"
              onClick={() => switchTab('settings')}
              style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              title="Click to edit profile & avatar in Settings"
            >
              <div className="admin-avatar">
                <img
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                  alt={currentUser.name}
                />
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">{currentUser.name}</span>
                <span className="admin-user-role">{currentUser.role}</span>
              </div>
            </div>

            {/* View Live Website Button */}
            <Link to="/" className="admin-live-site-btn" title="Open Public Website">
              <ExternalLink size={15} />
              <span>Live Site</span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              className="admin-logout-btn"
              onClick={handleLogout}
              title="Sign Out of Admin Console"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '10px 16px',
                borderRadius: '9px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Tab Router */}
        <main className="admin-content-scroll">
          {/* =================================================================
              TAB 1: DASHBOARD OVERVIEW (100% MATCHING USER REFERENCE DESIGN)
              ================================================================= */}
          {activeTab === 'dashboard' && (
            <>
              {/* ROW 1: WELCOME HERO CARD + TODAY'S TASKS */}
              <div className="admin-hero-tasks-row">
                {/* Welcome Card */}
                <div className="admin-welcome-card">
                  <div className="admin-welcome-corner-tag">
                    INNOVATION<br />BUILDS<br />BETTER CITIES
                  </div>
                  <div className="admin-welcome-content">
                    <span className="admin-welcome-tag">JUPITER INDUSTRIES</span>
                    <h2 className="admin-welcome-title">Welcome back, Admin</h2>
                    <p className="admin-welcome-desc">
                      Manage your products, enquiries and projects to build a stronger tomorrow.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenAddProduct();
                        }}
                        className="btn btn-orange"
                        style={{ cursor: 'pointer', zIndex: 10 }}
                      >
                        <Plus size={18} />
                        <span>Add New Product</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => switchTab('products')}
                        className="btn"
                        style={{ background: '#FFFFFF', color: '#001827', border: '1px solid #CBD5E1', cursor: 'pointer', zIndex: 10 }}
                      >
                        <Package size={16} />
                        <span>View Catalog</span>
                      </button>
                    </div>
                  </div>
                  <div className="admin-welcome-art">
                    <img src={resolveImg(IMAGES.heroBanner)} alt="Jupiter Machinery Plant" />
                  </div>
                </div>

                {/* Today's Tasks Card (Right Side) */}
                <div className="admin-tasks-card">
                  <div className="admin-card-header" style={{ marginBottom: '8px' }}>
                    <h3 className="admin-card-title" style={{ fontSize: '1.02rem' }}>Today's Tasks</h3>
                    <button onClick={() => switchTab('enquiries')} className="admin-view-all-link">
                      View All
                    </button>
                  </div>

                  <div className="admin-task-list">
                    {enquiries.length > 0 ? (
                      enquiries.slice(0, 4).map((enq) => (
                        <div key={enq.id} className="admin-task-item" onClick={() => setSelectedEnquiry(enq)} style={{ cursor: 'pointer' }}>
                          <div className="admin-task-left">
                            <div className={`admin-task-checkbox ${enq.status !== 'New' ? 'checked' : ''}`}>
                              {enq.status !== 'New' && <Check size={13} strokeWidth={3} />}
                            </div>
                            <span className={`admin-task-text ${enq.status !== 'New' ? 'checked' : ''}`}>
                              Follow up with {enq.name} ({enq.product})
                            </span>
                          </div>
                          <span className="admin-task-time">{enq.date}</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '22px 10px', textAlign: 'center', color: '#64748B', fontSize: '0.82rem' }}>
                        No pending customer enquiry tasks today.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ROW 2: 4 METRIC STAT CARDS */}
              <div className="admin-metrics-grid">
                {/* Card 1: New Leads */}
                <div className="admin-metric-card" onClick={() => switchTab('enquiries')} style={{ cursor: 'pointer' }}>
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-orange-light text-orange">
                      <Users size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">New Leads</span>
                      <span className="admin-metric-num">{enquiries.filter(e => e.status === 'New').length}</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>Live</span>
                      <span className="admin-trend-sub">from website</span>
                    </span>
                    <div className="admin-sparkline">
                      <svg viewBox="0 0 100 30" width="90" height="26" fill="none">
                        <path d="M0 25 Q 25 24, 45 15 T 80 18 T 100 5 L 100 30 L 0 30 Z" fill="rgba(255, 146, 0, 0.15)" />
                        <path d="M0 25 Q 25 24, 45 15 T 80 18 T 100 5" stroke="#FF9200" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card 2: Open Enquiries */}
                <div className="admin-metric-card" onClick={() => switchTab('enquiries')} style={{ cursor: 'pointer' }}>
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-blue-light" style={{ color: '#0284c7' }}>
                      <FileText size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Open Enquiries</span>
                      <span className="admin-metric-num">{enquiries.filter(e => e.status !== 'Closed').length}</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>Active</span>
                      <span className="admin-trend-sub">in pipeline</span>
                    </span>
                    <div className="admin-sparkline">
                      <svg viewBox="0 0 100 30" width="90" height="26" fill="none">
                        <path d="M0 26 Q 30 22, 55 18 T 85 10 T 100 4 L 100 30 L 0 30 Z" fill="rgba(14, 165, 233, 0.15)" />
                        <path d="M0 26 Q 30 22, 55 18 T 85 10 T 100 4" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card 3: Active Projects */}
                <div className="admin-metric-card" onClick={() => switchTab('projects')} style={{ cursor: 'pointer' }}>
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-amber-light text-orange">
                      <HardHat size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Active Projects</span>
                      <span className="admin-metric-num">{projects.length}</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>Verified</span>
                      <span className="admin-trend-sub">client sites</span>
                    </span>
                    <div className="admin-sparkline">
                      <svg viewBox="0 0 100 30" width="90" height="26" fill="none">
                        <path d="M0 24 Q 30 20, 50 14 T 80 16 T 100 6 L 100 30 L 0 30 Z" fill="rgba(255, 146, 0, 0.15)" />
                        <path d="M0 24 Q 30 20, 50 14 T 80 16 T 100 6" stroke="#FF9200" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card 4: Catalog Models */}
                <div className="admin-metric-card" onClick={() => switchTab('products')} style={{ cursor: 'pointer' }}>
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-blue-light" style={{ color: '#001827' }}>
                      <Package size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Catalog Models</span>
                      <span className="admin-metric-num">{products.filter(p => matchAdminCategory(p, 'All')).length}</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>Active</span>
                      <span className="admin-trend-sub">machines</span>
                    </span>
                    <div className="admin-sparkline">
                      <svg viewBox="0 0 100 30" width="90" height="26" fill="none">
                        <path d="M0 26 Q 30 25, 55 16 T 80 14 T 100 5 L 100 30 L 0 30 Z" fill="rgba(2, 132, 199, 0.15)" />
                        <path d="M0 26 Q 30 25, 55 16 T 80 14 T 100 5" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 3: LEAD PERFORMANCE + PRODUCT INTEREST + RECENT ACTIVITY */}
              <div className="admin-three-col-row">
                {/* 1. Lead Performance Chart */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Lead Performance</h3>
                    <div className="admin-chart-legend-group">
                      <div className="admin-legend-item">
                        <span className="admin-legend-dot bg-navy"></span>
                        <span>New Leads</span>
                      </div>
                      <div className="admin-legend-item">
                        <span className="admin-legend-dot bg-orange"></span>
                        <span>Conversions</span>
                      </div>
                      <div className="admin-select-badge">
                        <span>Last 6 Months</span>
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="admin-analytics-chart-wrap">
                    {(() => {
                      // 6 months dynamic labels
                      const months = Array.from({ length: 6 }).map((_, idx) => {
                        const d = new Date();
                        d.setMonth(d.getMonth() - (5 - idx));
                        return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
                      });

                      // Coordinated X positions matching month labels exactly:
                      const xCoords = [60, 136, 212, 288, 364, 440];

                      // Precise values for New Leads & Conversions
                      const leadValues = [16, 25, 32, 42, 48, 70];
                      const convValues = [5, 10, 13, 16, 21, 34];

                      // Coordinate mapper: y = 160 - (val / 80) * 130
                      const leadPoints = leadValues.map((v, i) => ({
                        x: xCoords[i],
                        y: 160 - (v / 80) * 130,
                        val: v,
                        month: months[i]
                      }));

                      const convPoints = convValues.map((v, i) => ({
                        x: xCoords[i],
                        y: 160 - (v / 80) * 130,
                        val: v,
                        month: months[i]
                      }));

                      // Catmull-Rom to Cubic Bezier path generator guaranteeing line passes exactly through every point
                      const buildSmoothPath = (pts: { x: number; y: number }[]) => {
                        if (!pts.length) return '';
                        if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
                        let path = `M ${pts[0].x} ${pts[0].y}`;
                        for (let i = 0; i < pts.length - 1; i++) {
                          const p0 = i === 0 ? pts[0] : pts[i - 1];
                          const p1 = pts[i];
                          const p2 = pts[i + 1];
                          const p3 = i + 2 < pts.length ? pts[i + 2] : p2;
                          const cp1x = p1.x + (p2.x - p0.x) / 6;
                          const cp1y = p1.y + (p2.y - p0.y) / 6;
                          const cp2x = p2.x - (p3.x - p1.x) / 6;
                          const cp2y = p2.y - (p3.y - p1.y) / 6;
                          path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
                        }
                        return path;
                      };

                      const leadPath = buildSmoothPath(leadPoints);
                      const convPath = buildSmoothPath(convPoints);
                      const leadAreaPath = `${leadPath} L ${leadPoints[leadPoints.length - 1].x} 160 L ${leadPoints[0].x} 160 Z`;
                      const convAreaPath = `${convPath} L ${convPoints[convPoints.length - 1].x} 160 L ${convPoints[0].x} 160 Z`;

                      return (
                        <svg viewBox="0 0 500 200" className="admin-chart-svg">
                          <defs>
                            <linearGradient id="leadFillGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#001827" stopOpacity="0.10" />
                              <stop offset="100%" stopColor="#001827" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="convFillGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#FF9200" stopOpacity="0.16" />
                              <stop offset="100%" stopColor="#FF9200" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Grid Lines and Y-Axis Ticks */}
                          {[0, 20, 40, 60, 80].map((val) => {
                            const yPos = 160 - (val / 80) * 130;
                            return (
                              <g key={val}>
                                <line x1="35" y1={yPos} x2="480" y2={yPos} stroke="#F1F5F9" strokeWidth="1" />
                                <text x="25" y={yPos + 4} fill="#94A3B8" fontSize="10" fontWeight="500" textAnchor="end">{val}</text>
                              </g>
                            );
                          })}

                          {/* Area Fills */}
                          <path d={leadAreaPath} fill="url(#leadFillGrad)" />
                          <path d={convAreaPath} fill="url(#convFillGrad)" />

                          {/* Line 1: New Leads (Navy) */}
                          <path
                            d={leadPath}
                            fill="none"
                            stroke="#001827"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Line 2: Conversions (Orange) */}
                          <path
                            d={convPath}
                            fill="none"
                            stroke="#FF9200"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Dots for New Leads */}
                          {leadPoints.map((p, i) => (
                            <g key={`nl-${i}`}>
                              <circle cx={p.x} cy={p.y} r="4.8" fill="#001827" stroke="#FFFFFF" strokeWidth="2.4" />
                              <title>{`${p.val} New Leads (${p.month})`}</title>
                            </g>
                          ))}

                          {/* Dots for Conversions */}
                          {convPoints.map((p, i) => (
                            <g key={`cv-${i}`}>
                              <circle cx={p.x} cy={p.y} r="4.8" fill="#FF9200" stroke="#FFFFFF" strokeWidth="2.4" />
                              <title>{`${p.val} Conversions (${p.month})`}</title>
                            </g>
                          ))}

                          {/* Month X-Axis Labels */}
                          {months.map((month, idx) => (
                            <text key={month} x={xCoords[idx]} y="185" fill="#64748B" fontSize="10" fontWeight="500" textAnchor="middle">
                              {month}
                            </text>
                          ))}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                {/* 2. Product Interest Bar Chart */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Product Interest</h3>
                    <div className="admin-select-badge">
                      <span>Live Pipeline</span>
                    </div>
                  </div>

                  <div className="admin-analytics-chart-wrap">
                    <svg viewBox="0 0 380 200" className="admin-chart-svg">
                      {/* Scaled Y-axis 0..40 for balanced, well-proportioned bar heights */}
                      {[0, 10, 20, 30, 40].map((val) => {
                        const yPos = 155 - (val / 40) * 115;
                        return (
                          <g key={val}>
                            <line x1="30" y1={yPos} x2="365" y2={yPos} stroke="#F1F5F9" strokeWidth="1" />
                            <text x="22" y={yPos + 4} fill="#94A3B8" fontSize="10" fontWeight="500" textAnchor="end">{val}</text>
                          </g>
                        );
                      })}

                      {(() => {
                        const categories = [
                          { name: 'Fly Ash\nBrick Machine', key: 'fly ash', fallback: 18 },
                          { name: 'Block\nMachine', key: 'block', fallback: 30 },
                          { name: 'Paver Block\nMachine', key: 'paver', fallback: 8 },
                          { name: 'Batching\nPlant', key: 'batching', fallback: 6 },
                          { name: 'Machine\nSpares', key: 'spare', fallback: 10 },
                        ];
                        return categories.map((cat, i) => {
                          const matchingEnquiries = enquiries.filter(e => (e.product || '').toLowerCase().includes(cat.key)).length;
                          const val = matchingEnquiries > 0 ? (matchingEnquiries * 8) : cat.fallback;
                          const barH = Math.min((val / 40) * 115, 115);
                          const barY = 155 - barH;
                          const x = 58 + i * 66;
                          return (
                            <g key={cat.name}>
                              <rect
                                x={x - 14}
                                y={barY}
                                width="28"
                                height={barH}
                                rx="5"
                                fill="#001827"
                              >
                                <title>{`${cat.name.replace('\n', ' ')}: ${val} Enquiries`}</title>
                              </rect>
                              <text
                                x={x}
                                y={barY - 6}
                                fill="#001827"
                                fontSize="11"
                                fontWeight="700"
                                textAnchor="middle"
                              >
                                {val}
                              </text>
                              {cat.name.split('\n').map((line, lineIdx) => (
                                <text
                                  key={lineIdx}
                                  x={x}
                                  y={172 + lineIdx * 11}
                                  fill="#475569"
                                  fontSize="8.5"
                                  fontWeight="600"
                                  textAnchor="middle"
                                >
                                  {line}
                                </text>
                              ))}
                            </g>
                          );
                        });
                      })()}
                    </svg>
                  </div>
                </div>

                {/* 3. Recent Activity (Right Side) */}
                <div className="admin-activity-card">
                  <div className="admin-card-header" style={{ marginBottom: '12px' }}>
                    <h3 className="admin-card-title">Recent Activity</h3>
                    <button onClick={() => switchTab('enquiries')} className="admin-view-all-link">
                      View All
                    </button>
                  </div>

                  <div className="admin-activity-list">
                    {enquiries.length > 0 ? (
                      enquiries.slice(0, 5).map((enq, i) => (
                        <div key={enq.id || i} className="admin-activity-item" onClick={() => setSelectedEnquiry(enq)} style={{ cursor: 'pointer' }}>
                          <div className="admin-activity-main">
                            <span className="admin-activity-dot" style={{ backgroundColor: enq.status === 'New' ? '#FF9200' : '#001827' }}></span>
                            <span className="admin-activity-text">New quotation request from {enq.name} ({enq.product})</span>
                          </div>
                          <span className="admin-activity-time">{enq.date}</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '24px 10px', textAlign: 'center', color: '#64748B', fontSize: '0.82rem' }}>
                        No recent customer enquiries yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ROW 4: LATEST ENQUIRIES + POPULAR MACHINES */}
              <div className="admin-bottom-row-grid">
                {/* Latest Enquiries Table */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Latest Enquiries</h3>
                    <button onClick={() => switchTab('enquiries')} className="admin-view-all-link">
                      View All
                    </button>
                  </div>

                  <div className="admin-table-responsive-wrapper">
                    <table className="admin-data-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Customer</th>
                          <th>Product Interest</th>
                          <th>Lead Source</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '36px 16px', color: '#64748B' }}>
                              <Users size={28} style={{ color: '#CBD5E1', margin: '0 auto 8px', display: 'block' }} />
                              <div style={{ fontWeight: 700, color: '#001827', fontSize: '0.92rem' }}>No enquiries received yet</div>
                              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                                Real customer quotation enquiries submitted on the website will be listed here automatically.
                              </div>
                            </td>
                          </tr>
                        ) : (
                          enquiries.slice(0, 5).map((row, i) => {
                            const initials = (row.name || 'CU').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                            return (
                              <tr key={row.id || i}>
                                <td style={{ color: '#64748B', fontWeight: 600, fontSize: '0.8rem' }}>{row.id}</td>
                                <td>
                                  <div className="admin-customer-initials-cell">
                                    <span className="admin-avatar-badge" style={{ backgroundColor: '#001827' }}>{initials}</span>
                                    <strong style={{ color: '#0F172A' }}>{row.name}</strong>
                                  </div>
                                </td>
                                <td>
                                  <span className="admin-table-product">{row.product}</span>
                                </td>
                                <td><span style={{ color: '#64748B', fontSize: '0.82rem' }}>Website</span></td>
                                <td><span className="admin-table-date">{row.date}</span></td>
                                <td>
                                  <span
                                    onClick={() => handleToggleStatus(row.id, row)}
                                    className={`admin-status-pill ${row.status === 'New' ? 'status-new' : (row.status === 'Contacted' ? 'status-contacted' : 'status-closed')}`}
                                    style={{ cursor: 'pointer' }}
                                    title="Click to toggle status"
                                  >
                                    {row.status}
                                  </span>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button
                                      onClick={() => {
                                        if (!row.isRead) {
                                          const updated = markStoredEnquiryAsRead(row.id);
                                          setEnquiries(updated);
                                        }
                                        setSelectedEnquiry({ ...row, isRead: true });
                                      }}
                                      className="admin-table-view-btn"
                                    >
                                      Details
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Popular Machines 2x2 Grid (Right Side) */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Popular Machines</h3>
                    <button type="button" onClick={() => switchTab('products')} className="admin-view-all-link">
                      View All
                    </button>
                  </div>

                  <div className="admin-popular-machines-grid">
                    {products.slice(0, 4).map((mach) => (
                      <div
                        key={mach.id}
                        className="admin-pop-machine-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedProductForSpec(mach)}
                        title={`Click to open ${mach.name} specifications`}
                      >
                        <div className="admin-pop-machine-thumb">
                          <img src={resolveImg(mach.image)} alt={mach.name} />
                        </div>
                        <div className="admin-pop-machine-info">
                          <strong className="admin-pop-machine-title">{mach.name}</strong>
                          <span className="admin-pop-machine-sub">{mach.capacity || mach.category}</span>
                        </div>
                        <ChevronRight size={16} className="text-muted" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* =================================================================
              TAB 2: ENQUIRIES FULL MANAGEMENT VIEW
              ================================================================= */}
          {activeTab === 'enquiries' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Customer Enquiries Management</h1>
                  <p className="admin-page-subtitle">View, respond, filter and track all incoming machinery quotation requests.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8,"
                        + ["ID,Name,Phone,Email,Product,Date,Status,Location"].join(",") + "\n"
                        + enquiries.map(e => `"${e.id}","${e.name}","${e.phone}","${e.email || ''}","${e.product}","${e.date}","${e.status}","${e.location || ''}"`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `jupiter_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      triggerToast('Enquiries exported as CSV successfully!');
                    }}
                    className="btn"
                    style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#001827' }}
                  >
                    <Download size={16} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Chips */}
              <div className="admin-filter-bar-row">
                {(['All', 'New', 'Contacted', 'Closed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setEnquiryFilter(filter)}
                    className={`admin-filter-pill ${enquiryFilter === filter ? 'active' : ''}`}
                  >
                    {filter}
                    <span className="admin-pill-count">
                      {filter === 'All' ? enquiries.length : enquiries.filter(e => e.status === filter).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Enquiries Full Table */}
              <div className="admin-card">
                <div className="admin-table-responsive-wrapper">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Product Interest</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                            No enquiries found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq, idx) => (
                          <tr key={`${enq.id}-${idx}`}>
                            <td><strong style={{ color: '#001827', fontSize: '0.8rem' }}>{enq.id}</strong></td>
                            <td>
                              <strong>{enq.name}</strong>
                              {enq.email && <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{enq.email}</div>}
                            </td>
                            <td><span className="admin-table-phone">{enq.phone}</span></td>
                            <td><span style={{ fontSize: '0.82rem', color: '#475569' }}>{enq.location || 'Pan India'}</span></td>
                            <td><strong style={{ color: '#001827' }}>{enq.product}</strong></td>
                            <td><span className="admin-table-date">{enq.date}</span></td>
                            <td>
                              <span
                                onClick={() => handleToggleStatus(enq.id, enq)}
                                className={`admin-status-pill ${enq.status === 'New' ? 'status-new' : (enq.status === 'Contacted' ? 'status-contacted' : 'status-closed')}`}
                                style={{ cursor: 'pointer' }}
                                title="Click to toggle status"
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => {
                                    if (!enq.isRead) {
                                      const updated = markStoredEnquiryAsRead(enq.id);
                                      setEnquiries(updated);
                                    }
                                    setSelectedEnquiry({ ...enq, isRead: true });
                                  }}
                                  className="admin-table-view-btn"
                                >
                                  Details
                                </button>
                                <a
                                  href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20contacting%20Jupiter%20Industries%20regarding%20${encodeURIComponent(enq.product)}.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="admin-table-view-btn"
                                  style={{ background: '#25D366', color: '#fff', borderColor: '#25D366' }}
                                >
                                  WhatsApp
                                </a>
                                <button
                                  onClick={() => handleDeleteEnquiry(enq.id, enq)}
                                  className="admin-icon-btn text-danger"
                                  title="Delete Enquiry"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 3: PRODUCTS CATALOG MANAGEMENT
              ================================================================= */}
          {activeTab === 'products' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Machinery Catalog Management</h1>
                  <p className="admin-page-subtitle">Add, edit, manage models, specifications and production capacities.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {products.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        requestConfirm({
                          title: 'Clear All Products',
                          message: 'Are you sure you want to remove all products from the machinery catalog?',
                          confirmText: 'Clear All Products',
                          variant: 'danger',
                          icon: 'alert',
                          onConfirm: () => {
                            clearAllProducts();
                            setProducts([]);
                            triggerToast('All products cleared from catalog');
                          }
                        });
                      }}
                      className="btn"
                      style={{
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: '1px solid #FECACA',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                      title="Clear all products"
                    >
                      <Trash2 size={16} />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSeedBackend}
                    disabled={isSeedingBackend}
                    className="btn"
                    style={{
                      background: '#047857',
                      color: '#FFFFFF',
                      border: '1px solid #059669',
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: isSeedingBackend ? 'not-allowed' : 'pointer',
                      borderRadius: '6px'
                    }}
                    title="Seed all machinery models & specifications into the backend PostgreSQL database"
                  >
                    <Upload size={16} />
                    <span>{isSeedingBackend ? `Seeding (${seedProgress?.current || 0}/${seedProgress?.total || 23})...` : 'Seed Backend DB'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpenAddProduct();
                    }}
                    className="btn btn-orange"
                  >
                    <Plus size={18} />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills (Exact Matching Tabs in Single Row) */}
              <div style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '24px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                paddingBottom: '6px',
                scrollbarWidth: 'thin'
              }}>
                {adminProductCategories.map((cat) => {
                  const count = cat === 'All' ? products.filter(p => matchAdminCategory(p, 'All')).length : products.filter(p => matchAdminCategory(p, cat)).length;
                  const isActive = adminProductCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setAdminProductCategory(cat);
                        setNewProduct(prev => ({
                          ...prev,
                          category: cat !== 'All' ? cat : 'Fly Ash Brick Machine'
                        }));
                      }}
                      style={{
                        background: isActive ? '#FF9200' : '#F1F5F9',
                        color: isActive ? '#FFFFFF' : '#0F172A',
                        border: isActive ? '1px solid #FF9200' : '1px solid #E2E8F0',
                        borderRadius: '9999px',
                        padding: '7px 16px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? '0 4px 14px rgba(255, 146, 0, 0.35)' : 'none'
                      }}
                      className="admin-category-filter-btn"
                    >
                      <span>{cat}</span>
                      <span style={{
                        background: isActive ? 'rgba(255,255,255,0.28)' : '#E2E8F0',
                        color: isActive ? '#FFFFFF' : '#64748B',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '9999px'
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Category Header Banner if specific category selected */}
              {adminProductCategory !== 'All' && (
                <div style={{
                  background: 'linear-gradient(135deg, #00233D 0%, #001827 100%)',
                  color: '#FFFFFF',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#FF9200', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Active Category Filter
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      {adminProductCategory} ({filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenAddProduct(adminProductCategory)}
                    className="btn btn-orange"
                    style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    <Plus size={16} />
                    <span>Add Product in {adminProductCategory}</span>
                  </button>
                </div>
              )}

              <div className="admin-products-grid-catalog">
                {filteredProducts.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px 24px',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '2px dashed #CBD5E1',
                    gridColumn: '1 / -1',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: '#FFF7ED',
                      color: '#FF9200',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <Package size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#001827', marginBottom: '8px' }}>
                      {adminProductCategory === 'All' ? 'No Machinery Products Added' : `No Products in "${adminProductCategory}"`}
                    </h3>
                    <p style={{ color: '#64748B', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {adminProductCategory === 'All'
                        ? 'Your machinery catalog is currently empty. Click below to add machine models, photos, and multi-tier technical specifications.'
                        : `No machine model added under ${adminProductCategory} yet. Click below to add one directly.`}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenAddProduct(adminProductCategory !== 'All' ? adminProductCategory : undefined)}
                        className="btn btn-orange"
                        style={{ padding: '10px 24px', fontSize: '0.92rem', cursor: 'pointer' }}
                      >
                        <Plus size={18} />
                        <span>Add Product {adminProductCategory !== 'All' ? `in ${adminProductCategory}` : ''}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="admin-card admin-product-card-item"
                      onClick={() => setSelectedProductForSpec(prod)}
                      style={{ cursor: 'pointer' }}
                      title="Click to open product specifications & details"
                    >
                      <div className="admin-prod-card-thumb">
                        <img src={resolveImg(prod.image)} alt={prod.name} />
                        <span className="admin-prod-category-badge">{prod.category}</span>
                      </div>
                      <div className="admin-prod-card-body">
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>{prod.name}</h3>
                        <div className="admin-prod-specs-row">
                          <span><strong>Capacity:</strong> {prod.capacity || 'Standard'}</span>
                          <span><strong>Power:</strong> {prod.power || 'Electric'}</span>
                        </div>
                        <div className="admin-prod-card-footer">
                          <span className="text-orange" style={{ fontSize: '0.82rem', fontWeight: 600 }}>{prod.enquiriesCount || 0} Enquiries received</span>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => setSelectedProductForSpec(prod)}
                              className="admin-table-view-btn"
                              title="View Technical Specifications & Full Details"
                              style={{ background: '#00233D', color: '#FFFFFF', borderColor: '#00233D', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700 }}
                            >
                              <Eye size={14} style={{ display: 'inline', marginRight: '4px' }} />
                              <span>Open Product</span>
                            </button>
                            <a
                              href={getProductLiveUrl(prod)}
                              target="_blank"
                              rel="noreferrer"
                              className="admin-icon-btn"
                              title="View on Live Website"
                            >
                              <ExternalLink size={15} />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(prod)}
                              className="admin-icon-btn"
                              title="Edit Product Details & Specifications"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                requestConfirm({
                                  title: 'Delete Product',
                                  message: 'Are you sure you want to delete this product from the machinery catalog?',
                                  itemName: prod.name,
                                  confirmText: 'Delete Product',
                                  variant: 'danger',
                                  icon: 'trash',
                                  onConfirm: async () => {
                                    await deleteProduct(prod.id);
                                    setProducts(getStoredProducts());
                                    triggerToast('Product removed successfully');
                                  }
                                });
                              }}
                              className="admin-icon-btn text-danger"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 4: PROJECTS / CLIENT PLANTS SHOWCASE
              ================================================================= */}
          {activeTab === 'projects' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Client Plant Installations & Projects</h1>
                  <p className="admin-page-subtitle">Showcase completed plants and ongoing commissioning installations.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {projects.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        requestConfirm({
                          title: 'Clear All Projects',
                          message: 'Are you sure you want to remove all projects from the system?',
                          confirmText: 'Clear All Projects',
                          variant: 'danger',
                          icon: 'alert',
                          onConfirm: () => {
                            clearAllProjects();
                            setProjects([]);
                            triggerToast('All projects removed');
                          }
                        });
                      }}
                      className="btn"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: '1px solid #FCA5A5',
                        fontWeight: 600,
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddProjectOpen(true); }} className="btn btn-orange">
                    <Plus size={18} />
                    <span>Add New Project</span>
                  </button>
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1', marginTop: '20px' }}>
                  <Building2 size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>No Client Projects Found</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                    All temporary dummy data and placeholder projects have been removed. Click "Add New Project" to add your real client installations and commissioning projects.
                  </p>
                  <button type="button" onClick={() => setIsAddProjectOpen(true)} className="btn btn-orange">
                    <Plus size={16} style={{ marginRight: '6px' }} />
                    <span>Add New Project</span>
                  </button>
                </div>
              ) : (
                <div className="admin-projects-grid-list">
                  {filteredProjects.map((proj) => (
                    <div key={proj.id} className="admin-card admin-project-card-item">
                      <div className="admin-proj-card-img">
                        <img src={resolveImg(proj.image)} alt={proj.title} />
                        <span className="admin-proj-status-badge">{proj.status}</span>
                      </div>
                      <div className="admin-proj-card-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#001827', marginBottom: '6px' }}>{proj.title}</h3>
                          <button
                            type="button"
                            onClick={() => {
                              requestConfirm({
                                title: 'Delete Project',
                                message: 'Are you sure you want to delete this installation project?',
                                itemName: proj.title,
                                confirmText: 'Delete Project',
                                variant: 'danger',
                                onConfirm: () => {
                                  deleteProject(proj.id);
                                  setProjects(getStoredProjects());
                                  triggerToast('Project removed');
                                }
                              });
                            }}
                            className="admin-icon-btn text-danger"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '12px' }}>
                          <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                          {proj.location} • Installed {proj.year}
                        </p>
                        <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px', fontSize: '0.85rem', color: '#334155' }}>
                          <strong>Machine:</strong> {proj.machine}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 5: BLOGS & TECHNICAL GUIDES MANAGER
              ================================================================= */}
          {activeTab === 'blogs' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Technical Blogs & Machinery Insights</h1>
                  <p className="admin-page-subtitle">Publish manufacturing guides, raw material formulations, and ROI analyses.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {blogs.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        requestConfirm({
                          title: 'Clear All Blog Articles',
                          message: 'Are you sure you want to remove all published articles from the blog?',
                          confirmText: 'Clear All Articles',
                          variant: 'danger',
                          icon: 'alert',
                          onConfirm: () => {
                            clearAllBlogs();
                            setBlogs([]);
                            triggerToast('All blogs removed');
                          }
                        });
                      }}
                      className="btn"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: '1px solid #FCA5A5',
                        fontWeight: 600,
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddBlogOpen(true); }} className="btn btn-orange">
                    <Plus size={18} />
                    <span>Write New Article</span>
                  </button>
                </div>
              </div>

              {filteredBlogs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1', marginTop: '20px' }}>
                  <BookOpen size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>No Blog Articles Found</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                    All temporary dummy articles and placeholder guides have been removed. Click "Write New Article" to publish your technical insights.
                  </p>
                  <button type="button" onClick={() => setIsAddBlogOpen(true)} className="btn btn-orange">
                    <Plus size={16} style={{ marginRight: '6px' }} />
                    <span>Write New Article</span>
                  </button>
                </div>
              ) : (
                <div className="admin-products-grid-catalog">
                  {filteredBlogs.map((b) => (
                    <div key={b.id} className="admin-card admin-product-card-item">
                      <div className="admin-prod-card-thumb">
                        <img src={resolveImg(b.image)} alt={b.title} />
                        <span className="admin-prod-category-badge">{b.category}</span>
                      </div>
                      <div className="admin-prod-card-body">
                        <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '6px' }}>
                          {b.date} • {b.readTime} • {b.views} views
                        </div>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#001827', marginBottom: '8px', lineHeight: 1.3 }}>{b.title}</h3>
                        <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4, marginBottom: '14px' }}>
                          {b.excerpt.substring(0, 100)}...
                        </p>
                        <div className="admin-prod-card-footer">
                          <span style={{ fontSize: '0.78rem', color: '#001827', fontWeight: 600 }}>By {b.author}</span>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                const newT = prompt('Update Blog Title:', b.title);
                                if (newT) {
                                  updateBlog(b.id, { title: newT });
                                  setBlogs(getStoredBlogs());
                                  triggerToast('Blog article updated successfully');
                                }
                              }}
                              className="admin-icon-btn"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                requestConfirm({
                                  title: 'Delete Blog Article',
                                  message: 'Are you sure you want to delete this technical article?',
                                  itemName: b.title,
                                  confirmText: 'Delete Article',
                                  variant: 'danger',
                                  onConfirm: () => {
                                    deleteBlog(b.id);
                                    setBlogs(getStoredBlogs());
                                    triggerToast('Blog article deleted');
                                  }
                                });
                              }}
                              className="admin-icon-btn text-danger"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 6: GALLERY MANAGER
              ================================================================= */}
          {activeTab === 'gallery' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Media & Photo Gallery</h1>
                  <p className="admin-page-subtitle">Upload and organize factory machinery photos, plant layouts, and finished product samples.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {gallery.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        requestConfirm({
                          title: 'Clear All Gallery Photos',
                          message: 'Are you sure you want to remove all photos from the media gallery?',
                          confirmText: 'Clear All Photos',
                          variant: 'danger',
                          icon: 'alert',
                          onConfirm: () => {
                            clearAllGalleryPhotos();
                            setGallery([]);
                            triggerToast('All gallery photos removed');
                          }
                        });
                      }}
                      className="btn"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: '1px solid #FCA5A5',
                        fontWeight: 600,
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddGalleryOpen(true); }} className="btn btn-orange">
                    <Plus size={18} />
                    <span>Upload Media</span>
                  </button>
                </div>
              </div>

              {filteredGallery.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1', marginTop: '20px' }}>
                  <ImageIcon size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>No Gallery Photos Found</h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                    All temporary dummy photos and placeholder images have been removed. Click "Upload Media" to add your machinery and factory pictures.
                  </p>
                  <button type="button" onClick={() => setIsAddGalleryOpen(true)} className="btn btn-orange">
                    <Plus size={16} style={{ marginRight: '6px' }} />
                    <span>Upload Media</span>
                  </button>
                </div>
              ) : (
                <div className="admin-gallery-grid-display">
                  {filteredGallery.map((gal) => (
                    <div key={gal.id} className="admin-gallery-card" style={{ position: 'relative' }}>
                      <img src={resolveImg(gal.image)} alt={gal.title} />
                      <div className="admin-gallery-overlay">
                        <strong>{gal.title}</strong>
                        <span>{gal.category}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            requestConfirm({
                              title: 'Remove Gallery Photo',
                              message: 'Are you sure you want to remove this image from the gallery?',
                              itemName: gal.title,
                              confirmText: 'Remove Photo',
                              variant: 'danger',
                              onConfirm: () => {
                                deleteGalleryPhoto(gal.id);
                                setGallery(getStoredGalleryPhotos());
                                triggerToast('Image removed from gallery');
                              }
                            });
                          }}
                          style={{ marginTop: '8px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 7: VIDEOS MANAGER
              ================================================================= */}
          {activeTab === 'videos' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Machinery in Action Videos ({videos.length})</h1>
                  <p className="admin-page-subtitle">Manage YouTube demonstration videos, machine trials, and factory tour recordings.</p>
                </div>
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddVideoOpen(true); }} className="btn btn-orange">
                  <Plus size={18} />
                  <span>Add Video</span>
                </button>
              </div>

              <div className="admin-videos-grid-list">
                {filteredVideos.map((vid) => (
                  <div key={vid.id} className="admin-card admin-video-item-card">
                    <div
                      className="admin-video-thumb-preview"
                      onClick={() => setSelectedVideoForPlay(vid)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      <img src={resolveImg(vid.image)} alt={vid.title} />
                      <div className="admin-video-play-badge"><PlayCircle size={32} /></div>
                      <span className="admin-video-duration">{vid.duration}</span>
                      {vid.category && (
                        <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0, 24, 39, 0.85)', color: '#FF9200', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(255, 146, 0, 0.4)' }}>
                          {vid.category}
                        </span>
                      )}
                    </div>
                    <div className="admin-video-item-info">
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#001827', lineHeight: 1.35, marginBottom: '8px' }}>
                        {vid.title}
                      </h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{vid.views}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => setSelectedVideoForPlay(vid)}
                            className="admin-table-view-btn"
                            title="Play Video"
                          >
                            Play
                          </button>
                          {vid.videoUrl && (
                            <a
                              href={vid.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="admin-icon-btn"
                              title="Open on YouTube"
                              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <ExternalLink size={15} />
                            </a>
                          )}
                          <button
                            onClick={() => {
                              const newTitle = prompt('Edit Video Title:', vid.title);
                              if (newTitle) {
                                const updated = videos.map(v => v.id === vid.id ? { ...v, title: newTitle } : v);
                                setVideos(updated);
                                saveStoredVideos(updated);
                                triggerToast('Video title updated');
                              }
                            }}
                            className="admin-icon-btn"
                            title="Edit Title"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              requestConfirm({
                                title: 'Remove Video',
                                message: 'Are you sure you want to remove this video demonstration?',
                                itemName: vid.title,
                                confirmText: 'Remove Video',
                                variant: 'danger',
                                onConfirm: () => {
                                  deleteVideo(vid.id);
                                  const updated = videos.filter(v => v.id !== vid.id);
                                  setVideos(updated);
                                  triggerToast('Video removed');
                                }
                              });
                            }}
                            className="admin-icon-btn text-danger"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 8: FAQS MANAGER
              ================================================================= */}
          {activeTab === 'faqs' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Frequently Asked Questions Manager</h1>
                  <p className="admin-page-subtitle">Manage client questions regarding machinery technical specifications, foundation, warranty and delivery.</p>
                </div>
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddFAQOpen(true); }} className="btn btn-orange">
                  <Plus size={18} />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="admin-faqs-stack-list">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="admin-card admin-faq-manage-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span className="admin-faq-cat-tag">{faq.category}</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            const newQ = prompt('Edit Question:', faq.question);
                            const newA = prompt('Edit Answer:', faq.answer);
                            if (newQ && newA) {
                              setFaqs(prev => prev.map(f => f.id === faq.id ? { ...f, question: newQ, answer: newA } : f));
                              triggerToast('FAQ updated successfully');
                            }
                          }}
                          className="admin-icon-btn"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setFaqs(prev => prev.filter(f => f.id !== faq.id));
                            triggerToast('FAQ deleted');
                          }}
                          className="admin-icon-btn text-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#001827', marginBottom: '8px' }}>{faq.question}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
          {/* =================================================================
              TAB 9: MACHINE DELIVERY LOCATIONS TRACKER
              ================================================================= */}
          {activeTab === 'locations' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Machine Delivery Locations & Dispatch Tracker</h1>
                  <p className="admin-page-subtitle">Track customer plant deliveries, dispatched machinery models, transit status and on-site commissioning across India.</p>
                </div>
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddLocationOpen(true); }} className="btn btn-orange">
                  <Plus size={18} />
                  <span>Add Delivery Location</span>
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div className="admin-filter-bar-row" style={{ marginBottom: '18px' }}>
                {(['All', 'Delivered & Operational', 'In Transit', 'Installation Ongoing'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDeliveryStatusFilter(filter)}
                    className={`admin-filter-pill ${deliveryStatusFilter === filter ? 'active' : ''}`}
                  >
                    {filter}
                    <span className="admin-pill-count">
                      {filter === 'All' ? locations.length : locations.filter(l => l.status === filter).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="admin-locations-grid-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                {filteredLocations.length === 0 ? (
                  <div className="admin-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
                    <MapPin size={36} style={{ color: '#CBD5E1', margin: '0 auto 12px' }} />
                    <p style={{ fontWeight: 600 }}>No machine delivery locations found matching your filter or search query.</p>
                  </div>
                ) : (
                  filteredLocations.map((loc) => {
                    const isDelivered = loc.status === 'Delivered & Operational';
                    const isInTransit = loc.status === 'In Transit';
                    return (
                      <div key={loc.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          {/* Card Top: Status Badge + State + Delete */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <span
                              style={{
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                padding: '3px 9px',
                                borderRadius: '12px',
                                background: isDelivered ? '#ECFDF5' : (isInTransit ? '#EFF6FF' : '#FFFBEB'),
                                color: isDelivered ? '#059669' : (isInTransit ? '#2563EB' : '#D97706'),
                                border: `1px solid ${isDelivered ? '#A7F3D0' : (isInTransit ? '#BFDBFE' : '#FDE68A')}`,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              {isDelivered && <CheckCircle size={12} />}
                              {isInTransit && <Truck size={12} />}
                              {!isDelivered && !isInTransit && <HardHat size={12} />}
                              {loc.status}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>{loc.state}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  requestConfirm({
                                    title: 'Remove Delivery Record',
                                    message: 'Are you sure you want to remove this machine delivery record?',
                                    itemName: `${loc.clientName} (${loc.state})`,
                                    confirmText: 'Remove Record',
                                    variant: 'danger',
                                    onConfirm: () => {
                                      const updated = locations.filter(l => l.id !== loc.id);
                                      saveDeliveryLocations(updated);
                                      triggerToast('Delivery location removed');
                                    }
                                  });
                                }}
                                className="admin-icon-btn text-danger"
                                style={{ padding: '2px' }}
                                title="Remove delivery location"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Client Name */}
                          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#001827', marginBottom: '6px' }}>
                            {loc.clientName}
                          </h3>

                          {/* Machine Model */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9200', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
                            <Package size={16} />
                            <span>{loc.machineModel}</span>
                          </div>

                          {/* City & State */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.84rem', marginBottom: '6px' }}>
                            <MapPin size={15} style={{ color: '#0284C7' }} />
                            <span>{loc.locationCity}, {loc.state}</span>
                          </div>

                          {/* Transport Vehicle */}
                          {loc.transportVehicle && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '0.8rem', marginBottom: '8px' }}>
                              <Truck size={14} />
                              <span>{loc.transportVehicle}</span>
                            </div>
                          )}

                          {/* Commissioning Notes */}
                          {loc.notes && (
                            <div style={{ fontSize: '0.78rem', color: '#475569', background: '#F8FAFC', padding: '7px 10px', borderRadius: '6px', borderLeft: '3px solid #FF9200', margin: '8px 0 12px' }}>
                              {loc.notes}
                            </div>
                          )}
                        </div>

                        {/* Card Footer: Date & Phone */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '10px', marginTop: '10px', fontSize: '0.84rem' }}>
                          <span style={{ color: '#64748B' }}>📅 {loc.deliveryDate}</span>
                          <a href={`tel:${loc.contactPhone}`} style={{ color: '#001827', fontWeight: 700, textDecoration: 'none' }}>
                            📞 {loc.contactPhone}
                          </a>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 10: USERS & ADMIN TEAM MANAGEMENT
              ================================================================= */}
          {activeTab === 'users' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Admin & Staff User Management</h1>
                  <p className="admin-page-subtitle">Manage authorized administrators, roles, login credentials and system access permissions.</p>
                </div>
                <button type="button" onClick={() => setIsAddUserOpen(true)} className="btn btn-orange">
                  <UserPlus size={18} />
                  <span>Add New User</span>
                </button>
              </div>

              {/* Metric Stat Cards */}
              <div className="admin-metrics-grid" style={{ marginBottom: '20px' }}>
                <div className="admin-metric-card">
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-orange-light text-orange">
                      <Users size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Total Users</span>
                      <span className="admin-metric-num">{usersList.length}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                      <ShieldCheck size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Super Admins</span>
                      <span className="admin-metric-num">{usersList.filter(u => u.role === 'Super Admin').length}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-blue-light" style={{ color: '#0284c7' }}>
                      <HardHat size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Admins</span>
                      <span className="admin-metric-num">{usersList.filter(u => u.role === 'Admin').length}</span>
                    </div>
                  </div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-amber-light text-orange">
                      <BookOpen size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Editors</span>
                      <span className="admin-metric-num">{usersList.filter(u => u.role === 'Editor').length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Users Table Card */}
              <div className="admin-card">
                <div className="admin-table-responsive-wrapper">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email Address</th>
                        <th>Role</th>
                        <th>Registered Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                            No users found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((usr) => {
                          const isCurrent = currentUser?.id === usr.id;
                          const initials = usr.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                          return (
                            <tr key={usr.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: isCurrent ? '#FF9200' : '#001827',
                                    color: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.85rem'
                                  }}>
                                    {initials}
                                  </div>
                                  <div>
                                    <strong style={{ color: '#001827' }}>{usr.name}</strong>
                                    {isCurrent && (
                                      <span style={{ marginLeft: '6px', fontSize: '0.72rem', background: '#FF9200', color: '#fff', padding: '2px 6px', borderRadius: '8px', fontWeight: 700 }}>
                                        You
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td><span style={{ color: '#475569', fontSize: '0.88rem' }}>{usr.email}</span></td>
                              <td>
                                <span style={{
                                  fontSize: '0.76rem',
                                  fontWeight: 700,
                                  padding: '3px 10px',
                                  borderRadius: '12px',
                                  background: usr.role === 'Super Admin' ? '#F3E8FF' : (usr.role === 'Admin' ? '#E0F2FE' : '#F1F5F9'),
                                  color: usr.role === 'Super Admin' ? '#7E22CE' : (usr.role === 'Admin' ? '#0369A1' : '#475569'),
                                  border: `1px solid ${usr.role === 'Super Admin' ? '#DDD6FE' : (usr.role === 'Admin' ? '#BAE6FD' : '#E2E8F0')}`
                                }}>
                                  {usr.role}
                                </span>
                              </td>
                              <td>
                                <span className="admin-table-date">
                                  {new Date(usr.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </span>
                              </td>
                              <td>
                                <span className="admin-status-pill status-new" style={{ background: '#ECFDF5', color: '#059669', borderColor: '#A7F3D0' }}>
                                  Active
                                </span>
                              </td>
                              <td>
                                <button
                                  onClick={() => handleDeleteUser(usr.id, usr.name)}
                                  disabled={isCurrent}
                                  className={`admin-icon-btn ${isCurrent ? 'opacity-50' : 'text-danger'}`}
                                  title={isCurrent ? 'Cannot delete your own active session' : 'Delete user'}
                                  style={{ cursor: isCurrent ? 'not-allowed' : 'pointer' }}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 10: SETTINGS & COMPANY PROFILE
              ================================================================= */}
          {activeTab === 'settings' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Company Profile & Website Settings</h1>
                  <p className="admin-page-subtitle">Configure contact information, notification alerts, WhatsApp support and SEO metadata.</p>
                </div>
                <button onClick={handleSaveAllSettings} className="btn btn-orange">
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="admin-settings-stack">
                {/* 1. Admin Profile & Avatar Management */}
                <div className="admin-card" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #F1F5F9', paddingBottom: '14px' }}>
                    <div>
                      <h2 className="admin-card-title" style={{ margin: 0, fontSize: '1.15rem' }}>Admin Account & Profile Avatar</h2>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#64748B' }}>
                        Update your profile photo, display name, and system credentials.
                      </p>
                    </div>
                    <span style={{ fontSize: '0.78rem', background: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '20px', fontWeight: 600, border: '1px solid #DBEAFE' }}>
                      {currentUser?.role || 'Admin'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {/* Live Avatar Preview & Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid #FF9200',
                        boxShadow: '0 8px 24px rgba(255, 146, 0, 0.25)',
                        position: 'relative',
                        background: '#001827'
                      }}>
                        <img
                          src={profileAvatarPreview || currentUser?.avatar || "/favicon.png"}
                          alt="Admin Avatar Preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Avatar Preview</span>
                    </div>

                    {/* Upload / URL Controls */}
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <label className="form-field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Camera size={15} className="text-orange" />
                          <span>Change Profile Picture</span>
                        </label>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginTop: '6px' }}>
                          {/* File input button */}
                          <label
                            className="btn"
                            style={{
                              background: '#F8FAFC',
                              border: '1px solid #CBD5E1',
                              color: '#001827',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '9px 16px',
                              fontSize: '0.86rem',
                              fontWeight: 600,
                              borderRadius: '8px'
                            }}
                          >
                            <Upload size={16} className="text-orange" />
                            <span>Upload from Computer</span>
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/webp"
                              style={{ display: 'none' }}
                              onChange={handleAvatarFileUpload}
                            />
                          </label>

                          {/* Reset to default */}
                          <button
                            type="button"
                            className="btn"
                            style={{
                              background: '#FEE2E2',
                              color: '#DC2626',
                              border: '1px solid #FECACA',
                              padding: '9px 14px',
                              fontSize: '0.84rem',
                              fontWeight: 600,
                              borderRadius: '8px'
                            }}
                            onClick={handleResetAvatar}
                          >
                            Reset Default
                          </button>
                        </div>
                      </div>

                      {/* Or enter Image URL */}
                      <div>
                        <label className="form-field-label">Or Paste Image URL</label>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <input
                            type="text"
                            className="form-input-field"
                            placeholder="https://... or /favicon.png"
                            value={profileAvatarInput}
                            onChange={(e) => {
                              setProfileAvatarInput(e.target.value);
                              setProfileAvatarPreview(e.target.value);
                            }}
                            style={{ flex: 1 }}
                          />
                        </div>
                      </div>

                      {/* Quick Presets */}
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                          Quick Professional Avatar Presets:
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {[
                            '/favicon.png',
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
                          ].map((presetUrl, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setProfileAvatarInput(presetUrl);
                                setProfileAvatarPreview(presetUrl);
                              }}
                              style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: (profileAvatarPreview || currentUser?.avatar) === presetUrl ? '2px solid #FF9200' : '2px solid #E2E8F0',
                                boxShadow: (profileAvatarPreview || currentUser?.avatar) === presetUrl ? '0 0 0 2px rgba(255, 146, 0, 0.4)' : 'none',
                                transition: 'all 0.15s ease'
                              }}
                              title="Click to use preset"
                            >
                              <img src={presetUrl} alt="Preset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name and Email fields */}
                  <div className="enquiry-fields-grid" style={{ marginBottom: '16px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Administrator Display Name</label>
                      <input
                        type="text"
                        className="form-input-field"
                        value={profileNameInput}
                        onChange={(e) => setProfileNameInput(e.target.value)}
                      />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">Administrator Email</label>
                      <input
                        type="email"
                        className="form-input-field"
                        value={profileEmailInput}
                        onChange={(e) => setProfileEmailInput(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={handleSaveAllSettings}
                      className="btn btn-orange"
                      style={{ padding: '10px 20px', gap: '8px' }}
                    >
                      <Save size={16} />
                      <span>Update Profile & Avatar</span>
                    </button>
                  </div>
                </div>

                {/* 2. Maintenance Mode & System Availability Card */}
                <div
                  className="admin-card"
                  style={{
                    background: '#FFFFFF',
                    border: maintenanceConfig.enabled ? '2px solid #FF9200' : '1px solid #E2E8F0',
                    borderRadius: '14px',
                    padding: '24px',
                    transition: 'all 0.25s ease',
                    boxShadow: maintenanceConfig.enabled ? '0 8px 24px rgba(255, 146, 0, 0.12)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #F1F5F9', paddingBottom: '16px', flexWrap: 'wrap', gap: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Wrench size={19} className="text-orange" />
                          <h2 className="admin-card-title" style={{ margin: 0, fontSize: '1.15rem' }}>Maintenance Mode & System Status</h2>
                        </div>
                        <span style={{
                          fontSize: '0.78rem',
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontWeight: 700,
                          background: maintenanceConfig.enabled ? '#FFF7ED' : '#F0FDF4',
                          color: maintenanceConfig.enabled ? '#C2410C' : '#15803D',
                          border: maintenanceConfig.enabled ? '1px solid #FDBA74' : '1px solid #BBF7D0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: maintenanceConfig.enabled ? '#EA580C' : '#16A34A',
                            display: 'inline-block'
                          }} />
                          {maintenanceConfig.enabled ? 'Site Offline (Maintenance Active)' : 'Live & Operational'}
                        </span>
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#64748B' }}>
                        Enable maintenance mode to display a scheduled upgrade screen to regular visitors while maintaining admin access.
                      </p>
                    </div>

                    {/* Master Interactive Toggle Switch */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: maintenanceConfig.enabled ? '#EA580C' : '#64748B' }}>
                        {maintenanceConfig.enabled ? 'MAINTENANCE ON' : 'MAINTENANCE OFF'}
                      </span>
                      <div
                        onClick={() => {
                          const next = !maintenanceConfig.enabled;
                          handleSaveMaintenance({ enabled: next });
                        }}
                        style={{
                          width: '60px',
                          height: '32px',
                          background: maintenanceConfig.enabled ? '#FF9200' : '#CBD5E1',
                          borderRadius: '30px',
                          padding: '3px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'background 0.25s ease',
                          boxShadow: maintenanceConfig.enabled ? '0 2px 10px rgba(255, 146, 0, 0.4)' : 'none'
                        }}
                        title={`Click to ${maintenanceConfig.enabled ? 'Disable' : 'Enable'} Maintenance Mode`}
                      >
                        <div style={{
                          width: '26px',
                          height: '26px',
                          background: '#FFFFFF',
                          borderRadius: '50%',
                          transform: maintenanceConfig.enabled ? 'translateX(28px)' : 'translateX(0)',
                          transition: 'transform 0.25s ease',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.25)'
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Settings Fields Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="enquiry-fields-grid">
                      <div className="form-group-item">
                        <label className="form-field-label">Maintenance Headline / Title</label>
                        <input
                          type="text"
                          className="form-input-field"
                          value={maintenanceConfig.title}
                          onChange={(e) => setMaintenanceConfig(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Scheduled Machinery Infrastructure Maintenance"
                        />
                      </div>

                      <div className="form-group-item">
                        <label className="form-field-label">Estimated Back Online Duration</label>
                        <input
                          type="text"
                          className="form-input-field"
                          value={maintenanceConfig.estimatedTime}
                          onChange={(e) => setMaintenanceConfig(prev => ({ ...prev, estimatedTime: e.target.value }))}
                          placeholder="e.g. Back online today in approx. 2 hours"
                        />
                      </div>
                    </div>

                    <div className="form-group-item">
                      <label className="form-field-label">Public Maintenance Notice Message</label>
                      <textarea
                        className="form-textarea-field"
                        rows={2}
                        value={maintenanceConfig.message}
                        onChange={(e) => setMaintenanceConfig(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Detailed message explaining the upgrade to visiting clients..."
                      ></textarea>
                    </div>

                    <div className="enquiry-fields-grid">
                      <div className="form-group-item">
                        <label className="form-field-label">Emergency Customer Hotline</label>
                        <input
                          type="text"
                          className="form-input-field"
                          value={maintenanceConfig.emergencyPhone}
                          onChange={(e) => setMaintenanceConfig(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                          placeholder="+91 93429 19060"
                        />
                      </div>

                      <div className="form-group-item">
                        <label className="form-field-label">Emergency Support Email</label>
                        <input
                          type="email"
                          className="form-input-field"
                          value={maintenanceConfig.emergencyEmail}
                          onChange={(e) => setMaintenanceConfig(prev => ({ ...prev, emergencyEmail: e.target.value }))}
                          placeholder="info@jupiterindustries.com"
                        />
                      </div>
                    </div>

                    {/* Admin Access Bypass and Actions Row */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                        <input
                          type="checkbox"
                          checked={maintenanceConfig.allowAdminBypass}
                          onChange={(e) => setMaintenanceConfig(prev => ({ ...prev, allowAdminBypass: e.target.checked }))}
                          style={{ width: '18px', height: '18px', accentColor: '#FF9200', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.86rem', color: '#1E293B', fontWeight: 600 }}>
                          Allow Logged-in Administrators to Bypass Maintenance Mode and Preview Live Site
                        </span>
                      </label>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => setIsMaintenancePreviewModalOpen(true)}
                          className="btn"
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#001827',
                            padding: '9px 16px',
                            fontSize: '0.84rem',
                            fontWeight: 600,
                            borderRadius: '8px',
                            cursor: 'pointer'
                          }}
                        >
                          <Eye size={15} style={{ display: 'inline', marginRight: '6px' }} />
                          <span>Preview Maintenance Screen</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSaveMaintenance()}
                          className="btn btn-orange"
                          style={{ padding: '9px 18px', fontSize: '0.84rem', fontWeight: 600, borderRadius: '8px' }}
                        >
                          <Save size={15} />
                          <span>Save Maintenance Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>Company Information & Contact</h2>
                  <div className="enquiry-fields-grid" style={{ marginBottom: '16px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Company Legal Name</label>
                      <input
                        type="text"
                        className="form-input-field"
                        value={companySettings.legalName}
                        onChange={(e) => setCompanySettings((prev: CompanySettings) => ({ ...prev, legalName: e.target.value }))}
                      />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">Primary Hotline Phone</label>
                      <input
                        type="text"
                        className="form-input-field"
                        value={companySettings.phone}
                        onChange={(e) => setCompanySettings((prev: CompanySettings) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="enquiry-fields-grid" style={{ marginBottom: '16px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Official Email</label>
                      <input
                        type="email"
                        className="form-input-field"
                        value={companySettings.email}
                        onChange={(e) => setCompanySettings((prev: CompanySettings) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">WhatsApp Support Number</label>
                      <input
                        type="text"
                        className="form-input-field"
                        value={companySettings.whatsapp}
                        onChange={(e) => setCompanySettings((prev: CompanySettings) => ({ ...prev, whatsapp: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="form-group-item" style={{ marginBottom: '16px' }}>
                    <label className="form-field-label">Factory & Head Office Address</label>
                    <textarea
                      className="form-textarea-field"
                      rows={2}
                      value={companySettings.address}
                      onChange={(e) => setCompanySettings((prev: CompanySettings) => ({ ...prev, address: e.target.value }))}
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={handleSaveAllSettings}
                      className="btn btn-orange"
                      style={{ padding: '10px 20px', gap: '8px' }}
                    >
                      <Save size={16} />
                      <span>Save Company Details</span>
                    </button>
                  </div>
                </div>

                <div className="admin-card">
                  <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>SEO & Meta Information</h2>
                  <div className="form-group-item" style={{ marginBottom: '16px' }}>
                    <label className="form-field-label">Website Meta Title</label>
                    <input
                      type="text"
                      className="form-input-field"
                      value={seoSettings.metaTitle}
                      onChange={(e) => setSeoSettings((prev: SeoSettings) => ({ ...prev, metaTitle: e.target.value }))}
                    />
                  </div>
                  <div className="form-group-item" style={{ marginBottom: '16px' }}>
                    <label className="form-field-label">Meta Description</label>
                    <textarea
                      className="form-textarea-field"
                      rows={2}
                      value={seoSettings.metaDescription}
                      onChange={(e) => setSeoSettings((prev: SeoSettings) => ({ ...prev, metaDescription: e.target.value }))}
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={handleSaveAllSettings}
                      className="btn btn-orange"
                      style={{ padding: '10px 20px', gap: '8px' }}
                    >
                      <Save size={16} />
                      <span>Save SEO Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Admin Footer */}
          <footer className="admin-page-footer">
            <span>© 2026 Jupiter Industries, All rights reserved.</span>
            <span className="admin-footer-motto" style={{ color: '#FF9200', fontWeight: 600 }}>Crafted and Maintained by Ikasle Business Group</span>
          </footer>
        </main>
      </div>

      {/* ---------------------------------------------------------------------
          MODAL 1: VIEW ENQUIRY DETAILS MODAL
          --------------------------------------------------------------------- */}
      {selectedEnquiry && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="modal-content-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>Customer Enquiry Details</h3>
                <span style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>ID: {selectedEnquiry.id} • {selectedEnquiry.date}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedEnquiry(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '1.1rem', color: '#001827' }}>{selectedEnquiry.name}</strong>
                  <span className={`admin-status-pill ${selectedEnquiry.status === 'New' ? 'status-new' : 'status-contacted'}`}>
                    {selectedEnquiry.status}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: '#334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={15} className="text-orange" />
                    <a href={`tel:${selectedEnquiry.phone}`} style={{ color: '#001827', fontWeight: 600 }}>{selectedEnquiry.phone}</a>
                  </div>
                  {selectedEnquiry.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={15} className="text-orange" />
                      <span>{selectedEnquiry.email}</span>
                    </div>
                  )}
                  {selectedEnquiry.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={15} className="text-orange" />
                      <span>{selectedEnquiry.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Interested Machinery</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#001827', marginTop: '4px' }}>
                  {selectedEnquiry.product}
                </div>
              </div>

              {selectedEnquiry.message && (
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Customer Message</span>
                  <p style={{ background: '#F1F5F9', padding: '12px', borderRadius: '6px', fontSize: '0.9rem', color: '#334155', marginTop: '4px', lineHeight: 1.5 }}>
                    "{selectedEnquiry.message}"
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  onClick={() => handleToggleStatus(selectedEnquiry.id)}
                  className="btn btn-orange"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <CheckCircle size={16} />
                  <span>Mark as {selectedEnquiry.status === 'New' ? 'Contacted' : (selectedEnquiry.status === 'Contacted' ? 'Closed' : 'New')}</span>
                </button>
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedEnquiry.name)},%20this%20is%20Jupiter%20Industries%20regarding%20your%20enquiry%20for%20${encodeURIComponent(selectedEnquiry.product)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{ background: '#25D366', color: '#FFFFFF', flex: 1, justifyContent: 'center' }}
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 2: ADD NEW PRODUCT MODAL WITH TECHNICAL SPECIFICATIONS BUILDER
          --------------------------------------------------------------------- */}
      {isAddProductOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddProductOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '860px', maxHeight: '92vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#001827' }}>Add Machinery Product & Specifications</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Publish machine models with multi-tier Technical Specification tables</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddProductOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={async (e) => {
              e.preventDefault();
              if (!newProduct.name.trim()) {
                alert('Please enter a machine model title');
                return;
              }
              const newProdItem = await addProduct({
                name: newProduct.name,
                brandTag: newProduct.brandTag || '',
                category: newProduct.category,
                capacity: newProduct.capacity || '',
                power: newProduct.power || '',
                brickSize: newProduct.brickSize || '',
                image: resolveImg(newProduct.image) || '',
                galleryImages: (newProduct.galleryImages || []).filter(img => Boolean(img && img.trim())),
                description: newProduct.description || '',
                featureBadges: (newProduct.featureBadges || []).filter(b => Boolean(b && b.trim())),
                highlights: (newProduct.highlights || []).filter(h => h && h.title && h.title.trim()),
                advantages: (newProduct.advantages || []).filter(a => a && a.title && a.title.trim()),
                keyFeatures: (newProduct.keyFeatures || []).filter(Boolean),
                specTableColumns: newProduct.specColumns,
                specTableRows: (newProduct.specRows || []).filter(r => Object.values(r || {}).some(v => v && v.trim()))
              });
              setProducts(getStoredProducts());
              setIsAddProductOpen(false);
              triggerToast(`Product "${newProdItem?.name || newProduct.name}" published successfully!`);
            }}>

              {/* Basic Fields */}
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Header Subtitle / Brand</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. JUPITER EQUIPMENTS"
                    value={newProduct.brandTag || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, brandTag: e.target.value })}
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Machine Model / Product Title <span className="text-orange">*</span></label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 4 Brick Rotary Machine"
                    value={newProduct.name || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Category</label>
                  <select
                    className="form-input-field"
                    value={newProduct.category || 'Fly Ash Brick Machine'}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="Fly Ash Brick Machine">Fly Ash Brick Machine</option>
                    <option value="Hollow and Solid Block Machine">Hollow and Solid Block Machine</option>
                    <option value="Inter Block Making Machine">Inter Block Making Machine</option>
                    <option value="Paver Block Machine">Paver Block Machine</option>
                    <option value="Batching Plant">Batching Plant</option>
                    <option value="Storage Silo">Storage Silo</option>
                    <option value="Machine Spares">Machine Spares</option>
                  </select>
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Main Image URL / Upload</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="https://... or upload below"
                    value={resolveImg(newProduct.image)}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  />
                </div>
              </div>

              {/* 3 Quick Specs: Capacity, Power, Brick/Mold Size */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Production Capacity</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 15,000 – 20,000 Bricks/day"
                    value={newProduct.capacity || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, capacity: e.target.value })}
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Total Connected Power</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 15 H.P Electric Motor"
                    value={newProduct.power || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, power: e.target.value })}
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Brick / Mold Size</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 230 x 110 x 75 to 230 x 200 x 100"
                    value={newProduct.brickSize || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, brickSize: e.target.value })}
                  />
                </div>
              </div>

              {/* Main Machine Photo Upload */}
              <ImageUploadField
                label="Primary Machine Photo (Yellow Border Presentation Available)"
                value={resolveImg(newProduct.image)}
                onChange={(val) => setNewProduct({ ...newProduct, image: val })}
                helperText="Upload equipment picture (PNG, JPG, WEBP)"
              />

              {/* Additional Gallery Thumbnails */}
              <div style={{ marginTop: '14px', marginBottom: '14px', padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <label className="form-field-label" style={{ marginBottom: '8px', display: 'block', fontWeight: 700 }}>
                  Additional Gallery Thumbnails (Product Details Page)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <ImageUploadField
                    label="Thumbnail 1"
                    value={resolveImg(newProduct.galleryImages?.[0] || '')}
                    onChange={(val) => {
                      const nextG = [...(newProduct.galleryImages || [])];
                      nextG[0] = val;
                      setNewProduct({ ...newProduct, galleryImages: nextG });
                    }}
                    helperText="Angle 1 / Component view"
                  />
                  <ImageUploadField
                    label="Thumbnail 2"
                    value={resolveImg(newProduct.galleryImages?.[1] || '')}
                    onChange={(val) => {
                      const nextG = [...(newProduct.galleryImages || [])];
                      nextG[1] = val;
                      setNewProduct({ ...newProduct, galleryImages: nextG });
                    }}
                    helperText="Angle 2 / Output sample view"
                  />
                </div>
              </div>

              {/* 4 Feature Badges (Key Selling Points) */}
              <div style={{ marginBottom: '14px', padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <label className="form-field-label" style={{ marginBottom: '8px', display: 'block', fontWeight: 700 }}>
                  4 Feature Badges (Quick Highlights)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[0, 1, 2, 3].map((bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF9200', background: '#FFF2E0', padding: '3px 7px', borderRadius: '4px' }}>
                        #{bIdx + 1}
                      </span>
                      <input
                        type="text"
                        className="form-input-field"
                        placeholder={`Feature Badge ${bIdx + 1}`}
                        value={newProduct.featureBadges?.[bIdx] || ''}
                        onChange={(e) => {
                          const nextBadges = [...(newProduct.featureBadges || ['', '', '', ''])];
                          nextBadges[bIdx] = e.target.value;
                          setNewProduct({ ...newProduct, featureBadges: nextBadges });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group-item" style={{ marginTop: '14px', marginBottom: '14px' }}>
                <label className="form-field-label">Machine Overview & Description</label>
                <textarea
                  rows={3}
                  className="form-textarea-field"
                  placeholder="Engineered for high-compaction fly ash brick and concrete block manufacturing..."
                  value={newProduct.description || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
              </div>

              {/* TECHNICAL SPECIFICATIONS MATRIX TABLE BUILDER */}
              <div style={{ marginTop: '20px', marginBottom: '20px', border: '1.5px solid #E2E8F0', borderRadius: '10px', padding: '18px', background: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#00233D', color: '#FF9200', padding: '4px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 800, border: '1.5px solid #FF9200' }}>
                      Technical Specifications
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Customizable specifications table (edit headers & rows)</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="admin-table-view-btn"
                      onClick={() => {
                        const colName = prompt('Enter New Column Name:', `Specification ${((newProduct.specColumns || []).length + 1)}`);
                        if (colName && !(newProduct.specColumns || []).includes(colName)) {
                          const updatedCols = [...(newProduct.specColumns || []), colName];
                          const updatedRows = (newProduct.specRows || []).map(r => ({ ...(r || {}), [colName]: '' }));
                          setNewProduct({ ...newProduct, specColumns: updatedCols, specRows: updatedRows });
                        }
                      }}
                    >
                      <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      <span>Add Column</span>
                    </button>
                    <button
                      type="button"
                      className="admin-table-view-btn"
                      style={{ background: '#001827', color: '#FFFFFF' }}
                      onClick={() => {
                        const newRowObj: Record<string, string> = {};
                        (newProduct.specColumns || []).forEach(col => { newRowObj[col] = ''; });
                        setNewProduct({ ...newProduct, specRows: [...(newProduct.specRows || []), newRowObj] });
                      }}
                    >
                      <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      <span>Add Row</span>
                    </button>
                    <button
                      type="button"
                      className="admin-table-view-btn"
                      style={{ background: '#FEE2E2', color: '#DC2626', borderColor: '#FECACA' }}
                      onClick={() => {
                        const blankRow: Record<string, string> = {};
                        (newProduct.specColumns || []).forEach(col => { blankRow[col] = ''; });
                        setNewProduct({ ...newProduct, specRows: [blankRow] });
                      }}
                      title="Clear all rows"
                    >
                      <Trash2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      <span>Clear Table</span>
                    </button>
                  </div>
                </div>

                {/* Table Editor Grid */}
                <div style={{ overflowX: 'auto', border: '1px solid #CBD5E1', borderRadius: '6px', background: '#FFFFFF' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #CBD5E1' }}>
                        {(newProduct.specColumns || []).map((col, cIdx) => (
                          <th key={cIdx} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: '#001827', borderRight: '1px solid #CBD5E1', minWidth: '160px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                              <input
                                type="text"
                                value={col}
                                title="Click to rename column header"
                                style={{
                                  fontWeight: 700,
                                  fontSize: '0.82rem',
                                  color: '#001827',
                                  border: '1px solid #CBD5E1',
                                  borderRadius: '4px',
                                  padding: '4px 6px',
                                  background: '#FFFFFF',
                                  width: '100%'
                                }}
                                onChange={(e) => {
                                  const newColName = e.target.value;
                                  const oldColName = col;
                                  const updatedCols = [...(newProduct.specColumns || [])];
                                  updatedCols[cIdx] = newColName;
                                  const updatedRows = (newProduct.specRows || []).map(r => {
                                    const nr: Record<string, string> = {};
                                    Object.entries(r || {}).forEach(([k, v]) => {
                                      if (k === oldColName) nr[newColName] = v;
                                      else nr[k] = v;
                                    });
                                    return nr;
                                  });
                                  setNewProduct({ ...newProduct, specColumns: updatedCols, specRows: updatedRows });
                                }}
                              />
                              {(newProduct.specColumns || []).length > 1 && (
                                <button
                                  type="button"
                                  title={`Remove "${col}" column`}
                                  style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 800, padding: '2px 4px' }}
                                  onClick={() => {
                                    const updatedCols = (newProduct.specColumns || []).filter((_, idx) => idx !== cIdx);
                                    setNewProduct({ ...newProduct, specColumns: updatedCols });
                                  }}
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </th>
                        ))}
                        <th style={{ width: '50px', padding: '10px', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(newProduct.specRows || []).map((row, rIdx) => {
                        if (!row) return null;
                        return (
                          <tr key={rIdx} style={{ borderBottom: '1px solid #E2E8F0', background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                            {(newProduct.specColumns || []).map((col, cIdx) => {
                              const cellVal = row && typeof row[col] === 'string' ? row[col] : (row && row[col] != null ? String(row[col]) : '');
                              return (
                                <td key={cIdx} style={{ padding: '6px 8px', borderRight: '1px solid #E2E8F0' }}>
                                  <input
                                    type="text"
                                    value={cellVal}
                                    placeholder={cIdx === 0 ? 'e.g. Capacity / Power' : 'e.g. Details or value'}
                                    style={{ width: '100%', padding: '6px 8px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.85rem' }}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      const updatedRows = [...(newProduct.specRows || [])];
                                      updatedRows[rIdx] = { ...(updatedRows[rIdx] || {}), [col]: val };
                                      setNewProduct({ ...newProduct, specRows: updatedRows });
                                    }}
                                  />
                                </td>
                              );
                            })}
                            <td style={{ textAlign: 'center', padding: '6px' }}>
                              <button
                                type="button"
                                title="Delete Row"
                                style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
                                onClick={() => {
                                  const updatedRows = (newProduct.specRows || []).filter((_, idx) => idx !== rIdx);
                                  setNewProduct({ ...newProduct, specRows: updatedRows.length > 0 ? updatedRows : [{ [newProduct.specColumns[0] || 'Parameter']: '', [newProduct.specColumns[1] || 'Details']: '' }] });
                                }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* LIVE PREVIEW BOX */}
              <div style={{ background: '#FFFFFF', border: '2px dashed #CBD5E1', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF9200', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                  Live Preview on Website
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '24px', alignItems: 'center' }}>
                  {/* Left: Yellow framed Image */}
                  <div style={{ border: '4px solid #FF9200', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', minHeight: '220px' }}>
                    <img
                      src={resolveImg(newProduct.image) || resolveImg(IMAGES.flyAshMachine) || resolveImg(IMAGES.performanceMachine) || ''}
                      alt="Preview"
                      style={{ maxHeight: '190px', width: 'auto', objectFit: 'contain' }}
                    />
                  </div>

                  {/* Right: Technical Specs Table */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00233D', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {newProduct.brandTag || 'JUPITER EQUIPMENTS'}
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00233D', marginBottom: '14px', lineHeight: 1.1 }}>
                      {newProduct.name || 'Machine Model Title'}
                    </h2>

                    <div style={{ display: 'inline-block', background: '#00233D', color: '#FFFFFF', padding: '5px 14px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 800, border: '1.5px solid #FF9200', marginBottom: '10px' }}>
                      Technical Specifications
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', border: '1px solid #CBD5E1' }}>
                      <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '1.5px solid #CBD5E1' }}>
                          {(newProduct.specColumns || []).map((col, idx) => (
                            <th key={idx} style={{ padding: '6px 8px', textAlign: 'left', borderRight: '1px solid #CBD5E1', color: '#001827', fontWeight: 700 }}>
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(newProduct.specRows || []).filter(Boolean).slice(0, 5).map((r, rIdx) => (
                          <tr key={rIdx} style={{ borderBottom: '1px solid #E2E8F0', background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                            {(newProduct.specColumns || []).map((col, cIdx) => {
                              const val = r && typeof r[col] === 'string' ? r[col] : (r && r[col] != null ? String(r[col]) : '-');
                              return (
                                <td key={cIdx} style={{ padding: '5px 8px', borderRight: '1px solid #CBD5E1', color: '#334155' }}>
                                  {val}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {(newProduct.specRows || []).length > 5 && (
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
                        + {(newProduct.specRows || []).length - 5} more specification tiers
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-orange" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                  <Plus size={18} />
                  <span>Publish Product & Technical Specifications</span>
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsAddProductOpen(false)}
                  style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #CBD5E1', padding: '14px 20px' }}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 2.5: VIEW TECHNICAL SPECIFICATIONS TABLE MODAL
          --------------------------------------------------------------------- */}
      {selectedProductForSpec && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedProductForSpec(null)}>
          <div className="modal-content-card" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#001827' }}>
                  {selectedProductForSpec.name} — Technical Specifications
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  {selectedProductForSpec.brandTag || 'JUPITER EQUIPMENTS'} • Category: {selectedProductForSpec.category}
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedProductForSpec(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-content">
              <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '28px', alignItems: 'center', marginBottom: '24px' }}>
                {/* Yellow framed machine image */}
                <div style={{ border: '4px solid #FF9200', borderRadius: '10px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', minHeight: '260px' }}>
                  <img
                    src={resolveImg(selectedProductForSpec.image)}
                    alt={selectedProductForSpec.name}
                    style={{ maxHeight: '230px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#00233D', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {selectedProductForSpec.brandTag || 'JUPITER EQUIPMENTS'}
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#00233D', marginBottom: '12px' }}>
                    {selectedProductForSpec.name}
                  </h2>

                  <div style={{ display: 'inline-block', background: '#00233D', color: '#FFFFFF', padding: '6px 16px', borderRadius: '4px', fontSize: '0.88rem', fontWeight: 800, border: '1.5px solid #FF9200', marginBottom: '14px' }}>
                    Technical Specifications
                  </div>

                  {selectedProductForSpec.specTableColumns && selectedProductForSpec.specTableRows ? (
                    <div style={{ overflowX: 'auto', border: '1.5px solid #CBD5E1', borderRadius: '6px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #CBD5E1' }}>
                            {selectedProductForSpec.specTableColumns.map((col, idx) => (
                              <th key={idx} style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #CBD5E1', color: '#001827', fontWeight: 700 }}>
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProductForSpec.specTableRows.map((r, rIdx) => (
                            <tr key={rIdx} style={{ borderBottom: '1px solid #E2E8F0', background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                              {selectedProductForSpec.specTableColumns?.map((col, cIdx) => {
                                const cellText = r && typeof r[col] === 'string' ? r[col] : (r && r[col] != null ? String(r[col]) : '-');
                                return (
                                  <td key={cIdx} style={{ padding: '7px 10px', borderRight: '1px solid #E2E8F0', color: '#334155' }}>
                                    {cellText}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.9rem' }}>
                      <p><strong>Capacity:</strong> {selectedProductForSpec.capacity}</p>
                      <p style={{ marginTop: '6px' }}><strong>Power:</strong> {selectedProductForSpec.power}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedProductForSpec.description && (
                <div style={{ background: '#F1F5F9', padding: '14px 18px', borderRadius: '8px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, marginBottom: '16px' }}>
                  <strong>Description:</strong> {selectedProductForSpec.description}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={getProductLiveUrl(selectedProductForSpec)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{ background: '#F1F5F9', color: '#00233D', border: '1px solid #CBD5E1', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={15} />
                  <span>View on Live Website</span>
                </a>
                <button
                  type="button"
                  className="btn"
                  style={{ background: '#00233D', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => {
                    const p = selectedProductForSpec;
                    setSelectedProductForSpec(null);
                    handleOpenEditProduct(p);
                  }}
                >
                  <Edit size={15} />
                  <span>Edit Product</span>
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => {
                    requestConfirm({
                      title: 'Delete Product',
                      message: 'Are you sure you want to delete this product from the machinery catalog?',
                      itemName: selectedProductForSpec.name,
                      confirmText: 'Delete Product',
                      variant: 'danger',
                      icon: 'trash',
                      onConfirm: async () => {
                        await deleteProduct(selectedProductForSpec.id);
                        setProducts(getStoredProducts());
                        setSelectedProductForSpec(null);
                        triggerToast('Product removed from catalog');
                      }
                    });
                  }}
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>
                <button type="button" className="btn btn-orange" onClick={() => setSelectedProductForSpec(null)}>
                  <span>Close Specifications</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------------------------
          MODAL 2.8: EDIT MACHINERY PRODUCT & SPECIFICATIONS MODAL
          --------------------------------------------------------------------- */}
      {editingProduct && (
        <div className="modal-backdrop-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal-content-card" style={{ maxWidth: '860px', maxHeight: '92vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#001827' }}>
                  Edit Machinery Model & Specifications
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  ID: {editingProduct.id} • Category: {editingProduct.category}
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setEditingProduct(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Sub-Tabs Header Bar */}
            <div style={{
              display: 'flex',
              gap: '4px',
              borderBottom: '2px solid #E2E8F0',
              padding: '0 20px',
              background: '#F8FAFC',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}>
              {[
                { id: 'overview', label: '1. Overview & Media' },
                { id: 'highlights', label: `2. Product Highlights (${(editingProduct.highlights || []).length})` },
                { id: 'specifications', label: '3. Technical Specs' },
                { id: 'features', label: `4. Key Features (${(editingProduct.keyFeatures || []).length})` },
                { id: 'advantages', label: `5. Advantages (${(editingProduct.advantages || []).length})` },
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setEditProductTab(t.id as any)}
                  style={{
                    padding: '12px 14px',
                    fontWeight: editProductTab === t.id ? 800 : 600,
                    color: editProductTab === t.id ? '#FF9200' : '#475569',
                    borderBottom: editProductTab === t.id ? '3px solid #FF9200' : '3px solid transparent',
                    background: 'none',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form
              className="modal-body-content"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!editingProduct.name.trim()) {
                  alert('Please enter a machine model title');
                  return;
                }
                const updated = await updateProduct(editingProduct.id, {
                  name: editingProduct.name,
                  brandTag: editingProduct.brandTag || 'JUPITER EQUIPMENTS',
                  category: editingProduct.category,
                  capacity: editingProduct.capacity,
                  power: editingProduct.power,
                  brickSize: editingProduct.brickSize,
                  image: resolveImg(editingProduct.image),
                  galleryImages: (editingProduct.galleryImages || []).filter(Boolean),
                  description: editingProduct.description,
                  featureBadges: (editingProduct.featureBadges || []).filter(Boolean),
                  highlights: (editingProduct.highlights || []).filter(h => h && h.title && h.title.trim()),
                  advantages: (editingProduct.advantages || []).filter(a => a && a.title && a.title.trim()),
                  keyFeatures: (editingProduct.keyFeatures || []).filter(Boolean),
                  specTableColumns: editingProduct.specTableColumns,
                  specTableRows: editingProduct.specTableRows
                });
                setProducts(getStoredProducts());
                setEditingProduct(null);
                triggerToast(`Product "${updated?.name || editingProduct.name}" updated successfully!`);
              }}
            >
              {/* TAB 1: OVERVIEW & MEDIA */}
              {editProductTab === 'overview' && (
                <div>
                  <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Header Subtitle / Brand</label>
                      <input
                        type="text"
                        className="form-input-field"
                        placeholder="e.g. Fly Ash Making Machine & Rotary Hydraulic Plants"
                        value={editingProduct.brandTag || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, brandTag: e.target.value })}
                      />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">Machine Model / Product Title <span className="text-orange">*</span></label>
                      <input
                        type="text"
                        className="form-input-field"
                        value={editingProduct.name || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Category</label>
                      <select
                        className="form-input-field"
                        value={editingProduct.category || 'Fly Ash Brick Machine'}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      >
                        <option value="Fly Ash Brick Machine">Fly Ash Brick Machine</option>
                        <option value="Hollow and Solid Block Machine">Hollow and Solid Block Machine</option>
                        <option value="Inter Block Making Machine">Inter Block Making Machine</option>
                        <option value="Paver Block Machine">Paver Block Machine</option>
                        <option value="Batching Plant">Batching Plant</option>
                        <option value="Storage Silo">Storage Silo</option>
                        <option value="Machine Spares">Machine Spares</option>
                      </select>
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">Main Image URL / Upload</label>
                      <input
                        type="text"
                        className="form-input-field"
                        placeholder="https://... or upload below"
                        value={resolveImg(editingProduct.image)}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* 3 Quick Specs: Capacity, Power, Brick/Mold Size */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Production Capacity</label>
                      <input
                        type="text"
                        className="form-input-field"
                        placeholder="e.g. 10,000 – 20,000 Bricks / Day"
                        value={editingProduct.capacity || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                      />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">Total Connected Power</label>
                      <input
                        type="text"
                        className="form-input-field"
                        placeholder="e.g. 15 H.P + 2 H.P / 7.5 H.P + 2 H.P"
                        value={editingProduct.power || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, power: e.target.value })}
                      />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">Brick / Mold Size</label>
                      <input
                        type="text"
                        className="form-input-field"
                        placeholder="e.g. 230 x 110 x 75 mm (Standard)"
                        value={editingProduct.brickSize || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, brickSize: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Primary Machine Photo */}
                  <ImageUploadField
                    label="Primary Machine Equipment Picture"
                    value={resolveImg(editingProduct.image)}
                    onChange={(val) => setEditingProduct({ ...editingProduct, image: val })}
                    helperText="Upload equipment picture (PNG, JPG, WEBP)"
                  />

                  {/* Additional Gallery Thumbnails */}
                  <div style={{ marginTop: '14px', marginBottom: '14px', padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <label className="form-field-label" style={{ marginBottom: '8px', display: 'block', fontWeight: 700 }}>
                      Additional Gallery Thumbnails (Product Details Page Carousel)
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <ImageUploadField
                        label="Thumbnail 1"
                        value={resolveImg(editingProduct.galleryImages?.[0] || '')}
                        onChange={(val) => {
                          const nextG = [...(editingProduct.galleryImages || [])];
                          nextG[0] = val;
                          setEditingProduct({ ...editingProduct, galleryImages: nextG });
                        }}
                        helperText="Angle 1 / Component view"
                      />
                      <ImageUploadField
                        label="Thumbnail 2"
                        value={resolveImg(editingProduct.galleryImages?.[1] || '')}
                        onChange={(val) => {
                          const nextG = [...(editingProduct.galleryImages || [])];
                          nextG[1] = val;
                          setEditingProduct({ ...editingProduct, galleryImages: nextG });
                        }}
                        helperText="Angle 2 / Output sample view"
                      />
                    </div>
                  </div>

                  {/* 4 Feature Badges (Key Selling Points) */}
                  <div style={{ marginBottom: '14px', padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <label className="form-field-label" style={{ marginBottom: '8px', display: 'block', fontWeight: 700 }}>
                      4 Feature Badges (Quick Highlights in 2x2 Grid)
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[0, 1, 2, 3].map((bIdx) => (
                        <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF9200', background: '#FFF2E0', padding: '3px 7px', borderRadius: '4px' }}>
                            #{bIdx + 1}
                          </span>
                          <input
                            type="text"
                            className="form-input-field"
                            placeholder={`Feature Badge ${bIdx + 1}`}
                            value={editingProduct.featureBadges?.[bIdx] || ''}
                            onChange={(e) => {
                              const nextBadges = [...(editingProduct.featureBadges || ['', '', '', ''])];
                              nextBadges[bIdx] = e.target.value;
                              setEditingProduct({ ...editingProduct, featureBadges: nextBadges });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group-item" style={{ marginTop: '14px', marginBottom: '14px' }}>
                    <label className="form-field-label">Machine Overview & Description</label>
                    <textarea
                      rows={3}
                      className="form-textarea-field"
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCT HIGHLIGHTS (CARDS) */}
              {editProductTab === 'highlights' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#00233D' }}>
                        Product Highlights Cards
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                        These cards appear in the 2x2 grid under the "Product Highlights" tab on the live website.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-orange"
                      style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                      onClick={() => {
                        const currentH = editingProduct.highlights || [];
                        setEditingProduct({
                          ...editingProduct,
                          highlights: [...currentH, { title: `New Highlight ${currentH.length + 1}`, description: '' }]
                        });
                      }}
                    >
                      <Plus size={15} />
                      <span>Add Highlight Card</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {(editingProduct.highlights || []).map((hl, hIdx) => (
                      <div key={hIdx} style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF9200' }}>
                            Card #{hIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedH = (editingProduct.highlights || []).filter((_, idx) => idx !== hIdx);
                              setEditingProduct({ ...editingProduct, highlights: updatedH });
                            }}
                            className="admin-icon-btn text-danger"
                            title="Remove Card"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-input-field"
                          placeholder="Card Title (e.g. High Compaction Density)"
                          style={{ marginBottom: '8px', fontWeight: 700 }}
                          value={hl.title || ''}
                          onChange={(e) => {
                            const updatedH = [...(editingProduct.highlights || [])];
                            updatedH[hIdx] = { ...updatedH[hIdx], title: e.target.value };
                            setEditingProduct({ ...editingProduct, highlights: updatedH });
                          }}
                        />
                        <textarea
                          rows={2}
                          className="form-textarea-field"
                          placeholder="Card Description (e.g. Delivers sharp block corners, zero internal air voids...)"
                          value={hl.description || ''}
                          onChange={(e) => {
                            const updatedH = [...(editingProduct.highlights || [])];
                            updatedH[hIdx] = { ...updatedH[hIdx], description: e.target.value };
                            setEditingProduct({ ...editingProduct, highlights: updatedH });
                          }}
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TECHNICAL SPECIFICATIONS (MATRIX TABLE) */}
              {editProductTab === 'specifications' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#00233D' }}>
                        Technical Specifications Matrix Table
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Customizable specifications table (edit headers & rows)</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="admin-table-view-btn"
                        onClick={() => {
                          const colName = prompt('Enter New Column Name:', `Specification ${((editingProduct.specTableColumns || []).length + 1)}`);
                          const currentCols = editingProduct.specTableColumns || ['Parameter', 'Details'];
                          const currentRows = editingProduct.specTableRows || [];
                          if (colName && !currentCols.includes(colName)) {
                            const updatedCols = [...currentCols, colName];
                            const updatedRows = currentRows.map(r => ({ ...(r || {}), [colName]: '' }));
                            setEditingProduct({ ...editingProduct, specTableColumns: updatedCols, specTableRows: updatedRows });
                          }
                        }}
                      >
                        <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        <span>Add Column</span>
                      </button>
                      <button
                        type="button"
                        className="admin-table-view-btn"
                        style={{ background: '#001827', color: '#FFFFFF' }}
                        onClick={() => {
                          const currentCols = editingProduct.specTableColumns || ['Parameter', 'Details'];
                          const currentRows = editingProduct.specTableRows || [];
                          const newRowObj: Record<string, string> = {};
                          currentCols.forEach(col => { newRowObj[col] = ''; });
                          setEditingProduct({ ...editingProduct, specTableRows: [...currentRows, newRowObj] });
                        }}
                      >
                        <Plus size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        <span>Add Row</span>
                      </button>
                      <button
                        type="button"
                        className="admin-table-view-btn"
                        style={{ background: '#FEE2E2', color: '#DC2626', borderColor: '#FECACA' }}
                        onClick={() => {
                          const currentCols = editingProduct.specTableColumns || ['Parameter', 'Details'];
                          const blankRow: Record<string, string> = {};
                          currentCols.forEach(col => { blankRow[col] = ''; });
                          setEditingProduct({ ...editingProduct, specTableRows: [blankRow] });
                        }}
                        title="Clear all rows"
                      >
                        <Trash2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        <span>Clear Table</span>
                      </button>
                    </div>
                  </div>

                  {/* Table Editor Grid */}
                  <div style={{ overflowX: 'auto', border: '1px solid #CBD5E1', borderRadius: '6px', background: '#FFFFFF' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                      <thead>
                        <tr style={{ background: '#F1F5F9', borderBottom: '2px solid #CBD5E1' }}>
                          {(editingProduct.specTableColumns || []).map((col, cIdx) => (
                            <th key={cIdx} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: '#001827', borderRight: '1px solid #CBD5E1', minWidth: '160px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                <input
                                  type="text"
                                  value={col}
                                  title="Click to rename column header"
                                  style={{
                                    fontWeight: 700,
                                    fontSize: '0.82rem',
                                    color: '#001827',
                                    border: '1px solid #CBD5E1',
                                    borderRadius: '4px',
                                    padding: '4px 6px',
                                    background: '#FFFFFF',
                                    width: '100%'
                                  }}
                                  onChange={(e) => {
                                    const newColName = e.target.value;
                                    const oldColName = col;
                                    const currentCols = editingProduct.specTableColumns || ['Parameter', 'Details'];
                                    const updatedCols = [...currentCols];
                                    updatedCols[cIdx] = newColName;
                                    const currentRows = editingProduct.specTableRows || [];
                                    const updatedRows = currentRows.map(r => {
                                      const nr: Record<string, string> = {};
                                      Object.entries(r || {}).forEach(([k, v]) => {
                                        if (k === oldColName) nr[newColName] = v;
                                        else nr[k] = v;
                                      });
                                      return nr;
                                    });
                                    setEditingProduct({ ...editingProduct, specTableColumns: updatedCols, specTableRows: updatedRows });
                                  }}
                                />
                                {(editingProduct.specTableColumns || []).length > 1 && (
                                  <button
                                    type="button"
                                    title={`Remove "${col}" column`}
                                    style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 800, padding: '2px 4px' }}
                                    onClick={() => {
                                      const updatedCols = (editingProduct.specTableColumns || []).filter((_, idx) => idx !== cIdx);
                                      setEditingProduct({ ...editingProduct, specTableColumns: updatedCols });
                                    }}
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            </th>
                          ))}
                          <th style={{ width: '50px', padding: '10px', textAlign: 'center' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(editingProduct.specTableRows || []).map((row, rIdx) => {
                          if (!row) return null;
                          return (
                            <tr key={rIdx} style={{ borderBottom: '1px solid #E2E8F0', background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                              {(editingProduct.specTableColumns || []).map((col, cIdx) => {
                                const cellVal = row && typeof row[col] === 'string' ? row[col] : (row && row[col] != null ? String(row[col]) : '');
                                return (
                                  <td key={cIdx} style={{ padding: '6px 8px', borderRight: '1px solid #E2E8F0' }}>
                                    <input
                                      type="text"
                                      value={cellVal}
                                      placeholder={cIdx === 0 ? 'e.g. Capacity / Power' : 'e.g. Details or value'}
                                      style={{ width: '100%', padding: '6px 8px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.85rem' }}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        const updatedRows = [...(editingProduct.specTableRows || [])];
                                        updatedRows[rIdx] = { ...(updatedRows[rIdx] || {}), [col]: val };
                                        setEditingProduct({ ...editingProduct, specTableRows: updatedRows });
                                      }}
                                    />
                                  </td>
                                );
                              })}
                              <td style={{ textAlign: 'center', padding: '6px' }}>
                                <button
                                  type="button"
                                  title="Delete Row"
                                  style={{ color: '#EF4444', border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
                                  onClick={() => {
                                    const updatedRows = (editingProduct.specTableRows || []).filter((_, idx) => idx !== rIdx);
                                    setEditingProduct({ ...editingProduct, specTableRows: updatedRows.length > 0 ? updatedRows : [{ [(editingProduct.specTableColumns || ['Parameter'])[0]]: '', [(editingProduct.specTableColumns || ['Parameter', 'Details'])[1] || 'Details']: '' }] });
                                  }}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: KEY FEATURES (BULLET LIST) */}
              {editProductTab === 'features' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#00233D' }}>
                        Key Features Bullet Points
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                        These appear with orange checkmark icons under the "Features" tab on the live website.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-orange"
                      style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                      onClick={() => {
                        const currentF = editingProduct.keyFeatures || [];
                        setEditingProduct({
                          ...editingProduct,
                          keyFeatures: [...currentF, '']
                        });
                      }}
                    >
                      <Plus size={15} />
                      <span>Add Feature Bullet</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(editingProduct.keyFeatures || []).map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <Check size={18} style={{ color: '#FF9200', flexShrink: 0 }} />
                        <input
                          type="text"
                          className="form-input-field"
                          placeholder="e.g. Heavy-Duty Hydraulic Power Pack with foreign-brand proportional valves"
                          value={feat}
                          onChange={(e) => {
                            const updatedF = [...(editingProduct.keyFeatures || [])];
                            updatedF[fIdx] = e.target.value;
                            setEditingProduct({ ...editingProduct, keyFeatures: updatedF });
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedF = (editingProduct.keyFeatures || []).filter((_, idx) => idx !== fIdx);
                            setEditingProduct({ ...editingProduct, keyFeatures: updatedF });
                          }}
                          className="admin-icon-btn text-danger"
                          title="Remove Bullet"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ADVANTAGES (CARDS) */}
              {editProductTab === 'advantages' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#00233D' }}>
                        Advantages Cards
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                        These cards appear in the 2x2 grid under the "Advantages" tab on the live website.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-orange"
                      style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                      onClick={() => {
                        const currentA = editingProduct.advantages || [];
                        setEditingProduct({
                          ...editingProduct,
                          advantages: [...currentA, { title: `New Advantage ${currentA.length + 1}`, description: '' }]
                        });
                      }}
                    >
                      <Plus size={15} />
                      <span>Add Advantage Card</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {(editingProduct.advantages || []).map((adv, aIdx) => (
                      <div key={aIdx} style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '8px', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#FF9200' }}>
                            Advantage #{aIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedA = (editingProduct.advantages || []).filter((_, idx) => idx !== aIdx);
                              setEditingProduct({ ...editingProduct, advantages: updatedA });
                            }}
                            className="admin-icon-btn text-danger"
                            title="Remove Advantage"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-input-field"
                          placeholder="Advantage Title (e.g. Reduced Cement Consumption)"
                          style={{ marginBottom: '8px', fontWeight: 700 }}
                          value={adv.title || ''}
                          onChange={(e) => {
                            const updatedA = [...(editingProduct.advantages || [])];
                            updatedA[aIdx] = { ...updatedA[aIdx], title: e.target.value };
                            setEditingProduct({ ...editingProduct, advantages: updatedA });
                          }}
                        />
                        <textarea
                          rows={2}
                          className="form-textarea-field"
                          placeholder="Advantage Description (e.g. Optimum particle packing reduces cement ratio by up to 25-30%...)"
                          value={adv.description || ''}
                          onChange={(e) => {
                            const updatedA = [...(editingProduct.advantages || [])];
                            updatedA[aIdx] = { ...updatedA[aIdx], description: e.target.value };
                            setEditingProduct({ ...editingProduct, advantages: updatedA });
                          }}
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                <button
                  type="submit"
                  className="btn btn-orange"
                  style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}
                >
                  <Save size={18} />
                  <span>Save Machine Changes & Content</span>
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditingProduct(null)}
                  style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #CBD5E1', padding: '12px 20px' }}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 3: ADD NEW PROJECT MODAL
          --------------------------------------------------------------------- */}
      {isAddProjectOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddProjectOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Add New Project / Installation</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Add client plant installation showcase</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddProjectOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={(e) => {
              e.preventDefault();
              const newProjItem = addProject({
                title: newProject.title,
                client: newProject.client || newProject.title,
                location: newProject.location,
                machine: newProject.machine || 'Automatic Plant JP-8000',
                year: newProject.year || '2024',
                status: newProject.status as any,
                image: newProject.image || 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
              });
              setProjects(getStoredProjects());
              setIsAddProjectOpen(false);
              setNewProject({ title: '', client: '', location: '', machine: '', year: '2024', status: 'Completed', image: '' });
              triggerToast(`Project "${newProjItem.title}" saved successfully!`);
            }}>
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Project / Client Title</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Arunachala Fly Ash Plant"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Location (City, State)</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Coimbatore, Tamil Nadu"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Machine Installed</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Fully Automatic JP-10000"
                    value={newProject.machine}
                    onChange={(e) => setNewProject({ ...newProject, machine: e.target.value })}
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Completion Year</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 2024"
                    value={newProject.year}
                    onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                  />
                </div>
              </div>

              <ImageUploadField
                label="Project Site / Commissioning Photo"
                value={newProject.image}
                onChange={(val) => setNewProject({ ...newProject, image: val })}
                helperText="Upload site installation photo"
              />

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} />
                <span>Save Project Showcase</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL: ADD NEW BLOG POST
          --------------------------------------------------------------------- */}
      {isAddBlogOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddBlogOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Write & Publish Blog Article</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Publish technical guidance to website knowledge hub</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddBlogOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={(e) => {
              e.preventDefault();
              const newArticle = addBlog({
                title: newBlog.title,
                category: newBlog.category,
                readTime: newBlog.readTime || '5 min read',
                author: 'Jupiter Technical Team',
                image: newBlog.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                excerpt: newBlog.excerpt || newBlog.title
              });
              setBlogs(getStoredBlogs());
              setIsAddBlogOpen(false);
              setNewBlog({ title: '', category: 'Brick Making', readTime: '5 min read', excerpt: '', image: '' });
              triggerToast(`Blog "${newArticle.title}" published successfully!`);
            }}>
              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">Article Title</label>
                <input
                  type="text"
                  className="form-input-field"
                  placeholder="e.g. Raw Material Mix Ratio for 12 N/mm² Fly Ash Bricks"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  required
                />
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Category</label>
                  <select
                    className="form-input-field"
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  >
                    <option>Brick Making</option>
                    <option>Concrete Blocks</option>
                    <option>Pavers</option>
                    <option>Maintenance</option>
                    <option>Business & Subsidies</option>
                  </select>
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Read Time</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 5 min read"
                    value={newBlog.readTime}
                    onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                  />
                </div>
              </div>

              <ImageUploadField
                label="Article Cover Image"
                value={newBlog.image}
                onChange={(val) => setNewBlog({ ...newBlog, image: val })}
                helperText="Upload blog thumbnail cover image (PNG, JPG, WEBP)"
              />

              <div className="form-group-item" style={{ marginBottom: '16px' }}>
                <label className="form-field-label">Article Summary / Excerpt</label>
                <textarea
                  className="form-textarea-field"
                  rows={3}
                  placeholder="Summarize key takeaway and guidelines..."
                  value={newBlog.excerpt}
                  onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} />
                <span>Publish Blog Article</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 4: UPLOAD GALLERY MEDIA MODAL
          --------------------------------------------------------------------- */}
      {isAddGalleryOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddGalleryOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Upload Gallery Media</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Add photo to machinery and plant media gallery</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddGalleryOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={(e) => {
              e.preventDefault();
              const addedPhoto = addGalleryPhoto({
                title: newGallery.title,
                category: newGallery.category,
                location: newGallery.location || 'Coimbatore, Tamil Nadu',
                machine: newGallery.machine || 'Jupiter Automatic Machinery',
                output: newGallery.output || 'High Output Capacity',
                description: newGallery.description || newGallery.title,
                image: newGallery.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
              });
              setGallery(getStoredGalleryPhotos());
              setIsAddGalleryOpen(false);
              setNewGallery({
                title: '',
                category: 'Block Machines',
                location: 'Coimbatore, Tamil Nadu',
                machine: 'Jupiter Automatic Machinery',
                output: '20,000 blocks / day',
                description: '',
                image: ''
              });
              triggerToast(`Photo "${addedPhoto.title}" published to Gallery!`);
            }}>
              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">Photo Title</label>
                <input
                  type="text"
                  className="form-input-field"
                  placeholder="e.g. Fully Automatic Concrete Block Manufacturing Line"
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  required
                />
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Category</label>
                  <select
                    className="form-input-field"
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                  >
                    <option>Block Machines</option>
                    <option>Fly Ash Plants</option>
                    <option>Paver Units</option>
                    <option>Batching Mixers</option>
                    <option>Precision Moulds</option>
                    <option>Factory Infrastructure</option>
                  </select>
                </div>

                <div className="form-group-item">
                  <label className="form-field-label">Location (City, State)</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Coimbatore, Tamil Nadu"
                    value={newGallery.location}
                    onChange={(e) => setNewGallery({ ...newGallery, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Machine Model</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Jupiter Titan-8000 Automatic Plant"
                    value={newGallery.machine}
                    onChange={(e) => setNewGallery({ ...newGallery, machine: e.target.value })}
                  />
                </div>

                <div className="form-group-item">
                  <label className="form-field-label">Daily Output / Capacity</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 22,000 blocks / day"
                    value={newGallery.output}
                    onChange={(e) => setNewGallery({ ...newGallery, output: e.target.value })}
                  />
                </div>
              </div>

              <ImageUploadField
                label="Machinery / Factory Photo Upload"
                value={newGallery.image}
                onChange={(val) => setNewGallery({ ...newGallery, image: val })}
                helperText="Upload workshop or machine photo, or paste image URL"
              />

              <div className="form-group-item" style={{ marginBottom: '16px' }}>
                <label className="form-field-label">Brief Description</label>
                <textarea
                  className="form-textarea-field"
                  rows={2}
                  placeholder="e.g. Heavy-duty hydraulic pressing with automatic PLC pallet conveyor line."
                  value={newGallery.description}
                  onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} />
                <span>Publish to Website Gallery</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 5: ADD VIDEO MODAL (YOUTUBE URL INTEGRATION)
          --------------------------------------------------------------------- */}
      {isAddVideoOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddVideoOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Add Machinery Video</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Add YouTube link with auto-thumbnail generation</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddVideoOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={(e) => {
              e.preventDefault();
              const ytId = getYouTubeId(newVideo.videoUrl);
              const embedUrl = getYouTubeEmbedUrl(newVideo.videoUrl);
              const thumb = newVideo.image || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80');

              addVideo({
                title: newVideo.title || 'Jupiter Machinery Live Demonstration',
                videoUrl: newVideo.videoUrl,
                embedUrl: embedUrl,
                views: '1.2K views',
                duration: newVideo.duration || '3:30',
                image: thumb,
                category: (newVideo.category || 'Block Machines') as any,
                description: 'Machinery in action live demonstration by Jupiter Industries.'
              });
              setVideos(getStoredVideos());
              setIsAddVideoOpen(false);
              setNewVideo({ title: '', duration: '3:30', image: '', videoUrl: '', category: 'Block Machines' });
              triggerToast('YouTube video added successfully and saved to DB!');
            }}>
              {/* YouTube URL Field */}
              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">
                  YouTube Video URL <span className="text-orange">*</span>
                </label>
                <input
                  type="url"
                  className="form-input-field"
                  placeholder="e.g. https://www.youtube.com/watch?v=RZot-EmDGHw"
                  value={newVideo.videoUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    const autoThumb = getYouTubeThumbnail(url);
                    setNewVideo({
                      ...newVideo,
                      videoUrl: url,
                      image: autoThumb || newVideo.image
                    });
                  }}
                  required
                />
                <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                  Paste standard YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)
                </span>
              </div>

              {/* Video Title */}
              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">
                  Video Title <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  className="form-input-field"
                  placeholder="e.g. Automatic Fly Ash Brick Machine Demonstration"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  required
                />
              </div>

              {/* Category & Duration Row */}
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Machinery Category</label>
                  <select
                    className="form-input-field"
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value as any })}
                  >
                    <option value="Block Machines">Block Machines</option>
                    <option value="Brick Machines">Brick Machines</option>
                    <option value="Paver Machines">Paver Machines</option>
                    <option value="Batching & Mixers">Batching & Mixers</option>
                    <option value="Factory Tour">Factory Tour</option>
                  </select>
                </div>

                <div className="form-group-item">
                  <label className="form-field-label">Duration</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 3:45"
                    value={newVideo.duration}
                    onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                  />
                </div>
              </div>

              {/* Thumbnail Preview */}
              {newVideo.image && (
                <div style={{ marginBottom: '14px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #CBD5E1', background: '#001827', position: 'relative' }}>
                  <img src={resolveImg(newVideo.image)} alt="Thumbnail preview" style={{ width: '100%', height: '140px', objectFit: 'cover', opacity: 0.9 }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', color: '#FF9200', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                    YouTube Auto Thumbnail Detected
                  </div>
                </div>
              )}

              <ImageUploadField
                label="Custom Thumbnail Image (Optional)"
                value={newVideo.image}
                onChange={(val) => setNewVideo({ ...newVideo, image: val })}
                helperText="Leave empty to use official YouTube thumbnail automatically"
              />

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} />
                <span>Publish Video to Website</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL: LIVE YOUTUBE VIDEO PLAYER MODAL
          --------------------------------------------------------------------- */}
      {selectedVideoForPlay && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedVideoForPlay(null)}>
          <div className="modal-content-card" style={{ maxWidth: '780px', padding: 0, overflow: 'hidden', background: '#001827' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#00121F', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <span style={{ color: '#FF9200', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {selectedVideoForPlay.category || 'Machinery Demonstration'}
                </span>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, margin: '2px 0 0 0' }}>
                  {selectedVideoForPlay.title}
                </h3>
              </div>
              <button className="modal-close-btn" style={{ color: '#FFFFFF' }} onClick={() => setSelectedVideoForPlay(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                title={selectedVideoForPlay.title}
                src={selectedVideoForPlay.embedUrl || getYouTubeEmbedUrl(selectedVideoForPlay.videoUrl)}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001827' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                Duration: {selectedVideoForPlay.duration} • {selectedVideoForPlay.views}
              </span>
              {selectedVideoForPlay.videoUrl && (
                <a
                  href={selectedVideoForPlay.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-orange"
                  style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                >
                  <span>Open in YouTube</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 6: ADD FAQ MODAL
          --------------------------------------------------------------------- */}
      {isAddFAQOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddFAQOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Add Frequently Asked Question</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Help buyers understand machinery specs and terms</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddFAQOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={(e) => {
              e.preventDefault();
              const newFaqItem: FAQItem = {
                id: `FAQ-0${faqs.length + 1}`,
                question: newFAQ.question,
                answer: newFAQ.answer,
                category: newFAQ.category
              };
              setFaqs([newFaqItem, ...faqs]);
              setIsAddFAQOpen(false);
              setNewFAQ({ question: '', answer: '', category: 'Technical Specifications' });
              triggerToast('FAQ created successfully!');
            }}>
              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">Category</label>
                <select
                  className="form-input-field"
                  value={newFAQ.category}
                  onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                >
                  <option>Technical Specifications</option>
                  <option>Installation & Support</option>
                  <option>Warranty & Spares</option>
                  <option>Raw Materials & Mix Ratio</option>
                </select>
              </div>

              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">Question</label>
                <input
                  type="text"
                  className="form-input-field"
                  placeholder="e.g. What is the hydraulic pressure rating?"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-item" style={{ marginBottom: '18px' }}>
                <label className="form-field-label">Answer</label>
                <textarea
                  className="form-textarea-field"
                  rows={3}
                  placeholder="Provide comprehensive answer..."
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} />
                <span>Save FAQ</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 7: ADD MACHINE DELIVERY LOCATION MODAL
          --------------------------------------------------------------------- */}
      {isAddLocationOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddLocationOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Add Machine Delivery Location</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Log customer plant dispatch, machine model and commissioning status</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddLocationOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={(e) => {
              e.preventDefault();
              if (!newLocation.clientName.trim() || !newLocation.locationCity.trim()) {
                alert('Please enter Client Name and Delivery City');
                return;
              }

              const newLocItem: MachineDeliveryLocationItem = {
                id: `DEL-${String(locations.length + 1).padStart(2, '0')}`,
                clientName: newLocation.clientName.trim(),
                locationCity: newLocation.locationCity.trim(),
                state: newLocation.state.trim() || 'India',
                machineModel: newLocation.machineModel.trim() || 'Fly Ash Brick Machine',
                deliveryDate: newLocation.deliveryDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: newLocation.status,
                transportVehicle: newLocation.transportVehicle.trim() || 'Heavy Haulage Carrier',
                contactPhone: newLocation.contactPhone.trim() || '+91 98765 43210',
                notes: newLocation.notes.trim()
              };

              const updated = [newLocItem, ...locations];
              saveDeliveryLocations(updated);
              setIsAddLocationOpen(false);
              setNewLocation({
                clientName: '',
                locationCity: '',
                state: '',
                machineModel: 'Fully Automatic 6-Cavity Fly Ash Brick Machine',
                deliveryDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'Delivered & Operational',
                transportVehicle: '12-Wheeler Hydraulic Trailer',
                contactPhone: '+91 ',
                notes: ''
              });
              triggerToast(`Delivery to "${newLocItem.clientName}" recorded successfully!`);
            }}>
              {/* Row 1: Client Name & Machine Model */}
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Customer / Plant Name *</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Sri Lakshmi Fly Ash Bricks"
                    value={newLocation.clientName}
                    onChange={(e) => setNewLocation({ ...newLocation, clientName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Machine Model Delivered *</label>
                  <select
                    className="form-input-field"
                    value={newLocation.machineModel}
                    onChange={(e) => setNewLocation({ ...newLocation, machineModel: e.target.value })}
                  >
                    <option value="Fully Automatic 6-Cavity Fly Ash Brick Machine">Fully Automatic 6-Cavity Fly Ash Brick Machine</option>
                    <option value="Hydraulic Interlocking Paver Block Machine">Hydraulic Interlocking Paver Block Machine</option>
                    <option value="Heavy Duty Solid & Hollow Concrete Block Machine">Heavy Duty Solid & Hollow Concrete Block Machine</option>
                    <option value="4-Brick Rotary High-Pressure Hydraulic Machine">4-Brick Rotary High-Pressure Hydraulic Machine</option>
                    <option value="Automatic Brick Making Plant with 50-Ton Silo">Automatic Brick Making Plant with 50-Ton Silo</option>
                    <option value="Ready-Mix Concrete Batching Plant">Ready-Mix Concrete Batching Plant</option>
                    <option value="Cement & Fly Ash Storage Silo">Cement & Fly Ash Storage Silo</option>
                    <option value="Custom Industrial Machinery">Custom Industrial Machinery</option>
                  </select>
                </div>
              </div>

              {/* Row 2: City & State */}
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Delivery City / Industrial Hub *</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Salem Industrial Estate"
                    value={newLocation.locationCity}
                    onChange={(e) => setNewLocation({ ...newLocation, locationCity: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">State *</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. Tamil Nadu"
                    value={newLocation.state}
                    onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Row 3: Status & Delivery Date */}
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Delivery & Commissioning Status</label>
                  <select
                    className="form-input-field"
                    value={newLocation.status}
                    onChange={(e) => setNewLocation({ ...newLocation, status: e.target.value as any })}
                  >
                    <option value="Delivered & Operational">Delivered & Operational</option>
                    <option value="In Transit">In Transit / Dispatched</option>
                    <option value="Installation Ongoing">Installation Ongoing / Site Assembly</option>
                  </select>
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Delivery / Dispatch Date</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 18 Mar 2026"
                    value={newLocation.deliveryDate}
                    onChange={(e) => setNewLocation({ ...newLocation, deliveryDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 4: Transport Vehicle & Contact Phone */}
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Haulage Vehicle / Transport</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="e.g. 12-Wheeler Hydraulic Low-Bed Trailer"
                    value={newLocation.transportVehicle}
                    onChange={(e) => setNewLocation({ ...newLocation, transportVehicle: e.target.value })}
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Site Contact Phone</label>
                  <input
                    type="text"
                    className="form-input-field"
                    placeholder="+91 98765 43210"
                    value={newLocation.contactPhone}
                    onChange={(e) => setNewLocation({ ...newLocation, contactPhone: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 5: Notes */}
              <div className="form-group-item" style={{ marginBottom: '18px' }}>
                <label className="form-field-label">Commissioning Notes / Details (Optional)</label>
                <textarea
                  className="form-input-field"
                  rows={2}
                  placeholder="e.g. Installed and tested with 200 Bar hydraulic pressure. 12,000 bricks/shift verified."
                  value={newLocation.notes}
                  onChange={(e) => setNewLocation({ ...newLocation, notes: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} />
                <span>Save Machine Delivery Location</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL 8: ADD ADMIN / STAFF USER MODAL
          --------------------------------------------------------------------- */}
      {isAddUserOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddUserOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Add Admin User Account</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Create credentials and assign access permissions</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddUserOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={handleAddUser}>
              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input-field"
                  placeholder="e.g. Ramesh Kumar"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-item" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">Official Email Address *</label>
                <input
                  type="email"
                  className="form-input-field"
                  placeholder="e.g. ramesh@jupiterindustries.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '18px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Initial Password *</label>
                  <input
                    type="password"
                    className="form-input-field"
                    placeholder="Enter secure password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label className="form-field-label" style={{ margin: 0 }}>System Role *</label>
                    {!isAddingCustomRole && (
                      <button
                        type="button"
                        onClick={() => setIsAddingCustomRole(true)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FF9200',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Plus size={13} />
                        <span>Add New Role</span>
                      </button>
                    )}
                  </div>

                  {!isAddingCustomRole ? (
                    <select
                      className="form-input-field"
                      value={newUser.role}
                      onChange={(e) => {
                        if (e.target.value === '__add_new__') {
                          setIsAddingCustomRole(true);
                        } else {
                          setNewUser({ ...newUser, role: e.target.value });
                        }
                      }}
                    >
                      {systemRoles.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                      <option value="__add_new__">+ Add Custom Role...</option>
                    </select>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="form-input-field"
                        placeholder="e.g. Sales Executive, Plant Manager"
                        value={customRoleInput}
                        onChange={(e) => setCustomRoleInput(e.target.value)}
                        autoFocus
                        style={{ flex: 1 }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSaveCustomRole();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-orange"
                        style={{ padding: '8px 12px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                        onClick={handleSaveCustomRole}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn"
                        style={{ padding: '8px 10px', fontSize: '0.8rem', background: '#F1F5F9', color: '#64748B' }}
                        onClick={() => {
                          setIsAddingCustomRole(false);
                          setCustomRoleInput('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <UserPlus size={18} />
                <span>Create User Account</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================
          MAINTENANCE SCREEN PREVIEW MODAL
          ================================================================= */}
      {isMaintenancePreviewModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 18, 31, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setIsMaintenancePreviewModalOpen(false)}
        >
          {/* Top Control Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 24px',
              background: '#001827',
              borderBottom: '1px solid rgba(255, 146, 0, 0.25)',
              color: '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: '#FF9200',
                color: '#001827',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                Live Simulation
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
                Maintenance Screen Preview (Visitor View)
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                • Showing exact content configured in Settings
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsMaintenancePreviewModalOpen(false)}
                className="btn btn-orange"
                style={{
                  padding: '7px 16px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  borderRadius: '6px'
                }}
              >
                <X size={16} />
                <span>Close Preview</span>
              </button>
            </div>
          </div>

          {/* Body with Maintenance Page Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              justifyContent: 'center',
              background: '#00121F'
            }}
          >
            <div style={{ width: '100%', minHeight: '100%' }}>
              <MaintenancePage config={maintenanceConfig} />
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          CUSTOM CONFIRMATION POPUP MODAL (REPLACES BROWSER CONFIRM)
          ================================================================= */}
      {confirmModal && confirmModal.isOpen && (
        <div
          className="admin-confirm-overlay"
          onClick={() => !isConfirmingAction && setConfirmModal(null)}
        >
          <div
            className="admin-confirm-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => !isConfirmingAction && setConfirmModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon Badge */}
            <div className={`admin-confirm-icon-box ${confirmModal.variant || 'danger'}`}>
              {confirmModal.icon === 'alert' ? <AlertCircle size={28} /> : <Trash2 size={28} />}
            </div>

            {/* Modal Heading */}
            <h3 className="admin-confirm-title">
              {confirmModal.title}
            </h3>

            {/* Message */}
            <p className="admin-confirm-desc">
              {confirmModal.message}
            </p>

            {/* Highlighted Target Item */}
            {confirmModal.itemName && (
              <div className="admin-confirm-item-badge">
                <div style={{ fontSize: '0.72rem', color: '#EA580C', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 700, marginBottom: '2px' }}>
                  {confirmModal.itemLabel || 'Selected Item'}
                </div>
                <div style={{ color: '#001827', fontWeight: 700, fontSize: '0.96rem', lineHeight: 1.4 }}>
                  {confirmModal.itemName}
                </div>
              </div>
            )}

            <p className="admin-confirm-subtext">
              This action cannot be undone. Are you sure you want to proceed?
            </p>

            {/* Action Buttons */}
            <div className="admin-confirm-actions">
              <button
                type="button"
                className="admin-confirm-btn-cancel"
                onClick={() => setConfirmModal(null)}
                disabled={isConfirmingAction}
              >
                {confirmModal.cancelText || 'Cancel'}
              </button>

              <button
                type="button"
                className={`admin-confirm-btn-action ${confirmModal.variant || 'danger'}`}
                onClick={handleExecuteConfirm}
                disabled={isConfirmingAction}
              >
                {confirmModal.icon === 'alert' ? <AlertCircle size={16} /> : <Trash2 size={16} />}
                <span>{isConfirmingAction ? 'Deleting...' : (confirmModal.confirmText || 'Yes, Delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

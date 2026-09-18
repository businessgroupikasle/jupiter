import React, { useState } from 'react';
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
  MoreHorizontal,
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
  LogOut
} from 'lucide-react';
import { IMAGES } from '../assets/images/images';
import '../styles/admin.css';
import { getCurrentUser, logoutAdmin, AdminUser } from '../services/authService';
import { AdminAuthScreen } from '../components/AdminAuthScreen';
import { 
  VideoItem, 
  getYouTubeId, 
  getYouTubeEmbedUrl, 
  getYouTubeThumbnail, 
  getStoredVideos, 
  saveStoredVideos 
} from '../services/videoService';
import {
  GalleryPhotoItem,
  getStoredGalleryPhotos,
  addGalleryPhoto,
  deleteGalleryPhoto
} from '../services/galleryService';
import {
  ProductItem,
  getStoredProducts,
  fetchProducts,
  clearAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  CATEGORY_NAME_TO_SLUG_MAP
} from '../services/productService';
import {
  ProjectItem,
  getStoredProjects,
  addProject,
  deleteProject
} from '../services/projectService';
import {
  BlogItem as AdminBlogItem,
  getStoredBlogs,
  addBlog,
  updateBlog,
  deleteBlog
} from '../services/blogService';
import {
  getStoredEnquiries,
  deleteStoredEnquiry,
  updateStoredEnquiryStatus
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

export interface ServiceLocationItem {
  id: string;
  name: string;
  state: string;
  type: string;
  engineers: string;
  phone: string;
  isHQ?: boolean;
}

export const AdminDashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => getCurrentUser());
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handleLogout = () => {
    logoutAdmin();
    setCurrentUser(null);
  };

  const tabParam = searchParams.get('tab');
  const validTabs = ['dashboard', 'enquiries', 'products', 'projects', 'gallery', 'videos', 'faqs', 'locations', 'blogs', 'settings'] as const;
  
  const activeTab: 'dashboard' | 'enquiries' | 'products' | 'projects' | 'gallery' | 'videos' | 'faqs' | 'locations' | 'blogs' | 'settings' = (() => {
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
  const [dateRange, setDateRange] = useState('01 Apr 2024 - 30 Apr 2024');
  const [searchQuery, setSearchQuery] = useState('');
  const [enquiryFilter, setEnquiryFilter] = useState<'All' | 'New' | 'Contacted' | 'Closed'>('All');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('2024-04-01');
  const [customEndDate, setCustomEndDate] = useState('2024-04-30');
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
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
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

  // New Product Form State with Technical Specifications Builder
  // New Product Form State with Full Technical Specifications Builder
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
    featureBadges: ['', '', '', ''],
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
        featureBadges: ['', '', '', ''],
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
    setEditingProduct({
      ...prod,
      brickSize: prod.brickSize || '',
      featureBadges: prod.featureBadges && prod.featureBadges.length > 0 ? [...prod.featureBadges] : ['', '', '', ''],
      galleryImages: prod.galleryImages ? [...prod.galleryImages] : [],
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
    name: string;
    state: string;
    type: string;
    engineers: string;
    phone: string;
    isHQ: boolean;
  }>({ name: '', state: '', type: 'Regional Center', engineers: '15+ Engineers', phone: '+91 98765 43210', isHQ: false });

  // Today's Tasks Interactive State
  const [todayTasks, setTodayTasks] = useState([
    { id: '1', text: 'Respond to enquiry from Arun Kumar', time: '10:30 AM', completed: true },
    { id: '2', text: 'Send quotation to Priya Builders', time: '11:15 AM', completed: true },
    { id: '3', text: 'Follow up with Suresh Construction', time: '01:00 PM', completed: false },
    { id: '4', text: 'Review new product specifications', time: '03:00 PM', completed: false },
    { id: '5', text: 'Prepare project proposal for Meena Enterprises', time: '04:30 PM', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTodayTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
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
    }).catch(() => {});

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

  const [locations, setLocations] = useState<ServiceLocationItem[]>([
    { id: 'LOC-01', name: 'Coimbatore HQ & Central Tech Center', state: 'Tamil Nadu', type: 'Manufacturing & Tech Hub', engineers: '45+ Engineers', phone: '+91 98765 43210', isHQ: true },
    { id: 'LOC-02', name: 'Chennai Regional Depot', state: 'Tamil Nadu', type: 'Spares & Support Hub', engineers: '22+ Technicians', phone: '+91 98765 43211' },
    { id: 'LOC-03', name: 'Bengaluru Regional Node', state: 'Karnataka', type: 'Project Engineering Support', engineers: '25+ Engineers', phone: '+91 98765 43212' },
    { id: 'LOC-04', name: 'Hyderabad Regional Center', state: 'Telangana', type: 'Field Service Depot', engineers: '18+ Technicians', phone: '+91 98765 43213' },
    { id: 'LOC-05', name: 'Mumbai West Hub', state: 'Maharashtra', type: 'Regional Spares Hub', engineers: '30+ Engineers', phone: '+91 98765 43214' },
    { id: 'LOC-06', name: 'Delhi NCR North Hub', state: 'Delhi NCR', type: 'North India Center', engineers: '35+ Engineers', phone: '+91 98765 43215' },
    { id: 'LOC-07', name: 'Kolkata East Hub', state: 'West Bengal', type: 'East India Regional Hub', engineers: '24+ Technicians', phone: '+91 98765 43216' },
  ]);



  // Toast Notification Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status toggle for enquiries
  const handleToggleStatus = (id: string) => {
    const enq = enquiries.find(e => e.id === id);
    if (!enq) return;
    const nextStatus = enq.status === 'New' ? 'Contacted' : (enq.status === 'Contacted' ? 'Closed' : 'New');
    const updated = updateStoredEnquiryStatus(id, nextStatus as any);
    setEnquiries(updated);
    triggerToast('Enquiry status updated successfully!');
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = deleteStoredEnquiry(id);
    setEnquiries(updated);
    if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    triggerToast('Enquiry deleted successfully');
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
    if (cat === 'All') return true;
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
      searchQuery === '' || 
      (l.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (l.state || '').toLowerCase().includes(searchQuery.toLowerCase())
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
    { id: 'locations', label: 'Service Locations', icon: MapPin },
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
                    {[
                      { label: 'Today', range: '12 Sep 2024' },
                      { label: 'This Week', range: '08 Sep - 14 Sep 2024' },
                      { label: 'This Month', range: '01 Sep - 30 Sep 2024' },
                      { label: 'Last Month', range: '01 Aug - 31 Aug 2024' },
                      { label: 'Apr - Sep 2024', range: '01 Apr 2024 - 30 Sep 2024' },
                      { label: 'All Time (2024)', range: '01 Jan 2024 - 31 Dec 2024' },
                    ].map((preset) => (
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
                    ))}
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

            {/* Notification Bell */}
            <div className="admin-bell-wrapper" onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <button className="admin-bell-btn" aria-label="View notifications">
                <Bell size={18} />
                <span className="admin-bell-count">{enquiries.filter(e => e.status === 'New').length}</span>
              </button>
              
              {notificationsOpen && (
                <div className="admin-notifications-dropdown">
                  <div className="admin-dropdown-header">
                    <strong>Notifications ({enquiries.filter(e => e.status === 'New').length})</strong>
                    <span 
                      onClick={() => triggerToast('All notifications marked as read')} 
                      className="text-orange" 
                      style={{ fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Mark all read
                    </span>
                  </div>
                  {enquiries.filter(e => e.status === 'New').slice(0, 3).map((enq) => (
                    <div 
                      key={enq.id} 
                      className="admin-dropdown-item" 
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        setNotificationsOpen(false);
                      }}
                    >
                      <div className="admin-notif-dot"></div>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>New Enquiry from {enq.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{enq.product} • {enq.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Profile Chip */}
            <div className="admin-profile-chip">
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
                gap: '6px',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
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
                    {todayTasks.map((task) => (
                      <div key={task.id} className="admin-task-item" onClick={() => toggleTask(task.id)}>
                        <div className="admin-task-left">
                          <div className={`admin-task-checkbox ${task.completed ? 'checked' : ''}`}>
                            {task.completed && <Check size={13} strokeWidth={3} />}
                          </div>
                          <span className={`admin-task-text ${task.completed ? 'checked' : ''}`}>
                            {task.text}
                          </span>
                        </div>
                        <span className="admin-task-time">{task.time}</span>
                      </div>
                    ))}
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
                      <span className="admin-metric-num">24</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>+20%</span>
                      <span className="admin-trend-sub">vs. last week</span>
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
                      <span className="admin-metric-num">18</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>+6%</span>
                      <span className="admin-trend-sub">vs. last week</span>
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
                      <span className="admin-metric-num">42</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>+17%</span>
                      <span className="admin-trend-sub">vs. last week</span>
                    </span>
                    <div className="admin-sparkline">
                      <svg viewBox="0 0 100 30" width="90" height="26" fill="none">
                        <path d="M0 24 Q 30 20, 50 14 T 80 16 T 100 6 L 100 30 L 0 30 Z" fill="rgba(255, 146, 0, 0.15)" />
                        <path d="M0 24 Q 30 20, 50 14 T 80 16 T 100 6" stroke="#FF9200" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card 4: Product Views */}
                <div className="admin-metric-card" onClick={() => switchTab('products')} style={{ cursor: 'pointer' }}>
                  <div className="admin-metric-top">
                    <div className="admin-metric-icon-box bg-blue-light" style={{ color: '#001827' }}>
                      <Eye size={22} />
                    </div>
                    <div className="admin-metric-value-wrap">
                      <span className="admin-metric-label">Product Views</span>
                      <span className="admin-metric-num">12.8K</span>
                    </div>
                  </div>
                  <div className="admin-metric-bottom">
                    <span className="admin-trend-badge text-emerald">
                      <TrendingUp size={14} />
                      <span>+28%</span>
                      <span className="admin-trend-sub">vs. last week</span>
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
                    <svg viewBox="0 0 500 200" className="admin-chart-svg">
                      {[0, 20, 40, 60, 80].map((val) => {
                        const yPos = 160 - (val / 80) * 130;
                        return (
                          <g key={val}>
                            <line x1="35" y1={yPos} x2="480" y2={yPos} stroke="#F1F5F9" strokeWidth="1" />
                            <text x="25" y={yPos + 4} fill="#94A3B8" fontSize="10" textAnchor="end">{val}</text>
                          </g>
                        );
                      })}

                      {/* Line 1: New Leads (Navy) */}
                      <path 
                        d="M 60 135 Q 130 120 190 110 T 320 85 T 440 45" 
                        fill="none" 
                        stroke="#001827" 
                        strokeWidth="2.8" 
                      />
                      {/* Dots for New Leads */}
                      {[
                        { x: 60, y: 135 },
                        { x: 135, y: 120 },
                        { x: 210, y: 110 },
                        { x: 285, y: 92 },
                        { x: 360, y: 82 },
                        { x: 440, y: 45 },
                      ].map((p, i) => (
                        <circle key={`nl-${i}`} cx={p.x} cy={p.y} r="4.5" fill="#001827" stroke="#FFFFFF" strokeWidth="2" />
                      ))}

                      {/* Line 2: Conversions (Orange) */}
                      <path 
                        d="M 60 152 Q 130 145 190 140 T 320 130 T 440 105" 
                        fill="none" 
                        stroke="#FF9200" 
                        strokeWidth="2.8" 
                      />
                      {/* Dots for Conversions */}
                      {[
                        { x: 60, y: 152 },
                        { x: 135, y: 145 },
                        { x: 210, y: 140 },
                        { x: 285, y: 134 },
                        { x: 360, y: 126 },
                        { x: 440, y: 105 },
                      ].map((p, i) => (
                        <circle key={`cv-${i}`} cx={p.x} cy={p.y} r="4.5" fill="#FF9200" stroke="#FFFFFF" strokeWidth="2" />
                      ))}

                      {/* Months */}
                      {['Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024'].map((month, i) => {
                        const x = 60 + i * 76;
                        return (
                          <text key={month} x={x} y="185" fill="#64748B" fontSize="10" textAnchor="middle">{month}</text>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* 2. Product Interest Bar Chart */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3 className="admin-card-title">Product Interest</h3>
                    <div className="admin-select-badge">
                      <span>Last 6 Months</span>
                      <ChevronDown size={14} />
                    </div>
                  </div>

                  <div className="admin-analytics-chart-wrap">
                    <svg viewBox="0 0 380 200" className="admin-chart-svg">
                      {[0, 20, 40, 60, 80].map((val) => {
                        const yPos = 160 - (val / 80) * 130;
                        return (
                          <g key={val}>
                            <line x1="30" y1={yPos} x2="365" y2={yPos} stroke="#F1F5F9" strokeWidth="1" />
                            <text x="22" y={yPos + 4} fill="#94A3B8" fontSize="10" textAnchor="end">{val}</text>
                          </g>
                        );
                      })}

                      {[
                        { name: 'Concrete\nBlock Machine', val: 68, x: 60 },
                        { name: 'Fly Ash\nBrick Machine', val: 52, x: 130 },
                        { name: 'Paver Block\nMachine', val: 36, x: 200 },
                        { name: 'Automatic\nBrick Plant', val: 28, x: 270 },
                        { name: 'Others', val: 18, x: 335 },
                      ].map((bar, i) => {
                        const barH = (bar.val / 80) * 130;
                        const barY = 160 - barH;
                        return (
                          <g key={i}>
                            <rect x={bar.x - 14} y={barY} width="28" height={barH} rx="4" fill="#001827" />
                            <text x={bar.x} y={barY - 6} fill="#001827" fontSize="10" fontWeight="700" textAnchor="middle">{bar.val}</text>
                            {bar.name.split('\n').map((line, lineIdx) => (
                              <text key={lineIdx} x={bar.x} y={178 + lineIdx * 10} fill="#64748B" fontSize="8" textAnchor="middle">{line}</text>
                            ))}
                          </g>
                        );
                      })}
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
                    {[
                      { text: 'New enquiry received from Arun Kumar', time: '28 Apr 2024, 10:24 AM', color: '#FF9200' },
                      { text: 'Product view: Fly Ash Brick Machine', time: '28 Apr 2024, 09:18 AM', color: '#001827' },
                      { text: 'Project updated: Metro Construction Site', time: '27 Apr 2024, 05:43 PM', color: '#001827' },
                      { text: 'New enquiry received from Priya Builders', time: '26 Apr 2024, 11:12 AM', color: '#001827' },
                      { text: 'Quotation sent to Suresh Construction', time: '25 Apr 2024, 04:36 PM', color: '#001827' },
                    ].map((act, i) => (
                      <div key={i} className="admin-activity-item">
                        <div className="admin-activity-main">
                          <span className="admin-activity-dot" style={{ backgroundColor: act.color }}></span>
                          <span className="admin-activity-text">{act.text}</span>
                        </div>
                        <span className="admin-activity-time">{act.time}</span>
                      </div>
                    ))}
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
                        {[
                          { num: '#1048', initials: 'AK', bg: '#FF9200', name: 'Arun Kumar', product: 'Concrete Block Machine', source: 'Website', date: '28 Apr 2024', status: 'New' },
                          { num: '#1047', initials: 'PB', bg: '#0284C7', name: 'Priya Builders', product: 'Fly Ash Brick Machine', source: 'Direct Call', date: '26 Apr 2024', status: 'Contacted' },
                          { num: '#1046', initials: 'SS', bg: '#FF9200', name: 'Suresh Construction', product: 'Paver Block Machine', source: 'WhatsApp', date: '24 Apr 2024', status: 'New' },
                          { num: '#1045', initials: 'KC', bg: '#0284C7', name: 'Karthik Construction', product: 'Concrete Block Machine', source: 'IndiaMART', date: '22 Apr 2024', status: 'Contacted' },
                          { num: '#1044', initials: 'ME', bg: '#10B981', name: 'Meena Enterprises', product: 'Automatic Brick Plant', source: 'Website', date: '20 Apr 2024', status: 'New' },
                        ].map((row, i) => (
                          <tr key={i}>
                            <td style={{ color: '#64748B', fontWeight: 600, fontSize: '0.8rem' }}>{row.num}</td>
                            <td>
                              <div className="admin-customer-initials-cell">
                                <span className="admin-avatar-badge" style={{ backgroundColor: row.bg }}>{row.initials}</span>
                                <strong style={{ color: '#0F172A' }}>{row.name}</strong>
                              </div>
                            </td>
                            <td 
                              style={{ cursor: 'pointer' }} 
                              onClick={() => {
                                const match = products.find(p => 
                                  (p.name || '').toLowerCase().includes(row.product.toLowerCase()) || 
                                  (p.category || '').toLowerCase().includes(row.product.toLowerCase()) ||
                                  row.product.toLowerCase().includes((p.name || '').toLowerCase())
                                );
                                if (match) setSelectedProductForSpec(match);
                                else switchTab('products');
                              }}
                              title="Click to view machine product details"
                            >
                              <span className="admin-table-product">{row.product}</span>
                            </td>
                            <td><span style={{ color: '#64748B', fontSize: '0.82rem' }}>{row.source}</span></td>
                            <td><span className="admin-table-date">{row.date}</span></td>
                            <td>
                              <span className={`admin-status-pill ${row.status === 'New' ? 'status-new' : 'status-contacted'}`}>
                                {row.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button 
                                  onClick={() => {
                                    const match = enquiries.find(e => e.name.toLowerCase().includes(row.name.toLowerCase())) || enquiries[0];
                                    setSelectedEnquiry(match);
                                  }} 
                                  className="admin-table-view-btn"
                                >
                                  View
                                </button>
                                <button 
                                  onClick={() => triggerToast(`Options for ${row.name}`)}
                                  style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                                >
                                  <MoreHorizontal size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
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
                    {[
                      { id: '1', name: 'Concrete Block Machine', sub: '12 enquiries', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80' },
                      { id: '2', name: 'Fly Ash Brick Machine', sub: '9 enquiries', image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=200&q=80' },
                      { id: '3', name: 'Paver Block Machine', sub: '7 enquiries', image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=200&q=80' },
                      { id: '4', name: 'Automatic Brick Plant', sub: '5 enquiries', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=200&q=80' },
                    ].map((mach) => (
                      <div 
                        key={mach.id} 
                        className="admin-pop-machine-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const match = products.find(p => {
                            const pName = (p.name || '').toLowerCase();
                            const mName = mach.name.toLowerCase();
                            return pName.includes(mName) || mName.includes(pName) ||
                              (mName.includes('fly ash') && (p.category.includes('Fly Ash') || pName.includes('rotary') || pName.includes('brick'))) ||
                              (mName.includes('block') && (p.category.includes('Block') || pName.includes('block'))) ||
                              (mName.includes('paver') && (p.category.includes('Paver') || pName.includes('paver')));
                          });
                          if (match) {
                            setSelectedProductForSpec(match);
                          } else {
                            switchTab('products');
                          }
                        }}
                        title={`Click to open ${mach.name} specifications`}
                      >
                        <div className="admin-pop-machine-thumb">
                          <img src={resolveImg(mach.image)} alt={mach.name} />
                        </div>
                        <div className="admin-pop-machine-info">
                          <strong className="admin-pop-machine-title">{mach.name}</strong>
                          <span className="admin-pop-machine-sub">{mach.sub}</span>
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
                      link.setAttribute("download", `jupiter_enquiries_${new Date().toISOString().slice(0,10)}.csv`);
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
                        filteredEnquiries.map((enq) => (
                          <tr key={enq.id}>
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
                                onClick={() => handleToggleStatus(enq.id)}
                                className={`admin-status-pill ${enq.status === 'New' ? 'status-new' : (enq.status === 'Contacted' ? 'status-contacted' : 'status-closed')}`}
                                style={{ cursor: 'pointer' }}
                                title="Click to toggle status"
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => setSelectedEnquiry(enq)} className="admin-table-view-btn">
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
                                  onClick={() => handleDeleteEnquiry(enq.id)}
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
                        if (confirm('Are you sure you want to remove all products from catalog?')) {
                          clearAllProducts();
                          setProducts([]);
                          triggerToast('All products cleared from catalog');
                        }
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
                  const count = cat === 'All' ? products.length : products.filter(p => matchAdminCategory(p, cat)).length;
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
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#001827', marginBottom: '8px' }}>{prod.name}</h3>
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
                              onClick={async () => {
                                if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                  await deleteProduct(prod.id);
                                  setProducts(getStoredProducts());
                                  triggerToast('Product removed successfully');
                                }
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
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddProjectOpen(true); }} className="btn btn-orange">
                  <Plus size={18} />
                  <span>Add New Project</span>
                </button>
              </div>

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
                          onClick={() => {
                            if (confirm('Delete this project?')) {
                              deleteProject(proj.id);
                              setProjects(getStoredProjects());
                              triggerToast('Project removed');
                            }
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
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddBlogOpen(true); }} className="btn btn-orange">
                  <Plus size={18} />
                  <span>Write New Article</span>
                </button>
              </div>

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
                            onClick={() => {
                              if (confirm('Delete this blog post?')) {
                                deleteBlog(b.id);
                                setBlogs(getStoredBlogs());
                                triggerToast('Blog article deleted');
                              }
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
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddGalleryOpen(true); }} className="btn btn-orange">
                  <Plus size={18} />
                  <span>Upload Media</span>
                </button>
              </div>

              <div className="admin-gallery-grid-display">
                {filteredGallery.map((gal) => (
                  <div key={gal.id} className="admin-gallery-card" style={{ position: 'relative' }}>
                    <img src={resolveImg(gal.image)} alt={gal.title} />
                    <div className="admin-gallery-overlay">
                      <strong>{gal.title}</strong>
                      <span>{gal.category}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Remove photo "${gal.title}" from website gallery?`)) {
                            deleteGalleryPhoto(gal.id);
                            setGallery(getStoredGalleryPhotos());
                            triggerToast('Image removed from gallery');
                          }
                        }}
                        style={{ marginTop: '8px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
                            onClick={() => {
                              if (confirm(`Remove video "${vid.title}"?`)) {
                                const updated = videos.filter(v => v.id !== vid.id);
                                setVideos(updated);
                                saveStoredVideos(updated);
                                triggerToast('Video removed');
                              }
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
              TAB 9: SERVICE LOCATIONS MANAGER
              ================================================================= */}
          {activeTab === 'locations' && (
            <div className="admin-tab-view-container">
              <div className="admin-page-header-flex">
                <div>
                  <h1 className="admin-page-title">Pan India Service Network Hubs</h1>
                  <p className="admin-page-subtitle">Manage regional service centers, emergency spares depots and resident engineers across India.</p>
                </div>
                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsAddLocationOpen(true); }} className="btn btn-orange">
                  <Plus size={18} />
                  <span>Add Service Hub</span>
                </button>
              </div>

              <div className="admin-locations-grid-list">
                {filteredLocations.map((loc) => (
                  <div key={loc.id} className="admin-card admin-loc-card-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span className={`admin-loc-type-badge ${loc.isHQ ? 'loc-hq' : ''}`}>
                        {loc.isHQ ? '★ Central HQ' : loc.state}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.78rem', color: '#FF9200', fontWeight: 700 }}>24hr Support</span>
                        {!loc.isHQ && (
                          <button 
                            onClick={() => {
                              setLocations(prev => prev.filter(l => l.id !== loc.id));
                              triggerToast('Service location removed');
                            }}
                            className="admin-icon-btn text-danger"
                            style={{ padding: '2px' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#001827', marginBottom: '4px' }}>{loc.name}</h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '12px' }}>{loc.type}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '10px', fontSize: '0.85rem' }}>
                      <strong>{loc.engineers}</strong>
                      <a href={`tel:${loc.phone}`} style={{ color: '#001827', fontWeight: 600 }}>{loc.phone}</a>
                    </div>
                  </div>
                ))}
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
                <button onClick={() => triggerToast('All company settings and SEO metadata saved successfully!')} className="btn btn-orange">
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="admin-settings-stack">
                <div className="admin-card">
                  <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>Company Information & Contact</h2>
                  <div className="enquiry-fields-grid" style={{ marginBottom: '16px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Company Legal Name</label>
                      <input type="text" className="form-input-field" defaultValue="Jupiter Industries" />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">Primary Hotline Phone</label>
                      <input type="text" className="form-input-field" defaultValue="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="enquiry-fields-grid" style={{ marginBottom: '16px' }}>
                    <div className="form-group-item">
                      <label className="form-field-label">Official Email</label>
                      <input type="email" className="form-input-field" defaultValue="info@jupiterindustries.com" />
                    </div>
                    <div className="form-group-item">
                      <label className="form-field-label">WhatsApp Support Number</label>
                      <input type="text" className="form-input-field" defaultValue="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="form-group-item">
                    <label className="form-field-label">Factory & Head Office Address</label>
                    <textarea className="form-textarea-field" rows={2} defaultValue="SF No. 142/2, Industrial Estate, Pollachi Main Road, Coimbatore - 641021, Tamil Nadu, India."></textarea>
                  </div>
                </div>

                <div className="admin-card">
                  <h2 className="admin-card-title" style={{ marginBottom: '16px' }}>SEO & Meta Information</h2>
                  <div className="form-group-item" style={{ marginBottom: '16px' }}>
                    <label className="form-field-label">Website Meta Title</label>
                    <input type="text" className="form-input-field" defaultValue="Jupiter Industries | Concrete & Fly Ash Brick Machinery Manufacturer India" />
                  </div>
                  <div className="form-group-item">
                    <label className="form-field-label">Meta Description</label>
                    <textarea className="form-textarea-field" rows={2} defaultValue="Jupiter Industries manufactures heavy-duty hydraulic fly ash brick machines, concrete block machines, and paver block plants with Pan-India installation."></textarea>
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Customer Enquiry Details</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>ID: {selectedEnquiry.id} • {selectedEnquiry.date}</span>
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
                  onClick={async () => {
                    if (confirm(`Are you sure you want to delete ${selectedProductForSpec.name}?`)) {
                      await deleteProduct(selectedProductForSpec.id);
                      setProducts(getStoredProducts());
                      setSelectedProductForSpec(null);
                      triggerToast('Product removed from catalog');
                    }
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
                    specTableColumns: editingProduct.specTableColumns,
                    specTableRows: editingProduct.specTableRows
                  });
                  setProducts(getStoredProducts());
                  setEditingProduct(null);
                  triggerToast(`Product "${updated?.name || editingProduct.name}" updated successfully!`);
                }}
              >
                {/* Basic Fields */}
                <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                  <div className="form-group-item">
                    <label className="form-field-label">Header Subtitle / Brand</label>
                    <input 
                      type="text" 
                      className="form-input-field" 
                      placeholder="e.g. JUPITER EQUIPMENTS" 
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
                      placeholder="e.g. 15,000 – 20,000 Bricks/day" 
                      value={editingProduct.capacity || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                    />
                  </div>
                  <div className="form-group-item">
                    <label className="form-field-label">Total Connected Power</label>
                    <input 
                      type="text" 
                      className="form-input-field" 
                      placeholder="e.g. 15 H.P Electric Motor" 
                      value={editingProduct.power || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, power: e.target.value })}
                    />
                  </div>
                  <div className="form-group-item">
                    <label className="form-field-label">Brick / Mold Size</label>
                    <input 
                      type="text" 
                      className="form-input-field" 
                      placeholder="e.g. 230 x 110 x 75 to 230 x 200 x 100" 
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
                    Additional Gallery Thumbnails (Product Details Page)
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

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="submit" 
                    className="btn btn-orange" 
                    style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}
                  >
                    <Save size={18} />
                    <span>Save Machine Changes</span>
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

              const newVidItem: VideoItem = {
                id: `VID-${String(videos.length + 1).padStart(2, '0')}`,
                title: newVideo.title || 'Jupiter Machinery Live Demonstration',
                videoUrl: newVideo.videoUrl,
                embedUrl: embedUrl,
                views: '1.2K views',
                duration: newVideo.duration || '3:30',
                image: thumb,
                category: newVideo.category || 'Block Machines',
                description: 'Machinery in action live demonstration by Jupiter Industries.'
              };

              const updated = [newVidItem, ...videos];
              setVideos(updated);
              saveStoredVideos(updated);
              setIsAddVideoOpen(false);
              setNewVideo({ title: '', duration: '3:30', image: '', videoUrl: '', category: 'Block Machines' });
              triggerToast('YouTube video added successfully!');
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
          MODAL 7: ADD SERVICE LOCATION MODAL
          --------------------------------------------------------------------- */}
      {isAddLocationOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddLocationOpen(false)}>
          <div className="modal-content-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#001827' }}>Add Pan India Service Hub</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Add regional engineering node or spares depot</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddLocationOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form className="modal-body-content" onSubmit={(e) => {
              e.preventDefault();
              const newLocItem: ServiceLocationItem = {
                id: `LOC-0${locations.length + 1}`,
                name: newLocation.name,
                state: newLocation.state,
                type: newLocation.type,
                engineers: newLocation.engineers,
                phone: newLocation.phone,
                isHQ: false
              };
              setLocations([...locations, newLocItem]);
              setIsAddLocationOpen(false);
              setNewLocation({ name: '', state: '', type: 'Regional Spares & Service Depot', engineers: '15+ Engineers', phone: '+91 98765 43210', isHQ: false });
              triggerToast(`Service hub "${newLocItem.name}" added successfully!`);
            }}>
              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Hub Center Name</label>
                  <input 
                    type="text" 
                    className="form-input-field" 
                    placeholder="e.g. Pune Regional Tech Depot" 
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">State</label>
                  <input 
                    type="text" 
                    className="form-input-field" 
                    placeholder="e.g. Maharashtra" 
                    value={newLocation.state}
                    onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                    required 
                  />
                </div>
              </div>

              <div className="enquiry-fields-grid" style={{ marginBottom: '14px' }}>
                <div className="form-group-item">
                  <label className="form-field-label">Engineers & Team Size</label>
                  <input 
                    type="text" 
                    className="form-input-field" 
                    placeholder="e.g. 20+ Technicians" 
                    value={newLocation.engineers}
                    onChange={(e) => setNewLocation({ ...newLocation, engineers: e.target.value })}
                  />
                </div>
                <div className="form-group-item">
                  <label className="form-field-label">Hotline Phone</label>
                  <input 
                    type="text" 
                    className="form-input-field" 
                    placeholder="+91 98765 43210" 
                    value={newLocation.phone}
                    onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-item" style={{ marginBottom: '18px' }}>
                <label className="form-field-label">Facility Type</label>
                <input 
                  type="text" 
                  className="form-input-field" 
                  placeholder="e.g. Spares Hub & Technical Field Engineers" 
                  value={newLocation.type}
                  onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} />
                <span>Save Service Hub</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

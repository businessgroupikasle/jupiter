const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// 1. Update api import
content = content.replace(
  "import { apiClient } from '../services/api';",
  "import { apiClient, extractApiErrorMessage } from '../services/api';"
);

// 2. Add AlertTriangle, Loader2 to lucide-react imports if missing
if (!content.includes('AlertTriangle,')) {
  content = content.replace(
    '  AlertCircle,',
    '  AlertCircle,\n  AlertTriangle,\n  Loader2,'
  );
}

// 3. Update ImageUploadField
const oldImageUploadField = `// Reusable Image Upload Field with Drag & Drop and Preview
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
          apiClient.post('/upload', { image: compressed, filename: file.name })
            .then(res => {
              if (res.data?.url) {
                onChange(res.data.url);
              }
            })
            .catch(() => {});
        } else {
          onChange(rawData);
          apiClient.post('/upload', { image: rawData, filename: file.name })
            .then(res => {
              if (res.data?.url) {
                onChange(res.data.url);
              }
            })
            .catch(() => {});
        }
      };
      img.onerror = () => {
        onChange(rawData);
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  };`;

const newImageUploadField = `// Reusable Image Upload Field with Drag & Drop and Preview
const ImageUploadField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  onError?: (err: string) => void;
}> = ({ label, value, onChange, helperText, onError }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const safeValue = resolveImg(value);

  const doUpload = (dataPayload: string, fileName: string) => {
    setIsUploading(true);
    setUploadError(null);
    apiClient.post('/upload', { image: dataPayload, filename: fileName })
      .then(res => {
        if (res.data?.url) {
          onChange(res.data.url);
          setUploadError(null);
        }
      })
      .catch((err) => {
        const msg = extractApiErrorMessage(err, 'Image upload failed. Server rejected the image.');
        setUploadError(msg);
        if (onError) onError(msg);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      const err = 'Please upload a valid image file (PNG, JPG, WEBP, etc.)';
      setUploadError(err);
      if (onError) onError(err);
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
          doUpload(compressed, file.name);
        } else {
          onChange(rawData);
          doUpload(rawData, file.name);
        }
      };
      img.onerror = () => {
        onChange(rawData);
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  };`;

content = content.replace(oldImageUploadField, newImageUploadField);

// 4. In ImageUploadField JSX, append upload status and error display
const oldUploadWrapperEnd = `      <input
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
    </div>`;

const newUploadWrapperEnd = `      <input
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
      {uploadError && (
        <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertCircle size={14} />
          <span>{uploadError}</span>
        </div>
      )}
      {isUploading && (
        <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#FF9200', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Loader2 size={14} className="spin" />
          <span>Uploading image to server...</span>
        </div>
      )}
    </div>`;

content = content.replace(oldUploadWrapperEnd, newUploadWrapperEnd);

// 5. Add product save and update error/loading states
const oldTabsState = `  // Product Modals Sub-Tab States
  const [addProductTab, setAddProductTab] = useState<'overview' | 'highlights' | 'specifications' | 'features' | 'advantages'>('overview');
  const [editProductTab, setEditProductTab] = useState<'overview' | 'highlights' | 'specifications' | 'features' | 'advantages'>('overview');`;

const newTabsState = `  // Product Modals Sub-Tab States
  const [addProductTab, setAddProductTab] = useState<'overview' | 'highlights' | 'specifications' | 'features' | 'advantages'>('overview');
  const [editProductTab, setEditProductTab] = useState<'overview' | 'highlights' | 'specifications' | 'features' | 'advantages'>('overview');
  const [addProductError, setAddProductError] = useState<string | null>(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [editProductError, setEditProductError] = useState<string | null>(null);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);`;

content = content.replace(oldTabsState, newTabsState);

// 6. Reset error states in handleCloseAddProduct and handleOpenEditProduct
content = content.replace(
  `  const handleCloseAddProduct = () => {
    setIsAddProductOpen(false);
    setAddProductTab('overview');`,
  `  const handleCloseAddProduct = () => {
    setIsAddProductOpen(false);
    setAddProductTab('overview');
    setAddProductError(null);
    setIsSavingProduct(false);`
);

content = content.replace(
  `  const handleOpenEditProduct = async (prod: ProductItem) => {
    setEditProductTab('overview');`,
  `  const handleOpenEditProduct = async (prod: ProductItem) => {
    setEditProductTab('overview');
    setEditProductError(null);
    setIsUpdatingProduct(false);`
);

// 7. Update Add Product form onSubmit and error alert
const oldAddSubmit = `            <form className="modal-body-content" onSubmit={async (e) => {
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
                specTableRows: (newProduct.specRows || []).filter(r => Object.values(r || {}).some(v => v && v.trim())),
                status: newProduct.status || 'Active',
                order: newProduct.order !== undefined ? Number(newProduct.order) : products.length + 1
              });
              setProducts(getStoredProducts());
              handleCloseAddProduct();
              triggerToast(\`Product "\${newProdItem?.name || newProduct.name}" published successfully!\`);
            }}>`;

const newAddSubmit = `            <form className="modal-body-content" onSubmit={async (e) => {
              e.preventDefault();
              setAddProductError(null);
              if (!newProduct.name.trim()) {
                setAddProductError('Please enter a machine model title');
                return;
              }
              setIsSavingProduct(true);
              try {
                const newProdItem = await addProduct({
                  name: newProduct.name.trim(),
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
                  specTableRows: (newProduct.specRows || []).filter(r => Object.values(r || {}).some(v => v && v.trim())),
                  status: newProduct.status || 'Active',
                  order: newProduct.order !== undefined ? Number(newProduct.order) : products.length + 1
                });
                await fetchProducts();
                setProducts(getStoredProducts());
                handleCloseAddProduct();
                triggerToast(\`Product "\${newProdItem?.name || newProduct.name}" published successfully!\`);
              } catch (err: any) {
                const errMsg = extractApiErrorMessage(err, 'Failed to save product to backend database');
                setAddProductError(errMsg);
              } finally {
                setIsSavingProduct(false);
              }
            }}>
              {addProductError && (
                <div style={{
                  marginBottom: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.875rem'
                }}>
                  <AlertTriangle size={18} style={{ flexShrink: 0, color: '#DC2626' }} />
                  <span style={{ fontWeight: 600 }}>{addProductError}</span>
                </div>
              )}`;

content = content.replace(oldAddSubmit, newAddSubmit);

// 8. Update Add Product submit button
const oldAddButton = `              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="submit" className="btn btn-orange" style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                  <Plus size={18} />
                  <span>Publish Product & Technical Specifications</span>
                </button>`;

const newAddButton = `              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  type="submit"
                  disabled={isSavingProduct}
                  className="btn btn-orange"
                  style={{ flex: 1, justifyContent: 'center', padding: '14px', fontSize: '1rem', opacity: isSavingProduct ? 0.7 : 1, cursor: isSavingProduct ? 'not-allowed' : 'pointer' }}
                >
                  {isSavingProduct ? <Loader2 size={18} className="spin" /> : <Plus size={18} />}
                  <span>{isSavingProduct ? 'Publishing Product to Database...' : 'Publish Product & Technical Specifications'}</span>
                </button>`;

content = content.replace(oldAddButton, newAddButton);

// 9. Update Edit Product form onSubmit and error alert
const oldEditSubmit = `            <form
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
                  specTableRows: editingProduct.specTableRows,
                  status: editingProduct.status || 'Active',
                  order: editingProduct.order !== undefined ? Number(editingProduct.order) : 0
                });
                setProducts(getStoredProducts());
                setEditingProduct(null);
                triggerToast(\`Product "\${updated?.name || editingProduct.name}" updated successfully!\`);
              }}
            >`;

const newEditSubmit = `            <form
              className="modal-body-content"
              onSubmit={async (e) => {
                e.preventDefault();
                setEditProductError(null);
                if (!editingProduct.name.trim()) {
                  setEditProductError('Please enter a machine model title');
                  return;
                }
                setIsUpdatingProduct(true);
                try {
                  const updated = await updateProduct(editingProduct.id, {
                    name: editingProduct.name.trim(),
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
                    specTableRows: editingProduct.specTableRows,
                    status: editingProduct.status || 'Active',
                    order: editingProduct.order !== undefined ? Number(editingProduct.order) : 0
                  });
                  await fetchProducts();
                  setProducts(getStoredProducts());
                  setEditingProduct(null);
                  triggerToast(\`Product "\${updated?.name || editingProduct.name}" updated successfully!\`);
                } catch (err: any) {
                  const errMsg = extractApiErrorMessage(err, 'Failed to update product in backend database');
                  setEditProductError(errMsg);
                } finally {
                  setIsUpdatingProduct(false);
                }
              }}
            >
              {editProductError && (
                <div style={{
                  marginBottom: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.875rem'
                }}>
                  <AlertTriangle size={18} style={{ flexShrink: 0, color: '#DC2626' }} />
                  <span style={{ fontWeight: 600 }}>{editProductError}</span>
                </div>
              )}`;

content = content.replace(oldEditSubmit, newEditSubmit);

// 10. Update Edit Product save button
const oldEditButton = `              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                <button
                  type="submit"
                  className="btn btn-orange"
                  style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}
                >
                  <Save size={18} />
                  <span>Save Machine Changes & Content</span>
                </button>`;

const newEditButton = `              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                <button
                  type="submit"
                  disabled={isUpdatingProduct}
                  className="btn btn-orange"
                  style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '0.95rem', opacity: isUpdatingProduct ? 0.7 : 1, cursor: isUpdatingProduct ? 'not-allowed' : 'pointer' }}
                >
                  {isUpdatingProduct ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
                  <span>{isUpdatingProduct ? 'Saving Changes to Database...' : 'Save Machine Changes & Content'}</span>
                </button>`;

content = content.replace(oldEditButton, newEditButton);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched AdminDashboard.tsx');

import { apiClient, extractApiErrorMessage } from './api';

export interface AncillarySpecItem {
  label: string;
  value: string;
  isPillList?: boolean;
}

export interface AncillaryVariantItem {
  id: string;
  name: string;
  image: string;
  description: string;
  imageClass?: string;
}

export interface AncillaryEquipmentItem {
  id: string;
  name: string;
  categoryBadge: string;
  compatibilityBadge: string;
  image: string;
  layoutType: 'standard' | 'dual_variant' | 'triple_variant';
  variants?: AncillaryVariantItem[];
  specsTitle?: string;
  specs: AncillarySpecItem[];
  quoteLabel?: string;
  whatsAppMessage?: string;
  applicableCategories?: string[];
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MachineCategoryOption {
  slug: string;
  name: string;
}

export const ALL_MACHINE_CATEGORIES: MachineCategoryOption[] = [
  { slug: 'fly-ash-brick-machine', name: 'Fly Ash Brick Machine' },
  { slug: 'hollow-and-solid-block-machine', name: 'Hollow and Solid Block Machine' },
  { slug: 'inter-block-making-machine', name: 'Inter Block Making Machine' },
  { slug: 'paver-block-machine', name: 'Paver Block Machine' },
  { slug: 'batching-plant', name: 'Batching Plant' },
  { slug: 'storage-silo', name: 'Storage Silo' },
  { slug: 'machine-spares', name: 'Machine Spares' },
];

export const ANCILLARY_STORAGE_KEY = 'jupiter_ancillary_equipment';
export const ANCILLARY_CATEGORIES_STORAGE_KEY = 'jupiter_ancillary_enabled_categories';
export const DEFAULT_ENABLED_CATEGORIES = ['fly-ash-brick-machine', 'paver-block-machine'];

// Empty default - no mock data or hardcoded machinery content
export const DEFAULT_ANCILLARY_EQUIPMENT: AncillaryEquipmentItem[] = [];

// Clean legacy localStorage keys so no old browser-cached data ever overrides the database
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('jupiter_ancillary_equipment');
    localStorage.removeItem('jupiter_ancillary_equipment_v2');
    localStorage.removeItem('jupiter_ancillary_enabled_categories');
  } catch (_) {}
}

// In-memory runtime state populated strictly from backend database
let _cachedEquipment: AncillaryEquipmentItem[] | null = null;
let _cachedCategories: string[] | null = null;
let _fetchPromise: Promise<AncillaryEquipmentItem[]> | null = null;
let _categoriesPromise: Promise<string[]> | null = null;

// ─────────────────────────────────────────────────────────
// API DATA ACCESSORS (EXCLUSIVELY POSTGRES DATABASE)
// ─────────────────────────────────────────────────────────

export const fetchAncillaryEquipment = async (forceRefresh: boolean = false): Promise<AncillaryEquipmentItem[]> => {
  if (!forceRefresh && _fetchPromise) {
    return _fetchPromise;
  }

  _fetchPromise = (async () => {
    try {
      let data: any = null;
      try {
        const response = await apiClient.get('/ancillary-equipment', { timeout: 15000 });
        data = response.data?.data || response.data;
      } catch (clientErr) {
        // Fallback to Vite dev / live proxy
        const res = await fetch('/api/ancillary-equipment');
        const json = await res.json();
        data = json.data || json;
      }

      if (Array.isArray(data)) {
        const sorted = data.map((item: any) => ({
          ...item,
          applicableCategories: Array.isArray(item.applicableCategories) ? item.applicableCategories : [],
        })).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

        _cachedEquipment = sorted;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('jupiter_ancillary_updated', { detail: sorted }));
        }
        return sorted;
      }
      return [];
    } catch (err) {
      console.error('Failed to fetch ancillary equipment from backend database API:', err);
      return _cachedEquipment || [];
    } finally {
      _fetchPromise = null;
    }
  })();

  return _fetchPromise;
};

export const fetchAncillaryEnabledCategories = async (forceRefresh: boolean = false): Promise<string[]> => {
  if (!forceRefresh && _categoriesPromise) {
    return _categoriesPromise;
  }

  _categoriesPromise = (async () => {
    try {
      let data: any = null;
      try {
        const response = await apiClient.get('/ancillary-equipment/categories', { timeout: 15000 });
        data = response.data?.data || response.data;
      } catch (clientErr) {
        const res = await fetch('/api/ancillary-equipment/categories');
        const json = await res.json();
        data = json.data || json;
      }

      if (Array.isArray(data)) {
        _cachedCategories = data;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('jupiter_ancillary_updated'));
        }
        return data;
      }
      return DEFAULT_ENABLED_CATEGORIES;
    } catch (err) {
      console.error('Failed to fetch ancillary categories from backend database API:', err);
      return _cachedCategories || DEFAULT_ENABLED_CATEGORIES;
    } finally {
      _categoriesPromise = null;
    }
  })();

  return _categoriesPromise;
};

// Synchronous getters reading from in-memory state fetched directly from backend database
export const getStoredAncillaryEquipment = (): AncillaryEquipmentItem[] => {
  if (_cachedEquipment !== null) {
    return _cachedEquipment;
  }
  // Immediate trigger if cache empty
  fetchAncillaryEquipment(true).catch(() => {});
  return [];
};

export const getAncillaryEnabledCategories = (): string[] => {
  if (_cachedCategories !== null) {
    return _cachedCategories;
  }
  fetchAncillaryEnabledCategories(true).catch(() => {});
  return DEFAULT_ENABLED_CATEGORIES;
};

export const isAncillaryEnabledForCategory = (categorySlug: string): boolean => {
  const enabled = getAncillaryEnabledCategories();
  const slug = (categorySlug || '').toLowerCase();
  return enabled.some(s => s.toLowerCase() === slug);
};

export const saveStoredAncillaryEquipment = (items: AncillaryEquipmentItem[]): void => {
  _cachedEquipment = items;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jupiter_ancillary_updated', { detail: items }));
  }
};

// ─────────────────────────────────────────────────────────
// MUTATIONS (PERSISTED DIRECTLY TO POSTGRES DATABASE)
// ─────────────────────────────────────────────────────────

export const addAncillaryEquipment = async (
  itemData: Omit<AncillaryEquipmentItem, 'id' | 'order' | 'createdAt'> & { order?: number }
): Promise<AncillaryEquipmentItem> => {
  const current = _cachedEquipment || [];
  const order = itemData.order ?? (current.length > 0 ? Math.max(...current.map(i => i.order || 0)) + 1 : 1);

  const payload = {
    ...itemData,
    order,
  };

  try {
    const res = await apiClient.post('/ancillary-equipment', payload, { timeout: 15000 });
    const created: AncillaryEquipmentItem = res.data?.data || res.data;
    if (created && created.id) {
      // Re-fetch all items directly from database
      const fresh = await fetchAncillaryEquipment(true);
      return fresh.find(i => i.id === created.id) || created;
    }
    throw new Error('Invalid response from server when creating equipment in database');
  } catch (err) {
    console.error('Failed to save ancillary equipment to backend database:', err);
    const msg = extractApiErrorMessage(err, 'Failed to save equipment to database');
    throw new Error(msg);
  }
};

export const updateAncillaryEquipment = async (
  id: string,
  updates: Partial<AncillaryEquipmentItem>
): Promise<AncillaryEquipmentItem> => {
  try {
    const res = await apiClient.put(`/ancillary-equipment/${encodeURIComponent(id)}`, updates, { timeout: 15000 });
    const updated: AncillaryEquipmentItem = res.data?.data || res.data;
    if (updated && updated.id) {
      // Re-fetch all items directly from database
      const fresh = await fetchAncillaryEquipment(true);
      return fresh.find(i => i.id === id) || updated;
    }
    throw new Error('Invalid response from server when updating equipment in database');
  } catch (err) {
    console.error(`Failed to update ancillary equipment ${id} in backend database:`, err);
    const msg = extractApiErrorMessage(err, 'Failed to update equipment in database');
    throw new Error(msg);
  }
};

export const deleteAncillaryEquipment = async (id: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/ancillary-equipment/${encodeURIComponent(id)}`, { timeout: 15000 });
    // Re-fetch latest records directly from database
    await fetchAncillaryEquipment(true);
    return true;
  } catch (err) {
    console.error(`Failed to delete ancillary equipment ${id} from database:`, err);
    const msg = extractApiErrorMessage(err, 'Failed to delete equipment from database');
    throw new Error(msg);
  }
};

export const toggleAncillaryEquipmentStatus = async (id: string): Promise<boolean> => {
  try {
    const res = await apiClient.patch(`/ancillary-equipment/${encodeURIComponent(id)}/toggle`, {}, { timeout: 15000 });
    const updated: AncillaryEquipmentItem = res.data?.data || res.data;
    await fetchAncillaryEquipment(true);
    return updated?.isActive ?? true;
  } catch (err) {
    console.error(`Failed to toggle status for ancillary equipment ${id}:`, err);
    throw err;
  }
};

export const reorderAncillaryEquipment = async (id: string, direction: 'up' | 'down'): Promise<AncillaryEquipmentItem[]> => {
  try {
    const res = await apiClient.put('/ancillary-equipment/reorder', { id, direction }, { timeout: 15000 });
    const updatedList = res.data?.data;
    if (Array.isArray(updatedList)) {
      _cachedEquipment = updatedList;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('jupiter_ancillary_updated', { detail: updatedList }));
      }
      return updatedList;
    }
  } catch (err) {
    console.error('Failed to persist equipment reordering to database:', err);
  }
  return fetchAncillaryEquipment(true);
};

export const saveAncillaryEnabledCategories = async (categories: string[]): Promise<void> => {
  try {
    const res = await apiClient.put('/ancillary-equipment/categories', { categories }, { timeout: 15000 });
    const updated = res.data?.data;
    _cachedCategories = Array.isArray(updated) ? updated : categories;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('jupiter_ancillary_updated'));
    }
  } catch (err) {
    console.error('Failed to save ancillary categories to database:', err);
    throw err;
  }
};

export const toggleAncillaryCategory = async (categorySlug: string): Promise<string[]> => {
  const current = getAncillaryEnabledCategories();
  const slug = categorySlug.toLowerCase();
  let updated: string[];
  if (current.includes(slug)) {
    updated = current.filter(s => s !== slug);
  } else {
    updated = [...current, slug];
  }
  await saveAncillaryEnabledCategories(updated);
  return updated;
};

export const resetAncillaryEquipmentToDefault = async (): Promise<AncillaryEquipmentItem[]> => {
  try {
    const res = await apiClient.post('/ancillary-equipment/reset', {}, { timeout: 20000 });
    const data = res.data?.data || res.data;
    if (Array.isArray(data)) {
      _cachedEquipment = data;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('jupiter_ancillary_updated', { detail: data }));
      }
      return data;
    }
  } catch (err) {
    console.error('Failed to reset ancillary equipment in database:', err);
  }
  return fetchAncillaryEquipment(true);
};

// Immediate background fetch from database at module load
if (typeof window !== 'undefined') {
  fetchAncillaryEquipment(true).catch(() => {});
  fetchAncillaryEnabledCategories(true).catch(() => {});
}

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
  layoutType: 'standard' | 'dual_variant';
  variants?: AncillaryVariantItem[];
  specsTitle?: string;
  specs: AncillarySpecItem[];
  quoteLabel?: string;
  whatsAppMessage?: string;
  applicableCategories?: string[];
  order: number;
  isActive: boolean;
  createdAt?: string;
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

// By default, enable on Fly Ash Brick Machine (as requested by user)
export const DEFAULT_ENABLED_CATEGORIES = ['fly-ash-brick-machine'];

export const getAncillaryEnabledCategories = (): string[] => {
  try {
    const raw = localStorage.getItem(ANCILLARY_CATEGORIES_STORAGE_KEY);
    if (!raw) return DEFAULT_ENABLED_CATEGORIES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ENABLED_CATEGORIES;
  } catch (err) {
    return DEFAULT_ENABLED_CATEGORIES;
  }
};

export const saveAncillaryEnabledCategories = (categories: string[]): void => {
  try {
    localStorage.setItem(ANCILLARY_CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('jupiter_ancillary_updated'));
    }
  } catch (err) {
    console.error('Failed to save ancillary enabled categories', err);
  }
};

export const isAncillaryEnabledForCategory = (categorySlug: string): boolean => {
  const enabled = getAncillaryEnabledCategories();
  const slug = (categorySlug || '').toLowerCase();
  return enabled.some(s => s.toLowerCase() === slug);
};

export const toggleAncillaryCategory = (categorySlug: string): string[] => {
  const current = getAncillaryEnabledCategories();
  const slug = categorySlug.toLowerCase();
  let updated: string[];
  if (current.includes(slug)) {
    updated = current.filter(s => s !== slug);
  } else {
    updated = [...current, slug];
  }
  saveAncillaryEnabledCategories(updated);
  return updated;
};

export const DEFAULT_ANCILLARY_EQUIPMENT: AncillaryEquipmentItem[] = [
  {
    id: 'ancillary-pan-mixer',
    name: 'Pan Mixer',
    categoryBadge: 'Planetary Mixing System',
    compatibilityBadge: 'OEM Standard',
    image: '/images/catalogue/pan-mixer.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '1000 kg, 750 kg, 500 kg, 350 kg, 250 kg',
        isPillList: true,
      },
      {
        label: 'Power Required',
        value: '30 HP, 25 HP, 20 HP, 15 HP, 10 HP',
        isPillList: true,
      },
      {
        label: 'Gear Box',
        value: 'V10, V9, V8, V7, V6',
        isPillList: false,
      },
      {
        label: 'Method Of Mixing',
        value: 'Heavy Rollers With Hard Faced Scrappers',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pan Mixer Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pan Mixer specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 1,
    isActive: true,
    createdAt: '2026-10-26T00:00:00.000Z',
  },
  {
    id: 'ancillary-conveyor',
    name: 'Belt Conveyor',
    categoryBadge: 'Continuous Material Feed',
    compatibilityBadge: 'OEM Standard',
    image: '/images/catalogue/conveyor.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '2 Tons',
        isPillList: false,
      },
      {
        label: 'Power Required',
        value: '3 HP',
        isPillList: false,
      },
      {
        label: 'Gear Box',
        value: '337/40:1',
        isPillList: false,
      },
      {
        label: 'Storage Mode',
        value: 'Thro Intermittent Bins',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Conveyor Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Conveyor system pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 2,
    isActive: true,
    createdAt: '2026-10-26T00:00:00.000Z',
  },
  {
    id: 'ancillary-pallet-truck',
    name: 'Pallet Truck Systems',
    categoryBadge: 'Material Handling & Transport',
    compatibilityBadge: 'Dual Configurations',
    image: '/images/catalogue/pallet-truck-type1.png',
    layoutType: 'dual_variant',
    variants: [
      {
        id: 'var-type1',
        name: 'Type 1 • Manual',
        image: '/images/catalogue/pallet-truck-type1.png',
        description: 'Hand Pallet Truck 250 kg Capacity with Wheels and 550 mm Fork Width',
        imageClass: 'pdp-pallet-img-type1',
      },
      {
        id: 'var-type2',
        name: 'Type 2 • Hydraulic',
        image: '/images/catalogue/pallet-truck-type2.png',
        description: 'Heavy-Duty Hydraulic Tri-Wheel Lifting Vehicle for Stacked Brick Pallets',
      },
    ],
    specsTitle: 'Type 2 Technical Specifications',
    specs: [
      {
        label: 'Capacity',
        value: 'Hand Pallet Truck\n500 kg',
        isPillList: false,
      },
      {
        label: 'Wheels',
        value: '3 Wheels',
        isPillList: false,
      },
      {
        label: 'System',
        value: 'Hydraulic Lifting Vehicles',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Pallet Truck Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Pallet Truck pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 3,
    isActive: true,
    createdAt: '2026-10-26T00:00:00.000Z',
  },
  {
    id: 'ancillary-wheel-barrow',
    name: 'Wheel Barrows',
    categoryBadge: 'On-Site Raw Material Hauling',
    compatibilityBadge: 'Heavy-Duty Tub',
    image: '/images/catalogue/wheel-barrow.png',
    layoutType: 'standard',
    specs: [
      {
        label: 'Capacity',
        value: '( 50 kg )',
        isPillList: false,
      },
      {
        label: 'Wheels',
        value: '2 Wheels',
        isPillList: false,
      },
    ],
    quoteLabel: 'Get Wheel Barrow Quote',
    whatsAppMessage: 'Hello Jupiter, I am interested in the Wheel Barrow specifications and pricing.',
    applicableCategories: ['fly-ash-brick-machine'],
    order: 4,
    isActive: true,
    createdAt: '2026-10-26T00:00:00.000Z',
  },
];

export const getStoredAncillaryEquipment = (): AncillaryEquipmentItem[] => {
  try {
    const raw = localStorage.getItem(ANCILLARY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .map((item) => ({
            ...item,
            applicableCategories: (item.applicableCategories && item.applicableCategories.length > 0)
              ? item.applicableCategories
              : ['fly-ash-brick-machine'],
          }))
          .sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    }
  } catch (err) {
    console.error('Error loading ancillary equipment from storage:', err);
  }
  return DEFAULT_ANCILLARY_EQUIPMENT;
};

export const saveStoredAncillaryEquipment = (items: AncillaryEquipmentItem[]): void => {
  try {
    localStorage.setItem(ANCILLARY_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('jupiter_ancillary_updated'));
  } catch (err) {
    console.error('Error saving ancillary equipment to storage:', err);
  }
};

export const addAncillaryEquipment = (
  itemData: Omit<AncillaryEquipmentItem, 'id' | 'order' | 'createdAt'> & { order?: number }
): AncillaryEquipmentItem => {
  const current = getStoredAncillaryEquipment();
  const newId = `ancillary-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const newItem: AncillaryEquipmentItem = {
    ...itemData,
    id: newId,
    order: itemData.order ?? current.length + 1,
    createdAt: new Date().toISOString(),
  };

  const updated = [...current, newItem];
  saveStoredAncillaryEquipment(updated);
  return newItem;
};

export const updateAncillaryEquipment = (
  id: string,
  updates: Partial<AncillaryEquipmentItem>
): AncillaryEquipmentItem | null => {
  const current = getStoredAncillaryEquipment();
  const index = current.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updatedItem: AncillaryEquipmentItem = {
    ...current[index],
    ...updates,
  };
  current[index] = updatedItem;
  saveStoredAncillaryEquipment(current);
  return updatedItem;
};

export const deleteAncillaryEquipment = (id: string): boolean => {
  const current = getStoredAncillaryEquipment();
  const filtered = current.filter((item) => item.id !== id);
  if (filtered.length === current.length) return false;

  saveStoredAncillaryEquipment(filtered);
  return true;
};

export const toggleAncillaryEquipmentStatus = (id: string): boolean => {
  const current = getStoredAncillaryEquipment();
  const item = current.find((i) => i.id === id);
  if (!item) return false;

  item.isActive = !item.isActive;
  saveStoredAncillaryEquipment(current);
  return item.isActive;
};

export const reorderAncillaryEquipment = (id: string, direction: 'up' | 'down'): AncillaryEquipmentItem[] => {
  const current = [...getStoredAncillaryEquipment()].sort((a, b) => (a.order || 0) - (b.order || 0));
  const index = current.findIndex((i) => i.id === id);
  if (index === -1) return current;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= current.length) return current;

  // Swap items
  const temp = current[index];
  current[index] = current[targetIndex];
  current[targetIndex] = temp;

  // Re-assign 1-based order
  current.forEach((item, idx) => {
    item.order = idx + 1;
  });

  saveStoredAncillaryEquipment(current);
  return current;
};

export const resetAncillaryEquipmentToDefault = (): AncillaryEquipmentItem[] => {
  saveStoredAncillaryEquipment(DEFAULT_ANCILLARY_EQUIPMENT);
  return DEFAULT_ANCILLARY_EQUIPMENT;
};

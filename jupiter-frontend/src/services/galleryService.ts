import { IMAGES } from '../assets/images/images';

export interface GalleryPhotoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  machine: string;
  output: string;
  image: string;
  description?: string;
  createdAt?: string;
}

export const INITIAL_GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'P-01',
    title: 'Fully Automatic Concrete Block Manufacturing Line',
    category: 'Block Machines',
    location: 'Coimbatore, Tamil Nadu',
    machine: 'Jupiter Titan-8000 Automatic Plant',
    output: '22,000 blocks / day',
    image: IMAGES.concreteBlocks || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty hydraulic pressing with automatic PLC pallet conveyor line.'
  },
  {
    id: 'P-02',
    title: 'High-Volume Fly Ash Brick Continuous Production Unit',
    category: 'Fly Ash Plants',
    location: 'Nagpur, Maharashtra',
    machine: 'Jupiter MegaPress-24 Plant',
    output: '45,000 bricks / day',
    image: IMAGES.flyAshBricks || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Fly ash, lime, and gypsum auto-batching and hydraulic pressing system.'
  },
  {
    id: 'P-03',
    title: 'Dual-Color Interlocking Paver Block Facility',
    category: 'Paver Units',
    location: 'Bengaluru, Karnataka',
    machine: 'Jupiter PaverMaster Dual-Color',
    output: '6,000 sq.ft pavers / day',
    image: IMAGES.paverBlocks || 'https://images.unsplash.com/photo-1584463699026-6f81c9676e10?auto=format&fit=crop&w=800&q=80',
    description: 'High-frequency vibration tables for glossy, heavy-duty commercial pavers.'
  },
  {
    id: 'P-04',
    title: 'Compact Planetary Concrete Batching Plant 30 m³/hr',
    category: 'Batching Mixers',
    location: 'Hyderabad, Telangana',
    machine: 'Jupiter Compact Batch-30',
    output: '30 m³/hr concrete output',
    image: IMAGES.batchingPlants || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Automated 4-bin aggregate batching and precision loadcell weighing.'
  },
  {
    id: 'P-05',
    title: 'CNC Machined Hardened Block & Paver Moulds',
    category: 'Precision Moulds',
    location: 'Kaniyur, Coimbatore HQ',
    machine: 'Jupiter Precision Tooling',
    output: 'Custom Mould Tooling',
    image: IMAGES.performanceMachine || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Heat-treated wear plates ensuring 150,000+ cycle operational longevity.'
  },
  {
    id: 'P-06',
    title: 'Turnkey Infrastructure Factory Installation',
    category: 'Block Machines',
    location: 'Salem, Tamil Nadu',
    machine: 'Jupiter HydroBlock-4000 System',
    output: '12,000 solid blocks / day',
    image: IMAGES.successPlant || 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    description: 'Turnkey foundation layout, silo feeding, and automated curing racks.'
  },
  {
    id: 'P-07',
    title: 'Industrial Manufacturing Floor & Assembly Bay',
    category: 'Factory Infrastructure',
    location: 'Jupiter Coimbatore Plant',
    machine: 'Machinery Assembly Bay',
    output: 'ISO Certified Facility',
    image: IMAGES.heroBanner || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'State-of-the-art manufacturing unit with dedicated hydraulic test rigs.'
  },
  {
    id: 'P-08',
    title: 'Automated Hydraulic Stacker & Curing Conveyor Line',
    category: 'Block Machines',
    location: 'Ahmedabad, Gujarat',
    machine: 'Jupiter AutoStack-10',
    output: 'Fully Automated Stacking',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    description: 'Synchronized green block stacking minimizing breakage and labor.'
  },
  {
    id: 'P-09',
    title: 'Heavy Duty Planetary Pan Mixer Batching Trial',
    category: 'Batching Mixers',
    location: 'Coimbatore, Tamil Nadu',
    machine: 'Planetary Mixer 750 Kgs',
    output: '750 Kgs / Batch',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    description: 'Uniform homogeneity mixing with heavy-duty wear-resistant alloy blades.'
  }
];

const LOCAL_STORAGE_KEY = 'jupiter_machinery_photos';

export const getStoredGalleryPhotos = (): GalleryPhotoItem[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } else {
      // First time initialization
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_PHOTOS));
      return INITIAL_GALLERY_PHOTOS;
    }
  } catch (e) {
    console.error('Failed to load gallery photos', e);
  }
  return INITIAL_GALLERY_PHOTOS;
};

export const saveStoredGalleryPhotos = (photos: GalleryPhotoItem[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
    window.dispatchEvent(new Event('jupiter_gallery_updated'));
  } catch (e) {
    console.error('Failed to save gallery photos', e);
  }
};

export const addGalleryPhoto = (photo: Omit<GalleryPhotoItem, 'id'>): GalleryPhotoItem => {
  const current = getStoredGalleryPhotos();
  const newPhoto: GalleryPhotoItem = {
    ...photo,
    id: `P-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('en-GB')
  };
  const updated = [newPhoto, ...current];
  saveStoredGalleryPhotos(updated);
  return newPhoto;
};

export const deleteGalleryPhoto = (id: string): GalleryPhotoItem[] => {
  const current = getStoredGalleryPhotos();
  const updated = current.filter(p => p.id !== id);
  saveStoredGalleryPhotos(updated);
  return updated;
};

export const resetToInitialPhotos = (): GalleryPhotoItem[] => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY_PHOTOS));
    window.dispatchEvent(new Event('jupiter_gallery_updated'));
  } catch (e) {
    console.error('Failed to reset photos', e);
  }
  return INITIAL_GALLERY_PHOTOS;
};

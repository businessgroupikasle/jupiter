import { IMAGES } from '../assets/images/images';
import { apiClient, API_BASE_URL } from './api';

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

export const INITIAL_GALLERY_PHOTOS: GalleryPhotoItem[] = [];

const LOCAL_STORAGE_KEY = 'jupiter_machinery_photos';

// Fetch gallery photos live from database
export const fetchGalleryPhotosFromDb = async (): Promise<GalleryPhotoItem[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/gallery`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: GalleryPhotoItem[] = json.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category || 'Manufacturing Plants',
          location: item.location || 'Coimbatore, Tamil Nadu',
          machine: item.machine || 'Jupiter Heavy Engineering',
          output: item.output || 'Commercial Grade',
          image: item.image || IMAGES.concreteBlocks || '/images/concrete-blocks.jpg',
          description: item.description || '',
          createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-GB') : undefined,
        }));

        saveStoredGalleryPhotos(mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Could not fetch gallery from backend API, using local cache:', err);
  }
  return getStoredGalleryPhotos();
};

export const clearAllGalleryPhotos = (): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('jupiter_gallery_updated'));
  } catch (e) {
    console.error('Failed to clear gallery photos', e);
  }

  // Delete live in DB
  apiClient.delete('/gallery').catch((err) => {
    console.warn('Could not clear gallery in backend DB:', err);
  });
};

export const getStoredGalleryPhotos = (): GalleryPhotoItem[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Automatically purge any dummy / placeholder gallery photos
        const filtered = parsed.filter(
          (p: any) =>
            !['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06', 'P-07', 'P-08', 'P-09'].includes(p?.id) &&
            !p?.title?.includes('Fully Automatic Concrete Block Manufacturing') &&
            !p?.title?.includes('High-Volume Fly Ash Brick Continuous') &&
            !p?.title?.includes('Dual-Color Interlocking Paver Block') &&
            !p?.title?.includes('Compact Planetary Concrete Batching') &&
            !p?.title?.includes('CNC Machined Hardened Block') &&
            !p?.title?.includes('Turnkey Infrastructure Factory') &&
            !p?.title?.includes('Industrial Manufacturing Floor') &&
            !p?.title?.includes('Automated Hydraulic Stacker') &&
            !p?.title?.includes('Heavy Duty Planetary Pan Mixer Batching')
        );
        if (filtered.length !== parsed.length) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
        }
        return filtered;
      }
    }
  } catch (e) {
    console.error('Failed to load gallery photos', e);
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  } catch (e) {}
  return [];
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
    image: photo.image || IMAGES.concreteBlocks || '/images/concrete-blocks.jpg',
    id: `P-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('en-GB')
  };
  const updated = [newPhoto, ...current];
  saveStoredGalleryPhotos(updated);

  // Synchronize live to database
  apiClient.post('/gallery', {
    title: newPhoto.title,
    category: newPhoto.category,
    location: newPhoto.location,
    machine: newPhoto.machine,
    output: newPhoto.output,
    image: newPhoto.image,
    description: newPhoto.description,
  }).then((res) => {
    if (res.data?.data?.id) {
      const currentList = getStoredGalleryPhotos();
      const updatedList = currentList.map(p => p.id === newPhoto.id ? { ...p, id: res.data.data.id } : p);
      saveStoredGalleryPhotos(updatedList);
    }
  }).catch((err) => {
    console.warn('Live DB gallery save failed (buffered locally):', err);
  });

  return newPhoto;
};

export const deleteGalleryPhoto = (id: string): GalleryPhotoItem[] => {
  const current = getStoredGalleryPhotos();
  const updated = current.filter(p => p.id !== id);
  saveStoredGalleryPhotos(updated);

  // Delete live from database
  apiClient.delete(`/gallery/${encodeURIComponent(id)}`).catch((err) => {
    console.warn('Live DB gallery delete failed:', err);
  });

  return updated;
};

export const resetToInitialPhotos = (): GalleryPhotoItem[] => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('jupiter_gallery_updated'));
  } catch (e) {
    console.error('Failed to reset photos', e);
  }
  return [];
};

// Background initial sync
fetchGalleryPhotosFromDb().catch(() => {});

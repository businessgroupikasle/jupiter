import { IMAGES } from '../assets/images/images';
import { apiClient } from './api';

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

let _cachedPhotos: GalleryPhotoItem[] = [];

// Fetch gallery photos live from database
export const fetchGalleryPhotosFromDb = async (): Promise<GalleryPhotoItem[]> => {
  try {
    const res = await apiClient.get('/gallery');
    if (res.data?.success && Array.isArray(res.data.data)) {
      const mapped: GalleryPhotoItem[] = res.data.data.map((item: any) => ({
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

      _cachedPhotos = mapped;
      window.dispatchEvent(new Event('jupiter_gallery_updated'));
      return mapped;
    }
  } catch (err) {
    console.warn('Could not fetch gallery from backend API:', err);
  }
  return _cachedPhotos;
};

export const clearAllGalleryPhotos = async (): Promise<void> => {
  try {
    await apiClient.delete('/gallery');
  } catch (err) {
    console.warn('Could not clear gallery in backend DB:', err);
  }
  _cachedPhotos = [];
  window.dispatchEvent(new Event('jupiter_gallery_updated'));
};

export const getStoredGalleryPhotos = (): GalleryPhotoItem[] => {
  return _cachedPhotos;
};

export const saveStoredGalleryPhotos = (photos: GalleryPhotoItem[]) => {
  _cachedPhotos = photos;
  window.dispatchEvent(new Event('jupiter_gallery_updated'));
};

export const addGalleryPhoto = async (photo: Omit<GalleryPhotoItem, 'id'>): Promise<GalleryPhotoItem> => {
  const payload = {
    title: photo.title,
    category: photo.category || 'Manufacturing Plants',
    location: photo.location || 'Coimbatore, Tamil Nadu',
    machine: photo.machine || 'Jupiter Heavy Engineering',
    output: photo.output || 'Commercial Grade',
    image: photo.image || IMAGES.concreteBlocks || '/images/concrete-blocks.jpg',
    description: photo.description || photo.title,
  };

  // Synchronize live to database
  const res = await apiClient.post('/gallery', payload);
  const newPhoto: GalleryPhotoItem = res.data?.data || {
    ...payload,
    id: `P-${Date.now()}`,
    createdAt: new Date().toLocaleDateString('en-GB')
  };

  _cachedPhotos = [newPhoto, ..._cachedPhotos.filter(p => p.id !== newPhoto.id)];
  window.dispatchEvent(new Event('jupiter_gallery_updated'));
  return newPhoto;
};

export const deleteGalleryPhoto = async (id: string): Promise<GalleryPhotoItem[]> => {
  await apiClient.delete(`/gallery/${encodeURIComponent(id)}`);
  _cachedPhotos = _cachedPhotos.filter(p => p.id !== id);
  window.dispatchEvent(new Event('jupiter_gallery_updated'));
  return _cachedPhotos;
};

export const resetToInitialPhotos = async (): Promise<GalleryPhotoItem[]> => {
  await clearAllGalleryPhotos();
  return [];
};

// Background initial sync from backend
fetchGalleryPhotosFromDb().catch(() => {});


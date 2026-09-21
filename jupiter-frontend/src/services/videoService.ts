export interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
  views: string;
  duration: string;
  image: string;
  category: 'All' | 'Block Machines' | 'Brick Machines' | 'Paver Machines' | 'Batching & Mixers' | 'Factory Tour';
  description?: string;
}

export const getYouTubeId = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  // Fallback if full URL or raw ID is given
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }
  return '';
};

export const getYouTubeEmbedUrl = (url: string): string => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
};

export const getYouTubeThumbnail = (url: string): string => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
};

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'VID-01',
    title: 'Fully Automatic Hydraulic Concrete Block Machine Live Demonstration',
    videoUrl: 'https://www.youtube.com/watch?v=RZot-EmDGHw',
    embedUrl: 'https://www.youtube.com/embed/RZot-EmDGHw?autoplay=1',
    views: '5.4K views',
    duration: '3:45',
    image: 'https://img.youtube.com/vi/RZot-EmDGHw/hqdefault.jpg',
    category: 'Block Machines',
    description: 'High-density hydraulic block forming machine operating at full cycle efficiency.'
  },
  {
    id: 'VID-02',
    title: 'High-Capacity Fly Ash Brick Making Plant in Full Operation',
    videoUrl: 'https://www.youtube.com/watch?v=wOvnltaFFng',
    embedUrl: 'https://www.youtube.com/embed/wOvnltaFFng?autoplay=1',
    views: '8.2K views',
    duration: '4:20',
    image: 'https://img.youtube.com/vi/wOvnltaFFng/hqdefault.jpg',
    category: 'Brick Machines',
    description: 'Continuous fly ash, cement, and quarry dust automatic pressing and stacking.'
  },
  {
    id: 'VID-03',
    title: 'Planetary Pan Mixer Raw Material Batching & Mixing Trial',
    videoUrl: 'https://www.youtube.com/watch?v=B8S9lUpUNrQ',
    embedUrl: 'https://www.youtube.com/embed/B8S9lUpUNrQ?autoplay=1',
    views: '3.1K views',
    duration: '2:50',
    image: 'https://img.youtube.com/vi/B8S9lUpUNrQ/hqdefault.jpg',
    category: 'Batching & Mixers',
    description: 'Uniform homogeneity mixing with heavy-duty wear-resistant alloy blades.'
  },
  {
    id: 'VID-04',
    title: 'Interlocking Paver Block High-Frequency Vibration Table Machine',
    videoUrl: 'https://www.youtube.com/watch?v=GU16dUBDOlU',
    embedUrl: 'https://www.youtube.com/embed/GU16dUBDOlU?autoplay=1',
    views: '6.7K views',
    duration: '3:15',
    image: 'https://img.youtube.com/vi/GU16dUBDOlU/hqdefault.jpg',
    category: 'Paver Machines',
    description: 'Dual vibration synchronization for flawless smooth top finish pavers.'
  },
  {
    id: 'VID-05',
    title: 'Automatic Pallet Stacker & Conveyor Machine System',
    videoUrl: 'https://www.youtube.com/watch?v=Pca1PZ1Gq-E',
    embedUrl: 'https://www.youtube.com/embed/Pca1PZ1Gq-E?autoplay=1',
    views: '4.8K views',
    duration: '3:30',
    image: 'https://img.youtube.com/vi/Pca1PZ1Gq-E/hqdefault.jpg',
    category: 'Block Machines',
    description: 'PLC-controlled pallet stacking and retrieval minimizing manual handling.'
  },
  {
    id: 'VID-06',
    title: 'Heavy Duty Pan Mixer with Skip Hoist Automatic Feeder',
    videoUrl: 'https://www.youtube.com/watch?v=aQrmQRazLBU',
    embedUrl: 'https://www.youtube.com/embed/aQrmQRazLBU?autoplay=1',
    views: '2.9K views',
    duration: '2:40',
    image: 'https://img.youtube.com/vi/aQrmQRazLBU/hqdefault.jpg',
    category: 'Batching & Mixers',
    description: 'Automated aggregate bucket lifting and bottom door quick-release discharge.'
  },
  {
    id: 'VID-07',
    title: 'Precision CNC Mould Machining & Hardening Process',
    videoUrl: 'https://www.youtube.com/watch?v=lD6xGTbz4is',
    embedUrl: 'https://www.youtube.com/embed/lD6xGTbz4is?autoplay=1',
    views: '3.6K views',
    duration: '4:10',
    image: 'https://img.youtube.com/vi/lD6xGTbz4is/hqdefault.jpg',
    category: 'Factory Tour',
    description: 'CNC wire-cut tooling and heat-treated alloy steel mould manufacturing.'
  },
  {
    id: 'VID-08',
    title: 'Multi-Cavity Solid & Hollow Concrete Block Compression Trial',
    videoUrl: 'https://www.youtube.com/watch?v=uGF1iSrWq9E',
    embedUrl: 'https://www.youtube.com/embed/uGF1iSrWq9E?autoplay=1',
    views: '7.5K views',
    duration: '3:55',
    image: 'https://img.youtube.com/vi/uGF1iSrWq9E/hqdefault.jpg',
    category: 'Block Machines',
    description: 'High-tonnage hydraulic pressing producing sharp edges and consistent block density.'
  },
  {
    id: 'VID-09',
    title: 'Dual-Color Paver Face-Mix Feeder Hydraulic Pressing',
    videoUrl: 'https://www.youtube.com/watch?v=m4luRfE7JYo',
    embedUrl: 'https://www.youtube.com/embed/m4luRfE7JYo?autoplay=1',
    views: '5.1K views',
    duration: '3:05',
    image: 'https://img.youtube.com/vi/m4luRfE7JYo/hqdefault.jpg',
    category: 'Paver Machines',
    description: 'Top decorative pigment layer addition with uniform base concrete bonding.'
  },
  {
    id: 'VID-10',
    title: 'Turnkey Brick Manufacturing Plant Setup & Layout Tour',
    videoUrl: 'https://www.youtube.com/watch?v=Rq2OAmSwJw4',
    embedUrl: 'https://www.youtube.com/embed/Rq2OAmSwJw4?autoplay=1',
    views: '11.4K views',
    duration: '6:15',
    image: 'https://img.youtube.com/vi/Rq2OAmSwJw4/hqdefault.jpg',
    category: 'Factory Tour',
    description: 'Complete end-to-end plant layout from silo storage to automated curing bay.'
  },
  {
    id: 'VID-11',
    title: 'Concrete Batching Plant 30 m³/hr Test Run & Discharge',
    videoUrl: 'https://www.youtube.com/watch?v=ayZ7OFv50-I',
    embedUrl: 'https://www.youtube.com/embed/ayZ7OFv50-I?autoplay=1',
    views: '4.3K views',
    duration: '3:20',
    image: 'https://img.youtube.com/vi/ayZ7OFv50-I/hqdefault.jpg',
    category: 'Batching & Mixers',
    description: 'Loadcell aggregate weighing bins and high-speed planetary batch discharge.'
  },
  {
    id: 'VID-12',
    title: 'Hydraulic Power Pack Unit & PLC Panel Inspection',
    videoUrl: 'https://www.youtube.com/watch?v=Df3jj5ze9xw',
    embedUrl: 'https://www.youtube.com/embed/Df3jj5ze9xw?autoplay=1',
    views: '2.8K views',
    duration: '2:30',
    image: 'https://img.youtube.com/vi/Df3jj5ze9xw/hqdefault.jpg',
    category: 'Factory Tour',
    description: 'Yukon hydraulic directional valves and Schneider PLC electrical safety checks.'
  },
  {
    id: 'VID-13',
    title: 'High-Pressure Hydraulic Cylinder Dynamic Testing',
    videoUrl: 'https://www.youtube.com/watch?v=AbDUa9iLqyw',
    embedUrl: 'https://www.youtube.com/embed/AbDUa9iLqyw?autoplay=1',
    views: '3.4K views',
    duration: '3:10',
    image: 'https://img.youtube.com/vi/AbDUa9iLqyw/hqdefault.jpg',
    category: 'Factory Tour',
    description: 'Hydrostatic pressure testing at 250 Bar ensuring zero seal leakage.'
  },
  {
    id: 'VID-14',
    title: 'Automated Green Brick Conveyor & Pallet Handling Line',
    videoUrl: 'https://www.youtube.com/watch?v=hFKnec4hgso',
    embedUrl: 'https://www.youtube.com/embed/hFKnec4hgso?autoplay=1',
    views: '4.6K views',
    duration: '2:45',
    image: 'https://img.youtube.com/vi/hFKnec4hgso/hqdefault.jpg',
    category: 'Brick Machines',
    description: 'Smooth green brick transport avoiding micro-cracks before initial curing.'
  },
  {
    id: 'VID-15',
    title: 'Fly Ash Brick Load & Crushing Strength Testing Machine',
    videoUrl: 'https://www.youtube.com/watch?v=p3vskpW0y78',
    embedUrl: 'https://www.youtube.com/embed/p3vskpW0y78?autoplay=1',
    views: '9.3K views',
    duration: '4:50',
    image: 'https://img.youtube.com/vi/p3vskpW0y78/hqdefault.jpg',
    category: 'Brick Machines',
    description: 'Universal Testing Machine (UTM) compression test exceeding 12.5 N/mm² standards.'
  },
  {
    id: 'VID-16',
    title: 'Jupiter Industries Factory Tour & Customer Machine Dispatch',
    videoUrl: 'https://www.youtube.com/watch?v=BOH0jcrvCFk',
    embedUrl: 'https://www.youtube.com/embed/BOH0jcrvCFk?autoplay=1',
    views: '14.2K views',
    duration: '5:40',
    image: 'https://img.youtube.com/vi/BOH0jcrvCFk/hqdefault.jpg',
    category: 'Factory Tour',
    description: 'Manufacturing bay overview, final QA inspection, and Pan-India trailer loading.'
  }
];

import { apiClient, API_BASE_URL } from './api';

const LOCAL_STORAGE_KEY = 'jupiter_machinery_videos';

// Fetch videos live from backend database
export const fetchVideosFromDb = async (): Promise<VideoItem[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/videos`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const dbVideos: VideoItem[] = json.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          videoUrl: item.videoUrl,
          embedUrl: item.embedUrl,
          views: item.views || '1.5K views',
          duration: item.duration || '3:00',
          image: item.image,
          category: item.category as any,
          description: item.description,
        }));

        // Merge with existing
        const currentLocal = getStoredVideos();
        const dbIds = new Set(dbVideos.map(v => v.id));
        const merged = [...dbVideos, ...currentLocal.filter(v => !dbIds.has(v.id))];
        saveStoredVideos(merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Could not fetch videos from backend API:', err);
  }
  return getStoredVideos();
};

export const getStoredVideos = (): VideoItem[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_VIDEOS));
      return INITIAL_VIDEOS;
    }
  } catch (e) {
    console.error('Failed to load stored videos', e);
  }
  return INITIAL_VIDEOS;
};

export const saveStoredVideos = (videos: VideoItem[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
    // Dispatch storage event for live reactive sync across pages
    window.dispatchEvent(new Event('jupiter_videos_updated'));
  } catch (e) {
    console.error('Failed to save videos', e);
  }
};

export const addVideo = (video: Omit<VideoItem, 'id'>): VideoItem => {
  const current = getStoredVideos();
  const newVideo: VideoItem = {
    ...video,
    id: `VID-${Date.now()}`,
  };
  const updated = [newVideo, ...current];
  saveStoredVideos(updated);

  // Synchronize live to database
  apiClient.post('/videos', {
    title: newVideo.title,
    videoUrl: newVideo.videoUrl,
    embedUrl: newVideo.embedUrl,
    views: newVideo.views,
    duration: newVideo.duration,
    image: newVideo.image,
    category: newVideo.category,
    description: newVideo.description,
  }).then((res) => {
    if (res.data?.data?.id) {
      const currentList = getStoredVideos();
      const nextList = currentList.map(v => v.id === newVideo.id ? { ...v, id: res.data.data.id } : v);
      saveStoredVideos(nextList);
    }
  }).catch((err) => {
    console.warn('Live DB video save failed (buffered locally):', err);
  });

  return newVideo;
};

export const deleteVideo = (id: string): void => {
  const current = getStoredVideos();
  const updated = current.filter(v => v.id !== id);
  saveStoredVideos(updated);

  // Delete live from database
  apiClient.delete(`/videos/${encodeURIComponent(id)}`).catch((err) => {
    console.warn('Live DB video delete failed:', err);
  });
};

export const resetToInitialVideos = (): VideoItem[] => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_VIDEOS));
    window.dispatchEvent(new Event('jupiter_videos_updated'));
  } catch (e) {
    console.error('Failed to reset videos', e);
  }
  return INITIAL_VIDEOS;
};

// Initial background sync
fetchVideosFromDb().catch(() => {});

import { IMAGES } from '../assets/images/images';
import { apiClient, API_BASE_URL } from './api';

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  location: string;
  machine: string;
  year: string;
  status: string;
  image: string;
  description?: string;
  capacity?: string;
  createdAt?: string;
}

export const INITIAL_PROJECTS: ProjectItem[] = [];

const PROJECTS_STORAGE_KEY = 'jupiter_projects';

// Fetch projects live from backend database
export const fetchProjectsFromDb = async (): Promise<ProjectItem[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: ProjectItem[] = json.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          client: item.client || 'Valued Client',
          location: item.location || 'Tamil Nadu, India',
          machine: item.machine || 'Jupiter Automatic Machinery',
          year: String(item.year || '2026'),
          status: item.status || 'Completed',
          capacity: item.capacity || 'High Production Output',
          image: item.image || IMAGES.successPlant || '/images/arunachala-plant.jpg',
          description: item.description || item.title || '',
          createdAt: item.createdAt
        }));

        saveStoredProjects(mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Could not fetch projects from backend API, using local cache:', err);
  }
  return getStoredProjects();
};

export const clearAllProjects = (): void => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('jupiter_projects_updated'));
  } catch (e) {
    console.error('Error clearing projects:', e);
  }

  // Delete live in DB
  apiClient.delete('/projects').catch((err) => {
    console.warn('Could not delete all projects from backend DB:', err);
  });
};

export const getStoredProjects = (): ProjectItem[] => {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Automatically purge any dummy / temporary placeholder projects
        const filtered = parsed.filter(
          (p: any) =>
            !['PRJ-01', 'PRJ-02', 'PRJ-03'].includes(p?.id) &&
            !p?.title?.includes('Arunachala Fly Ash') &&
            !p?.title?.includes('Sri Balaji High-Density') &&
            !p?.title?.includes('Apex Concrete Block')
        );
        if (filtered.length !== parsed.length) {
          localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filtered));
        }
        return filtered;
      }
    }
  } catch (e) {
    console.error('Error reading projects:', e);
  }
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([]));
  } catch (e) {}
  return [];
};

export const saveStoredProjects = (projects: ProjectItem[]): void => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event('jupiter_projects_updated'));
  } catch (e) {
    console.error('Error saving jupiter_projects:', e);
  }
};

export const addProject = (project: Partial<ProjectItem>): ProjectItem => {
  const current = getStoredProjects();
  const newItem: ProjectItem = {
    id: project.id || `PRJ-${Date.now()}`,
    title: project.title || 'New Plant Installation',
    client: project.client || 'Valued Client',
    location: project.location || 'Tamil Nadu, India',
    machine: project.machine || 'Jupiter Automatic Machinery',
    year: project.year || String(new Date().getFullYear()),
    status: project.status || 'Completed',
    capacity: project.capacity || 'High Production Output',
    image: project.image || IMAGES.successPlant || '/images/arunachala-plant.jpg',
    description: project.description || project.title || '',
    createdAt: new Date().toISOString()
  };

  const updated = [newItem, ...current];
  saveStoredProjects(updated);

  // Synchronize immediately to backend Database
  apiClient.post('/projects', {
    title: newItem.title,
    client: newItem.client,
    location: newItem.location,
    machine: newItem.machine,
    year: newItem.year,
    status: newItem.status,
    capacity: newItem.capacity,
    image: newItem.image,
    description: newItem.description,
  }).then((res) => {
    if (res.data?.data?.id) {
      // update id if returned by DB
      const currentList = getStoredProjects();
      const updatedList = currentList.map(p => p.id === newItem.id ? { ...p, id: res.data.data.id } : p);
      saveStoredProjects(updatedList);
    }
  }).catch((err) => {
    console.warn('Live DB project save failed (buffered locally):', err);
  });

  return newItem;
};

export const updateProject = (id: string, updates: Partial<ProjectItem>): ProjectItem | null => {
  const current = getStoredProjects();
  let updatedItem: ProjectItem | null = null;
  const next = current.map(p => {
    if (p.id === id) {
      updatedItem = { ...p, ...updates };
      return updatedItem;
    }
    return p;
  });
  if (updatedItem) {
    saveStoredProjects(next);
    // Update live in DB
    apiClient.put(`/projects/${encodeURIComponent(id)}`, updates).catch((err) => {
      console.warn('Live DB project update failed:', err);
    });
  }
  return updatedItem;
};

export const deleteProject = (id: string): void => {
  const current = getStoredProjects();
  const next = current.filter(p => p.id !== id);
  saveStoredProjects(next);

  // Delete live in DB
  apiClient.delete(`/projects/${encodeURIComponent(id)}`).catch((err) => {
    console.warn('Live DB project delete failed:', err);
  });
};

// Initial background sync
fetchProjectsFromDb().catch(() => {});

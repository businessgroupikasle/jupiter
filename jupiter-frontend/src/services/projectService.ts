import { IMAGES } from '../assets/images/images';
import { apiClient } from './api';

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

let _cachedProjects: ProjectItem[] = [];

// Fetch projects live from backend database
export const fetchProjectsFromDb = async (): Promise<ProjectItem[]> => {
  try {
    const res = await apiClient.get('/projects');
    if (res.data?.success && Array.isArray(res.data.data)) {
      const mapped: ProjectItem[] = res.data.data.map((item: any) => ({
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
      _cachedProjects = mapped;
      window.dispatchEvent(new Event('jupiter_projects_updated'));
      return mapped;
    }
  } catch (err) {
    console.warn('Could not fetch projects from backend API:', err);
  }
  return _cachedProjects;
};

export const clearAllProjects = async (): Promise<void> => {
  try {
    await apiClient.delete('/projects');
  } catch (err) {
    console.warn('Backend clear all projects failed:', err);
  }
  _cachedProjects = [];
  window.dispatchEvent(new Event('jupiter_projects_updated'));
};

export const getStoredProjects = (): ProjectItem[] => {
  return _cachedProjects;
};

export const saveStoredProjects = (projects: ProjectItem[]): void => {
  _cachedProjects = projects;
  window.dispatchEvent(new Event('jupiter_projects_updated'));
};

export const addProject = async (project: Partial<ProjectItem>): Promise<ProjectItem> => {
  const payload = {
    title: project.title || 'New Plant Installation',
    client: project.client || 'Valued Client',
    location: project.location || 'Tamil Nadu, India',
    machine: project.machine || 'Jupiter Automatic Machinery',
    year: project.year || String(new Date().getFullYear()),
    status: project.status || 'Completed',
    capacity: project.capacity || 'High Production Output',
    image: project.image || IMAGES.successPlant || '/images/arunachala-plant.jpg',
    description: project.description || project.title || '',
  };

  // Save directly to backend Database
  const res = await apiClient.post('/projects', payload);
  const created: ProjectItem = res.data?.data || {
    ...payload,
    id: `PRJ-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  _cachedProjects = [created, ..._cachedProjects.filter(p => p.id !== created.id)];
  window.dispatchEvent(new Event('jupiter_projects_updated'));
  return created;
};

export const updateProject = async (id: string, updates: Partial<ProjectItem>): Promise<ProjectItem | null> => {
  const res = await apiClient.put(`/projects/${encodeURIComponent(id)}`, updates);
  const updated: ProjectItem = res.data?.data || {
    ...(_cachedProjects.find(p => p.id === id) || {}),
    ...updates,
    id
  } as ProjectItem;

  _cachedProjects = _cachedProjects.map(p => p.id === id ? { ...p, ...updated } : p);
  window.dispatchEvent(new Event('jupiter_projects_updated'));
  return updated;
};

export const deleteProject = async (id: string): Promise<boolean> => {
  await apiClient.delete(`/projects/${encodeURIComponent(id)}`);
  _cachedProjects = _cachedProjects.filter(p => p.id !== id);
  window.dispatchEvent(new Event('jupiter_projects_updated'));
  return true;
};

// Initial background sync from backend
fetchProjectsFromDb().catch(() => {});


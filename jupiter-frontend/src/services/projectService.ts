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
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'PRJ-01',
    title: 'Arunachala Fly Ash Plant Installation',
    client: 'Arunachala Brick Corp',
    location: 'Coimbatore, Tamil Nadu',
    machine: 'Automatic Fly Ash Plant JP-10000',
    year: '2024',
    status: 'Completed',
    capacity: '25,000 Bricks / Day',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Turnkey commissioning of 25,000 bricks/day fully automatic fly ash brick plant with batching conveyor and automatic stacker.'
  },
  {
    id: 'PRJ-02',
    title: 'Sri Balaji High-Density Paver Facility',
    client: 'Sri Balaji Interlocks',
    location: 'Bengaluru, Karnataka',
    machine: 'Heavy Duty Paver Machine JP-6000',
    year: '2023',
    status: 'Completed',
    capacity: '8,000 Sq.Ft Pavers / Day',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    description: 'Dual-color high compressive strength paver tile production line supplying road infrastructure projects.'
  },
  {
    id: 'PRJ-03',
    title: 'Apex Concrete Block Infrastructure Unit',
    client: 'Apex Infra Precast',
    location: 'Hyderabad, Telangana',
    machine: 'Full Line Block Plant JP-8000',
    year: '2024',
    status: 'Commissioning',
    capacity: '12,000 Solid Blocks / Day',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'High-volume hollow and solid masonry block manufacturing unit with pan mixer and automatic finger car transfer.'
  }
];

const PROJECTS_STORAGE_KEY = 'jupiter_projects';

export const getStoredProjects = (): ProjectItem[] => {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error reading projects:', e);
  }
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  } catch (e) {}
  return INITIAL_PROJECTS;
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
    id: `PRJ-0${current.length + 1}`,
    title: project.title || 'New Plant Installation',
    client: project.client || 'Valued Client',
    location: project.location || 'Tamil Nadu, India',
    machine: project.machine || 'Jupiter Automatic Machinery',
    year: project.year || String(new Date().getFullYear()),
    status: project.status || 'Completed',
    capacity: project.capacity || 'High Production Output',
    image: project.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: project.description || project.title || ''
  };
  const updated = [newItem, ...current];
  saveStoredProjects(updated);
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
  if (updatedItem) saveStoredProjects(next);
  return updatedItem;
};

export const deleteProject = (id: string): void => {
  const current = getStoredProjects();
  const next = current.filter(p => p.id !== id);
  saveStoredProjects(next);
};

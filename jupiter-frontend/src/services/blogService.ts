export interface BlogItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  views: number;
  image: string;
  excerpt: string;
  content?: string;
}

export const INITIAL_BLOGS: BlogItem[] = [
  {
    id: 'BLOG-01',
    title: 'Raw Material Mix Ratio for 12 N/mm² High-Strength Fly Ash Bricks',
    category: 'Brick Making',
    readTime: '6 min read',
    author: 'Jupiter Technical Engineering Team',
    date: '12 Apr 2024',
    views: 420,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Detailed mix formulation guidelines for optimizing fly ash, lime, gypsum, and quarry sand proportions to achieve maximum compressive load rating at lowest per-unit cost.'
  },
  {
    id: 'BLOG-02',
    title: 'Preventative Maintenance Guide for Hydraulic Cylinders & Valve Manifolds',
    category: 'Maintenance',
    readTime: '8 min read',
    author: 'Service Engineering Dept',
    date: '05 Apr 2024',
    views: 310,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Best practices for hydraulic oil temperature control, 10-micron filtration schedules, and seal longevity in high-tonnage multi-stroke brick and block pressing machines.'
  },
  {
    id: 'BLOG-03',
    title: 'Setting Up a Profitable Concrete Block Plant: Land, Power & ROI Analysis',
    category: 'Business & Subsidies',
    readTime: '10 min read',
    author: 'Jupiter Industrial Advisory',
    date: '28 Mar 2024',
    views: 580,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    excerpt: 'A comprehensive feasibility report on land requirements, transformer 3-phase power allocations, government subsidies, and payback timeline for automated block making units.'
  }
];

const BLOGS_STORAGE_KEY = 'jupiter_blogs';

export const getStoredBlogs = (): BlogItem[] => {
  try {
    const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error reading blogs:', e);
  }
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
  } catch (e) {}
  return INITIAL_BLOGS;
};

export const saveStoredBlogs = (blogs: BlogItem[]): void => {
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
    window.dispatchEvent(new Event('jupiter_blogs_updated'));
  } catch (e) {
    console.error('Error saving jupiter_blogs:', e);
  }
};

export const addBlog = (blog: Partial<BlogItem>): BlogItem => {
  const current = getStoredBlogs();
  const newItem: BlogItem = {
    id: `BLOG-0${current.length + 1}`,
    title: blog.title || 'New Technical Article',
    category: blog.category || 'Brick Making',
    readTime: blog.readTime || '5 min read',
    author: blog.author || 'Jupiter Technical Team',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    views: 1,
    image: blog.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    excerpt: blog.excerpt || blog.title || '',
    content: blog.content
  };
  const updated = [newItem, ...current];
  saveStoredBlogs(updated);
  return newItem;
};

export const updateBlog = (id: string, updates: Partial<BlogItem>): BlogItem | null => {
  const current = getStoredBlogs();
  let updatedItem: BlogItem | null = null;
  const next = current.map(b => {
    if (b.id === id) {
      updatedItem = { ...b, ...updates };
      return updatedItem;
    }
    return b;
  });
  if (updatedItem) saveStoredBlogs(next);
  return updatedItem;
};

export const deleteBlog = (id: string): void => {
  const current = getStoredBlogs();
  const next = current.filter(b => b.id !== id);
  saveStoredBlogs(next);
};

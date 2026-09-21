import { IMAGES } from '../assets/images/images';
import { apiClient, API_BASE_URL } from './api';

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

export const INITIAL_BLOGS: BlogItem[] = [];

const BLOGS_STORAGE_KEY = 'jupiter_blogs';

// Fetch blogs live from backend database
export const fetchBlogsFromDb = async (): Promise<BlogItem[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const mapped: BlogItem[] = json.data.map((b: any) => ({
          id: b.id,
          title: b.title,
          category: b.category,
          readTime: b.readTime || '5 min read',
          author: b.author?.name || b.authorName || 'Jupiter Technical Team',
          date: b.date || new Date(b.createdAt || Date.now()).toLocaleDateString('en-GB'),
          views: b.views || 0,
          image: b.image || IMAGES.heroBanner || '/images/concrete-blocks.jpg',
          excerpt: b.excerpt || '',
          content: b.content || '',
        }));

        const current = getStoredBlogs();
        const mappedIds = new Set(mapped.map(m => m.id));
        const merged = [...mapped, ...current.filter(c => !mappedIds.has(c.id))];
        saveStoredBlogs(merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Could not fetch blogs from backend API, using local cache:', err);
  }
  return getStoredBlogs();
};

export const clearAllBlogs = (): void => {
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('jupiter_blogs_updated'));
  } catch (e) {
    console.error('Error clearing blogs:', e);
  }

  // Delete live in DB
  apiClient.delete('/blogs').catch((err) => {
    console.warn('Could not clear blogs from backend DB:', err);
  });
};

export const getStoredBlogs = (): BlogItem[] => {
  try {
    const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Automatically purge any dummy / placeholder articles
        const filtered = parsed.filter(
          (b: any) =>
            !['BLOG-01', 'BLOG-02', 'BLOG-03'].includes(b?.id) &&
            !b?.title?.includes('Raw Material Mix Ratio') &&
            !b?.title?.includes('Preventative Maintenance Guide') &&
            !b?.title?.includes('Setting Up a Profitable Concrete Block')
        );
        if (filtered.length !== parsed.length) {
          localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(filtered));
        }
        return filtered;
      }
    }
  } catch (e) {
    console.error('Error reading blogs:', e);
  }
  try {
    localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify([]));
  } catch (e) {}
  return [];
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
  const slug = (blog.title || `article-${Date.now()}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const newItem: BlogItem = {
    id: blog.id || `BLOG-0${current.length + 1}`,
    title: blog.title || 'New Technical Article',
    category: blog.category || 'Brick Making',
    readTime: blog.readTime || '5 min read',
    author: blog.author || 'Jupiter Technical Team',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    views: 1,
    image: blog.image || IMAGES.heroBanner || '/images/concrete-blocks.jpg',
    excerpt: blog.excerpt || blog.title || '',
    content: blog.content
  };
  const updated = [newItem, ...current];
  saveStoredBlogs(updated);

  // Synchronize live to database
  apiClient.post('/blogs', {
    title: newItem.title,
    slug,
    category: newItem.category,
    readTime: newItem.readTime,
    authorName: newItem.author,
    date: newItem.date,
    image: newItem.image,
    excerpt: newItem.excerpt,
    content: newItem.content || newItem.excerpt,
  }).then((res) => {
    if (res.data?.data?.id) {
      const currentList = getStoredBlogs();
      const updatedList = currentList.map(b => b.id === newItem.id ? { ...b, id: res.data.data.id } : b);
      saveStoredBlogs(updatedList);
    }
  }).catch((err) => {
    console.warn('Live DB blog save failed (buffered locally):', err);
  });

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
  if (updatedItem) {
    saveStoredBlogs(next);
    // Live update in DB
    apiClient.put(`/blogs/${encodeURIComponent(id)}`, updates).catch((err) => {
      console.warn('Live DB blog update failed:', err);
    });
  }
  return updatedItem;
};

export const deleteBlog = (id: string): void => {
  const current = getStoredBlogs();
  const next = current.filter(b => b.id !== id);
  saveStoredBlogs(next);

  // Live delete in DB
  apiClient.delete(`/blogs/${encodeURIComponent(id)}`).catch((err) => {
    console.warn('Live DB blog delete failed:', err);
  });
};

// Initial background sync
fetchBlogsFromDb().catch(() => {});

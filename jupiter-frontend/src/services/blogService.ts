import { IMAGES } from '../assets/images/images';
import { apiClient } from './api';

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

let _cachedBlogs: BlogItem[] = [];

// Fetch blogs live from backend database

export const fetchBlogById = async (id: string): Promise<BlogItem | null> => {
  try {
    const res = await apiClient.get(`/blogs/${encodeURIComponent(id)}`);
    const b = res.data?.data || res.data;
    if (b) {
      return {
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
      };
    }
  } catch (err) {
    console.warn('Could not fetch single blog from API:', err);
  }
  return _cachedBlogs.find(b => b.id === id) || null;
};

export const fetchBlogsFromDb = async (): Promise<BlogItem[]> => {
  try {
    const res = await apiClient.get('/blogs');
    if (res.data?.success && Array.isArray(res.data.data)) {
      const mapped: BlogItem[] = res.data.data.map((b: any) => ({
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

      _cachedBlogs = mapped;
      window.dispatchEvent(new Event('jupiter_blogs_updated'));
      return mapped;
    }
  } catch (err) {
    console.warn('Could not fetch blogs from backend API:', err);
  }
  return _cachedBlogs;
};

export const clearAllBlogs = async (): Promise<void> => {
  try {
    await apiClient.delete('/blogs');
  } catch (err) {
    console.warn('Could not clear blogs from backend DB:', err);
  }
  _cachedBlogs = [];
  window.dispatchEvent(new Event('jupiter_blogs_updated'));
};

export const getStoredBlogs = (): BlogItem[] => {
  return _cachedBlogs;
};

export const saveStoredBlogs = (blogs: BlogItem[]): void => {
  _cachedBlogs = blogs;
  window.dispatchEvent(new Event('jupiter_blogs_updated'));
};

export const addBlog = async (blog: Partial<BlogItem>): Promise<BlogItem> => {
  const slug = (blog.title || `article-${Date.now()}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const payload = {
    title: blog.title || 'New Technical Article',
    slug,
    category: blog.category || 'Brick Making',
    readTime: blog.readTime || '5 min read',
    authorName: blog.author || 'Jupiter Technical Team',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    image: blog.image || IMAGES.heroBanner || '/images/concrete-blocks.jpg',
    excerpt: blog.excerpt || blog.title || '',
    content: blog.content || blog.excerpt || '',
  };

  // Synchronize live to database
  const res = await apiClient.post('/blogs', payload);
  const created: BlogItem = res.data?.data ? {
    id: res.data.data.id,
    title: res.data.data.title,
    category: res.data.data.category,
    readTime: res.data.data.readTime,
    author: res.data.data.authorName || 'Jupiter Technical Team',
    date: res.data.data.date || payload.date,
    views: res.data.data.views || 0,
    image: res.data.data.image || payload.image,
    excerpt: res.data.data.excerpt || payload.excerpt,
    content: res.data.data.content || payload.content
  } : {
    id: `BLOG-${Date.now()}`,
    title: payload.title,
    category: payload.category,
    readTime: payload.readTime,
    author: payload.authorName,
    date: payload.date,
    views: 1,
    image: payload.image,
    excerpt: payload.excerpt,
    content: payload.content
  };

  _cachedBlogs = [created, ..._cachedBlogs.filter(b => b.id !== created.id)];
  window.dispatchEvent(new Event('jupiter_blogs_updated'));
  return created;
};

export const updateBlog = async (id: string, updates: Partial<BlogItem>): Promise<BlogItem | null> => {
  const res = await apiClient.put(`/blogs/${encodeURIComponent(id)}`, updates);
  const updated: BlogItem = res.data?.data ? {
    id: res.data.data.id,
    title: res.data.data.title,
    category: res.data.data.category,
    readTime: res.data.data.readTime,
    author: res.data.data.authorName || 'Jupiter Technical Team',
    date: res.data.data.date,
    views: res.data.data.views || 0,
    image: res.data.data.image,
    excerpt: res.data.data.excerpt,
    content: res.data.data.content
  } : {
    ...(_cachedBlogs.find(b => b.id === id) || {}),
    ...updates,
    id
  } as BlogItem;

  _cachedBlogs = _cachedBlogs.map(b => b.id === id ? { ...b, ...updated } : b);
  window.dispatchEvent(new Event('jupiter_blogs_updated'));
  return updated;
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  await apiClient.delete(`/blogs/${encodeURIComponent(id)}`);
  _cachedBlogs = _cachedBlogs.filter(b => b.id !== id);
  window.dispatchEvent(new Event('jupiter_blogs_updated'));
  return true;
};

// Initial background sync from backend
fetchBlogsFromDb().catch(() => {});


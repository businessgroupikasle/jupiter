import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to format Prisma blog records to match API interface
const formatBlog = (b: any) => ({
  id: b.id,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  content: b.content,
  category: b.category,
  readTime: b.readTime,
  author: {
    name: b.authorName || 'Jupiter Editorial Team',
    role: b.authorRole || 'Technical Specialist',
    avatar: b.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
  authorName: b.authorName,
  authorRole: b.authorRole,
  authorAvatar: b.authorAvatar,
  date: b.date,
  image: b.image,
  tags: b.tags || [],
  keyTakeaways: b.keyTakeaways || [],
  views: b.views || 0,
});

// GET /api/blogs
export const getBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search, limit } = req.query;
    const whereClause: any = {};

    if (category && category !== 'All') {
      whereClause.category = { equals: category as string, mode: 'insensitive' };
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { excerpt: { contains: search as string, mode: 'insensitive' } },
        { category: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit as string) : undefined,
    });

    res.status(200).json({ success: true, count: blogs.length, data: blogs.map(formatBlog) });
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/:slug
export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    const blog = await prisma.blog.findFirst({
      where: { OR: [{ slug }, { id: slug }] },
    });

    if (!blog) {
      res.status(404).json({ success: false, message: `Blog article '${slug}' not found` });
      return;
    }

    // Increment views
    await prisma.blog.update({ where: { id: blog.id }, data: { views: blog.views + 1 } }).catch(() => {});

    res.status(200).json({ success: true, data: formatBlog(blog) });
  } catch (error) {
    next(error);
  }
};

// POST /api/blogs
export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, excerpt, content, category, image, tags, keyTakeaways, readTime, authorName, authorRole, authorAvatar } = req.body;

    if (!title || !content) {
      res.status(400).json({ success: false, message: 'Title and Content are required fields.' });
      return;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const blog = await prisma.blog.create({
      data: {
        slug,
        title,
        excerpt: excerpt || title.substring(0, 120),
        content,
        category: category || 'Brick Making',
        readTime: readTime || '5 min read',
        authorName: authorName || 'Jupiter Editorial Team',
        authorRole: authorRole || 'Machinery Specialist',
        authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        image: image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        tags: Array.isArray(tags) ? tags : ['Brick Machine', 'Jupiter'],
        keyTakeaways: Array.isArray(keyTakeaways) ? keyTakeaways : ['Heavy-duty engineering', 'Pan-India technical support'],
        views: 1,
      },
    });

    res.status(201).json({ success: true, message: 'Blog article published successfully.', data: formatBlog(blog) });
  } catch (error) {
    next(error);
  }
};

// PUT /api/blogs/:id
export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    const blog = await prisma.blog.update({ where: { id }, data: req.body });

    res.status(200).json({ success: true, message: 'Blog article updated successfully', data: formatBlog(blog) });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/blogs/:id
export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.blog.delete({ where: { id } });

    res.status(200).json({ success: true, message: 'Blog article deleted successfully' });
  } catch (error) {
    next(error);
  }
};

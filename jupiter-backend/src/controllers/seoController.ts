import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DOMAIN = process.env.PUBLIC_DOMAIN || 'https://jupitergroups.in';

/**
 * Dynamic XML Sitemap Generator endpoint for search engines.
 * Serves /sitemap.xml & /api/sitemap.xml conforming to Sitemaps 0.9 protocol.
 */
export const getSitemapXml = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    const blogs = await prisma.blog.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    // Static public routes
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/products', priority: '0.9', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/projects', priority: '0.8', changefreq: 'weekly' },
      { url: '/blogs', priority: '0.8', changefreq: 'daily' },
      { url: '/gallery', priority: '0.7', changefreq: 'weekly' },
      { url: '/videos', priority: '0.7', changefreq: 'weekly' },
      { url: '/faqs', priority: '0.6', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    ];

    const todayStr = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
      xml += `    <lastmod>${todayStr}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic products
    for (const p of products) {
      const lastMod = p.updatedAt ? p.updatedAt.toISOString().split('T')[0] : todayStr;
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/products/${encodeURIComponent(p.slug)}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic blogs
    for (const b of blogs) {
      const lastMod = b.updatedAt ? b.updatedAt.toISOString().split('T')[0] : todayStr;
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/blogs/${encodeURIComponent(b.slug)}</loc>\n`;
      xml += `    <lastmod>${lastMod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.status(200).send(xml);
  } catch (error) {
    console.error('[SEO] Error generating sitemap.xml:', error);
    next(error);
  }
};

/**
 * Server-delivered robots.txt endpoint.
 * Serves /robots.txt & /api/robots.txt to configure crawler access.
 */
export const getRobotsTxt = async (req: Request, res: Response): Promise<void> => {
  const robots = `# Jupiter Industries Robots.txt Configuration
User-agent: *
Allow: /
Allow: /uploads/
Disallow: /admin/
Disallow: /admin
Disallow: /api/
Disallow: /private/
Disallow: /*?*

Sitemap: ${DOMAIN}/sitemap.xml
`;

  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.status(200).send(robots);
};

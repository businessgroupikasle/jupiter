import { Router } from 'express';
import { getSitemapXml, getRobotsTxt } from '../controllers/seoController';

const router = Router();

// Sitemap endpoints
router.get('/sitemap.xml', getSitemapXml);
router.get('/api/sitemap.xml', getSitemapXml);

// Robots.txt endpoints
router.get('/robots.txt', getRobotsTxt);
router.get('/api/robots.txt', getRobotsTxt);

export default router;

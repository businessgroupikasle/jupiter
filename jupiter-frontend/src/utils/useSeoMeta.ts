import { useEffect } from 'react';

export interface SeoMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const SITE_NAME = 'Jupiter Industries';
const BASE_URL = 'https://jupitergroups.in';
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png`;

const setMeta = (selector: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const parts = selector.match(/\[([^=]+)="([^"]+)"\]/);
    if (parts) {
      el.setAttribute(parts[1], parts[2]);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const setJsonLd = (data?: Record<string, any> | Array<Record<string, any>>) => {
  const SCRIPT_ID = 'jupiter-seo-jsonld';
  let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.id = SCRIPT_ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

export const normalizeCanonicalUrl = (rawUrl?: string): string => {
  if (!rawUrl) {
    rawUrl = typeof window !== 'undefined' ? window.location.pathname : '/';
  }
  let path = rawUrl;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      const urlObj = new URL(path);
      path = urlObj.pathname;
    } catch {
      path = '/';
    }
  }

  // Lowercase
  path = path.toLowerCase();

  // Strip .html suffix
  path = path.replace(/\.html$/, '');

  // Strip trailing slashes except for root /
  if (path.length > 1 && path.endsWith('/')) {
    path = path.replace(/\/+$/, '');
  }

  // Standardize aliases to preferred canonical sitemap paths
  if (path === '' || path === '/home' || path === '/index') {
    path = '/';
  } else if (path === '/about-us') {
    path = '/about';
  } else if (path === '/machines') {
    path = '/products';
  } else if (path.startsWith('/machines/')) {
    path = path.replace('/machines/', '/products/');
  } else if (path === '/gallery') {
    path = '/projects';
  } else if (path === '/blogs') {
    path = '/blog';
  } else if (path === '/privacy') {
    path = '/privacy-policy';
  } else if (path === '/terms') {
    path = '/terms-and-conditions';
  } else if (
    [
      '/fly-ash-brick-machine',
      '/fly-ash-making-machine',
      '/hollow-and-solid-block-machine',
      '/hollow-and-solid-block-making-machine',
      '/inter-block-making-machine',
      '/inter-locking-brick-making-machine',
      '/paver-block-machine',
      '/batching-plant',
      '/patching-plant',
      '/storage-silo',
      '/machine-spares',
      '/spares'
    ].includes(path)
  ) {
    const categoryMap: Record<string, string> = {
      '/fly-ash-brick-machine': '/products/fly-ash-brick-machine',
      '/fly-ash-making-machine': '/products/fly-ash-brick-machine',
      '/hollow-and-solid-block-machine': '/products/hollow-and-solid-block-machine',
      '/hollow-and-solid-block-making-machine': '/products/hollow-and-solid-block-machine',
      '/inter-block-making-machine': '/products/inter-block-making-machine',
      '/inter-locking-brick-making-machine': '/products/inter-block-making-machine',
      '/paver-block-machine': '/products/paver-block-machine',
      '/batching-plant': '/products/batching-plant',
      '/patching-plant': '/products/batching-plant',
      '/storage-silo': '/products/storage-silo',
      '/machine-spares': '/products/machine-spares',
      '/spares': '/products/machine-spares'
    };
    path = categoryMap[path] || path;
  }

  return path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
};

export const useSeoMeta = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
  robots,
  jsonLd,
}: SeoMetaProps) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    const resolvedCanonical = normalizeCanonicalUrl(canonical || ogUrl);
    const resolvedOgTitle = ogTitle || fullTitle;
    const resolvedOgDesc = ogDescription || description;
    const resolvedOgImage = ogImage || DEFAULT_IMAGE;
    const resolvedOgUrl = resolvedCanonical;

    // ── Page Title ──────────────────────────────────────────────
    document.title = fullTitle;

    // ── Standard Meta ───────────────────────────────────────────
    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);

    // ── Meta Robots ─────────────────────────────────────────────
    setMeta('meta[name="robots"]', robots || 'index, follow');

    // ── Open Graph ──────────────────────────────────────────────
    setMeta('meta[property="og:title"]', resolvedOgTitle);
    setMeta('meta[property="og:description"]', resolvedOgDesc);
    setMeta('meta[property="og:image"]', resolvedOgImage);
    setMeta('meta[property="og:url"]', resolvedOgUrl);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:site_name"]', SITE_NAME);

    // ── Twitter Card ────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', resolvedOgTitle);
    setMeta('meta[name="twitter:description"]', resolvedOgDesc);
    setMeta('meta[name="twitter:image"]', resolvedOgImage);

    // ── Canonical Link ──────────────────────────────────────────
    setLink('canonical', resolvedCanonical);

    // ── JSON-LD Structured Data ─────────────────────────────────
    setJsonLd(jsonLd);
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, robots, jsonLd]);
};


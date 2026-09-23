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

export const useSeoMeta = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
}: SeoMetaProps) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    const resolvedOgTitle = ogTitle || fullTitle;
    const resolvedOgDesc = ogDescription || description;
    const resolvedOgImage = ogImage || DEFAULT_IMAGE;
    const resolvedUrl = ogUrl || (BASE_URL + window.location.pathname);
    const resolvedCanonical = canonical || resolvedUrl;

    // ── Page Title ──────────────────────────────────────────────
    document.title = fullTitle;

    // ── Standard Meta ───────────────────────────────────────────
    setMeta('meta[name="description"]', description);
    if (keywords) setMeta('meta[name="keywords"]', keywords);

    // ── Open Graph ──────────────────────────────────────────────
    setMeta('meta[property="og:title"]', resolvedOgTitle);
    setMeta('meta[property="og:description"]', resolvedOgDesc);
    setMeta('meta[property="og:image"]', resolvedOgImage);
    setMeta('meta[property="og:url"]', resolvedUrl);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:site_name"]', SITE_NAME);

    // ── Twitter Card ────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', resolvedOgTitle);
    setMeta('meta[name="twitter:description"]', resolvedOgDesc);
    setMeta('meta[name="twitter:image"]', resolvedOgImage);

    // ── Canonical Link ──────────────────────────────────────────
    setLink('canonical', resolvedCanonical);
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical]);
};

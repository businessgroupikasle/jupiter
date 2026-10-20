import React from 'react';
import type { ProductItem } from '../services/productService';
import { EnquiryItem, formatEnquiryReference } from '../services/enquiryService';

// Synonyms, abbreviations and stemming map for machinery terms
const SYNONYMS_MAP: Record<string, string[]> = {
  brick: ['brick', 'bricks', 'flyash', 'fly-ash', 'ash'],
  bricks: ['brick', 'bricks', 'flyash', 'fly-ash', 'ash'],
  block: ['block', 'blocks', 'hollow', 'solid', 'concrete'],
  blocks: ['block', 'blocks', 'hollow', 'solid', 'concrete'],
  concrete: ['concrete', 'cement', 'hollow', 'solid', 'batching'],
  machine: ['machine', 'machinery', 'machines', 'plant', 'equipment', 'line', 'model'],
  machinery: ['machine', 'machinery', 'machines', 'plant', 'equipment'],
  machines: ['machine', 'machinery', 'machines', 'plant', 'equipment'],
  paver: ['paver', 'pavers', 'paving', 'interlock', 'interlocking'],
  pavers: ['paver', 'pavers', 'paving', 'interlock', 'interlocking'],
  interlock: ['interlock', 'interlocking', 'inter-lock', 'paver', 'pavers'],
  interlocking: ['interlock', 'interlocking', 'inter-lock', 'paver', 'pavers'],
  batching: ['batching', 'patching', 'mixer', 'pan mixer', 'plant'],
  patching: ['batching', 'patching', 'mixer', 'plant'],
  mixer: ['mixer', 'pan mixer', 'batching', 'plant'],
  silo: ['silo', 'silos', 'storage', 'cement silo', 'bulk'],
  silos: ['silo', 'silos', 'storage', 'cement silo', 'bulk'],
  mould: ['mould', 'moulds', 'mold', 'molds', 'die', 'sets', 'tooling', 'alloy'],
  moulds: ['mould', 'moulds', 'mold', 'molds', 'die', 'sets', 'tooling', 'alloy'],
  mold: ['mould', 'moulds', 'mold', 'molds', 'die', 'sets', 'tooling', 'alloy'],
  molds: ['mould', 'moulds', 'mold', 'molds', 'die', 'sets', 'tooling', 'alloy'],
  die: ['mould', 'moulds', 'mold', 'molds', 'die'],
  v15: ['v15', 'v-15', 'v 15', 'v-15 b', 'v15b', 'v 15 b', 'jupiter v 15'],
  v15b: ['v15', 'v-15', 'v 15', 'v-15 b', 'v15b', 'v 15 b', 'jupiter v 15'],
  'v-15': ['v15', 'v-15', 'v 15', 'v-15 b', 'v15b', 'v 15 b'],
  rotary: ['rotary', 'rotate', '4 brick', '6 brick'],
  spares: ['spares', 'spare', 'parts', 'accessories'],
  spare: ['spares', 'spare', 'parts', 'accessories'],
  flyash: ['fly ash', 'flyash', 'ash', 'brick'],
  'fly-ash': ['fly ash', 'flyash', 'ash', 'brick'],
};

// Words indicating user wants recent customer activities/leads
const RECENT_ACTIVITY_TERMS = [
  'recent',
  'activity',
  'recent activity',
  'latest',
  'lead',
  'leads',
  'enquiry',
  'enquiries',
  'quote',
  'quotes',
  'quotation',
  'quotations',
  'task',
  'tasks',
  'today',
];

/**
 * Clean & normalize text for case-insensitive, punctuation-agnostic search
 */
export const normalizeSearchText = (text?: string | null): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[–—−]/g, '-') // standardize dashes
    .trim();
};

/**
 * Remove non-alphanumeric characters for collapsed matching (e.g. "V-15 B" -> "v15b")
 */
export const collapseAlphanumeric = (text?: string | null): string => {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
};

/**
 * Split search query into significant word tokens
 */
export const tokenizeQuery = (query: string): string[] => {
  const norm = normalizeSearchText(query);
  if (!norm) return [];
  // Split on whitespace or punctuation
  const rawTokens = norm.split(/[\s,;|/\\+_\-]+/).filter(Boolean);
  return rawTokens.filter(t => t.length > 0);
};

/**
 * Check if a single query token matches any part of target text,
 * considering synonyms and variations
 */
export const matchesTokenWithSynonyms = (corpus: string, token: string, collapsedCorpus: string): boolean => {
  if (!corpus || !token) return false;
  if (corpus.includes(token)) return true;

  const collapsedToken = collapseAlphanumeric(token);
  if (collapsedToken && collapsedCorpus && collapsedCorpus.includes(collapsedToken)) return true;

  // Check synonym mappings
  const syns = SYNONYMS_MAP[token] || (collapsedToken ? SYNONYMS_MAP[collapsedToken] : undefined);
  if (syns) {
    for (const syn of syns) {
      if (corpus.includes(syn) || (collapsedCorpus && collapsedCorpus.includes(collapseAlphanumeric(syn)))) {
        return true;
      }
    }
  }

  // Prefix matching for words >= 3 chars (e.g. "hydraul" matches "hydraulic")
  if (token.length >= 3) {
    const words = corpus.split(/[\s,;|/\\+_\-]+/).filter(w => w.length >= 2);
    for (const word of words) {
      if (word.startsWith(token)) return true;
    }
  }

  return false;
};

/**
 * Match and score a machinery product against a search query
 */
export const matchProduct = (product: ProductItem, query: string): { matches: boolean; score: number } => {
  const q = normalizeSearchText(query);
  if (!q) return { matches: true, score: 0 };

  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return { matches: true, score: 0 };

  const name = normalizeSearchText(product.name);
  const cat = normalizeSearchText(product.category);
  const brand = normalizeSearchText(product.brandTag);
  const cap = normalizeSearchText(product.capacity);
  const power = normalizeSearchText(product.power);
  const brick = normalizeSearchText(product.brickSize);
  const desc = normalizeSearchText(product.description);
  const subCat = normalizeSearchText((product as any).subCategoryTag);
  const slug = normalizeSearchText(product.slug);
  const id = normalizeSearchText(product.id);
  const badges = (product.featureBadges || []).map(normalizeSearchText).join(' ');
  const keyFeatures = (product.keyFeatures || []).map(normalizeSearchText).join(' ');
  const highlights = (product.highlights || []).map(h => `${normalizeSearchText(h.title)} ${normalizeSearchText(h.description)}`).join(' ');
  const advantages = (product.advantages || []).map(a => `${normalizeSearchText(a.title)} ${normalizeSearchText(a.description)}`).join(' ');
  const specsText = product.specs
    ? (Array.isArray(product.specs)
        ? product.specs.map(s => `${normalizeSearchText(s.label)} ${normalizeSearchText(s.value)}`).join(' ')
        : Object.entries(product.specs).map(([k, v]) => `${normalizeSearchText(k)} ${normalizeSearchText(String(v))}`).join(' '))
    : '';

  const fullCorpus = [name, cat, brand, cap, power, brick, desc, subCat, slug, id, badges, keyFeatures, highlights, advantages, specsText].join(' ');
  const collapsedCorpus = collapseAlphanumeric(fullCorpus);
  const collapsedName = collapseAlphanumeric(name);
  const collapsedQuery = collapseAlphanumeric(q);

  let score = 0;

  // 1. Direct full query phrase matches
  if (name.includes(q)) score += 120;
  else if (collapsedQuery && collapsedName.includes(collapsedQuery)) score += 110;
  else if (cat.includes(q)) score += 80;
  else if (slug.includes(q) || (id && id.includes(q))) score += 70;
  else if (fullCorpus.includes(q)) score += 60;
  else if (collapsedQuery && collapsedCorpus.includes(collapsedQuery)) score += 55;

  // 2. Token-by-token verification
  let matchedTokens = 0;
  for (const token of tokens) {
    const inName = matchesTokenWithSynonyms(name, token, collapsedName);
    const inCat = matchesTokenWithSynonyms(cat, token, collapseAlphanumeric(cat));
    const inCorpus = inName || inCat || matchesTokenWithSynonyms(fullCorpus, token, collapsedCorpus);

    if (inName) {
      score += 35;
      matchedTokens++;
    } else if (inCat) {
      score += 25;
      matchedTokens++;
    } else if (inCorpus) {
      score += 15;
      matchedTokens++;
    }
  }

  // All tokens must match (or if query has >= 3 tokens, allow at least 75% match)
  const isMatch = tokens.length <= 2
    ? matchedTokens === tokens.length
    : matchedTokens >= Math.ceil(tokens.length * 0.75);

  return { matches: isMatch, score };
};

/**
 * Filter and sort products based on search query
 */
export const searchProducts = (products: ProductItem[], query: string): ProductItem[] => {
  const q = (query || '').trim();
  if (!q) return products;

  const scored: Array<{ product: ProductItem; score: number }> = [];
  for (const prod of products) {
    if (!prod) continue;
    const { matches, score } = matchProduct(prod, q);
    if (matches && score > 0) {
      scored.push({ product: prod, score });
    }
  }

  // Sort primarily by relevance score descending, then catalog order
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (a.product.order ?? 0) - (b.product.order ?? 0);
  });

  return scored.map(s => s.product);
};

/**
 * Match and score a customer enquiry against a search query
 */
export const matchEnquiry = (enquiry: EnquiryItem, query: string, _allEnquiries?: EnquiryItem[]): { matches: boolean; score: number } => {
  const q = normalizeSearchText(query);
  if (!q) return { matches: true, score: 0 };

  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return { matches: true, score: 0 };

  const name = normalizeSearchText(enquiry.name);
  const phone = normalizeSearchText(enquiry.phone);
  const pureDigitsPhone = (enquiry.phone || '').replace(/\D/g, '');
  const email = normalizeSearchText(enquiry.email);
  const location = normalizeSearchText(enquiry.location);
  const product = normalizeSearchText(enquiry.product || enquiry.productInterest);
  const productInterest = normalizeSearchText(enquiry.productInterest);
  const message = normalizeSearchText(enquiry.message);
  const status = normalizeSearchText(enquiry.status);
  const enqId = normalizeSearchText(enquiry.enquiryId);
  const refNo = normalizeSearchText(enquiry.referenceNo);
  const formattedRef = normalizeSearchText(formatEnquiryReference(enquiry));
  const id = normalizeSearchText(enquiry.id);
  const date = normalizeSearchText(enquiry.date);

  const fullCorpus = [name, phone, pureDigitsPhone, email, location, product, productInterest, message, status, enqId, refNo, formattedRef, id, date].join(' ');
  const collapsedCorpus = collapseAlphanumeric(fullCorpus);
  const collapsedName = collapseAlphanumeric(name);
  const collapsedQuery = collapseAlphanumeric(q);

  let score = 0;

  // Special intent: User is searching for recent customer enquiry stream (guard against 1-3 letter prefix matches)
  const isRecentActivityQuery = q.length >= 4 && RECENT_ACTIVITY_TERMS.some(term => q === term || term.startsWith(q) || (term.length >= 4 && q.includes(term)));
  if (isRecentActivityQuery) {
    score += 40;
    // Boost newer enquiries
    if (enquiry.status === 'New') score += 20;
    if (enquiry.createdAt || enquiry.date) score += 10;
    return { matches: true, score };
  }

  // 1. Exact phrase / ID matches
  if (name === q) score += 150;
  else if (name.includes(q)) score += 100;
  else if (formattedRef && (formattedRef === q || formattedRef.includes(q))) score += 140;
  else if (enqId && (enqId === q || enqId.includes(q))) score += 140;
  else if (refNo && (refNo === q || refNo.includes(q))) score += 130;
  else if (id && (id === q || id.includes(q))) score += 130;
  else if (phone.includes(q) || (pureDigitsPhone && pureDigitsPhone.includes(q.replace(/\D/g, '')))) score += 120;
  else if (email.includes(q)) score += 90;
  else if (product.includes(q) || productInterest.includes(q)) score += 80;
  else if (collapsedQuery && collapsedName.includes(collapsedQuery)) score += 95;
  else if (fullCorpus.includes(q)) score += 60;

  // 2. Token-by-token verification
  let matchedTokens = 0;
  for (const token of tokens) {
    const digitsOnlyToken = token.replace(/\D/g, '');
    const inName = matchesTokenWithSynonyms(name, token, collapsedName);
    const inPhone = phone.includes(token) || (digitsOnlyToken.length >= 4 && pureDigitsPhone.includes(digitsOnlyToken));
    const inEnqId = enqId.includes(token) || refNo.includes(token) || formattedRef.includes(token) || (digitsOnlyToken.length >= 2 && (enqId.includes(digitsOnlyToken) || formattedRef.includes(digitsOnlyToken)));
    const inProduct = matchesTokenWithSynonyms(product, token, collapseAlphanumeric(product)) || matchesTokenWithSynonyms(productInterest, token, collapseAlphanumeric(productInterest));
    const inCorpus = inName || inPhone || inEnqId || inProduct || matchesTokenWithSynonyms(fullCorpus, token, collapsedCorpus);

    if (inName) {
      score += 40;
      matchedTokens++;
    } else if (inEnqId || inPhone) {
      score += 35;
      matchedTokens++;
    } else if (inProduct) {
      score += 25;
      matchedTokens++;
    } else if (inCorpus) {
      score += 15;
      matchedTokens++;
    }
  }

  const isMatch = tokens.length <= 2
    ? matchedTokens === tokens.length
    : matchedTokens >= Math.ceil(tokens.length * 0.75);

  return { matches: isMatch, score };
};

/**
 * Filter and sort enquiries based on search query
 */
export const searchEnquiries = (enquiries: EnquiryItem[], query: string): EnquiryItem[] => {
  const q = (query || '').trim();
  if (!q) return enquiries;

  const scored: Array<{ enquiry: EnquiryItem; score: number }> = [];
  for (const enq of enquiries) {
    if (!enq) continue;
    const { matches, score } = matchEnquiry(enq, q, enquiries);
    if (matches && score > 0) {
      scored.push({ enquiry: enq, score });
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Secondary sort: createdAt descending
    const ta = a.enquiry.createdAt ? new Date(a.enquiry.createdAt).getTime() : 0;
    const tb = b.enquiry.createdAt ? new Date(b.enquiry.createdAt).getTime() : 0;
    return tb - ta;
  });

  return scored.map(s => s.enquiry);
};

export interface SectionSearchResult {
  id: string;
  label: string;
  desc: string;
  tab: string;
  keywords: string[];
}

export const ADMIN_NAVIGATION_SECTIONS: SectionSearchResult[] = [
  { id: 'dashboard', label: 'Dashboard Overview & Tasks', desc: 'KPI metrics, today\'s follow-up tasks & recent activity stream', tab: 'dashboard', keywords: ['overview', 'recent', 'activity', 'task', 'tasks', 'kpi', 'metrics', 'stats', 'home'] },
  { id: 'enquiries', label: 'Customer Enquiries & Quotations', desc: 'Browse customer leads, requested machines & quotation statuses', tab: 'enquiries', keywords: ['enquiry', 'enquiries', 'lead', 'leads', 'customer', 'customers', 'quote', 'quotations', 'follow up'] },
  { id: 'products', label: 'Machinery Products Catalog', desc: 'Full product line: fly ash, block, interlock, paver machines & batching plants', tab: 'products', keywords: ['product', 'products', 'machine', 'machinery', 'catalog', 'equipment', 'models'] },
  { id: 'projects', label: 'Client Projects & Installations', desc: 'Track turn-key plant setups and industrial client sites', tab: 'projects', keywords: ['project', 'projects', 'client', 'clients', 'installation', 'installations'] },
  { id: 'blogs', label: 'Technical Blogs & Guides', desc: 'Articles on fly ash brick manufacturing and plant economics', tab: 'blogs', keywords: ['blog', 'blogs', 'article', 'articles', 'guide', 'guides'] },
  { id: 'gallery', label: 'Machinery & Plant Photo Gallery', desc: 'Browse high-resolution plant installation photos and factory snapshots', tab: 'gallery', keywords: ['gallery', 'photo', 'photos', 'picture', 'pictures', 'image', 'images'] },
  { id: 'videos', label: 'Machine Demonstration Videos', desc: 'Watch working video demonstrations and manufacturing line footage', tab: 'videos', keywords: ['video', 'videos', 'youtube', 'demo', 'demonstration', 'footage', 'clip'] },
  { id: 'locations', label: 'Machine Delivery Locations', desc: 'Pan-India dispatch tracking, transport vehicles & client delivery sites', tab: 'locations', keywords: ['location', 'locations', 'delivery', 'deliveries', 'dispatch', 'transport', 'trailer'] },
  { id: 'users', label: 'User & Staff Access Management', desc: 'Manage administrator accounts, user roles, security credentials and permissions', tab: 'users', keywords: ['user', 'users', 'admin', 'admins', 'staff', 'role', 'roles', 'permission', 'password', 'account'] },
  { id: 'settings', label: 'Company & Website Settings', desc: 'Manage company contact numbers, WhatsApp support & maintenance mode', tab: 'settings', keywords: ['setting', 'settings', 'maintenance', 'seo', 'company', 'whatsapp'] },
];

export const searchSections = (query: string): SectionSearchResult[] => {
  const q = normalizeSearchText(query);
  if (!q) return [];
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return [];

  return ADMIN_NAVIGATION_SECTIONS.filter(s => {
    const label = normalizeSearchText(s.label);
    const desc = normalizeSearchText(s.desc);
    const allKeywords = s.keywords.map(normalizeSearchText);

    // If query contains any keyword or label matches
    if (label.includes(q) || desc.includes(q) || allKeywords.some(k => k.includes(q) || q.includes(k))) {
      return true;
    }

    return tokens.some(token =>
      label.includes(token) || desc.includes(token) || allKeywords.some(k => k.includes(token) || token.includes(k))
    );
  });
};

/**
 * Highlights matching query tokens in text for visual feedback
 */
export const renderHighlighted = (text: string, query: string): React.ReactNode => {
  if (!text || !query.trim()) return text;
  const tokens = tokenizeQuery(query).filter(t => t.length >= 2);
  if (tokens.length === 0) return text;

  try {
    const escaped = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part)
        ? React.createElement(
            'mark',
            {
              key: i,
              style: {
                background: '#FEF08A',
                color: '#854D0E',
                padding: '1px 3px',
                borderRadius: '3px',
                fontWeight: 700
              }
            },
            part
          )
        : part
    );
  } catch {
    return text;
  }
};


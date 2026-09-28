import React from 'react';

export const DEFAULT_PRODUCT_FALLBACK_IMAGE = '';

/**
 * Checks whether an image path represents an obsolete placeholder machine image.
 */
export const isPlaceholderImage = (url?: string | null): boolean => {
  if (!url || typeof url !== 'string') return true;
  const trimmed = url.trim().toLowerCase();
  if (!trimmed || trimmed === '[object object]' || trimmed === 'null' || trimmed === 'undefined') return true;
  if (
    trimmed === '/images/flyash-vertical-machine.png' ||
    trimmed === 'images/flyash-vertical-machine.png' ||
    trimmed.includes('flyash-vertical-machine.png')
  ) {
    return true;
  }
  return false;
};

/**
 * Checks whether a product has a valid, real uploaded or custom image URL.
 */
export const hasValidProductImage = (imageUrl?: string | null): boolean => {
  if (!imageUrl || typeof imageUrl !== 'string') return false;
  const trimmed = imageUrl.trim();
  if (!trimmed || isPlaceholderImage(trimmed)) return false;
  return true;
};

/**
 * Returns backend API origin derived from Vite environment variables (VITE_API_URL, VITE_API_BASE_URL)
 * or localhost / window origin defaults.
 */
export const getBackendApiOrigin = (): string => {
  const configured = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    ''
  ).trim();

  if (configured) {
    try {
      if (configured.startsWith('http://') || configured.startsWith('https://')) {
        return new URL(configured).origin;
      }
    } catch {
      // Fall through to string cleaning
    }
    return configured.replace(/\/api\/?$/, '').replace(/\/+$/, '');
  }

  // Development on local machine: point to backend port 5026
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return 'http://localhost:5026';
  }

  // Production runtime on live domain
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }

  return 'http://localhost:5026';
};

/**
 * Image URL helper:
 * - Full http/https URL → use directly
 * - data: or blob: → use directly
 * - /uploads/... or uploads/... → prepend backend API origin from Vite env variable
 * - Other strings → return as is (if not placeholder)
 * - Empty / null / invalid / placeholder → return fallback (default empty string)
 */
export const getProductImageUrl = (
  imageUrl?: string | null,
  fallback: string = DEFAULT_PRODUCT_FALLBACK_IMAGE
): string => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return fallback;
  }

  const trimmed = imageUrl.trim();
  if (!trimmed || trimmed === '[object Object]' || isPlaceholderImage(trimmed)) {
    return fallback;
  }

  // Full http/https URL or local preview/data URLs: use directly
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  // Uploaded files: /uploads/... or uploads/... → prepend backend API origin
  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('uploads/')) {
    const origin = getBackendApiOrigin().replace(/\/+$/, '');
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${origin}${cleanPath}`;
  }

  return trimmed;
};

/**
 * Image error handler fallback: hides broken image instead of filling with placeholder machine image
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback: string = DEFAULT_PRODUCT_FALLBACK_IMAGE
): void => {
  const target = e.currentTarget;
  if (!target) return;
  target.onerror = null;
  if (fallback && !isPlaceholderImage(fallback)) {
    target.src = fallback;
  } else {
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      const placeholder = parent.querySelector('.no-image-placeholder-fallback') as HTMLElement | null;
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    }
  }
};

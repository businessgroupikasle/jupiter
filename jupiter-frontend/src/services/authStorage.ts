/**
 * Token and Cookie storage manager for Admin Authentication.
 * Ensures consistent handling of admin tokens and cookies across API requests.
 */

const TOKEN_KEY = 'jupiter_admin_token';
const COOKIE_NAMES = ['token', 'admin_token', 'jupiter_admin_token'];

export const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined' || !document.cookie) return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const setCookieValue = (name: string, value: string, maxAgeSeconds: number = 86400): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
};

export const removeCookieValue = (name: string): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
};

/**
 * Validates that an authentication token is non-empty, well-formed, and not expired.
 * Prevents sending empty, expired, or malformed Authorization headers.
 */
export const isValidAdminToken = (token: unknown): token is string => {
  if (!token || typeof token !== 'string') return false;
  const trimmed = token.trim();
  if (
    !trimmed ||
    trimmed === 'null' ||
    trimmed === 'undefined' ||
    trimmed === '[object Object]'
  ) {
    return false;
  }

  // 1. Check jupiter-token format: "jupiter-token-<userId>-<timestamp>"
  const jupiterMatch = trimmed.match(/^jupiter-token-([a-zA-Z0-9_-]+)-(\d+)$/);
  if (jupiterMatch) {
    const timestamp = parseInt(jupiterMatch[2], 10);
    // Token valid if within reasonable lifetime (30 days)
    if (!isNaN(timestamp) && Date.now() - timestamp > 30 * 24 * 60 * 60 * 1000) {
      return false; // Expired
    }
    return true;
  }

  // 2. Check standard JWT format: "<header>.<payload>.<signature>"
  if (trimmed.includes('.')) {
    const parts = trimmed.split('.');
    if (parts.length === 3) {
      try {
        const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const payloadJson = JSON.parse(
          typeof window !== 'undefined' && window.atob
            ? window.atob(payloadBase64)
            : Buffer.from(payloadBase64, 'base64').toString('utf8')
        );
        if (payloadJson.exp && typeof payloadJson.exp === 'number') {
          const expMs = payloadJson.exp < 1e11 ? payloadJson.exp * 1000 : payloadJson.exp;
          if (expMs < Date.now()) {
            return false; // Expired
          }
        }
        return true;
      } catch {
        return false; // Malformed payload
      }
    }
  }

  // 3. User ID or CUID token format (alphanumeric, at least 10 chars)
  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return true;
  }

  return false;
};

export const setAdminToken = (token: string): void => {
  if (!token || !isValidAdminToken(token)) return;
  const clean = token.trim();
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(TOKEN_KEY, clean);
    }
    // Set all common cookie names that backend middleware checks
    for (const name of COOKIE_NAMES) {
      setCookieValue(name, clean);
    }
  } catch (err) {
    console.warn('Failed to persist admin token:', err);
  }
};

export const clearAdminToken = (): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem('adminToken');
      window.localStorage.removeItem('token');
    }
    for (const name of COOKIE_NAMES) {
      removeCookieValue(name);
    }
  } catch (err) {
    console.warn('Failed to clear admin token:', err);
  }
};

/**
 * Retrieves a verified, valid admin token from localStorage, cookies, or active session.
 * Returns null if no valid token exists. Does not return malformed or expired tokens.
 */
export const getValidAdminToken = (): string | null => {
  try {
    // 1. Check localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored =
        window.localStorage.getItem(TOKEN_KEY) ||
        window.localStorage.getItem('adminToken') ||
        window.localStorage.getItem('token');
      if (isValidAdminToken(stored)) return stored.trim();
    }

    // 2. Check cookies
    for (const name of COOKIE_NAMES) {
      const cookieVal = getCookieValue(name);
      if (isValidAdminToken(cookieVal)) return cookieVal.trim();
    }

    // 3. Check current user in session storage
    if (typeof window !== 'undefined' && window.localStorage) {
      const sessionData = window.localStorage.getItem('jupiter_admin_session_v1');
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          if (isValidAdminToken(parsed?.token)) {
            setAdminToken(parsed.token);
            return parsed.token.trim();
          }
        } catch {
          // Ignore JSON parse errors
        }
      }
    }

    return null;
  } catch {
    return null;
  }
};

// Backwards-compatible export
export const getAdminToken = (): string => {
  return getValidAdminToken() || '';
};

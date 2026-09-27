import axios from 'axios';
import { getValidAdminToken, getAdminToken, setAdminToken, clearAdminToken, isValidAdminToken } from './authStorage';

export { getValidAdminToken, getAdminToken, setAdminToken, clearAdminToken, isValidAdminToken };

export const getApiBaseUrl = (): string => {
  // 1. Browser runtime check
  if (typeof window !== 'undefined' && window.location) {
    const { hostname, origin } = window.location;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    // In production build OR when accessed via live domain:
    // STRICT RULE: NEVER use localhost for backend API URL.
    if (!isLocalhost || import.meta.env.PROD) {
      const configured = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim();
      // If configured with a live remote domain (not localhost)
      if (
        configured &&
        !configured.includes('localhost') &&
        !configured.includes('127.0.0.1')
      ) {
        return configured.replace(/\/+$/, '');
      }
      // Default for live domain: use /api on current origin (e.g. https://jupitergroups.in/api)
      return `${origin.replace(/\/+$/, '')}/api`;
    }
  }

  // 2. Development mode only (running on localhost in development mode)
  if (import.meta.env.DEV) {
    const localConfigured = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim();
    if (localConfigured) {
      return localConfigured.replace(/\/+$/, '');
    }
    return 'http://localhost:5026/api';
  }

  // 3. Fallback for production build
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

// Request interceptor: Attach valid Authorization header and cookies
// Strictly avoids sending empty, expired, or malformed Authorization headers
apiClient.interceptors.request.use((config) => {
  const token = getValidAdminToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
    config.headers.set('x-admin-request', 'true');
  } else {
    // Explicitly delete to prevent sending empty/undefined/malformed values
    config.headers.delete('Authorization');
    config.headers.delete('x-admin-request');
  }
  return config;
});

// Response interceptor: Handle 401/403 session expiration and trigger login redirect
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      clearAdminToken();
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('jupiter_admin_session_v1');
        window.dispatchEvent(
          new CustomEvent('jupiter_session_expired', {
            detail: {
              status,
              message: 'Session expired / login again',
            },
          })
        );
      }
    }
    return Promise.reject(error);
  }
);

// Helper to format backend error messages into clear, actionable user text
export const extractApiErrorMessage = (error: any, fallbackMessage: string = 'An error occurred'): string => {
  if (!error) return fallbackMessage;

  const status = error.response?.status;
  if (status === 401 || status === 403) {
    return 'Session expired / login again';
  }

  const data = error.response?.data;
  if (data) {
    // 1. Array of field errors: [{ field: 'name', message: 'Name must be...' }]
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const fieldMessages = data.errors
        .map((e: any) => e.message || `${e.field}: invalid value`)
        .filter(Boolean);
      if (fieldMessages.length > 0) {
        return fieldMessages.join('. ');
      }
    }
    // 2. Direct message string
    if (data.message && typeof data.message === 'string') {
      return data.message;
    }
    // 3. Error string property
    if (data.error && typeof data.error === 'string') {
      return data.error;
    }
    // 4. Detail string
    if (data.detail && typeof data.detail === 'string') {
      return data.detail;
    }
  }

  if (error.message && typeof error.message === 'string') {
    if (error.message.includes('Network Error') || error.code === 'ECONNABORTED') {
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      return isLocal
        ? 'Unable to connect to local backend server. Please verify backend is running on port 5026.'
        : 'Unable to connect to backend server. Please check your internet connection or server status.';
    }
    return error.message;
  }

  return fallbackMessage;
};

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
  };
}

// Helper to extract product name from quotation message if available
export function parseProductFromMessage(msg: string): string {
  const match = msg.match(/(?:Quotation for|Product Interest|Machinery Requirement):\s*([^|\n]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return msg.split('|')[0].trim() || 'Machinery Quotation';
}

export const submitEnquiry = async (data: EnquiryPayload): Promise<EnquiryResponse> => {
  const startTime = Date.now();
  const MIN_LOADING_TIME_MS = 1500;

  const enforceDelay = async () => {
    const elapsed = Date.now() - startTime;
    if (elapsed < MIN_LOADING_TIME_MS) {
      await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME_MS - elapsed));
    }
  };

  try {
    const response = await apiClient.post<EnquiryResponse>('/enquiries', data);
    await enforceDelay();
    return response.data;
  } catch (error: any) {
    await enforceDelay();
    const errMsg = extractApiErrorMessage(error, 'Backend database server connection failed. Please ensure backend is running.');
    throw new Error(errMsg);
  }
};

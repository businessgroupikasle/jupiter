import axios from 'axios';
import { getAdminToken, setAdminToken, clearAdminToken } from './authStorage';

export { getAdminToken, setAdminToken, clearAdminToken };

const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname) {
    const host = window.location.hostname;
    if (host !== 'localhost' && host !== '127.0.0.1') {
      return `${window.location.origin}/api`;
    }
  }
  return 'http://localhost:5026/api';
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

// Request interceptor: Attach Admin Authorization header and admin flag
apiClient.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
    config.headers.set('x-admin-request', 'true');
  }
  return config;
});

// Helper to format backend error messages into user-friendly text
export const extractApiErrorMessage = (error: any, fallbackMessage: string = 'An error occurred'): string => {
  if (!error) return fallbackMessage;

  const data = error.response?.data;
  if (data) {
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const fieldMessages = data.errors
        .map((e: any) => e.message || `${e.field}: invalid value`)
        .filter(Boolean);
      if (fieldMessages.length > 0) {
        return fieldMessages.join('. ');
      }
    }
    if (data.message && typeof data.message === 'string') {
      return data.message;
    }
  }

  if (error.message && typeof error.message === 'string') {
    if (error.message.includes('Network Error') || error.code === 'ECONNABORTED') {
      return 'Unable to connect to local backend server. Please verify backend is running on port 5026.';
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

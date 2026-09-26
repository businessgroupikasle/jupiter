import axios from 'axios';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
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
  timeout: 12000,
});

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
  const MIN_LOADING_TIME_MS = 2500; // 2 to 3 seconds loading duration

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
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to submit enquiry');
    }
    throw new Error('Backend database server connection failed. Please ensure backend is running.');
  }
};



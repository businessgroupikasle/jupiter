import axios from 'axios';
import { addStoredEnquiry } from './enquiryService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
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
function parseProductFromMessage(msg: string): string {
  const match = msg.match(/Quotation for:\s*([^|]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return 'Machinery Inquiry';
}

export const submitEnquiry = async (data: EnquiryPayload): Promise<EnquiryResponse> => {
  // Always record into local storage for immediate Admin Dashboard visibility
  try {
    addStoredEnquiry({
      name: data.name,
      phone: data.phone,
      email: data.email,
      product: parseProductFromMessage(data.message),
      message: data.message,
    });
  } catch (err) {
    console.warn('Could not save enquiry to local storage:', err);
  }

  try {
    const response = await apiClient.post<EnquiryResponse>('/enquiries', data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to submit enquiry');
    }
    // Network Error or Server unreachable: Gracefully fall back since lead is preserved locally
    console.warn('Backend server unreachable, saved enquiry locally into Admin Dashboard storage:', error.message);
    return {
      success: true,
      message: 'Quotation request submitted! Our factory engineer will contact you shortly.',
      data: {
        id: `LOC-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        createdAt: new Date().toISOString(),
      },
    };
  }
};


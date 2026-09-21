import axios from 'axios';
import { addStoredEnquiry } from './enquiryService';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
function parseProductFromMessage(msg: string): string {
  const match = msg.match(/(?:Quotation for|Product Interest|Machinery Requirement):\s*([^|\n]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return msg.split('|')[0].trim() || 'Machinery Quotation';
}

export const submitEnquiry = async (data: EnquiryPayload): Promise<EnquiryResponse> => {
  try {
    const response = await apiClient.post<EnquiryResponse>('/enquiries', data);
    // On backend success, synchronize locally for instantaneous UI updates
    try {
      addStoredEnquiry({
        name: data.name,
        phone: data.phone,
        email: data.email,
        product: parseProductFromMessage(data.message),
        message: data.message,
      });
    } catch (err) {
      console.warn('Could not cache enquiry locally:', err);
    }
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // Backend returned validation error or bad request (400) - do not save invalid data
      throw new Error(error.response.data.message || 'Failed to submit enquiry');
    }
    // Network Error or Server unreachable: Gracefully fall back so lead is preserved locally
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


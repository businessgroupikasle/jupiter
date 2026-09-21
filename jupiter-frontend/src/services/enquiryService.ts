import { API_BASE_URL } from './api';

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed' | 'In Progress';
  message?: string;
  location?: string;
  isRead?: boolean;
}

export const INITIAL_ENQUIRIES: EnquiryItem[] = [];

const ENQUIRIES_STORAGE_KEY = 'jupiter_enquiries';

export const fetchEnquiriesFromDb = async (): Promise<EnquiryItem[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: EnquiryItem[] = json.data.map((item: any) => {
          const productMatch = item.message?.match(/(?:Quotation for|Product Interest|Machinery Requirement):\s*([^|\n]+)/i);
          const product = productMatch ? productMatch[1].trim() : (item.message?.split('|')[0]?.trim() || 'Machinery Quotation');
          const dt = item.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
            : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
          return {
            id: item.id,
            name: item.name,
            phone: item.phone,
            email: item.email,
            product,
            message: item.message,
            date: dt,
            status: 'New' as const,
            isRead: false
          };
        });
        
        // Merge with existing locally stored leads to prevent accidental wipes
        const currentLocal = getStoredEnquiries();
        const mappedIds = new Set(mapped.map(m => m.id));
        const merged = [...mapped, ...currentLocal.filter(e => !mappedIds.has(e.id))];
        saveStoredEnquiries(merged);
        return merged;
      }
    }
  } catch (err) {
    console.warn('Could not fetch enquiries from backend API:', err);
  }
  return getStoredEnquiries();
};

export const clearAllEnquiriesFromDb = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/enquiries`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Backend clear all failed:', err);
  }
  saveStoredEnquiries([]);
};

export const deleteEnquiryFromDb = async (id: string): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/enquiries/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Backend delete failed:', err);
  }
};

export const getStoredEnquiries = (): EnquiryItem[] => {
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading jupiter_enquiries:', e);
  }
  return [];
};

export const saveStoredEnquiries = (enquiries: EnquiryItem[]): void => {
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    window.dispatchEvent(new Event('jupiter_enquiries_updated'));
  } catch (e) {
    console.error('Error saving jupiter_enquiries:', e);
  }
};

export const deleteStoredEnquiry = (id: string, targetIndex?: number): EnquiryItem[] => {
  deleteEnquiryFromDb(id).catch(() => {});
  const current = getStoredEnquiries();
  let deletedOnce = false;
  const filtered = current.filter((item, idx) => {
    if (targetIndex !== undefined) {
      return idx !== targetIndex;
    }
    if (item.id === id && !deletedOnce) {
      deletedOnce = true;
      return false;
    }
    return true;
  });
  saveStoredEnquiries(filtered);
  return filtered;
};

export const updateStoredEnquiryStatus = (id: string, status: EnquiryItem['status'], targetIndex?: number): EnquiryItem[] => {
  const current = getStoredEnquiries();
  let updatedOnce = false;
  const updated = current.map((item, idx) => {
    if (targetIndex !== undefined) {
      if (idx === targetIndex) {
        return { ...item, status };
      }
      return item;
    }
    if (item.id === id && !updatedOnce) {
      updatedOnce = true;
      return { ...item, status };
    }
    return item;
  });
  saveStoredEnquiries(updated);
  return updated;
};

export const markStoredEnquiryAsRead = (id: string, targetIndex?: number): EnquiryItem[] => {
  const current = getStoredEnquiries();
  let markedOnce = false;
  const updated = current.map((item, idx) => {
    if (targetIndex !== undefined) {
      if (idx === targetIndex) {
        return { ...item, isRead: true };
      }
      return item;
    }
    if (item.id === id && !markedOnce) {
      markedOnce = true;
      return { ...item, isRead: true };
    }
    return item;
  });
  saveStoredEnquiries(updated);
  return updated;
};

export const markAllStoredEnquiriesAsRead = (): EnquiryItem[] => {
  const current = getStoredEnquiries();
  const updated = current.map(item => ({ ...item, isRead: true }));
  saveStoredEnquiries(updated);
  return updated;
};

export const addStoredEnquiry = (item: Partial<EnquiryItem>): EnquiryItem => {
  const current = getStoredEnquiries();
  let maxNum = 100;
  current.forEach(e => {
    const match = e.id?.match(/ENQ-(\d+)/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });

  const generatedId = item.id || `ENQ-${String(maxNum + 1).padStart(3, '0')}`;
  const newEnq: EnquiryItem = {
    id: generatedId,
    name: item.name || 'New Customer',
    phone: item.phone || '',
    email: item.email || '',
    product: item.product || 'Machinery Inquiry',
    date: item.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: item.status || 'New',
    location: item.location || 'India',
    message: item.message || '',
    isRead: false
  };
  const updated = [newEnq, ...current.filter(e => e.id !== newEnq.id)];
  saveStoredEnquiries(updated);
  return newEnq;
};

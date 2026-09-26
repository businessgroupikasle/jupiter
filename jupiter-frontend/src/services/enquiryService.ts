import { API_BASE_URL } from './api';

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product: string;
  productId?: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed' | 'In Progress';
  message?: string;
  location?: string;
  isRead?: boolean;
}

export const INITIAL_ENQUIRIES: EnquiryItem[] = [];

let _cachedEnquiries: EnquiryItem[] = [];

const READ_STORAGE_KEY = 'jupiter_read_enquiry_ids';

const getLocalReadIds = (): Set<string> => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(READ_STORAGE_KEY);
      if (stored) {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) {
          return new Set<string>(arr);
        }
      }
    }
  } catch (err) {
    // Ignore storage parse errors
  }
  return new Set<string>();
};

const saveLocalReadIds = (ids: Set<string>): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(Array.from(ids)));
    }
  } catch (err) {
    // Ignore storage write errors
  }
};

const addLocalReadId = (id: string): void => {
  const ids = getLocalReadIds();
  ids.add(id);
  saveLocalReadIds(ids);
};

export const normalizeEnquiryStatus = (status?: string): 'New' | 'Contacted' | 'Closed' => {
  const s = (status || '').toString().trim().toUpperCase();
  if (s === 'CONTACTED') return 'Contacted';
  if (s === 'CLOSED') return 'Closed';
  return 'New';
};

export const fetchEnquiriesFromDb = async (): Promise<EnquiryItem[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const readIds = getLocalReadIds();
        const mapped: EnquiryItem[] = json.data.map((item: any) => {
          const productFromObj = (typeof item.product === 'object' && item.product !== null) ? item.product.name : (typeof item.product === 'string' ? item.product : '');
          const productMatch = item.message?.match(/(?:Quotation for|Product Interest|Machinery Requirement):\s*([^|\n]+)/i);
          const product = productFromObj || (productMatch ? productMatch[1].trim() : (item.message?.split('|')[0]?.trim() || 'Machinery Quotation'));
          const productId = item.productId || (typeof item.product === 'object' && item.product !== null ? item.product.id : undefined);
          const dt = item.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
            : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
          
          const isRead = item.isRead === true || readIds.has(item.id);

          return {
            id: item.id,
            name: item.name,
            phone: item.phone,
            email: item.email,
            product,
            productId,
            message: item.message,
            date: dt,
            status: normalizeEnquiryStatus(item.status),
            isRead
          };
        });
        
        _cachedEnquiries = mapped;
        window.dispatchEvent(new Event('jupiter_enquiries_updated'));
        return mapped;
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
  _cachedEnquiries = _cachedEnquiries.filter(e => e.id !== id);
  window.dispatchEvent(new Event('jupiter_enquiries_updated'));
};

export const getStoredEnquiries = (): EnquiryItem[] => {
  return _cachedEnquiries;
};

export const saveStoredEnquiries = (enquiries: EnquiryItem[]): void => {
  _cachedEnquiries = enquiries;
  window.dispatchEvent(new Event('jupiter_enquiries_updated'));
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
  const normalized = normalizeEnquiryStatus(status);

  // Persist status to backend PostgreSQL database
  fetch(`${API_BASE_URL}/enquiries/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: normalized }),
  }).catch((err) => {
    console.warn('Backend update status failed:', err);
  });

  const current = getStoredEnquiries();
  let updatedOnce = false;
  const updated = current.map((item, idx) => {
    if (targetIndex !== undefined) {
      if (idx === targetIndex) {
        return { ...item, status: normalized };
      }
      return item;
    }
    if (item.id === id && !updatedOnce) {
      updatedOnce = true;
      return { ...item, status: normalized };
    }
    return item;
  });
  saveStoredEnquiries(updated);
  return updated;
};

export const markStoredEnquiryAsRead = (id: string, targetIndex?: number): EnquiryItem[] => {
  addLocalReadId(id);

  // Persist read state to backend
  fetch(`${API_BASE_URL}/enquiries/${encodeURIComponent(id)}/read`, {
    method: 'PATCH',
  }).catch(() => {});

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
  const readIds = getLocalReadIds();
  current.forEach(e => {
    if (e.id) readIds.add(e.id);
  });
  saveLocalReadIds(readIds);

  // Persist all read state to backend
  fetch(`${API_BASE_URL}/enquiries/mark-all-read`, {
    method: 'PATCH',
  }).catch(() => {});

  const updated = current.map(item => ({ ...item, isRead: true }));
  saveStoredEnquiries(updated);
  return updated;
};

export const addStoredEnquiry = (item: Partial<EnquiryItem>): EnquiryItem => {
  const current = getStoredEnquiries();
  let maxNum = 100;
  current.forEach(e => {
    const match = e.id?.match(/ENQ-(d+)/i);
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
    status: normalizeEnquiryStatus(item.status),
    location: item.location || 'India',
    message: item.message || '',
    isRead: false
  };
  const updated = [newEnq, ...current.filter(e => e.id !== newEnq.id)];
  saveStoredEnquiries(updated);
  return newEnq;
};

import { apiClient } from './api';

export interface EnquiryItem {
  id: string;
  enquiryId?: string;
  referenceNo?: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  product: string;
  productInterest?: string;
  productId?: string;
  date: string;
  createdAt?: string;
  status: 'New' | 'Contacted' | 'Closed' | 'In Progress';
  message?: string;
  isRead?: boolean;
}

export const DEFAULT_INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'cmv6nlkch002mkwdizutw0t0n',
    enquiryId: 'ENQ-2026-0005',
    referenceNo: 'ENQ-2026-0005',
    name: 'suresh',
    email: 'suresh@gmail.com',
    phone: '+91 8825972129',
    product: 'automotive',
    productInterest: 'automotive',
    location: 'Pan India',
    message: 'Machinery Requirement: automotive',
    status: 'New',
    date: '13 Oct 2026',
    createdAt: '2026-10-13T12:24:56.898Z',
    isRead: true
  },
  {
    id: 'cmv6l3vnd000bkwdi96zxwztn',
    enquiryId: 'ENQ-2026-0004',
    referenceNo: 'ENQ-2026-0004',
    name: 'Bharathi',
    email: 'bharathi@gmail.com',
    phone: '+91 6379963552',
    product: 'Moulds & Precision Tooling',
    productInterest: 'Moulds & Precision Tooling',
    location: 'Pan India',
    message: 'Company: ikasle | Product Interest: Moulds & Precision Tooling | Details: capacity',
    status: 'Contacted',
    date: '13 Oct 2026',
    createdAt: '2026-10-13T11:15:12.506Z',
    isRead: true
  },
  {
    id: 'cmv6i9g9h0007kwdioyqjg20g',
    enquiryId: 'ENQ-2026-0003',
    referenceNo: 'ENQ-2026-0003',
    name: 'yuva',
    email: 'xyz@gmail.com',
    phone: '+91 8778364513',
    product: 'Fly Ash Brick Machines',
    productInterest: 'Fly Ash Brick Machines',
    location: 'Pan India',
    message: 'Company: xyz | Product Interest: Fly Ash Brick Machines | Details: machine',
    status: 'New',
    date: '13 Oct 2026',
    createdAt: '2026-10-13T09:55:33.654Z',
    isRead: true
  },
  {
    id: 'cmv6hww1b0005kwdi84jrtury',
    enquiryId: 'ENQ-2026-0002',
    referenceNo: 'ENQ-2026-0002',
    name: 'pava',
    email: 'pava@gmail.com',
    phone: '+91 9787510222',
    product: 'JI Batching Plant',
    productInterest: 'JI Batching Plant',
    location: 'Pan India',
    message: 'Quotation for: JI Batching Plant | Requirement: Quotation',
    status: 'New',
    date: '13 Oct 2026',
    createdAt: '2026-10-13T09:45:47.567Z',
    isRead: true
  },
  {
    id: 'cmv6fohko0001kwdi2u6a8rxp',
    enquiryId: 'ENQ-2026-0001',
    referenceNo: 'ENQ-2026-0001',
    name: 'Ramya',
    email: 'ramya@gmail.com',
    phone: '+91 6380736281',
    product: 'Concrete Block Machines',
    productInterest: 'Concrete Block Machines',
    location: 'Pan India',
    message: 'Company: xyz | Product Interest: Concrete Block Machines | Details: i want machine',
    status: 'Contacted',
    date: '13 Oct 2026',
    createdAt: '2026-10-13T08:43:16.344Z',
    isRead: true
  }
];

export const INITIAL_ENQUIRIES: EnquiryItem[] = DEFAULT_INITIAL_ENQUIRIES;

const ENQUIRIES_STORAGE_KEY = 'jupiter_stored_enquiries';

const loadInitialEnquiries = (): EnquiryItem[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => {
            const friendlyRef = formatEnquiryReference(item, parsed);
            return {
              ...item,
              enquiryId: item.enquiryId && /^ENQ-\d{4}-\d{3,5}$/i.test(item.enquiryId) ? item.enquiryId : friendlyRef,
              referenceNo: friendlyRef
            };
          });
        }
      }
    }
  } catch (err) {
    // Ignore storage parse error
  }
  return [];
};

let _cachedEnquiries: EnquiryItem[] = loadInitialEnquiries();

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

export const formatEnquiryDate = (dateVal?: string | Date | null): string => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  const day = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

export const normalizeEnquiryStatus = (status?: string): 'New' | 'Contacted' | 'Closed' => {
  const s = (status || '').toString().trim().toUpperCase();
  if (s === 'CONTACTED') return 'Contacted';
  if (s === 'CLOSED') return 'Closed';
  return 'New';
};

export const formatEnquiryReference = (enquiry?: Partial<EnquiryItem> | null, allEnquiries?: EnquiryItem[]): string => {
  if (!enquiry) return 'ENQ-2026-0001';

  // Determine year from createdAt or date
  const dateStr = enquiry.createdAt || enquiry.date;
  let year = 2026;
  if (dateStr) {
    const d = new Date(dateStr);
    if (!isNaN(d.getFullYear()) && d.getFullYear() >= 2000) {
      year = d.getFullYear();
    }
  }

  const rawCandidate = (enquiry.enquiryId || enquiry.referenceNo || '').trim();

  // If already in standard format ENQ-YYYY-XXXX (e.g., ENQ-2026-0001)
  if (/^ENQ-\d{4}-\d{3,5}$/i.test(rawCandidate)) {
    return rawCandidate.toUpperCase();
  }

  // If in format ENQ-XXXX (e.g., ENQ-0004, ENQ-0001, ENQ-4)
  const shortMatch = rawCandidate.match(/^ENQ-(\d+)$/i);
  if (shortMatch) {
    const seqNum = parseInt(shortMatch[1], 10);
    return `ENQ-${year}-${String(seqNum).padStart(4, '0')}`;
  }

  // Check if id itself is ENQ-YYYY-XXXX
  if (enquiry.id && /^ENQ-\d{4}-\d{3,5}$/i.test(enquiry.id)) {
    return enquiry.id.toUpperCase();
  }

  // Check if id is ENQ-XXXX
  if (enquiry.id && /^ENQ-\d+$/i.test(enquiry.id)) {
    const seqNum = parseInt(enquiry.id.replace(/^ENQ-/i, ''), 10);
    return `ENQ-${year}-${String(seqNum).padStart(4, '0')}`;
  }

  // If allEnquiries is provided, use chronological index
  if (allEnquiries && allEnquiries.length > 0 && enquiry.id) {
    const sorted = [...allEnquiries].sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return ta - tb;
    });
    const idx = sorted.findIndex(e => e.id === enquiry.id);
    if (idx >= 0) {
      return `ENQ-${year}-${String(idx + 1).padStart(4, '0')}`;
    }
  }

  // If cuid / alphanumeric id contains a sequence (e.g. cmv6fohko0001kwdi2u6a8rxp -> 0001)
  const idStr = enquiry.id || '';
  if (idStr.startsWith('c') && idStr.length >= 13) {
    const counterHex = idStr.slice(9, 13);
    const parsed = parseInt(counterHex, 36);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 99999) {
      return `ENQ-${year}-${String(parsed).padStart(4, '0')}`;
    }
  }

  const seqMatch = idStr.match(/\d{4}/);
  if (seqMatch) {
    return `ENQ-${year}-${seqMatch[0]}`;
  }

  // Deterministic fallback based on id / string hash
  if (idStr) {
    let hash = 0;
    for (let i = 0; i < idStr.length; i++) {
      hash = ((hash << 5) - hash) + idStr.charCodeAt(i);
      hash |= 0;
    }
    const num = Math.abs(hash % 9999) + 1;
    return `ENQ-${year}-${String(num).padStart(4, '0')}`;
  }

  return `ENQ-${year}-0001`;
};

export const fetchEnquiriesFromDb = async (): Promise<EnquiryItem[]> => {
  try {
    const res = await apiClient.get('/enquiries');
    const json = res.data;
    if (res.status === 200) {
      if (json.success && Array.isArray(json.data)) {
        const readIds = getLocalReadIds();
        const rawList = json.data;
        const mapped: EnquiryItem[] = rawList.map((item: any) => {
          const productFromObj = (typeof item.product === 'object' && item.product !== null) ? item.product.name : (typeof item.product === 'string' ? item.product : '');
          const productMatch = item.message?.match(/(?:Quotation for|Product Interest|Machinery Requirement):\s*([^|\n]+)/i);
          const productInterest = item.productInterest || productFromObj || (productMatch ? productMatch[1].trim() : (item.message?.split('|')[0]?.trim() || 'Paver Block Machines'));
          const productId = item.productId || (typeof item.product === 'object' && item.product !== null ? item.product.id : undefined);
          const createdAt = item.createdAt || new Date().toISOString();
          const dt = formatEnquiryDate(createdAt);
          const location = item.location || 'Pan India';
          const isRead = item.isRead === true || readIds.has(item.id);
          const enqId = item.enquiryId || item.referenceNo || undefined;
          const friendlyRef = formatEnquiryReference({ id: item.id, enquiryId: enqId, createdAt, date: dt }, rawList);

          return {
            id: item.id,
            enquiryId: enqId && /^ENQ-\d{4}-\d{3,5}$/i.test(enqId) ? enqId : friendlyRef,
            referenceNo: friendlyRef,
            name: item.name,
            phone: item.phone,
            email: item.email || '',
            location,
            product: productInterest,
            productInterest,
            productId,
            message: item.message,
            date: dt,
            createdAt,
            status: normalizeEnquiryStatus(item.status),
            isRead
          };
        });
        
        _cachedEnquiries = mapped;
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(mapped));
          }
        } catch {}
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
    await apiClient.delete('/enquiries');
  } catch (err) {
    console.warn('Backend clear all failed:', err);
  }
  saveStoredEnquiries([]);
};

export const deleteEnquiryFromDb = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/enquiries/${encodeURIComponent(id)}`);
  } catch (err) {
    console.warn('Backend delete failed:', err);
  }
  _cachedEnquiries = _cachedEnquiries.filter(e => e.id !== id && e.enquiryId !== id);
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(_cachedEnquiries));
    }
  } catch {}
  window.dispatchEvent(new Event('jupiter_enquiries_updated'));
};

export const getStoredEnquiries = (): EnquiryItem[] => {
  return _cachedEnquiries;
};

export const saveStoredEnquiries = (enquiries: EnquiryItem[]): void => {
  _cachedEnquiries = enquiries;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    }
  } catch {}
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
  apiClient.patch(`/enquiries/${encodeURIComponent(id)}/status`, { status: normalized }).catch((err) => {
    console.warn('Backend update status failed:', err);
  });

  const current = getStoredEnquiries();
  let updatedOnce = false;
  const updated = current.map((item, idx) => {
      const isTarget = item.id === id ||
        (item.enquiryId && item.enquiryId === id) ||
        (item.referenceNo && item.referenceNo === id) ||
        (targetIndex !== undefined && idx === targetIndex);

      if (isTarget && !updatedOnce) {
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
  apiClient.patch(`/enquiries/${encodeURIComponent(id)}/read`).catch(() => {});

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
  apiClient.patch('/enquiries/mark-all-read').catch(() => {});

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

// Immediately load actual enquiries from database on initialization
fetchEnquiriesFromDb().catch(() => {});

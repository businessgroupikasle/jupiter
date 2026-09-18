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
}

export const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: 'ENQ-101',
    name: 'Arun Kumar',
    phone: '+91 98765 43210',
    email: 'arun.kumar@gmail.com',
    product: 'Concrete Block Machine',
    date: '28 Apr 2024',
    status: 'New',
    location: 'Coimbatore, Tamil Nadu',
    message: 'Looking for automatic concrete block plant with 8000 blocks/shift capacity.'
  },
  {
    id: 'ENQ-102',
    name: 'Priya Builders',
    phone: '+91 91234 56789',
    email: 'contact@priyabuilders.in',
    product: 'Fly Ash Brick Machine',
    date: '26 Apr 2024',
    status: 'Contacted',
    location: 'Bengaluru, Karnataka',
    message: 'Quotation needed for 6-cavity fly ash brick machine with automatic pan mixer.'
  },
  {
    id: 'ENQ-103',
    name: 'Suresh',
    phone: '+91 99887 66554',
    email: 'suresh.infra@yahoo.com',
    product: 'Paver Block Machine',
    date: '24 Apr 2024',
    status: 'New',
    location: 'Hyderabad, Telangana',
    message: 'Interested in hydraulic interlocking paver block machine with color feeder.'
  },
  {
    id: 'ENQ-104',
    name: 'Karthik Construction',
    phone: '+91 90001 23456',
    email: 'karthik@karthikconstructions.com',
    product: 'Concrete Block Machine',
    date: '22 Apr 2024',
    status: 'Contacted',
    location: 'Chennai, Tamil Nadu',
    message: 'Need installation timeline and spare parts warranty terms for high volume block machine.'
  },
  {
    id: 'ENQ-105',
    name: 'Meena Enterprises',
    phone: '+91 88997 77886',
    email: 'meena.enterprises@gmail.com',
    product: 'Automatic Brick Plant',
    date: '20 Apr 2024',
    status: 'New',
    location: 'Madurai, Tamil Nadu',
    message: 'Full turn-key brick making plant inquiry with conveyor and silo automation.'
  }
];

const ENQUIRIES_STORAGE_KEY = 'jupiter_enquiries';

export const getStoredEnquiries = (): EnquiryItem[] => {
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error reading jupiter_enquiries:', e);
  }
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_ENQUIRIES));
  } catch (e) {}
  return INITIAL_ENQUIRIES;
};

export const saveStoredEnquiries = (enquiries: EnquiryItem[]): void => {
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    window.dispatchEvent(new Event('jupiter_enquiries_updated'));
  } catch (e) {
    console.error('Error saving jupiter_enquiries:', e);
  }
};

export const deleteStoredEnquiry = (id: string): EnquiryItem[] => {
  const current = getStoredEnquiries();
  const filtered = current.filter(e => e.id !== id);
  saveStoredEnquiries(filtered);
  return filtered;
};

export const updateStoredEnquiryStatus = (id: string, status: EnquiryItem['status']): EnquiryItem[] => {
  const current = getStoredEnquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  saveStoredEnquiries(updated);
  return updated;
};

export const addStoredEnquiry = (item: Partial<EnquiryItem>): EnquiryItem => {
  const current = getStoredEnquiries();
  const newEnq: EnquiryItem = {
    id: `ENQ-${String(current.length + 101).padStart(3, '0')}`,
    name: item.name || 'New Customer',
    phone: item.phone || '',
    email: item.email || '',
    product: item.product || 'Machinery Inquiry',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: 'New',
    location: item.location || 'India',
    message: item.message || ''
  };
  const updated = [newEnq, ...current];
  saveStoredEnquiries(updated);
  return newEnq;
};

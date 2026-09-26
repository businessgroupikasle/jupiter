import { apiClient } from './api';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
  isActive?: boolean;
}

let _cachedFaqs: FAQItem[] = [];

// Fetch FAQs live from backend database
export const fetchFaqsFromDb = async (): Promise<FAQItem[]> => {
  try {
    const res = await apiClient.get('/faqs');
    if (res.data?.success && Array.isArray(res.data.data)) {
      const mapped: FAQItem[] = res.data.data.map((item: any) => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
        category: item.category || 'General',
        order: item.order ?? 0,
        isActive: item.isActive !== undefined ? item.isActive : true,
      }));

      _cachedFaqs = mapped;
      window.dispatchEvent(new Event('jupiter_faqs_updated'));
      return mapped;
    }
  } catch (err) {
    console.warn('Could not fetch FAQs from backend API:', err);
  }
  return _cachedFaqs;
};

export const clearAllFaqs = async (): Promise<void> => {
  try {
    await apiClient.delete('/faqs');
  } catch (err) {
    console.warn('Could not clear FAQs from backend DB:', err);
  }
  _cachedFaqs = [];
  window.dispatchEvent(new Event('jupiter_faqs_updated'));
};

export const getStoredFaqs = (): FAQItem[] => {
  return _cachedFaqs;
};

export const saveStoredFaqs = (faqs: FAQItem[]): void => {
  _cachedFaqs = faqs;
  window.dispatchEvent(new Event('jupiter_faqs_updated'));
};

export const addFaq = async (faq: Partial<FAQItem>): Promise<FAQItem> => {
  const payload = {
    question: faq.question || '',
    answer: faq.answer || '',
    category: faq.category || 'General',
    order: faq.order !== undefined ? faq.order : _cachedFaqs.length + 1,
    isActive: faq.isActive !== undefined ? faq.isActive : true,
  };

  const res = await apiClient.post('/faqs', payload);
  const created: FAQItem = res.data?.data ? {
    id: res.data.data.id,
    question: res.data.data.question,
    answer: res.data.data.answer,
    category: res.data.data.category,
    order: res.data.data.order,
    isActive: res.data.data.isActive,
  } : {
    id: `FAQ-${Date.now()}`,
    ...payload,
  };

  _cachedFaqs = [created, ..._cachedFaqs.filter(f => f.id !== created.id)];
  window.dispatchEvent(new Event('jupiter_faqs_updated'));
  return created;
};

export const updateFaq = async (id: string, updates: Partial<FAQItem>): Promise<FAQItem | null> => {
  const res = await apiClient.put(`/faqs/${encodeURIComponent(id)}`, updates);
  const updated: FAQItem = res.data?.data ? {
    id: res.data.data.id,
    question: res.data.data.question,
    answer: res.data.data.answer,
    category: res.data.data.category,
    order: res.data.data.order,
    isActive: res.data.data.isActive,
  } : {
    ...(_cachedFaqs.find(f => f.id === id) || {}),
    ...updates,
    id,
  } as FAQItem;

  _cachedFaqs = _cachedFaqs.map(f => (f.id === id ? { ...f, ...updated } : f));
  window.dispatchEvent(new Event('jupiter_faqs_updated'));
  return updated;
};

export const deleteFaq = async (id: string): Promise<boolean> => {
  await apiClient.delete(`/faqs/${encodeURIComponent(id)}`);
  _cachedFaqs = _cachedFaqs.filter(f => f.id !== id);
  window.dispatchEvent(new Event('jupiter_faqs_updated'));
  return true;
};

// Initial background sync from backend
fetchFaqsFromDb().catch(() => {});

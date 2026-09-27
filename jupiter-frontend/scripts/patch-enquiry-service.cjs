const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/services/enquiryService.ts');
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/\r\n/g, '\n');

// 1. Update import
content = content.replace(
  "import { API_BASE_URL } from './api';",
  "import { API_BASE_URL, apiClient } from './api';"
);

// 2. Update fetchEnquiriesFromDb
const oldFetch = `export const fetchEnquiriesFromDb = async (): Promise<EnquiryItem[]> => {
  try {
    const res = await fetch(\`\${API_BASE_URL}/enquiries\`);
    if (res.ok) {
      const json = await res.json();`;

const newFetch = `export const fetchEnquiriesFromDb = async (): Promise<EnquiryItem[]> => {
  try {
    const res = await apiClient.get('/enquiries');
    const json = res.data;
    if (res.status === 200) {`;

content = content.replace(oldFetch, newFetch);

// 3. Update clearAllEnquiriesFromDb
const oldClear = `export const clearAllEnquiriesFromDb = async (): Promise<void> => {
  try {
    await fetch(\`\${API_BASE_URL}/enquiries\`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Backend clear all failed:', err);
  }
  saveStoredEnquiries([]);
};`;

const newClear = `export const clearAllEnquiriesFromDb = async (): Promise<void> => {
  try {
    await apiClient.delete('/enquiries');
  } catch (err) {
    console.warn('Backend clear all failed:', err);
  }
  saveStoredEnquiries([]);
};`;

content = content.replace(oldClear, newClear);

// 4. Update deleteEnquiryFromDb
const oldDel = `export const deleteEnquiryFromDb = async (id: string): Promise<void> => {
  try {
    await fetch(\`\${API_BASE_URL}/enquiries/\${encodeURIComponent(id)}\`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Backend delete failed:', err);
  }
  _cachedEnquiries = _cachedEnquiries.filter(e => e.id !== id);
  window.dispatchEvent(new Event('jupiter_enquiries_updated'));
};`;

const newDel = `export const deleteEnquiryFromDb = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(\`/enquiries/\${encodeURIComponent(id)}\`);
  } catch (err) {
    console.warn('Backend delete failed:', err);
  }
  _cachedEnquiries = _cachedEnquiries.filter(e => e.id !== id);
  window.dispatchEvent(new Event('jupiter_enquiries_updated'));
};`;

content = content.replace(oldDel, newDel);

// 5. Update updateStoredEnquiryStatus
const oldStatus = `  // Persist status to backend PostgreSQL database
  fetch(\`\${API_BASE_URL}/enquiries/\${encodeURIComponent(id)}/status\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: normalized }),
  }).catch((err) => {
    console.warn('Backend update status failed:', err);
  });`;

const newStatus = `  // Persist status to backend PostgreSQL database
  apiClient.patch(\`/enquiries/\${encodeURIComponent(id)}/status\`, { status: normalized }).catch((err) => {
    console.warn('Backend update status failed:', err);
  });`;

content = content.replace(oldStatus, newStatus);

// 6. Update markStoredEnquiryAsRead
const oldRead = `  // Persist read state to backend
  fetch(\`\${API_BASE_URL}/enquiries/\${encodeURIComponent(id)}/read\`, {
    method: 'PATCH',
  }).catch(() => {});`;

const newRead = `  // Persist read state to backend
  apiClient.patch(\`/enquiries/\${encodeURIComponent(id)}/read\`).catch(() => {});`;

content = content.replace(oldRead, newRead);

// 7. Update markAllStoredEnquiriesAsRead
const oldMarkAll = `  // Persist all read state to backend
  fetch(\`\${API_BASE_URL}/enquiries/mark-all-read\`, {
    method: 'PATCH',
  }).catch(() => {});`;

const newMarkAll = `  // Persist all read state to backend
  apiClient.patch('/enquiries/mark-all-read').catch(() => {});`;

content = content.replace(oldMarkAll, newMarkAll);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully patched enquiryService.ts');

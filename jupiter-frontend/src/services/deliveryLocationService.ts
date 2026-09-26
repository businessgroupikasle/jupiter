import { apiClient } from './api';

export interface MachineDeliveryLocationItem {
  id: string;
  clientName: string;
  locationCity: string;
  state: string;
  machineModel: string;
  deliveryDate: string;
  status: 'Delivered & Operational' | 'In Transit' | 'Installation Ongoing' | string;
  transportVehicle?: string;
  contactPhone?: string;
  notes?: string;
  createdAt?: string;
}

let _cachedLocations: MachineDeliveryLocationItem[] = [];

// Fetch delivery locations live from backend database
export const fetchDeliveryLocationsFromDb = async (): Promise<MachineDeliveryLocationItem[]> => {
  try {
    const res = await apiClient.get('/delivery-locations');
    if (res.data?.success && Array.isArray(res.data.data)) {
      const mapped: MachineDeliveryLocationItem[] = res.data.data.map((item: any) => ({
        id: item.id,
        clientName: item.clientName,
        locationCity: item.locationCity,
        state: item.state,
        machineModel: item.machineModel,
        deliveryDate: item.deliveryDate || new Date(item.createdAt || Date.now()).toLocaleDateString('en-GB'),
        status: item.status || 'Delivered & Operational',
        transportVehicle: item.transportVehicle || '',
        contactPhone: item.contactPhone || '',
        notes: item.notes || '',
        createdAt: item.createdAt,
      }));

      _cachedLocations = mapped;
      window.dispatchEvent(new Event('jupiter_locations_updated'));
      return mapped;
    }
  } catch (err) {
    console.warn('Could not fetch delivery locations from backend API:', err);
  }
  return _cachedLocations;
};

export const clearAllDeliveryLocations = async (): Promise<void> => {
  try {
    await apiClient.delete('/delivery-locations');
  } catch (err) {
    console.warn('Could not clear delivery locations from backend DB:', err);
  }
  _cachedLocations = [];
  window.dispatchEvent(new Event('jupiter_locations_updated'));
};

export const getStoredDeliveryLocations = (): MachineDeliveryLocationItem[] => {
  return _cachedLocations;
};

export const saveStoredDeliveryLocations = (locs: MachineDeliveryLocationItem[]): void => {
  _cachedLocations = locs;
  window.dispatchEvent(new Event('jupiter_locations_updated'));
};

export const addDeliveryLocation = async (loc: Partial<MachineDeliveryLocationItem>): Promise<MachineDeliveryLocationItem> => {
  const payload = {
    clientName: loc.clientName || 'Valued Client',
    locationCity: loc.locationCity || 'Coimbatore',
    state: loc.state || 'Tamil Nadu',
    machineModel: loc.machineModel || 'Automatic Machinery',
    deliveryDate: loc.deliveryDate || new Date().toLocaleDateString('en-GB'),
    status: loc.status || 'Delivered & Operational',
    transportVehicle: loc.transportVehicle || '',
    contactPhone: loc.contactPhone || '',
    notes: loc.notes || '',
  };

  const res = await apiClient.post('/delivery-locations', payload);
  const created: MachineDeliveryLocationItem = res.data?.data ? {
    id: res.data.data.id,
    clientName: res.data.data.clientName,
    locationCity: res.data.data.locationCity,
    state: res.data.data.state,
    machineModel: res.data.data.machineModel,
    deliveryDate: res.data.data.deliveryDate,
    status: res.data.data.status,
    transportVehicle: res.data.data.transportVehicle,
    contactPhone: res.data.data.contactPhone,
    notes: res.data.data.notes,
  } : {
    id: `DEL-${Date.now()}`,
    ...payload,
  };

  _cachedLocations = [created, ..._cachedLocations.filter(l => l.id !== created.id)];
  window.dispatchEvent(new Event('jupiter_locations_updated'));
  return created;
};

export const updateDeliveryLocation = async (id: string, updates: Partial<MachineDeliveryLocationItem>): Promise<MachineDeliveryLocationItem | null> => {
  const res = await apiClient.put(`/delivery-locations/${encodeURIComponent(id)}`, updates);
  const updated: MachineDeliveryLocationItem = res.data?.data ? {
    id: res.data.data.id,
    clientName: res.data.data.clientName,
    locationCity: res.data.data.locationCity,
    state: res.data.data.state,
    machineModel: res.data.data.machineModel,
    deliveryDate: res.data.data.deliveryDate,
    status: res.data.data.status,
    transportVehicle: res.data.data.transportVehicle,
    contactPhone: res.data.data.contactPhone,
    notes: res.data.data.notes,
  } : {
    ...(_cachedLocations.find(l => l.id === id) || {}),
    ...updates,
    id,
  } as MachineDeliveryLocationItem;

  _cachedLocations = _cachedLocations.map(l => (l.id === id ? { ...l, ...updated } : l));
  window.dispatchEvent(new Event('jupiter_locations_updated'));
  return updated;
};

export const deleteDeliveryLocation = async (id: string): Promise<boolean> => {
  await apiClient.delete(`/delivery-locations/${encodeURIComponent(id)}`);
  _cachedLocations = _cachedLocations.filter(l => l.id !== id);
  window.dispatchEvent(new Event('jupiter_locations_updated'));
  return true;
};

// Initial background sync from backend
fetchDeliveryLocationsFromDb().catch(() => {});

export interface MaintenanceConfig {
  enabled: boolean;
  title: string;
  message: string;
  estimatedTime: string;
  emergencyPhone: string;
  emergencyEmail: string;
  allowAdminBypass: boolean;
  lastUpdated: string;
}

export const MAINTENANCE_STORAGE_KEY = 'jupiter_maintenance_settings';

export const DEFAULT_MAINTENANCE_CONFIG: MaintenanceConfig = {
  enabled: false,
  title: 'Scheduled Machinery Infrastructure Maintenance',
  message: 'Jupiter Industries website is currently undergoing scheduled platform upgrades to optimize our machinery catalog and quotation system. We will be back online shortly.',
  estimatedTime: 'Estimated downtime: Approx. 1 to 2 Hours',
  emergencyPhone: '+91 93429 19060',
  emergencyEmail: 'info@jupiterindustries.com',
  allowAdminBypass: false,
  lastUpdated: new Date().toISOString()
};

export const getStoredMaintenanceConfig = (): MaintenanceConfig => {
  try {
    const raw = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_MAINTENANCE_CONFIG, ...parsed };
    }
  } catch (e) {
    console.error('Error reading maintenance config:', e);
  }
  return DEFAULT_MAINTENANCE_CONFIG;
};

export const saveMaintenanceConfig = (updates: Partial<MaintenanceConfig>): MaintenanceConfig => {
  const current = getStoredMaintenanceConfig();
  const updated: MaintenanceConfig = {
    ...current,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  try {
    localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('jupiter_maintenance_updated'));
  } catch (e) {
    console.error('Error saving maintenance config:', e);
  }
  return updated;
};

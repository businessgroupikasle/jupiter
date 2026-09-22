export type SystemRole = 'Super Admin' | 'Admin' | 'Editor' | string;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: SystemRole;
  createdAt: string;
  avatar?: string;
}

const USERS_STORAGE_KEY = 'jupiter_admin_users_v1';
const SESSION_STORAGE_KEY = 'jupiter_admin_session_v1';
const ROLES_STORAGE_KEY = 'jupiter_system_roles_v1';

export const DEFAULT_ROLES: string[] = [
  'Admin',
  'Super Admin',
  'Editor',
  'Sales Executive',
  'Marketing Manager',
  'Plant Operations Lead'
];

export const getStoredRoles = (): string[] => {
  try {
    const data = localStorage.getItem(ROLES_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(DEFAULT_ROLES));
      return DEFAULT_ROLES;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return DEFAULT_ROLES;
  } catch (err) {
    console.error('Failed to load system roles:', err);
    return DEFAULT_ROLES;
  }
};

export const saveRoles = (roles: string[]): void => {
  try {
    localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
    window.dispatchEvent(new Event('jupiter_roles_updated'));
  } catch (err) {
    console.error('Failed to save roles:', err);
  }
};

export const addStoredRole = (newRole: string): string[] => {
  const clean = newRole.trim();
  if (!clean) return getStoredRoles();
  const current = getStoredRoles();
  if (!current.some(r => r.toLowerCase() === clean.toLowerCase())) {
    const updated = [...current, clean];
    saveRoles(updated);
    return updated;
  }
  return current;
};

// Initial default admin user
const DEFAULT_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Jupiter Admin',
    email: 'admin@jupiter.com',
    passwordHash: 'admin123',
    role: 'Super Admin',
    createdAt: new Date().toISOString(),
  },
];

export const getStoredUsers = (): AdminUser[] => {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load admin users:', err);
    return DEFAULT_USERS;
  }
};

export const saveUsers = (users: AdminUser[]): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save admin users:', err);
  }
};

export const getCurrentUser = (): AdminUser | null => {
  try {
    const data = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load session:', err);
    return null;
  }
};

export const setCurrentUser = (user: AdminUser | null): void => {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to update session:', err);
  }
};

export const loginAdmin = (email: string, password: string): { success: boolean; user?: AdminUser; error?: string } => {
  const users = getStoredUsers();
  const cleanEmail = email.trim().toLowerCase();
  
  const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!found) {
    return { success: false, error: 'No admin account found with this email. Default: admin@jupiter.com / admin123' };
  }

  if (found.passwordHash !== password) {
    return { success: false, error: 'Incorrect password. Default: admin@jupiter.com / admin123' };
  }

  setCurrentUser(found);
  return { success: true, user: found };
};

export const signupAdmin = (
  name: string,
  email: string,
  password: string,
  adminCode?: string
): { success: boolean; user?: AdminUser; error?: string } => {
  const cleanEmail = email.trim().toLowerCase();
  const users = getStoredUsers();

  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this email address already exists.' };
  }

  const REQUIRED_CODE = 'JUPITER2026';
  if (adminCode && adminCode.trim() && adminCode.trim().toUpperCase() !== REQUIRED_CODE) {
    return { success: false, error: 'Invalid Admin Security Key. (Use JUPITER2026 or contact admin)' };
  }

  const newUser: AdminUser = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    passwordHash: password,
    role: users.length === 0 ? 'Super Admin' : 'Admin',
    createdAt: new Date().toISOString(),
  };

  const updated = [...users, newUser];
  saveUsers(updated);
  setCurrentUser(newUser);
  return { success: true, user: newUser };
};

export const logoutAdmin = (): void => {
  setCurrentUser(null);
};

export const updateCurrentAdminProfile = (updates: Partial<AdminUser>): AdminUser => {
  let current = getCurrentUser();
  const users = getStoredUsers();
  
  if (!current) {
    current = users[0] || {
      id: 'usr-default',
      name: 'Jupiter Admin',
      email: 'admin@jupiter.com',
      passwordHash: 'admin123',
      role: 'Super Admin',
      avatar: '/favicon.png',
      createdAt: new Date().toISOString()
    };
  }

  const updated: AdminUser = {
    ...current,
    ...updates,
  };

  // 1. Update session storage
  setCurrentUser(updated);

  // 2. Update user in stored users list
  const nextUsers = users.length > 0
    ? (users.some(u => u.id === updated.id) ? users.map(u => u.id === updated.id ? updated : u) : [...users, updated])
    : [updated];
  saveUsers(nextUsers);

  // 3. Dispatch event
  try {
    window.dispatchEvent(new Event('jupiter_user_updated'));
  } catch (e) {}

  return updated;
};


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
    return { success: false, error: 'No admin account found with this email.' };
  }

  if (found.passwordHash !== password) {
    return { success: false, error: 'Incorrect password.' };
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

export interface PasswordResetTokenRecord {
  email: string;
  token: string;
  expiresAt: number;
}

const RESET_TOKENS_STORAGE_KEY = 'jupiter_password_reset_tokens_v1';

export const getStoredResetTokens = (): PasswordResetTokenRecord[] => {
  try {
    const data = localStorage.getItem(RESET_TOKENS_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveResetTokens = (tokens: PasswordResetTokenRecord[]): void => {
  try {
    localStorage.setItem(RESET_TOKENS_STORAGE_KEY, JSON.stringify(tokens));
  } catch (err) {
    console.error('Failed to save reset tokens:', err);
  }
};

export const requestPasswordReset = (
  email: string
): { success: boolean; message: string; debugResetUrl?: string } => {
  const cleanEmail = email.trim().toLowerCase();
  const users = getStoredUsers();
  const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  // Generic security message (does not reveal user existence)
  const genericMessage = 'If this email is registered, a password reset link has been sent.';

  if (!user) {
    return { success: true, message: genericMessage };
  }

  // Generate secure token valid for 1 hour
  const randomPart = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
  const token = `rst_${Date.now()}_${randomPart}`;
  const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

  const existing = getStoredResetTokens().filter(
    (t) => t.email.toLowerCase() !== cleanEmail && t.expiresAt > Date.now()
  );
  existing.push({ email: cleanEmail, token, expiresAt });
  saveResetTokens(existing);

  const debugResetUrl = `/admin/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(cleanEmail)}`;

  return {
    success: true,
    message: genericMessage,
    debugResetUrl
  };
};

export const verifyResetToken = (
  email: string,
  token: string
): { valid: boolean; error?: string } => {
  if (!email || !token) {
    return { valid: false, error: 'Invalid or missing password reset link parameters.' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const tokens = getStoredResetTokens();
  const record = tokens.find(
    (t) => t.email.toLowerCase() === cleanEmail && t.token === token
  );

  if (!record) {
    return { valid: false, error: 'This password reset link is invalid or has already been used.' };
  }

  if (Date.now() > record.expiresAt) {
    return { valid: false, error: 'This password reset link has expired. Please request a new one.' };
  }

  return { valid: true };
};

export const resetPasswordWithToken = (
  email: string,
  token: string,
  newPassword: string
): { success: boolean; error?: string } => {
  const cleanEmail = email.trim().toLowerCase();
  const verify = verifyResetToken(cleanEmail, token);
  if (!verify.valid) {
    return { success: false, error: verify.error };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const users = getStoredUsers();
  const userIdx = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
  if (userIdx === -1) {
    return { success: false, error: 'User account not found.' };
  }

  users[userIdx].passwordHash = newPassword;
  saveUsers(users);

  // Update session if currently logged in with this user
  const current = getCurrentUser();
  if (current && current.email.toLowerCase() === cleanEmail) {
    current.passwordHash = newPassword;
    setCurrentUser(current);
  }

  // Invalidate the used token
  const tokens = getStoredResetTokens().filter(
    (t) => !(t.email.toLowerCase() === cleanEmail && t.token === token)
  );
  saveResetTokens(tokens);

  return { success: true };
};



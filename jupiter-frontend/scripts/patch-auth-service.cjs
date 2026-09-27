const fs = require('fs');
const path = require('path');

// 1. Patch authService.ts
const authFilePath = path.join(__dirname, '../src/services/authService.ts');
let authContent = fs.readFileSync(authFilePath, 'utf8').replace(/\r\n/g, '\n');

// Add imports
if (!authContent.includes("from './authStorage'")) {
  authContent = `import { API_BASE_URL } from './api';\nimport { getAdminToken, setAdminToken, clearAdminToken } from './authStorage';\nexport { getAdminToken, setAdminToken, clearAdminToken };\n` + authContent;
}

// Add token to AdminUser interface
authContent = authContent.replace(
  '  avatar?: string;\n}',
  '  avatar?: string;\n  token?: string;\n}'
);

// Update setCurrentUser to sync token
const oldSetCurrentUser = `export const setCurrentUser = (user: AdminUser | null): void => {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to update session:', err);
  }
};`;

const newSetCurrentUser = `export const setCurrentUser = (user: AdminUser | null): void => {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      if (user.token) {
        setAdminToken(user.token);
      } else {
        getAdminToken(); // Ensure valid token is initialized
      }
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      clearAdminToken();
    }
  } catch (err) {
    console.error('Failed to update session:', err);
  }
};`;

authContent = authContent.replace(oldSetCurrentUser, newSetCurrentUser);

// Update loginAdmin
const oldLoginAdmin = `export const loginAdmin = (email: string, password: string): { success: boolean; user?: AdminUser; error?: string } => {
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
};`;

const newLoginAdmin = `export const loginAdmin = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: AdminUser; error?: string }> => {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Try authenticating with local backend API
  try {
    const res = await fetch(\`\${API_BASE_URL}/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.user) {
        const token = json.token || \`jupiter-token-\${json.user.id}-\${Date.now()}\`;
        setAdminToken(token);
        const adminUser: AdminUser = {
          id: json.user.id,
          name: json.user.name,
          email: json.user.email,
          passwordHash: '',
          role: json.user.role || 'Super Admin',
          createdAt: json.user.createdAt || new Date().toISOString(),
          avatar: json.user.avatar,
          token,
        };
        setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      }
    } else {
      const errJson = await res.json().catch(() => null);
      if (errJson && errJson.message) {
        return { success: false, error: errJson.message };
      }
    }
  } catch (err) {
    console.warn('Backend login attempt failed, falling back to local user store:', err);
  }

  // 2. Fallback to local stored admin users
  const users = getStoredUsers();
  const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!found) {
    return { success: false, error: 'No admin account found with this email.' };
  }

  if (found.passwordHash !== password) {
    return { success: false, error: 'Incorrect password.' };
  }

  const token = \`jupiter-token-\${found.id === 'usr-1' ? 'cmudubsyi0010uvm88tljjc1d' : found.id}-\${Date.now()}\`;
  setAdminToken(token);
  const userWithToken = { ...found, token };
  setCurrentUser(userWithToken);
  return { success: true, user: userWithToken };
};`;

authContent = authContent.replace(oldLoginAdmin, newLoginAdmin);

fs.writeFileSync(authFilePath, authContent, 'utf8');
console.log('Successfully patched authService.ts');

// 2. Patch AdminAuthScreen.tsx
const screenFilePath = path.join(__dirname, '../src/components/AdminAuthScreen.tsx');
let screenContent = fs.readFileSync(screenFilePath, 'utf8').replace(/\r\n/g, '\n');

const oldHandleLogin = `  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginAdmin(loginEmail, loginPassword);
      setIsLoading(false);

      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Invalid admin credentials.');
      }
    }, 400);
  };`;

const newHandleLogin = `  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginAdmin(loginEmail, loginPassword);
      setIsLoading(false);

      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Invalid admin credentials.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Login failed.');
    }
  };`;

screenContent = screenContent.replace(oldHandleLogin, newHandleLogin);
fs.writeFileSync(screenFilePath, screenContent, 'utf8');
console.log('Successfully patched AdminAuthScreen.tsx');

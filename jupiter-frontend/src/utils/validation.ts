/**
 * Form Validation Utilities for Jupiter Industries
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateName = (name: string): ValidationResult => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Full name is required.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, and dots.' };
  }
  return { isValid: true };
};

/**
 * Country-specific phone digit length rules.
 * Key = dial code, Value = { min, max } expected digits (excluding dial code).
 */
export const PHONE_LENGTH_RULES: Record<string, { min: number; max: number }> = {
  '+91':  { min: 10, max: 10 },  // India
  '+1':   { min: 10, max: 10 },  // USA / Canada
  '+44':  { min: 10, max: 11 },  // United Kingdom
  '+971': { min: 9,  max: 9  },  // UAE
  '+966': { min: 9,  max: 9  },  // Saudi Arabia
  '+974': { min: 8,  max: 8  },  // Qatar
  '+968': { min: 8,  max: 8  },  // Oman
  '+965': { min: 8,  max: 8  },  // Kuwait
  '+973': { min: 8,  max: 8  },  // Bahrain
  '+61':  { min: 9,  max: 9  },  // Australia
  '+65':  { min: 8,  max: 8  },  // Singapore
  '+60':  { min: 9,  max: 10 },  // Malaysia
  '+94':  { min: 9,  max: 9  },  // Sri Lanka
  '+880': { min: 10, max: 10 },  // Bangladesh
  '+977': { min: 10, max: 10 },  // Nepal
  '+254': { min: 9,  max: 9  },  // Kenya
  '+27':  { min: 9,  max: 9  },  // South Africa
  '+234': { min: 10, max: 10 },  // Nigeria
  '+255': { min: 9,  max: 9  },  // Tanzania
  '+256': { min: 9,  max: 9  },  // Uganda
  '+233': { min: 9,  max: 9  },  // Ghana
  '+92':  { min: 10, max: 10 },  // Pakistan
  '+86':  { min: 11, max: 11 },  // China
  '+81':  { min: 10, max: 11 },  // Japan
  '+82':  { min: 10, max: 11 },  // South Korea
  '+62':  { min: 10, max: 12 },  // Indonesia
  '+63':  { min: 10, max: 10 },  // Philippines
  '+66':  { min: 9,  max: 9  },  // Thailand
  '+84':  { min: 9,  max: 10 },  // Vietnam
  '+7':   { min: 10, max: 10 },  // Russia / Kazakhstan
  '+49':  { min: 10, max: 11 },  // Germany
  '+33':  { min: 9,  max: 9  },  // France
  '+39':  { min: 9,  max: 10 },  // Italy
  '+34':  { min: 9,  max: 9  },  // Spain
  '+55':  { min: 10, max: 11 },  // Brazil
  '+52':  { min: 10, max: 10 },  // Mexico
  '+90':  { min: 10, max: 10 },  // Turkey
  '+20':  { min: 10, max: 10 },  // Egypt
  '+98':  { min: 10, max: 10 },  // Iran
  '+964': { min: 10, max: 10 },  // Iraq
  '+962': { min: 9,  max: 9  },  // Jordan
  '+961': { min: 7,  max: 8  },  // Lebanon
  '+972': { min: 9,  max: 9  },  // Israel
  '+380': { min: 9,  max: 9  },  // Ukraine
};

/** Fallback range when no specific rule is defined */
export const DEFAULT_PHONE_RULE = { min: 7, max: 12 };

export const validatePhone = (dialCode: string, phoneNumber: string): ValidationResult => {
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (!digitsOnly) {
    return { isValid: false, error: 'Phone / WhatsApp number is required.' };
  }

  const rule = PHONE_LENGTH_RULES[dialCode] ?? DEFAULT_PHONE_RULE;

  if (rule.min === rule.max) {
    // Exact digit count required
    if (digitsOnly.length !== rule.min) {
      return {
        isValid: false,
        error: `Phone number must be exactly ${rule.min} digits for ${dialCode} (currently ${digitsOnly.length} digits).`,
      };
    }
  } else {
    // Range of digits
    if (digitsOnly.length < rule.min || digitsOnly.length > rule.max) {
      return {
        isValid: false,
        error: `Phone number must be ${rule.min}–${rule.max} digits for ${dialCode} (currently ${digitsOnly.length} digits).`,
      };
    }
  }

  // For India (+91), must start with 6, 7, 8, or 9
  if (dialCode === '+91' && !/^[6-9]/.test(digitsOnly)) {
    return {
      isValid: false,
      error: 'Indian mobile number should begin with 6, 7, 8, or 9.',
    };
  }

  return { isValid: true };
};

export const validateEmail = (email: string, required = true): ValidationResult => {
  const trimmed = email.trim();
  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Email address is required.' };
    }
    return { isValid: true };
  }

  // Strict email format: name@domain.tld (e.g. contact@jupiter.com)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { 
      isValid: false, 
      error: 'Please enter a valid email address (e.g. name@company.com).' 
    };
  }

  // Extra check for domain typos
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Invalid email address.' };
  }
  const domain = parts[1];
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
    return { isValid: false, error: 'Please enter a complete domain (e.g. company.com).' };
  }

  return { isValid: true };
};

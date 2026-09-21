import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { COUNTRY_CODES, CountryCode, DEFAULT_COUNTRY } from '../data/countryCodes';
import { PHONE_LENGTH_RULES, DEFAULT_PHONE_RULE } from '../utils/validation';

interface PhoneInputWithCountryProps {
  dialCode: string;
  phoneNumber: string;
  onDialCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  placeholder?: string;
  hasError?: boolean;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export const PhoneInputWithCountry: React.FC<PhoneInputWithCountryProps> = ({
  dialCode,
  phoneNumber,
  onDialCodeChange,
  onPhoneNumberChange,
  placeholder = 'Your number',
  hasError = false,
  required = false,
  disabled = false,
  id = 'phone-input'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentCountry: CountryCode =
    COUNTRY_CODES.find((c) => c.dial_code === dialCode) || DEFAULT_COUNTRY;

  // Handle outside click to close dropdown reliably
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // In modals or forms near bottom of viewport, open upwards
      setOpenUpwards(spaceBelow < 260);
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelectCountry = (country: CountryCode) => {
    onDialCodeChange(country.dial_code);
    setIsOpen(false);
  };

  // Get max allowed digits for the selected country code
  const maxDigits = useMemo(() => {
    const rule = PHONE_LENGTH_RULES[dialCode] ?? DEFAULT_PHONE_RULE;
    return rule.max;
  }, [dialCode]);

  // Auto-trim phone number when country changes and digits exceed the new limit
  useEffect(() => {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length > maxDigits) {
      onPhoneNumberChange(digitsOnly.slice(0, maxDigits));
    }
  }, [maxDigits]);

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strictly allow numbers only and limit to country-specific max digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, maxDigits);
    onPhoneNumberChange(digitsOnly);
  };

  return (
    <div 
      className={`phone-country-input-group ${hasError ? 'has-error' : ''} ${isOpen ? 'dropdown-active' : ''}`} 
      ref={dropdownRef}
      style={{ position: 'relative' }}
    >
      {/* Country Selector Trigger Pill */}
      <div className="country-select-wrapper">
        <button
          type="button"
          disabled={disabled}
          onClick={toggleDropdown}
          className="country-display-pill-btn"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          title={`Country: ${currentCountry.name} (${currentCountry.dial_code})`}
        >
          <img
            src={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png`}
            alt={currentCountry.name}
            className="country-flag-img"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="country-code-text">{currentCountry.dial_code}</span>
          <ChevronDown
            size={14}
            className={`country-chevron ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Custom Rich Dropdown with Real Flag Icons & Country Codes (Direct List) */}
        {isOpen && (
          <div 
            className={`country-dropdown-popover ${openUpwards ? 'open-upwards' : ''}`} 
            role="listbox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="country-options-scroll" style={{ maxHeight: '260px' }}>
              {COUNTRY_CODES.map((c) => {
                const isSelected = c.dial_code === currentCountry.dial_code && c.code === currentCountry.code;
                return (
                  <div
                    key={`${c.code}-${c.dial_code}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelectCountry(c);
                    }}
                    className={`country-option-item ${isSelected ? 'selected' : ''}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                      alt={c.name}
                      className="country-option-flag"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="country-option-name">{c.name}</span>
                    <span className="country-option-dial">{c.dial_code}</span>
                    {isSelected && <Check size={14} className="country-option-check" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Phone Input (country-specific max digits) */}
      <input
        id={id}
        type="tel"
        maxLength={maxDigits}
        inputMode="numeric"
        pattern="[0-9]*"
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={phoneNumber}
        onChange={handlePhoneInputChange}
        className="phone-number-field"
        autoComplete="tel-national"
      />
    </div>
  );
};

export default PhoneInputWithCountry;

import React from 'react';

export const WhatsAppIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 32,
  className = '',
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12.01 2.01c-5.5 0-9.98 4.47-9.98 9.98 0 1.95.56 3.78 1.54 5.33L2 22l4.83-1.52c1.49.88 3.23 1.39 5.09 1.39 5.5 0 9.98-4.48 9.98-9.98 0-5.51-4.48-9.98-9.98-9.98zm-.01 18.25c-1.63 0-3.17-.46-4.49-1.26l-.32-.2-3.32 1.04 1.07-3.23-.21-.34c-.87-1.39-1.34-3-1.34-4.67 0-4.62 3.76-8.38 8.38-8.38 4.63 0 8.39 3.76 8.39 8.38 0 4.62-3.76 8.38-8.39 8.38zm4.61-6.3c-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13-.17.25-.65.82-.8 1-.15.17-.3.2-.55.07-.25-.13-1.07-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.41-.43-.57-.44h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.3 3.79.6.26 1.07.42 1.44.53.61.2 1.16.17 1.6.1.49-.07 1.49-.61 1.7-1.2.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.48-.3z" />
  </svg>
);

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '919876543210';
  const defaultMessage = encodeURIComponent(
    'Hello Jupiter Industries, I would like to enquire about brick and block machinery.'
  );

  return (
    <div className="floating-whatsapp-widget">
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-action-circle"
        aria-label="Chat on WhatsApp with Jupiter Industries"
      >
        <WhatsAppIcon size={32} />
      </a>
    </div>
  );
};

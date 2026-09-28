import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { getProductImageUrl, hasValidProductImage } from '../utils/imageUrl';

interface ProductCardImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
  minHeight?: string;
}

/**
 * Product image display component adhering to strict image rules:
 * - Never shows default fallback machine photos or /images/... placeholder paths.
 * - If no valid image is provided, shows a clean neutral "No image uploaded" state only.
 * - If an image fails to load, gracefully falls back to "No image uploaded".
 * - Existing uploaded images continue working exactly as before.
 */
export const ProductCardImage: React.FC<ProductCardImageProps> = ({
  src,
  alt,
  className,
  style,
  minHeight = '160px',
}) => {
  const [hasError, setHasError] = useState(false);

  const resolvedUrl = getProductImageUrl(src);
  const isValid = hasValidProductImage(src) && !hasError && Boolean(resolvedUrl);

  if (!isValid) {
    return (
      <div
        className="product-no-image-placeholder"
        style={{
          width: '100%',
          height: '100%',
          minHeight,
          background: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#94A3B8',
          userSelect: 'none',
          padding: '16px',
          boxSizing: 'border-box',
          ...style,
        }}
        title="No image uploaded for this machine"
      >
        <ImageIcon size={28} strokeWidth={1.5} style={{ color: '#94A3B8' }} />
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#64748B',
            letterSpacing: '0.01em',
          }}
        >
          No image uploaded
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedUrl}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

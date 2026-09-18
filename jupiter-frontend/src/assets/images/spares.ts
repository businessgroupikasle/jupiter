// Centralized registry for all genuine Jupiter machine spare parts images
const sparesGlob = import.meta.glob<{ default: string }>('./Spares/*.png', { eager: true });

export const SPARES_IMAGE_MAP: Record<string, string> = {};

for (const path in sparesGlob) {
  // Extract filename without path and extension, e.g. "10 Brick Mold & Ram"
  const fileName = path.split('/').pop()?.replace(/\.png$/, '') || '';
  if (fileName) {
    SPARES_IMAGE_MAP[fileName] = (sparesGlob[path] as any)?.default || sparesGlob[path];
  }
}

export const getSpareImage = (name: string): string => {
  return SPARES_IMAGE_MAP[name] || '';
};

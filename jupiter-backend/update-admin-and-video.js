const fs = require('fs');

// 1. Update AdminDashboard.tsx
const adminPath = 'E:/Project/jupiter/jupiter-frontend/src/pages/AdminDashboard.tsx';
let adminContent = fs.readFileSync(adminPath, 'utf8');

adminContent = adminContent.replace(
  /fetchProducts\(\)\.then\(res => \{\s*if \(res && res\.length > 0\) setProducts\(res\);\s*\}\)/,
  `fetchProducts().then(res => {
      if (Array.isArray(res)) setProducts(res);
    })`
);

adminContent = adminContent.replace(
  /fetchProjectsFromDb\(\)\.then\(res => \{\s*if \(res && res\.length > 0\) setProjects\(res\);\s*\}\)/,
  `fetchProjectsFromDb().then(res => {
      if (Array.isArray(res)) setProjects(res);
    })`
);

adminContent = adminContent.replace(
  /fetchGalleryPhotosFromDb\(\)\.then\(res => \{\s*if \(res && res\.length > 0\) setGallery\(res\);\s*\}\)/,
  `fetchGalleryPhotosFromDb().then(res => {
      if (Array.isArray(res)) setGallery(res);
    })`
);

adminContent = adminContent.replace(
  /fetchVideosFromDb\(\)\.then\(res => \{\s*if \(res && res\.length > 0\) setVideos\(res\);\s*\}\)/,
  `fetchVideosFromDb().then(res => {
      if (Array.isArray(res)) setVideos(res);
    })`
);

adminContent = adminContent.replace(
  /fetchBlogsFromDb\(\)\.then\(res => \{\s*if \(res && res\.length > 0\) setBlogs\(res\);\s*\}\)/,
  `fetchBlogsFromDb().then(res => {
      if (Array.isArray(res)) setBlogs(res);
    })`
);

adminContent = adminContent.replace(
  /onConfirm:\s*\(\)\s*=>\s*\{\s*clearAllProducts\(\);\s*setProducts\(\[\]\);/,
  `onConfirm: async () => {
                            await clearAllProducts();
                            setProducts([]);`
);

fs.writeFileSync(adminPath, adminContent, 'utf8');
console.log('✅ AdminDashboard.tsx updated!');

// 2. Update videoService.ts
const videoPath = 'E:/Project/jupiter/jupiter-frontend/src/services/videoService.ts';
let videoContent = fs.readFileSync(videoPath, 'utf8');
videoContent = videoContent.replace(
  /return _cachedVideos\.length > 0 \? _cachedVideos : INITIAL_VIDEOS;/g,
  'return _cachedVideos;'
);
fs.writeFileSync(videoPath, videoContent, 'utf8');
console.log('✅ videoService.ts updated!');

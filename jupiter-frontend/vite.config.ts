import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5026',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5026',
        changeOrigin: true,
      },
    },
    port: 3026,
    host: true,
    watch: {
      ignored: ['**/*.mp4', '**/*.webm', '**/*.ogg', '**/*.mkv']
    },
    fs: {
      strict: false,
      allow: ['..', 'C:/Users/Developer 2/.gemini', 'C:/']
    }
  }
});

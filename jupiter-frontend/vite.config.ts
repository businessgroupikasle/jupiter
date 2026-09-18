import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    fs: {
      strict: false,
      allow: ['..', 'C:/Users/Developer 2/.gemini', 'C:/']
    }
  }
});

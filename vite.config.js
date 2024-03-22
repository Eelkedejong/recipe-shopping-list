import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-unresolved
import { imagetools } from 'vite-imagetools';
import sass from 'sass';

export default defineConfig({
  plugins: [react(), imagetools()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  optimizeDeps: {
    exclude: ['dnd-kit'],
  },
});

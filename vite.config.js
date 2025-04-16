import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// eslint-disable-next-line import/no-unresolved
import { imagetools } from 'vite-imagetools';
import sass from 'sass';

export default defineConfig({
  plugins: [react(), imagetools()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        additionalData: `@use "@styles/variables.scss" as *;`,
      },
    },
  },
  optimizeDeps: { exclude: ['dnd-kit'] },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
});

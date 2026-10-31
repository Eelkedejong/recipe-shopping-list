/**
 * Test config, kept separate from vite.config.js on purpose.
 *
 * The app build needs Tailwind and imagetools; the tests do not, and loading
 * them makes every run slower for no benefit. The aliases have to be repeated
 * here though - keep them in step with vite.config.js.
 *
 * CSS is left unprocessed (Vitest's default). Component modules import
 * .module.scss and read `styles.something` from it, which will be undefined
 * in tests. That is fine and deliberate: tests query by role and text, never
 * by class name, so they describe what a user can see rather than how it is
 * styled.
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

const root = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
      '@components': path.resolve(root, 'src/components'),
      '@pages': path.resolve(root, 'src/pages'),
      '@utils': path.resolve(root, 'src/utils'),
      '@assets': path.resolve(root, 'src/assets'),
      '@store': path.resolve(root, 'src/store'),
      '@styles': path.resolve(root, 'src/styles'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.{js,jsx}'],
    restoreMocks: true,
  },
});

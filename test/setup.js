/**
 * Test environment setup.
 *
 * Runs before every test file.
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// The app reads this to reach the API. Tests never make real requests - fetch
// is stubbed per test - but the value has to exist or modules that read it at
// import time throw.
process.env.VITE_API_URL ??= 'http://localhost:3001';

// jsdom implements neither of these, and Base UI and dnd-kit both reach for
// them. Without the stubs, components that are otherwise fine fail to mount
// for reasons that have nothing to do with what is being tested.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Base UI positions popups with this.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

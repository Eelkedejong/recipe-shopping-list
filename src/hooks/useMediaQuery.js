import { useCallback, useSyncExternalStore } from 'react';

// Mirrors $screen-m in src/styles/variables.scss. Keep the two in sync: the
// SCSS breakpoint mixins and this hook must agree on where mobile ends.
export const SCREEN_M = 1200;

export const useMediaQuery = (query) => {
  const subscribe = useCallback(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};

/**
 * True below the `m` breakpoint, matching `@include screen-m(max)`. The
 * navigation and the filters render as a drawer there and inline above it.
 */
export const useIsMobile = () => useMediaQuery(`(max-width: ${SCREEN_M}px)`);

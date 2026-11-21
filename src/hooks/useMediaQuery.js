import { useCallback, useSyncExternalStore } from 'react';

// True while the CSS media query matches, e.g. useMediaQuery(device.small).
// Used where layout lives in JS props (Recharts) rather than CSS.
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

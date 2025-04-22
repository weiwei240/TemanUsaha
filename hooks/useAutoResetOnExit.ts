import { usePathname } from 'expo-router';
import { useCallback, useEffect } from 'react';

/**
 * Automatically run a cleanup function when the user exits a specific route group.
 * 
 * @param activeRoutes array of active paths (e.g. ['/Add', '/OrderConfirmation'])
 * @param cleanupFn function to run when the user leaves those routes
 */

export function useAutoResetOnExit(activeRoutes: string[], cleanupFunction: () => void) {
  const pathname = usePathname();

  useEffect(() => {
    // console.log('Current path:', pathname); // ✅ Leave for debugging
    const isOutside = !activeRoutes.includes(pathname);
    if (isOutside) {
      cleanupFunction();
    }
  }, [pathname]);
}

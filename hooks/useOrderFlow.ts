import { useFocusEffect, usePathname } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useOrder } from '@/context/OrderContext';

/**
 * Manages lifecycle of an order flow:
 * - Automatically sets orderInProgress when entering order flow pages
 * - Automatically resets when leaving the order flow
 */
export function useOrderFlow(orderRoutes: string[]) {
  const pathname = usePathname();
  const { setOrderInProgress, orderInProgress, resetOrder } = useOrder();

  // Track when user enters order flow
  useFocusEffect(
    useCallback(() => {
      if (orderRoutes.includes(pathname)) {
        setOrderInProgress(true);
      }
    }, [pathname])
  );

  // Reset when user leaves order flow
  useEffect(() => {
    const isOutside = !orderRoutes.includes(pathname);
    if (isOutside && orderInProgress) {
      resetOrder();
    }
  }, [pathname]);
}

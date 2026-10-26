'use client';

import { useEffect } from 'react';
import { useStoreAuth } from '@repo/store';

export function ProviderAuth({ children }: { children: React.ReactNode }) {
  const initialize = useStoreAuth((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  return <>{children}</>;
}

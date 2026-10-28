import React from 'react';
import { ProviderReactQuery } from '@repo/ui';
import { LayoutMain } from '@repo/ui';

export default function LayoutStorefront({ children }: { children: React.ReactNode }) {
  return (
    <LayoutMain>
      <ProviderReactQuery>
        <>{children}</>
      </ProviderReactQuery>
    </LayoutMain>
  );
}

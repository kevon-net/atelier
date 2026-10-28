import React from 'react';
import { ProviderReactQuery } from '@repo/ui';
import { LayoutMain } from '@repo/ui';
import LayoutNavbarStorefront from '@savour/ui/layout/navbar/storefront';

export default function LayoutStorefront({ children }: { children: React.ReactNode }) {
  return (
    <LayoutMain header={<LayoutNavbarStorefront />}>
      <ProviderReactQuery>
        <>{children}</>
      </ProviderReactQuery>
    </LayoutMain>
  );
}

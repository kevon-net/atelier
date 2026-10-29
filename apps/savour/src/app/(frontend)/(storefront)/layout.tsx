import React from 'react';
import { ProviderReactQuery } from '@repo/ui';
import { LayoutMain } from '@repo/ui';
import LayoutNavbarStorefront from '@savour/ui/layout/navbar/storefront';
import LayoutFooterstorefront from '@savour/ui/layout/footer/storefront';
import { AffixNavbar } from '@repo/ui';

export default function LayoutStorefront({ children }: { children: React.ReactNode }) {
  return (
    <LayoutMain header={<LayoutNavbarStorefront />} footer={<LayoutFooterstorefront />}>
      <ProviderReactQuery>
        <>{children}</>

        <AffixNavbar>
          <LayoutNavbarStorefront
            options={{ inAffix: true }}
            paperProps={{ bg: 'transparent', radius: 0 }}
          />
        </AffixNavbar>
      </ProviderReactQuery>
    </LayoutMain>
  );
}

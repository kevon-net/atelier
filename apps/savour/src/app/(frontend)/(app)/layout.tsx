import React from 'react';
import { ProviderReactQuery } from '@repo/ui';

export default function LayoutMarketing({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ProviderReactQuery>
        <>{children}</>
      </ProviderReactQuery>
    </div>
  );
}

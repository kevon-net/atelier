import React from 'react';
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';
import { PartialLoadingPage, ProviderMantine } from '@repo/ui';

export default function Loading() {
  return (
    <ProviderMantine theme={mantineTheme} cssVariablesResolver={getAppResolver}>
      <PartialLoadingPage />
    </ProviderMantine>
  );
}

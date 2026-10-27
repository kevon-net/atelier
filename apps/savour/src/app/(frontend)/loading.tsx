import React from 'react';
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';
import { PartialLoadingPage, ProviderMantine } from '@repo/ui';
import { DEFAULT_COLOR_SCHEME } from '@savour/constants/theme';

export default function Loading() {
  return (
    <ProviderMantine
      theme={mantineTheme}
      defaultColorScheme={DEFAULT_COLOR_SCHEME}
      cssVariablesResolver={getAppResolver}
    >
      <PartialLoadingPage />
    </ProviderMantine>
  );
}

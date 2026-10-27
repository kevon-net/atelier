import React from 'react';
import { PartialError404, ProviderMantine } from '@repo/ui';
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';
import { DEFAULT_COLOR_SCHEME } from '@savour/constants/theme';

export default function NotFound() {
  return (
    <ProviderMantine
      theme={mantineTheme}
      defaultColorScheme={DEFAULT_COLOR_SCHEME}
      cssVariablesResolver={getAppResolver}
    >
      <PartialError404 />
    </ProviderMantine>
  );
}

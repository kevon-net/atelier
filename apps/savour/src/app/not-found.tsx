import React from 'react';
import { PartialError404, ProviderMantine } from '@repo/ui';
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';

export default function NotFound() {
  return (
    <ProviderMantine theme={mantineTheme} cssVariablesResolver={getAppResolver()}>
      <PartialError404 />
    </ProviderMantine>
  );
}

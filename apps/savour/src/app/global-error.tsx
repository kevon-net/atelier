'use client';

import React from 'react';
import { PartialError500, ProviderMantine } from '@repo/ui';
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <ProviderMantine theme={mantineTheme} cssVariablesResolver={getAppResolver()}>
          <PartialError500 reset={reset} />
        </ProviderMantine>
      </body>
    </html>
  );
}

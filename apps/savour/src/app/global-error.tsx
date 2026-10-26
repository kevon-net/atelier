'use client';

import React from 'react';
import { PartialError500, ProviderMantine } from '@repo/ui';
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';
import { DEFAULT_COLOR_SCHEME } from '@savour/constants/theme';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <ProviderMantine
          theme={mantineTheme}
          defaultColorScheme={DEFAULT_COLOR_SCHEME}
          cssVariablesResolver={getAppResolver}
        >
          <PartialError500 reset={reset} />
        </ProviderMantine>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google';
import { ProviderAuth, ProviderMantine, ProviderRouteProtection } from '@repo/ui';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { APP_DESC, APP_NAME } from '@savour/constants/app';
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';
import { DEFAULT_COLOR_SCHEME } from '@savour/constants/theme';

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
// ‼️ import schedule styles after core and dates package styles
import '@mantine/schedule/styles.css';

import './globals.css';

const fontDefault = Geist({
  variable: '--font-default',
  subsets: ['latin'],
});

const fontDefaultHeading = JetBrains_Mono({
  variable: '--font-default-heading',
  subsets: ['latin'],
});

const fontDefaultMono = Geist_Mono({
  variable: '--font-default-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESC,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      data-mantine-color-scheme={DEFAULT_COLOR_SCHEME}
      suppressHydrationWarning
      className={`${fontDefault.variable} ${fontDefaultHeading.variable} ${fontDefaultMono.variable}`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

        <ColorSchemeScript defaultColorScheme={DEFAULT_COLOR_SCHEME} />
      </head>

      <body className="min-h-full flex flex-col">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}

function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProviderMantine
      options={{ withNotifications: true }}
      colorScheme={DEFAULT_COLOR_SCHEME}
      defaultColorScheme={DEFAULT_COLOR_SCHEME}
      theme={mantineTheme}
      cssVariablesResolver={getAppResolver}
    >
      <ProviderAuth>
        <ProviderRouteProtection>
          <>{children}</>
        </ProviderRouteProtection>
      </ProviderAuth>
    </ProviderMantine>
  );
}

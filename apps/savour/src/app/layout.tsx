import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ProviderMantine } from '@repo/ui';
import { ColorSchemeScript, MantineColorScheme, mantineHtmlProps } from '@mantine/core';
import { ColorScheme } from '@repo/types';
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
import { mantineTheme } from '@savour/theme';
import { getAppResolver } from '@savour/resolver';

const fontDefault = Geist({
  variable: '--font-default',
  subsets: ['latin'],
});

const fontDefaultMono = Geist_Mono({
  variable: '--font-default-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME.WEB,
  description: APP_DESC.WEB,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      data-mantine-color-scheme={DEFAULT_COLOR_SCHEME}
      suppressHydrationWarning
      className={`${fontDefault.variable} ${fontDefaultMono.variable}`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

        <ColorSchemeScript defaultColorScheme={DEFAULT_COLOR_SCHEME} />
      </head>

      <body className="min-h-full flex flex-col">
        <ProviderMantine
          options={{ withNotifications: true }}
          colorScheme={DEFAULT_COLOR_SCHEME}
          defaultColorScheme={DEFAULT_COLOR_SCHEME}
          theme={mantineTheme}
          cssVariablesResolver={getAppResolver}
        >
          {children}
        </ProviderMantine>
      </body>
    </html>
  );
}

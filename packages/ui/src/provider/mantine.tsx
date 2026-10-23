'use client';

import React from 'react';
import {
  MantineProvider,
  MantineColorScheme,
  MantineThemeOverride,
  CSSVariablesResolver,
} from '@mantine/core';
import { isProduction, linkify } from '@repo/utils';
import { Notifications } from '@mantine/notifications';
import { STORAGE_NAME, SECONDS_WEEK } from '@repo/constants';
import { setCookieClient, getCookieClient } from '@repo/utils';
import { getOSTheme } from '@repo/utils';
import { MantineColorSchemeManager } from '@mantine/core';
import { ColorScheme } from '@repo/types';

export interface ProviderMantineProps {
  appName?: string;
  colorScheme?: MantineColorScheme;
  defaultColorScheme?: ColorScheme;
  options?: { withNotifications?: boolean };
  theme?: MantineThemeOverride | (() => MantineThemeOverride);
  cssVariablesResolver?: CSSVariablesResolver; // Removed `| (() => CSSVariablesResolver)`
  children: React.ReactNode;
}

const COOKIE_OPTIONS = {
  expiryInSeconds: SECONDS_WEEK,
  secure: isProduction(),
  sameSite: 'Lax' as const,
};

const customColorSchemeManager = (
  defaultColorScheme: ColorScheme = ColorScheme.LIGHT,
): MantineColorSchemeManager => {
  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') return defaultValue;

      const state = getCookieClient(STORAGE_NAME.COLOR_SCHEME_STATE) as MantineColorScheme;
      const scheme = getCookieClient(STORAGE_NAME.COLOR_SCHEME);

      // First-time load: If either cookie is missing, initialize both
      if (!state || !scheme) {
        const initialValue = state || defaultValue;
        const resolvedScheme =
          initialValue === 'auto' ? getOSTheme(ColorScheme.AUTO, defaultColorScheme) : initialValue;

        setCookieClient(STORAGE_NAME.COLOR_SCHEME_STATE, initialValue, COOKIE_OPTIONS);
        setCookieClient(STORAGE_NAME.COLOR_SCHEME, resolvedScheme, COOKIE_OPTIONS);

        return initialValue;
      }

      return state;
    },

    set: (value) => {
      const systemScheme = getOSTheme(ColorScheme.AUTO, defaultColorScheme);
      const currentState = getCookieClient(STORAGE_NAME.COLOR_SCHEME_STATE);

      queueMicrotask(() => {
        // If in 'auto' mode and value matches system theme, don't override the state cookie
        if (currentState === 'auto' && value === systemScheme) {
          setCookieClient(STORAGE_NAME.COLOR_SCHEME, value, COOKIE_OPTIONS);
          return;
        }

        // Manual user selection: save both state and active scheme
        setCookieClient(STORAGE_NAME.COLOR_SCHEME_STATE, value, COOKIE_OPTIONS);
        setCookieClient(
          STORAGE_NAME.COLOR_SCHEME,
          getOSTheme(value as ColorScheme, defaultColorScheme),
          COOKIE_OPTIONS,
        );
      });
    },

    subscribe: (onUpdate) => {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => {
        const state = getCookieClient(STORAGE_NAME.COLOR_SCHEME_STATE);
        if (state === 'auto') {
          onUpdate('auto' as MantineColorScheme);
        }
      };

      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    },

    unsubscribe: () => {},

    clear: () => {
      // Optional: Clear color scheme cookies if needed
    },
  };
};

export function ProviderMantine({
  appName,
  colorScheme,
  defaultColorScheme,
  options,
  theme,
  cssVariablesResolver,
  children,
}: ProviderMantineProps) {
  const colorSchemeManager = customColorSchemeManager();

  // Resolve theme and resolver whether they are objects or functions
  const resolvedTheme = typeof theme === 'function' ? theme() : theme;

  return (
    <MantineProvider
      theme={resolvedTheme}
      cssVariablesResolver={cssVariablesResolver}
      classNamesPrefix={linkify(appName || 'template-next')}
      defaultColorScheme={colorScheme || defaultColorScheme}
      colorSchemeManager={colorSchemeManager}
    >
      {children}
      {options?.withNotifications && <Notifications limit={3} position="top-center" />}
    </MantineProvider>
  );
}

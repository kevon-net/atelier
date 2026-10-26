'use client';

import { useEffect } from 'react';
import { getCookieClient, getFromSessionStorage, isProduction, setCookieClient } from '@repo/utils';
import { SECONDS_WEEK, STORAGE_NAME } from '@repo/constants';
import { useMediaQuery } from '@mantine/hooks';
import { AppShellValue, useStoreAppshell } from '@repo/store';

export const useAppshellInitialize = (params?: { cookie?: AppShellValue }) => {
  const desktop = useMediaQuery('(min-width: 62em)');

  const appshell = useStoreAppshell((s) => s.appshell);
  const setAppShell = useStoreAppshell((s) => s.setAppShell);

  const cookie: AppShellValue = getCookieClient(STORAGE_NAME.APPSHELL);

  useEffect(() => {
    // 1. Establish base defaults
    const base = params?.cookie ??
      cookie ?? {
        navbar: true,
        aside: false,
        child: { navbar: true, aside: false },
      };

    // 2. Apply Mobile Constraints
    const resolvedChild = {
      navbar: desktop ? base.child.navbar : false,
      aside: desktop ? base.child.aside : false,
    };

    const resolvedShell = {
      ...base,
      child: resolvedChild,
    };

    setTimeout(() => {
      setCookieClient(STORAGE_NAME.APPSHELL, resolvedShell, {
        expiryInSeconds: SECONDS_WEEK,
        secure: isProduction(),
        sameSite: 'Lax',
      });
    }, 100);

    setAppShell(resolvedShell);
  }, [desktop, setAppShell]);

  // Sync appshell changes back to cookies
  useEffect(() => {
    if (appshell === undefined) return;

    setTimeout(() => {
      setCookieClient(STORAGE_NAME.APPSHELL, appshell, {
        expiryInSeconds: SECONDS_WEEK,
        secure: isProduction(),
        sameSite: 'Lax',
      });
    }, 100);
  }, [appshell]);
};

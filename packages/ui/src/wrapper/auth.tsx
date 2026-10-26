'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { setRedirectUrl } from '@repo/utils';
import { LoadingOverlay } from '@mantine/core';
import { deleteDatabase, useStoreAuth } from '@repo/store';
import { AuthAction } from '@repo/types';
import { DBConfig } from '@repo/types';
import { AUTH_ROUTE } from '@repo/constants';

export function WrapperAuth({
  children,
  options,
}: {
  options: { action: AuthAction };
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const isSignOut = options.action == AuthAction.SIGN_OUT;
    const resolvedUrl = isSignOut ? AUTH_ROUTE.SIGN_OUT : AUTH_ROUTE.SIGN_IN;
    router.push(
      isSignOut ? resolvedUrl : setRedirectUrl({ targetUrl: resolvedUrl, redirectUrl: pathname }),
    );
  };

  return <span onClick={handleClick}>{children}</span>;
}

export function WrapperAuthActionSignOut({
  dbConfig,
  options,
  children,
}: {
  dbConfig?: DBConfig;
  options?: { clearDB?: boolean; redirectUrl?: string };
  children: React.ReactNode;
}) {
  const user = useStoreAuth((s) => s.user);
  const session = useStoreAuth((s) => s.session);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const signOut = useStoreAuth((s) => s.signOut);

  const handleSignOut = async () => {
    // do nothing if not authenticated
    if (!session || !user) return;

    setLoading(true);

    // supabase sign out
    await signOut();

    // Shut down local db connections delete local db
    if (options?.clearDB && dbConfig?.name) {
      await deleteDatabase(dbConfig.name);
    }

    // clear storage
    localStorage.clear();
    sessionStorage.clear();

    // clear client cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    // router.replace(options?.redirectUrl || AUTH_ROUTE.SIGNED_OUT);
    router.replace(options?.redirectUrl || '/');

    setLoading(false);
  };

  return (
    <span style={{ position: 'relative', zIndex: 0 }}>
      <LoadingOverlay
        visible={loading}
        overlayProps={{ blur: 3 }}
        loaderProps={{ size: 12 }}
        style={{ zIndex: 2 }}
      />

      <span onClick={handleSignOut} style={{ zIndex: 1 }}>
        {children}
      </span>
    </span>
  );
}

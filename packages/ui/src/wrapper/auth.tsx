'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { setRedirectUrl } from '@repo/utils';
import { LoadingOverlay } from '@mantine/core';
import { deleteDatabase } from '@repo/store';
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
    const resolvedUrl =
      options.action == AuthAction.SIGN_IN ? AUTH_ROUTE.SIGN_IN : AUTH_ROUTE.SIGN_OUT;

    router.push(setRedirectUrl({ targetUrl: resolvedUrl, redirectUrl: pathname }));
  };

  return <span onClick={handleClick}>{children}</span>;
}

export function WrapperAuthActionSignOut({
  props,
  children,
}: {
  props: {
    baseUrl: string;
    dbConfig: DBConfig;
    options?: { clearDB?: boolean; redirectUrl?: string };
  };
  children: React.ReactNode;
}) {
  const [clicked, setClicked] = useState(false);
  // const { session } = useStoreSession(); // change this to suapabase api

  // const handleClick = async () => {
  //   setClicked(true);

  //   if (!!session) {
  //     // sign out

  //     // Shut down local db connections delete local db
  //     if (props.options?.clearDB) {
  //       await deleteDatabase(props.dbConfig.name);
  //     }

  //     // clear storage
  //     localStorage.clear();
  //     sessionStorage.clear();

  //     // clear client cookies
  //     document.cookie.split(';').forEach((c) => {
  //       document.cookie = c
  //         .replace(/^ +/, '')
  //         .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  //     });
  //   }

  //   window.location.href = props.options?.redirectUrl || AUTH_ROUTE.SIGNED_OUT;
  // };

  return (
    <span style={{ position: 'relative', zIndex: 1 }}>
      <LoadingOverlay
        visible={clicked}
        overlayProps={{ radius: 'md', blur: 3 }}
        loaderProps={{ size: 'xs' }}
        style={{ zIndex: 2 }}
      />

      <span
        // onClick={handleClick}
        style={{ zIndex: 2 }}
      >
        {children}
      </span>
    </span>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@repo/cloudbase';
import { getUrlParam } from '@repo/utils';
import { AUTH_ROUTE, ICON_WRAPPER_SIZE, icons, URL_PARAM_NAME } from '@repo/constants';
import { Center, Stack, Text } from '@mantine/core';
import { ImageDefault, SpinnerApp } from '@repo/ui';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const redirectUtl = getUrlParam(URL_PARAM_NAME.REDIRECT) as string | null;
        router.replace(redirectUtl ? decodeURIComponent(redirectUtl) : AUTH_ROUTE.REDIRECT);
      } else {
        router.replace(AUTH_ROUTE.SIGN_IN);
      }
    });
  }, [router]);

  return (
    <Center className="h-screen">
      <Stack gap={'xl'} align="center">
        <div>
          <ImageDefault
            src={icons.google}
            alt={'Completing Google sign in...'}
            height={ICON_WRAPPER_SIZE * 2}
            width={ICON_WRAPPER_SIZE * 2}
            fit="contain"
          />
        </div>

        <SpinnerApp />

        <Text c={'dimmed'}>Completing Google sign in...</Text>
      </Stack>
    </Center>
  );
}

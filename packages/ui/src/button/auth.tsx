'use client';

import { Button } from '@mantine/core';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { useStoreAuth } from '@repo/store';
import { IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export function ButtonSignOut() {
  const router = useRouter();
  const signOut = useStoreAuth((s) => s.signOut);

  const handleSignOut = async () => {
    await signOut();
    // router.replace(AUTH_ROUTE.SIGNED_OUT);
    router.replace('/');
  };

  return (
    <Button
      size="xs"
      rightSection={<IconLogout size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
      miw={150}
      onClick={handleSignOut}
      color="red"
    >
      Sign Out
    </Button>
  );
}

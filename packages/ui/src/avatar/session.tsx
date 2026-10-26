'use client';

import { Avatar, AvatarProps, Button, ButtonProps, Skeleton } from '@mantine/core';
import { ICON_WRAPPER_SIZE } from '@repo/constants';
import { useStoreAuth } from '@repo/store';
import { WrapperAuth } from '../wrapper/auth';
import { AuthAction } from '@repo/types';
import { MenuSession } from '../menu/session';

export function AvatarSession({
  wrapperAuthProps,
  buttonProps,
  avatarProps,
}: {
  avatarProps?: AvatarProps;
  buttonProps?: ButtonProps;
  wrapperAuthProps?: { childern?: React.ReactNode };
}) {
  const user = useStoreAuth((s) => s.user);
  // const session = useStoreAuth((s) => s.session);
  const isLoading = useStoreAuth((s) => s.isLoading);

  if (isLoading) {
    return (
      <>
        <Skeleton
          h={avatarProps?.size || ICON_WRAPPER_SIZE}
          w={avatarProps?.size || ICON_WRAPPER_SIZE}
          radius={99}
        />
      </>
    );
  }

  if (!user) {
    const signInComponent = <Button {...buttonProps}>Sign In</Button>;

    return (
      <WrapperAuth options={{ action: AuthAction.SIGN_IN }}>
        {wrapperAuthProps?.childern || signInComponent}
      </WrapperAuth>
    );
  }

  return (
    <>
      <MenuSession>
        <Avatar
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.name}
          name={user.user_metadata.name}
          color="initials"
          size={avatarProps?.size || ICON_WRAPPER_SIZE}
          {...avatarProps}
        />
      </MenuSession>
    </>
  );
}

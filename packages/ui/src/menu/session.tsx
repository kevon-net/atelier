import {
  Menu,
  MenuLabel,
  MenuItem,
  MenuDivider,
  MenuTarget,
  MenuDropdown,
  Stack,
  Title,
  Text,
  Skeleton,
} from '@mantine/core';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { useStoreAuth } from '@repo/store';
import { IconLogout } from '@tabler/icons-react';
import { WrapperAuth } from '../wrapper/auth';
import { AuthAction } from '@repo/types';

export function MenuSession({ children }: { children: React.ReactNode }) {
  const user = useStoreAuth((s) => s.user);
  // const session = useStoreAuth((s) => s.session);
  const isLoading = useStoreAuth((s) => s.isLoading);

  return (
    <Menu shadow="xs" trigger="click-hover" styles={{ dropdown: { minWidth: 220, maxWidth: 260 } }}>
      <MenuTarget>
        <span style={{ cursor: 'pointer' }}>{children}</span>
      </MenuTarget>

      <MenuDropdown>
        <MenuLabel>
          <Stack ta={'center'} align="center" gap={5}>
            {isLoading ? (
              <Skeleton h={21.6} w={'60%'} />
            ) : (
              <Title order={2} fz={'md'}>
                {user?.user_metadata.name}
              </Title>
            )}

            {isLoading ? <Skeleton h={18.6} w={'80%'} /> : <Text inherit>{user?.email}</Text>}
          </Stack>
        </MenuLabel>

        <MenuDivider />

        {/* <MenuLabel>Danger Zone</MenuLabel> */}

        <WrapperAuth options={{ action: AuthAction.SIGN_OUT }}>
          <MenuItem
            color="red"
            rightSection={<IconLogout size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
          >
            Sign Out
          </MenuItem>
        </WrapperAuth>
      </MenuDropdown>
    </Menu>
  );
}

import React from 'react';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { AnchorNextLink, ImageDefault, WrapperAuthActionSignOut } from '@repo/ui';
import { IconChevronLeft, IconLogout } from '@tabler/icons-react';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { images } from '@savour/constants/images';
import { APP_NAME } from '@savour/constants/app';

export default function SignOut() {
  return (
    <div>
      <Card
        bg={{ xs: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-0))' }}
        padding={'xl'}
      >
        <Stack gap={'xl'} w={{ xs: 320 }}>
          <Group justify="center">
            <AnchorNextLink href={'/'}>
              <ImageDefault
                src={images.brand.icon.meta.light}
                alt={APP_NAME}
                height={48}
                width={48}
                fit="contain"
              />
            </AnchorNextLink>
          </Group>

          <Stack ta={'center'}>
            <Title order={1} fz={'xl'}>
              End Session
            </Title>

            <Text fz={'sm'}>Are you sure you want to sign out of your account?</Text>
          </Stack>

          <Group justify="center">
            <AnchorNextLink href={'/'}>
              <Button
                size="xs"
                variant="default"
                leftSection={<IconChevronLeft size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
                miw={150}
              >
                Back Home
              </Button>
            </AnchorNextLink>

            <WrapperAuthActionSignOut>
              <Button
                size="xs"
                rightSection={<IconLogout size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
                miw={150}
                color="red"
              >
                Sign Out
              </Button>
            </WrapperAuthActionSignOut>
          </Group>
        </Stack>
      </Card>
    </div>
  );
}

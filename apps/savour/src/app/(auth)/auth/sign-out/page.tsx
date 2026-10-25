import React from 'react';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { AnchorNextLink, ButtonSignOut } from '@repo/ui';
import { IconChevronLeft } from '@tabler/icons-react';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';

export default function SignOut() {
  return (
    <div>
      <Card
        bg={{ xs: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-0))' }}
        padding={'xl'}
      >
        <Stack gap={'xl'} w={{ xs: 320 }}>
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

            <ButtonSignOut />
          </Group>
        </Stack>
      </Card>
    </div>
  );
}

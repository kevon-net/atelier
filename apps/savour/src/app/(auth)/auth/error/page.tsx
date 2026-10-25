import React from 'react';
import { PartialErrorAuth } from '@repo/ui';
import { Button, Card, Group, Stack, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';

export default function Error() {
  return (
    <div>
      <Card
        bg={{ xs: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-0))' }}
        padding={'xl'}
      >
        <Stack gap={'xl'} w={{ xs: 320 }}>
          <Stack ta={'center'}>
            <Title order={1} fz={'xl'}>
              Authentication Error
            </Title>

            <PartialErrorAuth />
          </Stack>

          <Group justify="center">
            <Button
              size="xs"
              variant="default"
              leftSection={<IconChevronLeft size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />}
              miw={150}
            >
              Back Home
            </Button>
          </Group>
        </Stack>
      </Card>
    </div>
  );
}

'use client';

import React from 'react';
import { Group, Loader, Stack, Text } from '@mantine/core';
import SpinnerApp from '../spinners/app';
import { SECTION_SPACING } from '@repo/constants';

export default function Loading() {
  return (
    <Stack align="center" py={SECTION_SPACING}>
      <Group>
        <Loader />
      </Group>

      {/* <Text fz={'sm'} c={'dimmed'}>
        Loading...
      </Text> */}
    </Stack>
  );
}

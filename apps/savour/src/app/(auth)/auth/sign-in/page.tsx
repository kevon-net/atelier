import React from 'react';
import { AnchorNextLink, FormAuth, ImageDefault } from '@repo/ui';
import { Box, Card, Group, Stack, Text, Title } from '@mantine/core';
import { images } from '@savour/constants/images';
import { APP_NAME } from '@savour/constants/app';

export default function SignIn() {
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
              Welcome Back
            </Title>

            <Text fz={'sm'}>Sign in to access your personalized experience.</Text>
          </Stack>

          <FormAuth />

          <Box ta={'center'}>
            <Text c={'dimmed'} fz={'xs'}>
              By continuing, you agree to the{' '}
              <AnchorNextLink href={'#'} td={'underline'}>
                terms & conditions
              </AnchorNextLink>
              .
            </Text>
          </Box>
        </Stack>
      </Card>
    </div>
  );
}

'use client';

import React from 'react';
import { LayoutSection } from '@repo/ui';
import {
  ActionIcon,
  Avatar,
  Group,
  Indicator,
  Paper,
  PaperProps,
  Tooltip,
  Flex,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu3, IconShoppingCart, IconUser } from '@tabler/icons-react';
import { ICON_SIZE, ICON_STROKE_WIDTH, ICON_WRAPPER_SIZE } from '@repo/constants';
import { usePathname } from 'next/navigation';
import DrawerNavbarStorefront, {
  BrandLogo,
  NavbarStorefront,
} from '@savour/ui/drawer/navbar/storefront';

export default function LayoutNavbarStorefront({
  paperProps,
  options,
}: {
  options?: { inAffix?: boolean };
  paperProps?: PaperProps;
}) {
  const mobile = useMediaQuery('(max-width: 36em)');

  const pathname = usePathname();
  const isHomePage = pathname == '/';

  return (
    <LayoutSection
      py={options?.inAffix ? undefined : isHomePage ? { base: 'md', xs: 'xl' } : undefined}
      style={
        isHomePage && !options?.inAffix
          ? {
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
            }
          : undefined
      }
    >
      <Paper
        bg={isHomePage ? 'gray.0' : undefined}
        radius={isHomePage ? 'var(--mantine-radius-default)' : undefined}
        px={options?.inAffix ? undefined : isHomePage ? { base: 'md', xs: 'xl' } : undefined}
        {...paperProps}
      >
        <Group wrap="nowrap" justify="space-between" py={'md'} gap={0}>
          <Group w={{ base: '50%', xs: '33%' }} hiddenFrom="md">
            <DrawerNavbarStorefront>
              <ActionIcon
                size={mobile ? ICON_WRAPPER_SIZE : WRAPPER_SIZE.WRAPPER_SIZE}
                variant="transparent"
              >
                <IconMenu3
                  size={mobile ? ICON_WRAPPER_SIZE : WRAPPER_SIZE.WRAPPER_SIZE}
                  stroke={ICON_STROKE_WIDTH}
                />
              </ActionIcon>
            </DrawerNavbarStorefront>
          </Group>

          <Flex
            w={{ xs: '33%', md: '20%' }}
            align={'center'}
            justify={{ base: 'center', md: 'start' }}
            visibleFrom="xs"
          >
            <BrandLogo />
          </Flex>

          <Group w={{ md: '60%' }} justify="center" visibleFrom="md">
            <NavbarStorefront flexProps={{ gap: 'xl', align: { md: 'center' } }} />
          </Group>

          <Group w={{ base: '50%', xs: '33%', md: '20%' }} justify="end">
            <Avatar size={mobile ? ICON_WRAPPER_SIZE : WRAPPER_SIZE.WRAPPER_SIZE}>
              <IconUser
                size={mobile ? ICON_SIZE : ICON_WRAPPER_SIZE * 1.3}
                stroke={ICON_STROKE_WIDTH}
              />
            </Avatar>

            <Tooltip label={'Cart'}>
              <Indicator
                label={'3'}
                size={19}
                offset={mobile ? undefined : { x: 5, y: 5 }}
                styles={{ indicator: { zIndex: 10 } }}
              >
                <Group>
                  <ActionIcon
                    size={mobile ? ICON_WRAPPER_SIZE : WRAPPER_SIZE.WRAPPER_SIZE}
                    radius={999}
                    color="black"
                  >
                    <IconShoppingCart
                      size={mobile ? ICON_SIZE : ICON_SIZE * 1.3}
                      stroke={ICON_STROKE_WIDTH}
                    />
                  </ActionIcon>
                </Group>
              </Indicator>
            </Tooltip>
          </Group>
        </Group>
      </Paper>
    </LayoutSection>
  );
}

const WRAPPER_SIZE = { WRAPPER_SIZE: ICON_WRAPPER_SIZE * 1.75 };

'use client';

import { ActionIcon, Flex, Group } from '@mantine/core';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@repo/constants';
import { AnchorNextLink, LayoutSection } from '@repo/ui';
import { contactsArray, socialsArray } from '@savour/constants/app';
import { usePathname } from 'next/navigation';

export default function LayoutHeaderStorefront() {
  const pathname = usePathname();
  const isHomePage = pathname == '/';

  return (
    <LayoutSection bg={'pri'} c={'white'} padded={'xs'} display={isHomePage ? 'none' : undefined}>
      <Flex align={'center'} wrap="nowrap" justify={{ base: 'center', sm: 'space-between' }}>
        <Group gap={'xl'} fw={500} visibleFrom="sm">
          {contactsArray.map(
            (ci, i) =>
              i > 0 && (
                <Group key={ci.link} wrap="nowrap" gap={'xs'}>
                  <ci.icon size={ICON_SIZE * 1.25} stroke={ICON_STROKE_WIDTH} />

                  <AnchorNextLink href={ci.link} inherit c={'inherit'}>
                    {ci.label}
                  </AnchorNextLink>
                </Group>
              ),
          )}
        </Group>

        <Group gap={'xs'} justify="end">
          {socialsArray.map((si) => (
            <ActionIcon
              size={ICON_SIZE * 1.25}
              radius={999}
              key={si.label}
              component="a"
              href={si.link}
              variant={'transparent'}
              color="white"
            >
              <si.icon size={ICON_SIZE * 1.25} stroke={ICON_STROKE_WIDTH} />
            </ActionIcon>
          ))}
        </Group>
      </Flex>
    </LayoutSection>
  );
}

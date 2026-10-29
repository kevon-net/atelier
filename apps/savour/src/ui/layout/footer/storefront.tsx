'use client';

import React from 'react';
import { AnchorNextLink, LayoutSection } from '@repo/ui';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { ICON_SIZE, ICON_STROKE_WIDTH, ICON_WRAPPER_SIZE, SECTION_SPACING } from '@repo/constants';
import { APP_NAME, contactsArray, socialsArray } from '@savour/constants/app';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowUpRight } from '@tabler/icons-react';
import { BrandLogo, navlinks } from '@savour/ui/drawer/navbar/storefront';

export default function LayoutFooterstorefront() {
  const desktop = useMediaQuery('(min-width: 62em)');

  return (
    <footer>
      <LayoutSection bg={'dark.6'} c={'dark.0'}>
        <Grid gap={0}>
          <GridCol
            span={{ base: 12, md: 3.5 }}
            order={{ base: 1, md: 2 }}
            style={{
              borderLeft: desktop ? '1px solid var(--mantine-color-dark-3)' : undefined,
            }}
          >
            <Box
              pt={SECTION_SPACING * 1.5}
              pb={{ md: SECTION_SPACING * 1.5 }}
              pl={{ md: SECTION_SPACING / 1.5 }}
              maw={{ sm: '70%', md: '100%' }}
            >
              <Stack gap={'xl'}>
                <Stack>
                  <Title order={3} c={'white'}>
                    Newsletter
                  </Title>
                  <Text>Join our subscribers list to get the latest news and special offers.</Text>
                </Stack>

                <div>
                  <FormSubscribe />
                </div>

                <Group>
                  <Title order={3} c={'white'}>
                    Social media:{' '}
                  </Title>

                  <Group gap={5}>
                    {socialsArray.map((si) => (
                      <ActionIcon
                        size={ICON_WRAPPER_SIZE * 1.4}
                        radius={999}
                        key={si.label}
                        component="a"
                        href={si.link}
                        color="white"
                        c={'var(--mantine-color-text)'}
                        // Add Tailwind classes here:
                        className="transition-colors duration-200 hover:bg-(--mantine-color-pri-4)! hover:text-white!"
                      >
                        <si.icon size={ICON_SIZE * 1.2} stroke={ICON_STROKE_WIDTH} />
                      </ActionIcon>
                    ))}
                  </Group>
                </Group>
              </Stack>
            </Box>
          </GridCol>

          <GridCol span={{ base: 12, md: 8.5 }} order={{ base: 2, md: 1 }}>
            <Box>
              <Box
                py={{ base: SECTION_SPACING, md: SECTION_SPACING * 1.5 }}
                pr={{ md: SECTION_SPACING / 1.5 }}
              >
                <Grid gap={SECTION_SPACING}>
                  <GridCol span={{ base: 12, md: 4.5 }}>
                    <Stack gap={'xl'} maw={{ xs: '70%', md: '100%' }}>
                      <Group>
                        <BrandLogo titleProps={{ c: 'var(--mantine-color-white)' }} />
                      </Group>

                      <Text>
                        Discover culinary delights recipes and inspiration in our food haven.
                      </Text>

                      <Stack tt={'uppercase'} gap={0}>
                        {workingHours.map((wi, i) => (
                          <div key={`${wi.day}+${wi.time}`}>
                            {i > 0 && <Divider my={'sm'} color="var(--mantine-color-dark-3)" />}

                            <Group justify="space-between">
                              <Text inherit>{wi.day}</Text>
                              <Text inherit ta={'end'}>
                                {wi.time}
                              </Text>
                            </Group>
                          </div>
                        ))}
                      </Stack>
                    </Stack>
                  </GridCol>

                  <GridCol span={{ base: 12, xs: 4, md: 2.5 }}>
                    <Stack gap={'xl'}>
                      <Title order={3} c={'white'}>
                        Explore
                      </Title>

                      <Stack>
                        {navlinks.map((li) => (
                          <AnchorNextLink key={li.path} href={li.path} inherit c={'inherit'}>
                            {li.label}
                          </AnchorNextLink>
                        ))}
                      </Stack>
                    </Stack>
                  </GridCol>

                  <GridCol span={{ base: 12, xs: 8, md: 5 }}>
                    <Stack gap={'xl'}>
                      <Title order={3} c={'white'}>
                        Contact Info
                      </Title>

                      <Stack>
                        {contactsArray.map((ci) => (
                          <Group key={ci.link} wrap="nowrap">
                            <ThemeIcon
                              size={ICON_WRAPPER_SIZE * 1.4}
                              radius={999}
                              variant="outline"
                              color="dark.3"
                              c={'inherit'}
                            >
                              <ci.icon size={ICON_SIZE * 1.1} stroke={ICON_STROKE_WIDTH} />
                            </ThemeIcon>

                            <AnchorNextLink href={ci.link} inherit c={'inherit'}>
                              {ci.label}
                            </AnchorNextLink>
                          </Group>
                        ))}
                      </Stack>
                    </Stack>
                  </GridCol>
                </Grid>
              </Box>

              <Box
                py={'lg'}
                pr={{ md: SECTION_SPACING }}
                style={{
                  borderTop: '1px solid var(--mantine-color-dark-3)',
                }}
              >
                <Group>
                  <Text fz={{ base: 'sm', xs: 'md' }}>
                    &copy; Copyright {new Date().getFullYear()} {APP_NAME}. All Rights Reserved
                  </Text>
                </Group>
              </Box>
            </Box>
          </GridCol>
        </Grid>
      </LayoutSection>
    </footer>
  );
}

const workingHours = [
  { day: 'Mon - Fri', time: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM - 5:00 PM' },
];

function FormSubscribe() {
  return (
    <Stack>
      <TextInput aria-label="Your email" placeholder="Your email" variant="filled" size="md" />

      <Button
        fullWidth
        size="md"
        rightSection={<IconArrowUpRight size={ICON_SIZE * 1.2} stroke={ICON_STROKE_WIDTH} />}
      >
        Subscribe
      </Button>
    </Stack>
  );
}

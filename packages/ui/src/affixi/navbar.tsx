'use client';

import React from 'react';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Box, Transition } from '@mantine/core';

export function AffixNavbar({ children }: { children: React.ReactNode }) {
  const [scroll] = useWindowScroll();

  return (
    <>
      <Affix position={{ top: 0, left: 0, right: 0 }}>
        <Transition transition="slide-down" mounted={scroll.y > 100}>
          {(transitionStyles) => (
            <span style={transitionStyles}>
              <Box bg={'var(--mantine-color-body)'}>{children}</Box>
            </span>
          )}
        </Transition>
      </Affix>
    </>
  );
}

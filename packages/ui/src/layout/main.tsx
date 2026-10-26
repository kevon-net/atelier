import React, { useMemo } from 'react';
import { Box, Divider, Flex, MantineSpacing } from '@mantine/core';
import { LayoutSection } from './section';

export interface AsideWidth {
  md?: number;
  lg?: number;
}

export interface AsideConfig {
  component: React.ReactNode;
  width?: AsideWidth;
  withBorder?: boolean;
}

export interface LayoutMainProps {
  children: React.ReactNode;
  notificationBar?: React.ReactNode;
  header?: React.ReactNode;
  nav?: React.ReactNode;
  hero?: React.ReactNode;
  footer?: React.ReactNode;
  aside?: {
    left?: AsideConfig;
    right?: AsideConfig;
    gap?: MantineSpacing;
  };
}

export const DEFAULT_ASIDE_WIDTH: Required<AsideWidth> = {
  md: 33,
  lg: 25,
};

// Sub-component for clean aside rendering
function Aside({ side }: { side: AsideConfig }) {
  const widthMd = side.width?.md ?? DEFAULT_ASIDE_WIDTH.md;
  const widthLg = side.width?.lg ?? DEFAULT_ASIDE_WIDTH.lg;

  return (
    <Box
      component="aside"
      visibleFrom="md"
      w={{
        md: `${widthMd}%`,
        lg: `${widthLg}%`,
      }}
    >
      {side.component}
    </Box>
  );
}

export function LayoutMain({
  children,
  notificationBar,
  header,
  nav,
  hero,
  footer,
  aside,
}: LayoutMainProps) {
  // Compute main body content width based on active asides
  const widthMain = useMemo(() => {
    if (!aside) return { md: 100, lg: 100 };

    const leftMd = aside.left ? (aside.left.width?.md ?? DEFAULT_ASIDE_WIDTH.md) : 0;
    const rightMd = aside.right ? (aside.right.width?.md ?? DEFAULT_ASIDE_WIDTH.md) : 0;

    const leftLg = aside.left ? (aside.left.width?.lg ?? DEFAULT_ASIDE_WIDTH.lg) : 0;
    const rightLg = aside.right ? (aside.right.width?.lg ?? DEFAULT_ASIDE_WIDTH.lg) : 0;

    return {
      md: 100 - (leftMd + rightMd),
      lg: 100 - (leftLg + rightLg),
    };
  }, [aside]);

  const hasAsides = Boolean(aside?.left || aside?.right);
  const isMargined = Boolean(aside?.left?.withBorder || aside?.right?.withBorder);

  return (
    <>
      {notificationBar}
      {header}
      {nav}
      {hero}

      {hasAsides && aside ? (
        <LayoutSection id="layout-body-section" margined={isMargined}>
          <Flex gap={aside.gap ?? 'xl'}>
            {aside.left && <Aside side={aside.left} />}
            {aside.left?.withBorder && <Divider orientation="vertical" visibleFrom="md" />}

            <Box
              w={{
                base: '100%',
                md: `${widthMain.md}%`,
                lg: `${widthMain.lg}%`,
              }}
            >
              {children}
            </Box>

            {aside.right?.withBorder && <Divider orientation="vertical" visibleFrom="md" />}
            {aside.right && <Aside side={aside.right} />}
          </Flex>
        </LayoutSection>
      ) : (
        children
      )}

      {footer}
    </>
  );
}

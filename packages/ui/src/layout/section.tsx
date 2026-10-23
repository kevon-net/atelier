import { SECTION_SPACING } from '@repo/constants';
import classes from './section.module.css';
import { Box, Container, BoxProps, MantineSpacing } from '@mantine/core';

export interface LayoutSectionProps extends BoxProps {
  containerized?: 'responsive' | boolean | string;
  padded?: boolean | MantineSpacing;
  margined?: boolean | MantineSpacing;
  bordered?: boolean;
  shadowed?: boolean;
  children: React.ReactNode;
  id?: string;
}

// Helper to resolve boolean shortcuts or custom spacing values
const resolveSpacing = (val?: boolean | MantineSpacing) => {
  if (val === true) return SECTION_SPACING;
  if (!val) return undefined;
  return val;
};

export function LayoutSection({
  containerized = 'responsive',
  padded,
  margined,
  className,
  bordered,
  shadowed,
  children,
  id,
  ...rest
}: LayoutSectionProps) {
  const py = resolveSpacing(padded);
  const my = resolveSpacing(margined);

  const isResponsive = containerized === 'responsive';
  const containerSize = isResponsive || containerized === true ? undefined : (containerized as any);

  return (
    <Box
      component="section"
      id={id}
      py={py}
      my={my}
      className={className}
      style={{
        borderTop: bordered ? '1px solid var(--mantine-color-default-border)' : undefined,
        boxShadow: shadowed ? 'var(--mantine-shadow-xs)' : undefined,
      }}
      {...rest}
    >
      {containerized ? (
        <Container
          size={containerSize}
          h="100%"
          className={isResponsive ? classes.responsiveContainer : undefined}
        >
          {children}
        </Container>
      ) : (
        children
      )}
    </Box>
  );
}

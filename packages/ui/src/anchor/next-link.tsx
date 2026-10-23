'use client';

import Link from 'next/link';
import { Anchor, AnchorProps } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';

// Combine Mantine's AnchorProps with Next.js Link props to ensure perfect type safety
type AnchorNextLinkProps = AnchorProps & ComponentPropsWithoutRef<typeof Link>;

export function AnchorNextLink({ href, children, ...restProps }: AnchorNextLinkProps) {
  return (
    <Anchor component={Link} href={href} {...restProps}>
      {children}
    </Anchor>
  );
}

'use client';

import { MantineThemeOverride, Text } from '@mantine/core';
import classes from './theme.module.css';

export const mantineTheme: MantineThemeOverride = {
  colors: {
    pri: [
      '#ffeae2',
      '#fbc7b9',
      '#f2a58d',
      '#eb8261',
      '#e45e35', // src: 4
      '#ca451b',
      '#9e3414',
      '#71250d',
      '#461505',
      '#1e0400',
    ],
  },

  primaryColor: 'pri',
  defaultRadius: 'md',
  primaryShade: { light: 4, dark: 4 },
  luminanceThreshold: 0.3,
  cursorType: 'pointer',
  activeClassName: classes.active,

  headings: { fontFamily: 'var(--font-default-heading)' },
  fontFamily: 'var(--font-default)',
  fontFamilyMonospace: 'var(--font-default-mono)',
  fontWeights: { medium: '500' },

  components: {
    Text: Text.extend({
      defaultProps: {
        inherit: true,
      },
    }),
  },
};

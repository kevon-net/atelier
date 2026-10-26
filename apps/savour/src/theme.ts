'use client';

import { MantineThemeOverride, Text } from '@mantine/core';
import classes from './theme.module.css';

export const mantineTheme: MantineThemeOverride = {
  colors: {
    pri: [
      '#f7f3e6',
      '#e1dbce',
      '#cbc3b3',
      '#b5ab96',
      '#a09379',
      '#877960',
      '#695e4a', // src (6)
      '#4b4334',
      '#2e281d',
      '#150c00',
    ],
  },

  primaryColor: 'pri',
  defaultRadius: 'sm',
  primaryShade: { light: 5, dark: 5 },
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

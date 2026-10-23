'use client';

import { MantineThemeOverride } from '@mantine/core';

export const mantineTheme: MantineThemeOverride = {
  // colors: {
  //   pri: [
  //     '#fef4e8',
  //     '#f2e7dc',
  //     '#decebc',
  //     '#cbb399',
  //     '#ba9c7b',
  //     '#b08e67',
  //     '#ac865c', // src (6)
  //     '#97734b',
  //     '#876640',
  //     '#775732',
  //   ],
  // },

  primaryColor: 'blue',
  defaultRadius: 'md',
  primaryShade: { light: 6, dark: 6 },
  cursorType: 'pointer',

  headings: {
    fontFamily: 'var(--font-geist-sans)',
  },
};

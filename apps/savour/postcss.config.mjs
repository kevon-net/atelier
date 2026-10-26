import { postcss } from '@repo/constants';

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',

        // custom variables
        'transition-duration-xs': '50ms',
        'transition-duration-sh': '100ms',
        'transition-duration-me': '200ms',
        'transition-duration-lo': '300ms',
        'transition-duration-xl': '400ms',
      },
    },
  },
};

export default config;

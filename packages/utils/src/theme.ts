import { STORAGE_NAME } from '@repo/constants';
import { getCookieClient } from './storage';
import { ColorScheme } from '@repo/types';
import { getOSTheme } from './misc';

export const getThemeLogo = (params: {
  lightImage: string;
  darkImage: string;
  defaultColorScheme: ColorScheme;
}) => {
  const themeCookie = getCookieClient(STORAGE_NAME.COLOR_SCHEME) || params.defaultColorScheme;

  // Resolve 'auto' using your OS theme helper
  const resolvedTheme = getOSTheme(themeCookie as ColorScheme, params.defaultColorScheme);

  if (resolvedTheme === ColorScheme.DARK) return params.darkImage;
  return params.lightImage; // Defaults to light if not dark
};

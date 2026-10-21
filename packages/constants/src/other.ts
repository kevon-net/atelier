/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { ColorScheme } from '@repo/types';
import { colors } from './colors';

export const DEFAULT_COLOR_SCHEME: ColorScheme = ColorScheme.AUTO;

const WITHOUT_BODY: HeadersInit = {
  Accept: 'application/json',
};

const WITH_BODY: HeadersInit = {
  'Content-Type': 'application/json',
  ...WITHOUT_BODY,
};

export const HEADERS = { WITHOUT_BODY, WITH_BODY };

export const TIME_FORMAT = {
  LOCALE: 'en-GB',
};

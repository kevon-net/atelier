import { BRAND_NAME } from '@savour/constants/app';
import { STORE_NAME } from '@repo/constants';
import { DBConfig } from '@repo/types';
import { linkify } from '@repo/utils';

export const config: DBConfig = {
  name: linkify(BRAND_NAME),
  version: 1,
  stores: [
    {
      name: STORE_NAME.FOLDERS,
      keyPath: 'id',
    },
  ],
};

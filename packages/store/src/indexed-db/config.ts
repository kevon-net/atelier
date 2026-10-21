import { COMPANY_NAME } from '@repo/constants';
import { STORE_NAME } from '@repo/constants';
import { DBConfig } from '@repo/types';
import { linkify } from '@repo/utils';

export const config: DBConfig = {
  name: linkify(COMPANY_NAME),
  version: 1,
  stores: [
    // {
    //   name: STORE_NAME.SETTINGS,
    //   keyPath: 'id',
    // },
    {
      name: STORE_NAME.ACCOUNTS,
      keyPath: 'id',
    },
    {
      name: STORE_NAME.WORKSPACES,
      keyPath: 'id',
    },
    {
      name: STORE_NAME.FOLDERS,
      keyPath: 'id',
    },
  ],
};

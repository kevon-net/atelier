'use client';

import React from 'react';
import { URL_PARAM_NAME } from '@repo/constants';
import { getUrlParam } from '@repo/utils';
import { Text } from '@mantine/core';

export function PartialErrorAuth() {
  const paramError = getUrlParam(URL_PARAM_NAME.ERROR);

  if (!paramError) return null;

  return (
    <div>
      <Text fz={'sm'}>{paramError as string}</Text>
    </div>
  );
}

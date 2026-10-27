'use client';

import { UseFormReturnType } from '@mantine/form';
import type { Inquiry } from '@savour/payload-types';

export type FormValuesInquiry = Inquiry & {
  appName: '';
};

export type FormInquiry = UseFormReturnType<
  FormValuesInquiry,
  (values: FormValuesInquiry) => FormValuesInquiry
>;

export const useFormInquiry = () => {};

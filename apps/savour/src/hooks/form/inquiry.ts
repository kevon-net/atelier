'use client';

import { UseFormReturnType } from '@mantine/form';
import { InquiryGet } from '@savour/types/models/inquiry';

export type FormValuesInquiry = InquiryGet & {
  appName: '';
};

export type FormInquiry = UseFormReturnType<
  FormValuesInquiry,
  (values: FormValuesInquiry) => FormValuesInquiry
>;

export const useFormInquiry = () => {};

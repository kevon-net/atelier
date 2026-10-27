import { APP_NAME } from '@savour/constants/app';
import { Metadata } from 'next';
import React from 'react';

export type typeParams = Promise<{
  'postTitle-postId': string;
}>;

export const metadata: Metadata = {
  title: { default: 'Blog', template: `%s - Blog - ${APP_NAME}` },
};

export default function LayoutBlog({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

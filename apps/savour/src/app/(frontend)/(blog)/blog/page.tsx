import React from 'react';
import PageBlog from '@savour/ui/page/blog';

export const revalidate = 3600;

export default function Home() {
  return <PageBlog />;
}

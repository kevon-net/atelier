import type { NextConfig } from 'next';
import { next } from '@repo/constants';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  // output: 'export',
  // trailingSlash: true,
  ...(next as NextConfig),
};

export default withPayload(nextConfig);

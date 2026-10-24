import type { NextConfig } from 'next';
import { next } from '@repo/constants';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  output: 'export',
  ...(next as NextConfig),
};

export default nextConfig;

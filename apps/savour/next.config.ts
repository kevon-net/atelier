import type { NextConfig } from 'next';
import { next } from '@repo/constants';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  ...(next as NextConfig),
};

export default nextConfig;

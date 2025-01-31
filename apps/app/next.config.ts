import { env } from '@repo/env';
import { config, withAnalyzer, withSentry } from '@repo/next-config';
// import type { NextConfig } from 'next';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let nextConfig: any = { ...config };

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;

import { env } from '@repo/env';
import { config, withAnalyzer, withSentry } from '@repo/next-config';
//
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let nextConfig: any = {
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  ...config,
};

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;

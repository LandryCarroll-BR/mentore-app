import { env } from '@repo/env';
import type { ReactNode } from 'react';
import { GoogleAnalytics } from './google';
import { VercelAnalytics } from './vercel';

type AnalyticsProviderProps = {
  readonly children: ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <>
    {children}
    <VercelAnalytics />
    {env.NODE_ENV !== 'development' && env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    )}
  </>
);

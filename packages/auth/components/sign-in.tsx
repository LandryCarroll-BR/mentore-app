import { SignIn as ClerkSignIn } from '@clerk/nextjs';
import type React from 'react';

export const SignIn: React.FC<React.ComponentProps<typeof ClerkSignIn>> = (
  props
) => (
  <ClerkSignIn
    appearance={{
      elements: {
        header: 'hidden',
      },
    }}
    {...props}
  />
);

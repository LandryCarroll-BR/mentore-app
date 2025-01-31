import { SignUp as ClerkSignUp } from '@clerk/nextjs';
import type React from 'react';

export const SignUp: React.FC<React.ComponentProps<typeof ClerkSignUp>> = (
  props
) => (
  <ClerkSignUp
    appearance={{
      elements: {
        header: 'hidden',
      },
    }}
    {...props}
  />
);

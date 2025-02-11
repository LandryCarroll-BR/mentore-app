import { z } from 'zod';

export const emailInputSchema = z.object({
  type: z.literal('email'),
});

export type EmailInputSchema = z.infer<typeof emailInputSchema>;

import { z } from 'zod';

export const phoneInputSchema = z.object({
  type: z.literal('phone'),
});

export type PhoneInputSchema = z.infer<typeof phoneInputSchema>;

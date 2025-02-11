import { z } from 'zod';

export const numberInputSchema = z.object({
  type: z.literal('number'),
});

export type NumberInputSchema = z.infer<typeof numberInputSchema>;

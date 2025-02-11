import { z } from 'zod';

export const textInputSchema = z.object({
  type: z.literal('text'),
});

export type TextInputSchema = z.infer<typeof textInputSchema>;

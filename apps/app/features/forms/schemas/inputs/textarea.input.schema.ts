import { z } from 'zod';

export const textareaInputSchema = z.object({
  type: z.literal('textarea'),
});

export type TextareaInputSchema = z.infer<typeof textareaInputSchema>;

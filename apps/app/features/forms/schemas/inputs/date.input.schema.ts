import { z } from 'zod';

export const dateInputSchema = z.object({
  type: z.literal('date'),
});

export type DateInputSchema = z.infer<typeof dateInputSchema>;

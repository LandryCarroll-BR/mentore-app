import { z } from 'zod';

export const fileInputSchema = z.object({
  type: z.literal('file'),
});

export type FileInputSchema = z.infer<typeof fileInputSchema>;

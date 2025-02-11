import { z } from 'zod';

export const checkboxInputSchema = z.object({
  type: z.literal('checkbox'),
});

export type CheckboxInputSchema = z.infer<typeof checkboxInputSchema>;

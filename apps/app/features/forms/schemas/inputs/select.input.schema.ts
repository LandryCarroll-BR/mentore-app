import { z } from 'zod';

export const selectInputSchema = z.object({
  type: z.literal('select'),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

export type SelectInputSchema = z.infer<typeof selectInputSchema>;

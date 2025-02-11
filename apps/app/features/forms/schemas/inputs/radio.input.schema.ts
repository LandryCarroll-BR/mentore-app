import { z } from 'zod';

export const radioInputSchema = z.object({
  type: z.literal('radio'),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

export type RadioInputSchema = z.infer<typeof radioInputSchema>;

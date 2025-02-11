import { z } from 'zod';

export const addressInputSchema = z.object({
  type: z.literal('checkbox'),
});

export type AddressInputSchema = z.infer<typeof addressInputSchema>;

import { z } from 'zod';

export const datePickerInputSchema = z.object({
  type: z.literal('date-picker'),
});

export type DatePickerInputSchema = z.infer<typeof datePickerInputSchema>;

import { formFieldSchema } from '@/features/forms/schemas/form-field.schema';
import { z } from 'zod';

export const formStepSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  fields: z.array(formFieldSchema),
  buttonLabel: z.string(),
});

export type FormStepSchema = z.infer<typeof formStepSchema>;

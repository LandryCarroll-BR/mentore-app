import { formStepSchema } from '@/features/forms/schemas/form-step.schema';
import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  steps: z.array(formStepSchema),
});

export type FormSchema = z.infer<typeof formSchema>;

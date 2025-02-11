import { formFieldAttributes } from '@/features/forms/schemas/form-field-attributes.schema';
import { z } from 'zod';

export const formFieldSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  attributes: formFieldAttributes,
  required: z.boolean(),
  value: z.string().optional(),
  colSpan: z.enum(['1', '2', '3', '4']).optional(),
});

export type FormFieldSchema = z.infer<typeof formFieldSchema>;

'use client';

import { useFormStepContext } from '@/features/forms/components/form-step';
import type { FormFieldSchema } from '@/features/forms/schemas/form-field.schema';
import { useFormStore } from '@/features/forms/stores/form.store';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import type {} from 'react-hook-form';

export function DateInput(formField: FormFieldSchema) {
  const form = useFormStepContext();
  const formStore = useFormStore((store) => store);
  const attributes = formField.attributes;

  if (attributes.type !== 'date') {
    throw new Error('Invalid form field type');
  }

  return (
    <FormField
      control={form.control}
      name={formField.id}
      defaultValue={formStore.data[formField.id] ?? formField.value ?? ''}
      rules={{
        required: formField.required && 'This field is required',
        maxLength: 56,
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {formField.title}
            {formField.required && ' *'}
          </FormLabel>
          {formField.description && (
            <FormDescription>{formField.description}</FormDescription>
          )}
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

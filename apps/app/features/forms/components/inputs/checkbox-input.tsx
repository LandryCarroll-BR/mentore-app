'use client';

import { useFormStepContext } from '@/features/forms/components/form-step';
import type { FormFieldSchema } from '@/features/forms/schemas/form-field.schema';
import { useFormStore } from '@/features/forms/stores/form.store';
import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@repo/design-system/components/ui/form';
import type {} from 'react-hook-form';

export function CheckboxInput(formField: FormFieldSchema) {
  const form = useFormStepContext();
  const formStore = useFormStore((store) => store);
  const attributes = formField.attributes;

  if (attributes.type !== 'checkbox') {
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
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{formField.title}</FormLabel>
            {formField.description && (
              <FormDescription>{formField.description}</FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}

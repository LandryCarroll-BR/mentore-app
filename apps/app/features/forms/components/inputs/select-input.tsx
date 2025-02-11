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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import type {} from 'react-hook-form';

export function SelectInput(formField: FormFieldSchema) {
  const form = useFormStepContext();
  const formStore = useFormStore((store) => store);
  const attributes = formField.attributes;

  if (attributes.type !== 'select') {
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
          <FormLabel>State</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {attributes.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{formField.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

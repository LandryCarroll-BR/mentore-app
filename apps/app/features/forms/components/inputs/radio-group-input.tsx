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
  RadioGroup,
  RadioGroupItem,
} from '@repo/design-system/components/ui/radio-group';

export function RadioInput(formField: FormFieldSchema) {
  const form = useFormStepContext();
  const formStore = useFormStore((store) => store);
  const attributes = formField.attributes;

  if (attributes.type !== 'radio') {
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
        <FormItem className="space-y-3">
          <FormLabel>{formField.title}</FormLabel>
          {formField.description && (
            <FormDescription>{formField.description}</FormDescription>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {attributes.options.map((option) => (
                <FormItem
                  key={option.label}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

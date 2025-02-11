'use client';

import { useFormStepContext } from '@/features/forms/components/form-step';
import type { FormFieldSchema } from '@/features/forms/schemas/form-field.schema';
import { useFormStore } from '@/features/forms/stores/form.store';
import { Button } from '@repo/design-system/components/ui/button';
import { Calendar } from '@repo/design-system/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/ui/popover';
import { cn } from '@repo/design-system/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export function DatePickerInput(formField: FormFieldSchema) {
  const form = useFormStepContext();
  const formStore = useFormStore((store) => store);
  const attributes = formField.attributes;

  if (attributes.type !== 'date-picker') {
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
        <FormItem className="flex flex-col">
          <FormLabel>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

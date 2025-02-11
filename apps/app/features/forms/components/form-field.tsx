import { CheckboxInput } from '@/features/forms/components/inputs/checkbox-input';
import { DateInput } from '@/features/forms/components/inputs/date-input';
import { DatePickerInput } from '@/features/forms/components/inputs/date-picker-input';
import { RadioInput } from '@/features/forms/components/inputs/radio-group-input';
import { SelectInput } from '@/features/forms/components/inputs/select-input';
import { TextInput } from '@/features/forms/components/inputs/text-input';
import { TextareaInput } from '@/features/forms/components/inputs/textarea-input';
import type { FormFieldSchema } from '@/features/forms/schemas/form-field.schema';

export function FormField(formField: FormFieldSchema) {
  switch (formField.attributes.type) {
    case 'text':
      return <TextInput {...formField} />;

    case 'textarea':
      return <TextareaInput {...formField} />;

    case 'select':
      return <SelectInput {...formField} />;

    case 'radio':
      return <RadioInput {...formField} />;

    case 'checkbox':
      return <CheckboxInput {...formField} />;

    case 'date':
      return <DateInput {...formField} />;

    case 'date-picker':
      return <DatePickerInput {...formField} />;

    default:
      throw new Error('Invalid form field type');
  }
}

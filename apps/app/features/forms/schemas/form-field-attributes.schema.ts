import { addressInputSchema } from '@/features/forms/schemas/inputs/address.input.schema';
import { checkboxInputSchema } from '@/features/forms/schemas/inputs/checkbox.input.schema';
import { datePickerInputSchema } from '@/features/forms/schemas/inputs/date-picker.input.schema';
import { dateInputSchema } from '@/features/forms/schemas/inputs/date.input.schema';
import { emailInputSchema } from '@/features/forms/schemas/inputs/email.input.schema';
import { fileInputSchema } from '@/features/forms/schemas/inputs/file.input.schema';
import { numberInputSchema } from '@/features/forms/schemas/inputs/number.input.schema';
import { phoneInputSchema } from '@/features/forms/schemas/inputs/phone.input.schema';
import { radioInputSchema } from '@/features/forms/schemas/inputs/radio.input.schema';
import { selectInputSchema } from '@/features/forms/schemas/inputs/select.input.schema';
import { textInputSchema } from '@/features/forms/schemas/inputs/text.input.schema';
import { textareaInputSchema } from '@/features/forms/schemas/inputs/textarea.input.schema';
import { z } from 'zod';

export const formFieldAttributes = z.union([
  addressInputSchema,
  checkboxInputSchema,
  dateInputSchema,
  datePickerInputSchema,
  emailInputSchema,
  fileInputSchema,
  numberInputSchema,
  phoneInputSchema,
  radioInputSchema,
  selectInputSchema,
  textInputSchema,
  textareaInputSchema,
]);

export type FormFieldAttributes = z.infer<typeof formFieldAttributes>;

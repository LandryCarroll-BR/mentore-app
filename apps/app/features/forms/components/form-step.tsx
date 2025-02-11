import { LoadingButton } from '@/components/loading-button';
import { FormField } from '@/features/forms/components/form-field';
import { useFormStepper } from '@/features/forms/components/form-stepper';
import type { FormStepSchema } from '@/features/forms/schemas/form-step.schema';
import { useFormStore } from '@/features/forms/stores/form.store';
import { delay } from '@/utils/async.utils';
import { Button } from '@repo/design-system/components/ui/button';
import { Form } from '@repo/design-system/components/ui/form';
import { cn } from '@repo/design-system/lib/utils';
import * as React from 'react';
import { type FieldValues, type UseFormReturn, useForm } from 'react-hook-form';

// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid circular dependencies
type FormStepContextValue = UseFormReturn<FieldValues, any, undefined>;

const FormStepContext = React.createContext<FormStepContextValue | undefined>(
  undefined
);

export function useFormStepContext() {
  const context = React.useContext(FormStepContext);
  if (!context) {
    throw new Error('FormStepContext must be used within a FormProvider');
  }
  return context;
}

export function FormStep(formStep: FormStepSchema) {
  const { useStepper } = useFormStepper();
  const formStepper = useStepper();
  const form = useForm({});
  const formStore = useFormStore((store) => store);

  async function onSubmit(data: Record<string, string>) {
    await delay(200);
    const payload = { ...data, ...formStore.data };
    if (formStepper.isLast) {
      console.log(payload); // submit form
    } else {
      formStore.setData(payload);
      formStepper.next();
    }
  }

  const colSpan = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
  };

  return (
    <FormStepContext.Provider value={form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-6"
        >
          {formStep.fields.map((field) => (
            <div className={cn(colSpan[field.colSpan ?? '4'])} key={field.id}>
              <FormField {...field} />
            </div>
          ))}

          <div className="col-span-4 flex flex-col-reverse gap-3 lg:ml-auto lg:w-fit lg:flex-row">
            {!formStepper.isFirst && (
              <Button
                onClick={formStepper.prev}
                type="button"
                variant={'secondary'}
              >
                Previous
              </Button>
            )}
            <LoadingButton disabled={form.formState.isSubmitting} type="submit">
              {formStep.buttonLabel}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </FormStepContext.Provider>
  );
}

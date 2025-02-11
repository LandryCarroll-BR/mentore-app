import { FormStep } from '@/features/forms/components/form-step';
import type { FormStepSchema } from '@/features/forms/schemas/form-step.schema';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import type { DefineStepperProps } from '@repo/design-system/components/ui/stepper';
import * as React from 'react';

type FormStepperStep = FormStepSchema;

type FormStepperType = DefineStepperProps<FormStepperStep[]>;

type FormStepperContextValue = FormStepperType;

const FormStepperContext = React.createContext<FormStepperContextValue | null>(
  null
);

const useFormStepper = () => {
  const onboardingStepperContext = React.useContext(FormStepperContext);
  if (!onboardingStepperContext) {
    throw new Error('useFormStepper must be used within a <FormStepper>');
  }
  return onboardingStepperContext;
};

function FormStepper({
  children,
  ...stepper
}: { children: React.ReactNode } & FormStepperContextValue) {
  const { StepperProvider } = stepper;
  return (
    <FormStepperContext.Provider value={stepper}>
      <StepperProvider className="space-y-4" variant="vertical">
        {children}
      </StepperProvider>
    </FormStepperContext.Provider>
  );
}

function FormStepperNavigation() {
  const { StepperNavigation, StepperStep, StepperTitle, useStepper } =
    useFormStepper();
  const methods = useStepper();
  return (
    <StepperNavigation>
      {methods.all.map((step) => (
        <StepperStep key={step.id} of={step.id} className="pointer-events-none">
          <StepperTitle>{step.title}</StepperTitle>
        </StepperStep>
      ))}
    </StepperNavigation>
  );
}

function FormStepperContent() {
  const { StepperPanel, useStepper } = useFormStepper();
  const methods = useStepper();
  return (
    <div>
      {methods.when(methods.current.id, (step) => (
        <StepperPanel>
          <Card>
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <FormStep {...step} />
            </CardContent>
          </Card>
        </StepperPanel>
      ))}
    </div>
  );
}

function FormStepperControls() {
  const { StepperControls, useStepper } = useFormStepper();
  const methods = useStepper();
  return (
    <StepperControls className="mt-auto">
      <Button
        variant="secondary"
        onClick={methods.prev}
        disabled={methods.isFirst}
      >
        Previous
      </Button>
      <Button onClick={methods.next} disabled={methods.isLast}>
        {'Next'}
      </Button>
    </StepperControls>
  );
}

export {
  FormStepper,
  FormStepperNavigation,
  FormStepperContent,
  FormStepperControls,
  type FormStepperStep,
  type FormStepperType,
  useFormStepper,
};

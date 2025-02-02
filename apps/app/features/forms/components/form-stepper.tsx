import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import type { DefineStepperProps } from '@repo/design-system/components/ui/stepper';
import * as React from 'react';

type FormStepperStep = {
  id: string;
  title: string;
  icon: React.ReactNode;
  form: React.ReactNode;
};

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
        <StepperStep
          key={step.id}
          of={step.id}
          onClick={() => methods.goTo(step.id)}
          icon={step.icon}
        >
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
            </CardHeader>
            <CardContent>{step.form}</CardContent>
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
      {!methods.isLast && (
        <>
          <Button
            variant="secondary"
            onClick={methods.prev}
            disabled={methods.isFirst}
          >
            Previous
          </Button>
          <Button onClick={methods.next}>{'Next'}</Button>
        </>
      )}
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

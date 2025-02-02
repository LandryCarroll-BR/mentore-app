import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import type { DefineStepperProps } from '@repo/design-system/components/ui/stepper';
import * as React from 'react';

type OnboardingStepperStep = {
  id: string;
  title: string;
  icon: React.ReactNode;
  form: React.ReactNode;
};

type OnboardingStepperType = DefineStepperProps<OnboardingStepperStep[]>;

type OnboardingStepperContextValue = OnboardingStepperType;

const OnboardingStepperContext =
  React.createContext<OnboardingStepperContextValue | null>(null);

const useOnboardingStepper = () => {
  const onboardingStepperContext = React.useContext(OnboardingStepperContext);
  if (!onboardingStepperContext) {
    throw new Error(
      'useOnboardingStepper must be used within a <OnboardingStepper>'
    );
  }
  return onboardingStepperContext;
};

function OnboardingStepper({
  children,
  ...stepper
}: { children: React.ReactNode } & OnboardingStepperContextValue) {
  const { StepperProvider } = stepper;
  return (
    <OnboardingStepperContext.Provider value={stepper}>
      <StepperProvider className="space-y-4" variant="vertical">
        {children}
      </StepperProvider>
    </OnboardingStepperContext.Provider>
  );
}

function OnboardingStepperNavigation() {
  const { StepperNavigation, StepperStep, StepperTitle, useStepper } =
    useOnboardingStepper();
  const methods = useStepper();
  return (
    <StepperNavigation className="py-12">
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

function OnboardingStepperContent() {
  const { StepperPanel, useStepper } = useOnboardingStepper();
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

function OnboardingStepperControls() {
  const { StepperControls, useStepper } = useOnboardingStepper();
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
  OnboardingStepper,
  OnboardingStepperNavigation,
  OnboardingStepperContent,
  OnboardingStepperControls,
  type OnboardingStepperStep,
  type OnboardingStepperType,
  useOnboardingStepper,
};

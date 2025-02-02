import { CreateOrganizationForm } from '@/features/onboarding/components/forms/create-organization.form';
import type {
  OnboardingStepperStep,
  OnboardingStepperType,
} from '@/features/onboarding/components/onboarding-stepper';
import { defineStepper } from '@repo/design-system/components/ui/stepper';
import { Building2Icon } from 'lucide-react';

export const onboardingStepperAdmin = defineStepper<OnboardingStepperStep[]>({
  id: 'step-1',
  title: 'Create your organization',
  icon: <Building2Icon />,
  form: <CreateOrganizationForm />,
}) satisfies OnboardingStepperType;

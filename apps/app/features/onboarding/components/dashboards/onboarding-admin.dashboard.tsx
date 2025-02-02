'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  OnboardingStepper,
  OnboardingStepperContent,
  OnboardingStepperControls,
  OnboardingStepperNavigation,
} from '@/features/onboarding/components/onboarding-stepper';
import { onboardingStepperAdmin } from '@/features/onboarding/components/steppers/onboarding-admin.stepper';
import { OrigamiIcon } from 'lucide-react';

export function OnboardingAdminDashboard() {
  return (
    <OnboardingStepper {...onboardingStepperAdmin}>
      <AppSidebar
        header={
          <div className="flex items-end gap-2">
            <OrigamiIcon /> <span>Mentore</span>
          </div>
        }
        content={<OnboardingStepperNavigation />}
      >
        <div className="flex h-full flex-col gap-8 p-6 pb-24">
          <OnboardingStepperContent />
          <OnboardingStepperControls />
        </div>
      </AppSidebar>
    </OnboardingStepper>
  );
}

'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  FormStepper,
  FormStepperContent,
  FormStepperNavigation,
  type FormStepperStep,
} from '@/features/forms/components/form-stepper';
import { ArrowLeftIcon, OrigamiIcon } from 'lucide-react';

import { Header } from '@/components/header';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/design-system/components/ui/sidebar';
import { defineStepper } from '@repo/design-system/components/ui/stepper';
import Link from 'next/link';

export function FormPresenterDashboard({
  formTitle = 'Form',
  formSteps,
}: { formTitle?: string; formSteps: FormStepperStep[] }) {
  const formStepper = defineStepper<FormStepperStep[]>(...formSteps);
  return (
    <FormStepper {...formStepper}>
      <AppSidebar
        header={
          <div className="flex items-end gap-2 p-2">
            <OrigamiIcon /> <span>Mentore</span>
          </div>
        }
        content={
          <div className="flex h-full flex-col gap-4 px-4 py-8">
            <FormStepperNavigation />
            <SidebarMenu className="mt-auto">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <ArrowLeftIcon />
                    Back to Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        }
      >
        <Header page={formTitle} />
        <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8 p-6 pb-24">
          <FormStepperContent />
        </div>
      </AppSidebar>
    </FormStepper>
  );
}

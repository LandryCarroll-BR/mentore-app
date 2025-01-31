import { CreateOrganizationForm } from '@/features/onboarding/components/create-organization.form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/design-system/components/ui/dialog';

export default function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Enter your organization's details to get started as an admin.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

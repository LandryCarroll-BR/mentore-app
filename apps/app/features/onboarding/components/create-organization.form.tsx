'use client';

import { Label } from '@repo/design-system/components/ui/label';
import * as React from 'react';

import { LoadingButton } from '@/components/loading-button';
import { createOrganizationAction } from '@/features/onboarding/data/actions/create-organization.action';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export const CreateOrganizationForm: React.FC<
  React.HtmlHTMLAttributes<HTMLFormElement>
> = ({ ...props }) => {
  const [state, formAction, pending] = React.useActionState(
    createOrganizationAction,
    {
      defaultValues: {
        organizationName: '',
      },
      success: false,
      errors: null,
    }
  );

  return (
    <form action={formAction} {...props}>
      {state.success ? (
        <p className="flex h-16 items-center gap-2 text-muted-foreground text-sm">
          <Check className="size-4" />
          Your organization has been created!
        </p>
      ) : (
        <div className="flex flex-col gap-6 pb-1.5">
          <div
            className="group/field grid gap-2"
            data-invalid={!!state.errors?.organizationName}
          >
            <Label
              htmlFor="organizationName"
              className="group-data-[invalid=true]/field:text-destructive"
            >
              Name <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="organizationName"
              name="organizationName"
              placeholder="My Team"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.organizationName}
              aria-errormessage="error-name"
              defaultValue={state.defaultValues.organizationName}
            />
            {state.errors?.organizationName && (
              <p id="error-name" className="text-destructive text-sm">
                {state.errors.organizationName}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="pt-6">
        {state.success ? (
          <Button asChild size="sm">
            <Link href={'/'}>
              Go to Dashboard
              <ArrowRight />
            </Link>
          </Button>
        ) : (
          <LoadingButton type="submit" size="sm" disabled={pending}>
            Create Organization
          </LoadingButton>
        )}
      </div>
    </form>
  );
};

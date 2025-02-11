'use client';

import type * as React from 'react';

import { LoadingButton } from '@/components/loading-button';
import { createOrganizationAction } from '@/features/onboarding/actions/create-organization.action';
import {
  type CreateOrganizationSchema,
  createOrganizationSchema,
} from '@/features/onboarding/schemas/create-organization.schema';
import { delay } from '@/utils/async.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';
import { Input } from '@repo/design-system/components/ui/input';
import { toast } from '@repo/design-system/components/ui/sonner';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

export const CreateOrganizationForm: React.FC = () => {
  const { executeAsync } = useAction(createOrganizationAction, {
    onSuccess: () => {
      toast.success('Organization created');
    },
  });

  const form = useForm<CreateOrganizationSchema>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      organizationName: '',
    },
  });

  async function onSubmit(data: CreateOrganizationSchema) {
    await executeAsync(data);
    await delay(1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Organization</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          disabled={form.formState.isSubmitting}
          type="submit"
          className="mt-6"
        >
          Create Organization
        </LoadingButton>
      </form>
    </Form>
  );
};

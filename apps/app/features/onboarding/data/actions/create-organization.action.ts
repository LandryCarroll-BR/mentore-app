'use server';

import { getRoleByKey } from '@/data/queries/roles.get';
import { createOrganizationSchema } from '@/features/onboarding/data/schemas/create-organization.schema';
import { clerkClient, currentUser } from '@repo/auth/server';
import { database } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createOrganizationAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()));

  try {
    const data = createOrganizationSchema.parse(Object.fromEntries(formData));
    const user = await currentUser();
    const userId = user?.id;
    const adminRole = await getRoleByKey('ADMIN');
    const adminRoleId = adminRole?.id;

    if (!userId || !adminRoleId) {
      throw new Error('User or role not found');
    }

    const newOrganization = await database.organization.create({
      data: {
        name: data.organizationName,
        organizationUsers: {
          create: {
            user: {
              connect: { id: userId },
            },
            role: {
              connect: { id: adminRoleId }, // Assign the admin role
            },
          },
        },
      },
      include: {
        organizationUsers: {
          include: {
            user: true,
            role: true,
          },
        },
      },
    });

    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        org_id: newOrganization.id,
        org_role: adminRole.key,
      },
    });

    revalidatePath('/');

    return {
      defaultValues: {
        organizationName: '',
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      };
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    };
  }
}

'use server';

import { getRoleByKey } from '@/data/queries/roles.get';
import { createOrganizationSchema } from '@/features/onboarding/schemas/create-organization.schema';
import { authActionClient } from '@/lib/next-safe-action/next-safe-action.client';
import { clerkClient } from '@repo/auth/server';
import { database } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createOrganizationAction = authActionClient
  .schema(createOrganizationSchema)
  .action(async ({ parsedInput: { organizationName }, ctx: { user } }) => {
    try {
      const adminRole = await getRoleByKey('ADMIN');
      const adminRoleId = adminRole?.id;

      if (!user) {
        throw new Error('User not found');
      }

      if (!adminRoleId) {
        throw new Error('User or role not found');
      }

      const newOrganization = await database.organization.create({
        data: {
          name: organizationName,
          organizationUsers: {
            create: {
              user: {
                connect: { id: user.id },
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
      await clerk.users.updateUser(user.id, {
        publicMetadata: {
          org_id: newOrganization.id,
          org_role: adminRole.key,
        },
      });

      revalidatePath('/');
    } catch (error) {
      throw new Error('Failed to create organization');
    }

    redirect('/');
  });

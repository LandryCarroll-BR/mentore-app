'use server';

import { clerkClient, currentUser } from '@repo/auth/server';
import { database } from '@repo/database';
import { revalidatePath } from 'next/cache';

export const setActiveOrganization = async (organizationId: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not found.');
  }

  // Ensure the user belongs to the organization
  const userInOrganization = await database.organizationUser.findFirst({
    where: {
      userId: user.id,
      organizationId: organizationId,
    },
  });

  if (!userInOrganization) {
    throw new Error('User does not belong to the specified organization.');
  }

  const clerk = await clerkClient();

  await clerk.users.updateUser(user.id, {
    publicMetadata: {
      org_id: userInOrganization.organizationId,
    },
  });

  revalidatePath('/');
};

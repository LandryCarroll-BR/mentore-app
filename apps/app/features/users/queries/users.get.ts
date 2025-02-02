'use server';

import { database } from '@repo/database';

export async function getUserFromDatabase(userId: string) {
  return await database.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      activeOrganizationId: true,
      organizationUsers: {
        select: {
          roleId: true,
        },
      },
    },
  });
}

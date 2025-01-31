import { currentUser } from '@repo/auth/server';
import { database } from '@repo/database';

export const getUserOrganizations = async (userId?: string) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const organizations = await database.organizationUser.findMany({
    where: {
      userId: userId, // Filter by the specific user ID
    },
    include: {
      organization: true, // Include details about the organizations
    },
  });

  return organizations.map((orgUser) => orgUser.organization); // Extract and return only the organization details
};

export const getActiveOrganizationId = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found.');
  }

  return user.publicMetadata.org_id as string;
};

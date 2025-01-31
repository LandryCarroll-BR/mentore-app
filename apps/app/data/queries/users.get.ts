'use server';

import {
  type OrganizationMembership,
  auth,
  clerkClient,
  currentUser,
} from '@repo/auth/server';
import { database } from '@repo/database';
import { tailwind } from '@repo/tailwind-config';

const getName = (user: OrganizationMembership): string | undefined => {
  let name = user.publicUserData?.firstName;

  if (name && user.publicUserData?.lastName) {
    name = `${name} ${user.publicUserData.lastName}`;
  } else if (!name) {
    name = user.publicUserData?.identifier;
  }

  return name;
};

const colors = [
  tailwind.theme.colors.red[500],
  tailwind.theme.colors.orange[500],
  tailwind.theme.colors.amber[500],
  tailwind.theme.colors.yellow[500],
  tailwind.theme.colors.lime[500],
  tailwind.theme.colors.green[500],
  tailwind.theme.colors.emerald[500],
  tailwind.theme.colors.teal[500],
  tailwind.theme.colors.cyan[500],
  tailwind.theme.colors.sky[500],
  tailwind.theme.colors.blue[500],
  tailwind.theme.colors.indigo[500],
  tailwind.theme.colors.violet[500],
  tailwind.theme.colors.purple[500],
  tailwind.theme.colors.fuchsia[500],
  tailwind.theme.colors.pink[500],
  tailwind.theme.colors.rose[500],
];

export const getUsers = async (
  userIds: string[]
): Promise<
  | {
      data: Liveblocks['UserMeta']['info'][];
    }
  | {
      error: unknown;
    }
> => {
  try {
    const user = await currentUser();
    const orgId = user?.publicMetadata.org_id;

    if (!orgId) {
      throw new Error('Not logged in');
    }

    const members = await database.organizationUser.findMany({
      where: {
        id: orgId,
      },
      include: {
        user: true,
      },
    });

    const data: Liveblocks['UserMeta']['info'][] = members
      .filter((user) => user.userId && userIds.includes(user.userId))
      .map((user) => ({
        name: user.user.firstName ?? 'Unknown user',
        picture: user.user.avatarUrl ?? '',
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

    return { data };
  } catch (error) {
    return { error };
  }
};

import Fuse from 'fuse.js';

export const searchUsers = async (
  query: string
): Promise<
  | {
      data: string[];
    }
  | {
      error: unknown;
    }
> => {
  try {
    const { orgId } = await auth();

    if (!orgId) {
      throw new Error('Not logged in');
    }

    const clerk = await clerkClient();

    const members = await clerk.organizations.getOrganizationMembershipList({
      organizationId: orgId,
      limit: 100,
    });

    const users = members.data.map((user) => ({
      id: user.id,
      name: getName(user) ?? user.publicUserData?.identifier,
      imageUrl: user.publicUserData?.imageUrl,
    }));

    const fuse = new Fuse(users, {
      keys: ['name'],
      minMatchCharLength: 1,
      threshold: 0.3,
    });

    const results = fuse.search(query);
    const data = results.map((result) => result.item.id);

    return { data };
  } catch (error) {
    return { error };
  }
};

export const getUserFromDb = async (userId: string) => {
  if (!userId) {
    throw new Error('Not logged in');
  }

  const user = await database.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

import { currentUser as getCurrentUser } from '@repo/auth/server';
import { database } from '@repo/database';

export const createUserFromAuth = async () => {
  const currentUser = await getCurrentUser();

  const email = currentUser?.emailAddresses[0].emailAddress || '';
  const firstName =
    currentUser?.firstName ||
    currentUser?.emailAddresses[0].emailAddress.split('@')[0] ||
    '';
  const lastName = currentUser?.lastName || '';
  const username = currentUser?.username || email;

  const user = await database.user.upsert({
    where: { id: currentUser?.id },
    create: {
      id: currentUser?.id,
      firstName,
      lastName,
      email: email,
      username,
    },
    update: {
      id: currentUser?.id,
      firstName,
      lastName,
      email: email,
      username,
    },
  });

  return user;
};

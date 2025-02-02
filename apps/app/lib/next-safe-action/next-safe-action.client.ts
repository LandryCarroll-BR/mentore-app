import { getUserFromDatabase } from '@/features/users/queries/users.get';
import { currentUser } from '@repo/auth/server';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from 'next-safe-action';
import { redirect } from 'next/navigation';

class ActionError extends Error {}

// Base client.
export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

// Auth client defined by extending the base one.
// Note that the same initialization options and middleware functions of the base client
// will also be used for this one.
export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const user = await currentUser();

    if (!user?.id) {
      return redirect('/sign-in');
    }

    const userFromDatabase = await getUserFromDatabase(user.id);

    if (!user) {
      throw new Error('Session is not valid!');
    }

    return next({
      ctx: {
        user: userFromDatabase,
      },
    });
  });

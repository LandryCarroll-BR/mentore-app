import { createUserFromAuth } from '@/data/actions/users.create';
import { getUserFromDb } from '@/data/queries/users.get';
import { auth, currentUser } from '@repo/auth/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { env } from '@repo/env';
import { secure } from '@repo/security';
import type { ReactNode } from 'react';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();

  if (!user?.id) {
    return redirectToSignIn();
  }

  const userFromDb = await getUserFromDb(user?.id);

  if (!userFromDb) {
    await createUserFromAuth();
  }

  return <SidebarProvider>{children}</SidebarProvider>;
};

export default AppLayout;

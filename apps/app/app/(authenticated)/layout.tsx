import { createUserFromAuth } from '@/data/actions/users.create';
import { getUserOrganizations } from '@/data/queries/organizations.get';
import { getUserFromDb } from '@/data/queries/users.get';
import { auth, currentUser } from '@repo/auth/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
import { env } from '@repo/env';
import { showBetaFeature } from '@repo/feature-flags';
import { secure } from '@repo/security';
import { redirect } from 'next/navigation';
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
  const betaFeature = await showBetaFeature();

  if (!user?.id) {
    return redirectToSignIn();
  }

  const userFromDb = await getUserFromDb(user?.id);

  if (!userFromDb) {
    await createUserFromAuth();
  }

  const organizations = await getUserOrganizations(user?.id);

  if (!organizations.length) {
    redirect('/onboarding/admin');
  }

  return (
    <SidebarProvider>
      {betaFeature && (
        <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
          Beta feature now available
        </div>
      )}
      {children}
    </SidebarProvider>
  );
};

export default AppLayout;

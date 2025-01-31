import { AvatarStack } from '@/components/avatar-stack';
import { Cursors } from '@/components/cursors';
import { Header } from '@/components/header';
import {
  getActiveOrganizationId,
  getUserOrganizations,
} from '@/data/queries/organizations.get';
import { currentUser } from '@repo/auth/server';
import { env } from '@repo/env';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const title = 'Acme Inc';
const description = 'My application.';

const CollaborationProvider = dynamic(() =>
  import('../../components/collaboration-provider').then(
    (mod) => mod.CollaborationProvider
  )
);

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const user = await currentUser();
  const organizations = await getUserOrganizations(user?.id);
  const activeOrganizationId = await getActiveOrganizationId();

  if (!organizations.length) {
    redirect('/onboarding/create-organization');
  }

  return (
    <>
      <Header page="Dashboard">
        {env.LIVEBLOCKS_SECRET && activeOrganizationId && (
          <CollaborationProvider orgId={activeOrganizationId}>
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          Welcome to Mentore
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          {/* <MentorApplicationList /> */}
        </div>
      </div>
    </>
  );
};

export default App;

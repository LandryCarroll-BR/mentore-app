import { AppSidebar } from '@/components/app-sidebar';
import { OrganizationSwitcher } from '@/components/organization-switcher';
import { createUserFromAuth } from '@/data/actions/users.create';
import { getUserOrganizations } from '@/data/queries/organizations.get';
import { getUserFromDb } from '@/data/queries/users.get';
import { auth, currentUser } from '@repo/auth/server';
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@repo/design-system/components/ui/sidebar';
import { env } from '@repo/env';
import { showBetaFeature } from '@repo/feature-flags';
import { secure } from '@repo/security';
import { Plus, SquareChartGanttIcon } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

type DashboardLayoutProps = {
  readonly children: ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
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
      <AppSidebar
        header={
          <OrganizationSwitcher
            activeOrganizationId={
              (user?.publicMetadata?.org_id as string) ?? ''
            }
            organizations={organizations.map(({ org, role }) => ({
              id: org.id,
              name: org.name,
              role: role.name,
            }))}
          />
        }
        content={
          <SidebarGroup>
            <SidebarGroupLabel>Forms</SidebarGroupLabel>
            <SidebarGroupAction title="Create Form" asChild>
              <Link href={'/forms/create'}>
                <Plus /> <span className="sr-only">Create Form</span>
              </Link>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/forms'}>
                      <SquareChartGanttIcon />
                      Mentor Sign Up Form
                      <div className="relative h-2 w-2 rounded-full bg-blue-500">
                        <div className="inset-0 h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        }
      >
        {betaFeature && (
          <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
            Beta feature now available
          </div>
        )}
        {children}
      </AppSidebar>
    </SidebarProvider>
  );
};

export default DashboardLayout;

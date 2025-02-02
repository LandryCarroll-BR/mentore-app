'use client';
import { UserButton } from '@repo/auth/client';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
} from '@repo/design-system/components/ui/sidebar';
import {} from 'lucide-react';
import type { ReactNode } from 'react';

type AppSidebarProperties = {
  readonly children: ReactNode;
  readonly header?: ReactNode;
  readonly content?: ReactNode;
};

export const AppSidebar = ({
  children,
  header,
  content,
}: AppSidebarProperties) => {
  return (
    <>
      <Sidebar variant="inset">
        {header && <SidebarHeader>{header}</SidebarHeader>}
        <SidebarContent>{content}</SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <UserButton
                showName
                appearance={{
                  elements: {
                    rootBox: 'flex overflow-hidden w-full',
                    userButtonBox: 'flex-row-reverse',
                    userButtonOuterIdentifier: 'truncate pl-0',
                  },
                }}
              />
              <ModeToggle />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};

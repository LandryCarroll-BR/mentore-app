'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { ArrowLeftIcon, OrigamiIcon } from 'lucide-react';

import { Header } from '@/components/header';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/design-system/components/ui/sidebar';
import Link from 'next/link';

export function FormBuilderDashboard() {
  return (
    <AppSidebar
      header={
        <div className="flex items-end gap-2 p-2">
          <OrigamiIcon /> <span>Mentore</span>
        </div>
      }
      content={
        <div className="flex h-full flex-col gap-4 px-4 py-8">
          <SidebarMenu className="mt-auto">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <ArrowLeftIcon />
                  Back to Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      }
    >
      <Header page={'Create Form'} />
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-8 p-6 pb-24">
        Form Builder
      </div>
    </AppSidebar>
  );
}

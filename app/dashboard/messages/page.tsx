"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { MessagesView } from "@/components/dashboard/messages/messages-view";

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-none p-4">
          <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
          <p className="text-sm text-muted-foreground">
            Manage your conversations across all platforms
          </p>
        </div>
        <MessagesView />
      </div>
    </DashboardLayout>
  );
}

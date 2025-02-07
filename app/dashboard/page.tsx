'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { InventoryStatus } from "@/components/dashboard/inventory-status";
import { ActionButtons } from "@/components/dashboard/action-buttons";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <ActionButtons />
        </div>
        <div className="grid gap-4">
          <OverviewStats />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
            <SalesChart />
            <InventoryStatus />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

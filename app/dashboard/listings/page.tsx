"use client";

import { useState } from "react";
import { ActionButtons } from "@/components/dashboard/action-buttons";
import { ListingsTable } from "@/components/dashboard/listings/listings-table";
import { ListingsGrid } from "@/components/dashboard/listings/listings-grid";
import { ListingsFilters } from "@/components/dashboard/listings/listings-filters";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function ListingsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Listings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your inventory listings across all platforms
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-accent" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-accent" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
            <ActionButtons />
          </div>
        </div>

        <ListingsFilters />

        {viewMode === "grid" ? <ListingsGrid /> : <ListingsTable />}
      </div>
    </DashboardLayout>
  );
}

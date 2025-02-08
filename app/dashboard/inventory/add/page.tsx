"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { InventoryForm, type FormData } from "@/components/inventory/inventory-form";
import { toast } from "sonner";

export default function AddInventoryPage() {
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    try {
      // TODO: Implement API call to save inventory item
      console.log("Saving inventory item:", data);
      toast.success("Item saved successfully!");
      router.push("/dashboard/inventory");
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Failed to save item. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Add New Item</h2>
          <p className="text-muted-foreground">
            Create a new inventory item to list on your marketplaces
          </p>
        </div>
        <InventoryForm onSubmit={handleSubmit} onCancel={() => router.back()} />
      </div>
    </DashboardLayout>
  );
}

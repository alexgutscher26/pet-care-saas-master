"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { InventoryTable } from "@/components/inventory/inventory-table";
import { InventoryStats } from "@/components/inventory/inventory-stats";
import { ActionButtons } from "@/components/dashboard/action-buttons";

const mockData = [
  {
    id: "1",
    name: "Nike Air Max 270",
    sku: "NKE-AM270-001",
    image: "/images/products/nike-airmax.jpg",
    costPrice: 89.99,
    sellingPrice: 149.99,
    status: "Listed",
    platforms: ["facebook", "ebay", "mercari"],
    category: "Shoes",
    brand: "Nike",
    lastUpdated: "2024-02-07",
  },
  {
    id: "2",
    name: "Adidas Ultra Boost",
    sku: "ADS-UB-002",
    image: "/images/products/adidas-boost.jpg",
    costPrice: 99.99,
    sellingPrice: 179.99,
    status: "Draft",
    platforms: ["ebay"],
    category: "Shoes",
    brand: "Adidas",
    lastUpdated: "2024-02-06",
  },
  {
    id: "3",
    name: "Puma RS-X",
    sku: "PMA-RSX-003",
    image: "/images/products/puma-rsx.jpg",
    costPrice: 59.99,
    sellingPrice: 99.99,
    status: "Sold",
    platforms: ["mercari"],
    category: "Shoes",
    brand: "Puma",
    lastUpdated: "2024-02-05",
  },
];

export default function InventoryPage() {
  const calculateStats = () => {
    const listed = mockData.filter(item => item.status === "Listed").length;
    const draft = mockData.filter(item => item.status === "Draft").length;
    const sold = mockData.filter(item => item.status === "Sold").length;
    const totalValue = mockData.reduce((sum, item) => 
      sum + (item.status === "Listed" ? item.sellingPrice : 0), 
      0
    );

    return {
      totalItems: mockData.length,
      listed,
      draft,
      sold,
      totalValue,
    };
  };

  const stats = calculateStats();

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <ActionButtons />
        </div>
        <InventoryStats stats={stats} />
        <InventoryTable data={mockData} />
      </div>
    </DashboardLayout>
  );
}

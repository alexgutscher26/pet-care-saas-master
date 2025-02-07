"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, AlertTriangle, PackageX } from "lucide-react";

interface InventoryStats {
  totalItems: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalValue: number;
}

interface InventoryStatsProps {
  stats: InventoryStats;
}

export function InventoryStats({ stats }: InventoryStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
          <Package className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.totalItems}</div>
          <p className="text-xs text-gray-500">
            Items in inventory
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Stock Levels</CardTitle>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <div className="h-2 w-2 rounded-full bg-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-2xl font-bold">
            <div className="flex flex-col items-center">
              <span className="text-green-600">{stats.inStock}</span>
              <span className="text-xs text-gray-500">In Stock</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-600">{stats.lowStock}</span>
              <span className="text-xs text-gray-500">Low Stock</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-600">{stats.outOfStock}</span>
              <span className="text-xs text-gray-500">Out of Stock</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            ${stats.totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <p className="text-xs text-gray-500">
            Current inventory value
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Stock Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{stats.lowStock + stats.outOfStock}</div>
          <p className="text-xs text-gray-500">
            Items need attention
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusSquare, Download, Upload } from "lucide-react";

export function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        variant="outline"
        className="flex items-center gap-2 border-gray-200 hover:bg-gray-50"
        size="lg"
      >
        <Upload className="h-5 w-5" />
        Import Inventory
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 border-gray-200 hover:bg-gray-50"
        size="lg"
      >
        <Download className="h-5 w-5" />
        Export Data
      </Button>
      <Link href="/dashboard/inventory/add">
        <Button
          className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white"
          size="lg"
        >
          <PlusSquare className="h-5 w-5" />
          Create New Listing
        </Button>
      </Link>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  Search,
  ArrowUpDown,
  Image as ImageIcon,
  Facebook,
  ShoppingCart,
  Store,
} from "lucide-react";
import Image from "next/image";

interface Platform {
  name: string;
  icon: JSX.Element;
}

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  image: string;
  costPrice: number;
  sellingPrice: number;
  status: "Listed" | "Draft" | "Sold";
  platforms: string[];
  category: string;
  brand: string;
  lastUpdated: string;
}

interface InventoryTableProps {
  data: InventoryItem[];
}

const platforms: Record<string, Platform> = {
  facebook: { name: "Facebook", icon: <Facebook className="h-4 w-4" /> },
  ebay: { name: "eBay", icon: <ShoppingCart className="h-4 w-4" /> },
  mercari: { name: "Mercari", icon: <Store className="h-4 w-4" /> },
};

type SortField = "name" | "sellingPrice" | "costPrice";
type SortOrder = "asc" | "desc";

export function InventoryTable({ data }: InventoryTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<InventoryItem["status"] | "All">("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({
    field: "name",
    order: "asc",
  });

  const getStatusColor = (status: InventoryItem["status"]) => {
    switch (status) {
      case "Listed":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Sold":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleSort = (field: SortField) => {
    setSortConfig({
      field,
      order:
        sortConfig.field === field && sortConfig.order === "asc" ? "desc" : "asc",
    });
  };

  const sortData = (items: InventoryItem[]) => {
    return [...items].sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      const modifier = sortConfig.order === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }
      return ((aValue as number) - (bValue as number)) * modifier;
    });
  };

  const filteredData = sortData(
    data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
  );

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
          <Button variant="outline" size="sm" className="h-9">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Edit Selected
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                Delete Selected
              </Button>
            </div>
          )}
          {(["All", "Listed", "Draft", "Sold"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className={
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">
                <Checkbox
                  checked={selectedItems.length === filteredData.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1"
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("costPrice")}
                  className="flex items-center gap-1"
                >
                  Cost
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("sellingPrice")}
                  className="flex items-center gap-1"
                >
                  Price
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Platforms</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell>
                  {item.image ? (
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-100">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.category} • {item.brand}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>${item.costPrice.toFixed(2)}</TableCell>
                <TableCell>${item.sellingPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(item.status)}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {item.platforms.map((platform) => (
                      <div
                        key={platform}
                        className="text-gray-500 hover:text-gray-700"
                        title={platforms[platform]?.name}
                      >
                        {platforms[platform]?.icon}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit Item</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>List Item</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete Item
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

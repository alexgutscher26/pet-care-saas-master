"use client";

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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Copy, Trash } from "lucide-react";
import Image from "next/image";

// TODO: Replace with real data from your database
const mockListings = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Sample Item ${i + 1}`,
  image: "/placeholder.svg",
  price: Math.floor(Math.random() * 100) + 10,
  cost: Math.floor(Math.random() * 50) + 5,
  platform: ["eBay", "Mercari", "Poshmark"][Math.floor(Math.random() * 3)],
  condition: ["New", "Like New", "Good"][Math.floor(Math.random() * 3)],
  status: ["Draft", "Listed", "Sold"][Math.floor(Math.random() * 3)],
  created: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
}));

export function ListingsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockListings.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{listing.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {listing.condition}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{listing.platform}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    listing.status === "Sold"
                      ? "destructive"
                      : listing.status === "Listed"
                      ? "default"
                      : "secondary"
                  }
                >
                  {listing.status}
                </Badge>
              </TableCell>
              <TableCell>${listing.price}</TableCell>
              <TableCell>${listing.cost}</TableCell>
              <TableCell>{listing.created}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

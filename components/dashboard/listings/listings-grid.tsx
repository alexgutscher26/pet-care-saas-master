"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Copy, Trash } from "lucide-react";

// TODO: Replace with real data from your database
const mockListings = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Sample Item ${i + 1}`,
  image: "/placeholder.svg",
  price: Math.floor(Math.random() * 100) + 10,
  platform: ["eBay", "Mercari", "Poshmark"][Math.floor(Math.random() * 3)],
  condition: ["New", "Like New", "Good"][Math.floor(Math.random() * 3)],
  status: ["Draft", "Listed", "Sold"][Math.floor(Math.random() * 3)],
}));

export function ListingsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mockListings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover"
            />
            <Badge
              variant="secondary"
              className="absolute right-2 top-2 bg-white/80 backdrop-blur-sm"
            >
              {listing.platform}
            </Badge>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium leading-none">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {listing.condition}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
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
            </div>
            <div className="mt-4 flex items-center justify-between">
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
              <p className="text-sm font-medium">${listing.price}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

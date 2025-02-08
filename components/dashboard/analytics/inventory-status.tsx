"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const inventoryStatus = [
  {
    category: "Shoes",
    active: 45,
    draft: 12,
    sold: 38,
    total: 95,
  },
  {
    category: "Clothing",
    active: 82,
    draft: 8,
    sold: 64,
    total: 154,
  },
  {
    category: "Accessories",
    active: 34,
    draft: 5,
    sold: 28,
    total: 67,
  },
  {
    category: "Electronics",
    active: 28,
    draft: 3,
    sold: 19,
    total: 50,
  },
  {
    category: "Home",
    active: 41,
    draft: 7,
    sold: 31,
    total: 79,
  },
];

export function InventoryStatus() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Active</TableHead>
            <TableHead className="text-right">Draft</TableHead>
            <TableHead className="text-right">Sold</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryStatus.map((item) => (
            <TableRow key={item.category}>
              <TableCell className="font-medium">{item.category}</TableCell>
              <TableCell className="text-right">
                <Badge variant="success" className="justify-center min-w-[60px]">
                  {item.active}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="secondary" className="justify-center min-w-[60px]">
                  {item.draft}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="default" className="justify-center min-w-[60px]">
                  {item.sold}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                {item.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

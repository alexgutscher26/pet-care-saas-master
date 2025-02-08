"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const platforms = [
  "All Platforms",
  "eBay",
  "Mercari",
  "Poshmark",
  "Etsy",
  "Depop",
  "Facebook",
  "Amazon",
  "Vinted",
];

const statuses = ["All Status", "Draft", "Listed", "Sold", "Archived"];
const conditions = [
  "All Conditions",
  "New with tags",
  "New without tags",
  "Like new",
  "Good",
  "Fair",
  "Poor",
];

export function ListingsFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Platform</label>
        <Select defaultValue="All Platforms">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Status</label>
        <Select defaultValue="All Status">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Condition</label>
        <Select defaultValue="All Conditions">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Price Range</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="w-full"
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  BarChart,
  Box,
  CircleDollarSign,
  HelpCircle,
  LayoutGrid,
  MessageCircle,
  Settings,
  ShoppingCart,
  Truck,
} from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics of using our platform",
    icon: HelpCircle,
    href: "/help/getting-started",
  },
  {
    title: "Listing Management",
    description: "Create and manage your listings",
    icon: LayoutGrid,
    href: "/help/listings",
  },
  {
    title: "Orders & Shipping",
    description: "Handle orders and shipping",
    icon: Truck,
    href: "/help/orders",
  },
  {
    title: "Payments",
    description: "Manage your payments and payouts",
    icon: CircleDollarSign,
    href: "/help/payments",
  },
  {
    title: "Inventory",
    description: "Track and manage your inventory",
    icon: Box,
    href: "/help/inventory",
  },
  {
    title: "Analytics",
    description: "Understand your performance",
    icon: BarChart,
    href: "/help/analytics",
  },
  {
    title: "Buyer Communication",
    description: "Communicate with buyers",
    icon: MessageCircle,
    href: "/help/messages",
  },
  {
    title: "Account Settings",
    description: "Manage your account",
    icon: Settings,
    href: "/help/settings",
  },
];

export function HelpCategories() {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight mb-6">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.title}
              href={category.href}
              className="group relative rounded-lg border p-6 hover:border-foreground transition-colors"
            >
              <div>
                <Icon className="h-8 w-8" />
                <h3 className="mt-4 text-lg font-semibold">
                  {category.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

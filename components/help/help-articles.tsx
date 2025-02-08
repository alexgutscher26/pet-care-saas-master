"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "How to create your first listing",
    description:
      "Learn how to create an effective listing that sells",
    category: "Listings",
    href: "/help/articles/create-listing",
  },
  {
    title: "Understanding platform fees",
    description:
      "A comprehensive guide to fees across different platforms",
    category: "Payments",
    href: "/help/articles/platform-fees",
  },
  {
    title: "Shipping best practices",
    description:
      "Tips for efficient and safe shipping",
    category: "Orders",
    href: "/help/articles/shipping-guide",
  },
  {
    title: "Optimizing your listings for search",
    description:
      "Get more visibility with better titles and descriptions",
    category: "Listings",
    href: "/help/articles/seo-optimization",
  },
  {
    title: "Managing returns and refunds",
    description:
      "Handle returns and refunds professionally",
    category: "Orders",
    href: "/help/articles/returns-guide",
  },
  {
    title: "Cross-platform inventory sync",
    description:
      "Keep your inventory in sync across all platforms",
    category: "Inventory",
    href: "/help/articles/inventory-sync",
  },
];

export function HelpArticles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.title}
          href={article.href}
          className="group rounded-lg border p-6 hover:border-foreground transition-colors"
        >
          <div className="flex flex-col h-full">
            <div>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary">
                {article.category}
              </span>
              <h3 className="mt-4 text-lg font-semibold group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {article.description}
              </p>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-primary">
              Read more
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

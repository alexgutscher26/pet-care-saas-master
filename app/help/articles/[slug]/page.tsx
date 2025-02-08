"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// TODO: Replace with actual data fetching
const articles = {
  "create-listing": {
    title: "How to create your first listing",
    category: "Listings",
    content: `
## Getting Started

Creating your first listing is easy! Follow these steps to get started:

### 1. Navigate to Listings

From your dashboard, click on the "Listings" tab in the sidebar navigation.

### 2. Click "New Listing"

Look for the "New Listing" button in the top right corner of your listings page.

### 3. Fill in the Details

- **Title**: Make it descriptive and include key details
- **Description**: Be thorough and honest about condition
- **Price**: Research similar items for competitive pricing
- **Photos**: Add clear, well-lit photos from multiple angles
- **Category**: Choose the most relevant category
- **Condition**: Accurately describe the item's condition

### 4. Choose Platforms

Select which platforms you want to list on. You can choose multiple platforms!

### 5. Review and Publish

Double-check all details before hitting publish. You can always edit later.

## Tips for Success

- Use high-quality photos
- Write detailed descriptions
- Price competitively
- Be honest about condition
- Respond quickly to questions

## Need More Help?

Contact our support team if you need assistance!
    `,
    relatedArticles: [
      {
        title: "Optimizing your listings for search",
        href: "/help/articles/seo-optimization",
      },
      {
        title: "Understanding platform fees",
        href: "/help/articles/platform-fees",
      },
      {
        title: "Taking great product photos",
        href: "/help/articles/product-photos",
      },
    ],
  },
};

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  // TODO: Add error handling for invalid slugs
  const article = articles[params.slug as keyof typeof articles];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/help">Help Center</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/help/categories/${article.category.toLowerCase()}`}>
          {article.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{article.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_280px]">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {article.title}
          </h1>
          <div
            className="prose prose-gray dark:prose-invert mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="mt-8 flex items-center gap-2">
            <Button variant="outline">Was this helpful?</Button>
            <Button variant="outline">Report an issue</Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Related Articles</h3>
            <ul className="space-y-3">
              {article.relatedArticles.map((related) => (
                <li key={related.href}>
                  <Link
                    href={related.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Still need help?</h3>
            <Button className="w-full">Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

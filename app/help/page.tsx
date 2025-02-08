"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCategories } from "@/components/help/help-categories";
import { HelpArticles } from "@/components/help/help-articles";
import { Search } from "lucide-react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-center text-xl text-indigo-100 sm:max-w-3xl">
            Search our knowledge base or browse categories below
          </p>
          <div className="mx-auto mt-10 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="w-full pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="space-y-12">
          <HelpCategories />

          {/* Popular Articles */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-6">
              Popular Articles
            </h2>
            <HelpArticles />
          </div>

          {/* Contact Support */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                <span className="block">Still need help?</span>
                <span className="block text-muted-foreground text-lg font-normal mt-2">
                  Our support team is here to assist you.
                </span>
              </h2>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 gap-4">
                <Button>Contact Support</Button>
                <Button variant="outline">Live Chat</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

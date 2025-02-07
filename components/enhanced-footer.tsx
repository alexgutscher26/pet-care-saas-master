import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AmazonIcon, EtsyIcon, ShopifyIcon } from "./icons"

export function EnhancedFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_200px_200px_200px]">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Multi-Platform Listing Manager</h3>
            <p className="text-sm text-muted-foreground">
              Streamline your e-commerce business across multiple marketplaces with our intelligent listing management platform.
            </p>
            <div className="flex space-x-4">
              <AmazonIcon className="h-6 w-6" />
              <EtsyIcon className="h-6 w-6" />
              <ShopifyIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Documentation
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Guides
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="text-muted-foreground hover:text-foreground" href="#">
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-xs text-muted-foreground"> 2025 Multi-Platform Listing Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

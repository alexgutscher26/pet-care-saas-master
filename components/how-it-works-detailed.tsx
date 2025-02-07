import { SyncIcon, AmazonIcon, AnalyticsIcon, ShopifyIcon } from "./icons"

export function HowItWorksDetailed() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[800px] rounded-lg border bg-card p-8">
          <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <SyncIcon size={16} />
              </div>
              <div>
                <h3 className="font-bold">Connect Your Marketplaces</h3>
                <p className="text-muted-foreground">
                  Easily integrate with Amazon, Etsy, Shopify and other major e-commerce platforms through our secure API
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <AmazonIcon size={16} />
              </div>
              <div>
                <h3 className="font-bold">Import Your Listings</h3>
                <p className="text-muted-foreground">
                  Automatically import all your existing product listings, inventory levels, and pricing data
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <AnalyticsIcon size={16} />
              </div>
              <div>
                <h3 className="font-bold">Manage & Optimize</h3>
                <p className="text-muted-foreground">
                  Control everything from one dashboard - update listings, sync inventory, and optimize pricing across platforms
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ShopifyIcon size={16} />
              </div>
              <div>
                <h3 className="font-bold">Scale Your Business</h3>
                <p className="text-muted-foreground">
                  Expand to new marketplaces, automate routine tasks, and grow your e-commerce business effortlessly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

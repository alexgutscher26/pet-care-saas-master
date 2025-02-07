import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"
import { RainbowButton } from "./ui/rainbow-button"

export function SimplePricing() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Blue to Purple gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-indigo-500/20 
        opacity-50 blur-3xl"
      />

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-serif font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Scale your business with confidence
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Choose the plan that fits your business needs. From small sellers to large enterprises,
            we have you covered with powerful tools to manage your multi-platform presence.
          </p>

          <div className="grid gap-8 mt-8 md:grid-cols-3 w-full max-w-5xl">
            {/* Free Tier */}
            <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="mt-2 text-muted-foreground">Perfect for getting started</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Basic listing management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Up to 50 listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              <Button className="mt-6" variant="outline">
                Start Free
              </Button>
            </div>

            {/* Professional Tier */}
            <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold">Professional</h3>
              <p className="mt-2 text-muted-foreground">For growing businesses</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Unlimited listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Real-time inventory sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Bulk operations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
              <RainbowButton className="mt-6">
                Start Pro Trial
              </RainbowButton>
            </div>

            {/* Enterprise Tier */}
            <div className="flex flex-col p-6 bg-card rounded-lg border shadow-sm">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="mt-2 text-muted-foreground">For large-scale operations</p>
              <div className="mt-4">
                <span className="text-2xl font-bold">Custom</span>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Custom integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>SLA guarantees</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Custom analytics</span>
                </li>
              </ul>
              <Button className="mt-6" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            30-day money-back guarantee • Cancel anytime • All prices in USD
          </p>
        </div>
      </div>
    </section>
  )
}

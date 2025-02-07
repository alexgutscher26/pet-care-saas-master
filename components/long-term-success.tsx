import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function LongTermSuccess() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="secondary" className="h-6">
              Why Choose Our Platform
            </Badge>
            <h2 className="text-3xl font-serif font-medium tracking-tight sm:text-4xl md:text-5xl">
              Scale Your E-commerce Empire
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Building a successful multi-platform e-commerce business is like orchestrating a symphony. Each marketplace
                has its rhythm, but when synchronized perfectly, they create something extraordinary.
              </p>
              <p>
                We've partnered with thousands of sellers who started with a single platform and grew into
                multi-marketplace powerhouses. The secret isn't in rushing to list everywhere at once. It's about
                strategic expansion, data-driven decisions, and leveraging automation to maintain consistency across
                all channels. Our platform helps you master this delicate balance.
              </p>
            </div>
          </div>
          <div className="lg:pl-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Growth Through Integration</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Revenue Growth</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2 w-full" />
                  <p className="text-sm text-muted-foreground mt-2">92% of sellers increase revenue within 6 months</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Time Saved</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2 w-full" />
                  <p className="text-sm text-muted-foreground mt-2">75% reduction in listing management time</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Inventory Accuracy</span>
                    <span>99%</span>
                  </div>
                  <Progress value={99} className="h-2 w-full" />
                  <p className="text-sm text-muted-foreground mt-2">99% inventory sync accuracy across platforms</p>
                </div>
              </div>
            </div>
            <blockquote className="border-l-2 pl-6 italic">
              "Success in e-commerce isn't about being everywhere at once—it's about being excellent everywhere you are."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

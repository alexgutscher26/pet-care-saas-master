import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">What Sellers Say</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/testimonials/sarah.jpg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    "Managing listings across Amazon and Etsy used to be a nightmare. This platform saves me hours every day with automated syncing!"
                  </p>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Handmade Jewelry Seller</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/testimonials/mark.jpg" />
                  <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    "The inventory sync feature is a game-changer. No more overselling across platforms. It's increased our efficiency by 300%!"
                  </p>
                  <p className="text-sm font-medium">Mark Thompson</p>
                  <p className="text-xs text-muted-foreground">Electronics Store Owner</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src="/testimonials/lisa.jpg" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    "The analytics dashboard helps me make data-driven decisions. Our profit margins have improved by 40% since using this platform!"
                  </p>
                  <p className="text-sm font-medium">Lisa Rodriguez</p>
                  <p className="text-xs text-muted-foreground">Fashion Boutique Owner</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

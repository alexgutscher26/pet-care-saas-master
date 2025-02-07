"use client";

import { Badge } from "@/components/ui/badge"
import { CTAButton } from "@/components/animated-button"
import { AnimatedList } from "@/components/ui/animated-list"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { useRef } from "react"
import { AnimatedShinyText } from "./ui/animated-shiny-text"
import { AuroraText } from "./ui/aurora-text"
import { AmazonIcon, SyncIcon, AnalyticsIcon } from "./icons"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];

  const features = [
    <div key="feature-1" className="flex items-start gap-3 rounded-lg border bg-background/60 p-4 backdrop-blur-sm">
      <span className="mt-1 flex h-6 w-6 items-center justify-center">
        <AmazonIcon size={20} />
      </span>
      <div>
        <p className="font-medium">Multi-Platform Integration</p>
        <p className="text-sm text-muted-foreground">Seamlessly manage listings across Amazon, Etsy, and more</p>
      </div>
    </div>,
    <div key="feature-2" className="flex items-start gap-3 rounded-lg border bg-background/60 p-4 backdrop-blur-sm">
      <span className="mt-1 flex h-6 w-6 items-center justify-center">
        <SyncIcon size={20} />
      </span>
      <div>
        <p className="font-medium">Real-Time Sync</p>
        <p className="text-sm text-muted-foreground">Keep inventory and pricing in sync across all platforms</p>
      </div>
    </div>,
    <div key="feature-3" className="flex items-start gap-3 rounded-lg border bg-background/60 p-4 backdrop-blur-sm">
      <span className="mt-1 flex h-6 w-6 items-center justify-center">
        <AnalyticsIcon size={20} />
      </span>
      <div>
        <p className="font-medium">Analytics Dashboard</p>
        <p className="text-sm text-muted-foreground">Track performance and optimize your listings with data-driven insights</p>
      </div>
    </div>,
  ];

  return (
    <section className="relative min-h-screen" ref={containerRef}>
      <div className="absolute bottom-8 left-8 w-80">
        <AnimatedList delay={800} className="w-full">
          {features}
        </AnimatedList>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div className="container flex flex-col items-center px-4 md:px-6">
          <AnimatedShinyText className="inline-flex secondary mb-6 items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <Badge>✨ Introducing Multi-Platform Listing Management</Badge>
          </AnimatedShinyText>

          <h1 className="text-center font-serif text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your <AuroraText>All-in-One</AuroraText>
            <br />
            Marketplace Manager
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-center text-lg text-muted-foreground">
            Managing multiple marketplace listings is complex.
            <br />
            Let our platform handle the heavy lifting.
          </p>

          <div className="mt-10">
            <CTAButton>Start Selling Smarter</CTAButton>
          </div>

          <div className="mt-8">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
          </div>

          <p suppressHydrationWarning className="mt-6 text-center text-sm text-muted-foreground">
            14-day free trial • No credit card required
          </p>
        </div>
      </div>
    </section>
  )
}
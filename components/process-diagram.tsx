"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { 
  Store, 
  BarChart3, 
  Package, 
  RefreshCcw, 
  ShoppingCart,
  Settings,
  Building
} from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-10 flex size-12 items-center justify-center rounded-full border border-border/50 bg-background/95 p-2.5 shadow-lg transition-all hover:scale-110 hover:border-border/80 hover:bg-background/80 dark:border-border/30 dark:bg-background/75 dark:hover:border-border/50 dark:hover:bg-background/60",
        "backdrop-blur-sm backdrop-filter",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br from-background via-background/95 to-background/90 p-8 md:p-10 lg:min-h-[600px]",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-2xl flex-row items-stretch justify-between gap-6 md:gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} className="size-14 md:size-16">
            <Building className="h-6 w-6" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16 bg-primary/5 p-3 md:size-20">
            <Settings className="h-8 w-8" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-3 md:gap-4">
          <Circle ref={div1Ref}>
            <Store className="h-5 w-5" />
          </Circle>
          <Circle ref={div2Ref}>
            <Package className="h-5 w-5" />
          </Circle>
          <Circle ref={div3Ref}>
            <RefreshCcw className="h-5 w-5" />
          </Circle>
          <Circle ref={div4Ref}>
            <ShoppingCart className="h-5 w-5" />
          </Circle>
          <Circle ref={div5Ref}>
            <BarChart3 className="h-5 w-5" />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
        className="opacity-40"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
        className="opacity-40"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
        className="opacity-40"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
        className="opacity-40"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
        className="opacity-40"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
        className="opacity-40"
      />
    </div>
  );
}

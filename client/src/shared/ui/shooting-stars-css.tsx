"use client";

import { cn } from "@/shared/lib/utils";

interface ShootingStarsCSSProps {
  className?: string;
}

export function ShootingStarsCSS({ className }: ShootingStarsCSSProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />
    </div>
  );
}

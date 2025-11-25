"use client";

import { cn } from "@/shared/lib/utils";

interface StarsBackgroundCSSProps {
  className?: string;
}

export function StarsBackgroundCSS({ className }: StarsBackgroundCSSProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="stars-layer-1" />
      <div className="stars-layer-2" />
      <div className="stars-layer-3" />
    </div>
  );
}

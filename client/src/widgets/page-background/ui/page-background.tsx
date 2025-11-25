"use client";

import dynamic from 'next/dynamic';
import BackgroundGrid from "@/shared/ui/background-grid";

const ShootingStars = dynamic(() => import("@/shared/ui/shooting-stars").then(mod => mod.ShootingStars), {
  ssr: false
});

const StarsBackground = dynamic(() => import("@/shared/ui/stars-background").then(mod => mod.StarsBackground), {
  ssr: false
});

export function PageBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <BackgroundGrid />
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}

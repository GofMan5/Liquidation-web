"use client";

import { memo } from "react";
import BackgroundGrid from "@/shared/ui/background-grid";
import { StarsBackgroundCSS } from "@/shared/ui/stars-background-css";
import { ShootingStarsCSS } from "@/shared/ui/shooting-stars-css";

export const PageBackground = memo(function PageBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <BackgroundGrid />
      <ShootingStarsCSS />
      <StarsBackgroundCSS />
    </div>
  );
});

import { ComponentType, ComponentProps } from "react";

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: ComponentType<ComponentProps<"svg">>;
}

export interface SocialLink extends NavigationItem {
  colorClass?: string;
  hoverBgClass?: string;
}


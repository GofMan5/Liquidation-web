import { Youtube, Send } from "lucide-react";
import { VkIcon } from "@/shared/ui/custom-icons";
import { NavigationItem, SocialLink } from "@/shared/model/navigation-types";

export const headerNavigation: NavigationItem[] = [
  // Add header items if any in the future
];

export const footerNavigation = {
  social: [
    {
      label: "VK",
      href: "https://vk.com/liquidation",
      external: true,
      icon: VkIcon,
      colorClass: "text-zinc-400 hover:text-blue-500",
      hoverBgClass: "hover:bg-blue-500/10",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@notcopypaste/featured",
      external: true,
      icon: Youtube,
      colorClass: "text-zinc-400 hover:text-red-500",
      hoverBgClass: "hover:bg-red-500/10",
    },
    {
      label: "Telegram",
      href: "https://t.me/devliquidation",
      external: true,
      icon: Send,
      colorClass: "text-zinc-400 hover:text-sky-500",
      hoverBgClass: "hover:bg-sky-500/10",
    },
  ] as SocialLink[],
  links: [
    { label: "Конфиденциальность", href: "/privacy" },
    { label: "Условия", href: "/terms" },
    { label: "FAQ", href: "/faq" },
    { label: "Поддержка", href: "/support" },
  ] as NavigationItem[],
};


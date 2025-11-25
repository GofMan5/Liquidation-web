"use client";

import { memo } from "react";
import Link from "next/link";
import { Separator } from "@/shared/ui/separator";
import { Logo } from "@/shared/ui/logo";
import { navigationService } from "@/shared/lib/navigation-service";

export const Footer = memo(function Footer() {
  const socialLinks = navigationService.getFooterSocialLinks();
  const footerLinks = navigationService.getFooterLinks();

  return (
    <footer className="border-t border-border bg-background relative z-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center text-primary">
              <Logo className="w-8 h-8" aria-hidden="true" />
            </div>
            <span className="font-bold text-base text-foreground">Liquidation</span>
          </div>
          
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
            <Link 
                key={link.label}
                href={link.href} 
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`p-2 rounded-full bg-muted/50 transition-all duration-300 group ${link.colorClass} ${link.hoverBgClass}`}
                aria-label={link.label}
            >
                 {link.icon && (
                   <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                 )}
            </Link>
            ))}
          </div>
        </div>
        
        <Separator className="bg-border my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-xs">
          <p>© 2025 Liquidation Development Team. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
            </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

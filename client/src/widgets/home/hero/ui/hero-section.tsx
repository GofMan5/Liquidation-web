"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { ShoppingCart, Send } from "lucide-react";
import { FadeIn } from "@/shared/ui/animations";

const HeroIllustration = dynamic(() => import("@/shared/ui/hero-illustration"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[500px]" /> // Placeholder to avoid layout shift
});

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32 lg:py-40 flex flex-col md:flex-row items-center relative min-h-[80vh]">
      <div className="max-w-3xl flex-1 relative z-10">
        <FadeIn delay={0.1} viewport={false}>
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/5 backdrop-blur-sm px-4 py-1.5 text-sm">
            Мы за качество!
          </Badge>
        </FadeIn>
        
        <FadeIn delay={0.2} viewport={false}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-foreground drop-shadow-2xl">
            Качественное <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary drop-shadow-[0_0_25px_rgba(72,196,185,0.3)] animate-gradient-x bg-[length:200%_auto]">
              программное обеспечение
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3} viewport={false}>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed font-medium">
            Мы — команда профессионалов с многолетним опытом. Создаем инструменты, которые дают вам преимущество. Безопасно. Надежно. Эффективно.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} viewport={false}>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg">
              <Link href="/products">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Каталог товаров
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-bold rounded-full border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted hover:border-foreground/20 transition-all duration-300">
              <Link href="https://t.me/devliquidation" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-5 w-5" />
                Telegram
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
      
      {/* Illustration Element Container */}
      <div className="absolute top-0 right-0 w-full md:w-[60%] h-full pointer-events-none select-none z-0 opacity-60 mix-blend-screen dark:mix-blend-screen mix-blend-multiply">
         <HeroIllustration />
      </div>
    </section>
  );
}

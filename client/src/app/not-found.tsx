"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Home, Search } from "lucide-react";
import { PageBackground } from "@/widgets/page-background/ui/page-background";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <PageBackground />
      
      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-foreground/5 select-none">
            404
          </h1>
          <div className="mt-[-60px] md:mt-[-80px]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Страница не найдена</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Похоже, вы забрели не туда. Страница, которую вы ищете, не существует или была перемещена.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="font-bold rounded-xl">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              На главную
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bold rounded-xl border-white/10">
            <Link href="/products">
              <Search className="w-4 h-4 mr-2" />
              Каталог
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

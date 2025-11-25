"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import { PageBackground } from "@/widgets/page-background/ui/page-background";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <PageBackground />
      
      <div className="relative z-10 text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Что-то пошло не так</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} size="lg" className="font-bold rounded-xl">
            <RefreshCw className="w-4 h-4 mr-2" />
            Попробовать снова
          </Button>
          <Button asChild variant="outline" size="lg" className="font-bold rounded-xl border-white/10">
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              На главную
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

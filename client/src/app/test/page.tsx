"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle, XCircle, ExternalLink, Loader2, 
  Home, ShoppingBag, User, HelpCircle, FileText, 
  Shield, Headphones, Settings, AlertTriangle
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";

const pages = [
  { path: "/", name: "Главная", icon: Home, description: "Landing page" },
  { path: "/products", name: "Каталог", icon: ShoppingBag, description: "Список товаров" },
  { path: "/products/1", name: "Товар", icon: ShoppingBag, description: "Страница товара" },
  { path: "/profile", name: "Профиль", icon: User, description: "Личный кабинет" },
  { path: "/admin", name: "Админка", icon: Settings, description: "Панель администратора" },
  { path: "/faq", name: "FAQ", icon: HelpCircle, description: "Частые вопросы" },
  { path: "/support", name: "Поддержка", icon: Headphones, description: "Контакты" },
  { path: "/terms", name: "Условия", icon: FileText, description: "Terms of Service" },
  { path: "/privacy", name: "Приватность", icon: Shield, description: "Privacy Policy" },
  { path: "/not-found-test", name: "404", icon: AlertTriangle, description: "Страница не найдена" },
];

type TestStatus = "idle" | "loading" | "success" | "error";

interface PageTest {
  path: string;
  status: TestStatus;
  responseTime?: number;
  error?: string;
}

export default function TestPage() {
  const [tests, setTests] = useState<Record<string, PageTest>>({});
  const [isRunning, setIsRunning] = useState(false);

  const testPage = async (path: string): Promise<PageTest> => {
    const start = performance.now();
    try {
      const res = await fetch(path, { method: "HEAD" });
      const responseTime = Math.round(performance.now() - start);
      
      if (res.ok || res.status === 404) {
        return { path, status: "success", responseTime };
      }
      return { path, status: "error", responseTime, error: `HTTP ${res.status}` };
    } catch {
      return { path, status: "error", error: "Network error" };
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTests({});

    for (const page of pages) {
      setTests(prev => ({ ...prev, [page.path]: { path: page.path, status: "loading" } }));
      const result = await testPage(page.path);
      setTests(prev => ({ ...prev, [page.path]: result }));
    }

    setIsRunning(false);
  };

  const successCount = Object.values(tests).filter(t => t.status === "success").length;
  const errorCount = Object.values(tests).filter(t => t.status === "error").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-1">🧪 Test Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Проверка всех страниц проекта
              </p>
            </div>
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="font-bold"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Тестирование...
                </>
              ) : (
                "Запустить тесты"
              )}
            </Button>
          </div>

          {/* Stats */}
          {Object.keys(tests).length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-2xl font-bold">{pages.length}</p>
                <p className="text-xs text-muted-foreground">Всего страниц</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-2xl font-bold text-green-500">{successCount}</p>
                <p className="text-xs text-muted-foreground">Успешно</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-2xl font-bold text-red-500">{errorCount}</p>
                <p className="text-xs text-muted-foreground">Ошибки</p>
              </div>
            </div>
          )}

          {/* Pages List */}
          <div className="space-y-2">
            {pages.map((page) => {
              const Icon = page.icon;
              const test = tests[page.path];
              
              return (
                <div
                  key={page.path}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border transition-all",
                    test?.status === "success" && "bg-green-500/5 border-green-500/20",
                    test?.status === "error" && "bg-red-500/5 border-red-500/20",
                    test?.status === "loading" && "bg-yellow-500/5 border-yellow-500/20",
                    !test && "bg-white/[0.02] border-white/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      test?.status === "success" && "bg-green-500/10 text-green-500",
                      test?.status === "error" && "bg-red-500/10 text-red-500",
                      test?.status === "loading" && "bg-yellow-500/10 text-yellow-500",
                      !test && "bg-white/5 text-muted-foreground"
                    )}>
                      {test?.status === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : test?.status === "success" ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : test?.status === "error" ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{page.name}</span>
                        <code className="text-xs text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
                          {page.path}
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground">{page.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {test?.responseTime && (
                      <Badge variant="secondary" className="text-xs">
                        {test.responseTime}ms
                      </Badge>
                    )}
                    {test?.error && (
                      <Badge variant="destructive" className="text-xs">
                        {test.error}
                      </Badge>
                    )}
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link href={page.path} target="_blank">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </div>
    </div>
  );
}

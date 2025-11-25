"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "@/shared/ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import { navigationService } from "@/shared/lib/navigation-service";
// import { ThemeToggle } from "@/features/theme/ui/theme-toggle";
import { AuthDialog } from "@/features/auth/ui/auth-dialog";
import { useAuth } from "@/features/auth/model/auth-provider";
import { useCart } from "@/entities/cart/model/cart-provider";
import { User, LogOut, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export const Header = memo(function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const headerItems = navigationService.getHeaderItems();
  const { user, logout } = useAuth();
  const { toggleCart, totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Liquidation Home">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
              <Logo className="w-8 h-8" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              Liquidation
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {headerItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
             className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
             onClick={toggleCart}
             aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* <ThemeToggle /> */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-sm font-medium gap-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <User className="h-4 w-4" />
                  Личный кабинет
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/50">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer focus:bg-muted/50">
                    <User className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-sm font-medium"
              onClick={() => setIsAuthOpen(true)}
            >
              Войти
            </Button>
          )}
          
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {headerItems.map((item) => (
                <Link 
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {item.label}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="h-px bg-border my-2" />
                  <Link 
                    href="/profile"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Профиль
                  </Link>
                  <button 
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors py-2 w-full text-left"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Выйти
                  </button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  className="justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                >
                  Войти
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </header>
  );
});

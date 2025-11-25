"use client";

import { useCart } from "@/entities/cart/model/cart-provider";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { formatPrice } from "@/shared/lib/price-calculator";
import Image from "next/image";
import { CheckoutModal } from "@/features/checkout/ui/checkout-modal";
import { useCheckoutStore } from "@/features/checkout/model/checkout-store";

export function CartSheet() {
  const { isOpen, closeCart, items, removeItem, clearCart, totalPrice } = useCart();
  const { openCheckout } = useCheckoutStore();

  const handleCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background border-l border-white/10 shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Корзина
              </h2>
              <Button variant="ghost" size="icon" onClick={closeCart} className="rounded-full hover:bg-white/5">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 opacity-60">
                  <ShoppingCart className="w-16 h-16" />
                  <p className="text-lg font-medium">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-3 border border-white/5 relative group">
                      <div className="w-20 aspect-square bg-black/20 rounded-lg overflow-hidden relative shrink-0">
                        {item.product.images && item.product.images.length > 0 ? (
                          <Image 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            fill 
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/5">
                            <ShoppingCart className="w-8 h-8 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold truncate pr-4">{item.product.name}</h3>
                            <p className="font-bold text-primary whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Срок подписки: <span className="text-foreground">{item.days} дней</span>
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                             {item.quantity} x {formatPrice(item.price)}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-muted/20 backdrop-blur-lg space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary text-2xl">{formatPrice(totalPrice)}</span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full font-bold h-12 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                >
                  Оформить заказ
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground hover:text-foreground"
                  onClick={clearCart}
                >
                  Очистить корзину
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
      <CheckoutModal />
    </AnimatePresence>
  );
}

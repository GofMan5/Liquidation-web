import { motion, AnimatePresence } from "framer-motion";
import { useCheckoutStore } from "../model/checkout-store";
import { useCart } from "@/entities/cart/model/cart-provider";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { formatPrice } from "@/shared/lib/price-calculator";
import { PaymentMethodSelector } from "./payment-method-selector";
import { PromoCodeInput } from "./promo-code-input";
import { Loader2, CheckCircle, XCircle, Receipt, ArrowRight, Clock, ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/shared/ui/scroll-area";
import Image from "next/image";

export function CheckoutModal() {
  const { 
    isOpen, 
    closeCheckout, 
    step, 
    discount, 
    processOrder, 
    isProcessing, 
    reset,
    selectedPaymentMethod
  } = useCheckoutStore();
  
  const { items, totalPrice, clearCart } = useCart();

  const finalPrice = totalPrice - (totalPrice * (discount / 100));
  const discountAmount = totalPrice * (discount / 100);

  const handleClose = () => {
    if (step === 'success') {
      clearCart();
      reset();
    }
    closeCheckout();
  };

  const handlePay = async () => {
    await processOrder(totalPrice);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-2xl bg-background/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-[600px] md:h-[500px]">
          
          {/* Left Side: Order Summary */}
          <div className="w-full md:w-1/2 bg-black/20 p-6 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Ваш заказ
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="flex-1 -mx-4 px-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start group bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    {/* Image Thumbnail */}
                    <div className="w-16 h-16 bg-black/30 rounded-lg overflow-hidden relative shrink-0 border border-white/5">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingCart className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm truncate pr-2 group-hover:text-primary transition-colors" title={item.product.name}>
                          {item.product.name}
                        </h4>
                        <span className="font-bold text-sm whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                         <div className="flex items-center gap-1.5">
                            <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] font-mono">x{item.quantity}</span>
                            <span>по {formatPrice(item.price)}</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-primary/80">
                            <Clock className="w-3 h-3" />
                            <span>{item.days} дней</span>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Сумма:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>Скидка ({discount}%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span>Итого:</span>
                <span className="text-primary">{formatPrice(finalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment & Controls */}
          <div className="w-full md:w-1/2 p-6 flex flex-col bg-background/50">
            <AnimatePresence mode="wait">
              {step === 'checkout' && (
                <motion.div 
                  key="checkout"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 flex flex-col space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Способ оплаты</h3>
                    <PaymentMethodSelector />
                  </div>

                  <div className="space-y-4 flex-1">
                    <PromoCodeInput />
                  </div>

                  <Button 
                    onClick={handlePay} 
                    disabled={!selectedPaymentMethod || isProcessing}
                    className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <>
                        Оплатить {formatPrice(finalPrice)}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}

              {step === 'processing' && (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Receipt className="w-6 h-6 text-primary/50" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Обработка платежа</h3>
                    <p className="text-muted-foreground">Пожалуйста, не закрывайте окно...</p>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Заказ оформлен!</h3>
                    <p className="text-muted-foreground max-w-[250px] mx-auto">
                      Спасибо за покупку. Данные отправлены на вашу почту.
                    </p>
                  </div>
                  <Button onClick={handleClose} className="w-full">
                    Отлично
                  </Button>
                </motion.div>
              )}

              {step === 'error' && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                    <XCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Ошибка оплаты</h3>
                    <p className="text-muted-foreground max-w-[250px] mx-auto">
                      Что-то пошло не так. Попробуйте еще раз или выберите другой способ оплаты.
                    </p>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Button onClick={() => reset()} variant="outline" className="w-full">
                      Попробовать снова
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

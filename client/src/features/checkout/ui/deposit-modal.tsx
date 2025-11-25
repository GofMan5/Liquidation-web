import { motion, AnimatePresence } from "framer-motion";
import { useDepositStore, DEPOSIT_METHODS } from "../model/deposit-store";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Loader2, CheckCircle, XCircle, Wallet, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function DepositModal() {
  const { 
    isOpen, 
    closeDeposit, 
    step, 
    amount,
    setAmount,
    selectedMethod,
    setMethod,
    processDeposit, 
    isProcessing,
    reset
  } = useDepositStore();

  const handleClose = () => {
    if (step === 'success') {
      reset();
    }
    closeDeposit();
  };

  const handleDeposit = async () => {
    await processDeposit();
  };

  const presetAmounts = [50, 100, 250, 500, 1000];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-background/95 backdrop-blur-xl border-white/10 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="w-5 h-5 text-primary" />
            Пополнение баланса
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Сумма пополнения (€)</label>
                  <div className="relative">
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-2xl font-bold h-14 pl-4 bg-white/5 border-white/10 focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {presetAmounts.map((val) => (
                      <Button 
                        key={val} 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAmount(val.toString())}
                        className="border-white/10 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                      >
                        {val} €
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-muted-foreground">Способ оплаты</label>
                  <div className="grid grid-cols-2 gap-3">
                    {DEPOSIT_METHODS.map((method) => {
                      const Icon = method.icon;
                      const isSelected = selectedMethod?.id === method.id;
                      
                      return (
                        <div
                          key={method.id}
                          onClick={() => setMethod(method)}
                          className={cn(
                            "cursor-pointer p-3 rounded-xl border flex items-center gap-3 transition-all",
                            isSelected 
                              ? "bg-primary/10 border-primary shadow-[0_0_10px_rgba(56,189,248,0.1)]" 
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          )}
                        >
                          <div className={cn("p-2 rounded-full", isSelected ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground")}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={cn("font-medium text-sm", isSelected ? "text-foreground" : "text-muted-foreground")}>
                            {method.name}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Button 
                  onClick={handleDeposit} 
                  disabled={!amount || !selectedMethod || isProcessing || Number(amount) <= 0}
                  className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 mt-2"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <>
                      Пополнить {amount ? `${Number(amount).toFixed(2)} €` : ''}
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
                className="flex flex-col items-center justify-center text-center space-y-6 py-8"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wallet className="w-8 h-8 text-primary/50" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Создаем платеж</h3>
                  <p className="text-muted-foreground">Сейчас вы будете перенаправлены...</p>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-4"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Счет выставлен!</h3>
                  <p className="text-muted-foreground max-w-[250px] mx-auto">
                    Переходим на страницу оплаты...
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6 py-4"
              >
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                  <XCircle className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Ошибка</h3>
                  <p className="text-muted-foreground max-w-[250px] mx-auto">
                    Не удалось создать платеж. Попробуйте позже.
                  </p>
                </div>
                <Button onClick={() => reset()} variant="outline" className="w-full">
                  Попробовать снова
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}


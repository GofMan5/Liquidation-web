import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Tag, Check, X, Loader2 } from "lucide-react";
import { useCheckoutStore } from "../model/checkout-store";

export function PromoCodeInput() {
  const [code, setCode] = useState("");
  const { applyPromoCode, isProcessing, promoCodeError, discount } = useCheckoutStore();

  const handleApply = async () => {
    if (!code.trim()) return;
    await applyPromoCode(code);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Tag className="w-4 h-4" />
        Промокод
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Введите промокод (SALE20)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={discount > 0 || isProcessing}
            className={`bg-white/5 border-white/10 focus:ring-primary/50 ${
              promoCodeError ? "border-red-500/50 focus:ring-red-500/50" : ""
            } ${discount > 0 ? "border-green-500/50 text-green-500" : ""}`}
          />
          <AnimatePresence>
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              >
                <Check className="w-4 h-4" />
              </motion.div>
            )}
            {promoCodeError && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              >
                <X className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Button
          variant="secondary"
          onClick={handleApply}
          disabled={!code || discount > 0 || isProcessing}
          className="w-24"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : discount > 0 ? (
            "Применен"
          ) : (
            "Применить"
          )}
        </Button>
      </div>
      <AnimatePresence>
        {promoCodeError && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-xs text-red-400 pl-1"
          >
            {promoCodeError}
          </motion.p>
        )}
        {discount > 0 && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-xs text-green-400 pl-1 font-medium"
          >
            Скидка {discount}% успешно применена!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}


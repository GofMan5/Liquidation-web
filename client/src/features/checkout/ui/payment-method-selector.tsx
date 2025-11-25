import { motion } from "framer-motion";
import { useCheckoutStore } from "../model/checkout-store";
import { PAYMENT_METHODS } from "../config/payment-methods";
import { cn } from "@/shared/lib/utils";
import { CheckCircle2 } from "lucide-react";

export function PaymentMethodSelector() {
  const { selectedPaymentMethod, setPaymentMethod } = useCheckoutStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {PAYMENT_METHODS.map((method) => {
        const isSelected = selectedPaymentMethod?.id === method.id;
        const Icon = method.icon;

        return (
          <motion.div
            key={method.id}
            onClick={() => setPaymentMethod(method)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center gap-3 transition-all duration-200",
              isSelected
                ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
            )}
          >
            {isSelected && (
              <div className="absolute top-2 right-2 text-primary">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            <div className={cn("p-3 rounded-full", isSelected ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground")}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <p className={cn("font-semibold text-sm", isSelected ? "text-primary" : "text-foreground")}>
                {method.name}
              </p>
              <p className="text-[10px] text-muted-foreground line-clamp-1 px-2">
                {method.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}


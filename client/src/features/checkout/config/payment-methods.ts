import { BalancePaymentStrategy, ExternalPaymentStrategy, PaymentStrategy } from "../model/payment-strategies";
import { CreditCard, Bitcoin } from "lucide-react";

export const PAYMENT_METHODS: PaymentStrategy[] = [
  new BalancePaymentStrategy(),
  new ExternalPaymentStrategy(
    "card",
    "Банковская карта",
    "Visa, Mastercard, MIR",
    CreditCard,
    "https://secure.payment.com"
  ),
  new ExternalPaymentStrategy(
    "crypto",
    "Криптовалюта",
    "BTC, ETH, USDT",
    Bitcoin,
    "https://crypto.payment.com"
  ),
];


import { LucideIcon, Wallet } from "lucide-react";

export interface PaymentStrategy {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  process(amount: number): Promise<{ success: boolean; message: string; transactionId?: string }>;
}

export class BalancePaymentStrategy implements PaymentStrategy {
  id = "balance";
  name = "Баланс аккаунта";
  description = "Списание средств с вашего внутреннего счета";
  icon = Wallet;

  async process(amount: number): Promise<{ success: boolean; message: string; transactionId?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomSuccess = Math.random() > 0.1; // 90% success rate
        if (randomSuccess) {
          resolve({ success: true, message: "Оплата прошла успешно!", transactionId: `BAL-${Date.now()}` });
        } else {
          resolve({ success: false, message: "Недостаточно средств на балансе." });
        }
      }, 1500);
    });
  }
}

export class ExternalPaymentStrategy implements PaymentStrategy {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  providerUrl: string;

  constructor(id: string, name: string, description: string, icon: LucideIcon, providerUrl: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.providerUrl = providerUrl;
  }

  async process(amount: number): Promise<{ success: boolean; message: string; transactionId?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          message: `Перенаправление на ${this.name}...`, 
          transactionId: `EXT-${Date.now()}` 
        });
      }, 1000);
    });
  }
}


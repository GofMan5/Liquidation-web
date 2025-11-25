export interface BalanceHistoryItem {
  id: string;
  type: 'deposit' | 'withdrawal' | 'purchase';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

export const balanceHistory: BalanceHistoryItem[] = [
  {
    id: "1",
    type: "deposit",
    amount: 500.00,
    status: "completed",
    date: "22.11.2025 14:30",
    description: "Пополнение баланса (Банковская карта)"
  },
  {
    id: "2",
    type: "purchase",
    amount: -22.50,
    status: "completed",
    date: "21.11.2025 18:45",
    description: "Покупка: Auto Clicker Pro"
  },
  {
    id: "3",
    type: "purchase",
    amount: -45.00,
    status: "completed",
    date: "20.11.2025 10:15",
    description: "Покупка: Premium Subscription (30 days)"
  },
  {
    id: "4",
    type: "deposit",
    amount: 100.00,
    status: "pending",
    date: "19.11.2025 09:00",
    description: "Пополнение баланса (Crypto)"
  }
];


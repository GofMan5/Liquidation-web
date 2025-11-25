import { create } from 'zustand';
import { PaymentStrategy } from '@/features/checkout/model/payment-strategies';
import { PAYMENT_METHODS } from '@/features/checkout/config/payment-methods';

export const DEPOSIT_METHODS = PAYMENT_METHODS.filter(m => m.id !== 'balance');

interface DepositState {
  isOpen: boolean;
  amount: string;
  selectedMethod: PaymentStrategy | null;
  isProcessing: boolean;
  step: 'input' | 'processing' | 'success' | 'error';
  
  openDeposit: () => void;
  closeDeposit: () => void;
  setAmount: (amount: string) => void;
  setMethod: (method: PaymentStrategy) => void;
  processDeposit: () => Promise<void>;
  reset: () => void;
}

export const useDepositStore = create<DepositState>((set, get) => ({
  isOpen: false,
  amount: '',
  selectedMethod: null,
  isProcessing: false,
  step: 'input',

  openDeposit: () => set({ isOpen: true, step: 'input', amount: '', selectedMethod: null }),
  closeDeposit: () => set({ isOpen: false }),
  
  setAmount: (amount) => set({ amount }),
  setMethod: (method) => set({ selectedMethod: method }),

  processDeposit: async () => {
    const { amount, selectedMethod } = get();
    if (!amount || !selectedMethod || isNaN(Number(amount))) return;

    set({ isProcessing: true, step: 'processing' });

    try {
      const result = await selectedMethod.process(Number(amount));
      
      if (result.success) {
        set({ step: 'success', isProcessing: false });
      } else {
        set({ step: 'error', isProcessing: false });
      }
    } catch {
      set({ step: 'error', isProcessing: false });
    }
  },

  reset: () => set({
    step: 'input',
    amount: '',
    selectedMethod: null,
    isProcessing: false
  })
}));


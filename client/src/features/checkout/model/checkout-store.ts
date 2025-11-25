import { create } from 'zustand';
import { PaymentStrategy } from './payment-strategies';
import { PAYMENT_METHODS } from '../config/payment-methods';

interface CheckoutState {
  isOpen: boolean;
  step: 'cart' | 'checkout' | 'processing' | 'success' | 'error';
  selectedPaymentMethod: PaymentStrategy | null;
  promoCode: string;
  discount: number;
  promoCodeError: string | null;
  isProcessing: boolean;
  
  openCheckout: () => void;
  closeCheckout: () => void;
  setPaymentMethod: (method: PaymentStrategy) => void;
  applyPromoCode: (code: string) => Promise<boolean>;
  processOrder: (totalAmount: number) => Promise<void>;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  isOpen: false,
  step: 'checkout',
  selectedPaymentMethod: PAYMENT_METHODS[0],
  promoCode: '',
  discount: 0,
  promoCodeError: null,
  isProcessing: false,

  openCheckout: () => set({ isOpen: true, step: 'checkout' }),
  closeCheckout: () => set({ isOpen: false }),
  
  setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  applyPromoCode: async (code) => {
    set({ isProcessing: true, promoCodeError: null });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code.toUpperCase() === 'SALE20') {
          set({ 
            promoCode: code, 
            discount: 20, 
            isProcessing: false,
            promoCodeError: null 
          });
          resolve(true);
        } else {
          set({ 
            promoCode: '', 
            discount: 0, 
            isProcessing: false,
            promoCodeError: 'Неверный промокод' 
          });
          resolve(false);
        }
      }, 1000);
    });
  },

  processOrder: async (totalAmount) => {
    const { selectedPaymentMethod, discount } = get();
    if (!selectedPaymentMethod) return;

    set({ isProcessing: true, step: 'processing' });

    const finalAmount = totalAmount - (totalAmount * (discount / 100));

    try {
      const result = await selectedPaymentMethod.process(finalAmount);
      
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
    step: 'checkout',
    promoCode: '',
    discount: 0,
    promoCodeError: null,
    isProcessing: false
  })
}));


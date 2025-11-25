import { Product } from "@/entities/product/model/types";

export interface CartItem {
  id: string; // Unique ID for the cart item (e.g., `${productId}-${days}`)
  product: Product;
  days: number;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}


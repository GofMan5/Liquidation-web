

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string; 
}

export interface PricingConfig {
  basePrice: number; // Price for 1 day
  maxPrice?: number; // Cap on total price (limit)
  overrides?: Record<number, number>; // specific total price for N days: { 3: 5.00, 7: 10.00 }
}

export interface Product {
  id: number;
  name: string;
  description: string;
  
  // Deprecated: string price, prefer using pricing object
  price: string; 
  
  // New flexible pricing configuration
  pricing?: PricingConfig;

  iconName: 'ReachIcon' | 'AutoClickerIcon' | 'QuantaIcon';
  tag?: string;
  tagColor?: string; // CSS classes string
  
  // Dynamic content
  images?: string[]; // Array of image URLs
  features?: ProductFeature[]; // Grid features
  highlights?: string[]; // Bullet point list
}

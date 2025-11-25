import { Product } from "@/entities/product/model/types";

export const SUBSCRIPTION_DAYS = [1, 3, 7, 14, 30, 60, 90, 180, 365];

export const getPriceDiscount = (days: number): number => {
  // Returns the multiplier for the daily rate (lower = cheaper per day)
  if (days === 1) return 1.0;
  if (days === 3) return 0.95;  // -5% per day
  if (days === 7) return 0.9;   // -10% per day
  if (days === 14) return 0.85; // -15% per day
  if (days === 30) return 0.75; // -25% per day
  if (days === 60) return 0.7;  // -30% per day
  if (days === 90) return 0.6;  // -40% per day
  if (days === 180) return 0.5; // -50% per day
  if (days === 365) return 0.4; // -60% per day
  
  return 1.0;
};

export const calculateProductPrice = (product: Product, days: number): number => {
  // 1. Use new pricing config if available
  if (product.pricing) {
    const { basePrice, maxPrice, overrides } = product.pricing;

    // Check for explicit override for this duration
    if (overrides && overrides[days] !== undefined) {
      return overrides[days];
    }

    // Calculate standard price with discount logic
    const discountMultiplier = getPriceDiscount(days);
    let finalPrice = basePrice * days * discountMultiplier;

    // Apply Max Price Cap if set
    if (maxPrice !== undefined && finalPrice > maxPrice) {
      finalPrice = maxPrice;
    }

    return Math.round(finalPrice * 100) / 100;
  }

  // 2. Fallback to legacy string price parsing
  const oneDayPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
  
  if (isNaN(oneDayPrice)) return 0;

  const discountMultiplier = getPriceDiscount(days);
  const finalPrice = oneDayPrice * days * discountMultiplier;

  return Math.round(finalPrice * 100) / 100;
};

export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} €`;
};

import { products } from "@/entities/product/lib/mock-data";
import { Product } from "@/entities/product/model/types";

export class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public getAllProducts(): Product[] {
    return products;
  }

  public getProductById(id: number): Product | undefined {
    return products.find((p) => p.id === id);
  }

  public getTopProducts(limit: number = 3): Product[] {
    return products.slice(0, limit);
  }
}

export const productService = ProductService.getInstance();


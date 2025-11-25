import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer } from "@/shared/ui/animations";
import { ProductCard } from "@/entities/product/ui/product-card";
import { productService } from "@/entities/product/api/product-service";

export function PopularProductsSection() {
  const products = productService.getTopProducts(3);

  return (
    <section className="container mx-auto px-4 py-24 relative z-20">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Популярные товары</h2>
            <p className="text-muted-foreground text-lg">Инструменты выбора профессионалов.</p>
          </div>
          <Button asChild variant="ghost" className="group text-primary hover:text-primary/80 hover:bg-primary/5">
            <Link href="/products">
              Все товары <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </FadeIn>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <FadeIn key={product.id}>
             <ProductCard product={product} variant="home" />
          </FadeIn>
        ))}
      </StaggerContainer>
    </section>
  );
}

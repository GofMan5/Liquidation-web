import { FadeIn, StaggerContainer } from "@/shared/ui/animations";
import { PageBackground } from "@/widgets/page-background/ui/page-background";
import { ProductCard } from "@/entities/product/ui/product-card";
import { productService } from "@/entities/product/api/product-service";

export default function ProductsPage() {
  const products = productService.getAllProducts();

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <FadeIn viewport={false}>
          <div className="max-w-2xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Каталог товаров</h1>
            <p className="text-muted-foreground text-lg">
              Выберите инструменты, которые подходят именно вам. Все продукты оптимизированы и безопасны.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer viewport={false} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <FadeIn key={product.id} viewport={false}>
               <ProductCard product={product} />
            </FadeIn>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

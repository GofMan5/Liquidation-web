import { PageBackground } from "@/widgets/page-background/ui/page-background";
import { HeroSection } from "@/widgets/home/hero/ui/hero-section";
import { FeaturesSection } from "@/widgets/home/features/ui/features-section";
import { PopularProductsSection } from "@/widgets/home/popular-products/ui/popular-products-section";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <PageBackground />
      <HeroSection />
      <FeaturesSection />
      <PopularProductsSection />
    </div>
  );
}

import { memo } from "react";
import { Eye, ArrowRight } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import SpotlightCard from "@/shared/ui/spotlight-card";
import { Product } from "@/entities/product/model/types";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { ReachIcon, AutoClickerIcon, QuantaIcon } from "@/shared/ui/custom-icons";

const icons = {
  ReachIcon,
  AutoClickerIcon,
  QuantaIcon,
};

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: 'home' | 'catalog';
}

export const ProductCard = memo(function ProductCard({ product, className, variant = 'catalog' }: ProductCardProps) {
  const Icon = icons[product.iconName];

  return (
    <SpotlightCard 
        spotlightColor="rgba(255, 255, 255, 0.15)"
        className={cn(
            "group h-full bg-card/40 backdrop-blur-md border-border hover:border-foreground/20 transition-all duration-500 hover:shadow-lg p-0 flex flex-col", 
            className
        )}
    >
        {product.tag && (
            <div className="absolute top-4 right-4 z-10">
                 <Badge className={cn("font-bold shadow-lg", product.tagColor || "bg-primary text-primary-foreground hover:bg-primary/90")}>
                    {product.tag}
                 </Badge>
            </div>
        )}
        
        <div className="aspect-video bg-gradient-to-b from-foreground/5 to-transparent relative flex items-center justify-center overflow-hidden group-hover:from-foreground/10 transition-colors shrink-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Icon className="w-20 h-20 text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-500 drop-shadow-md" />
        </div>
        
        <div className="p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
                </div>
                <span className="text-lg font-bold text-foreground whitespace-nowrap ml-4">{product.price}</span>
            </div>
            
            <div className="mt-auto pt-4">
                {variant === 'home' ? (
                    <Button asChild variant="outline" className="w-full bg-transparent border-white/20 text-foreground hover:bg-white/10 hover:border-white/30 transition-colors font-medium rounded-xl">
                        <Link href="/products">
                            <Eye className="w-4 h-4 mr-2" />
                            Посмотреть
                        </Link>
                    </Button>
                ) : (
                    <Button asChild variant="outline" className="w-full bg-transparent border-white/20 text-foreground hover:bg-white/10 hover:border-white/30 transition-colors font-medium rounded-xl">
                        <Link href={`/products/${product.id}`}>
                            Подробнее
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    </SpotlightCard>
  );
});

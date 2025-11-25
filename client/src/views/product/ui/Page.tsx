"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { productService } from "@/entities/product/api/product-service";
import { PageBackground } from "@/widgets/page-background/ui/page-background";
import { ProductDetailsDialog } from "@/features/product-details/ui/product-details-dialog";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { 
  ArrowLeft, ShoppingCart, Play, CheckCircle,
  ChevronLeft, ChevronRight, Zap, ShieldCheck, Ghost, Settings, Move, Tag, LucideIcon
} from "lucide-react";
import { ReachIcon, AutoClickerIcon, QuantaIcon } from "@/shared/ui/custom-icons";
import { cn } from "@/shared/lib/utils";

const icons = { ReachIcon, AutoClickerIcon, QuantaIcon };
const featureIcons: Record<string, LucideIcon> = { Zap, ShieldCheck, Ghost, Settings, Move, Tag };

interface ProductPageProps {
  id: string;
}

export default function ProductPage({ id }: ProductPageProps) {
  const product = productService.getProductById(parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    notFound();
  }

  const Icon = icons[product.iconName];
  const images = product.images || [];

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Back link */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Каталог
        </Link>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Hero */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 border border-white/10 flex items-center justify-center shrink-0">
                <Icon className="w-12 h-12 md:w-16 md:h-16 text-foreground/80" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {product.tag && (
                    <Badge className={cn("text-xs", product.tagColor || "bg-primary text-primary-foreground")}>
                      {product.tag}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Features & Highlights Combined */}
            {((product.features && product.features.length > 0) || (product.highlights && product.highlights.length > 0)) && (
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <h2 className="text-lg font-bold mb-4">О продукте</h2>
                <div className="space-y-4">
                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {product.features.map((feature, idx) => {
                        const FeatureIcon = feature.icon ? featureIcons[feature.icon] || Zap : Zap;
                        return (
                          <div key={idx} className="flex gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary h-fit shrink-0">
                              <FeatureIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{feature.title}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Divider */}
                  {product.features && product.features.length > 0 && product.highlights && product.highlights.length > 0 && (
                    <div className="border-t border-white/5" />
                  )}
                  
                  {/* Highlights */}
                  {product.highlights && product.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.highlights.map((highlight, idx) => (
                        <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Media Gallery */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-4">Галерея</h2>
              
              {/* Main viewer */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-white/10 group mb-3">
                {currentImageIndex < images.length ? (
                  <Image
                    src={images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary/20 hover:scale-105 transition-all">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                      <p className="text-sm text-muted-foreground">Видео обзор скоро</p>
                    </div>
                  </div>
                )}
                
                {/* Navigation arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all h-10 w-10 backdrop-blur-sm"
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length + 1) % (images.length + 1))}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all h-10 w-10 backdrop-blur-sm"
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % (images.length + 1))}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Counter badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white/80">
                  {currentImageIndex + 1} / {images.length + 1}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                      currentImageIndex === idx 
                        ? "border-primary ring-2 ring-primary/20" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
                {/* Video thumbnail */}
                <button
                  onClick={() => setCurrentImageIndex(images.length)}
                  className={cn(
                    "relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-neutral-800 flex items-center justify-center",
                    currentImageIndex === images.length 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Play className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="p-6 rounded-2xl bg-card/60 backdrop-blur-xl border border-white/10">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-3xl font-bold">от {product.price}</span>
              </div>
              
              <ProductDetailsDialog 
                product={product} 
                trigger={
                  <Button size="lg" className="w-full font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-12">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Купить
                  </Button>
                }
              />

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Безопасная оплата</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Мгновенная активация</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

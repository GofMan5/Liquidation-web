"use client";

import { useState, useMemo } from "react";
import { Product } from "@/entities/product/model/types";
import { useCart } from "@/entities/cart/model/cart-provider";
import { calculateProductPrice, SUBSCRIPTION_DAYS, formatPrice } from "@/shared/lib/price-calculator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { 
  ShoppingCart, Info, Clock, Tag, ShieldCheck, Zap, 
  Ghost, Settings, Move, ChevronLeft, ChevronRight, LucideIcon,
  Monitor, Plus
} from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { ScrollArea } from "@/shared/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { ReachIcon, AutoClickerIcon, QuantaIcon } from "@/shared/ui/custom-icons";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

const icons: Record<string, React.ComponentType<any>> = {
  ReachIcon,
  AutoClickerIcon,
  QuantaIcon,
};

const featureIcons: Record<string, LucideIcon> = {
  Zap, ShieldCheck, Ghost, Settings, Move, Tag
};

interface ProductDetailsDialogProps {
  product: Product;
  trigger?: React.ReactNode;
}

const SUBSCRIPTION_DAYS_OPTIONS = SUBSCRIPTION_DAYS;

import { userDevices } from "@/entities/user/lib/mock-data";

type DeviceMode = "existing" | "new";

export function ProductDetailsDialog({ product, trigger }: ProductDetailsDialogProps) {
  const { addItem } = useCart();
  const Icon = icons[product.iconName] || icons.ReachIcon;
  const [selectedDays, setSelectedDays] = useState<string>("30");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Device selection state
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("existing");
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(userDevices[0]?.id || "");
  const [newDeviceName, setNewDeviceName] = useState<string>("");

  const days = parseInt(selectedDays);
  const currentPrice = useMemo(() => calculateProductPrice(product, days), [product, days]);
  const hasImages = product.images && product.images.length > 0;

  const handleAddToCart = () => {
    addItem(product, days);
  };

  const nextImage = () => {
    if (!product.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images!.length);
  };

  const prevImage = () => {
    if (!product.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images!.length) % product.images!.length);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="secondary" className="flex-1 font-bold rounded-xl bg-secondary/50 hover:bg-secondary">
            <Info className="w-4 h-4 mr-2" />
            Подробнее
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] md:max-w-[1000px] lg:max-w-[1100px] max-h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-2xl border-white/10 shadow-2xl gap-0">
        <div className="grid md:grid-cols-[400px_1fr] h-full max-h-[80vh]">
          <div className="bg-muted/30 p-6 flex flex-col border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <div className="relative z-10 mb-6 flex-1 flex flex-col">
               {hasImages ? (
                 <div className="flex flex-col gap-4">
                   <div className="relative aspect-video bg-black/20 rounded-xl border border-white/10 overflow-hidden group">
                      <Image 
                        src={product.images![currentImageIndex]} 
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      
                      {product.images!.length > 1 && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                   </div>

                   {product.images!.length > 1 && (
                     <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {product.images!.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={cn(
                              "relative w-20 aspect-video rounded-md overflow-hidden border-2 transition-all flex-shrink-0",
                              currentImageIndex === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                            )}
                          >
                            <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                          </button>
                        ))}
                     </div>
                   )}
                 </div>
               ) : (
                  <div className="w-full aspect-square max-h-[300px] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl shadow-primary/5 mx-auto">
                    <Icon className="w-24 h-24 text-foreground/80" />
                  </div>
               )}
            </div>

            <div className="mt-auto w-full relative z-10 space-y-4 bg-background/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> Длительность
                </label>
                <Select value={selectedDays} onValueChange={setSelectedDays}>
                  <SelectTrigger className="w-full bg-background/50 border-white/10 h-10 rounded-lg text-sm">
                    <SelectValue placeholder="Выберите срок" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBSCRIPTION_DAYS_OPTIONS.map((d) => (
                      <SelectItem key={d} value={d.toString()}>
                        {d} дней
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Device Selection */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                  <Monitor className="w-3 h-3" /> Устройство
                </label>
                
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant={deviceMode === "existing" ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-xs h-8"
                    onClick={() => setDeviceMode("existing")}
                  >
                    Существующее
                  </Button>
                  <Button
                    type="button"
                    variant={deviceMode === "new" ? "default" : "outline"}
                    size="sm"
                    className="flex-1 text-xs h-8"
                    onClick={() => setDeviceMode("new")}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Новое
                  </Button>
                </div>

                {deviceMode === "existing" ? (
                  <Select value={selectedDeviceId} onValueChange={setSelectedDeviceId}>
                    <SelectTrigger className="w-full bg-background/50 border-white/10 h-10 rounded-lg text-sm">
                      <SelectValue placeholder="Выберите устройство" />
                    </SelectTrigger>
                    <SelectContent>
                      {userDevices.map((device) => (
                        <SelectItem key={device.id} value={device.id}>
                          {device.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    placeholder="Название устройства"
                    value={newDeviceName}
                    onChange={(e) => setNewDeviceName(e.target.value)}
                    className="bg-background/50 border-white/10 h-10 rounded-lg text-sm"
                  />
                )}
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-end justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Итого:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">{formatPrice(currentPrice)}</span>
                    {product.pricing?.maxPrice && currentPrice >= product.pricing.maxPrice && (
                        <div className="text-[10px] text-primary font-medium mt-1">
                            Максимальная цена достигнута
                        </div>
                    )}
                    {days >= 30 && (!product.pricing?.maxPrice || currentPrice < product.pricing.maxPrice) && (
                      <div className="text-[10px] text-green-400 font-medium">
                        Выгодное предложение
                      </div>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full font-bold shadow-lg shadow-primary/20 h-12 text-base rounded-xl bg-primary hover:bg-primary/90 transition-all hover:shadow-primary/30"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  В корзину
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full bg-background/40">
            <DialogHeader className="p-8 pb-4 border-b border-white/5 shrink-0 bg-background/60 backdrop-blur-xl z-20">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 py-0.5 text-xs uppercase tracking-wider">
                  {product.tag || "Product"}
                </Badge>
                {hasImages && <Icon className="w-6 h-6 text-muted-foreground" />}
              </div>
              <DialogTitle className="text-3xl font-bold">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-base mt-2 leading-relaxed">
                {product.description}
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="flex-1 h-full">
              <div className="p-8 space-y-8">
                
                {product.features && product.features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon ? featureIcons[feature.icon] || Zap : Zap;
                      return (
                        <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <FeatureIcon className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-sm">{feature.title}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {product.highlights && product.highlights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" />
                      Ключевые особенности
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {product.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground group p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 shadow-sm shadow-primary/50 group-hover:scale-150 transition-transform" />
                          <span className="text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import { type Product } from "@/types/product";

interface ProductCarouselProps {
  products: Product[];
  autoPlayInterval?: number;
}

export function ProductCarousel({ 
  products, 
  autoPlayInterval = 3000 
}: ProductCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(autoplay);
  }, [api, autoPlayInterval]);

  return (
    <div className="relative mx-auto max-w-7xl px-8">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem 
              key={`${product.id}-${index}`} 
              className="basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
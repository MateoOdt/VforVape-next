"use client";

import { products } from "@/config/products";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Button } from "../ui/button";
import { useGradientAnimation } from "@/hooks/use-gradient-animation";

const extendedProducts = [...products, ...products, ...products].map((product, index) => ({
  ...product,
  id: index + 1,
}));

export function ProductsSection() {
  const position = useGradientAnimation();

  return (
    <section id="products" className="py-28 container-padding bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Nos produits favoris</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
           Retrouvez vos produits favoris dans notre sélection de dispositifs de vapotage et accessoires premium, soigneusement choisis pour vous.
          </p>
        </div>

        {/* Featured Products Carousel */}
        <div className="mb-16">
          <ProductCarousel products={extendedProducts} autoPlayInterval={3000} />
        </div>

        {/* Button -> catalog */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            style={{
              background: 'linear-gradient(to right, red, #b30c20, #750d7a)',
              backgroundSize: '220% auto',
              backgroundPosition: `${position}% 90%`,
              transition: 'background-position 0.15s ease-in-out',
            }}
          >
            Consulter notre catalogue
          </Button>
        </div>
      </div>
    </section>
  );
}
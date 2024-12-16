"use client";

import { products } from "@/config/products";
import { ProductCarousel } from "@/components/product/product-carousel";

// Duplicate products to have more items for the carousel
const extendedProducts = [...products, ...products, ...products].map((product, index) => ({
  ...product,
  id: index + 1,
}));

export function ProductsSection() {
  return (
    <section id="products" className="py-28 container-padding bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Featured Products</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Discover our selection of premium vaping devices and accessories
          </p>
        </div>

        {/* Featured Products Carousel */}
        <div className="mb-16">
          <ProductCarousel products={extendedProducts} autoPlayInterval={3000} />
        </div>
      </div>
    </section>
  );
}
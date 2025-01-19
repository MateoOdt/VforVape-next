'use client'

import { ProductCard } from "./product-card";
import { useContext } from "react";
import { CatalogContext } from "./catalog-provider";

export function CatalogGrid() {
  const { products } = useContext(CatalogContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
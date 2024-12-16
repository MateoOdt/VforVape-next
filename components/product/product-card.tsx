"use client";

import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </Card>
  );
}
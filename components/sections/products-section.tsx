"use client";

import { Card } from "@/components/ui/card";
import { products } from "@/config/products";
import Image from "next/image";
import { Button } from "../ui/button";

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
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
          ))}
        </div>
        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90"
          style={{
            margin: "auto",
            display: "block",
            marginTop: "3rem"
          }}
        >
          Découvrez notre catalogue
        </Button>
      </div>
    </section>
  );
}
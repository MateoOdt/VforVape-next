"use client";

import { useContext, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/config/catalog";
import { AddProductDialog } from "./add-product-dialog";
import { CatalogContext } from "./catalog-provider";

export function CatalogHeader() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { jwtToken, getProducts } = useContext(CatalogContext);

  useEffect(() => {
    getProducts(activeCategory);
  }, [activeCategory]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        {jwtToken && <AddProductDialog />}
      </div>
      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
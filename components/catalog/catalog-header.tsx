"use client";

import { useContext, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/config/catalog";
import { AddProductDialog } from "./add-product-dialog";
import { AddCategoryDialog } from "./add-category-dialog";
import { CategoryOptions } from "./category-options";
import { CatalogContext } from "./catalog-provider";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounced";

export function CatalogHeader() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { jwtToken, getProducts, setCurrentCategory } = useContext(CatalogContext);

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    getProducts(activeCategory);
    setCurrentCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    getProducts(activeCategory, debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Nos produits</h1>
        <div className="flex gap-2">
          {jwtToken && <AddProductDialog />}
          {jwtToken && <AddCategoryDialog />}
        </div>
      </div>
  
      {/* Search + Tabs + Button */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 w-full">
        
        {/* Search Field - order first on mobile */}
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="order-1 md:order-none w-full md:w-1/3 h-13"
        />
  
        {/* Tabs - full width and wrapping */}
        <div className="order-2 md:order-none w-full">
          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full h-13">
              <TabsTrigger value="all" className="h-10 flex items-center justify-center">
                <span>Tous</span>
              </TabsTrigger>
              {categories.map((category) => (
                <div key={category.id} className="relative group">
                  <TabsTrigger
                    value={category.id}
                    className="h-10 flex items-center justify-center w-full"
                  >
                    <span>{category.name}</span>
                  </TabsTrigger>
                  {jwtToken && (
                    <div className="absolute right-1 top-1/2 -translate-y-1/2">
                      <CategoryOptions
                        categoryId={category.id}
                        categoryName={category.name}
                      />
                    </div>
                  )}
                </div>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
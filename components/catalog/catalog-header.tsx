"use client";

import { useContext, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddProductDialog } from "./add-product-dialog";
import { AddCategoryDialog } from "./add-category-dialog";
import { CategoryOptions } from "./category-options";
import { CatalogContext } from "./catalog-provider";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounced";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CatalogHeader() {
  const { jwtToken, getProducts, setCurrentCategory, getCategories, categories, currentCategory } = useContext(CatalogContext);
  const [activeCategory, setActiveCategory] = useState(currentCategory || "all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    getProducts(activeCategory);
    setCurrentCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    getProducts(activeCategory, debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setActiveCategory(currentCategory || "all");
  }, [currentCategory]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const nextSlide = () => {
    if (currentIndex < categories.length - (itemsPerPage - 1)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + (itemsPerPage - 1));

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Nos produits</h1>
        <div className="flex gap-2">
          {jwtToken && <AddProductDialog />}
          {jwtToken && <AddCategoryDialog />}
        </div>
      </div>
  
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 w-full">
        
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="order-1 md:order-none w-full md:w-1/3 h-13"
        />
  
        <div className="order-2 md:order-none w-full">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="h-10 w-10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <TabsList className="grid grid-cols-4 gap-2 w-full h-13">
                  <TabsTrigger value="all" className="h-10">
                    <span>All</span>
                  </TabsTrigger>
                  {visibleCategories.map((category) => (
                    <div key={category._id} className="relative group">
                      <TabsTrigger
                        value={category._id}
                        className="h-10 w-full"
                      >
                        <span>{capitalizeFirstLetter(category.name)}</span>
                      </TabsTrigger>
                      {jwtToken && (
                        <div className="absolute right-1 top-1/2 -translate-y-1/2">
                          <CategoryOptions
                            categoryId={category._id}
                            categoryName={category.name}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </TabsList>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= categories.length - (itemsPerPage - 1)}
                className="h-10 w-10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
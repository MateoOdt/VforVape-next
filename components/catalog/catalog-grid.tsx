'use client'

import { ProductCard } from "./product-card";
import { useContext } from "react";
import { CatalogContext } from "./catalog-provider";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Product } from "@/types/product";

export function CatalogGrid() {
  const { products, setPageProduct } = useContext(CatalogContext);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {products?.docs?.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="mb-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className={products.hasPrevPage ? "" : "opacity-50 pointer-events-none"}
            >
              <PaginationPrevious
                onClick={() => {
                  if (products.hasPrevPage) setPageProduct(products.page - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: products.totalPages }, (_, i) => (
              <PaginationItem
                key={i}
                className={`${
                  products.page === i + 1 ? "bg-red-700 text-white rounded-lg" : "bg-transparent"
                }`}
              >
                <PaginationLink onClick={() => setPageProduct(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem
              className={products.hasNextPage ? "" : "opacity-50 pointer-events-none"}
            >
              <PaginationNext
                onClick={() => {
                  if (products.hasNextPage) setPageProduct(products.page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
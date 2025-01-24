"use client";

import { ProductQuery } from '@/types/product';
import _ from 'lodash';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

export const CatalogContext = createContext<{
  jwtToken: string | null;
  setJwtToken: (_jwtToken: string) => void;
  products: ProductQuery;
  postProduct: (data: any) => Promise<void>;
  getProducts: (category?: string) => void;
  pageProduct: number;
  setPageProduct: (limitProduct: number) => void;
  handleDeleteProduct: (id: string) => void;
}>({
  jwtToken: null,
  setJwtToken: () => {},
  products: {
    docs: [],
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  postProduct: async () => {},
  getProducts: () => {},
  pageProduct: 1,
  setPageProduct: () => {},
  handleDeleteProduct: () => {},
});

type CatalogProviderProps = {
  children: ReactNode;
};

export const CatalogProvider = ({ children }: CatalogProviderProps) => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductQuery>({
    docs: [],
    totalDocs: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });
  const [pageProduct, setPageProduct] = useState<number>(1);

  /**
   * Fetches the products from the API, optionally filtered by category
   */
  const getProducts = useCallback((category?: string) => {
    const url = new URL('http://localhost:5000/products');
    
    // Add query parameters
    if (category && category !== "all") {
      url.searchParams.append('category', category);
    }
    url.searchParams.append('page', String(pageProduct));
  
    // Fetch data from the API
    fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [pageProduct]);

  useEffect(() => {
    getProducts();
  }, [pageProduct]);

  /**
   * Posts a new product to the API and refetches the product list
   */
  const postProduct = useCallback(
    async (data: any) => {
      try {
        const payload = {
          ...data,
          image: data.image,
        };
  
        const response = await fetch('http://localhost:5000/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          console.log('Product posted successfully');
          getProducts(data.category);
        } else {
          console.error('Failed to post product:', await response.text());
        }
      } catch (error) {
        console.error('Error posting product:', error);
      }
    },
    [jwtToken, getProducts]
  );

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        });
  
        if (response.ok) {
          console.log('Product deleted successfully');
          getProducts();
        } else {
          console.error('Failed to delete product:', await response.text());
        }
      } catch (e) {
        console.error('Error deleting product:', e);
      }
    },
    [jwtToken, getProducts]
  );

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setJwtToken(token);
    }
  }, []);

  return (
    <CatalogContext.Provider value={{ jwtToken, setJwtToken, products, postProduct, getProducts, pageProduct, setPageProduct, handleDeleteProduct }}>
      {children}
    </CatalogContext.Provider>
  );
};

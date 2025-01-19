"use client";

import { Product } from '@/types/catalog';
import _ from 'lodash';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

export const CatalogContext = createContext<{
  jwtToken: string | null;
  setJwtToken: (_jwtToken: string) => void;
  products: Array<Product>;
  postProduct: (data: any) => Promise<void>;
  getProducts: (category?: string) => void;
}>({
  jwtToken: null,
  setJwtToken: () => {},
  products: [],
  postProduct: async () => {},
  getProducts: () => {},
});

type CatalogProviderProps = {
  children: ReactNode;
};

export const CatalogProvider = ({ children }: CatalogProviderProps) => {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [products, setProducts] = useState<Array<Product>>([]);

  /**
   * Fetches the products from the API, optionally filtered by category
   */
  const getProducts = useCallback((category?: string) => {
    const url = category && category !== "all"
      ? `http://localhost:5000/products?category=${category}`
      : `http://localhost:5000/products`;

    fetch(url, {
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
  }, []);

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

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setJwtToken(token);
    }
  }, []);

  return (
    <CatalogContext.Provider value={{ jwtToken, setJwtToken, products, postProduct, getProducts }}>
      {children}
    </CatalogContext.Provider>
  );
};

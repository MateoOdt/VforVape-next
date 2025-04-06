"use client";

import { useToast } from '@/hooks/use-toast';
import { ProductQuery } from '@/types/product';
import _ from 'lodash';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

export const CatalogContext = createContext<{
  jwtToken: string | null;
  setJwtToken: (_jwtToken: string) => void;
  products: ProductQuery;
  postProduct: (data: any) => Promise<void>;
  getProducts: (category?: string, search?: string) => void;
  patchProduct: (id: string, data: any) => void;
  pageProduct: number;
  setPageProduct: (limitProduct: number) => void;
  handleDeleteProduct: (id: string) => void;
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
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
  patchProduct: async () => {},
  pageProduct: 1,
  setPageProduct: () => {},
  handleDeleteProduct: () => {},
  currentCategory: 'all',
  setCurrentCategory: () => {},
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
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const { toast } = useToast();

  /**
   * Fetches the products from the API, optionally filtered by category
   */ 
  const getProducts = useCallback((category?: string, search?: string) => {
    const url = new URL(`${process.env.API_URL}/products`);
    
    // Add query parameters
    if (category && category !== "all") {
      url.searchParams.append('category', category);
    }
    if (search) {
      url.searchParams.append('search', search);
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

        const response = await fetch(`${process.env.API_URL}/products`, {
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
          toast({
            description: 'Votre produit à été ajouté avec succès !',
          });
        } else {
          console.error('Failed to post product:', await response.text());
        }
      } catch (error) {
        console.error('Error posting product:', error);
      }
    },
    [jwtToken, getProducts]
  );

  const patchProduct = useCallback(
    async (id: string, data: any) => {
      try {
        ///${process.env.API_URL}
      
        const response = await fetch(`http://localhost:5000/products/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log('Product patched successfully');
          getProducts();
          toast({
            description: 'Votre produit à été modifié avec succès !',
          });
        } else {
          console.error('Failed to patch product:', await response.text());
        }
      } catch (error) {
        console.error('Error patching product:', error);
      }
    },
    [jwtToken, getProducts]
  );

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`${process.env.API_URL}/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        });
  
        if (response.ok) {
          getProducts();
          toast({
            description: 'Votre produit à été supprimé avec succès !',
          });
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
    <CatalogContext.Provider value={{ jwtToken, setJwtToken, products, postProduct, getProducts, pageProduct, setPageProduct, handleDeleteProduct, currentCategory, setCurrentCategory, patchProduct }}>
      {children}
    </CatalogContext.Provider>
  );
};

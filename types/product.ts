export interface ProductQuery {
  docs: Product[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string[];
  price: number;
  isFavorite: boolean;
}
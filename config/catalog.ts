import { Category, Product } from "@/types/catalog";

export const categories: Category[] = [
  { id: "cbd", name: "CBD" },
  { id: "20ml", name: "20ml" },
  { id: "50ml", name: "50ml" },
  { id: "box", name: "Box" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "CBD Oil 1000mg",
    description: "Premium CBD oil for relaxation",
    price: 49.99,
    category: "cbd",
    image: "https://images.unsplash.com/photo-1611070960566-cf5090d4e921?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Fruit Mix 20ml",
    description: "Tropical fruit blend e-liquid",
    price: 14.99,
    category: "20ml",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "Menthol Blast 50ml",
    description: "Refreshing menthol e-liquid",
    price: 24.99,
    category: "50ml",
    image: "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "4",
    name: "Pro Vape Box Mod",
    description: "Advanced box mod with temperature control",
    price: 79.99,
    category: "box",
    image: "https://images.unsplash.com/photo-1562160376-8933e8f339c6?w=800&auto=format&fit=crop&q=60",
  },
];
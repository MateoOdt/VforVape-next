import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/catalog";
import { Button } from "../ui/button";
import { CatalogContext } from "./catalog-provider";
import { useContext } from "react";
import { PenLine, Star, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const { handleDeleteProduct, jwtToken } = useContext(CatalogContext);

  function handleFavoriteOption(fav: boolean) {
    console.log('Favorite option', fav)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          <Image
            src={product.image || ''}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {jwtToken && (
            <>
              <Button
                onClick={() => handleDeleteProduct(product._id)}
                className="absolute top-2 right-2 bg-red-700 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <Trash2 />
              </Button>
              <Button
                onClick={() => {
                  console.log(product)
                }}
                className="absolute top-14 right-2 bg-red-700 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <PenLine />
              </Button>
              <div onClick={() => handleFavoriteOption(product.isFavorite)}>
              {product.isFavorite ? (
                <Button
                  className="absolute bottom-2 right-2 bg-red-700 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <Star className="text-white" fill="currentColor" />
                </Button>
              ) : (
                <Button
                  className="absolute bottom-2 right-2 bg-red-700 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <Star className="text-white" stroke="currentColor" />
                </Button>
              )}
              </div>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
      </CardContent>
    </Card>
  );
}
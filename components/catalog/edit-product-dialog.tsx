"use client"

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { categories } from "@/config/catalog";
import type { Product, ProductFormValues } from "@/types/catalog";
import { productSchema } from "@/lib/validations/catalog";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { CatalogContext } from "./catalog-provider";
import { isString, set } from "lodash";

interface ProductCardProps {
  product: Product;
}

export function EditProductDialog({ product }: ProductCardProps) {
  const { jwtToken, patchProduct } = useContext(CatalogContext);

  const [image, setImage] = useState<string | File | null>(product?.image || null);
  const [open, setOpen] = useState(false);
  const [isHoverImg, setIsHoverImg] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
    },
  });

  const watchAllFields = form.watch();
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const hasChanges =
      watchAllFields.name !== product.name ||
      watchAllFields.description !== product.description ||
      watchAllFields.category !== product.category ||
      watchAllFields.price !== product.price ||
      image !== product.image || image !== null;

    setIsDirty(hasChanges);
  }, [watchAllFields, image, product]);

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${process.env.API_URL}/api/files/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data.url);
      return data.url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleDeleteImage = (event: React.MouseEvent) => {
    event.stopPropagation();

    fetch(`${process.env.API_URL}/api/files/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ fileUrl: product.image }),
    })
      .then((res) => {
        if (res.ok) {
          setImage(null);
        }
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (!image) {
      console.error('Veuillez sélectionner une image pour le produit.');
      return;
    }

    try {
      if (image instanceof File) {
        const uploadedImageUrl = await handleFileUpload(image);
        if (!uploadedImageUrl) {
          console.error("Image upload failed.");
          return;
        }
        data.image = uploadedImageUrl;
      } else if (isString(image)) {
        data.image = image;
      }

      await patchProduct(product._id, data);
      form.reset();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-14 right-2 bg-blue-700 text-white p-2 rounded-full hover:bg-blue-600">
          <PenLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le produit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <div>
              <FormLabel>Image</FormLabel>
              <div style={{ marginTop: 12 }}>
                {image && isString(image) ? (
                  <>
                    <div
                      onMouseEnter={() => setIsHoverImg(true)}
                      onMouseLeave={() => setIsHoverImg(false)}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                        height: 100,
                        width: 100,
                      }}
                    >
                      <Image
                        src={image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-md"
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      {isHoverImg && (
                        <button
                          className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 z-10"
                          onClick={(e) => handleDeleteImage(e)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </>
                ) : image instanceof File ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed p-4 text-center ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
                  >
                    <input {...getInputProps()} />
                    <p>Fichier sélectionné : {image.name}</p>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed p-4 text-center ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
                  >
                    <input {...getInputProps()} />
                    <p>Glissez et déposez une image ici, ou cliquez pour sélectionner un fichier</p>
                  </div>
                )}
              </div>
            </div>
            <Button className="w-full" disabled={!isDirty || image === null}>Modifier le produit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2 } from "lucide-react";
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
import type { ProductFormValues } from "@/types/catalog";
import { productSchema } from "@/lib/validations/catalog";
import { CatalogContext } from "./catalog-provider";
import { useDropzone } from "react-dropzone";

export function ProductDialog({ product }: any) {
  const { jwtToken, patchProduct } = useContext(CatalogContext);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState(product.image);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
      setExistingImageUrl(null);
    }
  };

  const handleDeleteImage = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (existingImageUrl) {
      try {
        const response = await fetch(`${process.env.API_URL}/api/files/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ fileUrl: existingImageUrl }),
        });

        if (response.ok) {
          setExistingImageUrl(null);
        }
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    } else {
      setImage(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
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

  const onSubmit = async (data: ProductFormValues) => {
    try {
      let imageUrl = existingImageUrl;
      
      if (image) {
        const uploadedImageUrl = await handleFileUpload(image);
        if (!uploadedImageUrl) {
          console.error("Image upload failed.");
          return;
        }
        imageUrl = uploadedImageUrl;
      }

      if (!jwtToken) {
        console.error('Token missing. You must be logged in.');
        return;
      }

      await patchProduct(product._id, {
        ...data,
        image: imageUrl,
      });

      setOpen(false);
      form.reset();
      setImage(null);
      setExistingImageUrl(null);
      console.log("Product updated successfully");
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    if (product) {
      setExistingImageUrl(product.image);
      form.reset({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
      });
    }
  }, [product, open]);

  useEffect(() => {
    if (!open) {
      setImage(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 absolute top-16 right-2 bg-blue-700 text-white p-2 w-10 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-red-400">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Image</FormLabel>
              <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
                <input {...getInputProps()} />
                {existingImageUrl ? (
                  <div className="relative">
                    <img src={existingImageUrl} alt="Current" className="h-20 w-20 mx-auto" />
                    <Button
                      type="button"
                      onClick={handleDeleteImage}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : image ? (
                  <p>{image.name}</p>
                ) : (
                  <p>Drag & drop an image, or click to select one</p>
                )}
              </div>
            </div>
            <Button className="w-full">Update Product</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
